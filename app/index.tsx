// app/index.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import AInputText from "@/components/atoms/AInputText";
import AInputPassword from "@/components/atoms/AInputPassword";
import AIButton from "@/components/atoms/AIButton";
import { auth, googleProvider } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Email/Password Login
  const handleEmailPasswordLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Logged in successfully!");
      router.replace("/(tabs)/profile");
    } catch (error: any) {
      let errorMessage = "An unknown error occurred.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "The email address is invalid.";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "The password is incorrect.";
          break;
        default:
          errorMessage = error.message;
      }
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign-In
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      Alert.alert("Success", "Logged in with Google!");
      router.replace("/(tabs)/profile");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      {/* Email Input */}
      <AInputText
        label="Email"
        placeholder="Entrez votre email"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <AInputPassword
        label="Mot de passe"
        placeholder="Entrez votre mot de passe"
        value={password}
        onChangeText={setPassword}
      />

      {/* Email/Password Login Button */}
      <AIButton
        title="Se connecter avec Email"
        onPress={handleEmailPasswordLogin}
        loading={loading}
      />

      {/* Google Login Button */}
      <AIButton
        title="Se connecter avec Google"
        onPress={handleGoogleLogin}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});