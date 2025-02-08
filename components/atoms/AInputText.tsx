import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

interface AInputTextProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const AInputText: React.FC<AInputTextProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}) => {
  const colors = useThemeColors(); // Gestion des couleurs dynamiques

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: colors.grayDark }]}>{label}</Text>}
      <TextInput
        style={[styles.input, { backgroundColor: colors.grayWhite, borderColor: colors.grayLight, color: colors.grayDark }]}
        placeholder={placeholder}
        placeholderTextColor={colors.grayMedium}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "80%",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});

export default AInputText;
