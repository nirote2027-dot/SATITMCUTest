"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2, Link as LinkIcon, AlertTriangle, RefreshCw, Check } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  aspect?: "cover" | "contain";
  position?: "top" | "center" | "bottom" | string; // e.g. "center", "top", "bottom"
  onPositionChange?: (position: "top" | "center" | "bottom") => void;
}

export function ImageUpload({
  value,
  onChange,
  label = "รูปภาพประกอบ / แนบไฟล์รูป",
  placeholder = "อัปโหลดรูปภาพ หรือระบุ URL",
  aspect = "cover",
  position = "center",
  onPositionChange,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState("");
  const [directFallbackUrl, setDirectFallbackUrl] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("ขนาดไฟล์เกิน 5MB กรุณาเลือกไฟล์ที่มีขนาดเล็กลง");
      return;
    }

    setIsUploading(true);
    setHasError(false);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.ok && data.url) {
        onChange(data.url);
        setShowUrlInput(false);
        setDirectFallbackUrl(null);
        toast.success("อัปโหลดรูปภาพเรียบร้อยแล้ว");
      } else {
        toast.error(data.error || "เกิดข้อผิดพลาดในการอัปโหลด");
      }
    } catch (err: any) {
      toast.error("ไม่สามารถอัปโหลดไฟล์ได้");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleApplyUrl = async (forceDirect = false) => {
    const raw = (forceDirect && directFallbackUrl ? directFallbackUrl : urlInputValue)
      .trim()
      .replace(/^['"]|['"]$/g, "");

    if (!raw) {
      toast.error("กรุณาระบุ URL รูปภาพก่อนกดตกลง");
      return;
    }

    if (forceDirect || raw.startsWith("/uploads/") || raw.startsWith("data:image/")) {
      setHasError(false);
      onChange(raw);
      toast.success("นำรูปภาพมาใช้เรียบร้อยแล้ว");
      setUrlInputValue("");
      setDirectFallbackUrl(null);
      setShowUrlInput(false);
      return;
    }

    setIsFetchingUrl(true);
    setHasError(false);
    setDirectFallbackUrl(null);

    try {
      const res = await fetch("/api/upload/from-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: raw }),
      });

      const data = await res.json();
      if (data.ok && data.url) {
        onChange(data.url);
        toast.success("ดึงและบันทึกรูปภาพเข้าสู่ระบบเรียบร้อยแล้ว");
        setUrlInputValue("");
        setDirectFallbackUrl(null);
        setShowUrlInput(false);
      } else {
        toast.error(data.error || "ไม่สามารถดึงรูปภาพจากลิงก์ได้", { duration: 6000 });
        setDirectFallbackUrl(raw);
      }
    } catch (err: any) {
      toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์", { duration: 5000 });
      setDirectFallbackUrl(raw);
    } finally {
      setIsFetchingUrl(false);
    }
  };

  return (
    <div className="space-y-2.5">
      {label && <label className="text-xs font-semibold text-slate-700 block">{label}</label>}

      {value ? (
        <div className="space-y-2">
          <div className="relative group rounded-xl border border-slate-200 overflow-hidden bg-slate-100 flex items-center justify-center max-h-56">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Cover Preview"
              referrerPolicy="no-referrer"
              onError={() => setHasError(true)}
              style={{ objectPosition: position }}
              className={
                aspect === "contain"
                  ? "object-contain w-full h-44 max-h-56 p-2"
                  : "object-cover w-full h-48 max-h-56 transition-all"
              }
            />

            {/* Error Overlay if image fails to load */}
            {hasError && (
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center text-white text-xs gap-1.5 z-10">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
                <span className="font-semibold text-amber-200">ไม่สามารถโหลดรูปภาพจากลิงก์นี้ได้</span>
                <span className="text-[11px] text-slate-300 max-w-sm">
                  หากเป็นรูปจาก Facebook กรุณาคลิกขวาที่ตัวรูปภาพ แล้วเลือก &quot;คัดลอกที่อยู่รูปภาพ (Copy image address)&quot;
                </span>
              </div>
            )}

            {/* Action buttons on hover */}
            <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity z-20">
              <button
                type="button"
                onClick={() => {
                  setUrlInputValue(value);
                  setShowUrlInput(true);
                }}
                className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-white shadow-md text-xs inline-flex items-center gap-1 px-2.5 backdrop-blur-xs transition-colors"
                title="เปลี่ยนรูปภาพหรือแก้ไขลิงก์"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>เปลี่ยนรูป</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setHasError(false);
                }}
                className="p-1.5 rounded-lg bg-red-600/90 hover:bg-red-700 text-white shadow-md transition-colors"
                title="ลบรูปภาพนี้"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Focal Position Adjustment (Top / Center / Bottom) */}
          {onPositionChange && (
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                <span>เลื่อนปรับจุดโฟกัสรูปหน้าปก:</span>
              </span>
              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
                {(
                  [
                    { label: "บน", val: "top" },
                    { label: "กึ่งกลาง", val: "center" },
                    { label: "ล่าง", val: "bottom" },
                  ] as const
                ).map((pos) => (
                  <button
                    key={pos.val}
                    type="button"
                    onClick={() => onPositionChange(pos.val)}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      position === pos.val
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {/* Main Upload Box */}
          <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-5 text-center transition-colors bg-slate-50/50">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />

            {isUploading ? (
              <div className="flex flex-col items-center justify-center py-4 gap-2 text-slate-500 text-sm">
                <Loader2 className="w-7 h-7 animate-spin text-blue-600" />
                <span className="font-medium text-xs">กำลังอัปโหลดรูปภาพเข้าสู่ระบบ...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-2xs">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-600 font-medium">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="font-bold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1 mr-1 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" /> คลิกเพื่ออัปโหลดไฟล์รูปภาพ
                    </button>
                    <span>หรือลากไฟล์มาวางที่นี่</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    รองรับ JPG, PNG, WEBP ขนาดไม่เกิน 5MB
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 w-full flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    className="text-xs text-slate-600 hover:text-blue-600 inline-flex items-center gap-1.5 font-semibold py-1 px-2.5 rounded-lg hover:bg-blue-50/60 transition-colors cursor-pointer"
                  >
                    <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
                    <span>{showUrlInput ? "ซ่อนกล่องใส่ลิงก์ URL" : "หรือคลิกเพื่อใส่ลิงก์รูปภาพ (URL / Facebook)"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* URL Input Box (Available both when empty or when user wants to change URL) */}
      {showUrlInput && (
        <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 space-y-2 animate-in fade-in-50 duration-200">
          <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
            <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>ใส่ลิงก์ URL รูปภาพ (Direct Image Link / Facebook Image):</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="url"
              value={urlInputValue}
              onChange={(e) => setUrlInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleApplyUrl();
                }
              }}
              placeholder="วางลิงก์รูปภาพ เช่น https://... หรือลิงก์รูปภาพจาก Facebook"
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-blue-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-2xs"
            />
            <button
              type="button"
              disabled={isFetchingUrl}
              onClick={() => handleApplyUrl(false)}
              className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 disabled:opacity-60 transition-colors shadow-xs shrink-0 inline-flex items-center gap-1.5 cursor-pointer"
            >
              {isFetchingUrl ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>กำลังดึงรูปภาพ...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>ดึงและใช้รูปนี้</span>
                </>
              )}
            </button>
          </div>

          {/* Fallback button if server-side fetch failed */}
          {directFallbackUrl && (
            <div className="flex items-center justify-between p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-800">
              <span>ต้องการใช้ URL นี้โดยตรงโดยไม่ต้องดาวน์โหลดหรือไม่?</span>
              <button
                type="button"
                onClick={() => handleApplyUrl(true)}
                className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-md text-[11px] cursor-pointer"
              >
                ใช้ลิงก์นี้โดยตรง
              </button>
            </div>
          )}

          <div className="text-[11px] text-slate-500 leading-relaxed bg-white/80 p-2.5 rounded-lg border border-blue-100">
            💡 <strong>คำแนะนำการนำรูปลิงก์จาก Facebook มาใช้:</strong>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
              <li><strong>วิธีที่แนะนำที่สุด:</strong> คลิกขวาที่ตัวรูปภาพใน Facebook แล้วเลือก <strong>&quot;คัดลอกที่อยู่รูปภาพ&quot; (Copy image address)</strong> แล้วนำมาวาง</li>
              <li>หรือวางลิงก์โพสต์ Facebook ระบบจะพยายามค้นหาและดึงรูปภาพมาบันทึกเข้าสู่เครื่องให้อัตโนมัติ</li>
              <li>หากเป็นโพสต์ที่ตั้งค่าความเป็นส่วนตัวเฉพาะกลุ่ม/เพื่อน อาจต้องดาวน์โหลดรูปภาพลงเครื่องก่อน แล้วกดอัปโหลดไฟล์โดยตรงครับ</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
