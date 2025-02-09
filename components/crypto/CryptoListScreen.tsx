import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { router } from "expo-router";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  imageUrl: string;
}

interface PriceHistory {
  cryptoId: string | number;
  close: number;
  change: number;
  recordDate: any;
}

interface LatestPrice {
  close: number;
  change: number;
  recordDate: any;
}

export default function CryptoListScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [prices, setPrices] = useState<Record<string, LatestPrice>>({});

  const backgroundColor = '#ffffff';
  const primaryTextColor = '#1f2937';
  const cardBackgroundColor = '#f9fafb';

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'cryptos'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Crypto[];
        setCryptos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCryptos();
  }, []);

  useEffect(() => {
    const fetchPrices = () => {
      const unsubscribe = onSnapshot(collection(db, 'priceHistory'), (snapshot) => {
        const latestPrices: Record<string, LatestPrice> = {};
        snapshot.forEach(doc => {
          const data = doc.data() as PriceHistory;
          const cryptoId = String(data.cryptoId);
          if (!latestPrices[cryptoId]) {
            latestPrices[cryptoId] = { close: data.close, change: data.change, recordDate: data.recordDate };
          } else {
            const currentTimestamp = latestPrices[cryptoId].recordDate.toMillis();
            const newTimestamp = data.recordDate.toMillis();
            if (newTimestamp > currentTimestamp) {
              latestPrices[cryptoId] = { close: data.close, change: data.change, recordDate: data.recordDate };
            }
          }
        });
        setPrices(latestPrices);
      }, error => {
        console.error('Erreur lors de l\'écoute de priceHistory:', error);
      });
      return () => unsubscribe();
    };

    fetchPrices(); // Fetch prices immediately on mount

    const intervalId = setInterval(fetchPrices, 60000); // Fetch prices every 60 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  const renderItem = ({ item }: { item: Crypto }) => (
    <TouchableOpacity
      onPress={() => router.push(`/crypto/${item.id}`)}
      style={[styles.cryptoItem, {
        backgroundColor: cardBackgroundColor,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        marginHorizontal: 20,
      }]}>
      <Image source={{ uri: item.imageUrl }} style={styles.cryptoIcon} resizeMode="contain" />
      <View style={styles.cryptoDetails}>
        <Text style={[styles.cryptoName, { color: primaryTextColor }]}>
          {item.name} ({item.symbol ? item.symbol.toUpperCase() : 'N/A'})
        </Text>
        <Text style={[styles.cryptoValue, { color: primaryTextColor }]}>
          {prices[item.id] ? `$${prices[item.id].close.toFixed(2)}` : 'Prix indisponible'}
        </Text>
      </View>
      {prices[item.id] && (
        <Text style={[
          styles.cryptoChange,
          { color: prices[item.id].change >= 0 ? 'green' : 'red' }
        ]}>
          {prices[item.id].change >= 0 ? '+' : ''}{prices[item.id].change.toFixed(2)}
        </Text>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={{ color: '#292929' }}>Chargement...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[{ backgroundColor }]}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: primaryTextColor, paddingLeft: 20 }}>
        Cryptos
      </Text>
      <FlatList
        style={{ paddingTop: 20 }}
        data={cryptos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 20,
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
  cryptoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cryptoChange: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
});