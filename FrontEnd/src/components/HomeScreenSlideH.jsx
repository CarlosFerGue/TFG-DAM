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
        source={{
          uri: item.img_url,
        }}
        style={[StyleSheet.absoluteFill, styles.image]}
        resizeMode="cover"
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
    backgroundColor: "black",
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
    backgroundColor: "rgba(127, 0, 255, 1)", // Fondo transparente
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
    paddingTop: 2,
  },
  date: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 15,
    marginLeft: 5,
    bottom: 3,
  },
  image: {
    flex: 1,
    left: "-26%",
    ...StyleSheet.absoluteFillObject,
  },
});
