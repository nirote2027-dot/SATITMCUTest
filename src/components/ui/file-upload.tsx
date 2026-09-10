"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText, Loader2, Link as LinkIcon, Download } from "lucide-react";
import { toast } from "sonner";

interface FileUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  label?: string;
}

export function FileUpload({ value, onChange, label = "แนบไฟล์เอกสาร (PDF, DOCX, ZIP)" }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      toast.error("ขนาดไฟล์เกิน 20MB");
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
        toast.success("อัปโหลดไฟล์เรียบร้อยแล้ว");
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
        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 overflow-hidden text-xs">
            <FileText className="w-5 h-5 text-blue-600 shrink-0" />
            <span className="truncate font-medium text-slate-700">{value}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100"
              title="ดาวน์โหลด / เปิดไฟล์"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
              title="ลบไฟล์แนบ"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-4 text-center transition-colors bg-slate-50/50">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />

          {isUploading ? (
            <div className="flex flex-col items-center justify-center py-3 gap-2 text-slate-500 text-sm">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span>กำลังอัปโหลดไฟล์...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-1">
              <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Upload className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-600">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="font-semibold text-blue-700 hover:underline inline-flex items-center gap-1 mr-1"
                >
                  คลิกเพื่อเลือกไฟล์แนบ
                </button>
                (PDF, DOCX, ZIP ไม่เกิน 20MB)
              </div>
              <div className="pt-1 border-t border-slate-200/60 w-full flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="text-xs text-slate-500 hover:text-blue-700 inline-flex items-center gap-1 font-medium"
                >
                  <LinkIcon className="w-3 h-3" /> หรือใส่ลิงก์ไฟล์ภายนอก (URL)
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
            placeholder="https://example.com/document.pdf"
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
