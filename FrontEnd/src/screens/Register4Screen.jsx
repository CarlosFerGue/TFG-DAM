import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { storage } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register4 = ({ route, navigation }) => {
  const { registrationData } = route.params;
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [code, setCode] = useState('');

  const verifyEmailCode = async () => {
    const registrationDataWithProfileImageUrl = {...registrationData, profileImageUrl };
    const email = registrationData.email;
    console.log(registrationDataWithProfileImageUrl);
    console.log(profileImageUrl)
    try {
      const response = await axios.post('https://myeventz.es/verify_code', { email, code, registrationDataWithProfileImageUrl }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = response.data;
      if (json.success) {
        uploadImage(registrationData.profileImageUri);
        alert('Email verified successfully!');
        await AsyncStorage.setItem('userToken', json.token);
        console.log('User token:', json.token);
        const storedToken = await AsyncStorage.getItem('userToken');
        console.log('Stored token:', storedToken);
        navigation.navigate('Home');
      } else {
        alert('Failed to verify code. Please check the code and try again.');
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profileImages/${new Date().toISOString()}`);
      const snapshot = await uploadBytes(storageRef, blob);
      console.log('Imagen subida con éxito');
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('URL de la imagen:', downloadURL);
      setProfileImageUrl(downloadURL);
      const token = await AsyncStorage.getItem('userToken'); // Esperar correctamente por el token
      if (!token) {
        throw new Error('No se encontró el token de usuario en AsyncStorage');
      }
  
      await axios.post('https://myeventz.es/update_profile_image', { profileImageUrl: downloadURL, token }, {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Perfil actualizado con la nueva URL de la imagen');
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };
  

  return (
    <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter Verification Code"
          onChangeText={setCode}
          value={code}
        />
        <Button title="Verify Code" onPress={verifyEmailCode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: 'blue',
    marginTop: 10,
  }
})

export default Register4;
