import { prisma } from "@/shared/lib/infra/prisma";
import { randomUUID } from "crypto";
import type { SchoolInfoData, ExecutiveDto, GalleryItem } from "./types";
import type { UpdateSchoolInfoInput, CreateExecutiveInput, UpdateExecutiveInput } from "./validations";

const DEFAULT_SCHOOL_INFO: SchoolInfoData = {
  nameTh: "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย",
  nameEn: "Demonstration School of Mahachulalongkornrajavidyalaya University (SATIT MCU)",
  shortName: "สาธิต มจร / SATIT MCU",
  motto: "ปญฺญา โลกสฺมิ ปชฺโชโต (ปัญญาเป็นแสงสว่างในโลก)",
  philosophy: "คุณธรรมนำความรู้ มุ่งสู่ความเป็นเลิศ เชิดชูความเป็นไทย ใส่ใจสากล",
  vision: "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย มุ่งมั่นจัดการศึกษาขั้นพื้นฐานตามมาตรฐานสากล บนพื้นฐานอัตลักษณ์วิถีพุทธ พัฒนาผู้เรียนให้มีความเป็นเลิศทางวิชาการ มีคุณธรรม จริยธรรม และมีทักษะศตวรรษที่ 21 เพื่อก้าวสู่ความเป็นพลเมืองโลก",
  mission: [
    "ส่งเสริมและพัฒนาการจัดการเรียนรู้ที่เน้นผู้เรียนเป็นสำคัญ สอดคล้องกับหลักสูตรสถานศึกษาและทักษะแห่งอนาคต",
    "ปลูกฝังคุณธรรม จริยธรรม ตามหลักพุทธศาสนาและวิถีวัฒนธรรมไทยให้เป็นคนดีมีปัญญา",
    "พัฒนาระบบบริหารจัดการสถานศึกษาด้วยเทคโนโลยีดิจิทัลและสารสนเทศที่ทันสมัยอย่างมีประสิทธิภาพ",
    "ส่งเสริมความเป็นเลิศด้านภาษาไทย ภาษาบาลี และภาษาต่างประเทศเพื่อการสื่อสารระดับสากล",
    "สร้างเครือข่ายความร่วมมือทางการศึกษาระหว่างบ้าน วัด โรงเรียน มหาวิทยาลัย และองค์กรภายนอก",
  ],
  identity: "คุณธรรมเด่น เน้นภาษา ก้าวหน้าเทคโนโลยี",
  uniqueness: "วิถีพุทธ วิถีเรียนรู้ คู่คุณธรรม",
  schoolColors: "น้ำเงิน - ส้ม (สีน้ำเงิน แทนความสุขุมรอบคอบและวิชาการ, สีส้ม แทนความรุ่งโรจน์และธรรมะ)",
  treeFlower: "ดอกบัวหลวง (สัญลักษณ์แห่งปัญญาและความบริสุทธิ์) / ต้นอโศกอินเดีย",
  history: "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ก่อตั้งขึ้นภายใต้ความอุปถัมภ์ของมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย เพื่อเป็นสถานศึกษาต้นแบบในการจัดการศึกษาขั้นพื้นฐานที่มีคุณภาพระดับมาตรฐานสากล โดยมุ่งเน้นการบูรณาการองค์ความรู้ทางวิชาการสมัยใหม่เข้ากับคุณธรรม จริยธรรม และวิถีชาวพุทธ จัดการเรียนการสอนตั้งแต่ระดับมัธยมศึกษาตอนต้นถึงมัธยมศึกษาตอนปลาย เพื่อสร้างเยาวชนที่มีศักยภาพสูง มีความเป็นผู้นำ และมีจิตสาธารณะต่อสังคม",
  address: "79 หมู่ที่ 1 ถนนพหลโยธิน ตำบลลำไทร อำเภอวังน้อย จังหวัดพระนครศรีอยุธยา 13170",
  phone: "035-248-000 ต่อ 8888",
  fax: "035-248-001",
  email: "satitmcu@mcu.ac.th",
  website: "https://satit.mcu.ac.th",
  facebook: "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย",
  facebookPageUrl: "https://www.facebook.com/satitmcu",
  facebookDisplayHeight: "medium",
  facebookCustomHeight: 450,
  showFacebookWidget: true,
  line: "@satitmcu",
  mapUrl: "https://maps.google.com/?q=Mahachulalongkornrajavidyalaya+University",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.3944151152177!2d100.48978989999999!3d13.755072400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2990016d91d3d%3A0xe20caf578932a06d!2z4LmC4Lij4LiH4LmA4Lij4Li14Lii4LiZ4Liq4Liy4LiY4Li04LiV4Lih4Lir4Liy4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4Lih4Lir4Liy4LiI4Li44Lis4Liy4Lil4LiH4LiB4Lij4LiT4Lij4Liy4LiK4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii!5e0!3m2!1sth!2sth!4v1791967187909!5m2!1sth!2sth",
  mapDisplayHeight: "medium",
  mapCustomHeight: 450,
  showMapWidget: true,
  logoUrl: "/uploads/d4f85d59-3252-4527-abe9-66982ada3054.jpg",
  coverImageUrl: "/uploads/cfd0ca66-3918-4fd8-aeaf-73bc0a81479a.jpg",
  gallery: [
    {
      id: "gal-1",
      url: "/uploads/cfd0ca66-3918-4fd8-aeaf-73bc0a81479a.jpg",
      title: "ทัศนียภาพอาคารเรียนและบริเวณโรงเรียนสาธิต มจร",
      description: "สภาพแวดล้อมที่ร่มรื่น สะอาด ปลอดภัย เอื้อต่อการเรียนรู้และการพัฒนาทักษะของผู้เรียน",
      createdAt: new Date().toISOString(),
    },
    {
      id: "gal-2",
      url: "/uploads/d190e45c-6aad-4b3a-9944-4583afddfd36.jfif",
      title: "กิจกรรมเสริมสร้างคุณธรรมและวิถีชาวพุทธ",
      description: "การฝึกอบรมสมาธิ ภาวนา และการเรียนรู้หลักพุทธศาสนาบูรณาการในการดำเนินชีวิต",
      createdAt: new Date().toISOString(),
    },
  ],
};

