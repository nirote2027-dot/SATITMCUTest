import { app, BrowserWindow, Menu, dialog, ipcMain, shell } from "electron";
import path from "path";
import http from "http";
import { fork, ChildProcess } from "child_process";
import fs from "fs";

let mainWindow: BrowserWindow | null = null;
let serverProcess: ChildProcess | null = null;

const isDev = !app.isPackaged;
const DEFAULT_PORT = 3010;

// Enforce single instance
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

function checkServerReady(port: number, timeoutMs = 20000): Promise<boolean> {
  const startTime = Date.now();
  return new Promise((resolve) => {
    const check = () => {
      const req = http.get(`http://127.0.0.1:${port}`, (res) => {
        resolve(true);
      });
      req.on("error", () => {
        if (Date.now() - startTime > timeoutMs) {
          resolve(false);
        } else {
          setTimeout(check, 500);
        }
      });
      req.end();
    };
    check();
  });
}

function startStandaloneServer(port: number): ChildProcess | null {
  // Find standalone server.js
  const possiblePaths = [
    path.join(process.resourcesPath, "standalone", "server.js"),
    path.join(__dirname, "..", ".next", "standalone", "server.js"),
    path.join(app.getAppPath(), "..", "standalone", "server.js"),
  ];

  let serverPath = "";
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      serverPath = p;
      break;
    }
  }

  if (!serverPath) {
    console.warn("[electron] ไม่พบ standalone server.js กำลังลองเชื่อมต่อไปยังเซิร์ฟเวอร์ที่รันอยู่แล้ว...");
    return null;
  }

  console.log(`[electron] เริ่มเซิร์ฟเวอร์ Standalone: ${serverPath} บนพอร์ต ${port}`);
  const env: NodeJS.ProcessEnv = {
    ...process.env,
    PORT: String(port),
    HOSTNAME: "127.0.0.1",
    NODE_ENV: "production",
  };

  const child = fork(serverPath, [], {
    env,
    stdio: "inherit",
    cwd: path.dirname(serverPath),
  });

  return child;
}

function createSplashWindow(): BrowserWindow {
  const splash = new BrowserWindow({
    width: 480,
    height: 360,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    center: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  const splashHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(10px);
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          user-select: none;
        }
        .logo { width: 100px; height: 100px; object-fit: contain; margin-bottom: 16px; }
        h2 { margin: 0 0 6px 0; font-size: 18px; color: #0f172a; font-weight: 700; }
        p { margin: 0 0 20px 0; font-size: 13px; color: #64748b; }
        .spinner {
          width: 32px; height: 32px;
          border: 3px solid #e2e8f0;
          border-top-color: #2563eb;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      </style>
    </head>
    <body>
      <img class="logo" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='2'><path d='M22 10v6M2 10l10-5 10 5-10 5z'/><path d='M6 12v5c3 3 9 3 12 0v-5'/></svg>" />
      <h2>โรงเรียนสาธิต มจร</h2>
      <p>กำลังเตรียมความพร้อมระบบ...</p>
      <div class="spinner"></div>
    </body>
    </html>
  `;

  splash.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(splashHtml)}`);
  splash.once("ready-to-show", () => splash.show());
  return splash;
}

async function createWindow() {
  const splash = createSplashWindow();

  // Try to find or start server
  const port = Number(process.env.PORT) || DEFAULT_PORT;
  let ready = await checkServerReady(port, 1500);

  if (!ready && !isDev) {
    serverProcess = startStandaloneServer(port);
    ready = await checkServerReady(port, 25000);
  }

  const iconPath = path.join(__dirname, "assets", "icon.png");

  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    title: "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (Satit MCU System)",
    icon: fs.existsSync(iconPath) ? iconPath : undefined,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const targetUrl = `http://127.0.0.1:${port}`;

  mainWindow.once("ready-to-show", () => {
    if (splash && !splash.isDestroyed()) {
      splash.destroy();
    }
    mainWindow?.show();
    mainWindow?.focus();
  });

  // Handle external links safely
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      shell.openExternal(url);
    }
    return { action: "deny" };
  });

  createApplicationMenu();

  if (ready) {
    await mainWindow.loadURL(targetUrl);
  } else {
    // If server failed to start, show friendly error page
    const errorHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            height: 90vh; background: #f8fafc; color: #1e293b; text-align: center; padding: 20px;
          }
          h1 { color: #dc2626; margin-bottom: 8px; }
          p { color: #64748b; max-width: 500px; line-height: 1.6; }
          button {
            margin-top: 20px; padding: 10px 20px; border-radius: 10px; border: none;
            background: #2563eb; color: white; font-weight: 600; cursor: pointer;
          }
        </style>
      </head>
      <body>
        <h1>ไม่สามารถเชื่อมต่อระบบได้</h1>
        <p>ไม่สามารถสตาร์ทหรือเชื่อมต่อไปยังเซิร์ฟเวอร์ที่ ${targetUrl} ได้ กรุณาตรวจสอบว่าเซิร์ฟเวอร์หรือฐานข้อมูลกำลังทำงานอยู่</p>
        <button onclick="location.reload()">ลองใหม่อีกครั้ง</button>
      </body>
      </html>
    `;
    await mainWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(errorHtml)}`);
  }
}

function createApplicationMenu() {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: "แฟ้ม (File)",
      submenu: [
        { label: "โหลดซ้ำ (Reload)", accelerator: "CmdOrCtrl+R", click: () => mainWindow?.reload() },
        { type: "separator" },
        { label: "ปิดหน้าต่าง", accelerator: "CmdOrCtrl+W", click: () => mainWindow?.close() },
        { label: "ออกจากโปรแกรม (Exit)", accelerator: "CmdOrCtrl+Q", click: () => app.quit() },
      ],
    },
    {
      label: "มุมมอง (View)",
      submenu: [
        { label: "ขยายขนาด (Zoom In)", role: "zoomIn" },
        { label: "ลดขนาด (Zoom Out)", role: "zoomOut" },
        { label: "ขนาดปกติ (Reset Zoom)", role: "resetZoom" },
        { type: "separator" },
        { label: "เต็มหน้าจอ (Toggle Fullscreen)", role: "togglefullscreen" },
      ],
    },
    {
      label: "ช่วยเหลือ (Help)",
      submenu: [
        {
          label: "เกี่ยวกับโปรแกรม (About)",
          click: () => {
            dialog.showMessageBox(mainWindow!, {
              type: "info",
              title: "เกี่ยวกับระบบ Satit MCU System",
              message: "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย",
              detail: "ระบบบริหารจัดการโรงเรียนสาธิต มจร\nเวอร์ชัน: 1.0.0 (Windows Desktop Edition)\nสถาปัตยกรรม: Next.js + Electron",
            });
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// IPC Handlers
ipcMain.handle("app:version", () => app.getVersion());

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
});
