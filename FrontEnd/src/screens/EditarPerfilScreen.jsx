import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import NavBar from "../components/NavBar";

import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import CategoriasTarjeta from "../components/Categorias";
import { useRoute } from "@react-navigation/native";

const EditarPerfil = ({ navigation }) => {
  const route = useRoute();
  const [usuarioJson, setUsuarioInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://myeventz.es/usuarios/find_by_id_REAL/2`
        );
        const data = await response.json();
        setUsuarioInfo(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [categoriasJson, setCategoriasJson] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://myeventz.es/categorias/find_all");
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
      <View style={styles.guardar}>
        <TouchableOpacity
          style={styles.volver}
          onPress={() => navigation.navigate("Perfil")}
        >
          <Ionicons name="arrow-undo" size={24} color="white" />
          <Text style={styles.TextClicableB}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.guardarBoton}
          onPress={() => navigation.guardar()}
        >
          <Text style={[styles.TextClicableB, { paddingHorizontal: 20 }]}>
            GUARDAR
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.container2}>
          <Image
            source={require("../../assets/foczy.png")}
            style={styles.imagen}
          />

          <Text style={[styles.TextClicableM, { marginBottom: 35 }]}>
            Cambiar imagen de perfil
          </Text>

          <View style={styles.opcionesPerfil}>
            <View style={styles.auxContainer}>
              <Text style={styles.titulo}>Nombre</Text>
              <TextInput
                style={styles.inputs}
                placeholder={usuarioJson.nombre}
                placeholderTextColor="#ccc"
              />
            </View>
          </View>

          <View style={styles.opcionesPerfil}>
            <View style={styles.auxContainer}>
              <Text style={styles.titulo}>Apellido 1</Text>
              <TextInput
                style={styles.inputs}
                placeholder={usuarioJson.apel1}
                placeholderTextColor="#ccc"
              />
            </View>
          </View>

          <View style={styles.opcionesPerfil}>
            <View style={styles.auxContainer}>
              <Text style={styles.titulo}>Apellido 2</Text>
              <TextInput
                style={styles.inputs}
                placeholder={usuarioJson.apel2}
                placeholderTextColor="#ccc"
              />
            </View>
          </View>

          <View style={styles.opcionesPerfil}>
            <View style={styles.auxContainer}>
              <Text style={[styles.titulo]}>Biografia</Text>
              <TextInput
                style={[
                  styles.inputs,
                  { height: 100, textAlignVertical: "top" },
                ]}
                placeholder={usuarioJson.bio}
                placeholderTextColor="#ccc"
                multiline={true}
              />
            </View>
          </View>

          <View style={styles.hobbies}>
            <Text style={[styles.cabecera, { left: -35 }]}>
              Muestra tus hobbies e intereses
            </Text>

            <TextInput
              style={styles.inputs}
              placeholder="Buscar hobbies..."
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity style={styles.searchIconContainer}>
              <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.contenedorCategorias}>
              <ScrollView
                style={styles.containerAux2}
                nestedScrollEnabled={true}
              >
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
            </View>
          </View>

          <Text style={[styles.cabecera]}>Tus Redes sociales</Text>

          <View style={styles.opcionesPerfil}>
            <View style={styles.auxContainer}>
              <Ionicons name="logo-tiktok" size={24} color="white" />
              <TextInput
                style={styles.inputs}
                placeholder={usuarioJson.tt}
                placeholderTextColor="#ccc"
              />
            </View>
          </View>

          <View style={styles.opcionesPerfil}>
            <View style={styles.auxContainer}>
              <Ionicons name="logo-instagram" size={24} color="white" />
              <TextInput
                style={styles.inputs}
                placeholder={usuarioJson.ig}
                placeholderTextColor="#ccc"
              />
            </View>
          </View>

          <View style={styles.opcionesPerfil}>
            <View style={styles.auxContainer}>
            <Ionicons name="logo-facebook" size={24} color="white" />
              <TextInput
                style={styles.inputs}
                placeholder={usuarioJson.fb}
                placeholderTextColor="#ccc"
              />
            </View>
          </View>

          <View style={styles.opcionesPerfil}>
            <View style={styles.auxContainer}>
              <Text style={styles.titulo}>{""} X</Text>
              <TextInput
                style={styles.inputs}
                placeholder={usuarioJson.x}
                placeholderTextColor="#ccc"
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <NavBar />
    </Background>
  );
};

const styles = StyleSheet.create({
  guardar: {
    paddingTop: Constants.statusBarHeight,
    width: "100%",
    height: 80,
    backgroundColor: "#100916",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    paddingHorizontal: 25,
  },
  volver: {
    flexDirection: "row",
    alignItems: "center",
  },
  guardarBoton: {
    backgroundColor: "#6200ee",
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  TextClicableB: {
    color: "white",
    fontSize: 15,
    padding: 5,
    fontWeight: "bold",
  },
  TextClicableM: {
    fontSize: 20,
    color: "#8000FF",
    textDecorationLine: "underline",
    fontWeight: "bold",
    textAlign: "center",
    top: 10,
  },
  container: {
    padding: 12,
    marginBottom: 50,
    height: "100%",
    width: "100%",
  },
  container2: {
    height: "100%",
    width: "100%",
    alignContent: "center",
    alignItems: "center",
  },
  imagen: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  opcionesPerfil: {
    width: "100%",
    alignContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 22,
    color: "white",
    textAlign: "start",
    fontWeight: "bold",
  },
  inputs: {
    width: 235,
    borderBottomColor: "#8000FF",
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    backgroundColor: "#1E1E1E",
    fontSize: 15,
    color: "#ccc",
  },
  auxContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hobbies: {
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  cabecera: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
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
  contenedorCategorias: {
    width: "100%",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 15,
    height: 200,
  },
  containerAux2: {
    width: "100%",
    height: "100%",

    borderRadius: 15,
    padding: 10,
  },
  searchIconContainer: {
    position: "absolute",
    right: 10,
    top: 12,
  },
});

export default EditarPerfil;
