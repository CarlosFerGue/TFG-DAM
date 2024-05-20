import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './src/screens/LoginScreen.jsx';
import Register1 from './src/screens/Register1Screen.jsx';
import Register2 from './src/screens/Register2Screen.jsx';
import PassOlvidada from './src/screens/PassOlvidadaScreen.jsx';
import Home from './src/screens/HomeScreen.jsx';
import Categorias from './src/screens/CategoriasSceen.jsx';
import Evento from './src/screens/EventoScreen.jsx';
import Register3 from './src/screens/Register3Screen.jsx';
import Register4 from './src/screens/Register4Screen.jsx';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn);

const App = () => {
  const [initialRoute, setInitialRoute] = useState('Login');

  useEffect(() => {
    const checkToken = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        setInitialRoute('Home');
      }
      await SplashScreen.hideAsync();
    };

    checkToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
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
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Categorias" component={Categorias} />
        <Stack.Screen name="Evento" component={Evento} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
