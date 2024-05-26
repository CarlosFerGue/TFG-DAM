import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Asegúrate de importar esto si estás utilizando React Navigation
import { Ionicons } from "@expo/vector-icons";

const NavBar = ({ navigate }) => {
  const navigation = useNavigation(); // Obtener el objeto de navegación

  // Función para manejar la navegación a diferentes pantallas
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const navigateToUsuario = (id_usuario) => {
    navigation.navigate("Perfil", { id_usuario });
  };

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
        onPress={() => navigation.navigate("AnadirEvento")}
        style={styles.iconContainer}
      >
        <Ionicons name="add-circle" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("BuscarUsuarios")}
        style={styles.iconContainer}
      >
        <Ionicons name="person-add" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        //onPress={() => navigation.navigate("Perfil")}
        onPress={() => navigateToUsuario(2)}
        style={styles.iconContainer}
      >
        <Image
          source={require("../../assets/foczy.png")}
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
