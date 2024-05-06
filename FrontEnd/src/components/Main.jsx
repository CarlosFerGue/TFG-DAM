import React from 'react';
import Constants from 'expo-constants';
import Background from './Background';  // Asegúrate de que la ruta de importación es correcta
import { View, Text } from 'react-native';

const Main = () => {
    return (
        <Background>
            <View style={{marginTop: Constants.statusBarHeight, flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#fff', fontSize: 24}}>Main</Text>
            </View>
        </Background>
    );
};

export default Main;
//rolleado pto
