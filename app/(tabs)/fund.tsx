// TabPage.tsx
import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Dimensions, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import Notification from '@/components/crypto/Notification'; // Import the Notification component

const TabPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const theme = useTheme();

  // Handle deposit or withdraw confirmation
  const handleConfirm = () => {
    console.log('Input value:', amount);
    if (amount.trim() === '') {
      setNotification({ message: 'Please enter an amount.', type: 'error' });
      return;
    }
    const numericValue = parseFloat(amount);
    if (isNaN(numericValue) || numericValue <= 0) {
      setNotification({ message: 'Entrer une nombre valide.', type: 'error' });
      return;
    }

    const action = activeTab === 'deposit' ? 'deposer' : 'retirer';
    setNotification({ message: `Vous avez ${action} $${amount}`, type: 'success' });
    setAmount(''); // Clear the input after confirmation
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)} // Hide the notification
        />
      )}

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.tabButton,
            activeTab === 'deposit' && styles.activeTab,
            pressed && styles.pressedTab,
            { backgroundColor: activeTab === 'deposit' ? theme.buttonColor : theme.borderColor },
          ]}
          onPress={() => setActiveTab('deposit')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'deposit' ? '#ffffff' : theme.textColor }]}>Dépôt</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.tabButton,
            activeTab === 'withdraw' && styles.activeTab,
            pressed && styles.pressedTab,
            { backgroundColor: activeTab === 'withdraw' ? theme.buttonColor : theme.borderColor },
          ]}
          onPress={() => setActiveTab('withdraw')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'withdraw' ? '#ffffff' : theme.textColor }]}>Retrait</Text>
        </Pressable>
      </View>

      {/* Content Based on Active Tab */}
      <View style={[styles.contentContainer, { backgroundColor: theme.isDarkMode ? '#1f2937' : '#ffffff' }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.textColor }]}>
            {activeTab === 'deposit' ? 'Dépôt' : 'Retrait'}
          </Text>
          <Text style={[styles.subtitle, { color: theme.placeholderTextColor }]}>
            {activeTab === 'deposit'
              ? 'Ajouter des fonds à votre compte'
              : 'Retirer des fonds de votre compte'}
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={[styles.label, { color: theme.textColor }]}>Montant</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: theme.isDarkMode ? '#374151' : '#d1d5db', backgroundColor: theme.isDarkMode ? '#374151' : '#ffffff' },
            ]}
            placeholder="Entrer le montant"
            placeholderTextColor={theme.placeholderTextColor}
            inputMode="decimal"
            value={amount}
            onChangeText={setAmount}
          />
          <Pressable
            style={[styles.confirmButton, { backgroundColor: theme.buttonColor }]}
            onPress={handleConfirm}
            disabled={amount.trim() === ''}
          >
            <Text style={[styles.confirmButtonText, { color: '#ffffff' }]}>
              {activeTab === 'deposit' ? 'Déposer' : 'Retirer'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: screenHeight * 0.1,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {},
  pressedTab: {
    opacity: 0.6,
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
  },
  formContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  confirmButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TabPage;