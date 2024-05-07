import React, { useState } from "react";
import Background from "../components/Background";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import Constants from "expo-constants";

const Register1 = ({ navigation }) => {
  // Estados para gestionar las entradas de los usuarios
  const [username, setUsername] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../../assets/MyEventz.png")} style={styles.logo} resizeMode="contain"/>
        <Text style={styles.header}>Regístrate como un nuevo usuario de MyEventz</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          placeholderTextColor="#ccc"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de nacimiento"
          placeholderTextColor="#ccc"
          onChangeText={setBirthdate}
          value={birthdate}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          placeholderTextColor="#ccc"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#ccc"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Volver al Inicio de Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    maxHeight: "100%",
    justifyContent: "center",
    alignSelf: "flex-start",
    bottom: "5%",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
    marginTop: Constants.statusBarHeight,
  },
  header: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center"
  },
  input: {
    width: "80%",
    backgroundColor: "#333",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    color: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 15,
    width: "60%",
    alignItems: "center",
    margin: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  linkText: {
    color: "#BB86FC",
    textDecorationLine: 'underline',
  }
});

export default Register1;