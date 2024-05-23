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
import HomeScreenSlideH from "../components/HomeScreenSlideH";
import CategoriasTarjeta from "../components/Categorias";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

const Perfil = ({ navigation }) => {
  const route = useRoute();
  const { token } = route.params;

  console.log("token perfil:", token);

  // Funcion para cerrar sesion
  const cerrarSesion = () => {
    AsyncStorage.removeItem("userToken");
    navigation.navigate("Login");
  };

  //Fetch para coger la info del usuario////////////////////////////////////////////////////////////////////////////////////////////////////

  //Informacion del usuario

  const [usuarios, setusuarios] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://myeventz.es/usuarios/find_by_id/${token}`
        );
        const data = await response.json();
        setusuarios(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //Hobbies

  const [hobbies, setHobbies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://myeventz.es/usuarios/hobbies/${token}`
        );
        const data = await response.json();
        setHobbies(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //Fetch para coger los eventos///////////////////////////////////////////////////////////////////////////////////////////////////

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

  const navigateToEvento = (id_evento) => {
    navigation.navigate("Evento", { id_evento });
  };

  return (
    <Background>
      <ScrollView style={styles.container}>
        <Image
          source={require("../../assets/foczy.png")}
          style={styles.imagen}
        />
        <Text style={styles.nombre}>
          {usuarios.nombre} {usuarios.apel1}
          {usuarios.apel2 ? "\n" + usuarios.apel2 : ""}
        </Text>
        <Text style={styles.user}>@{usuarios.usuario}</Text>

        <View style={styles.opcionesPerfil}>
          <TouchableOpacity
            style={styles.editarPerfil}
            onPress={() => navigation.navigate("EditarPerfil")}
          >
            <Text style={styles.buttonText}>Editar perfil </Text>
            <Ionicons name="create-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cerrarSesion}
            onPress={() => cerrarSesion()}
          >
            <Text style={styles.buttonText}>Cerrar Sesion </Text>
            <Ionicons name="exit-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>

        <Text style={styles.cabecera}>Biografía e intereses:</Text>
        <Text style={styles.biografiaCuerpo}>{usuarios.bio}</Text>

        {hobbies.length > 0 && ( // Check if there are categories
          <View style={styles.categorias}>
            <View style={styles.listaCategorias}>
              {hobbies.map((item) => (
                <View
                  key={item.id}
                  onPress={() => navigation.addCategoria(item.categoria)}
                  style={styles.categoriaCard}
                >
                  <CategoriasTarjeta categoria={item} />
                </View>
              ))}
            </View>
          </View>
        )}
        <Text style={styles.cabecera}>Mis eventos:</Text>

        <View style={styles.eventos}>
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
            keyExtractor={(item) => item.id}
          />
        </View>

        <Text style={styles.cabecera}>Participaciones:</Text>

        <View style={styles.eventos}>
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
            keyExtractor={(item) => item.id}
          />
        </View>

        <Text style={styles.redes}>Mis redes sociales</Text>
        <View style={styles.redesIconos}>
          {hobbies.length > 0 ? (
            hobbies.map((red) => (
              <Ionicons
                key={red}
                name={`logo-${red}`}
                size={24}
                color="white"
              />
            ))
          ) : (
            <Text style={styles.sinRedes}>
              Este usuario no tiene ninguna red social asociada
            </Text>
          )}
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
    left: 120,
    fontWeight: "bold",
  },
  user: {
    fontSize: 15,
    color: theme.colors.white,
    left: 120,
    bottom: 100,
  },
  opcionesPerfil: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    bottom: 75,
    fontWeight: "bold",
  },
  editarPerfil: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    fontWeight: "bold",
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 5,
  },
  cerrarSesion: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  cabecera: {
    fontSize: 20,
    color: theme.colors.white,
    fontWeight: "bold",
    bottom: 50,
  },
  biografiaCuerpo: {
    fontSize: 15,
    color: theme.colors.white,
    bottom: 50,
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
  sinRedes: {
    color: "#ccc",
    fontSize: 15,
    textAlign: "center",
  },
});

export default Perfil;