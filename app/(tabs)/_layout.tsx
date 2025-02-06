import { Ionicons , MaterialIcons} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useState } from "react";
import { Image } from "react-native";
import React from "react";

export default function RootLayout() {
  return (
    <Tabs 
        screenOptions={{
            tabBarActiveTintColor: '#ffd33d',
            headerStyle: {
            backgroundColor: '#25292e',
            },
            headerShadowVisible: false,
            headerTintColor: '#fff',
            tabBarStyle: {
            backgroundColor: '#25292e',
            },
            headerShown: false,
        }}
    >
      <Tabs.Screen name="index" options={{ title: 'Crypto',
        tabBarIcon: ({ color, focused}) => (
            <Ionicons name={focused ? 'logo-bitcoin' : 'logo-bitcoin'} color={color} size={24} />
        ),
       }} />
      <Tabs.Screen name="fund" options={{ title: 'Demande' ,
        tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name={focused ? 'import-export' : 'import-export'} color={color} size={24}/>
        ),
    }} />
        <Tabs.Screen name="wallet" options={{ title: 'Portefeuille' ,
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'wallet' : 'wallet-outline'} color={color} size={24}/>
            ),
        }} />
    <Tabs.Screen name="notification" options={{ title: 'Notifications' ,
      tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'notifications-circle' : 'notifications-circle-outline'} color={color} size={24}/>
      ),
    }} />
      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <ProfileTabIcon color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
    
  );
}


// Custom Icon Component for the Profile Tab
function ProfileTabIcon({ color, focused }: { color: string; focused: boolean }) {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  // Simulate fetching a profile picture from a server
  React.useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const serverUrl = "https://picsum.photos/200"; // Replace with your server URL
        const response = await fetch(serverUrl);
        if (response.ok) {
          setProfilePicture(serverUrl); // Set the profile picture URL
        } else {
          setProfilePicture(null); // Fallback to default icon
        }
      } catch (error) {
        console.error("Failed to load profile picture:", error);
        setProfilePicture(null); // Fallback to default icon
      }
    };

    fetchProfilePicture();
  }, []);

  if (profilePicture) {
    return (
      <Image
        source={{ uri: profilePicture }}
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          borderColor: focused ? color : "#ccc",
          borderWidth: 2,
        }}
      />
    );
  }

  return (
    <Ionicons
      name="person-circle-outline"
      color={color}
      size={24}
      style={{ marginBottom: -3 }} // Align icon vertically
    />
  );
}