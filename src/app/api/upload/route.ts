import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import { auth } from "@/features/identity/server";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB limit
const ALLOWED_MIME_TYPES: Record<string, string[]> = {
  "image/jpeg": ["jpg", "jpeg"],
  "image/png": ["png"],
  "image/webp": ["webp"],
  "image/gif": ["gif"],
  "application/pdf": ["pdf"],
};

export async function POST(req: NextRequest) {
  try {
    // 1. Authentication check
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ ok: false, error: "Unauthorized: กรุณาเข้าสู่ระบบก่อนอัปโหลดไฟล์" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
    }

    // 2. File size limit
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ ok: false, error: "File size exceeds 10MB limit (ขนาดไฟล์เกิน 10MB)" }, { status: 400 });
    }

    // 3. MIME type whitelist check
    const mimeType = file.type?.toLowerCase() || "";
    const allowedExtensions = ALLOWED_MIME_TYPES[mimeType];
    if (!allowedExtensions) {
      return NextResponse.json(
        { ok: false, error: "ประเภทไฟล์ไม่ได้รับอนุญาต (อนุญาตเฉพาะ JPG, PNG, WEBP, GIF, PDF)" },
        { status: 400 }
      );
    }

    // 4. Safe extension extraction
    const rawExt = (file.name?.split(".").pop() || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const ext = allowedExtensions.includes(rawExt) ? rawExt : allowedExtensions[0];
    const filename = `${randomUUID()}.${ext}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 5. Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const filePath = join(uploadsDir, filename);
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${filename}`;
    return NextResponse.json({ ok: true, url: fileUrl, filename: file.name || filename });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ ok: false, error: error?.message || "Upload failed" }, { status: 500 });
  }
}
