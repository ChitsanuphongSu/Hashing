import React, { useState } from 'react';
import { QuizQuestion } from '../data/quizQuestions';
import { recordQuizAttempt } from '../utils/storage';
import {
  Award,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizPageProps {
  quizType: 'mixed' | 'mock';
  questions: QuizQuestion[];
  title: string;
}

export const QuizPage: React.FC<QuizPageProps> = ({ quizType, questions, title }) => {
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [categoryStats, setCategoryStats] = useState<{ [cat: string]: { correct: number; total: number } }>({});

  const handleSelectOption = (qId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [qId]: optionIndex
    }));
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let currentScore = 0;
    const catStats: { [cat: string]: { correct: number; total: number } } = {};

    questions.forEach((q: QuizQuestion) => {
      if (!catStats[q.topic]) {
        catStats[q.topic] = { correct: 0, total: 0 };
      }
      catStats[q.topic].total += 1;

      if (userAnswers[q.id] === q.correctIndex) {
        currentScore += 1;
        catStats[q.topic].correct += 1;
      }
    });

    setScore(currentScore);
    setCategoryStats(catStats);
    setIsSubmitted(true);

    recordQuizAttempt(quizType, currentScore, questions.length, catStats);

    if (currentScore / questions.length >= 0.8) {
      try {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.7 } });
      } catch (e) {}
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const answeredCount = Object.keys(userAnswers).length;
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Quiz Header */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '0.35rem' }}>
              {quizType === 'mixed' ? 'Mixed Quiz (25 ข้อ)' : 'Mock Exam (30 ข้อ)'}
            </span>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {title}
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              ข้อสอบอิงเนื้อหา คำศัพท์ และสูตรจากเอกสารบรรยายบทที่ 10 อย่างเคร่งครัด
            </p>
          </div>

          {!isSubmitted && (
            <div style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem'
            }}>
              ทำแล้ว: {answeredCount} / {questions.length} ข้อ
            </div>
          )}
        </div>
      </div>

      {/* Result Card if Submitted */}
      {isSubmitted && (
        <div className="card animate-fade-in" style={{
          backgroundColor: percentage >= 70 ? 'var(--primary-light)' : 'var(--accent-amber-bg)',
          borderColor: percentage >= 70 ? 'var(--primary-border)' : 'var(--accent-amber)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Award size={32} color={percentage >= 70 ? 'var(--primary)' : 'var(--accent-amber)'} />
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  ผลการสอบของคุณ: {score} / {questions.length} คะแนน ({percentage}%)
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {percentage >= 80 ? 'ยอดเยี่ยมมาก! พร้อมสำหรับการสอบบท Hashing แล้ว' : percentage >= 60 ? 'ผ่านเกณฑ์ดี ควรทบทวนหัวข้อที่ตอบผิดเพิ่มเติม' : 'ควรทบทวนเนื้อหาและลองทำใหม่อีกครั้ง'}
                </p>
              </div>
            </div>

            <button className="btn btn-primary" onClick={handleResetQuiz}>
              <RefreshCw size={15} /> ทำแบบทดสอบใหม่อีกครั้ง
            </button>
          </div>

          {/* Breakdown by Topic */}
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid var(--border)'
          }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              ความแม่นยำรายหัวข้อ (Topic Mastery):
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem' }}>
              {Object.entries(categoryStats).map(([cat, st]) => {
                const catPercent = Math.round((st.correct / st.total) * 100);
                return (
                  <div key={cat} style={{ padding: '0.5rem', backgroundColor: 'var(--bg-elevated)', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cat}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: catPercent >= 75 ? 'var(--primary)' : 'var(--accent-red)' }}>
                      {st.correct}/{st.total} ({catPercent}%)
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Quiz Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {questions.map((q: QuizQuestion, idx: number) => {
          const selectedAns = userAnswers[q.id];
          const isCorrect = isSubmitted && selectedAns === q.correctIndex;
          const isWrong = isSubmitted && selectedAns !== undefined && selectedAns !== q.correctIndex;

          return (
            <div
              key={q.id}
              className="card"
              style={{
                borderColor: isSubmitted ? (isCorrect ? 'var(--primary)' : 'var(--accent-red)') : 'var(--border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="badge badge-primary">ข้อที่ {idx + 1}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{q.topic}</span>
                </div>

                {isSubmitted && (
                  <span className={isCorrect ? 'badge badge-primary' : 'badge badge-red'}>
                    {isCorrect ? 'ถูกต้อง (+1)' : 'ไม่ถูกต้อง (0)'}
                  </span>
                )}
              </div>

              <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                {q.questionTh}
              </p>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {q.options.map((opt: string, oIdx: number) => {
                  const isThisSelected = selectedAns === oIdx;
                  const isThisCorrectOption = isSubmitted && oIdx === q.correctIndex;
                  const isThisWrongSelected = isSubmitted && isThisSelected && !isThisCorrectOption;

                  let optBg = 'var(--bg-surface)';
                  let optBorder = 'var(--border)';
                  let optColor = 'var(--text-primary)';

                  if (isThisSelected && !isSubmitted) {
                    optBg = 'var(--primary-light)';
                    optBorder = 'var(--primary)';
                    optColor = 'var(--primary)';
                  } else if (isThisCorrectOption) {
                    optBg = 'var(--primary-light)';
                    optBorder = 'var(--primary)';
                    optColor = 'var(--primary)';
                  } else if (isThisWrongSelected) {
                    optBg = 'var(--accent-red-bg)';
                    optBorder = 'var(--accent-red)';
                    optColor = 'var(--accent-red)';
                  }

                  return (
                    <button
                      type="button"
                      key={oIdx}
                      onClick={() => handleSelectOption(q.id, oIdx)}
                      disabled={isSubmitted}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: `1px solid ${optBorder}`,
                        backgroundColor: optBg,
                        color: optColor,
                        textAlign: 'left',
                        cursor: isSubmitted ? 'default' : 'pointer',
                        fontSize: '0.9rem',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: `1px solid ${optBorder}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        flexShrink: 0
                      }}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation when submitted */}
              {isSubmitted && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.85rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-elevated)',
                  borderLeft: '4px solid var(--primary)',
                  fontSize: '0.88rem'
                }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    คำอธิบายและอ้างอิงบทเรียน:
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    {q.explanationTh}
                  </p>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    แหล่งอ้างอิง: {q.lectureReference}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {!isSubmitted && (
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}
              disabled={answeredCount === 0}
            >
              <span>ส่งคำตอบเพื่อตรวจคะแนน ({answeredCount}/{questions.length})</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
