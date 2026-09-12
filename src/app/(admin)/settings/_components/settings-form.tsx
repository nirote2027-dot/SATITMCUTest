"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LiyonCard, LiyonField, LiyonSwitchRow, PalettePicker } from "@/shared/components/liyon";
import { useT } from "@/shared/lib/i18n/client";
import type { PaletteId } from "@/shared/lib/palette";
import type { TenantSettings } from "@/features/identity";
import { updateSettingsAction, testSmtpAction, testGeminiAction } from "@/features/identity/actions";
import { ImageUpload } from "@/components/ui/image-upload";
import { Zap, Eye, EyeOff, Info, Send, Loader2, Sparkles, ExternalLink, CheckCircle2 } from "lucide-react";

export function SettingsForm({ initial }: { initial: TenantSettings }) {
  const t = useT();
  const router = useRouter();
  const [form, setForm] = useState({
    nameTh: initial.nameTh,
    nameEn: initial.nameEn,
    logoUrl: initial.logoUrl ?? "",
    palette: initial.palette as PaletteId,
    smtpHost: initial.smtp?.host ?? "",
    smtpPort: initial.smtp?.port ?? 465,
    smtpUser: initial.smtp?.user ?? "",
    smtpPass: initial.smtp?.pass ?? "",
    smtpFrom: initial.smtp?.from ?? "",
    smtpSecure: initial.smtp?.secure ?? true,
    geminiApiKey: initial.geminiApiKey ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [pending, start] = useTransition();
  const [showPass, setShowPass] = useState(false);
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [testEmail, setTestEmail] = useState(initial.smtp?.user ?? "");
  const [testingSmtp, setTestingSmtp] = useState(false);
  const [testingGemini, setTestingGemini] = useState(false);
  const [geminiSuccessMsg, setGeminiSuccessMsg] = useState("");

  function applyGmailPreset() {
    setForm((prev) => {
      // หากผู้ใช้เผลอกรอกอีเมลลงในช่อง smtpHost ให้ย้ายมาใส่ในช่อง smtpUser อัตโนมัติ
      const userEmail = prev.smtpUser || (prev.smtpHost.includes("@") ? prev.smtpHost : "");
      return {
        ...prev,
        smtpHost: "smtp.gmail.com",
        smtpPort: 465,
        smtpSecure: true,
        smtpUser: userEmail,
        smtpFrom: prev.smtpFrom || (userEmail ? `SATIT MCU System <${userEmail}>` : "SATIT MCU System"),
      };
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.smtpHost;
      return next;
    });
    toast.info("ตั้งค่าเริ่มต้นสำหรับ Gmail แล้ว (smtp.gmail.com:465 SSL)");
  }

  async function sendTestEmail() {
    if (!testEmail.trim()) {
      toast.error("กรุณาระบุอีเมลปลายทางที่ต้องการรับการทดสอบ");
      return;
    }
    if (form.smtpHost.includes("@")) {
      toast.error("ช่อง 'SMTP Host' ต้องเป็น 'smtp.gmail.com' ไม่ใช่ที่อยู่อีเมล (กรุณานำที่อยู่อีเมลไปใส่ในช่อง 'อีเมลผู้ส่ง')");
      return;
    }
    if (!form.smtpHost || !form.smtpUser || !form.smtpPass) {
      toast.error("กรุณาระบุ SMTP Host, อีเมลผู้ส่ง และ รหัสผ่านแอป ให้ครบถ้วนก่อนทดสอบ");
      return;
    }
    setTestingSmtp(true);
    try {
      const res = await testSmtpAction({
        to: testEmail.trim(),
        smtpHost: form.smtpHost,
        smtpPort: form.smtpPort,
        smtpUser: form.smtpUser,
        smtpPass: form.smtpPass,
        smtpFrom: form.smtpFrom || form.smtpUser,
        smtpSecure: form.smtpSecure,
      });
      if (res.ok) {
        toast.success(t("settings.smtpTestSuccess"));
      } else {
        toast.error(`ส่งอีเมลทดสอบไม่สำเร็จ: ${res.error.message || res.error.code}`);
      }
    } catch (err: unknown) {
      toast.error(`เกิดข้อผิดพลาด: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setTestingSmtp(false);
    }
  }

  async function testGemini() {
    if (!form.geminiApiKey.trim()) {
      toast.error("กรุณาระบุ Gemini API Key ก่อนทดสอบ");
      return;
    }
    setTestingGemini(true);
    setGeminiSuccessMsg("");
    try {
      const res = await testGeminiAction(form.geminiApiKey.trim());
      if (res.ok) {
        setGeminiSuccessMsg(res.data.message);
        toast.success(res.data.message);
      } else {
        toast.error(`ทดสอบไม่สำเร็จ: ${res.error.message || res.error.code}`);
      }
    } catch (err: unknown) {
      toast.error(`เกิดข้อผิดพลาด: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setTestingGemini(false);
    }
  }

  function save() {
    if (form.smtpHost.includes("@")) {
      toast.error("ช่อง 'SMTP Host' ต้องเป็น 'smtp.gmail.com' ไม่ใช่ที่อยู่อีเมล");
      return;
    }
    start(async () => {
      const r = await updateSettingsAction(form);
      if (!r.ok) {
        setErrors(r.error.fieldErrors ?? {});
        if (!r.error.fieldErrors) toast.error(t(`error.${r.error.code}`));
        return;
      }
      setErrors({});
      toast.success(t("settings.saveOk"));
      router.refresh();
    });
  }

  return (
    <>
      <header className="ph"><h1>{t("settings.title")}</h1></header>
      <div className="set-cards">
        <LiyonCard>
          <h2>{t("settings.orgTitle")}</h2>
          <div className="fields">
            <LiyonField label={t("settings.nameTh")} htmlFor="s-name-th" error={errors.nameTh?.[0]}><input id="s-name-th" value={form.nameTh} onChange={(e) => setForm({ ...form, nameTh: e.target.value })} /></LiyonField>
            <LiyonField label={t("settings.nameEn")} htmlFor="s-name-en" error={errors.nameEn?.[0]}><input id="s-name-en" value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} /></LiyonField>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 flex items-center justify-between">
                <span>{t("settings.logoUrl")}</span>
                <span className="text-xs text-slate-400 font-normal">({t("common.optional")})</span>
              </label>
              <ImageUpload
                label=""
                aspect="contain"
                value={form.logoUrl}
                onChange={(url) => setForm({ ...form, logoUrl: url })}
                placeholder="อัปโหลดไฟล์รูปภาพโลโก้ หรือระบุ URL"
              />
              {errors.logoUrl?.[0] && (
                <p className="text-xs text-red-500 mt-1">{errors.logoUrl[0]}</p>
              )}
            </div>
          </div>
        </LiyonCard>

        {/* SMTP Gmail Configuration Card */}
        <LiyonCard>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <div>
              <h2 className="text-lg font-semibold">{t("settings.smtpTitle")}</h2>
              <p className="text-sm text-slate-500 mt-0.5">{t("settings.smtpDesc")}</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={applyGmailPreset}
              className="border-sky-300 text-sky-700 hover:bg-sky-50 dark:border-sky-800 dark:text-sky-300 dark:hover:bg-sky-950/40"
            >
              <Zap className="w-4 h-4 mr-1.5 text-amber-500 fill-amber-500" />
              {t("settings.smtpPresetGmail")}
            </Button>
          </div>

          {/* Guide for Google App Password */}
          <div className="rounded-lg bg-sky-50/70 border border-sky-200/80 p-3.5 mb-5 text-sm dark:bg-sky-950/30 dark:border-sky-900/60">
            <div className="flex items-start gap-2.5">
              <Info className="w-5 h-5 text-sky-600 dark:text-sky-400 mt-0.5 shrink-0" />
              <div className="space-y-1 text-slate-700 dark:text-slate-300">
                <p className="font-semibold text-sky-900 dark:text-sky-200">{t("settings.smtpHelpTitle")}</p>
                <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-600 dark:text-slate-400">
                  <li>{t("settings.smtpHelpStep1")}</li>
                  <li>{t("settings.smtpHelpStep2")}</li>
                  <li>{t("settings.smtpHelpStep3")}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="fields">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <LiyonField label={t("settings.smtpHost")} htmlFor="s-smtp-host" error={errors.smtpHost?.[0]} hint="ต้องระบุเป็นชื่อเซิร์ฟเวอร์ เช่น smtp.gmail.com (ไม่ใช่ที่อยู่อีเมล)">
                  <input
                    id="s-smtp-host"
                    placeholder="smtp.gmail.com"
                    value={form.smtpHost}
                    onChange={(e) => setForm({ ...form, smtpHost: e.target.value })}
                  />
                </LiyonField>
                {form.smtpHost.includes("@") && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium flex items-center gap-1">
                    <span>⚠️</span> คุณระบุที่อยู่อีเมลในช่องนี้ กรุณาเปลี่ยนเป็น <strong>smtp.gmail.com</strong>
                  </p>
                )}
              </div>
              <div>
                <LiyonField label={t("settings.smtpPort")} htmlFor="s-smtp-port" error={errors.smtpPort?.[0]} hint="SSL: 465 / TLS: 587">
                  <input
                    id="s-smtp-port"
                    type="number"
                    placeholder="465"
                    value={form.smtpPort}
                    onChange={(e) => setForm({ ...form, smtpPort: Number(e.target.value) || 0 })}
                  />
                </LiyonField>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LiyonField label={t("settings.smtpUser")} htmlFor="s-smtp-user" error={errors.smtpUser?.[0]} hint="อีเมล Gmail ของผู้ส่ง เช่น yourname@gmail.com">
                <input
                  id="s-smtp-user"
                  type="email"
                  placeholder="yourname@gmail.com"
                  value={form.smtpUser}
                  onChange={(e) => setForm({ ...form, smtpUser: e.target.value })}
                />
              </LiyonField>

              <LiyonField label={t("settings.smtpPass")} htmlFor="s-smtp-pass" error={errors.smtpPass?.[0]} hint="รหัสผ่านสำหรับแอป 16 ตัวอักษรจากบัญชี Google">
                <div className="relative flex items-center">
                  <input
                    id="s-smtp-pass"
                    type={showPass ? "text" : "password"}
                    placeholder="xxxx xxxx xxxx xxxx"
                    value={form.smtpPass}
                    onChange={(e) => setForm({ ...form, smtpPass: e.target.value })}
                    className="pr-10 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    title={showPass ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </LiyonField>
            </div>

            <LiyonField label={t("settings.smtpFrom")} htmlFor="s-smtp-from" error={errors.smtpFrom?.[0]} hint="เช่น SATIT MCU System <yourname@gmail.com> หรือเว้นว่างเพื่อใช้อีเมลผู้ส่ง">
              <input
                id="s-smtp-from"
                placeholder="SATIT MCU System <yourname@gmail.com>"
                value={form.smtpFrom}
                onChange={(e) => setForm({ ...form, smtpFrom: e.target.value })}
              />
            </LiyonField>

            <LiyonSwitchRow
              id="s-smtp-secure"
              checked={form.smtpSecure}
              onCheckedChange={(checked) => setForm({ ...form, smtpSecure: checked })}
              label={t("settings.smtpSecure")}
              description="เปิดใช้งานสำหรับพอร์ต 465 (SSL) เพื่อความปลอดภัยสูงสุด"
            />
          </div>

          {/* Test Email Section */}
          <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">{t("settings.smtpTestTitle")}</h3>
            <p className="text-xs text-slate-500 mb-3">{t("settings.smtpTestDesc")}</p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-xl">
              <input
                type="email"
                placeholder="ระบุอีเมลปลายทางเพื่อรับอีเมลทดสอบ"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm shadow-sm focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={sendTestEmail}
                disabled={testingSmtp || !testEmail.trim()}
                className="shrink-0"
              >
                {testingSmtp ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                    {t("settings.smtpTestSending")}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-1.5" />
                    {t("settings.smtpTestButton")}
                  </>
                )}
              </Button>
            </div>
          </div>
        </LiyonCard>

        {/* Google Gemini AI Configuration Card */}
        <LiyonCard>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  การเชื่อมต่อ AI (Google Gemini API)
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  เชื่อมต่อ Gemini API เพื่อใช้แปลข่าวสารภาษาอังกฤษอัตโนมัติ และฟังก์ชันปัญญาประดิษฐ์อื่นๆ ในระบบ
                </p>
              </div>
            </div>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 bg-sky-50 dark:bg-sky-950/40 px-2.5 py-1.5 rounded-lg border border-sky-200 dark:border-sky-800 transition-colors"
            >
              <span>ขอรับ API Key ฟรี (Google AI Studio)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-3.5 mb-4 text-xs text-slate-600 dark:text-slate-400">
            ระบบใช้โมเดล <strong>Gemini 1.5 Flash</strong> ที่มีความเร็วสูงและแม่นยำในการแปลภาษาไทยเป็นภาษาอังกฤษ สามารถใช้งานฟรีได้สูงสุด 15 คำขอต่อนาที
          </div>

          <div className="fields">
            <LiyonField
              label="Google Gemini API Key"
              htmlFor="s-gemini-key"
              error={errors.geminiApiKey?.[0]}
              hint="คีย์จะขึ้นต้นด้วย AIzaSy... เก็บรักษาในฐานข้อมูลอย่างปลอดภัย"
            >
              <div className="relative flex items-center">
                <input
                  id="s-gemini-key"
                  type={showGeminiKey ? "text" : "password"}
                  placeholder="AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={form.geminiApiKey}
                  onChange={(e) => {
                    setForm({ ...form, geminiApiKey: e.target.value });
                    setGeminiSuccessMsg("");
                  }}
                  className="pr-10 w-full font-mono text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowGeminiKey(!showGeminiKey)}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  title={showGeminiKey ? "ซ่อนคีย์" : "แสดงคีย์"}
                >
                  {showGeminiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </LiyonField>

            {geminiSuccessMsg && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{geminiSuccessMsg}</span>
              </div>
            )}

            <div className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={testGemini}
                disabled={testingGemini || !form.geminiApiKey.trim()}
                className="gap-2 text-xs border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300 dark:hover:bg-indigo-950/40"
              >
                {testingGemini ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    กำลังทดสอบการเชื่อมต่อ Gemini AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    ทดสอบการเชื่อมต่อ Gemini AI
                  </>
                )}
              </Button>
            </div>
          </div>
        </LiyonCard>

        <LiyonCard>
          <h2>{t("settings.brandTitle")}</h2>
          <p>{t("settings.brandDesc")}</p>
          <PalettePicker value={form.palette} onChange={(p) => setForm({ ...form, palette: p })} label={t("settings.paletteLabel")} />
          {form.palette === "coral" && <p className="warn" role="note">{t("settings.coralWarn")}</p>}
        </LiyonCard>
        <div className="savebar"><Button type="button" onClick={save} disabled={pending}>{t("common.save")}</Button></div>
      </div>
    </>
  );
}

