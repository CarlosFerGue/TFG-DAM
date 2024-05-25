import Background from "../components/Background";
import NavBar from "../components/NavBar";
import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons"; // Importa el ícono de la lupa desde Ionicons
import theme from "../theme";

import HomeScreenSlideH from "../components/HomeScreenSlideH";
import HomeScreenSlideV from "../components/HomeScreenSlideV";

const Home = ({ navigation }) => {
  const navigateToEvento = (id_evento) => {
    navigation.navigate("Evento", { id_evento });
  };

  const [eventosPoupulares, seteventosPoupulares] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://myeventz.es/eventos/popular");
        const data = await response.json();
        seteventosPoupulares(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [eventosRecientes, seteventosRecientes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://myeventz.es/eventos/close_events"
        );
        const data = await response.json();
        seteventosRecientes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Buscar eventos..."
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity style={styles.searchIconContainer}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Slider horizontal de Eventos populares */}
        <Text style={styles.subtitulo}>Eventos populares:</Text>
        <View style={styles.sliderH}>
          <FlatList
            data={eventosPoupulares}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigateToEvento(item.id_evento)}
              >
                <HomeScreenSlideH item={item} />
              </TouchableOpacity>
            )}
            horizontal
            bounces={true}
            keyExtractor={(item) => item.id_evento}
          />
        </View>

        {/* Slider vertical de Publicaciones recientes */}
        <Text style={styles.subtitulo2}>Publicaciones recientes:</Text>
        <View style={styles.sliderV}>
          <FlatList
            data={eventosRecientes}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigateToEvento(item.id_evento)}
              >
                <HomeScreenSlideV item={item} />
              </TouchableOpacity>
            )}
            bounces={true}
            keyExtractor={(item) => item.id_evento}
          />
        </View>
      </View>
      {/* Aqui metemos la navBar que sera un componente externo */}
      <NavBar />
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    padding: 12,
    display: "flex",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "white",
    top: -30,
  },
  sliderH: {
    flex: 0.25,
    paddingTop: 10,
  },
  sliderV: {
    flex: 0.75,
    paddingTop: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  subtitulo: {
    fontSize: 25,
    fontWeight: "bold",
    color: theme.colors.white,
    paddingLeft: 5,
    top: 4,
  },
  subtitulo2: {
    fontSize: 25,
    fontWeight: "bold",
    color: theme.colors.white,
    paddingLeft: 5,
    top: 14,
  },
  inputText: {
    fontSize: 20,
    color: theme.colors.white,
    bottom: 4,
    marginBottom: 4,
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
  button: {
    alignSelf: "center",
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 18,
    width: "80%",
    alignItems: "center",
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Home;
