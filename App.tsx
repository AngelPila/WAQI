import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, Sparkles, Home, Users } from 'lucide-react-native';
import { UserRole } from './types';
import { Onboarding } from './components/Onboarding';
import { AgricultorView } from './components/views/AgricultorView';
import { CompradorView } from './components/views/CompradorView';
import { InversionistaView } from './components/views/InversionistaView';
import { ProfileView } from './components/views/ProfileView';
import { CommunityView } from './components/views/CommunityView';
import { AIChat } from './components/AIChat';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Tab Navigator Component
const TabNavigator: React.FC<{ role: UserRole; onLogout: () => void }> = ({ role, onLogout }) => {
  const [showChat, setShowChat] = useState(false);

  const navConfig = {
    agricultor: { active: '#65a30d', inactive: '#9ca3af', bg: '#ffffff' },
    comprador: { active: '#059669', inactive: '#9ca3af', bg: '#ffffff' },
    inversionista: { active: '#06b6d4', inactive: '#64748b', bg: '#0f172a' },
  }[role];

  const HomeScreen = () => {
    if (role === 'agricultor') return <AgricultorView />;
    if (role === 'comprador') return <CompradorView />;
    if (role === 'inversionista') return <InversionistaView />;
    return null;
  };

  return (
    <View style={{ flex: 1, backgroundColor: navConfig.bg }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: navConfig.bg,
            borderTopWidth: role === 'inversionista' ? 1 : 0,
            borderTopColor: role === 'inversionista' ? '#1e293b' : 'transparent',
            paddingBottom: 8,
            paddingTop: 8,
            height: 70,
          },
          tabBarActiveTintColor: navConfig.active,
          tabBarInactiveTintColor: navConfig.inactive,
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '500',
          },
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Comunidad"
          options={{
            tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
          }}
        >
          {() => <CommunityView role={role} />}
        </Tab.Screen>
        <Tab.Screen
          name="IA"
          component={View}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setShowChat(true);
            },
          }}
          options={{
            tabBarIcon: ({ color }) => (
              <View
                style={[
                  styles.aiButton,
                  {
                    backgroundColor:
                      role === 'inversionista'
                        ? '#164e63'
                        : role === 'comprador'
                        ? '#059669'
                        : '#84cc16',
                  },
                ]}
              >
                <Sparkles color="#ffffff" size={24} />
              </View>
            ),
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen
          name="Perfil"
          options={{
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        >
          {() => <ProfileView role={role} onLogout={onLogout} />}
        </Tab.Screen>
      </Tab.Navigator>
      <AIChat role={role} isOpen={showChat} setIsOpen={setShowChat} />
    </View>
  );
};

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);

  if (!role) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <Onboarding onComplete={setRole} />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style={role === 'inversionista' ? 'light' : 'dark'} />
      <TabNavigator role={role} onLogout={() => setRole(null)} />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  aiButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
});

export default App;
