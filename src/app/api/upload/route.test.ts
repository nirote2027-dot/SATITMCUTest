import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route";
import { NextRequest } from "next/server";
import { auth } from "@/features/identity/server";

vi.mock("@/features/identity/server", () => ({
  auth: vi.fn(),
}));

describe("Upload API Security", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects unauthenticated upload requests with 401", async () => {
    vi.mocked(auth).mockResolvedValue(null);

    const req = {
      formData: async () => ({
        get: (key: string) => null,
      }),
    } as unknown as NextRequest;

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json.ok).toBe(false);
    expect(json.error).toContain("Unauthorized");
  });

  it("rejects malicious or unsupported file types with 400", async () => {
    vi.mocked(auth).mockResolvedValue({ user: { id: "user-1", email: "admin@app.local" } } as any);

    const maliciousFile = {
      name: "evil.html",
      type: "text/html",
      size: 100,
      arrayBuffer: async () => Buffer.from("alert('xss')"),
    } as unknown as File;

    const req = {
      formData: async () => ({
        get: (key: string) => (key === "file" ? maliciousFile : null),
      }),
    } as unknown as NextRequest;

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(json.error).toContain("ประเภทไฟล์ไม่ได้รับอนุญาต");
  });

  it("rejects files exceeding size limit with 400", async () => {
    vi.mocked(auth).mockResolvedValue({ user: { id: "user-1", email: "admin@app.local" } } as any);

    const oversizedFile = {
      name: "large.jpg",
      type: "image/jpeg",
      size: 15 * 1024 * 1024, // 15MB
      arrayBuffer: async () => Buffer.from("data"),
    } as unknown as File;

    const req = {
      formData: async () => ({
        get: (key: string) => (key === "file" ? oversizedFile : null),
      }),
    } as unknown as NextRequest;

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(json.error).toContain("ขนาดไฟล์เกิน 10MB");
  });
});
