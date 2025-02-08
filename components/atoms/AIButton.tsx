import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

interface AIButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const AIButton: React.FC<AIButtonProps> = ({ title, onPress, disabled = false, loading = false }) => {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? colors.grayLight : colors.tint },
        disabled && styles.disabled,
      ]}
      onPress={!disabled && !loading ? onPress : undefined}
      activeOpacity={0.7}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={colors.grayWhite} />
      ) : (
        <Text style={[styles.buttonText, { color: colors.grayWhite }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    width: "50%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  disabled: {
    opacity: 0.6,
  },
});

export default AIButton;
