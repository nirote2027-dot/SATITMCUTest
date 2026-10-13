import fs from 'fs';
import path from 'path';

// Generate a valid PDF with text and graphics
function createPdf() {
  const content = `
q
0 0 595 842 re W n
% Header background
0.1 0.25 0.5 rg
0 742 595 100 re f

% School title in white
1 1 1 rg
BT
/F2 18 Tf
40 800 Td
(SATIT MAHACHULALONGKORNRAJAVIDYALAYA SCHOOL) Tj
ET

BT
/F1 12 Tf
40 775 Td
(School Curriculum & Educational Structure (Academic Year 2567-2570)) Tj
ET

BT
/F1 9 Tf
40 755 Td
(Course Document Code: SATIT-MCU-CURR-2567 | Accredited by Ministry of Education) Tj
ET

% Decorative line
0.85 0.55 0.1 rg
0 738 595 4 re f

% Body text - Introduction
0.15 0.15 0.2 rg
BT
/F2 15 Tf
40 700 Td
(1. Curriculum Overview & Learning Philosophy) Tj
ET

BT
/F1 10 Tf
40 675 Td
(The Demonstration School of Mahachulalongkornrajavidyalaya University aims to provide) Tj
40 658 Td
(a holistic secondary education integrating Buddhist wisdom, modern science, critical thinking,) Tj
40 641 Td
(and international standard competencies for secondary students.) Tj
ET

% Section 2: Credit Structure
BT
/F2 15 Tf
40 605 Td
(2. Overall Credit Structure & Graduation Requirements) Tj
ET

% Table header box
0.93 0.95 0.98 rg
40 550 515 30 re f
0.75 0.8 0.9 rg
40 550 515 30 re S

0.1 0.2 0.4 rg
BT
/F2 10 Tf
55 562 Td
(Educational Level) Tj
200 562 Td
(Duration) Tj
280 562 Td
(Core Credits) Tj
370 562 Td
(Elective Credits) Tj
470 562 Td
(Total Credits) Tj
ET

% Table Row 1 (Junior High)
0.98 0.98 0.98 rg
40 520 515 25 re f
0.85 0.85 0.85 rg
40 520 515 25 re S
0.2 0.2 0.2 rg
BT
/F1 9.5 Tf
55 530 Td
(Lower Secondary (Grade 7-9)) Tj
200 530 Td
(3 Years) Tj
290 530 Td
(66 Credits) Tj
380 530 Td
(22 Credits) Tj
480 530 Td
(88 Credits) Tj
ET

% Table Row 2 (Senior High - Science)
1 1 1 rg
40 490 515 25 re f
0.85 0.85 0.85 rg
40 490 515 25 re S
0.2 0.2 0.2 rg
BT
/F1 9.5 Tf
55 500 Td
(Upper Secondary (Science-Math)) Tj
200 500 Td
(3 Years) Tj
290 500 Td
(41 Credits) Tj
380 500 Td
(43 Credits) Tj
480 500 Td
(84 Credits) Tj
ET

% Table Row 3 (Senior High - Arts & Languages)
0.98 0.98 0.98 rg
40 460 515 25 re f
0.85 0.85 0.85 rg
40 460 515 25 re S
0.2 0.2 0.2 rg
BT
/F1 9.5 Tf
55 470 Td
(Upper Secondary (Arts-Language)) Tj
200 470 Td
(3 Years) Tj
290 470 Td
(41 Credits) Tj
380 470 Td
(41 Credits) Tj
480 470 Td
(82 Credits) Tj
ET

% Section 3: Learning Areas
BT
/F2 15 Tf
40 420 Td
(3. Eight Fundamental Learning Areas) Tj
ET

BT
/F1 9.5 Tf
55 395 Td
(- Thai Language and Literature) Tj
300 395 Td
(- Social Studies, Religion and Culture) Tj
55 375 Td
(- Mathematics and Computational Thinking) Tj
300 375 Td
(- Foreign Languages (English, Chinese, Pali)) Tj
55 355 Td
(- Science and Digital Technology) Tj
300 355 Td
(- Arts, Music and Classical Dance) Tj
55 335 Td
(- Health and Physical Education) Tj
300 335 Td
(- Career Exploration and Innovation) Tj
ET

% Quality Assurance & Cert Box
0.96 0.98 0.96 rg
40 230 515 75 re f
0.3 0.6 0.3 rg
40 230 515 75 re S

BT
/F2 11 Tf
55 285 Td
(Academic Quality Assurance Certification) Tj
ET

BT
/F1 9 Tf
55 265 Td
(This curriculum has been verified and approved by the Academic Board of Satit MCU.) Tj
55 250 Td
(All learning standards and indicators meet national educational benchmark criteria.) Tj
ET

% Signatures Area
0.2 0.2 0.3 rg
BT
/F1 9.5 Tf
70 140 Td
(......................................................) Tj
70 120 Td
(Director of Academic Affairs) Tj
70 105 Td
(Satit MCU School) Tj
350 140 Td
(......................................................) Tj
350 120 Td
(School Director / Principal) Tj
350 105 Td
(Satit MCU School) Tj
ET

% Footer bar
0.9 0.9 0.9 rg
0 0 595 40 re f
0.5 0.5 0.5 rg
BT
/F1 8 Tf
40 18 Td
(Satit Mahachulalongkornrajavidyalaya School - All Rights Reserved | Official Curriculum Document) Tj
ET
Q
`;

  const streamLength = Buffer.byteLength(content, 'utf8');

  let pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 595.28 841.89]
  /Resources <<
    /Font <<
      /F1 4 0 R
      /F2 5 0 R
    >>
  >>
  /Contents 6 0 R
>>
endobj
4 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj
6 0 obj
<< /Length ${streamLength} >>
stream
${content}
endstream
endobj
`;

  const offsets = [];
  const lines = pdf.split('\n');
  let currentOffset = 0;

  // Compute xref
  const obj1Offset = pdf.indexOf('1 0 obj');
  const obj2Offset = pdf.indexOf('2 0 obj');
  const obj3Offset = pdf.indexOf('3 0 obj');
  const obj4Offset = pdf.indexOf('4 0 obj');
  const obj5Offset = pdf.indexOf('5 0 obj');
  const obj6Offset = pdf.indexOf('6 0 obj');

  const startXref = pdf.length;

  const xref = `xref
0 7
0000000000 65535 f \r
${String(obj1Offset).padStart(10, '0')} 00000 n \r
${String(obj2Offset).padStart(10, '0')} 00000 n \r
${String(obj3Offset).padStart(10, '0')} 00000 n \r
${String(obj4Offset).padStart(10, '0')} 00000 n \r
${String(obj5Offset).padStart(10, '0')} 00000 n \r
${String(obj6Offset).padStart(10, '0')} 00000 n \r
trailer
<<
  /Size 7
  /Root 1 0 R
>>
startxref
${startXref}
%%EOF
`;

  return Buffer.from(pdf + xref, 'utf8');
}

const targetDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const pdfBuffer = createPdf();
fs.writeFileSync(path.join(targetDir, 'sample-tqf2.pdf'), pdfBuffer);
fs.writeFileSync(path.join(targetDir, 'curriculum-sample.pdf'), pdfBuffer);
console.log('Sample PDF successfully written to public/uploads/sample-tqf2.pdf (' + pdfBuffer.length + ' bytes)');
