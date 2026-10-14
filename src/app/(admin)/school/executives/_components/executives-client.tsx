"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Search,
  ArrowUp,
  ArrowDown,
  Phone,
  Mail,
  Award,
  Briefcase,
  LayoutGrid,
  Table as TableIcon,
  CheckCircle2,
  XCircle,
  Loader2,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  LiyonDialog,
  LiyonDialogHeader,
  LiyonDialogBody,
  LiyonDialogFooter,
  LiyonDialogCloseButton,
} from "@/shared/components/liyon";
import {
  createExecutiveAction,
  updateExecutiveAction,
  deleteExecutiveAction,
  reorderExecutivesAction,
} from "@/features/school/actions";
import type { ExecutiveDto } from "@/features/school/types";

interface Props {
  initialItems: ExecutiveDto[];
  canManage: boolean;
}

export function ExecutivesClient({ initialItems, canManage }: Props) {
  const [items, setItems] = useState<ExecutiveDto[]>(initialItems);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [pending, startTransition] = useTransition();

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ExecutiveDto | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<ExecutiveDto | null>(null);

  // Form Fields
  const [formPrefix, setFormPrefix] = useState("");
  const [formFirstName, setFormFirstName] = useState("");
  const [formLastName, setFormLastName] = useState("");
  const [formPosition, setFormPosition] = useState("");
  const [formAcademicRank, setFormAcademicRank] = useState("");
  const [formDepartment, setFormDepartment] = useState("");
  const [formDisplayOrder, setFormDisplayOrder] = useState(1);
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formIsActive, setFormIsActive] = useState(true);

  const openCreateDialog = () => {
    setEditingItem(null);
    setFormPrefix("");
    setFormFirstName("");
    setFormLastName("");
    setFormPosition("");
    setFormAcademicRank("");
    setFormDepartment("");
    setFormDisplayOrder(items.length + 1);
    setFormImageUrl("");
    setFormMessage("");
    setFormPhone("");
    setFormEmail("");
    setFormIsActive(true);
    setModalOpen(true);
  };

  const openEditDialog = (item: ExecutiveDto) => {
    setEditingItem(item);
    setFormPrefix(item.prefix || "");
    setFormFirstName(item.firstName);
    setFormLastName(item.lastName);
    setFormPosition(item.position);
    setFormAcademicRank(item.academicRank || "");
    setFormDepartment(item.department || "");
    setFormDisplayOrder(item.displayOrder);
    setFormImageUrl(item.imageUrl || "");
    setFormMessage(item.message || "");
    setFormPhone(item.phone || "");
    setFormEmail(item.email || "");
    setFormIsActive(item.isActive);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!canManage) {
      toast.error("คุณไม่มีสิทธิ์จัดการข้อมูลคณะผู้บริหาร");
      return;
    }
    if (!formFirstName.trim() || !formLastName.trim()) {
      toast.error("กรุณากรอกชื่อและนามสกุล");
      return;
    }
    if (!formPosition.trim()) {
      toast.error("กรุณาระบุตำแหน่งบริหาร");
      return;
    }

    startTransition(async () => {
      try {
        if (editingItem) {
          // Update
          const res = await updateExecutiveAction({
            id: editingItem.id,
            prefix: formPrefix.trim(),
            firstName: formFirstName.trim(),
            lastName: formLastName.trim(),
            position: formPosition.trim(),
            academicRank: formAcademicRank.trim(),
            department: formDepartment.trim(),
            displayOrder: Number(formDisplayOrder),
            imageUrl: formImageUrl.trim() || null,
            message: formMessage.trim() || null,
            phone: formPhone.trim() || null,
            email: formEmail.trim() || null,
            isActive: formIsActive,
          });

          if (res.ok && res.data) {
            setItems((prev) =>
              prev
                .map((x) => (x.id === editingItem.id ? res.data : x))
                .sort((a, b) => a.displayOrder - b.displayOrder)
            );
            toast.success("แก้ไขข้อมูลผู้บริหารเรียบร้อยแล้ว");
            setModalOpen(false);
          }
        } else {
          // Create
          const res = await createExecutiveAction({
            prefix: formPrefix.trim(),
            firstName: formFirstName.trim(),
            lastName: formLastName.trim(),
            position: formPosition.trim(),
            academicRank: formAcademicRank.trim(),
            department: formDepartment.trim(),
            displayOrder: Number(formDisplayOrder),
            imageUrl: formImageUrl.trim() || null,
            message: formMessage.trim() || null,
            phone: formPhone.trim() || null,
            email: formEmail.trim() || null,
            isActive: formIsActive,
          });

          if (res.ok && res.data) {
            setItems((prev) =>
              [...prev, res.data].sort((a, b) => a.displayOrder - b.displayOrder)
            );
            toast.success("เพิ่มข้อมูลผู้บริหารเรียบร้อยแล้ว");
            setModalOpen(false);
          }
        }
      } catch (err: any) {
        toast.error(err?.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    });
  };

  const handleDelete = (item: ExecutiveDto) => {
    startTransition(async () => {
      try {
        const res = await deleteExecutiveAction(item.id);
        if (res.ok) {
          setItems((prev) => prev.filter((x) => x.id !== item.id));
          toast.success("ลบข้อมูลผู้บริหารเรียบร้อยแล้ว");
          setDeleteConfirmItem(null);
        }
      } catch (err: any) {
        toast.error(err?.message || "เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    });
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    if (!canManage) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);

    const orderedIds = newItems.map((x) => x.id);
    setItems(
      newItems.map((item, idx) => ({
        ...item,
        displayOrder: idx + 1,
      }))
    );

    startTransition(async () => {
      try {
        const res = await reorderExecutivesAction(orderedIds);
        if (res.ok && res.data) {
          setItems(res.data);
          toast.success("ปรับลำดับการแสดงผลเรียบร้อยแล้ว");
        }
      } catch {
        toast.error("ไม่สามารถบันทึกลำดับได้");
      }
    });
  };

  const filteredItems = items.filter((x) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const fullName = `${x.prefix || ""} ${x.firstName} ${x.lastName}`.toLowerCase();
    const pos = (x.position || "").toLowerCase();
    const dept = (x.department || "").toLowerCase();
    return fullName.includes(q) || pos.includes(q) || dept.includes(q);
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                เกี่ยวกับโรงเรียน
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                ทำเนียบคณะผู้บริหารสถานศึกษา
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              จัดการรายนามผู้บริหาร ลำดับการบังคับบัญชา ภาพถ่าย ตำแหน่ง และสารวิสัยทัศน์
            </p>
          </div>
        </div>

        {canManage && (
          <Button
            type="button"
            onClick={openCreateDialog}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs cursor-pointer px-5"
          >
            <Plus className="w-4 h-4" />
            <span>เพิ่มผู้บริหารใหม่</span>
          </Button>
        )}
      </div>

      {/* Toolbar / Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาชื่อผู้บริหาร, ตำแหน่ง, ฝ่าย..."
            className="w-full text-xs sm:text-sm pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white dark:bg-slate-700 text-blue-600 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
              title="มุมมองการ์ด (Grid View)"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "table"
                  ? "bg-white dark:bg-slate-700 text-blue-600 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
              title="มุมมองตาราง (Table View)"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>

          <span className="text-xs text-slate-500 font-medium ml-2">
            ทั้งหมด {filteredItems.length} ท่าน
          </span>
        </div>
      </div>

      {/* Grid Mode */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              {/* Card Header with order badge */}
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/40">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                  ลำดับที่ {item.displayOrder}
                </span>

                <div className="flex items-center gap-1">
                  {canManage && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleMove(index, "up")}
                        disabled={index === 0}
                        className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                        title="เลื่อนขึ้น"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMove(index, "down")}
                        disabled={index === items.length - 1}
                        className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                        title="เลื่อนลง"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                  {item.isActive ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> เปิดใช้งาน
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                      <XCircle className="w-3 h-3" /> ปิด
                    </span>
                  )}
                </div>
              </div>

              {/* Portrait & Core Info */}
              <div className="p-6 flex flex-col items-center text-center flex-1">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.firstName}
                    className="w-28 h-28 rounded-full object-cover mb-4 border-2 border-white dark:border-slate-800 shadow-md ring-2 ring-blue-100 dark:ring-blue-950"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-slate-800 dark:to-slate-700 text-blue-700 dark:text-blue-300 flex items-center justify-center font-black text-3xl mb-4 border-2 border-white dark:border-slate-800 shadow-sm ring-2 ring-blue-100 dark:ring-blue-950">
                    {item.firstName.charAt(0)}
                  </div>
                )}

                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-1 leading-snug">
                  {item.prefix ? `${item.prefix} ` : ""}
                  {item.firstName} {item.lastName}
                </h3>

                <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1 leading-relaxed">
                  {item.position}
                </p>

                {item.academicRank && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                    {item.academicRank}
                  </p>
                )}

                {item.department && (
                  <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md mb-3">
                    {item.department}
                  </span>
                )}

                {item.message && (
                  <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 italic bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded-xl border border-blue-100/60 dark:border-blue-900/40 w-full text-left relative leading-relaxed">
                    <Quote className="w-3.5 h-3.5 text-blue-400 mb-1" />
                    <p className="line-clamp-3">{item.message}</p>
                  </div>
                )}
              </div>

              {/* Contact & Actions footer */}
              <div className="px-4 py-3 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  {item.phone && (
                    <span className="flex items-center gap-1" title={item.phone}>
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate max-w-[100px]">{item.phone}</span>
                    </span>
                  )}
                  {item.email && (
                    <span className="flex items-center gap-1" title={item.email}>
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate max-w-[100px]">{item.email}</span>
                    </span>
                  )}
                </div>

                {canManage && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openEditDialog(item)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                      title="แก้ไขข้อมูล"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmItem(item)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="ลบข้อมูล"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table Mode */}
      {viewMode === "table" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-4 py-3 text-center w-16">ลำดับ</th>
                  <th className="px-4 py-3">ผู้บริหาร</th>
                  <th className="px-4 py-3">ตำแหน่งบริหาร</th>
                  <th className="px-4 py-3">ฝ่าย/กลุ่มงาน</th>
                  <th className="px-4 py-3">การติดต่อ</th>
                  <th className="px-4 py-3 text-center">สถานะ</th>
                  {canManage && <th className="px-4 py-3 text-right">จัดการ</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredItems.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 text-center font-bold text-slate-600">
                      {item.displayOrder}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {item.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.imageUrl}
                            alt={item.firstName}
                            className="w-10 h-10 rounded-full object-cover shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-700 font-bold flex items-center justify-center shrink-0">
                            {item.firstName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-slate-900 dark:text-slate-100">
                            {item.prefix ? `${item.prefix} ` : ""}
                            {item.firstName} {item.lastName}
                          </div>
                          {item.academicRank && (
                            <div className="text-[11px] text-slate-500">{item.academicRank}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">
                      {item.position}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {item.department || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      <div>{item.phone || "—"}</div>
                      <div className="text-[11px] text-slate-400">{item.email}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item.isActive ? (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                          เปิดใช้งาน
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                          ปิด
                        </span>
                      )}
                    </td>
                    {canManage && (
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => openEditDialog(item)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                            title="แก้ไข"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmItem(item)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="ลบ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Executive Modal */}
      <LiyonDialog open={modalOpen} onOpenChange={setModalOpen} wide>
        <LiyonDialogHeader
          title={editingItem ? "แก้ไขข้อมูลผู้บริหาร" : "เพิ่มผู้บริหารใหม่"}
          description="กรอกข้อมูลรายนาม ตำแหน่ง วุฒิการศึกษา ภาพถ่าย และสารวิสัยทัศน์"
        />
        <LiyonDialogCloseButton label="ปิดหน้าต่าง" />
        <LiyonDialogBody className="space-y-4 py-2">
          {/* Executive Photo */}
          <ImageUpload
            value={formImageUrl}
            onChange={setFormImageUrl}
            label="รูปถ่ายผู้บริหาร (ภาพเดี่ยวหน้าตรง/ชุดสูท/ชุดกากี)"
            aspect="contain"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                คำนำหน้า / สมณศักดิ์
              </label>
              <input
                type="text"
                value={formPrefix}
                onChange={(e) => setFormPrefix(e.target.value)}
                placeholder="เช่น พระธรรมวชิรปัญญาภรณ์, รศ.ดร., ผศ., นาย"
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                ชื่อ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formFirstName}
                onChange={(e) => setFormFirstName(e.target.value)}
                placeholder="ชื่อจริง"
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                นามสกุล <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formLastName}
                onChange={(e) => setFormLastName(e.target.value)}
                placeholder="นามสกุล"
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                ตำแหน่งบริหาร <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formPosition}
                onChange={(e) => setFormPosition(e.target.value)}
                placeholder="เช่น ผู้อำนวยการโรงเรียน, รองผู้อำนวยการฝ่ายวิชาการ"
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                วิทยฐานะ / วุฒิการศึกษา
              </label>
              <input
                type="text"
                value={formAcademicRank}
                onChange={(e) => setFormAcademicRank(e.target.value)}
                placeholder="เช่น ปร.ด. การบริหารการศึกษา, ค.ม., ป.ธ.๙"
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                ฝ่าย / กลุ่มงาน
              </label>
              <input
                type="text"
                value={formDepartment}
                onChange={(e) => setFormDepartment(e.target.value)}
                placeholder="เช่น สำนักงานผู้อำนวยการ, ฝ่ายวิชาการ"
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                ลำดับการแสดงผล (Display Order)
              </label>
              <input
                type="number"
                min={1}
                value={formDisplayOrder}
                onChange={(e) => setFormDisplayOrder(Number(e.target.value))}
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              สารจากผู้บริหาร / วิสัยทัศน์ (Message / Bio)
            </label>
            <textarea
              rows={3}
              value={formMessage}
              onChange={(e) => setFormMessage(e.target.value)}
              placeholder="ระบุสารจากผู้บริหารหรือวิสัยทัศน์สั้นๆ..."
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                เบอร์โทรศัพท์ติดต่อ
              </label>
              <input
                type="text"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                placeholder="035-248-000 ต่อ 8101"
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                อีเมล
              </label>
              <input
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="director@satitmcu.ac.th"
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={formIsActive}
                onChange={(e) => setFormIsActive(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span>เปิดใช้งานและแสดงผลบนเว็บไซต์ (Active Status)</span>
            </label>
          </div>
        </LiyonDialogBody>
        <LiyonDialogFooter className="flex items-center justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setModalOpen(false)}
            className="text-xs"
          >
            ยกเลิก
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={pending}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
          >
            {pending ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>

      {/* Delete Confirmation Modal */}
      <LiyonDialog open={!!deleteConfirmItem} onOpenChange={(open) => !open && setDeleteConfirmItem(null)} danger>
        <LiyonDialogHeader
          title="ยืนยันการลบข้อมูลผู้บริหาร"
          description={`คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูล "${deleteConfirmItem?.prefix || ""} ${deleteConfirmItem?.firstName} ${deleteConfirmItem?.lastName}" (${deleteConfirmItem?.position}) ออกจากระบบ? การกระทำนี้ไม่สามารถย้อนกลับได้`}
        />
        <LiyonDialogCloseButton label="ปิดหน้าต่าง" />
        <LiyonDialogFooter className="flex items-center justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setDeleteConfirmItem(null)}
            className="text-xs"
          >
            ยกเลิก
          </Button>
          <Button
            type="button"
            onClick={() => deleteConfirmItem && handleDelete(deleteConfirmItem)}
            disabled={pending}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
          >
            {pending ? "กำลังลบ..." : "ยืนยันการลบ"}
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>
    </div>
  );
}
