// components/Notification.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error'; // Optional type for styling
  onClose: () => void; // Callback to hide the notification
}

const Notification: React.FC<NotificationProps> = ({ message, type = 'success', onClose }) => {
  const [fadeAnim] = useState(new Animated.Value(1)); // Initial opacity

  useEffect(() => {
    // Fade out the notification after 3 seconds
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => onClose());
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [fadeAnim, onClose]);

  const backgroundColor = type === 'success' ? '#4caf50' : '#f44336'; // Green for success, red for error

  return (
    <Animated.View style={[styles.container, { backgroundColor, opacity: fadeAnim }]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    zIndex: 9999, // Ensure it appears above other content
  },
  message: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Notification;