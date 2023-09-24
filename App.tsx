import React, { useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { drawCard } from "./ApiService";
import { mapCardValue } from "./models/Card+Map";
import GameScreen from "./models/GameScreen";
import GameScreenButton from "./views/GameScreenButton";

const CardCounter: React.FC = () => {

  const [deckId, setDeckId] = useState<string>("new");

  const [gameScreenModel, setGameScreenModel] = useState<GameScreen>({
    correctGuessesCount: 0,
    cardsLeftCount: 52,
    currentCard: { image: "", value: "" },
    isDeckEmpty: false,
    hasGameStarted: false,
  });

  const handleNextCard = async (isNextCardHigher: boolean) => {
    let currentCardValue = gameScreenModel.currentCard.value;
    let response = await drawCard(deckId);

    var shouldIncreseGuessesCount = false;

    shouldIncreseGuessesCount =
      (isNextCardHigher && mapCardValue(response.newCard.value) > mapCardValue(currentCardValue)) ||
      (!isNextCardHigher && mapCardValue(response.newCard.value) < mapCardValue(currentCardValue));

    let guessesCount = shouldIncreseGuessesCount ? gameScreenModel.correctGuessesCount + 1 : gameScreenModel.correctGuessesCount;

    setGameScreenModel({
      correctGuessesCount: guessesCount,
      cardsLeftCount: response.remainingCardsCount,
      currentCard: response.newCard,
      isDeckEmpty: response.remainingCardsCount === 0,
      hasGameStarted: true,
    });
  };

  const startGame = async () => {
    var response = await drawCard();

    setDeckId(response.deckId);

    setGameScreenModel({
      correctGuessesCount: 0,
      cardsLeftCount: response.remainingCardsCount,
      currentCard: response.newCard,
      isDeckEmpty: false,
      hasGameStarted: true,
    });
  };

  return (
    <View style={styles.view}>
      {gameScreenModel.hasGameStarted && (
        <>
          <Text>
            Cards Left in the Deck: {gameScreenModel.cardsLeftCount.toString()}
          </Text>
          <Text>
            Correct Guesses: {gameScreenModel.correctGuessesCount.toString()}
          </Text>

        </>
      )}
      <Image
        source={{ uri: gameScreenModel.currentCard.image.length === 0 ? "https://deckofcardsapi.com/static/img/back.png" : gameScreenModel.currentCard.image }}
        style={styles.image}
        resizeMode="contain"
      />
      {!gameScreenModel.hasGameStarted && (
        <GameScreenButton buttonText="Start" onPress={() => startGame()} />
      )}
      {gameScreenModel.hasGameStarted && !gameScreenModel.isDeckEmpty && (
        <>
          <GameScreenButton buttonText="Next card will be higher" onPress={() => handleNextCard(true)} />
          <GameScreenButton buttonText="Next card will be lower" onPress={() => handleNextCard(false)} />
        </>
      )}
      {gameScreenModel.hasGameStarted && gameScreenModel.isDeckEmpty && (
        <GameScreenButton buttonText="Start Again" onPress={() => startGame()} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 150,
  },
});

export default CardCounter;
