import React from 'react';
import { View, Text, StyleSheet, Image, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const userProfile = {
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

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Profile Picture Section */}
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: userProfile.profilePictureUrl }}
          style={styles.profilePicture}
          resizeMode="cover"
        />
        <Text style={[styles.profileName, { color: primaryTextColor }]}>{userProfile.name}</Text>
      </View>

      {/* User Information Section */}
      <View style={[styles.userInfoContainer, { backgroundColor: cardBackgroundColor }]}>
        {/* Email */}
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={20} color={accentColor} />
          <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Email</Text>
          <Text style={[styles.infoValue, { color: primaryTextColor }]}>{userProfile.email}</Text>
        </View>

        {/* Phone */}
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={20} color={accentColor} />
          <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Phone</Text>
          <Text style={[styles.infoValue, { color: primaryTextColor }]}>{userProfile.phone}</Text>
        </View>

        {/* Bio */}
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={20} color={accentColor} />
          <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Bio</Text>
          <Text style={[styles.infoValue, { color: primaryTextColor }]}>{userProfile.bio}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    profilePictureContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    profilePicture: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderColor: '#fff',
      borderWidth: 2,
      marginBottom: 10,
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