import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Dimensions
} from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { 
  Activity, Sparkles, TrendingUp, ArrowUpRight, PieChart, 
  ArrowLeft, Info, Wallet 
} from 'lucide-react-native';
import { Project } from '../../types';
import { AgroScoreGauge } from '../ui/AgroScoreGauge';

const INVEST_DATA = [
  { name: 'Ene', price: 4000 }, { name: 'Feb', price: 3000 },
  { name: 'Mar', price: 2000 }, { name: 'Abr', price: 2780 },
  { name: 'May', price: 1890 }, { name: 'Jun', price: 2390 },
  { name: 'Jul', price: 3490 },
];

const INVEST_PROJECTS: Project[] = [
  { id: 1, title: 'Expansión Bananera', farmerName: 'Agricola Bananera SA', roi: '12-15%', risk: 'Bajo', amount: '$50k', funded: 75, score: 950, description: 'Expansión de 20 hectáreas de banano orgánico de exportación.' },
  { id: 2, title: 'Tecnificación Arrocera', farmerName: 'Coop. Arroz del Sur', roi: '18%', risk: 'Medio', amount: '$25k', funded: 30, score: 820, description: 'Implementación de sistema de riego por goteo para optimizar agua.' },
];

type ViewState = 'dashboard' | 'project-detail';

// Simple Chart Component
const SimpleChart = () => {
  const width = Dimensions.get('window').width - 48;
  const height = 180;
  const maxPrice = Math.max(...INVEST_DATA.map(d => d.price));
  const minPrice = Math.min(...INVEST_DATA.map(d => d.price));
  const range = maxPrice - minPrice;
  
  const points = INVEST_DATA.map((d, i) => {
    const x = (i / (INVEST_DATA.length - 1)) * width;
    const y = height - ((d.price - minPrice) / range) * (height - 20);
    return `${x},${y}`;
  }).join(' L ');
  
  const areaPath = `M 0,${height} L ${points} L ${width},${height} Z`;
  const linePath = `M ${points}`;

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#0891b2" stopOpacity={0.3} />
          <Stop offset="100%" stopColor="#0891b2" stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Path d={areaPath} fill="url(#chartGradient)" />
      <Path d={linePath} stroke="#06b6d4" strokeWidth={2} fill="none" />
    </Svg>
  );
};

