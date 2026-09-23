import React, { useEffect, useState } from 'react';
import { getProgress, resetAllProgress, UserProgress } from '../utils/storage';
import { LESSONS } from '../data/lectureContent';
import {
  TrendingDown,
  BookOpen,
  RotateCcw,
  ArrowRight
} from 'lucide-react';

interface WeaknessPageProps {
  onNavigateLesson: (id: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const WeaknessPage: React.FC<WeaknessPageProps> = ({ onNavigateTab }) => {
  const [progress, setProgress] = useState<UserProgress>(getProgress());

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const handleReset = () => {
    if (window.confirm('คุณต้องการรีเซ็ตข้อมูลสถิติการเรียนทั้งหมดใช่หรือไม่?')) {
      resetAllProgress();
      setProgress(getProgress());
    }
  };

  // Calculate weak categories from quiz history
  const categoryAggregates: { [cat: string]: { correct: number; total: number } } = {};
  progress.quizHistory.forEach((quiz) => {
    Object.entries(quiz.categoryScores).forEach(([cat, st]) => {
      if (!categoryAggregates[cat]) {
        categoryAggregates[cat] = { correct: 0, total: 0 };
      }
      categoryAggregates[cat].correct += (st as { correct: number; total: number }).correct;
      categoryAggregates[cat].total += (st as { correct: number; total: number }).total;
    });
  });

  const categoriesSorted = Object.entries(categoryAggregates)
    .map(([cat, st]) => ({
      category: cat,
      accuracy: Math.round((st.correct / st.total) * 100),
      correct: st.correct,
      total: st.total
    }))
    .sort((a, b) => a.accuracy - b.accuracy);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Weakness Analysis & Exam Readiness Radar
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              วิเคราะห์จุดอ่อนจากประวัติการทำแบบทดสอบจริง (Real localStorage Analytics)
            </p>
          </div>

          <button className="btn btn-secondary" onClick={handleReset} style={{ fontSize: '0.82rem' }}>
            <RotateCcw size={14} /> ล้างข้อมูลสถิติ
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>ความคืบหน้าบทเรียน</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
            {progress.completedLessons.length} / {LESSONS.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            เรียนจบแล้ว {Math.round((progress.completedLessons.length / LESSONS.length) * 100)}%
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>การทำแบบฝึกหัด Trace</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>
            {progress.practiceAttempts.filter((p) => p.passed).length} / {progress.practiceAttempts.length || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            ความถูกต้อง {progress.practiceAttempts.length ? Math.round((progress.practiceAttempts.filter((p) => p.passed).length / progress.practiceAttempts.length) * 100) : 0}%
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>จำนวนครั้งที่ทำข้อสอบ</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)' }}>
            {progress.quizHistory.length} ครั้ง
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            {progress.quizHistory.length > 0 ? `คะแนนล่าสุด: ${progress.quizHistory[progress.quizHistory.length - 1].score}/${progress.quizHistory[progress.quizHistory.length - 1].total}` : 'ยังไม่มีประวัติการสอบ'}
          </div>
        </div>
      </div>

      {/* Weak Topics Alert */}
      {categoriesSorted.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
          <BookOpen size={40} color="var(--text-muted)" style={{ margin: '0 auto 0.75rem auto' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
            ยังไม่มีข้อมูลการทำแบบฝึกหัด
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            ทำแบบทดสอบ Mixed Quiz หรือ Mock Exam เพื่อให้ระบบวิเคราะห์จุดที่ควรทบทวน
          </p>
          <button className="btn btn-primary" onClick={() => onNavigateTab('mixed-quiz')}>
            <span>เริ่มทำแบบทดสอบ Mixed Quiz</span>
            <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingDown size={18} color="var(--accent-red)" />
            <span>การวิเคราะห์ความแม่นยำรายหัวข้อ (Topic Performance):</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {categoriesSorted.map((cat) => {
              const isWeak = cat.accuracy < 70;
              return (
                <div
                  key={cat.category}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: isWeak ? 'var(--accent-red-bg)' : 'var(--bg-elevated)',
                    border: `1px solid ${isWeak ? 'var(--accent-red)' : 'var(--border)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      {cat.category}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      ตอบถูก {cat.correct} จาก {cat.total} ข้อ ({cat.accuracy}%)
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className={isWeak ? 'badge badge-red' : 'badge badge-primary'}>
                      {isWeak ? 'ควรทบทวนด่วน' : 'เข้าใจดีแล้ว'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
