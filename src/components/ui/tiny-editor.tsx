"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Loader2,
  Image as ImageIcon,
  Video,
  Table as TableIcon,
  Upload,
  Link as LinkIcon,
  X,
  Check,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";

// Dynamically import TinyMCE Editor to avoid SSR issues
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-72 rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-2 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span className="text-xs">กำลังโหลดเครื่องมือแก้ไขข้อความ (Tiny Editor)...</span>
      </div>
    ),
  }
);

interface TinyEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
  disabled?: boolean;
}

export function TinyEditor({
  value,
  onChange,
  placeholder = "พิมพ์เนื้อหาข่าวที่นี่...",
  height = 340,
  disabled = false,
}: TinyEditorProps) {
  const [mounted, setMounted] = useState(false);
  const editorRef = useRef<any>(null);

  // Quick Action Tool states
  const [activeTool, setActiveTool] = useState<"none" | "image" | "media">("none");
  const [imageTab, setImageTab] = useState<"file" | "url">("file");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [mediaInput, setMediaInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.(".tox-tinymce-aux, .tox-dialog, .tox-dialog-wrap, .moxman-window")) {
        e.stopImmediatePropagation();
      }
    };

    document.addEventListener("focusin", handleFocusIn, true);
    return () => {
      document.removeEventListener("focusin", handleFocusIn, true);
    };
  }, []);

  // Helper to insert content safely at cursor
  const insertHtmlToEditor = (html: string) => {
    if (editorRef.current) {
      editorRef.current.insertContent(html);
      editorRef.current.focus();
    } else {
      onChange((value || "") + "\n" + html);
    }
  };

  // 1. Handle File Upload for TinyEditor
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("ขนาดไฟล์เกิน 5MB กรุณาเลือกไฟล์ที่มีขนาดเล็กลง");
      return;
    }

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.ok && json.url) {
        insertHtmlToEditor(
          `<p><img src="${json.url}" alt="รูปภาพเนื้อหาข่าว" referrerpolicy="no-referrer" style="max-width: 100%; height: auto; border-radius: 12px; display: block; margin: 16px auto; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" /></p>`
        );
        toast.success("แทรกรูปภาพลงในเนื้อหาข่าวเรียบร้อย");
        setActiveTool("none");
      } else {
        toast.error(json.error || "เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
      }
    } catch {
      toast.error("ไม่สามารถอัปโหลดไฟล์ได้");
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // 2. Handle URL Image Insert
  const handleInsertImageUrl = () => {
    const raw = imageUrl.trim().replace(/^['"]|['"]$/g, "");
    if (!raw) {
      toast.error("กรุณาระบุ URL รูปภาพก่อนแทรก");
      return;
    }

    insertHtmlToEditor(
      `<p><img src="${raw}" alt="รูปภาพเนื้อหาข่าว" referrerpolicy="no-referrer" style="max-width: 100%; height: auto; border-radius: 12px; display: block; margin: 16px auto; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" /></p>`
    );
    toast.success("แทรกรูปภาพจากลิงก์ลงในเนื้อหาข่าวเรียบร้อย");
    setImageUrl("");
    setActiveTool("none");
  };

  // 3. Handle Media / Video / Facebook Embed
  const handleInsertMedia = () => {
    const raw = mediaInput.trim();
    if (!raw) {
      toast.error("กรุณาระบุลิงก์หรือโค้ด Embed ก่อน");
      return;
    }

    // Case A: Raw iframe code pasted
    if (raw.includes("<iframe")) {
      const safeHtml = `<div class="media-embed-wrap my-4 flex justify-center" style="margin: 16px 0; display: flex; justify-content: center;">${raw}</div>`;
      insertHtmlToEditor(safeHtml);
      toast.success("ฝังโค้ดวิดีโอ/โพสต์ลงในเนื้อหาเรียบร้อย");
      setMediaInput("");
      setActiveTool("none");
      return;
    }

    // Case B: YouTube URL
    const youtubeMatch = raw.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i);
    if (youtubeMatch && youtubeMatch[1]) {
      const videoId = youtubeMatch[1];
      const ytHtml = `
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 16px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <iframe src="https://www.youtube.com/embed/${videoId}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      `;
      insertHtmlToEditor(ytHtml);
      toast.success("ฝังวิดีโอ YouTube ลงในเนื้อหาเรียบร้อย");
      setMediaInput("");
      setActiveTool("none");
      return;
    }

    // Case C: Facebook Post / Video URL
    if (raw.includes("facebook.com")) {
      const fbEmbedUrl = `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(raw)}&show_text=true&width=500`;
      const fbHtml = `
        <div style="display: flex; justify-content: center; margin: 16px 0;">
          <iframe src="${fbEmbedUrl}" width="500" height="600" style="border:none;overflow:hidden;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);max-width:100%;" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        </div>
      `;
      insertHtmlToEditor(fbHtml);
      toast.success("ฝังโพสต์ / วิดีโอ Facebook ลงในเนื้อหาเรียบร้อย");
      setMediaInput("");
      setActiveTool("none");
      return;
    }

    // Default Fallback: Create iframe or link
    const genericHtml = `
      <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 16px 0;">
        <iframe src="${raw}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
      </div>
    `;
    insertHtmlToEditor(genericHtml);
    toast.success("ฝังมีเดียลงในเนื้อหาเรียบร้อย");
    setMediaInput("");
    setActiveTool("none");
  };

  // 4. Handle Quick Table Insert
  const handleInsertTable = () => {
    const tableHtml = `
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden;">
        <thead>
          <tr style="background-color: #f1f5f9;">
            <th style="border: 1px solid #cbd5e1; padding: 10px 14px; text-align: left; font-weight: 700; color: #1e293b;">ลำดับ</th>
            <th style="border: 1px solid #cbd5e1; padding: 10px 14px; text-align: left; font-weight: 700; color: #1e293b;">รายการ / รายละเอียด</th>
            <th style="border: 1px solid #cbd5e1; padding: 10px 14px; text-align: left; font-weight: 700; color: #1e293b;">หมายเหตุ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #cbd5e1; padding: 8px 14px;">1</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px 14px;">ระบุรายละเอียดข้อมูลที่นี่...</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px 14px;">-</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="border: 1px solid #cbd5e1; padding: 8px 14px;">2</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px 14px;">ระบุรายละเอียดข้อมูลที่นี่...</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px 14px;">-</td>
          </tr>
        </tbody>
      </table>
      <p></p>
    `;
    insertHtmlToEditor(tableHtml);
    toast.success("แทรกตารางลงในเนื้อหาข่าวเรียบร้อย");
  };

  if (!mounted) {
    return (
      <div
        style={{ height }}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-2 text-slate-400"
      >
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span className="text-xs">กำลังโหลด Tiny Editor...</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* ═══ 1. QUICK ACTION TOOLBAR (แทรกรูปภาพ / ฝังวิดีโอ / ตาราง ได้ทันที) ═══ */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-100/90 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-bold text-slate-700 mr-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>เครื่องมือด่วน:</span>
          </span>

          {/* Quick Insert Image Button */}
          <button
            type="button"
            onClick={() => setActiveTool(activeTool === "image" ? "none" : "image")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTool === "image"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 shadow-2xs"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-blue-500" />
            <span>+ แทรกรูปภาพ (ไฟล์/Facebook)</span>
          </button>

          {/* Quick Embed Media / Facebook Button */}
          <button
            type="button"
            onClick={() => setActiveTool(activeTool === "media" ? "none" : "media")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTool === "media"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 shadow-2xs"
            }`}
          >
            <Video className="w-3.5 h-3.5 text-indigo-500" />
            <span>+ ฝังวิดีโอ / โพสต์ Facebook / YouTube</span>
          </button>

          {/* Quick Insert Table Button */}
          <button
            type="button"
            onClick={handleInsertTable}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 shadow-2xs transition-all cursor-pointer"
          >
            <TableIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>+ แทรกตาราง</span>
          </button>
        </div>

        <span className="text-[11px] text-slate-400 hidden sm:inline">
          คลิกเลือกจุดในเนื้อหา แล้วกดแทรกได้ทันที
        </span>
      </div>

      {/* ═══ 2. QUICK TOOL PANEL: แทรกรูปภาพ ═══ */}
      {activeTool === "image" && (
        <div className="p-3.5 bg-blue-50/80 rounded-xl border border-blue-200 space-y-3 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-blue-900">แทรกรูปภาพลงในเนื้อหาข่าว:</span>
              <div className="inline-flex p-0.5 bg-white rounded-lg border border-blue-200 text-xs">
                <button
                  type="button"
                  onClick={() => setImageTab("file")}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    imageTab === "file" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  อัปโหลดไฟล์จากเครื่อง
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab("url")}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    imageTab === "url" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  วางลิงก์รูปภาพ (URL / Facebook)
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveTool("none")}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-blue-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {imageTab === "file" ? (
            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isUploadingImage}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingImage}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                {isUploadingImage ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                <span>{isUploadingImage ? "กำลังอัปโหลดและแทรกลงเนื้อหา..." : "เลือกไฟล์รูปภาพจากคอมพิวเตอร์"}</span>
              </button>
              <span className="text-[11px] text-slate-500">รองรับไฟล์ JPG, PNG, WEBP (สูงสุด 5MB)</span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleInsertImageUrl();
                    }
                  }}
                  placeholder="วาง URL รูปภาพ เช่น https://... หรือคลิกขวาที่รูปใน Facebook แล้วเลือก 'คัดลอกที่อยู่รูปภาพ'"
                  className="flex-1 text-xs px-3 py-2 rounded-xl border border-blue-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleInsertImageUrl}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold inline-flex items-center gap-1 shadow-xs transition-colors shrink-0 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>แทรกลงเนื้อหา</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                💡 <strong>วิธีคัดลอกรูปจาก Facebook:</strong> คลิกขวาที่รูปภาพใน Facebook แล้วเลือก <em>&quot;คัดลอกที่อยู่รูปภาพ&quot; (Copy image address)</em>
              </p>
            </div>
          )}
        </div>
      )}

      {/* ═══ 3. QUICK TOOL PANEL: ฝังวิดีโอ / Facebook / YouTube ═══ */}
      {activeTool === "media" && (
        <div className="p-3.5 bg-indigo-50/80 rounded-xl border border-indigo-200 space-y-3 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-indigo-900 flex items-center gap-1.5">
              <Video className="w-4 h-4 text-indigo-600" />
              <span>ฝังวิดีโอ YouTube หรือ โพสต์/คลิป Facebook ลงในเนื้อหาข่าว:</span>
            </span>
            <button
              type="button"
              onClick={() => setActiveTool("none")}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-indigo-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={mediaInput}
              onChange={(e) => setMediaInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleInsertMedia();
                }
              }}
              placeholder="วางลิงก์โพสต์ Facebook, ลิงก์ YouTube หรือโค้ด <iframe>...</iframe>"
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-indigo-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 shadow-2xs"
            />
            <button
              type="button"
              onClick={handleInsertMedia}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center gap-1 shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>ฝังลงเนื้อหาข่าว</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-600 bg-white/80 p-2.5 rounded-lg border border-indigo-100 leading-relaxed">
            ✨ <strong>รูปแบบที่ระบบรองรับอัตโนมัติ:</strong>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-500">
              <li><strong>Facebook:</strong> คัดลอกลิงก์โพสต์หรือวิดีโอ (เช่น <code>https://www.facebook.com/...</code>) นำมาวางได้เลย ระบบจะแปลงเป็น Embed ให้โดยอัตโนมัติ</li>
              <li><strong>YouTube:</strong> ลิงก์คลิป เช่น <code>https://youtu.be/...</code> หรือ <code>https://www.youtube.com/watch?v=...</code></li>
              <li><strong>โค้ด Embed:</strong> โค้ด <code>&lt;iframe ...&gt;&lt;/iframe&gt;</code> ที่คัดลอกมาจากเมนู &quot;ฝัง / Embed&quot; ของ Facebook หรือเว็บไซต์ต่างๆ</li>
            </ul>
          </div>
        </div>
      )}

      {/* ═══ 4. MAIN TINYMCE EDITOR ═══ */}
      <div className="rounded-xl overflow-hidden border border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-xs">
        <Editor
          tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.8.5/tinymce.min.js"
          value={value}
          disabled={disabled}
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          onEditorChange={(content) => onChange(content)}
          init={{
            height,
            menubar: false,
            statusbar: true,
            branding: false,
            promotion: false,
            placeholder,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "media",
              "emoticons",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "table",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | bold italic underline forecolor | " +
              "alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | image media link emoticons table | removeformat code fullscreen",
            image_caption: true,
            image_advtab: true,
            automatic_uploads: true,
            media_live_embeds: true,
            images_upload_handler: async (blobInfo: any) => {
              try {
                const formData = new FormData();
                formData.append("file", blobInfo.blob(), blobInfo.filename());
                const res = await fetch("/api/upload", {
                  method: "POST",
                  body: formData,
                });
                const json = await res.json();
                if (json.ok && json.url) {
                  return json.url;
                }
                throw new Error(json.error || "Upload failed");
              } catch (err: any) {
                throw new Error(err.message || "Failed to upload image");
              }
            },
            content_style: `
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Sarabun', sans-serif;
                font-size: 14px;
                line-height: 1.65;
                color: #1e293b;
                padding: 12px;
              }
              p { margin-bottom: 0.75rem; }
              h1, h2, h3, h4 { font-weight: 700; margin-top: 1rem; margin-bottom: 0.5rem; color: #0f172a; }
              img { max-width: 100%; height: auto; border-radius: 8px; margin: 8px auto; display: block; }
              iframe { max-width: 100%; border-radius: 8px; margin: 12px auto; display: block; }
              table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
              table td, table th { border: 1px solid #cbd5e1; padding: 6px 10px; }
              table th { background-color: #f1f5f9; }
            `,
          }}
        />
      </div>
    </div>
  );
}
