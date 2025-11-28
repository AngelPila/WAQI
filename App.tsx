import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import Marketplace from './components/Marketplace';

export default function App() {
  return (
    <>
      <Marketplace />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({});
