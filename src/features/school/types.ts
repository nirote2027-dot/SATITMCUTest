export interface GalleryItem {
  id: string;
  url: string;
  title?: string;
  description?: string;
  createdAt?: string;
}

export type WidgetDisplayHeight = "compact" | "medium" | "tall" | "full" | "custom";

export function extractEmbedUrl(input?: string): string {
  if (!input) return "";
  const trimmed = input.trim();
  const match = trimmed.match(/src=["']([^"']+)["']/i);
  return match ? match[1] : trimmed;
}

export function getWidgetHeight(size?: string, custom?: number): number {
  if (size === "compact") return 350;
  if (size === "tall") return 550;
  if (size === "full") return 650;
  if (size === "custom" && custom && custom >= 200) return custom;
  return 450;
}


export interface SchoolInfoData {
  nameTh: string;
  nameEn?: string;
  shortName?: string;
  motto?: string;
  philosophy?: string;
  vision?: string;
  mission?: string[];
  identity?: string;
  uniqueness?: string;
  schoolColors?: string;
  treeFlower?: string;
  history?: string;
  address?: string;
  phone?: string;
  fax?: string;
  email?: string;
  website?: string;
  facebook?: string;
  facebookPageUrl?: string;
  facebookDisplayHeight?: WidgetDisplayHeight;
  facebookCustomHeight?: number;
  showFacebookWidget?: boolean;
  line?: string;
  mapUrl?: string;
  mapEmbedUrl?: string;
  mapDisplayHeight?: WidgetDisplayHeight;
  mapCustomHeight?: number;
  showMapWidget?: boolean;
  logoUrl?: string;
  coverImageUrl?: string;
  gallery?: GalleryItem[];
}

