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
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoIcon}>
          <Leaf color="#ffffff" size={40} />
        </View>
        <Text style={styles.logoText}>WAQI</Text>
        <Text style={styles.logoSubtext}>Ecosistema agrícola inteligente</Text>
      </View>

      <View style={styles.rolesContainer}>
        {roles.map((role) => {
          const RoleIcon = role.Icon;
          return (
            <TouchableOpacity
              key={role.id}
              style={styles.roleCard}
              onPress={() => onSelect(role.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.roleIconContainer, { backgroundColor: role.bg }]}>
                <RoleIcon color={role.color} size={24} />
              </View>
              <View style={styles.roleContent}>
                <View style={styles.roleTextContainer}>
                  <Text style={styles.roleTitle}>{role.title}</Text>
                  <Text style={styles.roleDesc}>{role.desc}</Text>
                </View>
                <ArrowRight color={role.color} size={20} />
              </View>
            </TouchableOpacity>
          );
        })}
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#22c55e',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '6deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 24,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -1,
  },
  logoSubtext: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  rolesContainer: {
    width: '100%',
    maxWidth: 350,
    gap: 16,
  },
  roleCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 16,
  },
  roleIconContainer: {
    padding: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  roleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  roleTextContainer: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  roleDesc: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});
