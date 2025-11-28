import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Tab = 'home' | 'community' | 'ia' | 'profile';

type Props = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onIAOpen: () => void;
};

export default function BottomNav({ activeTab, onTabChange, onIAOpen }: Props) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={styles.navItemContainer} 
        onPress={() => onTabChange('home')}
        activeOpacity={0.7}
      >
        <Text style={[styles.navIcon, activeTab === 'home' && styles.activeText]}>🏠</Text>
        <Text style={[styles.navItem, activeTab === 'home' && styles.activeText]}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItemContainer} 
        onPress={() => onTabChange('community')}
        activeOpacity={0.7}
      >
        <Text style={[styles.navIcon, activeTab === 'community' && styles.activeText]}>👥</Text>
        <Text style={[styles.navItem, activeTab === 'community' && styles.activeText]}>Comunidad</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.fab} 
        onPress={onIAOpen}
        activeOpacity={0.9}
      >
        <Text style={{ color: '#fff', fontSize: 24 }}>✨</Text>
      </TouchableOpacity>

      <View style={styles.spacer} /> 

      <TouchableOpacity 
        style={styles.navItemContainer} 
        activeOpacity={0.7}
        // Placeholder for future tab if needed, or just visual balance
      >
         <Text style={[styles.navIcon, {opacity: 0}]}>IA</Text>
         <Text style={[styles.navItem, {opacity: 0}]}>IA</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItemContainer} 
        onPress={() => onTabChange('profile')}
        activeOpacity={0.7}
      >
        <Text style={[styles.navIcon, activeTab === 'profile' && styles.activeText]}>👤</Text>
        <Text style={[styles.navItem, activeTab === 'profile' && styles.activeText]}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingBottom: 20, // for safe area
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  navItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
    color: '#9ca3af',
  },
  navItem: { 
    color: '#9ca3af', 
    fontWeight: '600', 
    fontSize: 10 
  },
  activeText: {
    color: '#0ea37a',
  },
  fab: {
    position: 'absolute',
    alignSelf: 'center',
    top: -20,
    backgroundColor: '#0ea37a',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#0ea37a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 4,
    borderColor: '#f8faf9', // Match background color
  },
  spacer: {
    width: 40, // Space for FAB
  }
});
