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
import { User, CreditCard as Edit3, Lock, Globe, Palette, Bell, Shield, Circle as HelpCircle, LogOut, ChevronRight, Star, MapPin, Clock, Phone, Mail, Calendar } from 'lucide-react-native';

export default function ProfileScreen() {
  const userInfo = {
    firstName: 'Mamadou',
    lastName: 'Diallo',
    email: 'mamadou.diallo@email.com',
    phone: '+224 622 123 456',
    dateOfBirth: '15/03/1990',
    memberSince: 'Janvier 2024',
    profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 4.8,
    totalTrips: 47,
  };

  const menuItems = [
    {
      id: 'personal-info',
      title: 'Informations personnelles',
      subtitle: 'Nom, email, téléphone',
      icon: User,
      onPress: () => router.push('/(profile)/personal-info'),
    },
    {
      id: 'edit-info',
      title: 'Modifier les informations',
      subtitle: 'Mettre à jour vos données',
      icon: Edit3,
      onPress: () => router.push('/(profile)/edit-info'),
    },
    {
      id: 'change-password',
      title: 'Modifier le mot de passe',
      subtitle: 'Changer votre mot de passe',
      icon: Lock,
      onPress: () => router.push('/(profile)/change-password'),
    },
    {
      id: 'language',
      title: 'Langue',
      subtitle: 'Français',
      icon: Globe,
      onPress: () => router.push('/(profile)/language'),
    },
    {
      id: 'theme',
      title: 'Thème',
      subtitle: 'Clair',
      icon: Palette,
      onPress: () => router.push('/(profile)/theme'),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Gérer les notifications',
      icon: Bell,
      onPress: () => router.push('/(profile)/notifications'),
    },
    {
      id: 'security',
      title: 'Sécurité',
      subtitle: 'Authentification biométrique',
      icon: Shield,
      onPress: () => router.push('/(profile)/security'),
    },
    {
      id: 'help',
      title: 'Aide & Support',
      subtitle: 'FAQ, Contact',
      icon: HelpCircle,
      onPress: () => router.push('/(profile)/help'),
    },
  ];

  const handleLogout = () => {
    // Simulation de déconnexion
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mon Profil</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: userInfo.profileImage }} style={styles.profileImage} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {userInfo.firstName} {userInfo.lastName}
              </Text>
              <View style={styles.profileRating}>
                <Star size={16} color="#ffc107" fill="#ffc107" />
                <Text style={styles.ratingText}>{userInfo.rating}</Text>
                <Text style={styles.tripsText}>• {userInfo.totalTrips} trajets</Text>
              </View>
              <Text style={styles.memberSince}>Membre depuis {userInfo.memberSince}</Text>
            </View>
          </View>

          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <MapPin size={20} color="#0066CC" />
              <Text style={styles.statNumber}>{userInfo.totalTrips}</Text>
              <Text style={styles.statLabel}>Trajets</Text>
            </View>
            <View style={styles.statItem}>
              <Star size={20} color="#ffc107" />
              <Text style={styles.statNumber}>{userInfo.rating}</Text>
              <Text style={styles.statLabel}>Note</Text>
            </View>
            <View style={styles.statItem}>
              <Clock size={20} color="#28a745" />
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Mois</Text>
            </View>
          </View>
        </View>

        {/* Quick Info */}
        <View style={styles.quickInfoCard}>
          <Text style={styles.quickInfoTitle}>Informations rapides</Text>
          <View style={styles.quickInfoItems}>
            <View style={styles.quickInfoItem}>
              <Phone size={16} color="#666" />
              <Text style={styles.quickInfoText}>{userInfo.phone}</Text>
            </View>
            <View style={styles.quickInfoItem}>
              <Mail size={16} color="#666" />
              <Text style={styles.quickInfoText}>{userInfo.email}</Text>
            </View>
            <View style={styles.quickInfoItem}>
              <Calendar size={16} color="#666" />
              <Text style={styles.quickInfoText}>{userInfo.dateOfBirth}</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Paramètres du compte</Text>
          <View style={styles.menuItems}>
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={item.onPress}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuItemIcon}>
                      <IconComponent size={20} color="#0066CC" />
                    </View>
                    <View style={styles.menuItemContent}>
                      <Text style={styles.menuItemTitle}>{item.title}</Text>
                      <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                    </View>
                  </View>
                  <ChevronRight size={20} color="#ccc" />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#dc3545" />
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Dawgal Guinée v1.0.0</Text>
          <Text style={styles.appInfoText}>© 2024 Tous droits réservés</Text>
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
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  profileRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  tripsText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  memberSince: {
    fontSize: 14,
    color: '#666',
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  quickInfoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  quickInfoItems: {
    gap: 8,
  },
  quickInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quickInfoText: {
    fontSize: 14,
    color: '#666',
  },
  menuSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  menuItems: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  logoutSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#dc3545',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc3545',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 40,
  },
  appInfoText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
});