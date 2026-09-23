import React, { useState } from 'react';
import { PRACTICE_EXERCISES, PracticeExercise } from '../data/practiceExercises';
import { recordPracticeAttempt } from '../utils/storage';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PracticePage: React.FC = () => {
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(PRACTICE_EXERCISES[0].id);
  const [userInitialIndex, setUserInitialIndex] = useState<string>('');
  const [userFinalIndex, setUserFinalIndex] = useState<string>('');
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const currentExercise = PRACTICE_EXERCISES.find((e: PracticeExercise) => e.id === selectedExerciseId) || PRACTICE_EXERCISES[0];

  const handleSelectExercise = (id: string) => {
    setSelectedExerciseId(id);
    setUserInitialIndex('');
    setUserFinalIndex('');
    setHasSubmitted(false);
    setIsCorrect(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = currentExercise.correctAnswer;
    
    const correctFinal = Number(userFinalIndex) === correct.finalIndex;
    const correctInitial = currentExercise.type === 'text_horner' || currentExercise.type === 'hash_calc'
      ? true
      : Number(userInitialIndex) === correct.initialIndex;

    const passed = correctFinal && correctInitial;
    setIsCorrect(passed);
    setHasSubmitted(true);

    recordPracticeAttempt(currentExercise.id, passed, passed ? 100 : 0);

    if (passed) {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      } catch (e) {}
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Trace & Probing Practice Solver
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              ฝึกฝนการไล่สเต็ป (Trace) การคำนวณแฮชและการแก้ปัญหาการชนกันจริง
            </p>
          </div>
          <span className="badge badge-primary">Interactive Trace Solver</span>
        </div>
      </div>

      {/* Exercise Selectors */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {PRACTICE_EXERCISES.map((ex: PracticeExercise, idx: number) => (
          <button
            key={ex.id}
            className={ex.id === selectedExerciseId ? 'btn btn-primary' : 'btn btn-secondary'}
            onClick={() => handleSelectExercise(ex.id)}
            style={{ fontSize: '0.82rem', whiteSpace: 'nowrap', padding: '0.5rem 0.85rem' }}
          >
            ข้อ {idx + 1}: {ex.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Exercise Card */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>
            {currentExercise.title}
          </h3>
          <span className="badge badge-primary">ขนาดตาราง = {currentExercise.tableSize}</span>
        </div>

        <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
          {currentExercise.descriptionTh}
        </p>

        {/* Existing Table View if provided */}
        {currentExercise.initialTable && (
          <div style={{ marginBottom: '1.25rem', padding: '0.85rem', backgroundColor: 'var(--bg-elevated)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              ข้อมูลเดิมที่มีอยู่ในตารางก่อนการแทรก:
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {Array.from({ length: currentExercise.tableSize }).map((_, idx) => {
                const key = currentExercise.initialTable?.[idx];
                return (
                  <div
                    key={idx}
                    style={{
                      padding: '0.35rem 0.6rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border)',
                      backgroundColor: key ? 'var(--primary-light)' : 'var(--bg-surface)',
                      textAlign: 'center',
                      minWidth: '55px'
                    }}
                  >
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>[{idx}]</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: key ? 'var(--primary)' : 'var(--text-muted)' }}>
                      {key || '-'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* User Submission Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {currentExercise.type !== 'text_horner' && currentExercise.type !== 'hash_calc' && (
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  1. แอดเดรสเริ่มต้น h(x):
                </label>
                <input
                  type="number"
                  value={userInitialIndex}
                  onChange={(e) => setUserInitialIndex(e.target.value)}
                  placeholder="ใส่เลข Index เริ่มต้น เช่น 2"
                  required
                  disabled={hasSubmitted}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)'
                  }}
                />
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                {currentExercise.type === 'text_horner' ? 'ผลลัพธ์เลขฐานสิบ (Horner Total):' : '2. ตำแหน่งสุดท้ายที่บันทึกข้อมูล (Final Index):'}
              </label>
              <input
                type="number"
                value={userFinalIndex}
                onChange={(e) => setUserFinalIndex(e.target.value)}
                placeholder="ใส่ตัวเลขผลลัพธ์"
                required
                disabled={hasSubmitted}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)'
                }}
              />
            </div>
          </div>

          {!hasSubmitted ? (
            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              <span>ตรวจคำตอบ (Submit Answer)</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setHasSubmitted(false);
                setUserInitialIndex('');
                setUserFinalIndex('');
              }}
              style={{ alignSelf: 'flex-start' }}
            >
              <RefreshCw size={15} />
              <span>ทำใหม่อีกครั้ง (Retry)</span>
            </button>
          )}
        </form>

        {/* Explanation & Feedback Box */}
        {hasSubmitted && (
          <div className="animate-fade-in" style={{
            marginTop: '1.5rem',
            padding: '1.25rem',
            borderRadius: '8px',
            backgroundColor: isCorrect ? 'var(--primary-light)' : 'var(--accent-red-bg)',
            border: `1px solid ${isCorrect ? 'var(--primary-border)' : 'var(--accent-red)'}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {isCorrect ? (
                <>
                  <CheckCircle2 size={20} color="var(--primary)" />
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>ถูกต้องยอดเยี่ยม! (Correct)</span>
                </>
              ) : (
                <>
                  <XCircle size={20} color="var(--accent-red)" />
                  <span style={{ fontWeight: 700, color: 'var(--accent-red)' }}>คำตอบยังไม่ถูกต้อง (Incorrect)</span>
                </>
              )}
            </div>

            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              ขั้นตอนการ Trace เฉลยละเอียดตามเอกสารบรรยาย:
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {currentExercise.correctAnswer.stepExplanation.map((step: string, sIdx: number) => (
                <div key={sIdx} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  • {step}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)' }}>
              คำตอบที่ถูกต้อง: ตำแหน่งสุดท้ายคือ {currentExercise.correctAnswer.finalIndex}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
