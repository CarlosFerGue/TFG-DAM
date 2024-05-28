import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import NavBar from "../components/NavBar";

import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import theme from "../theme";

import UsuariosTarjeta from "../components/UsuarioCard";

const BuscarUsuarios = ({ navigation }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://myeventz.es/usuarios/find_all");
        const data = await response.json();
        setUsuarios(data);
        setFilteredUsuarios(data); // Initialize filtered users with all users
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter users based on search text
    const filtered = usuarios.filter((usuario) =>
      usuario.nombre.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsuarios(filtered);
  }, [searchText, usuarios]);

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
          value={searchText}
          onChangeText={setSearchText} // Update searchText on text input change
        />
        <TouchableOpacity style={styles.searchIconContainer}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <FlatList
          data={filteredUsuarios}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigateToUsuario(item.id_usuario)}
            >
              <UsuariosTarjeta item={item} />
            </TouchableOpacity>
          )}
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
    marginBottom: 140,
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
