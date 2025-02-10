// hooks/useTheme.js
import { useColorScheme } from "react-native";

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return {
    backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
    textColor: isDarkMode ? "#e5e7eb" : "#1f2937",
    borderColor: isDarkMode ? "#374151" : "#d1d5db",
    buttonColor: isDarkMode ? "#3b82f6" : "#007bff",
    placeholderTextColor: isDarkMode ? "#a1a1aa" : "#6b7280",
    isDarkMode,
  };
};