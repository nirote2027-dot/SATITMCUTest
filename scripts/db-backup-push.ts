import { execSync } from "child_process";
import path from "path";
import { exportDatabase } from "./lib/postgres-tools";

const targetFile = path.resolve(process.cwd(), "prisma/database_backup.sql");

async function main() {
  console.log("==================================================");
  console.log("🚀 เริ่มต้นกระบวนการสำรองฐานข้อมูลและ Push ขึ้น GitHub");
  console.log("==================================================\n");

  // Step 1: Dump Database
  console.log("📦 สเต็ปที่ 1: ดึงข้อมูลจาก PostgreSQL...");
  exportDatabase(targetFile);

  // Check arguments for custom URL or commit message
  const args = process.argv.slice(2);
  let customUrl = "";
  const messageParts: string[] = [];
  for (const arg of args) {
    if (/^(https?:\/\/|git@)/i.test(arg.trim())) {
      customUrl = arg.trim();
    } else {
      messageParts.push(arg);
    }
  }

  if (customUrl) {
    console.log(`🔗 กำหนด remote origin เป็น: ${customUrl}`);
    try {
      execSync(`git remote set-url origin "${customUrl}"`, { stdio: "ignore" });
    } catch {
      execSync(`git remote add origin "${customUrl}"`, { stdio: "ignore" });
    }
  }

  // Step 2: Git Add
  console.log("\n📁 สเต็ปที่ 2: เตรียมไฟล์สำหรับ Git Commit...");
  execSync("git add -A", { stdio: "inherit" });

  // Check if any changes to commit
  const statusOutput = execSync("git status --porcelain", { encoding: "utf-8" }).trim();
  if (statusOutput) {
    const customMessage = messageParts.join(" ").trim();
    const dateStr = new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });
    const commitMsg = customMessage || `backup: sync database snapshot and code (${dateStr})`;

    console.log(`\n💾 สเต็ปที่ 3: บันทึก Git Commit: "${commitMsg}"...`);
    execSync(`git commit -m "${commitMsg}"`, { stdio: "inherit" });
  } else {
    console.log("ℹ️ ไม่พบการเปลี่ยนแปลงไฟล์ใหม่");
  }

  // Step 4: Push to GitHub
  console.log("\n☁️ สเต็ปที่ 4: Push ขึ้น GitHub (origin main)...");
  execSync("git push -u origin main", { stdio: "inherit" });

  console.log("\n==================================================");
  console.log("🎉 สำเร็จเรียบร้อย! ฐานข้อมูลและโค้ดถูกอัปโหลดขึ้น GitHub แล้ว");
  console.log("👉 ในเครื่องอื่น สามารถรัน 'npm run db:restore' เพื่อนำข้อมูลเข้าสู่ระบบได้ทันที");
  console.log("==================================================\n");
}

main().catch((err) => {
  console.error("\n❌ ล้มเหลว:", err instanceof Error ? err.message : err);
  process.exit(1);
});
