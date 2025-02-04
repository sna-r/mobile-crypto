import { Shadows } from "@/constants/shadows"
import { useThemeColors } from "@/hooks/useThemeColors"
import { View, ViewProps, ViewStyle } from "react-native"

type Props = ViewProps

export const Card = ({style, ...rest}: Props) => {
    const color = useThemeColors();
    return <View style={[style, styles, {backgroundColor: color.grayWhite}]} {...rest}/>
}

const styles = {
    borderRadius: 8,
    ...Shadows.dp2
} satisfies ViewStyle