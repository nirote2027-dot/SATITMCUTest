const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();
async function main() {
  const t = await prisma.tenant.findFirst();
  console.log('Palette in DB:', t?.settings?.palette);
  console.log('FooterSettings:', JSON.stringify(t?.settings?.footerSettings, null, 2));
  await prisma.$disconnect();
}
main();
