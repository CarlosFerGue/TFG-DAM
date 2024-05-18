import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const Register3 = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const sendVerificationEmail = async () => {
    try {
      const response = await axios.post('https://myeventz.es/send_verification', { email }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = response.data;
      if (json.success) {
        alert('Verification code sent to your email.');
        setCodeSent(true);
      } else {
        alert('Failed to send verification code.');
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const verifyEmailCode = async () => {
    console.log(JSON.stringify({ email, code }));
    console.log('email:', email);
    try {
      const response = await axios.post('https://myeventz.es/verify_code', { email, code }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = response.data;
      if (json.success) {
        alert('Email verified successfully!');
        navigation.navigate('Home');
      } else {
        alert('Failed to verify code. Please check the code and try again.');
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Your Email Address"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <Button title="Send Verification Code" onPress={sendVerificationEmail} />

      {codeSent && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter Verification Code"
            onChangeText={setCode}
            value={code}
          />
          <Button title="Verify Code" onPress={verifyEmailCode} />
        </>
      )}
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

export default Register3;
