import React from "react";
import Background from "../components/Background";
import NavBar from "../components/NavBar";
import CategoriasTarjeta from "../components/Categorias";

import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import theme from "../theme";

import categoriasJson from "../categorias";

const CategoriasScreen = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Buscar categorias..."
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity style={styles.searchIconContainer}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Aquí renderizamos la lista de categorías */}
        <View style={styles.listaCategorias}>
          <FlatList
            data={categoriasJson}
            renderItem={({ item }) => <CategoriasTarjeta categoria={item} />}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true} // Renderiza la lista horizontalmente
            //contentContainerStyle={styles.listaCategoriasInterna}
          />
        </View>
      </View>
      <NavBar />
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    padding: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "white",
    marginBottom: 20,
  },
  inputs: {
    flex: 1,
    color: "white",
    height: 50,
    padding: 8,
    fontSize: 17,
  },
  searchIconContainer: {
    padding: 10,
  },
  listaCategorias: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    
  },
});

export default CategoriasScreen;
