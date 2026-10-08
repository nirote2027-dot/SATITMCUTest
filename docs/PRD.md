# Product Requirements Document (PRD)
**Project Name:** Satit MCU Student Dashboard
**Phase:** MVP (6 Months)

## 1. Project Overview & Objectives
ระบบสารสนเทศผู้เรียน (Satit MCU Student Dashboard) สำหรับโรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย มีเป้าหมายเพื่อรวมศูนย์ข้อมูลทางวิชาการและพฤติกรรม ลดภาระงานเอกสาร และเพิ่มประสิทธิภาพการติดตามผลการเรียนของนักเรียนแบบ Real-time

## 2. Target Audience & Roles
- **Executive (ผู้บริหาร):** ต้องการดูภาพรวมโรงเรียน สถิติ และแนวโน้ม
- **Admin/Registrar (ฝ่ายทะเบียน/วิชาการ):** ต้องการจัดการข้อมูลรากฐาน และออกเอกสาร ปพ.1
- **Teacher (ครูผู้สอน/ที่ปรึกษา):** ต้องการบันทึกเกรด เช็คชื่อ และบันทึกพฤติกรรม เฉพาะห้อง/วิชาที่ตนรับผิดชอบ
- **Student (นักเรียน):** ต้องการดูเกรด ตารางเรียน และประเมินครูผู้สอน

## 3. Core Modules (MVP Scope)
อ้างอิง MoSCoW Framework ระดับ **Must Have**:
1. **CORE-01 (Registry):** SSO Login, Role-based access, Data Import.
2. **CORE-02 (Academic):** บันทึกเกรด, ประมวลผล GPAX, ออก ปพ.1 (PDF หน้า-หลัง).
3. **CORE-03 (Attendance & Behavior):** เช็คชื่อเข้าเรียนรายวัน, บันทึกคะแนนพฤติกรรม.
4. **CORE-04 (Student Portal):** ดูผลการเรียน, บังคับประเมินครูก่อนดูเกรด (Gatekeeper).
5. **CORE-05 (Executive Dashboard):** ภาพรวมสถิติทั้งโรงเรียน.

## 4. Key User Stories
- **US-01:** As an Admin, I want to export ปพ.1 as a 2-sided PDF so that I can print it directly for students.
- **US-02:** As a Teacher, I want to input grades (0-4, ร, มส) for my assigned subjects so that the system can calculate GPA automatically.
- **US-03:** As a Student, I must complete the teacher evaluation form before I am allowed to view my grades.
- **US-04:** As an Executive, I want to see a dashboard of students at risk (e.g., too many absences) to intervene early.

## 5. Out of Scope (สำหรับ MVP นี้)
- ระบบรับสมัครนักเรียนใหม่ (Admissions)
- ระบบชำระค่าเทอม (Billing/Payment)
- ระบบห้องสมุด (Library)
