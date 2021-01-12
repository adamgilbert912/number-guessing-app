import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import * as Fonts from 'expo-font'
import AppLoading from 'expo-app-loading'

import Header from './Components/Header'
import Card from './Components/Card'
import NumberScreen from './Screens/NumberScreen';
import GameScreen from './Screens/GameScreen'
import GameOverScreen from './Screens/GameOverScreen'

const loadFonts = () => {
  return (
    Fonts.loadAsync({
      'open-sans-regular': require('./assets/Fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/Fonts/OpenSans-Bold.ttf')
    })
  )
}


export default function App() {

  const [userNumber, setUserNumber] = useState()
  const [numRounds, setNumRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    return (<AppLoading startAsync={loadFonts} onFinish={() => setDataLoaded(true)} onError={(err) => console.log(err)} />)
  }

  const setUserNumberHandler = number => {
    setUserNumber(number);
  }

  const gameOverHandler = rounds => {
    setNumRounds(rounds)
  }

  const playAgainHandler = () => {
    setUserNumber(undefined)
    setNumRounds(0)
  }

  let screen = <NumberScreen onStartGame={setUserNumberHandler} />

  if (userNumber && numRounds == 0) {
    screen = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (numRounds > 0) {
    screen = <GameOverScreen numRounds={numRounds} onPlayAgain={playAgainHandler} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title='Guess a Number!' />
      {screen}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
