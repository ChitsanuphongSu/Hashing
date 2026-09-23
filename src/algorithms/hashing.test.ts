import { describe, it, expect } from 'vitest';
import {
  hashByDigitSelection,
  hashByDigitAdditionIndividual,
  hashByGroupedDigitAddition,
  hashByModulo
} from '../algorithms/hashFunctions';
import { convertTextToNumber } from '../algorithms/textConversion';
import { insertLinearProbing, searchLinearProbing } from '../algorithms/linearProbing';
import { insertQuadraticProbing, searchQuadraticProbing } from '../algorithms/quadraticProbing';
import { insertDoubleHashing, searchDoubleHashing } from '../algorithms/doubleHashing';
import {
  insertSeparateChaining,
  searchSeparateChaining,
  insertBucket,
  searchBucket
} from '../algorithms/separateChaining';
import { TableSlot, ChainingSlot, BucketSlot } from '../algorithms/types';

describe('1. Hash Functions — Lecture Grounded Verification', () => {
  it('Digit Selection: key "001364825", 4th and last digit -> 35', () => {
    const res = hashByDigitSelection('001364825', [4, 9]);
    expect(res.hashValue).toBe(35);
  });

  it('Digit Addition Individual: key "001364825" -> 0+0+1+3+6+4+8+2+5 = 29', () => {
    const res = hashByDigitAdditionIndividual('001364825');
    expect(res.hashValue).toBe(29);
  });

  it('Grouped Digit Addition (3s): key "001364825" -> 001 + 364 + 825 = 1190', () => {
    const res = hashByGroupedDigitAddition('001364825', 3);
    expect(res.hashValue).toBe(1190);
  });

  it('Modulo Hash: 001364825 mod 101 = 12', () => {
    const res = hashByModulo('001364825', 101);
    expect(res.hashValue).toBe(12);
  });

  it('Modulo Collision: 4567 mod 101 = 22 and 7597 mod 101 = 22', () => {
    const r1 = hashByModulo(4567, 101);
    const r2 = hashByModulo(7597, 101);
    expect(r1.hashValue).toBe(22);
    expect(r2.hashValue).toBe(22);
  });
});

describe('2. Text to Number & Horner\'s Rule — Lecture Example "NOTE"', () => {
  it('Converts NOTE accurately: ASCII, A-Z (14, 15, 20, 5), and Horner total = 474757', () => {
    const res = convertTextToNumber('NOTE');
    expect(res.asciiValues.map(a => a.ascii)).toEqual([78, 79, 84, 69]);
    expect(res.azValues.map(a => a.az)).toEqual([14, 15, 20, 5]);
    expect(res.binary5Bit.map(b => b.binary)).toEqual(['01110', '01111', '10100', '00101']);
    // (14 * 32^3) + (15 * 32^2) + (20 * 32^1) + (5 * 32^0) = 458752 + 15360 + 640 + 5 = 474,757
    expect(res.hornerCalculation.total).toBe(474757);
  });
});

describe('3. Linear Probing — Collision Resolution & Search', () => {
  it('Resolves collision from index 22 to 23', () => {
    const size = 101;
    const hashFn = (k: number | string) => Number(k) % size;
    let table: (TableSlot | null)[] = Array(size).fill(null);

    const r1 = insertLinearProbing(table, 4567, hashFn, size);
    table = r1.table;
    expect(r1.finalIndex).toBe(22);

    const r2 = insertLinearProbing(table, 7597, hashFn, size);
    table = r2.table;
    expect(r2.finalIndex).toBe(23);

    const searchRes = searchLinearProbing(table, 7597, hashFn, size);
    expect(searchRes.found).toBe(true);
    expect(searchRes.index).toBe(23);
  });
});

