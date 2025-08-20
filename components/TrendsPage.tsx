import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Animated,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { 
  ArrowLeft,
  TrendingUp,
  Calendar,
  Award,
  Phone,
  Home,
  User
} from 'lucide-react-native';
import { Image } from 'expo-image';
import { LineChart } from 'react-native-chart-kit';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function BreathTrendsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedPeriod, setSelectedPeriod] = useState('7');
  const [fadeAnim] = useState(new Animated.Value(0));

  // Dummy data with upward trend for react-native-chart-kit
  const generateDummyData = (days) => {
    const data = {
      labels: [],
      datasets: [{
        data: [],
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, // Calming blue
        strokeWidth: 3
      }]
    };
    
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Create upward trending scores with some natural variation
      const baseScore = 70 + (days - i) * (15 / days); // Gradual improvement
      const variation = Math.random() * 6 - 3; // ±3 points variation
      const score = Math.max(65, Math.min(95, Math.round(baseScore + variation)));
      
      // Format label based on period - show fewer labels for readability
      let label = '';
      if (days <= 7) {
        label = date.toLocaleDateString('en-US', { weekday: 'short' });
      } else if (days <= 30) {
        // Only show every 5th day to avoid crowding
        if (i % 5 === 0 || i === days - 1) {
          label = date.getDate().toString();
        }
      } else {
        // Only show every 15th day for 90 days
        if (i % 15 === 0 || i === days - 1) {
          label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
      }
      
      data.labels.push(label);
      data.datasets[0].data.push(score);
    }
    
    // For chart-kit, we also need the raw scores for stats
    data.rawScores = data.datasets[0].data;
    
    return data;
  };

  const data7Days = generateDummyData(7);
  const data30Days = generateDummyData(30);
  const data90Days = generateDummyData(90);

  const getCurrentData = () => {
    switch (selectedPeriod) {
      case '7': return data7Days;
      case '30': return data30Days;
      case '90': return data90Days;
      default: return data7Days;
    }
  };

  const getStats = () => {
    const data = getCurrentData();
    const scores = data.rawScores;
    const average = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const best = Math.max(...scores);
    const improvement = scores[scores.length - 1] - scores[0];
    
    return { average, best, improvement };
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogoPress = () => {
    router.push('/home');
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

  const stats = getStats();
  const totalTests = 23; // Dummy total

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.logoButton}
          onPress={handleLogoPress}
          activeOpacity={0.7}
        >
          <Image
            source={require('../assets/images/respiq-logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
        </TouchableOpacity>
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



      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Achievement Section */}
        <Animated.View 
          style={[
            styles.achievementSection,
            { opacity: fadeAnim }
          ]}
        >
          <View style={styles.achievementCard}>
            <View style={styles.achievementIcon}>
              <Award size={24} color="#3B82F6" />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementNumber}>{totalTests}</Text>
              <Text style={styles.achievementLabel}>breathing assessments completed</Text>
              <Text style={styles.achievementMessage}>You're taking great care of yourself!</Text>
            </View>
          </View>
        </Animated.View>

        {/* Period Toggle */}
        <Animated.View 
          style={[
            styles.toggleSection,
            { opacity: fadeAnim }
          ]}
        >
          <View style={styles.toggleContainer}>
            {[
              { key: '7', label: 'Last 7 Days' },
              { key: '30', label: 'Last 30 Days' },
              { key: '90', label: 'Last 90 Days' }
            ].map((period) => (
              <TouchableOpacity
                key={period.key}
                style={[
                  styles.toggleButton,
                  selectedPeriod === period.key && styles.toggleButtonActive
                ]}
                onPress={() => setSelectedPeriod(period.key)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.toggleButtonText,
                  selectedPeriod === period.key && styles.toggleButtonTextActive
                ]}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Stats Summary */}
        <Animated.View 
          style={[
            styles.statsSection,
            { opacity: fadeAnim }
          ]}
        >
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.average}</Text>
              <Text style={styles.statLabel}>Average Score</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.best}</Text>
              <Text style={styles.statLabel}>Best Score</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.improvementContainer}>
                <TrendingUp size={16} color="#059669" />
                <Text style={styles.statValue}>+{stats.improvement}</Text>
              </View>
              <Text style={styles.statLabel}>Improvement</Text>
            </View>
          </View>
          <Text style={styles.statsMessage}>Steady progress - keep up the excellent work!</Text>
        </Animated.View>

        {/* Chart Section */}
        <Animated.View 
          style={[
            styles.chartSection,
            { opacity: fadeAnim }
          ]}
        >
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Health Score Trend</Text>
            <View style={styles.chartWrapper}>
              <LineChart
                data={getCurrentData()}
                width={width - 60}
                height={200}
                yAxisSuffix=""
                yAxisInterval={1}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, // Calming blue
                  labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
                  style: {
                    borderRadius: 12,
                  },
                  propsForDots: selectedPeriod === '90' ? {
                    r: '0', // Hide dots for 90 days
                  } : {
                    r: '4',
                    strokeWidth: '2',
                    stroke: '#3B82F6' // Calming blue for dots
                  },
                  propsForBackgroundLines: {
                    stroke: '#F1F5F9',
                    strokeWidth: 1,
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 12,
                }}
                fromZero={false}
                segments={4}
                withDots={selectedPeriod !== '90'} // Hide dots for 90 days
              />
            </View>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View 
          style={[
            styles.actionsSection,
            { opacity: fadeAnim }
          ]}
        >
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleContactNurse}
              activeOpacity={0.7}
            >
              <Phone size={20} color="#10B981" />
              <Text style={styles.actionButtonText}>Contact Nurse</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleBackToHome}
              activeOpacity={0.7}
            >
              <Home size={20} color="#3B82F6" />
              <Text style={styles.actionButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
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
  logoButton: {
    position: 'absolute',
    left: -25,
  },
  logo: {
    width: 200,
    height: 52,
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

  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  achievementSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    marginBottom: 24,
  },
  achievementCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3B82F6',
    marginBottom: 4,
  },
  achievementLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 6,
    lineHeight: 20,
  },
  achievementMessage: {
    fontSize: 13,
    color: '#3B82F6',
    fontWeight: '500',
  },
  toggleSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
  },
  toggleButtonTextActive: {
    color: '#1E293B',
    fontWeight: '600',
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statsContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  improvementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statsMessage: {
    fontSize: 14,
    color: '#10B981',
    textAlign: 'center',
    fontWeight: '500',
  },
  chartSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
    textAlign: 'center',
  },
  chartWrapper: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  actionsSection: {
    paddingHorizontal: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
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
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
    marginLeft: 8,
    letterSpacing: 0.1,
  },
});