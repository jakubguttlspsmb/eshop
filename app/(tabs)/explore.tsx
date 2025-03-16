import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import { updateMethCount, getMethCount } from "./sharedValues";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useFocusEffect } from "@react-navigation/native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useState, useEffect } from "react";

export default function TabTwoScreen() {
  const [methCount, setMethCount] = useState(getMethCount());
  const [meth, setMeth] = useState([]);
  const [hoveredItemId, setHoveredItemId] = useState(null); 

  useFocusEffect(() => {
    setMethCount(getMethCount());
  });

  const Remove = (itemId) => {
    if (itemId !== null) {
      const updatedList = methCount.map((item, index) =>
        index === itemId - 1 ? item - 1 : item
      );

      setMethCount(updatedList);
      updateMethCount(updatedList);
    }
  };

  useEffect(() => {
    const data = require("@/assets/data/products.json");
    setMeth(data.product);
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <FlatList
        style={""}
        data={meth}
        numColumns={2}
        renderItem={({ item }) => (
          <View>
            {methCount[item.id - 1] !== 0 && (
              <View style={styles.boxes}>
                <View style={styles.boab}>
                  <Text style={styles.mediumText}>{item.name}</Text>
                  <Pressable
                    onPress={() => Remove(item.id)} 
                    onPressIn={() => setHoveredItemId(item.id)} 
                    onPressOut={() => setHoveredItemId(null)}
                  >
                    <Entypo name="squared-cross" size={24} color="black" />
                  </Pressable>
                </View>
                <Text style={styles.mediumText}>{methCount[item.id - 1]}g</Text>
                <Text style={styles.mediumText}>
                  {methCount[item.id - 1] * item.price}kč
                </Text>
              </View>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  boab: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    paddingHorizontal: 10,
  },
  boxes: {
    width: Dimensions.get("window").width / 2 - 20,
    height: 300,
    backgroundColor: "grey",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    margin: "auto",
    alignItems: "center",
  },
  mediumText: {
    fontSize: 20,
    textAlign: "center",
    color: "black",
    margin: "auto",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});