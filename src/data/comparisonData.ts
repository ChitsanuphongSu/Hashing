export interface MethodComparisonRow {
  method: string;
  category: 'Open Addressing (Nearby Address)' | 'Structural Modification';
  coreIdea: string;
  storageStructure: string;
  probeRule: string;
  lectureExample: string;
  keyLimitationOrNote: string;
}

export const COLLISION_COMPARISON_DATA: MethodComparisonRow[] = [
  {
    method: 'Linear Probing (การแก้ปัญหาแบบลำดับ)',
    category: 'Open Addressing (Nearby Address)',
    coreIdea: 'เมื่อแอดเดรสชนกัน ให้เลื่อนตำแหน่งแอดเดรสไปยังตำแหน่งถัดไปทีละ 1 ช่อง จนกระทั่งพบตำแหน่งว่าง',
    storageStructure: 'อาร์เรย์ 1 มิติ (ขนาด tableSize)',
    probeRule: 'table[h(x) + 1], table[h(x) + 2], table[h(x) + 3] ...',
    lectureExample: '4567 และ 7597 ชนกันที่ index 22 → ขยับไป 23, 24, 25',
    keyLimitationOrNote: 'เป็นวิธีที่ง่ายที่สุดในการแก้ปัญหาการชนกัน'
  },
  {
    method: 'Quadratic Probing (การแก้ปัญหาแบบกำลังสอง)',
    category: 'Open Addressing (Nearby Address)',
    coreIdea: 'ปรับโครงสร้างการแก้ปัญหาแบบลำดับ โดยขยับตำแหน่งด้วยค่ายกกำลังสองเพื่อกระจายข้อมูล',
    storageStructure: 'อาร์เรย์ 1 มิติ (ขนาด tableSize)',
    probeRule: 'table[h(x) + 1²], table[h(x) + 2²], table[h(x) + 3²] ...',
    lectureExample: 'เริ่มต้นที่ index 22 → 22 + 1² = 23 → 22 + 2² = 26 → 22 + 3² = 31',
    keyLimitationOrNote: 'ช่วยลดการเกาะกลุ่มของข้อมูลติดกันได้ดีกว่าแบบลำดับ'
  },
  {
    method: 'Double Hashing (การทำแฮช 2 ครั้ง)',
    category: 'Open Addressing (Nearby Address)',
    coreIdea: 'ใช้แฮชฟังก์ชัน 2 ฟังก์ชัน โดย h1 หาแอดเดรสเริ่มต้น และ h2 หาระยะในการขยับเมื่อเกิดการชน',
    storageStructure: 'อาร์เรย์ 1 มิติ (ขนาด tableSize)',
    probeRule: 'h1(x) เป็นจุดเริ่ม, h2(x) เป็นระยะขยับ โดย h2(x) ≠ 0 และ h1 ≠ h2',
    lectureExample: 'h1(x) = x mod 11, h2(x) = 7 - (x mod 7) สำหรบ 58, 14, 91 → ได้ index 3, 10, 6',
    keyLimitationOrNote: 'เป็นการแก้ปัญหาโดยใช้คีย์แบบไม่อิสระ และต้องระวังเงื่อนไข h2(x) ≠ 0'
  },
  {
    method: 'Bucket (การเก็บข้อมูลแบบกลุ่ม)',
    category: 'Structural Modification',
    coreIdea: 'เปลี่ยนโครงสร้างตาราง โดยในแต่ละ table[i] จะมีอาร์เรย์ย่อยเรียกว่า Bucket เพื่อเก็บข้อมูลได้หลายตัว',
    storageStructure: 'อาร์เรย์ของอาร์เรย์ (Array of Buckets)',
    probeRule: 'เก็บข้อมูลต่อลงใน Bucket ของตำแหน่งเดิมจนเต็มความจุ',
    lectureExample: 'table[i] ชี้ไปยัง Bucket[] ที่จุข้อมูลได้ตามขนาดที่กำหนด',
    keyLimitationOrNote: 'ถ้าขนาดของ Bucket น้อยกว่าจำนวนข้อมูลที่จะเพิ่ม จะเกิดการชนกันภายใน Bucket ได้'
  },
  {
    method: 'Separate Chaining (การแยกออกจากกันด้วยการเชื่อมโยง)',
    category: 'Structural Modification',
    coreIdea: 'ใช้อาร์เรย์ลิงก์ลิสต์ (Array of Linked Lists) โดยแต่ละ table[i] ชี้ไปยังโหนดแรกของ Linked List',
    storageStructure: 'อาร์เรย์ของลิงก์ลิสต์ (Array of Linked Lists)',
    probeRule: 'เมื่อเกิดการชน จะสร้าง Node ใหม่เชื่อมต่อใน Linked List ของช่องนั้นๆ',
    lectureExample: 'table[0] → empty, table[1] → Node → Node, table[3] → Node → Node → Node',
    keyLimitationOrNote: 'ไม่ถูกจำกัดด้วยความจุคงที่เหมือน Bucket เพราะสามารถเพิ่ม Node ได้เรื่อยๆ'
  }
];

