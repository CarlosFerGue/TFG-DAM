import Main from './src/components/Main.jsx';
import React, { useEffect } from 'react';
import { SplashScreen } from 'expo-splash-screen';

export default function App() {

  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync(); // Oculta el splash screen después de 2 segundos
    }, 60000); 
  }, []);
}