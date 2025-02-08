// app/(tabs)/crypto/[cryptoId].tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';

interface CryptoDetail {
  name: string;
  symbol: string;
  market_data: {
    current_price: { usd: number };
    price_change_percentage_24h: number;
  };
}

interface HistoricalData {
  prices: [number, number][];
}

const CryptoDetailScreen = () => {
  const { cryptoId } = useLocalSearchParams<{ cryptoId: string }>();
  const [cryptoDetail, setCryptoDetail] = useState<CryptoDetail | null>(null);
  const [historicalData, setHistoricalData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    const theme= useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch crypto details
        const detailResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${cryptoId}?tickers=false&market_data=true&community_data=false&developer_data=false`
        );

        if (!detailResponse.data || !detailResponse.data.market_data) {
          throw new Error('Invalid API response for crypto details');
        }

        setCryptoDetail(detailResponse.data);

        // Fetch historical price data
        const historyResponse = await axios.get<HistoricalData>(
          `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=7&interval=daily`
        );

        if (!historyResponse.data || !historyResponse.data.prices) {
          throw new Error('Invalid API response for historical data');
        }

        // Extract prices from the historical data
        const prices = historyResponse.data.prices.map((price) => price[1]);
        setHistoricalData(prices);
      } catch (err: any) {
        console.error('Error fetching crypto data:', err.message);
        setError('Failed to load crypto details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cryptoId]);

  if (loading) {
    return (
      <View style={[styles.loadingContainer,{backgroundColor: theme.backgroundColor}]}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading crypto details...</Text>
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

  if (!cryptoDetail) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No crypto details available.</Text>
      </View>
    );
  }

  // Generate labels for every 7th data point (one label per week)
  const labels = Array.from({ length: historicalData.length }, (_, i) =>
    i % 7 === 0 ? new Date(historicalData[i]).toLocaleDateString() : ''
  );

  return (
    <View style={[styles.container,{backgroundColor: theme.backgroundColor}]}>
      <Text style={styles.title}>{cryptoDetail.name} ({cryptoDetail.symbol.toUpperCase()})</Text>
      <Text style={styles.price}>Price: ${cryptoDetail.market_data.current_price.usd.toFixed(2)}</Text>
      <Text
        style={[
          styles.variation,
          cryptoDetail.market_data.price_change_percentage_24h > 0 ? styles.up : styles.down,
        ]}
      >
        24h Change: {cryptoDetail.market_data.price_change_percentage_24h.toFixed(2)}%
      </Text>

      <Text style={styles.chartTitle}>7-Day Price History</Text>
      {historicalData.length > 0 ? (
        <LineChart
          data={{
            labels: labels,
            datasets: [{ data: historicalData }],
          }}
          width={350}
          height={220}
          chartConfig={{
            backgroundColor: '#1E1E1E', // Dark background
            backgroundGradientFrom: '#1E1E1E',
            backgroundGradientTo: '#1E1E1E',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Blue line color
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White labels
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      ) : (
        <Text style={styles.errorText}>No historical price data available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212', // Dark mode background
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#ffffff', // White text for dark mode
  },
  price: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 8,
  },
  variation: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  up: {
    color: '#00ff00', // Green for positive change
  },
  down: {
    color: '#ff0000', // Red for negative change
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