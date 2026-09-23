import React, { useEffect, useState } from 'react';
import { LESSONS, Lesson } from '../data/lectureContent';
import { getProgress, UserProgress } from '../utils/storage';
import {
  BookOpen,
  Zap,
  HelpCircle,
  Award,
  CheckCircle,
  Database,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

interface DashboardPageProps {
  onNavigateTab: (tab: string) => void;
  onNavigateLesson: (id: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigateTab, onNavigateLesson }) => {
  const [progress, setProgress] = useState<UserProgress>(getProgress());

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const completedCount = progress.completedLessons.length;
  const progressPercent = Math.round((completedCount / LESSONS.length) * 100);

  // Recommended next lesson
  const nextIncompleteLesson = LESSONS.find((l: Lesson) => !progress.completedLessons.includes(l.id)) || LESSONS[0];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Welcome Banner */}
      <div className="card" style={{
        backgroundColor: 'var(--primary-light)',
        border: '1px solid var(--primary-border)',
        padding: '1.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-primary">Data Structures • Chapter 10</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Quiz & Exam Preparation</span>
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              Hashing — Interactive Study Dashboard
            </h1>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '650px' }}>
              ระบบติวเข้มและฝึกฝนการคำนวณแฮชฟังก์ชัน การแก้ปัญหาการชน (Collision Resolution) และการจำลองตารางแฮชจริง อิงตามเอกสารบรรยายรายวิชา
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => onNavigateTab('quick-review')}>
              <Zap size={16} /> Quick Review (15 นาที)
            </button>
            <button className="btn btn-secondary" onClick={() => onNavigateTab('table-builder')}>
              <Database size={16} /> Table Builder
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
            <span>ความคืบหน้าการศึกษาบทเรียน ({completedCount}/{LESSONS.length} บท)</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{progressPercent}%</span>
          </div>
          <div style={{ height: '8px', backgroundColor: 'var(--bg-surface)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: 'var(--primary)', transition: 'width 0.3s ease' }} />
          </div>
        </div>
      </div>

      {/* Quick Action Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <BookOpen size={20} color="var(--primary)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>บทเรียนถัดไปที่แนะนำ</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              {nextIncompleteLesson.number}: {nextIncompleteLesson.titleTh.split(':')[0]}
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => onNavigateLesson(nextIncompleteLesson.id)} style={{ fontSize: '0.82rem' }}>
            <span>เริ่มเรียนบทนี้</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <HelpCircle size={20} color="var(--accent-blue)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Mixed Quiz</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              แบบทดสอบผสม 25 ข้อ คลุมทุกเนื้อหาตามสัดส่วนข้อสอบ
            </p>
          </div>
          <button className="btn btn-secondary" onClick={() => onNavigateTab('mixed-quiz')} style={{ fontSize: '0.82rem' }}>
            <span>ทำแบบทดสอบ 25 ข้อ</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Award size={20} color="var(--accent-amber)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Mock Exam</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              จำลองสอบเสมือนจริง 30 ข้อ ทดสอบความพร้อมก่อนลงสนามสอบ
            </p>
          </div>
          <button className="btn btn-secondary" onClick={() => onNavigateTab('mock-quiz')} style={{ fontSize: '0.82rem' }}>
            <span>เริ่มจำลองสอบ 30 ข้อ</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <TrendingUp size={20} color="var(--accent-red)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Weakness Radar</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              ดูสถิติจุดอ่อนและคำแนะนำรายบุคคลจากข้อมูลจริง
            </p>
          </div>
          <button className="btn btn-secondary" onClick={() => onNavigateTab('weakness')} style={{ fontSize: '0.82rem' }}>
            <span>วิเคราะห์จุดอ่อน</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>
          สารบัญเนื้อหา Chapter 10: Hashing
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
          {LESSONS.map((lesson: Lesson) => {
            const isDone = progress.completedLessons.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                onClick={() => onNavigateLesson(lesson.id)}
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-elevated)',
                  border: isDone ? '1px solid var(--primary-border)' : '1px solid var(--border)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                  <span style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    backgroundColor: isDone ? 'var(--primary)' : 'var(--bg-surface)',
                    color: isDone ? '#FFF' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    flexShrink: 0
                  }}>
                    {lesson.number}
                  </span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {lesson.titleTh.split(':')[0]}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      สไลด์ {lesson.slides.join(', ')}
                    </div>
                  </div>
                </div>

                <CheckCircle size={16} color={isDone ? 'var(--primary)' : 'var(--text-muted)'} style={{ opacity: isDone ? 1 : 0.3 }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
