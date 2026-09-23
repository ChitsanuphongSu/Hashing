import { BucketSlot, ChainingSlot, TraceStep } from './types';

export interface SeparateChainingResult {
  chains: ChainingSlot[];
  traces: TraceStep[];
  success: boolean;
  finalIndex: number;
}

/**
 * Separate Chaining (การแยกออกจากกันด้วยการเชื่อมโยง)
 * Lecture slide 28: Each table[i] references a Linked List to chain collided keys.
 */
export function insertSeparateChaining(
  currentChains: ChainingSlot[],
  key: number | string,
  hashFn: (k: number | string) => number,
  tableSize: number
): SeparateChainingResult {
  const chains: ChainingSlot[] = currentChains.map(c => ({
    index: c.index,
    nodes: [...c.nodes]
  }));

  const traces: TraceStep[] = [];
  const hashVal = hashFn(key) % tableSize;
  let stepCounter = 1;

  traces.push({
    stepNumber: stepCounter++,
    key,
    originalHash: hashVal,
    currentIndex: hashVal,
    probeNumber: 0,
    action: 'calculate_hash',
    status: chains[hashVal].nodes.length > 0 ? 'occupied' : 'empty',
    message: `คำนวณแฮช h(${key}) = ${hashVal} (ชี้ไปที่ Linked List ของ table[${hashVal}])`,
    tableSnapshot: []
  });

  const targetChain = chains[hashVal];
  const isCollision = targetChain.nodes.length > 0;

  if (isCollision) {
    traces.push({
      stepNumber: stepCounter++,
      key,
      originalHash: hashVal,
      currentIndex: hashVal,
      probeNumber: 0,
      action: 'collision',
      status: 'collision',
      message: `เกิดการชนที่ table[${hashVal}] มีข้อมูลเชื่อมโยงอยู่แล้ว (${targetChain.nodes.join(' -> ')})`,
      tableSnapshot: []
    });
  }

  targetChain.nodes.push(key);

  traces.push({
    stepNumber: stepCounter++,
    key,
    originalHash: hashVal,
    currentIndex: hashVal,
    probeNumber: targetChain.nodes.length - 1,
    action: 'chain_append',
    status: 'inserted',
    message: isCollision
      ? `เพิ่ม Node ใหม่ [${key}] ต่อท้าย Linked List ของ table[${hashVal}] (${targetChain.nodes.join(' -> ')})`
      : `สร้าง Node แรก [${key}] ใน Linked List ของ table[${hashVal}]`,
    tableSnapshot: []
  });

  return {
    chains,
    traces,
    success: true,
    finalIndex: hashVal
  };
}

/**
 * Search Separate Chaining:
 * key -> hash -> table[index] -> traverse linked list -> found / not found
 */
