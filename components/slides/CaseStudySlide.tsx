import React, { useState, useEffect } from 'react';
import { SlideProps } from '../../types';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', prev: 400, new: 150 },
  { name: 'Feb', prev: 420, new: 160 },
  { name: 'Mar', prev: 350, new: 120 },
  { name: 'Apr', prev: 200, new: 80 },
  { name: 'May', prev: 150, new: 60 },
  { name: 'Jun', prev: 100, new: 50 },
];

const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    let animationFrame: number;
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = time - startTime;
      const percentage = Math.min(progress / duration, 1);
      const ease = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(end * ease));
      if (progress < duration) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);
  return count;
};

export const CaseStudySlide: React.FC<SlideProps> = ({ isActive }) => {
  const savings = useCountUp(1200, 2500, isActive);
  const units = useCountUp(3, 1000, isActive);

  return (
    <div className={`relative w-full h-full bg-[#f4f4f5] overflow-hidden transition-opacity duration-700 flex items-center justify-center font-sans ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
       
       <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center gap-16">
          
          {/* Left: Text Content */}
          <div className={`w-full md:w-5/12 transition-all duration-1000 delay-200 transform ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="mb-8">
                  <div className="w-16 h-16 bg-slate-900 text-white flex items-center justify-center font-black text-2xl mb-6 rounded-full shadow-lg">B</div>
                  <p className="text-red-600 font-bold uppercase tracking-widest mb-2">Case Study: Brooklyn</p>
                  <h2 className="text-5xl font-black text-slate-900 leading-tight tracking-tight">
                      "We saved <span className="text-red-600 underline decoration-4 decoration-red-200 decoration-skip-ink-none">${savings.toLocaleString()}</span> in our first winter."
                  </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 border-2 border-slate-900 bg-white">
                      <div className="text-gray-500 text-xs font-bold uppercase mb-1">Timeline</div>
                      <div className="text-2xl font-black text-slate-900">1 Day</div>
                  </div>
                  <div className="p-6 border-2 border-slate-900 bg-white">
                      <div className="text-gray-500 text-xs font-bold uppercase mb-1">Scope</div>
                      <div className="text-2xl font-black text-slate-900">{units} Units</div>
                  </div>
              </div>
          </div>

          {/* Right: Graph */}
          <div className={`w-full md:w-7/12 transition-all duration-1000 delay-400 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              
              <div className="h-[400px] w-full p-8 border-l-4 border-b-4 border-slate-900 bg-white shadow-[12px_12px_0px_0px_rgba(203,213,225,0.4)]">
                 <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={data} barGap={4}>
                         <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#0f172a', fontWeight: 'bold', fontSize: 12, textTransform: 'uppercase'}} 
                            dy={10}
                         />
                         <Tooltip 
                            contentStyle={{ backgroundColor: '#fff', border: '2px solid #000', borderRadius: '0px' }}
                            itemStyle={{ color: '#000', fontWeight: 'bold' }}
                            cursor={{fill: 'rgba(220, 38, 38, 0.05)'}}
                         />
                         <Bar dataKey="prev" name="Old Boiler Cost" fill="#cbd5e1" radius={[2, 2, 0, 0]} barSize={24} animationDuration={1500} />
                         <Bar dataKey="new" name="New System Cost" fill="#dc2626" radius={[2, 2, 0, 0]} barSize={24} animationDuration={1500} animationBegin={300} />
                     </BarChart>
                 </ResponsiveContainer>
              </div>

              <div className="flex gap-8 mt-8 justify-center md:justify-start pl-8">
                  <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-slate-300 rounded-sm" />
                      <span className="font-bold text-slate-500 text-xs uppercase tracking-wider">Old Boiler Cost</span>
                  </div>
                  <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-red-600 rounded-sm" />
                      <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">New System Cost</span>
                  </div>
              </div>

          </div>

       </div>
    </div>
  );
};