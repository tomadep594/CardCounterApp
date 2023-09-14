import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
const React = require('react');

interface Card {
    image: string;
    value: string;
}

const CardCounter: React.FC = () => {
    const [deckId, setDeckId] = useState<string>('');
    const [cardsLeft, setCardsLeft] = useState<number>(0);
    const [currentCard, setCurrentCard] = useState<Card | {value: Number}>({value: 0});
    const [correctGuesses, setCorrectGuesses] = useState<number>(0);
    const cardsToDraw: number = 1;

    useEffect(() => {
        // Fetch a new deck of cards and get the deck_id
        axios
            .get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${cardsToDraw}`)
            .then((response: { data: { deck_id: any; remaining: any; }; }) => {
                const { deck_id, remaining } = response.data;
                setDeckId(deck_id);
                setCardsLeft(remaining);
            })
            .catch((error: any) => {
                // TODO: Potential error handle mechanism
                console.error('Error fetching deck:', error);
            });
    }, []);

    const drawCards = (higherOrLower: 'higher' | 'lower' | undefined) => {
        axios
            .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${cardsToDraw}`)
            .then((response: { data: { remaining: any; cards: any; }; }) => {
                const { remaining, cards } = response.data;

                const newCard: Card = cards[0];

                // Check if the prediction is correct
                const predictionCorrect =
                    (higherOrLower === 'higher' && currentCard.value < newCard.value) ||
                    (higherOrLower === 'lower' && currentCard.value > newCard.value);

                if (predictionCorrect) {
                    setCorrectGuesses(correctGuesses + 1);
                }

                setCardsLeft(remaining);
                setCurrentCard(newCard);
            })
            .catch((error: any) => {
                // TODO: Potential error handle mechanism
                console.error('Error drawing cards:', error);
            });
    };

    return (
        <View style={styles.view}>
            {cardsLeft < 52 && (
                <>
                    <Text>Cards Left in the Deck: {cardsLeft}</Text>
                    <Text>Correct Guesses: {correctGuesses}</Text>
                    <Image
                        source={{ uri: (currentCard as Card).image }}
                        style={{ width: 100, height: 150 }}
                    />
                    <TouchableOpacity
                        onPress={() => drawCards('higher')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Next card will be higher</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => drawCards('lower')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Next card will be lower</Text>
                    </TouchableOpacity>
                </>
            )}
            {cardsLeft === 52 && (
                <TouchableOpacity
                    onPress={() => drawCards(undefined)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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

export default CardCounter;
