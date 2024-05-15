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
} from "react-native";
import Constants from "expo-constants";

const EventoScreen = ({ navigation }) => {
  return (
    <Background>
      <Image source={require("../../assets/foczy.png")} style={styles.imagen} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/bg.png")}
            style={styles.Background}
          />
          <Image
            source={require("../../assets/foczy.png")}
            style={styles.profile}
          />
          <Text style={styles.nombre}>Nombre del evento</Text>
          <Text style={styles.fecha}>29/02/1987 11:40</Text>
          <View style={styles.categorias}>

          </View>

          <Text style={styles.cabecera}>Descripción del evento:</Text> 
          <Text style={styles.cuerpoEvento}>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Voluptatum, vero facere! Adipisci perferendis quo veniam hic eligendi deleniti id 
          ipsam aut quam dignissimos sapiente, voluptates perspiciatis exercitationem in soluta sint.</Text>

          <Text style={styles.subCabecera}>Rango de edad:
          <Text style={styles.textoCabecera}> de 18 a 25 años.</Text>
          </Text>
          
          <Text style={styles.subCabecera}>Ubicación: 
          <Text style={styles.textoCabecera}> El macauto de marras en deep deli</Text>
          </Text>
          
          <View style={styles.ubicacion}>

          </View>
          <Text style={styles.cabecera}>Participantes:</Text> 
          <View style={styles.participantes}>

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
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
    paddingHorizontal: 20,
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
    borderColor: "white",
    borderWidth: 2,
    marginTop: 20,
  },
  participantes: {
    width: "100%",

    borderRadius: 20,
    marginBottom: 50,
  },

});

export default EventoScreen;
