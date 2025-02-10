import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  useColorScheme,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '@/config/firebaseConfig';
import { router } from 'expo-router';
import { UserContext } from '@/app/_layout';

export default function Profile() {
  const user = useContext(UserContext);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Définition des couleurs selon le thème
  const backgroundColor = isDarkMode ? '#1f2937' : '#ffffff';
  const primaryTextColor = isDarkMode ? '#e5e7eb' : '#1f2937';
  const secondaryTextColor = isDarkMode ? '#a1a1aa' : '#6b7280';
  const cardBackgroundColor = isDarkMode ? '#25292e' : '#f9fafb';
  const accentColor = isDarkMode ? '#ffd33d' : '#007bff';

  // Si l'utilisateur n'a pas d'URL de photo, on génère une image de robot via RoboHash
  const defaultProfilePicture = `https://robohash.org/${user?.email || 'default'}?set=set1`;

  // On initialise la photo de profil avec l'URL stockée dans le user ou la valeur par défaut
  const [profilePicture, setProfilePicture] = React.useState<string | null>(
    user && (user as any).profilePictureUrl ? (user as any).profilePictureUrl : defaultProfilePicture
  );

  // Fonction pour choisir une image depuis la galerie
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setProfilePicture(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  // Fonction pour prendre une photo avec la caméra
  const takePhoto = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setProfilePicture(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  // Fonction pour proposer le choix de modifier la photo de profil
  const changeProfilePicture = () => {
    Alert.alert('Change Profile Picture', 'Choose an option:', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Take Photo', onPress: takePhoto },
      { text: 'Choose from Gallery', onPress: pickImage },
    ]);
  };

  // Fonction de déconnexion
  const handleLogout = async () => {
    try {
      await auth.signOut();
      Alert.alert('Success', 'You have been logged out.');
      router.replace("/");
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'Failed to log out.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Section Photo de Profil */}
      <View style={styles.profilePictureContainer}>
        <TouchableOpacity onPress={changeProfilePicture} activeOpacity={0.8}>
          <Image
            source={{ uri: profilePicture || defaultProfilePicture }}
            style={styles.profilePicture}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Ionicons
          name="pencil-outline"
          size={20}
          color={accentColor}
          style={styles.editIcon}
          onPress={changeProfilePicture}
        />
        <Text style={[styles.profileName, { color: primaryTextColor }]}>
          {user?.name || 'No Name'}
        </Text>
      </View>

      {/* Section Information de l'Utilisateur */}
      <View style={[styles.userInfoContainer, { backgroundColor: cardBackgroundColor }]}>
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={20} color={accentColor} />
          <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Email</Text>
          <Text style={[styles.infoValue, { color: primaryTextColor }]}>{user?.email}</Text>
        </View>
      </View>

      {/* Bouton de déconnexion */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    marginTop: screenHeight * 0.1,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#fff',
    borderWidth: 2,
    marginBottom: 10,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 5,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfoContainer: {
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoLabel: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
