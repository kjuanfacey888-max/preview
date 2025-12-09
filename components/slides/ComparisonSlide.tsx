import React, { useEffect, useState } from 'react';
import { SlideProps } from '../../types';
import { CloudFog, Zap, Droplets, Flame, ArrowRight, Leaf, Factory, AlertTriangle } from 'lucide-react';

export const ComparisonSlide: React.FC<SlideProps> = ({ isActive }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setAnimate(true), 500);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
    }
  }, [isActive]);

  return (
    <div className={`relative w-full h-full bg-[#f4f4f5] overflow-hidden transition-opacity duration-700 flex flex-col font-sans ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
      
      {/* Header Area */}
      <div className={`absolute top-0 left-0 w-full p-8 z-20 flex justify-between items-end transition-all duration-700 ${isActive ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
         <div>
            <p className="text-red-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-2">Environmental Analysis</p>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-none uppercase tracking-tighter">
                The Carbon <br/>Cost
            </h2>
         </div>
         <div className="hidden md:block text-right">
             <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Impact Report</div>
             <div className="text-xs text-slate-400">Data source: NYSERDA</div>
         </div>
      </div>

      {/* Main Split Content */}
      <div className="flex-1 flex flex-col md:flex-row h-full pt-24 md:pt-0">
         
         {/* Left Side: The Old Way (Dirty) */}
         <div className="w-full md:w-1/2 bg-slate-200 flex flex-col justify-center px-8 md:px-16 py-8 relative overflow-hidden border-r-2 border-slate-300">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                <Factory size={400} />
             </div>

             <div className={`relative z-10 transition-all duration-1000 transform ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                 <div className="flex items-center gap-3 mb-6 opacity-60">
                    <Flame size={32} className="text-slate-600" />
                    <span className="text-2xl font-black uppercase text-slate-600 tracking-tight">Legacy Boiler</span>
                 </div>

                 {/* Metric 1: CO2 */}
                 <div className="mb-8">
                     <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Annual CO2 Emissions</p>
                     <div className="flex items-end gap-2">
                         <span className="text-5xl md:text-6xl font-black text-slate-800">8.5</span>
                         <span className="text-xl font-bold text-slate-500 mb-2">Tons</span>
                     </div>
                     <div className="flex mt-3 gap-2">
                         {[1,2,3,4,5].map((i) => (
                             <CloudFog key={i} size={24} className={`text-slate-600 transition-all duration-500 delay-${i*100} ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                         ))}
                     </div>
                 </div>

                 {/* Metric 2: Waste */}
                 <div className="bg-slate-300/50 p-6 rounded-2xl border border-slate-400/30">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold uppercase text-slate-600">Energy Wasted</span>
                        <AlertTriangle size={18} className="text-amber-600" />
                     </div>
                     <div className="w-full bg-slate-400 h-4 rounded-full overflow-hidden mb-2">
                         <div className={`h-full bg-slate-700 transition-all duration-1000 ease-out`} style={{ width: animate ? '35%' : '0%' }} />
                     </div>
                     <p className="text-xs font-medium text-slate-600">35% of heat is lost through ducts & piping.</p>
                 </div>
             </div>
         </div>

         {/* Center VS Divider */}
         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center w-16 h-16 bg-slate-900 rounded-full text-white font-black italic text-xl border-4 border-white shadow-xl">
             VS
         </div>

         {/* Right Side: The New Way (Clean) */}
         <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 md:px-16 py-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-red-50/50 -skew-x-12 translate-x-1/2 z-0" />
            
             <div className={`relative z-10 transition-all duration-1000 delay-300 transform ${isActive ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                 <div className="flex items-center gap-3 mb-6 text-red-600">
                    <Zap size={32} strokeWidth={3} />
                    <span className="text-2xl font-black uppercase tracking-tight">Dual-Unit System</span>
                 </div>

                 {/* Metric 1: CO2 */}
                 <div className="mb-8">
                     <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Annual CO2 Emissions</p>
                     <div className="flex items-end gap-2">
                         <span className="text-5xl md:text-6xl font-black text-red-600">1.2</span>
                         <span className="text-xl font-bold text-red-400 mb-2">Tons</span>
                     </div>
                     <div className="flex mt-3 gap-2">
                         <CloudFog size={24} className={`text-red-200 transition-all duration-500 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                         <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center gap-1 self-center ml-2 animate-bounce">
                             <Leaf size={12} /> -85% Reduction
                         </span>
                     </div>
                 </div>

                 {/* Metric 2: Efficiency */}
                 <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold uppercase text-red-800">Efficiency Rating</span>
                        <Zap size={18} className="text-red-600 fill-red-600" />
                     </div>
                     <div className="w-full bg-red-200 h-4 rounded-full overflow-hidden mb-2">
                         <div className={`h-full bg-red-600 transition-all duration-1000 ease-out delay-500`} style={{ width: animate ? '100%' : '0%' }} />
                     </div>
                     <p className="text-xs font-medium text-red-800">300% Efficiency (Moves heat vs creating it).</p>
                 </div>
             </div>
         </div>

      </div>

      {/* Bottom Summary Bar */}
      <div className={`bg-slate-900 text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-1000 delay-700 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-full">
                  <Leaf className="text-green-400" size={24} />
              </div>
              <div>
                  <h3 className="font-bold uppercase text-lg leading-none">Instant Impact</h3>
                  <p className="text-slate-400 text-sm">Switching is equivalent to planting 300 trees per year.</p>
              </div>
          </div>
          <button className="flex items-center gap-2 text-white font-bold uppercase tracking-widest hover:text-red-500 transition-colors">
              See Full Report <ArrowRight size={20} />
          </button>
      </div>

    </div>
  );
};