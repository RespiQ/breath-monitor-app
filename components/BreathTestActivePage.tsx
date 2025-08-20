import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { 
  Activity,
  Heart,
  CheckCircle
} from 'lucide-react-native';
import { router } from 'expo-router';

export default function BreathTestActiveScreen() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress] = useState(new Animated.Value(0));
  const [breathingScale] = useState(new Animated.Value(1));
  const [waveOpacity] = useState(new Animated.Value(0.3));

  // Hidden tap zones for demo control
  const handleTopLeftTap = () => {
    router.push('/breath_test_success');
  };

  const handleTopRightTap = () => {
    router.push('/breath_test_failure');
  };

  const phases = [
    {
      title: "We're retrieving your breath data...",
      subtitle: "Please remain calm and breathe normally",
      icon: <Activity size={32} color="#3B82F6" />,
      duration: 7000,
    },
    {
      title: "We're analyzing your breathing patterns...",
      subtitle: "Our system is carefully reviewing your data",
      icon: <Heart size={32} color="#10B981" />,
      duration: 8000,
    },
    {
      title: "We're preparing your personalized results...",
      subtitle: "Almost ready to show your breath analysis",
      icon: <CheckCircle size={32} color="#059669" />,
      duration: 5000,
    }
  ];

  useEffect(() => {
    // Start breathing animation
    const breathingAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(breathingScale, {
            toValue: 1.15,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(breathingScale, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    // Start wave animation for phase 1
    const waveAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(waveOpacity, {
            toValue: 0.8,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(waveOpacity, {
            toValue: 0.3,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    breathingAnimation();
    waveAnimation();

    // Progress through phases
    let totalTime = 0;
    phases.forEach((phase, index) => {
      setTimeout(() => {
        setCurrentPhase(index);
        
        // Animate progress
        Animated.timing(progress, {
          toValue: (index + 1) / phases.length,
          duration: phase.duration,
          useNativeDriver: false,
        }).start();
      }, totalTime);
      
      totalTime += phase.duration;
    });

    // Auto-navigate after all phases (can be overridden by tap)
    setTimeout(() => {
      // Default to success if no manual override
      router.push('/breath_test_success');
    }, totalTime);

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Hidden tap zones for demo control */}
      <TouchableOpacity 
        style={styles.invisibleTapZoneLeft}
        onPress={handleTopLeftTap}
        activeOpacity={1}
      />
      <TouchableOpacity 
        style={styles.invisibleTapZoneRight}
        onPress={handleTopRightTap}
        activeOpacity={1}
      />

      <View style={styles.content}>
        {/* Breathing Circle Animation */}
        <View style={styles.animationContainer}>
          <Animated.View 
            style={[
              styles.breathingCircle,
              {
                transform: [{ scale: breathingScale }],
                opacity: waveOpacity,
              }
            ]}
          />
          <Animated.View 
            style={[
              styles.breathingCircleInner,
              {
                transform: [{ scale: breathingScale }],
              }
            ]}
          >
            {phases[currentPhase]?.icon}
          </Animated.View>
        </View>

        {/* Status Text */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>
            {phases[currentPhase]?.title}
          </Text>
          <Text style={styles.statusSubtitle}>
            {phases[currentPhase]?.subtitle}
          </Text>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <Animated.View 
              style={[
                styles.progressFill,
                {
                  width: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                }
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            Step {currentPhase + 1} of {phases.length}
          </Text>
        </View>

        {/* Calming Message */}
        <View style={styles.calmingContainer}>
          <Text style={styles.calmingText}>
            Take deep, slow breaths while we work
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  invisibleTapZoneLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    zIndex: 999,
    backgroundColor: 'transparent',
  },
  invisibleTapZoneRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 100,
    zIndex: 999,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
    height: 200,
    width: 200,
  },
  breathingCircle: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  breathingCircleInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.1)',
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 28,
    letterSpacing: 0.2,
  },
  statusSubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: 0.1,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  progressTrack: {
    width: '80%',
    height: 6,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  calmingContainer: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.1)',
  },
  calmingText: {
    fontSize: 15,
    color: '#059669',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.2,
    lineHeight: 22,
  },
});