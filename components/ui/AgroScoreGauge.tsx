import React from 'react';
import { ChevronRight } from 'lucide-react';

interface AgroScoreGaugeProps {
  score: number; // 0 to 1000
  maxScore?: number;
  size?: number;
  onClick?: () => void;
  variant?: 'card' | 'full';
}

export const AgroScoreGauge: React.FC<AgroScoreGaugeProps> = ({ 
  score, 
  maxScore = 1000, 
  size = 260,
  onClick,
  variant = 'card'
}) => {
  const radius = 90;
  const stroke = 14;
  const normalizedScore = (score / maxScore) * 100;
  
  // Arc calculation (Semi-circle 180 deg)
  const circumference = Math.PI * radius; 
  const dashOffset = circumference - (normalizedScore / 100) * circumference;

  // Color logic
  const getColor = (val: number) => {
    if (val >= 800) return '#22c55e'; // Green
    if (val >= 600) return '#eab308'; // Yellow
    return '#ef4444'; // Red
  };
  const color = getColor(score);

  const Container = variant === 'card' ? 'div' : 'div';
  const containerClasses = variant === 'card' 
    ? "bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer active:scale-95 transition-transform mx-auto"
    : "flex flex-col items-center justify-center relative";

  return (
    <Container 
      onClick={onClick}
      className={containerClasses}
      style={{ width: '100%', maxWidth: '350px' }}
    >
      {/* Header */}
      {variant === 'card' && (
        <div className="w-full flex justify-between items-start mb-2 z-10">
          <h3 className="text-xl font-bold text-gray-900">Mis finanzas</h3>
        </div>
      )}

      {/* Gauge Container */}
      <div className="relative flex items-center justify-center mt-4" style={{ height: size / 1.8, width: size }}>
        <svg width={size} height={size} viewBox="0 0 200 200" className="transform rotate-180 origin-center">
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          
          {/* Track */}
          <path
            d="M 10,100 A 90,90 0 0,1 190,100"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          
          {/* Progress */}
          <path
            d="M 10,100 A 90,90 0 0,1 190,100"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-8 text-center z-10">
          <span className="text-6xl font-extrabold text-gray-800 tracking-tighter block leading-none">{score}</span>
          <span className="text-lg font-bold mt-1 block" style={{ color }}>
            {score >= 800 ? 'Excelente' : score >= 600 ? 'Bueno' : 'Riesgo'}
          </span>
        </div>
      </div>

      <div className="text-center z-10 -mt-6">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Score crediticio</p>
        <button className="text-xs text-blue-500 mt-2 font-medium flex items-center gap-1 mx-auto hover:underline">
          ¿Qué significa este número? <ChevronRight size={12} />
        </button>
      </div>

      {/* Footer Info */}
      {variant === 'card' && (
        <div className="w-full border-t border-gray-100 mt-6 pt-4 flex justify-between items-center text-xs text-gray-400 z-10">
          <span className="font-extrabold text-red-700 tracking-tighter text-sm">WAQI<span className="text-gray-400 font-normal">Score</span></span>
          <span>Actualizado: 25/06/2024</span>
        </div>
      )}
    </Container>
  );
};