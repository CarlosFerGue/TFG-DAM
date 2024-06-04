import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CategoriasTarjeta = ({ categoria, seleccionada = false }) => {
  return (
    <View style={[styles.categoriaContainer, seleccionada && styles.categoriaSeleccionada]}>
      <Text style={[styles.categoriaText, seleccionada && styles.textoSeleccionado]}>
        {categoria.categoria}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoriaContainer: {
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 17,
    marginRight: 10,
  },
  categoriaSeleccionada: {
    backgroundColor: "white", // Cambia esto al color que prefieras para las categorías seleccionadas
  },
  categoriaText: {
    color: "white",
    textAlign: "center",
  },
  textoSeleccionado: {
    color: "black", // Cambia esto al color de texto que prefieras para las categorías seleccionadas
  },
});

export default CategoriasTarjeta;
