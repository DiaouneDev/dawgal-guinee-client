import { router } from 'expo-router';
import {
  ArrowLeft,
  Check,
  Moon,
  Palette,
  Save,
  Smartphone,
  Sun
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ThemeScreen() {
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [loading, setLoading] = useState(false);

  const themes = [
    {
      id: 'light',
      name: 'Clair',
      description: 'Interface claire et lumineuse',
      icon: Sun,
      preview: {
        background: '#ffffff',
        text: '#333333',
        accent: '#0066CC',
      },
    },
    {
      id: 'dark',
      name: 'Sombre',
      description: 'Interface sombre pour économiser la batterie',
      icon: Moon,
      preview: {
        background: '#1a1a1a',
        text: '#ffffff',
        accent: '#4da6ff',
      },
    },
    {
      id: 'auto',
      name: 'Automatique',
      description: 'Suit les paramètres du système',
      icon: Smartphone,
      preview: {
        background: 'linear-gradient(45deg, #ffffff 50%, #1a1a1a 50%)',
        text: '#666666',
        accent: '#0066CC',
      },
    },
  ];

  const handleSaveTheme = async () => {
    setLoading(true);
    // Simulation de sauvegarde
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Succès',
        'Le thème a été modifié avec succès',
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
          <Text style={styles.headerTitle}>Thème</Text>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSaveTheme}
            disabled={loading}
          >
            <Save size={20} color="#0066CC" />
          </TouchableOpacity>
        </View>

        {/* Theme Info */}
        <View style={styles.themeInfo}>
          <Palette size={24} color="#0066CC" />
          <View style={styles.themeText}>
            <Text style={styles.themeTitle}>Apparence</Text>
            <Text style={styles.themeSubtitle}>
              Personnalisez l'apparence de l'application selon vos préférences
            </Text>
          </View>
        </View>

        {/* Theme Options */}
        <View style={styles.themeOptions}>
          {themes.map((theme) => {
            const IconComponent = theme.icon;
            return (
              <TouchableOpacity
                key={theme.id}
                style={[
                  styles.themeOption,
                  selectedTheme === theme.id && styles.themeOptionSelected
                ]}
                onPress={() => setSelectedTheme(theme.id)}
              >
                <View style={styles.themeOptionLeft}>
                  <View style={styles.themeIconContainer}>
                    <IconComponent size={24} color="#0066CC" />
                  </View>
                  <View style={styles.themeDetails}>
                    <Text style={styles.themeName}>{theme.name}</Text>
                    <Text style={styles.themeDescription}>{theme.description}</Text>
                  </View>
                </View>
                <View style={styles.themePreview}>
                  <View style={[
                    styles.previewCard,
                    { backgroundColor: theme.preview.background }
                  ]}>
                    <View style={[
                      styles.previewHeader,
                      { backgroundColor: theme.preview.accent }
                    ]} />
                    <View style={styles.previewContent}>
                      <View style={[
                        styles.previewText,
                        { backgroundColor: theme.preview.text }
                      ]} />
                      <View style={[
                        styles.previewText,
                        { backgroundColor: theme.preview.text, width: '60%' }
                      ]} />
                    </View>
                  </View>
                  {selectedTheme === theme.id && (
                    <View style={styles.checkIcon}>
                      <Check size={16} color="#0066CC" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Theme Benefits */}
        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>Avantages des thèmes</Text>
          <View style={styles.benefits}>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>☀️</Text>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>Thème clair</Text>
                <Text style={styles.benefitDescription}>
                  Idéal pour une utilisation en journée, meilleure lisibilité
                </Text>
              </View>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🌙</Text>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>Thème sombre</Text>
                <Text style={styles.benefitDescription}>
                  Réduit la fatigue oculaire et économise la batterie
                </Text>
              </View>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🔄</Text>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>Thème automatique</Text>
                <Text style={styles.benefitDescription}>
                  S'adapte automatiquement selon l'heure et les paramètres système
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.actionSection}>
          <TouchableOpacity 
            style={[styles.saveThemeButton, loading && styles.saveThemeButtonDisabled]}
            onPress={handleSaveTheme}
            disabled={loading}
          >
            <Palette size={20} color="#fff" />
            <Text style={styles.saveThemeButtonText}>
              {loading ? 'Application...' : 'Appliquer le thème'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Theme Note */}
        <View style={styles.themeNote}>
          <Text style={styles.themeNoteText}>
            💡 Le changement de thème prendra effet immédiatement. Le thème automatique suit les paramètres de votre appareil.
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
    paddingVertical: 40,
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
  themeInfo: {
    backgroundColor: '#e3f2fd',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  themeText: {
    flex: 1,
  },
  themeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066CC',
    marginBottom: 4,
  },
  themeSubtitle: {
    fontSize: 14,
    color: '#0066CC',
    lineHeight: 18,
  },
  themeOptions: {
    padding: 20,
    gap: 16,
  },
  themeOption: {
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
  themeOptionSelected: {
    borderColor: '#0066CC',
    backgroundColor: '#f8fbff',
  },
  themeOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  themeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  themeDetails: {
    flex: 1,
  },
  themeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  themeDescription: {
    fontSize: 14,
    color: '#666',
  },
  themePreview: {
    alignItems: 'center',
    position: 'relative',
  },
  previewCard: {
    width: 60,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    overflow: 'hidden',
  },
  previewHeader: {
    height: 16,
    width: '100%',
  },
  previewContent: {
    padding: 8,
    gap: 4,
  },
  previewText: {
    height: 4,
    borderRadius: 2,
    opacity: 0.3,
  },
  checkIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0066CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  benefits: {
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
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitIcon: {
    fontSize: 24,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  actionSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  saveThemeButton: {
    backgroundColor: '#0066CC',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveThemeButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveThemeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  themeNote: {
    backgroundColor: '#fff3cd',
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  themeNoteText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
});