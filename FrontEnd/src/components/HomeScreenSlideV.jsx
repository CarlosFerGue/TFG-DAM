import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

export default HomeScreenSlideV = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image
        source={item.img}
        style={[StyleSheet.absoluteFill, styles.image]}
        resizeMode="contain"
      />
      <View style={styles.textoInferior}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 350,
    height: 200,
    borderRadius: 20,
    marginVertical: 10,
  },
  textoInferior: {
    backgroundColor: "rgba(98, 0, 238, 1)",
    width: "100%",
    borderBottomEndRadius: 23,
    borderBottomStartRadius: 23,
    paddingHorizontal: 16,
    top: 71,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",

    color: "#fff",
  },
  description: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius: 35,
  },
});