describe('4. Quadratic Probing — Collision Resolution & Search', () => {
  it('Jumps by 1^2, 2^2, 3^2', () => {
    const size = 101;
    const hashFn = (k: number | string) => Number(k) % size;
    let table: (TableSlot | null)[] = Array(size).fill(null);

    // Insert key at 22
    const r1 = insertQuadraticProbing(table, 4567, hashFn, size); // at 22
    table = r1.table;
    // Insert another key colliding at 22 -> jumps to 22 + 1^2 = 23
    const r2 = insertQuadraticProbing(table, 7597, hashFn, size); // at 23
    table = r2.table;
    expect(r2.finalIndex).toBe(23);

    // Insert 3rd key colliding at 22 -> 22+1^2=23 (occupied) -> 22+2^2=26
    const r3 = insertQuadraticProbing(table, 10627, hashFn, size); // 10627 % 101 = 22
    table = r3.table;
    expect(r3.finalIndex).toBe(26);

    const searchRes = searchQuadraticProbing(table, 10627, hashFn, size);
    expect(searchRes.found).toBe(true);
    expect(searchRes.index).toBe(26);
  });
});

describe('5. Double Hashing — Lecture Example (Slide 25-26)', () => {
  it('Accurately inserts keys 58, 14, 91 into table of size 11 at positions 3, 10, 6', () => {
    const size = 11;
    const h1 = (x: number | string) => Number(x) % 11;
    const h2 = (x: number | string) => 7 - (Number(x) % 7);
    let table: (TableSlot | null)[] = Array(size).fill(null);

    // 1. Key 58: h1(58) = 58 mod 11 = 3
    const r1 = insertDoubleHashing(table, 58, h1, h2, size);
    table = r1.table;
    expect(r1.finalIndex).toBe(3);

    // 2. Key 14: h1(14) = 3 (collision), h2(14) = 7 - (14 mod 7) = 7 -> 3+7 = 10
    const r2 = insertDoubleHashing(table, 14, h1, h2, size);
    table = r2.table;
    expect(r2.finalIndex).toBe(10);

    // 3. Key 91: h1(91) = 3, h2(91) = 7. table[3] & table[10] occupied -> 3+7+7 = 17 -> h1(17) = 17 mod 11 = 6 -> table[6]
    const r3 = insertDoubleHashing(table, 91, h1, h2, size);
    table = r3.table;
    expect(r3.finalIndex).toBe(6);

    const s1 = searchDoubleHashing(table, 91, h1, h2, size);
    expect(s1.found).toBe(true);
    expect(s1.index).toBe(6);
  });
});

describe('6. Separate Chaining & Bucket Hashing with Real Search', () => {
  it('Separate Chaining creates linked list nodes and search finds key', () => {
    const size = 10;
    const hashFn = (k: number | string) => Number(k) % size;
    let chains: ChainingSlot[] = Array.from({ length: size }, (_, i) => ({ index: i, nodes: [] }));

    const r1 = insertSeparateChaining(chains, 22, hashFn, size);
    chains = r1.chains;
    const r2 = insertSeparateChaining(chains, 52, hashFn, size);
    chains = r2.chains;

    expect(chains[2].nodes).toEqual([22, 52]);

    const sFound = searchSeparateChaining(chains, 52, hashFn, size);
    expect(sFound.found).toBe(true);
    expect(sFound.index).toBe(2);
    expect(sFound.nodeIndex).toBe(1);

    const sNotFound = searchSeparateChaining(chains, 99, hashFn, size);
    expect(sNotFound.found).toBe(false);
  });

  it('Bucket Hashing handles up to capacity, reports overflow, and searches properly', () => {
    const size = 10;
    const capacity = 2;
    const hashFn = (k: number | string) => Number(k) % size;
    let buckets: BucketSlot[] = Array.from({ length: size }, (_, i) => ({ index: i, capacity, items: [] }));

    const r1 = insertBucket(buckets, 22, hashFn, size);
    buckets = r1.buckets;
    const r2 = insertBucket(buckets, 52, hashFn, size);
    buckets = r2.buckets;
    const r3 = insertBucket(buckets, 82, hashFn, size); // overflow

    expect(r1.success).toBe(true);
    expect(r2.success).toBe(true);
    expect(r3.success).toBe(false);
    expect(buckets[2].items).toEqual([22, 52]);

    const sFound = searchBucket(buckets, 52, hashFn, size);
    expect(sFound.found).toBe(true);
    expect(sFound.index).toBe(2);
    expect(sFound.bucketSlotIndex).toBe(1);

    const sNotFound = searchBucket(buckets, 99, hashFn, size);
    expect(sNotFound.found).toBe(false);
  });
});
