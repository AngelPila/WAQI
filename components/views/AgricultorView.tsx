import React, { useState } from 'react';
import { User, CloudRain, Sun, Wind, Droplets, Plus, Sprout, ChevronRight, ArrowLeft, Calendar, FileText, CheckCircle2, MessageSquare, Edit3 } from 'lucide-react';
import { AgroScoreGauge } from '../ui/AgroScoreGauge';
import { CommunityFeed } from '../shared/CommunityFeed';
import { Crop } from '../../types';

type ViewState = 'dashboard' | 'score-detail' | 'add-crop' | 'notebook';

const CROPS_DATA: Crop[] = [
  { id: 1, name: 'Maíz Híbrido', area: '15 ha', status: 'Crecimiento', progress: 65, score: 8.5 },
  { id: 2, name: 'Soya', area: '8 ha', status: 'Siembra', progress: 10, score: 9.2 },
];

export const AgricultorView: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');

  // --- SUB-VIEWS ---

  const ScoreDetail = () => (
    <div className="animate-in slide-in-from-right pb-24 bg-gray-50 min-h-full">
      <div className="bg-white px-6 pt-12 pb-6 shadow-sm mb-4">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => setView('dashboard')} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold">Detalle AgroScore</h2>
        </div>
        
        <div className="flex justify-center mb-2">
           <AgroScoreGauge score={979} maxScore={1000} size={240} variant="full" />
        </div>
      </div>

      <div className="px-6 space-y-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold mb-4 text-gray-900">Breakdown del Puntaje</h3>
          <div className="space-y-4">
            {[
              { label: 'Historial Productivo', val: 'Excelente', score: 98, color: 'bg-green-500' },
              { label: 'Salud Financiera', val: 'Bueno', score: 85, color: 'bg-lime-500' },
              { label: 'Riesgo de Zona', val: 'Bajo', score: 92, color: 'bg-emerald-500' },
              { label: 'Validación de Tierras', val: 'Verificado', score: 100, color: 'bg-green-600' }
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-bold text-gray-900">{item.score}/100</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: item.score + '%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
          <h3 className="font-bold text-blue-900 text-sm mb-3 flex items-center gap-2">
            <CheckCircle2 size={18} /> Tips para mejorar
          </h3>
          <ul className="space-y-2">
             <li className="flex gap-2 text-sm text-blue-800">
                <span className="text-blue-500">•</span> Registra tus facturas de insumos pendientes.
             </li>
             <li className="flex gap-2 text-sm text-blue-800">
                <span className="text-blue-500">•</span> Actualiza el estado de tu cultivo de Soya.
             </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const AddCropForm = () => (
    <div className="animate-in slide-in-from-right pb-24 bg-white min-h-full">
      <div className="px-6 pt-12 pb-6 border-b border-gray-100 mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('dashboard')} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold">Registrar Cultivo</h2>
        </div>
      </div>

      <form className="px-6 space-y-5" onSubmit={(e) => { e.preventDefault(); setView('dashboard'); }}>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de Cultivo</label>
          <select className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-lime-500 focus:outline-none text-gray-700 appearance-none">
            <option>Seleccionar cultivo...</option>
            <option>Maíz</option>
            <option>Arroz</option>
            <option>Cacao</option>
            <option>Soya</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Área (Has)</label>
            <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-lime-500 outline-none" placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Estimado</label>
            <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-lime-500 outline-none" placeholder="qq" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Fecha de Siembra</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-4 text-gray-400" size={20} />
            <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 pl-12 focus:ring-2 focus:ring-lime-500 outline-none" />
          </div>
        </div>

        <div className="bg-lime-50 p-4 rounded-xl border border-lime-100 flex items-center justify-between">
          <div>
            <span className="font-bold text-lime-900 block">Publicar en Marketplace</span>
            <span className="text-xs text-lime-700">Visible para compradores verificados</span>
          </div>
          <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
            <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-lime-500"/>
            <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer checked:bg-lime-500"></label>
          </div>
        </div>

        <button className="w-full bg-lime-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-lime-200 hover:bg-lime-700 transition-colors mt-4">
          Guardar Cultivo
        </button>
      </form>
    </div>
  );

  const NotebookView = () => (
     <div className="animate-in slide-in-from-right pb-24 bg-gray-50 min-h-full">
        <div className="px-6 pt-12 pb-6 bg-white border-b border-gray-100 mb-4 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setView('dashboard')} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold">Cuaderno de Campo</h2>
          </div>
        </div>
        
        <div className="px-6 space-y-4">
           {/* Date Group */}
           <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Hoy</h3>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                 <div className="flex gap-3">
                    <div className="bg-lime-100 p-2 rounded-lg text-lime-700 h-fit"><Sprout size={18} /></div>
                    <div>
                       <p className="font-bold text-gray-800 text-sm">Registro de Fertilización</p>
                       <p className="text-xs text-gray-500 mt-1">Aplicación de Urea en Lote Maíz #2. 50kg/ha.</p>
                    </div>
                 </div>
              </div>
           </div>

           <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ayer</h3>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                 <div className="flex gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-700 h-fit"><CloudRain size={18} /></div>
                    <div>
                       <p className="font-bold text-gray-800 text-sm">Lluvia Intensa</p>
                       <p className="text-xs text-gray-500 mt-1">15mm registrados. Se suspendió riego.</p>
                    </div>
                 </div>
              </div>
           </div>

           <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 font-medium hover:border-lime-500 hover:text-lime-600 transition-colors flex items-center justify-center gap-2">
              <Plus size={18}/> Agregar Nota
           </button>
        </div>
     </div>
  );

  // --- MAIN DASHBOARD ---

  return (
    <div className="min-h-full bg-gray-50 relative">
      {/* Header */}
      {view === 'dashboard' && (
        <>
          <header className="px-6 pt-12 pb-6 flex justify-between items-center bg-white sticky top-0 z-20 border-b border-gray-50">
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">Bienvenido</p>
              <h1 className="text-2xl font-bold text-gray-900">Sebastián</h1>
            </div>
            <div className="h-10 w-10 bg-lime-50 rounded-full flex items-center justify-center border border-lime-200">
              <User size={20} className="text-lime-700" />
            </div>
          </header>

          <main className="px-6 pt-6 space-y-6 pb-24">
            {/* Score Card */}
            <AgroScoreGauge 
              score={979} 
              maxScore={1000} 
              onClick={() => setView('score-detail')}
            />

            {/* Weather Widget */}
            <div className="bg-gradient-to-br from-lime-500 to-green-600 rounded-3xl p-5 text-white shadow-lg shadow-lime-200/50 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <p className="opacity-90 text-sm font-medium flex items-center gap-1"><User size={12}/> Finca "La Fortuna"</p>
                  <h2 className="text-4xl font-bold mt-2">24° <span className="text-lg font-normal opacity-80">Nublado</span></h2>
                </div>
                <Sun size={40} className="text-yellow-300 animate-pulse" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs font-medium bg-white/10 p-3 rounded-2xl backdrop-blur-sm relative z-10">
                <div className="flex flex-col items-center gap-1"><Droplets size={16}/> <span>65%</span></div>
                <div className="flex flex-col items-center gap-1"><CloudRain size={16}/> <span>10mm</span></div>
                <div className="flex flex-col items-center gap-1"><Wind size={16}/> <span>12km</span></div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setView('add-crop')} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:bg-gray-50 active:scale-95 transition-all">
                <div className="bg-lime-50 p-3 rounded-full text-lime-600"><Plus size={24}/></div>
                <span className="text-xs font-bold text-gray-700">Registrar Cultivo</span>
              </button>
              <button onClick={() => setView('notebook')} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:bg-gray-50 active:scale-95 transition-all">
                <div className="bg-blue-50 p-3 rounded-full text-blue-600"><FileText size={24}/></div>
                <span className="text-xs font-bold text-gray-700">Cuaderno Campo</span>
              </button>
            </div>

            {/* Crops List */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-lg text-gray-800">Mis Cultivos</h3>
                <span className="text-xs text-lime-600 font-bold">Ver todos</span>
              </div>
              <div className="space-y-3">
                {CROPS_DATA.map(crop => (
                  <div key={crop.id} className="bg-white border border-gray-100 p-4 rounded-3xl shadow-sm flex justify-between items-center active:scale-[0.98] transition-transform">
                    <div className="flex items-center gap-4">
                      <div className="bg-lime-50 h-12 w-12 rounded-2xl flex items-center justify-center text-lime-600">
                        <Sprout size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{crop.name}</h4>
                        <p className="text-xs text-gray-500 font-medium">{crop.area} • {crop.status}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-end gap-1">
                         <span className="text-xs font-bold text-gray-400">{crop.progress}%</span>
                         <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                           <div className="h-full bg-lime-500" style={{ width: `${crop.progress}%` }}></div>
                         </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
             {/* Prices Ticker (Mock) */}
            <div className="overflow-x-auto no-scrollbar pb-2 -mx-6 px-6">
               <div className="flex gap-4">
                  {[{n:'Maíz', p:'$18.5'}, {n:'Cacao', p:'$145'}, {n:'Soya', p:'$22'}, {n:'Arroz', p:'$32'}].map((p,i) => (
                     <div key={i} className="bg-white border border-gray-100 px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap">
                        <span className="text-xs text-gray-500">{p.n}</span>
                        <span className="text-sm font-bold text-gray-900">{p.p}</span>
                     </div>
                  ))}
               </div>
            </div>

          </main>
        </>
      )}

      {view === 'score-detail' && <ScoreDetail />}
      {view === 'add-crop' && <AddCropForm />}
      {view === 'notebook' && <NotebookView />}
    </div>
  );
};