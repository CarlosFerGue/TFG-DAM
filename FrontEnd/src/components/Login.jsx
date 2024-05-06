import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";
import { AppLoading } from "expo";
import * as Font from "expo-font";

// Ruta correcta al archivo de la fuente
const loadFonts = async () => {
  await Font.loadAsync({
    "lobster-two": require("../../assets/lobster-two.regular.ttf"),
  });
};

const Login = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/MyEventz.png")}
        resizeMode="contain"
      />
      <Text style={styles.bienvenido}>¡Bienvenid@!</Text>
      <Text style={styles.subtitulo}>
        Tu portal de actividades y experiencias en Zaragoza.
      </Text>
      <Text style={{ color: "#fff", fontSize: 24 }}>Main</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
  },
  logo: {
    width: "100%",
    maxHeight: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  bienvenido: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "lobster-two",
  },
  subtitulo: {
    fontSize: 24,
    color: "#fff",
  },
  titulo3: {
    backgroundColor: "tomato",
    flex: 1,
  },
});

export default Login;
