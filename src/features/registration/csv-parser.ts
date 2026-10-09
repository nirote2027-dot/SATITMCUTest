export interface ParsedCsvStudent {
  rowNumber: number;
  seatNo: number;
  studentCode: string;
  title: string;
  firstName: string;
  lastName: string;
  fullName: string;
  classRoom: string;
  academicYear: string;
  semester: number;
  gender: string;
  status: string;
  isValid: boolean;
  errorMsg?: string;
}

export function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let currentValue = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (insideQuotes && line[i + 1] === '"') {
        currentValue += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      values.push(currentValue.trim());
      currentValue = "";
    } else {
      currentValue += char;
    }
  }
  values.push(currentValue.trim());
  return values;
}

export function parseStudentsCsv(
  csvText: string,
  defaults: { academicYear: string; semester: number; defaultClassRoom: string },
): { rows: ParsedCsvStudent[]; errors: string[] } {
  // Strip UTF-8 BOM
  const cleanText = csvText.replace(/^\uFEFF/, "").trim();
  if (!cleanText) {
    return { rows: [], errors: ["ไฟล์ CSV ว่างเปล่า ไม่มีข้อมูล"] };
  }

  const rawLines = cleanText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (rawLines.length < 2) {
    return { rows: [], errors: ["ไฟล์ต้องมีหัวตาราง (Header) และข้อมูลนักเรียนอย่างน้อย 1 แถว"] };
  }

  // Parse header line
  const headers = parseCsvLine(rawLines[0]).map((h) =>
    h
      .replace(/^["']|["']$/g, "")
      .trim()
      .toLowerCase(),
  );

  const findCol = (...aliases: string[]) => {
    return headers.findIndex((h) => aliases.some((a) => h.includes(a)));
  };

  const seatNoIdx = findCol("เลขที่", "seat", "no", "ลำดับ");
  const codeIdx = findCol("รหัส", "code", "id", "student_code");
  const titleIdx = findCol("คำนำหน้า", "คำนำหน้านาม", "title", "prefix");
  const firstIdx = findCol("ชื่อจริง", "ชื่อ", "firstname", "first_name");
  const lastIdx = findCol("นามสกุล", "lastname", "last_name");
  const fullNameIdx = findCol("ชื่อ - นามสกุล", "ชื่อ-นามสกุล", "fullname", "full_name");
  const classIdx = findCol("ระดับชั้น", "ห้อง", "ชั้น", "classroom", "room", "class");
  const yearIdx = findCol("ปีการศึกษา", "ปี", "academicyear", "year");
  const semIdx = findCol("ภาคเรียน", "เทอม", "semester", "term");
  const genderIdx = findCol("เพศ", "gender", "sex");
  const statusIdx = findCol("สถานะ", "status");

  const parsedStudents: ParsedCsvStudent[] = [];

  for (let r = 1; r < rawLines.length; r++) {
    const cols = parseCsvLine(rawLines[r]).map((c) => c.replace(/^["']|["']$/g, "").trim());
    if (cols.length === 0 || cols.every((c) => !c)) continue;

    let seatNo = seatNoIdx >= 0 ? parseInt(cols[seatNoIdx], 10) : NaN;
    if (isNaN(seatNo)) seatNo = r;

    let studentCode = codeIdx >= 0 ? cols[codeIdx] : "";
    let title = titleIdx >= 0 ? cols[titleIdx] : "";
    let firstName = firstIdx >= 0 ? cols[firstIdx] : "";
    let lastName = lastIdx >= 0 ? cols[lastIdx] : "";

    // If separate first and last name not provided, extract from full name column
    if ((!firstName || !lastName) && fullNameIdx >= 0 && cols[fullNameIdx]) {
      let rawName = cols[fullNameIdx];
      const knownTitles = ["เด็กชาย", "เด็กหญิง", "ด.ช.", "ด.ญ.", "นาย", "นางสาว", "น.ส."];
      for (const kt of knownTitles) {
        if (rawName.startsWith(kt)) {
          title = kt === "เด็กชาย" ? "ด.ช." : kt === "เด็กหญิง" ? "ด.ญ." : kt === "นางสาว" ? "น.ส." : kt;
          rawName = rawName.slice(kt.length).trim();
          break;
        }
      }
      const parts = rawName.split(/\s+/).filter(Boolean);
      if (parts.length >= 2) {
        firstName = parts[0];
        lastName = parts.slice(1).join(" ");
      } else if (parts.length === 1) {
        firstName = parts[0];
      }
    }

    let classRoom = classIdx >= 0 && cols[classIdx] ? cols[classIdx] : defaults.defaultClassRoom;
    let academicYear = yearIdx >= 0 && cols[yearIdx] ? cols[yearIdx] : defaults.academicYear;
    let semester = semIdx >= 0 && cols[semIdx] ? parseInt(cols[semIdx], 10) || defaults.semester : defaults.semester;

    // Normalizing title and gender
    if (!title) {
      title =
        classRoom.startsWith("ม.4") || classRoom.startsWith("ม.5") || classRoom.startsWith("ม.6") ? "นาย" : "ด.ช.";
    }
    let gender = genderIdx >= 0 && cols[genderIdx] ? cols[genderIdx] : "";
    if (!gender) {
      if (title.includes("ญ") || title.includes("น.ส.")) gender = "หญิง";
      else gender = "ชาย";
    }

    let status = statusIdx >= 0 && cols[statusIdx] ? cols[statusIdx] : "ACTIVE";
    if (status.includes("สำเร็จ") || status === "GRADUATED") status = "GRADUATED";
    else if (status.includes("พัก") || status === "SUSPENDED") status = "SUSPENDED";
    else if (status.includes("ย้าย") || status === "TRANSFERRED") status = "TRANSFERRED";
    else if (status.includes("พ้น") || status.includes("ออก") || status === "DROPOUT") status = "DROPOUT";
    else status = "ACTIVE";

    // Auto-generate code if missing
    if (!studentCode) {
      const yrCode = academicYear.slice(-2);
      const roomCode = classRoom.replace("ม.", "").replace("/", "");
      studentCode = `STU${yrCode}-${roomCode}${String(seatNo).padStart(2, "0")}`;
    }

    const isValid = !!studentCode && !!firstName && !!lastName;
    let errorMsg = undefined;
    if (!firstName || !lastName) {
      errorMsg = "ข้อมูลไม่ครบถ้วน (ต้องระบุชื่อและนามสกุล)";
    }

    parsedStudents.push({
      rowNumber: r,
      seatNo,
      studentCode,
      title,
      firstName,
      lastName,
      fullName: `${title}${firstName} ${lastName}`,
      classRoom,
      academicYear,
      semester,
      gender,
      status,
      isValid,
      errorMsg,
    });
  }

  return { rows: parsedStudents, errors: [] };
}
