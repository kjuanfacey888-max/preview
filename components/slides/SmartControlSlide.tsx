import React from 'react';
import { SlideProps } from '../../types';
import { Smartphone, Wifi, Thermometer, Clock, Zap } from 'lucide-react';

export const SmartControlSlide: React.FC<SlideProps> = ({ isActive }) => {
  return (
    <div className={`relative w-full h-full bg-[#f4f4f5] overflow-hidden transition-opacity duration-700 flex items-center justify-center ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
      
      {/* Background Graphic */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-slate-200 skew-y-6 transform origin-bottom-left" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
        
        {/* Text Content */}
        <div className={`w-full md:w-1/2 space-y-8 transition-all duration-700 delay-300 ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
           <h2 className="text-[5rem] font-black text-slate-900 leading-[0.85] tracking-tighter uppercase">
             Total<br/>
             <span className="text-red-600">Control.</span>
           </h2>
           
           <div className="w-24 h-4 bg-slate-900" />
           
           <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-md">
             Manage your home's climate from anywhere. Precision scheduling, zone settings, and energy monitoring at your fingertips.
           </p>
           
           <div className="flex gap-4 pt-4">
              <Badge icon={Wifi} text="Remote Access" />
              <Badge icon={Thermometer} text="Precision Temp" />
           </div>
        </div>

        {/* Visual Composition */}
        <div className={`w-full md:w-1/2 relative h-[600px] flex items-center justify-center transition-all duration-1000 delay-500 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
           
           {/* Background Card */}
           <div className="absolute right-10 top-10 w-[80%] h-[500px] bg-slate-900 rounded-[2rem] shadow-2xl rotate-6 border-4 border-white overflow-hidden">
               <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-500 via-gray-900 to-black" />
           </div>

           {/* Phone Mockup */}
           <div className="relative z-20 w-[300px] h-[580px] bg-white rounded-[3rem] border-8 border-slate-900 shadow-2xl overflow-hidden -rotate-3">
              {/* App UI */}
              <div className="w-full h-full bg-[#f4f4f5] relative flex flex-col">
                 <div className="p-8 pt-12 flex-1">
                    <div className="flex justify-between items-center mb-8">
                       <span className="font-bold text-slate-400 uppercase tracking-wider text-xs">Living Room</span>
                       <div className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                    
                    <div className="text-center my-12">
                       <div className="text-[5rem] font-black text-slate-900 leading-none">72°</div>
                       <div className="text-red-600 font-bold uppercase tracking-widest mt-2">Heating</div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4">
                       <div className="flex justify-between text-sm font-bold text-slate-600 mb-2">
                          <span>Target</span>
                          <span>72°</span>
                       </div>
                       <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full w-2/3 bg-red-600" />
                       </div>
                    </div>
                 </div>

                 {/* Bottom Nav */}
                 <div className="bg-white border-t border-gray-200 p-6 flex justify-between">
                    <Smartphone className="text-red-600" />
                    <Clock className="text-gray-300" />
                    <Zap className="text-gray-300" />
                 </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};

const Badge = ({ icon: Icon, text }: any) => (
    <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-3 rounded-xl shadow-sm">
        <Icon size={20} className="text-red-600" />
        <span className="font-bold text-slate-900 text-sm uppercase">{text}</span>
    </div>
);