import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "./src/screens/Login.jsx";
import Register1 from "./src/screens/Register1.jsx";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync()
  .then((result) => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
  .catch(console.warn); 

export default class App extends React.Component {
  componentDidMount() {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" 
          screenOptions={{ headerShown: false // No mostrar la barra de encabezado
        }}>
          {/*<Stack.Screen name="Main" component={Main} options={{ headerShown: false }} 
          EN CASO DE QUERER MANTENER LA BARRA DE ENCABEZADO POR SCREENS/>*/}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register1" component={Register1} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}