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
  useState
} from "react-native";
import Constants from "expo-constants"; // Asegúrate de importar Constants si lo estás utilizando
import theme from "../theme";
import * as Font from "../../assets/fonts/LobsterRegular.ttf";


const Login = ({ navigation }) => {
  return (
    <Background>
      <ScrollView>
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
            placeholderTextColor="#ccc"
          />

          <Text style={styles.inputText}>Contraseña</Text>
          <TextInput
            style={styles.inputs}
            placeholder="Ingresa tu contraseña"
            placeholderTextColor="#ccc"
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.crearcuenta}
            onPress={() => navigation.navigate("PassOlvidada")}
          >
            <Text style={styles.olvidona}>¿Has olvidado tu contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={validateForm}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.crearcuenta}
            onPress={() => navigation.navigate("Register1")}
          >
            <Text style={styles.crearcuenta}>Crear Una Nueva Cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    padding: "5%",
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
    color: theme.colors.white,
    textAlign: "center",
    bottom: "14%",
    fontFamily: Font.LobsterRegular,
  },
  subtitulo: {
    fontSize: 20,
    color: theme.colors.white,
    textAlign: "center",
    bottom: "12%",
  },
  inputText: {
    fontSize: 20,
    color: theme.colors.white,
    bottom: "3%",
    marginBottom: "6%",
  },
  inputs: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 7,
    color: "white",
    height: 50,
    padding: 8,
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

export default Login;
