import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';

type Post = {
  id: string;
  author: string;
  role: string; // Agricultor, Comprador, Inversionista
  time: string;
  content: string;
  likes: number;
  comments: number;
  type?: 'aviso' | 'compra' | 'venta';
  avatarColor: string;
};

const samplePosts: Post[] = [
  {
    id: '1',
    author: 'Juan Pérez',
    role: 'Agricultor',
    time: '2h',
    content: '¿Alguien sabe qué precio está cerrando el maíz en Quevedo hoy?',
    likes: 12,
    comments: 4,
    type: 'aviso',
    avatarColor: '#e5e7eb',
  },
  {
    id: '2',
    author: 'AgroInsumos SA',
    role: 'Comprador',
    time: '5h',
    content: 'Compramos soya en grandes cantidades. Pago inmediato.',
    likes: 45,
    comments: 10,
    type: 'compra',
    avatarColor: '#e5e7eb',
  },
  {
    id: '3',
    author: 'Maria L.',
    role: 'Inversionista',
    time: '1d',
    content: 'Buscando socios para proyecto de cacao orgánico en Manabí.',
    likes: 28,
    comments: 7,
    avatarColor: '#e5e7eb',
  },
];

export default function Community() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Comunidad WAQI</Text>
      </View>

      <View style={styles.subHeader}>
        <Text style={styles.sectionTitle}>Comunidad</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>Ver todo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={samplePosts}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View style={styles.newPostCard}>
            <View style={[styles.avatar, { backgroundColor: '#0ea37a' }]}>
              <Text style={[styles.avatarText, { color: '#fff' }]}>YO</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput 
                placeholder="Escribe algo para la comunidad..." 
                placeholderTextColor="#9ca3af"
                style={styles.input}
              />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
                <Text style={styles.avatarText}>{item.author.charAt(0)}</Text>
              </View>
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>{item.author}</Text>
                <Text style={styles.authorRole}>{item.role} • {item.time}</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.moreIcon}>•••</Text>
              </TouchableOpacity>
            </View>

            {item.type && (
              <View style={[
                styles.badge, 
                item.type === 'compra' ? styles.badgeBlue : styles.badgeGray
              ]}>
                <Text style={[
                  styles.badgeText,
                  item.type === 'compra' ? styles.badgeTextBlue : styles.badgeTextGray
                ]}>
                  {item.type.toUpperCase()}
                </Text>
              </View>
            )}

            <Text style={styles.content}>{item.content}</Text>

            <View style={styles.actions}>
              <View style={styles.actionBtn}>
                <Text style={styles.actionIcon}>♡</Text>
                <Text style={styles.actionText}>{item.likes}</Text>
              </View>
              <View style={styles.actionBtn}>
                <Text style={styles.actionIcon}>💬</Text>
                <Text style={styles.actionText}>{item.comments}</Text>
              </View>
              <View style={{ flex: 1 }} />
              <TouchableOpacity>
                <Text style={styles.shareIcon}>🔗</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faf9',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#05282a',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  seeAll: {
    color: '#6b7280',
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  newPostCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontWeight: '700',
    color: '#4b5563',
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    fontSize: 14,
    color: '#111827',
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontWeight: '700',
    color: '#111827',
    fontSize: 15,
  },
  authorRole: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  moreIcon: {
    color: '#9ca3af',
    fontSize: 18,
    fontWeight: 'bold',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  badgeGray: {
    backgroundColor: '#f3f4f6',
  },
  badgeBlue: {
    backgroundColor: '#dbeafe',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  badgeTextGray: {
    color: '#4b5563',
  },
  badgeTextBlue: {
    color: '#2563eb',
  },
  content: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionIcon: {
    fontSize: 18,
    color: '#6b7280',
    marginRight: 6,
  },
  actionText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '600',
  },
  shareIcon: {
    fontSize: 18,
    color: '#6b7280',
  },
});
