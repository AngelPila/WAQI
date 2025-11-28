import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Leaf, ArrowRight, Sprout, ShoppingBag, TrendingUp, CheckCircle } from 'lucide-react-native';
import { UserRole } from '../types';

interface OnboardingProps {
  onComplete: (role: UserRole) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const slides = [
    {
      title: "Bienvenido a WAQI",
      desc: "El ecosistema agrícola inteligente que conecta el campo con el futuro.",
      Icon: Leaf,
      colors: ['#22c55e', '#a3e635'],
    },
    {
      title: "Tu AgroScore",
      desc: "Construye tu reputación digital y accede a mejores créditos y oportunidades.",
      Icon: CheckCircle,
      colors: ['#10b981', '#14b8a6'],
    },
    {
      title: "Conecta y Crece",
      desc: "Compra, vende o invierte con seguridad y datos en tiempo real.",
      Icon: TrendingUp,
      colors: ['#2563eb', '#06b6d4'],
    }
  ];

  const roles = [
    {
      id: 'agricultor' as UserRole,
      title: 'Soy Agricultor',
      desc: 'Gestiona cultivos, monitorea clima y mejora tu AgroScore.',
      Icon: Sprout,
      color: '#16a34a',
      bg: 'bg-green-50',
    },
    {
      id: 'comprador' as UserRole,
      title: 'Soy Comprador',
      desc: 'Encuentra productos verificados y contacta productores.',
      Icon: ShoppingBag,
      color: '#059669',
      bg: 'bg-emerald-50',
    },
    {
      id: 'inversionista' as UserRole,
      title: 'Soy Inversionista',
      desc: 'Analiza riesgos, ROI y financia proyectos agrícolas.',
      Icon: TrendingUp,
      color: '#2563eb',
      bg: 'bg-blue-50',
    }
  ];

  if (step < 3) {
    const slide = slides[step];
    const SlideIcon = slide.Icon;
    
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-between p-8">
          <View className="w-full flex-row justify-end">
            <TouchableOpacity onPress={() => setStep(3)}>
              <Text className="text-gray-400 text-sm font-medium">Saltar</Text>
            </TouchableOpacity>
          </View>
          
          <View className="flex-1 items-center justify-center">
            <View 
              className="h-32 w-32 rounded-3xl items-center justify-center shadow-xl mb-10"
              style={{ 
                backgroundColor: slide.colors[0],
                transform: [{ rotate: '3deg' }] 
              }}
            >
              <SlideIcon size={48} color="white" />
            </View>
            <Text className="text-3xl font-extrabold text-gray-900 mb-4 text-center">{slide.title}</Text>
            <Text className="text-gray-500 leading-relaxed text-center max-w-xs">{slide.desc}</Text>
          </View>

          <View className="w-full">
            <View className="flex-row justify-center gap-2 mb-8">
              {slides.map((_, i) => (
                <View 
                  key={i} 
                  className={`h-2 rounded-full ${i === step ? 'w-8 bg-gray-900' : 'w-2 bg-gray-300'}`}
                />
              ))}
            </View>
            <TouchableOpacity 
              onPress={() => setStep(s => s + 1)}
              className="w-full bg-gray-900 py-4 rounded-2xl"
              activeOpacity={0.8}
            >
              <Text className="text-white font-bold text-lg text-center">
                {step === 2 ? 'Comenzar' : 'Siguiente'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 p-8">
        <View className="mb-8 pt-4">
          <Text className="text-3xl font-extrabold text-gray-900 mb-2">Elige tu perfil</Text>
          <Text className="text-gray-500">Personalizaremos tu experiencia según tu rol en el ecosistema.</Text>
        </View>

        <View className="gap-4">
          {roles.map((role) => {
            const RoleIcon = role.Icon;
            return (
              <TouchableOpacity
                key={role.id}
                onPress={() => onComplete(role.id)}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
                activeOpacity={0.9}
              >
                <View className={`p-4 rounded-2xl w-fit mb-4 ${role.bg}`}>
                  <RoleIcon size={28} color={role.color} />
                </View>
                <View className="flex-row justify-between items-end">
                  <View className="flex-1">
                    <Text className="text-xl font-bold text-gray-900 mb-1">{role.title}</Text>
                    <Text className="text-sm text-gray-500 leading-snug pr-4">{role.desc}</Text>
                  </View>
                  <View className="h-8 w-8 rounded-full bg-gray-100 items-center justify-center">
                    <ArrowRight size={16} color="#6b7280" />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
