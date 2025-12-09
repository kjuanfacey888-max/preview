import React from 'react';
import { SlideProps } from '../../types';
import { Wind, Zap, Smartphone, Clock } from 'lucide-react';

export const ProductSpecsSlide: React.FC<SlideProps> = ({ isActive }) => {
  return (
    <div className={`relative w-full h-full bg-[#f4f4f5] overflow-hidden transition-opacity duration-700 font-sans ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
      
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-200/50 -skew-x-12 translate-x-1/4" />

      <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
        
        {/* Title Section */}
        <div className={`text-center mb-8 transition-all duration-700 transform ${isActive ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
           <h2 className="text-[4rem] md:text-[6rem] font-black text-slate-900 tracking-tighter leading-none uppercase">
             The <span className="text-red-600">Hardware</span>
           </h2>
           <div className="inline-block bg-slate-900 text-white px-4 py-1 mt-2 text-sm font-bold uppercase tracking-widest">
             Model X-2000 Series
           </div>
        </div>

        {/* Central Content */}
        <div className="relative flex items-center justify-center h-[60vh]">
            
            {/* The Unit (Center 3D Embed) */}
            <div className={`relative z-20 w-full max-w-lg aspect-square md:aspect-video lg:aspect-square transition-all duration-1000 delay-300 transform ${isActive ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                <div className="sketchfab-embed-wrapper w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-900 bg-white">
                  <iframe 
                    title="Window Air Conditioner" 
                    className="w-full h-full"
                    frameBorder="0" 
                    allowFullScreen 
                    allow="autoplay; fullscreen; xr-spatial-tracking" 
                    src="https://sketchfab.com/models/38178d0bfc504fe8bc6a03e2e09fd8d0/embed?autostart=1&ui_theme=dark&dnt=1">
                  </iframe>
                </div>
            </div>

            {/* Spec Cards */}
            <SpecCard icon={Zap} label="Inverter Tech" sub="Variable Speed" position="top-10 left-4 md:left-20" align="left" isActive={isActive} delay={500} />
            <SpecCard icon={Clock} label="15-Min Install" sub="No Tools Needed" position="bottom-20 left-4 md:left-20" align="left" isActive={isActive} delay={600} />
            <SpecCard icon={Smartphone} label="App Control" sub="Wifi Integrated" position="top-10 right-4 md:right-20" align="right" isActive={isActive} delay={500} />
            <SpecCard icon={Wind} label="Whisper Quiet" sub="42dB Operation" position="bottom-20 right-4 md:right-20" align="right" isActive={isActive} delay={600} />

        </div>
      </div>
    </div>
  );
};

const SpecCard = ({ icon: Icon, label, sub, position, align, isActive, delay }: any) => (
    <div className={`absolute ${position} transition-all duration-700 transform ${isActive ? 'translate-x-0 opacity-100' : (align === 'left' ? '-translate-x-20' : 'translate-x-20') + ' opacity-0'}`} style={{ transitionDelay: `${delay}ms` }}>
        <div className={`bg-white p-6 rounded-none border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}>
            <div className="flex items-center gap-3 mb-2 text-red-600">
                <Icon size={24} />
                <span className="font-bold uppercase text-xs tracking-widest text-slate-400">Feature</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase leading-none">{label}</h3>
            <p className="text-sm text-gray-500 font-medium mt-1">{sub}</p>
        </div>
    </div>
);