import React from 'react';
import {TextInput, StyleSheet} from 'react-native'

const Input = props => {
    return (
        <TextInput {...props} style={{...styles.input, ...props.style}}/>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'lightgrey',
        borderColor: 'black',
        borderWidth: 2,
        padding: '2%',
        textAlign: 'center'
    }
})

export default Input;