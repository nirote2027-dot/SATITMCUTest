import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  isDesktop: true,
  getAppVersion: () => ipcRenderer.invoke("app:version"),
  platform: process.platform,
});
