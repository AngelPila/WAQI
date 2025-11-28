import React, { useState } from 'react';
import { Activity, Sparkles, TrendingUp, ArrowUpRight, PieChart, ArrowLeft, Info, Wallet, ChevronRight } from 'lucide-react';
import { AreaChart, Area, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Project } from '../../types';
import { AgroScoreGauge } from '../ui/AgroScoreGauge';

const INVEST_DATA = [
  { name: 'Ene', price: 4000 }, { name: 'Feb', price: 3000 },
  { name: 'Mar', price: 2000 }, { name: 'Abr', price: 2780 },
  { name: 'May', price: 1890 }, { name: 'Jun', price: 2390 },
  { name: 'Jul', price: 3490 },
];

const INVEST_PROJECTS: Project[] = [
  { id: 1, title: 'Expansión Bananera', farmerName: 'Agricola Bananera SA', roi: '12-15%', risk: 'Bajo', amount: '$50k', funded: 75, score: 950, description: 'Expansión de 20 hectáreas de banano orgánico de exportación.' },
  { id: 2, title: 'Tecnificación Arrocera', farmerName: 'Coop. Arroz del Sur', roi: '18%', risk: 'Medio', amount: '$25k', funded: 30, score: 820, description: 'Implementación de sistema de riego por goteo para optimizar agua.' },
];

type ViewState = 'dashboard' | 'project-detail';

export const InversionistaView: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [investAmount, setInvestAmount] = useState(1000);

  const handleSelectProject = (p: Project) => {
    setSelectedProject(p);
    setView('project-detail');
  };

  const ProjectDetail = () => {
    if (!selectedProject) return null;
    return (
      <div className="bg-slate-900 min-h-screen text-white pb-24 animate-in slide-in-from-right">
        <header className="px-6 pt-12 pb-6 flex items-center gap-4">
          <button onClick={() => setView('dashboard')} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Detalle de Proyecto</h1>
        </header>

        <div className="px-6 space-y-6">
          <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
             <div className="flex justify-between mb-4">
                <div>
                   <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                   <p className="text-slate-400 text-sm">{selectedProject.farmerName}</p>
                </div>
                <div className="text-right">
                   <div className="text-3xl font-bold text-cyan-400">{selectedProject.roi}</div>
                   <div className="text-xs text-slate-500 uppercase">ROI Estimado</div>
                </div>
             </div>
             
             <div className="h-2 bg-slate-900 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400" style={{ width: `${selectedProject.funded}%` }}></div>
             </div>
             <div className="flex justify-between text-xs text-slate-400">
                <span>Financiado: {selectedProject.funded}%</span>
                <span>Meta: {selectedProject.amount}</span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                <span className="text-slate-500 text-xs block mb-1">Risk Score</span>
                <span className={`text-xl font-bold ${selectedProject.score > 900 ? 'text-green-400' : 'text-yellow-400'}`}>{selectedProject.score}</span>
             </div>
             <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                <span className="text-slate-500 text-xs block mb-1">Nivel Riesgo</span>
                <span className="text-xl font-bold text-white">{selectedProject.risk}</span>
             </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
             <h3 className="font-bold mb-4 flex items-center gap-2"><Wallet size={18}/> Simulador de Inversión</h3>
             
             <div className="mb-6">
                <label className="text-xs text-slate-400 mb-2 block">Monto a Invertir: ${investAmount}</label>
                <input 
                  type="range" 
                  min="500" 
                  max="10000" 
                  step="500"
                  value={investAmount} 
                  onChange={(e) => setInvestAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
             </div>

             <div className="flex justify-between items-center p-4 bg-slate-900 rounded-xl">
                <span className="text-sm text-slate-400">Retorno Estimado (12m)</span>
                <span className="text-xl font-bold text-green-400">+${(investAmount * 0.15).toFixed(0)}</span>
             </div>

             <button className="w-full mt-6 bg-cyan-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-900/50 hover:bg-cyan-500 transition-colors">
                Invertir Ahora
             </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'project-detail') return <ProjectDetail />;

  return (
    <div className="min-h-full bg-slate-900 text-white pb-24 relative overflow-hidden">
       {/* Background Effects */}
       <div className="absolute top-0 left-0 w-full h-96 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <header className="relative z-10 px-6 pt-12 pb-6 flex justify-between items-center border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-wider">PORTFOLIO</h1>
          <p className="text-slate-400 text-xs uppercase tracking-widest flex items-center gap-1">Agro Risk Analytics <Sparkles size={10} className="text-cyan-400"/></p>
        </div>
        <div className="bg-slate-800 p-2 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-colors cursor-pointer">
           <Activity className="text-cyan-400" />
        </div>
      </header>

      <main className="relative z-10 px-6 py-6 space-y-8">
        
        {/* Graph Card */}
        <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-md rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-slate-400 text-sm">Valor Total Mercado</p>
              <h2 className="text-3xl font-bold text-white mt-1 flex items-center gap-2">
                $1.74T <span className="text-sm bg-green-500/20 text-green-400 px-2 py-0.5 rounded flex items-center gap-1"><ArrowUpRight size={12}/> 2.4%</span>
              </h2>
            </div>
          </div>
          
          <div className="h-48 w-full -ml-4">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={INVEST_DATA}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0891b2" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <RechartsTooltip cursor={{stroke: '#334155'}} contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}} />
                  <Area type="monotone" dataKey="price" stroke="#06b6d4" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} />
                </AreaChart>
             </ResponsiveContainer>
          </div>

          {/* WAQI AI Questions (CMC Style) */}
          <div className="mt-4 pt-4 border-t border-slate-700">
             <h4 className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-1"><Sparkles size={10} /> WAQI AI Insights</h4>
             <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {['¿Por qué sube el Cacao?', 'Análisis de Riesgo Arrocero', 'Previsión Q4'].map((q, i) => (
                   <button key={i} className="whitespace-nowrap bg-slate-700/50 hover:bg-cyan-900/30 border border-slate-600 hover:border-cyan-500/50 rounded-full px-3 py-1.5 text-xs text-slate-300 transition-colors">
                      {q}
                   </button>
                ))}
             </div>
          </div>
        </div>

        {/* Global Risk Score */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 flex flex-col items-center">
            <h3 className="text-slate-300 font-medium mb-4 w-full text-left flex items-center justify-between">
              Riesgo de Cartera <Info size={16} className="text-slate-500"/>
            </h3>
            <AgroScoreGauge score={890} maxScore={1000} size={220} variant="full" />
        </div>

        {/* Opportunities List */}
        <div>
          <h3 className="text-slate-300 font-medium mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-cyan-400"/> Proyectos Abiertos
          </h3>
          <div className="space-y-4">
            {INVEST_PROJECTS.map(proj => (
              <div key={proj.id} onClick={() => handleSelectProject(proj)} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex flex-col gap-3 hover:border-cyan-500/30 transition-colors cursor-pointer group active:scale-[0.98]">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="bg-blue-900/50 p-3 rounded-xl text-blue-400 h-fit">
                      <PieChart size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{proj.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">ROI Est: <span className="text-green-400">{proj.roi}</span> • Riesgo: <span className="text-yellow-400">{proj.risk}</span></p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-bold ${proj.score >= 900 ? 'text-green-400 bg-green-900/30' : 'text-yellow-400 bg-yellow-900/30'}`}>
                    {proj.score}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Meta: {proj.amount}</span>
                    <span>{proj.funded}% Financiado</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" style={{width: `${proj.funded}%`}}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};