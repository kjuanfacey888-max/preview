import React, { useEffect, useState } from 'react';
import { SlideProps } from '../../types';
import { Timer, ArrowRight, Calculator, DollarSign } from 'lucide-react';

export const OfferSlide: React.FC<SlideProps> = ({ isActive }) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className={`relative w-full h-full bg-[#f4f4f5] flex items-center justify-center overflow-hidden transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      
      {/* Background Strips */}
      <div className="absolute inset-0 flex">
          <div className="w-1/3 h-full bg-slate-100" />
          <div className="w-1/3 h-full bg-white" />
          <div className="w-1/3 h-full bg-slate-100" />
      </div>

      {/* Main Container */}
      <div className={`relative z-10 w-[95%] max-w-7xl flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-16 transition-all duration-1000 ease-spring ${isActive ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-[100px] scale-90 opacity-0'}`}>
        
        {/* Left Column: Visuals & Calculator */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
            
            {/* The Discount Badge */}
            <div className="relative bg-white border-4 border-slate-900 p-8 md:p-10 shadow-[10px_10px_0px_0px_rgba(220,38,38,1)] flex items-center justify-between overflow-hidden group hover:-translate-y-1 transition-transform">
                {/* Spinning Text Badge */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center animate-spin-slow z-20 shadow-xl border-4 border-white">
                   <span className="text-white font-black text-[10px] uppercase text-center leading-tight">Limited<br/>Time<br/>Offer</span>
                </div>
                
                <div>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-2">On-Site Exclusive</p>
                    <div className="flex items-baseline leading-none">
                        <span className="text-[6rem] md:text-[8rem] font-black text-slate-900 tracking-tighter">20</span>
                        <div className="flex flex-col ml-2">
                            <span className="text-4xl md:text-5xl font-black text-slate-900">%</span>
                            <span className="text-4xl md:text-5xl font-black text-red-600">OFF</span>
                        </div>
                    </div>
                    <p className="mt-2 font-bold text-slate-900 bg-red-100 inline-block px-2 py-1 uppercase text-xs tracking-wider">Total Installation Cost</p>
                </div>
            </div>

            {/* Savings Calculator */}
            <SavingsCalculator />

        </div>

        {/* Right Side: Urgency & Action */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8">
            
            <div>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] uppercase tracking-tighter mb-4">
                    Upgrade Now.<br/>
                    <span className="text-red-600">Save Forever.</span>
                </h2>
                <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-md border-l-4 border-slate-900 pl-6">
                    Lock in your 20% discount and start saving on monthly bills immediately. Valid only during consultation.
                </p>
            </div>

            {/* Timer Card */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl flex items-center justify-between border-4 border-slate-900 shadow-2xl transform transition-transform hover:scale-[1.02]">
                <div className="flex items-center gap-6">
                    <div className="p-3 bg-white/10 rounded-xl animate-pulse">
                        <Timer size={32} className="text-red-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Offer Expires In</span>
                        <span className="font-mono text-4xl md:text-5xl font-bold tracking-widest tabular-nums text-red-500">
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-red-600 hover:bg-red-700 text-white text-2xl font-black uppercase tracking-widest py-8 rounded-xl shadow-[0_20px_40px_-15px_rgba(220,38,38,0.5)] transition-all hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(220,38,38,0.6)] flex items-center justify-center gap-4 group relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-3">
                    Claim Discount <ArrowRight className="group-hover:translate-x-2 transition-transform" strokeWidth={3} />
                </span>
            </button>
            
        </div>

      </div>
    </div>
  );
};

const SavingsCalculator = () => {
    const [monthlyBill, setMonthlyBill] = useState(250);
    const annualSavings = Math.floor(monthlyBill * 12 * 0.4); // Assuming 40% savings
    const tenYearSavings = annualSavings * 10;

    return (
        <div className="bg-slate-50 border-2 border-slate-200 p-6 md:p-8 rounded-3xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-200 rounded-lg text-slate-700">
                    <Calculator size={20} />
                </div>
                <h3 className="font-black text-slate-900 uppercase tracking-wider text-sm">Quick Savings Estimator</h3>
            </div>

            <div className="mb-8">
                <div className="flex justify-between text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                    <span>Avg. Monthly Bill</span>
                    <span className="text-slate-900">${monthlyBill}</span>
                </div>
                <input 
                    type="range" 
                    min="100" 
                    max="1000" 
                    step="10" 
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(parseInt(e.target.value))}
                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-xs font-bold text-slate-400 mt-2">
                    <span>$100</span>
                    <span>$1000+</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Annual Savings</p>
                    <p className="text-2xl font-black text-slate-900 flex items-center">
                        <DollarSign size={18} className="text-green-500" strokeWidth={3} />
                        {annualSavings.toLocaleString()}
                    </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-900 shadow-sm text-white">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">10-Year ROI</p>
                    <p className="text-2xl font-black text-white flex items-center">
                        <DollarSign size={18} className="text-red-500" strokeWidth={3} />
                        {tenYearSavings.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
};