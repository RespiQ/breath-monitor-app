import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Animated,
} from 'react-native';
import { 
  RotateCcw,
  Calendar,
  Home,
  Phone,
  AlertCircle,
  RefreshCw
} from 'lucide-react-native';
import { router } from 'expo-router';

export default function BreathFailureScreen() {
  const [scaleAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Gentle entrance animations
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleTryAgain = () => {
    router.push('/breath_test_guide');
  };

  const handleViewTrends = () => {
    router.push('/history');
  };

  const handleContactNurse = () => {
    router.push('/contact-nurse');
  };

  const handleBackToHome = () => {
    router.push('/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Section - Gentle Message */}
      <View style={styles.topSection}>
        <Animated.View 
          style={[
            styles.messageHeader,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Text style={styles.messageTitle}>Let's Try Again</Text>
          <Text style={styles.messageSubtitle}>
            We couldn't complete your breathing analysis this time
          </Text>
        </Animated.View>

        {/* Center Section - Gentle Icon and Guidance */}
        <Animated.View 
          style={[
            styles.guidanceContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <View style={styles.iconCircle}>
            <RefreshCw size={40} color="#6B7280" />
          </View>
          
          <View style={styles.guidanceDetails}>
            <Text style={styles.guidanceTitle}>
              This happens sometimes
            </Text>
            <Text style={styles.guidanceText}>
              Breathing tests can be affected by many factors. Take a moment to relax and we'll help you try again.
            </Text>
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
            onPress={handleTryAgain}
            activeOpacity={0.8}
          >
            <RotateCcw size={20} color="white" />
            <Text style={styles.primaryButtonText}>Try Again</Text>
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
              <Text style={styles.secondaryButtonText}>Get Help</Text>
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

        {/* Reassuring Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't worry - failed tests are completely normal
          </Text>
          <Text style={styles.footerText}>
            Contact your healthcare provider if you continue having difficulty
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFB',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  messageHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  messageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  messageSubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
  guidanceContainer: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6B7280',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'rgba(107, 114, 128, 0.1)',
    marginBottom: 24,
  },
  guidanceDetails: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  guidanceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  guidanceText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.1,
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
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
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