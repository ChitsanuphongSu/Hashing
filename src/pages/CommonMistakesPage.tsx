import React from 'react';
import { COMMON_MISTAKES, CommonMistakeItem } from '../data/commonMistakes';
import { CheckCircle2, XCircle } from 'lucide-react';

export const CommonMistakesPage: React.FC = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Common Exam Traps & Pitfalls (จุดที่มักผิดในข้อสอบ)
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              รวบรวมข้อควรระวัง จุดหลอก และข้อผิดพลาดที่พบบ่อยในการสอบเรื่อง Hashing
            </p>
          </div>
          <span className="badge badge-amber">Exam Guard</span>
        </div>
      </div>

      {/* Traps Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {COMMON_MISTAKES.map((item: CommonMistakeItem, idx: number) => (
          <div key={item.id} className="card" style={{ borderLeft: '4px solid var(--accent-amber)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-amber">กับดักที่ {idx + 1}</span>
                <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{item.topic}</span>
              </div>
              <span className="badge badge-primary">{item.tag}</span>
            </div>

            {/* Mistake callout */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              padding: '0.65rem 0.85rem',
              backgroundColor: 'var(--accent-red-bg)',
              borderRadius: '6px',
              color: 'var(--accent-red)',
              fontSize: '0.88rem',
              marginBottom: '0.75rem'
            }}>
              <XCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>สิ่งที่มักเข้าใจผิด: </strong>{item.mistakeTh}
              </div>
            </div>

            {/* Correct explanation */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              padding: '0.65rem 0.85rem',
              backgroundColor: 'var(--primary-light)',
              borderRadius: '6px',
              color: 'var(--text-primary)',
              fontSize: '0.88rem',
              marginBottom: '0.75rem'
            }}>
              <CheckCircle2 size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>หลักการที่ถูกต้องตามบทเรียน: </strong>{item.correctExplanationTh}
              </div>
            </div>

            {/* Example snippet */}
            <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', paddingLeft: '0.5rem' }}>
              💡 ตัวอย่างประกอบ: {item.exampleTh}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
