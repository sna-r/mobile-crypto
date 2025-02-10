import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

interface PriceHistory {
  change: number;
  close: number;
  cryptoId: number;
  high: number;
  low: number;
  open: number;
  recordDate: string;
}

const CryptoDetailScreen = () => {
  const { cryptoId } = useLocalSearchParams<{ cryptoId: string }>();
  const [historicalData, setHistoricalData] = useState<PriceHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const fetchHistoricalData = async () => {
    try {
      // Convert cryptoId to a number:
      const numericCryptoId = Number(cryptoId);

      if (isNaN(numericCryptoId)) {
        throw new Error("Invalid cryptoId: Not a number");
      }

      const q = query(
        collection(db, 'priceHistory'),
        where('cryptoId', '==', numericCryptoId) // Use the numeric ID
      );

      const querySnapshot = await getDocs(q);
      const data: PriceHistory[] = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        cryptoId: doc.data().cryptoId, // Ensure cryptoId is a number when mapping
      } as PriceHistory));

      setHistoricalData(data);
    } catch (err: any) {
      console.error('Erreur lors de la récupération des données:', err.message);
      setError('Échec du chargement des données. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchHistoricalData();

    // Set up interval to refresh data every 60 seconds
    const intervalId = setInterval(() => {
      fetchHistoricalData();
    }, 60000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [cryptoId]);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.backgroundColor }]}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Chargement des données...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (historicalData.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Aucune donnée historique disponible.</Text>
      </View>
    );
  }

  const prices = historicalData.map(item => item.close);
  const labels = historicalData.map(item => new Date(item.recordDate).toLocaleDateString());

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={styles.chartTitle}>Historique des prix</Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [{ data: prices }],
        }}
        width={350}
        height={220}
        chartConfig={{
          backgroundColor: '#1E1E1E',
          backgroundGradientFrom: '#1E1E1E',
          backgroundGradientTo: '#1E1E1E',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 16 },
        }}
        bezier
        style={styles.chart}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingText: {
    color: '#ffffff',
    marginTop: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  errorText: {
    color: '#ff4d4d',
    textAlign: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#ffffff',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default CryptoDetailScreen;
