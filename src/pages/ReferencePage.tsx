import React, { useState } from 'react';
import { COLLISION_COMPARISON_DATA, HASH_FUNCTION_COMPARISON_DATA, MethodComparisonRow, HashFunctionComparisonRow } from '../data/comparisonData';
import { EXAMPLES_LIBRARY, LectureExampleItem } from '../data/examplesLibrary';
import {
  FileText,
  Table,
  BookOpen,
  Layers
} from 'lucide-react';

export const ReferencePage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'cheat_sheet' | 'collision_comp' | 'hash_comp' | 'examples'>('cheat_sheet');

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Formula Cheat Sheet & Comparison Library
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              สรุปสูตร ตารางเปรียบเทียบ และคลังตัวอย่างข้อสอบจากเอกสารบรรยายบทที่ 10
            </p>
          </div>
          <span className="badge badge-primary">Lecture Reference System</span>
        </div>
      </div>

      {/* Sub Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          className={activeSubTab === 'cheat_sheet' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => setActiveSubTab('cheat_sheet')}
          style={{ fontSize: '0.85rem' }}
        >
          <FileText size={15} /> สรุปสูตรคำนวณ (Formula Cheat Sheet)
        </button>
        <button
          className={activeSubTab === 'collision_comp' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => setActiveSubTab('collision_comp')}
          style={{ fontSize: '0.85rem' }}
        >
          <Table size={15} /> เปรียบเทียบวิธีแก้ Collision
        </button>
        <button
          className={activeSubTab === 'hash_comp' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => setActiveSubTab('hash_comp')}
          style={{ fontSize: '0.85rem' }}
        >
          <Layers size={15} /> เปรียบเทียบ Hash Functions
        </button>
        <button
          className={activeSubTab === 'examples' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => setActiveSubTab('examples')}
          style={{ fontSize: '0.85rem' }}
        >
          <BookOpen size={15} /> คลังตัวอย่างบทเรียน (Examples Library)
        </button>
      </div>

      {/* 1. CHEAT SHEET */}
      {activeSubTab === 'cheat_sheet' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
              1. Modulo Hash Function
            </h3>
            <div className="formula-block">
              h(x) = x mod tableSize
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              • ช่วงแอดเดรสที่ได้: 0 ถึง tableSize - 1<br />
              • ตัวอย่าง: 4567 mod 101 = 22, 7597 mod 101 = 22 (ชนกันที่ table[22])
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
              2. Linear Probing & Quadratic Probing
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>Linear Probing:</div>
                <div className="formula-block" style={{ fontSize: '0.95rem' }}>
                  table[h(x) + 1], table[h(x) + 2], ...
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>Quadratic Probing:</div>
                <div className="formula-block" style={{ fontSize: '0.95rem' }}>
                  table[h(x) + 1²], table[h(x) + 2²], ...
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
              3. Double Hashing (แฮช 2 ครั้ง)
            </h3>
            <div className="formula-block">
              h1(x) = x mod tableSize &nbsp;|&nbsp; h2(x) = step size (โดย h2(x) ≠ 0 และ h1 ≠ h2)
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              • ตัวอย่างสไลด์: h1(x) = x mod 11, h2(x) = 7 - (x mod 7)<br />
              • กฎการหมุนเมื่อเกินขนาดตาราง: หากบวกแล้วเกินขนาดตาราง ให้ใช้ h1 คำนวณซ้ำ: h1(sum) = sum mod tableSize
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
              4. Text Conversion & Horner's Rule (พหุนามฐาน 32)
            </h3>
            <div className="formula-block">
              (c₀ × 32ⁿ⁻¹) + (c₁ × 32ⁿ⁻²) + ... + (cₙ₋₁ × 32⁰)
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              • A-Z (1..26) ใช้เลขฐานสอง 5 บิต เพราะ 2⁵ = 32<br />
              • "NOTE" (N=14, O=15, T=20, E=5) = (14 × 32³) + (15 × 32²) + (20 × 32¹) + (5 × 32⁰) = 474,757
            </p>
          </div>
        </div>
      )}

      {/* 2. COLLISION COMPARISON */}
      {activeSubTab === 'collision_comp' && (
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
            ตารางเปรียบเทียบวิธีการแก้ปัญหาการชนกันของแฮชคีย์ (Collision Resolution Methods)
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                  <th style={{ padding: '0.65rem 0.75rem' }}>วิธี (Method)</th>
                  <th style={{ padding: '0.65rem 0.75rem' }}>กลุ่มแนวคิด</th>
                  <th style={{ padding: '0.65rem 0.75rem' }}>แนวคิดหลัก</th>
                  <th style={{ padding: '0.65rem 0.75rem' }}>กฎการขยับ / ลิงก์</th>
                  <th style={{ padding: '0.65rem 0.75rem' }}>ตัวอย่างจากบทเรียน</th>
                </tr>
              </thead>
              <tbody>
                {COLLISION_COMPARISON_DATA.map((row: MethodComparisonRow, idx: number) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.65rem 0.75rem', fontWeight: 700, color: 'var(--primary)' }}>{row.method}</td>
                    <td style={{ padding: '0.65rem 0.75rem' }}>
                      <span className={row.category.includes('Open') ? 'badge badge-amber' : 'badge badge-primary'}>
                        {row.category}
                      </span>
                    </td>
                    <td style={{ padding: '0.65rem 0.75rem', color: 'var(--text-secondary)' }}>{row.coreIdea}</td>
                    <td style={{ padding: '0.65rem 0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{row.probeRule}</td>
                    <td style={{ padding: '0.65rem 0.75rem', color: 'var(--text-secondary)' }}>{row.lectureExample}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. HASH FUNCTIONS COMPARISON */}
      {activeSubTab === 'hash_comp' && (
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
            ตารางเปรียบเทียบวิธีการสร้างแฮชฟังก์ชัน (Hash Function Construction)
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                  <th style={{ padding: '0.65rem 0.75rem' }}>วิธี (Method)</th>
                  <th style={{ padding: '0.65rem 0.75rem' }}>รูปแบบสูตร / กฎ</th>
                  <th style={{ padding: '0.65rem 0.75rem' }}>ตัวอย่างบรรยาย</th>
                  <th style={{ padding: '0.65rem 0.75rem' }}>ช่วงผลลัพธ์ที่เป็นไปได้</th>
                  <th style={{ padding: '0.65rem 0.75rem' }}>ข้อควรระวังสำคัญ</th>
                </tr>
              </thead>
              <tbody>
                {HASH_FUNCTION_COMPARISON_DATA.map((row: HashFunctionComparisonRow, idx: number) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.65rem 0.75rem', fontWeight: 700, color: 'var(--primary)' }}>{row.method}</td>
                    <td style={{ padding: '0.65rem 0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{row.formulaOrRule}</td>
                    <td style={{ padding: '0.65rem 0.75rem', color: 'var(--text-secondary)' }}>{row.lectureExample}</td>
                    <td style={{ padding: '0.65rem 0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{row.resultRange}</td>
                    <td style={{ padding: '0.65rem 0.75rem', color: 'var(--text-secondary)' }}>{row.importantNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. EXAMPLES LIBRARY */}
      {activeSubTab === 'examples' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
          {EXAMPLES_LIBRARY.map((ex: LectureExampleItem) => (
            <div key={ex.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="badge badge-primary">{ex.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>สไลด์หน้า {ex.slide}</span>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  {ex.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  {ex.descriptionTh}
                </p>
                <div style={{ backgroundColor: 'var(--bg-elevated)', padding: '0.65rem', borderRadius: '6px', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.2rem' }}>ขั้นตอนคำนวณ:</div>
                  {ex.calculationSteps.map((step: string, sIdx: number) => (
                    <div key={sIdx} style={{ color: 'var(--text-secondary)' }}>• {step}</div>
                  ))}
                </div>
              </div>
              <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--primary)' }}>
                ผลลัพธ์: {ex.expectedOutput}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
