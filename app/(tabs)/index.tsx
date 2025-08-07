import { router } from 'expo-router';
import {
  Bell,
  Car,
  Clock,
  Gift,
  GraduationCap,
  MapPin,
  Star,
  Users
} from 'lucide-react-native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function HomeScreen() {
  const quickActions = [
    {
      id: 'solo',
      title: 'Trajet Solo',
      subtitle: '5 000 GNF/km',
      icon: Car,
      color: '#0066CC',
      onPress: () => router.push('/(tabs)/booking'),
    },
    {
      id: 'shared',
      title: 'Trajet Partagé',
      subtitle: '3 000 GNF/km',
      icon: Users,
      color: '#28a745',
      onPress: () => router.push('/(tabs)/booking'),
    },
    {
      id: 'school',
      title: 'Transport Scolaire',
      subtitle: '3 000 GNF/km',
      icon: GraduationCap,
      color: '#ffc107',
      onPress: () => router.push('/(tabs)/booking'),
    },
  ];

  const recentTrips = [
    {
      id: '1',
      from: 'Kaloum',
      to: 'Ratoma',
      date: 'Aujourd\'hui 14:30',
      price: '25 000 GNF',
      status: 'completed',
    },
    {
      id: '2',
      from: 'Matam',
      to: 'Dixinn',
      date: 'Hier 09:15',
      price: '18 000 GNF',
      status: 'completed',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Bonjour,</Text>
              <Text style={styles.userName}>Mamadou Diallo</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color="#333" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>2</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <Gift size={32} color="#fff" />
            <View style={styles.promoText}>
              <Text style={styles.promoTitle}>Offre spéciale !</Text>
              <Text style={styles.promoSubtitle}>-20% sur votre prochain trajet partagé</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Réserver un trajet</Text>
          <View style={styles.quickActions}>
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <TouchableOpacity
                  key={action.id}
                  style={styles.quickActionCard}
                  onPress={action.onPress}
                >
                  <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                    <IconComponent size={24} color="#fff" />
                  </View>
                  <Text style={styles.quickActionTitle}>{action.title}</Text>
                  <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vos statistiques</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <MapPin size={20} color="#0066CC" />
              <Text style={styles.statNumber}>47</Text>
              <Text style={styles.statLabel}>Trajets</Text>
            </View>
            <View style={styles.statCard}>
              <Star size={20} color="#ffc107" />
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Note</Text>
            </View>
            <View style={styles.statCard}>
              <Clock size={20} color="#28a745" />
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Mois</Text>
            </View>
          </View>
        </View>

        {/* Recent Trips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trajets récents</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.recentTrips}>
            {recentTrips.map((trip) => (
              <View key={trip.id} style={styles.tripCard}>
                <View style={styles.tripRoute}>
                  <View style={styles.routePoint} />
                  <View style={styles.routeLine} />
                  <View style={[styles.routePoint, styles.routePointEnd]} />
                </View>
                <View style={styles.tripDetails}>
                  <Text style={styles.tripRoute}>
                    {trip.from} → {trip.to}
                  </Text>
                  <Text style={styles.tripDate}>{trip.date}</Text>
                </View>
                <View style={styles.tripPrice}>
                  <Text style={styles.tripPriceText}>{trip.price}</Text>
                  <View style={styles.tripStatus}>
                    <Text style={styles.tripStatusText}>Terminé</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Safety Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conseils sécurité</Text>
          <View style={styles.safetyTip}>
            <Text style={styles.safetyTipText}>
              💡 Vérifiez toujours la plaque d'immatriculation du véhicule avant de monter
            </Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#dc3545',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  promoBanner: {
    backgroundColor: '#0066CC',
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },
  promoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  promoText: {
    flex: 1,
  },
  promoTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  promoSubtitle: {
    color: '#e3f2fd',
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  recentTrips: {
    gap: 12,
  },
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripRoute: {
    alignItems: 'center',
    marginRight: 16,
  },
  routePoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0066CC',
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#ddd',
    marginVertical: 4,
  },
  routePointEnd: {
    backgroundColor: '#28a745',
  },
  tripDetails: {
    flex: 1,
  },
  tripDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  tripPrice: {
    alignItems: 'flex-end',
  },
  tripPriceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  tripStatus: {
    backgroundColor: '#d4edda',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  tripStatusText: {
    fontSize: 12,
    color: '#155724',
    fontWeight: '600',
  },
  safetyTip: {
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  safetyTipText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
});