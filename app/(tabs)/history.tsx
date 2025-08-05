import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { 
  MapPin, 
  Clock, 
  Star, 
  Filter,
  Search,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react-native';

export default function HistoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const trips = [
    {
      id: '1',
      type: 'solo',
      from: 'Kaloum',
      to: 'Ratoma',
      date: '2024-01-15',
      time: '14:30',
      price: '25 000 GNF',
      distance: '5 km',
      duration: '25 min',
      status: 'completed',
      driver: 'Mamadou Bah',
      rating: 5,
      vehicle: 'Toyota Corolla - AB 123 CD',
    },
    {
      id: '2',
      type: 'shared',
      from: 'Matam',
      to: 'Dixinn',
      date: '2024-01-14',
      time: '09:15',
      price: '18 000 GNF',
      distance: '6 km',
      duration: '30 min',
      status: 'completed',
      driver: 'Fatoumata Diallo',
      rating: 4,
      vehicle: 'Hyundai Accent - CD 456 EF',
    },
    {
      id: '3',
      type: 'school',
      from: 'Domicile',
      to: 'École Primaire Kaloum',
      date: '2024-01-13',
      time: '07:00',
      price: '12 000 GNF',
      distance: '4 km',
      duration: '20 min',
      status: 'completed',
      driver: 'Ibrahima Camara',
      rating: 5,
      vehicle: 'Nissan Almera - EF 789 GH',
    },
    {
      id: '4',
      type: 'solo',
      from: 'Ratoma',
      to: 'Aéroport',
      date: '2024-01-12',
      time: '16:45',
      price: '35 000 GNF',
      distance: '7 km',
      duration: '35 min',
      status: 'cancelled',
      driver: 'Amadou Diallo',
      rating: 0,
      vehicle: 'Toyota Camry - GH 012 IJ',
    },
    {
      id: '5',
      type: 'shared',
      from: 'Dixinn',
      to: 'Marché Madina',
      date: '2024-01-11',
      time: '11:20',
      price: '15 000 GNF',
      distance: '5 km',
      duration: '28 min',
      status: 'completed',
      driver: 'Mariama Sylla',
      rating: 4,
      vehicle: 'Peugeot 307 - IJ 345 KL',
    },
  ];

  const filters = [
    { id: 'all', label: 'Tous', count: trips.length },
    { id: 'completed', label: 'Terminés', count: trips.filter(t => t.status === 'completed').length },
    { id: 'cancelled', label: 'Annulés', count: trips.filter(t => t.status === 'cancelled').length },
    { id: 'solo', label: 'Solo', count: trips.filter(t => t.type === 'solo').length },
    { id: 'shared', label: 'Partagés', count: trips.filter(t => t.type === 'shared').length },
    { id: 'school', label: 'Scolaires', count: trips.filter(t => t.type === 'school').length },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} color="#28a745" />;
      case 'cancelled':
        return <XCircle size={16} color="#dc3545" />;
      default:
        return <AlertCircle size={16} color="#ffc107" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
      default:
        return 'En cours';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'solo':
        return 'Solo';
      case 'shared':
        return 'Partagé';
      case 'school':
        return 'Scolaire';
      default:
        return type;
    }
  };

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.driver.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         trip.status === selectedFilter || 
                         trip.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={14}
        color={index < rating ? '#ffc107' : '#e9ecef'}
        fill={index < rating ? '#ffc107' : 'transparent'}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Historique des trajets</Text>
        <Text style={styles.headerSubtitle}>Consultez vos trajets passés</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un trajet..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterChip,
              selectedFilter === filter.id && styles.filterChipActive
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter.id && styles.filterTextActive
            ]}>
              {filter.label} ({filter.count})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Trips List */}
      <ScrollView style={styles.tripsList} showsVerticalScrollIndicator={false}>
        {filteredTrips.map((trip) => (
          <View key={trip.id} style={styles.tripCard}>
            <View style={styles.tripHeader}>
              <View style={styles.tripType}>
                <Text style={styles.tripTypeText}>{getTypeLabel(trip.type)}</Text>
              </View>
              <View style={styles.tripStatus}>
                {getStatusIcon(trip.status)}
                <Text style={[
                  styles.tripStatusText,
                  { color: trip.status === 'completed' ? '#28a745' : 
                           trip.status === 'cancelled' ? '#dc3545' : '#ffc107' }
                ]}>
                  {getStatusText(trip.status)}
                </Text>
              </View>
            </View>

            <View style={styles.tripRoute}>
              <View style={styles.routePoints}>
                <View style={styles.routePoint} />
                <View style={styles.routeLine} />
                <View style={[styles.routePoint, styles.routePointEnd]} />
              </View>
              <View style={styles.routeDetails}>
                <Text style={styles.routeFrom}>{trip.from}</Text>
                <Text style={styles.routeTo}>{trip.to}</Text>
              </View>
            </View>

            <View style={styles.tripInfo}>
              <View style={styles.tripDateTime}>
                <Calendar size={14} color="#666" />
                <Text style={styles.tripDate}>{trip.date}</Text>
                <Clock size={14} color="#666" />
                <Text style={styles.tripTime}>{trip.time}</Text>
              </View>
              <Text style={styles.tripPrice}>{trip.price}</Text>
            </View>

            <View style={styles.tripDetails}>
              <Text style={styles.tripDriver}>Chauffeur: {trip.driver}</Text>
              <Text style={styles.tripVehicle}>{trip.vehicle}</Text>
              <View style={styles.tripMeta}>
                <Text style={styles.tripDistance}>{trip.distance}</Text>
                <Text style={styles.tripDuration}>{trip.duration}</Text>
                {trip.status === 'completed' && (
                  <View style={styles.tripRating}>
                    {renderStars(trip.rating)}
                  </View>
                )}
              </View>
            </View>

            {trip.status === 'completed' && (
              <View style={styles.tripActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Refaire ce trajet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]}>
                  <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
                    Télécharger reçu
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}

        {filteredTrips.length === 0 && (
          <View style={styles.emptyState}>
            <MapPin size={48} color="#ccc" />
            <Text style={styles.emptyStateTitle}>Aucun trajet trouvé</Text>
            <Text style={styles.emptyStateText}>
              {searchQuery ? 'Essayez avec d\'autres mots-clés' : 'Vous n\'avez pas encore effectué de trajets'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filtersContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  filtersContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  filterChip: {
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  filterChipActive: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  tripsList: {
    flex: 1,
    padding: 20,
  },
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tripType: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tripTypeText: {
    fontSize: 12,
    color: '#0066CC',
    fontWeight: '600',
  },
  tripStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tripStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tripRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  routePoints: {
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
  routeDetails: {
    flex: 1,
  },
  routeFrom: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  routeTo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  tripInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tripDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tripDate: {
    fontSize: 14,
    color: '#666',
  },
  tripTime: {
    fontSize: 14,
    color: '#666',
  },
  tripPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  tripDetails: {
    marginBottom: 12,
  },
  tripDriver: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  tripVehicle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  tripMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  tripDistance: {
    fontSize: 14,
    color: '#666',
  },
  tripDuration: {
    fontSize: 14,
    color: '#666',
  },
  tripRating: {
    flexDirection: 'row',
    gap: 2,
  },
  tripActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#0066CC',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0066CC',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  actionButtonTextSecondary: {
    color: '#0066CC',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});