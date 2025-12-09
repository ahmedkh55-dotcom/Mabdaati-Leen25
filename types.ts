
export enum QuestionCategory {
  Scientific = "الاستدلال العلمي والميكانيكي",
  Mathematical = "الاستدلال الرياضي والمكاني",
  Verbal = "الاستدلال اللغوي وفهم المقروء",
  Flexibility = "المرونة العقلية"
}

export interface Explanation {
  method1: string; // الطريقة البديهية
  method2: string; // الطريقة التحليلية/الرياضية
  method3: string; // طريقة "إن لم تعرف فاحذف"
  whyCorrect: string;
  whyOthersWrong: string[];
}

export interface Question {
  id: number;
  text: string;
  category: QuestionCategory;
  options: string[];
  correctAnswerIndex: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: Explanation;
  imageUrl?: string;
}

export interface UserStats {
  totalAnswered: number;
  correctAnswers: number;
  wrongAnswers: number; // For Kill Mistakes
  categoryPerformance: Record<QuestionCategory, { correct: number; total: number }>;
  streak: number;
  xp: number;   // New: Experience Points
  level: number; // New: User Level
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
