import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native';
import { 
  ArrowLeft,
  Power,
  Wind,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react-native';
import { router } from 'expo-router';
import { User } from 'lucide-react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



export default function BreathTestGuide() {
  const insets = useSafeAreaInsets();

  const handleProfilePress = () => {
    // Navigate to profile screen when implemented
    console.log('Profile pressed');
  };


  const handleBack = () => {
    router.back();
  };

  const steps = [
    {
      number: '1',
      title: 'Prepare Device',
      description: 'Switch on device and wait for green light',
      icon: <Power size={24} color="#10B981" />,
      status: 'ready'
    },
    {
      number: '2', 
      title: 'Take Deep Breath',
      description: 'Fill your lungs completely with air',
      icon: <Wind size={24} color="#3B82F6" />,
      status: 'pending'
    },
    {
      number: '3',
      title: 'Breathe Into Device',
      description: 'Breathe into the device steadily for 6-8 seconds',
      icon: <Clock size={24} color="#F59E0B" />,
      status: 'pending'
    }
  ];

  const handleTopLeftTap = () => {
    // Navigate to analysis screen
    router.push('/breath_test_active');
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

      {/* Invisible tap zone - top left corner */}
      <TouchableOpacity 
        style={styles.invisibleTapZone}
        onPress={handleTopLeftTap}
        activeOpacity={1}
      />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Main Title */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>RespiQ Breath Test Guide</Text>
          <Text style={styles.subtitle}>
            Follow these steps to ensure accurate readings
          </Text>
        </View>

        {/* Steps */}
        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <View key={step.number} style={styles.stepCard}>
              <View style={styles.stepHeader}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{step.number}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
                <View style={styles.stepIcon}>
                  {step.icon}
                </View>
              </View>
              {index < steps.length - 1 && <View style={styles.stepConnector} />}
            </View>
          ))}
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
  invisibleTapZone: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    zIndex: 999,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
  stepsContainer: {
    paddingHorizontal: 20,
  },
  stepCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.04)',
    position: 'relative',
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  stepContent: {
    flex: 1,
    marginRight: 16,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  stepDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  stepIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepConnector: {
    position: 'absolute',
    left: 35,
    bottom: -16,
    width: 2,
    height: 16,
    backgroundColor: '#E2E8F0',
  },

});