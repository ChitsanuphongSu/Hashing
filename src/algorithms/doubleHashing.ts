import { TableSlot, TraceStep } from './types';

export interface DoubleHashResult {
  table: (TableSlot | null)[];
  traces: TraceStep[];
  success: boolean;
  finalIndex: number;
}

/**
 * Double Hashing (การทำแฮช 2 ครั้ง)
 * Lecture rules (Slide 24-26):
 * - h1(x) provides initial address
 * - If collision: h2(x) provides step size
 * - Conditions: h2(x) != 0 and h1 != h2
 * - Standard lecture example:
 *   h1(x) = x mod 11
 *   h2(x) = 7 - (x mod 7)
 * - Repeated collisions: initial + h2, initial + 2*h2...
 * - Lecture slide 26 exact wrap rule:
 *   "3 + 7 + 7 = 17 ซึ่งเกินขนาดของอาร์เรย์ จึงต้องไปใช้ h1 อีกครั้ง เพื่อหาตำแหน่ง จะได้ h1(17) = 17 mod 11 = 6 ตำแหน่ง table[6]"
 */
export function insertDoubleHashing(
  currentTable: (TableSlot | null)[],
  key: number | string,
  h1Fn: (k: number | string) => number,
  h2Fn: (k: number | string) => number,
  tableSize: number
): DoubleHashResult {
  const table = [...currentTable];
  const traces: TraceStep[] = [];
  const numKey = typeof key === 'number' ? key : parseInt(String(key), 10) || 0;
  
  const h1Val = h1Fn(numKey) % tableSize;
  const h2Val = h2Fn(numKey);

  let probeNumber = 0;
  let stepCounter = 1;

  traces.push({
    stepNumber: stepCounter++,
    key,
    originalHash: h1Val,
    currentIndex: h1Val,
    probeNumber: 0,
    action: 'calculate_hash',
    status: table[h1Val] ? 'occupied' : 'empty',
    message: `คำนวณ h1(${key}) = ${h1Val} และ h2(${key}) = ${h2Val}`,
    tableSnapshot: [...table]
  });

  while (probeNumber < tableSize) {
    let currentIndex: number;
    let calcDesc = '';

    if (probeNumber === 0) {
      currentIndex = h1Val;
      calcDesc = `h1(${key}) = ${h1Val}`;
    } else {
      const rawPos = h1Val + probeNumber * h2Val;
      if (rawPos >= tableSize) {
        // Lecture Slide 26 rule: h1(rawPos) = rawPos mod tableSize
        currentIndex = h1Fn(rawPos) % tableSize;
        calcDesc = `${h1Val} + ${probeNumber}×${h2Val} = ${rawPos} (เกินขนาด ${tableSize}) → ใช้ h1(${rawPos}) = ${rawPos} mod ${tableSize} = ${currentIndex}`;
      } else {
        currentIndex = rawPos % tableSize;
        calcDesc = `${h1Val} + ${probeNumber}×${h2Val} = ${currentIndex}`;
      }
    }

    const currentSlot = table[currentIndex];

    if (!currentSlot) {
      table[currentIndex] = {
        index: currentIndex,
        key,
        probeCount: probeNumber
      };

      traces.push({
        stepNumber: stepCounter++,
        key,
        originalHash: h1Val,
        currentIndex,
        probeNumber,
        action: 'insert',
        status: 'inserted',
        message: probeNumber === 0
          ? `ตำแหน่ง table[${currentIndex}] ว่าง → ทำการบันทึกข้อมูล`
          : `คำนวณ Double Hashing: ${calcDesc} พบช่อง table[${currentIndex}] ว่าง → ทำการบันทึกข้อมูล`,
        tableSnapshot: [...table]
      });

      return {
        table,
        traces,
        success: true,
        finalIndex: currentIndex
      };
    } else {
      traces.push({
        stepNumber: stepCounter++,
        key,
        originalHash: h1Val,
        currentIndex,
        probeNumber,
        action: 'collision',
        status: 'collision',
        message: `เกิดการชนที่ table[${currentIndex}] (มีคีย์ ${currentSlot.key} อยู่แล้ว)`,
        tableSnapshot: [...table]
      });

      probeNumber++;
      if (probeNumber < tableSize) {
        const nextRaw = h1Val + probeNumber * h2Val;
        const nextIdx = nextRaw >= tableSize ? (h1Fn(nextRaw) % tableSize) : (nextRaw % tableSize);
        traces.push({
          stepNumber: stepCounter++,
          key,
          originalHash: h1Val,
          currentIndex: nextIdx,
          probeNumber,
          action: 'probe',
          status: 'probing',
          message: `กระโดดด้วย h2(${key}) = ${h2Val} (ครั้งที่ ${probeNumber}): คำนวณไปยัง index ${nextIdx}`,
          tableSnapshot: [...table]
        });
      }
    }
  }

  return {
    table,
    traces,
    success: false,
    finalIndex: -1
  };
}

export function searchDoubleHashing(
  table: (TableSlot | null)[],
  key: number | string,
  h1Fn: (k: number | string) => number,
  h2Fn: (k: number | string) => number,
  tableSize: number
): { found: boolean; index: number; traces: TraceStep[] } {
  const traces: TraceStep[] = [];
  const numKey = typeof key === 'number' ? key : parseInt(String(key), 10) || 0;
  const h1Val = h1Fn(numKey) % tableSize;
  const h2Val = h2Fn(numKey);
  let probeNumber = 0;
  let stepCounter = 1;

  while (probeNumber < tableSize) {
    let currentIndex: number;
    if (probeNumber === 0) {
      currentIndex = h1Val;
    } else {
      const rawPos = h1Val + probeNumber * h2Val;
      currentIndex = rawPos >= tableSize ? (h1Fn(rawPos) % tableSize) : (rawPos % tableSize);
    }

    const currentSlot = table[currentIndex];

    if (!currentSlot) {
      traces.push({
        stepNumber: stepCounter++,
        key,
        originalHash: h1Val,
        currentIndex,
        probeNumber,
        action: 'search_empty',
        status: 'not_found',
        message: `ตรวจสอบ table[${currentIndex}] พบช่องว่าง → สรุปไม่พบคีย์ ${key}`,
        tableSnapshot: [...table]
      });
      return { found: false, index: -1, traces };
    }

    if (String(currentSlot.key) === String(key)) {
      traces.push({
        stepNumber: stepCounter++,
        key,
        originalHash: h1Val,
        currentIndex,
        probeNumber,
        action: 'search_match',
        status: 'found',
        message: `พบคีย์ ${key} ที่ table[${currentIndex}] (สเต็ป h2 = ${h2Val}, Probe ${probeNumber} ครั้ง)`,
        tableSnapshot: [...table]
      });
      return { found: true, index: currentIndex, traces };
    }

    probeNumber++;
  }

  return { found: false, index: -1, traces };
}
