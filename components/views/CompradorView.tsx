import React, { useState } from 'react';
import { ShoppingBag, Search, Filter, MapPin, Sparkles, ArrowLeft, Star, Phone, MessageCircle, User, ChevronRight } from 'lucide-react';
import { Listing } from '../../types';
import { AgroScoreGauge } from '../ui/AgroScoreGauge';
import { CommunityFeed } from '../shared/CommunityFeed';

const LISTINGS_DATA: Listing[] = [
  { id: 1, product: 'Maíz Amarillo Híbrido', farmer: 'Finca La Esperanza', location: 'Ventanas, Los Ríos', quantity: '50 Ton', price: '$18.5/qq', score: 950, imageIcon: '🌽', description: 'Maíz de alta calidad, secado en máquina. Humedad del 13%. Listo para entrega inmediata.', harvestDate: '20 Jun 2024' },
  { id: 2, product: 'Cacao CCN51 Fermentado', farmer: 'Agropecuaria San Juan', location: 'Machala, El Oro', quantity: '5 Ton', price: '$150/qq', score: 880, imageIcon: '🍫', description: 'Grano fermentado 85%, excelente aroma. Certificación orgánica en trámite.', harvestDate: '15 Jun 2024' },
  { id: 3, product: 'Soya para Procesar', farmer: 'Hnos. Garzón', location: 'Quevedo', quantity: '120 Ton', price: '$22/qq', score: 910, imageIcon: '🌱', description: 'Soya limpia, lista para extracción de aceite. Venta mínima 10 Ton.', harvestDate: '22 Jun 2024' },
];

type ViewState = 'marketplace' | 'detail' | 'producers';

