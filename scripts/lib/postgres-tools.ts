import "dotenv/config";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export interface PostgresConfig {
  user: string;
  pass: string;
  host: string;
  port: string;
  database: string;
}

export function parseDatabaseUrl(): PostgresConfig {
  const rawUrl = process.env.DATABASE_URL;
  if (!rawUrl) {
    throw new Error("ไม่พบ DATABASE_URL ในไฟล์ .env");
  }

  // Parse postgres:// or postgresql:// URL
  const parsed = new URL(rawUrl);
  return {
    user: decodeURIComponent(parsed.username || "postgres"),
    pass: decodeURIComponent(parsed.password || ""),
    host: parsed.hostname || "localhost",
    port: parsed.port || "5432",
    database: parsed.pathname.replace(/^\//, "") || "ums_dev",
  };
}

export function findPostgresBin(binName: "pg_dump" | "psql"): string {
  // 1. Try PATH
  try {
    const whichCmd = process.platform === "win32" ? `where.exe ${binName}` : `which ${binName}`;
    const output = execSync(whichCmd, { stdio: ["ignore", "pipe", "ignore"], encoding: "utf-8" }).trim();
    if (output) {
      const firstLine = output.split(/\r?\n/)[0].trim();
      if (fs.existsSync(firstLine)) return firstLine;
    }
  } catch {
    // Not in PATH, fallback to search common directories
  }

  // 2. Search common Windows directories
  if (process.platform === "win32") {
    const versions = ["18", "17", "16", "15", "14"];
    const basePaths = [
      "C:\\Program Files\\PostgreSQL",
      "C:\\Program Files (x86)\\PostgreSQL",
    ];

    for (const base of basePaths) {
      for (const ver of versions) {
        const candidate = path.join(base, ver, "bin", `${binName}.exe`);
        if (fs.existsSync(candidate)) {
          return candidate;
        }
      }
    }
  }

  throw new Error(
    `ไม่พบโปรแกรม ${binName} ในระบบ กรุณาตรวจสอบว่าได้ติดตั้ง PostgreSQL และเพิ่ม bin ไว้ใน PATH หรือโฟลเดอร์ Program Files`
  );
}

export function exportDatabase(outputFilePath: string): void {
  const config = parseDatabaseUrl();
  const pgDump = findPostgresBin("pg_dump");

  console.log(`[db:backup] กำลังดึงข้อมูลจากฐานข้อมูล ${config.database}...`);
  console.log(`[db:backup] ใช้โปรแกรม: ${pgDump}`);

  const env = { ...process.env, PGPASSWORD: config.pass };
  const cmd = `"${pgDump}" -U ${config.user} -h ${config.host} -p ${config.port} -d ${config.database} -f "${outputFilePath}" --clean --if-exists`;

  execSync(cmd, { env, stdio: "inherit" });
  console.log(`[db:backup] บันทึกไฟล์ฐานข้อมูลสำเร็จ: ${outputFilePath}`);
}

export function restoreDatabase(inputFilePath: string): void {
  if (!fs.existsSync(inputFilePath)) {
    throw new Error(`ไม่พบไฟล์สำรองฐานข้อมูล: ${inputFilePath}`);
  }

  const config = parseDatabaseUrl();
  const psql = findPostgresBin("psql");

  console.log(`[db:restore] กำลังกู้คืนฐานข้อมูล ${config.database} จากไฟล์ ${inputFilePath}...`);
  console.log(`[db:restore] ใช้โปรแกรม: ${psql}`);

  const env = { ...process.env, PGPASSWORD: config.pass };
  const cmd = `"${psql}" -U ${config.user} -h ${config.host} -p ${config.port} -d ${config.database} -f "${inputFilePath}"`;

  execSync(cmd, { env, stdio: "inherit" });
  console.log(`[db:restore] กู้คืนฐานข้อมูลสำเร็จเรียบร้อยแล้ว!`);
}
