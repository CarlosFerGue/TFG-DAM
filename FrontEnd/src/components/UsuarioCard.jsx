import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

// Importa la imagen predeterminada localmente
const defaultImage = require('../../assets/pfp.png');

const UsuarioCard = ({ item }) => {
  return (
    <View style={styles.UserContainer}>
      <Image 
        source={item.img_url ? { uri: item.img_url } : defaultImage}
        style={styles.imagen} 
      />
      <Text style={styles.nombreTexto}>
        {item.nombre_com} {item.nombre} {item.apel1} {item.apel2}{" "}
      </Text>
      <Text style={styles.usuarioTexto}>@{item.usuario}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  UserContainer: {
    padding: 15,
    top: 5,
    marginRight: 10,
    marginVertical: 5,
  },
  imagen: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    left: 10,
    top: 10,
  },
  nombreTexto: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 65,
    fontSize: 20,
  },
  usuarioTexto: {
    color: "white",
    marginLeft: 75,
  },
});

export default UsuarioCard;