const DEFAULT_EXECUTIVES: ExecutiveDto[] = [
  {
    id: "exec-1",
    prefix: "พระธรรมวชิรปัญญาภรณ์",
    firstName: "ทองดี",
    lastName: "สุรเตโช",
    position: "ประธานคณะกรรมการสถานศึกษาขั้นพื้นฐาน",
    academicRank: "ศ., ดร., ป.ธ.๙",
    department: "คณะกรรมการสถานศึกษา",
    displayOrder: 1,
    imageUrl: null,
    message: "มุ่งหวังให้โรงเรียนสาธิต มจร เป็นแหล่งบ่มเพาะปัญญาและคุณธรรม สร้างเยาวชนที่มีจิตสาธารณะ มีคุณธรรม และมีความรู้ความสามารถระดับสากล",
    phone: "035-248-000 ต่อ 8100",
    email: "board@satitmcu.ac.th",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "exec-2",
    prefix: "รศ.ดร.",
    firstName: "สมศักดิ์",
    lastName: "ปัญญาดี",
    position: "ผู้อำนวยการโรงเรียนสาธิต มจร",
    academicRank: "ปร.ด. การบริหารการศึกษา",
    department: "สำนักงานผู้อำนวยการ",
    displayOrder: 2,
    imageUrl: null,
    message: "เรามุ่งเน้นการศึกษาที่มีคุณภาพสูง ผสานเทคโนโลยีและวิถีพุทธ เพื่อพัฒนาเยาวชนให้เติบโตอย่างสมดุลทั้งกาย จิตใจ สติปัญญา และสังคม",
    phone: "035-248-000 ต่อ 8101",
    email: "director@satitmcu.ac.th",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "exec-3",
    prefix: "อาจารย์",
    firstName: "นิโรจน์",
    lastName: "วงศ์เมืองแก่น",
    position: "รองผู้อำนวยการฝ่ายวิชาการและวิจัย",
    academicRank: "กศ.ม. การศึกษาและการวิจัย",
    department: "ฝ่ายวิชาการ",
    displayOrder: 3,
    imageUrl: "/uploads/3c1e4a7d-7849-48ec-87a9-db9becbc48c2.jpg",
    message: "ยกระดับมาตรฐานหลักสูตรสู่ความเป็นเลิศ พัฒนาสื่อและนวัตกรรม พร้อมด้วยการวัดและประเมินผลตามสภาพจริง",
    phone: "035-248-000 ต่อ 8102",
    email: "academic@satitmcu.ac.th",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "exec-4",
    prefix: "พระมหา",
    firstName: "บุญเลิศ",
    lastName: "เขมธโร",
    position: "รองผู้อำนวยการฝ่ายกิจการนักเรียนและคุณธรรม",
    academicRank: "พธ.บ., ป.ธ.๗",
    department: "ฝ่ายกิจการนักเรียน",
    displayOrder: 4,
    imageUrl: null,
    message: "ส่งเสริมระเบียบวินัย คุณธรรม จริยธรรม กิจกรรมสร้างสรรค์ และสุขภาวะที่ดีของนักเรียนทุกคน",
    phone: "035-248-000 ต่อ 8103",
    email: "studentaffairs@satitmcu.ac.th",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Helper to get raw settings
async function getTenantSettings(tenantId: string): Promise<Record<string, any>> {
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    select: { settings: true, nameTh: true, nameEn: true, logoUrl: true },
  });
  const settings = (tenant?.settings && typeof tenant.settings === "object" ? tenant.settings : {}) as Record<string, any>;
  return { ...settings, _tenant: tenant };
}

