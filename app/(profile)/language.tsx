import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { 
  ArrowLeft, 
  Globe, 
  Check,
  Save
} from 'lucide-react-native';

export default function LanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('fr');
  const [loading, setLoading] = useState(false);

  const languages = [
    {
      id: 'fr',
      name: 'Français',
      nativeName: 'Français',
      flag: '🇫🇷',
      description: 'Langue officielle de la Guinée',
    },
    {
      id: 'pular',
      name: 'Pular',
      nativeName: 'Pulaar',
      flag: '🇬🇳',
      description: 'Langue parlée par les Peuls',
    },
    {
      id: 'malinke',
      name: 'Malinké',
      nativeName: 'Maninka',
      flag: '🇬🇳',
      description: 'Langue parlée par les Malinkés',
    },
    {
      id: 'susu',
      name: 'Susu',
      nativeName: 'Sosoxui',
      flag: '🇬🇳',
      description: 'Langue parlée par les Susus',
    },
  ];

  const handleSaveLanguage = async () => {
    setLoading(true);
    // Simulation de sauvegarde
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Succès',
        'La langue a été modifiée avec succès. L\'application va redémarrer pour appliquer les changements.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Langue</Text>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSaveLanguage}
            disabled={loading}
          >
            <Save size={20} color="#0066CC" />
          </TouchableOpacity>
        </View>

        {/* Language Info */}
        <View style={styles.languageInfo}>
          <Globe size={24} color="#0066CC" />
          <View style={styles.languageText}>
            <Text style={styles.languageTitle}>Choisir la langue</Text>
            <Text style={styles.languageSubtitle}>
              Sélectionnez votre langue préférée pour l'interface de l'application
            </Text>
          </View>
        </View>

        {/* Language Options */}
        <View style={styles.languageOptions}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.id}
              style={[
                styles.languageOption,
                selectedLanguage === language.id && styles.languageOptionSelected
              ]}
              onPress={() => setSelectedLanguage(language.id)}
            >
              <View style={styles.languageOptionLeft}>
                <Text style={styles.languageFlag}>{language.flag}</Text>
                <View style={styles.languageDetails}>
                  <Text style={styles.languageName}>{language.name}</Text>
                  <Text style={styles.languageNativeName}>{language.nativeName}</Text>
                  <Text style={styles.languageDescription}>{language.description}</Text>
                </View>
              </View>
              {selectedLanguage === language.id && (
                <View style={styles.checkIcon}>
                  <Check size={20} color="#0066CC" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Language Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Fonctionnalités linguistiques</Text>
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🗣️</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Interface traduite</Text>
                <Text style={styles.featureDescription}>
                  Tous les menus et boutons dans votre langue
                </Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📱</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Notifications</Text>
                <Text style={styles.featureDescription}>
                  Messages et alertes dans la langue choisie
                </Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎯</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Support client</Text>
                <Text style={styles.featureDescription}>
                  Assistance disponible dans votre langue
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.actionSection}>
          <TouchableOpacity 
            style={[styles.saveLanguageButton, loading && styles.saveLanguageButtonDisabled]}
            onPress={handleSaveLanguage}
            disabled={loading}
          >
            <Globe size={20} color="#fff" />
            <Text style={styles.saveLanguageButtonText}>
              {loading ? 'Application...' : 'Appliquer la langue'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Language Note */}
        <View style={styles.languageNote}>
          <Text style={styles.languageNoteText}>
            💡 Le changement de langue prendra effet immédiatement. Certaines fonctionnalités avancées peuvent nécessiter une mise à jour de l'application.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  saveButton: {
    padding: 4,
  },
  languageInfo: {
    backgroundColor: '#e3f2fd',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  languageText: {
    flex: 1,
  },
  languageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066CC',
    marginBottom: 4,
  },
  languageSubtitle: {
    fontSize: 14,
    color: '#0066CC',
    lineHeight: 18,
  },
  languageOptions: {
    padding: 20,
    gap: 12,
  },
  languageOption: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  languageOptionSelected: {
    borderColor: '#0066CC',
    backgroundColor: '#f8fbff',
  },
  languageOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  languageFlag: {
    fontSize: 32,
    marginRight: 16,
  },
  languageDetails: {
    flex: 1,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  languageNativeName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  languageDescription: {
    fontSize: 14,
    color: '#999',
  },
  checkIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  features: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  actionSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  saveLanguageButton: {
    backgroundColor: '#0066CC',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveLanguageButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveLanguageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  languageNote: {
    backgroundColor: '#fff3cd',
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  languageNoteText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
});