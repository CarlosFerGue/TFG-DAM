import React, { useState, useEffect, useCallback } from "react";
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
import { useFocusEffect } from '@react-navigation/native';

const Perfil = ({ navigation }) => {
  const route = useRoute();
  const [token, setUserToken] = useState(null);
  const [id_usuario, setUserId] = useState(null);
  const [usuarioJson, setUsuarioInfo] = useState({});
  const [redesSociales, setRedesSociales] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [eventosPropios, setEventosPropios] = useState([]);
  const [eventosInscrito, setEventosInscrito] = useState([]);


  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `https://myeventz.es/usuarios/find_by_id_REAL/${userId}`
      );
      const data = await response.json();
      setUsuarioInfo(data);
      setRedesSociales(data.redesSociales || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchEventos = async (userId) => {
    try {
      const response = await fetch(
        `https://myeventz.es/usuarios/load_profile/${userId}`
      );
      const data = await response.json();
      
      // Extraer los eventos organizados e inscritos
      const organizados = data.organizados || [];
      const participados = data.participados || [];

      // Actualizar los estados
      setEventosPropios(participados);
      setEventosInscrito(organizados);


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const retrieveUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
        fetchUserData(storedUserId);
        fetchEventos(storedUserId);
      }
    } catch (error) {
      console.error("Error retrieving userId from AsyncStorage:", error);
    }
  };

  // Recuperar userId desde AsyncStorage y obtener datos del usuario
  useFocusEffect(
    useCallback(() => {
      retrieveUserId();
    }, [])
  );

  const retrieveToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("userToken");
      setUserToken(storedToken);
    } catch (error) {
      console.error("Error retrieving token from AsyncStorage:", error);
    }
  };

  // Obtener hobbies del usuario
  useEffect(() => {
    const fetchHobbies = async () => {
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

    fetchHobbies();
  }, [token]);
  useEffect(() => {}, []);

  const cerrarSesion = () => {
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userId");
    navigation.navigate("Login");
  };

  const editarPerfil = () => {
    navigation.navigate("EditarPerfil", { id_usuario: id_usuario });
  };

  const navigateToEvento = (id_evento) => {
    navigation.navigate("Evento", { id_evento });
  };

  return (
    <Background>
      <ScrollView style={styles.container}>
        <Image
          source={{
            uri: usuarioJson.img_url,
          }}
          style={styles.imagen}
        />
        <Text style={styles.nombre}>
          {usuarioJson.nombre} {usuarioJson.apel1}
          {usuarioJson.apel2 ? "\n" + usuarioJson.apel2 : ""}
        </Text>
        <Text style={styles.user}>@{usuarioJson.usuario}</Text>

        <View style={styles.opcionesPerfil}>
          <TouchableOpacity style={styles.editarPerfil} onPress={editarPerfil}>
            <Text style={styles.buttonText}>Editar perfil </Text>
            <Ionicons name="create-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.cerrarSesion} onPress={cerrarSesion}>
            <Text style={styles.buttonText}>Cerrar Sesion </Text>
            <Ionicons name="exit-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>

        <Text style={styles.cabecera}>Biografía e intereses:</Text>
        <Text style={styles.biografiaCuerpo}>{usuarioJson.bio}</Text>

        {hobbies.length > 0 && ( // Check if there are categories
          <View style={styles.categorias}>
            <View style={styles.listaCategorias}>
              {hobbies.map((item) => (
                <View
                  key={item.id_categoria}
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
            data={eventosPropios}
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

        <Text style={styles.cabecera}>Participaciones:</Text>

        <View style={styles.eventos}>
          <FlatList
            data={eventosInscrito}
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

        <Text style={styles.redes}>Mis redes sociales</Text>
        {/* <View style={styles.redesIconos}>
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
        </View> */}
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
    marginBottom: 25,
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
