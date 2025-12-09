
import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { IntroSlide } from './components/slides/IntroSlide';
import { ProblemSlide } from './components/slides/ProblemSlide';
import { TimelineSlide } from './components/slides/TimelineSlide';
import { SolutionSlide } from './components/slides/SolutionSlide';
import { ComparisonSlide } from './components/slides/ComparisonSlide';
import { BenefitsSlide } from './components/slides/BenefitsSlide';
import { ProductSpecsSlide } from './components/slides/ProductSpecsSlide';
import { SmartControlSlide } from './components/slides/SmartControlSlide';
import { DashboardSlide } from './components/slides/DashboardSlide';
import { EfficiencySlide } from './components/slides/EfficiencySlide';
import { RoiSlide } from './components/slides/RoiSlide';
import { SustainabilitySlide } from './components/slides/SustainabilitySlide';
import { CaseStudySlide } from './components/slides/CaseStudySlide';
import { OfferSlide } from './components/slides/OfferSlide';
import { AiConsultant } from './components/AiConsultant';

const SLIDE_COMPONENTS = [
  IntroSlide,
  ProblemSlide,
  TimelineSlide,
  SolutionSlide,
  ComparisonSlide,
  BenefitsSlide,
  ProductSpecsSlide,
  SmartControlSlide,
  DashboardSlide,
  EfficiencySlide,
  RoiSlide,
  SustainabilitySlide,
  CaseStudySlide,
  OfferSlide
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < SLIDE_COMPONENTS.length - 1) {
      setCurrentSlide(curr => curr + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(curr => curr - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-brand-light text-brand-dark relative font-sans">
      
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 -z-10" />

      <Navigation 
        currentSlide={currentSlide} 
        totalSlides={SLIDE_COMPONENTS.length} 
        onNext={nextSlide} 
        onPrev={prevSlide} 
      />

      {/* Slide Container */}
      <div className="w-full h-full relative">
        {SLIDE_COMPONENTS.map((Component, index) => (
          <div 
            key={index}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: index === currentSlide ? 10 : 0 }}
          >
            <Component 
              isActive={index === currentSlide} 
              onNext={nextSlide} 
              onPrev={prevSlide}
            />
          </div>
        ))}
      </div>

      <AiConsultant />
    </div>
  );
}