export type HeroDisplayMode = "hybrid" | "3d" | "slideshow" | "video";

export interface HeroSlideItem {
  id: string;
  title?: string;
  subtitle?: string;
  imageUrl: string;
  buttonText?: string;
  buttonUrl?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface HeroSettings {
  displayMode: HeroDisplayMode;

  eyebrowBadge: string;
  showEyebrowBadge: boolean;

  headlinePart1: string;
  showHeadlinePart1: boolean;

  headlinePart2: string;
  showHeadlinePart2: boolean;

  description: string;
  showDescription: boolean;

  primaryButtonText: string;
  primaryButtonUrl: string;
  showPrimaryButton: boolean;

  secondaryButtonText: string;
  secondaryButtonUrl: string;
  showSecondaryButton: boolean;

  // Background Video
  videoBgUrl?: string;
  showVideoBg: boolean;

  // 3D Options
  show3DCoins: boolean;
  showParticles: boolean;
  coinSpeed: number; // 0.5, 1.0, 1.5, 2.0

  // Slideshow
  slideInterval: number; // in seconds (e.g. 5)
  slideAnimation: "kenburns" | "fade" | "slide";
  slideBrightness: "bright" | "normal" | "cinematic";
  slides: HeroSlideItem[];
}

export const DEFAULT_HERO_SETTINGS: HeroSettings = {
  displayMode: "hybrid",
  eyebrowBadge: "SMART FACULTY WEB PLATFORM • SATIT MCU",
  showEyebrowBadge: true,
  headlinePart1: "พัฒนาปัญญา สร้างสรรค์วิชาการ",
  showHeadlinePart1: true,
  headlinePart2: "สู่นวัตกรรมการศึกษาและบริหารจัดการที่ทันสมัย",
  showHeadlinePart2: true,
  description:
    "ศูนย์กลางบริการการศึกษาและบริหารงานโรงเรียนยุคใหม่ ครอบคลุมระบบข่าวสาร จัดการหลักสูตร ทำเนียบคณาจารย์ ระบบสารสนเทศงานทะเบียนและวัดผล และศูนย์ดาวน์โหลด",
  showDescription: true,
  primaryButtonText: "สำรวจหลักสูตรการศึกษา",
  primaryButtonUrl: "#curriculum",
  showPrimaryButton: true,
  secondaryButtonText: "ข่าวประชาสัมพันธ์",
  secondaryButtonUrl: "#news",
  showSecondaryButton: true,
  videoBgUrl:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_115655_b4d9cd77-feed-43cd-a198-af78ebdf1f7a.mp4",
  showVideoBg: true,
  show3DCoins: true,
  showParticles: true,
  coinSpeed: 1.0,
  slideInterval: 5,
  slideAnimation: "kenburns",
  slideBrightness: "bright",
  slides: [
    {
      id: "slide-1",
      title: "ยินดีต้อนรับสู่ โรงเรียนสาธิต มจร",
      subtitle: "มุ่งมั่นพัฒนาวิชาการ ปลูกฝังคุณธรรม ก้าวทันเทคโนโลยีดิจิทัลสู่สากล",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&auto=format&fit=crop&q=80",
      buttonText: "เกี่ยวกับโรงเรียน",
      buttonUrl: "#about",
      displayOrder: 1,
      isActive: true,
    },
    {
      id: "slide-2",
      title: "นวัตกรรมการศึกษาและการจัดการเรียนรู้ยุคใหม่",
      subtitle: "ห้องปฏิบัติการคอมพิวเตอร์และปัญญาประดิษฐ์ พร้อมส่งเสริมทักษะศตวรรษที่ 21",
      imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&auto=format&fit=crop&q=80",
      buttonText: "สำรวจหลักสูตร",
      buttonUrl: "#curriculum",
      displayOrder: 2,
      isActive: true,
    },
    {
      id: "slide-3",
      title: "ระบบบริการการศึกษาดิจิทัลครบวงจร",
      subtitle: "งานทะเบียนและวัดผลออนไลน์ ศูนย์ดาวน์โหลดเอกสาร และระบบติดตามผลการเรียน",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&auto=format&fit=crop&q=80",
      buttonText: "บริการสารสนเทศ",
      buttonUrl: "/download",
      displayOrder: 3,
      isActive: true,
    },
  ],
};
