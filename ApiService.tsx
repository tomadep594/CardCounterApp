import axios from "axios";
import Card from "./models/Card";

export const drawCard = async (
  fromDeckId: string = "new",
  cardsToDraw: number = 1
): Promise<
  { newCard: Card; remainingCardsCount: number; deckId: string } | undefined
> => {
  try {
    const response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${fromDeckId}/draw/?count=${cardsToDraw}`
    );
    const { remaining, cards, deck_id } = response.data;

    const newCard: Card = cards[0];

    return { newCard, remainingCardsCount: remaining, deckId: deck_id };
  } catch (error) {
    console.error("Error drawing cards:", error);
    return undefined;
  }
};
