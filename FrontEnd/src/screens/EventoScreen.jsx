import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import NavBar from "../components/NavBar";

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";

import Constants from "expo-constants";
import MapView from "react-native-maps";
import UsuariosTarjeta from "../components/UsuarioCard";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const EventoScreen = ({ navigation, route }) => {
  const [userId, setUserId] = useState(null);
  const [usuarioInfo, setUsuarioInfo] = useState(null);

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await fetch(
          `https://myeventz.es/usuarios/find_by_id_REAL/${userId}`
        );
        const data = await response.json();
        setUsuarioInfo(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const retrieveUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
          fetchUserData(storedUserId);
        }
      } catch (error) {
        console.error("Error retrieving userId from AsyncStorage:", error);
      }
    };

    retrieveUserId();
  }, []);

  const { id_evento } = route.params;
  const [usuarios, setUsuarios] = useState([]);
  const [evento, setEvento] = useState({});
  const [apuntado, setApuntado] = useState(null);

  const participantes = async () => {
    try {
      const response = await fetch(
        `https://myeventz.es/eventos/load_evento_info/${id_evento}`
      );
      const data = await response.json();
      setEvento(data);
      setUsuarios(data.participantes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const comprobarApuntado = async () => {
    try {
      const response = await fetch(
        `https://myeventz.es/participantes/apuntado/[${id_evento}]&[${userId}]`
      );
      const data = await response.json();
      setApuntado(data === 0 ? false : true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    participantes();
    comprobarApuntado();
  }, [userId]);

  const participar = async () => {
    try {
      await fetch(
        `https://myeventz.es/participantes/apuntarse/[${id_evento}]&[${userId}]`
      );
      await participantes();
      await comprobarApuntado();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const desapuntarse = async () => {
    try {
      await fetch(
        `https://myeventz.es/participantes/desapuntarse/[${id_evento}]&[${userId}]`
      );
      await participantes();
      await comprobarApuntado();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const navigateToUsuario = (id_usuario) => {
    navigation.navigate("Usuario", { id_usuario });
  };

  return (
    <Background>
      <Image
        source={{ uri: evento.img_url }}
        style={styles.imagen}
        resizeMode="cover"
      />
      {apuntado === false && (
        <TouchableOpacity style={styles.participar} onPress={participar}>
          <Text style={styles.textoParticipar}>Participar</Text>
        </TouchableOpacity>
      )}

      {apuntado === true && (
        <TouchableOpacity style={styles.desapuntarse} onPress={desapuntarse}>
          <Text style={styles.textoDesapuntarse}>Desapuntarse </Text>
          <Ionicons
            name="close-circle"
            size={24}
            color="white"
            style={{ top: 2 }}
          />
        </TouchableOpacity>
      )}

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/bg.png")}
            style={styles.Background}
          />

          <View style={styles.infoImportante}>
            <Image
              source={{ uri: evento.organizador?.img_url }}
              style={styles.profile}
            />
            <Text style={styles.nombre}>{evento.titulo}</Text>
            <Text style={styles.fecha}>
              {evento.fecha} {evento.hora}
            </Text>
            <View style={styles.categorias}></View>
          </View>

          <Text style={styles.cabecera}>Descripción del evento:</Text>
          <Text style={styles.cuerpoEvento}>{evento.descripcion}</Text>

          <Text style={styles.subCabecera}>
            Rango de edad:
            <Text style={styles.textoCabecera}>
              {" "}
              de {evento.edad_min} a {evento.edad_max} años.
            </Text>
          </Text>

          <Text style={styles.subCabecera}>
            Ubicación:
            <Text style={styles.textoCabecera}> {evento.ubicacion}</Text>
          </Text>

          <View style={styles.ubicacion}>
            <MapView
              style={styles.MapUbicacion}
              initialRegion={{
                latitude: 41.644460,
                longitude: -0.887270,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            />
          </View>

          <Text style={styles.cabecera}>Participantes ({usuarios.length} de {evento.participantesMax}):</Text>
          <View style={styles.participantes}>
            {usuarios.length > 0 ? (
              <FlatList
                data={usuarios}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => navigateToUsuario(item.id_usuario)}
                  >
                    <UsuariosTarjeta item={item} />
                  </TouchableOpacity>
                )}
                bounces={true}
                keyExtractor={(item) => item.id_usuario}
              />
            ) : (
              <Text style={styles.textoCabecera}>
                No hay participantes registrados aún.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      <NavBar />
    </Background>
  );
};

const styles = StyleSheet.create({
  participar: {
    width: 220,
    backgroundColor: "#6200ee",
    padding: 14,
    borderRadius: 20,
    position: "absolute",
    borderColor: "white",
    borderWidth: 2,
    bottom: 70,
    zIndex: 1,
    alignSelf: "center",
    alignItems: "center",
  },
  textoParticipar: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  desapuntarse: {
    width: 220,
    backgroundColor: "black",
    padding: 14,
    borderRadius: 20,
    position: "absolute",
    borderColor: "white",
    borderWidth: 2,
    bottom: 70,
    zIndex: 1,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  textoDesapuntarse: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  imagen: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: 200,
  },
  scrollViewContent: {
    marginTop: Constants.statusBarHeight + 120,
    flexGrow: 1,
    paddingBottom: 50,
  },
  container: {
    marginBottom: 140,
    paddingHorizontal: 20,
  },
  infoImportante: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 2,
  },
  Background: {
    position: "absolute",
    top: 50,
  },
  nombre: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  categorias: {
    display: "flex",
    width: "100%",
    height: 20,
  },
  fecha: {
    color: "white",
    fontSize: 20,
    color: "#ccc",
  },
  cabecera: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 40,
    marginBottom: 20,
  },
  textoCabecera: {
    color: "white",
    fontSize: 15,
    fontWeight: "normal",
    textAlign: "left",
  },
  cuerpoEvento: {
    color: "#ccc",
    fontSize: 18,
  },
  subCabecera: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
  },
  ubicacion: {
    width: "100%",
    height: 120,
    borderRadius: 20,
    borderColor: "purple",
    borderWidth: 4,
    marginTop: 20,
    overflow: "hidden",
    marginBottom: 10,
    marginBottom: 20,
  },
  MapUbicacion: {
    width: "100%",
    height: "100%",
  },
  participantes: {
    width: "100%",
    borderRadius: 20,
    marginBottom: 90,
    top: -20,
  },
});

export default EventoScreen;
