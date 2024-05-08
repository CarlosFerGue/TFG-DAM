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
} from "react-native";
import Constants from "expo-constants"; // Asegúrate de importar Constants si lo estás utilizando
import theme from "../theme";

const PassOlvidada = ({ navigation }) => {
  return (
    <Background>
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../../assets/MyEventz.png")}
            resizeMode="contain"
          />

          <Text style={styles.bienvenido}>Recuperación de contraseñas</Text>

          <Text style={styles.inputText}>Introduce tu correo electrónico</Text>
          <TextInput
            style={styles.inputs}
            placeholder="unprofessional@svalero.com"
            placeholderTextColor="#ccc"
          />

          <TouchableOpacity
            style={styles.crearcuenta}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.crearcuenta}>Volver a Inicio de sesión</Text>
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
    fontFamily: "Lobster Two Regular",
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
  inputPass: {},
  olvidona: {
    fontSize: 15,
    color: "#ccc",
    bottom: "3%",
    textAlign: "center",
    bottom: "4%",
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

export default PassOlvidada;
