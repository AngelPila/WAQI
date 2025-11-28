import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
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

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showChat, setShowChat] = useState(false);

  // If no role selected, show Onboarding
  if (!role) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Onboarding onComplete={setRole} />
      </SafeAreaView>
    );
  }

  // Navigation Config per Role
  const navConfig = {
    agricultor: { bg: '#ffffff', active: '#65a30d', inactive: '#9ca3af', borderColor: '#f3f4f6' },
    comprador: { bg: '#ffffff', active: '#059669', inactive: '#9ca3af', borderColor: '#f3f4f6' },
    inversionista: { bg: '#0f172a', active: '#22d3ee', inactive: '#64748b', borderColor: '#1e293b' },
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
        <ScrollView style={[styles.communityContainer, { backgroundColor: bgColor }]}>
          <Text style={[styles.communityTitle, { color: textColor }]}>Comunidad WAQI</Text>
          <CommunityFeed userRole={role} />
        </ScrollView>
      );
    }

    // Home Tab - Specific Role Views
    if (role === 'agricultor') return <AgricultorView />;
    if (role === 'comprador') return <CompradorView />;
    if (role === 'inversionista') return <InversionistaView />;
    
    return null;
  };

  const getChatButtonStyle = () => {
    if (role === 'inversionista') return { backgroundColor: '#164e63', borderColor: '#0f172a' };
    if (role === 'comprador') return { backgroundColor: '#059669', borderColor: '#ffffff' };
    return { backgroundColor: '#84cc16', borderColor: '#ffffff' };
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: role === 'inversionista' ? '#0f172a' : '#e5e7eb' }]}>
      <StatusBar 
        barStyle={role === 'inversionista' ? 'light-content' : 'dark-content'} 
        backgroundColor={role === 'inversionista' ? '#0f172a' : '#fff'} 
      />
      <View style={styles.mainWrapper}>
        {/* Main Content Area */}
        <View style={styles.contentArea}>
          {renderContent()}
        </View>

        {/* Floating Chat Modal */}
        <AIChat role={role} isOpen={showChat} setIsOpen={setShowChat} />

        {/* Bottom Navigation */}
        <View style={[styles.navbar, { backgroundColor: navConfig.bg, borderTopColor: navConfig.borderColor }]}>
          <TouchableOpacity 
            onPress={() => handleTabChange('home')}
            style={styles.navItem}
          >
            <Home size={24} color={activeTab === 'home' ? navConfig.active : navConfig.inactive} />
            <Text style={[styles.navLabel, { color: activeTab === 'home' ? navConfig.active : navConfig.inactive }]}>Inicio</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => handleTabChange('community')}
            style={styles.navItem}
          >
            <Users size={24} color={activeTab === 'community' ? navConfig.active : navConfig.inactive} />
            <Text style={[styles.navLabel, { color: activeTab === 'community' ? navConfig.active : navConfig.inactive }]}>Comunidad</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setShowChat(true)}
            style={styles.navItem}
          >
            <View style={[styles.chatButton, getChatButtonStyle()]}>
              <Sparkles size={24} color="#ffffff" />
            </View>
            <Text style={[styles.navLabel, { color: navConfig.inactive, marginTop: 8 }]}>IA</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => handleTabChange('profile')}
            style={styles.navItem}
          >
            <User size={24} color={activeTab === 'profile' ? navConfig.active : navConfig.inactive} />
            <Text style={[styles.navLabel, { color: activeTab === 'profile' ? navConfig.active : navConfig.inactive }]}>Perfil</Text>
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
  },
  mainWrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentArea: {
    flex: 1,
  },
  communityContainer: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 24,
  },
  communityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
  chatButton: {
    padding: 12,
    borderRadius: 50,
    marginTop: -32,
    borderWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default App;
