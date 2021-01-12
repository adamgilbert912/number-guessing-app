import React from 'react';
import { View, Text, StyleSheet, Button, Dimensions} from 'react-native';

import Colors from '../Constants/Colors'
import TitleText from '../Components/TitleText'
import BodyText from '../Components/BodyText'
import MainButton from '../Components/MainButton'

const NumberContainer = props => {

    let button;

    if (props.hasButton) {
        button = <MainButton title={props.buttonTitle} onPress={props.onPress}/>
    }

    return (
        <View style={styles.container}>
            <TitleText style={{...styles.title, ...props.titleStyle}}>{props.title}</TitleText>
            <BodyText style={styles.text}>
                {props.children}
            </BodyText>
            {button}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 22,
        color: Colors.tertiary,
        borderColor: Colors.tertiary,
        borderWidth: 2,
        paddingHorizontal: Dimensions.get('window').width > 350 ? 10 : 8,
        paddingVertical: Dimensions.get('window').height > 600 ? 5 : 2,
        borderRadius: 15,
        margin: Dimensions.get('window').height > 600 ? 15 : 5,
        textAlign: 'center'
    }
})

export default NumberContainer;