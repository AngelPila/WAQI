import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MessageSquare, Heart, Share2, MoreHorizontal, Send } from 'lucide-react-native';
import { Post, UserRole } from '../../types';

const INITIAL_POSTS: Post[] = [
  { id: '1', author: 'Juan Pérez', role: 'agricultor', content: '¿Alguien sabe qué precio está cerrando el maíz en Quevedo hoy?', likes: 12, comments: 4, type: 'aviso', timeAgo: '2h' },
  { id: '2', author: 'AgroInsumos SA', role: 'comprador', content: 'Compramos soya en grandes cantidades. Pago inmediato.', likes: 45, comments: 10, type: 'compra', timeAgo: '5h' },
  { id: '3', author: 'Maria L.', role: 'inversionista', content: 'Buscando proyectos de Cacao CCN51 para financiar. Interesados enviar DM.', likes: 28, comments: 8, type: 'inversion', timeAgo: '1d' },
];

interface CommunityFeedProps {
  userRole: UserRole;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({ userRole }) => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newPostContent, setNewPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const getBadgeStyles = (type: string) => {
    switch(type) {
      case 'venta': return { bg: 'bg-green-100', text: 'text-green-700' };
      case 'compra': return { bg: 'bg-blue-100', text: 'text-blue-700' };
      case 'inversion': return { bg: 'bg-purple-100', text: 'text-purple-700' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-600' };
    }
  };

  const getAvatarBg = () => {
    switch(userRole) {
      case 'agricultor': return 'bg-green-500';
      case 'comprador': return 'bg-blue-500';
      case 'inversionista': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getPostType = () => {
    if (userRole === 'agricultor') return 'venta';
    if (userRole === 'comprador') return 'compra';
    return 'inversion';
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    setIsPosting(true);
    try {
      const newPost: Post = {
        id: Date.now().toString(),
        author: 'Tú',
        role: userRole,
        content: newPostContent.trim(),
        likes: 0,
        comments: 0,
        type: getPostType(),
        timeAgo: 'Ahora'
      };

      setPosts(prevPosts => [newPost, ...prevPosts]);
      setNewPostContent('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la publicación');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <ScrollView 
      className="flex-1" 
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View className="pb-20">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="font-bold text-lg text-gray-900">Comunidad</Text>
          <TouchableOpacity>
            <Text className="text-sm text-gray-500 font-medium">Ver todo</Text>
          </TouchableOpacity>
        </View>

        {/* Create Post Input */}
        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
          <View className="flex-row gap-3 items-center mb-3">
            <View className={`h-10 w-10 rounded-full items-center justify-center ${getAvatarBg()}`}>
              <Text className="font-bold text-white">YO</Text>
            </View>
            <TextInput 
              placeholder="Escribe algo para la comunidad..."
              placeholderTextColor="#9ca3af"
              value={newPostContent}
              onChangeText={setNewPostContent}
              multiline
              className="flex-1 bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-900 min-h-[60px]"
              textAlignVertical="top"
            />
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-xs text-gray-500">
              Tipo: <Text className="font-medium capitalize">{getPostType()}</Text>
            </Text>
            <TouchableOpacity 
              onPress={handleCreatePost}
              disabled={!newPostContent.trim() || isPosting}
              className={`px-4 py-2 rounded-full flex-row items-center gap-2 ${
                newPostContent.trim() && !isPosting 
                  ? 'bg-emerald-600' 
                  : 'bg-gray-300'
              }`}
            >
              <Send size={16} color="white" />
              <Text className="text-white font-medium text-sm">
                {isPosting ? 'Publicando...' : 'Publicar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feed */}
        {posts.map(post => {
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
    </ScrollView>
  );
};

export default CommunityFeed;
