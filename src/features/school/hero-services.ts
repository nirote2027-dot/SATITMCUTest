import { prisma } from "@/shared/lib/infra/prisma";
import { type HeroSettings, DEFAULT_HERO_SETTINGS } from "./hero-types";

export async function getHeroSettings(tenantId?: string): Promise<HeroSettings> {
  if (!tenantId) {
    // If no tenantId provided, fetch default tenant
    const firstTenant = await prisma.tenant.findFirst({
      select: { id: true, settings: true },
    });
    if (!firstTenant) return DEFAULT_HERO_SETTINGS;
    return extractHeroSettings(firstTenant.settings);
  }

  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    select: { settings: true },
  });

  if (!tenant) return DEFAULT_HERO_SETTINGS;
  return extractHeroSettings(tenant.settings);
}

function extractHeroSettings(settings: unknown): HeroSettings {
  const rawSettings = (settings && typeof settings === "object"
    ? settings
    : {}) as Record<string, any>;

  const stored = rawSettings.heroSettings as Partial<HeroSettings> | undefined;

  if (!stored) {
    return DEFAULT_HERO_SETTINGS;
  }

  return {
    displayMode: stored.displayMode || DEFAULT_HERO_SETTINGS.displayMode,
    eyebrowBadge: stored.eyebrowBadge ?? DEFAULT_HERO_SETTINGS.eyebrowBadge,
    showEyebrowBadge: stored.showEyebrowBadge ?? DEFAULT_HERO_SETTINGS.showEyebrowBadge,
    headlinePart1: stored.headlinePart1 ?? DEFAULT_HERO_SETTINGS.headlinePart1,
    showHeadlinePart1: stored.showHeadlinePart1 ?? DEFAULT_HERO_SETTINGS.showHeadlinePart1,
    headlinePart2: stored.headlinePart2 ?? DEFAULT_HERO_SETTINGS.headlinePart2,
    showHeadlinePart2: stored.showHeadlinePart2 ?? DEFAULT_HERO_SETTINGS.showHeadlinePart2,
    description: stored.description ?? DEFAULT_HERO_SETTINGS.description,
    showDescription: stored.showDescription ?? DEFAULT_HERO_SETTINGS.showDescription,
    primaryButtonText: stored.primaryButtonText ?? DEFAULT_HERO_SETTINGS.primaryButtonText,
    primaryButtonUrl: stored.primaryButtonUrl ?? DEFAULT_HERO_SETTINGS.primaryButtonUrl,
    showPrimaryButton: stored.showPrimaryButton ?? DEFAULT_HERO_SETTINGS.showPrimaryButton,
    secondaryButtonText: stored.secondaryButtonText ?? DEFAULT_HERO_SETTINGS.secondaryButtonText,
    secondaryButtonUrl: stored.secondaryButtonUrl ?? DEFAULT_HERO_SETTINGS.secondaryButtonUrl,
    showSecondaryButton: stored.showSecondaryButton ?? DEFAULT_HERO_SETTINGS.showSecondaryButton,
    videoBgUrl: stored.videoBgUrl ?? DEFAULT_HERO_SETTINGS.videoBgUrl,
    showVideoBg: stored.showVideoBg ?? DEFAULT_HERO_SETTINGS.showVideoBg,
    show3DCoins: stored.show3DCoins ?? DEFAULT_HERO_SETTINGS.show3DCoins,
    showParticles: stored.showParticles ?? DEFAULT_HERO_SETTINGS.showParticles,
    coinSpeed: typeof stored.coinSpeed === "number" ? stored.coinSpeed : DEFAULT_HERO_SETTINGS.coinSpeed,
    slideInterval: typeof stored.slideInterval === "number" ? stored.slideInterval : DEFAULT_HERO_SETTINGS.slideInterval,
    slideAnimation: stored.slideAnimation || DEFAULT_HERO_SETTINGS.slideAnimation,
    slideBrightness: stored.slideBrightness || DEFAULT_HERO_SETTINGS.slideBrightness,
    slides: Array.isArray(stored.slides) && stored.slides.length > 0 ? stored.slides : DEFAULT_HERO_SETTINGS.slides,
  };
}

export async function updateHeroSettings(
  tenantId: string,
  input: HeroSettings
): Promise<HeroSettings> {
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    select: { settings: true },
  });

  const currentSettings = (tenant?.settings && typeof tenant.settings === "object"
    ? tenant.settings
    : {}) as Record<string, any>;

  const updatedSettings = {
    ...currentSettings,
    heroSettings: input as any,
  };

  await prisma.tenant.update({
    where: { id: tenantId },
    data: {
      settings: updatedSettings as any,
    },
  });

  return input;
}
