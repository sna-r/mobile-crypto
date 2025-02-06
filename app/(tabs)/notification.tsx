import React from 'react';
import { View, Text, StyleSheet, FlatList, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Sample static data for notifications
const notificationData = [
    {
      id: '1',
      title: 'Transaction Successful',
      message: 'Your deposit of $500 has been successfully processed.',
      time: '2 minutes ago',
      type: 'success', // success, warning, info
    },
    {
      id: '2',
      title: 'Account Alert',
      message: 'Your account will expire in 7 days. Please renew your subscription.',
      time: '1 hour ago',
      type: 'warning',
    },
    {
      id: '3',
      title: 'New Feature Available',
      message: 'We have added a new feature to help you manage your crypto portfolio better.',
      time: 'Yesterday',
      type: 'info',
    },
  ];

export default function Notification(){
    const colorScheme = useColorScheme(); // Detect system theme (dark or light)
    const isDarkMode = colorScheme === 'dark';

  // Define colors based on the system theme
    const backgroundColor = isDarkMode ? '#1f2937' : '#ffffff';
    const primaryTextColor = isDarkMode ? '#e5e7eb' : '#1f2937';
    const secondaryTextColor = isDarkMode ? '#a1a1aa' : '#6b7280';
    const cardBackgroundColor = isDarkMode ? '#25292e' : '#f9fafb';
    const successColor = isDarkMode ? '#22c55e' : '#10b981';
    const warningColor = isDarkMode ? '#facc15' : '#f59e0b';
    const infoColor = isDarkMode ? '#3b82f6' : '#007bff';
    return (
        <View style={[styles.container, { backgroundColor }]}>
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <Text style={[styles.headerTitle, { color: primaryTextColor }]}>Notifications</Text>
          </View>
    
          {/* Notification List Section */}
          <FlatList
            data={notificationData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.notificationItem, { backgroundColor: cardBackgroundColor }]}>
                {/* Icon based on notification type */}
                <Ionicons
                  name={
                    item.type === 'success'
                      ? 'checkmark-circle-outline'
                      : item.type === 'warning'
                      ? 'alert-circle-outline'
                      : 'information-circle-outline'
                  }
                  size={24}
                  color={item.type === 'success' ? successColor : item.type === 'warning' ? warningColor : infoColor}
                  style={styles.notificationIcon}
                />
    
                {/* Notification Details */}
                <View style={styles.notificationDetails}>
                  <Text style={[styles.notificationTitle, { color: primaryTextColor }]}>{item.title}</Text>
                  <Text style={[styles.notificationMessage, { color: secondaryTextColor }]} numberOfLines={2}>
                    {item.message}
                  </Text>
                </View>
    
                {/* Time Stamp */}
                <Text style={[styles.notificationTime, { color: secondaryTextColor }]}>{item.time}</Text>
              </View>
            )}
          />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    headerContainer: {
      marginBottom: 20,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    notificationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
    },
    notificationIcon: {
      marginRight: 10,
    },
    notificationDetails: {
      flex: 1,
    },
    notificationTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    notificationMessage: {
      fontSize: 14,
    },
    notificationTime: {
      fontSize: 12,
      alignSelf: 'flex-end',
    },
  });