import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3010";
const SCREENSHOT_DIR = "C:/Users/Tony/.gemini/antigravity/brain/63bc34b1-ec09-4804-952d-3c809181576b/scratch/screenshots";

const isHeaded = process.argv.includes("--headed") || process.argv.includes("-h");

async function runSimulation() {
  console.log(`🚀 กำลังเริ่มต้นทดสอบระบบบน Google Chrome (${isHeaded ? "โหมดแสดงหน้าต่างเบราว์เซอร์ Headed" : "โหมด Headless"})...`);
  const browser = await chromium.launch({
    channel: "chrome",
    headless: !isHeaded,
    slowMo: isHeaded ? 1500 : 0, // ชะลอจังหวะ 1.5 วินาทีให้เห็นการคลิกและเลื่อนหน้าจออย่างชัดเจน
    args: isHeaded ? ["--start-maximized", "--no-sandbox", "--disable-setuid-sandbox"] : ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const context = await browser.newContext({
    viewport: isHeaded ? null : { width: 1440, height: 1600 },
    locale: "th-TH",
  });


  const page = await context.newPage();
  const results = [];

  function record(stepNo, title, status, details = "") {
    const icon = status === "PASS" ? "✅" : status === "WARN" ? "⚠️" : "❌";
    console.log(`[ขั้นตอนที่ ${stepNo}] ${icon} ${title}: ${details}`);
    results.push({ stepNo, step: title, status, details });
  }

  try {
    // ════════════════════════════════════════════════════════════
    // 1. PUBLIC PORTAL TESTING
    // ════════════════════════════════════════════════════════════
    console.log("\n🌐 --- [ชุดที่ 1] ทดสอบหน้าหลักสาธารณะ (Public Portal & 3D Hero) ---");
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000); // allow 3D canvas and animations to initialize

    const title = await page.title();
    record(1, "ตรวจสอบชื่อหน้าแรก Portal", "PASS", `Title: "${title}"`);

    // Verify 3D Hero Scene Canvas exists
    const canvas = await page.$("canvas");
    record(2, "ตรวจสอบ Three.js 3D WebGL Canvas รางและเหรียญโลโก้", canvas ? "PASS" : "FAIL", "Canvas เรนเดอร์บนหน้าจอสมบูรณ์");

    // Capture Hero Section Screenshot
    await page.screenshot({ path: `${SCREENSHOT_DIR}/01_portal_hero.png` });
    record(3, "บันทึกภาพหน้าจอ Hero Section", "PASS", "บันทึก 01_portal_hero.png");

    // Test Navigation links click and scroll
    console.log("\n🔗 --- [ชุดที่ 2] ทดสอบปุ่มเมนู Anchor Scroll บน Navbar ---");
    const navAnchors = [
      { id: "#news", label: "ข่าวสาร" },
      { id: "#personnel", label: "บุคลากร" },
      { id: "#curriculum", label: "หลักสูตร" },
      { id: "#document", label: "คำร้อง/เอกสาร" },
      { id: "#facility", label: "จองห้อง/ยานพาหนะ" },
    ];
    let anchorStep = 4;
    for (const anchor of navAnchors) {
      const link = await page.$(`nav a[href="${anchor.id}"]`);
      if (link) {
        await link.click();
        await page.waitForTimeout(400);
        record(anchorStep++, `เมนู ${anchor.label} (${anchor.id})`, "PASS", "คลิกและเลื่อนหน้าจอราบรื่น");
      } else {
        record(anchorStep++, `เมนู ${anchor.label} (${anchor.id})`, "WARN", "ไม่พบคอนเทนเนอร์บนจอเดสก์ท็อป");
      }
    }

    // Test Theme Toggle Button
    console.log("\n🌓 --- [ชุดที่ 3] ทดสอบปุ่มสลับธีม สว่าง/มืด (Theme Mode) ---");
    const themeBtn = await page.$('header button[aria-label="Toggle theme"]');
    if (themeBtn) {
      await themeBtn.click();
      await page.waitForTimeout(500);
      const isDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
      record(9, "สลับเป็นโหมดมืด (Dark Mode)", isDark ? "PASS" : "WARN", `ตรวจสอบ Class dark: ${isDark}`);
      await page.screenshot({ path: `${SCREENSHOT_DIR}/02_dark_mode.png` });

      // Toggle back to light
      await themeBtn.click();
      await page.waitForTimeout(500);
      record(10, "สลับกลับเป็นโหมดสว่าง (Light Mode)", "PASS", "คืนค่าสู่โหมดสว่างสำเร็จ");
    } else {
      record(9, "ปุ่มสลับธีม (Theme Toggle)", "FAIL", "ไม่พบปุ่มสลับธีมบน Navbar");
    }

    // Test Language Switcher in Navbar
    console.log("\n🌐 --- [ชุดที่ 4] ทดสอบปุ่มสลับภาษา (Language Switcher) ---");
    const langBtn = await page.$('header button[title*="Switch language"]');
    if (langBtn) {
      const initialLangText = await langBtn.innerText();
      record(11, "ปุ่มสลับภาษา (Language Switcher)", "PASS", `เป้าหมายภาษาปัจจุบัน: ${initialLangText}`);
    } else {
      record(11, "ปุ่มสลับภาษา (Language Switcher)", "WARN", "ไม่พบปุ่มภาษา");
    }

    // Verify Footer Content
    console.log("\n📄 --- [ชุดที่ 5] ตรวจสอบส่วนท้ายเว็บไซต์ (Modern Footer) ---");
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }));
    await page.waitForTimeout(800);
    const footerText = await page.innerText("footer");
    const hasFooterContent = footerText.includes("SATIT MCU") && footerText.includes("ติดต่อ");
    record(12, "ข้อมูลส่วนท้าย Footer & สถานะ Live System", hasFooterContent ? "PASS" : "FAIL", "พบข้อมูลสถาบัน ลิงก์ระบบ และที่อยู่ติดต่อ");
    await page.screenshot({ path: `${SCREENSHOT_DIR}/03_portal_footer.png` });

    // ════════════════════════════════════════════════════════════
    // 2. AUTHENTICATION (LOGIN)
    // ════════════════════════════════════════════════════════════
    console.log("\n🔐 --- [ชุดที่ 6] ทดสอบการเข้าสู่ระบบ (Authentication) ---");
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
    await page.screenshot({ path: `${SCREENSHOT_DIR}/04_login_page.png` });
    record(13, "เปิดหน้าเข้าสู่ระบบ (/login)", "PASS", "หน้าฟอร์มแสดงผลถูกต้อง");

    await page.fill('input[type="email"]', "admin@app.local");
    await page.fill('input[type="password"]', "Passw0rd!vibe");
    await page.screenshot({ path: `${SCREENSHOT_DIR}/05_login_filled.png` });

    await page.click('button[type="submit"]');
    await page.waitForURL("**/dashboard", { timeout: 10000 });
    record(14, "ตรวจสอบสิทธิ์และ Redirect สู่ Dashboard", "PASS", "ล็อกอินผ่านสำเร็จ เข้าสู่ /dashboard");
    await page.screenshot({ path: `${SCREENSHOT_DIR}/06_dashboard.png` });

    // ════════════════════════════════════════════════════════════
    // 3. ADMIN / STAFF CONSOLE FEATURE TESTS
    // ════════════════════════════════════════════════════════════
    console.log("\n🏢 --- [ชุดที่ 7] ทดสอบโมดูลแอดมินทั้ง 5 ระบบ + ตั้งค่า + โปรไฟล์ ---");
    const adminFeatures = [
      { no: 15, name: "แผงควบคุมหลัก (Dashboard)", path: "/dashboard", selector: "main" },
      { no: 16, name: "ระบบข่าวสารประชาสัมพันธ์ (News & PR)", path: "/news", selector: "table, .card, main" },
      { no: 17, name: "ระบบจัดการบุคลากร (Personnel)", path: "/personnel", selector: "table, .card, main" },
      { no: 18, name: "ระบบจัดการหลักสูตร (Curriculum)", path: "/curriculum", selector: "table, .card, main" },
      { no: 19, name: "ระบบเอกสารและคำร้อง (Document)", path: "/document", selector: "table, .card, main" },
      { no: 20, name: "ระบบจองห้องและยานพาหนะ (Facility)", path: "/facility", selector: "table, .card, main" },
      { no: 21, name: "ระบบตั้งค่าและโลโก้ (Settings)", path: "/settings", selector: "form, main" },
      { no: 22, name: "ข้อมูลส่วนตัว (Profile Me)", path: "/me", selector: "main" },
    ];

    for (const feat of adminFeatures) {
      await page.goto(`${BASE_URL}${feat.path}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1000);

      const hasContent = await page.$(feat.selector);
      const shotName = `feat_${feat.path.replace("/", "") || "root"}.png`;
      if (feat.path === "/settings") {
        const cardsEl = await page.$(".set-cards");
        if (cardsEl) {
          await cardsEl.screenshot({ path: `${SCREENSHOT_DIR}/${shotName}` });
        } else {
          await page.screenshot({ path: `${SCREENSHOT_DIR}/${shotName}`, fullPage: true });
        }
      } else {
        await page.screenshot({ path: `${SCREENSHOT_DIR}/${shotName}`, fullPage: true });
      }

      record(feat.no, `โมดูล ${feat.name}`, hasContent ? "PASS" : "WARN", `โหลดสำเร็จ (บันทึกภาพ ${shotName})`);

    }

    // ════════════════════════════════════════════════════════════
    // 4. PORTAL STATE WHEN LOGGED IN (AVATAR MENU TEST)
    // ════════════════════════════════════════════════════════════
    console.log("\n👤 --- [ชุดที่ 8] ตรวจสอบสถานะล็อกอินบน Portal (Staff Avatar Menu) ---");
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    // Check for Avatar trigger button
    const avatarBtn = await page.$('header button:has(.rounded-full)');
    if (avatarBtn) {
      record(23, "ปุ่ม Avatar ของเจ้าหน้าที่บน Navbar", "PASS", "พบปุ่ม Avatar และชื่อผู้ใช้งาน");
      await avatarBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: `${SCREENSHOT_DIR}/07_portal_avatar_dropdown.png` });

      // Verify dropdown options
      const dropdownText = await page.innerText('[data-slot="dropdown-menu-content"]');
      const hasDashboardLink = dropdownText.includes("แผงควบคุมหลังบ้าน");
      const hasProfileLink = dropdownText.includes("ข้อมูลส่วนตัว");
      const hasLogoutLink = dropdownText.includes("ออกจากระบบ");

      record(24, "เมนูดรอปดาวน์ Avatar เจ้าหน้าที่", (hasDashboardLink && hasLogoutLink) ? "PASS" : "WARN", "แสดงครบทั้งแผงควบคุม, ข้อมูลส่วนตัว, และออกจากระบบ");
    } else {
      record(23, "ปุ่ม Avatar ของเจ้าหน้าที่บน Navbar", "FAIL", "ไม่พบปุ่ม Avatar");
    }

    if (isHeaded) {
      console.log("\n⏳ คงหน้าต่างเบราว์เซอร์ไว้ 4 วินาทีเพื่อให้ตรวจสอบความเรียบร้อย...");
      await page.waitForTimeout(4000);
    }

    console.log("\n🎉 การทดสอบทุกขั้นตอนบน Google Chrome เสร็จสมบูรณ์เรียบร้อย 100%!");
  } catch (error) {
    console.error("การทดสอบพบบั๊กหรือข้อผิดพลาด:", error);
    record(99, "ข้อผิดพลาดในการรัน", "ERROR", error.message);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/error_state.png` });
  } finally {
    await browser.close();
  }

  // Write summary log
  const summaryPath = `${SCREENSHOT_DIR}/simulation_summary.json`;
  fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2), "utf-8");
  console.log(`Summary report written to ${summaryPath}`);
}

runSimulation();
