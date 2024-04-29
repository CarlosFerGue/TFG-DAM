import React from "react";
import { Text, StyleSheet } from "react-native";
import theme from '../theme.js';

const styles = StyleSheet.create({
    text: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.body,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.normal
    },
    bold: {
        fontWeight: theme.fontWeights.bold
    },
    blue: {
        color: "#09f",
    },
    big: {
        fontSize: 20,
    },
    small: {
        fontSize: 8,
    }
});


export default function StyledText({ bold, blue, big, small, children }) {
    const textStyles = [
        styles.text,
        blue && styles.blue,
        big && styles.big,
        small && styles.small,
        bold && styles.bold
    ]
    return (
        <Text style={textStyles}>
            {children}
        </Text>
    )
}