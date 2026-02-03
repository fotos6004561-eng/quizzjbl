export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizStep {
  id: number;
  type: 'intro' | 'question';
  feature_name: string;
  visual_brief_es: string;
  question: string;
  options: QuizOption[];
  feedback_hype: string;
}

export interface QuizState {
  currentStepIndex: number;
  isCompleted: boolean;
  score: number; // Even if it's hype, we track clicks
  showFeedback: boolean;
  lastAnswerCorrect: boolean;
}