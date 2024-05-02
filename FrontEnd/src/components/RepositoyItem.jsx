import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StyledText from './StyledText';
import theme from '../theme';


const parseThousands = (value) => {
    return value >= 1000 ? `${Math.round(value/100) / 10}k` : String(value);
}

const RepositoryStats = (props) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View>
                <StyledText align='center' fontWeight='bold'>Forks:</StyledText> 
                <StyledText align='center'>{parseThousands(props.forksCount)}</StyledText>
            </View>
            <View>
                <StyledText align='center' fontWeight='bold'>Stars:</StyledText> 
                <StyledText align='center'>{parseThousands(props.stargazersCount)}</StyledText>
            </View>
            <View>
                <StyledText align='center' fontWeight='bold'>Rating:</StyledText> 
                <StyledText align='center'>{props.ratingAverage}</StyledText>
            </View>
            <View>
                <StyledText align='center' fontWeight='bold'>Reviews:</StyledText> 
                <StyledText align='center'>{parseThousands(props.reviewCount)}</StyledText>
            </View>
        </View>
    )
};

const RepositoryItem = (props) => (
    <View key={props.id} style={styles.container}>
        <StyledText fontSize="subheading" fontWeight="bold">{props.fullName}</StyledText>
        <StyledText >{props.description}</StyledText>
        <StyledText style={styles.language}>{props.language}</StyledText>
        <RepositoryStats {...props} />
    </View>
);


const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 5,
        paddingTop: 5,
        marginBottom: 20
    },
    language: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        alignSelf: 'flex-end',
        padding: 4
    }
});


export default RepositoryItem;