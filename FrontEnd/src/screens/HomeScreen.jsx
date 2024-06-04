import Background from "../components/Background";
import NavBar from "../components/NavBar";
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

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

import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  const [category, setCategory] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [eventosPopulares, setEventosPopulares] = useState([]);
  const [eventosRecientes, setEventosRecientes] = useState([]);
  const [searchText, setSearchText] = useState("");

  const loadCategory = async () => {
    try {
      const valueId = await AsyncStorage.getItem("selectedCategory");
      const value = await AsyncStorage.getItem("selectedCategoryName");

      if (valueId !== null) {
        setCategory(value);
        try {
          const response = await fetch(
            `https://myeventz.es/eventos/find_by_category/${valueId}`
          );
          const data = await response.json();
          //console.log("Populares:", data); // Verifica que los datos se están obteniendo correctamente
          setEventosPopulares(data);
          setEventosRecientes(data);
          AsyncStorage.removeItem("selectedCategory");
          AsyncStorage.removeItem("searchText");
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    } catch (error) {
      console.error("Error al leer la categoria:", error);
    }
  };

  const navigateToEvento = (id_evento) => {
    navigation.navigate("Evento", { id_evento });
  };

  const fetchData1 = async () => {
    try {
      const response = await fetch("https://myeventz.es/eventos/popular");
      const data = await response.json();
      //console.log("Populares:", data); // Verifica que los datos se están obteniendo correctamente
      setEventosPopulares(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData2 = async () => {
    try {
      const response = await fetch("https://myeventz.es/eventos/close_events");
      const data = await response.json();
      //console.log("Recientes:", data); // Verifica que los datos se están obteniendo correctamente
      setEventosRecientes(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData1();
      fetchData2();
      loadCategory();
    }, [])
  );

  const filteredPopulares = isFiltered
    ? eventosPopulares.filter(
        (evento) =>
          evento.titulo &&
          evento.titulo.toLowerCase().includes(searchText.toLowerCase())
      )
    : eventosPopulares;

  const filteredRecientes = isFiltered
    ? eventosRecientes.filter(
        (evento) =>
          evento.titulo &&
          evento.titulo.toLowerCase().includes(searchText.toLowerCase())
      )
    : eventosRecientes;

  const handleRemoveFilter = async () => {
    // Clear category from AsyncStorage
    await AsyncStorage.removeItem("selectedCategory");

    // Reset category and filtered states
    setCategory("");
    setIsFiltered(false);

    // Re-fetch data without filtering by category
    fetchData1();
    fetchData2();
  };
  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Buscar eventos..."
            placeholderTextColor="#ccc"
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
          />
          <TouchableOpacity style={styles.searchIconContainer}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {category !== "" && (
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={handleRemoveFilter}
          >
            <Ionicons
              name="close-circle"
              size={24}
              color="black"
            />
            <Text style={styles.categoryText}>Eliminar filtro: {category}</Text>
          </TouchableOpacity>
        )}

        {/* Slider horizontal de Eventos populares */}
        <Text style={styles.subtitulo}>Eventos populares:</Text>
        <View style={styles.sliderH}>
          <FlatList
            data={filteredPopulares}
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
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                No se encontraron eventos populares.
              </Text>
            }
          />
        </View>

        {/* Slider vertical de Publicaciones recientes */}
        <Text style={styles.subtitulo2}>Publicaciones recientes:</Text>
        <View style={styles.sliderV}>
          <FlatList
            data={filteredRecientes}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigateToEvento(item.id_evento)}
              >
                <HomeScreenSlideV item={item} />
              </TouchableOpacity>
            )}
            bounces={true}
            keyExtractor={(item) => item.id_evento}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                No se encontraron publicaciones recientes.
              </Text>
            }
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
    bottom: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "white",
  },
  categoryText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10
  },
  categoryButton: {
    borderRadius: 5,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
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
  emptyText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Home;
