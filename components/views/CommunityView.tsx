import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserRole } from '../../types';
import { CommunityFeed } from '../shared/CommunityFeed';

interface CommunityViewProps {
  role: UserRole;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ role }) => {
  const isDark = role === 'inversionista';

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, isDark && styles.titleDark]}>Comunidad WAQI</Text>
        </View>
        <CommunityFeed userRole={role} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  containerDark: {
    backgroundColor: '#0f172a',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  titleDark: {
    color: '#ffffff',
  },
});
