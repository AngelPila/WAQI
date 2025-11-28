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
  User,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Plus,
  Sprout,
  ChevronRight,
  ArrowLeft,
  Calendar,
  FileText,
  CheckCircle2,
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

  const ScoreDetail = () => (
    <ScrollView style={styles.subView} showsVerticalScrollIndicator={false}>
      <View style={styles.subViewHeader}>
        <TouchableOpacity onPress={() => setView('dashboard')} style={styles.backButton}>
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <Text style={styles.subViewTitle}>Detalle AgroScore</Text>
      </View>

      <View style={styles.scoreDetailGauge}>
        <AgroScoreGauge score={979} maxScore={1000} size={240} variant="full" />
      </View>

      <View style={styles.breakdownCard}>
        <Text style={styles.breakdownTitle}>Breakdown del Puntaje</Text>
        {[
          { label: 'Historial Productivo', val: 'Excelente', score: 98, color: '#22c55e' },
          { label: 'Salud Financiera', val: 'Bueno', score: 85, color: '#84cc16' },
          { label: 'Riesgo de Zona', val: 'Bajo', score: 92, color: '#10b981' },
          { label: 'Validación de Tierras', val: 'Verificado', score: 100, color: '#16a34a' },
        ].map((item, i) => (
          <View key={i} style={styles.breakdownItem}>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>{item.label}</Text>
              <Text style={styles.breakdownScore}>{item.score}/100</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressBar, { width: `${item.score}%`, backgroundColor: item.color }]} />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.tipsCard}>
        <View style={styles.tipsHeader}>
          <CheckCircle2 color="#1d4ed8" size={18} />
          <Text style={styles.tipsTitle}>Tips para mejorar</Text>
        </View>
        <View style={styles.tipItem}>
          <Text style={styles.tipBullet}>•</Text>
          <Text style={styles.tipText}>Registra tus facturas de insumos pendientes.</Text>
        </View>
        <View style={styles.tipItem}>
          <Text style={styles.tipBullet}>•</Text>
          <Text style={styles.tipText}>Actualiza el estado de tu cultivo de Soya.</Text>
        </View>
      </View>
    </ScrollView>
  );

  const AddCropForm = () => (
    <ScrollView style={styles.formView} showsVerticalScrollIndicator={false}>
      <View style={styles.formHeader}>
        <TouchableOpacity onPress={() => setView('dashboard')} style={styles.backButton}>
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <Text style={styles.subViewTitle}>Registrar Cultivo</Text>
      </View>

      <View style={styles.formContent}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Tipo de Cultivo</Text>
          <View style={styles.selectInput}>
            <Text style={styles.selectText}>Seleccionar cultivo...</Text>
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.inputLabel}>Área (Has)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="0"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.inputLabel}>Estimado</Text>
            <TextInput
              style={styles.textInput}
              placeholder="qq"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Fecha de Siembra</Text>
          <View style={styles.dateInput}>
            <Calendar color="#9ca3af" size={20} />
            <Text style={styles.dateText}>Seleccionar fecha</Text>
          </View>
        </View>

        <View style={styles.publishToggle}>
          <View>
            <Text style={styles.publishTitle}>Publicar en Marketplace</Text>
            <Text style={styles.publishSubtitle}>Visible para compradores verificados</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => setView('dashboard')}
        >
          <Text style={styles.saveButtonText}>Guardar Cultivo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const NotebookView = () => (
    <ScrollView style={styles.subView} showsVerticalScrollIndicator={false}>
      <View style={styles.subViewHeader}>
        <TouchableOpacity onPress={() => setView('dashboard')} style={styles.backButton}>
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <Text style={styles.subViewTitle}>Cuaderno de Campo</Text>
      </View>

      <View style={styles.notebookContent}>
        <Text style={styles.dateGroupTitle}>HOY</Text>
        <View style={styles.notebookCard}>
          <View style={styles.notebookIconContainer}>
            <Sprout color="#65a30d" size={18} />
          </View>
          <View style={styles.notebookTextContainer}>
            <Text style={styles.notebookTitle}>Registro de Fertilización</Text>
            <Text style={styles.notebookDescription}>
              Aplicación de Urea en Lote Maíz #2. 50kg/ha.
            </Text>
          </View>
        </View>

        <Text style={styles.dateGroupTitle}>AYER</Text>
        <View style={styles.notebookCard}>
          <View style={[styles.notebookIconContainer, { backgroundColor: '#dbeafe' }]}>
            <CloudRain color="#1d4ed8" size={18} />
          </View>
          <View style={styles.notebookTextContainer}>
            <Text style={styles.notebookTitle}>Lluvia Intensa</Text>
            <Text style={styles.notebookDescription}>
              15mm registrados. Se suspendió riego.
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.addNoteButton}>
          <Plus color="#9ca3af" size={18} />
          <Text style={styles.addNoteText}>Agregar Nota</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  if (view === 'score-detail') return <ScoreDetail />;
  if (view === 'add-crop') return <AddCropForm />;
  if (view === 'notebook') return <NotebookView />;

  // Dashboard View
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>BIENVENIDO</Text>
            <Text style={styles.userName}>Sebastián</Text>
          </View>
          <View style={styles.avatarContainer}>
            <User color="#65a30d" size={20} />
          </View>
        </View>

        <View style={styles.content}>
          {/* Score Card */}
          <AgroScoreGauge score={979} maxScore={1000} onClick={() => setView('score-detail')} />

          {/* Weather Widget */}
          <View style={styles.weatherCard}>
            <View style={styles.weatherHeader}>
              <View>
                <View style={styles.farmNameRow}>
                  <User color="#ffffff" size={12} />
                  <Text style={styles.farmName}>Finca "La Fortuna"</Text>
                </View>
                <View style={styles.temperatureRow}>
                  <Text style={styles.temperature}>24°</Text>
                  <Text style={styles.weatherStatus}>Nublado</Text>
                </View>
              </View>
              <Sun color="#fde047" size={40} />
            </View>
            <View style={styles.weatherStats}>
              <View style={styles.weatherStat}>
                <Droplets color="#ffffff" size={16} />
                <Text style={styles.weatherStatText}>65%</Text>
              </View>
              <View style={styles.weatherStat}>
                <CloudRain color="#ffffff" size={16} />
                <Text style={styles.weatherStatText}>10mm</Text>
              </View>
              <View style={styles.weatherStat}>
                <Wind color="#ffffff" size={16} />
                <Text style={styles.weatherStatText}>12km</Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => setView('add-crop')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#f0fdf4' }]}>
                <Plus color="#65a30d" size={24} />
              </View>
              <Text style={styles.quickActionText}>Registrar Cultivo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => setView('notebook')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#eff6ff' }]}>
                <FileText color="#2563eb" size={24} />
              </View>
              <Text style={styles.quickActionText}>Cuaderno Campo</Text>
            </TouchableOpacity>
          </View>

          {/* Crops List */}
          <View style={styles.cropsSection}>
            <View style={styles.cropsSectionHeader}>
              <Text style={styles.cropsSectionTitle}>Mis Cultivos</Text>
              <Text style={styles.cropsViewAll}>Ver todos</Text>
            </View>
            {CROPS_DATA.map((crop) => (
              <View key={crop.id} style={styles.cropCard}>
                <View style={styles.cropLeft}>
                  <View style={styles.cropIcon}>
                    <Sprout color="#65a30d" size={24} />
                  </View>
                  <View>
                    <Text style={styles.cropName}>{crop.name}</Text>
                    <Text style={styles.cropMeta}>
                      {crop.area} • {crop.status}
                    </Text>
                  </View>
                </View>
                <View style={styles.cropRight}>
                  <View style={styles.cropProgressContainer}>
                    <Text style={styles.cropProgressText}>{crop.progress}%</Text>
                    <View style={styles.cropProgressTrack}>
                      <View
                        style={[styles.cropProgressBar, { width: `${crop.progress}%` }]}
                      />
                    </View>
                  </View>
                  <ChevronRight color="#d1d5db" size={18} />
                </View>
              </View>
            ))}
          </View>

          {/* Prices Ticker */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pricesTicker}>
            {[
              { n: 'Maíz', p: '$18.5' },
              { n: 'Cacao', p: '$145' },
              { n: 'Soya', p: '$22' },
              { n: 'Arroz', p: '$32' },
            ].map((p, i) => (
              <View key={i} style={styles.priceTag}>
                <Text style={styles.priceName}>{p.n}</Text>
                <Text style={styles.priceValue}>{p.p}</Text>
              </View>
            ))}
          </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
  },
  welcomeText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    letterSpacing: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#f0fdf4',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d9f99d',
  },
  content: {
    padding: 24,
    gap: 24,
  },
  weatherCard: {
    backgroundColor: '#65a30d',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#84cc16',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  farmNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  farmName: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
  },
  temperatureRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 8,
  },
  temperature: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  weatherStatus: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 8,
  },
  weatherStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 12,
    justifyContent: 'space-around',
  },
  weatherStat: {
    alignItems: 'center',
    gap: 4,
  },
  weatherStatText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 16,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  quickActionIcon: {
    padding: 12,
    borderRadius: 16,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
  },
  cropsSection: {
    gap: 12,
  },
  cropsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cropsSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  cropsViewAll: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#65a30d',
  },
  cropCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cropLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cropIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#f0fdf4',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cropName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  cropMeta: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  cropRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cropProgressContainer: {
    alignItems: 'flex-end',
    gap: 4,
  },
  cropProgressText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9ca3af',
  },
  cropProgressTrack: {
    width: 48,
    height: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  cropProgressBar: {
    height: '100%',
    backgroundColor: '#84cc16',
    borderRadius: 3,
  },
  pricesTicker: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  priceTag: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 16,
  },
  priceName: {
    fontSize: 12,
    color: '#6b7280',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  // Sub-view styles
  subView: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  subViewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subViewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  scoreDetailGauge: {
    backgroundColor: '#ffffff',
    padding: 24,
    alignItems: 'center',
  },
  breakdownCard: {
    backgroundColor: '#ffffff',
    margin: 24,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  breakdownItem: {
    marginBottom: 16,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#4b5563',
  },
  breakdownScore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  progressTrack: {
    height: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  tipsCard: {
    backgroundColor: '#eff6ff',
    margin: 24,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  tipItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  tipBullet: {
    color: '#3b82f6',
  },
  tipText: {
    fontSize: 14,
    color: '#1e40af',
    flex: 1,
  },
  // Form view styles
  formView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  formContent: {
    padding: 24,
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
  },
  selectInput: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
  },
  selectText: {
    fontSize: 14,
    color: '#6b7280',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 16,
  },
  textInput: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#111827',
  },
  dateInput: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateText: {
    fontSize: 14,
    color: '#6b7280',
  },
  publishToggle: {
    backgroundColor: '#f0fdf4',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  publishTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#14532d',
  },
  publishSubtitle: {
    fontSize: 12,
    color: '#15803d',
    marginTop: 2,
  },
  saveButton: {
    backgroundColor: '#65a30d',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#84cc16',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Notebook styles
  notebookContent: {
    padding: 24,
  },
  dateGroupTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9ca3af',
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 16,
  },
  notebookCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  notebookIconContainer: {
    backgroundColor: '#f0fdf4',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  notebookTextContainer: {
    flex: 1,
  },
  notebookTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  notebookDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  addNoteButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  addNoteText: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '500',
  },
});