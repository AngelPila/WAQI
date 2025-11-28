import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
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
      <ScrollView style={styles.detailContainer}>
        {/* Detail Header */}
        <View style={styles.detailHeader}>
          <Text style={styles.productEmoji}>{selectedListing.imageIcon}</Text>
          <TouchableOpacity onPress={() => setView('marketplace')} style={styles.detailBackButton}>
            <ArrowLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.detailHeaderOverlay}>
            <View style={styles.detailHeaderContent}>
              <View style={styles.detailHeaderLeft}>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>Verificado</Text>
                </View>
                <Text style={styles.detailProductName}>{selectedListing.product}</Text>
                <View style={styles.locationRow}>
                  <MapPin size={14} color="rgba(255,255,255,0.9)" />
                  <Text style={styles.detailLocation}>{selectedListing.location}</Text>
                </View>
              </View>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreLabel}>AgroScore</Text>
                <Text style={styles.scoreValue}>{selectedListing.score}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.detailContent}>
          <View style={styles.priceQuantityRow}>
            <View>
              <Text style={styles.priceLabel}>Precio Ref.</Text>
              <Text style={styles.priceValue}>{selectedListing.price}</Text>
            </View>
            <View style={styles.quantitySection}>
              <Text style={styles.quantityLabel}>Disponible</Text>
              <Text style={styles.quantityValue}>{selectedListing.quantity}</Text>
            </View>
          </View>

          {/* Producer Card */}
          <View style={styles.producerSection}>
            <Text style={styles.sectionLabel}>Información del Productor</Text>
            <View style={styles.producerCard}>
              <View style={styles.producerAvatar}>
                <Text style={styles.producerAvatarText}>{selectedListing.farmer.charAt(0)}</Text>
              </View>
              <View style={styles.producerInfo}>
                <Text style={styles.producerName}>{selectedListing.farmer}</Text>
                <Text style={styles.producerSince}>Miembro desde 2021</Text>
              </View>
              <TouchableOpacity style={styles.messageButton}>
                <MessageCircle size={20} color="#059669" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionLabel}>Detalles del Lote</Text>
            <Text style={styles.descriptionText}>{selectedListing.description}</Text>
            <View style={styles.harvestDateTag}>
              <View style={styles.harvestDot} />
              <Text style={styles.harvestDateText}>Cosechado: {selectedListing.harvestDate}</Text>
            </View>
          </View>

          {/* Action Button */}
          <View style={styles.actionSection}>
            <TouchableOpacity style={styles.buyButton}>
              <ShoppingBag size={20} color="#ffffff" />
              <Text style={styles.buyButtonText}>Enviar Intención de Compra</Text>
            </TouchableOpacity>
            <Text style={styles.disclaimerText}>Al enviar, el productor recibirá una notificación.</Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  const ProducersCatalog = () => (
    <View style={styles.catalogContainer}>
      <View style={styles.catalogHeader}>
        <TouchableOpacity onPress={() => setView('marketplace')} style={styles.backButton}>
          <ArrowLeft size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.catalogTitle}>Catálogo de Productores</Text>
      </View>
      <TextInput 
        placeholder="Buscar por nombre o zona..." 
        placeholderTextColor="#9ca3af"
        style={styles.catalogSearchInput}
      />
      
      <ScrollView style={styles.catalogList} contentContainerStyle={styles.catalogListContent}>
        {[1,2,3].map(i => (
          <View key={i} style={styles.producerListCard}>
            <View style={styles.producerListHeader}>
              <View style={styles.producerListInfo}>
                <View style={styles.producerListAvatar} />
                <View>
                  <Text style={styles.producerListName}>Agropecuaria El Sol</Text>
                  <View style={styles.locationRowSmall}>
                    <MapPin size={10} color="#6b7280" />
                    <Text style={styles.producerListLocation}>Manabí, EC</Text>
                  </View>
                </View>
              </View>
              <View style={styles.scoreBadge}>
                <Text style={styles.scoreBadgeText}>980 Score</Text>
              </View>
            </View>
            <View style={styles.tagsRow}>
              <View style={styles.tag}><Text style={styles.tagText}>Maíz</Text></View>
              <View style={styles.tag}><Text style={styles.tagText}>Plátano</Text></View>
            </View>
            <TouchableOpacity style={styles.viewProfileButton}>
              <Text style={styles.viewProfileText}>Ver Perfil</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  if (view === 'detail') return <LotDetail />;
  if (view === 'producers') return <ProducersCatalog />;

  return (
    <View style={styles.container}>
      {/* Header Search */}
      <View style={styles.searchHeader}>
        <View style={styles.searchHeaderTop}>
          <Text style={styles.marketplaceTitle}>Marketplace</Text>
          <View style={styles.cartIcon}>
            <ShoppingBag size={20} color="#111827" />
            <View style={styles.cartBadge} />
          </View>
        </View>
        <View style={styles.searchRow}>
          <View style={styles.searchInputContainer}>
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

      <ScrollView style={styles.mainContent} contentContainerStyle={styles.mainContentContainer}>
        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {['Todos', 'Granos', 'Frutas', 'Vegetales'].map((cat, i) => (
            <TouchableOpacity 
              key={i} 
              style={[styles.categoryChip, i === 0 && styles.categoryChipActive]}
            >
              <Text style={[styles.categoryChipText, i === 0 && styles.categoryChipTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Listings */}
        <View style={styles.listingsSection}>
          <View style={styles.listingsHeader}>
            <Text style={styles.listingsTitle}>Ofertas Destacadas</Text>
            <TouchableOpacity onPress={() => setView('producers')} style={styles.viewProducersButton}>
              <Text style={styles.viewProducersText}>Ver Productores</Text>
            </TouchableOpacity>
          </View>
          
          {LISTINGS_DATA.map(item => (
            <TouchableOpacity 
              key={item.id} 
              onPress={() => handleSelectListing(item)} 
              style={styles.listingCard}
              activeOpacity={0.7}
            >
              <View style={styles.listingImageContainer}>
                <Text style={styles.listingEmoji}>{item.imageIcon}</Text>
                <View style={styles.listingScoreBadge}>
                  <Star size={12} color="#facc15" />
                  <Text style={styles.listingScoreText}>{item.score}</Text>
                </View>
                <View style={styles.listingQuantityBadge}>
                  <ShoppingBag size={12} color="#ffffff" />
                  <Text style={styles.listingQuantityText}>{item.quantity}</Text>
                </View>
              </View>
              <View style={styles.listingInfo}>
                <View style={styles.listingInfoHeader}>
                  <Text style={styles.listingProductName} numberOfLines={1}>{item.product}</Text>
                  <Text style={styles.listingPrice}>{item.price}</Text>
                </View>
                <View style={styles.listingLocationRow}>
                  <MapPin size={14} color="#9ca3af" />
                  <Text style={styles.listingLocation}>{item.location}</Text>
                </View>
                
                <View style={styles.listingFooter}>
                  <View style={styles.listingFarmerInfo}>
                    <View style={styles.listingFarmerAvatar}>
                      <Text style={styles.listingFarmerAvatarText}>{item.farmer.substring(0, 2).toUpperCase()}</Text>
                    </View>
                    <Text style={styles.listingFarmerName} numberOfLines={1}>{item.farmer}</Text>
                  </View>
                  <ChevronRight size={18} color="#d1d5db" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  searchHeader: {
    backgroundColor: '#ffffff',
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  marketplaceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    letterSpacing: -0.5,
  },
  cartIcon: {
    padding: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    backgroundColor: '#ef4444',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  searchRow: {
    flexDirection: 'row',
    gap: 8,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    borderRadius: 12,
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
    padding: 12,
    borderRadius: 12,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  mainContent: {
    flex: 1,
  },
  mainContentContainer: {
    paddingBottom: 100,
  },
  categoriesScroll: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 12,
  },
  categoryChipActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4b5563',
  },
  categoryChipTextActive: {
    color: '#ffffff',
  },
  listingsSection: {
    paddingHorizontal: 24,
    gap: 20,
  },
  listingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  listingsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  viewProducersButton: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  viewProducersText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#059669',
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
  },
  listingImageContainer: {
    height: 160,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  listingEmoji: {
    fontSize: 60,
  },
  listingScoreBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  listingScoreText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  listingQuantityBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(5, 150, 105, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  listingQuantityText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  listingInfo: {
    padding: 20,
  },
  listingInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listingProductName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  listingPrice: {
    fontSize: 20,
    fontWeight: 'bold',
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
  listingFarmerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  listingFarmerAvatar: {
    width: 32,
    height: 32,
    backgroundColor: '#ecfdf5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listingFarmerAvatarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#059669',
  },
  listingFarmerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    flex: 1,
  },
  // Detail View
  detailContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  detailHeader: {
    height: 288,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  productEmoji: {
    fontSize: 100,
  },
  detailBackButton: {
    position: 'absolute',
    top: 48,
    left: 24,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  detailHeaderOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 32,
  },
  detailHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  detailHeaderLeft: {
    flex: 1,
  },
  verifiedBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailProductName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailLocation: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  scoreBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  detailContent: {
    padding: 24,
    paddingTop: 0,
    marginTop: -24,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 100,
  },
  priceQuantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginTop: 24,
    marginBottom: 24,
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9ca3af',
    textTransform: 'uppercase',
  },
  priceValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#059669',
  },
  quantitySection: {
    alignItems: 'flex-end',
  },
  quantityLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9ca3af',
    textTransform: 'uppercase',
  },
  quantityValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  producerSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  producerCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
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
    backgroundColor: '#ecfdf5',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#d1fae5',
  },
  producerAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#065f46',
  },
  producerInfo: {
    flex: 1,
  },
  producerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  producerSince: {
    fontSize: 12,
    color: '#6b7280',
  },
  messageButton: {
    padding: 12,
    backgroundColor: '#ecfdf5',
    borderRadius: 20,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  descriptionText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 22,
    marginBottom: 12,
  },
  harvestDateTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    gap: 8,
  },
  harvestDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
  harvestDateText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4b5563',
  },
  actionSection: {
    paddingTop: 16,
  },
  buyButton: {
    backgroundColor: '#059669',
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  disclaimerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 16,
  },
  // Catalog View
  catalogContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  catalogHeader: {
    backgroundColor: '#ffffff',
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  backButton: {
    padding: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
  },
  catalogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  catalogSearchInput: {
    backgroundColor: '#f3f4f6',
    marginHorizontal: 24,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 14,
    color: '#111827',
  },
  catalogList: {
    flex: 1,
  },
  catalogListContent: {
    padding: 24,
    gap: 16,
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
    gap: 12,
  },
  producerListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  producerListInfo: {
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
    fontWeight: 'bold',
    color: '#111827',
  },
  locationRowSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  producerListLocation: {
    fontSize: 12,
    color: '#6b7280',
  },
  scoreBadge: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  scoreBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#065f46',
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
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
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#d1fae5',
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  viewProfileText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#059669',
  },
});
