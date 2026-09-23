import React, { useEffect, useState } from 'react';
import { LESSONS, Lesson } from '../data/lectureContent';
import { HashFunctionVisualizer } from '../components/visualizers/HashFunctionVisualizer';
import { HashTableVisualizer } from '../components/visualizers/HashTableVisualizer';
import { toggleLessonCompletion, getProgress } from '../utils/storage';
import {
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Info,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface LessonPageProps {
  lessonId: string;
  onNavigateLesson: (id: string) => void;
}

export const LessonPage: React.FC<LessonPageProps> = ({ lessonId, onNavigateLesson }) => {
  const lesson = LESSONS.find((l: Lesson) => l.id === lessonId) || LESSONS[0];
  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    return getProgress().completedLessons.includes(lesson.id);
  });

  useEffect(() => {
    setIsCompleted(getProgress().completedLessons.includes(lesson.id));
  }, [lesson.id]);

  const currentIndex = LESSONS.findIndex((l: Lesson) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? LESSONS[currentIndex - 1] : null;
  const nextLesson = currentIndex < LESSONS.length - 1 ? LESSONS[currentIndex + 1] : null;

  const handleToggleComplete = () => {
    const newState = toggleLessonCompletion(lesson.id);
    setIsCompleted(newState);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Lesson Header Banner */}
      <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-primary">บทที่ 10 • ส่วนที่ {lesson.number}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                สไลด์หน้า {lesson.slides.join(', ')}
              </span>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              {lesson.titleTh}
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {lesson.titleEn}
            </p>
          </div>

          <button
            onClick={handleToggleComplete}
            className={isCompleted ? 'btn btn-primary' : 'btn btn-outline'}
            style={{ fontSize: '0.875rem' }}
          >
            <CheckCircle size={16} />
            <span>{isCompleted ? 'เรียนจบแล้ว (Completed)' : 'ทำเครื่องหมายว่าเรียนจบ'}</span>
          </button>
        </div>

        <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)', fontSize: '0.925rem', color: 'var(--text-secondary)' }}>
          {lesson.summaryTh}
        </div>
      </div>

      {/* Main Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {lesson.sections.map((sec, idx: number) => (
          <div key={idx} className="card">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              {sec.heading}
            </h3>

            {sec.contentTh.map((p: string, pIdx: number) => (
              <p key={pIdx} style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', marginBottom: '0.65rem' }}>
                {p}
              </p>
            ))}

            {sec.formula && (
              <div className="formula-block">
                <span>{sec.formula}</span>
              </div>
            )}

            {sec.bulletPoints && (
              <ul style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {sec.bulletPoints.map((bp: string, bIdx: number) => (
                  <li key={bIdx} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {bp}
                  </li>
                ))}
              </ul>
            )}

            {sec.callout && (
              <div className={`callout callout-${sec.callout.type}`}>
                {sec.callout.type === 'important' && <Info size={18} color="var(--primary)" style={{ flexShrink: 0 }} />}
                {sec.callout.type === 'warning' && <AlertTriangle size={18} color="var(--accent-amber)" style={{ flexShrink: 0 }} />}
                {sec.callout.type === 'tip' && <Lightbulb size={18} color="var(--accent-blue)" style={{ flexShrink: 0 }} />}
                <div style={{ fontSize: '0.88rem' }}>{sec.callout.text}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Visualizer Integration */}
      {lesson.interactiveType && (
        <div>
          {lesson.interactiveType === 'hashing_concept' && <HashTableVisualizer />}
          {(lesson.interactiveType === 'digit_selection' || lesson.interactiveType === 'digit_addition' || lesson.interactiveType === 'modulo' || lesson.interactiveType === 'text_conversion') && (
            <HashFunctionVisualizer />
          )}
          {(lesson.interactiveType === 'linear_probing' || lesson.interactiveType === 'quadratic_probing' || lesson.interactiveType === 'double_hashing') && (
            <HashTableVisualizer />
          )}
        </div>
      )}

      {/* Common Mistake Alert Box */}
      <div className="card" style={{ backgroundColor: 'var(--accent-amber-bg)', borderColor: 'var(--accent-amber)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <AlertTriangle size={20} color="var(--accent-amber)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              จุดที่มักผิดพลาดในข้อสอบ (Common Exam Trap):
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>
              {lesson.commonMistake}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
        {prevLesson ? (
          <button
            onClick={() => onNavigateLesson(prevLesson.id)}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            <ArrowLeft size={15} />
            <span>บทก่อนหน้า: {prevLesson.number}</span>
          </button>
        ) : <div />}

        {nextLesson ? (
          <button
            onClick={() => onNavigateLesson(nextLesson.id)}
            className="btn btn-primary"
            style={{ fontSize: '0.85rem' }}
          >
            <span>บทถัดไป: {nextLesson.number}</span>
            <ArrowRight size={15} />
          </button>
        ) : <div />}
      </div>
    </div>
  );
};
