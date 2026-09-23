export interface UserProgress {
  completedLessons: string[];
  practiceAttempts: {
    exerciseId: string;
    score: number;
    passed: boolean;
    timestamp: number;
  }[];
  quizHistory: {
    quizId: 'mixed' | 'mock';
    score: number;
    total: number;
    timestamp: number;
    categoryScores: { [category: string]: { correct: number; total: number } };
  }[];
}

const STORAGE_KEY = 'hashing_ch10_user_progress';

export function getProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        completedLessons: [],
        practiceAttempts: [],
        quizHistory: []
      };
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading localStorage progress', e);
    return {
      completedLessons: [],
      practiceAttempts: [],
      quizHistory: []
    };
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving localStorage progress', e);
  }
}

export function toggleLessonCompletion(lessonId: string): boolean {
  const p = getProgress();
  const index = p.completedLessons.indexOf(lessonId);
  let isNowCompleted = false;
  if (index >= 0) {
    p.completedLessons.splice(index, 1);
  } else {
    p.completedLessons.push(lessonId);
    isNowCompleted = true;
  }
  saveProgress(p);
  return isNowCompleted;
}

export function recordPracticeAttempt(exerciseId: string, passed: boolean, score: number): void {
  const p = getProgress();
  p.practiceAttempts.push({
    exerciseId,
    score,
    passed,
    timestamp: Date.now()
  });
  saveProgress(p);
}

export function recordQuizAttempt(
  quizId: 'mixed' | 'mock',
  score: number,
  total: number,
  categoryScores: { [category: string]: { correct: number; total: number } }
): void {
  const p = getProgress();
  p.quizHistory.push({
    quizId,
    score,
    total,
    timestamp: Date.now(),
    categoryScores
  });
  saveProgress(p);
}

export function resetAllProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}
