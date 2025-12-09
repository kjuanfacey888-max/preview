import React from 'react';
import { SlideProps } from '../../types';
import { ArrowUpRight } from 'lucide-react';

export const IntroSlide: React.FC<SlideProps> = ({ isActive, onNext }) => {
  return (
    <div className={`relative w-full h-full bg-[#f4f4f5] text-brand-dark flex flex-col p-6 md:p-12 overflow-hidden transition-opacity duration-1000 ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none absolute inset-0'}`}>
      
      {/* Top Left Text */}
      <div className={`transition-all duration-1000 delay-300 ${isActive ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
         <p className="text-xl md:text-2xl font-medium tracking-tight text-gray-800">
            Discover the <span className="text-red-600 font-bold">Modern</span> standard in-
         </p>
      </div>

      {/* Main Content Area - Centered Vertical */}
      <div className="flex-1 flex items-center justify-center relative z-10 w-full">
         <div className={`relative w-full transition-all duration-1000 delay-500 transform ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            
            {/* Massive Typography */}
            <h1 className="text-[11vw] leading-[0.8] font-black tracking-tighter text-center md:text-left select-none text-slate-900 uppercase">
               THE FULL <br />
               CYCLE <br />
               PROJECT.
            </h1>

            {/* The Red Ribbon */}
            <div className="absolute top-1/2 left-0 w-[120%] -translate-x-[10%] -translate-y-1/2 -rotate-6 bg-red-600 shadow-2xl z-20 overflow-hidden py-3 md:py-5 border-y-2 border-red-500">
               <div className="flex animate-marquee whitespace-nowrap">
                  {[1,2,3,4,5,6].map((i) => (
                    <div key={i} className="flex items-center gap-8 text-white font-bold text-lg md:text-3xl uppercase tracking-widest px-4">
                       <span>⚡ Heating</span>
                       <span>❄️ Cooling</span>
                       <span>💰 Incentives</span>
                       <span>🌱 Eco-Friendly</span>
                    </div>
                  ))}
               </div>
            </div>

         </div>
      </div>

      {/* Bottom Area */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-8 mt-4 relative z-30">
         
         {/* Bottom Left Text */}
         <div className={`max-w-xl transition-all duration-1000 delay-700 ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
               Where your comfort and satisfaction are our Priority. Your Trusted partner for <span className="text-black font-bold">Dual-Unit upgrades</span> in New York City.
            </p>
         </div>

         {/* Call to Action Box */}
         <button 
           onClick={onNext}
           className={`group bg-black text-white p-6 md:p-10 rounded-3xl min-w-[280px] md:min-w-[340px] text-left hover:bg-neutral-800 transition-all duration-500 delay-1000 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} shadow-2xl cursor-pointer`}
         >
            <p className="text-gray-400 text-sm mb-4">We are just a click away-</p>
            <div className="flex items-center justify-between">
               <span className="text-4xl font-bold tracking-tight">(Start Tour)</span>
               <ArrowUpRight className="w-8 h-8 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
         </button>
      </div>
    </div>
  );
};