import React, { useEffect, useState, useRef } from 'react';
import { SlideProps } from '../../types';
import { Building2, Ban, RefreshCw, Leaf, DollarSign, Gavel, ArrowRight } from 'lucide-react';

const milestones = [
  {
    year: "NOW",
    title: "Support & Incentives",
    desc: "NYSERDA & NYC programs offer incentives. NYCHA is already transitioning public housing. Programs like NYC Accelerator help owners navigate cost & complexity.",
    icon: DollarSign,
    phase: "How It's Happening",
    align: "bottom"
  },
  {
    year: "2026",
    title: "New Construction",
    desc: "Most new low-rise buildings (7 stories or less) must be all-electric. Gas boilers and stoves are banned in these new developments.",
    icon: Building2,
    phase: "Key Mandate",
    align: "top"
  },
  {
    year: "2030",
    title: "Existing Buildings",
    desc: "End of like-for-like fossil fuel replacements. When heating systems break, they must be replaced with electric (heat pump/geothermal) systems.",
    icon: RefreshCw,
    phase: "Retrofit Rule",
    align: "bottom"
  },
  {
    year: "2035",
    title: "Appliance Bans",
    desc: "Sale of new gas stoves, dryers, and furnaces will be phased out. A complete shift to electric appliances across the state.",
    icon: Ban,
    phase: "Phase Out",
    align: "top"
  },
  {
    year: "GOAL",
    title: "Why The Change?",
    desc: "To cut 53% of NY's building emissions. Modern heat pumps work efficiently in cold winters, saving energy and money.",
    icon: Leaf,
    phase: "Climate Goals",
    align: "bottom"
  }
];

export const TimelineSlide: React.FC<SlideProps> = ({ isActive }) => {
  const [progress, setProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      // Animate progress bar from 0 to 100 over 2.5 seconds for a smoother feel
      const startTime = Date.now();
      const duration = 2500;
      
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const nextProgress = Math.min((elapsed / duration) * 100, 100);
        
        setProgress(nextProgress);
        
        if (nextProgress < 100) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    } else {
      setProgress(0);
    }
  }, [isActive]);

  return (
    <div className={`relative w-full h-full bg-[#f4f4f5] overflow-hidden transition-opacity duration-700 flex flex-col items-center justify-center font-sans ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-200/40 via-transparent to-transparent -z-10" />

      {/* Header */}
      <div className={`absolute top-8 left-6 md:left-12 transition-all duration-1000 z-20 max-w-2xl ${isActive ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-red-100 rounded-lg">
                <Gavel size={18} className="text-red-600" />
            </div>
            <span className="text-red-600 font-bold tracking-widest uppercase text-xs md:text-sm">CLCPA Driven Transition</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-none uppercase tracking-tighter mb-4 drop-shadow-sm">
              The Path to <br/>Electric
          </h2>
          <p className="text-sm text-slate-600 font-medium leading-relaxed border-l-4 border-red-600 pl-4 max-w-lg hidden md:block">
            New York is actively transitioning from gas/oil boilers to heat pumps, driven by the Climate Leadership and Community Protection Act (CLCPA) to cut emissions and phase out fossil fuels.
          </p>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="w-full h-full overflow-x-auto overflow-y-hidden flex items-center relative custom-scrollbar pl-12 pr-48"
      >
          <div className="relative min-w-[1800px] h-[70vh] flex items-center">
            
            {/* Main Axis Line (Background) */}
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-slate-200 -translate-y-1/2 rounded-full" />
            
            {/* Main Axis Line (Active Red Gradient) */}
            <div 
                className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-red-500 to-red-600 -translate-y-1/2 transition-all ease-linear shadow-[0_0_20px_rgba(220,38,38,0.4)] rounded-full"
                style={{ width: `${progress}%` }} 
            />

            {/* Milestones */}
            <div className="flex justify-between w-full px-24 relative z-10">
                {milestones.map((milestone, index) => (
                    <TimelineCard 
                        key={index}
                        data={milestone}
                        active={progress > (index * (100 / milestones.length))}
                        delay={index * 300}
                    />
                ))}
            </div>

          </div>
      </div>

      {/* Scroll Hint */}
      <div className={`absolute bottom-8 right-8 flex items-center gap-4 transition-all duration-1000 delay-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
         <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Scroll for Timeline</span>
         <div className="p-3 bg-white border border-slate-200 rounded-full shadow-lg animate-pulse text-red-600">
            <ArrowRight size={20} />
         </div>
      </div>

      {/* Source Attribution */}
      <div className="absolute bottom-4 left-6 text-[10px] text-slate-400 font-mono bg-white/50 px-2 py-1 rounded">
        Source: NYSERDA Heat Pump Program & CLCPA Legislation
      </div>

    </div>
  );
};

interface TimelineCardProps {
    data: {
        year: string;
        title: string;
        desc: string;
        icon: React.FC<any>;
        phase: string;
        align: string;
    };
    active: boolean;
    delay: number;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ data, active, delay }) => {
    const Icon = data.icon;
    const isTop = data.align === 'top';

    return (
        <div 
          className={`relative w-80 flex flex-col items-center group ${isTop ? 'mb-40' : 'mt-40'} transition-all duration-700 transform ${active ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4'}`} 
          style={{ transitionDelay: `${delay}ms` }}
        >
            
            {/* The Dot on the Axis */}
            <div className={`absolute left-1/2 ${isTop ? 'bottom-[-5.5rem]' : 'top-[-5.5rem]'} -translate-x-1/2 w-6 h-6 rounded-full border-4 border-[#f4f4f5] transition-all duration-500 z-20 ${active ? 'bg-red-600 scale-125 shadow-[0_0_15px_rgba(220,38,38,0.6)]' : 'bg-slate-300 scale-100'}`} />

            {/* Connection Line */}
            <div 
              className={`absolute left-1/2 -translate-x-1/2 w-1 transition-all duration-1000 z-0
                ${isTop ? 'bottom-[-5rem] origin-bottom' : 'top-[-5rem] origin-top'}
                ${isTop ? 'h-20' : 'h-20'}
                ${active ? 'bg-gradient-to-b from-red-600 to-red-400 opacity-100 scale-y-100' : 'bg-slate-200 opacity-50 scale-y-0'}
              `}
            />

            {/* The Card */}
            <div className={`
                relative bg-white rounded-2xl p-6 w-full border border-slate-100 shadow-lg 
                transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-red-100 group
                ${active ? 'grayscale-0' : 'grayscale'}
            `}>
                <div className="flex justify-between items-start mb-4">
                    <span className={`text-4xl font-black tracking-tighter transition-colors ${active ? 'text-slate-900' : 'text-slate-300'}`}>
                      {data.year}
                    </span>
                    <div className={`p-3 rounded-xl transition-colors ${active ? 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white' : 'bg-slate-50 text-slate-300'}`}>
                        <Icon size={24} />
                    </div>
                </div>

                <div className="mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{data.phase}</span>
                    <h3 className="text-xl font-black text-slate-900 uppercase leading-none mt-1">{data.title}</h3>
                </div>

                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    {data.desc}
                </p>
            </div>
        </div>
    );
};
