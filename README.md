# 📌 Data Structures — Chapter 10: Hashing (การทำแฮชและตารางแฮช)

เว็บแอปพลิเคชันเพื่อการเรียนรู้และเตรียมสอบวิชา **โครงสร้างข้อมูล (Data Structures) บทที่ 10: Hashing** จัดทำขึ้นโดยอ้างอิงเนื้อหา คำศัพท์ สูตรการคำนวณ ตัวอย่าง และกฎเกณฑ์ตามเอกสารการสอนของ **ผศ.ดร.สิลดา อินทรโสธรฉันท์ วิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น** อย่างเคร่งครัด

---

## 🌟 ฟีเจอร์หลัก (Key Features)

### 1. 📖 สรุปบทเรียนตามสไลด์บรรยาย (Grounded Lectures 01–08)
- **01 Hashing & Hash Table Concept**: แนวคิดการแปลง Key สู่ Address/Index เข้าถึงข้อมูล $O(1)$ ตัวอย่างการลดพื้นที่เก็บเบอร์โทรศัพท์ ($1234567 \rightarrow \text{table}[4567]$ ลดจาก 10 ล้านเหลือ 10,000 ช่อง) และนิยามการชนกันของข้อมูล (Collision)
- **02 Digit Selection (การเลือกหลัก)**: การเลือกเฉพาะบางหลักมารวมกันเป็นแอดเดรส (เช่น รหัส `001364825` เลือกหลักที่ 4 และหลักสุดท้าย $\rightarrow 35$) พร้อมข้อควรระวังเรื่องการเกิดแอดเดรสซ้ำ
- **03 Digit Addition (การบวกหลัก)**:
  - บวกทีละหลัก ($0+0+1+3+6+4+8+2+5 = 29$, ช่วง $0..81$)
  - บวกแบบจัดกลุ่ม 3 หลัก ($001 + 364 + 825 = 1,190$, ช่วง $0..2,997$)
- **04 Modulo Hash Function (การหารเอาเศษ)**: $h(x) = x \bmod \text{tableSize}$ (เช่น $4567 \bmod 101 = 22$ และ $7597 \bmod 101 = 22$ เกิดการชนที่ $\text{table}[22]$)
- **05 Text-to-Number & Horner's Rule**: การแปลงข้อความเป็นตัวเลขด้วยรหัส ASCII (`NOTE` $\rightarrow 78, 79, 84, 69$), รหัสลำดับ A–Z 1–26 (`N=14, O=15, T=20, E=5`), การแปลงเป็นฐานสอง 5 บิต ($2^5=32$), และการหาค่าฐานสิบด้วย Horner's Rule พหุนามฐาน 32 ($(14\times 32^3) + (15\times 32^2) + (20\times 32^1) + (5\times 32^0) = 474,757$)
- **06 Linear Probing (การแก้ปัญหาแบบลำดับ)**: การเลื่อนตรวจทีละ 1 ช่อง $\text{table}[h(x)+1], \text{table}[h(x)+2] \dots$ จนกว่าจะพบช่องว่าง
- **07 Quadratic Probing (การแก้ปัญหาแบบกำลังสอง)**: การกระโดดด้วยค่ายกกำลังสอง $\text{table}[h(x)+1^2], \text{table}[h(x)+2^2], \text{table}[h(x)+3^2] \dots$
- **08 Double Hashing, Bucket & Separate Chaining**:
  - **Double Hashing**: การแฮช 2 ครั้ง $h_1(x)$ (หาจุดเริ่ม) และ $h_2(x)$ (ระยะก้าว) โดย $h_2(x) \neq 0$ และ $h_1 \neq h_2$ พร้อมตัวอย่างสไลด์ ($h_1 = x \bmod 11, h_2 = 7 - (x \bmod 7)$, คีย์ $58, 14, 91$ ลงที่ index $3, 10, 6$)
  - **Bucket**: อาร์เรย์ย่อยประจำแต่ละช่องตาราง พร้อมการจัดการกรณีข้อมูลเต็มความจุ (Bucket Overflow)
  - **Separate Chaining**: อาร์เรย์ของลิงก์ลิสต์ (Array of Linked Lists) สำหรับเชื่อมโยงโหนดที่เกิดการชน

---

### 2. 🔬 ระบบจำลองแบบอินเตอร์แอคทีฟ (Interactive Visualizers)
- **Interactive Hash Function Visualizer**: คำนวณแฮชฟังก์ชันสดแบบ Real-time รองรับทั้งการเลือกหลัก, การบวกหลักเดี่ยว, การบวกจัดกลุ่ม, Modulo, และการแปลงข้อความด้วย Horner's Rule
- **Interactive Hash Table Builder**: จำลองการทำงานของ Hash Table จริง เลือกเปลี่ยน Hash Function และวิธีแก้ Collision ได้อิสระ พร้อมระบบค้นหา (Search) และ Step-by-Step Controller (`Previous`, `Auto Run`, `Pause`, `Next`, `Reset`)

---

