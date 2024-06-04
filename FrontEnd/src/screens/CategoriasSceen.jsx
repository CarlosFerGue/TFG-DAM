import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import NavBar from "../components/NavBar";
import CategoriasTarjeta from "../components/Categorias";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CategoriasScreen = ({ navigation }) => {
  const [categoriasJson, setCategoriasJson] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategorias, setFilteredCategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://myeventz.es/categorias/find_all");
        const data = await response.json();
        setCategoriasJson(data);
        setFilteredCategorias(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = categoriasJson.filter((categoria) =>
      categoria.categoria.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategorias(filteredData);
  }, [searchQuery, categoriasJson]);

  const saveCategory = async (category) => {
    try {
      await AsyncStorage.setItem("selectedCategory", category);
      console.log("Categoria guardada:", category);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error al guardar la categoria:", error);
    }
  };

  return (
    <Background>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Buscar categorias..."
          placeholderTextColor="#ccc"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.searchIconContainer}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.listaCategorias}>
          {filteredCategorias.map((item) => (
            <TouchableOpacity
              key={item.id_categoria}
              onPress={() => saveCategory(item.categoria)}
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
    marginBottom: 60,
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
    overflow: "scroll",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  categoriaCard: {
    marginBottom: 20,
  },
});

export default CategoriasScreen;
