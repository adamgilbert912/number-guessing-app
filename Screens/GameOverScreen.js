import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native'

import NumberContainer from '../Components/NumberContainer'
import Card from '../Components/Card'
import TitleText from '../Components/TitleText'

const GameOverScreen = props => {

    const [inLandscape, setInLandscape] = useState(Dimensions.get('window').width > Dimensions.get('window').height)

    useEffect(() => {
        const setInLandscapeHandler = () => {
            setInLandscape(Dimensions.get('window').width > Dimensions.get('window').height)
        }

        Dimensions.addEventListener('change', setInLandscapeHandler)

        return (
            () => Dimensions.removeEventListener('change', setInLandscapeHandler)
        )
    })

    if (inLandscape) {
        return (
            <View style={styles.container}>
            <Card style={styles.card}>
                <TitleText style={styles.gameOverText}>Game Over!</TitleText>
                <NumberContainer
                    hasButton={true}
                    buttonTitle='Play Again!'
                    onPress={props.onPlayAgain}
                    title='The Computer guessed your Answer in this many rounds:'
                    titleStyle={styles.titleStyle}
                >
                    {props.numRounds.toString()}
                </NumberContainer>
            </Card>
        </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}><Image
                style={styles.image}
                //source={require('../assets/Images/success.png')}
                source={{uri: 'https://blog.strava.com/wp-content/uploads/2018/06/DSC02332-1.jpg'}}
                fadeDuration= {2000} />
            </View>
            <Card style={styles.card}>
                <TitleText style={styles.gameOverText}>Game Over!</TitleText>
                <NumberContainer
                    hasButton={true}
                    buttonTitle='Play Again!'
                    onPress={props.onPlayAgain}
                    title='The Computer guessed your Answer in this many rounds:'
                    titleStyle={styles.titleStyle}
                >
                    {props.numRounds.toString()}
                </NumberContainer>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageContainer: {
        width: Dimensions.get('window').width > 350 ? 250 : 150,
        height: Dimensions.get('window').width > 350 ? 250: 150,
        borderRadius: Dimensions.get('window').width > 350 ? 125 : 75,
        borderWidth: 4,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: '3%'
    },

    image: {
        width: '100%',
        height: '100%'
    },

    card: {
        justifyContent: 'center',
        alignContent: 'center',
        height: undefined,
        padding: '5%',
        maxWidth: Dimensions.get('window').width < 350 ? '95%' : undefined,
    },

    gameOverText: {
        fontSize: Dimensions.get('window').height > 600 ? 25 : 18,
        marginBottom: '3%'
    },

    titleStyle: {
        fontSize: Dimensions.get('window').height > 600 ? 18 : 14
    }
})

export default GameOverScreen;