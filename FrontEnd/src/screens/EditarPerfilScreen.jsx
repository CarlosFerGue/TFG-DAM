import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import NavBar from "../components/NavBar";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import CategoriasTarjeta from "../components/Categorias";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditarPerfil = ({ navigation }) => {
  const route = useRoute();
  const [usuarioJson, setUsuarioInfo] = useState({});
  const [nombre, setNombre] = useState("");
  const [apel1, setApel1] = useState("");
  const [apel2, setApel2] = useState("");
  const [bio, setBio] = useState("");
  const [img_url, setImgUrl] = useState("");
  const [tt, setTt] = useState("");
  const [ig, setIg] = useState("");
  const [fb, setFb] = useState("");
  const [x, setX] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [id_usuario, setUserId] = useState(null);
  const [categoriasJson, setCategoriasJson] = useState([]);

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await fetch(
          `https://myeventz.es/usuarios/find_by_id_REAL/${userId}`
        );
        const data = await response.json();
        setUsuarioInfo(data);
        setNombre(data.nombre);
        setApel1(data.apel1);
        setApel2(data.apel2);
        setBio(data.bio);
        setImgUrl(data.img_url);
        setTt(data.tt);
        setIg(data.ig);
        setFb(data.fb);
        setX(data.x);
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

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("https://myeventz.es/categorias/find_all");
        const data = await response.json();
        setCategoriasJson(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategorias();
  }, []);

  const enviarDatos = async () => {
    setIsLoading(true);
    setError(null);
  
    try {
      const url = `https://myeventz.es/usuarios/edit/?id=${id_usuario}&nombre=${encodeURIComponent(nombre)}&apel1=${encodeURIComponent(apel1)}&apel2=${encodeURIComponent(apel2)}&bio=${encodeURIComponent(bio)}&img_url=${encodeURIComponent(img_url)}&tt=${encodeURIComponent(tt)}&ig=${encodeURIComponent(ig)}&fb=${encodeURIComponent(fb)}&x=${encodeURIComponent(x)}`;
      const response = await fetch(url);
  
      if (response.status === 200) {
        setIsLoading(false);
        navigation.navigate("Perfil", { id_usuario: id_usuario });
      } else {
        setIsLoading(false);
        setError("Error al actualizar los datos. Inténtalo de nuevo.");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Error al actualizar los datos. Inténtalo de nuevo.");
    }
  };
  

  return (
    <Background>
      <View style={styles.guardar}>
        <TouchableOpacity
          style={styles.volver}
          onPress={() => navigation.navigate("Perfil")}
        >
          <Ionicons name="arrow-undo" size={24} color="white" />
          <Text style={styles.TextClicableB}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.guardarBoton} onPress={enviarDatos}>
          <Text style={[styles.TextClicableB, { paddingHorizontal: 20 }]}>
            GUARDAR
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.container2}>
          <Image source={{ uri: usuarioJson.img_url }} style={styles.imagen} />

          <Text style={[styles.TextClicableM, { marginBottom: 35 }]}>
            Cambiar imagen de perfil
          </Text>

          <View style={styles.opcionesPerfil}>
            <View style={styles.auxContainer}>
              <Text style={styles.titulo}>Nombre</Text>
              <TextInput
                style={styles.inputs}
                value={nombre}
                onChangeText={setNombre}
                placeholderTextColor="#ccc"
              />
            </View>
          </View>

          <View style={styles.opcionesPerfil}>
            <View style={styles.auxContainer}>
              <Text style={styles.titulo}>Apellido 1</Text>
              <TextInput
                style={styles.inputs}
                value={apel1}
                onChangeText={setApel1}
                placeholderTextColor="#ccc"
              />
            </View>
          </View>

          <View style={styles.opcionesPerfil}>
            <View style={styles.auxContainer}>
              <Text style={styles.titulo}>Apellido 2</Text>
              <TextInput
                style={styles.inputs}
                value={apel2}
                onChangeText={setApel2}
                placeholderTextColor="#ccc"
              />
            </View>
          </View>

          <View style={styles.opcionesPerfil}>
            <View style={styles.auxContainer}>
              <Text style={[styles.titulo]}>Biografia</Text>
              <TextInput
                style={[
                  styles.inputs,
                  { height: 100, textAlignVertical: "top" },
                ]}
                value={bio}
                onChangeText={setBio}
                placeholderTextColor="#ccc"
                multiline={true}
              />
            </View>
          </View>

          <View style={styles.hobbies}>
            <Text style={[styles.cabecera, { left: -35 }]}>
              Muestra tus hobbies e intereses
            </Text>

            <TouchableOpacity style={styles.searchIconContainer}>
              <TextInput
                style={styles.inputHobbies}
                placeholder="Buscar hobbies..."
                placeholderTextColor="#ccc"
              />
              <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.contenedorCategorias}>
              <ScrollView
                style={styles.containerAux2}
                nestedScrollEnabled={true}
              >
                <View style={styles.listaCategorias}>
                  {categoriasJson.map((item) => (
                    <TouchableOpacity
                      key={item.id_categoria}
                      onPress={() => navigation.addCategoria(item.categoria)}
                      style={styles.categoriaCard}
                    >
                      <CategoriasTarjeta categoria={item} />
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>

          <Text style={[styles.cabecera, { marginBottom: 15, fontSize: 35 }]}>
            Tus Redes sociales
          </Text>

          <View style={styles.opcionesPerfil}>
            <View style={styles.auxContainer}>
              <Ionicons name="logo-tiktok" size={24} color="white" />
              <TextInput
                style={styles.inputs}
                value={tt}
                onChangeText={setTt}
                placeholderTextColor="#ccc"
              />
            </View>
          </View>

          <View style={styles.opcionesPerfil}>
            <View style={styles.auxContainer}>
              <Ionicons name="logo-instagram" size={24} color="white" />
              <TextInput
                style={styles.inputs}
                value={ig}
                onChangeText={setIg}
                placeholderTextColor="#ccc"
              />
            </View>
          </View>

          <View style={styles.opcionesPerfil}>
            <View style={styles.auxContainer}>
              <Ionicons name="logo-facebook" size={24} color="white" />
              <TextInput
                style={styles.inputs}
                value={fb}
                onChangeText={setFb}
                placeholderTextColor="#ccc"
              />
            </View>
          </View>

          <View style={[styles.opcionesPerfil, { marginBottom: 35 }]}>
            <View style={styles.auxContainer}>
              <Text style={styles.titulo}>X</Text>
              <TextInput
                style={styles.inputs}
                value={x}
                onChangeText={setX}
                placeholderTextColor="#ccc"
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <NavBar />
    </Background>
  );
};

const styles = StyleSheet.create({
  guardar: {
    paddingTop: Constants.statusBarHeight,
    width: "100%",
    height: 80,
    backgroundColor: "#100916",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    paddingHorizontal: 25,
  },
  volver: {
    flexDirection: "row",
    alignItems: "center",
  },
  guardarBoton: {
    backgroundColor: "#6200ee",
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  TextClicableB: {
    color: "white",
    fontSize: 15,
    padding: 5,
    fontWeight: "bold",
  },
  TextClicableM: {
    fontSize: 20,
    color: "#8000FF",
    textDecorationLine: "underline",
    fontWeight: "bold",
    textAlign: "center",
    top: 10,
  },
  container: {
    padding: 12,
    marginBottom: 50,
    height: "100%",
    width: "100%",
  },
  container2: {
    height: "100%",
    width: "100%",
    alignContent: "center",
    alignItems: "center",
  },
  imagen: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  opcionesPerfil: {
    width: "100%",
    alignContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 22,
    color: "white",
    textAlign: "start",
    fontWeight: "bold",
  },
  inputs: {
    width: 235,
    borderBottomColor: "#8000FF",
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    backgroundColor: "#1E1E1E",
    fontSize: 15,
    color: "#ccc",
  },
  auxContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hobbies: {
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  cabecera: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  listaCategorias: {
    width: "100%",
    flexDirection: "row",
    overflow: "scroll",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  categoriaCard: {
    marginBottom: 20,
  },
  contenedorCategorias: {
    width: "100%",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 15,
    height: 200,
  },
  containerAux2: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    padding: 10,
  },
  searchIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    right: 10,
    top: 12,
  },
  inputHobbies: {
    width: "80%",
    color: "white",
    height: 50,
    padding: 8,
    fontSize: 17,
    borderBottomColor: "white",
    borderWidth: 2,
  },
});

export default EditarPerfil;
