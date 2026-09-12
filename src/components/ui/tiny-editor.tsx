"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

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
  height = 320,
  disabled = false,
}: TinyEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <div className="rounded-xl overflow-hidden border border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
      <Editor
        tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.8.5/tinymce.min.js"
        value={value}
        disabled={disabled}
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
            "bullist numlist outdent indent | table link | removeformat fullscreen",
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
            table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
            table td, table th { border: 1px solid #cbd5e1; padding: 6px 10px; }
            table th { background-color: #f1f5f9; }
          `,
        }}
      />
    </div>
  );
}
