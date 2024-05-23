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

  // Estado para la información del usuario
  const [usuario, setUsuario] = useState({});
  const [hobbies, setHobbies] = useState([]);
  const [eventosPopulares, setEventosPopulares] = useState([]);

  // Función para cerrar sesión
  const cerrarSesion = async () => {
    await AsyncStorage.removeItem("userToken");
    navigation.navigate("Login");
  };

  // Fetch para obtener la información del usuario
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(
          `https://myeventz.es/usuarios/find_by_id/${token}`
        );
        const data = await response.json();
        setUsuario(data[0]); // Asume que el JSON es un array con un único objeto
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsuario();
  }, [token]);

  // Fetch para obtener los hobbies
  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const response = await fetch(
          `https://myeventz.es/usuarios/hobbies/${token}`
        );
        const data = await response.json();
        setHobbies(data);
      } catch (error) {
        console.error("Error fetching hobbies:", error);
      }
    };

    fetchHobbies();
  }, [token]);

  // Fetch para obtener los eventos populares
  useEffect(() => {
    const fetchEventosPopulares = async () => {
      try {
        const response = await fetch("https://myeventz.es/eventos/popular");
        const data = await response.json();
        setEventosPopulares(data);
      } catch (error) {
        console.error("Error fetching popular events:", error);
      }
    };

    fetchEventosPopulares();
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
          {usuario.nombre} {usuario.apel1}
          {usuario.apel2 ? "\n" + usuario.apel2 : ""}
        </Text>
        <Text style={styles.user}>@{usuario.usuario}</Text>

        <View style={styles.opcionesPerfil}>
          <TouchableOpacity
            style={styles.editarPerfil}
            onPress={() => navigation.navigate("EditarPerfil")}
          >
            <Text style={styles.buttonText}>Editar perfil </Text>
            <Ionicons name="create-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.cerrarSesion} onPress={cerrarSesion}>
            <Text style={styles.buttonText}>Cerrar Sesion </Text>
            <Ionicons name="exit-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>

        <Text style={styles.cabecera}>Biografía e intereses:</Text>
        <Text style={styles.biografiaCuerpo}>{usuario.bio}</Text>

        {hobbies.length > 0 && (
          <View style={styles.categorias}>
            <View style={styles.listaCategorias}>
              {hobbies.map((item) => (
                <View key={item.id} style={styles.categoriaCard}>
                  <CategoriasTarjeta categoria={item} />
                </View>
              ))}
            </View>
          </View>
        )}

        <Text style={styles.cabecera}>Mis eventos:</Text>
        <View style={styles.eventos}>
          <FlatList
            data={eventosPopulares}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigateToEvento(item.id_evento)}
              >
                <HomeScreenSlideH item={item} />
              </TouchableOpacity>
            )}
            horizontal
            bounces={true}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <Text style={styles.cabecera}>Participaciones:</Text>
        <View style={styles.eventos}>
          <FlatList
            data={eventosPopulares}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigateToEvento(item.id_evento)}
              >
                <HomeScreenSlideH item={item} />
              </TouchableOpacity>
            )}
            horizontal
            bounces={true}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <Text style={styles.redes}>Mis redes sociales</Text>
        <View style={styles.redesIconos}>
          {hobbies.length > 0 ? (
            hobbies.map((red) => (
              <Ionicons
                key={red.id} // Suponiendo que 'red' tiene un 'id'
                name={`logo-${red.categoria}`} // Ajusta el nombre del icono según tus datos
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
