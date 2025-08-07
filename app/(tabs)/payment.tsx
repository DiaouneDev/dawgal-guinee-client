import { CircleCheck as CheckCircle, CreditCard, CreditCard as Edit3, Plus, Shield, Smartphone, Star, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function PaymentScreen() {
  const [selectedMethod, setSelectedMethod] = useState('orange');
  const [showAddCard, setShowAddCard] = useState(false);

  const paymentMethods = [
    {
      id: 'orange',
      type: 'mobile',
      name: 'Orange Money',
      number: '+224 622 XX XX XX',
      icon: '🟠',
      isDefault: true,
      balance: '125 000 GNF',
    },
    {
      id: 'mtn',
      type: 'mobile',
      name: 'MTN Mobile Money',
      number: '+224 664 XX XX XX',
      icon: '🟡',
      isDefault: false,
      balance: '85 000 GNF',
    },
    {
      id: 'paycard',
      type: 'card',
      name: 'Paycard',
      number: '**** **** **** 1234',
      icon: '💳',
      isDefault: false,
      balance: '50 000 GNF',
    },
    {
      id: 'visa',
      type: 'card',
      name: 'Visa',
      number: '**** **** **** 5678',
      icon: '💳',
      isDefault: false,
      balance: null,
    },
  ];

  const recentTransactions = [
    {
      id: '1',
      type: 'payment',
      description: 'Trajet Kaloum → Ratoma',
      amount: '-25 000 GNF',
      date: '2024-01-15 14:35',
      status: 'completed',
      method: 'Orange Money',
    },
    {
      id: '2',
      type: 'payment',
      description: 'Trajet Matam → Dixinn',
      amount: '-18 000 GNF',
      date: '2024-01-14 09:20',
      status: 'completed',
      method: 'MTN Mobile Money',
    },
    {
      id: '3',
      type: 'refund',
      description: 'Remboursement trajet annulé',
      amount: '+35 000 GNF',
      date: '2024-01-12 16:50',
      status: 'completed',
      method: 'Orange Money',
    },
    {
      id: '4',
      type: 'topup',
      description: 'Rechargement Paycard',
      amount: '+50 000 GNF',
      date: '2024-01-10 12:15',
      status: 'completed',
      method: 'Paycard',
    },
  ];

  const handleSetDefault = (methodId: string) => {
    Alert.alert(
      'Méthode par défaut',
      'Définir comme méthode de paiement par défaut ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Confirmer', onPress: () => Alert.alert('Succès', 'Méthode définie par défaut') }
      ]
    );
  };

  const handleDeleteMethod = (methodId: string) => {
    Alert.alert(
      'Supprimer la méthode',
      'Êtes-vous sûr de vouloir supprimer cette méthode de paiement ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: () => Alert.alert('Supprimé', 'Méthode supprimée') }
      ]
    );
  };

  const handleAddPaymentMethod = () => {
    setShowAddCard(true);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return '💸';
      case 'refund':
        return '💰';
      case 'topup':
        return '💳';
      default:
        return '💱';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Moyens de paiement</Text>
          <Text style={styles.headerSubtitle}>Gérez vos méthodes de paiement</Text>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mes méthodes de paiement</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddPaymentMethod}
            >
              <Plus size={20} color="#0066CC" />
              <Text style={styles.addButtonText}>Ajouter</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.paymentMethods}>
            {paymentMethods.map((method) => (
              <View key={method.id} style={styles.paymentMethodCard}>
                <View style={styles.methodHeader}>
                  <View style={styles.methodInfo}>
                    <Text style={styles.methodIcon}>{method.icon}</Text>
                    <View style={styles.methodDetails}>
                      <Text style={styles.methodName}>{method.name}</Text>
                      <Text style={styles.methodNumber}>{method.number}</Text>
                      {method.balance && (
                        <Text style={styles.methodBalance}>Solde: {method.balance}</Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.methodActions}>
                    {method.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Star size={12} color="#ffc107" fill="#ffc107" />
                        <Text style={styles.defaultText}>Par défaut</Text>
                      </View>
                    )}
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleSetDefault(method.id)}
                    >
                      <Edit3 size={16} color="#666" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleDeleteMethod(method.id)}
                    >
                      <Trash2 size={16} color="#dc3545" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Security Info */}
        <View style={styles.section}>
          <View style={styles.securityCard}>
            <Shield size={24} color="#28a745" />
            <View style={styles.securityInfo}>
              <Text style={styles.securityTitle}>Paiements sécurisés</Text>
              <Text style={styles.securityText}>
                Tous vos paiements sont protégés par un chiffrement de niveau bancaire
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transactions récentes</Text>
          <View style={styles.transactions}>
            {recentTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionCard}>
                <View style={styles.transactionIcon}>
                  <Text style={styles.transactionEmoji}>
                    {getTransactionIcon(transaction.type)}
                  </Text>
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionDescription}>
                    {transaction.description}
                  </Text>
                  <Text style={styles.transactionMethod}>
                    {transaction.method}
                  </Text>
                  <Text style={styles.transactionDate}>
                    {transaction.date}
                  </Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={[
                    styles.transactionAmountText,
                    { color: transaction.amount.startsWith('+') ? '#28a745' : '#dc3545' }
                  ]}>
                    {transaction.amount}
                  </Text>
                  <CheckCircle size={16} color="#28a745" />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Payment Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistiques</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>47</Text>
              <Text style={styles.statLabel}>Paiements</Text>
              <Text style={styles.statSubLabel}>Ce mois</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>1.2M</Text>
              <Text style={styles.statLabel}>Total dépensé</Text>
              <Text style={styles.statSubLabel}>GNF</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>25K</Text>
              <Text style={styles.statLabel}>Moyenne</Text>
              <Text style={styles.statSubLabel}>Par trajet</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionCard}>
              <CreditCard size={24} color="#0066CC" />
              <Text style={styles.quickActionText}>Recharger</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Smartphone size={24} color="#0066CC" />
              <Text style={styles.quickActionText}>Transférer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <CheckCircle size={24} color="#0066CC" />
              <Text style={styles.quickActionText}>Historique</Text>
            </TouchableOpacity>
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addButtonText: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '600',
  },
  paymentMethods: {
    gap: 12,
  },
  paymentMethodCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  methodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  methodDetails: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  methodNumber: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  methodBalance: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: '600',
  },
  methodActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  defaultText: {
    fontSize: 12,
    color: '#856404',
    fontWeight: '600',
  },
  actionButton: {
    padding: 8,
  },
  securityCard: {
    backgroundColor: '#d4edda',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  securityInfo: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#155724',
    marginBottom: 4,
  },
  securityText: {
    fontSize: 14,
    color: '#155724',
    lineHeight: 18,
  },
  transactions: {
    gap: 12,
  },
  transactionCard: {
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
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionEmoji: {
    fontSize: 20,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  transactionMethod: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
  },
  transactionAmount: {
    alignItems: 'flex-end',
    gap: 4,
  },
  transactionAmountText: {
    fontSize: 16,
    fontWeight: 'bold',
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
    color: '#0066CC',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  statSubLabel: {
    fontSize: 12,
    color: '#666',
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
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
});