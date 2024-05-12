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

import slides from "../slides";
import HomeScreenSlide from "../components/HomeScreenSlideH";

const Home = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.container}>
        <TextInput
          style={styles.inputs}
          placeholder="Buscar eventos..."
          placeholderTextColor="#ccc"
        />

        <Text style={styles.subtitulo}>Eventos populares:</Text>

        <View style={styles.container}>
          <FlatList
            data={slides}
            renderItem={({ item }) => <HomeScreenSlide item={item} />}
            horizontal
            // showsHorizontalScrollIndicator
            // pagingEnabled
            bounces={true}
            keyExtractor={(item) => item.id}
          />
        </View>

        <Text style={styles.subtitulo2}>Publicaciones recientes:</Text>
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
