import { router } from 'expo-router';
import {
  Activity,
  CheckCircle,
  Heart
} from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function BreathTestActiveScreen() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress] = useState(new Animated.Value(0));

  // Hidden tap zones for demo control
  const handleTopLeftTap = () => {
    router.push('/breath_test_success');
  };

  const handleTopRightTap = () => {
    router.push('/breath_test_failure');
  };

  // Create multiple bubble animations with useRef to persist across renders
  const bubblesRef = useRef(
    Array(12).fill(0).map(() => ({
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(0.3),
    }))
  );
  const bubbles = bubblesRef.current;

  const phases = [
    {
      title: "We're retrieving your breath data...",
      subtitle: "Please remain calm and breathe normally",
      icon: <Activity size={32} color="#25BEA0" />,
      duration: 7000,
    },
    {
      title: "We're analyzing your breathing patterns...",
      subtitle: "Our system is carefully reviewing your data",
      icon: <Heart size={32} color="#25BEA0" />,
      duration: 8000,
    },
    {
      title: "We're preparing your personalized results...",
      subtitle: "Almost ready to show your breath analysis",
      icon: <CheckCircle size={32} color="#25BEA0" />,
      duration: 5000,
    }
  ];

  useEffect(() => {
    // Animate bubbles floating up
    bubbles.forEach((bubble, index) => {
      const delay = index * 800;
      const duration = 8000 + (index * 400);
      
      const startBubbleAnimation = () => {
        Animated.loop(
          Animated.parallel([
            Animated.sequence([
              Animated.timing(bubble.translateY, {
                toValue: -900,
                duration: duration,
                useNativeDriver: true,
              }),
              Animated.timing(bubble.translateY, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true,
              }),
            ]),
            Animated.sequence([
              Animated.timing(bubble.opacity, {
                toValue: 0.6,
                duration: duration * 0.3,
                useNativeDriver: true,
              }),
              Animated.timing(bubble.opacity, {
                toValue: 0.2,
                duration: duration * 0.7,
                useNativeDriver: true,
              }),
            ]),
          ])
        ).start();
      };

      setTimeout(startBubbleAnimation, delay);
    });

    // Progress through phases
    let totalTime = 0;
    phases.forEach((phase, index) => {
      setTimeout(() => {
        setCurrentPhase(index);
        
        Animated.timing(progress, {
          toValue: (index + 1) / phases.length,
          duration: phase.duration,
          useNativeDriver: false,
        }).start();
      }, totalTime);
      
      totalTime += phase.duration;
    });

  }, []);

  // Bubble positions and sizes
  const bubbleConfigs = [
    { size: 80, left: 10, top: 15 },
    { size: 120, left: 70, top: 10 },
    { size: 60, left: 50, top: 25 },
    { size: 100, left: 25, top: 40 },
    { size: 140, left: 80, top: 35 },
    { size: 70, left: 15, top: 60 },
    { size: 90, left: 60, top: 55 },
    { size: 110, left: 40, top: 70 },
    { size: 65, left: 85, top: 65 },
    { size: 95, left: 20, top: 80 },
    { size: 75, left: 65, top: 85 },
    { size: 85, left: 45, top: 90 },
  ];

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

      {/* Animated bubble background */}
      <View style={styles.bubbleContainer}>
        {bubbles.map((bubble, index) => (
          <Animated.View
            key={index}
            style={[
              styles.bubble,
              {
                width: bubbleConfigs[index].size,
                height: bubbleConfigs[index].size,
                borderRadius: bubbleConfigs[index].size / 2,
                left: `${bubbleConfigs[index].left}%`,
                top: `${bubbleConfigs[index].top}%`,
                opacity: bubble.opacity,
                transform: [
                  { translateY: bubble.translateY },
                ],
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.content}>
        {/* Static Circle with Icon */}
        <View style={styles.animationContainer}>
          <View style={styles.breathingCircleInner}>
            {phases[currentPhase]?.icon}
          </View>
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
    backgroundColor: '#197FC0',
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
  bubbleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(173, 216, 230, 0.3)',
    borderWidth: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    zIndex: 1,
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
    height: 200,
    width: 200,
  },
  breathingCircleInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 0,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 28,
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  statusSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: 0.1,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  progressTrack: {
    width: '80%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  calmingContainer: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  calmingText: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.2,
    lineHeight: 22,
  },
});