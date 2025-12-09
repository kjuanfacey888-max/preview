import React, { useState, useEffect } from 'react';
import { SlideProps } from '../../types';
import { CheckCircle2, VolumeX, Hammer, Zap, Clock, Wrench } from 'lucide-react';

export const SolutionSlide: React.FC<SlideProps> = ({ isActive }) => {
  const [animateComparison, setAnimateComparison] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setAnimateComparison(true), 500);
      return () => clearTimeout(timer);
    } else {
      setAnimateComparison(false);
    }
  }, [isActive]);

  return (
    <div className={`relative w-full h-full bg-[#f4f4f5] text-slate-900 flex items-center overflow-hidden transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
      
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          {/* Visual Side */}
          <div className={`w-full md:w-1/2 relative transition-all duration-1000 transform ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
            <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-slate-900 shadow-2xl">
               <img 
                src="https://images.unsplash.com/photo-1616422285623-13ff0162193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Modern Heat Pump Unit" 
                className="w-full object-cover h-[70vh] grayscale contrast-125"
               />
               <div className="absolute top-6 right-6 bg-red-600 text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest shadow-lg">
                 The Fix
               </div>
            </div>
            
            {/* Badge */}
            <div className="absolute -left-6 bottom-20 bg-slate-900 text-white p-6 rounded-r-2xl shadow-xl flex items-center gap-4">
                <VolumeX className="text-red-500 w-8 h-8" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Noise Level</p>
                  <span className="font-bold text-xl">Whisper Quiet</span>
                </div>
            </div>
          </div>

          {/* Text Content */}
          <div className={`w-full md:w-1/2 transition-all duration-700 delay-300 transform ${isActive ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <h2 className="text-[6rem] leading-[0.8] font-black uppercase tracking-tighter mb-8 text-slate-900">
              Sleek.<br/>
              Smart.<br/>
              <span className="text-red-600">Solved.</span>
            </h2>
            <p className="text-xl font-medium text-gray-500 mb-10 leading-relaxed max-w-lg border-l-4 border-red-600 pl-6">
              The Dual-Unit Window System. High-efficiency heating and cooling in one unobtrusive, architectural package.
            </p>

            {/* Installation Comparison Infographic */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <Clock size={100} />
                </div>

                {/* Traditional Method */}
                <div className="relative z-10">
                    <div className="flex justify-between items-end mb-3">
                        <span className="font-bold uppercase text-xs tracking-widest text-slate-500 flex items-center gap-2">
                            <Hammer size={16} /> Traditional Install
                        </span>
                        <span className="font-black text-slate-900 text-lg">3-5 DAYS</span>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden relative">
                        {/* Fill Animation */}
                        <div
                            className={`absolute top-0 left-0 h-full bg-slate-900 transition-all duration-[2500ms] ease-out`}
                            style={{ width: animateComparison ? '100%' : '0%' }}
                        />
                        {/* Markers */}
                        <div className="absolute top-0 left-0 w-full h-full flex justify-between px-1">
                             {[1,2,3].map(i => <div key={i} className="w-0.5 h-full bg-white/20" />)}
                        </div>
                    </div>
                    {/* Steps */}
                    <div className="flex justify-between mt-2 text-[10px] uppercase font-bold text-slate-400">
                        <span className="flex items-center gap-1">Permits</span>
                        <span className="flex items-center gap-1">Demolition</span>
                        <span className="flex items-center gap-1">Piping</span>
                        <span className="flex items-center gap-1">Cleanup</span>
                    </div>
                </div>

                {/* Modern Method */}
                <div className="relative z-10">
                    <div className="flex justify-between items-end mb-3">
                        <span className="font-bold uppercase text-xs tracking-widest text-red-600 flex items-center gap-2">
                            <Zap size={16} /> Dual-Unit Install
                        </span>
                        <span className="font-black text-red-600 text-lg">15 MINUTES</span>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="h-4 bg-red-50 rounded-full overflow-hidden relative">
                        {/* Fill Animation - Fast & Short */}
                        <div
                            className={`absolute top-0 left-0 h-full bg-red-600 transition-all duration-[600ms] delay-[2000ms] cubic-bezier(0.34, 1.56, 0.64, 1)`}
                            style={{ width: animateComparison ? '15%' : '0%' }} 
                        />
                    </div>
                    {/* Benefits */}
                    <div className="flex justify-start gap-6 mt-2 text-[10px] uppercase font-bold text-red-600">
                        <span className="flex items-center gap-1"><CheckCircle2 size={12}/> No Tools</span>
                        <span className="flex items-center gap-1"><CheckCircle2 size={12}/> No Mess</span>
                        <span className="flex items-center gap-1"><CheckCircle2 size={12}/> Plug & Play</span>
                    </div>
                </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};