export interface ExecutiveDto {
  id: string;
  prefix?: string;
  firstName: string;
  lastName: string;
  position: string;
  academicRank?: string;
  department?: string;
  displayOrder: number;
  imageUrl?: string | null;
  message?: string | null;
  phone?: string | null;
  email?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ═══════════════════════════════════════════════════════
// THEME & FOOTER SETTINGS
// ═══════════════════════════════════════════════════════
export type ThemeColorKey = "blue" | "coral" | "green" | "purple" | "pink";

export interface ThemeConfig {
  key: ThemeColorKey;
  nameTh: string;
  nameEn: string;
  hex: string;
  description: string;
  glowColor: string;
  gradient: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  btnBg: string;
  btnHover: string;
  btnBorder: string;
  btnText: string;
  iconColor: string;
  linkHover: string;
  activeItem: string;
}

export const THEME_CONFIGS: Record<ThemeColorKey, ThemeConfig> = {
  blue: {
    key: "blue",
    nameTh: "น้ำเงินคราม มจร (Classic MCU Blue)",
    nameEn: "Classic MCU Blue",
    hex: "#0556CA",
    description: "สีน้ำเงินคราม อัตลักษณ์สถาบัน มจร สง่างาม สุขุม และเปี่ยมด้วยวิชาการ",
    glowColor: "rgba(37, 99, 235, 0.4)",
    gradient: "from-blue-600 to-indigo-700",
    badgeBg: "bg-blue-500/20",
    badgeText: "text-sky-300",
    badgeBorder: "border-blue-400/30",
    btnBg: "bg-blue-600",
    btnHover: "hover:bg-blue-500",
    btnBorder: "border-blue-400/30",
    btnText: "text-white",
    iconColor: "text-blue-400",
    linkHover: "hover:text-blue-300",
    activeItem: "bg-blue-500/10 text-sky-300 border-blue-500/20",
  },
  coral: {
    key: "coral",
    nameTh: "ส้มแสดคอรัล (MCU Orange / Coral)",
    nameEn: "MCU Orange / Coral",
    hex: "#F06A4F",
    description: "สีส้มแสด สดใส พลังแห่งปัญญา (สีประจำโรงเรียน: น้ำเงิน-ส้ม)",
    glowColor: "rgba(240, 106, 79, 0.4)",
    gradient: "from-orange-600 to-amber-600",
    badgeBg: "bg-orange-500/20",
    badgeText: "text-amber-200",
    badgeBorder: "border-orange-400/30",
    btnBg: "bg-orange-600",
    btnHover: "hover:bg-orange-500",
    btnBorder: "border-orange-400/30",
    btnText: "text-white",
    iconColor: "text-orange-400",
    linkHover: "hover:text-orange-300",
    activeItem: "bg-orange-500/10 text-amber-200 border-orange-500/20",
  },
  green: {
    key: "green",
    nameTh: "เขียวมรกตวิถีพุทธ (Emerald Green)",
    nameEn: "Emerald Green",
    hex: "#0F7A5A",
    description: "สีเขียวมรกต สัญลักษณ์แห่งความสงบร่มเย็น วิถีพุทธ และสิ่งแวดล้อมที่ยั่งยืน",
    glowColor: "rgba(15, 122, 90, 0.4)",
    gradient: "from-emerald-600 to-teal-700",
    badgeBg: "bg-emerald-500/20",
    badgeText: "text-emerald-300",
    badgeBorder: "border-emerald-400/30",
    btnBg: "bg-emerald-600",
    btnHover: "hover:bg-emerald-500",
    btnBorder: "border-emerald-400/30",
    btnText: "text-white",
    iconColor: "text-emerald-400",
    linkHover: "hover:text-emerald-300",
    activeItem: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  },
  purple: {
    key: "purple",
    nameTh: "ม่วงราชวงศ์ (Royal Purple)",
    nameEn: "Royal Purple",
    hex: "#6D28D9",
    description: "สีม่วงราชวงศ์ ภูมิฐาน ทรงเกียรติ และเปี่ยมด้วยคุณค่าทางวัฒนธรรม",
    glowColor: "rgba(109, 40, 217, 0.4)",
    gradient: "from-purple-600 to-indigo-700",
    badgeBg: "bg-purple-500/20",
    badgeText: "text-purple-300",
    badgeBorder: "border-purple-400/30",
    btnBg: "bg-purple-600",
    btnHover: "hover:bg-purple-500",
    btnBorder: "border-purple-400/30",
    btnText: "text-white",
    iconColor: "text-purple-400",
    linkHover: "hover:text-purple-300",
    activeItem: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  },
  pink: {
    key: "pink",
    nameTh: "ชมพูทับทิมสง่างาม (Ruby Pink)",
    nameEn: "Ruby Pink",
    hex: "#C2185B",
    description: "สีชมพูทับทิม นุ่มนวล ทันสมัย และเปี่ยมด้วยไมตรีจิตในการให้บริการ",
    glowColor: "rgba(194, 24, 91, 0.4)",
    gradient: "from-rose-600 to-pink-700",
    badgeBg: "bg-rose-500/20",
    badgeText: "text-rose-300",
    badgeBorder: "border-rose-400/30",
    btnBg: "bg-rose-600",
    btnHover: "hover:bg-rose-500",
    btnBorder: "border-rose-400/30",
    btnText: "text-white",
    iconColor: "text-rose-400",
    linkHover: "hover:text-rose-300",
    activeItem: "bg-rose-500/10 text-rose-300 border-rose-500/20",
  },
};

// ═══════════════════════════════════════════════════════
// BACKGROUND THEME (LIGHT / WARM / DARK / SLATE)
// ═══════════════════════════════════════════════════════
export type BackgroundThemeKey = "light" | "warm" | "dark" | "slate";

export interface BackgroundThemeConfig {
  key: BackgroundThemeKey;
  nameTh: string;
  nameEn: string;
  description: string;
  badge: string;
  previewBg: string;
  previewCard: string;
  previewText: string;
  isDark: boolean;
}

export const BACKGROUND_THEMES: Record<BackgroundThemeKey, BackgroundThemeConfig> = {
  light: {
    key: "light",
    nameTh: "โหมดสว่างสง่างาม (Pure Clean Light)",
    nameEn: "Pure Clean Light",
    description: "พื้นหลังสีขาวนวล สว่าง สะอาดตา คมชัด ทันสมัย สไตล์เว็บสถาบันชั้นนำระดับสากล ไม่มืดทึบ",
    badge: "แนะนำ • สว่างสดใส",
    previewBg: "#F8FAFC",
    previewCard: "#FFFFFF",
    previewText: "#0F172A",
    isDark: false,
  },
  warm: {
    key: "warm",
    nameTh: "โหมดพาสเทลละมุนตา (Soft Theme Tint)",
    nameEn: "Soft Theme Tint",
    description: "พื้นหลังสว่างไล่เฉดสีพาสเทลตามธีมสีที่เลือก (ชมพู/ฟ้า/เขียว/ส้ม/ม่วง) นุ่มนวล สบายตา มีชีวิตชีวา",
    badge: "เอกลักษณ์ตามสีธีม",
    previewBg: "#FFF1F2",
    previewCard: "#FFFFFF",
    previewText: "#1E293B",
    isDark: false,
  },
  dark: {
    key: "dark",
    nameTh: "โหมดมืดล้ำสมัย ไซเบอร์ (Modern Deep Dark)",
    nameEn: "Modern Deep Cyber Dark",
    description: "พื้นหลังสีดำเข้มขลัง สไตล์ Cyber 3D ล้ำยุค แสงนีออนสะท้อนเด่นชัด",
    badge: "ล้ำยุค นีออน",
    previewBg: "#020617",
    previewCard: "#0F172A",
    previewText: "#F8FAFC",
    isDark: true,
  },
  slate: {
    key: "slate",
    nameTh: "โหมดมิดไนท์สเลท (Midnight Slate Navy)",
    nameEn: "Midnight Slate Navy",
    description: "พื้นหลังสีเทาเข้มผสมกรมท่า สุขุม เรียบหรู คมคาย และเป็นทางการ",
    badge: "สุขุม เรียบหรู",
    previewBg: "#0F172A",
    previewCard: "#1E293B",
    previewText: "#F1F5F9",
    isDark: true,
  },
};

export interface FooterServiceLink {
  id: string;
  label: string;
  url: string;
  iconName?: string;
  openInNewTab?: boolean;
  isActive: boolean;
  displayOrder: number;
}

export interface FooterStaffLink {
  id: string;
  label: string;
  url: string;
  isButton?: boolean;
  badge?: string;
  openInNewTab?: boolean;
  isActive: boolean;
  displayOrder: number;
}

export interface FooterContactInfo {
  title: string;
  address: string;
  phone: string;
  email: string;
  operatingHours: string;
  mapUrl?: string;
  showMapLink?: boolean;
}

export interface FooterVisitorStats {
  enabled: boolean;
  title: string;
  autoTracking?: boolean;
  todayCount: number;
  totalCount: number;
  onlineCount: number;
  lastActiveDate?: string; // YYYY-MM-DD
}

export interface FooterSocialLinks {
  facebookUrl?: string;
  youtubeUrl?: string;
  lineUrl?: string;
  showSocials: boolean;
}

export interface FooterSettings {
  themeColor: ThemeColorKey;
  backgroundTheme?: BackgroundThemeKey;
  smartCampusBadge?: string;
  showSmartCampusBadge?: boolean;
  brandDescription?: string;
  systemStatusText?: string;
  showSystemStatus?: boolean;

