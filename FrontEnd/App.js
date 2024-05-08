import React from "react";
import * as SplashScreen from "expo-splash-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "./src/screens/LoginScreen.jsx";
import Register1 from "./src/screens/Register1Screen.jsx";
import Register2 from "./src/screens/Register2Screen.jsx";
import PassOlvidada from "./src/screens/PassOlvidadaScreen.jsx";
import Home from "./src/screens/HomeScreen.jsx";

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
    }, 2000);
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false, // No mostrar la barra de encabezado
          }}
        >
          {/*<Stack.Screen name="Main" component={Main} options={{ headerShown: false }} 
          EN CASO DE QUERER MANTENER LA BARRA DE ENCABEZADO POR SCREENS/>*/}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register1" component={Register1} />
          <Stack.Screen name="Register2" component={Register2} />
          <Stack.Screen name="PassOlvidada" component={PassOlvidada} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
