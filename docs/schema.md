# Database Schema & Data Models

เอกสารอ้างอิงโครงสร้างฐานข้อมูล (PostgreSQL / Prisma) สำหรับ Satit MCU System

## 1. ER Diagram
```mermaid
erDiagram
    USER ||--o| STUDENT : "is"
    USER ||--o| TEACHER : "is"
    USER {
        uuid id PK
        string email
        enum role "ADMIN, TEACHER, STUDENT, EXEC"
    }
    
    COURSE {
        string id PK
        string code
        string name
        float credits
    }
    
    TEACHER ||--o{ TEACHING_ASSIGNMENT : "has"
    COURSE ||--o{ TEACHING_ASSIGNMENT : "offered as"
    
    STUDENT ||--o{ ENROLLMENT : "enrolls"
    TEACHING_ASSIGNMENT ||--o{ ENROLLMENT : "has students"
    
    ENROLLMENT ||--o| GRADE : "receives"
    GRADE {
        uuid id PK
        float score
        string grade_char "4,3.5,...,0, ร, มส"
    }
    
    STUDENT ||--o{ ATTENDANCE : "has"
    STUDENT ||--o{ BEHAVIOR_LOG : "has"
```

## 2. Key Entities (Prisma Model แนวทาง)
- **User:** จัดการ Auth ผูกกับ Supabase Auth
- **Student:** ข้อมูลส่วนตัว, รหัสนักเรียน, แผนการเรียน, เกรดสะสม (GPAX)
- **Teacher:** ข้อมูลครู
- **Course:** รายวิชา (รหัสวิชา, ชื่อ, หน่วยกิต)
- **TeachingAssignment:** ตารางสอน/ภาระงานสอน (ผูก Teacher กับ Course ในแต่ละเทอม)
- **Enrollment:** การลงทะเบียนเรียนของนักเรียนในแต่ละวิชา
- **Grade:** ผลการเรียนของแต่ละ Enrollment
- **Attendance:** ข้อมูลการเข้าเรียน (วันที่, สถานะ: มา/ขาด/สาย/ลา)
- **BehaviorLog:** บันทึกพฤติกรรม (+/-, สาเหตุ, วันที่)
- **Evaluation:** แบบประเมินครู (สถานะว่าประเมินหรือยัง เพื่อปลดล็อคดูเกรด)

## 3. RLS (Row Level Security) Rules
- `Student` สามารถ `SELECT` ข้อมูลเฉพาะที่ `user_id` ตรงกับตนเอง
- `Teacher` สามารถ `SELECT/UPDATE` เกรด เฉพาะใน `TeachingAssignment` ของตนเอง
- `Admin` สามารถ `ALL`
