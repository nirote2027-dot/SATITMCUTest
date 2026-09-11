import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import { logger } from "@/shared/lib/infra/logger";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    // Generate unique filename preserving extension
    const originalName = file.name || "upload";
    const ext = originalName.includes(".") ? originalName.split(".").pop() : "jpg";
    const filename = `${randomUUID()}.${ext}`;
    const filePath = join(uploadsDir, filename);

    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${filename}`;
    return NextResponse.json({ ok: true, url: fileUrl, filename: originalName });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    logger.error("Upload failed", { error: message });
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
