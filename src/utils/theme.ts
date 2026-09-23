export type ThemeMode = 'light' | 'dark' | 'system';

const THEME_KEY = 'hashing_ch10_theme_preference';

export function getThemePreference(): ThemeMode {
  const saved = localStorage.getItem(THEME_KEY) as ThemeMode | null;
  if (saved === 'light' || saved === 'dark' || saved === 'system') {
    return saved;
  }
  return 'system';
}

export function applyTheme(mode: ThemeMode): void {
  localStorage.setItem(THEME_KEY, mode);
  const root = document.documentElement;

  if (mode === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  } else if (mode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function initTheme(): void {
  const mode = getThemePreference();
  applyTheme(mode);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getThemePreference() === 'system') {
      applyTheme('system');
    }
  });
}
