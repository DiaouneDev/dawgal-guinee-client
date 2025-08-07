import { router } from 'expo-router';
import { ArrowLeft, CircleCheck as CheckCircle, Eye, EyeOff, Lock, Shield } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ChangePasswordScreen() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);

  const passwordRequirements = [
    { id: 1, text: 'Au moins 8 caractères', met: formData.newPassword.length >= 8 },
    { id: 2, text: 'Au moins une majuscule', met: /[A-Z]/.test(formData.newPassword) },
    { id: 3, text: 'Au moins une minuscule', met: /[a-z]/.test(formData.newPassword) },
    { id: 4, text: 'Au moins un chiffre', met: /\d/.test(formData.newPassword) },
    { id: 5, text: 'Au moins un caractère spécial', met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword) },
  ];

  const handleChangePassword = async () => {
    if (!formData.currentPassword) {
      Alert.alert('Erreur', 'Veuillez saisir votre mot de passe actuel');
      return;
    }

    if (!formData.newPassword) {
      Alert.alert('Erreur', 'Veuillez saisir un nouveau mot de passe');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    const allRequirementsMet = passwordRequirements.every(req => req.met);
    if (!allRequirementsMet) {
      Alert.alert('Erreur', 'Le nouveau mot de passe ne respecte pas tous les critères');
      return;
    }

    setLoading(true);
    // Simulation de changement de mot de passe
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Succès',
        'Votre mot de passe a été modifié avec succès',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    }, 1500);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Modifier le mot de passe</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Security Info */}
        <View style={styles.securityInfo}>
          <Shield size={24} color="#0066CC" />
          <View style={styles.securityText}>
            <Text style={styles.securityTitle}>Sécurité de votre compte</Text>
            <Text style={styles.securitySubtitle}>
              Choisissez un mot de passe fort pour protéger votre compte
            </Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mot de passe actuel</Text>
            <View style={styles.inputContainer}>
              <Lock size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.currentPassword}
                onChangeText={(value) => updateFormData('currentPassword', value)}
                placeholder="Saisissez votre mot de passe actuel"
                secureTextEntry={!showPasswords.current}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => togglePasswordVisibility('current')}
              >
                {showPasswords.current ? 
                  <EyeOff size={20} color="#666" /> : 
                  <Eye size={20} color="#666" />
                }
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nouveau mot de passe</Text>
            <View style={styles.inputContainer}>
              <Lock size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.newPassword}
                onChangeText={(value) => updateFormData('newPassword', value)}
                placeholder="Saisissez votre nouveau mot de passe"
                secureTextEntry={!showPasswords.new}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => togglePasswordVisibility('new')}
              >
                {showPasswords.new ? 
                  <EyeOff size={20} color="#666" /> : 
                  <Eye size={20} color="#666" />
                }
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirmer le nouveau mot de passe</Text>
            <View style={styles.inputContainer}>
              <Lock size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.confirmPassword}
                onChangeText={(value) => updateFormData('confirmPassword', value)}
                placeholder="Confirmez votre nouveau mot de passe"
                secureTextEntry={!showPasswords.confirm}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => togglePasswordVisibility('confirm')}
              >
                {showPasswords.confirm ? 
                  <EyeOff size={20} color="#666" /> : 
                  <Eye size={20} color="#666" />
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Password Requirements */}
        {formData.newPassword.length > 0 && (
          <View style={styles.requirementsSection}>
            <Text style={styles.requirementsTitle}>Critères du mot de passe</Text>
            <View style={styles.requirements}>
              {passwordRequirements.map((requirement) => (
                <View key={requirement.id} style={styles.requirementItem}>
                  <CheckCircle 
                    size={16} 
                    color={requirement.met ? '#28a745' : '#ccc'} 
                    fill={requirement.met ? '#28a745' : 'transparent'}
                  />
                  <Text style={[
                    styles.requirementText,
                    { color: requirement.met ? '#28a745' : '#666' }
                  ]}>
                    {requirement.text}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Password Match Indicator */}
        {formData.confirmPassword.length > 0 && (
          <View style={styles.matchSection}>
            <View style={[
              styles.matchIndicator,
              { backgroundColor: formData.newPassword === formData.confirmPassword ? '#d4edda' : '#f8d7da' }
            ]}>
              <CheckCircle 
                size={16} 
                color={formData.newPassword === formData.confirmPassword ? '#28a745' : '#dc3545'} 
                fill={formData.newPassword === formData.confirmPassword ? '#28a745' : 'transparent'}
              />
              <Text style={[
                styles.matchText,
                { color: formData.newPassword === formData.confirmPassword ? '#155724' : '#721c24' }
              ]}>
                {formData.newPassword === formData.confirmPassword ? 
                  'Les mots de passe correspondent' : 
                  'Les mots de passe ne correspondent pas'
                }
              </Text>
            </View>
          </View>
        )}

        {/* Change Password Button */}
        <View style={styles.actionSection}>
          <TouchableOpacity 
            style={[styles.changePasswordButton, loading && styles.changePasswordButtonDisabled]}
            onPress={handleChangePassword}
            disabled={loading}
          >
            <Lock size={20} color="#fff" />
            <Text style={styles.changePasswordButtonText}>
              {loading ? 'Modification...' : 'Modifier le mot de passe'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Security Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Conseils de sécurité</Text>
          <View style={styles.tips}>
            <Text style={styles.tipText}>• Utilisez un mot de passe unique pour chaque compte</Text>
            <Text style={styles.tipText}>• Ne partagez jamais votre mot de passe</Text>
            <Text style={styles.tipText}>• Changez votre mot de passe régulièrement</Text>
            <Text style={styles.tipText}>• Activez l'authentification biométrique si disponible</Text>
          </View>
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
  placeholder: {
    width: 32,
  },
  securityInfo: {
    backgroundColor: '#e3f2fd',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  securityText: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066CC',
    marginBottom: 4,
  },
  securitySubtitle: {
    fontSize: 14,
    color: '#0066CC',
    lineHeight: 18,
  },
  form: {
    padding: 20,
    gap: 20,
  },
  inputGroup: {
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
  },
  eyeButton: {
    padding: 4,
  },
  requirementsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  requirementsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  requirements: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  requirementText: {
    fontSize: 14,
  },
  matchSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  matchIndicator: {
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  matchText: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  changePasswordButton: {
    backgroundColor: '#0066CC',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  changePasswordButtonDisabled: {
    backgroundColor: '#ccc',
  },
  changePasswordButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tipsSection: {
    backgroundColor: '#fff3cd',
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#856404',
    marginBottom: 12,
  },
  tips: {
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 18,
  },
});