import Background from "../components/Background";
import NavBar from "../components/NavBar";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from '@expo/vector-icons'; // Importa el ícono de la lupa desde Ionicons
import theme from "../theme";

import slidesH from "../slidesHomeH";
import slidesV from "../slidesHomeV";

import HomeScreenSlideH from "../components/HomeScreenSlideH";
import HomeScreenSlideV from "../components/HomeScreenSlideV";

const Home = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Buscar eventos..."
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity style={styles.searchIconContainer}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Slider horizontal de Eventos populares */}
        <Text style={styles.subtitulo}>Eventos populares:</Text>
        <View style={styles.sliderH}>
          <FlatList
            data={slidesH}
            renderItem={({ item }) => <HomeScreenSlideH item={item} />}
            horizontal
            bounces={true}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Slider vertical de Publicaciones recientes */}
        <Text style={styles.subtitulo2}>Publicaciones recientes:</Text>
        <View style={styles.sliderV}>
          <FlatList
            data={slidesV}
            renderItem={({ item }) => <HomeScreenSlideV item={item} />}
            bounces={true}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      {/* Aqui metemos la navBar que sera un componente externo */}
      <NavBar/>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    padding: 12,
    display: "flex",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: "white",
    top: -30,
  },
  sliderH: {
    flex: 0.25,
    paddingTop: 10,
  },
  sliderV: {
    flex: 0.75,
    paddingTop: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  subtitulo: {
    fontSize: 25,
    fontWeight: "bold",
    color: theme.colors.white,
    paddingLeft: 5,
    top: 4,
  },
  subtitulo2: {
    fontSize: 25,
    fontWeight: "bold",
    color: theme.colors.white,
    paddingLeft: 5,
    top: 14,
  },
  inputText: {
    fontSize: 20,
    color: theme.colors.white,
    bottom: 4,
    marginBottom: 4,
  },
  inputs: {
    flex: 1,
    color: "white",
    height: 50,
    padding: 8,
    fontSize: 17,
  },
  searchIconContainer: {
    padding: 10,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 18,
    width: "80%",
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
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Home;
