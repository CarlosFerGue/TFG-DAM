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

import UsuariosTarjeta from "../components/UsuarioCard";

const BuscarUsuarios = ({ navigation }) => {
  const [usuarios, setusuarios] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://myeventz.es/usuarios/find_all");
        const data = await response.json();
        setusuarios(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const navigateToUsuario = (id_usuario) => {
    navigation.navigate("Usuario", { id_usuario });
  };

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

      <View style={styles.sliderV}>
        <FlatList
          data={usuarios}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigateToUsuario(item.id_usuario)}
            >
              <UsuariosTarjeta item={item} />
            </TouchableOpacity>
          )}
          bounces={true}
          keyExtractor={(item) => item.id_usuario.toString()}
        />
      </View>

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
