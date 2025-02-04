import { Image, ViewStyle, StyleSheet, View } from "react-native"
import { Card } from "../Card"
import { ThemedText } from "../ThemedText"
import { useThemeColors } from "@/hooks/useThemeColors"

type Props = {
    style?: ViewStyle,
    id: number,
    name: string,
}

export const PokemonCard = ({ style, id, name }: Props) => {
    const colors = useThemeColors();
    return <Card style={[style, styles.card]}>
        <ThemedText style={styles.id}>#{id.toString().padStart(3, '0')}</ThemedText>
        <Image 
            source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}} 
            style={{width: 72, height: 72}}
        />
        <ThemedText>{name}</ThemedText>
        <View style={[styles.shadow, {backgroundColor: colors.grayBackground}]} />
    </Card>
}

const styles = StyleSheet.create({
    card: {
        padding: 4,
        alignItems: "center",
        position: "relative"
    },
    id: {
        alignSelf: "flex-end"
    },
    shadow: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 44,
        borderRadius: 8,
        zIndex: -1
    }
}) satisfies Record<string, ViewStyle>