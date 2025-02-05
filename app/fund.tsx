import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

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
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'deposit' && styles.activeTab]}
          onPress={() => setActiveTab('deposit')}
        >
          <Text style={styles.tabText}>Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'withdraw' && styles.activeTab]}
          onPress={() => setActiveTab('withdraw')}
        >
          <Text style={styles.tabText}>Withdraw</Text>
        </TouchableOpacity>
      </View>

      {/* Content Based on Active Tab */}
      <View style={styles.contentContainer}>
        <Text style={styles.label}>
          {activeTab === 'deposit' ? 'Enter the amount to deposit:' : 'Enter the amount to withdraw:'}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <Button
          title={activeTab === 'deposit' ? 'Deposit' : 'Withdraw'}
          onPress={handleConfirm}
          disabled={amount.trim() === ''}
        />
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
    textAlign: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabText: {
    textAlign: 'center',
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
});

export default TabPage;