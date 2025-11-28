import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Product } from './ProductCard';

type Props = {
  product: Product;
  onClose: () => void;
  visible?: boolean;
};

export default function ProductDetail({ product, onClose, visible = true }: Props) {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={onClose} style={styles.backCircle} accessibilityLabel="Regresar">
          <Text style={styles.backTxt}>←</Text>
        </TouchableOpacity>
        <View style={styles.iconWrap}><Text style={styles.icon}>{product.icon ?? '🌽'}</Text></View>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.titleRow}>
          <View>
            <View style={styles.verified}><Text style={styles.verifiedText}>VERIFICADO</Text></View>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.location}>📍 {product.location}</Text>
          </View>

          <View style={styles.agroScore}><Text style={styles.agroScoreNum}>{product.rating ?? 0}</Text><Text style={styles.agroLabel}>AgroScore</Text></View>
        </View>

        <View style={styles.priceBox}>
          <View>
            <Text style={styles.priceLabel}>PRECIO REF.</Text>
            <Text style={styles.price}>{product.price}{product.unit ? `/${product.unit}` : ''}</Text>
          </View>
          <View style={styles.availBox}>
            <Text style={styles.availLabel}>DISPONIBLE</Text>
            <Text style={styles.availQty}>{product.qty}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Información del Productor</Text>
        <View style={styles.producerCard}>
          <View style={styles.avatar}><Text style={styles.avatarTxt}>{product.seller?.charAt(0) ?? 'P'}</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.sellerName}>{product.seller}</Text>
            <Text style={styles.since}>Miembro desde 2021</Text>
          </View>
          <TouchableOpacity style={styles.chatBtn}><Text style={{color:'#0ea37a'}}>💬</Text></TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Detalles del Lote</Text>
        <Text style={styles.lotText}>Maíz de alta calidad, secado en máquina. Humedad del 13%. Listo para entrega inmediata.</Text>

        <View style={styles.harvestRow}><View style={styles.harvestDot} /><Text style={styles.harvestText}>Cosechado: 20 Jun 2024</Text></View>

        <TouchableOpacity style={styles.cta} onPress={() => { /* placeholder: enviar intención */ }}>
          <Text style={styles.ctaText}>Enviar Intención de Compra</Text>
        </TouchableOpacity>

      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  headerTop: {
    height: 180,
    backgroundColor: '#0b6b4a',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  backCircle: { padding: 10, backgroundColor: 'rgba(255,255,255,0.14)', borderRadius: 20, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backTxt: { color: '#fff', fontSize: 18, fontWeight: '700' },
  iconWrap: { position: 'absolute', right: 20, top: 40 },
  icon: { fontSize: 64 },
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, marginTop: -24, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  verified: { backgroundColor: '#ecfdf5', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 8 },
  verifiedText: { color: '#0b6b4a', fontWeight: '700', fontSize: 12 },
  title: { fontSize: 22, fontWeight: '800', color: '#05282a' },
  location: { color: '#6b7280', marginTop: 6 },
  agroScore: { backgroundColor: 'rgba(255,255,255,0.12)', padding: 8, borderRadius: 8, alignItems: 'center' },
  agroScoreNum: { color: '#fff', fontWeight: '800', fontSize: 18 },
  agroLabel: { color: '#fff', fontSize: 10 },
  priceBox: { flexDirection: 'row', marginTop: 18, backgroundColor: '#f3f4f6', padding: 14, borderRadius: 12, justifyContent: 'space-between' },
  priceLabel: { color: '#6b7280', fontWeight: '700' },
  price: { color: '#0ea37a', fontSize: 22, fontWeight: '800', marginTop: 6 },
  availBox: { alignItems: 'flex-end' },
  availLabel: { color: '#6b7280', fontWeight: '700' },
  availQty: { fontWeight: '800', marginTop: 6 },
  sectionTitle: { marginTop: 18, fontWeight: '800', fontSize: 16 },
  producerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 12, marginTop: 10, elevation: 2 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#ecfdf5', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarTxt: { color: '#0b6b4a', fontWeight: '800' },
  sellerName: { fontWeight: '800' },
  since: { color: '#6b7280' },
  chatBtn: { padding: 8, backgroundColor: '#f1f5f4', borderRadius: 20 },
  lotText: { marginTop: 8, color: '#374151' },
  harvestRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  harvestDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#0ea37a', marginRight: 8 },
  harvestText: { color: '#6b7280' },
  cta: { marginTop: 20, backgroundColor: '#0ea37a', paddingVertical: 14, borderRadius: 12, alignItems: 'center', elevation: 6 },
  ctaText: { color: '#fff', fontWeight: '800' },
});
