
export interface SlideProps {
  isActive: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum SlideType {
  INTRO,
  PROBLEM,
  TIMELINE,
  SOLUTION,
  COMPARISON,
  BENEFITS,
  PRODUCT_SPECS,
  EFFICIENCY,
  ENVIRONMENT,
  SAVINGS,
  OFFER,
  AI_CONSULTANT
}