import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from "react-native";
import Card from "../components/Card";
import colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const handleNumberInput = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ""));
    };

    const handleInputReset = () => {
        setEnteredValue("");
    };

    const handleInputSubmit = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                "Invalid Number!",
                "Number has to be a number between 1 and 99",
                [
                    {
                        text: "Okay",
                        style: "destructive",
                        onPress: handleInputReset,
                    },
                ]
            );
            return;
        }
        setIsConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue("");
        Keyboard.dismiss();
    };

    let ConfirmedOutput;

    if (isConfirmed) {
        ConfirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button
                    title="START GAME!"
                    onPress={() => props.onStartGame(selectedNumber)}
                />
            </Card>
        );
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <Input
                        onSubmitEditing={handleInputSubmit}
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={handleNumberInput}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                title="Reset"
                                onPress={handleInputReset}
                                color={colors.secondary}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button
                                title="Confirm"
                                onPress={handleInputSubmit}
                                color={colors.primary}
                            />
                        </View>
                    </View>
                </Card>
                {ConfirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        // fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: 300,
        maxWidth: "80%",
        alignItems: "center",
        borderRadius: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    button: {
        width: "35%",
    },
    input: {
        width: 50,
        textAlign: "center",
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: "center",
    },
});

export default StartGameScreen;
