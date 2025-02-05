import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const TabPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');

  // Handle deposit or withdraw confirmation
  const handleConfirm = () => {
    if (amount.trim() === '') {
      alert('Please enter an amount.');
      return;
    }
    alert(`You have ${activeTab}ed $${amount}`);
    setAmount(''); // Clear the input after confirmation
  };

  return (
    <View style={styles.container}>
      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.tabButton,
            activeTab === 'deposit' && styles.activeTab,
            pressed && styles.pressedTab,
          ]}
          onPress={() => setActiveTab('deposit')}
        >
          <Text style={styles.tabText}>Deposit</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.tabButton,
            activeTab === 'withdraw' && styles.activeTab,
            pressed && styles.pressedTab,
          ]}
          onPress={() => setActiveTab('withdraw')}
        >
          <Text style={styles.tabText}>Withdraw</Text>
        </Pressable>
      </View>

      {/* Content Based on Active Tab */}
      <View style={styles.contentContainer}>
        <Text style={styles.label}>
          {activeTab === 'deposit' ? 'Enter the amount to deposit:' : 'Enter the amount to withdraw:'}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          inputMode="decimal" // Use inputMode instead of keyboardType
          value={amount}
          onChangeText={setAmount}
        />
        <Pressable
          style={[styles.confirmButton, amount.trim() === '' && styles.disabledButton]}
          onPress={handleConfirm}
          disabled={amount.trim() === ''} // Use disabled prop directly on Pressable
        >
          <Text style={styles.confirmButtonText}>
            {activeTab === 'deposit' ? 'Deposit' : 'Withdraw'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  pressedTab: {
    opacity: 0.6, // Visual feedback for press state
  },
  tabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc', // Gray out when disabled
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TabPage;