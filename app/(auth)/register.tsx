import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link, router } from 'expo-router';
import { Eye, EyeOff, Phone, Mail, User, Calendar } from 'lucide-react-native';

export default function RegisterScreen() {
  const [registrationMethod, setRegistrationMethod] = useState<'phone' | 'email'>('phone');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    // Simulation d'inscription
    setTimeout(() => {
      setLoading(false);
      router.push('/(auth)/verify-otp');
    }, 1500);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Créer un compte</Text>
              <Text style={styles.subtitle}>Rejoignez Dawgal Guinée aujourd'hui</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.methodSelector}>
                <TouchableOpacity
                  style={[styles.methodButton, registrationMethod === 'phone' && styles.methodButtonActive]}
                  onPress={() => setRegistrationMethod('phone')}
                >
                  <Phone size={20} color={registrationMethod === 'phone' ? '#fff' : '#666'} />
                  <Text style={[styles.methodText, registrationMethod === 'phone' && styles.methodTextActive]}>
                    Téléphone
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.methodButton, registrationMethod === 'email' && styles.methodButtonActive]}
                  onPress={() => setRegistrationMethod('email')}
                >
                  <Mail size={20} color={registrationMethod === 'email' ? '#fff' : '#666'} />
                  <Text style={[styles.methodText, registrationMethod === 'email' && styles.methodTextActive]}>
                    Email
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.label}>Prénom</Text>
                  <View style={styles.inputWithIcon}>
                    <User size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                      style={styles.inputWithIconText}
                      placeholder="Votre prénom"
                      value={formData.firstName}
                      onChangeText={(value) => updateFormData('firstName', value)}
                    />
                  </View>
                </View>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.label}>Nom</Text>
                  <View style={styles.inputWithIcon}>
                    <User size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                      style={styles.inputWithIconText}
                      placeholder="Votre nom"
                      value={formData.lastName}
                      onChangeText={(value) => updateFormData('lastName', value)}
                    />
                  </View>
                </View>
              </View>

              {registrationMethod === 'phone' ? (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Numéro de téléphone</Text>
                  <View style={styles.inputWithIcon}>
                    <Phone size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                      style={styles.inputWithIconText}
                      placeholder="+224 XX XX XX XX"
                      value={formData.phoneNumber}
                      onChangeText={(value) => updateFormData('phoneNumber', value)}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Adresse email</Text>
                  <View style={styles.inputWithIcon}>
                    <Mail size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                      style={styles.inputWithIconText}
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChangeText={(value) => updateFormData('email', value)}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>
              )}

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Date de naissance</Text>
                <View style={styles.inputWithIcon}>
                  <Calendar size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputWithIconText}
                    placeholder="JJ/MM/AAAA"
                    value={formData.dateOfBirth}
                    onChangeText={(value) => updateFormData('dateOfBirth', value)}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Mot de passe</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Créer un mot de passe"
                    value={formData.password}
                    onChangeText={(value) => updateFormData('password', value)}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirmer le mot de passe</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirmer le mot de passe"
                    value={formData.confirmPassword}
                    onChangeText={(value) => updateFormData('confirmPassword', value)}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
                <Text style={styles.registerButtonText}>
                  {loading ? 'Création...' : 'Créer mon compte'}
                </Text>
              </TouchableOpacity>

              <View style={styles.terms}>
                <Text style={styles.termsText}>
                  En créant un compte, vous acceptez nos{' '}
                  <Text style={styles.termsLink}>Conditions d'utilisation</Text> et notre{' '}
                  <Text style={styles.termsLink}>Politique de confidentialité</Text>
                </Text>
              </View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Déjà un compte ? </Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.loginLink}>Se connecter</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    marginBottom: 30,
  },
  methodSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    padding: 4,
  },
  methodButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 6,
    gap: 8,
  },
  methodButtonActive: {
    backgroundColor: '#0066CC',
  },
  methodText: {
    fontSize: 16,
    color: '#666',
  },
  methodTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  inputContainer: {
    marginBottom: 20,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  inputWithIconText: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeButton: {
    paddingHorizontal: 16,
  },
  registerButton: {
    backgroundColor: '#0066CC',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  terms: {
    paddingHorizontal: 10,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: '#0066CC',
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '600',
  },
});