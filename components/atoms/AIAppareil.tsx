import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const AIAppareil = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    "https://source.unsplash.com/random/300x300" // 📌 Image par défaut
  );

  // 📸 Prendre un selfie avec la caméra
  const takeSelfie = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission refusée", "Autorisez l'accès à la caméra pour prendre un selfie.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // 🖼 Sélectionner une image depuis la galerie
  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: selectedImage }} style={styles.image} />
      </View>

      {/* 🖱️ Boutons d'action */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takeSelfie}>
          <Text style={styles.buttonText}>📷 Prendre un Selfie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickImageFromGallery}>
          <Text style={styles.buttonText}>🖼 Choisir une Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ✅ **Styles améliorés**
const styles = StyleSheet.create({
  container: {
    color:'white',
    display: "flex",
    justifyContent:'center',
    alignItems: "center",
    padding: 20,
  },
  imageWrapper: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 4,
    borderColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5, // 🌟 Ombre pour un effet 3D
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 90,
  },
  buttonContainer: {
    display:'flex',
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#A7B723",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    color:'#DC0A2D'
  },
  buttonText: {
    color: "#E0E0E0",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AIAppareil;
