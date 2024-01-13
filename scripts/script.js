"use strict";

import { CardGame } from "./card-game.js";
import { Player } from "./player.js";

const gameMessageContainer = document.getElementById("game-message");
const deckContainer = document.getElementById("deck-container");
const playedCardsContainer = document.getElementById("played-cards-container");

const restartGameButton = document.getElementById("restartGameButton");
const winnerModalContainer = document.querySelector("#winnerModal");

function showGameMessage(message) {
  gameMessageContainer.innerHTML = message;
}

function showWinnerMessage(message) {
  winnerModalContainer.querySelector(".modal-title").innerHTML = message;
  const winnerModal = new bootstrap.Modal(winnerModalContainer);
  winnerModal.show();
}

function getPlayer() {
  const player = new Player();
  player.inputPlayerName();
  return player;
}

function main() {
  let cardGame = new CardGame(
    showGameMessage,
    deckContainer,
    playedCardsContainer,
    showWinnerMessage,
    getPlayer()
  );

  cardGame.initializeGame();
}

main();

restartGameButton.addEventListener("click", () => {
  deckContainer.innerHTML = "";
  playedCardsContainer.innerHTML = "";
  main();
});
