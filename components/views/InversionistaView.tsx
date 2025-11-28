import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Activity, Sparkles, TrendingUp, ArrowUpRight, PieChart, ArrowLeft, Info, Wallet } from 'lucide-react-native';
import { Project } from '../../types';
import { AgroScoreGauge } from '../ui/AgroScoreGauge';

// NOTE: recharts is web-only. For charts in React Native, consider:
// - victory-native
// - react-native-chart-kit
// - react-native-svg-charts
// The chart visualization is simplified in this version.

const INVEST_PROJECTS: Project[] = [
  { id: 1, title: 'Expansión Bananera', farmerName: 'Agricola Bananera SA', roi: '12-15%', risk: 'Bajo', amount: '$50k', funded: 75, score: 950, description: 'Expansión de 20 hectáreas de banano orgánico de exportación.' },
  { id: 2, title: 'Tecnificación Arrocera', farmerName: 'Coop. Arroz del Sur', roi: '18%', risk: 'Medio', amount: '$25k', funded: 30, score: 820, description: 'Implementación de sistema de riego por goteo para optimizar agua.' },
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
      <ScrollView style={styles.projectDetailContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.projectDetailHeader}>
          <TouchableOpacity onPress={() => setView('dashboard')} style={styles.backButtonDark}>
            <ArrowLeft size={20} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.projectDetailTitle}>Detalle de Proyecto</Text>
        </View>

        <View style={styles.projectDetailContent}>
          <View style={styles.projectMainCard}>
            <View style={styles.projectMainHeader}>
              <View>
                <Text style={styles.projectMainTitle}>{selectedProject.title}</Text>
                <Text style={styles.projectMainSubtitle}>{selectedProject.farmerName}</Text>
              </View>
              <View style={styles.roiContainer}>
                <Text style={styles.roiValue}>{selectedProject.roi}</Text>
                <Text style={styles.roiLabel}>ROI Estimado</Text>
              </View>
            </View>
            
            <View style={styles.projectProgressContainer}>
              <View style={styles.projectProgressTrack}>
                <View style={[styles.projectProgressBar, { width: `${selectedProject.funded}%` }]} />
              </View>
              <View style={styles.projectProgressLabels}>
                <Text style={styles.projectProgressText}>Financiado: {selectedProject.funded}%</Text>
                <Text style={styles.projectProgressText}>Meta: {selectedProject.amount}</Text>
              </View>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Risk Score</Text>
              <Text style={[
                styles.metricValue, 
                { color: selectedProject.score >= 900 ? '#4ade80' : '#facc15' }
              ]}>
                {selectedProject.score}
              </Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Nivel Riesgo</Text>
              <Text style={styles.metricValueWhite}>{selectedProject.risk}</Text>
            </View>
          </View>

          <View style={styles.simulatorCard}>
            <View style={styles.simulatorHeader}>
              <Wallet size={18} color="#ffffff" />
              <Text style={styles.simulatorTitle}>Simulador de Inversión</Text>
            </View>
            
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Monto a Invertir: ${investAmount}</Text>
              <View style={styles.sliderTrack}>
                <View style={[styles.sliderFill, { width: `${((investAmount - 500) / 9500) * 100}%` }]} />
              </View>
              <View style={styles.sliderLabelsRow}>
                <Text style={styles.sliderRangeText}>$500</Text>
                <Text style={styles.sliderRangeText}>$10,000</Text>
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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Background Effect */}
      <View style={styles.backgroundEffect} />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>PORTFOLIO</Text>
          <View style={styles.headerSubtitleRow}>
            <Text style={styles.headerSubtitle}>Agro Risk Analytics</Text>
            <Sparkles size={10} color="#22d3ee" />
          </View>
        </View>
        <TouchableOpacity style={styles.activityButton}>
          <Activity size={20} color="#22d3ee" />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        {/* Graph Card - Simplified without recharts */}
        <View style={styles.graphCard}>
          <View style={styles.graphHeader}>
            <View>
              <Text style={styles.graphLabel}>Valor Total Mercado</Text>
              <View style={styles.graphValueRow}>
                <Text style={styles.graphValue}>$1.74T</Text>
                <View style={styles.changeBadge}>
                  <ArrowUpRight size={12} color="#4ade80" />
                  <Text style={styles.changeText}>2.4%</Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* Simplified chart placeholder */}
          <View style={styles.chartPlaceholder}>
            <View style={styles.chartLine} />
            <Text style={styles.chartNote}>
              Gráfico de tendencias (requiere victory-native para visualización completa)
            </Text>
          </View>

          {/* WAQI AI Questions */}
          <View style={styles.aiQuestionsContainer}>
            <View style={styles.aiQuestionsHeader}>
              <Sparkles size={10} color="#22d3ee" />
              <Text style={styles.aiQuestionsTitle}>WAQI AI Insights</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {['¿Por qué sube el Cacao?', 'Análisis de Riesgo Arrocero', 'Previsión Q4'].map((q, i) => (
                <TouchableOpacity key={i} style={styles.aiQuestionButton}>
                  <Text style={styles.aiQuestionText}>{q}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Global Risk Score */}
        <View style={styles.riskScoreCard}>
          <View style={styles.riskScoreHeader}>
            <Text style={styles.riskScoreTitle}>Riesgo de Cartera</Text>
            <Info size={16} color="#64748b" />
          </View>
          <AgroScoreGauge score={890} maxScore={1000} size={220} variant="full" />
        </View>

        {/* Opportunities List */}
        <View style={styles.projectsSection}>
          <View style={styles.projectsSectionHeader}>
            <TrendingUp size={16} color="#22d3ee" />
            <Text style={styles.projectsSectionTitle}>Proyectos Abiertos</Text>
          </View>
          <View style={styles.projectsList}>
            {INVEST_PROJECTS.map(proj => (
              <TouchableOpacity 
                key={proj.id} 
                onPress={() => handleSelectProject(proj)} 
                style={styles.projectCard}
                activeOpacity={0.8}
              >
                <View style={styles.projectCardHeader}>
                  <View style={styles.projectCardLeft}>
                    <View style={styles.projectIcon}>
                      <PieChart size={20} color="#60a5fa" />
                    </View>
                    <View>
                      <Text style={styles.projectCardTitle}>{proj.title}</Text>
                      <Text style={styles.projectCardMeta}>
                        ROI Est: <Text style={styles.roiText}>{proj.roi}</Text> • Riesgo: <Text style={styles.riskText}>{proj.risk}</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={[
                    styles.scoreBadge,
                    { backgroundColor: proj.score >= 900 ? 'rgba(74, 222, 128, 0.15)' : 'rgba(250, 204, 21, 0.15)' }
                  ]}>
                    <Text style={[
                      styles.scoreBadgeText,
                      { color: proj.score >= 900 ? '#4ade80' : '#facc15' }
                    ]}>
                      {proj.score}
                    </Text>
                  </View>
                </View>
                
                {/* Progress Bar */}
                <View style={styles.projectProgressSection}>
                  <View style={styles.progressLabels}>
                    <Text style={styles.progressLabelText}>Meta: {proj.amount}</Text>
                    <Text style={styles.progressLabelText}>{proj.funded}% Financiado</Text>
                  </View>
                  <View style={styles.progressTrackSmall}>
                    <View style={[styles.progressBarSmall, { width: `${proj.funded}%` }]} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  backgroundEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 384,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    borderRadius: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 2,
  },
  headerSubtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  activityButton: {
    backgroundColor: '#1e293b',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  mainContent: {
    padding: 24,
    paddingBottom: 96,
    gap: 32,
  },
  graphCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 24,
    padding: 24,
  },
  graphHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  graphLabel: {
    fontSize: 14,
    color: '#94a3b8',
  },
  graphValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  graphValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 222, 128, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  changeText: {
    fontSize: 12,
    color: '#4ade80',
  },
  chartPlaceholder: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#22d3ee',
    opacity: 0.3,
    borderRadius: 1,
  },
  chartNote: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
  aiQuestionsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 16,
  },
  aiQuestionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  aiQuestionsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
  },
  aiQuestionButton: {
    backgroundColor: 'rgba(51, 65, 85, 0.5)',
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  aiQuestionText: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  riskScoreCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  riskScoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  riskScoreTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#cbd5e1',
  },
  projectsSection: {
    marginTop: 8,
  },
  projectsSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  projectsSectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#cbd5e1',
  },
  projectsList: {
    gap: 16,
  },
  projectCard: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 16,
    padding: 20,
  },
  projectCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  projectCardLeft: {
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
    fontWeight: '700',
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
  scoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  scoreBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  projectProgressSection: {
    marginTop: 16,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabelText: {
    fontSize: 12,
    color: '#64748b',
  },
  progressTrackSmall: {
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarSmall: {
    height: '100%',
    backgroundColor: '#22d3ee',
    borderRadius: 3,
    shadowColor: '#22d3ee',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  // Project Detail styles
  projectDetailContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  projectDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  backButtonDark: {
    padding: 8,
    backgroundColor: '#1e293b',
    borderRadius: 50,
  },
  projectDetailTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  projectDetailContent: {
    paddingHorizontal: 24,
    paddingBottom: 96,
    gap: 24,
  },
  projectMainCard: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 24,
    padding: 24,
  },
  projectMainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  projectMainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  projectMainSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  roiContainer: {
    alignItems: 'flex-end',
  },
  roiValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#22d3ee',
  },
  roiLabel: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'uppercase',
  },
  projectProgressContainer: {
    marginTop: 8,
  },
  projectProgressTrack: {
    height: 8,
    backgroundColor: '#0f172a',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  projectProgressBar: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#22d3ee',
  },
  projectProgressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projectProgressText: {
    fontSize: 12,
    color: '#64748b',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.5)',
    borderRadius: 16,
    padding: 16,
  },
  metricLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  metricValueWhite: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  simulatorCard: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 24,
    padding: 24,
  },
  simulatorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  simulatorTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  sliderContainer: {
    marginBottom: 24,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
  },
  sliderTrack: {
    height: 8,
    backgroundColor: '#0f172a',
    borderRadius: 4,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#22d3ee',
    borderRadius: 4,
  },
  sliderLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sliderRangeText: {
    fontSize: 10,
    color: '#64748b',
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
    fontWeight: '700',
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
    shadowRadius: 16,
    elevation: 8,
  },
  investButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});