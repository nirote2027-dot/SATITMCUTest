import Link from "next/link";
import { requireSession, getDashboardStats } from "@/features/identity/server";
import { getT } from "@/i18n/server";
import { LiyonCard } from "@/shared/components/liyon";

export default async function DashboardPage() {
  const ctx = await requireSession();
  const [t, stats] = await Promise.all([getT(), getDashboardStats(ctx.tenantId)]);
  const cards = [
    { label: t("dash.users"), value: stats.users },
    { label: t("dash.activeUsers"), value: stats.activeUsers },
    { label: t("dash.roles"), value: stats.roles },
  ];
  return (
    <>
      <header className="ph">
        <h1>{t("dash.title")}</h1>
        <p className="sub">{t("dash.welcome", { name: ctx.userName })}</p>
      </header>
      <div className="kpis">
        {cards.map((c) => (
          <LiyonCard key={c.label} className="kpi">
            <span className="lab">{c.label}</span>
            <b className="val num">{c.value}</b>
          </LiyonCard>
        ))}
      </div>

      <section style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>ระบบงานคณะ (Faculty Platform)</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
          {[
            { title: "ระบบจัดการข่าวสารประชาสัมพันธ์", href: "/news", desc: "เผยแพร่ข่าวสาร ประกาศ กิจกรรมของคณะ" },
            { title: "ระบบจัดการบุคลากร", href: "/personnel", desc: "ข้อมูลอาจารย์และเจ้าหน้าที่ ทำเนียบบุคลากร" },
            { title: "ระบบจัดการหลักสูตร", href: "/curriculum", desc: "โครงสร้างหลักสูตร แผนการเรียน และรายวิชา" },
            { title: "ระบบบริหารและอนุมัติเอกสาร", href: "/document", desc: "ยื่นคำร้อง ติดตามสถานะ และอนุมัติเอกสาร" },
            { title: "ระบบจองห้องและยานพาหนะ", href: "/facility", desc: "จองห้องประชุม ห้องปฏิบัติการ และรถยนต์ส่วนกลาง" },
          ].map((f) => (
            <Link key={f.href} href={f.href} style={{ textDecoration: "none", color: "inherit" }}>
              <LiyonCard className="p-5 h-full cursor-pointer transition-all hover:shadow-md">
                <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--muted, #666)", margin: 0 }}>{f.desc}</p>
              </LiyonCard>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