export async function getSchoolInfo(tenantId: string): Promise<SchoolInfoData> {
  const data = await getTenantSettings(tenantId);
  const stored = data.schoolInfo as Partial<SchoolInfoData> | undefined;

  return {
    nameTh: data._tenant?.nameTh || stored?.nameTh || DEFAULT_SCHOOL_INFO.nameTh,
    nameEn: data._tenant?.nameEn || stored?.nameEn || DEFAULT_SCHOOL_INFO.nameEn,
    shortName: stored?.shortName || DEFAULT_SCHOOL_INFO.shortName,
    motto: stored?.motto || DEFAULT_SCHOOL_INFO.motto,
    philosophy: stored?.philosophy || DEFAULT_SCHOOL_INFO.philosophy,
    vision: stored?.vision || DEFAULT_SCHOOL_INFO.vision,
    mission: stored?.mission || DEFAULT_SCHOOL_INFO.mission,
    identity: stored?.identity || DEFAULT_SCHOOL_INFO.identity,
    uniqueness: stored?.uniqueness || DEFAULT_SCHOOL_INFO.uniqueness,
    schoolColors: stored?.schoolColors || DEFAULT_SCHOOL_INFO.schoolColors,
    treeFlower: stored?.treeFlower || DEFAULT_SCHOOL_INFO.treeFlower,
    history: stored?.history || DEFAULT_SCHOOL_INFO.history,
    address: stored?.address || DEFAULT_SCHOOL_INFO.address,
    phone: stored?.phone || DEFAULT_SCHOOL_INFO.phone,
    fax: stored?.fax || DEFAULT_SCHOOL_INFO.fax,
    email: stored?.email || DEFAULT_SCHOOL_INFO.email,
    website: stored?.website || DEFAULT_SCHOOL_INFO.website,
    facebook: stored?.facebook || DEFAULT_SCHOOL_INFO.facebook,
    facebookPageUrl: stored?.facebookPageUrl || DEFAULT_SCHOOL_INFO.facebookPageUrl,
    facebookDisplayHeight: stored?.facebookDisplayHeight || DEFAULT_SCHOOL_INFO.facebookDisplayHeight,
    facebookCustomHeight: stored?.facebookCustomHeight || DEFAULT_SCHOOL_INFO.facebookCustomHeight,
    showFacebookWidget: stored?.showFacebookWidget ?? DEFAULT_SCHOOL_INFO.showFacebookWidget,
    line: stored?.line || DEFAULT_SCHOOL_INFO.line,
    mapUrl: stored?.mapUrl || DEFAULT_SCHOOL_INFO.mapUrl,
    mapEmbedUrl: stored?.mapEmbedUrl || DEFAULT_SCHOOL_INFO.mapEmbedUrl,
    mapDisplayHeight: stored?.mapDisplayHeight || DEFAULT_SCHOOL_INFO.mapDisplayHeight,
    mapCustomHeight: stored?.mapCustomHeight || DEFAULT_SCHOOL_INFO.mapCustomHeight,
    showMapWidget: stored?.showMapWidget ?? DEFAULT_SCHOOL_INFO.showMapWidget,
    logoUrl: data._tenant?.logoUrl || stored?.logoUrl || DEFAULT_SCHOOL_INFO.logoUrl,
    coverImageUrl: stored?.coverImageUrl || DEFAULT_SCHOOL_INFO.coverImageUrl,
    gallery: Array.isArray(stored?.gallery) ? stored!.gallery : DEFAULT_SCHOOL_INFO.gallery,
  };
}

export async function updateSchoolInfo(tenantId: string, input: UpdateSchoolInfoInput): Promise<SchoolInfoData> {
  const current = await getTenantSettings(tenantId);
  const { _tenant, ...cleanSettings } = current;

  const updatedSettings = {
    ...cleanSettings,
    schoolInfo: input,
  };

  await prisma.tenant.update({
    where: { id: tenantId },
    data: {
      nameTh: input.nameTh,
      nameEn: input.nameEn || input.nameTh,
      logoUrl: input.logoUrl || null,
      settings: updatedSettings as any,
    },
  });

  return getSchoolInfo(tenantId);
}

