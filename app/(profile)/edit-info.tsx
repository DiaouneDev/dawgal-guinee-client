import { router } from 'expo-router';
import {
  ArrowLeft,
  Calendar,
  Camera,
  Mail,
  Phone,
  Save,
  User
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function EditInfoScreen() {
  const [formData, setFormData] = useState({
    firstName: 'Mamadou',
    lastName: 'Diallo',
    email: 'mamadou.diallo@email.com',
    phone: '+224 622 123 456',
    dateOfBirth: '15/03/1990',
  });

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    // Simulation de sauvegarde
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Succès',
        'Vos informations ont été mises à jour avec succès',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    }, 1500);
  };

  const handleChangePhoto = () => {
    Alert.alert(
      'Changer la photo',
      'Choisissez une option',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Prendre une photo', onPress: () => {} },
        { text: 'Choisir dans la galerie', onPress: () => {} },
      ]
    );
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Modifier les informations</Text>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
            disabled={loading}
          >
            <Save size={20} color="#0066CC" />
          </TouchableOpacity>
        </View>

        {/* Profile Photo */}
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' }} 
              style={styles.profileImage} 
            />
            <TouchableOpacity style={styles.cameraButton} onPress={handleChangePhoto}>
              <Camera size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.photoText}>Touchez pour changer la photo</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Prénom</Text>
            <View style={styles.inputContainer}>
              <User size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.firstName}
                onChangeText={(value) => updateFormData('firstName', value)}
                placeholder="Votre prénom"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom</Text>
            <View style={styles.inputContainer}>
              <User size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.lastName}
                onChangeText={(value) => updateFormData('lastName', value)}
                placeholder="Votre nom"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Numéro de téléphone</Text>
            <View style={styles.inputContainer}>
              <Phone size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(value) => updateFormData('phone', value)}
                placeholder="+224 XXX XXX XXX"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Adresse email</Text>
            <View style={styles.inputContainer}>
              <Mail size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                placeholder="votre@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date de naissance</Text>
            <View style={styles.inputContainer}>
              <Calendar size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.dateOfBirth}
                onChangeText={(value) => updateFormData('dateOfBirth', value)}
                placeholder="JJ/MM/AAAA"
              />
            </View>
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.actionSection}>
          <TouchableOpacity 
            style={[styles.saveInfoButton, loading && styles.saveInfoButtonDisabled]}
            onPress={handleSave}
            disabled={loading}
          >
            <Save size={20} color="#fff" />
            <Text style={styles.saveInfoButtonText}>
              {loading ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info Note */}
        <View style={styles.infoNote}>
          <Text style={styles.infoNoteText}>
            💡 Vos informations personnelles sont sécurisées et ne seront partagées qu'avec les chauffeurs lors de vos trajets.
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
  photoSection: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0066CC',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  photoText: {
    fontSize: 14,
    color: '#666',
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
  actionSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  saveInfoButton: {
    backgroundColor: '#0066CC',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveInfoButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveInfoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoNote: {
    backgroundColor: '#fff3cd',
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  infoNoteText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
});