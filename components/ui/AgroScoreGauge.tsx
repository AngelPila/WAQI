import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

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

  const getScoreLabel = () => {
    if (score >= 800) return 'Excelente';
    if (score >= 600) return 'Bueno';
    return 'Riesgo';
  };

  const GaugeContent = () => (
    <>
      {/* Header */}
      {variant === 'card' && (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mis finanzas</Text>
        </View>
      )}

      {/* Gauge Container */}
      <View style={[styles.gaugeContainer, { height: size / 1.8, width: size }]}>
        <Svg width={size} height={size} viewBox="0 0 200 200" style={styles.gaugeSvg}>
          <Defs>
            <LinearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#ef4444" />
              <Stop offset="50%" stopColor="#eab308" />
              <Stop offset="100%" stopColor="#22c55e" />
            </LinearGradient>
          </Defs>
          
          {/* Track */}
          <Path
            d="M 10,100 A 90,90 0 0,1 190,100"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          
          {/* Progress */}
          <Path
            d="M 10,100 A 90,90 0 0,1 190,100"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </Svg>

        {/* Center Text */}
        <View style={styles.centerText}>
          <Text style={styles.scoreValue}>{score}</Text>
          <Text style={[styles.scoreLabel, { color }]}>{getScoreLabel()}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerLabel}>Score crediticio</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpText}>¿Qué significa este número?</Text>
          <ChevronRight size={12} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      {/* Footer Info */}
      {variant === 'card' && (
        <View style={styles.cardFooter}>
          <Text style={styles.brandText}>
            <Text style={styles.brandRed}>WAQI</Text>
            <Text style={styles.brandGray}>Score</Text>
          </Text>
          <Text style={styles.updateText}>Actualizado: 25/06/2024</Text>
        </View>
      )}
    </>
  );

  if (variant === 'card') {
    return (
      <TouchableOpacity 
        onPress={onClick}
        style={styles.cardContainer}
        activeOpacity={0.95}
      >
        <GaugeContent />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.fullContainer}>
      <GaugeContent />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 350,
    alignSelf: 'center',
  },
  fullContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  gaugeContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  gaugeSvg: {
    transform: [{ rotate: '180deg' }],
  },
  centerText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -32 }],
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 56,
    fontWeight: '800',
    color: '#1f2937',
    letterSpacing: -2,
  },
  scoreLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  footer: {
    alignItems: 'center',
    marginTop: -24,
  },
  footerLabel: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  helpText: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '500',
  },
  cardFooter: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    marginTop: 24,
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandText: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  brandRed: {
    color: '#b91c1c',
  },
  brandGray: {
    color: '#9ca3af',
    fontWeight: 'normal',
  },
  updateText: {
    fontSize: 12,
    color: '#9ca3af',
  },
});