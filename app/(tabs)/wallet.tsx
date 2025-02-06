import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Sample static data for cryptocurrencies
const cryptoData = [
    {
      id: '1',
      name: 'Bitcoin',
      symbol: 'BTC',
      balance: 0.5,
      valueInDollars: 12345.67,
      icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022', // Remote URL for Bitcoin logo
    },
    {
      id: '2',
      name: 'Ethereum',
      symbol: 'ETH',
      balance: 3.2,
      valueInDollars: 2100.89,
      icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022', // Remote URL for Ethereum logo
    },
    {
      id: '3',
      name: 'Litecoin',
      symbol: 'LTC',
      balance: 12.45,
      valueInDollars: 345.67,
      icon: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png?v=022', // Remote URL for Litecoin logo
    },
    {
      id: '4',
      name: 'Solana',
      symbol: 'SOL',
      balance: 50.1,
      valueInDollars: 120.45,
      icon: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=022', // Remote URL for Solana logo
    },
  ];
export default function Wallet(){
    return <View style={styles.container}>
    {/* Main Balance Section */}
    <View style={styles.mainBalanceContainer}>
      <Text style={styles.mainBalanceTitle}>Your Total Balance</Text>
      <Text style={styles.mainBalanceAmount}>$15,012.34</Text>
      <Text style={styles.mainBalanceSubtitle}>As of today</Text>
    </View>

    {/* Cryptocurrency Balances Section */}
    <View style={styles.cryptoBalancesContainer}>
      <Text style={styles.sectionTitle}>Cryptocurrency Balances</Text>
      <FlatList
        data={cryptoData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cryptoItem}>
            {/* Crypto Icon */}
            <Image source={item.icon} style={styles.cryptoIcon} />
            {/* Crypto Details */}
            <View style={styles.cryptoDetails}>
              <Text style={styles.cryptoName}>{item.name} ({item.symbol})</Text>
              <Text style={styles.cryptoBalance}>
                Balance: {item.balance.toFixed(2)} {item.symbol}
              </Text>
            </View>
            {/* Value in USD */}
            <Text style={styles.cryptoValue}>${item.valueInDollars.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1f2937',
      padding: 20,
    },
    mainBalanceContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    mainBalanceTitle: {
      color: '#e5e7eb',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    mainBalanceAmount: {
      color: '#ffd33d',
      fontSize: 36,
      fontWeight: 'bold',
    },
    mainBalanceSubtitle: {
      color: '#a1a1aa',
      fontSize: 14,
    },
    cryptoBalancesContainer: {
      marginTop: 20,
    },
    sectionTitle: {
      color: '#e5e7eb',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    cryptoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderRadius: 8,
      backgroundColor: '#25292e',
      marginBottom: 10,
    },
    cryptoIcon: {
      width: 30,
      height: 30,
      marginRight: 10,
      resizeMode: 'contain',
    },
    cryptoDetails: {
      flex: 1,
    },
    cryptoName: {
      color: '#e5e7eb',
      fontSize: 16,
      fontWeight: 'bold',
    },
    cryptoBalance: {
      color: '#a1a1aa',
      fontSize: 14,
    },
    cryptoValue: {
      color: '#3b82f6',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });