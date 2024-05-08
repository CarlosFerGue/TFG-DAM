import React from "react";
import Background from "../components/Background";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  validateForm,
  ScrollView,
  useState,
} from "react-native";
import Constants from "expo-constants"; // Asegúrate de importar Constants si lo estás utilizando
import theme from "../theme";
import Carousel from "react-native-reanimated-carousel";

const Home = ({ navigation }) => {
  // Estas son las variables del carousel
  const { width } = useWindowDimensions();

  //Y esta es la lista de items, esta es temporal, luego se la tendremos
  //que pasar por un json con la API
  const list = [
    {
      id: 1,
      title: "Item 1",
      image: require("../../assets/MyEventz.png"),
    },
    {
      id: 2,
      title: "Item 2",
      image: require("../../assets/MyEventz.png"),
    },
    {
      id: 3,
      title: "Item 3",
      image: require("../../assets/MyEventz.png"),
    },
  ];

  return (
    <Background>
      <View style={styles.container}>
        <TextInput
          style={styles.inputs}
          placeholder="Buscar eventos..."
          placeholderTextColor="#ccc"
        />

        <Text style={styles.subtitulo}>Eventos populares:</Text>

        <Carousel 
            width={width} 
            height={width / 2} 
            data={list} 
            renderItem={({item}
            ) => (
                <View>
                    <Image source={item.image} />
                </View>
            )}
        />

        <Text style={styles.subtitulo2}>Publicaciones recientes:</Text>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
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
    bottom: 80,
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
  olvidona: {
    fontSize: 15,
    color: "#ccc",
    bottom: "3%",
    textAlign: "center",
    bottom: "250%",
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
  crearcuenta: {
    fontSize: 20,
    color: "#8000FF",
    textDecorationLine: "underline",
    fontWeight: "bold",
    textAlign: "center",
    top: "3%",
  },
});

export default Home;
