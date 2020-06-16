import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>Game Over</Text>
            <Text style={styles.text}>Number of Rounds: {props.rounds} </Text>
            <Button title="PLAY AGAIN" onPress={props.onPlayAgainButtonPress} />
        </View>
    );
};

export default GameOverScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        marginVertical: 10,
    },
});
