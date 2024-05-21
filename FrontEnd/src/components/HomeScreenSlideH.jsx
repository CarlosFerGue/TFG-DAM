import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

export default HomeScreenSlideH = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image
        source={item.img}
        style={[StyleSheet.absoluteFill, styles.image]}
        resizeMode="contain"
      />
      <View style={styles.cantidadGente}>
        <View style={styles.puntoRojo} />
        <Text style={styles.participantes}>{item.participantes}</Text>
      </View>

      <View style={styles.textoInferior}>
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.date}>{item.fecha}</Text>
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
  cantidadGente: {
    backgroundColor: "blue",
    paddingHorizontal: 7,
    borderRadius: 23,
    position: "absolute",
    flexDirection: "row",
    left: 5,
    top: 5
  },
  puntoRojo: {
    width: 10,
    height: 10,
    backgroundColor: "red",
    position: "relative",
    alignSelf: "center",
    borderRadius: 50,
  },
  participantes: {
    fontSize: 16,
    color: "#fff",
        marginLeft: 5,
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
