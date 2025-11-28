import './global.css';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Marketplace, Community, BuyerProfile, IAAssistant, BottomNav } from './components';

type Tab = 'home' | 'community' | 'ia' | 'profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [iaVisible, setIaVisible] = useState(false);

  function renderContent() {
    switch (activeTab) {
      case 'home': return <Marketplace />;
      case 'community': return <Community />;
      case 'profile': return <BuyerProfile />;
      default: return <Marketplace />;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderContent()}
      </View>
      
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onIAOpen={() => setIaVisible(true)}
      />

      <IAAssistant 
        visible={iaVisible} 
        onClose={() => setIaVisible(false)} 
      />
      
      <StatusBar style="auto" />
    </View>
  );
}

  // Navigation Config per Role
  const getNavConfig = () => {
    switch (role) {
      case 'agricultor':
        return { bg: 'bg-white', activeColor: '#65a30d', inactiveColor: '#9ca3af', fabBg: 'bg-lime-500' };
      case 'comprador':
        return { bg: 'bg-white', activeColor: '#059669', inactiveColor: '#9ca3af', fabBg: 'bg-emerald-600' };
      case 'inversionista':
        return { bg: 'bg-slate-900', activeColor: '#22d3ee', inactiveColor: '#64748b', fabBg: 'bg-cyan-900' };
    }
  };

  const navConfig = getNavConfig();

  const renderContent = () => {
    if (activeTab === 'profile') {
      return <ProfileView role={role} onLogout={() => setRole(null)} />;
    }
    
    if (activeTab === 'community') {
      const bgClass = role === 'inversionista' ? 'bg-slate-900' : 'bg-gray-50';
      const textClass = role === 'inversionista' ? 'text-white' : 'text-gray-900';
      return (
        <SafeAreaView className={`flex-1 ${bgClass}`}>
          <View className={`flex-1 pt-12 px-6 pb-24 ${bgClass}`}>
            <Text className={`text-2xl font-bold mb-6 ${textClass}`}>Comunidad WAQI</Text>
            <CommunityFeed userRole={role} />
          </View>
        </SafeAreaView>
      );
    }

    // Home Tab - Specific Role Views
    if (role === 'agricultor') return <AgricultorView />;
    if (role === 'comprador') return <CompradorView />;
    if (role === 'inversionista') return <InversionistaView />;
    
    return null;
  };

  return (
    <View className="flex-1">
      {/* Main Content Area */}
      <View className="flex-1">
        {renderContent()}
      </View>

      {/* Floating Chat Modal */}
      <AIChat role={role} isOpen={showChat} setIsOpen={setShowChat} />

      {/* Bottom Navigation */}
      <View className={`px-6 py-4 flex-row justify-between items-center ${navConfig.bg} border-t ${role === 'inversionista' ? 'border-slate-800' : 'border-gray-100'}`}>
        <TouchableOpacity 
          onPress={() => setActiveTab('home')}
          className="items-center w-16"
          activeOpacity={0.7}
        >
          <Home size={24} color={activeTab === 'home' ? navConfig.activeColor : navConfig.inactiveColor} />
          <Text 
            className="text-[10px] font-medium mt-1"
            style={{ color: activeTab === 'home' ? navConfig.activeColor : navConfig.inactiveColor }}
          >
            Inicio
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setActiveTab('community')}
          className="items-center w-16"
          activeOpacity={0.7}
        >
          <Users size={24} color={activeTab === 'community' ? navConfig.activeColor : navConfig.inactiveColor} />
          <Text 
            className="text-[10px] font-medium mt-1"
            style={{ color: activeTab === 'community' ? navConfig.activeColor : navConfig.inactiveColor }}
          >
            Comunidad
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setShowChat(true)}
          className="items-center w-16"
          activeOpacity={0.8}
        >
          <View className={`p-3 rounded-full -mt-8 shadow-lg ${navConfig.fabBg}`}>
            <Sparkles size={24} color="white" />
          </View>
          <Text 
            className="text-[10px] font-medium mt-1"
            style={{ color: navConfig.inactiveColor }}
          >
            IA
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setActiveTab('profile')}
          className="items-center w-16"
          activeOpacity={0.7}
        >
          <User size={24} color={activeTab === 'profile' ? navConfig.activeColor : navConfig.inactiveColor} />
          <Text 
            className="text-[10px] font-medium mt-1"
            style={{ color: activeTab === 'profile' ? navConfig.activeColor : navConfig.inactiveColor }}
          >
            Perfil
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style={role === 'inversionista' ? 'light' : 'dark'} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingBottom: 80, // Space for BottomNav
  },
});
