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
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import theme from "../theme";

import UsuariosTarjeta from "../components/UsuarioCard";
import slidesH from "../slidesHomeH";
import HomeScreenSlideH from "../components/HomeScreenSlideH";
import CategoriasTarjeta from "../components/Categorias";


const Perfil = ({ navigation }) => {
  const navigateToEvento = () => {
    navigation.navigate("Evento");
  };

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
      <ScrollView style={styles.container}>
        <Image
          source={require("../../assets/foczy.png")}
          style={styles.imagen}
        />
        <Text style={styles.nombre}>Gabriel Milagro Lopez</Text>
        <Text style={styles.user}>@gaymiloco</Text>

        <Text style={styles.cabecera}>Biografía e intereses:</Text>
        <Text style={styles.biografiaCuerpo}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
          vero facere! Adipisci perferendis quo veniam hic eligendi deleniti
        </Text>

        <View style={styles.categorias}>
          <View style={styles.listaCategorias}>
            {categoriasJson.slice(0, 2).map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => navigation.addCategoria(item.categoria)}
                style={styles.categoriaCard}
              >
                <CategoriasTarjeta categoria={item} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.cabecera}>Mis eventos:</Text>

        <View style={styles.eventos}>
          <FlatList
            data={slidesH}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={navigateToEvento}>
                <HomeScreenSlideH item={item} />
              </TouchableOpacity>
            )}
            horizontal
            bounces={true}
            keyExtractor={(item) => item.id}
          />
        </View>

        <Text style={styles.cabecera}>Participaciones:</Text>

        <View style={styles.eventos}>
          <FlatList
            data={slidesH}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={navigateToEvento}>
                <HomeScreenSlideH item={item} />
              </TouchableOpacity>
            )}
            horizontal
            bounces={true}
            keyExtractor={(item) => item.id}
          />
        </View>

        <Text style={styles.redes}>Mis redes sociales</Text>
        <View style={styles.redesIconos}>
          <Ionicons name="logo-facebook" size={24} color="white" />
          <Ionicons name="logo-twitter" size={24} color="white" />
          <Ionicons name="logo-instagram" size={24} color="white" />
          <Ionicons name="logo-tiktok" size={24} color="white" />
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
    height: "100%",
    width: "100%",
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nombre: {
    fontSize: 25,
    color: theme.colors.white,
    bottom: 100,
    fontFamily: "Lobster Two Regular",
    left: 120,
  },
  user: {
    fontSize: 15,
    color: theme.colors.white,
    left: 120,
    bottom: 100,
    fontFamily: "Lobster Two Regular",
  },
  cabecera: {
    fontSize: 20,
    color: theme.colors.white,
    fontWeight: "bold",
    bottom: 50,
    fontFamily: "Lobster Two Regular",
  },
  biografiaCuerpo: {
    fontSize: 15,
    color: theme.colors.white,
    bottom: 50,
    fontFamily: "Lobster Two Regular",
    padding: 5,
    color: "#ccc",
    marginBottom: 20,
  },
  eventos: {
    bottom: 50,
    width: "100%",
    marginVertical: 10,
  },
  categoriaCard: {
    width: "45%",
    marginBottom: 20,
  },
  listaCategorias: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    bottom: 50,
  },
  redes: {
    fontSize: 20,
    color: theme.colors.white,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Lobster Two Regular",
    marginTop: 20,
    bottom: 50,
  },
  redesIconos: {
    bottom: 40,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#6200ee",
    borderRadius: 10,
    padding: 10,
  },
});

export default Perfil;
