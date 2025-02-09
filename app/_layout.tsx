// app/_layout.tsx
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { auth } from "@/config/firebaseConfig";
import { View, Text } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient();

export default function RootLayout() {
  const [user, setUser] = useState(null); // State to track the authenticated user
  const [isLoading, setIsLoading] = useState(true); // Loading state for auth check

  useEffect(() => {
    // Subscribe to the authentication state
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser); // User is logged in
      } else {
        setUser(null); // User is not logged in
      }
      setIsLoading(false); // Mark loading as complete
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  if (isLoading) {
    // Show a loading indicator while checking the authentication state
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Conditionally render screens based on authentication state */}
          {user ? (
            // If the user is logged in, show the tabs
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          ) : (
            // If the user is not logged in, show the login screen
            <Stack.Screen name="index" options={{ headerShown: false }} />
          )}
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}