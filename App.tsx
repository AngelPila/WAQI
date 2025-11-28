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
