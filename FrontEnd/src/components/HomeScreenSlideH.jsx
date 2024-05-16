import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

export default HomeScreenSlideH = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image
        source={item.img}
        style={[StyleSheet.absoluteFill, styles.image]}
        resizeMode="contain"
      />
      <View style={styles.textoInferior}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 215,
    borderRadius: 20,
    marginHorizontal: 5,
    overflow: "hidden",
    height: 130,
  },
  textoInferior: {
    backgroundColor: "rgba(98, 0, 238, 1)", // Fondo transparente
    width: "100%",
    borderBottomEndRadius: 23,
    borderBottomStartRadius: 23,
    paddingHorizontal: 16,
    position: "relative",
    bottom: -45,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  date: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
    marginLeft: 5,
  },
  image: {
    flex: 1,
    left: "-26%", 
  },
});
