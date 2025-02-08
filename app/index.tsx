// app/index.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity } from "react-native";
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle Email/Password Login
  const handleEmailPasswordLogin = async () => {
    setLoading(true);
    setErrorMessage(null); // Clear previous errors
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
        case "auth/invalid-credential":
          errorMessage = "The password is incorrect.";
          break;
        case "auth/missing-password":
          errorMessage = "Mot de passe manquant";
          break;
        default:
          errorMessage = error.message;
      }
      setErrorMessage(errorMessage); // Display the error message
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign-In
  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage(null); // Clear previous errors
    try {
      await signInWithPopup(auth, googleProvider);
      Alert.alert("Success", "Logged in with Google!");
      router.replace("/(tabs)/profile");
    } catch (error: any) {
      setErrorMessage(error.message || "Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Error Message */}
      {errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      {/* Title */}
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
        title="Se connecter"
        onPress={handleEmailPasswordLogin}
        loading={loading}
      />

      {/* OR Separator */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>- OU -</Text>
        <View style={styles.line} />
      </View>

      {/* Google Login Button with Logo */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleLogin}
        disabled={loading}
      >
        <Image
          source={require("@/assets/images/google-icon.svg")}
          style={styles.googleLogo}
        />
        <Text style={styles.googleButtonText}>Se connecter avec Google</Text>
      </TouchableOpacity>
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
  errorText: {
    color: "#ff4d4d",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16, // Add space above and below the separator
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 8,
    fontSize: 14,
    color: "#666",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
    elevation: 2, // Add shadow for Android
    shadowColor: "#000", // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  googleLogo: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
});