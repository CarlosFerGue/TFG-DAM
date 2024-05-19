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
import MapView from "react-native-maps";
import UsuariosTarjeta from "../components/UsuarioCard";

const EventoScreen = ({ navigation, route }) => {
  const { id_evento } = route.params;
  const [usuarios, setusuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://myeventz.es/usuarios/find_all");
        const data = await response.json();
        setusuarios(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const navigateToUsuario = () => {
    navigation.navigate("Usuario");
  };

  const [evento, setevento] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://myeventz.es/eventos/load_evento/${id_evento}` // Use id_evento from props
        );
        const data = await response.json();
        setevento(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Background>
      <Image source={require("../../assets/foczy.png")} style={styles.imagen} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/bg.png")}
            style={styles.Background}
          />

          <View style={styles.infoImportante}>
            <Image
              source={require("../../assets/foczy.png")}
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
                latitude: 37.783333,
                longitude: -0.893333,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            />
          </View>

          <Text style={styles.cabecera}>Participantes:</Text>
          <View style={styles.participantes}>
            <FlatList
              data={usuarios}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={navigateToUsuario}>
                  <UsuariosTarjeta item={item} />
                </TouchableOpacity>
              )}
              bounces={true}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </ScrollView>
      <NavBar />
    </Background>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: "100%",
    maxHeight: "100%",
    position: "absolute",
    top: -90,
  },
  scrollViewContent: {
    marginTop: Constants.statusBarHeight + 120,
    flexGrow: 1,
    paddingBottom: 50,
  },
  container: {
    marginBottom: 100,
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
    marginBottom: 50,
    top: -20,
  },
});

export default EventoScreen;
