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
  Image,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import theme from "../theme";

import UsuariosTarjeta from "../components/Usuarios";

const BuscarUsuarios = ({ navigation }) => {
  const [categoriasJson, setCategoriasJson] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://91.250.186.139:8000/usuarios/search/busqueda"
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
          placeholder="Buscar usuarios..."
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity style={styles.searchIconContainer}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {/* <ScrollView style={styles.container}>
        <View style={styles.listaUsuarios}>
          {categoriasJson.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.addUsuario(item.usuarios)}
              style={styles.usuarioCard}
            >
              <CategoriasTarjeta usuarios={item} />
            </TouchableOpacity>
          ))}

        </View>
      </ScrollView> */}
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
    paddingHorizontal: 10,
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
  listaUsuarios: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  usuarioCard: {
    marginBottom: 20,
  },
});

export default BuscarUsuarios;
