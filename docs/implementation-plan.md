# Implementation Plan (Execution Roadmap)

แผนการพัฒนาทีละ Step (Step-by-step) สำหรับให้ AI Agent ปฏิบัติตามอย่างเป็นลำดับ ห้ามข้ามขั้นตอน

## Phase 1: Foundation & Auth (Week 1)
- [ ] Initialize Next.js App Router (TypeScript, Tailwind, shadcn/ui).
- [ ] Setup Supabase Project & Prisma ORM.
- [ ] Create basic `schema.prisma` from `schema.md`.
- [ ] Implement Authentication (NextAuth / Supabase Auth) & Role-based Layouts.

## Phase 2: Core Data Management (Week 2-3)
- [ ] (Admin) CRUD Modules for Users, Students, Teachers, and Courses.
- [ ] Data Import Function (CSV) for initial student load.
- [ ] Setup Teaching Assignments logic.

## Phase 3: Academic & Grading Engine (Week 4-5)
- [ ] (Teacher) Subject view and Grade entry form.
- [ ] Server-side validation for grades (0-4, ร, มส).
- [ ] Auto-calculate GPA per term and GPAX.

## Phase 4: Student Portal & Gatekeeper (Week 6)
- [ ] (Student) Dashboard View.
- [ ] Implement Teacher Evaluation Gatekeeper (Must complete evaluation to see grades).
- [ ] Student Attendance & Behavior View.

## Phase 5: PDF Engine (ปพ.1) (Week 7-8)
- [ ] Create isolated microservice/Node script for Puppeteer.
- [ ] Design HTML/CSS Template for ปพ.1 (Front & Back) using TH Sarabun.
- [ ] API integration between Next.js and PDF service.

## Phase 6: Executive Dashboard & Launch (Week 9-10)
- [ ] Aggregate data for Exec Dashboard (GPA trends, At-risk students).
- [ ] Final E2E Testing, Security check (RLS testing).
