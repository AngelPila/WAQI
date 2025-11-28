import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Activity, Sparkles, TrendingUp, ArrowUpRight, PieChart, ArrowLeft, Info, Wallet } from 'lucide-react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
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

// Simple chart component for React Native
const SimpleAreaChart: React.FC<{ data: typeof INVEST_DATA }> = ({ data }) => {
  const maxPrice = Math.max(...data.map(d => d.price));
  const minPrice = Math.min(...data.map(d => d.price));
  const range = maxPrice - minPrice;
  
  const width = 300;
  const height = 150;
  const padding = 20;
  
  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((d.price - minPrice) / range) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');
  
  const areaPath = `M ${padding},${height - padding} L ${points} L ${width - padding},${height - padding} Z`;
  const linePath = `M ${points}`;
  
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Defs>
        <LinearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#0891b2" stopOpacity={0.3} />
          <Stop offset="100%" stopColor="#0891b2" stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Path d={areaPath} fill="url(#areaGradient)" />
      <Path d={linePath} fill="none" stroke="#06b6d4" strokeWidth={2} />
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
    return (
      <ScrollView style={styles.detailContainer} contentContainerStyle={styles.detailContentContainer}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={() => setView('dashboard')} style={styles.backButton}>
            <ArrowLeft size={20} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.detailTitle}>Detalle de Proyecto</Text>
        </View>

        <View style={styles.projectInfoCard}>
          <View style={styles.projectInfoHeader}>
            <View>
              <Text style={styles.projectTitle}>{selectedProject.title}</Text>
              <Text style={styles.projectFarmer}>{selectedProject.farmerName}</Text>
            </View>
            <View style={styles.roiBox}>
              <Text style={styles.roiValue}>{selectedProject.roi}</Text>
              <Text style={styles.roiLabel}>ROI Estimado</Text>
            </View>
          </View>
          
          <View style={styles.fundingBar}>
            <View style={[styles.fundingProgress, { width: `${selectedProject.funded}%` }]} />
          </View>
          <View style={styles.fundingLabels}>
            <Text style={styles.fundingText}>Financiado: {selectedProject.funded}%</Text>
            <Text style={styles.fundingText}>Meta: {selectedProject.amount}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Risk Score</Text>
            <Text style={[styles.statValue, { color: selectedProject.score > 900 ? '#4ade80' : '#facc15' }]}>
              {selectedProject.score}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Nivel Riesgo</Text>
            <Text style={styles.statValue}>{selectedProject.risk}</Text>
          </View>
        </View>

        <View style={styles.simulatorCard}>
          <View style={styles.simulatorHeader}>
            <Wallet size={18} color="#ffffff" />
            <Text style={styles.simulatorTitle}>Simulador de Inversión</Text>
          </View>
          
          <View style={styles.sliderSection}>
            <Text style={styles.sliderLabel}>Monto a Invertir: ${investAmount}</Text>
            <View style={styles.amountButtons}>
              <TouchableOpacity 
                style={styles.amountButton}
                onPress={() => setInvestAmount(Math.max(500, investAmount - 500))}
              >
                <Text style={styles.amountButtonText}>-</Text>
              </TouchableOpacity>
              <View style={styles.amountDisplay}>
                <Text style={styles.amountDisplayText}>${investAmount}</Text>
              </View>
              <TouchableOpacity 
                style={styles.amountButton}
                onPress={() => setInvestAmount(Math.min(10000, investAmount + 500))}
              >
                <Text style={styles.amountButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.returnBox}>
            <Text style={styles.returnLabel}>Retorno Estimado (12m)</Text>
            <Text style={styles.returnValue}>+${(investAmount * 0.15).toFixed(0)}</Text>
          </View>

          <TouchableOpacity style={styles.investButton}>
            <Text style={styles.investButtonText}>Invertir Ahora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  if (view === 'project-detail') return <ProjectDetail />;

  return (
    <View style={styles.container}>
      {/* Background Effect */}
      <View style={styles.bgEffect} />

      <View style={styles.header}>
        <View>
          <Text style={styles.portfolioTitle}>PORTFOLIO</Text>
          <View style={styles.subtitleRow}>
            <Text style={styles.portfolioSubtitle}>Agro Risk Analytics</Text>
            <Sparkles size={10} color="#22d3ee" />
          </View>
        </View>
        <TouchableOpacity style={styles.activityButton}>
          <Activity size={20} color="#22d3ee" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.mainContent} contentContainerStyle={styles.mainContentContainer}>
        {/* Graph Card */}
        <View style={styles.graphCard}>
          <View style={styles.graphHeader}>
            <Text style={styles.graphSubtitle}>Valor Total Mercado</Text>
            <View style={styles.valueRow}>
              <Text style={styles.graphValue}>$1.74T</Text>
              <View style={styles.changeBadge}>
                <ArrowUpRight size={12} color="#4ade80" />
                <Text style={styles.changeText}>2.4%</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.chartContainer}>
            <SimpleAreaChart data={INVEST_DATA} />
          </View>

          {/* WAQI AI Questions */}
          <View style={styles.aiSection}>
            <View style={styles.aiHeader}>
              <Sparkles size={10} color="#64748b" />
              <Text style={styles.aiTitle}>WAQI AI Insights</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.aiQuestions}>
              {['¿Por qué sube el Cacao?', 'Análisis de Riesgo Arrocero', 'Previsión Q4'].map((q, i) => (
                <TouchableOpacity key={i} style={styles.aiQuestionChip}>
                  <Text style={styles.aiQuestionText}>{q}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Global Risk Score */}
        <View style={styles.riskCard}>
          <View style={styles.riskHeader}>
            <Text style={styles.riskTitle}>Riesgo de Cartera</Text>
            <Info size={16} color="#64748b" />
          </View>
          <View style={styles.gaugeWrapper}>
            <AgroScoreGauge score={890} maxScore={1000} size={220} variant="full" />
          </View>
        </View>

        {/* Opportunities List */}
        <View style={styles.projectsSection}>
          <View style={styles.projectsHeader}>
            <TrendingUp size={16} color="#22d3ee" />
            <Text style={styles.projectsTitle}>Proyectos Abiertos</Text>
          </View>
          {INVEST_PROJECTS.map(proj => (
            <TouchableOpacity 
              key={proj.id} 
              onPress={() => handleSelectProject(proj)} 
              style={styles.projectCard}
              activeOpacity={0.7}
            >
              <View style={styles.projectCardHeader}>
                <View style={styles.projectCardInfo}>
                  <View style={styles.projectIcon}>
                    <PieChart size={20} color="#60a5fa" />
                  </View>
                  <View>
                    <Text style={styles.projectCardTitle}>{proj.title}</Text>
                    <Text style={styles.projectCardMeta}>
                      ROI Est: <Text style={styles.roiGreen}>{proj.roi}</Text> • Riesgo: <Text style={styles.riskYellow}>{proj.risk}</Text>
                    </Text>
                  </View>
                </View>
                <View style={[styles.projectScoreBadge, proj.score >= 900 ? styles.scoreGreen : styles.scoreYellow]}>
                  <Text style={[styles.projectScoreText, proj.score >= 900 ? styles.scoreTextGreen : styles.scoreTextYellow]}>
                    {proj.score}
                  </Text>
                </View>
              </View>
              
              {/* Progress Bar */}
              <View style={styles.projectProgressSection}>
                <View style={styles.projectProgressLabels}>
                  <Text style={styles.projectProgressLabel}>Meta: {proj.amount}</Text>
                  <Text style={styles.projectProgressLabel}>{proj.funded}% Financiado</Text>
                </View>
                <View style={styles.projectProgressTrack}>
                  <View style={[styles.projectProgressBar, { width: `${proj.funded}%` }]} />
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
    backgroundColor: '#0f172a',
  },
  bgEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 400,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    borderRadius: 200,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  portfolioTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 2,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  portfolioSubtitle: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  activityButton: {
    backgroundColor: '#1e293b',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  mainContent: {
    flex: 1,
  },
  mainContentContainer: {
    padding: 24,
    paddingBottom: 100,
    gap: 32,
  },
  graphCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  graphHeader: {
    marginBottom: 24,
  },
  graphSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  graphValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 2,
  },
  changeText: {
    fontSize: 12,
    color: '#4ade80',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  aiSection: {
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 16,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  aiTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748b',
  },
  aiQuestions: {
    paddingBottom: 8,
  },
  aiQuestionChip: {
    backgroundColor: 'rgba(71, 85, 105, 0.5)',
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  aiQuestionText: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  riskCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  riskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#cbd5e1',
  },
  gaugeWrapper: {
    alignItems: 'center',
  },
  projectsSection: {
    gap: 16,
  },
  projectsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  projectsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#cbd5e1',
  },
  projectCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 12,
  },
  projectCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  projectCardInfo: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  projectIcon: {
    backgroundColor: 'rgba(37, 99, 235, 0.3)',
    padding: 12,
    borderRadius: 12,
  },
  projectCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  projectCardMeta: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  roiGreen: {
    color: '#4ade80',
  },
  riskYellow: {
    color: '#facc15',
  },
  projectScoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  scoreGreen: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  scoreYellow: {
    backgroundColor: 'rgba(250, 204, 21, 0.2)',
  },
  projectScoreText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  scoreTextGreen: {
    color: '#4ade80',
  },
  scoreTextYellow: {
    color: '#facc15',
  },
  projectProgressSection: {
    marginTop: 8,
  },
  projectProgressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  projectProgressLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  projectProgressTrack: {
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    overflow: 'hidden',
  },
  projectProgressBar: {
    height: '100%',
    backgroundColor: '#22d3ee',
    borderRadius: 3,
    shadowColor: '#22d3ee',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  // Detail styles
  detailContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  detailContentContainer: {
    paddingBottom: 100,
  },
  detailHeader: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    padding: 8,
    backgroundColor: '#1e293b',
    borderRadius: 20,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  projectInfoCard: {
    marginHorizontal: 24,
    backgroundColor: '#1e293b',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
  },
  projectInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  projectTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  projectFarmer: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  roiBox: {
    alignItems: 'flex-end',
  },
  roiValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#22d3ee',
  },
  roiLabel: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'uppercase',
  },
  fundingBar: {
    height: 8,
    backgroundColor: '#0f172a',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  fundingProgress: {
    height: '100%',
    backgroundColor: '#22d3ee',
    borderRadius: 4,
  },
  fundingLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fundingText: {
    fontSize: 12,
    color: '#64748b',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.5)',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  simulatorCard: {
    marginHorizontal: 24,
    backgroundColor: '#1e293b',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  simulatorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  simulatorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sliderSection: {
    marginBottom: 24,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
  },
  amountButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  amountButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22d3ee',
  },
  amountDisplay: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#0f172a',
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  amountDisplayText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  returnBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  returnLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  returnValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4ade80',
  },
  investButton: {
    backgroundColor: '#0891b2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#0891b2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  investButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});