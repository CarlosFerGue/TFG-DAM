import React from "react";
import * as SplashScreen from "expo-splash-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Linking } from "react-native";

import Login from "./src/screens/LoginScreen.jsx";
import Register1 from "./src/screens/Register1Screen.jsx";
import Register2 from "./src/screens/Register2Screen.jsx";
import PassOlvidada from "./src/screens/PassOlvidadaScreen.jsx";
import Home from "./src/screens/HomeScreen.jsx";
import Categorias from "./src/screens/CategoriasSceen.jsx";
import Evento from "./src/screens/EventoScreen.jsx";
import BuscarUsuarios from "./src/screens/BuscarUsuariosScreen.jsx";
import UsuarioScreen from "./src/screens/UsuarioScreen.jsx";
import Usuario from "./src/screens/UsuarioScreen.jsx";
import Register3 from "./src/screens/Register3Screen.jsx";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn);

export default class App extends React.Component {
  componentDidMount() {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 20);

    // Manejo de enlaces profundos
    const handleOpenURL = (event) => {
      console.log("URL recibida:", event.url);
      // Aquí puedes añadir la lógica para navegar a la pantalla deseada
      // Por ejemplo, podrías extraer un token de la URL y usarlo para navegar
      this.navigator &&
        this.navigator.navigate("Register3", { url: event.url });
    };

    Linking.getInitialURL().then((url) => {
      if (url) {
        handleOpenURL({ url });
      }
    });

    Linking.addEventListener("url", handleOpenURL);

    // Guardar el objeto de navegación para usarlo en handleOpenURL
    this.handleOpenURL = handleOpenURL;
  }

  componentWillUnmount() {
    // Asegurarse de remover el listener al desmontar el componente
    Linking.removeEventListener("url", this.handleOpenURL);
  }

  render() {
    return (
      <NavigationContainer
        ref={(nav) => {
          this.navigator = nav;
        }}
      >
        <Stack.Navigator
          initialRouteName="BuscarUsuarios"
          screenOptions={{
            headerShown: false, // No mostrar la barra de encabezado
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register1" component={Register1} />
          <Stack.Screen name="Register2" component={Register2} />
          <Stack.Screen name="PassOlvidada" component={PassOlvidada} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Categorias" component={Categorias} />
          <Stack.Screen name="Evento" component={Evento} />
          <Stack.Screen name="BuscarUsuarios" component={BuscarUsuarios} />
          <Stack.Screen name="UsuarioScreen" component={UsuarioScreen} />
          <Stack.Screen name="Usuario" component={Usuario} />

          {/*<Stack.Screen name="EmailVerificationScreen" component={EmailVerificationScreen} />*/}
          <Stack.Screen name="Register3" component={Register3} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
