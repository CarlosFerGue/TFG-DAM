import React, { useState, useRef } from "react";
import Background from "../components/Background";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Animated,
} from "react-native";
import Constants from "expo-constants"; // Asegúrate de importar Constants si lo estás utilizando
import theme from "../theme";

import slidesH from "../slidesHomeH";
import slidesV from "../slidesHomeV";

import HomeScreenSlideH from "../components/HomeScreenSlideH";
import HomeScreenSlideV from "../components/HomeScreenSlideV";

const Home = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.container}>
        <TextInput
          style={styles.inputs}
          placeholder="Buscar eventos..."
          placeholderTextColor="#ccc"
        />

        {/* Slider horizontal de Eventos populares */}
        <Text style={styles.subtitulo}>Eventos populares:</Text>
        <View style={styles.sliderHView}>
          <FlatList
            style={styles.sliderH}
            data={slidesH}
            renderItem={({ item }) => <HomeScreenSlideH item={item} />}
            horizontal
            // showsHorizontalScrollIndicator
            // pagingEnabled
            bounces={true}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Slider vertical de Publicaciones recientes */}
        <Text style={styles.subtitulo2}>Publicaciones recientes:</Text>
        <View style={styles.sliderVView}>
          <FlatList
            style={styles.sliderV}
            data={slidesV}
            renderItem={({ item }) => <HomeScreenSlideV item={item} />}
            bounces={true}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    padding: 17,
    display: "flex",
  },
  sliderH: {
    width: 300,
    borderRadius: 30,
  },
  sliderV: {},
  sliderHView: {
    flex: 0.3,
    paddingTop: 10,
  },
  sliderVView: {
    flex: 0.7,
    paddingTop: 15,
  },
  subtitulo: {
    fontSize: 25,
    fontWeight: "bold",
    color: theme.colors.white,
    paddingLeft: 5,
    top: 14,
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
    borderBottomWidth: 2,
    borderColor: "white",
    color: "white",
    height: 50,
    padding: 8,
    top: "1%",
    fontSize: 17,
    width: "100%",
    bottom: "5%",
    marginBottom: "1%",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 18,
    width: "80%",
    alignItems: "center",
    margin: 20, // Adjusted margin
    shadowColor: "#000", // Adding shadow for depth
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
    fontWeight: "bold", // Bold text for readability
  },
});

export default Home;
