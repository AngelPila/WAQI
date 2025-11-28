import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface AgroScoreGaugeProps {
  score: number;
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
  variant = 'card',
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
  const color = getColor(score);

  const getLabel = (val: number) => {
    if (val >= 800) return 'Excelente';
    if (val >= 600) return 'Bueno';
    return 'Riesgo';
  };

  const Container = onClick ? TouchableOpacity : View;

  return (
    <Container
      onPress={onClick}
      style={[styles.container, variant === 'card' && styles.cardContainer]}
      activeOpacity={0.95}
    >
      {variant === 'card' && (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mis finanzas</Text>
        </View>
      )}

      <View style={[styles.gaugeContainer, { height: size / 1.8, width: size }]}>
        <Svg width={size} height={size} viewBox="0 0 200 200" style={styles.svg}>
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
            strokeDasharray={`${circumference}`}
            strokeDashoffset={dashOffset}
          />
        </Svg>

        <View style={styles.centerText}>
          <Text style={styles.scoreText}>{score}</Text>
          <Text style={[styles.labelText, { color }]}>{getLabel(score)}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerLabel}>Score crediticio</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpText}>¿Qué significa este número?</Text>
          <ChevronRight color="#3b82f6" size={12} />
        </TouchableOpacity>
      </View>

      {variant === 'card' && (
        <View style={styles.cardFooter}>
          <View style={styles.brandContainer}>
            <Text style={styles.brandWAQI}>WAQI</Text>
            <Text style={styles.brandScore}>Score</Text>
          </View>
          <Text style={styles.updateText}>Actualizado: 25/06/2024</Text>
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    width: '100%',
    maxWidth: 350,
  },
  header: {
    width: '100%',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  gaugeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  svg: {
    transform: [{ rotate: '180deg' }],
  },
  centerText: {
    position: 'absolute',
    alignItems: 'center',
    top: '50%',
    marginTop: -32,
  },
  scoreText: {
    fontSize: 56,
    fontWeight: '800',
    color: '#1f2937',
    letterSpacing: -2,
  },
  labelText: {
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
    fontWeight: '600',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 1,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandWAQI: {
    fontSize: 14,
    fontWeight: '800',
    color: '#b91c1c',
    letterSpacing: -0.5,
  },
  brandScore: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: 'normal',
  },
  updateText: {
    fontSize: 12,
    color: '#9ca3af',
  },
});