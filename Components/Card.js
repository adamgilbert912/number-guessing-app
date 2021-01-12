import React from 'react';
import {StyleSheet, View} from 'react-native'

const Card = props => {
    return (
        <View style={{...styles.container, ...props.style}}>{props.children}</View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginVertical: '5%',
        height: '35%',
        shadowColor: 'black',
        backgroundColor: 'white',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 6,
        borderRadius: 5,
        elevation: 8,
        minWidth: '50%'
    }
})

export default Card;