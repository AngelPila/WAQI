import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

type Props = {
  categories?: string[];
  onChange?: (category: string) => void;
};

export default function CategoryTabs({
  categories = ['Todos', 'Granos', 'Frutas', 'Vegetales'],
  onChange,
}: Props) {
  const [active, setActive] = useState(0);

  function handlePress(index: number) {
    setActive(index);
    onChange && onChange(categories[index]);
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {categories.map((c, i) => (
          <TouchableOpacity
            key={c}
            style={[styles.tab, active === i ? styles.tabActive : null]}
            onPress={() => handlePress(i)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, active === i ? styles.tabTextActive : null]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
  },
  scroll: {
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f1f5f4',
  },
  tabActive: {
    backgroundColor: '#0ea37a',
  },
  tabText: {
    color: '#111827',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#ffffff',
  },
});
