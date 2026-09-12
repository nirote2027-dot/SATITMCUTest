"use client";

import { useState, useRef, useTransition } from "react";
import { Upload, CheckCircle2, AlertCircle, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  LiyonDialog,
  LiyonDialogHeader,
  LiyonDialogBody,
  LiyonDialogFooter,
  LiyonDialogCloseButton,
} from "@/shared/components/liyon";
import { Button } from "@/components/ui/button";
import { importUsersAction } from "@/features/identity/actions";
import type { RolePick } from "./types";

interface CsvRow {
  name: string;
  email: string;
  roleCode: string;
  password?: string;
  valid: boolean;
  error?: string;
}

export function ImportUsersDialog({
  open,
  onOpenChange,
  roles,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  roles: RolePick[];
  onSuccess: () => void;
}) {
  const [rows, setRows] = useState<CsvRow[]>([]);
  const [fileName, setFileName] = useState("");
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const availableRoleCodes = new Set(roles.map((r) => r.code.toUpperCase()));

  const handleDownloadTemplate = () => {
    const header = "name,email,role,password\n";
    const sample = "สมชาย ใจดี,somchai@satit.mcu.ac.th,STAFF,Passw0rd!123\nสมศรี รักเรียน,somsri@satit.mcu.ac.th,VIEWER,Passw0rd!123\n";
    const csvContent = "\uFEFF" + header + sample;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const parseCsvText = (text: string) => {
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length <= 1) {
      toast.error("ไฟล์ CSV ไม่มีข้อมูลผู้ใช้งาน");
      return;
    }

    const headerLine = lines[0].toLowerCase();
    const headers = headerLine.split(",").map((h) => h.trim().replace(/^["']|["']$/g, ""));
    const nameIdx = headers.findIndex((h) => h === "name" || h === "ชื่อ");
    const emailIdx = headers.findIndex((h) => h === "email" || h === "อีเมล");
    const roleIdx = headers.findIndex((h) => h === "role" || h === "rolecode" || h === "บทบาท");
    const passIdx = headers.findIndex((h) => h === "password" || h === "รหัสผ่าน");

    if (nameIdx === -1 || emailIdx === -1 || roleIdx === -1) {
      toast.error("รูปแบบหัวตารางไม่ถูกต้อง ต้องมีคอลัมน์ name, email, role");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const parsedRows: CsvRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const cols = line.split(",").map((c) => c.trim().replace(/^["']|["']$/g, ""));
      const name = cols[nameIdx] ?? "";
      const email = (cols[emailIdx] ?? "").toLowerCase();
      const roleCode = (cols[roleIdx] ?? "").toUpperCase();
      const password = passIdx !== -1 && cols[passIdx] ? cols[passIdx] : undefined;

      let valid = true;
      let error = "";

      if (!name) {
        valid = false;
        error = "ไม่มีชื่อ";
      } else if (!email || !emailRegex.test(email)) {
        valid = false;
        error = "อีเมลไม่ถูกต้อง";
      } else if (!roleCode || !availableRoleCodes.has(roleCode)) {
        valid = false;
        error = `ไม่พบบทบาท '${roleCode}'`;
      } else if (password && password.length < 8) {
        valid = false;
        error = "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
      }

      parsedRows.push({ name, email, roleCode, password, valid, error });
    }

    setRows(parsedRows);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      parseCsvText(text);
    };
    reader.readAsText(file, "UTF-8");
  };

  const validRows = rows.filter((r) => r.valid);
  const invalidRows = rows.filter((r) => !r.valid);

  const handleImport = () => {
    if (validRows.length === 0) {
      toast.error("ไม่มีแถวข้อมูลที่ถูกต้องสำหรับการนำเข้า");
      return;
    }

    startTransition(async () => {
      const payload = {
        users: validRows.map((r) => ({
          name: r.name,
          email: r.email,
          roleCode: r.roleCode,
          password: r.password || null,
        })),
      };

      const res = await importUsersAction(payload);
      if (res.ok) {
        const { successCount, failureCount, results } = res.data;
        if (failureCount > 0) {
          const failMsg = results.filter((r: any) => !r.success).map((r: any) => `${r.email}: ${r.error}`).join("\n");
          toast.warning(`นำเข้าสำเร็จ ${successCount} คน, ล้มเหลว ${failureCount} คน:\n${failMsg}`);
        } else {
          toast.success(`นำเข้าผู้ใช้สำเร็จทั้งหมด ${successCount} คน`);
        }
        onOpenChange(false);
        setRows([]);
        setFileName("");
        onSuccess();
      } else {
        toast.error("เกิดข้อผิดพลาดในการนำเข้าข้อมูล");
      }
    });
  };

  return (
    <LiyonDialog open={open} onOpenChange={onOpenChange}>
      <LiyonDialogCloseButton label="ปิด" />
      <LiyonDialogHeader
        title="นำเข้าผู้ใช้งานจากไฟล์ CSV (Import Users)"
        description="อัปโหลดไฟล์ .csv เพื่อเพิ่มผู้ใช้งานและกำหนดบทบาทเข้าสู่ระบบพร้อมกัน"
      />
      <LiyonDialogBody>
        <div className="space-y-4 py-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl gap-3">
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-800 block">รูปแบบคอลัมน์ในไฟล์:</span>
              <code className="text-blue-700 font-mono">name, email, role, password</code> (บทบาทที่ใช้ได้: {roles.map((r) => r.code).join(", ")})
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDownloadTemplate}
              className="gap-1.5 text-xs shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              ดาวน์โหลด Template
            </Button>
          </div>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/30 transition-all rounded-2xl p-6 text-center cursor-pointer flex flex-col items-center justify-center gap-2"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {fileName ? fileName : "คลิกเพื่อเลือกไฟล์ CSV หรือลากไฟล์มาวางที่นี่"}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">รองรับไฟล์รูปแบบ .csv เข้ารหัส UTF-8</p>
            </div>
          </div>

          {rows.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">
                  ตรวจสอบข้อมูล: ทั้งหมด {rows.length} รายการ
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> ถูกต้อง {validRows.length}
                  </span>
                  {invalidRows.length > 0 && (
                    <span className="text-rose-600 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> ไม่ถูกต้อง {invalidRows.length}
                    </span>
                  )}
                </div>
              </div>

              <div className="max-h-56 overflow-y-auto border border-slate-200 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-medium sticky top-0">
                    <tr>
                      <th className="py-2 px-3">สถานะ</th>
                      <th className="py-2 px-3">ชื่อ</th>
                      <th className="py-2 px-3">อีเมล</th>
                      <th className="py-2 px-3">บทบาท</th>
                      <th className="py-2 px-3">รหัสผ่าน</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rows.map((row, idx) => (
                      <tr key={idx} className={row.valid ? "hover:bg-slate-50/60" : "bg-rose-50/50"}>
                        <td className="py-2 px-3 whitespace-nowrap">
                          {row.valid ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5" /> พร้อมนำเข้า
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-rose-600 font-medium" title={row.error}>
                              <AlertCircle className="w-3.5 h-3.5" /> {row.error}
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-3 font-medium text-slate-800">{row.name}</td>
                        <td className="py-2 px-3 text-slate-600 font-mono">{row.email}</td>
                        <td className="py-2 px-3 font-semibold text-slate-700">{row.roleCode}</td>
                        <td className="py-2 px-3 text-slate-500">
                          {row.password ? "••••••••" : <span className="text-amber-600">สร้างลิงก์</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </LiyonDialogBody>
      <LiyonDialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
          ยกเลิก
        </Button>
        <Button
          onClick={handleImport}
          disabled={validRows.length === 0 || isPending}
          className="bg-blue-700 hover:bg-blue-800 text-white gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              กำลังนำเข้าข้อมูล...
            </>
          ) : (
            `ยืนยันนำเข้า (${validRows.length} รายการ)`
          )}
        </Button>
      </LiyonDialogFooter>
    </LiyonDialog>
  );
}
