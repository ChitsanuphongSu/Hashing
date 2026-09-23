export interface QuizQuestion {
  id: string;
  topic: string;
  questionTh: string;
  options: string[];
  correctIndex: number;
  explanationTh: string;
  lectureReference: string;
}

export const MIXED_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'mq-1',
    topic: 'Hashing Concept',
    questionTh: 'การทำแฮช (Hashing) มีวัตถุประสงค์หลักตามเอกสารบรรยายเพื่ออะไร?',
    options: [
      'การจัดเรียงข้อมูลจากน้อยไปมากแบบเรียงลำดับ',
      'การจัดการข้อความหรือข้อมูลให้เป็นดัชนี เพื่อใช้อ้างอิงตำแหน่งและเข้าถึงข้อมูลได้เพียงครั้งเดียว',
      'การบีบอัดข้อมูลให้มีขนาดเล็กลงเพื่อประหยัดพื้นที่ฮาร์ดดิสก์',
      'การเข้ารหัสลับข้อมูลเพื่อความปลอดภัยในเครือข่าย'
    ],
    correctIndex: 1,
    explanationTh: 'ตามสไลด์หน้า 2: การทำแฮชคือการจัดการข้อความหรือข้อมูลให้เป็นดัชนี เพื่อใช้อ้างอิงตำแหน่งการเก็บข้อมูลของอาร์เรย์ เพื่อที่จะสามารถเข้าถึงข้อมูลได้เพียงครั้งเดียว',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 2'
  },
  {
    id: 'mq-2',
    topic: 'Hashing Concept',
    questionTh: 'หากโรงพยาบาลต้องการเก็บข้อมูลเบอร์โทรศัพท์ 7 หลัก (เช่น 123-4567) โดยใช้หมายเลขเป็นดัชนีตรงๆ จะต้องจองพื้นที่ขนาดเท่าใด?',
    options: [
      '1,000 ข้อมูล',
      '10,000 ข้อมูล',
      '1,000,000 ข้อมูล',
      '10,000,000 ข้อมูล'
    ],
    correctIndex: 3,
    explanationTh: 'ตามสไลด์หน้า 5: หากใช้เบอร์โทร 7 หลักเป็นดัชนี table[1234567] จะต้องจองพื้นที่ทั้งหมดสิบล้านข้อมูล (10,000,000 ข้อมูล)',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 5'
  },
  {
    id: 'mq-3',
    topic: 'Digit Selection',
    questionTh: 'รหัสลูกจ้าง 9 หลัก "001364825" หากกำหนดให้เลือกหลักที่ 4 และหลักสุดท้าย จะได้แอดเดรสตำแหน่งใด?',
    options: [
      'table[15]',
      'table[35]',
      'table[34]',
      'table[45]'
    ],
    correctIndex: 1,
    explanationTh: 'ตามสไลด์หน้า 10: หลักที่ 4 คือ 3 และหลักสุดท้าย (หลักที่ 9) คือ 5 นำมารวมกันได้ 35 ดังนั้นเก็บที่ table[35]',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 10'
  },
  {
    id: 'mq-4',
    topic: 'Digit Selection',
    questionTh: 'ข้อควรระวังสำคัญที่สุดในการเลือกหลัก (Digit Selection) ตามเอกสารบรรยายคือข้อใด?',
    options: [
      'ไม่สามารถใช้กับข้อมูลตัวเลข 9 หลักได้',
      'การเลือกหลักที่มีแนวโน้มซ้ำกันมาก (เช่น หลักที่ 1 และ 3) จะทำให้เกิดแอดเดรสซ้ำกันเป็นจำนวนมาก (Collision สูง)',
      'การเลือกหลักทำให้คอมพิวเตอร์ประมวลผลช้ากว่าการหารเอาเศษมาก',
      'การเลือกหลักต้องใช้พื้นที่หน่วยความจำเป็นสองเท่าเสมอ'
    ],
    correctIndex: 1,
    explanationTh: 'ตามสไลด์หน้า 11: หากเลือกหลักที่มีข้อมูลซ้ำกันเป็นจำนวนมาก เช่น หลักที่ 1 และหลักที่ 3 จะทำให้เกิดแอดเดรสซ้ำกันได้เป็นจำนวนมาก',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 11'
  },
  {
    id: 'mq-5',
    topic: 'Digit Addition',
    questionTh: 'ข้อมูลรหัส "001364825" เมื่อนำตัวเลขทุกหลักมาบวกกันทั้งหมด (Single Digit Addition) จะได้แอดเดรสใด และช่วงข้อมูลที่เป็นไปได้คือเท่าใด?',
    options: [
      'table[29], ช่วง 0 ถึง 81',
      'table[29], ช่วง 0 ถึง 99',
      'table[35], ช่วง 0 ถึง 81',
      'table[28], ช่วง 0 ถึง 90'
    ],
    correctIndex: 0,
    explanationTh: 'ตามสไลด์หน้า 12: 0+0+1+3+6+4+8+2+5 = 29 ได้ table[29] และเนื่องจาก 9 หลัก แต่ละหลักมีค่า 0-9 ค่าสูงสุดคือ 9x9 = 81 ดังนั้นช่วงคือ 0 ถึง 81 ข้อมูล',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 12'
  },
  {
    id: 'mq-6',
    topic: 'Digit Addition',
    questionTh: 'ข้อมูลรหัส "001364825" เมื่อแบ่งเป็น 3 กลุ่ม กลุ่มละ 3 หลัก แล้วนำมาบวกกัน จะได้ผลลัพธ์ใด?',
    options: [
      '001 + 364 + 825 = 1,190',
      '001 + 364 + 825 = 1,290',
      '013 + 648 + 250 = 911',
      '136 + 482 + 500 = 1,118'
    ],
    correctIndex: 0,
    explanationTh: 'ตามสไลด์หน้า 13: 001 + 364 + 825 = 1,190 ช่วงที่เป็นไปได้คือ 0 ถึง 3*999 = 2,997',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 13'
  },
  {
    id: 'mq-7',
    topic: 'Modulo Method',
    questionTh: 'เมื่อใช้แฮชฟังก์ชัน h(x) = x mod tableSize โดย tableSize = 101 ค่าแอดเดรสที่ได้จะอยู่ในช่วงใด?',
    options: [
      '1 ถึง 101',
      '0 ถึง 100',
      '0 ถึง 101',
      '1 ถึง 100'
    ],
    correctIndex: 1,
    explanationTh: 'ตามสไลด์หน้า 14: ถ้า tableSize = 101 จะได้ว่า h(x) = x mod 101 ทำให้ค่าตัวเลขจะอยู่ในช่วง 0 ถึง 100',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 14'
  },
  {
    id: 'mq-8',
    topic: 'Modulo Method',
    questionTh: 'ข้อมูล 001364825 เมื่อเข้าแฮชฟังก์ชัน h(x) = x mod 101 จะได้แอดเดรสตำแหน่งใดในตาราง?',
    options: [
      'table[12]',
      'table[22]',
      'table[29]',
      'table[35]'
    ],
    correctIndex: 0,
    explanationTh: 'ตามสไลด์หน้า 15: 1364825 mod 101 = 12 จะทำให้มีค่าแฮชคือ table[12]',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 15'
  },
  {
    id: 'mq-9',
    topic: 'Collision',
    questionTh: 'จากตัวอย่างในสไลด์ คีย์ 4567 และ 7597 เมื่อใช้ h(x) = x mod 101 จะเกิดเหตุการณ์ใด?',
    options: [
      '4567 ได้ table[22], 7597 ได้ table[23] ไม่มีการชนกัน',
      'ทั้งสองคีย์ได้แอดเดรส table[22] เหมือนกัน ทำให้เกิดการชนกันของข้อมูล (Collision)',
      'ทั้งสองคีย์ได้แอดเดรส table[67] เหมือนกัน',
      'โปรแกรมจะแสดงข้อผิดพลาดทันทีและไม่สามารถทำงานต่อได้'
    ],
    correctIndex: 1,
    explanationTh: 'ตามสไลด์หน้า 20: 4567 mod 101 = 22 และ 7597 mod 101 = 22 ทั้งคู่ได้ table[22] ซึ่งเป็นตำแหน่งที่ไม่อนุญาตให้เพิ่มเนื่องจากเกิดการชนกัน',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 20'
  },
  {
    id: 'mq-10',
    topic: 'Text Conversion',
    questionTh: 'เมื่อแปลงข้อความ "NOTE" เป็นรหัสตัวเลขอิงตามรหัส ASCII ในบทเรียน จะได้ชุดตัวเลขใด?',
    options: [
      '14, 15, 20, 5',
      '78, 79, 84, 69',
      '65, 66, 67, 68',
      '80, 81, 85, 70'
    ],
    correctIndex: 1,
    explanationTh: 'ตามสไลด์หน้า 16: เมื่อใช้รหัส ASCII ของตัวอักษร "NOTE" จะได้เป็น 78, 79, 84 และ 69 ตามลำดับ',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 16'
  },
  {
    id: 'mq-11',
    topic: 'Text Conversion',
    questionTh: 'เมื่อแทนตัวอักษร A ถึง Z ด้วยค่าตัวเลข 1 ถึง 26 ข้อความ "NOTE" จะได้ลำดับตัวเลขใด?',
    options: [
      '78, 79, 84, 69',
      '14, 15, 20, 5',
      '13, 14, 19, 4',
      '14, 16, 21, 6'
    ],
    correctIndex: 1,
    explanationTh: 'ตามสไลด์หน้า 16-17: N=14, O=15, T=20, E=5 ตามลำดับ',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 16-17'
  },
  {
    id: 'mq-12',
    topic: 'Text Conversion',
    questionTh: 'เหตุใดการแปลงตัวอักษร A ถึง Z (26 ตัว) เป็นเลขฐานสองจึงต้องใช้ขนาด 5 บิต?',
    options: [
      'เพราะคอมพิวเตอร์รองรับเฉพาะเลขคี่',
      'เพราะ 2⁴ = 16 (ไม่พอสำหรับ 26 ตัว) จึงต้องใช้ 2⁵ = 32 ซึ่งครอบคลุมค่า 1 ถึง 26',
      'เพราะมาตรฐาน ASCII กำหนดให้ใช้ 5 บิตเสมอ',
      'เพราะ Horner\'s rule บังคับให้ใช้ 5 บิตเท่านั้น'
    ],
    correctIndex: 1,
    explanationTh: 'ตามสไลด์หน้า 19: การแปลง A ถึง Z = 26 ตัว หากเปลี่ยนเป็นฐานสองจะใช้ 5 บิต ดังนั้นเลขฐานสอง 2^5 = 32',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 19'
  },
  {
    id: 'mq-13',
    topic: 'Horner\'s Rule',
    questionTh: 'การแปลงข้อความ "NOTE" (N=14, O=15, T=20, E=5) เป็นเลขฐานสิบด้วย Horner\'s Rule มีค่าเท่ากับเท่าใด?',
    options: [
      '474,757',
      '458,752',
      '123,456',
      '500,000'
    ],
    correctIndex: 0,
    explanationTh: 'ตามสไลด์หน้า 18-19: (14 × 32³) + (15 × 32²) + (20 × 32¹) + (5 × 32⁰) = 458,752 + 15,360 + 640 + 5 = 474,757',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 18-19'
  },
  {
    id: 'mq-14',
    topic: 'Collision Resolution',
    questionTh: 'เอกสารบรรยายระบุแนวทางการแก้ปัญหาการชนกันของแฮชคีย์ไว้กี่วิธีหลัก อะไรบ้าง?',
    options: [
      '1 วิธี คือ การขยายขนาดตารางทันที (Dynamic Resizing)',
      '2 วิธี คือ 1. ใช้ตำแหน่งแอดเดรสถัดไปที่ใกล้เคียง และ 2. เปลี่ยนโครงสร้างของตารางแฮชให้เก็บได้มากกว่าหนึ่งข้อมูล',
      '3 วิธี คือ Binary Search, Quick Sort, และ Merge Sort',
      '4 วิธี คือ Linear, Quadratic, Cubic, และ Polynomial'
    ],
    correctIndex: 1,
    explanationTh: 'ตามสไลด์หน้า 21: ปัญหาการชนกันสามารถแก้ไขได้ 2 วิธี คือ 1. ใช้ตำแหน่งแอดเดรสถัดไปที่ใกล้เคียง และ 2. เปลี่ยนโครงสร้างของตารางแฮชให้เก็บได้มากกว่าหนึ่งข้อมูล',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 21'
  },
  {
    id: 'mq-15',
    topic: 'Linear Probing',
    questionTh: 'ในการทำ Linear Probing หากตำแหน่ง table[h(x)] มีข้อมูลอยู่แล้ว ขั้นตอนถัดไปคืออะไร?',
    options: [
      'ตรวจสอบ table[h(x) + 1] ถ้าไม่ว่างขยับไป table[h(x) + 2] จนกระทั่งเจอตำแหน่งที่ยังว่าง',
      'ตรวจสอบ table[h(x) + 1²] แล้วไป table[h(x) + 2²]',
      'ทำการ Rehash ทั้งตารางทันที',
      'ทิ้งข้อมูลตัวใหม่และคืนค่า Error'
    ],
    correctIndex: 0,
    explanationTh: 'ตามสไลด์หน้า 22: Linear Probing จะเลื่อนตำแหน่งแอดเดรสไปยัง table[h(x)+1] ถ้าไม่ว่างขยับไป table[h(x)+2] จนกระทั่งเจอตำแหน่งที่ยังว่าง',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 22'
  },
  {
    id: 'mq-16',
    topic: 'Quadratic Probing',
    questionTh: 'ใน Quadratic Probing หากตำแหน่งเริ่มต้น h(x) = 22 เกิดการชนกัน ลำดับการตรวจสอบตำแหน่ง 3 ครั้งแรกคือข้อใด?',
    options: [
      '23, 24, 25',
      '23 (22+1²), 26 (22+2²), 31 (22+3²)',
      '24, 28, 32',
      '44, 88, 176'
    ],
    correctIndex: 1,
    explanationTh: 'ตามสไลด์หน้า 23: ขยับด้วยค่ายกกำลังสอง table[h(x)+1²]=23, table[h(x)+2²]=26, table[h(x)+3²]=31',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 23'
  },
  {
    id: 'mq-17',
    topic: 'Double Hashing',
    questionTh: 'ข้อกำหนดสำคัญที่สุดในการทำ Double Hashing (แฮช 2 ครั้ง) ตามที่เอกสารบรรยายระบุคือข้อใด?',
    options: [
      'h2(x) ต้องเป็นเลขคู่เสมอ',
      'h2(x) ≠ 0 และ h1 ≠ h2',
      'h1(x) ต้องมากกว่า h2(x) เสมอ',
      'h2(x) ต้องมีค่าเท่ากับ 1 เสมอ'
    ],
    correctIndex: 1,
    explanationTh: 'ตามสไลด์หน้า 24: ข้อกำหนดในการทำแฮช 2 ครั้งของแฮชฟังก์ชันคือ h2(x) ≠ 0 และ h1 ≠ h2',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 24'
  },
  {
    id: 'mq-18',
    topic: 'Double Hashing',
    questionTh: 'กำหนดตารางขนาด 11 ช่อง, h1(x) = x mod 11, h2(x) = 7 - (x mod 7) ข้อมูลคีย์ 58 จะถูกจัดเก็บที่ตำแหน่งใด?',
    options: [
      'table[0]',
      'table[3]',
      'table[5]',
      'table[8]'
    ],
    correctIndex: 1,
    explanationTh: 'ตามสไลด์หน้า 25: h1(58) = 58 mod 11 = 3 เนื่องจากช่อง 3 ว่าง จึงเก็บที่ table[3]',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 25'
  },
  {
    id: 'mq-19',
    topic: 'Double Hashing',
    questionTh: 'จากตารางเดิมที่มีคีย์ 58 อยู่ที่ table[3] เมื่อเพิ่มคีย์ 14 เข้าไป จะได้ตำแหน่งใด?',
    options: [
      'table[4]',
      'table[7]',
      'table[10]',
      'table[3]'
    ],
    correctIndex: 2,
    explanationTh: 'ตามสไลด์หน้า 26: h1(14) = 14 mod 11 = 3 (ชนกับ 58) จึงหา h2(14) = 7 - (14 mod 7) = 7 ได้ตำแหน่งใหม่เป็น table[3+7] = table[10]',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 26'
  },
  {
    id: 'mq-20',
    topic: 'Double Hashing',
    questionTh: 'จากตารางเดิมที่มี 58 ที่ table[3] และ 14 ที่ table[10] เมื่อเพิ่มคีย์ 91 เข้าไป (h1=3, h2=7) เมื่อเกิดการชนซ้ำ 3 + 7 + 7 = 17 ซึ่งเกินขนาดตาราง จะหาตำแหน่งอย่างไรตามสไลด์?',
    options: [
      'ทิ้งข้อมูล 91 ทันที',
      'นำ 17 ไปเข้า h1 อีกครั้ง: h1(17) = 17 mod 11 = 6 ได้ table[6]',
      'นำ 17 ลบด้วย 11 ได้ 6 แต่เก็บที่ table[7]',
      'วนกลับไปเริ่มที่ index 0'
    ],
    correctIndex: 1,
    explanationTh: 'ตามสไลด์หน้า 26: 3 + 7 + 7 = 17 ซึ่งเกินขนาดของอาร์เรย์ จึงต้องไปใช้ h1 อีกครั้ง เพื่อหาตำแหน่ง จะได้ h1(17) = 17 mod 11 = 6 ตำแหน่ง table[6]',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 26'
  },
  {
    id: 'mq-21',
    topic: 'Bucket',
    questionTh: 'ข้อจำกัดของการเก็บข้อมูลแบบกลุ่ม (Bucket) ตามที่เอกสารบรรยายระบุไว้คืออะไร?',
    options: [
      'ค้นหาข้อมูลได้ช้ากว่า Linked List เสมอ',
      'ถ้าขนาดของ Bucket มีขนาดน้อยกว่าจำนวนข้อมูลที่จะเพิ่มเข้าไป อาจทำให้เกิดการชนกันของข้อมูลใน Bucket ได้',
      'Bucket ใช้ได้เฉพาะกับแฮชฟังก์ชันแบบเลือกหลักเท่านั้น',
      'ไม่สามารถใช้กับคอมพิวเตอร์ 64-bit ได้'
    ],
    correctIndex: 1,
    explanationTh: 'ตามสไลด์หน้า 27: ข้อจำกัดคือถ้าขนาดของ Bucket มีขนาดน้อยกว่าจำนวนข้อมูลที่จะเพิ่มเข้าไปในตารางแฮช ก็อาจทำให้เกิดการชนกันของข้อมูลใน Bucket ได้',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 27'
  },
  {
    id: 'mq-22',
    topic: 'Separate Chaining',
    questionTh: 'การแยกออกจากกันด้วยการเชื่อมโยง (Separate Chaining) ใช้โครงสร้างข้อมูลใดร่วมกับอาร์เรย์ตารางแฮช?',
    options: [
      'Binary Search Tree',
      'ลิงก์ลิสต์ (Linked List)',
      'Stack',
      'Queue'
    ],
    correctIndex: 1,
    explanationTh: 'ตามสไลด์หน้า 28: วิธีนี้เป็นการออกแบบตารางแฮชด้วยการใช้อาร์เรย์ลิงก์ลิสต์ (Array of Linked Lists) โดยสมาชิกแต่ละตัวใน table[i] ทำหน้าที่อ้างอิงไปยังลิงก์ลิสต์',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 28'
  },
  {
    id: 'mq-23',
    topic: 'Trace / Application',
    questionTh: 'เมื่อต้องการค้นหาคีย์ในตารางแฮชที่ใช้วิธี Linear Probing การค้นหาจะหยุดลงเมื่อใด?',
    options: [
      'เมื่อเจอคีย์ที่ต้องการ หรือเมื่อตรวจสอบจนพบช่องว่าง (Empty slot) / ครบทุกช่องในตาราง',
      'หยุดเมื่อค้นหาผ่านไป 2 ช่องเสมอ',
      'หยุดเมื่อเจอค่า null ตัวแรกแล้วจะทำการ Rehash ตารางใหม่',
      'ค้นหาไปเรื่อยๆ ไม่มีวันหยุด'
    ],
    correctIndex: 0,
    explanationTh: 'การค้นหาใน Linear Probing จะตรวจสอบตามลำดับการ Probe หากพบคีย์แสดงว่าพบข้อมูล แต่ถ้าพบช่องว่างแสดงว่าข้อมูลนี้ไม่ได้ถูกบันทึกอยู่ในระบบ',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 2-3, 22'
  },
  {
    id: 'mq-24',
    topic: 'Comparison',
    questionTh: 'วิธีใดต่อไปนี้จัดอยู่ในกลุ่ม "การแก้ปัญหาการชนกันด้วยการปรับโครงสร้างตารางแฮช" ตามบทเรียน?',
    options: [
      'Linear Probing และ Quadratic Probing',
      'Double Hashing และ Modulo',
      'การเก็บข้อมูลแบบกลุ่ม (Bucket) และ การแยกออกจากกันด้วยการเชื่อมโยง (Separate Chaining)',
      'Digit Selection และ Digit Addition'
    ],
    correctIndex: 2,
    explanationTh: 'ตามสไลด์หน้า 21, 27, 28: วิธีที่ปรับโครงสร้างตารางแฮชมี 2 วิธีคือ Bucket และ Separate Chaining',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 21, 27, 28'
  },
  {
    id: 'mq-25',
    topic: 'Horner\'s Rule',
    questionTh: 'ในพหุนามของ Horner\'s Rule ตัวคูณ 32 มาจากสมการใด?',
    options: [
      '2⁴ = 16',
      '2⁵ = 32',
      '2⁶ = 64',
      '10² - 68'
    ],
    correctIndex: 1,
    explanationTh: 'ตามสไลด์หน้า 19: ตัวอักษร A-Z มี 26 ตัว เมื่อเปลี่ยนเป็นฐานสองต้องใช้ 5 บิต ดังนั้น 2^5 = 32',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 19'
  }
];