export const CompradorView: React.FC = () => {
  const [view, setView] = useState<ViewState>('marketplace');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const handleSelectListing = (item: Listing) => {
    setSelectedListing(item);
    setView('detail');
  };

  const LotDetail = () => {
    if (!selectedListing) return null;
    return (
      <div className="bg-white min-h-screen pb-24 animate-in slide-in-from-right">
        {/* Detail Header */}
        <div className="relative h-72 bg-emerald-600 flex items-center justify-center text-9xl">
          {selectedListing.imageIcon}
          <button onClick={() => setView('marketplace')} className="absolute top-12 left-6 p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/30">
            <ArrowLeft size={24} />
          </button>
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
            <div className="flex justify-between items-end">
               <div>
                  <span className="bg-emerald-500 px-2 py-1 rounded text-[10px] font-bold mb-2 inline-block uppercase tracking-wide">Verificado</span>
                  <h1 className="text-3xl font-bold leading-tight mb-1">{selectedListing.product}</h1>
                  <p className="flex items-center gap-1 opacity-90 text-sm"><MapPin size={14}/> {selectedListing.location}</p>
               </div>
               <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-1 flex flex-col items-center">
                   <span className="text-xs opacity-80">AgroScore</span>
                   <span className="font-bold text-lg">{selectedListing.score}</span>
               </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6 -mt-6 bg-white rounded-t-3xl relative z-10">
          
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div>
              <p className="text-gray-400 text-xs uppercase font-bold">Precio Ref.</p>
              <h2 className="text-3xl font-bold text-emerald-700">{selectedListing.price}</h2>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs uppercase font-bold">Disponible</p>
              <h2 className="text-2xl font-bold text-gray-800">{selectedListing.quantity}</h2>
            </div>
          </div>

          {/* Producer Card */}
          <div>
             <h3 className="text-sm font-bold text-gray-900 mb-3">Información del Productor</h3>
             <div className="bg-white shadow-lg shadow-gray-100 p-4 rounded-2xl border border-gray-50 flex items-center gap-4">
               <div className="h-14 w-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 font-bold text-xl border-2 border-emerald-200">
                 {selectedListing.farmer.charAt(0)}
               </div>
               <div className="flex-1">
                 <h3 className="font-bold text-gray-900 text-lg leading-tight">{selectedListing.farmer}</h3>
                 <p className="text-xs text-gray-500">Miembro desde 2021</p>
               </div>
               <button className="p-3 bg-emerald-50 rounded-full text-emerald-600 hover:bg-emerald-100"><MessageCircle size={20}/></button>
             </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">Detalles del Lote</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{selectedListing.description}</p>
            <div className="mt-3 inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600">
               <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
               Cosechado: {selectedListing.harvestDate}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
             <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-transform active:scale-95 flex items-center justify-center gap-2">
               <ShoppingBag size={20} /> Enviar Intención de Compra
             </button>
             <p className="text-center text-xs text-gray-400 mt-4">Al enviar, el productor recibirá una notificación.</p>
          </div>
        </div>
      </div>
    );
  };

  const ProducersCatalog = () => (
     <div className="bg-gray-50 min-h-screen pb-24 animate-in slide-in-from-right">
        <div className="bg-white sticky top-0 z-20 px-6 pt-12 pb-4 shadow-sm">
           <div className="flex items-center gap-4 mb-4">
             <button onClick={() => setView('marketplace')} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
               <ArrowLeft size={20} />
             </button>
             <h2 className="text-xl font-bold">Catálogo de Productores</h2>
           </div>
           <input 
             type="text" 
             placeholder="Buscar por nombre o zona..." 
             className="w-full bg-gray-100 py-3 pl-4 pr-4 rounded-xl text-sm focus:outline-none focus:ring-2 ring-emerald-500"
           />
        </div>
        
        <div className="p-6 space-y-4">
           {[1,2,3].map(i => (
              <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
                 <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                       <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                       <div>
                          <h3 className="font-bold text-gray-900">Agropecuaria El Sol</h3>
                          <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={10}/> Manabí, EC</p>
                       </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded">980 Score</span>
                 </div>
                 <div className="flex gap-2">
                    <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600">Maíz</span>
                    <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600">Plátano</span>
                 </div>
                 <button className="w-full py-2 text-sm text-emerald-600 font-bold border border-emerald-200 rounded-xl mt-1">Ver Perfil</button>
              </div>
           ))}
        </div>
     </div>
  );

  if (view === 'detail') return <LotDetail />;
  if (view === 'producers') return <ProducersCatalog />;

  return (
    <div className="min-h-full bg-gray-50 text-gray-900 pb-24">
      {/* Header Search */}
      <div className="bg-white sticky top-0 z-20 px-6 pt-12 pb-4 shadow-sm rounded-b-3xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold tracking-tight">Marketplace</h1>
          <div className="p-2 bg-gray-100 rounded-full relative">
            <ShoppingBag size={20} />
            <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar maíz, cacao..." 
              className="w-full bg-gray-100 py-3 pl-10 pr-4 rounded-xl text-sm focus:outline-none focus:ring-2 ring-emerald-500 transition-shadow"
            />
          </div>
          <button className="bg-emerald-600 text-white p-3 rounded-xl shadow-md active:scale-95">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 py-6">
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {['Todos', 'Granos', 'Frutas', 'Vegetales'].map((cat, i) => (
            <button key={i} className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-transform active:scale-95 ${i === 0 ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-white text-gray-600 border border-gray-200'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Listings */}
      <div className="px-6 space-y-6">
        <div className="flex justify-between items-end">
          <h2 className="font-bold text-xl">Ofertas Destacadas</h2>
          <button onClick={() => setView('producers')} className="text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-full">
             Ver Productores
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-5">
          {LISTINGS_DATA.map(item => (
            <div key={item.id} onClick={() => handleSelectListing(item)} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-all">
              <div className="h-40 bg-gray-100 relative flex items-center justify-center text-6xl">
                {item.imageIcon}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                   <Star size={12} className="text-yellow-400" fill="currentColor"/> {item.score}
                </div>
                <div className="absolute bottom-4 left-4 bg-emerald-600/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm flex items-center gap-1">
                   <ShoppingBag size={12} /> {item.quantity}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-900 leading-tight flex-1">{item.product}</h3>
                  <p className="font-bold text-xl text-emerald-700">{item.price}</p>
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                  <MapPin size={14} className="text-gray-400"/> {item.location}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xs">
                      {item.farmer.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.farmer}</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-300"/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
