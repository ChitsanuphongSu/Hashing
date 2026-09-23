import { TableSlot, TraceStep } from './types';

export interface QuadraticProbeResult {
  table: (TableSlot | null)[];
  traces: TraceStep[];
  success: boolean;
  finalIndex: number;
}

/**
 * Quadratic Probing (การแก้ปัญหาแบบกำลังสอง)
 * If table[h(x)] is occupied, try table[(h(x) + 1^2) mod tableSize], table[(h(x) + 2^2) mod tableSize], table[(h(x) + 3^2) mod tableSize]...
 * Lecture formula: table[h(x) + 1^2], table[h(x) + 2^2], table[h(x) + 3^2]...
 */
export function insertQuadraticProbing(
  currentTable: (TableSlot | null)[],
  key: number | string,
  hashFn: (k: number | string) => number,
  tableSize: number
): QuadraticProbeResult {
  const table = [...currentTable];
  const traces: TraceStep[] = [];
  const originalHash = hashFn(key) % tableSize;
  let probeNumber = 0;
  let stepCounter = 1;

  traces.push({
    stepNumber: stepCounter++,
    key,
    originalHash,
    currentIndex: originalHash,
    probeNumber: 0,
    action: 'calculate_hash',
    status: table[originalHash] ? 'occupied' : 'empty',
    message: `คำนวณแฮช h(${key}) = ${originalHash}`,
    tableSnapshot: [...table]
  });

  while (probeNumber < tableSize) {
    const offset = probeNumber * probeNumber;
    const currentIndex = (originalHash + offset) % tableSize;
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
        originalHash,
        currentIndex,
        probeNumber,
        action: 'insert',
        status: 'inserted',
        message: probeNumber === 0
          ? `ช่อง table[${currentIndex}] ว่าง → ทำการบันทึกข้อมูล`
          : `ขยับด้วยกำลังสอง table[${originalHash} + ${probeNumber}²] = table[${currentIndex}] พบช่องว่าง → ทำการบันทึกข้อมูล`,
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
        originalHash,
        currentIndex,
        probeNumber,
        action: 'collision',
        status: 'collision',
        message: `เกิดการชน (Collision) ที่ table[${currentIndex}] มีคีย์ ${currentSlot.key} อยู่แล้ว`,
        tableSnapshot: [...table]
      });

      probeNumber++;
      if (probeNumber < tableSize) {
        const nextOffset = probeNumber * probeNumber;
        const nextIndex = (originalHash + nextOffset) % tableSize;
        traces.push({
          stepNumber: stepCounter++,
          key,
          originalHash,
          currentIndex: nextIndex,
          probeNumber,
          action: 'probe',
          status: 'probing',
          message: `ทำการ Probing ลำดับที่ ${probeNumber}: table[${originalHash} + ${probeNumber}²] = table[${originalHash} + ${nextOffset}] → index ${nextIndex}`,
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

export function searchQuadraticProbing(
  table: (TableSlot | null)[],
  key: number | string,
  hashFn: (k: number | string) => number,
  tableSize: number
): { found: boolean; index: number; traces: TraceStep[] } {
  const traces: TraceStep[] = [];
  const originalHash = hashFn(key) % tableSize;
  let probeNumber = 0;
  let stepCounter = 1;

  while (probeNumber < tableSize) {
    const offset = probeNumber * probeNumber;
    const currentIndex = (originalHash + offset) % tableSize;
    const currentSlot = table[currentIndex];

    if (!currentSlot) {
      traces.push({
        stepNumber: stepCounter++,
        key,
        originalHash,
        currentIndex,
        probeNumber,
        action: 'search_empty',
        status: 'not_found',
        message: `ตรวจสอบ table[${originalHash} + ${probeNumber}²] = table[${currentIndex}] พบช่องว่าง → ไม่พบข้อมูล ${key}`,
        tableSnapshot: [...table]
      });
      return { found: false, index: -1, traces };
    }

    if (String(currentSlot.key) === String(key)) {
      traces.push({
        stepNumber: stepCounter++,
        key,
        originalHash,
        currentIndex,
        probeNumber,
        action: 'search_match',
        status: 'found',
        message: `พบข้อมูล ${key} ที่ table[${currentIndex}] จากการกระโดดลำดับที่ ${probeNumber} (${originalHash} + ${probeNumber}²)`,
        tableSnapshot: [...table]
      });
      return { found: true, index: currentIndex, traces };
    }

    probeNumber++;
  }

  return { found: false, index: -1, traces };
}
