import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/hooks/useThemeColors";

interface AInputPasswordProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

const AInputPassword: React.FC<AInputPasswordProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
}) => {
  const [secureText, setSecureText] = useState(true);
  const colors = useThemeColors(); // Gestion des couleurs dynamiques

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: colors.grayDark }]}>{label}</Text>}
      <View style={[styles.inputContainer, { backgroundColor: colors.grayWhite, borderColor: colors.grayLight }]}>
        <TextInput
          style={[styles.input, { color: colors.grayDark }]}
          placeholder={placeholder}
          placeholderTextColor={colors.grayMedium}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureText}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.icon}>
          <Ionicons name={secureText ? "eye-off" : "eye"} size={22} color={colors.grayMedium} />
        </TouchableOpacity>
      </View>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    padding: 10,
  },
});

export default AInputPassword;