export function searchSeparateChaining(
  chains: ChainingSlot[],
  key: number | string,
  hashFn: (k: number | string) => number,
  tableSize: number
): { found: boolean; index: number; nodeIndex: number; traces: TraceStep[] } {
  const traces: TraceStep[] = [];
  const hashVal = hashFn(key) % tableSize;
  let stepCounter = 1;

  traces.push({
    stepNumber: stepCounter++,
    key,
    originalHash: hashVal,
    currentIndex: hashVal,
    probeNumber: 0,
    action: 'calculate_hash',
    status: 'probing',
    message: `ค้นหา: คำนวณแฮช h(${key}) = ${hashVal} เพื่อตรวจสอบ Linked List ที่ table[${hashVal}]`,
    tableSnapshot: []
  });

  const targetChain = chains[hashVal];
  if (!targetChain || targetChain.nodes.length === 0) {
    traces.push({
      stepNumber: stepCounter++,
      key,
      originalHash: hashVal,
      currentIndex: hashVal,
      probeNumber: 0,
      action: 'search_empty',
      status: 'not_found',
      message: `ตาราง table[${hashVal}] เป็น Linked List ว่างเปล่า (null) → สรุปไม่พบคีย์ ${key}`,
      tableSnapshot: []
    });
    return { found: false, index: hashVal, nodeIndex: -1, traces };
  }

  for (let i = 0; i < targetChain.nodes.length; i++) {
    const nodeVal = targetChain.nodes[i];
    if (String(nodeVal) === String(key)) {
      traces.push({
        stepNumber: stepCounter++,
        key,
        originalHash: hashVal,
        currentIndex: hashVal,
        probeNumber: i,
        action: 'search_match',
        status: 'found',
        message: `พบคีย์ ${key} ใน Linked List ของ table[${hashVal}] ที่โหนดลำดับที่ ${i + 1}`,
        tableSnapshot: []
      });
      return { found: true, index: hashVal, nodeIndex: i, traces };
    } else {
      traces.push({
        stepNumber: stepCounter++,
        key,
        originalHash: hashVal,
        currentIndex: hashVal,
        probeNumber: i,
        action: 'probe',
        status: 'probing',
        message: `ตรวจสอบโหนดลำดับที่ ${i + 1} (${nodeVal}) ≠ ${key} → เลื่อน pointer ไปยังโหนดถัดไป`,
        tableSnapshot: []
      });
    }
  }

  traces.push({
    stepNumber: stepCounter++,
    key,
    originalHash: hashVal,
    currentIndex: hashVal,
    probeNumber: targetChain.nodes.length,
    action: 'search_empty',
    status: 'not_found',
    message: `ไล่ตรวจ Linked List จนสุดสาย (ชี้ไปที่ null) → สรุปไม่พบคีย์ ${key}`,
    tableSnapshot: []
  });

  return { found: false, index: hashVal, nodeIndex: -1, traces };
}

export interface BucketHashResult {
  buckets: BucketSlot[];
  traces: TraceStep[];
  success: boolean;
  finalIndex: number;
}

/**
 * Bucket Hashing (การเก็บข้อมูลแบบกลุ่ม)
 * Lecture slide 27: Each table[i] is an array called Bucket.
 * Limitation: If bucket size is exceeded, collision still happens inside bucket.
 */
export function insertBucket(
  currentBuckets: BucketSlot[],
  key: number | string,
  hashFn: (k: number | string) => number,
  tableSize: number
): BucketHashResult {
  const buckets: BucketSlot[] = currentBuckets.map(b => ({
    index: b.index,
    capacity: b.capacity,
    items: [...b.items]
  }));

  const traces: TraceStep[] = [];
  const hashVal = hashFn(key) % tableSize;
  let stepCounter = 1;

  traces.push({
    stepNumber: stepCounter++,
    key,
    originalHash: hashVal,
    currentIndex: hashVal,
    probeNumber: 0,
    action: 'calculate_hash',
    status: buckets[hashVal].items.length > 0 ? 'occupied' : 'empty',
    message: `คำนวณแฮช h(${key}) = ${hashVal} (ชี้ไปที่ Bucket ของ table[${hashVal}])`,
    tableSnapshot: []
  });

  const targetBucket = buckets[hashVal];
  const isFull = targetBucket.items.length >= targetBucket.capacity;

  if (targetBucket.items.length > 0) {
    traces.push({
      stepNumber: stepCounter++,
      key,
      originalHash: hashVal,
      currentIndex: hashVal,
      probeNumber: 0,
      action: 'collision',
      status: 'collision',
      message: `มีข้อมูลอยู่ใน Bucket table[${hashVal}] แล้ว (${targetBucket.items.join(', ')})`,
      tableSnapshot: []
    });
  }

  if (isFull) {
    traces.push({
      stepNumber: stepCounter++,
      key,
      originalHash: hashVal,
      currentIndex: hashVal,
      probeNumber: targetBucket.items.length,
      action: 'bucket_overflow',
      status: 'collision',
      message: `ข้อจำกัดของ Bucket: ขนาดความจุเต็ม (${targetBucket.capacity} ช่อง) ไม่สามารถเพิ่ม ${key} ลงใน Bucket ได้`,
      tableSnapshot: []
    });

    return {
      buckets,
      traces,
      success: false,
      finalIndex: hashVal
    };
  }

  targetBucket.items.push(key);

  traces.push({
    stepNumber: stepCounter++,
    key,
    originalHash: hashVal,
    currentIndex: hashVal,
    probeNumber: targetBucket.items.length - 1,
    action: 'bucket_append',
    status: 'inserted',
    message: `บันทึก [${key}] ลงใน Bucket table[${hashVal}] ช่องที่ ${targetBucket.items.length} (ความจุ ${targetBucket.items.length}/${targetBucket.capacity})`,
    tableSnapshot: []
  });

  return {
    buckets,
    traces,
    success: true,
    finalIndex: hashVal
  };
}

