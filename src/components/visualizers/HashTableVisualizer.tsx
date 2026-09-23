import React, { useState, useEffect, useRef } from 'react';
import { TableSlot, TraceStep, ChainingSlot, BucketSlot } from '../../algorithms/types';
import {
  hashByDigitSelection,
  hashByDigitAdditionIndividual,
  hashByGroupedDigitAddition,
  hashByModulo
} from '../../algorithms/hashFunctions';
import { insertLinearProbing, searchLinearProbing } from '../../algorithms/linearProbing';
import { insertQuadraticProbing, searchQuadraticProbing } from '../../algorithms/quadraticProbing';
import { insertDoubleHashing, searchDoubleHashing } from '../../algorithms/doubleHashing';
import {
  insertSeparateChaining,
  searchSeparateChaining,
  insertBucket,
  searchBucket
} from '../../algorithms/separateChaining';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Search,
  Plus,
  CheckCircle2,
  Flame,
  Settings
} from 'lucide-react';

export const HashTableVisualizer: React.FC = () => {
  const [tableSize, setTableSize] = useState<number>(11);
  const [hashMethod, setHashMethod] = useState<'modulo' | 'digit_selection' | 'digit_addition' | 'grouped_addition'>('modulo');
  const [collisionMethod, setCollisionMethod] = useState<'linear_probing' | 'quadratic_probing' | 'double_hashing' | 'separate_chaining' | 'bucket'>('linear_probing');
  const [inputKey, setInputKey] = useState<string>('58');
  
  // Table States
  const [openTable, setOpenTable] = useState<(TableSlot | null)[]>(Array(11).fill(null));
  const [chains, setChains] = useState<ChainingSlot[]>(Array.from({ length: 11 }, (_, i) => ({ index: i, nodes: [] })));
  const [buckets, setBuckets] = useState<BucketSlot[]>(Array.from({ length: 11 }, (_, i) => ({ index: i, capacity: 2, items: [] })));
  
  // Traces & Interactive Step Controller
  const [traceLogs, setTraceLogs] = useState<TraceStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('พร้อมสำหรับการทดลอง Insert / Search');

  const timerRef = useRef<any>(null);

  // Real Selected Hash Function
  const calculateHash = (k: number | string): number => {
    if (hashMethod === 'digit_selection') {
      const res = hashByDigitSelection(k, [4, 9]);
      return res.hashValue % tableSize;
    } else if (hashMethod === 'digit_addition') {
      const res = hashByDigitAdditionIndividual(k);
      return res.hashValue % tableSize;
    } else if (hashMethod === 'grouped_addition') {
      const res = hashByGroupedDigitAddition(k, 3);
      return res.hashValue % tableSize;
    } else {
      const res = hashByModulo(k, tableSize);
      return res.hashValue;
    }
  };

  const h2Fn = (k: number | string) => {
    const num = typeof k === 'number' ? k : parseInt(String(k), 10) || 0;
    // Lecture standard h2: 7 - (k mod 7)
    return 7 - (num % 7);
  };

  const handleReset = () => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setOpenTable(Array(tableSize).fill(null));
    setChains(Array.from({ length: tableSize }, (_, i) => ({ index: i, nodes: [] })));
    setBuckets(Array.from({ length: tableSize }, (_, i) => ({ index: i, capacity: 2, items: [] })));
    setTraceLogs([]);
    setCurrentStepIndex(-1);
    setStatusMessage('รีเซ็ตตารางเรียบร้อยแล้ว');
  };

  const handleTableSizeChange = (newSize: number) => {
    const size = Math.max(3, Math.min(101, newSize));
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTableSize(size);
    setOpenTable(Array(size).fill(null));
    setChains(Array.from({ length: size }, (_, i) => ({ index: i, nodes: [] })));
    setBuckets(Array.from({ length: size }, (_, i) => ({ index: i, capacity: 2, items: [] })));
    setTraceLogs([]);
    setCurrentStepIndex(-1);
  };

  const handleInsert = () => {
    if (!inputKey.trim()) return;
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);

    const key = isNaN(Number(inputKey)) ? inputKey : Number(inputKey);

    if (collisionMethod === 'linear_probing') {
      const res = insertLinearProbing(openTable, key, calculateHash, tableSize);
      setOpenTable(res.table);
      setTraceLogs(res.traces);
      setCurrentStepIndex(res.traces.length - 1);
      setStatusMessage(res.success ? `เพิ่มคีย์ ${key} สำเร็จที่ index ${res.finalIndex}` : `ตารางเต็ม ไม่สามารถเพิ่มคีย์ ${key} ได้`);
    } else if (collisionMethod === 'quadratic_probing') {
      const res = insertQuadraticProbing(openTable, key, calculateHash, tableSize);
      setOpenTable(res.table);
      setTraceLogs(res.traces);
      setCurrentStepIndex(res.traces.length - 1);
      setStatusMessage(res.success ? `เพิ่มคีย์ ${key} ด้วย Quadratic Probing สำเร็จที่ index ${res.finalIndex}` : `ไม่สามารถเพิ่มคีย์ ${key} ได้ (ลูปเต็มรอบ)`);
    } else if (collisionMethod === 'double_hashing') {
      const res = insertDoubleHashing(openTable, key, calculateHash, h2Fn, tableSize);
      setOpenTable(res.table);
      setTraceLogs(res.traces);
      setCurrentStepIndex(res.traces.length - 1);
      setStatusMessage(res.success ? `เพิ่มคีย์ ${key} ด้วย Double Hashing สำเร็จที่ index ${res.finalIndex}` : `ตารางเต็ม ไม่สามารถเพิ่ม ${key} ได้`);
    } else if (collisionMethod === 'separate_chaining') {
      const res = insertSeparateChaining(chains, key, calculateHash, tableSize);
      setChains(res.chains);
      setTraceLogs(res.traces);
      setCurrentStepIndex(res.traces.length - 1);
      setStatusMessage(`เพิ่มคีย์ ${key} ลงใน Linked List ที่ table[${res.finalIndex}] สำเร็จ`);
    } else if (collisionMethod === 'bucket') {
      const res = insertBucket(buckets, key, calculateHash, tableSize);
      setBuckets(res.buckets);
      setTraceLogs(res.traces);
      setCurrentStepIndex(res.traces.length - 1);
      setStatusMessage(res.success ? `เพิ่ม ${key} ลงใน Bucket table[${res.finalIndex}] สำเร็จ` : `Bucket table[${res.finalIndex}] เต็มความจุ!`);
    }
  };

  const handleSearch = () => {
    if (!inputKey.trim()) return;
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);

    const key = isNaN(Number(inputKey)) ? inputKey : Number(inputKey);

    if (collisionMethod === 'linear_probing') {
      const res = searchLinearProbing(openTable, key, calculateHash, tableSize);
      setTraceLogs(res.traces);
      setCurrentStepIndex(res.traces.length - 1);
      setStatusMessage(res.found ? `พบคีย์ ${key} ที่ table[${res.index}]` : `ไม่พบคีย์ ${key} ในตาราง`);
    } else if (collisionMethod === 'quadratic_probing') {
      const res = searchQuadraticProbing(openTable, key, calculateHash, tableSize);
      setTraceLogs(res.traces);
      setCurrentStepIndex(res.traces.length - 1);
      setStatusMessage(res.found ? `พบคีย์ ${key} ที่ table[${res.index}]` : `ไม่พบคีย์ ${key} ในตาราง`);
    } else if (collisionMethod === 'double_hashing') {
      const res = searchDoubleHashing(openTable, key, calculateHash, h2Fn, tableSize);
      setTraceLogs(res.traces);
      setCurrentStepIndex(res.traces.length - 1);
      setStatusMessage(res.found ? `พบคีย์ ${key} ที่ table[${res.index}]` : `ไม่พบคีย์ ${key} ในตาราง`);
    } else if (collisionMethod === 'separate_chaining') {
      const res = searchSeparateChaining(chains, key, calculateHash, tableSize);
      setTraceLogs(res.traces);
      setCurrentStepIndex(res.traces.length - 1);
      setStatusMessage(res.found ? `พบคีย์ ${key} ที่ Linked List ใน table[${res.index}] โหนดที่ ${res.nodeIndex + 1}` : `ไม่พบคีย์ ${key} ใน Linked List`);
    } else if (collisionMethod === 'bucket') {
      const res = searchBucket(buckets, key, calculateHash, tableSize);
      setTraceLogs(res.traces);
      setCurrentStepIndex(res.traces.length - 1);
      setStatusMessage(res.found ? `พบคีย์ ${key} ที่ Bucket ใน table[${res.index}] ช่องย่อยที่ ${res.bucketSlotIndex + 1}` : `ไม่พบคีย์ ${key} ใน Bucket`);
    }
  };

  // Step-by-Step Auto Run Timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < traceLogs.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return prev;
          }
        });
      }, 900);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, traceLogs.length]);

  const activeHighlightIndex = currentStepIndex >= 0 && currentStepIndex < traceLogs.length
    ? traceLogs[currentStepIndex].currentIndex
    : null;

  // Load Lecture Preset (58, 14, 91 for Double Hashing)
  const loadLectureDoubleHashPreset = () => {
    setTableSize(11);
    setHashMethod('modulo');
    setCollisionMethod('double_hashing');
    let t: (TableSlot | null)[] = Array(11).fill(null);
    const allTraces: TraceStep[] = [];

    const r1 = insertDoubleHashing(t, 58, (x) => Number(x) % 11, (x) => 7 - (Number(x) % 7), 11);
    t = r1.table;
    allTraces.push(...r1.traces);

    const r2 = insertDoubleHashing(t, 14, (x) => Number(x) % 11, (x) => 7 - (Number(x) % 7), 11);
    t = r2.table;
    allTraces.push(...r2.traces);

    const r3 = insertDoubleHashing(t, 91, (x) => Number(x) % 11, (x) => 7 - (Number(x) % 7), 11);
    t = r3.table;
    allTraces.push(...r3.traces);

    setOpenTable(t);
    setTraceLogs(allTraces);
    setCurrentStepIndex(allTraces.length - 1);
    setStatusMessage('โหลดตัวอย่างบรรยายสไลด์ 25-26: คีย์ 58 → index 3, 14 → index 10, 91 → index 6');
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Interactive Hash Table & Collision Solver
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            ขับเคลื่อนด้วยอัลกอริทึมจริง พร้อมระบบสเต็ปคอนโทรลเลอร์ (Step-by-Step Controller)
          </p>
        </div>

        <button
          className="btn btn-secondary"
          onClick={loadLectureDoubleHashPreset}
          style={{ fontSize: '0.82rem' }}
        >
          <Flame size={15} color="var(--accent-amber)" /> โหลดตัวอย่างสไลด์ (58, 14, 91)
        </button>
      </div>

      {/* Control Panel */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: 'var(--bg-elevated)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1.25rem'
      }}>
        {/* Hash Function Selector */}
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
            แฮชฟังก์ชัน (Hash Function):
          </label>
          <select
            value={hashMethod}
            onChange={(e) => setHashMethod(e.target.value as any)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              fontSize: '0.88rem',
              fontWeight: 500
            }}
          >
            <option value="modulo">3. Modulo (x mod tableSize)</option>
            <option value="digit_selection">1. Digit Selection (หลัก 4 และ 9)</option>
            <option value="digit_addition">2. Digit Addition (บวกทุกหลัก)</option>
            <option value="grouped_addition">2.2 Grouped Addition (กลุ่ม 3 หลัก)</option>
          </select>
        </div>

        {/* Collision Resolution Selector */}
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
            วิธีแก้ปัญหาการชน (Collision Resolution):
          </label>
          <select
            value={collisionMethod}
            onChange={(e) => setCollisionMethod(e.target.value as any)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              fontSize: '0.88rem',
              fontWeight: 500
            }}
          >
            <option value="linear_probing">1. Linear Probing (แบบลำดับ +1, +2)</option>
            <option value="quadratic_probing">2. Quadratic Probing (แบบกำลังสอง +1², +2²)</option>
            <option value="double_hashing">3. Double Hashing (h1 + h2)</option>
            <option value="separate_chaining">4. Separate Chaining (Linked List)</option>
            <option value="bucket">5. Bucket (Array of Buckets)</option>
          </select>
        </div>

        {/* Table Size Input */}
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
            ขนาดตาราง (tableSize):
          </label>
          <input
            type="number"
            value={tableSize}
            onChange={(e) => handleTableSizeChange(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)'
            }}
          />
        </div>

        {/* Key and Actions */}
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
            คีย์ที่ต้องการทดสอบ (Key):
          </label>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="เช่น 58, 4567"
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)'
              }}
            />
            <button className="btn btn-primary" onClick={handleInsert} title="Insert Key" style={{ padding: '0.5rem 0.8rem' }}>
              <Plus size={16} />
            </button>
            <button className="btn btn-secondary" onClick={handleSearch} title="Search Key" style={{ padding: '0.5rem 0.8rem' }}>
              <Search size={16} />
            </button>
            <button className="btn btn-secondary" onClick={handleReset} title="Reset" style={{ padding: '0.5rem 0.8rem' }}>
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Status banner */}
      <div style={{
        padding: '0.65rem 1rem',
        borderRadius: '8px',
        backgroundColor: 'var(--primary-light)',
        border: '1px solid var(--primary-border)',
        color: 'var(--primary)',
        fontSize: '0.875rem',
        fontWeight: 600,
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <CheckCircle2 size={16} />
        <span>{statusMessage}</span>
      </div>

      {/* VISUAL HASH TABLE SLOTS */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.65rem' }}>
          สถานะช่องใน Hash Table (0 ถึง {tableSize - 1}):
        </div>

        {/* Linear / Quadratic / Double Hashing View */}
        {(collisionMethod === 'linear_probing' || collisionMethod === 'quadratic_probing' || collisionMethod === 'double_hashing') && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(80px, 1fr))`,
            gap: '0.5rem',
            maxHeight: '340px',
            overflowY: 'auto',
            padding: '4px'
          }}>
            {openTable.map((slot, index) => {
              const isHighlighted = activeHighlightIndex === index;
              return (
                <div
                  key={index}
                  style={{
                    border: isHighlighted ? '2px solid var(--primary)' : '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '0.5rem 0.35rem',
                    textAlign: 'center',
                    backgroundColor: isHighlighted ? 'var(--primary-light)' : slot ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                    boxShadow: isHighlighted ? 'var(--shadow-md)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    [{index}]
                  </div>
                  <div style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: slot ? 'var(--primary)' : 'var(--text-muted)',
                    minHeight: '26px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {slot ? slot.key : '-'}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: slot ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                    {slot ? `P: ${slot.probeCount || 0}` : 'empty'}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Separate Chaining View */}
        {collisionMethod === 'separate_chaining' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '350px', overflowY: 'auto' }}>
            {chains.map((chain) => (
              <div
                key={chain.index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '6px',
                  backgroundColor: activeHighlightIndex === chain.index ? 'var(--primary-light)' : 'var(--bg-elevated)',
                  border: '1px solid var(--border)'
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, minWidth: '75px', fontSize: '0.85rem' }}>
                  table[{chain.index}]:
                </span>
                {chain.nodes.length === 0 ? (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>null (empty)</span>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {chain.nodes.map((nodeKey, nIdx) => (
                      <React.Fragment key={nIdx}>
                        <span style={{
                          padding: '0.2rem 0.6rem',
                          backgroundColor: 'var(--primary)',
                          color: '#FFF',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600
                        }}>
                          {nodeKey}
                        </span>
                        {nIdx < chain.nodes.length - 1 && <span style={{ color: 'var(--text-muted)' }}>→</span>}
                      </React.Fragment>
                    ))}
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>→ null</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Bucket View */}
        {collisionMethod === 'bucket' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.75rem', maxHeight: '350px', overflowY: 'auto' }}>
            {buckets.map((bucket) => (
              <div
                key={bucket.index}
                style={{
                  padding: '0.6rem',
                  borderRadius: '8px',
                  border: activeHighlightIndex === bucket.index ? '2px solid var(--primary)' : '1px solid var(--border)',
                  backgroundColor: 'var(--bg-surface)'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 600, fontFamily: 'var(--font-mono)', marginBottom: '0.35rem' }}>
                  table[{bucket.index}] Bucket:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {Array.from({ length: bucket.capacity }).map((_, cIdx) => {
                    const item = bucket.items[cIdx];
                    return (
                      <div
                        key={cIdx}
                        style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          backgroundColor: item !== undefined ? 'var(--primary-light)' : 'var(--bg-elevated)',
                          color: item !== undefined ? 'var(--primary)' : 'var(--text-muted)',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-mono)',
                          textAlign: 'center'
                        }}
                      >
                        {item !== undefined ? item : '(ว่าง)'}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* P1: STEP-BY-STEP INTERACTIVE TRACE CONTROLLER */}
      {traceLogs.length > 0 && (
        <div style={{
          marginTop: '1.25rem',
          padding: '1rem',
          backgroundColor: 'var(--bg-elevated)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="badge badge-primary">Step {currentStepIndex + 1} / {traceLogs.length}</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                Interactive Step-by-Step Trace Controller
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button
                className="btn btn-secondary"
                disabled={currentStepIndex <= 0}
                onClick={() => setCurrentStepIndex((p) => Math.max(0, p - 1))}
                style={{ padding: '0.4rem 0.65rem', fontSize: '0.8rem' }}
                title="Previous Step"
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <button
                className="btn btn-primary"
                onClick={() => setIsPlaying(!isPlaying)}
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
              >
                {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                <span>{isPlaying ? 'Pause' : 'Auto Run'}</span>
              </button>

              <button
                className="btn btn-secondary"
                disabled={currentStepIndex >= traceLogs.length - 1}
                onClick={() => setCurrentStepIndex((p) => Math.min(traceLogs.length - 1, p + 1))}
                style={{ padding: '0.4rem 0.65rem', fontSize: '0.8rem' }}
                title="Next Step"
              >
                Next <ChevronRight size={16} />
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setCurrentStepIndex(0)}
                style={{ padding: '0.4rem 0.65rem', fontSize: '0.8rem' }}
                title="Reset to Step 1"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Active Step Details Box */}
          {currentStepIndex >= 0 && currentStepIndex < traceLogs.length && (
            <div style={{
              padding: '0.85rem',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: '8px',
              borderLeft: '4px solid var(--primary)',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span className="badge badge-primary">Step {traceLogs[currentStepIndex].stepNumber}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.85rem' }}>
                  Target: table[{traceLogs[currentStepIndex].currentIndex}]
                </span>
                <span className={traceLogs[currentStepIndex].status === 'collision' ? 'badge badge-red' : traceLogs[currentStepIndex].status === 'inserted' || traceLogs[currentStepIndex].status === 'found' ? 'badge badge-primary' : 'badge badge-amber'}>
                  {traceLogs[currentStepIndex].action}
                </span>
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                {traceLogs[currentStepIndex].message}
              </div>
            </div>
          )}

          {/* Full Trace Log Table */}
          <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: 'var(--bg-surface)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-elevated)', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Step</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Key</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Original Hash</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Tested Index</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Action</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>รายละเอียดคำอธิบาย</th>
                </tr>
              </thead>
              <tbody>
                {traceLogs.map((trace, idx) => {
                  const isCurrent = idx === currentStepIndex;
                  return (
                    <tr
                      key={trace.stepNumber}
                      onClick={() => setCurrentStepIndex(idx)}
                      style={{
                        borderBottom: '1px solid var(--border)',
                        backgroundColor: isCurrent ? 'var(--primary-light)' : 'transparent',
                        cursor: 'pointer'
                      }}
                    >
                      <td style={{ padding: '0.45rem 0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                        {trace.stepNumber}
                      </td>
                      <td style={{ padding: '0.45rem 0.75rem', fontFamily: 'var(--font-mono)' }}>
                        {trace.key}
                      </td>
                      <td style={{ padding: '0.45rem 0.75rem', fontFamily: 'var(--font-mono)' }}>
                        {trace.originalHash}
                      </td>
                      <td style={{ padding: '0.45rem 0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--primary)' }}>
                        table[{trace.currentIndex}]
                      </td>
                      <td style={{ padding: '0.45rem 0.75rem' }}>
                        <span className={trace.status === 'collision' ? 'badge badge-red' : trace.status === 'inserted' || trace.status === 'found' ? 'badge badge-primary' : 'badge badge-amber'}>
                          {trace.action}
                        </span>
                      </td>
                      <td style={{ padding: '0.45rem 0.75rem', color: 'var(--text-secondary)' }}>
                        {trace.message}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
