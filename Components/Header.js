import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import Colors from '../Constants/Colors'
import TitleText from '../Components/TitleText'

const Header = props => {
    return (
        <View style={styles.container}>
            <TitleText style={styles.title}>{props.title}</TitleText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get('window').height / 6,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },

    title: {
        fontSize: 26,
        color: 'white'
    }
})

export default Header;