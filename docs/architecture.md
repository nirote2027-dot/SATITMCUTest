# Architecture & Tech Stack Decisions (Satit MCU Student Dashboard)

เอกสารนี้รวบรวม **การตัดสินใจเชิงเทคนิค (Technical Decisions)** และ **Tech Stack Configuration** ที่ฟันธงแล้ว เพื่อใช้เป็นแหล่งอ้างอิงหลัก (Source of Truth) สำหรับ AI Agent และทีมพัฒนา ในกระบวนการ Vibe Coding

---

## 1. Repository & Project Structure
**Decision:** Standard Next.js Directory (App Router) - No Monorepo
*   **Rationale:** สำหรับระยะเวลา MVP 6-9 เดือน การใช้โครงสร้าง Next.js แบบมาตรฐาน (รวบ Frontend และ Backend API ไว้ด้วยกัน) จะช่วยให้ AI Agent มองเห็น Context ทั้งหมดได้ง่ายกว่าการแยก Monorepo ซึ่งมักทำให้ AI สับสนเรื่อง Import paths
*   **Structure Rule:**
    *   `/app`: สำหรับ Pages, Layouts, และ API Routes (Next.js App Router)
    *   `/components`: สำหรับ UI components ที่ใช้ซ้ำ (เช่น ปุ่ม, การ์ด)
    *   `/lib`: สำหรับ Utility functions, Database connections
    *   `/features`: (Optional) แบ่งตาม Module เช่น `/features/grading`, `/features/attendance` เพื่อให้โค้ดเป็นระเบียบ

## 2. Database Strategy & ORM
**Decision:** PostgreSQL (Supabase) + Prisma ORM
*   **Database:** เลือกใช้ **Supabase** (Managed PostgreSQL) เนื่องจากมี Row Level Security (RLS) ซึ่งตอบโจทย์เรื่อง PDPA และการแบ่งสิทธิ์ (ครู/นักเรียน) ได้ในระดับฐานข้อมูลทันที 
*   **ORM:** เลือกใช้ **Prisma ORM**
*   **Rationale:** `schema.prisma` เป็นภาษาที่ AI Agent เข้าใจได้ดีที่สุด สามารถ Generate Typescript type ให้อัตโนมัติ ช่วยลด Runtime error ในฝั่ง Backend ได้เกือบ 100%

## 3. State Management & Data Fetching
**Decision:** React Server Components (RSC) + React Query (TanStack Query)
*   **Rationale:**
    *   ใช้ **RSC** (Server Components) เป็นหลักในการดึงข้อมูล (Fetch) เพื่อลดภาระการโหลดของฝั่ง Client และเพิ่มความปลอดภัย (ซ่อน Database queries)
    *   ใช้ **React Query** เฉพาะฝั่ง Client (Client Components) สำหรับข้อมูลที่ต้องมีการอัปเดตแบบ Real-time หรือข้อมูลที่ผู้ใช้ต้อง Interact บ่อยๆ เช่น การกรอกเกรด หรือเช็คชื่อ
    *   *ห้ามใช้* Global State ใหญ่ๆ อย่าง Redux เพื่อลดความซับซ้อน

## 4. UI Components & Styling
**Decision:** Tailwind CSS + shadcn/ui
*   **Rationale:** เป็น De facto standard ของการทำ Vibe Coding ในปัจจุบัน AI Agent (Cursor/Copilot) ถูกฝึกมากับ Tailwind และ shadcn/ui อย่างเข้มข้น ทำให้สามารถสร้าง UI ของ Dashboard, ฟอร์มกรอกข้อมูล, และตารางผลการเรียน ได้รวดเร็วและสวยงามโดยมีบั๊กเรื่อง CSS น้อยที่สุด

## 5. PDF Engine Architecture (ปพ.1)
**Decision:** Microservice for PDF Generation (Puppeteer / Playwright)
*   **Problem:** Serverless Functions (เช่น Vercel) มักมีปัญหา Timeout (เกิน 10-15 วินาที) และข้อจำกัดด้านขนาดไฟล์เมื่อรัน Headless Browser 
*   **Solution:** แยกส่วนระบบออกใบ ปพ.1 เป็น Service แยกต่างหาก 
    *   ใช้ Node.js + Puppeteer รันบน Container (เช่น Docker บน Render, Railway หรือ AWS App Runner)
    *   Next.js API จะส่งคำสั่ง (Webhook / REST) ไปยัง PDF Service พร้อม Data
    *   PDF Service ทำการ Render HTML สวมฟอนต์ TH Sarabun แล้วส่งไฟล์ PDF กลับมา
*   **Rationale:** ป้องกันไม่ให้จังหวะที่คนสั่งปรินต์ใบ ปพ.1 พร้อมกันเยอะๆ ไปดึงทรัพยากรจนเว็บหลัก (Next.js) ล่ม

## 6. Authentication Strategy
**Decision:** NextAuth.js (Auth.js) / Supabase Auth
*   **Rationale:** รองรับการเชื่อมต่อกับระบบภายนอก (OAuth) เช่น Google Workspace ของมหาลัย หรือ LDAP ขององค์กรได้อย่างง่ายดาย พร้อมจัดการเรื่อง Session และ JWT ให้อัตโนมัติ

## 7. API Design & Validation
**Decision:** REST API via Next.js Route Handlers (`/app/api/...`) + Zod
*   **Rationale:** เรียบง่ายและตรงไปตรงมา ไม่จำเป็นต้องตั้ง GraphQL Server ที่ซับซ้อนเกินไป เน้นการใช้ **Zod** สำหรับ Validate Payload (Data validation) อย่างเข้มงวด เพื่อความปลอดภัยก่อนบันทึกลง Database
