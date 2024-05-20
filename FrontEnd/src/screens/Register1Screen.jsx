import React, { useState } from "react";
import Background from "../components/Background";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import Constants from "expo-constants";

const Register1 = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const validateForm = () => {
    // Validación de correo electrónico
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Por favor, introduce un correo electrónico válido.');
      setModalVisible(true);
      return;
    }

    // Validación del nombre de usuario
    if (username.length < 3) {
      setErrorMessage('El nombre de usuario debe tener al menos 3 caracteres.');
      setModalVisible(true);
      return;
    }

    // Validación de la contraseña
    if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password) || !/[A-Z]/.test(password)) {
      setErrorMessage('La contraseña debe tener al menos 8 caracteres, incluyendo números, letras y al menos una mayúscula.');
      setModalVisible(true);
      return;
    }

    // Validación de la fecha de nacimiento
    const today = new Date();
    const hundredYearsAgo = new Date();
    hundredYearsAgo.setFullYear(hundredYearsAgo.getFullYear() - 100);
    if (date > today || date < hundredYearsAgo) {
      setErrorMessage('La fecha de nacimiento debe ser entre hace 100 años y hoy.');
      setModalVisible(true);
      return;
    }

    // Si todas las validaciones son correctas
    const registrationData = {
      username,
      date: date.toISOString(),
      email,
      password,
    };

    navigation.navigate("Register2", { registrationData });
  };
  

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../../assets/MyEventz.png")} style={styles.logo} resizeMode="contain"/>
        <Text style={styles.header}>Regístrate como un nuevo usuario de MyEventz</Text>

        <Text style={styles.labelText}>Nombre de usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          placeholderTextColor="#ccc"
          onChangeText={setUsername}
          value={username}
        />

        <Text style={styles.labelText}>Fecha de nacimiento</Text>
        <TouchableOpacity onPress={showDatepicker} style={styles.input}>
          <TextInput
            style={{ color: "#ffffff", fontSize: 16 }}
            placeholder="Fecha de nacimiento"
            placeholderTextColor="#ccc"
            editable={false}
            value={date.toLocaleDateString()}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onDateChange}
          />
        )}

        <Text style={styles.labelText}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          placeholderTextColor="#ccc"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />

        <Text style={styles.labelText}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#ccc"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={validateForm}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Volver al Inicio de Sesión</Text>
        </TouchableOpacity>

        <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Modal>

      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "115%",
    maxHeight: "20%",  
    marginBottom: -10, 
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
    marginTop: -30,
    width: "80%", 
    alignSelf: "center",
  },
  header: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold"
  },
  input: {
    width: "100%",
    backgroundColor: "#222",
    borderRadius: 15,       
    borderWidth: 2,
    borderColor: "#5f5fc4",
    color: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    marginVertical: 10,
    alignSelf: "flex-start",
  },
  labelText: {
    color: "#fff",
    marginLeft: 20,
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    alignSelf: "flex-start",
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
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
  },
  closeButton: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 16,
  }
});



export default Register1;