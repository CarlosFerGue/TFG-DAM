// Background.js
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const Background = ({ children }) => {
  return (
    <LinearGradient
      // Colores y puntos de parada especificados
      colors={['#000547', '#000000', '#000000', '#2E0027']}
      start={{ x: 0, y: 0 }}    // Inicio del gradiente en la esquina superior izquierda
      end={{ x: 1, y: 1 }}      // Fin del gradiente en la esquina inferior derecha
      locations={[0, 0.38, 0.66, 1]}  // Puntos de parada para los colores
      style={styles.background}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    width: width,
    height: height,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default Background;
