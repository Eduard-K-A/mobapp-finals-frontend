import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContextProvider } from './src/context/AuthContext';
import { BookingProvider } from './src/context/BookingContext';
import { ToastProvider } from './src/context/ToastContext';
import AppNavigator from './src/navigation/AppNavigator';
import ToastContainer from './src/components/Toast/ToastContainer';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <BookingProvider>
          <ToastProvider>
            <StatusBar style="light" />
            <AppNavigator />
            <ToastContainer />
          </ToastProvider>
        </BookingProvider>
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}