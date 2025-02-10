// app/(tabs)/crypto.tsx
import { Stack } from 'expo-router';
import CryptoListScreen from '@/components/crypto/CryptoListScreen';
import { useTheme } from '@/hooks/useTheme';
import {SafeAreaView} from "react-native-safe-area-context";

const Crypto = () => {
    const theme = useTheme();
  return (
    <SafeAreaView>
      {/* Define the stack navigator */}
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Cryptocurrencies' }} />
        <Stack.Screen name="[cryptoId]" options={{ title: 'Crypto Details' }} />
      </Stack>

      {/* Render the CryptoListScreen */}
      <CryptoListScreen />
    </SafeAreaView>
  );
};

export default Crypto;