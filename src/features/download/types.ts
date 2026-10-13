export type DownloadCategory =
  | "ACADEMIC_SERVICES" // งานบริการการศึกษา
  | "STUDENT_FORMS" // แบบฟอร์มสำหรับนักเรียน
  | "REGULATIONS"; // ประกาศข้อบังคับโรงเรียนสาธิตฯ

export type FileType = "PDF" | "DOCX" | "XLSX" | "ZIP" | "OTHER";

export interface DownloadDocumentDto {
  id: string;
  code?: string;
  title: string;
  category: DownloadCategory;
  description?: string;
  fileType: FileType;
  fileSize: string;
  fileUrl?: string;
  downloadCount: number;
  updatedAt: string;
  isActive: boolean;
}

export interface CreateDownloadDocumentInput {
  code?: string;
  title: string;
  category: DownloadCategory;
  description?: string;
  fileType: FileType;
  fileSize: string;
  fileUrl?: string;
  isActive?: boolean;
}

export interface UpdateDownloadDocumentInput extends Partial<CreateDownloadDocumentInput> {
  id: string;
}
