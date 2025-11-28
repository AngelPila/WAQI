import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
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
    <ScrollView style={styles.subViewContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.subViewHeader}>
        <TouchableOpacity onPress={() => setView('dashboard')} style={styles.backButton}>
          <ArrowLeft size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.subViewTitle}>Detalle AgroScore</Text>
      </View>
      
      <View style={styles.scoreDetailGauge}>
        <AgroScoreGauge score={979} maxScore={1000} size={240} variant="full" />
      </View>

      <View style={styles.scoreBreakdown}>
        <Text style={styles.breakdownTitle}>Breakdown del Puntaje</Text>
        {[
          { label: 'Historial Productivo', val: 'Excelente', score: 98, color: '#22c55e' },
          { label: 'Salud Financiera', val: 'Bueno', score: 85, color: '#84cc16' },
          { label: 'Riesgo de Zona', val: 'Bajo', score: 92, color: '#10b981' },
          { label: 'Validación de Tierras', val: 'Verificado', score: 100, color: '#16a34a' }
        ].map((item, i) => (
          <View key={i} style={styles.breakdownItem}>
            <View style={styles.breakdownLabelRow}>
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
        <View style={styles.tipsList}>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>Registra tus facturas de insumos pendientes.</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>Actualiza el estado de tu cultivo de Soya.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const AddCropForm = () => (
    <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.formHeader}>
        <TouchableOpacity onPress={() => setView('dashboard')} style={styles.backButton}>
          <ArrowLeft size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.subViewTitle}>Registrar Cultivo</Text>
      </View>

      <View style={styles.formContent}>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Tipo de Cultivo</Text>
          <View style={styles.selectContainer}>
            <Text style={styles.selectText}>Seleccionar cultivo...</Text>
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={styles.formLabel}>Área (Has)</Text>
            <TextInput 
              style={styles.formInput}
              placeholder="0"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={styles.formLabel}>Estimado</Text>
            <TextInput 
              style={styles.formInput}
              placeholder="qq"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Fecha de Siembra</Text>
          <View style={styles.dateInputContainer}>
            <Calendar size={20} color="#9ca3af" />
            <TextInput 
              style={styles.dateInput}
              placeholder="DD/MM/AAAA"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        <View style={styles.marketplaceToggle}>
          <View>
            <Text style={styles.toggleLabel}>Publicar en Marketplace</Text>
            <Text style={styles.toggleSubtext}>Visible para compradores verificados</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={() => setView('dashboard')}
        >
          <Text style={styles.submitButtonText}>Guardar Cultivo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const NotebookView = () => (
    <ScrollView style={styles.notebookContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.notebookHeader}>
        <TouchableOpacity onPress={() => setView('dashboard')} style={styles.backButton}>
          <ArrowLeft size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.subViewTitle}>Cuaderno de Campo</Text>
      </View>
      
      <View style={styles.notebookContent}>
        <View style={styles.dateGroup}>
          <Text style={styles.dateLabel}>Hoy</Text>
          <View style={styles.noteCard}>
            <View style={styles.noteRow}>
              <View style={[styles.noteIcon, { backgroundColor: '#ecfccb' }]}>
                <Sprout size={18} color="#65a30d" />
              </View>
              <View style={styles.noteTextContainer}>
                <Text style={styles.noteTitle}>Registro de Fertilización</Text>
                <Text style={styles.noteDesc}>Aplicación de Urea en Lote Maíz #2. 50kg/ha.</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.dateGroup}>
          <Text style={styles.dateLabel}>Ayer</Text>
          <View style={styles.noteCard}>
            <View style={styles.noteRow}>
              <View style={[styles.noteIcon, { backgroundColor: '#dbeafe' }]}>
                <CloudRain size={18} color="#2563eb" />
              </View>
              <View style={styles.noteTextContainer}>
                <Text style={styles.noteTitle}>Lluvia Intensa</Text>
                <Text style={styles.noteDesc}>15mm registrados. Se suspendió riego.</Text>
              </View>
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Bienvenido</Text>
          <Text style={styles.userName}>Sebastián</Text>
        </View>
        <View style={styles.avatarSmall}>
          <User size={20} color="#65a30d" />
        </View>
      </View>

      <View style={styles.mainContent}>
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
              <Text style={styles.farmName}>Finca "La Fortuna"</Text>
              <View style={styles.tempRow}>
                <Text style={styles.tempText}>24°</Text>
                <Text style={styles.weatherDesc}>Nublado</Text>
              </View>
            </View>
            <Sun size={40} color="#fde047" />
          </View>
          <View style={styles.weatherStats}>
            <View style={styles.weatherStat}>
              <Droplets size={16} color="#ffffff" />
              <Text style={styles.weatherStatText}>65%</Text>
            </View>
            <View style={styles.weatherStat}>
              <CloudRain size={16} color="#ffffff" />
              <Text style={styles.weatherStatText}>10mm</Text>
            </View>
            <View style={styles.weatherStat}>
              <Wind size={16} color="#ffffff" />
              <Text style={styles.weatherStatText}>12km</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity onPress={() => setView('add-crop')} style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#f7fee7' }]}>
              <Plus size={24} color="#65a30d" />
            </View>
            <Text style={styles.quickActionText}>Registrar Cultivo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setView('notebook')} style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#eff6ff' }]}>
              <FileText size={24} color="#2563eb" />
            </View>
            <Text style={styles.quickActionText}>Cuaderno Campo</Text>
          </TouchableOpacity>
        </View>

        {/* Crops List */}
        <View style={styles.cropsSection}>
          <View style={styles.cropsSectionHeader}>
            <Text style={styles.cropsSectionTitle}>Mis Cultivos</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllLink}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cropsList}>
            {CROPS_DATA.map(crop => (
              <TouchableOpacity key={crop.id} style={styles.cropCard} activeOpacity={0.8}>
                <View style={styles.cropCardLeft}>
                  <View style={styles.cropIcon}>
                    <Sprout size={24} color="#65a30d" />
                  </View>
                  <View>
                    <Text style={styles.cropName}>{crop.name}</Text>
                    <Text style={styles.cropMeta}>{crop.area} • {crop.status}</Text>
                  </View>
                </View>
                <View style={styles.cropCardRight}>
                  <View style={styles.cropProgress}>
                    <Text style={styles.cropProgressText}>{crop.progress}%</Text>
                    <View style={styles.cropProgressTrack}>
                      <View style={[styles.cropProgressBar, { width: `${crop.progress}%` }]} />
                    </View>
                  </View>
                  <ChevronRight size={18} color="#d1d5db" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Prices Ticker */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.priceTicker}>
          {[{n:'Maíz', p:'$18.5'}, {n:'Cacao', p:'$145'}, {n:'Soya', p:'$22'}, {n:'Arroz', p:'$32'}].map((p, i) => (
            <View key={i} style={styles.priceItem}>
              <Text style={styles.priceName}>{p.n}</Text>
              <Text style={styles.priceValue}>{p.p}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
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
    paddingTop: 48,
    paddingBottom: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
  },
  welcomeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f7fee7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d9f99d',
  },
  mainContent: {
    padding: 24,
    paddingBottom: 96,
    gap: 24,
  },
  weatherCard: {
    backgroundColor: '#65a30d',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#65a30d',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  farmName: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 8,
  },
  tempText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
  },
  weatherDesc: {
    fontSize: 16,
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
  quickAction: {
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
  quickActionIcon: {
    padding: 12,
    borderRadius: 50,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
  },
  cropsSection: {
    marginTop: 8,
  },
  cropsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cropsSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  viewAllLink: {
    fontSize: 12,
    fontWeight: '700',
    color: '#65a30d',
  },
  cropsList: {
    gap: 12,
  },
  cropCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  cropCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cropIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#f7fee7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cropName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  cropMeta: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    marginTop: 2,
  },
  cropCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cropProgress: {
    alignItems: 'flex-end',
    gap: 4,
  },
  cropProgressText: {
    fontSize: 12,
    fontWeight: '700',
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
  priceTicker: {
    marginTop: 8,
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  priceItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  priceName: {
    fontSize: 12,
    color: '#6b7280',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  // Sub-view styles
  subViewContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  subViewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  backButton: {
    padding: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 50,
  },
  subViewTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  scoreDetailGauge: {
    backgroundColor: '#ffffff',
    paddingVertical: 24,
    marginBottom: 16,
  },
  scoreBreakdown: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  breakdownItem: {
    marginBottom: 16,
  },
  breakdownLabelRow: {
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
    fontWeight: '700',
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
    marginBottom: 96,
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
    fontWeight: '700',
    color: '#1e40af',
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    flexDirection: 'row',
    gap: 8,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
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
  formLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
  },
  selectContainer: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
  },
  selectText: {
    color: '#6b7280',
    fontSize: 14,
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  formInput: {
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
  marketplaceToggle: {
    backgroundColor: '#f7fee7',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d9f99d',
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#365314',
  },
  toggleSubtext: {
    fontSize: 12,
    color: '#65a30d',
    marginTop: 2,
  },
  submitButton: {
    backgroundColor: '#65a30d',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#65a30d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  // Notebook styles
  notebookContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  notebookHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  notebookContent: {
    padding: 24,
    paddingBottom: 96,
  },
  dateGroup: {
    marginBottom: 16,
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  noteCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  noteRow: {
    flexDirection: 'row',
    gap: 12,
  },
  noteIcon: {
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  noteTextContainer: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  noteDesc: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
  },
  addNoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#d1d5db',
    borderRadius: 12,
    marginTop: 8,
  },
  addNoteText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9ca3af',
  },
});