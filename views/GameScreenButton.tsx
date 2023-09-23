import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface GameScreenButtonProps {
    onPress: () => void;
    buttonText: string;
}

const GameScreenButton: React.FC<GameScreenButtonProps> = ({ buttonText, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default GameScreenButton;
