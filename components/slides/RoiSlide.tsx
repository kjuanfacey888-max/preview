import React, { useState, useEffect } from 'react';
import { SlideProps } from '../../types';
import { TrendingUp, DollarSign, PiggyBank, ShieldCheck } from 'lucide-react';

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

export const RoiSlide: React.FC<SlideProps> = ({ isActive }) => {
  const roi = useCountUp(170, 2500, isActive);

  return (
    <div className={`relative w-full h-full bg-[#f4f4f5] overflow-hidden transition-opacity duration-700 flex items-center justify-center font-sans ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
       
       <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center gap-16">
          
          {/* Left Side: Big Stat */}
          <div className={`w-full md:w-5/12 transition-all duration-1000 delay-200 ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="inline-block bg-red-600 text-white font-bold px-3 py-1 text-sm uppercase tracking-widest mb-4">Financial Impact</div>
              <h1 className="text-[8rem] md:text-[10rem] font-black text-slate-900 leading-none tracking-tighter mb-6 flex">
                {roi}<span className="text-red-600 text-6xl md:text-8xl align-top">%</span>
              </h1>
              
              <div className="border-l-4 border-slate-900 pl-6">
                  <h3 className="text-2xl font-black uppercase text-slate-900 mb-2">5-Year ROI</h3>
                  <p className="text-gray-500 font-medium text-lg leading-relaxed">
                      Fuel savings + incentives = The system pays for itself.
                  </p>
              </div>
          </div>

          {/* Right Side: Grid */}
          <div className="w-full md:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-4">
              <RoiCard 
                  icon={DollarSign} 
                  title="Monthly Savings" 
                  value="-$85" 
                  sub="/ month avg" 
                  theme="dark"
                  isActive={isActive} delay={300}
              />
              <RoiCard 
                  icon={TrendingUp} 
                  title="Incentives" 
                  value="Active" 
                  sub="Rebates Available" 
                  theme="light"
                  isActive={isActive} delay={400}
              />
              <RoiCard 
                  icon={PiggyBank} 
                  title="Maintenance" 
                  value="$0" 
                  sub="Boiler Repair Costs" 
                  theme="light"
                  isActive={isActive} delay={500}
              />
              <RoiCard 
                  icon={ShieldCheck} 
                  title="Warranty" 
                  value="10 YR" 
                  sub="Full Coverage" 
                  theme="red"
                  isActive={isActive} delay={600}
              />
          </div>

       </div>
    </div>
  );
};

const RoiCard = ({ icon: Icon, title, value, sub, theme, isActive, delay }: any) => {
    const styles = {
        dark: "bg-slate-900 text-white",
        light: "bg-white text-slate-900 border-2 border-slate-100",
        red: "bg-red-600 text-white"
    };
    
    return (
        <div className={`${styles[theme as keyof typeof styles]} p-8 flex flex-col justify-between min-h-[180px] transition-all duration-700 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: `${delay}ms` }}>
            <Icon size={28} className="mb-4 opacity-80" />
            <div>
                <h3 className="font-bold uppercase text-xs tracking-widest opacity-60 mb-1">{title}</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black tracking-tighter">{value}</span>
                    <span className="text-xs font-medium opacity-60">{sub}</span>
                </div>
            </div>
        </div>
    )
}