export interface HashFunctionComparisonRow {
  method: string;
  inputFormat: string;
  formulaOrRule: string;
  lectureExample: string;
  resultRange: string;
  importantNote: string;
}

export const HASH_FUNCTION_COMPARISON_DATA: HashFunctionComparisonRow[] = [
  {
    method: 'การเลือกหลัก (Digit Selection)',
    inputFormat: 'รหัสตัวเลข (เช่น 9 หลัก)',
    formulaOrRule: 'เลือกตัวเลขเฉพาะหลักที่กำหนด (เช่น หลักที่ 4 และหลักสุดท้าย) แล้วนำมาต่อกัน',
    lectureExample: '001364825 → เลือกหลักที่ 4 (3) และหลักสุดท้าย (5) → ได้ 35',
    resultRange: 'ขึ้นอยู่กับจำนวนหลักที่เลือก (เช่น 2 หลัก = 00 ถึง 99)',
    importantNote: 'การเลือกหลักที่ซ้ำกันบ่อยในข้อมูลจริง (เช่น หลักที่ 1 และ 3) จะทำให้เกิด Collision สูงมาก'
  },
  {
    method: 'การบวกหลักเดี่ยว (Single Digit Addition)',
    inputFormat: 'รหัสตัวเลข',
    formulaOrRule: 'นำตัวเลขจากทุกหลักมาบวกกันทั้งหมด',
    lectureExample: '001364825 → 0+0+1+3+6+4+8+2+5 = 29',
    resultRange: '0 ถึง 9 × (จำนวนหลัก) เช่น 9 หลักได้ 0 ถึง 81',
    importantNote: 'ขนาดตารางผลลัพธ์มีขนาดเล็ก ทำให้เหมาะกับข้อมูลจำนวนน้อย'
  },
  {
    method: 'การจัดกลุ่มหลักแล้วบวก (Grouped Digit Addition)',
    inputFormat: 'รหัสตัวเลข',
    formulaOrRule: 'แบ่งตัวเลขออกเป็นกลุ่มย่อย (เช่น กลุ่มละ 3 หลัก) แล้วนำแต่ละกลุ่มมาบวกกัน',
    lectureExample: '001364825 → 001 + 364 + 825 = 1,190',
    resultRange: '0 ถึง (จำนวนกลุ่ม) × (10^groupSize - 1) เช่น 3 กลุ่ม 3 หลัก ได้ 0 ถึง 2,997',
    importantNote: 'ช่วยขยายขนาดพื้นที่ของตารางแฮชให้รองรับข้อมูลได้มากขึ้น'
  },
  {
    method: 'การหารเอาเศษ (Modulo Method)',
    inputFormat: 'ตัวเลขจำนวนเต็ม',
    formulaOrRule: 'h(x) = x mod tableSize',
    lectureExample: '001364825 mod 101 = 12 | 4567 mod 101 = 22 | 7597 mod 101 = 22',
    resultRange: '0 ถึง tableSize - 1 (เช่น tableSize = 101 จะได้ 0 ถึง 100)',
    importantNote: 'เป็นวิธีพื้นฐานที่ง่ายและนิยมที่สุด แต่ต้องระวังการเกิดค่าซ้ำที่ table[0] และ table[1]'
  }
];
