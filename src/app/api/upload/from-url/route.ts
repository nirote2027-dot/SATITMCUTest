import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import { auth } from "@/features/identity/server";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB limit
const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/avif": "avif",
};

function unescapeHtml(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#x2F;/g, "/");
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { ok: false, error: "กรุณาเข้าสู่ระบบก่อนทำรายการ" },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const rawUrl = typeof body?.url === "string" ? body.url.trim().replace(/^['"]|['"]$/g, "") : "";

    if (!rawUrl) {
      return NextResponse.json({ ok: false, error: "กรุณาระบุ URL รูปภาพ" }, { status: 400 });
    }

    // If it's already an uploaded file on our local server
    if (rawUrl.startsWith("/uploads/")) {
      return NextResponse.json({ ok: true, url: rawUrl });
    }

    if (!rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
      return NextResponse.json({ ok: false, error: "URL ต้องขึ้นต้นด้วย http:// หรือ https://" }, { status: 400 });
    }

    let targetImageUrl = rawUrl;

    // Detect if this is a Facebook post/photo webpage rather than a direct image link
    const isFacebookDomain = rawUrl.includes("facebook.com") || rawUrl.includes("fb.watch") || rawUrl.includes("fb.me");
    const isFbCdn = rawUrl.includes("fbcdn.net");
    const isDirectImage = Boolean(rawUrl.match(/\.(jpg|jpeg|png|webp|gif|svg|avif)($|\?)/i));

    if (isFacebookDomain && !isFbCdn && !isDirectImage) {
      // Try to fetch the Facebook page to extract OpenGraph og:image
      try {
        const pageRes = await fetch(rawUrl, {
          headers: {
            "User-Agent": "facebookexternalhit/1.1 (+https://www.facebook.com/externalhit_uatext.php)",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          },
          redirect: "follow",
          signal: AbortSignal.timeout(8000),
        });

        if (pageRes.ok) {
          const html = await pageRes.text();
          // Find og:image or og:image:secure_url or twitter:image
          const ogMatch =
            html.match(/<meta\s+property=["']og:image(?::secure_url)?["']\s+content=["']([^"']+)["']/i) ||
            html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image(?::secure_url)?["']/i) ||
            html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i);

          if (ogMatch && ogMatch[1]) {
            targetImageUrl = unescapeHtml(ogMatch[1]);
          }
        }
      } catch (err) {
        console.warn("Could not extract OG image from FB page, attempting direct fetch:", err);
      }
    }

    // Now fetch the actual image binary
    const imageHeaders: Record<string, string> = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    };

    if (targetImageUrl.includes("facebook.com") || targetImageUrl.includes("fbcdn.net")) {
      imageHeaders["Referer"] = "https://www.facebook.com/";
    }

    const imgRes = await fetch(targetImageUrl, {
      headers: imageHeaders,
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });

    if (!imgRes.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: `เซิร์ฟเวอร์ภายนอกปฏิเสธการเข้าถึง (HTTP ${imgRes.status}) อาจเกิดจากโพสต์เป็นแบบส่วนตัว หรือลิงก์หมดอายุ`,
        },
        { status: 400 }
      );
    }

    const contentType = (imgRes.headers.get("content-type") || "").toLowerCase().split(";")[0].trim();

    // Check if the response is actually an image
    if (!contentType.startsWith("image/")) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "ลิงก์นี้เปิดไปยังหน้าเว็บไซต์ไม่ใช่ไฟล์รูปภาพ กรุณาคลิกขวาที่ตัวรูปภาพใน Facebook แล้วเลือก 'คัดลอกที่อยู่รูปภาพ' (Copy image address) หรือบันทึกรูปลงเครื่องแล้วอัปโหลดไฟล์ครับ",
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await imgRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length > MAX_FILE_SIZE) {
      return NextResponse.json({ ok: false, error: "ขนาดรูปภาพเกิน 10MB ไม่สามารถบันทึกได้" }, { status: 400 });
    }

    let ext = MIME_TO_EXT[contentType];
    if (!ext) {
      // Try guessing from URL
      const urlExtMatch = targetImageUrl.match(/\.(jpg|jpeg|png|webp|gif|svg|avif)($|\?)/i);
      ext = urlExtMatch ? urlExtMatch[1].toLowerCase() : "jpg";
    }

    const filename = `${randomUUID()}.${ext}`;
    const uploadsDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const filePath = join(uploadsDir, filename);
    await writeFile(filePath, buffer);

    const savedUrl = `/uploads/${filename}`;
    return NextResponse.json({ ok: true, url: savedUrl, originalUrl: rawUrl });
  } catch (error: any) {
    console.error("from-url upload error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error?.message?.includes("timed out")
          ? "การเชื่อมต่อไปยังลิงก์ใช้เวลานานเกินไป กรุณาลองใหม่อีกครั้ง หรือบันทึกรูปลงเครื่องแล้วอัปโหลดไฟล์ครับ"
          : error?.message || "ไม่สามารถดึงรูปภาพจากลิงก์ได้",
      },
      { status: 500 }
    );
  }
}
