import path from "path";
import { exportDatabase } from "./lib/postgres-tools";

const targetFile = path.resolve(process.cwd(), "prisma/database_backup.sql");

try {
  exportDatabase(targetFile);
  console.log(`\n✅ สำรองข้อมูลฐานข้อมูลเรียบร้อยแล้ว: prisma/database_backup.sql`);
} catch (error) {
  console.error(`\n❌ เกิดข้อผิดพลาดในการสำรองข้อมูล:`, error instanceof Error ? error.message : error);
  process.exit(1);
}
