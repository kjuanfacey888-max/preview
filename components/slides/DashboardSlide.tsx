import React, { useState, useEffect } from 'react';
import { SlideProps } from '../../types';
import { Power, Moon, Zap, Cloud, Thermometer, Activity, ToggleRight, ToggleLeft } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, CartesianGrid } from 'recharts';

// Initial data for the chart
const generateInitialData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i}:00`,
      heating: Math.floor(Math.random() * 40) + 10,
      cooling: Math.floor(Math.random() * 30) + 5,
    });
  }
  return data;
};

export const DashboardSlide: React.FC<SlideProps> = ({ isActive }) => {
  const [toggles, setToggles] = useState({ master: true, eco: false });
  const [chartData, setChartData] = useState(generateInitialData());
  const [stats, setStats] = useState({
    savings: 2.50,
    co2: 1.8,
    temp: 71,
  });

  // Simulate live data updates
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev.slice(1)];
        const lastTime = parseInt(prev[prev.length - 1].time.split(':')[0]);
        const nextTime = (lastTime + 1) % 24;
        
        newData.push({
          time: `${nextTime}:00`,
          heating: Math.max(10, Math.min(80, prev[prev.length - 1].heating + (Math.random() * 20 - 10))),
          cooling: Math.max(5, Math.min(60, prev[prev.length - 1].cooling + (Math.random() * 15 - 7.5))),
        });
        return newData;
      });

      // Randomize stats slightly
      setStats(prev => ({
        savings: prev.savings + 0.01,
        co2: Math.max(1.5, prev.co2 + (Math.random() * 0.1 - 0.05)),
        temp: 71 + (Math.random() > 0.5 ? 1 : 0), // Fluctuate temp slightly
      }));

    }, 2000);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className={`relative w-full h-full bg-[#f4f4f5] overflow-hidden transition-opacity duration-700 flex items-center justify-center font-sans ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
      
      <div className="container mx-auto px-6 h-full flex flex-col justify-center max-w-7xl">
        
        {/* Header */}
        <div className={`mb-6 md:mb-10 transition-all duration-700 ${isActive ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
            <p className="text-red-600 font-bold tracking-widest uppercase mb-2 text-xs md:text-sm">Central Command</p>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-none uppercase tracking-tighter">
                System Overview
            </h2>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[55vh] mb-6">
            
            {/* Visual Card (Left) */}
            <div className={`md:col-span-4 bg-slate-900 rounded-3xl p-6 relative overflow-hidden transition-all duration-700 delay-200 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                <div className="absolute inset-0 opacity-60">
                    <img 
                        src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                        alt="Modern Living Room" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-900" />
                
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                    <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Live Feed
                    </div>
                </div>

                <div className="absolute bottom-6 left-6 text-white relative z-10">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-1">Living Room</h3>
                    <p className="text-gray-300 font-medium text-sm">Target: 72°F • Humidity: 45%</p>
                </div>
            </div>

            {/* Right Column: Settings & Chart */}
            <div className="md:col-span-8 flex flex-col gap-6">
                
                {/* Quick Settings */}
                <div className={`h-auto md:h-1/3 bg-white rounded-3xl border border-gray-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700 delay-300 ${isActive ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                    <div className="w-full">
                        <h3 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-4">Quick Settings</h3>
                        <div className="flex flex-col md:flex-row gap-4">
                             {/* Master Power Toggle */}
                            <div 
                                className={`flex-1 flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${toggles.master ? 'border-red-100 bg-red-50' : 'border-gray-100 bg-gray-50'}`}
                                onClick={() => setToggles(p => ({ ...p, master: !p.master }))}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${toggles.master ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                        <Power size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 uppercase text-sm">Master Power</h4>
                                        <p className="text-xs text-gray-500">{toggles.master ? 'System Active' : 'System Off'}</p>
                                    </div>
                                </div>
                                {toggles.master 
                                    ? <ToggleRight size={40} className="text-red-600" /> 
                                    : <ToggleLeft size={40} className="text-gray-300" />
                                }
                            </div>

                             {/* Eco Mode Toggle */}
                             <div 
                                className={`flex-1 flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${toggles.eco ? 'border-green-100 bg-green-50' : 'border-gray-100 bg-gray-50'}`}
                                onClick={() => setToggles(p => ({ ...p, eco: !p.eco }))}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${toggles.eco ? 'bg-slate-900 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                        <Moon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 uppercase text-sm">Eco Mode</h4>
                                        <p className="text-xs text-gray-500">{toggles.eco ? 'Enabled' : 'Disabled'}</p>
                                    </div>
                                </div>
                                {toggles.eco 
                                    ? <ToggleRight size={40} className="text-slate-900" /> 
                                    : <ToggleLeft size={40} className="text-gray-300" />
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* Energy Chart */}
                <div className={`flex-1 bg-white rounded-3xl border border-gray-200 p-6 transition-all duration-700 delay-400 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold uppercase text-gray-400 tracking-wider">Energy Usage & Performance (Last 24h)</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <span className="text-xs font-bold text-slate-600">Heating (kWh)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-slate-900" />
                                <span className="text-xs font-bold text-slate-600">Cooling (kWh)</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="time" hide />
                                <YAxis hide domain={[0, 100]} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="heating" 
                                    stroke="#dc2626" 
                                    strokeWidth={3} 
                                    dot={false}
                                    animationDuration={500}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="cooling" 
                                    stroke="#0f172a" 
                                    strokeWidth={3} 
                                    dot={false}
                                    animationDuration={500}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>

        {/* Bottom Stats Row */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 transition-all duration-1000 delay-500 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <StatCard icon={Zap} label="Daily Savings" value={`$${stats.savings.toFixed(2)}`} color="red" />
            <StatCard icon={Cloud} label="CO2 Reduction" value={`${stats.co2.toFixed(1)}kg`} color="blue" />
            <StatCard icon={Thermometer} label="Avg. Temp" value={`${stats.temp}°F`} color="red" />
            <SystemHealthCard />
        </div>

      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: any) => {
    const bgColors: any = {
        red: 'bg-red-50 text-red-600',
        blue: 'bg-blue-50 text-blue-600',
        slate: 'bg-slate-50 text-slate-900'
    };

    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${bgColors[color]}`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                <p className="text-xl md:text-2xl font-black text-slate-900">{value}</p>
            </div>
        </div>
    );
}

const SystemHealthCard = () => (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className="p-3 rounded-xl bg-green-50 text-green-600 relative">
            <Activity size={24} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-ping" />
        </div>
        <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">System Health</p>
            <p className="text-xl md:text-2xl font-black text-slate-900 uppercase">Optimal</p>
        </div>
    </div>
);