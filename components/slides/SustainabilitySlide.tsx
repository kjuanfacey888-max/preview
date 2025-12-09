import React from 'react';
import { SlideProps } from '../../types';
import { Leaf } from 'lucide-react';

export const SustainabilitySlide: React.FC<SlideProps> = ({ isActive }) => {
  return (
    <div className={`relative w-full h-full bg-[#f4f4f5] overflow-hidden transition-opacity duration-700 flex items-center justify-center font-sans ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
      
      {/* Central Content */}
      <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center gap-12 relative z-10">
        
        {/* Left Stats */}
        <div className={`w-full md:w-1/3 text-center md:text-right transition-all duration-1000 delay-300 ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <h2 className="text-[6rem] font-black text-slate-900 mb-0 leading-none tracking-tighter">100<span className="text-4xl align-top">%</span></h2>
            <h3 className="text-lg font-bold text-red-600 uppercase tracking-widest mb-4">Electric</h3>
            <p className="text-gray-500 font-medium">
                Disconnect from fossil fuels. Embrace the future.
            </p>
        </div>

        {/* Center Card Image */}
        <div className={`w-full md:w-1/3 h-[70vh] relative border-4 border-slate-900 overflow-hidden transition-all duration-1000 delay-200 transform ${isActive ? 'scale-100 translate-y-0' : 'scale-95 translate-y-20'}`}>
            <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Nature Mountains" 
                className="w-full h-full object-cover grayscale contrast-125"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-900/80" />
            <div className="absolute bottom-8 left-0 w-full text-center">
                <Leaf size={48} className="text-white mx-auto mb-4" />
                <span className="bg-white text-slate-900 px-4 py-1 font-black uppercase tracking-widest text-sm">Eco-Forward</span>
            </div>
        </div>

        {/* Right Stats */}
        <div className={`w-full md:w-1/3 text-center md:text-left transition-all duration-1000 delay-500 ${isActive ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <h2 className="text-[6rem] font-black text-slate-900 mb-0 leading-none tracking-tighter">40<span className="text-4xl align-top">%</span></h2>
            <h3 className="text-lg font-bold text-red-600 uppercase tracking-widest mb-4">Carbon Cut</h3>
            <p className="text-gray-500 font-medium">
                Meet NYC Local Law 97 requirements today.
            </p>
        </div>

      </div>

    </div>
  );
};