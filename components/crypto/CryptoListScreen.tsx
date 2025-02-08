// components/CryptoListScreen.tsx
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const CryptoListScreen = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        );
        setCryptos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCryptos();
  }, []);

  const renderItem = ({ item }: { item: Crypto }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => router.push(`/crypto/${item.id}`)} // Navigate to the detail screen
    >
      <View style={styles.row}>
        <Text style={styles.name}>{item.name} ({item.symbol.toUpperCase()})</Text>
        <Text style={styles.price}>${item.current_price.toFixed(2)}</Text>
      </View>
      <Text style={[styles.variation, item.price_change_percentage_24h > 0 ? styles.up : styles.down]}>
        {item.price_change_percentage_24h.toFixed(2)}%
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cryptos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent} // Center the list items
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark mode background
    alignItems: 'center', // Center the content horizontally
  },
  listContent: {
    flexGrow: 1,
    justifyContent: 'center', // Center items vertically if there's extra space
    padding: 16,
  },
  item: {
    flexDirection: 'column', // Stack elements vertically
    justifyContent: 'center',
    alignItems: 'center', // Center elements horizontally
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#1E1E1E', // Dark mode card background
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    width: '100%', // Ensure cards take up the full width
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Ensure rows span the full width of the card
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff', // White text for dark mode
    flex: 1, // Allow name to take up available space
  },
  price: {
    fontSize: 16,
    color: '#ffffff', // White text for dark mode
    marginLeft: 8, // Add spacing between name and price
  },
  variation: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end', // Align variation to the right
  },
  up: {
    color: '#00ff00', // Green for positive change
  },
  down: {
    color: '#ff0000', // Red for negative change
  },
});

export default CryptoListScreen;