export async function listExecutives(tenantId: string): Promise<ExecutiveDto[]> {
  const data = await getTenantSettings(tenantId);
  const stored = data.executives;

  if (Array.isArray(stored) && stored.length > 0) {
    return (stored as ExecutiveDto[]).sort((a, b) => a.displayOrder - b.displayOrder);
  }

  // If no executives stored yet, seed default ones into tenant.settings
  const { _tenant, ...cleanSettings } = data;
  await prisma.tenant.update({
    where: { id: tenantId },
    data: {
      settings: {
        ...cleanSettings,
        executives: DEFAULT_EXECUTIVES,
      } as any,
    },
  });

  return DEFAULT_EXECUTIVES;
}

export async function createExecutive(tenantId: string, input: CreateExecutiveInput): Promise<ExecutiveDto> {
  const currentList = await listExecutives(tenantId);
  const now = new Date().toISOString();

  const newExecutive: ExecutiveDto = {
    id: randomUUID(),
    prefix: input.prefix || "",
    firstName: input.firstName,
    lastName: input.lastName,
    position: input.position,
    academicRank: input.academicRank || "",
    department: input.department || "",
    displayOrder: input.displayOrder || currentList.length + 1,
    imageUrl: input.imageUrl || null,
    message: input.message || null,
    phone: input.phone || null,
    email: input.email || null,
    isActive: input.isActive ?? true,
    createdAt: now,
    updatedAt: now,
  };

  const updatedList = [...currentList, newExecutive].sort((a, b) => a.displayOrder - b.displayOrder);

  const data = await getTenantSettings(tenantId);
  const { _tenant, ...cleanSettings } = data;

  await prisma.tenant.update({
    where: { id: tenantId },
    data: {
      settings: {
        ...cleanSettings,
        executives: updatedList,
      } as any,
    },
  });

  return newExecutive;
}

export async function updateExecutive(tenantId: string, input: UpdateExecutiveInput): Promise<ExecutiveDto> {
  const currentList = await listExecutives(tenantId);
  const index = currentList.findIndex((e) => e.id === input.id);
  if (index === -1) {
    throw new Error("ไม่พบข้อมูลผู้บริหาร");
  }

  const existing = currentList[index];
  const now = new Date().toISOString();

  const updatedItem: ExecutiveDto = {
    ...existing,
    prefix: input.prefix !== undefined ? input.prefix : existing.prefix,
    firstName: input.firstName || existing.firstName,
    lastName: input.lastName || existing.lastName,
    position: input.position || existing.position,
    academicRank: input.academicRank !== undefined ? input.academicRank : existing.academicRank,
    department: input.department !== undefined ? input.department : existing.department,
    displayOrder: input.displayOrder !== undefined ? input.displayOrder : existing.displayOrder,
    imageUrl: input.imageUrl !== undefined ? input.imageUrl : existing.imageUrl,
    message: input.message !== undefined ? input.message : existing.message,
    phone: input.phone !== undefined ? input.phone : existing.phone,
    email: input.email !== undefined ? input.email : existing.email,
    isActive: input.isActive !== undefined ? input.isActive : existing.isActive,
    updatedAt: now,
  };

  currentList[index] = updatedItem;
  currentList.sort((a, b) => a.displayOrder - b.displayOrder);

  const data = await getTenantSettings(tenantId);
  const { _tenant, ...cleanSettings } = data;

  await prisma.tenant.update({
    where: { id: tenantId },
    data: {
      settings: {
        ...cleanSettings,
        executives: currentList,
      } as any,
    },
  });

  return updatedItem;
}

export async function deleteExecutive(tenantId: string, id: string): Promise<void> {
  const currentList = await listExecutives(tenantId);
  const updatedList = currentList.filter((e) => e.id !== id);

  const data = await getTenantSettings(tenantId);
  const { _tenant, ...cleanSettings } = data;

  await prisma.tenant.update({
    where: { id: tenantId },
    data: {
      settings: {
        ...cleanSettings,
        executives: updatedList,
      } as any,
    },
  });
}

export async function reorderExecutives(tenantId: string, orderedIds: string[]): Promise<ExecutiveDto[]> {
  const currentList = await listExecutives(tenantId);
  const map = new Map(currentList.map((e) => [e.id, e]));

  const updatedList: ExecutiveDto[] = [];
  const now = new Date().toISOString();

  orderedIds.forEach((id, index) => {
    const item = map.get(id);
    if (item) {
      updatedList.push({
        ...item,
        displayOrder: index + 1,
        updatedAt: now,
      });
      map.delete(id);
    }
  });

  // Append any remaining
  Array.from(map.values()).forEach((item, index) => {
    updatedList.push({
      ...item,
      displayOrder: orderedIds.length + index + 1,
      updatedAt: now,
    });
  });

  const data = await getTenantSettings(tenantId);
  const { _tenant, ...cleanSettings } = data;

  await prisma.tenant.update({
    where: { id: tenantId },
    data: {
      settings: {
        ...cleanSettings,
        executives: updatedList,
      } as any,
    },
  });

  return updatedList;
}
