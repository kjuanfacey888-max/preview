import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentSlide, totalSlides, onNext, onPrev }) => {
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-50">
      <button 
        onClick={onPrev}
        disabled={currentSlide === 0}
        className={`p-3 rounded-full bg-red-600 border-2 border-red-700 text-white transition-all hover:bg-red-700 hover:scale-110 shadow-xl ${currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
      >
        <ChevronUp size={24} />
      </button>

      <div className="h-32 w-1.5 bg-slate-300 rounded-full relative overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full bg-red-600 transition-all duration-500 ease-out"
          style={{ height: `${progress}%` }}
        />
      </div>

      <button 
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        className={`p-3 rounded-full bg-red-600 border-2 border-red-700 text-white transition-all hover:bg-red-700 hover:scale-110 shadow-xl ${currentSlide === totalSlides - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
      >
        <ChevronDown size={24} />
      </button>
      
      <span className="text-slate-400 text-xs font-bold font-mono mt-2">
        {currentSlide + 1} / {totalSlides}
      </span>
    </div>
  );
};