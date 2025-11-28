import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
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
  const getBadgeColor = (type: string) => {
    switch(type) {
      case 'venta': return { bg: '#dcfce7', text: '#15803d' };
      case 'compra': return { bg: '#dbeafe', text: '#1d4ed8' };
      case 'inversion': return { bg: '#f3e8ff', text: '#7c3aed' };
      default: return { bg: '#f3f4f6', text: '#4b5563' };
    }
  };

  const getUserColor = () => {
    if (userRole === 'agricultor') return '#65a30d';
    if (userRole === 'comprador') return '#059669';
    return '#2563eb';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, userRole === 'inversionista' && styles.headerTitleDark]}>Comunidad</Text>
        <TouchableOpacity>
          <Text style={styles.headerLink}>Ver todo</Text>
        </TouchableOpacity>
      </View>

      {/* Create Post Input */}
      <View style={styles.createPost}>
        <View style={[styles.avatar, { backgroundColor: getUserColor() }]}>
          <Text style={styles.avatarText}>YO</Text>
        </View>
        <TextInput 
          placeholder="Escribe algo para la comunidad..."
          placeholderTextColor="#9ca3af"
          style={styles.createInput}
        />
      </View>

      {/* Feed */}
      {MOCK_POSTS.map(post => {
        const badgeColors = getBadgeColor(post.type);
        return (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.postAuthorContainer}>
                <View style={styles.postAvatar}>
                  <Text style={styles.postAvatarText}>{post.author.charAt(0)}</Text>
                </View>
                <View>
                  <Text style={styles.postAuthorName}>{post.author}</Text>
                  <Text style={styles.postMeta}>{post.role} • {post.timeAgo}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <MoreHorizontal size={16} color="#9ca3af" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.postContent}>
              <View style={[styles.postBadge, { backgroundColor: badgeColors.bg }]}>
                <Text style={[styles.postBadgeText, { color: badgeColors.text }]}>
                  {post.type.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.postText}>{post.content}</Text>
            </View>

            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Heart size={16} color="#6b7280" />
                <Text style={styles.actionText}>{post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MessageSquare size={16} color="#6b7280" />
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.actionButtonRight]}>
                <Share2 size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  headerTitleDark: {
    color: '#ffffff',
  },
  headerLink: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  createPost: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  createInput: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    color: '#111827',
  },
  postCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  postAuthorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postAvatarText: {
    color: '#6b7280',
    fontWeight: '700',
    fontSize: 14,
  },
  postAuthorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  postMeta: {
    fontSize: 12,
    color: '#9ca3af',
    textTransform: 'capitalize',
  },
  postContent: {
    marginBottom: 12,
  },
  postBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginBottom: 8,
  },
  postBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  postText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f9fafb',
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionButtonRight: {
    marginLeft: 'auto',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
});