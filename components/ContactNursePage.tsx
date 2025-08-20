import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  ChevronDown,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Heart,
  Activity
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ContactNursePage() {
  const insets = useSafeAreaInsets();
  const [contactMethod, setContactMethod] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState('Medium Priority');
  const [reasonForContact, setReasonForContact] = useState('');
  const [message, setMessage] = useState('');
  const [showContactMethodDropdown, setShowContactMethodDropdown] = useState(false);
  const [showUrgencyDropdown, setShowUrgencyDropdown] = useState(false);
  const [showReasonDropdown, setShowReasonDropdown] = useState(false);

  const contactMethods = ['Phone Call', 'Text Message', 'Email', 'Video Call'];
  const urgencyLevels = ['Low Priority', 'Medium Priority', 'High Priority'];
  const reasons = ['Test Results', 'Symptoms', 'Medication', 'General Question', 'Emergency'];

  const handleSendRequest = () => {
    // Handle form submission
    console.log('Sending request...');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Nurse Support Center</Text>
          <Text style={styles.subtitle}>
            Get professional support for your COPD management.
          </Text>
        </View>

        {/* Contact Form Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Contact Your COPD Nurse</Text>
          
          <View style={styles.formCard}>
            {/* Contact Method */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Contact Method</Text>
              <TouchableOpacity 
                style={styles.dropdown}
                onPress={() => setShowContactMethodDropdown(!showContactMethodDropdown)}
              >
                <Text style={styles.dropdownText}>
                  {contactMethod || 'How would you like to contact?'}
                </Text>
                <ChevronDown size={20} color="#64748B" />
              </TouchableOpacity>
              {showContactMethodDropdown && (
                <View style={styles.dropdownOptions}>
                  {contactMethods.map((method) => (
                    <TouchableOpacity
                      key={method}
                      style={styles.dropdownOption}
                      onPress={() => {
                        setContactMethod(method);
                        setShowContactMethodDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownOptionText}>{method}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Urgency Level */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Urgency Level</Text>
              <TouchableOpacity 
                style={styles.dropdown}
                onPress={() => setShowUrgencyDropdown(!showUrgencyDropdown)}
              >
                <Text style={styles.dropdownText}>{urgencyLevel}</Text>
                <ChevronDown size={20} color="#64748B" />
              </TouchableOpacity>
              {showUrgencyDropdown && (
                <View style={styles.dropdownOptions}>
                  {urgencyLevels.map((level) => (
                    <TouchableOpacity
                      key={level}
                      style={styles.dropdownOption}
                      onPress={() => {
                        setUrgencyLevel(level);
                        setShowUrgencyDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownOptionText}>{level}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Reason for Contact */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Reason for Contact</Text>
              <TouchableOpacity 
                style={styles.dropdown}
                onPress={() => setShowReasonDropdown(!showReasonDropdown)}
              >
                <Text style={styles.dropdownText}>
                  {reasonForContact || 'What is this regarding?'}
                </Text>
                <ChevronDown size={20} color="#64748B" />
              </TouchableOpacity>
              {showReasonDropdown && (
                <View style={styles.dropdownOptions}>
                  {reasons.map((reason) => (
                    <TouchableOpacity
                      key={reason}
                      style={styles.dropdownOption}
                      onPress={() => {
                        setReasonForContact(reason);
                        setShowReasonDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownOptionText}>{reason}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Message */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Message</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Describe your question or concern..."
                placeholderTextColor="#94A3B8"
                multiline={true}
                numberOfLines={4}
                value={message}
                onChangeText={setMessage}
                textAlignVertical="top"
              />
            </View>

            {/* Priority Badge */}
            <View style={styles.priorityBadge}>
              <Text style={styles.priorityText}>{urgencyLevel}</Text>
            </View>

            {/* Send Button */}
            <TouchableOpacity style={styles.sendButton} onPress={handleSendRequest}>
              <Text style={styles.sendButtonText}>Send Request</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact History Section */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Contact History</Text>
          
          {/* Text Message History Item */}
          <View style={styles.historyCard}>
            <View style={styles.historyHeader}>
              <View style={styles.historyIcon}>
                <MessageCircle size={20} color="#3B82F6" />
              </View>
              <View style={styles.historyInfo}>
                <Text style={styles.historyType}>Text</Text>
                <View style={styles.historyBadge}>
                  <Text style={styles.historyBadgeText}>medium</Text>
                </View>
                <CheckCircle size={16} color="#10B981" />
              </View>
              <Text style={styles.historyDate}>Jul 03, 2:02 PM</Text>
            </View>
            
            <View style={styles.historyTag}>
              <Text style={styles.historyTagText}>Test Results</Text>
            </View>
            
            <Text style={styles.historyMessage}>
              Hi Sarah, I had some questions about my latest test results. My score was 65 yesterday which is lower than usual. Should I be concerned?
            </Text>
            
            <View style={styles.nurseResponse}>
              <Text style={styles.nurseResponseTitle}>Nurse Response:</Text>
              <Text style={styles.nurseResponseText}>
                Thank you for reaching out! A score of 65 is still in the 'good' range, but I understand your concern about the drop. Let's schedule a call to discuss your symptoms and review your medication routine. The humid weather lately can affect readings.
              </Text>
            </View>
          </View>

          {/* Phone Call History Item */}
          <View style={styles.historyCard}>
            <View style={styles.historyHeader}>
              <View style={styles.historyIcon}>
                <Phone size={20} color="#10B981" />
              </View>
              <View style={styles.historyInfo}>
                <Text style={styles.historyType}>Call</Text>
                <View style={styles.historyBadge}>
                  <Text style={styles.historyBadgeText}>medium</Text>
                </View>
                <CheckCircle size={16} color="#10B981" />
              </View>
              <Text style={styles.historyDate}>Jul 03, 2:02 PM</Text>
            </View>
            
            <View style={styles.historyTag}>
              <Text style={styles.historyTagText}>Symptoms</Text>
            </View>
            
            <Text style={styles.historyMessage}>
              Requesting a call to discuss my breathing exercises and medication timing. I've been having some morning shortness of breath.
            </Text>
            
            <View style={styles.nurseResponse}>
              <Text style={styles.nurseResponseTitle}>Nurse Response:</Text>
              <Text style={styles.nurseResponseText}>
                I'll call you this afternoon at 2 PM. In the meantime, try taking your bronchodilator 30 minutes before your morning activities. Keep track of when the symptoms occur so we can discuss patterns.
              </Text>
            </View>
          </View>

          {/* Email History Item */}
          <View style={styles.historyCard}>
            <View style={styles.historyHeader}>
              <View style={styles.historyIcon}>
                <Mail size={20} color="#F59E0B" />
              </View>
              <View style={styles.historyInfo}>
                <Text style={styles.historyType}>Email</Text>
                <View style={[styles.historyBadge, { backgroundColor: '#FEF3C7' }]}>
                  <Text style={[styles.historyBadgeText, { color: '#92400E' }]}>low</Text>
                </View>
                <CheckCircle size={16} color="#10B981" />
              </View>
              <Text style={styles.historyDate}>Jul 03, 2:02 PM</Text>
            </View>
            
            <View style={styles.historyTag}>
              <Text style={styles.historyTagText}>General Question</Text>
            </View>
            
            <Text style={styles.historyMessage}>
              I want to share that I had an excellent day with a score of 85! I've been following the new breathing routine you taught me.
            </Text>
          </View>
        </View>

        {/* Emergency Actions Section */}
        <View style={styles.emergencySection}>
          <View style={styles.emergencyHeader}>
            <AlertTriangle size={24} color="#DC2626" />
            <Text style={styles.emergencyTitle}>Emergency Actions</Text>
          </View>
          
          <View style={styles.emergencyCard}>
            <View style={styles.emergencyAlert}>
              <Heart size={20} color="#DC2626" />
              <Text style={styles.emergencyAlertText}>
                If you're experiencing severe breathing difficulties, chest pain, or other emergency symptoms, call 911 immediately.
              </Text>
            </View>
            
            <TouchableOpacity style={styles.emergencyButton}>
              <Phone size={20} color="white" />
              <Text style={styles.emergencyButtonText}>Call 911 - Emergency</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.hotlineButton}>
              <Phone size={20} color="#DC2626" />
              <Text style={styles.hotlineButtonText}>COPD Nurse Hotline (24/7)</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.emergencySymptoms}>
            <Text style={styles.emergencySubtitle}>Call 911 if you have:</Text>
            <View style={styles.symptomsList}>
              <Text style={styles.symptomItem}>• Severe trouble breathing</Text>
              <Text style={styles.symptomItem}>• Chest pain or pressure</Text>
              <Text style={styles.symptomItem}>• Confusion or dizziness</Text>
              <Text style={styles.symptomItem}>• Blue lips or fingernails</Text>
              <Text style={styles.symptomItem}>• Coughing up blood</Text>
            </View>
          </View>
        </View>

        {/* When to Contact Section */}
        <View style={styles.contactGuideSection}>
          <View style={styles.contactGuideHeader}>
            <Activity size={24} color="#3B82F6" />
            <Text style={styles.contactGuideTitle}>When to Contact Your Nurse</Text>
          </View>
          
          <View style={styles.contactGuideCard}>
            <View style={styles.contactGuideList}>
              <Text style={styles.contactGuideItem}>• Questions about your test results</Text>
              <Text style={styles.contactGuideItem}>• Changes in symptoms or breathing</Text>
              <Text style={styles.contactGuideItem}>• Medication questions or side effects</Text>
              <Text style={styles.contactGuideItem}>• Concerns about your condition</Text>
              <Text style={styles.contactGuideItem}>• Need for care plan adjustments</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Medical device for healthcare professionals and patients</Text>
          <Text style={styles.footerText}>Always consult your healthcare provider</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
  },
  formSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  formCard: {
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
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAFBFB',
  },
  dropdownText: {
    fontSize: 15,
    color: '#374151',
  },
  dropdownOptions: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dropdownOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dropdownOptionText: {
    fontSize: 15,
    color: '#374151',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 100,
    backgroundColor: '#FAFBFB',
    fontSize: 15,
    color: '#374151',
  },
  priorityBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#92400E',
  },
  sendButton: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  historySection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  historyCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  historyType: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1E293B',
  },
  historyBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  historyBadgeText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#92400E',
  },
  historyDate: {
    fontSize: 13,
    color: '#64748B',
  },
  historyTag: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  historyTagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#3B82F6',
  },
  historyMessage: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  nurseResponse: {
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#10B981',
  },
  nurseResponseTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 6,
  },
  nurseResponseText: {
    fontSize: 13,
    color: '#065F46',
    lineHeight: 18,
  },
  emergencySection: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginVertical: 8,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#DC2626',
    letterSpacing: 0.2,
  },
  emergencyCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  emergencyAlert: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 8,
  },
  emergencyAlertText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  emergencyButton: {
    backgroundColor: '#DC2626',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    letterSpacing: 0.3,
  },
  hotlineButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DC2626',
  },
  hotlineButtonText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    letterSpacing: 0.3,
  },
  emergencySymptoms: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  emergencySubtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#DC2626',
    marginBottom: 12,
  },
  symptomsList: {
    marginLeft: 8,
  },
  symptomItem: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 4,
  },
  contactGuideSection: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginVertical: 8,
  },
  contactGuideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  contactGuideTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3B82F6',
    letterSpacing: 0.2,
  },
  contactGuideCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  contactGuideList: {
    marginLeft: 8,
  },
  contactGuideItem: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 8,
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