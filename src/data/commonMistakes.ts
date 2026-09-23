export interface CommonMistakeItem {
  id: string;
  topic: string;
  mistakeTh: string;
  correctExplanationTh: string;
  exampleTh: string;
  tag: 'Key Concept' | 'Calculation' | 'Collision' | 'Text Conversion';
}

export const COMMON_MISTAKES: CommonMistakeItem[] = [
  {
    id: 'm1',
    topic: 'Key vs Hash Address',
    mistakeTh: 'สับสนระหว่าง Key (ข้อมูลตั้งต้น) กับ Hash Address (ดัชนีช่องในตาราง)',
    correctExplanationTh: 'Key คือข้อมูลดิบที่เราต้องการค้นหาหรือจัดเก็บ (เช่น หมายเลขโทรศัพท์ 1234567) ส่วน Hash Address คือดัชนีของอาร์เรย์ (เช่น table[4567]) ที่ได้จากการคำนวณผ่าน Hash Function',
    exampleTh: 'Key = 1234567 ถูกส่งเข้า Hash Function ได้ Address = 4567 จัดเก็บใน table[4567]',
    tag: 'Key Concept'
  },
  {
    id: 'm2',
    topic: 'Modulo Range',
    mistakeTh: 'คิดว่าผลลัพธ์ของ h(x) = x mod tableSize มีค่าได้ตั้งแต่ 1 ถึง tableSize',
    correctExplanationTh: 'การหารเอาเศษด้วย tableSize จะได้เศษอยู่ในช่วง 0 ถึง tableSize - 1 เสมอ',
    exampleTh: 'เมื่อ tableSize = 101 ค่าแอดเดรสที่เป็นไปได้คือ 0 ถึง 100 เท่านั้น (ไม่มีช่อง table[101])',
    tag: 'Calculation'
  },
  {
    id: 'm3',
    topic: 'Digit Addition Bounds',
    mistakeTh: 'ลืมวิธีคิดช่วงขนาดผลลัพธ์ของการบวกหลัก',
    correctExplanationTh: 'หากเป็นเลข 9 หลัก บวกทีละหลัก ค่าสูงสุดคือ 9 × 9 = 81 (ช่วง 0..81) หากแบ่ง 3 กลุ่ม กลุ่มละ 3 หลัก ค่าสูงสุดคือ 3 × 999 = 2,997 (ช่วง 0..2997)',
    exampleTh: '001364825 บวกทีละหลักได้ 29 (อยู่ในช่วง 0..81)',
    tag: 'Calculation'
  },
  {
    id: 'm4',
    topic: 'Text to Number (ASCII vs A-Z 1-26)',
    mistakeTh: 'ใช้ค่ารหัส ASCII สลับกับค่าลำดับตัวอักษร A-Z (1-26)',
    correctExplanationTh: 'ตามบทเรียน รหัส ASCII ของ NOTE คือ [78, 79, 84, 69] ในขณะที่ลำดับ A-Z (A=1..Z=26) ของ NOTE คือ [14, 15, 20, 5] ต้องดูโจทย์ให้ชัดเจนว่ากำหนดให้แปลงด้วยระบบใด',
    exampleTh: 'N ใน ASCII คือ 78 แต่ในระบบ A-Z (1..26) คือ 14',
    tag: 'Text Conversion'
  },
  {
    id: 'm5',
    topic: 'Horner\'s Rule Base',
    mistakeTh: 'ไม่เข้าใจที่มาของฐาน 32 ใน Horner\'s Rule หรือเขียนเลขชี้กำลังสลับข้าง',
    correctExplanationTh: 'ฐาน 32 มาจากตัวอักษร A-Z มี 26 ตัว ซึ่งต้องใช้เลขฐานสอง 5 บิต (2⁵ = 32) และพหุนามเริ่มจากกำลัง n-1 จากตัวซ้ายสุดลงไปหา 0',
    exampleTh: 'NOTE (4 ตัวอักษร) = (14 × 32³) + (15 × 32²) + (20 × 32¹) + (5 × 32⁰) = 474,757',
    tag: 'Text Conversion'
  },
  {
    id: 'm6',
    topic: 'Quadratic Probing Step Formula',
    mistakeTh: 'นำตำแหน่งก่อนหน้ามาคำนวณกำลังสองต่อ แทนที่จะบวก k² จากตำแหน่งเริ่มต้น h(x)',
    correctExplanationTh: 'Quadratic Probing ต้องเริ่มจาก h(x) เสมอ คือ table[h(x) + 1²], table[h(x) + 2²], table[h(x) + 3²] ไม่ใช่นำค่าที่ชนแล้วมากำลังสอง',
    exampleTh: 'เริ่มต้นที่ 22 → ชนครั้งที่ 1 ไป 22 + 1 = 23 → ชนครั้งที่ 2 ไป 22 + 4 = 26 → ชนครั้งที่ 3 ไป 22 + 9 = 31',
    tag: 'Collision'
  },
  {
    id: 'm7',
    topic: 'Double Hashing Conditions & Wrapping',
    mistakeTh: 'ลืมเงื่อนไข h2(x) ≠ 0 หรือสับสนการคิดตำแหน่งเมื่อผลรวมเกินขนาดตาราง',
    correctExplanationTh: 'ใน Double Hashing ห้ามให้ h2(x) = 0 เด็ดขาดเพราะจะทำให้ขยับไม่ได้ (วนลูปที่เดิม) และเมื่อค่าบวกเกินขนาดตาราง ให้ใช้ h1 คำนวณเศษใหม่ตามกฎของบทเรียน',
    exampleTh: 'คีย์ 91: 3 + 7 + 7 = 17 ซึ่งเกินขนาด 11 → ใช้ h1(17) = 17 mod 11 = 6 ได้ table[6]',
    tag: 'Collision'
  },
  {
    id: 'm8',
    topic: 'Bucket vs Separate Chaining',
    mistakeTh: 'คิดว่า Bucket และ Separate Chaining มีคุณสมบัติเหมือนกันทุกประการ',
    correctExplanationTh: 'Bucket เก็บข้อมูลใน Array ย่อยที่แต่ละช่อง table[i] ซึ่งมีขนาดความจุจำกัด (เกิด Overflow ได้) ส่วน Separate Chaining ใช้อาร์เรย์ของ Linked Lists ซึ่งสามารถขยายโหนดได้เรื่อยๆ',
    exampleTh: 'Bucket ความจุ 2 ช่อง หากมีข้อมูลแฮชลงช่องเดิมตัวที่ 3 จะเกิดการชนภายใน Bucket ที่จุไม่ได้',
    tag: 'Collision'
  }
];
