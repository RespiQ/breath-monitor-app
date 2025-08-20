import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { 
  Activity, 
  Play, 
  Clock, 
  Settings, 
  User,
  Heart,
  TrendingUp,
  Calendar,
  Wind,
  Phone
} from 'lucide-react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';

export default function HomePage() {
  const handleStartMonitoring = () => {
    router.push('/breath_test_guide');
  };

  const handleViewHistory = () => {
    router.push('/history');
  };

  const handleContactNurse = () => {
    router.push('/contact-nurse');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Centered Top Section */}
      <View style={styles.topSection}>
        {/* Main Action Button - Big Round */}
        <TouchableOpacity 
          style={styles.startButton} 
          onPress={handleStartMonitoring}
          activeOpacity={0.8}
        >
          <View style={styles.playIconContainer}>
            <Wind size={48} color="white" />
          </View>
          <Text style={styles.startButtonTitle}>Take Breath Test</Text>
        </TouchableOpacity>

        {/* Health Statistics */}
        <Text style={styles.statsText}>
          Health Score: <Text style={styles.statValue}>84</Text> • Trending <Text style={styles.trendValue}>+8% up</Text>
        </Text>
      </View>

      {/* Bottom Content */}
      <ScrollView style={styles.bottomSection} contentContainerStyle={styles.bottomContent}>
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={handleViewHistory}
            >
              <View style={styles.actionIconContainer}>
                <Calendar size={24} color="#3B82F6" />
              </View>
              <Text style={styles.actionTitle}>View History</Text>
              <Text style={styles.actionSubtitle}>Past sessions & trends</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionCard}
              onPress={handleContactNurse}
            >
              <View style={styles.actionIconContainer}>
                <Phone size={24} color="#10B981" />
              </View>
              <Text style={styles.actionTitle}>Contact Nurse</Text>
              <Text style={styles.actionSubtitle}>Get professional help</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity Preview */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Session</Text>
          <View style={styles.recentCard}>
            <View style={styles.recentHeader}>
              <Text style={styles.recentDate}>Today, 2:30 PM</Text>
              <Text style={styles.recentDuration}>8 minutes</Text>
            </View>
            <View style={styles.recentStats}>
              <View style={styles.recentStatItem}>
                <Text style={styles.recentStatLabel}>Health Score</Text>
                <Text style={styles.recentStatValue}>84</Text>
              </View>
              <View style={styles.recentStatItem}>
                <Text style={styles.recentStatLabel}>vs Last Test</Text>
                <Text style={styles.recentStatValue}>+3</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Medical device for healthcare professionals and patients</Text>
          <Text style={styles.footerText}>Always consult your healthcare provider</Text>
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
  },
  startButton: {
    backgroundColor: '#4F46E5',
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 20,
  },
  playIconContainer: {
    marginBottom: 8,
  },
  startButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  statsText: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  statValue: {
    fontWeight: '600',
    color: '#059669',
  },
  trendValue: {
    fontWeight: '600',
    color: '#2563EB',
  },
  bottomSection: {
    flex: 1,
  },
  bottomContent: {
    paddingTop: 20,
    paddingBottom: 32,
  },
  quickActions: {
    paddingHorizontal: 20,
    marginBottom: 36,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  actionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
  recentSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  recentCard: {
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
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  recentDate: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1E293B',
  },
  recentDuration: {
    fontSize: 13,
    color: '#64748B',
  },
  recentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recentStatItem: {
    alignItems: 'center',
  },
  recentStatLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  recentStatValue: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1E293B',
  },
  footer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 16,
  },
  footerText: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 16,
  },
});