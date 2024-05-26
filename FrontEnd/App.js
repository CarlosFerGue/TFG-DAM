import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "./src/screens/LoginScreen.jsx";
import Register1 from "./src/screens/Register1Screen.jsx";
import Register2 from "./src/screens/Register2Screen.jsx";
import PassOlvidada from "./src/screens/PassOlvidadaScreen.jsx";
import Home from "./src/screens/HomeScreen.jsx";
import Categorias from "./src/screens/CategoriasSceen.jsx";
import Evento from "./src/screens/EventoScreen.jsx";
import Register3 from "./src/screens/Register3Screen.jsx";
import Register4 from "./src/screens/Register4Screen.jsx";
import BuscarUsuarios from "./src/screens/BuscarUsuariosScreen.jsx";
import Usuario from "./src/screens/UsuarioScreen.jsx";
import Perfil from "./src/screens/PerfilScreen.jsx";
import EditarPerfil from "./src/screens/EditarPerfilScreen.jsx";
import axios from "axios";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      console.log('User token desde app:', token);
      setUserToken(token);
      setIsLoading(false);
      await SplashScreen.hideAsync();
    };

    checkToken();
  }, []);

  if (isLoading) {
    return null; // O puedes mostrar una pantalla de carga
  }

  const getUserId = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.get(`https://myeventz.es/usuarios/load_profile/${token}`);
    const userId = response.data.id_usuario;
    return userId;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={userToken ? 'Home' : 'Login'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register1" component={Register1} />
        <Stack.Screen name="Register2" component={Register2} />
        <Stack.Screen name="Register3" component={Register3} />
        <Stack.Screen name="Register4" component={Register4} />
        <Stack.Screen name="PassOlvidada" component={PassOlvidada} />
        <Stack.Screen name="Home" component={Home} initialParams={{ getUserId }} />
        <Stack.Screen name="Categorias" component={Categorias} />
        <Stack.Screen name="Evento" component={Evento} />
        <Stack.Screen name="BuscarUsuarios" component={BuscarUsuarios} />
        <Stack.Screen name="Usuario" component={Usuario} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfil} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
