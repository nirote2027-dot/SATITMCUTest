import { prisma } from "@/shared/lib/infra/prisma";
import {
  type FooterSettings,
  DEFAULT_FOOTER_SETTINGS,
  type ThemeColorKey,
} from "./types";

export async function getFooterSettings(tenantId: string): Promise<FooterSettings> {
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    select: { settings: true },
  });

  const rawSettings = (tenant?.settings && typeof tenant.settings === "object"
    ? tenant.settings
    : {}) as Record<string, any>;

  const stored = rawSettings.footerSettings as Partial<FooterSettings> | undefined;
  const currentPalette = (rawSettings.palette as ThemeColorKey) || DEFAULT_FOOTER_SETTINGS.themeColor;

  if (!stored) {
    return {
      ...DEFAULT_FOOTER_SETTINGS,
      themeColor: currentPalette,
    };
  }

  return {
    themeColor: stored.themeColor || currentPalette,
    backgroundTheme: stored.backgroundTheme || DEFAULT_FOOTER_SETTINGS.backgroundTheme || "light",
    smartCampusBadge: stored.smartCampusBadge ?? DEFAULT_FOOTER_SETTINGS.smartCampusBadge,
    showSmartCampusBadge: stored.showSmartCampusBadge ?? DEFAULT_FOOTER_SETTINGS.showSmartCampusBadge,
    brandDescription: stored.brandDescription ?? DEFAULT_FOOTER_SETTINGS.brandDescription,
    systemStatusText: stored.systemStatusText ?? DEFAULT_FOOTER_SETTINGS.systemStatusText,
    showSystemStatus: stored.showSystemStatus ?? DEFAULT_FOOTER_SETTINGS.showSystemStatus,
    visitorStats: stored.visitorStats
      ? { ...DEFAULT_FOOTER_SETTINGS.visitorStats, ...stored.visitorStats }
      : DEFAULT_FOOTER_SETTINGS.visitorStats,
    socialLinks: stored.socialLinks
      ? { ...DEFAULT_FOOTER_SETTINGS.socialLinks, ...stored.socialLinks }
      : DEFAULT_FOOTER_SETTINGS.socialLinks,
    servicesTitle: stored.servicesTitle || DEFAULT_FOOTER_SETTINGS.servicesTitle,
    services: Array.isArray(stored.services) ? stored.services : DEFAULT_FOOTER_SETTINGS.services,
    staffTitle: stored.staffTitle || DEFAULT_FOOTER_SETTINGS.staffTitle,
    staffLinks: Array.isArray(stored.staffLinks) ? stored.staffLinks : DEFAULT_FOOTER_SETTINGS.staffLinks,
    contact: stored.contact ? { ...DEFAULT_FOOTER_SETTINGS.contact, ...stored.contact } : DEFAULT_FOOTER_SETTINGS.contact,
    copyrightText: stored.copyrightText ?? DEFAULT_FOOTER_SETTINGS.copyrightText,
    copyrightSubtext: stored.copyrightSubtext ?? DEFAULT_FOOTER_SETTINGS.copyrightSubtext,
    showBackToTop: stored.showBackToTop ?? DEFAULT_FOOTER_SETTINGS.showBackToTop,
  };
}

export async function updateFooterSettings(
  tenantId: string,
  input: FooterSettings
): Promise<FooterSettings> {
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    select: { settings: true },
  });

  const rawSettings = (tenant?.settings && typeof tenant.settings === "object"
    ? tenant.settings
    : {}) as Record<string, any>;

  const updatedSettings = {
    ...rawSettings,
    palette: input.themeColor, // Synchronize Liyon palette for Admin & Root
    footerSettings: input,
  };

  await prisma.tenant.update({
    where: { id: tenantId },
    data: {
      settings: updatedSettings as any,
    },
  });

  return getFooterSettings(tenantId);
}

/**
 * บันทึกการเข้าชมเว็บไซต์อัตโนมัติ (Auto-Tracker)
 * - ตรวจสอบวันที่: หากขึ้นวันใหม่ จะรีเซ็ต todayCount เป็น 1
 * - หากเป็นวันเดิม: todayCount + 1, totalCount + 1
 * - คำนวณ onlineCount แบบ dynamic สุ่มจำลองช่วง active 8 - 25 คน
 */
export async function recordVisitorHit(tenantId: string): Promise<FooterSettings["visitorStats"]> {
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    select: { settings: true },
  });

  if (!tenant) return undefined;

  const rawSettings = (tenant.settings && typeof tenant.settings === "object"
    ? tenant.settings
    : {}) as Record<string, any>;

  const stored = (rawSettings.footerSettings || {}) as Partial<FooterSettings>;
  const currentStats = stored.visitorStats || DEFAULT_FOOTER_SETTINGS.visitorStats!;

  // ถ้าปิด autoTracking หรือปิดระบบสถิติ ให้คืนค่าเดิม
  if (currentStats.enabled === false || currentStats.autoTracking === false) {
    return currentStats;
  }

  // วันที่ปัจจุบันในรูปแบบ YYYY-MM-DD ตามเวลาประเทศไทย
  const now = new Date();
  const todayStr = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
  }).format(now);

  const isNewDay = currentStats.lastActiveDate !== todayStr;
  const newTodayCount = isNewDay ? 1 : (currentStats.todayCount || 0) + 1;
  const newTotalCount = (currentStats.totalCount || 0) + 1;

  // จำลอง online active users มีความเคลื่อนไหวสมจริงตามช่วงเวลา
  const baseOnline = Math.max(5, Math.floor(newTodayCount / 15));
  const dynamicOnline = Math.min(65, Math.max(3, baseOnline + (now.getSeconds() % 7) - 2));

  const updatedStats = {
    ...currentStats,
    todayCount: newTodayCount,
    totalCount: newTotalCount,
    onlineCount: dynamicOnline,
    lastActiveDate: todayStr,
  };

  const updatedSettings = {
    ...rawSettings,
    footerSettings: {
      ...stored,
      visitorStats: updatedStats,
    },
  };

  await prisma.tenant.update({
    where: { id: tenantId },
    data: { settings: updatedSettings as any },
  });

  return updatedStats;
}
