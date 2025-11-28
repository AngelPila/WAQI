import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { ShoppingBag, Search, Filter, MapPin, ArrowLeft, Star, MessageCircle, ChevronRight } from 'lucide-react-native';
import { Listing } from '../../types';

const LISTINGS_DATA: Listing[] = [
  { id: 1, product: 'Maíz Amarillo Híbrido', farmer: 'Finca La Esperanza', location: 'Ventanas, Los Ríos', quantity: '50 Ton', price: '$18.5/qq', score: 950, imageIcon: '🌽', description: 'Maíz de alta calidad, secado en máquina. Humedad del 13%. Listo para entrega inmediata.', harvestDate: '20 Jun 2024' },
  { id: 2, product: 'Cacao CCN51 Fermentado', farmer: 'Agropecuaria San Juan', location: 'Machala, El Oro', quantity: '5 Ton', price: '$150/qq', score: 880, imageIcon: '🍫', description: 'Grano fermentado 85%, excelente aroma. Certificación orgánica en trámite.', harvestDate: '15 Jun 2024' },
  { id: 3, product: 'Soya para Procesar', farmer: 'Hnos. Garzón', location: 'Quevedo', quantity: '120 Ton', price: '$22/qq', score: 910, imageIcon: '🌱', description: 'Soya limpia, lista para extracción de aceite. Venta mínima 10 Ton.', harvestDate: '22 Jun 2024' },
];

type ViewState = 'marketplace' | 'detail' | 'producers';

