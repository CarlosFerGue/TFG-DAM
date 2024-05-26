import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userToken, setUserToken] = useState(null); // State to hold token
  

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("userToken");
        setUserToken(storedToken);
      } catch (error) {
        console.error("Error retrieving token from AsyncStorage:", error);
      }
    };

    retrieveToken();
  }, []); // Empty dependency array to run only once on component mount

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://myeventz.es/usuarios/login/[${username}]&[${password}]`
      );

      const json = response.data;
      if (json.token) {
        // Check for existence of 'token' property
        await AsyncStorage.setItem("userToken", json.token);
        await AsyncStorage.setItem("userId", json.id_usuario.toString());

        //console.log("User token:", json.token);
        //console.log("User id: ", json.id_usuario);

        const storedToken = await AsyncStorage.getItem("userToken");
       //console.log("Stored token:", storedToken);
        
        const storedUserId = await AsyncStorage.getItem("userId");
        //console.log("Stored user id:", storedUserId);


        navigation.navigate("Home");
        //navigation.navigate("Perfil", { token: json.token, id_usuario: json.id_usuario });
      } else {
        setError("Credenciales incorrectas. Inténtalo de nuevo.");
        console.error("Login failed:", json);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Ha ocurrido un error. Inténtalo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

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
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.inputText}>Contraseña</Text>
          <TextInput
            style={styles.inputs}
            placeholder="Ingresa tu contraseña"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity
            style={styles.crearcuenta}
            onPress={() => navigation.navigate("PassOlvidada")}
          >
            <Text style={styles.olvidona}>¿Has olvidado tu contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            disabled={isLoading}
            onPress={handleLogin}
          >
            {isLoading ? (
              <Text style={styles.buttonText}>Cargando...</Text>
            ) : (
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            )}
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
  errorText: {
    color: "red",
    marginBottom: 10,
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
