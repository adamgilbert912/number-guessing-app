import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, ScrollView , KeyboardAvoidingView, Dimensions} from 'react-native';

import Colors from '../Constants/Colors'
import Card from '../Components/Card'
import Input from '../Components/Input'
import NumberContainer from '../Components/NumberContainer'
import TitleText from '../Components/TitleText'


const NumberScreen = props => {

    const [inputValue, setInputValue] = useState('')
    const [enteredNumber, setEnteredNumber] = useState()
    const [submitted, setSubmitted] = useState(false)
    const [textInputMargin, setTextInputMargin] = useState(Dimensions.get('window').height > Dimensions.get('window').width ? '5%' : '2%')

    const setTextInputMarginHandler = () => {
        if (Dimensions.get('window').height > Dimensions.get('window').width) {
            setTextInputMargin('5%')
        } else {
            console.log('changing margin')
            setTextInputMargin('2%')
        }
    }

    useEffect(() => {
        const setTextInputMarginHandler = () => {
            if (Dimensions.get('window').height > Dimensions.get('window').width) {
                setTextInputMargin('5%')
            } else {
                console.log('changing margin')
                setTextInputMargin('2%')
            }
        }

        Dimensions.addEventListener('change', setTextInputMarginHandler)

        return (
            () => {
                Dimensions.removeEventListener('change', setTextInputMarginHandler)
            }
        )
    })

    const setInputValueHandler = value => {
        setInputValue(value.replace(/[^0-9]/g, ''))
    }

    const resetInputValueHandler = () => {
        setInputValue('')
        setSubmitted(false)
    }

    const removeKeyBoardHandler = () => {
        Keyboard.dismiss()
    }

    const submitInputValueHandler = () => {
        const number = parseInt(inputValue)

        if (isNaN(number) || number <= 0 || number >= 100) {
            Alert.alert('Number not Valid!', 'Only numbers 1 thrugh 99 are allowed.', [{ text: 'Okay', style: 'cancel', onPress: resetInputValueHandler }])
            return
        }
        removeKeyBoardHandler()
        setEnteredNumber(number)
        setSubmitted(true)
    }

    let submittedFeedback;

    if (submitted) {
        submittedFeedback = (
            <Card style={styles.numberCard}>
                <NumberContainer buttonTitle='Start Game!' hasButton={true} title='You Selected:' onPress={() => props.onStartGame(enteredNumber)}>{enteredNumber}</NumberContainer>
            </Card>
        )
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={55}>
            <TouchableWithoutFeedback onPress={removeKeyBoardHandler}>
                <View style={styles.container}>
                    <Card style={styles.startCard}>
                        <View style={styles.cardContainer}>
                            <TitleText style={styles.text}>Let's Play!</TitleText>
                            <Input
                                style={{width: '80%', marginVertical: textInputMargin}}
                                placeholder='Enter a Number'
                                placeholderTextColor='grey'
                                maxLength={2}
                                blurOnSubmit={true}
                                keyboardType='number-pad'
                                onChangeText={setInputValueHandler}
                                value={inputValue}
                            />
                            <View style={styles.buttonView}>
                                <View style={styles.button}><Button title='Submit' color={Colors.primary} onPress={submitInputValueHandler} /></View>
                                <View style={styles.button}><Button title='Cancel' color={Colors.secondary} onPress={resetInputValueHandler} /></View>
                            </View>
                        </View>
                    </Card>
                    {submittedFeedback}
                </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },

    startCard: {
        maxWidth: '95%',
        width: Dimensions.get('window').width > 350 ? '90%' : '95%',
        minHeight: 160,
        paddingBottom: Dimensions.get('window').height > 600 ? undefined : 20,
    },

    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%'

    },
    button: {
        width: '30%',
    },

    numberCard: {
        alignItems: 'center',
        minWidth: '60%',
        maxHeight: '30%',
        minHeight: 165
    }
})

export default NumberScreen;