import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, useColorScheme } from 'react-native';

const TabPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');
  const colorScheme = useColorScheme(); // Detect system theme (dark or light)

  // Handle deposit or withdraw confirmation
  const handleConfirm = () => {
    if (amount.trim() === '') {
      alert('Please enter an amount.');
      return;
    }
    alert(`You have ${activeTab}ed $${amount}`);
    setAmount(''); // Clear the input after confirmation
  };

  // Determine colors based on the system theme
  
  const isDarkMode = colorScheme === 'dark';//change to dark or light , still need a test on a device with dark or light mode
  const backgroundColor = isDarkMode ? '#1f2937' : '#ffffff';
  const textColor = isDarkMode ? '#e5e7eb' : '#1f2937';
  const borderColor = isDarkMode ? '#374151' : '#d1d5db';
  const buttonColor = isDarkMode ? '#3b82f6' : '#007bff';
  const placeholderTextColor = isDarkMode ? '#a1a1aa' : '#6b7280';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.tabButton,
            activeTab === 'deposit' && styles.activeTab,
            pressed && styles.pressedTab,
            { backgroundColor: activeTab === 'deposit' ? buttonColor : borderColor },
          ]}
          onPress={() => setActiveTab('deposit')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'deposit' ? '#ffffff' : textColor }]}>Dépôt</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.tabButton,
            activeTab === 'withdraw' && styles.activeTab,
            pressed && styles.pressedTab,
            { backgroundColor: activeTab === 'withdraw' ? buttonColor : borderColor },
          ]}
          onPress={() => setActiveTab('withdraw')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'withdraw' ? '#ffffff' : textColor }]}>Retrait</Text>
        </Pressable>
      </View>

      {/* Content Based on Active Tab */}
      <View style={[styles.contentContainer, { backgroundColor: isDarkMode ? '#1f2937' : '#ffffff', borderColor }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]}>
            {activeTab === 'deposit' ? 'Dépôt' : 'Retrait'}
          </Text>
          <Text style={[styles.subtitle, { color: placeholderTextColor }]}>
            {activeTab === 'deposit'
              ? 'Ajouter des fonds à votre compte'
              : 'Retirer des fonds de votre compte'}
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={[styles.label, { color: textColor }]}>Montant</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: isDarkMode ? '#374151' : '#d1d5db', backgroundColor: isDarkMode ? '#374151' : '#ffffff' },
            ]}
            placeholder="Entrer le montant"
            placeholderTextColor={placeholderTextColor}
            inputMode="decimal"
            value={amount}
            onChangeText={setAmount}
          />
          <Pressable
            style={[styles.confirmButton, { backgroundColor: buttonColor }]}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
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