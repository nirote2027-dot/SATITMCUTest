import path from "path";
import { restoreDatabase } from "./lib/postgres-tools";

const sourceFile = path.resolve(process.cwd(), "prisma/database_backup.sql");

try {
  restoreDatabase(sourceFile);
  console.log(`\n✅ กู้คืนข้อมูลลงใน PostgreSQL เรียบร้อยแล้ว!`);
} catch (error) {
  console.error(`\n❌ เกิดข้อผิดพลาดในการกู้คืนข้อมูล:`, error instanceof Error ? error.message : error);
  process.exit(1);
}
