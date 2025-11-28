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

  const getRoleColor = () => {
    if (role === 'agricultor') return '#65a30d';
    if (role === 'comprador') return '#059669';
    return '#2563eb';
  };

  const getRoleBgColor = () => {
    if (role === 'agricultor') return '#f7fee7';
    if (role === 'comprador') return '#ecfdf5';
    return '#eff6ff';
  };

  const roleColor = getRoleColor();
  const roleBg = getRoleBgColor();

  const settingsItems = [
    { Icon: Bell, label: 'Notificaciones', val: 'Activadas' },
    { Icon: Shield, label: 'Seguridad y Privacidad', val: '' },
    { Icon: HelpCircle, label: 'Ayuda y Soporte', val: '' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={[styles.avatarContainer, { backgroundColor: roleBg }]}>
          <Text style={[styles.avatarText, { color: roleColor }]}>{profile.avatar}</Text>
        </View>
        <Text style={styles.name}>{profile.name}</Text>
        <View style={styles.locationContainer}>
          <MapPin size={14} color="#6b7280" />
          <Text style={styles.location}>{profile.location}</Text>
        </View>
        <View style={[styles.roleBadge, { backgroundColor: roleBg }]}>
          <Text style={[styles.roleBadgeText, { color: roleColor }]}>{profile.role.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Account Info */}
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

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuración</Text>
          <View style={styles.card}>
            {settingsItems.map((item, i) => (
              <TouchableOpacity 
                key={i} 
                style={[
                  styles.settingsItem, 
                  i < settingsItems.length - 1 && styles.cardItemBorder
                ]}
              >
                <View style={styles.settingsItemLeft}>
                  <View style={[styles.settingsIconContainer, { backgroundColor: roleBg }]}>
                    <item.Icon size={18} color={roleColor} />
                  </View>
                  <Text style={styles.settingsLabel}>{item.label}</Text>
                </View>
                <View style={styles.settingsItemRight}>
                  <Text style={styles.settingsValue}>{item.val}</Text>
                  <ChevronRight size={16} color="#d1d5db" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
          <LogOut size={18} color="#ef4444" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
        
        <Text style={styles.version}>Versión 1.0.2 - WAQI App</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 24,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontSize: 30,
    fontWeight: '700',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    color: '#6b7280',
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 96,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 1,
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsIconContainer: {
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
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  logoutText: {
    color: '#ef4444',
    fontWeight: '500',
    fontSize: 14,
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9ca3af',
    paddingTop: 16,
  },
});