import React from 'react'
import {
    View, Text, StyleSheet, TouchableOpacity, Dimensions,
    Platform, TouchableNativeFeedback
} from 'react-native'

import Colors from '../Constants/Colors'

const MainButton = props => {

    let ButtonFeedback = TouchableOpacity

    if (Platform.OS === "android" && Platform.Version >= 21) {
        ButtonFeedback = TouchableNativeFeedback
    }

    return (
        <View style={styles.butttonContainer}>
            <ButtonFeedback activeOpacity={0.5} onPress={props.onPress}>
                <View style={{ ...styles.button, ...props.style }}>
                    <Text style={styles.text}>{props.title}</Text>
                </View>
            </ButtonFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    butttonContainer: {
        borderRadius: 20,
        overflow: 'hidden'
    },

    button: {
        backgroundColor: Colors.primary,
        width: Dimensions.get('window').width > 350 ? 160 : 140,
        height: Dimensions.get('window').height > 600 ? 45 : 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'white'
    }
})

export default MainButton;