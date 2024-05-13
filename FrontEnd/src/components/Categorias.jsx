import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CategoriasTarjeta = ({ categoria }) => {
  return (
    <View style={styles.categoriaContainer}>
      <Text style={styles.categoriaText}>{categoria.categoria}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoriaContainer: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 17,
    marginRight: 10,
  },
  categoriaText: {
    color: "white",
  },
});

export default CategoriasTarjeta;
