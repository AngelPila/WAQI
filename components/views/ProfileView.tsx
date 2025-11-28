import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, MapPin, Mail, Phone, Shield, LogOut, ChevronRight, Bell, HelpCircle } from 'lucide-react-native';
import { UserRole, UserProfile } from '../../types';

interface ProfileViewProps {
  role: UserRole;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ role, onLogout }) => {
  const profile: UserProfile = {
    name: 'Sebastián Campos',
    location: 'Los Ríos, Ecuador',
    role: role,
    email: 'sebastian.campos@gmail.com',
    phone: '+593 99 123 4567',
    avatar: 'SC',
    joinDate: 'Enero 2023',
    verified: true,
  };

  const roleColors = {
    agricultor: { color: '#65a30d', bg: '#f0fdf4' },
    comprador: { color: '#059669', bg: '#ecfdf5' },
    inversionista: { color: '#2563eb', bg: '#eff6ff' },
  };

  const colors = roleColors[role];

  const settingsItems = [
    { Icon: Bell, label: 'Notificaciones', value: 'Activadas' },
    { Icon: Shield, label: 'Seguridad y Privacidad', value: '' },
    { Icon: HelpCircle, label: 'Ayuda y Soporte', value: '' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Profile Card */}
        <View style={styles.profileCard}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.bg }]}>
            <Text style={[styles.avatarText, { color: colors.color }]}>{profile.avatar}</Text>
          </View>
          <Text style={styles.profileName}>{profile.name}</Text>
          <View style={styles.locationContainer}>
            <MapPin color="#6b7280" size={14} />
            <Text style={styles.locationText}>{profile.location}</Text>
          </View>
          <View style={[styles.roleBadge, { backgroundColor: colors.bg }]}>
            <Text style={[styles.roleBadgeText, { color: colors.color }]}>
              {profile.role.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Account Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CUENTA</Text>
            <View style={styles.card}>
              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Mail color="#6b7280" size={18} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Correo</Text>
                  <Text style={styles.infoValue}>{profile.email}</Text>
                </View>
              </View>
              <View style={styles.separator} />
              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Phone color="#6b7280" size={18} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Teléfono</Text>
                  <Text style={styles.infoValue}>{profile.phone}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Settings Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CONFIGURACIÓN</Text>
            <View style={styles.card}>
              {settingsItems.map((item, index) => (
                <React.Fragment key={item.label}>
                  {index > 0 && <View style={styles.separator} />}
                  <TouchableOpacity style={styles.settingsRow}>
                    <View style={styles.settingsLeft}>
                      <View style={[styles.settingsIcon, { backgroundColor: colors.bg }]}>
                        <item.Icon color={colors.color} size={18} />
                      </View>
                      <Text style={styles.settingsLabel}>{item.label}</Text>
                    </View>
                    <View style={styles.settingsRight}>
                      {item.value ? <Text style={styles.settingsValue}>{item.value}</Text> : null}
                      <ChevronRight color="#d1d5db" size={16} />
                    </View>
                  </TouchableOpacity>
                </React.Fragment>
              ))}
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <LogOut color="#ef4444" size={18} />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>Versión 1.0.2 - WAQI App</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  profileCard: {
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
    shadowRadius: 8,
    elevation: 2,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#6b7280',
  },
  roleBadge: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  content: {
    padding: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9ca3af',
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
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  infoIcon: {
    backgroundColor: '#f9fafb',
    padding: 8,
    borderRadius: 8,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#9ca3af',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  separator: {
    height: 1,
    backgroundColor: '#f9fafb',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingsLeft: {
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
  settingsRight: {
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
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
  },
});