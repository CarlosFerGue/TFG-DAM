import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth, applyActionCode } from 'firebase/auth';

const EmailVerificationScreen = ({ navigation }) => {
  const [code, setCode] = useState('');
  const auth = getAuth();

  const verifyCode = () => {
    applyActionCode(auth, code).then(() => {
      Alert.alert("Verificación", "Tu correo ha sido verificado correctamente!", [
        { text: "OK", onPress: () => navigation.navigate("HomeScreen") }
      ]);
    }).catch((error) => {
      Alert.alert("Error de verificación", error.message);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Verificar Correo Electrónico</Text>
      <Text style={styles.instructions}>
        Ingresa el código de verificación que hemos enviado a tu correo electrónico.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Código de Verificación"
        onChangeText={setCode}
        value={code}
      />
      <TouchableOpacity onPress={verifyCode} style={styles.button}>
        <Text style={styles.buttonText}>Verificar Correo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EmailVerificationScreen;
