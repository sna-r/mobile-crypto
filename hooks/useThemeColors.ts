import { Colors } from "@/constants/color";
import { useColorScheme } from "react-native";

export function useThemeColors(){
    const theme = useColorScheme() ?? "light"; // light or dark
    return Colors[theme];
}