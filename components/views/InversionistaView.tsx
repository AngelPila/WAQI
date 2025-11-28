import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Activity,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  PieChart,
  ArrowLeft,
  Info,
  Wallet,
} from 'lucide-react-native';
import { Project } from '../../types';
import { AgroScoreGauge } from '../ui/AgroScoreGauge';

const INVEST_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Expansión Bananera',
    farmerName: 'Agricola Bananera SA',
    roi: '12-15%',
    risk: 'Bajo',
    amount: '$50k',
    funded: 75,
    score: 950,
    description: 'Expansión de 20 hectáreas de banano orgánico de exportación.',
  },
  {
    id: 2,
    title: 'Tecnificación Arrocera',
    farmerName: 'Coop. Arroz del Sur',
    roi: '18%',
    risk: 'Medio',
    amount: '$25k',
    funded: 30,
    score: 820,
    description: 'Implementación de sistema de riego por goteo para optimizar agua.',
  },
];

type ViewState = 'dashboard' | 'project-detail';

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
      <ScrollView style={styles.detailContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.detailHeader}>
          <TouchableOpacity
            onPress={() => setView('dashboard')}
            style={styles.backButton}
          >
            <ArrowLeft color="#ffffff" size={20} />
          </TouchableOpacity>
          <Text style={styles.detailHeaderTitle}>Detalle de Proyecto</Text>
        </View>

        <View style={styles.detailContent}>
          {/* Project Info Card */}
          <View style={styles.projectInfoCard}>
            <View style={styles.projectInfoHeader}>
              <View>
                <Text style={styles.projectTitle}>{selectedProject.title}</Text>
                <Text style={styles.projectFarmer}>{selectedProject.farmerName}</Text>
              </View>
              <View style={styles.roiContainer}>
                <Text style={styles.roiValue}>{selectedProject.roi}</Text>
                <Text style={styles.roiLabel}>ROI ESTIMADO</Text>
              </View>
            </View>

            <View style={styles.fundedBar}>
              <View
                style={[styles.fundedProgress, { width: `${selectedProject.funded}%` }]}
              />
            </View>
            <View style={styles.fundedLabels}>
              <Text style={styles.fundedLabel}>Financiado: {selectedProject.funded}%</Text>
              <Text style={styles.fundedLabel}>Meta: {selectedProject.amount}</Text>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Risk Score</Text>
              <Text
                style={[
                  styles.statValue,
                  {
                    color:
                      selectedProject.score > 900 ? '#4ade80' : '#facc15',
                  },
                ]}
              >
                {selectedProject.score}
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Nivel Riesgo</Text>
              <Text style={styles.statValue}>{selectedProject.risk}</Text>
            </View>
          </View>

          {/* Investment Simulator */}
          <View style={styles.simulatorCard}>
            <View style={styles.simulatorHeader}>
              <Wallet color="#ffffff" size={18} />
              <Text style={styles.simulatorTitle}>Simulador de Inversión</Text>
            </View>

            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Monto a Invertir: ${investAmount}</Text>
              {/* Note: Slider requires @react-native-community/slider package */}
              <View style={styles.sliderPlaceholder}>
                <TouchableOpacity
                  style={styles.sliderButton}
                  onPress={() => setInvestAmount(Math.max(500, investAmount - 500))}
                >
                  <Text style={styles.sliderButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.sliderValue}>${investAmount}</Text>
                <TouchableOpacity
                  style={styles.sliderButton}
                  onPress={() => setInvestAmount(Math.min(10000, investAmount + 500))}
                >
                  <Text style={styles.sliderButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.returnCard}>
              <Text style={styles.returnLabel}>Retorno Estimado (12m)</Text>
              <Text style={styles.returnValue}>+${(investAmount * 0.15).toFixed(0)}</Text>
            </View>

            <TouchableOpacity style={styles.investButton}>
              <Text style={styles.investButtonText}>Invertir Ahora</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  if (view === 'project-detail') return <ProjectDetail />;

  // Dashboard View
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>PORTFOLIO</Text>
            <View style={styles.headerSubtitleRow}>
              <Text style={styles.headerSubtitle}>Agro Risk Analytics</Text>
              <Sparkles color="#06b6d4" size={10} />
            </View>
          </View>
          <TouchableOpacity style={styles.activityButton}>
            <Activity color="#06b6d4" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Market Value Card (Simplified - no recharts) */}
          <View style={styles.marketCard}>
            <View style={styles.marketHeader}>
              <Text style={styles.marketLabel}>Valor Total Mercado</Text>
              <View style={styles.marketValueRow}>
                <Text style={styles.marketValue}>$1.74T</Text>
                <View style={styles.marketChange}>
                  <ArrowUpRight color="#4ade80" size={12} />
                  <Text style={styles.marketChangeText}>2.4%</Text>
                </View>
              </View>
            </View>

            {/* Simplified Chart Placeholder */}
            <View style={styles.chartPlaceholder}>
              <View style={styles.chartBar} />
              <View style={[styles.chartBar, { height: 60 }]} />
              <View style={[styles.chartBar, { height: 40 }]} />
              <View style={[styles.chartBar, { height: 80 }]} />
              <View style={[styles.chartBar, { height: 50 }]} />
              <View style={[styles.chartBar, { height: 70 }]} />
              <View style={[styles.chartBar, { height: 100 }]} />
            </View>

            {/* AI Insights */}
            <View style={styles.insightsSection}>
              <View style={styles.insightsHeader}>
                <Sparkles color="#06b6d4" size={10} />
                <Text style={styles.insightsTitle}>WAQI AI Insights</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {['¿Por qué sube el Cacao?', 'Análisis de Riesgo Arrocero', 'Previsión Q4'].map(
                  (q, i) => (
                    <TouchableOpacity key={i} style={styles.insightChip}>
                      <Text style={styles.insightChipText}>{q}</Text>
                    </TouchableOpacity>
                  )
                )}
              </ScrollView>
            </View>
          </View>

          {/* Risk Score Card */}
          <View style={styles.riskCard}>
            <View style={styles.riskHeader}>
              <Text style={styles.riskTitle}>Riesgo de Cartera</Text>
              <Info color="#64748b" size={16} />
            </View>
            <AgroScoreGauge score={890} maxScore={1000} size={220} variant="full" />
          </View>

          {/* Projects List */}
          <View style={styles.projectsSection}>
            <View style={styles.projectsHeader}>
              <TrendingUp color="#06b6d4" size={16} />
              <Text style={styles.projectsTitle}>Proyectos Abiertos</Text>
            </View>

            {INVEST_PROJECTS.map((proj) => (
              <TouchableOpacity
                key={proj.id}
                style={styles.projectCard}
                onPress={() => handleSelectProject(proj)}
                activeOpacity={0.95}
              >
                <View style={styles.projectCardHeader}>
                  <View style={styles.projectCardLeft}>
                    <View style={styles.projectIcon}>
                      <PieChart color="#60a5fa" size={20} />
                    </View>
                    <View>
                      <Text style={styles.projectCardTitle}>{proj.title}</Text>
                      <Text style={styles.projectCardMeta}>
                        ROI Est: <Text style={styles.roiText}>{proj.roi}</Text> • Riesgo:{' '}
                        <Text style={styles.riskText}>{proj.risk}</Text>
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.projectScoreBadge,
                      {
                        backgroundColor:
                          proj.score >= 900
                            ? 'rgba(74, 222, 128, 0.2)'
                            : 'rgba(250, 204, 21, 0.2)',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.projectScoreText,
                        { color: proj.score >= 900 ? '#4ade80' : '#facc15' },
                      ]}
                    >
                      {proj.score}
                    </Text>
                  </View>
                </View>

                <View style={styles.projectProgress}>
                  <View style={styles.projectProgressLabels}>
                    <Text style={styles.projectProgressLabel}>Meta: {proj.amount}</Text>
                    <Text style={styles.projectProgressLabel}>{proj.funded}% Financiado</Text>
                  </View>
                  <View style={styles.projectProgressTrack}>
                    <View
                      style={[styles.projectProgressBar, { width: `${proj.funded}%` }]}
                    />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 2,
  },
  headerSubtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748b',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  activityButton: {
    backgroundColor: '#1e293b',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  content: {
    padding: 24,
    gap: 32,
  },
  marketCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  marketHeader: {
    marginBottom: 24,
  },
  marketLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  marketValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  marketValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  marketChange: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 222, 128, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 4,
  },
  marketChangeText: {
    fontSize: 14,
    color: '#4ade80',
  },
  chartPlaceholder: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  chartBar: {
    width: 24,
    height: 80,
    backgroundColor: '#0891b2',
    borderRadius: 4,
    opacity: 0.6,
  },
  insightsSection: {
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 16,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  insightsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748b',
  },
  insightChip: {
    backgroundColor: 'rgba(51, 65, 85, 0.5)',
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  insightChipText: {
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
  projectsSection: {
    gap: 16,
  },
  projectsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
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
  },
  projectCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  projectCardLeft: {
    flexDirection: 'row',
    gap: 12,
  },
  projectIcon: {
    backgroundColor: 'rgba(30, 58, 138, 0.5)',
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
  roiText: {
    color: '#4ade80',
  },
  riskText: {
    color: '#facc15',
  },
  projectScoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  projectScoreText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  projectProgress: {
    marginTop: 16,
  },
  projectProgressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
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
    backgroundColor: '#06b6d4',
    borderRadius: 3,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  // Detail View Styles
  detailContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#1e293b',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  detailContent: {
    padding: 24,
    gap: 24,
  },
  projectInfoCard: {
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
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
  },
  roiContainer: {
    alignItems: 'flex-end',
  },
  roiValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#06b6d4',
  },
  roiLabel: {
    fontSize: 10,
    color: '#64748b',
    letterSpacing: 1,
  },
  fundedBar: {
    height: 8,
    backgroundColor: '#0f172a',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fundedProgress: {
    height: '100%',
    backgroundColor: '#06b6d4',
    borderRadius: 4,
  },
  fundedLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  fundedLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
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
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 24,
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
  sliderContainer: {
    marginBottom: 24,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 12,
  },
  sliderPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  sliderButton: {
    width: 48,
    height: 48,
    backgroundColor: '#0f172a',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#06b6d4',
  },
  sliderValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  returnCard: {
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
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#0891b2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  investButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});