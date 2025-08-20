import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          {/* Add your app content here */}
        </SafeAreaProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
