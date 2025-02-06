import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, useColorScheme , Dimensions} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

// Sample static data for the user's profile
const initialUserProfile = {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 123-456-7890',
    bio: 'Blockchain enthusiast and crypto trader. Passionate about decentralized technologies.',
    profilePictureUrl: 'https://randomuser.me/api/portraits/women/8.jpg', // Replace with your server URL
  };

export default function Profile(){
    const colorScheme = useColorScheme(); // Detect system theme (dark or light)
  const isDarkMode = colorScheme === 'dark';

  // Define colors based on the system theme
  const backgroundColor = isDarkMode ? '#1f2937' : '#ffffff';
  const primaryTextColor = isDarkMode ? '#e5e7eb' : '#1f2937';
  const secondaryTextColor = isDarkMode ? '#a1a1aa' : '#6b7280';
  const cardBackgroundColor = isDarkMode ? '#25292e' : '#f9fafb';
  const accentColor = isDarkMode ? '#ffd33d' : '#007bff';

  // State to store the user's profile picture
  const [profilePicture, setProfilePicture] = useState<string | null>(initialUserProfile.profilePictureUrl);

  // Function to pick an image from the gallery
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

  // Function to take a picture using the camera
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

  // Function to show the options for changing the profile picture
  const changeProfilePicture = () => {
    Alert.alert('Change Profile Picture', 'Choose an option:', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Take Photo', onPress: takePhoto },
      { text: 'Choose from Gallery', onPress: pickImage },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Profile Picture Section */}
      <View style={styles.profilePictureContainer}>
        {/* Profile Picture */}
        <TouchableOpacity onPress={changeProfilePicture} activeOpacity={0.8}>
          <Image
            source={{ uri: profilePicture || initialUserProfile.profilePictureUrl }}
            style={styles.profilePicture}
            resizeMode="cover"
          />
        </TouchableOpacity>
        {/* Edit Icon */}
        <Ionicons
          name="pencil-outline"
          size={20}
          color={accentColor}
          style={styles.editIcon}
          onPress={changeProfilePicture}
        />
        {/* User Name */}
        <Text style={[styles.profileName, { color: primaryTextColor }]}>{initialUserProfile.name}</Text>
      </View>

      {/* User Information Section */}
      <View style={[styles.userInfoContainer, { backgroundColor: cardBackgroundColor }]}>
        {/* Email */}
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={20} color={accentColor} />
          <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Email</Text>
          <Text style={[styles.infoValue, { color: primaryTextColor }]}>{initialUserProfile.email}</Text>
        </View>

        {/* Phone */}
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={20} color={accentColor} />
          <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Phone</Text>
          <Text style={[styles.infoValue, { color: primaryTextColor }]}>{initialUserProfile.phone}</Text>
        </View>

        {/* Bio */}
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={20} color={accentColor} />
          <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Bio</Text>
          <Text style={[styles.infoValue, { color: primaryTextColor }]}>{initialUserProfile.bio}</Text>
        </View>
      </View>
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
  });