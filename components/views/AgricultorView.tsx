import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  TextInput,
  Switch 
} from 'react-native';
import { 
  User, CloudRain, Sun, Wind, Droplets, Plus, Sprout, 
  ChevronRight, ArrowLeft, Calendar, FileText, CheckCircle2 
} from 'lucide-react-native';
import { AgroScoreGauge } from '../ui/AgroScoreGauge';
import { Crop } from '../../types';

type ViewState = 'dashboard' | 'score-detail' | 'add-crop' | 'notebook';

const CROPS_DATA: Crop[] = [
  { id: 1, name: 'Maíz Híbrido', area: '15 ha', status: 'Crecimiento', progress: 65, score: 8.5 },
  { id: 2, name: 'Soya', area: '8 ha', status: 'Siembra', progress: 10, score: 9.2 },
];

export const AgricultorView: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [publishMarketplace, setPublishMarketplace] = useState(false);

  // --- SUB-VIEWS ---
  const ScoreDetail = () => (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="bg-white px-6 pt-12 pb-6 shadow-sm mb-4">
          <View className="flex-row items-center gap-4 mb-4">
            <TouchableOpacity onPress={() => setView('dashboard')} className="p-2 bg-gray-100 rounded-full">
              <ArrowLeft size={20} color="#374151" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-900">Detalle AgroScore</Text>
          </View>
          
          <View className="items-center mb-2">
            <AgroScoreGauge score={979} maxScore={1000} size={240} variant="full" />
          </View>
        </View>

        <View className="px-6 pb-24">
          <View className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-4">
            <Text className="font-bold mb-4 text-gray-900">Breakdown del Puntaje</Text>
            {[
              { label: 'Historial Productivo', val: 'Excelente', score: 98, color: '#22c55e' },
              { label: 'Salud Financiera', val: 'Bueno', score: 85, color: '#84cc16' },
              { label: 'Riesgo de Zona', val: 'Bajo', score: 92, color: '#10b981' },
              { label: 'Validación de Tierras', val: 'Verificado', score: 100, color: '#16a34a' }
            ].map((item, i) => (
              <View key={i} className="mb-4">
                <View className="flex-row justify-between mb-1.5">
                  <Text className="text-sm text-gray-600">{item.label}</Text>
                  <Text className="font-bold text-gray-900 text-sm">{item.score}/100</Text>
                </View>
                <View className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <View style={{ width: `${item.score}%`, backgroundColor: item.color }} className="h-full" />
                </View>
              </View>
            ))}
          </View>

          <View className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
            <View className="flex-row items-center gap-2 mb-3">
              <CheckCircle2 size={18} color="#1e40af" />
              <Text className="font-bold text-blue-900 text-sm">Tips para mejorar</Text>
            </View>
            <View className="gap-2">
              <View className="flex-row gap-2">
                <Text className="text-blue-500">•</Text>
                <Text className="text-sm text-blue-800 flex-1">Registra tus facturas de insumos pendientes.</Text>
              </View>
              <View className="flex-row gap-2">
                <Text className="text-blue-500">•</Text>
                <Text className="text-sm text-blue-800 flex-1">Actualiza el estado de tu cultivo de Soya.</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  const AddCropForm = () => (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-12 pb-6 border-b border-gray-100 mb-6">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => setView('dashboard')} className="p-2 bg-gray-100 rounded-full">
            <ArrowLeft size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Registrar Cultivo</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="gap-5 pb-24">
          <View>
            <Text className="text-sm font-bold text-gray-700 mb-2">Tipo de Cultivo</Text>
            <View className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <Text className="text-gray-500">Seleccionar cultivo...</Text>
            </View>
          </View>

          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="text-sm font-bold text-gray-700 mb-2">Área (Has)</Text>
              <TextInput 
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900"
                placeholder="0"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-gray-700 mb-2">Estimado</Text>
              <TextInput 
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900"
                placeholder="qq"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View>
            <Text className="text-sm font-bold text-gray-700 mb-2">Fecha de Siembra</Text>
            <TouchableOpacity className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex-row items-center">
              <Calendar size={20} color="#9ca3af" />
              <Text className="text-gray-500 ml-3">Seleccionar fecha</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-lime-50 p-4 rounded-xl border border-lime-100 flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="font-bold text-lime-900">Publicar en Marketplace</Text>
              <Text className="text-xs text-lime-700">Visible para compradores verificados</Text>
            </View>
            <Switch
              value={publishMarketplace}
              onValueChange={setPublishMarketplace}
              trackColor={{ false: '#d1d5db', true: '#84cc16' }}
              thumbColor={publishMarketplace ? '#65a30d' : '#f4f4f5'}
            />
          </View>

          <TouchableOpacity 
            onPress={() => setView('dashboard')}
            className="bg-lime-600 py-4 rounded-xl shadow-lg mt-4"
            activeOpacity={0.8}
          >
            <Text className="text-white font-bold text-lg text-center">Guardar Cultivo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  const NotebookView = () => (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 pt-12 pb-6 bg-white border-b border-gray-100 mb-4">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => setView('dashboard')} className="p-2 bg-gray-100 rounded-full">
            <ArrowLeft size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Cuaderno de Campo</Text>
        </View>
      </View>
      
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="pb-24 gap-4">
          {/* Date Group */}
          <View>
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Hoy</Text>
            <View className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <View className="flex-row gap-3">
                <View className="bg-lime-100 p-2 rounded-lg">
                  <Sprout size={18} color="#65a30d" />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-gray-800 text-sm">Registro de Fertilización</Text>
                  <Text className="text-xs text-gray-500 mt-1">Aplicación de Urea en Lote Maíz #2. 50kg/ha.</Text>
                </View>
              </View>
            </View>
          </View>

          <View>
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ayer</Text>
            <View className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <View className="flex-row gap-3">
                <View className="bg-blue-100 p-2 rounded-lg">
                  <CloudRain size={18} color="#2563eb" />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-gray-800 text-sm">Lluvia Intensa</Text>
                  <Text className="text-xs text-gray-500 mt-1">15mm registrados. Se suspendió riego.</Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity className="py-3 border-2 border-dashed border-gray-300 rounded-xl flex-row items-center justify-center gap-2">
            <Plus size={18} color="#9ca3af" />
            <Text className="text-gray-400 font-medium">Agregar Nota</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // --- MAIN DASHBOARD ---
  if (view === 'score-detail') return <ScoreDetail />;
  if (view === 'add-crop') return <AddCropForm />;
  if (view === 'notebook') return <NotebookView />;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 pt-12 pb-6 flex-row justify-between items-center bg-white border-b border-gray-50">
        <View>
          <Text className="text-gray-500 text-xs font-medium uppercase tracking-wide">Bienvenido</Text>
          <Text className="text-2xl font-bold text-gray-900">Sebastián</Text>
        </View>
        <View className="h-10 w-10 bg-lime-50 rounded-full items-center justify-center border border-lime-200">
          <User size={20} color="#65a30d" />
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        <View className="pb-24 gap-6">
          {/* Score Card */}
          <AgroScoreGauge 
            score={979} 
            maxScore={1000} 
            onPress={() => setView('score-detail')}
          />

          {/* Weather Widget */}
          <View className="bg-lime-500 rounded-3xl p-5 shadow-lg overflow-hidden">
            <View className="flex-row justify-between items-start mb-4">
              <View>
                <View className="flex-row items-center gap-1 opacity-90">
                  <User size={12} color="white" />
                  <Text className="text-white text-sm font-medium">Finca "La Fortuna"</Text>
                </View>
                <View className="flex-row items-baseline mt-2">
                  <Text className="text-4xl font-bold text-white">24°</Text>
                  <Text className="text-lg text-white/80 ml-2">Nublado</Text>
                </View>
              </View>
              <Sun size={40} color="#fde047" />
            </View>
            <View className="flex-row bg-white/10 p-3 rounded-2xl">
              <View className="flex-1 items-center gap-1">
                <Droplets size={16} color="white" />
                <Text className="text-white text-xs font-medium">65%</Text>
              </View>
              <View className="flex-1 items-center gap-1">
                <CloudRain size={16} color="white" />
                <Text className="text-white text-xs font-medium">10mm</Text>
              </View>
              <View className="flex-1 items-center gap-1">
                <Wind size={16} color="white" />
                <Text className="text-white text-xs font-medium">12km</Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="flex-row gap-4">
            <TouchableOpacity 
              onPress={() => setView('add-crop')} 
              className="flex-1 bg-white p-4 rounded-3xl shadow-sm border border-gray-100 items-center gap-2"
              activeOpacity={0.8}
            >
              <View className="bg-lime-50 p-3 rounded-full">
                <Plus size={24} color="#65a30d" />
              </View>
              <Text className="text-xs font-bold text-gray-700">Registrar Cultivo</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setView('notebook')} 
              className="flex-1 bg-white p-4 rounded-3xl shadow-sm border border-gray-100 items-center gap-2"
              activeOpacity={0.8}
            >
              <View className="bg-blue-50 p-3 rounded-full">
                <FileText size={24} color="#2563eb" />
              </View>
              <Text className="text-xs font-bold text-gray-700">Cuaderno Campo</Text>
            </TouchableOpacity>
          </View>

          {/* Crops List */}
          <View>
            <View className="flex-row justify-between items-center mb-3">
              <Text className="font-bold text-lg text-gray-800">Mis Cultivos</Text>
              <Text className="text-xs text-lime-600 font-bold">Ver todos</Text>
            </View>
            <View className="gap-3">
              {CROPS_DATA.map(crop => (
                <TouchableOpacity 
                  key={crop.id} 
                  className="bg-white border border-gray-100 p-4 rounded-3xl shadow-sm flex-row justify-between items-center"
                  activeOpacity={0.8}
                >
                  <View className="flex-row items-center gap-4">
                    <View className="bg-lime-50 h-12 w-12 rounded-2xl items-center justify-center">
                      <Sprout size={24} color="#65a30d" />
                    </View>
                    <View>
                      <Text className="font-bold text-gray-900">{crop.name}</Text>
                      <Text className="text-xs text-gray-500 font-medium">{crop.area} • {crop.status}</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center gap-3">
                    <View className="items-end gap-1">
                      <Text className="text-xs font-bold text-gray-400">{crop.progress}%</Text>
                      <View className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <View className="h-full bg-lime-500" style={{ width: `${crop.progress}%` }} />
                      </View>
                    </View>
                    <ChevronRight size={18} color="#d1d5db" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Prices Ticker */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-6 px-6">
            <View className="flex-row gap-4">
              {[{n:'Maíz', p:'$18.5'}, {n:'Cacao', p:'$145'}, {n:'Soya', p:'$22'}, {n:'Arroz', p:'$32'}].map((p,i) => (
                <View key={i} className="bg-white border border-gray-100 px-4 py-2 rounded-xl flex-row items-center gap-2">
                  <Text className="text-xs text-gray-500">{p.n}</Text>
                  <Text className="text-sm font-bold text-gray-900">{p.p}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AgricultorView;
