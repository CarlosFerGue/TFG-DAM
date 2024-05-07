import React, { useState } from "react";
import Background from "../components/Background";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import Constants from "expo-constants";

const Register1 = ({ navigation }) => {
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
    maxHeight: "20%",  // Adjusted for better proportion
    marginBottom: "5%", // Added space below logo
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
    textAlign: "center",
    fontWeight: "bold",  // Making text bolder for better visibility
  },
  input: {
    width: "80%",
    backgroundColor: "#222", // Darker background for inputs
    borderRadius: 8,       // More rounded corners
    borderWidth: 2,
    borderColor: "#5f5fc4",  // Brighter border color
    color: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 15,   // Increased vertical padding for better touch area
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 25,  // More rounded button
    width: "60%",
    alignItems: "center",
    margin: 20,         // Adjusted margin
    shadowColor: "#000",  // Adding shadow for depth
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
    fontSize: 16,
    fontWeight: "bold",  // Bold text for readability
  },
  linkText: {
    color: "#BB86FC",
    textDecorationLine: 'underline',
    marginTop: 10,      // Added top margin for spacing
  }
});

export default Register1;