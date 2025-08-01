import React, { useState, useEffect } from 'react';
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
import { MessageSquare, Clock } from 'lucide-react-native';

export default function VerifyOTPScreen() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = `otp-${index + 1}`;
      // Focus next input (would need ref implementation)
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      Alert.alert('Erreur', 'Veuillez saisir le code complet');
      return;
    }

    setLoading(true);
    // Simulation de vérification
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    Alert.alert('Code renvoyé', 'Un nouveau code a été envoyé');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <MessageSquare size={48} color="#0066CC" />
          </View>
          <Text style={styles.title}>Vérification</Text>
          <Text style={styles.subtitle}>
            Nous avons envoyé un code de vérification à votre numéro de téléphone
          </Text>
          <Text style={styles.phoneNumber}>+224 XX XX XX XX</Text>
        </View>

        <View style={styles.otpContainer}>
          <Text style={styles.otpLabel}>Entrez le code à 6 chiffres</Text>
          <View style={styles.otpInputs}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.verifyButton, otp.join('').length !== 6 && styles.verifyButtonDisabled]} 
          onPress={handleVerify} 
          disabled={loading || otp.join('').length !== 6}
        >
          <Text style={styles.verifyButtonText}>
            {loading ? 'Vérification...' : 'Vérifier'}
          </Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          {!canResend ? (
            <View style={styles.countdownContainer}>
              <Clock size={16} color="#666" />
              <Text style={styles.countdownText}>
                Renvoyer le code dans {countdown}s
              </Text>
            </View>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendText}>Renvoyer le code</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity 
          style={styles.changeNumberButton}
          onPress={() => router.back()}
        >
          <Text style={styles.changeNumberText}>Changer de numéro</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
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
    marginBottom: 8,
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0066CC',
  },
  otpContainer: {
    marginBottom: 30,
  },
  otpLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  otpInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#fff',
  },
  verifyButton: {
    backgroundColor: '#0066CC',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  verifyButtonDisabled: {
    backgroundColor: '#ccc',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countdownText: {
    fontSize: 16,
    color: '#666',
  },
  resendText: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '600',
  },
  changeNumberButton: {
    alignItems: 'center',
  },
  changeNumberText: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'underline',
  },
});