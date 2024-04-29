import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StyledText from './StyledText';

const RepositoryItem = (props) => (
    <View key={props.id} style={styles.container}>
        <StyledText bold blue big>FullName: {props.fullName}</StyledText>
        <StyledText blue>Description: {props.description}</StyledText>
        <StyledText big>Language: {props.language}</StyledText>
        <StyledText small>Forks: {props.forksCount}</StyledText>
        <StyledText small>Stars: {props.stargazersCount}</StyledText>
        <StyledText small>Rating: {props.ratingAverage}</StyledText>
        <StyledText small>Reviews: {props.reviewCount}</StyledText>
        <StyledText small>Avatar: {props.ownerAvatarUrl}</StyledText>
    </View>
);


const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 5,
        paddingTop: 5,
        marginBottom: 20
    }
});


export default RepositoryItem;