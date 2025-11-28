import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Leaf, ArrowRight, Sprout, ShoppingBag, TrendingUp, CheckCircle } from 'lucide-react-native';
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
      icon: <Leaf color="#ffffff" size={48} />,
      colors: ['#22c55e', '#a3e635'],
    },
    {
      title: "Tu AgroScore",
      desc: "Construye tu reputación digital y accede a mejores créditos y oportunidades.",
      icon: <CheckCircle color="#ffffff" size={48} />,
      colors: ['#10b981', '#14b8a6'],
    },
    {
      title: "Conecta y Crece",
      desc: "Compra, vende o invierte con seguridad y datos en tiempo real.",
      icon: <TrendingUp color="#ffffff" size={48} />,
      colors: ['#2563eb', '#06b6d4'],
    }
  ];

  // ROLE CARDS
  const roles = [
    {
      id: 'agricultor' as UserRole,
      title: 'Soy Agricultor',
      desc: 'Gestiona cultivos, monitorea clima y mejora tu AgroScore.',
      Icon: Sprout,
      color: '#16a34a',
      bg: '#f0fdf4',
    },
    {
      id: 'comprador' as UserRole,
      title: 'Soy Comprador',
      desc: 'Encuentra productos verificados y contacta productores.',
      Icon: ShoppingBag,
      color: '#059669',
      bg: '#ecfdf5',
    },
    {
      id: 'inversionista' as UserRole,
      title: 'Soy Inversionista',
      desc: 'Analiza riesgos, ROI y financia proyectos agrícolas.',
      Icon: TrendingUp,
      color: '#2563eb',
      bg: '#eff6ff',
    }
  ];

  if (step < 3) {
    const slide = slides[step];
    return (
      <View style={styles.slideContainer}>
        <View style={styles.skipContainer}>
          <TouchableOpacity onPress={() => setStep(3)}>
            <Text style={styles.skipText}>Saltar</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.slideContent}>
          <View style={[styles.iconContainer, { backgroundColor: slide.colors[0] }]}>
            {slide.icon}
          </View>
          <Text style={styles.slideTitle}>{slide.title}</Text>
          <Text style={styles.slideDesc}>{slide.desc}</Text>
        </View>

        <View style={styles.slideFooter}>
          <View style={styles.dotsContainer}>
            {slides.map((_, i) => (
              <View 
                key={i} 
                style={[
                  styles.dot, 
                  i === step ? styles.dotActive : styles.dotInactive
                ]} 
              />
            ))}
          </View>
          <TouchableOpacity 
            onPress={() => setStep(s => s + 1)}
            style={styles.nextButton}
          >
            <Text style={styles.nextButtonText}>
              {step === 2 ? 'Comenzar' : 'Siguiente'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ROLE SELECTION SCREEN
  return (
    <ScrollView style={styles.roleContainer} contentContainerStyle={styles.roleContentContainer}>
      <View style={styles.roleHeader}>
        <Text style={styles.roleTitle}>Elige tu perfil</Text>
        <Text style={styles.roleSubtitle}>Personalizaremos tu experiencia según tu rol en el ecosistema.</Text>
      </View>

      <View style={styles.roleCards}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.id}
            onPress={() => onComplete(role.id)}
            style={styles.roleCard}
            activeOpacity={0.8}
          >
            <View style={[styles.roleIconContainer, { backgroundColor: role.bg }]}>
              <role.Icon size={28} color={role.color} />
            </View>
            <View style={styles.roleCardContent}>
              <View style={styles.roleCardTextContainer}>
                <Text style={styles.roleCardTitle}>{role.title}</Text>
                <Text style={styles.roleCardDesc}>{role.desc}</Text>
              </View>
              <View style={styles.roleArrowContainer}>
                <ArrowRight size={16} color="#9ca3af" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 32,
  },
  skipContainer: {
    alignItems: 'flex-end',
  },
  skipText: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '500',
  },
  slideContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 128,
    height: 128,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    transform: [{ rotate: '3deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  slideTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  slideDesc: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  slideFooter: {
    width: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 32,
    backgroundColor: '#111827',
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#d1d5db',
  },
  nextButton: {
    backgroundColor: '#111827',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  roleContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  roleContentContainer: {
    padding: 32,
    paddingBottom: 48,
  },
  roleHeader: {
    marginBottom: 32,
    paddingTop: 16,
  },
  roleTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  roleSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  roleCards: {
    gap: 16,
  },
  roleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 16,
  },
  roleIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  roleCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  roleCardTextContainer: {
    flex: 1,
  },
  roleCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  roleCardDesc: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    maxWidth: '90%',
  },
  roleArrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});