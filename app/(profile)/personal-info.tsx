import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, User, Phone, Mail, Calendar, MapPin, CreditCard as Edit3 } from 'lucide-react-native';

export default function PersonalInfoScreen() {
  const userInfo = {
    firstName: 'Mamadou',
    lastName: 'Diallo',
    email: 'mamadou.diallo@email.com',
    phone: '+224 622 123 456',
    dateOfBirth: '15/03/1990',
    profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    addresses: [
      { id: '1', label: 'Domicile', address: 'Kaloum, Conakry, Guinée' },
      { id: '2', label: 'Bureau', address: 'Matam, Conakry, Guinée' },
      { id: '3', label: 'École', address: 'Dixinn, Conakry, Guinée' },
    ],
  };

  const infoItems = [
    {
      id: 'name',
      label: 'Nom complet',
      value: `${userInfo.firstName} ${userInfo.lastName}`,
      icon: User,
    },
    {
      id: 'phone',
      label: 'Numéro de téléphone',
      value: userInfo.phone,
      icon: Phone,
    },
    {
      id: 'email',
      label: 'Adresse email',
      value: userInfo.email,
      icon: Mail,
    },
    {
      id: 'birth',
      label: 'Date de naissance',
      value: userInfo.dateOfBirth,
      icon: Calendar,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Informations personnelles</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => router.push('/(profile)/edit-info')}
          >
            <Edit3 size={20} color="#0066CC" />
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <View style={styles.profileSection}>
          <Image source={{ uri: userInfo.profileImage }} style={styles.profileImage} />
          <Text style={styles.profileName}>
            {userInfo.firstName} {userInfo.lastName}
          </Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de base</Text>
          <View style={styles.infoCard}>
            {infoItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <View key={item.id} style={[
                  styles.infoItem,
                  index < infoItems.length - 1 && styles.infoItemBorder
                ]}>
                  <View style={styles.infoIcon}>
                    <IconComponent size={20} color="#0066CC" />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>{item.label}</Text>
                    <Text style={styles.infoValue}>{item.value}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Favorite Addresses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Adresses favorites</Text>
          <View style={styles.addressesCard}>
            {userInfo.addresses.map((address, index) => (
              <View key={address.id} style={[
                styles.addressItem,
                index < userInfo.addresses.length - 1 && styles.addressItemBorder
              ]}>
                <View style={styles.addressIcon}>
                  <MapPin size={20} color="#0066CC" />
                </View>
                <View style={styles.addressContent}>
                  <Text style={styles.addressLabel}>{address.label}</Text>
                  <Text style={styles.addressValue}>{address.address}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Account Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistiques du compte</Text>
          <View style={styles.statsCard}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Membre depuis</Text>
              <Text style={styles.statValue}>Janvier 2024</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Nombre de trajets</Text>
              <Text style={styles.statValue}>47</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Note moyenne</Text>
              <Text style={styles.statValue}>4.8 ⭐</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Statut du compte</Text>
              <Text style={[styles.statValue, styles.activeStatus]}>Actif</Text>
            </View>
          </View>
        </View>

        {/* Edit Button */}
        <View style={styles.actionSection}>
          <TouchableOpacity 
            style={styles.editInfoButton}
            onPress={() => router.push('/(profile)/edit-info')}
          >
            <Edit3 size={20} color="#fff" />
            <Text style={styles.editInfoButtonText}>Modifier mes informations</Text>
          </TouchableOpacity>
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
  editButton: {
    padding: 4,
  },
  profileSection: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  infoItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  addressesCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  addressItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  addressContent: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  addressValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  activeStatus: {
    color: '#28a745',
  },
  actionSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  editInfoButton: {
    backgroundColor: '#0066CC',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  editInfoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});