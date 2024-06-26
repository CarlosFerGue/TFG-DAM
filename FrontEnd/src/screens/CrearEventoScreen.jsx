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
  Alert,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import theme from "../theme";
import CategoriasTarjeta from "../components/Categorias";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";


const CrearEvento = ({ navigation }) => {
  const [id_usuario, setUserId] = useState(null);
  const [eventImg, setEventImg] = useState(null);
  const [eventUri, setEventUri] = useState('');
  const [categoriasJson, setCategoriasJson] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [formData, setFormData] = useState({
    id_usuario: null,
    titulo: "",
    fecha: "",
    hora: "",
    descripcion: "",
    edad_min: 0,
    edad_max: 0,
    ubicacion: "",
    participantesMax: 0,
    img_url: "",
    categorias: [],
  });

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `eventsImages/${new Date().toISOString()}`);
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setEventImg(downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
      setEventUri(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const retrieveUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
          setFormData((prevFormData) => ({
            ...prevFormData,
            id_usuario: storedUserId,
          }));
        }
      } catch (error) {
        console.error("Error retrieving userId from AsyncStorage:", error);
      }
    };
    retrieveUserId();
  }, []);

  const enviarEvento = async () => {
    const imageUrl = await uploadImage(eventUri);
    try {
      const dataToSend = {
        ...formData,
        img_url: imageUrl,
        edad_min: Number(formData.edad_min),
        edad_max: Number(formData.edad_max),
        participantesMax: Number(formData.participantesMax),
        categorias: categoriasSeleccionadas,
      };
      const response = await fetch("https://myeventz.es/eventos/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      console.log("Datos enviados: ", JSON.stringify(dataToSend));
      navigation.navigate("Perfil", { id_usuario: id_usuario });
    } catch (error) {
      console.error("Error al enviar el evento:", error);
    }
  };

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

  const handleCategoriaPress = (categoria) => {
    setCategoriasSeleccionadas((prev) => {
      if (prev.includes(categoria)) {
        return prev.filter((item) => item !== categoria);
      } else {
        if (prev.length < 5) {
          return [...prev, categoria];
        } else {
          Alert.alert(
            "Límite alcanzado",
            "Solo puedes seleccionar hasta 5 categorías.",
            [{ text: "Entendido" }]
          );
          return prev;
        }
      }
    });
  };

  const filteredCategorias = categoriasJson.filter((item) =>
    item.categoria.toLowerCase().includes(searchText.toLowerCase())
  );

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [text, setText] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    setText(currentDate.toLocaleDateString());
    setFormData((prevFormData) => ({
      ...prevFormData,
      fecha: currentDate.toLocaleDateString(),
    }));
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <Background>
      <ScrollView>
        <View style={styles.container}>
          <Text style={[styles.cabecera]}>Publicar un evento:</Text>
          <TextInput
            style={styles.inputs}
            placeholder="Título del evento..."
            placeholderTextColor="#ccc"
            maxLength={23}
            onChangeText={(text) => setFormData({ ...formData, titulo: text })}
          />

          <View style={styles.auxContainer}>
            <TextInput
              style={[styles.inputs, { width: "45%" }]}
              placeholder="Fecha..."
              placeholderTextColor="#ccc"
              value={text}
              editable={false}
            />
            <TouchableOpacity onPress={showDatePicker}>
              <Ionicons
                name="calendar"
                size={30}
                color="white"
                style={{ top: 2, left: -40 }}
              />
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
                minimumDate={new Date()}
              />
            )}
          </View>

          <View style={styles.hora}>
            <Text style={[styles.subcabecera, { top: 5, marginRight: 5 }]}>
              Hora
            </Text>
            <TextInput
              style={[
                styles.inputs,
                { width: 37, textAlign: "center", justifyContent: "center" },
              ]}
              placeholder="HH"
              placeholderTextColor="#ccc"
              onChangeText={(text) => setFormData({ ...formData, hora: text })}
            />
            <Text style={[styles.subcabecera, { top: 5, marginHorizontal: 5 }]}>
              :
            </Text>
            <TextInput
              style={[
                styles.inputs,
                { width: 44, textAlign: "center", justifyContent: "center" },
              ]}
              placeholder="MM"
              placeholderTextColor="#ccc"
              onChangeText={(text) =>
                setFormData({ ...formData, hora: formData.hora + ":" + text })
              }
            />
          </View>

          <TextInput
            style={[styles.inputs, { height: 100, textAlignVertical: "top" }]}
            placeholderTextColor="#ccc"
            placeholder="Descripción de la actividad..."
            multiline={true}
            onChangeText={(text) =>
              setFormData({ ...formData, descripcion: text })
            }
          />

          <View style={styles.hora}>
            <Text style={[styles.subcabecera, { top: 5, marginRight: 5 }]}>
              Rango de edad:
            </Text>
            <TextInput
              style={[
                styles.inputs,
                { width: 50, textAlign: "center", justifyContent: "center" },
              ]}
              placeholder="min."
              placeholderTextColor="#ccc"
              onChangeText={(text) =>
                setFormData({ ...formData, edad_min: text })
              }
            />
            <Text style={[styles.subcabecera, { top: 5, marginHorizontal: 5 }]}>
              hasta
            </Text>
            <TextInput
              style={[
                styles.inputs,
                { width: 50, textAlign: "center", justifyContent: "center" },
              ]}
              placeholder="max."
              placeholderTextColor="#ccc"
              onChangeText={(text) =>
                setFormData({ ...formData, edad_max: text })
              }
            />
          </View>

          <View style={styles.auxContainer}>
            <Text style={styles.textoClicable}>Seleccionar ubicacion </Text>
            <Ionicons
              name="earth"
              size={30}
              color="white"
              style={{ left: 10, textDecorationLine: "none" }}
            />
          </View>

          <View style={styles.hora}>
            <Text style={[styles.subcabecera, { top: 5, marginRight: 5 }]}>
              Límite de participantes:
            </Text>
            <TextInput
              style={[
                styles.inputs,
                { width: 50, textAlign: "center", justifyContent: "center" },
              ]}
              placeholder="NN"
              placeholderTextColor="#ccc"
              onChangeText={(text) =>
                setFormData({ ...formData, participantesMax: text })
              }
            />
          </View>

          <View style={styles.auxContainer}>
            <Text style={styles.textoClicable} onPress={pickImage}>Añade una portada</Text>
            <Ionicons
              name="image"
              size={30}
              color="white"
              style={{ left: 10, textDecorationLine: "none" }}
              onPress={pickImage}
            />
          </View>

          <View style={styles.hobbies}>
            <Text
              style={[
                styles.subcabecera,
                { alignSelf: "flex-start", fontWeight: "bold" },
              ]}
            >
              Seleccionar categorias:
            </Text>

            <View style={styles.searchIconContainer}>
              <TextInput
                style={styles.inputHobbies}
                placeholder="Buscar categorias..."
                placeholderTextColor="#ccc"
                value={searchText}
                onChangeText={setSearchText}
              />
              <Ionicons name="search" size={24} color="white" />
            </View>

            <View style={styles.contenedorCategorias}>
              <ScrollView
                style={styles.containerAux2}
                nestedScrollEnabled={true}
              >
                <View style={styles.listaCategorias}>
                  {filteredCategorias.map((item) => (
                    <TouchableOpacity
                      key={item.id_categoria}
                      onPress={() => handleCategoriaPress(item.categoria)}
                      style={styles.categoriaCard}
                    >
                      <CategoriasTarjeta
                        categoria={item}
                        seleccionada={categoriasSeleccionadas.includes(item.categoria)}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            <TouchableOpacity style={styles.button} onPress={enviarEvento}>
              <Text style={styles.buttonText}>¡PUBLICAR EVENTO!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <NavBar />
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    padding: 12,
    display: "flex",
    bottom: 20,
  },
  cabecera: {
    fontSize: 35,
    fontWeight: "bold",
    color: theme.colors.white,
    marginBottom: 30,
    marginTop: 20,
    textAlign: "center",
  },
  subcabecera: {
    fontSize: 21,
    color: theme.colors.white,
  },
  inputs: {
    width: "100%",
    borderBottomColor: "#8000FF",
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    backgroundColor: "#1E1E1E",
    fontSize: 18,
    color: "#ccc",
  },
  auxContainer: {
    width: "100%",
    flexDirection: "row",
  },
  hora: {
    width: "100%",
    flexDirection: "row",
  },
  hobbies: {
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 10,
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
    marginBottom: 10,
    right: 10,
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
  textoClicable: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  button: {
    marginTop: 20,
    width: "100%",
    height: 50,
    marginBottom: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: "#8000FF",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CrearEvento;
