export interface StudentDto {
  id: string;
  studentCode: string;
  title: string;
  firstName: string;
  lastName: string;
  fullName: string;
  classRoom: string; // e.g. "ม.1/1", "ม.1/2", "ม.4/1", "ม.4/2"
  seatNo: number;
  academicYear: string; // e.g. "2569", "2568"
  semester: number; // 1 or 2
  gender?: string | null;
  status: string; // "ACTIVE" | "RESIGNED" | "GRADUATED" | "SUSPENDED" | "TRANSFERRED"
  createdAt: string;
}

export interface CourseDto {
  id: string;
  courseCode: string;
  name: string;
  credits: number;
  semester?: number | null;
  curriculumName?: string;
  curriculumId?: string;
  subjectGroup?: string | null;
  instructorName?: string | null;
  instructorId?: string | null;
}

export interface InstructorDto {
  id: string;
  employeeCode?: string;
  name: string;
  fullName: string;
  position?: string | null;
  departmentName?: string | null;
}

export interface AttendanceDto {
  id: string;
  studentId: string;
  studentCode: string;
  studentName: string;
  classRoom: string;
  seatNo: number;
  courseId?: string | null;
  courseCode?: string | null;
  courseName?: string | null;
  classDate: string;
  period: number;
  status: "PRESENT" | "ABSENT" | "LEAVE" | "LATE";
  remarks?: string | null;
}

export interface StudentAttendanceSummary {
  studentId: string;
  studentCode: string;
  studentName: string;
  classRoom: string;
  seatNo: number;
  totalPeriods: number;
  presentCount: number;
  absentCount: number;
  leaveCount: number;
  lateCount: number;
  attendancePercent: number;
  isEligibleForExam: boolean; // >= 80%
}

export interface GradeRecordDto {
  id: string;
  studentId: string;
  studentCode: string;
  studentName: string;
  classRoom: string;
  seatNo: number;
  courseId: string;
  courseCode: string;
  courseName: string;
  academicYear: string;
  semester: number;
  assignmentScore: number; // Max 30
  midtermScore: number; // Max 20
  behaviorScore: number; // Max 20 (based on attendance)
  finalScore: number; // Max 30
  totalScore: number; // Max 100
  grade: string; // "4", "3.5", "3", "2.5", "2", "1.5", "1", "0", "ร", "มส"
  isPassing: boolean;
  remarks?: string | null;
  attendancePercent?: number;
}

export interface CourseGradingSchemeDto {
  id: string;
  courseId: string;
  classRoom: string;
  academicYear: string;
  semester: number;
  maxAssignment: number;
  maxMidterm: number;
  maxBehavior: number;
  maxFinal: number;
  minAttendancePercent: number;
}

export interface ImportStudentInput {
  studentCode: string;
  title?: string;
  firstName: string;
  lastName: string;
  classRoom: string;
  seatNo: number;
  academicYear?: string;
  semester?: number;
  gender?: string;
  status?: string;
}

export interface ImportBatchStudentsResult {
  total: number;
  created: number;
  updated: number;
  failed: number;
  errors: { row: number; studentCode?: string; message: string }[];
  students: StudentDto[];
}

