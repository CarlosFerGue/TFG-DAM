import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UsuariosTarjeta = ({ item }) => {
  return (
    <View style={styles.UserContainer}>
      <Text style={styles.usuarioTexto}>{item.nombre}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  UserContainer: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 17,
    marginRight: 10,
  },
  usuarioTexto: {
    color: "white",
  },
});

export default UsuariosTarjeta;
