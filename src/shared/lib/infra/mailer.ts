import "server-only";
import nodemailer from "nodemailer";
import { env, smtpConfigured } from "./env";
import { logger } from "./logger";
import { prisma } from "./prisma";

export interface MailInput {
  to: string;
  subject: string;
  text: string;
  html?: string;
  tenantId?: string;
}

export interface SmtpTransportConfig {
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
  from: string;
}

export async function testSmtpConnection(options: {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
}): Promise<{ success: boolean; message?: string }> {
  try {
    const transport = nodemailer.createTransport({
      host: options.host,
      port: options.port,
      secure: options.secure,
      auth: { user: options.user, pass: options.pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    await transport.verify();

    const fromAddress = options.from.trim() || options.user;
    await transport.sendMail({
      from: fromAddress,
      to: options.to,
      subject: "ทดสอบการเชื่อมต่อ SMTP Gmail - SATIT MCU System",
      text: `สวัสดีครับ,\n\nนี่คืออีเมลทดสอบจากระบบ SATIT MCU System เพื่อยืนยันว่าการตั้งค่า SMTP Gmail ทำงานได้อย่างถูกต้อง\n\nโฮสต์: ${options.host}\nพอร์ต: ${options.port}\nผู้ส่ง: ${options.user}\nวันเวลาทดสอบ: ${new Date().toLocaleString("th-TH")}\n\nขอบคุณครับ`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background: #ffffff;">
          <h2 style="color: #0284c7; margin-top: 0; font-size: 20px;">ทดสอบการเชื่อมต่อ SMTP Gmail สำเร็จ 🎉</h2>
          <p style="color: #334155; font-size: 15px; line-height: 1.5;">สวัสดีครับ,</p>
          <p style="color: #334155; font-size: 15px; line-height: 1.5;">นี่คืออีเมลทดสอบจากระบบ <strong>SATIT MCU System</strong> เพื่อยืนยันว่าการตั้งค่าเชื่อมต่อ SMTP Gmail ของคุณทำงานได้อย่างสมบูรณ์</p>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; margin: 20px 0; font-size: 14px; border-left: 4px solid #0284c7; color: #1e293b;">
            <p style="margin: 4px 0;"><strong>SMTP Host:</strong> ${options.host}</p>
            <p style="margin: 4px 0;"><strong>Port:</strong> ${options.port}</p>
            <p style="margin: 4px 0;"><strong>Secure (SSL/TLS):</strong> ${options.secure ? "เปิดใช้งาน (SSL)" : "ปิดใช้งาน (TLS)"}</p>
            <p style="margin: 4px 0;"><strong>Username:</strong> ${options.user}</p>
            <p style="margin: 4px 0;"><strong>วันเวลาที่ทดสอบ:</strong> ${new Date().toLocaleString("th-TH")}</p>
          </div>
          <p style="color: #64748b; font-size: 12px; margin-top: 24px;">อีเมลนี้ถูกส่งโดยอัตโนมัติจากการทดสอบในหน้าการตั้งค่าองค์กร</p>
        </div>
      `,
    });

    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.error("test smtp connection failed", { err: msg });
    return { success: false, message: msg };
  }
}

/** ตรวจสอบ SMTP จาก Tenant Settings ก่อน ถ้าไม่มีจึงตกไปใช้ Environment Variables */
export async function sendMail(input: MailInput): Promise<{ delivered: boolean }> {
  let transportOpts: SmtpTransportConfig | null = null;

  try {
    const tenant = input.tenantId
      ? await prisma.tenant.findUnique({ where: { id: input.tenantId }, select: { settings: true } })
      : await prisma.tenant.findFirst({ where: { isActive: true }, orderBy: { updatedAt: "desc" }, select: { settings: true } });

    const smtp = (tenant?.settings as { smtp?: Partial<SmtpTransportConfig> } | null)?.smtp;
    if (smtp && smtp.host && smtp.user) {
      transportOpts = {
        host: smtp.host,
        port: Number(smtp.port) || 465,
        secure: smtp.secure ?? (Number(smtp.port) === 465),
        user: smtp.user,
        pass: smtp.pass,
        from: smtp.from || smtp.user,
      };
    }
  } catch (dbErr) {
    logger.warn("failed to read tenant smtp settings, falling back to env", { err: String(dbErr) });
  }

  if (!transportOpts) {
    if (!smtpConfigured()) {
      logger.info("mail (no SMTP, logged only)", { to: input.to, subject: input.subject, text: input.text });
      return { delivered: false };
    }
    const e = env();
    transportOpts = {
      host: e.SMTP_HOST,
      port: e.SMTP_PORT,
      secure: e.SMTP_PORT === 465,
      user: e.SMTP_USER,
      pass: e.SMTP_PASS,
      from: e.SMTP_FROM,
    };
  }

  try {
    const transport = nodemailer.createTransport({
      host: transportOpts.host,
      port: transportOpts.port,
      secure: transportOpts.secure,
      auth: transportOpts.user ? { user: transportOpts.user, pass: transportOpts.pass } : undefined,
    });
    await transport.sendMail({
      from: transportOpts.from,
      to: input.to,
      subject: input.subject,
      text: input.text,
      html: input.html,
    });
    return { delivered: true };
  } catch (err) {
    logger.error("mail send failed", { to: input.to, err: err instanceof Error ? err.message : String(err) });
    return { delivered: false };
  }
}

