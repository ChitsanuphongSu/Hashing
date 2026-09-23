import { HashCalcResult } from './types';

/**
 * 1. Digit Selection (การเลือกหลัก)
 * Selects specified 1-based digit positions from key and combines them.
 * Lecture example: key = "001364825", 4th digit (3) + last digit 9th (5) => 35
 */
export function hashByDigitSelection(
  key: string | number,
  selectedPositions: number[] = [4, 9] // 1-indexed
): HashCalcResult {
  const strKey = String(key);
  const digits = strKey.split('');
  const selectedDigits = selectedPositions.map(pos => {
    const idx = pos - 1;
    return idx >= 0 && idx < digits.length ? digits[idx] : '0';
  });
  
  const combined = selectedDigits.join('');
  const hashValue = parseInt(combined, 10) || 0;
  
  const steps = [
    `Input key: ${strKey} (ความยาว ${digits.length} หลัก)`,
    `เลือกหลักที่: ${selectedPositions.join(' และ ')}`,
    `ได้ตัวเลข: ${selectedDigits.join(' และ ')} ตามลำดับ`,
    `รวมเป็นแอดเดรส: ${combined} → table[${hashValue}]`
  ];

  return {
    method: 'digit_selection',
    inputKey: key,
    numericKey: parseInt(strKey, 10) || 0,
    hashValue,
    steps,
    explanation: `จากรหัส ${strKey} เลือกหลักที่ ${selectedPositions.join(', ')} จะได้ ${combined} เป็นตำแหน่งแอดเดรส table[${hashValue}]`
  };
}

/**
 * 2. Digit Addition (การบวกหลัก)
 * (A) Individual digit addition (บวกทีละหลัก)
 * Lecture example: 001364825 -> 0+0+1+3+6+4+8+2+5 = 29 -> table[29] (0..81)
 */
export function hashByDigitAdditionIndividual(key: string | number): HashCalcResult {
  const strKey = String(key);
  const digits = strKey.split('').map(d => parseInt(d, 10) || 0);
  const sum = digits.reduce((acc, curr) => acc + curr, 0);

  const steps = [
    `Input key: ${strKey}`,
    `นำตัวเลขทุกหลักมาบวกกัน: ${digits.join(' + ')}`,
    `ผลรวม = ${sum}`,
    `แอดเดรสที่ได้: table[${sum}] (ช่วงที่เป็นไปได้สำหรับ 9 หลักคือ 0 ถึง 81)`
  ];

  return {
    method: 'digit_addition',
    inputKey: key,
    numericKey: parseInt(strKey, 10) || 0,
    hashValue: sum,
    steps,
    explanation: `บวกตัวเลขทุกหลักของ ${strKey} ได้ ${sum} จัดเก็บที่ table[${sum}]`
  };
}

/**
 * (B) Grouped digit addition (การจัดกลุ่มหลักแล้วบวก)
 * Lecture example: 001364825 divided into 3 groups of 3 digits: 001 + 364 + 825 = 1,190 (range 0..2,997)
 */
export function hashByGroupedDigitAddition(
  key: string | number,
  groupSize: number = 3
): HashCalcResult {
  const strKey = String(key);
  const groups: string[] = [];
  for (let i = 0; i < strKey.length; i += groupSize) {
    groups.push(strKey.substring(i, i + groupSize));
  }
  const groupNums = groups.map(g => parseInt(g, 10) || 0);
  const sum = groupNums.reduce((acc, curr) => acc + curr, 0);

  const steps = [
    `Input key: ${strKey}`,
    `แบ่งกลุ่มละ ${groupSize} หลัก: ${groups.join(', ')}`,
    `นำแต่ละกลุ่มมาบวกกัน: ${groupNums.join(' + ')}`,
    `ผลรวม = ${sum}`,
    `แอดเดรสที่ได้: table[${sum}] (ช่วงที่เป็นไปได้คือ 0 ถึง ${groups.length}*${Math.pow(10, groupSize) - 1} = ${groups.length * (Math.pow(10, groupSize) - 1)})`
  ];

  return {
    method: 'grouped_addition',
    inputKey: key,
    numericKey: parseInt(strKey, 10) || 0,
    hashValue: sum,
    steps,
    explanation: `แบ่ง ${strKey} ออกเป็น ${groups.length} กลุ่ม (${groups.join(' + ')}) ได้ ${sum}`
  };
}

/**
 * 3. Modulo (การหารเอาเศษ)
 * Formula: h(x) = x mod tableSize
 * Lecture examples:
 * - 001364825 mod 101 = 12
 * - 4567 mod 101 = 22
 * - 7597 mod 101 = 22 (ชนกับ 4567)
 */
export function hashByModulo(
  key: string | number,
  tableSize: number = 101
): HashCalcResult {
  const numKey = typeof key === 'number' ? key : parseInt(String(key), 10) || 0;
  const hashValue = ((numKey % tableSize) + tableSize) % tableSize;

  const steps = [
    `Input key (x): ${numKey}`,
    `สูตร: h(x) = x mod tableSize`,
    `คำนวณ: ${numKey} mod ${tableSize}`,
    `เศษที่ได้ = ${hashValue}`,
    `แอดเดรสที่ได้: table[${hashValue}] (ช่วงตำแหน่ง 0 ถึง ${tableSize - 1})`
  ];

  return {
    method: 'modulo',
    inputKey: key,
    numericKey: numKey,
    hashValue,
    steps,
    explanation: `คำนวณ ${numKey} mod ${tableSize} ได้เศษ ${hashValue} จัดเก็บที่ table[${hashValue}]`
  };
}
