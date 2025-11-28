import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { User, Sparkles, Home, Users } from 'lucide-react-native';
import { UserRole } from './types';
import { Onboarding } from './components/Onboarding';
import { AgricultorView } from './components/views/AgricultorView';
import { CompradorView } from './components/views/CompradorView';
import { InversionistaView } from './components/views/InversionistaView';
import { ProfileView } from './components/views/ProfileView';
import { CommunityFeed } from './components/shared/CommunityFeed';
import { AIChat } from './components/AIChat';

type Tab = 'home' | 'community' | 'profile';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showChat, setShowChat] = useState(false);

  // If no role selected, show Onboarding
  if (!role) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.phoneFrame}>
          <Onboarding onComplete={setRole} />
        </View>
      </SafeAreaView>
    );
  }

  // Navigation Config per Role
  const navConfig = {
    agricultor: { bg: '#ffffff', active: '#65a30d', inactive: '#9ca3af' },
    comprador: { bg: '#ffffff', active: '#059669', inactive: '#9ca3af' },
    inversionista: { bg: '#0f172a', active: '#22d3ee', inactive: '#64748b' },
  }[role];

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (activeTab === 'profile') return <ProfileView role={role} onLogout={() => setRole(null)} />;
    
    if (activeTab === 'community') {
      const bgColor = role === 'inversionista' ? '#0f172a' : '#f9fafb';
      const textColor = role === 'inversionista' ? '#ffffff' : '#111827';
      return (
        <View style={[styles.communityContainer, { backgroundColor: bgColor }]}>
          <Text style={[styles.communityTitle, { color: textColor }]}>Comunidad WAQI</Text>
          <CommunityFeed userRole={role} />
        </View>
      );
    }

    // Home Tab - Specific Role Views
    if (role === 'agricultor') return <AgricultorView />;
    if (role === 'comprador') return <CompradorView />;
    if (role === 'inversionista') return <InversionistaView />;
    
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={role === 'inversionista' ? 'light-content' : 'dark-content'} />
      <View style={styles.phoneFrame}>
        {/* Main Content Area */}
        <View style={styles.mainContent}>
          {renderContent()}
        </View>

        {/* Floating Chat Modal */}
        <AIChat role={role} isOpen={showChat} setIsOpen={setShowChat} />

        {/* Bottom Navigation */}
        <View style={[styles.bottomNav, { backgroundColor: navConfig.bg }]}>
          <TouchableOpacity 
            onPress={() => handleTabChange('home')}
            style={styles.navButton}
          >
            <Home size={24} color={activeTab === 'home' ? navConfig.active : navConfig.inactive} />
            <Text style={[styles.navLabel, { color: activeTab === 'home' ? navConfig.active : navConfig.inactive }]}>
              Inicio
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => handleTabChange('community')}
            style={styles.navButton}
          >
            <Users size={24} color={activeTab === 'community' ? navConfig.active : navConfig.inactive} />
            <Text style={[styles.navLabel, { color: activeTab === 'community' ? navConfig.active : navConfig.inactive }]}>
              Comunidad
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setShowChat(true)}
            style={styles.navButton}
          >
            <View style={[
              styles.aiButton,
              { 
                backgroundColor: role === 'inversionista' ? '#164e63' : role === 'comprador' ? '#059669' : '#84cc16',
                borderColor: role === 'inversionista' ? '#0f172a' : '#ffffff',
              }
            ]}>
              <Sparkles size={24} color={role === 'inversionista' ? '#22d3ee' : '#ffffff'} />
            </View>
            <Text style={[styles.navLabel, { color: navConfig.inactive, marginTop: 4 }]}>IA</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => handleTabChange('profile')}
            style={styles.navButton}
          >
            <User size={24} color={activeTab === 'profile' ? navConfig.active : navConfig.inactive} />
            <Text style={[styles.navLabel, { color: activeTab === 'profile' ? navConfig.active : navConfig.inactive }]}>
              Perfil
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneFrame: {
    flex: 1,
    width: '100%',
    maxWidth: 430,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  mainContent: {
    flex: 1,
  },
  communityContainer: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 96,
  },
  communityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
  aiButton: {
    padding: 12,
    borderRadius: 50,
    marginTop: -32,
    borderWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default App;
