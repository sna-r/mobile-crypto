// app/(tabs)/crypto.tsx
import { Stack } from 'expo-router';
import CryptoListScreen from '@/components/crypto/CryptoListScreen';

const Crypto = () => {
  return (
    <>
      {/* Define the stack navigator */}
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Cryptocurrencies' }} />
        <Stack.Screen name="[cryptoId]" options={{ title: 'Crypto Details' }} />
      </Stack>

      {/* Render the CryptoListScreen */}
      <CryptoListScreen />
    </>
  );
};

export default Crypto;