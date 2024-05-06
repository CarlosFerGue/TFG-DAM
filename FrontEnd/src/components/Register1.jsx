import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";

const Register = () => {
  // Estados para gestionar las entradas de los usuarios
  const [username, setUsername] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

      <TouchableOpacity>
        <Text style={styles.linkText}>Volver al Inicio de Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    width: "90%",
    backgroundColor: "#333",
    borderRadius: 5,
    color: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 5,
    width: "90%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  linkText: {
    color: "#BB86FC",
    marginTop: 15,
    textDecorationLine: 'underline',
  }
});

export default Register;