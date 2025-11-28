import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export type Product = {
  id: string;
  title: string;
  price: string;
  unit?: string;
  location?: string;
  seller?: string;
  qty?: string;
  rating?: number;
  icon?: string; // emoji or uri
};

type Props = {
  product: Product;
  onPress?: (id: string) => void;
};

export default function ProductCard({ product, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={() => onPress && onPress(product.id)}>
      <View style={styles.top}>
        <Text style={styles.icon}>{product.icon ?? '🌽'}</Text>
        <View style={styles.starBadge}>
          <Text style={styles.starText}>⭐ {product.rating ?? 0}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>{product.price}{product.unit ? `/${product.unit}` : ''}</Text>
        </View>

        {product.location ? <Text style={styles.location}>📍 {product.location}</Text> : null}

        <View style={styles.footer}>
          <View style={styles.sellerChip}>
            <Text style={styles.sellerText}>{product.seller ?? 'Productor'}</Text>
          </View>
          {product.qty ? (
            <View style={styles.qtyBadge}>
              <Text style={styles.qtyText}>{product.qty}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    marginHorizontal: 12,
    marginVertical: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  top: {
    height: 110,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 48,
  },
  starBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    elevation: 3,
  },
  starText: {
    fontSize: 12,
    fontWeight: '700',
  },
  body: {
    padding: 14,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  price: {
    color: '#0ea37a',
    fontWeight: '700',
  },
  location: {
    color: '#6b7280',
    marginTop: 8,
  },
  footer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sellerChip: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  sellerText: {
    color: '#0b6b4a',
    fontWeight: '600',
  },
  qtyBadge: {
    backgroundColor: '#e6f6ef',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  qtyText: {
    color: '#0b6b4a',
    fontWeight: '700',
  },
});
