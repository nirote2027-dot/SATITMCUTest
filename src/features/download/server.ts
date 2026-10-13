import "server-only";
import fs from "fs";
import path from "path";
import type {
  DownloadDocumentDto,
  CreateDownloadDocumentInput,
  UpdateDownloadDocumentInput,
} from "./types";
import { INITIAL_DOWNLOAD_DOCUMENTS } from "./initial-data";

const DATA_DIR = path.join(process.cwd(), "tmp_data");
const DATA_FILE = path.join(DATA_DIR, "downloads.json");

let memoryDocuments: DownloadDocumentDto[] | null = null;

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_DOWNLOAD_DOCUMENTS, null, 2), "utf-8");
      memoryDocuments = [...INITIAL_DOWNLOAD_DOCUMENTS];
    } else if (!memoryDocuments) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      memoryDocuments = JSON.parse(raw);
    }
  } catch (err) {
    if (!memoryDocuments) {
      memoryDocuments = [...INITIAL_DOWNLOAD_DOCUMENTS];
    }
  }
}

function persistData() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(memoryDocuments, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not persist downloads to file, using memory store:", err);
  }
}

export async function listDownloadDocuments(): Promise<DownloadDocumentDto[]> {
  ensureDataFile();
  return memoryDocuments || [...INITIAL_DOWNLOAD_DOCUMENTS];
}

export async function createDownloadDocument(
  input: CreateDownloadDocumentInput,
): Promise<DownloadDocumentDto> {
  ensureDataFile();
  const newDoc: DownloadDocumentDto = {
    id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    code: input.code?.trim() || undefined,
    title: input.title.trim(),
    category: input.category,
    description: input.description?.trim() || undefined,
    fileType: input.fileType || "PDF",
    fileSize: input.fileSize?.trim() || "500 KB",
    fileUrl: input.fileUrl?.trim() || `/downloads/${encodeURIComponent(input.title)}.pdf`,
    downloadCount: 0,
    updatedAt: new Date().toLocaleDateString("th-TH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    isActive: input.isActive ?? true,
  };

  memoryDocuments = [newDoc, ...(memoryDocuments || [])];
  persistData();
  return newDoc;
}

export async function updateDownloadDocument(
  input: UpdateDownloadDocumentInput,
): Promise<DownloadDocumentDto | null> {
  ensureDataFile();
  if (!memoryDocuments) return null;

  const idx = memoryDocuments.findIndex((d) => d.id === input.id);
  if (idx === -1) return null;

  const existing = memoryDocuments[idx];
  const updated: DownloadDocumentDto = {
    ...existing,
    code: input.code !== undefined ? input.code.trim() || undefined : existing.code,
    title: input.title !== undefined ? input.title.trim() : existing.title,
    category: input.category !== undefined ? input.category : existing.category,
    description: input.description !== undefined ? input.description.trim() || undefined : existing.description,
    fileType: input.fileType !== undefined ? input.fileType : existing.fileType,
    fileSize: input.fileSize !== undefined ? input.fileSize.trim() : existing.fileSize,
    fileUrl: input.fileUrl !== undefined ? input.fileUrl.trim() : existing.fileUrl,
    isActive: input.isActive !== undefined ? input.isActive : existing.isActive,
    updatedAt: new Date().toLocaleDateString("th-TH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
  };

  memoryDocuments[idx] = updated;
  persistData();
  return updated;
}

export async function deleteDownloadDocument(id: string): Promise<boolean> {
  ensureDataFile();
  if (!memoryDocuments) return false;

  const prevLen = memoryDocuments.length;
  memoryDocuments = memoryDocuments.filter((d) => d.id !== id);
  if (memoryDocuments.length !== prevLen) {
    persistData();
    return true;
  }
  return false;
}

export async function incrementDownloadCount(id: string): Promise<number> {
  ensureDataFile();
  if (!memoryDocuments) return 0;
  const doc = memoryDocuments.find((d) => d.id === id);
  if (doc) {
    doc.downloadCount = (doc.downloadCount || 0) + 1;
    persistData();
    return doc.downloadCount;
  }
  return 0;
}
