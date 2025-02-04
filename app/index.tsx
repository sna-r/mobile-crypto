import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { ThemedText } from "@/components/ThemedText";
import { getPokemonId } from "@/functions/pokemon";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const color = useThemeColors();
  const {data, isFetching} = useFetchQuery("/pokemon?limit=21");
  const pokemons = data?.results ?? [];
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: color.tint}]}>
      <View style={styles.header}>
        <Image source={require("@/assets/images/pokeball.png")} width={24} height={24}/>
        <ThemedText variant="headLine" color="grayWhite">Pokedex</ThemedText>
      </View>
      <Card style={styles.body}>
        <FlatList 
          data={pokemons}
          columnWrapperStyle={[styles.gridGap, styles.list]} // style au niveau du colonne
          contentContainerStyle={styles.gridGap} // style au verticale
          numColumns={3}
          ListFooterComponent={
            isFetching ? <ActivityIndicator size="large" color={color.tint}/> : null
          }
          renderItem={({item}) => <PokemonCard id={getPokemonId(item.url)} name={item.name} style={{flex: 1/3}}/>} 
          keyExtractor={(item) => item.url}
        />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4
  }, 
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 12
  },
  body: {
    flex: 1
  },
  gridGap: {
    gap: 8
  },
  list: {
    padding: 12
  }
})