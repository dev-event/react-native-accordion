import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomBarNavigator } from './navigation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BottomBarNavigator />
      </NavigationContainer>
      <StatusBar />
    </SafeAreaProvider>
  );
}
