import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Asegúrate de importar esto si estás utilizando React Navigation
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NavBar = ({ navigate }) => {
  const [id_usuario, setUserId] = useState(null);
  const navigation = useNavigation(); // Obtener el objeto de navegación
  const [usuarioJson, setUsuarioInfo] = useState({});

  // Función para manejar la navegación a diferentes pantallas
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const navigateToUsuario = (id_usuario) => {
    navigation.navigate("Perfil", { id_usuario });
  };
  //Recuperamos el id_usuario

  // Recuperar userId desde AsyncStorage y obtener datos del usuario
  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await fetch(
          `https://myeventz.es/usuarios/find_by_id_REAL/${userId}`
        );
        const data = await response.json();
        setUsuarioInfo(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const retrieveUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
          fetchUserData(storedUserId);
        }
      } catch (error) {
        console.error("Error retrieving userId from AsyncStorage:", error);
      }
    };

    retrieveUserId();
  }, []);

  return (
    <View style={styles.background}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.iconContainer}
      >
        {/* <Image source={require('./ruta/al/Icono1.svg')} style={styles.icon} /> */}
        <Ionicons name="home" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Categorias")}
        style={styles.iconContainer}
      >
        <Ionicons name="pricetags" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("CrearEvento")}
        style={styles.iconContainer}
      >
        <Ionicons name="add-circle" size={35} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("BuscarUsuarios")}
        style={styles.iconContainer}
      >
        <Ionicons name="person-add" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        //onPress={() => navigation.navigate("Perfil")}
        onPress={() => navigateToUsuario(id_usuario)}
        style={styles.iconContainer}
      >
        <Image
          source={{
            uri: usuarioJson.img_url,
          }}
          style={styles.perfil}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: 60,
    backgroundColor: "#100916",
    position: "absolute",
    bottom: 0,
    flexDirection: "row", // Alinea los iconos en una fila
    justifyContent: "space-around", // Espacio uniformemente los iconos en la fila
    alignItems: "center", // Centra los iconos verticalmente
    borderTopColor: "white",
    borderTopWidth: 2,
  },
  iconContainer: {
    flex: 1, // Divide el espacio disponible igualmente entre los iconos
    alignItems: "center", // Centra el ícono dentro del contenedor
  },
  icon: {
    width: 30,
    height: 30,
  },
  perfil: {
    width: 30,
    height: 30,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "white",
  },
});

export default NavBar;
