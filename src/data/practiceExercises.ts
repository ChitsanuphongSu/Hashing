export interface PracticeExercise {
  id: string;
  title: string;
  type: 'hash_calc' | 'probing_trace' | 'double_hash_trace' | 'text_horner' | 'search_trace' | 'chaining_trace' | 'bucket_trace';
  descriptionTh: string;
  tableSize: number;
  initialTable?: { [index: number]: number | string };
  keyToInsertOrSearch: number | string;
  method: 'linear' | 'quadratic' | 'double' | 'modulo' | 'horner' | 'digit_select' | 'digit_sum' | 'grouped_sum' | 'chaining' | 'bucket' | 'search_linear';
  h1Formula?: string;
  h2Formula?: string;
  correctAnswer: {
    initialIndex: number;
    probeSequence?: number[];
    finalIndex: number;
    stepExplanation: string[];
  };
}

export const PRACTICE_EXERCISES: PracticeExercise[] = [
  {
    id: 'p-lp-1',
    title: 'Linear Probing: การขยับทีละ 1 ช่อง',
    type: 'probing_trace',
    descriptionTh: 'ตารางขนาด 10 ช่อง (0..9) แฮชฟังก์ชัน h(x) = x mod 10 ปัจจุบันมีคีย์ [12, 22] อยู่ที่ table[2] และ table[3] จงหาตำแหน่งที่คีย์ 32 จะถูกบันทึก',
    tableSize: 10,
    initialTable: { 2: 12, 3: 22 },
    keyToInsertOrSearch: 32,
    method: 'linear',
    correctAnswer: {
      initialIndex: 2,
      probeSequence: [2, 3, 4],
      finalIndex: 4,
      stepExplanation: [
        'h(32) = 32 mod 10 = 2',
        'table[2] มีคีย์ 12 อยู่แล้ว (เกิดการชน)',
        'Probe 1: table[2 + 1] = table[3] มีคีย์ 22 อยู่แล้ว (เกิดการชน)',
        'Probe 2: table[2 + 2] = table[4] เป็นช่องว่าง → บันทึก 32 ที่ table[4]'
      ]
    }
  },
  {
    id: 'p-qp-1',
    title: 'Quadratic Probing: การกระโดดด้วยกำลังสอง',
    type: 'probing_trace',
    descriptionTh: 'ตารางขนาด 11 ช่อง (0..10) แฮชฟังก์ชัน h(x) = x mod 11 ปัจจุบันมีคีย์อยู่ที่ table[4] และ table[5] จงหาตำแหน่งที่คีย์ 26 (26 mod 11 = 4) จะถูกบันทึก',
    tableSize: 11,
    initialTable: { 4: 15, 5: 37 },
    keyToInsertOrSearch: 26,
    method: 'quadratic',
    correctAnswer: {
      initialIndex: 4,
      probeSequence: [4, 5, 8],
      finalIndex: 8,
      stepExplanation: [
        'h(26) = 26 mod 11 = 4',
        'table[4] ไม่ว่าง (ชน)',
        'Probe 1: 4 + 1² = 5 → table[5] ไม่ว่าง (ชน)',
        'Probe 2: 4 + 2² = 4 + 4 = 8 → table[8] ว่าง → บันทึก 26 ที่ table[8]'
      ]
    }
  },
  {
    id: 'p-dh-1',
    title: 'Double Hashing: ตัวอย่างบรรยาย (58, 14, 91)',
    type: 'double_hash_trace',
    descriptionTh: 'ตารางขนาด 11 ช่อง, h1(x) = x mod 11, h2(x) = 7 - (x mod 7) ปัจจุบันมี 58 อยู่ที่ table[3] จงหาตำแหน่งที่คีย์ 14 จะถูกบันทึก',
    tableSize: 11,
    initialTable: { 3: 58 },
    keyToInsertOrSearch: 14,
    method: 'double',
    h1Formula: 'x mod 11',
    h2Formula: '7 - (x mod 7)',
    correctAnswer: {
      initialIndex: 3,
      probeSequence: [3, 10],
      finalIndex: 10,
      stepExplanation: [
        'h1(14) = 14 mod 11 = 3',
        'table[3] มีคีย์ 58 อยู่แล้ว (ชน)',
        'คำนวณสเต็ป h2(14) = 7 - (14 mod 7) = 7 - 0 = 7',
        'ตำแหน่งใหม่ = 3 + 7 = 10 → table[10] ว่าง → บันทึก 14 ที่ table[10]'
      ]
    }
  },
  {
    id: 'p-horner-1',
    title: 'Horner\'s Rule: คำว่า "NOTE"',
    type: 'text_horner',
    descriptionTh: 'คำนวณค่าเลขฐานสิบของคำว่า "NOTE" โดยใช้ A-Z (1-26) และพหุนามฐาน 32 ตามการบรรยาย',
    tableSize: 101,
    keyToInsertOrSearch: 'NOTE',
    method: 'horner',
    correctAnswer: {
      initialIndex: 0,
      finalIndex: 474757,
      stepExplanation: [
        'N=14, O=15, T=20, E=5',
        '(14 × 32³) + (15 × 32²) + (20 × 32¹) + (5 × 32⁰)',
        '= (14 × 32,768) + (15 × 1,024) + (20 × 32) + (5 × 1)',
        '= 458,752 + 15,360 + 640 + 5 = 474,757'
      ]
    }
  },
  {
    id: 'p-ds-1',
    title: 'Digit Selection: เลือกหลักที่ 4 และหลักสุดท้าย',
    type: 'hash_calc',
    descriptionTh: 'กำหนดรหัส "001364825" จงหาผลลัพธ์ของแฮชฟังก์ชันเมื่อเลือกหลักที่ 4 และหลักสุดท้าย',
    tableSize: 100,
    keyToInsertOrSearch: '001364825',
    method: 'digit_select',
    correctAnswer: {
      initialIndex: 35,
      finalIndex: 35,
      stepExplanation: [
        'หลักที่ 4 คือ 3',
        'หลักที่ 9 (หลักสุดท้าย) คือ 5',
        'นำมารวมกันเป็น 35 → table[35]'
      ]
    }
  },
  {
    id: 'p-da-1',
    title: 'Digit Addition: การบวกทุกหลักของรหัส 9 หลัก',
    type: 'hash_calc',
    descriptionTh: 'กำหนดรหัส "001364825" นำตัวเลขทุกหลักมาบวกกันทั้งหมด (Single Digit Addition) จงหาตำแหน่งแอดเดรสที่ได้',
    tableSize: 100,
    keyToInsertOrSearch: '001364825',
    method: 'digit_sum',
    correctAnswer: {
      initialIndex: 29,
      finalIndex: 29,
      stepExplanation: [
        'นำตัวเลขทุกหลักมาบวกกัน:',
        '0 + 0 + 1 + 3 + 6 + 4 + 8 + 2 + 5 = 29',
        'จัดเก็บที่ table[29] (ช่วงผลลัพธ์ที่เป็นไปได้คือ 0 ถึง 81)'
      ]
    }
  },
  {
    id: 'p-mod-1',
    title: 'Modulo: การหารเอาเศษ 4567 mod 101',
    type: 'hash_calc',
    descriptionTh: 'ตารางแฮชขนาด tableSize = 101 ใช้แฮชฟังก์ชัน h(x) = x mod 101 จงหาตำแหน่งแฮชของคีย์ 4567',
    tableSize: 101,
    keyToInsertOrSearch: 4567,
    method: 'modulo',
    correctAnswer: {
      initialIndex: 22,
      finalIndex: 22,
      stepExplanation: [
        'สูตร h(x) = x mod tableSize',
        '4567 mod 101 = 22 (เศษ 22)',
        'แอดเดรสที่ได้คือ table[22]'
      ]
    }
  },
  {
    id: 'p-chain-1',
    title: 'Separate Chaining: การต่อ Linked List เมื่อเกิด Collision',
    type: 'chaining_trace',
    descriptionTh: 'ตารางขนาด 10 ช่อง มีคีย์ 22 อยู่ที่ Linked List ของ table[2] แล้ว เมื่อเพิ่มคีย์ 52 (52 mod 10 = 2) คีย์ 52 จะถูกเชื่อมต่อไว้ที่ตำแหน่งใดในตาราง?',
    tableSize: 10,
    initialTable: { 2: 22 },
    keyToInsertOrSearch: 52,
    method: 'chaining',
    correctAnswer: {
      initialIndex: 2,
      finalIndex: 2,
      stepExplanation: [
        'h(52) = 52 mod 10 = 2',
        'ชี้ไปยัง Linked List ของ table[2]',
        'เกิดการชนกับโหนด 22 เดิมที่มีอยู่',
        'สร้าง Node ใหม่ [52] เชื่อมต่อท้าย Node [22] ใน table[2] (22 -> 52 -> null)'
      ]
    }
  },
  {
    id: 'p-bucket-1',
    title: 'Bucket Hashing: การเก็บข้อมูลใน Bucket ของตาราง',
    type: 'bucket_trace',
    descriptionTh: 'ตารางขนาด 10 ช่อง แต่ละ table[i] มี Bucket จุได้ 2 ช่อง ปัจจุบัน table[3] มีข้อมูล 13 อยู่แล้ว เมื่อเพิ่มคีย์ 43 (43 mod 10 = 3) จะเก็บใน Bucket ช่องดัชนีหลักใด?',
    tableSize: 10,
    initialTable: { 3: 13 },
    keyToInsertOrSearch: 43,
    method: 'bucket',
    correctAnswer: {
      initialIndex: 3,
      finalIndex: 3,
      stepExplanation: [
        'h(43) = 43 mod 10 = 3',
        'ชี้ไปยัง Bucket table[3]',
        'Bucket ช่องที่ 1 มี [13] อยู่แล้ว ยังไม่เต็มความจุ (1/2)',
        'บันทึก [43] ลงใน Bucket table[3] ช่องที่ 2 สำเร็จ'
      ]
    }
  },
  {
    id: 'p-search-1',
    title: 'Hash Table Search: การไล่หาคีย์ใน Linear Probing',
    type: 'search_trace',
    descriptionTh: 'ตารางขนาด 10 ช่อง (h(x) = x mod 10) มีคีย์อยู่ที่ table[5]=15, table[6]=25, table[7]=35 เมื่อสั่งค้นหาคีย์ 35 จะเริ่มตรวจที่ index ใดและพบข้อมูลที่ index ใด?',
    tableSize: 10,
    initialTable: { 5: 15, 6: 25, 7: 35 },
    keyToInsertOrSearch: 35,
    method: 'search_linear',
    correctAnswer: {
      initialIndex: 5,
      probeSequence: [5, 6, 7],
      finalIndex: 7,
      stepExplanation: [
        '1. คำนวณแฮชเริ่มต้น h(35) = 35 mod 10 = 5',
        '2. ตรวจสอบ table[5] พบ 15 ≠ 35 (ยังไม่ใช่)',
        '3. Probe 1: ตรวจสอบ table[6] พบ 25 ≠ 35 (ยังไม่ใช่)',
        '4. Probe 2: ตรวจสอบ table[7] พบ 35 == 35 (Match!) → พบคีย์ 35 ที่ table[7]'
      ]
    }
  }
];
