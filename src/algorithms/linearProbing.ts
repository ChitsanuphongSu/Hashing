import { TableSlot, TraceStep } from './types';

export interface LinearProbeResult {
  table: (TableSlot | null)[];
  traces: TraceStep[];
  success: boolean;
  finalIndex: number;
}

/**
 * Linear Probing (การแก้ปัญหาแบบลำดับ)
 * If table[h(x)] is occupied, try table[(h(x) + 1) mod tableSize], table[(h(x) + 2) mod tableSize]...
 */
export function insertLinearProbing(
  currentTable: (TableSlot | null)[],
  key: number | string,
  hashFn: (k: number | string) => number,
  tableSize: number
): LinearProbeResult {
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
    const currentIndex = (originalHash + probeNumber) % tableSize;
    const currentSlot = table[currentIndex];

    if (!currentSlot) {
      // Empty slot found -> insert
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
          ? `ช่อง table[${currentIndex}] ว่าง → ทำการบันทึกข้อมูลลงช่องนี้ได้ทันที`
          : `เลื่อนมาที่ table[${currentIndex}] (${originalHash} + ${probeNumber}) ซึ่งเป็นช่องว่าง → ทำการบันทึกข้อมูล`,
        tableSnapshot: [...table]
      });

      return {
        table,
        traces,
        success: true,
        finalIndex: currentIndex
      };
    } else {
      // Slot is occupied -> collision!
      traces.push({
        stepNumber: stepCounter++,
        key,
        originalHash,
        currentIndex,
        probeNumber,
        action: 'collision',
        status: 'collision',
        message: `เกิดการชน (Collision) ที่ table[${currentIndex}] เนื่องจากมีคีย์ ${currentSlot.key} อยู่แล้ว`,
        tableSnapshot: [...table]
      });

      probeNumber++;
      if (probeNumber < tableSize) {
        const nextIndex = (originalHash + probeNumber) % tableSize;
        traces.push({
          stepNumber: stepCounter++,
          key,
          originalHash,
          currentIndex: nextIndex,
          probeNumber,
          action: 'probe',
          status: 'probing',
          message: `ทำการ Probing ไปยัง table[h(x) + ${probeNumber}] = table[${nextIndex}]`,
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

export function searchLinearProbing(
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
    const currentIndex = (originalHash + probeNumber) % tableSize;
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
        message: `ตรวจสอบ table[${currentIndex}] พบช่องว่าง → สรุปว่าไม่พบข้อมูล ${key}`,
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
        message: `พบข้อมูล ${key} ที่ table[${currentIndex}] (ใช้การ Probe ${probeNumber} ครั้ง)`,
        tableSnapshot: [...table]
      });
      return { found: true, index: currentIndex, traces };
    }

    traces.push({
      stepNumber: stepCounter++,
      key,
      originalHash,
      currentIndex,
      probeNumber,
      action: 'probe',
      status: 'probing',
      message: `ช่อง table[${currentIndex}] เป็นของคีย์ ${currentSlot.key} → ขยับตรวจสอบช่องถัดไป table[h(x) + ${probeNumber + 1}]`,
      tableSnapshot: [...table]
    });

    probeNumber++;
  }

  return { found: false, index: -1, traces };
}