export const InversionistaView: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [investAmount, setInvestAmount] = useState(1000);

  const handleSelectProject = (p: Project) => {
    setSelectedProject(p);
    setView('project-detail');
  };

  const ProjectDetail = () => {
    if (!selectedProject) return null;
    
    const amounts = [500, 1000, 2500, 5000, 10000];
    
    return (
      <SafeAreaView className="flex-1 bg-slate-900">
        <View className="px-6 pt-12 pb-6 flex-row items-center gap-4">
          <TouchableOpacity onPress={() => setView('dashboard')} className="p-2 bg-slate-800 rounded-full">
            <ArrowLeft size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">Detalle de Proyecto</Text>
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          <View className="pb-24 gap-6">
            <View className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
              <View className="flex-row justify-between mb-4">
                <View className="flex-1">
                  <Text className="text-2xl font-bold text-white">{selectedProject.title}</Text>
                  <Text className="text-slate-400 text-sm">{selectedProject.farmerName}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-3xl font-bold text-cyan-400">{selectedProject.roi}</Text>
                  <Text className="text-xs text-slate-500 uppercase">ROI Estimado</Text>
                </View>
              </View>
              
              <View className="h-2 bg-slate-900 rounded-full overflow-hidden mb-2">
                <View className="h-full bg-cyan-500" style={{ width: `${selectedProject.funded}%` }} />
              </View>
              <View className="flex-row justify-between">
                <Text className="text-xs text-slate-400">Financiado: {selectedProject.funded}%</Text>
                <Text className="text-xs text-slate-400">Meta: {selectedProject.amount}</Text>
              </View>
            </View>

            <View className="flex-row gap-4">
              <View className="flex-1 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                <Text className="text-slate-500 text-xs mb-1">Risk Score</Text>
                <Text className={`text-xl font-bold ${selectedProject.score > 900 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {selectedProject.score}
                </Text>
              </View>
              <View className="flex-1 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                <Text className="text-slate-500 text-xs mb-1">Nivel Riesgo</Text>
                <Text className="text-xl font-bold text-white">{selectedProject.risk}</Text>
              </View>
            </View>

            <View className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
              <View className="flex-row items-center gap-2 mb-4">
                <Wallet size={18} color="white" />
                <Text className="font-bold text-white">Simulador de Inversión</Text>
              </View>
              
              <View className="mb-6">
                <Text className="text-xs text-slate-400 mb-3">Monto a Invertir: ${investAmount}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View className="flex-row gap-2">
                    {amounts.map((amt) => (
                      <TouchableOpacity
                        key={amt}
                        onPress={() => setInvestAmount(amt)}
                        className={`px-4 py-2 rounded-lg ${investAmount === amt ? 'bg-cyan-600' : 'bg-slate-700'}`}
                      >
                        <Text className={`text-sm font-medium ${investAmount === amt ? 'text-white' : 'text-slate-400'}`}>
                          ${amt}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>

              <View className="flex-row justify-between items-center p-4 bg-slate-900 rounded-xl">
                <Text className="text-sm text-slate-400">Retorno Estimado (12m)</Text>
                <Text className="text-xl font-bold text-green-400">+${(investAmount * 0.15).toFixed(0)}</Text>
              </View>

              <TouchableOpacity 
                className="mt-6 bg-cyan-600 py-4 rounded-xl shadow-lg"
                activeOpacity={0.8}
              >
                <Text className="text-white font-bold text-center">Invertir Ahora</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  if (view === 'project-detail') return <ProjectDetail />;

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="px-6 pt-12 pb-6 flex-row justify-between items-center border-b border-slate-800">
        <View>
          <Text className="text-2xl font-bold tracking-wider text-white">PORTFOLIO</Text>
          <View className="flex-row items-center gap-1">
            <Text className="text-slate-400 text-xs uppercase tracking-widest">Agro Risk Analytics</Text>
            <Sparkles size={10} color="#22d3ee" />
          </View>
        </View>
        <TouchableOpacity className="bg-slate-800 p-2 rounded-lg border border-slate-700">
          <Activity color="#22d3ee" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
        <View className="pb-24 gap-8">
          {/* Graph Card */}
          <View className="bg-slate-800/50 border border-slate-700 rounded-3xl p-6">
            <View className="flex-row justify-between items-center mb-6">
              <View>
                <Text className="text-slate-400 text-sm">Valor Total Mercado</Text>
                <View className="flex-row items-center gap-2 mt-1">
                  <Text className="text-3xl font-bold text-white">$1.74T</Text>
                  <View className="bg-green-500/20 px-2 py-0.5 rounded flex-row items-center gap-1">
                    <ArrowUpRight size={12} color="#4ade80" />
                    <Text className="text-sm text-green-400">2.4%</Text>
                  </View>
                </View>
              </View>
            </View>
            
            <View className="h-48 -ml-4">
              <SimpleChart />
            </View>

            {/* WAQI AI Questions */}
            <View className="mt-4 pt-4 border-t border-slate-700">
              <View className="flex-row items-center gap-1 mb-3">
                <Sparkles size={10} color="#22d3ee" />
                <Text className="text-xs font-bold text-slate-400">WAQI AI Insights</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  {['¿Por qué sube el Cacao?', 'Análisis de Riesgo Arrocero', 'Previsión Q4'].map((q, i) => (
                    <TouchableOpacity 
                      key={i} 
                      className="bg-slate-700/50 border border-slate-600 rounded-full px-3 py-1.5"
                    >
                      <Text className="text-xs text-slate-300">{q}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>

          {/* Global Risk Score */}
          <View className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 items-center">
            <View className="w-full flex-row items-center justify-between mb-4">
              <Text className="text-slate-300 font-medium">Riesgo de Cartera</Text>
              <Info size={16} color="#64748b" />
            </View>
            <AgroScoreGauge score={890} maxScore={1000} size={220} variant="full" />
          </View>

          {/* Opportunities List */}
          <View>
            <View className="flex-row items-center gap-2 mb-4">
              <TrendingUp size={16} color="#22d3ee" />
              <Text className="text-slate-300 font-medium">Proyectos Abiertos</Text>
            </View>
            <View className="gap-4">
              {INVEST_PROJECTS.map(proj => (
                <TouchableOpacity 
                  key={proj.id} 
                  onPress={() => handleSelectProject(proj)} 
                  className="bg-slate-800 border border-slate-700 rounded-2xl p-5"
                  activeOpacity={0.8}
                >
                  <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-row gap-3">
                      <View className="bg-blue-900/50 p-3 rounded-xl">
                        <PieChart size={20} color="#60a5fa" />
                      </View>
                      <View>
                        <Text className="font-bold text-white">{proj.title}</Text>
                        <Text className="text-xs text-slate-400 mt-1">
                          ROI Est: <Text className="text-green-400">{proj.roi}</Text> • Riesgo: <Text className="text-yellow-400">{proj.risk}</Text>
                        </Text>
                      </View>
                    </View>
                    <View className={`px-2 py-1 rounded ${proj.score >= 900 ? 'bg-green-900/30' : 'bg-yellow-900/30'}`}>
                      <Text className={`text-xs font-bold ${proj.score >= 900 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {proj.score}
                      </Text>
                    </View>
                  </View>
                  
                  {/* Progress Bar */}
                  <View className="mt-2">
                    <View className="flex-row justify-between mb-1">
                      <Text className="text-xs text-slate-400">Meta: {proj.amount}</Text>
                      <Text className="text-xs text-slate-400">{proj.funded}% Financiado</Text>
                    </View>
                    <View className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                      <View className="h-full bg-cyan-500" style={{ width: `${proj.funded}%` }} />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InversionistaView;
