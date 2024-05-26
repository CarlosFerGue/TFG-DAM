import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native"; 
import axios from 'axios';

const Register3 = ({ route, navigation }) => {
  const { registrationData } = route.params; // Recibir los datos de Register1 y 2
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [searchText, setSearchText] = useState("");

  const sendVerificationEmail = (email) => {
    axios.post('https://myeventz.es/send_verification', { email }, {
        headers: {
          'Content-Type': 'application/json',
        },
    });
  };

  useEffect(() => {
    // Fetch hobbies from your backend
    axios.get('https://myeventz.es/categorias/find_all')
      .then(response => {
        setHobbies(response.data);
      })
      .catch(error => {
        console.error('Error fetching hobbies:', error);
      });
  }, []);

  const toggleHobbySelection = (hobby) => {
    setSelectedHobbies(prevSelectedHobbies => {
      if (prevSelectedHobbies.includes(hobby.id_categoria)) {
        return prevSelectedHobbies.filter(item => item !== hobby.id_categoria);
      } else {
        return [...prevSelectedHobbies, hobby.id_categoria];
      }
    });
  };

  const continueToRegister4 = () => {
    // Concatenar los datos recibidos con los nuevos datos
    const updatedRegistrationData = {
      ...registrationData,
      hobbies: selectedHobbies
    };

    navigation.navigate("Register4", { registrationData: updatedRegistrationData });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../../assets/MyEventz.png")} style={styles.logo} resizeMode="contain"/>
      <Text style={styles.header}>Selecciona al menos 3 hobbies y categorías que sean de tu interés.</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Busca hobbies y categorías..."
        placeholderTextColor="#ccc"
        onChangeText={setSearchText}
        value={searchText}
      />
      
      <View style={styles.hobbiesContainer}>
        <ScrollView contentContainerStyle={styles.hobbiesScroll}>
          {hobbies.filter(hobby => hobby.categoria.toLowerCase().includes(searchText.toLowerCase())).map(hobby => (
            <TouchableOpacity
              key={hobby.id_categoria}
              style={[
                styles.hobbyTag,
                selectedHobbies.includes(hobby.id_categoria) && styles.selectedHobbyTag
              ]}
              onPress={() => toggleHobbySelection(hobby)}
            >
              <Text style={styles.hobbyText}>{hobby.categoria}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={() => {
        if (selectedHobbies.length >= 3) {
          sendVerificationEmail(registrationData.email);
          continueToRegister4();
          console.log("Selected hobbies:", selectedHobbies);
        } else {
          alert("Por favor, selecciona al menos 3 hobbies.");
        }
      }}>
        <Text style={styles.buttonText}>Crear Cuenta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Volver Al Inicio de Sesión</Text>
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
    backgroundColor: "#000",
  },
  logo: {
    width: "100%",
    maxHeight: "20%",
    marginBottom: -10,
  },
  header: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
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
  },
  hobbiesContainer: {
    height: 310, // Altura fija para el contenedor de hobbies
    width: "100%",
    backgroundColor: "#333",
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#5f5fc4",
  },
  hobbiesScroll: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  hobbyTag: {
    backgroundColor: "#444",
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  selectedHobbyTag: {
    backgroundColor: "#6200ee",
  },
  hobbyText: {
    color: "#fff",
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 25,
    width: "60%",
    alignItems: "center",
    margin: 20,
    shadowColor: "#000",
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
    fontWeight: "bold",
  },
  linkText: {
    color: "#BB86FC",
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default Register3;