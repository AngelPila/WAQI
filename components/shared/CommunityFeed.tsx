import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
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
  const getBadgeStyle = (type: string) => {
    switch(type) {
      case 'venta': return { backgroundColor: '#dcfce7', color: '#15803d' };
      case 'compra': return { backgroundColor: '#dbeafe', color: '#1d4ed8' };
      case 'inversion': return { backgroundColor: '#f3e8ff', color: '#7c3aed' };
      default: return { backgroundColor: '#f3f4f6', color: '#4b5563' };
    }
  };

  const getUserRoleBg = () => {
    switch(userRole) {
      case 'agricultor': return '#65a30d';
      case 'comprador': return '#059669';
      case 'inversionista': return '#2563eb';
      default: return '#65a30d';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Comunidad</Text>
        <TouchableOpacity>
          <Text style={styles.headerLink}>Ver todo</Text>
        </TouchableOpacity>
      </View>

      {/* Create Post Input */}
      <View style={styles.createPostContainer}>
        <View style={[styles.avatarCircle, { backgroundColor: getUserRoleBg() }]}>
          <Text style={styles.avatarText}>YO</Text>
        </View>
        <TextInput 
          placeholder="Escribe algo para la comunidad..."
          placeholderTextColor="#9ca3af"
          style={styles.createPostInput}
        />
      </View>

      {/* Feed */}
      {MOCK_POSTS.map(post => {
        const badgeStyle = getBadgeStyle(post.type);
        return (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.postAuthorRow}>
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
              <View style={[styles.badge, { backgroundColor: badgeStyle.backgroundColor }]}>
                <Text style={[styles.badgeText, { color: badgeStyle.color }]}>{post.type.toUpperCase()}</Text>
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
              <TouchableOpacity style={[styles.actionButton, styles.shareButton]}>
                <Share2 size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerLink: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  createPostContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  createPostInput: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1f2937',
  },
  postCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  postAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postAvatarText: {
    color: '#6b7280',
    fontWeight: 'bold',
    fontSize: 14,
  },
  postAuthorName: {
    fontWeight: 'bold',
    fontSize: 14,
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
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
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
  actionText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  shareButton: {
    marginLeft: 'auto',
  },
});