import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import screens
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import DashboardScreen from './src/screens/DashboardScreen';

type Screen = 'landing' | 'login' | 'signup' | 'dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (email: string, password: string) => {
    setUserEmail(email);
    setCurrentScreen('dashboard');
  };

  const handleSignup = (fullName: string, email: string, password: string) => {
    setUserEmail(email);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUserEmail('');
    setCurrentScreen('landing');
  };

  const navigateToLogin = () => setCurrentScreen('login');
  const navigateToSignup = () => setCurrentScreen('signup');

  // Render different screens based on current state
  if (currentScreen === 'login') {
    return (
      <>
        <StatusBar style="auto" />
        <LoginScreen onLogin={handleLogin} onNavigateToSignup={navigateToSignup} />
      </>
    );
  }

  if (currentScreen === 'signup') {
    return (
      <>
        <StatusBar style="auto" />
        <SignupScreen onSignup={handleSignup} onNavigateToLogin={navigateToLogin} />
      </>
    );
  }

  if (currentScreen === 'dashboard') {
    return (
      <>
        <StatusBar style="auto" />
        <DashboardScreen userEmail={userEmail} onLogout={handleLogout} />
      </>
    );
  }

  // Landing page (default)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>RIVAYA</Text>
          <Text style={styles.subtitle}>AI-Powered Group Management</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={navigateToSignup}
          >
            <Text style={styles.primaryButtonText}>Get Started Free</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => {
              // Open demo video or show demo info
              alert('Watch our demo video to see RIVAYA in action!\n\nFeatures:\n• AI-powered insights\n• Payment management\n• Real-time collaboration\n• Cross-platform sync');
            }}
          >
            <Text style={styles.secondaryButtonText}>Watch Demo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.loginButton}
            onPress={navigateToLogin}
          >
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Why Choose RIVAYA?</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🤖</Text>
              <Text style={styles.featureTitle}>AI Insights</Text>
              <Text style={styles.featureDescription}>
                Get intelligent recommendations for your group management
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>💳</Text>
              <Text style={styles.featureTitle}>Payment Management</Text>
              <Text style={styles.featureDescription}>
                Handle group finances with ease and transparency
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>👥</Text>
              <Text style={styles.featureTitle}>Real-time Collaboration</Text>
              <Text style={styles.featureDescription}>
                Work together seamlessly across all devices
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Trusted by groups worldwide</Text>
          <View style={styles.categories}>
            <Text style={styles.category}>🏠 Families</Text>
            <Text style={styles.category}>🎓 Alumni</Text>
            <Text style={styles.category}>🏦 SACCOs</Text>
            <Text style={styles.category}>👥 Communities</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: '#374151',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 20,
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2563eb',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#2563eb',
    fontSize: 18,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  featuresSection: {
    marginBottom: 40,
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 24,
  },
  featuresList: {
    gap: 20,
  },
  featureItem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#6b7280',
    fontSize: 18,
    marginBottom: 20,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 32,
  },
  category: {
    color: '#9ca3af',
    fontSize: 18,
  },
});
