import React from "react";
import Constants from "expo-constants";
import Background from "./Background"; // Asegúrate de que la ruta de importación es correcta
import { View, Text } from "react-native";
import Login from "./Login";

const Main = () => {
  return (
    <Background>
      <Login/>
    </Background>
  );
};

export default Main;
//rolleado pto
