import React from 'react';
import {
  Home,
  Zap,
  BookOpen,
  Hash,
  Binary,
  GitMerge,
  ArrowRightCircle,
  GitBranch,
  Layers,
  Database,
  CheckSquare,
  HelpCircle,
  FileText,
  AlertTriangle,
  Award,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { LESSONS } from '../../data/lectureContent';

interface SidebarProps {
  activeTab: string;
  activeLessonId: string;
  onSelectTab: (tab: string) => void;
  onSelectLesson: (lessonId: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  activeLessonId,
  onSelectTab,
  onSelectLesson,
  isOpenMobile,
  onCloseMobile
}) => {
  const navItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0.55rem 0.85rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: isActive ? 600 : 500,
    transition: 'all 0.15s ease',
    marginBottom: '2px'
  });

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '0.7rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--text-muted)',
    padding: '0.75rem 0.85rem 0.35rem 0.85rem',
    fontFamily: 'var(--font-mono)'
  };

  const content = (
    <aside style={{
      width: '280px',
      backgroundColor: 'var(--bg-surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      overflowY: 'auto'
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '1.25rem 1.25rem 1rem 1.25rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          backgroundColor: 'var(--primary)',
          color: '#FFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontFamily: 'var(--font-mono)'
        }}>
          #10
        </div>
        <div>
          <h1 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
            Hashing
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Data Structures • Ch.10
          </p>
        </div>
      </div>

      <nav style={{ padding: '0.75rem 0.5rem', display: 'flex', flexDirection: 'column' }}>
        {/* HOME SECTION */}
        <div style={sectionHeadingStyle}>HOME</div>
        <button
          style={navItemStyle(activeTab === 'dashboard')}
          onClick={() => { onSelectTab('dashboard'); onCloseMobile(); }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Home size={16} />
            <span>Study Dashboard</span>
          </div>
        </button>

        <button
          style={navItemStyle(activeTab === 'quick-review')}
          onClick={() => { onSelectTab('quick-review'); onCloseMobile(); }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Zap size={16} />
            <span>Quick Review (15 นาที)</span>
          </div>
        </button>

        <button
          style={navItemStyle(activeTab === 'table-builder')}
          onClick={() => { onSelectTab('table-builder'); onCloseMobile(); }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Database size={16} />
            <span>Interactive Table Builder</span>
          </div>
        </button>

        {/* HASHING LECTURE LESSONS */}
        <div style={sectionHeadingStyle}>HASHING LESSONS</div>
        {LESSONS.map((lesson) => {
          const isSelected = activeTab === 'lesson' && activeLessonId === lesson.id;
          return (
            <button
              key={lesson.id}
              style={navItemStyle(isSelected)}
              onClick={() => {
                onSelectLesson(lesson.id);
                onCloseMobile();
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', overflow: 'hidden' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  opacity: 0.75,
                  minWidth: '18px'
                }}>
                  {lesson.number}
                </span>
                <span style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '0.84rem'
                }}>
                  {lesson.titleTh.split(':')[0]}
                </span>
              </div>
              <ChevronRight size={13} style={{ opacity: isSelected ? 1 : 0.4 }} />
            </button>
          );
        })}

        {/* PRACTICE SECTION */}
        <div style={sectionHeadingStyle}>PRACTICE & QUIZ</div>
        <button
          style={navItemStyle(activeTab === 'practice')}
          onClick={() => { onSelectTab('practice'); onCloseMobile(); }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <CheckSquare size={16} />
            <span>Trace & Probing Practice</span>
          </div>
        </button>

        <button
          style={navItemStyle(activeTab === 'mixed-quiz')}
          onClick={() => { onSelectTab('mixed-quiz'); onCloseMobile(); }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <HelpCircle size={16} />
            <span>Mixed Quiz (25 ข้อ)</span>
          </div>
        </button>

        <button
          style={navItemStyle(activeTab === 'mock-quiz')}
          onClick={() => { onSelectTab('mock-quiz'); onCloseMobile(); }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Award size={16} />
            <span>Mock Exam (30 ข้อ)</span>
          </div>
        </button>

        <button
          style={navItemStyle(activeTab === 'weakness')}
          onClick={() => { onSelectTab('weakness'); onCloseMobile(); }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <TrendingDown size={16} />
            <span>Weakness Dashboard</span>
          </div>
        </button>

        {/* REFERENCE SECTION */}
        <div style={sectionHeadingStyle}>REFERENCE</div>
        <button
          style={navItemStyle(activeTab === 'reference')}
          onClick={() => { onSelectTab('reference'); onCloseMobile(); }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <FileText size={16} />
            <span>Cheat Sheet & Comparison</span>
          </div>
        </button>

        <button
          style={navItemStyle(activeTab === 'common-mistakes')}
          onClick={() => { onSelectTab('common-mistakes'); onCloseMobile(); }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <AlertTriangle size={16} />
            <span>Common Exam Traps</span>
          </div>
        </button>
      </nav>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div style={{ display: 'none' }} className="desktop-sidebar-container">
        {content}
      </div>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 100,
            display: 'flex'
          }}
          onClick={onCloseMobile}
        >
          <div
            style={{ width: '280px', height: '100%', zIndex: 101 }}
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-sidebar-container {
            display: block !important;
          }
          #mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 899px) {
          #mobile-menu-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
};
