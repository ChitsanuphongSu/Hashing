import React, { useEffect, useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardPage } from './pages/DashboardPage';
import { QuickReviewPage } from './pages/QuickReviewPage';
import { LessonPage } from './pages/LessonPage';
import { PracticePage } from './pages/PracticePage';
import { QuizPage } from './pages/QuizPage';
import { ReferencePage } from './pages/ReferencePage';
import { CommonMistakesPage } from './pages/CommonMistakesPage';
import { WeaknessPage } from './pages/WeaknessPage';
import { HashTableVisualizer } from './components/visualizers/HashTableVisualizer';
import { MIXED_QUIZ_QUESTIONS, MOCK_QUIZ_QUESTIONS } from './data/quizQuestions';
import { LESSONS } from './data/lectureContent';
import { initTheme } from './utils/theme';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeLessonId, setActiveLessonId] = useState<string>(LESSONS[0].id);
  const [isOpenMobileNav, setIsOpenMobileNav] = useState<boolean>(false);

  useEffect(() => {
    initTheme();
  }, []);

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLesson = (lessonId: string) => {
    setActiveTab('lesson');
    setActiveLessonId(lessonId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compute Current Title for Header
  let currentTitle = 'Study Dashboard';
  if (activeTab === 'quick-review') currentTitle = 'Quick Review (15 นาที)';
  else if (activeTab === 'table-builder') currentTitle = 'Interactive Hash Table Builder';
  else if (activeTab === 'lesson') {
    const currentLesson = LESSONS.find(l => l.id === activeLessonId);
    currentTitle = currentLesson ? `${currentLesson.number} ${currentLesson.titleTh.split(':')[0]}` : 'บทเรียน';
  } else if (activeTab === 'practice') currentTitle = 'Trace & Probing Practice';
  else if (activeTab === 'mixed-quiz') currentTitle = 'Mixed Quiz (25 ข้อ)';
  else if (activeTab === 'mock-quiz') currentTitle = 'Mock Exam (30 ข้อ)';
  else if (activeTab === 'reference') currentTitle = 'Cheat Sheet & Comparison';
  else if (activeTab === 'common-mistakes') currentTitle = 'Common Exam Traps';
  else if (activeTab === 'weakness') currentTitle = 'Weakness Dashboard';

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        activeLessonId={activeLessonId}
        onSelectTab={handleSelectTab}
        onSelectLesson={handleSelectLesson}
        isOpenMobile={isOpenMobileNav}
        onCloseMobile={() => setIsOpenMobileNav(false)}
      />

      {/* Main Content Area */}
      <div className="main-content">
        <Header
          currentTitle={currentTitle}
          onOpenMobileNav={() => setIsOpenMobileNav(true)}
        />

        <main className="content-body">
          {activeTab === 'dashboard' && (
            <DashboardPage
              onNavigateTab={handleSelectTab}
              onNavigateLesson={handleSelectLesson}
            />
          )}

          {activeTab === 'quick-review' && (
            <QuickReviewPage
              onNavigateLesson={handleSelectLesson}
              onNavigateTab={handleSelectTab}
            />
          )}

          {activeTab === 'table-builder' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="card">
                <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  Interactive Hash Table Builder
                </h1>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  ทดลองสร้างตารางแฮช จำลองการเกิด Collision และสังเกตพฤติกรรมของทุกอัลกอริทึม
                </p>
              </div>
              <HashTableVisualizer />
            </div>
          )}

          {activeTab === 'lesson' && (
            <LessonPage
              lessonId={activeLessonId}
              onNavigateLesson={handleSelectLesson}
            />
          )}

          {activeTab === 'practice' && <PracticePage />}

          {activeTab === 'mixed-quiz' && (
            <QuizPage
              quizType="mixed"
              questions={MIXED_QUIZ_QUESTIONS}
              title="Mixed Quiz: แบบทดสอบรวม 25 ข้อ"
            />
          )}

          {activeTab === 'mock-quiz' && (
            <QuizPage
              quizType="mock"
              questions={MOCK_QUIZ_QUESTIONS}
              title="Mock Exam: จำลองสอบเสมือนจริง 30 ข้อ"
            />
          )}

          {activeTab === 'reference' && <ReferencePage />}

          {activeTab === 'common-mistakes' && <CommonMistakesPage />}

          {activeTab === 'weakness' && (
            <WeaknessPage
              onNavigateLesson={handleSelectLesson}
              onNavigateTab={handleSelectTab}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
