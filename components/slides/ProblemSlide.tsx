import React from 'react';
import { SlideProps } from '../../types';
import { ThermometerSun, AlertTriangle, DollarSign } from 'lucide-react';

export const ProblemSlide: React.FC<SlideProps> = ({ isActive }) => {
  return (
    <div className={`relative w-full h-full bg-[#f4f4f5] text-slate-900 overflow-hidden transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
      
      <div className="container mx-auto px-6 z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
        
        {/* Left Content */}
        <div className={`transition-all duration-700 delay-300 transform ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
          <p className="text-red-600 font-bold tracking-widest uppercase mb-4">Current Situation</p>
          <h2 className="text-[5rem] md:text-[7rem] font-black leading-[0.85] tracking-tighter mb-8 uppercase text-slate-900">
            The <br/>
            <span className="text-red-600 line-through decoration-8 decoration-black">Boiler</span> <br/>
            Trap.
          </h2>
          
          <div className="space-y-6 mt-12 border-l-4 border-slate-900 pl-8">
            <div className="group">
              <h3 className="text-2xl font-bold mb-1 flex items-center gap-3">
                 <ThermometerSun className="text-red-600" />
                 Inconsistent Heat
              </h3>
              <p className="text-gray-500 font-medium max-w-md">Sweltering in January? Paying for heat that escapes through open windows?</p>
            </div>

            <div className="group">
              <h3 className="text-2xl font-bold mb-1 flex items-center gap-3">
                 <AlertTriangle className="text-red-600" />
                 Environmental Hazard
              </h3>
              <p className="text-gray-500 font-medium max-w-md">Old boilers are major contributors to NYC's carbon footprint.</p>
            </div>

            <div className="group">
              <h3 className="text-2xl font-bold mb-1 flex items-center gap-3">
                 <DollarSign className="text-red-600" />
                 Wasted Capital
              </h3>
              <p className="text-gray-500 font-medium max-w-md">Volatile fuel prices and 80% efficiency ratings are draining your wallet.</p>
            </div>
          </div>
        </div>

        {/* Right Visuals */}
        <div className={`relative h-[60vh] transition-all duration-1000 delay-500 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
           <div className="absolute top-4 right-4 w-full h-full border-4 border-slate-900 rounded-3xl z-0" />
           <div className="relative z-10 w-full h-full overflow-hidden rounded-3xl grayscale hover:grayscale-0 transition-all duration-500">
             <img 
              src="https://images.unsplash.com/photo-1565514020176-892265b63076?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Old rusty boiler pipes" 
              className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-red-600/20 mix-blend-multiply" />
             <div className="absolute bottom-0 left-0 bg-slate-900 text-white p-6">
                <p className="font-mono text-sm uppercase tracking-widest text-red-500 mb-1">Status</p>
                <p className="text-3xl font-bold uppercase">Obsolete</p>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};