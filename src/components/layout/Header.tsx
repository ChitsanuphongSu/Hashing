import React, { useEffect, useState } from 'react';
import { Sun, Moon, Laptop, BookOpen, Layers, CheckCircle } from 'lucide-react';
import { ThemeMode, getThemePreference, applyTheme } from '../../utils/theme';
import { getProgress } from '../../utils/storage';
import { LESSONS } from '../../data/lectureContent';

interface HeaderProps {
  currentTitle: string;
  onOpenMobileNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTitle, onOpenMobileNav }) => {
  const [theme, setTheme] = useState<ThemeMode>(getThemePreference());
  const [progressCount, setProgressCount] = useState<number>(0);

  useEffect(() => {
    const p = getProgress();
    setProgressCount(p.completedLessons.length);
  }, []);

  const handleThemeChange = (mode: ThemeMode) => {
    setTheme(mode);
    applyTheme(mode);
  };

  const percent = Math.round((progressCount / LESSONS.length) * 100);

  return (
    <header style={{
      height: '64px',
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 30
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onOpenMobileNav}
          className="btn-secondary"
          style={{
            display: 'none',
            padding: '0.4rem 0.6rem',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
          id="mobile-menu-btn"
          aria-label="Open menu"
        >
          <Layers size={18} />
        </button>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, fontFamily: 'var(--font-mono)' }}>
            Data Structures • Chapter 10: Hashing
          </span>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {currentTitle}
          </h2>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Progress Tracker Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 0.75rem',
          backgroundColor: 'var(--primary-light)',
          border: '1px solid var(--primary-border)',
          borderRadius: '9999px',
          color: 'var(--primary)',
          fontSize: '0.8rem',
          fontWeight: 600,
          fontFamily: 'var(--font-mono)'
        }}>
          <CheckCircle size={14} />
          <span>{progressCount}/{LESSONS.length} บทเรียน ({percent}%)</span>
        </div>

        {/* Theme Switcher */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--bg-elevated)',
          padding: '3px',
          borderRadius: '8px',
          border: '1px solid var(--border)'
        }}>
          <button
            onClick={() => handleThemeChange('light')}
            style={{
              background: theme === 'light' ? 'var(--bg-surface)' : 'transparent',
              color: theme === 'light' ? 'var(--primary)' : 'var(--text-muted)',
              border: 'none',
              padding: '4px 7px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              boxShadow: theme === 'light' ? 'var(--shadow-sm)' : 'none'
            }}
            title="Light Theme"
          >
            <Sun size={15} />
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            style={{
              background: theme === 'dark' ? 'var(--bg-surface)' : 'transparent',
              color: theme === 'dark' ? 'var(--primary)' : 'var(--text-muted)',
              border: 'none',
              padding: '4px 7px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              boxShadow: theme === 'dark' ? 'var(--shadow-sm)' : 'none'
            }}
            title="Dark Theme"
          >
            <Moon size={15} />
          </button>
          <button
            onClick={() => handleThemeChange('system')}
            style={{
              background: theme === 'system' ? 'var(--bg-surface)' : 'transparent',
              color: theme === 'system' ? 'var(--primary)' : 'var(--text-muted)',
              border: 'none',
              padding: '4px 7px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              boxShadow: theme === 'system' ? 'var(--shadow-sm)' : 'none'
            }}
            title="System Theme"
          >
            <Laptop size={15} />
          </button>
        </div>
      </div>
    </header>
  );
};
