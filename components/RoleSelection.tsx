import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Sprout, ShoppingBag, TrendingUp, Leaf, ArrowRight } from 'lucide-react-native';
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Leaf color="#ffffff" size={40} />
        </View>
        <Text style={styles.title}>WAQI</Text>
        <Text style={styles.subtitle}>Ecosistema agrícola inteligente</Text>
      </View>

      <View style={styles.cardsContainer}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.id}
            onPress={() => onSelect(role.id)}
            style={styles.card}
            activeOpacity={0.8}
          >
            <View style={[styles.iconContainer, { backgroundColor: role.bg }]}>
              <role.Icon size={24} color={role.color} />
            </View>
            <View style={styles.cardContent}>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{role.title}</Text>
                <Text style={styles.cardDesc}>{role.desc}</Text>
              </View>
              <ArrowRight size={20} color={role.color} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#f9fafb',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    transform: [{ rotate: '6deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: '#22c55e',
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
  },
  cardsContainer: {
    width: '100%',
    maxWidth: 360,
    gap: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    maxWidth: '90%',
  },
});
