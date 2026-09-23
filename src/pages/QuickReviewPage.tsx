import React from 'react';
import { LESSONS, Lesson } from '../data/lectureContent';
import { ArrowRight } from 'lucide-react';

interface QuickReviewPageProps {
  onNavigateLesson: (id: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const QuickReviewPage: React.FC<QuickReviewPageProps> = ({ onNavigateLesson, onNavigateTab }) => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '0.35rem' }}>10–15 Minutes Crash Course</span>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Quick Review: สรุปเข้มพร้อมสอบ Chapter 10 Hashing
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              สรุปหัวใจสำคัญ สูตร และตัวอย่างข้อสอบ 8 หัวข้อหลักจากเอกสารบรรยาย
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => onNavigateTab('mixed-quiz')}>
            <span>พร้อมสอบแล้ว! ไปทำ Mixed Quiz</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Review Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {LESSONS.map((lesson: Lesson) => (
          <div key={lesson.id} className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-primary">หัวข้อที่ {lesson.number}</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {lesson.titleTh}
                </h3>
              </div>
              <button
                className="btn btn-outline"
                onClick={() => onNavigateLesson(lesson.id)}
                style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
              >
                ดูบทเรียนเต็ม
              </button>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              {lesson.summaryTh}
            </p>

            {/* Quick Key Takeaways */}
            <div style={{ backgroundColor: 'var(--bg-elevated)', padding: '0.85rem', borderRadius: '8px', marginBottom: '0.75rem' }}>
              <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                จุดเน้นสำคัญในสไลด์:
              </div>
              <ul style={{ paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {lesson.sections[0]?.bulletPoints?.map((bp: string, bIdx: number) => (
                  <li key={bIdx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {bp}
                  </li>
                )) || (
                  <li style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {lesson.sections[0]?.contentTh[0]}
                  </li>
                )}
              </ul>
            </div>

            {/* Trap reminder */}
            <div style={{ fontSize: '0.82rem', color: 'var(--accent-amber)', fontWeight: 600 }}>
              ⚠️ ระวังในข้อสอบ: {lesson.commonMistake}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
