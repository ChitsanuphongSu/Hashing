export interface LectureExampleItem {
  id: string;
  title: string;
  category: string;
  slide: number;
  descriptionTh: string;
  initialInput: string | number;
  expectedOutput: string;
  calculationSteps: string[];
}

export const EXAMPLES_LIBRARY: LectureExampleItem[] = [
  {
    id: 'ex-phone',
    title: 'ตัวอย่างเบอร์โทรศัพท์ & ลดพื้นที่ตาราง',
    category: 'Concept & Space Reduction',
    slide: 5,
    descriptionTh: 'เปรียบเทียบการเก็บเบอร์โทรศัพท์ 123-4567 แบบเต็มต้องจอง 10,000,000 ช่อง กับการเก็บเฉพาะ 4 ตัวท้ายที่ table[4567] ใช้เพียง 10,000 ช่อง',
    initialInput: '1234567',
    expectedOutput: 'table[4567]',
    calculationSteps: [
      'หมายเลขเดิม 1234567 ต้องใช้พื้นที่ขนาด table[0..9999999] (10 ล้าน)',
      'เลือกเฉพาะ 4 ตัวท้าย: 4567',
      'ตำแหน่งใหม่: table[4567] (ลดพื้นที่เหลือ 10,000 ข้อมูล)'
    ]
  },
  {
    id: 'ex-phone-collision',
    title: 'การชนกันของเบอร์โทรศัพท์ 4 ตัวท้าย',
    category: 'Collision',
    slide: 8,
    descriptionTh: 'หมายเลข 1234567 และ 1114567 ต่างมี 4 ตัวท้ายเป็น 4567 เหมือนกัน ทำให้ได้แอดเดรสซ้ำกันที่ table[4567]',
    initialInput: '1234567, 1114567',
    expectedOutput: 'Collision at table[4567]',
    calculationSteps: [
      'เบอร์ 1234567 → 4 ตัวหลังคือ 4567 → table[4567]',
      'เบอร์ 1114567 → 4 ตัวหลังคือ 4567 → table[4567]',
      'ตำแหน่งซ้ำกัน → เกิดการชนกันของข้อมูล (Collision data)'
    ]
  },
  {
    id: 'ex-digit-select',
    title: 'การเลือกหลักที่ 4 และหลักสุดท้าย',
    category: 'Digit Selection',
    slide: 10,
    descriptionTh: 'รหัสลูกจ้าง 9 หลัก 001364825 เลือกหลักที่ 4 (เลข 3) และหลักสุดท้าย (เลข 5) ได้แอดเดรส 35',
    initialInput: '001364825',
    expectedOutput: 'table[35]',
    calculationSteps: [
      'รหัส 9 หลัก: 0 0 1 [3] 6 4 8 2 [5]',
      'หลักที่ 4 = 3, หลักที่ 9 (สุดท้าย) = 5',
      'รวมเป็นแอดเดรส: 35 → table[35]'
    ]
  },
  {
    id: 'ex-digit-add-single',
    title: 'การบวกทุกหลักทีละหลัก',
    category: 'Digit Addition',
    slide: 12,
    descriptionTh: 'รหัส 001364825 นำทุกหลักมาบวกกัน 0+0+1+3+6+4+8+2+5 = 29 ได้แอดเดรส table[29] (ช่วง 0 ถึง 81)',
    initialInput: '001364825',
    expectedOutput: 'table[29]',
    calculationSteps: [
      'นำตัวเลข 9 หลักมาบวกกัน:',
      '0 + 0 + 1 + 3 + 6 + 4 + 8 + 2 + 5 = 29',
      'จัดเก็บที่ table[29] (ช่วง 0..81)'
    ]
  },
  {
    id: 'ex-digit-add-grouped',
    title: 'การจัดกลุ่ม 3 หลักแล้วบวก',
    category: 'Digit Addition',
    slide: 13,
    descriptionTh: 'รหัส 001364825 แบ่งเป็น 3 กลุ่ม กลุ่มละ 3 หลัก 001 + 364 + 825 = 1,190 (ช่วง 0 ถึง 2,997)',
    initialInput: '001364825',
    expectedOutput: 'table[1190]',
    calculationSteps: [
      'แบ่งเป็น 3 กลุ่ม: [001], [364], [825]',
      '001 + 364 + 825 = 1,190',
      'จัดเก็บที่ table[1190] (ช่วง 0 ถึง 3 × 999 = 2,997)'
    ]
  },
  {
    id: 'ex-modulo-single',
    title: 'การหาเศษด้วย Modulo 101',
    category: 'Modulo',
    slide: 15,
    descriptionTh: 'รหัส 001364825 เมื่อนำมาหารเอาเศษด้วย 101 จะได้เศษ 12 เก็บที่ table[12]',
    initialInput: '001364825',
    expectedOutput: 'table[12]',
    calculationSteps: [
      'สูตร: h(x) = x mod tableSize',
      '1364825 mod 101 = 12',
      'จัดเก็บที่ table[12] (ช่วง 0..100)'
    ]
  },
  {
    id: 'ex-modulo-collision',
    title: 'การชนกันของ Modulo 101 (4567 และ 7597)',
    category: 'Modulo & Collision',
    slide: 20,
    descriptionTh: '4567 mod 101 = 22 และ 7597 mod 101 = 22 เกิดการชนกันที่ table[22]',
    initialInput: '4567, 7597',
    expectedOutput: 'Both map to table[22]',
    calculationSteps: [
      '4567 mod 101 = 22 → table[22]',
      '7597 mod 101 = 22 → table[22]',
      'เกิดการชนกันที่ table[22]'
    ]
  },
  {
    id: 'ex-text-conversion',
    title: 'การแปลงข้อความ "NOTE" (ASCII, A-Z, 5-bit)',
    category: 'Text Conversion',
    slide: 16,
    descriptionTh: 'แปลงคำว่า NOTE เป็น ASCII (78, 79, 84, 69) และ A-Z (14, 15, 20, 5) และฐานสอง 5 บิต',
    initialInput: 'NOTE',
    expectedOutput: 'ASCII: [78, 79, 84, 69], A-Z: [14, 15, 20, 5]',
    calculationSteps: [
      'ASCII: N=78, O=79, T=84, E=69',
      'A-Z (1..26): N=14, O=15, T=20, E=5',
      'ฐานสอง 5 บิต: N=01110, O=01111, T=10100, E=00101',
      'ต่อกันเป็น: 01110 01111 10100 00101'
    ]
  },
  {
    id: 'ex-horner-note',
    title: 'การหาเลขฐานสิบด้วย Horner\'s Rule ("NOTE")',
    category: 'Horner\'s Rule',
    slide: 19,
    descriptionTh: 'คำนวณ (14 × 32³) + (15 × 32²) + (20 × 32¹) + (5 × 32⁰) = 474,757',
    initialInput: 'NOTE',
    expectedOutput: '474,757',
    calculationSteps: [
      'N(14) × 32³ = 14 × 32,768 = 458,752',
      'O(15) × 32² = 15 × 1,024 = 15,360',
      'T(20) × 32¹ = 20 × 32 = 640',
      'E(5)  × 32⁰ = 5 × 1 = 5',
      'รวมทั้งหมด = 458,752 + 15,360 + 640 + 5 = 474,757'
    ]
  },
  {
    id: 'ex-double-hashing-lecture',
    title: 'Double Hashing ตัวอย่างจากสไลด์ (58, 14, 91)',
    category: 'Double Hashing',
    slide: 25,
    descriptionTh: 'ตารางขนาด 11, h1(x) = x mod 11, h2(x) = 7 - (x mod 7) คีย์ 58, 14, 91 บันทึกที่ table[3], table[10], table[6]',
    initialInput: '58, 14, 91',
    expectedOutput: '58 → 3, 14 → 10, 91 → 6',
    calculationSteps: [
      'คีย์ 58: h1(58) = 58 mod 11 = 3 → เก็บที่ table[3]',
      'คีย์ 14: h1(14) = 3 (ชน) → h2(14) = 7 - (14 mod 7) = 7 → 3 + 7 = 10 → เก็บที่ table[10]',
      'คีย์ 91: h1(91) = 3 (ชน), h2(91) = 7 → 3 + 7 = 10 (ชน) → 3 + 7 + 7 = 17',
      'เกินขนาดตาราง: ใช้ h1(17) = 17 mod 11 = 6 → เก็บที่ table[6]'
    ]
  }
];
