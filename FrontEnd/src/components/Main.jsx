import React from "react";
import Constants from "expo-constants";
import Background from "./Background"; // Asegúrate de que la ruta de importación es correcta
import { View, Text, StyleSheet, Image } from "react-native";

const Main = () => {
  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.logo}> 
          <Image
            source={require("../../assets/MyEventz.png")}
            resizeMode="contain"
          />
        </View>
        <View>

        </View>
        <View>

        </View>
        <Text style={{ color: "#fff", fontSize: 24 }}>Main</Text>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "80%", // ajusta el tamaño de la imagen según tus necesidades
    maxHeight: "80%", // ajusta el tamaño de la imagen según tus necesidades
  },
  bienvenido: {
    backgroundColor: "dodgerblue",
    flex: 1,
  },
  titulo2: {
    backgroundColor: "gold",
    flex: 1,
  },
  titulo3: {
    backgroundColor: "tomato",
    flex: 1,
  },
});

export default Main;
