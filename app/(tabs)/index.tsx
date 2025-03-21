import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  Pressable,
  FlatList,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { updateMethCount, getMethCount } from "./sharedValues";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function HomeScreen() {
  const [meth, setMeth] = useState();
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const [methCount, setMethCount] = useState(getMethCount());

    useFocusEffect(() => {
      setMethCount(getMethCount());
    });

  const Add = () => {
    if (hoveredItemId !== null) {
      const updatedList = methCount.map(
        (item, index) => (index === hoveredItemId - 1 ? item + 1 : item)
      );

      setMethCount(updatedList);
      updateMethCount(updatedList);
    }
  };

  useEffect(() => {
    const data = require("@/assets/data/products.json");
    setMeth(data.product);
  }, []);

  type ImageMap = {
    [key: string]: any;
  };

  const imageMap: ImageMap = {
    meth2upscale: require("@/assets/images/meth2upscale.png"),
    meth1upscale: require("@/assets/images/meth1upscale.png"),
    meth3upscale: require("@/assets/images/meth3upscale.png"),
    meth4upscale: require("@/assets/images/meth4upscale.png"),
    meth5upscale: require("@/assets/images/meth5upscale.png"),
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/meth1upscale.png")}
          style={styles.reactLogo}
        />
      }
    >
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Crystalized</Text>
      </View>

      <View style={styles.container}>
        <FlatList
          style={""}
          numColumns={2}
          data={meth}
          renderItem={({ item }) => (
            <Pressable
              onHoverIn={() => setHoveredItemId(item.id)}
              onHoverOut={() => setHoveredItemId(null)}
              style={styles.boxes}
            >
              <ImageBackground
                style={styles.backgroudImages}
                source={imageMap[item.image.split(".")[0]]}
              >
                <Text style={styles.mediumText}>{`${item.name}`}</Text>
                <Text style={styles.mediumText}>{`${item.price}kč/g`}</Text>
                {hoveredItemId === item.id && (
                  <Pressable
                    onHoverIn={() => setHoveredItemId(item.id)}
                    onContextMenu={(e) => e.preventDefault()}
                    delayLongPress={200}
                    
                    onPress={() => Add()}
                    style={styles.cartbutton}
                  >
                    <Text style={styles.mediumText} selectable={false}>Add</Text>
                  </Pressable>
                )}
              </ImageBackground>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    margin: "auto",
  },
  boxes: {
    width: Dimensions.get("window").width / 2 - 20,
    height: 300,
    backgroundColor: "grey",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    margin: 10,
  },
  cartbutton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  mediumText: {
    fontSize: 20,
    textAlign: "center",
    color: "black",
  },
  container: {
    alignItems: "center",
  },
  titleText: {
    fontSize: 40,
  },
  backgroudImages: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
    resizeMode: "cover",
  },
});
