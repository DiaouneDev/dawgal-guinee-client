import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Lock, Phone, Mail, ArrowLeft } from 'lucide-react-native';

export default function ForgotPasswordScreen() {
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    // Simulation d'envoi
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Code envoyé',
        `Un code de récupération a été envoyé à votre ${method === 'phone' ? 'numéro' : 'email'}`,
        [
          {
            text: 'OK',
            onPress: () => router.push('/(auth)/verify-otp'),
          },
        ]
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Lock size={48} color="#0066CC" />
          </View>
          <Text style={styles.title}>Mot de passe oublié</Text>
          <Text style={styles.subtitle}>
            Choisissez comment vous souhaitez récupérer votre mot de passe
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.methodSelector}>
            <TouchableOpacity
              style={[styles.methodButton, method === 'phone' && styles.methodButtonActive]}
              onPress={() => setMethod('phone')}
            >
              <Phone size={20} color={method === 'phone' ? '#fff' : '#666'} />
              <Text style={[styles.methodText, method === 'phone' && styles.methodTextActive]}>
                SMS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.methodButton, method === 'email' && styles.methodButtonActive]}
              onPress={() => setMethod('email')}
            >
              <Mail size={20} color={method === 'email' ? '#fff' : '#666'} />
              <Text style={[styles.methodText, method === 'email' && styles.methodTextActive]}>
                Email
              </Text>
            </TouchableOpacity>
          </View>

          {method === 'phone' ? (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Numéro de téléphone</Text>
              <TextInput
                style={styles.input}
                placeholder="+224 XX XX XX XX"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
              <Text style={styles.helpText}>
                Nous enverrons un code de vérification par SMS
              </Text>
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Adresse email</Text>
              <TextInput
                style={styles.input}
                placeholder="votre@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Text style={styles.helpText}>
                Nous enverrons un lien de récupération par email
              </Text>
            </View>
          )}

          <TouchableOpacity 
            style={styles.resetButton} 
            onPress={handleResetPassword} 
            disabled={loading}
          >
            <Text style={styles.resetButtonText}>
              {loading ? 'Envoi...' : 'Envoyer le code'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    flex: 1,
  },
  methodSelector: {
    flexDirection: 'row',
    marginBottom: 30,
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
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  resetButton: {
    backgroundColor: '#0066CC',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});