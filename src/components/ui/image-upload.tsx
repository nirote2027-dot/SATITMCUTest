"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  aspect?: "cover" | "contain";
}

export function ImageUpload({ value, onChange, label = "รูปภาพประกอบ / แนบไฟล์รูป", placeholder = "อัปโหลดรูปภาพ หรือระบุ URL", aspect = "cover" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState("");
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

  const handleApplyUrl = () => {
    if (urlInputValue.trim()) {
      onChange(urlInputValue.trim());
      setUrlInputValue("");
      setShowUrlInput(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-semibold text-slate-700 block">{label}</label>}

      {value ? (
        <div className="relative group rounded-xl border border-slate-200 overflow-hidden bg-slate-100 flex items-center justify-center max-h-48">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className={aspect === "contain" ? "object-contain w-full h-36 max-h-48 p-2" : "object-cover w-full h-40 max-h-48"}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 shadow-md transition-all opacity-90 group-hover:opacity-100"
            title="ลบรูปภาพ"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-4 text-center transition-colors bg-slate-50/50">
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
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span>กำลังอัปโหลดรูปภาพ...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-2">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-600">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="font-semibold text-blue-700 hover:underline inline-flex items-center gap-1 mr-1"
                >
                  <Upload className="w-3.5 h-3.5" /> คลิกเพื่อเลือกไฟล์
                </button>
                หรือลากไฟล์มาวาง (สูงสุด 5MB)
              </div>
              <div className="pt-2 border-t border-slate-200/60 w-full flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="text-xs text-slate-500 hover:text-blue-700 inline-flex items-center gap-1 font-medium"
                >
                  <LinkIcon className="w-3 h-3" /> หรือใส่ลิงก์รูปภาพ (Image URL)
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {showUrlInput && !value && (
        <div className="flex items-center gap-2 pt-1">
          <input
            type="url"
            value={urlInputValue}
            onChange={(e) => setUrlInputValue(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-3 py-1.5 rounded-lg bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800"
          >
            ตกลง
          </button>
        </div>
      )}
    </div>
  );
}
