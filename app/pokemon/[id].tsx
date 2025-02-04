import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function Pokemon(){
    let params = useLocalSearchParams();
    return <View>
        <Text> Pokemon id {params.id} </Text>
    </View>
}