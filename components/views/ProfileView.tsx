import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
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
    verified: true
  };

  const getRoleColor = () => {
    if (role === 'agricultor') return '#65a30d';
    if (role === 'comprador') return '#059669';
    return '#2563eb';
  };

  const getRoleBgClass = () => {
    if (role === 'agricultor') return 'bg-lime-50';
    if (role === 'comprador') return 'bg-emerald-50';
    return 'bg-blue-50';
  };

  const getRoleTextClass = () => {
    if (role === 'agricultor') return 'text-lime-600';
    if (role === 'comprador') return 'text-emerald-600';
    return 'text-blue-600';
  };

  const settingsItems = [
    { Icon: Bell, label: 'Notificaciones', val: 'Activadas' },
    { Icon: Shield, label: 'Seguridad y Privacidad', val: '' },
    { Icon: HelpCircle, label: 'Ayuda y Soporte', val: '' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="bg-white px-6 pt-12 pb-8 rounded-b-3xl shadow-sm mb-6">
          <View className="items-center">
            <View className={`h-24 w-24 ${getRoleBgClass()} rounded-full items-center justify-center mb-4 shadow-lg`}>
              <Text className={`text-3xl font-bold ${getRoleTextClass()}`}>{profile.avatar}</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-900">{profile.name}</Text>
            <View className="flex-row items-center gap-1 mt-1">
              <MapPin size={14} color="#6b7280" />
              <Text className="text-gray-500 text-sm">{profile.location}</Text>
            </View>
            <View className={`mt-3 px-3 py-1 rounded-full ${getRoleBgClass()}`}>
              <Text className={`text-xs font-bold uppercase tracking-wide ${getRoleTextClass()}`}>
                {profile.role}
              </Text>
            </View>
          </View>
        </View>

        <View className="px-6 pb-24">
          {/* Account Info */}
          <View className="mb-4">
            <Text className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">Cuenta</Text>
            <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <View className="p-4 border-b border-gray-50 flex-row items-center gap-3">
                <View className="bg-gray-50 p-2 rounded-lg">
                  <Mail size={18} color="#6b7280" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-400">Correo</Text>
                  <Text className="text-sm font-medium text-gray-800">{profile.email}</Text>
                </View>
              </View>
              <View className="p-4 flex-row items-center gap-3">
                <View className="bg-gray-50 p-2 rounded-lg">
                  <Phone size={18} color="#6b7280" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-400">Teléfono</Text>
                  <Text className="text-sm font-medium text-gray-800">{profile.phone}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Settings */}
          <View className="mb-4">
            <Text className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">Configuración</Text>
            <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {settingsItems.map((item, i) => {
                const ItemIcon = item.Icon;
                return (
                  <TouchableOpacity 
                    key={i} 
                    className="p-4 border-b border-gray-50 flex-row items-center justify-between"
                    activeOpacity={0.7}
                  >
                    <View className="flex-row items-center gap-3">
                      <View className={`p-2 rounded-lg ${getRoleBgClass()}`}>
                        <ItemIcon size={18} color={getRoleColor()} />
                      </View>
                      <Text className="text-sm font-medium text-gray-800">{item.label}</Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <Text className="text-xs text-gray-400">{item.val}</Text>
                      <ChevronRight size={16} color="#d1d5db" />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Logout */}
          <TouchableOpacity 
            onPress={onLogout}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-row items-center justify-center gap-2"
            activeOpacity={0.7}
          >
            <LogOut size={18} color="#ef4444" />
            <Text className="text-red-500 font-medium">Cerrar Sesión</Text>
          </TouchableOpacity>
          
          <Text className="text-center text-xs text-gray-400 pt-4">Versión 1.0.2 - WAQI App</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileView;
