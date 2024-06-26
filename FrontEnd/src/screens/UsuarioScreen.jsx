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
import HomeScreenSlideHP from "../components/HomeScreenSlideHP";
import CategoriasTarjeta from "../components/Categorias";

const Usuario = ({ navigation, route }) => {
  const navigateToEvento = (id_evento) => {
    navigation.navigate("Evento", { id_evento });
  };

  const [eventosPropios, setEventosPropios] = useState([]);
  const [eventosInscrito, setEventosInscrito] = useState([]);

  useEffect(() => {
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
        setEventosPropios(organizados);
        setEventosInscrito(participados);
        fetchHobbies(userId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEventos(id_usuario);
  }, []);

  const [categoriasJson, setCategoriasJson] = useState([]);

  const fetchHobbies = async (userId) => {
    try {
      const response = await fetch(
        `https://myeventz.es/usuarios/hobbies/${id_usuario}`
      );
      const data = await response.json();
      setCategoriasJson(data);
  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //console.log(categoriasJson);

  const { id_usuario } = route.params;

  const [usuarioJson, setUsuarioInfo] = useState({});
  const [redesSociales, setRedesSociales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://myeventz.es/usuarios/find_by_id_REAL/${id_usuario}`
        );
        const data = await response.json();
        setUsuarioInfo(data);
        setRedesSociales(data.redesSociales || []);
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

        <Text style={styles.cabecera}>Biografía e intereses:</Text>
        <Text style={styles.biografiaCuerpo}>{usuarioJson.bio}</Text>

        {categoriasJson[0] !== 0 && (
          <View style={styles.categorias}>
            <View style={styles.listaCategorias}>
              {categoriasJson.map((item) => (
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
                <HomeScreenSlideHP item={item} />
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
            data={eventosInscrito}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigateToEvento(item.id_evento)}
              >
                <HomeScreenSlideHP item={item} />
              </TouchableOpacity>
            )}
            horizontal
            bounces={true}
            keyExtractor={(item) => item.id}
          />
        </View>

        <Text style={styles.redes}>Mis redes sociales</Text>
        <View style={styles.redesIconos}>
          {redesSociales.length > 0 ? (
            redesSociales.map((red) => (
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
  },ottom: 50,
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

export default Usuario;
