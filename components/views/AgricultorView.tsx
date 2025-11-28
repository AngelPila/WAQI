import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Platform } from 'react-native';
import { User, CloudRain, Sun, Wind, Droplets, Plus, Sprout, ChevronRight, ArrowLeft, Calendar, FileText, CheckCircle2 } from 'lucide-react-native';
import { AgroScoreGauge } from '../ui/AgroScoreGauge';
import { Crop } from '../../types';

type ViewState = 'dashboard' | 'score-detail' | 'add-crop' | 'notebook';

const CROPS_DATA: Crop[] = [
  { id: 1, name: 'Maíz Híbrido', area: '15 ha', status: 'Crecimiento', progress: 65, score: 8.5 },
  { id: 2, name: 'Soya', area: '8 ha', status: 'Siembra', progress: 10, score: 9.2 },
];

export const AgricultorView: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');

  // --- SUB-VIEWS ---

  const ScoreDetail = () => (
    <ScrollView style={styles.subViewContainer}>
      <View style={styles.subViewHeader}>
        <TouchableOpacity onPress={() => setView('dashboard')} style={styles.backButton}>
          <ArrowLeft size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.subViewTitle}>Detalle AgroScore</Text>
      </View>
      
      <View style={styles.gaugeWrapper}>
        <AgroScoreGauge score={979} maxScore={1000} size={240} variant="full" />
      </View>

      <View style={styles.breakdownCard}>
        <Text style={styles.cardTitle}>Breakdown del Puntaje</Text>
        {[
          { label: 'Historial Productivo', score: 98, color: '#22c55e' },
          { label: 'Salud Financiera', score: 85, color: '#84cc16' },
          { label: 'Riesgo de Zona', score: 92, color: '#10b981' },
          { label: 'Validación de Tierras', score: 100, color: '#16a34a' }
        ].map((item, i) => (
          <View key={i} style={styles.breakdownItem}>
            <View style={styles.breakdownHeader}>
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
          <CheckCircle2 size={18} color="#1e40af" />
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
    <ScrollView style={styles.formContainer}>
      <View style={styles.formHeader}>
        <TouchableOpacity onPress={() => setView('dashboard')} style={styles.backButton}>
          <ArrowLeft size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.subViewTitle}>Registrar Cultivo</Text>
      </View>

      <View style={styles.formContent}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tipo de Cultivo</Text>
          <View style={styles.selectContainer}>
            <Text style={styles.selectPlaceholder}>Seleccionar cultivo...</Text>
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={[styles.formGroup, { flex: 1 }]}>
            <Text style={styles.label}>Área (Has)</Text>
            <TextInput style={styles.input} placeholder="0" placeholderTextColor="#9ca3af" keyboardType="numeric" />
          </View>
          <View style={[styles.formGroup, { flex: 1 }]}>
            <Text style={styles.label}>Estimado</Text>
            <TextInput style={styles.input} placeholder="qq" placeholderTextColor="#9ca3af" keyboardType="numeric" />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Fecha de Siembra</Text>
          <View style={styles.dateInputContainer}>
            <Calendar size={20} color="#9ca3af" />
            <TextInput style={styles.dateInput} placeholder="DD/MM/YYYY" placeholderTextColor="#9ca3af" />
          </View>
        </View>

        <View style={styles.toggleCard}>
          <View>
            <Text style={styles.toggleTitle}>Publicar en Marketplace</Text>
            <Text style={styles.toggleSubtitle}>Visible para compradores verificados</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={() => setView('dashboard')}>
          <Text style={styles.submitButtonText}>Guardar Cultivo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const NotebookView = () => (
    <ScrollView style={styles.subViewContainer}>
      <View style={[styles.subViewHeader, styles.stickyHeader]}>
        <TouchableOpacity onPress={() => setView('dashboard')} style={styles.backButton}>
          <ArrowLeft size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.subViewTitle}>Cuaderno de Campo</Text>
      </View>
      
      <View style={styles.notebookContent}>
        <View style={styles.dateGroup}>
          <Text style={styles.dateLabel}>Hoy</Text>
          <View style={styles.noteCard}>
            <View style={[styles.noteIcon, { backgroundColor: '#ecfccb' }]}>
              <Sprout size={18} color="#65a30d" />
            </View>
            <View style={styles.noteContent}>
              <Text style={styles.noteTitle}>Registro de Fertilización</Text>
              <Text style={styles.noteDesc}>Aplicación de Urea en Lote Maíz #2. 50kg/ha.</Text>
            </View>
          </View>
        </View>

        <View style={styles.dateGroup}>
          <Text style={styles.dateLabel}>Ayer</Text>
          <View style={styles.noteCard}>
            <View style={[styles.noteIcon, { backgroundColor: '#dbeafe' }]}>
              <CloudRain size={18} color="#2563eb" />
            </View>
            <View style={styles.noteContent}>
              <Text style={styles.noteTitle}>Lluvia Intensa</Text>
              <Text style={styles.noteDesc}>15mm registrados. Se suspendió riego.</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.addNoteButton}>
          <Plus size={18} color="#9ca3af" />
          <Text style={styles.addNoteText}>Agregar Nota</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // --- MAIN DASHBOARD ---

  if (view === 'score-detail') return <ScoreDetail />;
  if (view === 'add-crop') return <AddCropForm />;
  if (view === 'notebook') return <NotebookView />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Bienvenido</Text>
          <Text style={styles.userName}>Sebastián</Text>
        </View>
        <View style={styles.profileIcon}>
          <User size={20} color="#65a30d" />
        </View>
      </View>

      <ScrollView style={styles.mainContent} contentContainerStyle={styles.mainContentContainer}>
        {/* Score Card */}
        <AgroScoreGauge 
          score={979} 
          maxScore={1000} 
          onClick={() => setView('score-detail')}
        />

        {/* Weather Widget */}
        <View style={styles.weatherCard}>
          <View style={styles.weatherHeader}>
            <View>
              <View style={styles.farmNameRow}>
                <User size={12} color="#ffffff" />
                <Text style={styles.farmName}>Finca "La Fortuna"</Text>
              </View>
              <View style={styles.tempRow}>
                <Text style={styles.tempValue}>24°</Text>
                <Text style={styles.tempLabel}>Nublado</Text>
              </View>
            </View>
            <Sun size={40} color="#fde047" />
          </View>
          <View style={styles.weatherStats}>
            <View style={styles.weatherStat}>
              <Droplets size={16} color="#ffffff" />
              <Text style={styles.weatherStatValue}>65%</Text>
            </View>
            <View style={styles.weatherStat}>
              <CloudRain size={16} color="#ffffff" />
              <Text style={styles.weatherStatValue}>10mm</Text>
            </View>
            <View style={styles.weatherStat}>
              <Wind size={16} color="#ffffff" />
              <Text style={styles.weatherStatValue}>12km</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity onPress={() => setView('add-crop')} style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: '#f7fee7' }]}>
              <Plus size={24} color="#65a30d" />
            </View>
            <Text style={styles.actionLabel}>Registrar Cultivo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setView('notebook')} style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: '#eff6ff' }]}>
              <FileText size={24} color="#2563eb" />
            </View>
            <Text style={styles.actionLabel}>Cuaderno Campo</Text>
          </TouchableOpacity>
        </View>

        {/* Crops List */}
        <View style={styles.cropsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mis Cultivos</Text>
            <Text style={styles.seeAllText}>Ver todos</Text>
          </View>
          {CROPS_DATA.map(crop => (
            <TouchableOpacity key={crop.id} style={styles.cropCard} activeOpacity={0.7}>
              <View style={styles.cropInfo}>
                <View style={styles.cropIcon}>
                  <Sprout size={24} color="#65a30d" />
                </View>
                <View>
                  <Text style={styles.cropName}>{crop.name}</Text>
                  <Text style={styles.cropMeta}>{crop.area} • {crop.status}</Text>
                </View>
              </View>
              <View style={styles.cropProgress}>
                <Text style={styles.progressText}>{crop.progress}%</Text>
                <View style={styles.progressTrackSmall}>
                  <View style={[styles.progressBarSmall, { width: `${crop.progress}%` }]} />
                </View>
              </View>
              <ChevronRight size={18} color="#d1d5db" />
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Prices Ticker */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pricesTicker}>
          {[{n:'Maíz', p:'$18.5'}, {n:'Cacao', p:'$145'}, {n:'Soya', p:'$22'}, {n:'Arroz', p:'$32'}].map((p,i) => (
            <View key={i} style={styles.priceChip}>
              <Text style={styles.priceName}>{p.n}</Text>
              <Text style={styles.priceValue}>{p.p}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
  },
  welcomeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#f7fee7',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ecfccb',
  },
  mainContent: {
    flex: 1,
  },
  mainContentContainer: {
    padding: 24,
    paddingBottom: 100,
    gap: 24,
  },
  weatherCard: {
    backgroundColor: '#65a30d',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#84cc16',
    shadowOffset: { width: 0, height: 4 },
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
    opacity: 0.9,
  },
  farmName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 8,
  },
  tempValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  tempLabel: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 4,
  },
  weatherStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 12,
  },
  weatherStat: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  weatherStatValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  actionIcon: {
    padding: 12,
    borderRadius: 20,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
  },
  cropsSection: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#65a30d',
  },
  cropCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  cropInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  cropIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#f7fee7',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cropName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  cropMeta: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  cropProgress: {
    alignItems: 'flex-end',
    gap: 4,
    marginRight: 12,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9ca3af',
  },
  progressTrackSmall: {
    width: 48,
    height: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarSmall: {
    height: '100%',
    backgroundColor: '#84cc16',
    borderRadius: 3,
  },
  pricesTicker: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  priceChip: {
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
  subViewContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  subViewHeader: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  stickyHeader: {
    position: 'relative',
  },
  backButton: {
    padding: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
  },
  subViewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  gaugeWrapper: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  breakdownCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  breakdownItem: {
    marginBottom: 16,
  },
  breakdownHeader: {
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
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 16,
    marginBottom: 100,
    borderWidth: 1,
    borderColor: '#dbeafe',
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
    color: '#1e40af',
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
  // Form styles
  formContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  formHeader: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  formContent: {
    padding: 24,
    gap: 20,
  },
  formGroup: {
    gap: 8,
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
  },
  selectContainer: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
  },
  selectPlaceholder: {
    color: '#6b7280',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#111827',
  },
  dateInputContainer: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  toggleCard: {
    backgroundColor: '#f7fee7',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ecfccb',
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#365314',
  },
  toggleSubtitle: {
    fontSize: 12,
    color: '#4d7c0f',
    marginTop: 2,
  },
  submitButton: {
    backgroundColor: '#65a30d',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#84cc16',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 8,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Notebook styles
  notebookContent: {
    padding: 24,
    paddingBottom: 100,
  },
  dateGroup: {
    marginBottom: 16,
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  noteCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  noteIcon: {
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  noteContent: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  noteDesc: {
    fontSize: 12,
    color: '#6b7280',
  },
  addNoteButton: {
    paddingVertical: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#d1d5db',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  addNoteText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9ca3af',
  },
});