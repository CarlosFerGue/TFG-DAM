import React from 'react';
import Constants from 'expo-constants';
import { Text, View, ImageBackground } from 'react-native';
import Background from './Background'

const Main = () => {
    return (
        <ImageBackground style={{flex: 1}} source={require('../assets/bg.png')}>
            <View style={{marginTop: Constants.statusBarHeight, flexGrow: 1}}>
                <Text>Main</Text>
            </View>
        </ImageBackground>
    )
};

export default Main;