  visitorStats?: FooterVisitorStats;
  socialLinks?: FooterSocialLinks;

  servicesTitle: string;
  services: FooterServiceLink[];

  staffTitle: string;
  staffLinks: FooterStaffLink[];

  contact: FooterContactInfo;

  copyrightText?: string;
  copyrightSubtext?: string;
  showBackToTop?: boolean;
}

export const DEFAULT_FOOTER_SETTINGS: FooterSettings = {
  themeColor: "blue",
  backgroundTheme: "light",
  smartCampusBadge: "Smart Campus",
  showSmartCampusBadge: true,
  brandDescription:
    "มุ่งมั่นจัดการศึกษาขั้นพื้นฐานตามมาตรฐานสากล บนพื้นฐานอัตลักษณ์ความเป็นไทยและคุณธรรมทางพระพุทธศาสนา ก้าวล้ำด้วยนวัตกรรมดิจิทัลเพื่อการเรียนรู้และการบริหารจัดการยุคใหม่",
  systemStatusText: "ระบบบริการออนไลน์พร้อมใช้งาน (All Systems Operational)",
  showSystemStatus: true,
  visitorStats: {
    enabled: true,
    autoTracking: true,
    title: "สถิติผู้เข้าชมเว็บไซต์",
    todayCount: 128,
    totalCount: 45670,
    onlineCount: 14,
  },
  socialLinks: {
    facebookUrl: "https://www.facebook.com",
    youtubeUrl: "https://www.youtube.com",
    lineUrl: "https://line.me",
    showSocials: true,
  },

  servicesTitle: "ระบบงานบริการหลัก",
  services: [
    {
      id: "srv-1",
      label: "ข่าวสารประชาสัมพันธ์",
      url: "#news",
      iconName: "Newspaper",
      openInNewTab: false,
      isActive: true,
      displayOrder: 1,
    },
    {
      id: "srv-2",
      label: "ทำเนียบคณาจารย์และบุคลากร",
      url: "#personnel",
      iconName: "Users",
      openInNewTab: false,
      isActive: true,
      displayOrder: 2,
    },
    {
      id: "srv-3",
      label: "โครงสร้างหลักสูตรการศึกษา",
      url: "#curriculum",
      iconName: "BookOpen",
      openInNewTab: false,
      isActive: true,
      displayOrder: 3,
    },
    {
      id: "srv-4",
      label: "สารสนเทศ (ทะเบียนและดาวน์โหลด)",
      url: "#services",
      iconName: "FileText",
      openInNewTab: false,
      isActive: true,
      displayOrder: 4,
    },
  ],

  staffTitle: "สำหรับเจ้าหน้าที่",
  staffLinks: [
    {
      id: "stf-1",
      label: "เข้าสู่ระบบเจ้าหน้าที่",
      url: "/login",
      isButton: true,
      badge: "",
      openInNewTab: false,
      isActive: true,
      displayOrder: 1,
    },
    {
      id: "stf-2",
      label: "แผงควบคุมหลังบ้าน",
      url: "/dashboard",
      isButton: false,
      badge: "ผู้ดูแลระบบ",
      openInNewTab: false,
      isActive: true,
      displayOrder: 2,
    },
    {
      id: "stf-3",
      label: "ข้อมูลส่วนตัว (Profile)",
      url: "/me",
      isButton: false,
      badge: "ผู้ใช้งานระบบ",
      openInNewTab: false,
      isActive: true,
      displayOrder: 3,
    },
    {
      id: "stf-4",
      label: "ศูนย์เทคโนโลยีและสารสนเทศ",
      url: "",
      isButton: false,
      badge: "หน่วยงานบริการ",
      openInNewTab: false,
      isActive: true,
      displayOrder: 4,
    },
    {
      id: "stf-5",
      label: "รองรับการยืนยันตัวตน SSO",
      url: "",
      isButton: false,
      badge: "มาตรฐานความปลอดภัย",
      openInNewTab: false,
      isActive: true,
      displayOrder: 5,
    },
  ],

  contact: {
    title: "ติดต่อ & สถานที่ตั้ง",
    address:
      "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย 79 หมู่ 1 ต.ลำไทร อ.วังน้อย จ.พระนครศรีอยุธยา 13170",
    phone: "โทรศัพท์: 035-248-000 ต่อ 8888",
    email: "อีเมล: contact@satit.mcu.ac.th",
    operatingHours: "เวลาทำการ: จันทร์ - ศุกร์ 08:30 - 16:30 น.",
    mapUrl: "https://maps.app.goo.gl/1V2qzZTyj8FQV3xA9",
    showMapLink: true,
  },

  copyrightText: "© 2026 SATIT MCU System. All rights reserved.",
  copyrightSubtext: "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย",
  showBackToTop: true,
};

