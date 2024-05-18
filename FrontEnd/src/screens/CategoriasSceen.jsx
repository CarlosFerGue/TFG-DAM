import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import NavBar from "../components/NavBar";
import CategoriasTarjeta from "../components/Categorias";

import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import theme from "../theme";

const CategoriasScreen = ({ navigation }) => {
  const [categoriasJson, setCategoriasJson] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://myeventz.es/categorias/find_all"
        );
        const data = await response.json();
        setCategoriasJson(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Background>
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
      <ScrollView style={styles.container}>
       

        <View style={styles.listaCategorias}>
          {categoriasJson.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.addCategoria(item.categoria)}
              style={styles.categoriaCard}
            >
              <CategoriasTarjeta categoria={item} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <NavBar />
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    padding: 12,
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "white",
    marginBottom: 5,
    top: 10,
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
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  categoriaCard: {
    marginBottom: 20,
  },
});

export default CategoriasScreen;
