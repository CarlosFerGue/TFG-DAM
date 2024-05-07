import React from "react";
import Background from "../components/Background";
import { View, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity } from "react-native";
import Constants from "expo-constants"; // Asegúrate de importar Constants si lo estás utilizando

const Login = ({ navigation }) => {
  return (
    <Background>
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
        <Text style={styles.inputText}>Nombre de usuario</Text>
        <TextInput
          style={styles.inputs}
          placeholder="Ingresa tu nombre de usuario"
        />
        <Text style={styles.inputText}>Contraseña</Text>

        <TextInput style={styles.inputs} placeholder="Ingresa tu contraseña" />

        <Text style={styles.olvidona}>¿Has olvidado tu contraseña?</Text>

        <Button title="Iniciar Sesión"/>

        <TouchableOpacity style={styles.crearcuenta} onPress={() => navigation.navigate("Register1")}>
          <Text style={styles.crearcuenta}>Crear Una Nueva Cuenta</Text>
        </TouchableOpacity>
        
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    padding: "5%",
    // borderColor: "#fff",
    // borderWidth: 1,
    display: "flex",
  },
  logo: {
    width: "100%",
    maxHeight: "100%",
    justifyContent: "center",
    alignSelf: "flex-start",
    bottom: "5%",
  },
  bienvenido: {
    fontSize: 35,
    color: "#fff",
    textAlign: "center",
    bottom: "14%",
  },
  subtitulo: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    bottom: "12%",
  },
  inputText: {
    fontSize: 20,
    color: "#fff",
    bottom: "3%",
    marginBottom: "5%",
  },
  inputs: {
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    width: "100%",
    bottom: "5%",
    marginBottom: "1%",
  },
  olvidona: {
    fontSize: 13,
    color: "#fff",
    bottom: "3%",
    textAlign: "center",
    bottom: "4%",
  },
  crearcuenta: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    top: "13%",
  },
});

export default Login;
