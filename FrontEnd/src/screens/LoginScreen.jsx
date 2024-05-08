import React from "react";
import Background from "../components/Background";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants"; // Asegúrate de importar Constants si lo estás utilizando
import theme from "../theme";
// import * as Font from 'expo-font';
// import LobsterTwoRegular from '../assets/fonts/lobster-two.regular.ttf';

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

        <TextInput style={styles.inputs} placeholder="Ingresa tu contraseña" 
        secureTextEntry={true}/>

        <Text style={styles.olvidona}>¿Has olvidado tu contraseña?</Text>

        <Button title="Iniciar Sesión" />

        <TouchableOpacity
          style={styles.crearcuenta}
          onPress={() => navigation.navigate("Register1")}
        >
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
    fontFamily: 'Lobster Two Regular',
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
    marginBottom: "5%",
  },
  inputs: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 7,
    color: 'white',
    height: 50,
    padding: 8,
    fontSize: 17,
    width: "100%",
    bottom: "5%",
    marginBottom: "1%",
  },
  olvidona: {
    fontSize: 13,
    color: theme.colors.white,
    bottom: "3%",
    textAlign: "center",
    bottom: "4%",
  },
  crearcuenta: {
    fontSize: 20,
    color: theme.colors.white,
    textAlign: "center",
    top: "13%",
  },
});

export default Login;
