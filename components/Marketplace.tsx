import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import CategoryTabs from './CategoryTabs';
import ProductCard, { Product } from './ProductCard';
import ProductDetail from './ProductDetail';

const sampleProducts: Product[] = [
  {
    id: 'p1',
    title: 'Maíz Amarillo Híbrido',
    price: '$18.5',
    unit: 'qq',
    location: 'Ventanas, Los Ríos',
    seller: 'Finca La Esperanza',
    qty: '50 Ton',
    rating: 950,
    icon: '🌽',
  },
  {
    id: 'p2',
    title: 'Cacao CCN51 Fermentado',
    price: '$150',
    unit: 'qq',
    location: 'Machala, El Oro',
    seller: 'Agropecuaria San Juan',
    qty: '5 Ton',
    rating: 880,
    icon: '🍫',
  },
  {
    id: 'p3',
    title: 'Soya para Procesar',
    price: '$22',
    unit: 'qq',
    location: 'Quevedo',
    seller: 'Coop Soya',
    qty: '120 Ton',
    rating: 910,
    icon: '🌱',
  },
];

export default function Marketplace() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleSearch(text: string) {
    setQuery(text);
    const q = text.trim().toLowerCase();
    if (!q) return setProducts(sampleProducts);
    setProducts(sampleProducts.filter(p => p.title.toLowerCase().includes(q)));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Marketplace</Text>

        <View style={styles.searchRow}>
          <TextInput
            value={query}
            onChangeText={handleSearch}
            placeholder="Buscar maíz, cacao..."
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={{ color: '#fff', fontWeight: '700' }}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CategoryTabs onChange={c => { /* placeholder */ }} />

      <FlatList
        data={products}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={id => {
              const p = products.find(x => x.id === id) ?? null;
              setSelectedProduct(p);
            }}
          />
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {selectedProduct ? (
        <ProductDetail product={selectedProduct} visible={!!selectedProduct} onClose={() => setSelectedProduct(null)} />
      ) : null}

      <View style={styles.bottomNav}>
        <Text style={styles.navItem}>Inicio</Text>
        <Text style={styles.navItem}>Comunidad</Text>
        <View style={styles.fab}><Text style={{ color: '#fff', fontSize: 20 }}>✳️</Text></View>
        <Text style={styles.navItem}>IA</Text>
        <Text style={styles.navItem}>Perfil</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8faf9' },
  header: { paddingHorizontal: 16, paddingTop: 16 },
  pageTitle: { fontSize: 28, fontWeight: '800', marginBottom: 12 },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginRight: 10,
  },
  filterBtn: {
    backgroundColor: '#0ea37a',
    padding: 12,
    borderRadius: 12,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 12,
    height: 60,
    marginHorizontal: 16,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  navItem: { color: '#0b6b4a', fontWeight: '700' },
  fab: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    backgroundColor: '#0ea37a',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
});
