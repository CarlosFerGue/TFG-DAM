import React from "react";
import { ImageBackground, StyleSheet } from 'react-native';

const Background = ({ children }) => {
    return (
        <ImageBackground style={styles.background} source={require('../../assets/bg.png')}>
            {children}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%'
    }
});

export default Background;