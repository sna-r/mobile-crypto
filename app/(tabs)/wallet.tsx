import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, useColorScheme , Dimensions} from 'react-native';
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
        const colorScheme = useColorScheme(); // Detect system theme (dark or light)
        const isDarkMode = colorScheme === 'dark'; // afaka ovaina ho dark sy light koa

        // Define colors based on the system theme
        const backgroundColor = isDarkMode ? '#1f2937' : '#ffffff';
        const primaryTextColor = isDarkMode ? '#e5e7eb' : '#1f2937';
        const secondaryTextColor = isDarkMode ? '#a1a1aa' : '#6b7280';
        const accentColor = isDarkMode ? '#ffd33d' : '#007bff';
        const cardBackgroundColor = isDarkMode ? '#25292e' : '#f9fafb';
    return <View style={[styles.container, { backgroundColor }]}>
    {/* Main Balance Section */}
    <View style={styles.mainBalanceContainer}>
      <Text style={[styles.mainBalanceTitle, { color: primaryTextColor }]}>Votre solde</Text>
      <Text style={[styles.mainBalanceAmount, { color: accentColor }]}>$15,012.34</Text>
      <Text style={[styles.mainBalanceSubtitle, { color: secondaryTextColor }]}>Aujourd'hui</Text>
    </View>

    {/* Cryptocurrency Balances Section */}
    <View style={styles.cryptoBalancesContainer}>
      <Text style={[styles.sectionTitle, { color: primaryTextColor }]}>Cryptocurrency Balances</Text>
      <FlatList
        data={cryptoData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.cryptoItem, { backgroundColor: cardBackgroundColor }]}>
            {/* Crypto Icon (Remote URL) */}
            <Image
              source={{ uri: item.icon }}
              style={styles.cryptoIcon}
              resizeMode="contain"
            />
            {/* Crypto Details */}
            <View style={styles.cryptoDetails}>
              <Text style={[styles.cryptoName, { color: primaryTextColor }]}>
                {item.name} ({item.symbol})
              </Text>
              <Text style={[styles.cryptoBalance, { color: secondaryTextColor }]}>
                Balance: {item.balance.toFixed(2)} {item.symbol}
              </Text>
            </View>
            {/* Value in USD */}
            <Text style={[styles.cryptoValue, { color: accentColor }]}>${item.valueInDollars.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  </View>
}
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    mainBalanceContainer: {
      alignItems: 'center',
      marginBottom: 20,
      marginTop: screenHeight * 0.1,
    },
    mainBalanceTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    mainBalanceAmount: {
      fontSize: 36,
      fontWeight: 'bold',
    },
    mainBalanceSubtitle: {
      fontSize: 14,
    },
    cryptoBalancesContainer: {
      marginTop: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    cryptoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
    },
    cryptoIcon: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    cryptoDetails: {
      flex: 1,
    },
    cryptoName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    cryptoBalance: {
      fontSize: 14,
    },
    cryptoValue: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });