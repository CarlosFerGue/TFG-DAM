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

import UsuariosTarjeta from "../components/Usuarios";
import slidesH from "../slidesHomeH";
import HomeScreenSlideH from "../components/HomeScreenSlideH";
import CategoriasTarjeta from "../components/Categorias";

const Usuario = ({ navigation }) => {
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
      <View style={styles.container}>
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

        <Text style={styles.cabecera}>Participaciones:</Text>

        <View style={styles.sliderH}>
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

        <Text style={styles.cabecera}>Mis redes sociales</Text>
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
    top: 40,
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 50,
    bottom: 30,
  },
  nombre: {
    fontSize: 25,
    color: theme.colors.white,
    bottom: 120,
    fontFamily: "Lobster Two Regular",
    left: 120,
  },
  user: {
    fontSize: 15,
    color: theme.colors.white,
    left: 120,
    bottom: 110,
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
  },
  eventos: {
    bottom: 20,
  },
  listaCategorias: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    bottom: 50,
  },
});

export default Usuario;
