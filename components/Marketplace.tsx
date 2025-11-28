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
    category: 'Granos',
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
    category: 'Frutas', // Cacao often grouped with fruits or specific category
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
    category: 'Granos',
  },
  {
    id: 'p4',
    title: 'Arroz Grano Largo',
    price: '$35',
    unit: 'saca',
    location: 'Daule, Guayas',
    seller: 'Arrocera El Triunfo',
    qty: '200 Ton',
    rating: 930,
    icon: '🍚',
    category: 'Granos',
  },
  {
    id: 'p5',
    title: 'Banano Cavendish',
    price: '$6.50',
    unit: 'caja',
    location: 'Machala, El Oro',
    seller: 'Bananas del Sur',
    qty: '500 Cajas',
    rating: 960,
    icon: '🍌',
    category: 'Frutas',
  },
  {
    id: 'p6',
    title: 'Café Arábigo Lavado',
    price: '$180',
    unit: 'qq',
    location: 'Loja',
    seller: 'Café de Altura',
    qty: '20 Ton',
    rating: 980,
    icon: '☕',
    category: 'Granos',
  },
  {
    id: 'p7',
    title: 'Plátano Barraganete',
    price: '$4.50',
    unit: 'racimo',
    location: 'El Carmen, Manabí',
    seller: 'Asoc. Plataneros',
    qty: '1000 Racimos',
    rating: 900,
    icon: '🍌',
    category: 'Frutas',
  },
  {
    id: 'p8',
    title: 'Tomate Riñón',
    price: '$12',
    unit: 'caja',
    location: 'Riobamba',
    seller: 'Horticultores Andinos',
    qty: '50 Cajas',
    rating: 890,
    icon: '🍅',
    category: 'Vegetales',
  },
];

export default function Marketplace() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Unified filter function
  function filterProducts(text: string, category: string) {
    let filtered = sampleProducts;

    // Filter by category
    if (category !== 'Todos') {
      filtered = filtered.filter(p => p.category === category);
    }

    // Filter by search text
    const q = text.trim().toLowerCase();
    if (q) {
      filtered = filtered.filter(p => p.title.toLowerCase().includes(q));
    }

    setProducts(filtered);
  }

  function handleSearch(text: string) {
    setQuery(text);
    filterProducts(text, selectedCategory);
  }

  function handleCategoryChange(category: string) {
    setSelectedCategory(category);
    filterProducts(query, category);
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

      <CategoryTabs onChange={handleCategoryChange} />

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
});
