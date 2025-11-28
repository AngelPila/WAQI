import React from 'react';
import { Sprout, ShoppingBag, TrendingUp, Leaf, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

interface RoleSelectionProps {
  onSelect: (role: UserRole) => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect }) => {
  const roles = [
    {
      id: 'agricultor' as UserRole,
      title: 'Soy Agricultor',
      desc: 'Gestiona cultivos, monitorea clima y vende al mejor precio.',
      icon: Sprout,
      color: 'text-green-600',
      bg: 'bg-green-50',
      hover: 'group-hover:bg-green-100'
    },
    {
      id: 'comprador' as UserRole,
      title: 'Soy Comprador',
      desc: 'Encuentra productos verificados y contacta productores.',
      icon: ShoppingBag,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      hover: 'group-hover:bg-emerald-100'
    },
    {
      id: 'inversionista' as UserRole,
      title: 'Soy Inversionista',
      desc: 'Analiza riesgos, ROI y financia proyectos agrícolas.',
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      hover: 'group-hover:bg-blue-100'
    }
  ];

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="mb-10 text-center animate-in fade-in duration-700">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-gradient-to-tr from-green-500 to-lime-400 rounded-3xl flex items-center justify-center shadow-xl transform rotate-6">
            <Leaf className="text-white h-10 w-10" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">WAQI</h1>
        <p className="text-gray-500 font-medium">Ecosistema agrícola inteligente</p>
      </div>

      <div className="w-full max-w-sm space-y-4 animate-in slide-in-from-bottom-5 duration-700 delay-100">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onSelect(role.id)}
            className={`group relative w-full bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-left border border-gray-100`}
          >
            <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform ${role.color}`}>
              <role.icon size={80} />
            </div>
            <div className={`p-3 rounded-2xl w-fit mb-4 ${role.bg} ${role.color} ${role.hover} transition-colors`}>
              <role.icon size={24} />
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{role.title}</h3>
                <p className="text-sm text-gray-500 leading-snug max-w-[90%]">{role.desc}</p>
              </div>
              <ArrowRight className={`opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all ${role.color}`} size={20} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
