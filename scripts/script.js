"use strict";

import { CardGame } from "./card-game.js";

const gameMessageContainer = document.getElementById("game-message");
const deckContainer = document.getElementById("deck-container");
const playedCardsContainer = document.getElementById("played-cards-container");

const restartGameButton = document.getElementById("restartGameButton");

let cardGame = new CardGame(
  gameMessageContainer,
  deckContainer,
  playedCardsContainer
);

cardGame.initializeGame();

restartGameButton.addEventListener("click", () => {
  cardGame = new CardGame(
    gameMessageContainer,
    deckContainer,
    playedCardsContainer
  );
  deckContainer.innerHTML = "";
  playedCardsContainer.innerHTML = "";
  cardGame.initializeGame();
});