export const MOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
  ...MIXED_QUIZ_QUESTIONS,
  {
    id: 'mock-26',
    topic: 'Hashing Concept',
    questionTh: 'การแปลงข้อมูลให้อยู่ในรูปตัวเลขจำนวนเต็มเพื่อนำเข้าแฮชฟังก์ชัน มีเป้าหมายสูงสุดคืออะไร?',
    options: [
      'เพื่อให้สามารถนำไปบวก ลบ คูณ หาร ทางสถิติได้',
      'เพื่อให้ได้ดัชนีที่เป็นจำนวนเต็มสำหรับอ้างอิงตำแหน่งในอาร์เรย์ของตารางแฮช',
      'เพื่อลดความยาวของสตริงให้เหลือตัวเดียว',
      'เพื่อให้คอมพิวเตอร์พิมพ์ผลลัพธ์ออกมาเป็นภาษาไทยได้'
    ],
    correctIndex: 1,
    explanationTh: 'ตามสไลด์หน้า 2, 9: แฮชฟังก์ชันจัดการเกี่ยวกับตัวเลขจำนวนเต็มเพื่อให้เป็นดัชนีในการอ้างอิงตำแหน่งในอาร์เรย์',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 2, 9'
  },
  {
    id: 'mock-27',
    topic: 'Digit Selection',
    questionTh: 'ถ้ารหัสคือ "584920137" กำหนดให้เลือกหลักที่ 2 และหลักที่ 7 จะได้ตำแหน่งใดในตารางแฮช?',
    options: [
      'table[81]',
      'table[80]',
      'table[52]',
      'table[47]'
    ],
    correctIndex: 0,
    explanationTh: 'หลักที่ 2 คือ 8 และหลักที่ 7 คือ 1 นำมารวมกันได้ 81 → table[81]',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 10'
  },
  {
    id: 'mock-28',
    topic: 'Digit Addition',
    questionTh: 'ในการจัดกลุ่มหลักแบบบวก หากข้อมูลมี 9 หลัก แบ่งเป็น 3 กลุ่ม กลุ่มละ 3 หลัก ค่าสูงสุดของผลบวกที่เป็นไปได้คือเท่าใด?',
    options: [
      '999',
      '1,998',
      '2,997',
      '9,999'
    ],
    correctIndex: 2,
    explanationTh: 'ตามสไลด์หน้า 13: ค่าสูงสุดในแต่ละกลุ่มคือ 999 มี 3 กลุ่ม ดังนั้น 3 * 999 = 2,997',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 13'
  },
  {
    id: 'mock-29',
    topic: 'Separate Chaining',
    questionTh: 'ใน Separate Chaining หากมีคีย์ 3 ตัวถูกแฮชมาลงที่ table[4] ทั้งหมด โครงสร้างที่ table[4] จะมีลักษณะอย่างไร?',
    options: [
      'ข้อมูลทั้ง 3 ตัวจะถูกแทนที่ทับกันจนเหลือเพียงตัวสุดท้าย',
      'ตารางจะเกิด Overflow และแจ้งข้อผิดพลาด',
      'มี Linked List ที่ประกอบด้วย Node จำนวน 3 โหนดเชื่อมโยงต่อกัน',
      'ระบบจะย้ายข้อมูล 2 ตัวที่เหลือไปที่ table[5] และ table[6] โดยอัตโนมัติ'
    ],
    correctIndex: 2,
    explanationTh: 'ตามสไลด์หน้า 28: แต่ละช่องของตารางแฮชจะอ้างอิงไปยังลิงก์ลิสต์เพื่อใช้ในการเชื่อมโยงข้อมูลที่ชนกัน',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 28'
  },
  {
    id: 'mock-30',
    topic: 'Double Hashing',
    questionTh: 'หากกำหนดให้ h2(x) = 0 ในการทำ Double Hashing จะเกิดปัญหาใดขึ้นเมื่อมีการชน?',
    options: [
      'โปรแกรมจะทำงานได้รวดเร็วขึ้นเป็นสองเท่า',
      'เกิดการวนลูปไม่รู้จบที่ตำแหน่งเดิม เนื่องจากระยะการขยับเป็น 0 (current + 0 = current)',
      'ข้อมูลจะถูกบันทึกลงช่องแรกของตารางเสมอ',
      'ไม่มีผลกระทบใดๆ'
    ],
    correctIndex: 1,
    explanationTh: 'ตามสไลด์หน้า 24: มีข้อกำหนดว่า h2(x) ≠ 0 เพราะหาก h2 เป็น 0 จะไม่สามารถขยับตำแหน่งเพื่อหาช่องว่างถัดไปได้',
    lectureReference: 'Chapter 10 Hashing.pdf, สไลด์หน้า 24'
  }
];
