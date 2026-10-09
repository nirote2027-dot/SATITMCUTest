"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/utils";

/**
 * กล่องโต้ตอบ `.dlg` ของ Liyon (liyon-shell.css) ประกอบบน Radix Dialog —
 * primitive ตัวที่หกของ shared/components/liyon
 *
 * mockup ใช้ `<dialog>` ของเบราว์เซอร์ (showModal จัดการโฟกัส/Esc/กันคลิกทะลุเอง)
 * ในแอปจริงใช้ Radix Dialog แทนด้วยเหตุผลเดียวกับที่ AdminShell ใช้ shadcn
 * DropdownMenu แทน `<details>` — ต้องพึ่ง React state (open/onOpenChange) ที่
 * ผูกกับข้อมูลจริง (แถวไหนถูกลบ, ฟอร์มไหนกำลังกรอก) ไม่ใช่แค่ hover/toggle เปล่า ๆ
 * ผลลัพธ์ทางสายตาให้เหมือนเดิม (`.dlg`/`.box`/`.hd`/`.bd`/`.ft`) ผ่าน
 * liyon-compat/liyon-shell CSS ที่มีอยู่แล้ว ไม่ต้องเขียน CSS ใหม่
 */

export interface LiyonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** `.dlg.danger` — หัวเรื่องสีอันตราย ใช้กับกล่องยืนยันการลบ */
  danger?: boolean;
  /** `.dlg.wide` — max-width กว้างขึ้นสำหรับฟอร์มยาว */
  wide?: boolean;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export function LiyonDialog({ open, onOpenChange, danger, wide, className, contentClassName, children }: LiyonDialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[3px]" />
        <DialogPrimitive.Content
          className={cn(
            "dlg fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 outline-none max-h-[calc(100dvh-2rem)] flex flex-col",
            danger && "danger",
            wide && "wide",
            className,
          )}
        >
          <div className={cn("box flex flex-col max-h-[calc(100dvh-2rem)] overflow-hidden", contentClassName)}>
            {children}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export interface LiyonDialogCloseButtonProps {
  label: string;
}

/** ปุ่มปิดมุมขวาบน (`.x`) — เรียก Radix Close เพื่อคง focus-return ให้ */
export function LiyonDialogCloseButton({ label }: LiyonDialogCloseButtonProps) {
  return (
    <DialogPrimitive.Close asChild>
      <button type="button" className="icon-btn x" aria-label={label}>
        <X aria-hidden="true" />
      </button>
    </DialogPrimitive.Close>
  );
}

export interface LiyonDialogHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  titleId?: string;
  className?: string;
}

export function LiyonDialogHeader({ title, description, titleId, className }: LiyonDialogHeaderProps) {
  return (
    <div className={cn("hd flex-shrink-0", className)}>
      <DialogPrimitive.Title asChild {...(titleId ? { id: titleId } : {})}>
        <h2>{title}</h2>
      </DialogPrimitive.Title>
      {description ? (
        <DialogPrimitive.Description asChild>
          <p>{description}</p>
        </DialogPrimitive.Description>
      ) : (
        <DialogPrimitive.Description className="sr-only">
          {typeof title === "string" ? title : "รายละเอียดของกล่องข้อความ"}
        </DialogPrimitive.Description>
      )}
    </div>
  );
}

export function LiyonDialogBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("bd overflow-y-auto overscroll-contain flex-1 min-h-0", className)}>{children}</div>;
}

export function LiyonDialogFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("ft flex-shrink-0", className)}>{children}</div>;
}

export { DialogPrimitive as LiyonDialogPrimitive };
