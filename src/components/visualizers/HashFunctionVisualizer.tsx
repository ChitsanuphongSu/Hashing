import React, { useState } from 'react';
import {
  hashByDigitSelection,
  hashByDigitAdditionIndividual,
  hashByGroupedDigitAddition,
  hashByModulo
} from '../../algorithms/hashFunctions';
import { convertTextToNumber } from '../../algorithms/textConversion';
import { ArrowRight, Hash, Sparkles, Check, RefreshCw } from 'lucide-react';

export const HashFunctionVisualizer: React.FC = () => {
  const [method, setMethod] = useState<'digit_selection' | 'digit_addition' | 'grouped_addition' | 'modulo' | 'text_horner'>('digit_selection');
  const [inputKey, setInputKey] = useState<string>('001364825');
  const [digitPositions, setDigitPositions] = useState<number[]>([4, 9]);
  const [tableSize, setTableSize] = useState<number>(101);
  const [groupSize, setGroupSize] = useState<number>(3);

  // Calculate based on selected method
  const renderCalculation = () => {
    if (method === 'digit_selection') {
      const res = hashByDigitSelection(inputKey, digitPositions);
      const digits = inputKey.split('');

      return (
        <div>
          {/* Interactive Digit Picker */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
              คลิกเลือกหลักที่ต้องการใช้ (ปัจจุบันเลือกหลักที่: {digitPositions.join(', ')})
            </label>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {digits.map((d, idx) => {
                const pos = idx + 1;
                const isSelected = digitPositions.includes(pos);
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (isSelected) {
                        setDigitPositions(digitPositions.filter(p => p !== pos));
                      } else {
                        setDigitPositions([...digitPositions, pos].sort((a, b) => a - b));
                      }
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                      backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-surface)',
                      color: isSelected ? 'var(--primary)' : 'var(--text-primary)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>หลัก {pos}</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{d}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="formula-block">
            <span>h({inputKey}) = </span>
            <span style={{ color: 'var(--text-primary)' }}>{res.hashValue}</span>
            <span>→ table[{res.hashValue}]</span>
          </div>

          <div style={{ background: 'var(--bg-elevated)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, marginBottom: '0.4rem' }}>ขั้นตอนการคำนวณตามบทเรียน:</div>
            {res.steps.map((step, idx) => (
              <div key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                • {step}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (method === 'digit_addition') {
      const res = hashByDigitAdditionIndividual(inputKey);
      return (
        <div>
          <div className="formula-block">
            <span>{inputKey.split('').join(' + ')} = {res.hashValue} → table[{res.hashValue}]</span>
          </div>
          <div style={{ background: 'var(--bg-elevated)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, marginBottom: '0.4rem' }}>ขั้นตอนการคำนวณตามบทเรียน:</div>
            {res.steps.map((step, idx) => (
              <div key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                • {step}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (method === 'grouped_addition') {
      const res = hashByGroupedDigitAddition(inputKey, groupSize);
      return (
        <div>
          <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ขนาดแต่ละกลุ่ม:</label>
            <select
              value={groupSize}
              onChange={(e) => setGroupSize(Number(e.target.value))}
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <option value={2}>กลุ่มละ 2 หลัก</option>
              <option value={3}>กลุ่มละ 3 หลัก (ตามตัวอย่างบทเรียน)</option>
              <option value={4}>กลุ่มละ 4 หลัก</option>
            </select>
          </div>

          <div className="formula-block">
            <span>ผลรวมกลุ่ม = {res.hashValue} → table[{res.hashValue}]</span>
          </div>

          <div style={{ background: 'var(--bg-elevated)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, marginBottom: '0.4rem' }}>ขั้นตอนการคำนวณตามบทเรียน:</div>
            {res.steps.map((step, idx) => (
              <div key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                • {step}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (method === 'modulo') {
      const res = hashByModulo(inputKey, tableSize);
      return (
        <div>
          <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>tableSize:</label>
            <input
              type="number"
              value={tableSize}
              onChange={(e) => setTableSize(Math.max(2, Number(e.target.value) || 101))}
              style={{
                width: '90px',
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)'
              }}
            />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              (ช่วงผลลัพธ์: 0 ถึง {tableSize - 1})
            </span>
          </div>

          <div className="formula-block">
            <span>h({inputKey}) = {inputKey} mod {tableSize} = {res.hashValue} → table[{res.hashValue}]</span>
          </div>

          <div style={{ background: 'var(--bg-elevated)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, marginBottom: '0.4rem' }}>ขั้นตอนการคำนวณตามบทเรียน:</div>
            {res.steps.map((step, idx) => (
              <div key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                • {step}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (method === 'text_horner') {
      const res = convertTextToNumber(inputKey);
      return (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: 'var(--bg-elevated)', padding: '0.85rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>1. รหัส ASCII:</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                {res.asciiValues.map(a => `${a.char}=${a.ascii}`).join(', ')}
              </div>
            </div>

            <div style={{ background: 'var(--bg-elevated)', padding: '0.85rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>2. A-Z (1..26):</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--primary)' }}>
                {res.azValues.map(a => `${a.char}=${a.az}`).join(', ')}
              </div>
            </div>

            <div style={{ background: 'var(--bg-elevated)', padding: '0.85rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>3. ฐานสอง 5 บิต (2⁵=32):</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--accent-blue)' }}>
                {res.binary5Bit.map(b => `${b.char}:${b.binary}`).join(' ')}
              </div>
            </div>
          </div>

          <div className="formula-block">
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Horner's Rule (พหุนามฐาน 32):</div>
              {res.hornerCalculation.powers.map(p => `(${p.val} × 32^${p.power})`).join(' + ')} = {res.hornerCalculation.total.toLocaleString()}
            </div>
          </div>

          <div style={{ background: 'var(--bg-elevated)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, marginBottom: '0.4rem' }}>คำนวณแต่ละพจน์:</div>
            {res.hornerCalculation.powers.map((p, idx) => (
              <div key={idx} style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                • ตัวอักษร '{p.char}' ({p.val}) × 32^{p.power} = {p.term.toLocaleString()}
              </div>
            ))}
            <div style={{ marginTop: '0.5rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
              ผลรวมฐานสิบ = {res.hornerCalculation.total.toLocaleString()}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} color="var(--primary)" />
          <span>Interactive Hash Function Calculator</span>
        </h3>
        <span className="badge badge-primary">Dynamic Algorithm Engine</span>
      </div>

      {/* Method Selector Tabs */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <button
          className={method === 'digit_selection' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => { setMethod('digit_selection'); setInputKey('001364825'); }}
          style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem' }}
        >
          (1) การเลือกหลัก
        </button>
        <button
          className={method === 'digit_addition' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => { setMethod('digit_addition'); setInputKey('001364825'); }}
          style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem' }}
        >
          (2) การบวกทุกหลัก
        </button>
        <button
          className={method === 'grouped_addition' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => { setMethod('grouped_addition'); setInputKey('001364825'); }}
          style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem' }}
        >
          (2.2) การบวกจัดกลุ่ม
        </button>
        <button
          className={method === 'modulo' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => { setMethod('modulo'); setInputKey('001364825'); }}
          style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem' }}
        >
          (3) การหารเอาเศษ (Modulo)
        </button>
        <button
          className={method === 'text_horner' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => { setMethod('text_horner'); setInputKey('NOTE'); }}
          style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem' }}
        >
          Text → Horner's Rule
        </button>
      </div>

      {/* Input Area */}
      <div style={{ marginBottom: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>
            {method === 'text_horner' ? 'ข้อความภาษาอังกฤษ (เช่น NOTE):' : 'คีย์ตัวเลข (Key):'}
          </label>
          <input
            type="text"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.85rem',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem'
            }}
          />
        </div>

        {/* Quick Lecture Preset Buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', alignSelf: 'flex-end' }}>
          <button
            className="btn btn-secondary"
            onClick={() => setInputKey(method === 'text_horner' ? 'NOTE' : '001364825')}
            style={{ fontSize: '0.8rem', padding: '0.55rem 0.75rem' }}
            title="โหลดตัวอย่างจากสไลด์"
          >
            <RefreshCw size={14} /> โหลดตัวอย่างในสไลด์
          </button>
        </div>
      </div>

      {/* Result Display */}
      {renderCalculation()}
    </div>
  );
};
