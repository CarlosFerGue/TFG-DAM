import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform } from "react-native";
import Background from "../components/Background";
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from "expo-constants";

const Register2 = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName1, setLastName1] = useState('');
  const [lastName2, setLastName2] = useState('');
  const [biography, setBiography] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const pickImage = async () => {
    // Pide permiso para acceder a la galería de fotos
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status !== 'granted') {
      alert('Lo siento, necesitamos permisos de cámara para hacer esto!');
      return;
    }
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../../assets/MyEventz.png")} style={styles.logo} resizeMode="contain"/>
        <Text style={styles.header}>Completa la información adicional de tu nuevo perfil.</Text>

        <Text style={styles.labelText}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Miguel Ángel"
          placeholderTextColor="#ccc"
          onChangeText={setFirstName}
          value={firstName}
        />

        <Text style={styles.labelText}>Primer Apellido</Text>
        <TextInput
          style={styles.input}
          placeholder="Rogel"
          placeholderTextColor="#ccc"
          onChangeText={setLastName1}
          value={lastName1}
        />

        <Text style={styles.labelText}>Segundo Apellido</Text>
        <TextInput
          style={styles.input}
          placeholder="Ruiz"
          placeholderTextColor="#ccc"
          onChangeText={setLastName2}
          value={lastName2}
        />

        <Text style={styles.labelText}>Biografía</Text>
        <TextInput
          style={[styles.input, styles.biography]}
          placeholder="Describe tus hobbies, gustos e intereses..."
          placeholderTextColor="#ccc"
          onChangeText={setBiography}
          value={biography}
          multiline
        />

        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Seleccionar foto de perfil</Text>
        </TouchableOpacity>
        {profileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("NextScreen")}>
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

// Update the styles accordingly
const styles = StyleSheet.create({
  // Existing styles adjusted and new styles for biography and profile image
  biography: {
    minHeight: 100, // Larger text input for biography
    textAlignVertical: 'top', // Align text to the top
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Circular image
    marginTop: 10,
  },
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

export default Register2;