export const CompradorView: React.FC = () => {
  const [view, setView] = useState<ViewState>('marketplace');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const handleSelectListing = (item: Listing) => {
    setSelectedListing(item);
    setView('detail');
  };

  const LotDetail = () => {
    if (!selectedListing) return null;
    return (
      <ScrollView style={styles.detailContainer} showsVerticalScrollIndicator={false}>
        {/* Detail Header */}
        <View style={styles.detailHeader}>
          <Text style={styles.productEmoji}>{selectedListing.imageIcon}</Text>
          <TouchableOpacity onPress={() => setView('marketplace')} style={styles.detailBackButton}>
            <ArrowLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.detailHeaderOverlay}>
            <View style={styles.detailHeaderContent}>
              <View>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedBadgeText}>VERIFICADO</Text>
                </View>
                <Text style={styles.detailProductName}>{selectedListing.product}</Text>
                <View style={styles.locationRow}>
                  <MapPin size={14} color="#ffffff" />
                  <Text style={styles.detailLocation}>{selectedListing.location}</Text>
                </View>
              </View>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreBoxLabel}>AgroScore</Text>
                <Text style={styles.scoreBoxValue}>{selectedListing.score}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.detailBody}>
          <View style={styles.priceQuantityRow}>
            <View style={styles.priceBox}>
              <Text style={styles.priceLabel}>Precio Ref.</Text>
              <Text style={styles.priceValue}>{selectedListing.price}</Text>
            </View>
            <View style={styles.quantityBox}>
              <Text style={styles.quantityLabel}>Disponible</Text>
              <Text style={styles.quantityValue}>{selectedListing.quantity}</Text>
            </View>
          </View>

          {/* Producer Card */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Información del Productor</Text>
            <View style={styles.producerCard}>
              <View style={styles.producerAvatar}>
                <Text style={styles.producerAvatarText}>
                  {selectedListing.farmer.charAt(0)}
                </Text>
              </View>
              <View style={styles.producerInfo}>
                <Text style={styles.producerName}>{selectedListing.farmer}</Text>
                <Text style={styles.producerMeta}>Miembro desde 2021</Text>
              </View>
              <TouchableOpacity style={styles.messageButton}>
                <MessageCircle size={20} color="#059669" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Detalles del Lote</Text>
            <Text style={styles.detailDescription}>{selectedListing.description}</Text>
            <View style={styles.harvestBadge}>
              <View style={styles.harvestDot} />
              <Text style={styles.harvestText}>Cosechado: {selectedListing.harvestDate}</Text>
            </View>
          </View>

          {/* Action Button */}
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.buyButton}>
              <ShoppingBag size={20} color="#ffffff" />
              <Text style={styles.buyButtonText}>Enviar Intención de Compra</Text>
            </TouchableOpacity>
            <Text style={styles.actionHint}>Al enviar, el productor recibirá una notificación.</Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  const ProducersCatalog = () => (
    <ScrollView style={styles.catalogContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.catalogHeader}>
        <TouchableOpacity onPress={() => setView('marketplace')} style={styles.backButton}>
          <ArrowLeft size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.catalogTitle}>Catálogo de Productores</Text>
      </View>
      <TextInput 
        placeholder="Buscar por nombre o zona..." 
        placeholderTextColor="#9ca3af"
        style={styles.catalogSearch}
      />
      
      <View style={styles.catalogContent}>
        {[1, 2, 3].map(i => (
          <View key={i} style={styles.producerListCard}>
            <View style={styles.producerListHeader}>
              <View style={styles.producerListLeft}>
                <View style={styles.producerListAvatar} />
                <View>
                  <Text style={styles.producerListName}>Agropecuaria El Sol</Text>
                  <View style={styles.producerListLocationRow}>
                    <MapPin size={10} color="#6b7280" />
                    <Text style={styles.producerListLocation}>Manabí, EC</Text>
                  </View>
                </View>
              </View>
              <View style={styles.producerScoreBadge}>
                <Text style={styles.producerScoreText}>980 Score</Text>
              </View>
            </View>
            <View style={styles.producerTags}>
              <View style={styles.tagItem}>
                <Text style={styles.tagText}>Maíz</Text>
              </View>
              <View style={styles.tagItem}>
                <Text style={styles.tagText}>Plátano</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.viewProfileButton}>
              <Text style={styles.viewProfileText}>Ver Perfil</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  if (view === 'detail') return <LotDetail />;
  if (view === 'producers') return <ProducersCatalog />;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Search */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Marketplace</Text>
          <View style={styles.cartIcon}>
            <ShoppingBag size={20} color="#111827" />
            <View style={styles.cartBadge} />
          </View>
        </View>
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Search size={18} color="#9ca3af" />
            <TextInput 
              placeholder="Buscar maíz, cacao..." 
              placeholderTextColor="#9ca3af"
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['Todos', 'Granos', 'Frutas', 'Vegetales'].map((cat, i) => (
            <TouchableOpacity 
              key={i} 
              style={[styles.categoryButton, i === 0 && styles.categoryButtonActive]}
            >
              <Text style={[styles.categoryText, i === 0 && styles.categoryTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Listings */}
      <View style={styles.listingsContainer}>
        <View style={styles.listingsHeader}>
          <Text style={styles.listingsTitle}>Ofertas Destacadas</Text>
          <TouchableOpacity onPress={() => setView('producers')} style={styles.viewProducersButton}>
            <Text style={styles.viewProducersText}>Ver Productores</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.listingsList}>
          {LISTINGS_DATA.map(item => (
            <TouchableOpacity 
              key={item.id} 
              onPress={() => handleSelectListing(item)} 
              style={styles.listingCard}
              activeOpacity={0.8}
            >
              <View style={styles.listingImageContainer}>
                <Text style={styles.listingEmoji}>{item.imageIcon}</Text>
                <View style={styles.listingScoreBadge}>
                  <Star size={12} color="#facc15" fill="#facc15" />
                  <Text style={styles.listingScoreText}>{item.score}</Text>
                </View>
                <View style={styles.listingQuantityBadge}>
                  <ShoppingBag size={12} color="#ffffff" />
                  <Text style={styles.listingQuantityText}>{item.quantity}</Text>
                </View>
              </View>
              <View style={styles.listingContent}>
                <View style={styles.listingContentTop}>
                  <Text style={styles.listingProduct}>{item.product}</Text>
                  <Text style={styles.listingPrice}>{item.price}</Text>
                </View>
                <View style={styles.listingLocationRow}>
                  <MapPin size={14} color="#9ca3af" />
                  <Text style={styles.listingLocation}>{item.location}</Text>
                </View>
                
                <View style={styles.listingFooter}>
                  <View style={styles.listingFarmerRow}>
                    <View style={styles.listingFarmerAvatar}>
                      <Text style={styles.listingFarmerAvatarText}>
                        {item.farmer.substring(0, 2).toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.listingFarmerName}>{item.farmer}</Text>
                  </View>
                  <ChevronRight size={18} color="#d1d5db" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.5,
  },
  cartIcon: {
    padding: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 50,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  searchRow: {
    flexDirection: 'row',
    gap: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111827',
  },
  filterButton: {
    backgroundColor: '#059669',
    padding: 14,
    borderRadius: 12,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    marginRight: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryButtonActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4b5563',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  listingsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 96,
  },
  listingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  listingsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  viewProducersButton: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
  },
  viewProducersText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  listingsList: {
    gap: 20,
  },
  listingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 20,
  },
  listingImageContainer: {
    height: 160,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  listingEmoji: {
    fontSize: 60,
  },
  listingScoreBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  listingScoreText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  listingQuantityBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 150, 105, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  listingQuantityText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  listingContent: {
    padding: 20,
  },
  listingContentTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listingProduct: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    lineHeight: 24,
  },
  listingPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#059669',
  },
  listingLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  listingLocation: {
    fontSize: 14,
    color: '#6b7280',
  },
  listingFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f9fafb',
  },
  listingFarmerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  listingFarmerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ecfdf5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listingFarmerAvatarText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  listingFarmerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  // Detail view styles
  detailContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  detailHeader: {
    height: 288,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  productEmoji: {
    fontSize: 96,
  },
  detailBackButton: {
    position: 'absolute',
    top: 48,
    left: 24,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
  },
  detailHeaderOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 64,
    backgroundColor: 'transparent',
  },
  detailHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  verifiedBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  verifiedBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1,
  },
  detailProductName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
    maxWidth: 250,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailLocation: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  scoreBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  scoreBoxLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scoreBoxValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  detailBody: {
    marginTop: -24,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 96,
  },
  priceQuantityRow: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 24,
  },
  priceBox: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9ca3af',
    textTransform: 'uppercase',
  },
  priceValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#059669',
  },
  quantityBox: {
    flex: 1,
    alignItems: 'flex-end',
  },
  quantityLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9ca3af',
    textTransform: 'uppercase',
  },
  quantityValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  producerCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f9fafb',
  },
  producerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ecfdf5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#a7f3d0',
  },
  producerAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#065f46',
  },
  producerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  producerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  producerMeta: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  messageButton: {
    padding: 12,
    backgroundColor: '#ecfdf5',
    borderRadius: 50,
  },
  detailDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 22,
  },
  harvestBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: 'flex-start',
    gap: 8,
  },
  harvestDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
  harvestText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4b5563',
  },
  actionContainer: {
    paddingTop: 16,
  },
  buyButton: {
    backgroundColor: '#059669',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  actionHint: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 16,
  },
  // Catalog styles
  catalogContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  catalogHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  backButton: {
    padding: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 50,
  },
  catalogTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  catalogSearch: {
    backgroundColor: '#f3f4f6',
    marginHorizontal: 24,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 14,
    color: '#111827',
  },
  catalogContent: {
    paddingHorizontal: 24,
    paddingBottom: 96,
  },
  producerListCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 16,
  },
  producerListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  producerListLeft: {
    flexDirection: 'row',
    gap: 12,
  },
  producerListAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e5e7eb',
  },
  producerListName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  producerListLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  producerListLocation: {
    fontSize: 12,
    color: '#6b7280',
  },
  producerScoreBadge: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  producerScoreText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#065f46',
  },
  producerTags: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  tagItem: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 10,
    color: '#4b5563',
  },
  viewProfileButton: {
    borderWidth: 1,
    borderColor: '#a7f3d0',
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  viewProfileText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#059669',
  },
});
