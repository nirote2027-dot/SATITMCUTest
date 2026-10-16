"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Building2,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ExternalLink,
  Settings,
  X,
  Filter,
  LayoutGrid,
  List,
  Sparkles,
  ChevronRight,
  UserCheck,
  Award,
} from "lucide-react";
import { type ThemeColorKey, THEME_CONFIGS } from "@/features/school/types";

export interface PublicEmployeeItem {
  id: string;
  firstName: string;
  lastName: string;
  position?: string | null;
  imageUrl?: string | null;
  departmentName?: string | null;
  phone?: string | null;
  email?: string | null;
  lineId?: string | null;
  address?: string | null;
  displayOrder?: number;
}

interface PersonnelPortalClientProps {
  initialEmployees: PublicEmployeeItem[];
  canManage: boolean;
  themeColor?: ThemeColorKey;
}

export function PersonnelPortalClient({
  initialEmployees,
  canManage,
  themeColor = "blue",
}: PersonnelPortalClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedEmployee, setSelectedEmployee] = useState<PublicEmployeeItem | null>(null);

  const theme = THEME_CONFIGS[themeColor] || THEME_CONFIGS.blue;

  // Extract unique departments
  const departments = useMemo(() => {
    const set = new Set<string>();
    initialEmployees.forEach((emp) => {
      if (emp.departmentName?.trim()) {
        set.add(emp.departmentName.trim());
      }
    });
    return Array.from(set).sort();
  }, [initialEmployees]);

  // Filtered employees
  const filteredEmployees = useMemo(() => {
    return initialEmployees.filter((emp) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        emp.firstName.toLowerCase().includes(q) ||
        emp.lastName.toLowerCase().includes(q) ||
        (emp.position && emp.position.toLowerCase().includes(q)) ||
        (emp.departmentName && emp.departmentName.toLowerCase().includes(q));

      const matchDept =
        selectedDepartment === "ALL" ||
        emp.departmentName === selectedDepartment;

      return matchSearch && matchDept;
    });
  }, [initialEmployees, searchQuery, selectedDepartment]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      {/* ═══ Top Controls Strip (Search, Department Filters, Layout Toggle) ═══ */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/90 dark:border-white/10 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อ, นามสกุล, หรือตำแหน่ง..."
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right Controls: View Mode & Admin Button */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            {canManage && (
              <Link
                href="/school/personnel"
                style={{
                  backgroundColor: `${theme.hex}12`,
                  color: theme.hex,
                  borderColor: `${theme.hex}30`,
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold hover:opacity-90 transition-all shadow-2xs"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>จัดการบุคลากร (Admin)</span>
              </Link>
            )}

            {/* Layout Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                title="มุมมองตารางการ์ด (Grid)"
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-bold"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                title="มุมมองรายการ (List)"
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === "list"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-bold"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Department Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-slate-400 font-semibold flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" /> แผนก/กลุ่มสาระ:
          </span>
          <button
            type="button"
            onClick={() => setSelectedDepartment("ALL")}
            style={
              selectedDepartment === "ALL"
                ? { backgroundColor: theme.hex, color: "#ffffff" }
                : undefined
            }
            className={`px-3.5 py-1.5 rounded-xl font-medium shrink-0 transition-all cursor-pointer ${
              selectedDepartment === "ALL"
                ? "shadow-xs font-bold"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            ทั้งหมด ({initialEmployees.length})
          </button>
          {departments.map((dept) => {
            const count = initialEmployees.filter((e) => e.departmentName === dept).length;
            const isSelected = selectedDepartment === dept;
            return (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDepartment(dept)}
                style={
                  isSelected
                    ? { backgroundColor: theme.hex, color: "#ffffff" }
                    : undefined
                }
                className={`px-3.5 py-1.5 rounded-xl font-medium shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? "shadow-xs font-bold"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {dept} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ Results Counter ═══ */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>
          แสดงผล <strong className="text-slate-800 dark:text-slate-200 font-bold">{filteredEmployees.length}</strong> ท่าน
          {selectedDepartment !== "ALL" && ` ในกลุ่ม "${selectedDepartment}"`}
        </span>
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedDepartment("ALL");
            }}
            className="text-blue-600 dark:text-sky-400 hover:underline font-medium"
          >
            ล้างตัวกรองทั้งหมด
          </button>
        )}
      </div>

      {/* ═══ Personnel Display: Grid View ═══ */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              onClick={() => setSelectedEmployee(emp)}
              className="group bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-white/10 shadow-xs hover:shadow-xl hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 flex flex-col items-center text-center cursor-pointer relative overflow-hidden"
            >
              {/* Subtle hover accent bar */}
              <div
                style={{ backgroundColor: theme.hex }}
                className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
              />

              {/* Avatar Photo */}
              <div className="relative mb-4">
                {emp.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={emp.imageUrl}
                    alt={`${emp.firstName} ${emp.lastName}`}
                    className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-md ring-2 ring-slate-100 dark:ring-slate-700 group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div
                    style={{
                      backgroundColor: `${theme.hex}18`,
                      color: theme.hex,
                    }}
                    className="w-28 h-28 rounded-full flex items-center justify-center font-black text-3xl border-4 border-white dark:border-slate-800 shadow-sm ring-2 ring-slate-100 dark:ring-slate-700"
                  >
                    {emp.firstName.charAt(0)}
                  </div>
                )}
                <div
                  style={{ backgroundColor: theme.hex }}
                  className="absolute bottom-0 right-0 w-7 h-7 rounded-full text-white flex items-center justify-center shadow-md border-2 border-white dark:border-slate-900"
                >
                  <Award className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Full Name */}
              <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                {emp.firstName} {emp.lastName}
              </h3>

              {/* Position */}
              <p
                style={{ color: theme.hex }}
                className="text-xs font-semibold mb-2 line-clamp-1"
              >
                {emp.position || "อาจารย์ผู้สอน"}
              </p>

              {/* Department Badge */}
              {emp.departmentName && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-4 max-w-full truncate">
                  <Building2 className="w-3 h-3 shrink-0" />
                  <span className="truncate">{emp.departmentName}</span>
                </span>
              )}

              {/* Quick Contact Badges */}
              <div className="mt-auto pt-3 border-t border-slate-100 dark:border-white/5 w-full flex items-center justify-center gap-2">
                {emp.phone && (
                  <a
                    href={`tel:${emp.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    title={`โทร: ${emp.phone}`}
                    className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-500 hover:text-emerald-600 flex items-center justify-center transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                )}
                {emp.email && (
                  <a
                    href={`mailto:${emp.email}`}
                    onClick={(e) => e.stopPropagation()}
                    title={`อีเมล: ${emp.email}`}
                    className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-500 hover:text-blue-600 flex items-center justify-center transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                )}
                {emp.lineId && (
                  <span
                    title={`Line ID: ${emp.lineId}`}
                    className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-green-50 dark:hover:bg-green-950/40 text-slate-500 hover:text-green-600 flex items-center justify-center transition-colors cursor-help"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </span>
                )}
                <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 ml-auto flex items-center gap-0.5">
                  ดูประวัติ <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ═══ Personnel Display: List View ═══ */
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-xs divide-y divide-slate-100 dark:divide-white/5 overflow-hidden">
          {filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              onClick={() => setSelectedEmployee(emp)}
              className="p-4 sm:p-5 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group"
            >
              <div className="flex items-center gap-4 min-w-0">
                {emp.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={emp.imageUrl}
                    alt={`${emp.firstName} ${emp.lastName}`}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm shrink-0"
                  />
                ) : (
                  <div
                    style={{
                      backgroundColor: `${theme.hex}18`,
                      color: theme.hex,
                    }}
                    className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg border-2 border-white dark:border-slate-800 shadow-xs shrink-0"
                  >
                    {emp.firstName.charAt(0)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors truncate">
                    {emp.firstName} {emp.lastName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span
                      style={{ color: theme.hex }}
                      className="text-xs font-semibold"
                    >
                      {emp.position || "อาจารย์ผู้สอน"}
                    </span>
                    {emp.departmentName && (
                      <>
                        <span className="text-slate-300 dark:text-slate-600">•</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Building2 className="w-3 h-3" /> {emp.departmentName}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right contacts */}
              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                {emp.phone && (
                  <span className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                    <Phone className="w-3 h-3 text-emerald-600" /> {emp.phone}
                  </span>
                )}
                {emp.email && (
                  <span className="text-xs text-slate-600 dark:text-slate-300 hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                    <Mail className="w-3 h-3 text-blue-600" /> {emp.email}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══ Empty State ═══ */}
      {filteredEmployees.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200/90 dark:border-white/10 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Users className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            ไม่พบข้อมูลบุคลากรที่ตรงกับเงื่อนไข
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            ลองปรับเปลี่ยนคำค้นหา หรือเลือกแผนก/กลุ่มสาระอื่นเพื่อดูรายชื่อทั้งหมด
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedDepartment("ALL");
            }}
            style={{
              backgroundColor: theme.hex,
            }}
            className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-sm hover:opacity-90 transition-opacity"
          >
            แสดงบุคลากรทั้งหมด
          </button>
        </div>
      )}

      {/* ═══ Detailed Personnel Modal (Popup on Card Click) ═══ */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                background: `linear-gradient(135deg, ${theme.hex}, #1e1b4b)`,
              }}
              className="p-6 text-white relative flex flex-col items-center text-center"
            >
              <button
                type="button"
                onClick={() => setSelectedEmployee(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Profile Photo */}
              <div className="mb-3">
                {selectedEmployee.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectedEmployee.imageUrl}
                    alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-3xl border-4 border-white shadow-xl">
                    {selectedEmployee.firstName.charAt(0)}
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-white">
                {selectedEmployee.firstName} {selectedEmployee.lastName}
              </h3>
              <p className="text-sm text-white/90 font-medium mt-0.5">
                {selectedEmployee.position || "อาจารย์ผู้สอน"}
              </p>
              {selectedEmployee.departmentName && (
                <span className="mt-2 text-xs bg-white/20 px-3 py-0.5 rounded-full backdrop-blur-xs font-medium">
                  {selectedEmployee.departmentName}
                </span>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                ข้อมูลการติดต่อและการปฏิบัติงาน
              </h4>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-white/5">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block font-normal">แผนก / ฝ่ายสังกัด</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                      {selectedEmployee.departmentName || "โรงเรียนสาธิต มจร"}
                    </span>
                  </div>
                </div>

                {selectedEmployee.phone && (
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-white/5">
                    <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-400 block font-normal">เบอร์โทรศัพท์ติดต่อ</span>
                      <a
                        href={`tel:${selectedEmployee.phone}`}
                        className="font-semibold text-blue-600 dark:text-sky-400 hover:underline"
                      >
                        {selectedEmployee.phone}
                      </a>
                    </div>
                  </div>
                )}

                {selectedEmployee.email && (
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-white/5">
                    <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-400 block font-normal">อีเมล (E-mail)</span>
                      <a
                        href={`mailto:${selectedEmployee.email}`}
                        className="font-semibold text-blue-600 dark:text-sky-400 hover:underline"
                      >
                        {selectedEmployee.email}
                      </a>
                    </div>
                  </div>
                )}

                {selectedEmployee.lineId && (
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-white/5">
                    <MessageCircle className="w-4 h-4 text-green-500 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-400 block font-normal">LINE ID</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-100">
                        {selectedEmployee.lineId}
                      </span>
                    </div>
                  </div>
                )}

                {selectedEmployee.address && (
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-white/5">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-400 block font-normal">ที่อยู่ / ห้องทำงาน</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
                        {selectedEmployee.address}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedEmployee(null)}
                  className="w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-colors"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