/**
 * Search Bucket:
 * key -> hash -> table[index] -> inspect bucket items -> found / not found
 */
export function searchBucket(
  buckets: BucketSlot[],
  key: number | string,
  hashFn: (k: number | string) => number,
  tableSize: number
): { found: boolean; index: number; bucketSlotIndex: number; traces: TraceStep[] } {
  const traces: TraceStep[] = [];
  const hashVal = hashFn(key) % tableSize;
  let stepCounter = 1;

  traces.push({
    stepNumber: stepCounter++,
    key,
    originalHash: hashVal,
    currentIndex: hashVal,
    probeNumber: 0,
    action: 'calculate_hash',
    status: 'probing',
    message: `ค้นหา: คำนวณแฮช h(${key}) = ${hashVal} เพื่อตรวจสอบอาร์เรย์ Bucket ที่ table[${hashVal}]`,
    tableSnapshot: []
  });

  const targetBucket = buckets[hashVal];
  if (!targetBucket || targetBucket.items.length === 0) {
    traces.push({
      stepNumber: stepCounter++,
      key,
      originalHash: hashVal,
      currentIndex: hashVal,
      probeNumber: 0,
      action: 'search_empty',
      status: 'not_found',
      message: `Bucket ที่ table[${hashVal}] ว่างเปล่า (ไม่มีข้อมูลใดๆ) → สรุปไม่พบคีย์ ${key}`,
      tableSnapshot: []
    });
    return { found: false, index: hashVal, bucketSlotIndex: -1, traces };
  }

  for (let i = 0; i < targetBucket.items.length; i++) {
    const itemVal = targetBucket.items[i];
    if (String(itemVal) === String(key)) {
      traces.push({
        stepNumber: stepCounter++,
        key,
        originalHash: hashVal,
        currentIndex: hashVal,
        probeNumber: i,
        action: 'search_match',
        status: 'found',
        message: `พบคีย์ ${key} อยู่ใน Bucket table[${hashVal}] ช่องย่อยที่ ${i + 1}`,
        tableSnapshot: []
      });
      return { found: true, index: hashVal, bucketSlotIndex: i, traces };
    } else {
      traces.push({
        stepNumber: stepCounter++,
        key,
        originalHash: hashVal,
        currentIndex: hashVal,
        probeNumber: i,
        action: 'probe',
        status: 'probing',
        message: `ตรวจสอบช่องย่อยที่ ${i + 1} (${itemVal}) ≠ ${key} → ตรวจสอบช่องย่อยถัดไปใน Bucket`,
        tableSnapshot: []
      });
    }
  }

  traces.push({
    stepNumber: stepCounter++,
    key,
    originalHash: hashVal,
    currentIndex: hashVal,
    probeNumber: targetBucket.items.length,
    action: 'search_empty',
    status: 'not_found',
    message: `ตรวจครบทุกสมาชิกใน Bucket (${targetBucket.items.length}/${targetBucket.capacity}) แล้วไม่พบ → สรุปไม่พบคีย์ ${key}`,
    tableSnapshot: []
  });

  return { found: false, index: hashVal, bucketSlotIndex: -1, traces };
}
