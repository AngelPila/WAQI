import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { User, MapPin, Mail, Phone, Shield, LogOut, ChevronRight, Bell, HelpCircle } from 'lucide-react-native';
import { UserRole, UserProfile } from '../../types';

interface ProfileViewProps {
  role: UserRole;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ role, onLogout }) => {
  // Mock Profile Data
  const profile: UserProfile = {
    name: 'Sebastián Campos',
    location: 'Los Ríos, Ecuador',
    role: role,
    email: 'sebastian.campos@gmail.com',
    phone: '+593 99 123 4567',
    avatar: 'SC',
    joinDate: 'Enero 2023',
    verified: true
  };

  const getRoleColors = () => {
    switch (role) {
      case 'agricultor': return { color: '#65a30d', bg: '#f7fee7' };
      case 'comprador': return { color: '#059669', bg: '#ecfdf5' };
      case 'inversionista': return { color: '#2563eb', bg: '#eff6ff' };
      default: return { color: '#65a30d', bg: '#f7fee7' };
    }
  };

  const roleColors = getRoleColors();

  const settingsItems = [
    { icon: Bell, label: 'Notificaciones', val: 'Activadas' },
    { icon: Shield, label: 'Seguridad y Privacidad', val: '' },
    { icon: HelpCircle, label: 'Ayuda y Soporte', val: '' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headerCard}>
        <View style={styles.profileInfo}>
          <View style={[styles.avatar, { backgroundColor: roleColors.bg }]}>
            <Text style={[styles.avatarText, { color: roleColors.color }]}>{profile.avatar}</Text>
          </View>
          <Text style={styles.profileName}>{profile.name}</Text>
          <View style={styles.locationRow}>
            <MapPin size={14} color="#6b7280" />
            <Text style={styles.locationText}>{profile.location}</Text>
          </View>
          <View style={[styles.roleBadge, { backgroundColor: roleColors.bg }]}>
            <Text style={[styles.roleBadgeText, { color: roleColors.color }]}>{profile.role.toUpperCase()}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cuenta</Text>
        <View style={styles.card}>
          <View style={[styles.cardItem, styles.cardItemBorder]}>
            <View style={styles.cardItemIcon}>
              <Mail size={18} color="#6b7280" />
            </View>
            <View style={styles.cardItemContent}>
              <Text style={styles.cardItemLabel}>Correo</Text>
              <Text style={styles.cardItemValue}>{profile.email}</Text>
            </View>
          </View>
          <View style={styles.cardItem}>
            <View style={styles.cardItemIcon}>
              <Phone size={18} color="#6b7280" />
            </View>
            <View style={styles.cardItemContent}>
              <Text style={styles.cardItemLabel}>Teléfono</Text>
              <Text style={styles.cardItemValue}>{profile.phone}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración</Text>
        <View style={styles.card}>
          {settingsItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.settingsItem, index < settingsItems.length - 1 && styles.cardItemBorder]}
            >
              <View style={styles.settingsItemLeft}>
                <View style={[styles.settingsIcon, { backgroundColor: roleColors.bg }]}>
                  <item.icon size={18} color={roleColors.color} />
                </View>
                <Text style={styles.settingsLabel}>{item.label}</Text>
              </View>
              <View style={styles.settingsItemRight}>
                {item.val ? <Text style={styles.settingsValue}>{item.val}</Text> : null}
                <ChevronRight size={16} color="#d1d5db" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <LogOut size={18} color="#ef4444" />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      
      <Text style={styles.versionText}>Versión 1.0.2 - WAQI App</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  contentContainer: {
    paddingBottom: 100,
  },
  headerCard: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 24,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#6b7280',
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    overflow: 'hidden',
  },
  cardItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
  },
  cardItemIcon: {
    backgroundColor: '#f9fafb',
    padding: 8,
    borderRadius: 8,
  },
  cardItemContent: {
    flex: 1,
  },
  cardItemLabel: {
    fontSize: 12,
    color: '#9ca3af',
  },
  cardItemValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  settingsItem: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsIcon: {
    padding: 8,
    borderRadius: 8,
  },
  settingsLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  settingsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingsValue: {
    fontSize: 12,
    color: '#9ca3af',
  },
  logoutButton: {
    marginHorizontal: 24,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ef4444',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9ca3af',
    paddingTop: 16,
  },
});