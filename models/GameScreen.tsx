import Card from "./Card";

interface GameScreen {
    correctGuessesCount: number;
    cardsLeftCount: number;
    currentCard: Card;
    isDeckEmpty: boolean;
    hasGameStarted: boolean;
}

export default GameScreen;