import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MessageSquare, Heart, Share2, MoreHorizontal } from 'lucide-react-native';
import { Post, UserRole } from '../../types';

const MOCK_POSTS: Post[] = [
  { id: '1', author: 'Juan Pérez', role: 'agricultor', content: '¿Alguien sabe qué precio está cerrando el maíz en Quevedo hoy?', likes: 12, comments: 4, type: 'aviso', timeAgo: '2h' },
  { id: '2', author: 'AgroInsumos SA', role: 'comprador', content: 'Compramos soya en grandes cantidades. Pago inmediato.', likes: 45, comments: 10, type: 'compra', timeAgo: '5h' },
  { id: '3', author: 'Maria L.', role: 'inversionista', content: 'Buscando proyectos de Cacao CCN51 para financiar. Interesados enviar DM.', likes: 28, comments: 8, type: 'inversion', timeAgo: '1d' },
];

interface CommunityFeedProps {
  userRole: UserRole;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({ userRole }) => {
  const getBadgeStyles = (type: string) => {
    switch(type) {
      case 'venta': return { bg: 'bg-green-100', text: 'text-green-700' };
      case 'compra': return { bg: 'bg-blue-100', text: 'text-blue-700' };
      case 'inversion': return { bg: 'bg-purple-100', text: 'text-purple-700' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-600' };
    }
  };

  const getAvatarBg = () => {
    if (userRole === 'agricultor') return 'bg-lime-600';
    if (userRole === 'comprador') return 'bg-emerald-600';
    return 'bg-blue-600';
  };

  return (
    <View className="pb-20">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="font-bold text-lg text-gray-900">Comunidad</Text>
        <TouchableOpacity>
          <Text className="text-sm text-gray-500 font-medium">Ver todo</Text>
        </TouchableOpacity>
      </View>

      {/* Create Post Input */}
      <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-row gap-3 items-center mb-4">
        <View className={`h-10 w-10 rounded-full items-center justify-center ${getAvatarBg()}`}>
          <Text className="font-bold text-white">YO</Text>
        </View>
        <TextInput 
          placeholder="Escribe algo para la comunidad..."
          placeholderTextColor="#9ca3af"
          className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm text-gray-900"
        />
      </View>

      {/* Feed */}
      {MOCK_POSTS.map(post => {
        const badgeStyles = getBadgeStyles(post.type);
        return (
          <View key={post.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 rounded-full bg-gray-200 items-center justify-center">
                  <Text className="font-bold text-gray-500 text-sm">{post.author.charAt(0)}</Text>
                </View>
                <View>
                  <Text className="font-bold text-sm text-gray-900">{post.author}</Text>
                  <Text className="text-xs text-gray-400 capitalize">{post.role} • {post.timeAgo}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <MoreHorizontal size={16} color="#9ca3af" />
              </TouchableOpacity>
            </View>
            
            <View className="mb-3">
              <View className={`${badgeStyles.bg} px-2 py-0.5 rounded-full mb-2 self-start`}>
                <Text className={`text-[10px] font-bold uppercase ${badgeStyles.text}`}>{post.type}</Text>
              </View>
              <Text className="text-sm text-gray-700 leading-relaxed">{post.content}</Text>
            </View>

            <View className="flex-row items-center gap-6 pt-3 border-t border-gray-50">
              <TouchableOpacity className="flex-row items-center gap-1.5">
                <Heart size={16} color="#6b7280" />
                <Text className="text-gray-500 text-xs font-medium">{post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center gap-1.5">
                <MessageSquare size={16} color="#6b7280" />
                <Text className="text-gray-500 text-xs font-medium">{post.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center gap-1.5 ml-auto">
                <Share2 size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default CommunityFeed;
