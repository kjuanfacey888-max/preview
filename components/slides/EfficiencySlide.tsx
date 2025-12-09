import React, { useState, useEffect } from 'react';
import { SlideProps } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Old Boiler', efficiency: 80, color: '#e2e8f0' },
  { name: 'Standard AC', efficiency: 100, color: '#94a3b8' },
  { name: 'Dual-Unit', efficiency: 300, color: '#dc2626' },
];

// Simple hook for counting up numbers
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
      
      // Ease out quart function for smooth animation
      const ease = 1 - Math.pow(1 - percentage, 4);
      
      setCount(Math.floor(end * ease));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
};

export const EfficiencySlide: React.FC<SlideProps> = ({ isActive }) => {
  return (
    <div className={`relative w-full h-full bg-[#f4f4f5] flex items-center justify-center transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
      <div className="container max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-[4rem] md:text-[6rem] font-black text-slate-900 leading-none tracking-tighter uppercase mb-4">
            Unmatched <br/><span className="text-red-600">Efficiency</span>
          </h2>
          <p className="text-xl text-gray-500 font-medium max-w-xl border-l-4 border-slate-900 pl-4">
            Moving heat is smarter than generating it. Experience up to 300% efficiency.
          </p>
        </div>

        <div className="h-[40vh] w-full bg-white rounded-3xl p-8 border-2 border-slate-900 shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] transform transition-transform duration-500 hover:translate-y-1">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
               <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
               <XAxis type="number" domain={[0, 350]} hide />
               <YAxis 
                dataKey="name" 
                type="category" 
                tick={{ fill: '#0f172a', fontSize: 14, fontWeight: 900, textTransform: 'uppercase' }} 
                width={120}
                axisLine={false}
                tickLine={false}
               />
               <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ borderRadius: '0px', border: '2px solid #000', boxShadow: '4px 4px 0 0 #000' }}
                itemStyle={{ fontWeight: 'bold' }}
               />
               <Bar dataKey="efficiency" radius={[0, 4, 4, 0]} barSize={40} animationDuration={1500} animationBegin={500}>
                 {data.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={entry.color} />
                 ))}
               </Bar>
             </BarChart>
           </ResponsiveContainer>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-8">
            <StatBox end={300} suffix="%" label="Efficiency Rating" color="text-red-600" isActive={isActive} delay={0} />
            <StatBox end={40} suffix="%" prefix="-" label="Carbon Emissions" color="text-slate-900" isActive={isActive} delay={200} />
            <StatBox end={800} prefix="~$" label="Annual Savings" color="text-slate-900" isActive={isActive} delay={400} />
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ end, prefix = "", suffix = "", label, color, isActive, delay }: any) => {
    const count = useCountUp(end, 2000, isActive);
    
    return (
        <div className={`p-6 bg-white border border-gray-200 transition-all duration-700 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: `${delay}ms` }}>
            <div className={`text-5xl font-black ${color} mb-2 tracking-tighter`}>
                {prefix}{count}{suffix}
            </div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</div>
        </div>
    );
};