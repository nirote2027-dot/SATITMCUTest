import {
  LayoutDashboard,
  Users,
  Settings,
  Layers,
  Newspaper,
  UserCheck,
  GraduationCap,
  Network,
  FileText,
  Building2,
  type LucideIcon,
} from "lucide-react";
import { hasPermission, P } from "@/features/identity";
import { SAMPLE_P } from "@/features/sample";
import { NEWS_P } from "@/features/news";
import { PERSONNEL_P } from "@/features/personnel";
import { CURRICULUM_P } from "@/features/curriculum";
import { DEPARTMENT_P } from "@/features/department";
import { DOCUMENT_P } from "@/features/document";
import { FACILITY_P } from "@/features/facility";

export interface NavItem {
  /** i18n key */
  title: string;
  href: string;
  icon?: LucideIcon;
  /** ต้องมีสิทธิ์นี้ถึงเห็น — ไม่มี = ทุกคนที่ login เห็น */
  permission?: string;
  children?: NavItem[];
}
export interface NavGroup { label: string; items: NavItem[] }
export interface NavCrumb { title: string; href: string }

export const sidebarGroups: NavGroup[] = [
  { label: "nav.group.overview", items: [{ title: "nav.dashboard", href: "/dashboard", icon: LayoutDashboard }] },
  {
    label: "nav.group.faculty",
    items: [
      { title: "news.title", href: "/news", icon: Newspaper, permission: NEWS_P.read },
      { title: "personnel.title", href: "/personnel", icon: UserCheck, permission: PERSONNEL_P.read },
      {
        title: "nav.academic",
        href: "/curriculum",
        icon: GraduationCap,
        children: [
          { title: "curriculum.title", href: "/curriculum", permission: CURRICULUM_P.read },
          { title: "department.title", href: "/department", permission: DEPARTMENT_P.read },
        ],
      },
      {
        title: "nav.services",
        href: "/satitmcuReg",
        icon: FileText,
        children: [
          { title: "document.title", href: "/satitmcuReg", permission: DOCUMENT_P.read },
          { title: "facility.title", href: "/download", permission: FACILITY_P.read },
        ],
      },
    ],
  },
  {
    label: "nav.group.settings",
    items: [
      {
        title: "nav.settings",
        href: "/settings",
        icon: Settings,
        children: [
          { title: "nav.settings", href: "/settings", permission: P.settingsManage },
          { title: "nav.users", href: "/users", permission: P.usersRead },
          { title: "nav.roles", href: "/users/roles", permission: P.rolesManage },
          { title: "sample.nav", href: "/sample", permission: SAMPLE_P.sampleRead },
        ],
      },
    ],
  },
];

type Ctx = Parameters<typeof hasPermission>[0];

function visibleItem(item: NavItem, ctx: Ctx): NavItem | null {
  if (item.permission && !hasPermission(ctx, item.permission)) return null;
  if (!item.children) return item;
  const children = item.children.filter((c) => !c.permission || hasPermission(ctx, c.permission));
  return children.length ? { ...item, children } : null;
}

export function visibleGroups(ctx: Ctx): NavGroup[] {
  return sidebarGroups
    .map((g) => ({ ...g, items: g.items.map((i) => visibleItem(i, ctx)).filter((i): i is NavItem => i !== null) }))
    .filter((g) => g.items.length > 0);
}

/** สายเมนูสำหรับ breadcrumb — จับ href ที่ยาวที่สุดที่ตรง (ลูกชนะแม่) */
export function getActiveNavChain(pathname: string): NavCrumb[] {
  let best: { parent: NavItem | null; item: NavItem } | null = null;
  const consider = (item: NavItem, parent: NavItem | null) => {
    if (pathname === item.href || pathname.startsWith(item.href + "/")) {
      if (!best || item.href.length > best.item.href.length || (item.href.length === best.item.href.length && parent)) best = { parent, item };
    }
  };
  for (const g of sidebarGroups) for (const i of g.items) { consider(i, null); for (const c of i.children ?? []) consider(c, i); }
  if (!best) return [];
  const { parent, item } = best as { parent: NavItem | null; item: NavItem };
  const chain: NavCrumb[] = [];
  if (parent && (parent.href !== item.href || parent.title !== item.title)) chain.push({ title: parent.title, href: parent.href });
  chain.push({ title: item.title, href: item.href });
  return chain;
}
