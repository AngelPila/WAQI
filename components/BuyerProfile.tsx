import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function BuyerProfile() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.profileHeader}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarTextLarge}>SC</Text>
          </View>
          <Text style={styles.userName}>Sebastián Campos</Text>
          <Text style={styles.userLocation}>📍 Los Ríos, Ecuador</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>COMPRADOR</Text>
          </View>
        </View>

        <Text style={styles.sectionHeader}>CUENTA</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconBox}><Text>✉️</Text></View>
            <View style={styles.rowContent}>
              <Text style={styles.label}>Correo</Text>
              <Text style={styles.value}>sebastian.campos@gmail.com</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <View style={styles.iconBox}><Text>📞</Text></View>
            <View style={styles.rowContent}>
              <Text style={styles.label}>Teléfono</Text>
              <Text style={styles.value}>+593 99 123 4567</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionHeader}>CONFIGURACIÓN</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.iconBox, { backgroundColor: '#ecfdf5' }]}><Text style={{color:'#0ea37a'}}>🔔</Text></View>
            <Text style={styles.menuText}>Notificaciones</Text>
            <Text style={styles.menuStatus}>Activadas ›</Text>
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.iconBox, { backgroundColor: '#ecfdf5' }]}><Text style={{color:'#0ea37a'}}>🛡️</Text></View>
            <Text style={styles.menuText}>Seguridad y Privacidad</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.iconBox, { backgroundColor: '#ecfdf5' }]}><Text style={{color:'#0ea37a'}}>❓</Text></View>
            <Text style={styles.menuText}>Ayuda y Soporte</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faf9',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ecfdf5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarTextLarge: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0b6b4a',
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  userLocation: {
    color: '#6b7280',
    marginBottom: 12,
  },
  roleBadge: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  roleText: {
    color: '#0ea37a',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9ca3af',
    marginBottom: 10,
    marginLeft: 4,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 6,
    marginBottom: 24,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  rowContent: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 2,
  },
  value: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
  },
  menuText: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '600',
    flex: 1,
  },
  menuStatus: {
    color: '#9ca3af',
    fontSize: 14,
  },
  chevron: {
    color: '#d1d5db',
    fontSize: 18,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginLeft: 66,
  },
  logoutBtn: {
    alignItems: 'center',
    padding: 16,
    paddingBottom: 40, // Extra padding for bottom nav
  },
  logoutText: {
    color: '#ef4444',
    fontWeight: '700',
  },
});
