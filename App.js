import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppLoading } from "expo";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

import * as Font from "expo-font";

const fetchFonts = () => {
    Font.loadAsync({
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });
};

export default function App() {
    // States
    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);

    // Load the font
    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
                onError={(err) => console.log(err)}
            />
        );
    }

    // Function to run when game starts
    const handleStartGame = (selectedNumber) => {
        setUserNumber(selectedNumber);
        setGuessRounds(0);
    };

    // Function to run when game ends
    const handleGameOver = (numOfRounds) => {
        setGuessRounds(numOfRounds);
    };

    // Function to start a new game
    const handleNewGame = () => {
        setGuessRounds(0);
        setUserNumber(null);
    };

    let content = <StartGameScreen onStartGame={handleStartGame} />;

    if (userNumber && guessRounds <= 0) {
        content = (
            <GameScreen userChoice={userNumber} onGameOver={handleGameOver} />
        );
    } else if (guessRounds > 0) {
        content = (
            <GameOverScreen
                rounds={guessRounds}
                onPlayAgainButtonPress={handleNewGame}
            />
        );
    }

    return (
        <View style={styles.screen}>
            <Header title="Guess a number!" />
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});
