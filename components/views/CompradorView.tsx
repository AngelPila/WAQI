import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ShoppingBag,
  Search,
  Filter,
  MapPin,
  ArrowLeft,
  Star,
  MessageCircle,
  ChevronRight,
} from 'lucide-react-native';
import { Listing } from '../../types';

const LISTINGS_DATA: Listing[] = [
  {
    id: 1,
    product: 'Maíz Amarillo Híbrido',
    farmer: 'Finca La Esperanza',
    location: 'Ventanas, Los Ríos',
    quantity: '50 Ton',
    price: '$18.5/qq',
    score: 950,
    imageIcon: '🌽',
    description:
      'Maíz de alta calidad, secado en máquina. Humedad del 13%. Listo para entrega inmediata.',
    harvestDate: '20 Jun 2024',
  },
  {
    id: 2,
    product: 'Cacao CCN51 Fermentado',
    farmer: 'Agropecuaria San Juan',
    location: 'Machala, El Oro',
    quantity: '5 Ton',
    price: '$150/qq',
    score: 880,
    imageIcon: '🍫',
    description:
      'Grano fermentado 85%, excelente aroma. Certificación orgánica en trámite.',
    harvestDate: '15 Jun 2024',
  },
  {
    id: 3,
    product: 'Soya para Procesar',
    farmer: 'Hnos. Garzón',
    location: 'Quevedo',
    quantity: '120 Ton',
    price: '$22/qq',
    score: 910,
    imageIcon: '🌱',
    description: 'Soya limpia, lista para extracción de aceite. Venta mínima 10 Ton.',
    harvestDate: '22 Jun 2024',
  },
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
        {/* Header Image */}
        <View style={styles.detailHeader}>
          <Text style={styles.detailEmoji}>{selectedListing.imageIcon}</Text>
          <TouchableOpacity
            style={styles.detailBackButton}
            onPress={() => setView('marketplace')}
          >
            <ArrowLeft color="#ffffff" size={24} />
          </TouchableOpacity>
          <View style={styles.detailHeaderOverlay}>
            <View style={styles.detailHeaderContent}>
              <View>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedBadgeText}>VERIFICADO</Text>
                </View>
                <Text style={styles.detailProductName}>{selectedListing.product}</Text>
                <View style={styles.detailLocation}>
                  <MapPin color="rgba(255,255,255,0.9)" size={14} />
                  <Text style={styles.detailLocationText}>{selectedListing.location}</Text>
                </View>
              </View>
              <View style={styles.detailScoreBadge}>
                <Text style={styles.detailScoreLabel}>AgroScore</Text>
                <Text style={styles.detailScoreValue}>{selectedListing.score}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.detailContent}>
          {/* Price and Quantity */}
          <View style={styles.priceQuantityCard}>
            <View>
              <Text style={styles.priceLabel}>PRECIO REF.</Text>
              <Text style={styles.priceValue}>{selectedListing.price}</Text>
            </View>
            <View style={styles.priceQuantityDivider} />
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.priceLabel}>DISPONIBLE</Text>
              <Text style={styles.quantityValue}>{selectedListing.quantity}</Text>
            </View>
          </View>

          {/* Producer Card */}
          <View style={styles.producerSection}>
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
                <MessageCircle color="#059669" size={20} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Detalles del Lote</Text>
            <Text style={styles.descriptionText}>{selectedListing.description}</Text>
            <View style={styles.harvestBadge}>
              <View style={styles.harvestDot} />
              <Text style={styles.harvestText}>
                Cosechado: {selectedListing.harvestDate}
              </Text>
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity style={styles.buyButton}>
            <ShoppingBag color="#ffffff" size={20} />
            <Text style={styles.buyButtonText}>Enviar Intención de Compra</Text>
          </TouchableOpacity>
          <Text style={styles.buyDisclaimer}>
            Al enviar, el productor recibirá una notificación.
          </Text>
        </View>
      </ScrollView>
    );
  };

  const ProducersCatalog = () => (
    <SafeAreaView style={styles.producersContainer}>
      <View style={styles.producersHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setView('marketplace')}
        >
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <Text style={styles.producersTitle}>Catálogo de Productores</Text>
      </View>
      <TextInput
        style={styles.producersSearch}
        placeholder="Buscar por nombre o zona..."
        placeholderTextColor="#9ca3af"
      />

      <ScrollView style={styles.producersList} showsVerticalScrollIndicator={false}>
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.producerListCard}>
            <View style={styles.producerListHeader}>
              <View style={styles.producerListLeft}>
                <View style={styles.producerListAvatar} />
                <View>
                  <Text style={styles.producerListName}>Agropecuaria El Sol</Text>
                  <View style={styles.producerListLocation}>
                    <MapPin color="#6b7280" size={10} />
                    <Text style={styles.producerListLocationText}>Manabí, EC</Text>
                  </View>
                </View>
              </View>
              <View style={styles.producerListScore}>
                <Text style={styles.producerListScoreText}>980 Score</Text>
              </View>
            </View>
            <View style={styles.producerListTags}>
              <View style={styles.productTag}>
                <Text style={styles.productTagText}>Maíz</Text>
              </View>
              <View style={styles.productTag}>
                <Text style={styles.productTagText}>Plátano</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.viewProfileButton}>
              <Text style={styles.viewProfileButtonText}>Ver Perfil</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );

  if (view === 'detail') return <LotDetail />;
  if (view === 'producers') return <ProducersCatalog />;

  // Marketplace View
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Marketplace</Text>
          <View style={styles.cartButton}>
            <ShoppingBag color="#111827" size={20} />
            <View style={styles.cartBadge} />
          </View>
        </View>
        <View style={styles.searchRow}>
          <View style={styles.searchInput}>
            <Search color="#9ca3af" size={18} />
            <TextInput
              style={styles.searchTextInput}
              placeholder="Buscar maíz, cacao..."
              placeholderTextColor="#9ca3af"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter color="#ffffff" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.categories}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['Todos', 'Granos', 'Frutas', 'Vegetales'].map((cat, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.categoryButton, i === 0 && styles.categoryButtonActive]}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    i === 0 && styles.categoryButtonTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Listings */}
        <View style={styles.listingsSection}>
          <View style={styles.listingsHeader}>
            <Text style={styles.listingsTitle}>Ofertas Destacadas</Text>
            <TouchableOpacity
              style={styles.viewProducersButton}
              onPress={() => setView('producers')}
            >
              <Text style={styles.viewProducersButtonText}>Ver Productores</Text>
            </TouchableOpacity>
          </View>

          {LISTINGS_DATA.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.listingCard}
              onPress={() => handleSelectListing(item)}
              activeOpacity={0.95}
            >
              <View style={styles.listingImage}>
                <Text style={styles.listingEmoji}>{item.imageIcon}</Text>
                <View style={styles.listingScoreBadge}>
                  <Star color="#facc15" size={12} fill="#facc15" />
                  <Text style={styles.listingScoreText}>{item.score}</Text>
                </View>
                <View style={styles.listingQuantityBadge}>
                  <ShoppingBag color="#ffffff" size={12} />
                  <Text style={styles.listingQuantityText}>{item.quantity}</Text>
                </View>
              </View>
              <View style={styles.listingContent}>
                <View style={styles.listingTitleRow}>
                  <Text style={styles.listingProductName}>{item.product}</Text>
                  <Text style={styles.listingPrice}>{item.price}</Text>
                </View>
                <View style={styles.listingLocationRow}>
                  <MapPin color="#9ca3af" size={14} />
                  <Text style={styles.listingLocationText}>{item.location}</Text>
                </View>
                <View style={styles.listingFarmerRow}>
                  <View style={styles.listingFarmerAvatar}>
                    <Text style={styles.listingFarmerAvatarText}>
                      {item.farmer.substring(0, 2).toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.listingFarmerName}>{item.farmer}</Text>
                  <ChevronRight color="#d1d5db" size={18} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
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
    fontWeight: 'bold',
    color: '#111827',
  },
  cartButton: {
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
  searchInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchTextInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111827',
  },
  filterButton: {
    backgroundColor: '#059669',
    padding: 14,
    borderRadius: 12,
  },
  categories: {
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4b5563',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  listingsSection: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  listingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
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
    borderRadius: 12,
  },
  viewProducersButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#059669',
  },
  listingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  listingImage: {
    height: 160,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  listingEmoji: {
    fontSize: 64,
  },
  listingScoreBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
  listingContent: {
    padding: 20,
  },
  listingTitleRow: {
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
  listingLocationText: {
    fontSize: 14,
    color: '#6b7280',
  },
  listingFarmerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f9fafb',
  },
  listingFarmerAvatar: {
    width: 32,
    height: 32,
    backgroundColor: '#ecfdf5',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
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
  // Detail View Styles
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
  detailEmoji: {
    fontSize: 144,
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
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 48,
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
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  verifiedBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  detailProductName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  detailLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailLocationText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  detailScoreBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailScoreLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  detailScoreValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  detailContent: {
    padding: 24,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  priceQuantityCard: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 24,
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9ca3af',
  },
  priceValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#059669',
    marginTop: 4,
  },
  priceQuantityDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e7eb',
  },
  quantityValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 4,
  },
  producerSection: {
    marginBottom: 24,
  },
  sectionTitle: {
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f9fafb',
  },
  producerAvatar: {
    width: 56,
    height: 56,
    backgroundColor: '#ecfdf5',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#d1fae5',
    marginRight: 16,
  },
  producerAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
  },
  producerInfo: {
    flex: 1,
  },
  producerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  producerMeta: {
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
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  harvestText: {
    fontSize: 12,
    color: '#4b5563',
    fontWeight: '500',
  },
  buyButton: {
    backgroundColor: '#059669',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#10b981',
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
  buyDisclaimer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 16,
    marginBottom: 100,
  },
  // Producers Catalog Styles
  producersContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  producersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  producersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  producersSearch: {
    marginHorizontal: 24,
    marginTop: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111827',
  },
  producersList: {
    padding: 24,
  },
  producerListCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
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
    backgroundColor: '#e5e7eb',
    borderRadius: 24,
  },
  producerListName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  producerListLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  producerListLocationText: {
    fontSize: 12,
    color: '#6b7280',
  },
  producerListScore: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  producerListScoreText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#059669',
  },
  producerListTags: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  productTag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  productTagText: {
    fontSize: 10,
    color: '#4b5563',
  },
  viewProfileButton: {
    borderWidth: 1,
    borderColor: '#d1fae5',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
  },
  viewProfileButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#059669',
  },
});
