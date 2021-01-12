import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Alert, FlatList, Dimensions } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import Card from '../Components/Card'
import NumberContainer from '../Components/NumberContainer'
import Colors from '../Constants/Colors'
import MainButton from '../Components/MainButton'
import BodyText from '../Components/BodyText'

const generateGuess = (min, max, exlude) => {
    const guess = Math.floor(Math.random() * (max - min + 1) + min)

    return guess;
}

const createListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem}><BodyText>Round: {listLength - itemData.index}</BodyText><BodyText>{itemData.item}</BodyText></View>
    )
}



const GameScreen = props => {

    const lowerNumber = useRef(1)
    const higherNumber = useRef(99)

    const [pastGuesses, setPastGuesses] = useState([generateGuess(lowerNumber.current, higherNumber.current, props.userChoice)])
    const [inLandScape, setInLandscape] = useState(Dimensions.get('window').width > Dimensions.get('window').height)

    useEffect(() => {
        const setInLandscapeHandler = () => {
            setInLandscape(Dimensions.get('window').width > Dimensions.get('window').height)
        }

        Dimensions.addEventListener('change', setInLandscapeHandler)

        return (
            () => {
                Dimensions.removeEventListener('change', setInLandscapeHandler)
            }
        )

    })

    const { userChoice, onGameOver } = props

    useEffect(() => {
        if (userChoice === pastGuesses[0]) {
            onGameOver(pastGuesses.length)
        }
    }, [userChoice, pastGuesses, onGameOver])

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && props.userChoice > pastGuesses[0]) || (direction === 'higher' && userChoice < pastGuesses[0])) {
            Alert.alert("Don't Cheat!",
                "Lowkey I know you're number but I'm pretending I don't so work with me",
                [{ text: "Fine...", style: 'cancel' }])

            return;
        }

        if (direction === 'lower') {
            higherNumber.current = pastGuesses[0] - 1
        } else {
            lowerNumber.current = pastGuesses[0] + 1
        }
        setPastGuesses([generateGuess(lowerNumber.current, higherNumber.current), ...pastGuesses])
    }

    if (inLandScape) {
        return (
            <View style={styles.container}>
                <View style={styles.guessContainerLandscape}>
                    <View style={styles.buttonLandscape}>
                        <MainButton
                            style={styles.mainButton1}
                            title={<FontAwesome5 name="less-than" size={23} color="white" />}
                            onPress={() => nextGuessHandler('lower')}
                        />
                    </View>
                    <NumberContainer title="Computer's Guess:">{pastGuesses[0]}</NumberContainer>
                    <View style={styles.buttonLandscape}><MainButton
                        style={styles.mainButton2}
                        title={<FontAwesome5 name="greater-than" size={23} color="white" />}
                        onPress={() => nextGuessHandler('higher')}
                    />
                    </View>
                </View>
                <View style={styles.list}>
                    <FlatList contentContainerStyle={styles.flatList} keyExtractor={(item) => item.toString()} data={pastGuesses} renderItem={createListItem.bind(this, pastGuesses.length)} />
                </View>
            </View >
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.guessContainer}>
                <NumberContainer title="Computer's Guess:">{pastGuesses[0]}</NumberContainer>
                <Card style={styles.card}>
                    <View style={styles.button}>
                        <MainButton
                            style={styles.mainButton1}
                            title={<FontAwesome5 name="less-than" size={23} color="white" />}
                            onPress={() => nextGuessHandler('lower')}
                        />
                    </View>
                    <View style={styles.button}><MainButton
                        style={styles.mainButton2}
                        title={<FontAwesome5 name="greater-than" size={23} color="white" />}
                        onPress={() => nextGuessHandler('higher')}
                    />
                    </View>
                </Card>
            </View>
            <View style={styles.list}>
                <FlatList contentContainerStyle={styles.flatList} keyExtractor={(item) => item.toString()} data={pastGuesses} renderItem={createListItem.bind(this, pastGuesses.length)} />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    guessContainer: {
        flex: 3,
        justifyContent: 'flex-end'
    },

    guessContainerLandscape: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },

    card: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: '5%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: undefined
    },

    button: {
        width: '30%',
        paddingVertical: '5%',
        marginHorizontal: '8%',
        alignItems: 'center'
    },

    buttonLandscape: {
        width: '30%',
        paddingVertical: '5%',
        marginHorizontal: '8%',
        alignItems: 'center',
        alignSelf: 'flex-end'

    },

    mainButton1: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        width: 125
    },

    mainButton2: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        width: 125
    },

    list: {
        flex: 2,
        width: '80%',
    },

    listItem: {
        borderWidth: 2,
        borderRadius: 50,
        borderColor: Colors.tertiary,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: Dimensions.get('window').height > Dimensions.get('window').width ? '3%' : '1.5%',
        width: '100%'
    }

})

export default GameScreen;