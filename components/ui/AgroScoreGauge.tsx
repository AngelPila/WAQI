import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { ChevronRight } from 'lucide-react-native';

interface AgroScoreGaugeProps {
  score: number;
  maxScore?: number;
  size?: number;
  onPress?: () => void;
  variant?: 'card' | 'full';
}

export const AgroScoreGauge: React.FC<AgroScoreGaugeProps> = ({ 
  score, 
  maxScore = 1000, 
  size = 260,
  onPress,
  variant = 'card'
}) => {
  const radius = 90;
  const stroke = 14;
  const normalizedScore = (score / maxScore) * 100;
  
  const circumference = Math.PI * radius; 
  const dashOffset = circumference - (normalizedScore / 100) * circumference;

  const getColor = (val: number) => {
    if (val >= 800) return '#22c55e';
    if (val >= 600) return '#eab308';
    return '#ef4444';
  };
  
  const getLabel = (val: number) => {
    if (val >= 800) return 'Excelente';
    if (val >= 600) return 'Bueno';
    return 'Riesgo';
  };
  
  const color = getColor(score);

  const containerClasses = variant === 'card' 
    ? "bg-white rounded-3xl p-6 shadow-lg items-center justify-center"
    : "items-center justify-center";

  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={onPress ? 0.9 : 1}
      className={containerClasses}
      style={{ maxWidth: 350, width: '100%' }}
    >
      {variant === 'card' && (
        <View className="w-full flex-row justify-between items-start mb-2">
          <Text className="text-xl font-bold text-gray-900">Mis finanzas</Text>
        </View>
      )}

      <View 
        className="relative items-center justify-center mt-4"
        style={{ height: size / 1.8, width: size }}
      >
        <Svg width={size} height={size} viewBox="0 0 200 200" style={{ transform: [{ rotate: '180deg' }] }}>
          <Defs>
            <LinearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#ef4444" />
              <Stop offset="50%" stopColor="#eab308" />
              <Stop offset="100%" stopColor="#22c55e" />
            </LinearGradient>
          </Defs>
          
          <Path
            d="M 10,100 A 90,90 0 0,1 190,100"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          
          <Path
            d="M 10,100 A 90,90 0 0,1 190,100"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={dashOffset}
          />
        </Svg>

        <View className="absolute items-center" style={{ top: '50%', marginTop: -32 }}>
          <Text className="text-6xl font-extrabold text-gray-800 tracking-tighter">{score}</Text>
          <Text className="text-lg font-bold mt-1" style={{ color }}>{getLabel(score)}</Text>
        </View>
      </View>

      <View className="items-center -mt-6">
        <Text className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Score crediticio</Text>
        <TouchableOpacity className="flex-row items-center gap-1 mt-2">
          <Text className="text-xs text-blue-500 font-medium">¿Qué significa este número?</Text>
          <ChevronRight size={12} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      {variant === 'card' && (
        <View className="w-full border-t border-gray-100 mt-6 pt-4 flex-row justify-between items-center">
          <View className="flex-row">
            <Text className="font-extrabold text-red-700 tracking-tighter text-sm">WAQI</Text>
            <Text className="text-gray-400 font-normal text-sm">Score</Text>
          </View>
          <Text className="text-xs text-gray-400">Actualizado: 25/06/2024</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AgroScoreGauge;
