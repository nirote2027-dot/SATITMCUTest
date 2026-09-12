export interface NewsTranslationResult {
  titleEn: string;
  contentEn: string;
}

export async function translateNewsWithGemini(params: {
  titleTh: string;
  contentTh?: string | null;
  apiKey: string;
}): Promise<NewsTranslationResult> {
  const { titleTh, contentTh, apiKey } = params;

  const prompt = `You are a professional bilingual translator and content editor for an academic institution / school news portal.
Translate and polish the following Thai news headline and content into natural, professional English.
Preserve the tone, key facts, and any HTML formatting tags (such as <p>, <strong>, <em>, <u>, <ul>, <ol>, <li>, <table>, <h3>, <h4>, <a>, etc.) if present in the content.

Thai Title:
${titleTh}

Thai Content:
${contentTh || "(ไม่มีเนื้อหาข่าว)"}

Respond ONLY with a valid JSON object in this exact schema:
{
  "titleEn": "English translated title",
  "contentEn": "English translated content (preserve HTML tags if present)"
}
Do not include any extra text outside the JSON object.`;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    let errorMsg = `Gemini API HTTP ${response.status}: ${response.statusText}`;
    try {
      const parsedError = JSON.parse(errorBody);
      if (parsedError.error?.message) {
        errorMsg = `Gemini API Error: ${parsedError.error.message}`;
      }
    } catch {
      // Use fallback errorMsg
    }
    throw new Error(errorMsg);
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>;
      };
    }>;
  };

  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error("ไม่ได้รับคำตอบจาก Gemini AI หรือรูปแบบข้อมูลไม่ถูกต้อง");
  }

  // Clean code fences if any
  const cleanedText = rawText.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();

  try {
    const parsed = JSON.parse(cleanedText) as { titleEn?: string; contentEn?: string };
    return {
      titleEn: parsed.titleEn?.trim() || "",
      contentEn: parsed.contentEn?.trim() || "",
    };
  } catch {
    throw new Error("Gemini AI ไม่ได้ส่งผลลัพธ์เป็น JSON ที่ถูกต้อง");
  }
}
