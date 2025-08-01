import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { 
  MapPin, 
  Navigation, 
  Car, 
  Users, 
  GraduationCap,
  Clock,
  Plus,
  Minus,
  Calendar,
  Settings
} from 'lucide-react-native';

export default function BookingScreen() {
  const [tripType, setTripType] = useState<'solo' | 'shared' | 'school'>('solo');
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [passengers, setPassengers] = useState({ adults: 1, children: 0 });
  const [scheduledTime, setScheduledTime] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [vehicleType, setVehicleType] = useState('standard');
  const [specialRequests, setSpecialRequests] = useState('');

  const tripTypes = [
    {
      id: 'solo',
      title: 'Trajet Solo',
      subtitle: '5 000 GNF/km',
      description: 'Véhicule exclusif pour vous',
      icon: Car,
      color: '#0066CC',
    },
    {
      id: 'shared',
      title: 'Trajet Partagé',
      subtitle: '3 000 GNF/km',
      description: 'Partagez avec d\'autres passagers',
      icon: Users,
      color: '#28a745',
    },
    {
      id: 'school',
      title: 'Transport Scolaire',
      subtitle: '3 000 GNF/km',
      description: 'Transport sécurisé pour élèves',
      icon: GraduationCap,
      color: '#ffc107',
    },
  ];

  const vehicleTypes = [
    { id: 'standard', name: 'Standard', price: '+0 GNF' },
    { id: 'comfort', name: 'Confort', price: '+2 000 GNF' },
    { id: 'premium', name: 'Premium', price: '+5 000 GNF' },
  ];

  const favoriteAddresses = [
    { id: '1', label: 'Domicile', address: 'Kaloum, Conakry' },
    { id: '2', label: 'Bureau', address: 'Matam, Conakry' },
    { id: '3', label: 'École', address: 'Dixinn, Conakry' },
  ];

  const handlePassengerChange = (type: 'adults' | 'children', operation: 'add' | 'subtract') => {
    setPassengers(prev => ({
      ...prev,
      [type]: operation === 'add' 
        ? Math.min(prev[type] + 1, type === 'adults' ? 4 : 3)
        : Math.max(prev[type] - 1, type === 'adults' ? 1 : 0)
    }));
  };

  const calculateEstimatedPrice = () => {
    const basePrice = tripType === 'solo' ? 5000 : 3000;
    const distance = 8; // Distance estimée en km
    const totalPassengers = passengers.adults + passengers.children;
    
    let price = basePrice * distance;
    if (tripType !== 'solo') {
      price *= totalPassengers;
    }
    
    // Ajout du coût du véhicule
    if (vehicleType === 'comfort') price += 2000;
    if (vehicleType === 'premium') price += 5000;
    
    return price;
  };

  const handleBooking = () => {
    if (!departure || !destination) {
      Alert.alert('Erreur', 'Veuillez renseigner les adresses de départ et d\'arrivée');
      return;
    }
    
    Alert.alert(
      'Confirmation',
      `Réserver un ${tripTypes.find(t => t.id === tripType)?.title.toLowerCase()} pour ${calculateEstimatedPrice().toLocaleString()} GNF ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Confirmer', onPress: () => Alert.alert('Succès', 'Recherche de chauffeur en cours...') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Réserver un trajet</Text>
          <Text style={styles.headerSubtitle}>Choisissez votre type de transport</Text>
        </View>

        {/* Trip Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Type de trajet</Text>
          <View style={styles.tripTypes}>
            {tripTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.tripTypeCard,
                    tripType === type.id && styles.tripTypeCardActive
                  ]}
                  onPress={() => setTripType(type.id as any)}
                >
                  <View style={[styles.tripTypeIcon, { backgroundColor: type.color }]}>
                    <IconComponent size={24} color="#fff" />
                  </View>
                  <Text style={styles.tripTypeTitle}>{type.title}</Text>
                  <Text style={styles.tripTypeSubtitle}>{type.subtitle}</Text>
                  <Text style={styles.tripTypeDescription}>{type.description}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Addresses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Itinéraire</Text>
          
          <View style={styles.addressContainer}>
            <View style={styles.addressInputContainer}>
              <View style={styles.addressIcon}>
                <View style={styles.departurePoint} />
              </View>
              <View style={styles.addressInput}>
                <Text style={styles.addressLabel}>Départ</Text>
                <TextInput
                  style={styles.addressTextInput}
                  placeholder="Adresse de départ"
                  value={departure}
                  onChangeText={setDeparture}
                />
              </View>
              <TouchableOpacity style={styles.locationButton}>
                <Navigation size={20} color="#0066CC" />
              </TouchableOpacity>
            </View>

            <View style={styles.routeLine} />

            <View style={styles.addressInputContainer}>
              <View style={styles.addressIcon}>
                <View style={styles.destinationPoint} />
              </View>
              <View style={styles.addressInput}>
                <Text style={styles.addressLabel}>Destination</Text>
                <TextInput
                  style={styles.addressTextInput}
                  placeholder="Adresse de destination"
                  value={destination}
                  onChangeText={setDestination}
                />
              </View>
              <TouchableOpacity style={styles.locationButton}>
                <MapPin size={20} color="#0066CC" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Favorite Addresses */}
          <View style={styles.favoriteAddresses}>
            <Text style={styles.favoriteTitle}>Adresses favorites</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.favoriteList}>
                {favoriteAddresses.map((address) => (
                  <TouchableOpacity
                    key={address.id}
                    style={styles.favoriteCard}
                    onPress={() => setDestination(address.address)}
                  >
                    <Text style={styles.favoriteLabel}>{address.label}</Text>
                    <Text style={styles.favoriteAddress}>{address.address}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Passengers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Passagers</Text>
          <View style={styles.passengersContainer}>
            <View style={styles.passengerRow}>
              <Text style={styles.passengerLabel}>Adultes</Text>
              <View style={styles.passengerControls}>
                <TouchableOpacity
                  style={styles.passengerButton}
                  onPress={() => handlePassengerChange('adults', 'subtract')}
                >
                  <Minus size={16} color="#666" />
                </TouchableOpacity>
                <Text style={styles.passengerCount}>{passengers.adults}</Text>
                <TouchableOpacity
                  style={styles.passengerButton}
                  onPress={() => handlePassengerChange('adults', 'add')}
                >
                  <Plus size={16} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.passengerRow}>
              <Text style={styles.passengerLabel}>Enfants</Text>
              <View style={styles.passengerControls}>
                <TouchableOpacity
                  style={styles.passengerButton}
                  onPress={() => handlePassengerChange('children', 'subtract')}
                >
                  <Minus size={16} color="#666" />
                </TouchableOpacity>
                <Text style={styles.passengerCount}>{passengers.children}</Text>
                <TouchableOpacity
                  style={styles.passengerButton}
                  onPress={() => handlePassengerChange('children', 'add')}
                >
                  <Plus size={16} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horaire</Text>
          <View style={styles.scheduleContainer}>
            <TouchableOpacity
              style={[styles.scheduleOption, !isScheduled && styles.scheduleOptionActive]}
              onPress={() => setIsScheduled(false)}
            >
              <Text style={[styles.scheduleText, !isScheduled && styles.scheduleTextActive]}>
                Maintenant
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.scheduleOption, isScheduled && styles.scheduleOptionActive]}
              onPress={() => setIsScheduled(true)}
            >
              <Calendar size={16} color={isScheduled ? '#fff' : '#666'} />
              <Text style={[styles.scheduleText, isScheduled && styles.scheduleTextActive]}>
                Programmer
              </Text>
            </TouchableOpacity>
          </View>
          {isScheduled && (
            <TextInput
              style={styles.timeInput}
              placeholder="HH:MM"
              value={scheduledTime}
              onChangeText={setScheduledTime}
            />
          )}
        </View>

        {/* Vehicle Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Type de véhicule</Text>
          <View style={styles.vehicleTypes}>
            {vehicleTypes.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.id}
                style={[
                  styles.vehicleTypeCard,
                  vehicleType === vehicle.id && styles.vehicleTypeCardActive
                ]}
                onPress={() => setVehicleType(vehicle.id)}
              >
                <Text style={styles.vehicleTypeName}>{vehicle.name}</Text>
                <Text style={styles.vehicleTypePrice}>{vehicle.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Special Requests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Demandes spéciales</Text>
          <TextInput
            style={styles.specialRequestsInput}
            placeholder="Climatisation, musique, arrêts supplémentaires..."
            value={specialRequests}
            onChangeText={setSpecialRequests}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Price Estimate */}
        <View style={styles.priceContainer}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Prix estimé</Text>
            <Text style={styles.priceValue}>{calculateEstimatedPrice().toLocaleString()} GNF</Text>
          </View>
          <Text style={styles.priceNote}>
            Prix final calculé selon la distance réelle
          </Text>
        </View>

        {/* Book Button */}
        <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookButtonText}>Réserver maintenant</Text>
        </TouchableOpacity>
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
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
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
  tripTypes: {
    gap: 12,
  },
  tripTypeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripTypeCardActive: {
    borderColor: '#0066CC',
  },
  tripTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  tripTypeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  tripTypeSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0066CC',
    marginRight: 8,
  },
  tripTypeDescription: {
    fontSize: 12,
    color: '#666',
    position: 'absolute',
    bottom: 16,
    left: 80,
  },
  addressContainer: {
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
  addressInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressIcon: {
    width: 24,
    alignItems: 'center',
    marginRight: 16,
  },
  departurePoint: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0066CC',
  },
  destinationPoint: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: '#28a745',
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#ddd',
    marginLeft: 28,
    marginVertical: 8,
  },
  addressInput: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  addressTextInput: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  locationButton: {
    padding: 8,
  },
  favoriteAddresses: {
    marginTop: 16,
  },
  favoriteTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  favoriteList: {
    flexDirection: 'row',
    gap: 12,
  },
  favoriteCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  favoriteLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0066CC',
    marginBottom: 4,
  },
  favoriteAddress: {
    fontSize: 11,
    color: '#666',
  },
  passengersContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  passengerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  passengerLabel: {
    fontSize: 16,
    color: '#333',
  },
  passengerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  passengerButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  passengerCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 24,
    textAlign: 'center',
  },
  scheduleContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  scheduleOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
    gap: 8,
  },
  scheduleOptionActive: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  scheduleText: {
    fontSize: 16,
    color: '#666',
  },
  scheduleTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  timeInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  vehicleTypes: {
    flexDirection: 'row',
    gap: 12,
  },
  vehicleTypeCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  vehicleTypeCardActive: {
    borderColor: '#0066CC',
  },
  vehicleTypeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  vehicleTypePrice: {
    fontSize: 14,
    color: '#666',
  },
  specialRequestsInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlignVertical: 'top',
  },
  priceContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  priceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  priceNote: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  bookButton: {
    backgroundColor: '#0066CC',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});