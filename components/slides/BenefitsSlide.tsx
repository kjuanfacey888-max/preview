import React from 'react';
import { SlideProps } from '../../types';
import { Twitter, Instagram, Facebook, Linkedin, ArrowRight } from 'lucide-react';

export const BenefitsSlide: React.FC<SlideProps> = ({ isActive }) => {
  return (
    <div className={`relative w-full h-full bg-[#f4f4f5] text-slate-900 overflow-hidden transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
       
       <div className="container mx-auto px-8 md:px-12 h-full flex flex-col md:flex-row items-start pt-24 gap-12">
          
          {/* Left Title Area */}
          <div className={`w-full md:w-1/3 transition-all duration-1000 transform ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <h2 className="text-[5rem] md:text-[7rem] font-black tracking-tighter mb-8 leading-[0.85] uppercase">
                  Why <br/>
                  <span className="text-red-600">Switch?</span>
              </h2>
              
              <div className="flex gap-4 mb-12">
                 {[Twitter, Instagram, Facebook, Linkedin].map((Icon, i) => (
                   <div key={i} className="p-3 bg-slate-900 text-white rounded-full hover:bg-red-600 transition-colors cursor-pointer">
                      <Icon className="w-5 h-5" />
                   </div>
                 ))}
              </div>
              
              <p className="text-gray-400 font-mono text-xs tracking-widest uppercase">fullcycle.com/benefits</p>
          </div>

          {/* Right Columns Area - Grid Layout */}
          <div className="flex-1 w-full grid grid-cols-2 gap-4 h-[60vh] pb-8 content-start">
              <BenefitCard 
                title="Efficiency" 
                stat="300%"
                desc="Heat Pump Tech"
                isActive={isActive} 
                delay={200} 
              />
              <BenefitCard 
                title="Savings" 
                stat="$800+"
                desc="Annual Avg Savings"
                isActive={isActive} 
                delay={300} 
              />
              <BenefitCard 
                title="Control" 
                stat="App"
                desc="Remote Management"
                isActive={isActive} 
                delay={400} 
              />
              <BenefitCard 
                title="Comfort" 
                stat="Silent"
                desc="No more radiator clank"
                isActive={isActive} 
                delay={500} 
              />
          </div>
       </div>
    </div>
  )
}

const BenefitCard = ({ title, stat, desc, isActive, delay }: { title: string, stat: string, desc: string, isActive: boolean, delay: number }) => {
    return (
        <div 
          className={`group relative bg-white border-2 border-slate-900 p-8 rounded-3xl hover:bg-slate-900 transition-all duration-500`}
          style={{ transitionDelay: `${delay}ms`, opacity: isActive ? 1 : 0, transform: isActive ? 'translateY(0)' : 'translateY(50px)' }}
        >
             <div className="flex justify-between items-start mb-4">
               <h3 className="text-lg font-bold uppercase tracking-wide text-gray-500 group-hover:text-gray-400">{title}</h3>
               <ArrowRight className="text-red-600 group-hover:text-white transition-colors" />
             </div>
             
             <div className="text-5xl font-black text-slate-900 group-hover:text-white mb-2 tracking-tighter">{stat}</div>
             <p className="text-slate-600 font-medium group-hover:text-gray-300">{desc}</p>
        </div>
    )
}