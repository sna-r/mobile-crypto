// app/_layout.tsx
import React, { createContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { auth, db } from "@/config/firebaseConfig";
import { View, Text } from "react-native";
import { User } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

export interface AppUser {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

export const UserContext = createContext<AppUser | null>(null);

const queryClient = new QueryClient();

export default function RootLayout() {
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour récupérer l'utilisateur Firestore à partir de son email
  const fetchAppUser = async (email: string) => {
    try {
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const userData = doc.data();
        const fetchedUser: AppUser = {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          roles: userData.roles
        };
        console.log("Utilisateur Firestore récupéré :", fetchedUser);
        setAppUser(fetchedUser);
      } else {
        setAppUser(null);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur Firestore :", error);
      setAppUser(null);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser: User | null) => {
      if (authUser) {
        if (authUser.email) {
          fetchAppUser(authUser.email);
        }
      } else {
        setAppUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    // Affiche un écran de chargement pendant la vérification de l'authentification
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <UserContext.Provider value={appUser}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          {appUser ? (
            // Si un utilisateur Firestore est trouvé, on affiche les onglets
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          ) : (
            // Sinon, on affiche la page de login
            <Stack.Screen name="index" options={{ headerShown: false }} />
          )}
        </Stack>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}
