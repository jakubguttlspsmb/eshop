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
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function HomeScreen() {
  const { width, height } = Dimensions.get("window");
  const [meth, setMeth] = useState();

  const ToExersise = () => {};

  useEffect(() => {
    const data = require('@/assets/data/products.json'); 
    setMeth(data.product);
  }, []);

  type ImageMap = {
    [key: string]: any;
  };

  const imageMap: ImageMap = {
    meth2upscale: require("@/assets/images/meth2upscale.png"),
    meth1: require("@/assets/images/meth1.png"),
  };
  


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/meth2upscale.png")}
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
            <Pressable onPress={() => ToExersise()} style={styles.boxes}>
              <ImageBackground
                style={styles.backgroudImages}
                source={imageMap[item.image.split('.')[0]]}
              >
                <Text style={styles.mediumText}>{`${item.name}, @/assets/images/${item.image}`}</Text>
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
    width: 300,
    height: 300,
    backgroundColor: "grey",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    margin: 200,
  },
  mediumText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
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
