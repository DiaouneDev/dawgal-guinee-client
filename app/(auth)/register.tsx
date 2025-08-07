import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Link, router } from 'expo-router';
import { Calendar, Camera, Eye, EyeOff, Mail, Phone, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type FormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
};

export default function RegisterScreen() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleRegister = async () => {
    // Validation simple
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    
    // Simulation d'inscription
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Succès', 'Votre compte a été créé avec succès');
      router.replace('/(auth)/login'); // Redirection vers la page de connexion
    }, 1500);
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    updateFormData('dateOfBirth', formatDate(currentDate));
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('fr-FR');
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert("Permission requise", "L'application a besoin d'accéder à votre galerie pour ajouter une photo de profil");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Créer un compte</Text>
              <Text style={styles.subtitle}>Rejoignez notre communauté</Text>
            </View>

            <View style={styles.form}>
              {/* Photo de profil */}
              <View style={styles.profileImageContainer}>
                <TouchableOpacity 
                  style={styles.profileImageButton} 
                  onPress={pickImage}
                  activeOpacity={0.7}
                >
                  {profileImage ? (
                    <Image 
                      source={{ uri: profileImage }} 
                      style={styles.profileImage} 
                    />
                  ) : (
                    <View style={styles.profileImagePlaceholder}>
                      <Camera size={24} color="#666" />
                      <Text style={styles.profileImageText}>Photo de profil</Text>
                    </View>
                  )}
                </TouchableOpacity>
                <Text style={styles.optionalText}>Optionnel</Text>
              </View>

              {/* Nom et Prénom */}
              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.label}>Prénom*</Text>
                  <View style={styles.inputWithIcon}>
                    <User size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Votre prénom"
                      value={formData.firstName}
                      onChangeText={(value) => updateFormData('firstName', value)}
                      autoCapitalize="words"
                    />
                  </View>
                </View>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.label}>Nom*</Text>
                  <View style={styles.inputWithIcon}>
                    <User size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Votre nom"
                      value={formData.lastName}
                      onChangeText={(value) => updateFormData('lastName', value)}
                      autoCapitalize="words"
                    />
                  </View>
                </View>
              </View>

              {/* Email */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email*</Text>
                <View style={styles.inputWithIcon}>
                  <Mail size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChangeText={(value) => updateFormData('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                </View>
              </View>

              {/* Téléphone */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Téléphone</Text>
                <View style={styles.inputWithIcon}>
                  <Phone size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="+224 XX XX XX XX"
                    value={formData.phoneNumber}
                    onChangeText={(value) => updateFormData('phoneNumber', value)}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              {/* Adresse */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Adresse</Text>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={styles.input}
                    placeholder="Votre adresse complète"
                    value={formData.address}
                    onChangeText={(value) => updateFormData('address', value)}
                  />
                </View>
              </View>

              {/* Date de naissance */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Date de naissance</Text>
                <TouchableOpacity 
                  style={styles.inputWithIcon}
                  onPress={() => setShowDatePicker(true)}
                  activeOpacity={0.7}
                >
                  <Calendar size={20} color="#666" style={styles.inputIcon} />
                  <Text style={[styles.input, { color: formData.dateOfBirth ? '#000' : '#888' }]}>
                    {formData.dateOfBirth || 'JJ/MM/AAAA'}
                  </Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                    locale="fr-FR"
                  />
                )}
              </View>

              {/* Mot de passe */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Mot de passe*</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Créez un mot de passe"
                    value={formData.password}
                    onChangeText={(value) => updateFormData('password', value)}
                    secureTextEntry={!showPassword}
                    autoComplete="new-password"
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color="#666" />
                    ) : (
                      <Eye size={20} color="#666" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirmation mot de passe */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirmer le mot de passe*</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirmez votre mot de passe"
                    value={formData.confirmPassword}
                    onChangeText={(value) => updateFormData('confirmPassword', value)}
                    secureTextEntry={!showConfirmPassword}
                    autoComplete="new-password"
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} color="#666" />
                    ) : (
                      <Eye size={20} color="#666" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Bouton d'inscription */}
              <TouchableOpacity 
                style={[
                  styles.registerButton,
                  loading && styles.registerButtonDisabled
                ]} 
                onPress={handleRegister} 
                disabled={loading}
                activeOpacity={0.7}
              >
                <Text style={styles.registerButtonText}>
                  {loading ? 'Inscription en cours...' : 'Créer mon compte'}
                </Text>
              </TouchableOpacity>

              {/* Conditions d'utilisation */}
              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  En vous inscrivant, vous acceptez nos{' '}
                  <Text style={styles.termsLink}>Conditions d'utilisation</Text> et notre{' '}
                  <Text style={styles.termsLink}>Politique de confidentialité</Text>.
                </Text>
              </View>
            </View>

            {/* Lien vers connexion */}
            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginText}>Vous avez déjà un compte? </Text>
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
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0066cc',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  profileImagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  profileImageText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  optionalText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 14,
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
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
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
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
  },
  eyeButton: {
    padding: 14,
  },
  registerButton: {
    backgroundColor: '#0066cc',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  termsContainer: {
    paddingHorizontal: 8,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    fontSize: 14,
    color: '#0066cc',
    fontWeight: '600',
  },
});