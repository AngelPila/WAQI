import React, { useState } from 'react';
import { Leaf, ArrowRight, Sprout, ShoppingBag, TrendingUp, CheckCircle } from 'lucide-react';
import { UserRole } from '../types';

interface OnboardingProps {
  onComplete: (role: UserRole) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0); // 0, 1, 2 slides -> 3 role selection

  // SLIDES
  const slides = [
    {
      title: "Bienvenido a WAQI",
      desc: "El ecosistema agrícola inteligente que conecta el campo con el futuro.",
      icon: <Leaf className="text-white h-12 w-12" />,
      color: "from-green-500 to-lime-400"
    },
    {
      title: "Tu AgroScore",
      desc: "Construye tu reputación digital y accede a mejores créditos y oportunidades.",
      icon: <CheckCircle className="text-white h-12 w-12" />,
      color: "from-emerald-500 to-teal-400"
    },
    {
      title: "Conecta y Crece",
      desc: "Compra, vende o invierte con seguridad y datos en tiempo real.",
      icon: <TrendingUp className="text-white h-12 w-12" />,
      color: "from-blue-600 to-cyan-500"
    }
  ];

  // ROLE CARDS
  const roles = [
    {
      id: 'agricultor' as UserRole,
      title: 'Soy Agricultor',
      desc: 'Gestiona cultivos, monitorea clima y mejora tu AgroScore.',
      icon: Sprout,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'hover:border-green-300'
    },
    {
      id: 'comprador' as UserRole,
      title: 'Soy Comprador',
      desc: 'Encuentra productos verificados y contacta productores.',
      icon: ShoppingBag,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'hover:border-emerald-300'
    },
    {
      id: 'inversionista' as UserRole,
      title: 'Soy Inversionista',
      desc: 'Analiza riesgos, ROI y financia proyectos agrícolas.',
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'hover:border-blue-300'
    }
  ];

  if (step < 3) {
    const slide = slides[step];
    return (
      <div className="h-full flex flex-col items-center justify-between p-8 bg-white">
        <div className="w-full flex justify-end">
           <button onClick={() => setStep(3)} className="text-gray-400 text-sm font-medium">Saltar</button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-500 key={step}">
          <div className={`h-32 w-32 bg-gradient-to-tr ${slide.color} rounded-[2rem] flex items-center justify-center shadow-xl mb-10 transform rotate-3 transition-all duration-500`}>
            {slide.icon}
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{slide.title}</h2>
          <p className="text-gray-500 leading-relaxed max-w-xs">{slide.desc}</p>
        </div>

        <div className="w-full">
          <div className="flex justify-center gap-2 mb-8">
            {slides.map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-gray-900' : 'w-2 bg-gray-300'}`}></div>
            ))}
          </div>
          <button 
            onClick={() => setStep(s => s + 1)}
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-black transition-colors"
          >
            {step === 2 ? 'Comenzar' : 'Siguiente'}
          </button>
        </div>
      </div>
    );
  }

  // ROLE SELECTION SCREEN
  return (
    <div className="h-full flex flex-col p-8 bg-gray-50 overflow-y-auto">
      <div className="mb-8 pt-4">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Elige tu perfil</h1>
        <p className="text-gray-500">Personalizaremos tu experiencia según tu rol en el ecosistema.</p>
      </div>

      <div className="space-y-4 pb-8">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onComplete(role.id)}
            className={`group relative w-full bg-white p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 text-left border border-gray-100 ${role.border}`}
          >
            <div className={`p-4 rounded-2xl w-fit mb-4 ${role.bg} ${role.color}`}>
              <role.icon size={28} />
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{role.title}</h3>
                <p className="text-sm text-gray-500 leading-snug max-w-[90%]">{role.desc}</p>
              </div>
              <div className={`h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-colors`}>
                 <ArrowRight size={16}/>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};