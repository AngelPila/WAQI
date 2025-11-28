import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  TextInput 
} from 'react-native';
import { 
  ShoppingBag, Search, Filter, MapPin, ArrowLeft, Star, 
  MessageCircle, ChevronRight 
} from 'lucide-react-native';
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
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Detail Header */}
          <View className="h-72 bg-emerald-600 items-center justify-center relative">
            <Text className="text-9xl">{selectedListing.imageIcon}</Text>
            <TouchableOpacity 
              onPress={() => setView('marketplace')} 
              className="absolute top-12 left-6 p-2 bg-white/20 rounded-full"
            >
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
            <View className="absolute bottom-0 left-0 right-0 p-6 bg-black/50">
              <View className="flex-row justify-between items-end">
                <View className="flex-1">
                  <View className="bg-emerald-500 px-2 py-1 rounded self-start mb-2">
                    <Text className="text-[10px] font-bold text-white uppercase tracking-wide">Verificado</Text>
                  </View>
                  <Text className="text-3xl font-bold text-white leading-tight mb-1">{selectedListing.product}</Text>
                  <View className="flex-row items-center gap-1">
                    <MapPin size={14} color="white" />
                    <Text className="text-white/90 text-sm">{selectedListing.location}</Text>
                  </View>
                </View>
                <View className="bg-white/20 rounded-lg px-3 py-1 items-center">
                  <Text className="text-xs text-white/80">AgroScore</Text>
                  <Text className="font-bold text-lg text-white">{selectedListing.score}</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="px-6 py-6 -mt-6 bg-white rounded-t-3xl">
            <View className="flex-row justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-6">
              <View>
                <Text className="text-gray-400 text-xs uppercase font-bold">Precio Ref.</Text>
                <Text className="text-3xl font-bold text-emerald-700">{selectedListing.price}</Text>
              </View>
              <View className="items-end">
                <Text className="text-gray-400 text-xs uppercase font-bold">Disponible</Text>
                <Text className="text-2xl font-bold text-gray-800">{selectedListing.quantity}</Text>
              </View>
            </View>

            {/* Producer Card */}
            <View className="mb-6">
              <Text className="text-sm font-bold text-gray-900 mb-3">Información del Productor</Text>
              <View className="bg-white shadow-lg p-4 rounded-2xl border border-gray-50 flex-row items-center gap-4">
                <View className="h-14 w-14 bg-emerald-100 rounded-full items-center justify-center border-2 border-emerald-200">
                  <Text className="text-emerald-800 font-bold text-xl">{selectedListing.farmer.charAt(0)}</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-gray-900 text-lg leading-tight">{selectedListing.farmer}</Text>
                  <Text className="text-xs text-gray-500">Miembro desde 2021</Text>
                </View>
                <TouchableOpacity className="p-3 bg-emerald-50 rounded-full">
                  <MessageCircle size={20} color="#059669" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Description */}
            <View className="mb-6">
              <Text className="text-sm font-bold text-gray-900 mb-2">Detalles del Lote</Text>
              <Text className="text-gray-600 text-sm leading-relaxed">{selectedListing.description}</Text>
              <View className="mt-3 flex-row items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg self-start">
                <View className="w-2 h-2 rounded-full bg-emerald-500" />
                <Text className="text-xs font-medium text-gray-600">Cosechado: {selectedListing.harvestDate}</Text>
              </View>
            </View>

            {/* Action Button */}
            <View className="pt-4 pb-24">
              <TouchableOpacity 
                className="bg-emerald-600 py-4 rounded-2xl shadow-xl flex-row items-center justify-center gap-2"
                activeOpacity={0.8}
              >
                <ShoppingBag size={20} color="white" />
                <Text className="text-white font-bold text-lg">Enviar Intención de Compra</Text>
              </TouchableOpacity>
              <Text className="text-center text-xs text-gray-400 mt-4">Al enviar, el productor recibirá una notificación.</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  const ProducersCatalog = () => (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-6 pt-12 pb-4 shadow-sm">
        <View className="flex-row items-center gap-4 mb-4">
          <TouchableOpacity onPress={() => setView('marketplace')} className="p-2 bg-gray-100 rounded-full">
            <ArrowLeft size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Catálogo de Productores</Text>
        </View>
        <TextInput
          placeholder="Buscar por nombre o zona..."
          placeholderTextColor="#9ca3af"
          className="bg-gray-100 py-3 px-4 rounded-xl text-sm text-gray-900"
        />
      </View>
      
      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        <View className="gap-4 pb-24">
          {[1,2,3].map(i => (
            <View key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-row gap-3">
                  <View className="h-12 w-12 bg-gray-200 rounded-full" />
                  <View>
                    <Text className="font-bold text-gray-900">Agropecuaria El Sol</Text>
                    <View className="flex-row items-center gap-1">
                      <MapPin size={10} color="#6b7280" />
                      <Text className="text-xs text-gray-500">Manabí, EC</Text>
                    </View>
                  </View>
                </View>
                <View className="bg-emerald-100 px-2 py-1 rounded">
                  <Text className="text-emerald-800 text-xs font-bold">980 Score</Text>
                </View>
              </View>
              <View className="flex-row gap-2 mb-3">
                <View className="bg-gray-100 px-2 py-1 rounded">
                  <Text className="text-[10px] text-gray-600">Maíz</Text>
                </View>
                <View className="bg-gray-100 px-2 py-1 rounded">
                  <Text className="text-[10px] text-gray-600">Plátano</Text>
                </View>
              </View>
              <TouchableOpacity className="py-2 border border-emerald-200 rounded-xl">
                <Text className="text-sm text-emerald-600 font-bold text-center">Ver Perfil</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  if (view === 'detail') return <LotDetail />;
  if (view === 'producers') return <ProducersCatalog />;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header Search */}
      <View className="bg-white px-6 pt-12 pb-4 shadow-sm rounded-b-3xl">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold tracking-tight text-gray-900">Marketplace</Text>
          <View className="p-2 bg-gray-100 rounded-full relative">
            <ShoppingBag size={20} color="#374151" />
            <View className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white" />
          </View>
        </View>
        <View className="flex-row gap-2">
          <View className="flex-1 relative">
            <View className="absolute left-3 top-3 z-10">
              <Search size={18} color="#9ca3af" />
            </View>
            <TextInput
              placeholder="Buscar maíz, cacao..."
              placeholderTextColor="#9ca3af"
              className="bg-gray-100 py-3 pl-10 pr-4 rounded-xl text-sm text-gray-900"
            />
          </View>
          <TouchableOpacity className="bg-emerald-600 p-3 rounded-xl shadow-md">
            <Filter size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <View className="px-6 py-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-3">
            {['Todos', 'Granos', 'Frutas', 'Vegetales'].map((cat, i) => (
              <TouchableOpacity 
                key={i} 
                className={`px-5 py-2.5 rounded-full ${i === 0 ? 'bg-emerald-600 shadow-lg' : 'bg-white border border-gray-200'}`}
                activeOpacity={0.8}
              >
                <Text className={`text-sm font-bold ${i === 0 ? 'text-white' : 'text-gray-600'}`}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Listings */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="pb-24">
          <View className="flex-row justify-between items-end mb-6">
            <Text className="font-bold text-xl text-gray-900">Ofertas Destacadas</Text>
            <TouchableOpacity onPress={() => setView('producers')} className="bg-emerald-50 px-3 py-1.5 rounded-full">
              <Text className="text-xs text-emerald-600 font-bold">Ver Productores</Text>
            </TouchableOpacity>
          </View>
          
          <View className="gap-5">
            {LISTINGS_DATA.map(item => (
              <TouchableOpacity 
                key={item.id} 
                onPress={() => handleSelectListing(item)} 
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100"
                activeOpacity={0.9}
              >
                <View className="h-40 bg-gray-100 relative items-center justify-center">
                  <Text className="text-6xl">{item.imageIcon}</Text>
                  <View className="absolute top-4 right-4 bg-white/90 px-3 py-1.5 rounded-full flex-row items-center gap-1 shadow-sm">
                    <Star size={12} color="#facc15" fill="#facc15" />
                    <Text className="text-xs font-bold text-gray-900">{item.score}</Text>
                  </View>
                  <View className="absolute bottom-4 left-4 bg-emerald-600/90 px-3 py-1.5 rounded-lg flex-row items-center gap-1">
                    <ShoppingBag size={12} color="white" />
                    <Text className="text-xs font-bold text-white">{item.quantity}</Text>
                  </View>
                </View>
                <View className="p-5">
                  <View className="flex-row justify-between items-start mb-2">
                    <Text className="font-bold text-lg text-gray-900 leading-tight flex-1">{item.product}</Text>
                    <Text className="font-bold text-xl text-emerald-700">{item.price}</Text>
                  </View>
                  <View className="flex-row items-center gap-1 mb-4">
                    <MapPin size={14} color="#9ca3af" />
                    <Text className="text-sm text-gray-500">{item.location}</Text>
                  </View>
                  
                  <View className="flex-row items-center justify-between pt-4 border-t border-gray-50">
                    <View className="flex-row items-center gap-2">
                      <View className="h-8 w-8 bg-emerald-100 rounded-full items-center justify-center">
                        <Text className="text-emerald-700 font-bold text-xs">{item.farmer.substring(0, 2).toUpperCase()}</Text>
                      </View>
                      <Text className="text-sm font-medium text-gray-700">{item.farmer}</Text>
                    </View>
                    <ChevronRight size={18} color="#d1d5db" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompradorView;
