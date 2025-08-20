import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Animated,
  StatusBar,
  Platform,
} from 'react-native';
import { 
  TrendingUp,
  Calendar,
  Home,
  Activity,
  Heart,
  Phone,
  User
} from 'lucide-react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BreathSuccessScreen() {
  const insets = useSafeAreaInsets();
  const [scaleAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));

  // Generate realistic test results
  const testScore = 87;
  const improvement = "+5";
  const testDate = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleTakeAnotherTest = () => {
    router.push('/breath_test_guide');
  };

  const handleViewTrends = () => {
    router.push('/trends');
  };

  const handleContactNurse = () => {
    router.push('/contact');
  };

  const handleBackToHome = () => {
    router.push('/home');
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const getScoreColor = (score) => {
    if (score >= 85) return '#059669';
    if (score >= 70) return '#F59E0B';
    return '#DC2626';
  };

  const getScoreStatus = (score) => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    return 'Needs Attention';
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/respiq-logo.png')}
          style={styles.logo}
          contentFit="contain"
        />
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={handleProfilePress}
          activeOpacity={0.7}
        >
          <View style={styles.profilePlaceholder}>
            <User size={24} color="#64748B" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Top Section - Success Header */}
      <View style={styles.topSection}>
        <Animated.View 
          style={[
            styles.successHeader,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Text style={styles.successTitle}>Test Complete!</Text>
          <Text style={styles.successSubtitle}>
            Your breathing analysis is ready
          </Text>
        </Animated.View>

        {/* Center Section - Score Display */}
        <Animated.View 
          style={[
            styles.scoreContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <View style={styles.scoreCircle}>
            <Text style={[styles.scoreNumber, { color: getScoreColor(testScore) }]}>
              {testScore}
            </Text>
            <Text style={styles.scoreLabel}>Health Score</Text>
          </View>
          
          <View style={styles.scoreDetails}>
            <Text style={[styles.scoreStatus, { color: getScoreColor(testScore) }]}>
              {getScoreStatus(testScore)}
            </Text>
            <View style={styles.improvementContainer}>
              <TrendingUp size={16} color="#059669" />
              <Text style={styles.improvementText}>
                {improvement} from last test
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Bottom Section - Actions */}
      <ScrollView style={styles.bottomSection} contentContainerStyle={styles.bottomContent}>
        {/* Action Buttons */}
        <Animated.View 
          style={[
            styles.actionsSection,
            { opacity: fadeAnim }
          ]}
        >
          {/* Primary Action */}
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleTakeAnotherTest}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Take Another Test</Text>
          </TouchableOpacity>

          {/* Secondary Actions */}
          <View style={styles.secondaryActions}>
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={handleViewTrends}
              activeOpacity={0.7}
            >
              <Calendar size={20} color="#3B82F6" />
              <Text style={styles.secondaryButtonText}>View Trends</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={handleContactNurse}
              activeOpacity={0.7}
            >
              <Phone size={20} color="#10B981" />
              <Text style={styles.secondaryButtonText}>Contact Nurse</Text>
            </TouchableOpacity>
          </View>

          {/* Tertiary Action */}
          <TouchableOpacity 
            style={styles.tertiaryButton}
            onPress={handleBackToHome}
            activeOpacity={0.7}
          >
            <Home size={18} color="#64748B" />
            <Text style={styles.tertiaryButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Results saved to your health profile
          </Text>
          <Text style={styles.footerText}>
            Share with your healthcare provider if needed
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    position: 'relative',
  },
  logo: {
    width: 200,
    height: 52,
    position: 'absolute',
    left: -25,
  },
  profileButton: {
    padding: 4,
    marginLeft: 'auto',
  },
  profilePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 3,
    borderColor: 'rgba(5, 150, 105, 0.1)',
    marginBottom: 24,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: -1,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 4,
  },
  scoreDetails: {
    alignItems: 'center',
  },
  scoreStatus: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  improvementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 150, 105, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  improvementText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
    marginLeft: 6,
  },
  bottomSection: {
    flex: 1,
  },
  bottomContent: {
    paddingTop: 20,
    paddingBottom: 32,
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.3,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
    marginLeft: 8,
    letterSpacing: 0.1,
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(100, 116, 139, 0.2)',
  },
  tertiaryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    marginLeft: 6,
    letterSpacing: 0.1,
  },
  footer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 16,
  },
});