### 3. 🎯 ระบบฝึกฝนและทำข้อสอบ (Practice & Quiz Engine)
- **Trace & Probing Practice Solver (10 ข้อ)**: แบบฝึกหัดจำลองการไล่สเต็ปจริง ตรวจคำตอบแบบ Step-by-step พร้อมเฉลยละเอียดและแอนิเมชัน Confetti
- **Mixed Quiz (25 ข้อ)**: แบบทดสอบรวมคลุมทุกเนื้อหาตามสัดส่วนข้อสอบ แสดงคะแนนและเฉลยพร้อมอ้างอิงหน้าสไลด์
- **Mock Exam (30 ข้อ)**: ข้อสอบจำลองเสมือนจริงสำหรับวัดระดับความพร้อมก่อนสอบ
- **Weakness Dashboard**: วิเคราะห์จุดอ่อนรายหัวข้อจากประวัติการทำข้อสอบจริง บันทึกผ่าน `localStorage`

---

### 4. 📚 แหล่งอ้างอิงและจุดควรระวัง (Reference & Common Traps)
- **Formula Cheat Sheet**: สรุปสูตรและกฎการคำนวณทั้งหมดในที่เดียว
- **Method Comparison Tables**: ตารางเปรียบเทียบวิธีแก้ Collision และ Hash Function
- **Common Exam Traps**: รวม 8 กับดักและจุดที่นักศึกษามักทำผิดบ่อยในข้อสอบ

---

## 🎨 ธีมและดีไซน์ (Design System)

- **Pastel Green Academic Palette**: ธีมเขียวพาสเทลสะอาดตา สบายตา เหมาะแก่การอ่านหนังสือ
- **Typography**: รองรับภาษาไทยและอังกฤษด้วย `Plus Jakarta Sans`, `Sarabun`, และ `JetBrains Mono` สำหรับโค้ดและสูตรคำนวณ
- **Theme Modes**: รองรับ **Light Mode**, **Dark Mode**, และ **System Mode** (จดจำการตั้งค่าผ่าน `localStorage`)
- **Responsive Layout**: รองรับหน้าจอทุกขนาด (Desktop 1440px, Tablet 768px, Mobile 390px) ไม่มีปัญหาหน้าจอล้น

---

## 🛠️ สแต็กเทคโนโลยี (Tech Stack)

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Vanilla CSS with Custom Theme Tokens & Glassmorphism
- **Icons & Effects**: `lucide-react`, `canvas-confetti`
- **Testing**: `vitest`

---

## 🚀 การติดตั้งและรันโปรเจกต์ (Getting Started)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. รันโหมด Development
```bash
npm run dev
```
เปิดบราวเซอร์ที่: `http://localhost:5173/`

### 3. รัน Unit Tests (ทดสอบอัลกอริทึม)
```bash
npm test
```

### 4. สั่ง Build สำหรับ Production
```bash
npm run build
```

---

## 📂 โครงสร้างไดเรกทอรี (Project Structure)

```
src/
├── algorithms/              # อัลกอริทึมการคำนวณแฮช การแก้ปัญหาการชน และ Search
│   ├── hashFunctions.ts     # Digit selection, digit sum, grouped sum, modulo
│   ├── textConversion.ts    # ASCII, A-Z (1-26), 5-bit binary, Horner's rule
│   ├── linearProbing.ts     # Linear Probing insert & search
│   ├── quadraticProbing.ts  # Quadratic Probing insert & search
│   ├── doubleHashing.ts     # Double Hashing insert & search with wrap rule
│   ├── separateChaining.ts  # Separate Chaining & Bucket insert & search
│   └── types.ts             # Type definitions
├── components/              # UI Components
│   ├── layout/              # Sidebar, Header
│   └── visualizers/         # Hash Table Builder & Hash Function Visualizer
├── data/                    # ข้อมูลบทเรียน ข้อสอบ และแบบฝึกหัด
│   ├── lectureContent.ts    # สรุปเนื้อหา 8 หัวข้อ
│   ├── examplesLibrary.ts   # คลังตัวอย่างจากสไลด์
│   ├── quizQuestions.ts     # คลังข้อสอบ Mixed & Mock Quiz
│   ├── practiceExercises.ts # คลังแบบฝึกหัด 10 ข้อ
│   ├── comparisonData.ts    # ตารางเปรียบเทียบ
│   └── commonMistakes.ts    # จุดที่มักผิดในข้อสอบ
├── pages/                   # หน้าแอปพลิเคชันหลัก
│   ├── DashboardPage.tsx
│   ├── QuickReviewPage.tsx
│   ├── LessonPage.tsx
│   ├── PracticePage.tsx
│   ├── QuizPage.tsx
│   ├── ReferencePage.tsx
│   ├── CommonMistakesPage.tsx
│   └── WeaknessPage.tsx
├── utils/                   # Utilities (Storage, Theme)
│   ├── storage.ts
│   └── theme.ts
├── App.tsx
├── main.tsx
└── index.css                # Custom theme variables & design system
```

---

## 📜 ลิขสิทธิ์และการอ้างอิง (Credits & Reference)
- อ้างอิงเนื้อหาจากสไลด์วิชา Data Structures บทที่ 10 เรื่อง **Hashing** (ผศ.ดร.สิลดา อินทรโสธรฉันท์, มหาวิทยาลัยขอนแก่น)
- พัฒนาขึ้นเพื่อเป็นสื่อการเรียนรู้เชิงปฏิสัมพันธ์ (Interactive Educational Study Tool)
