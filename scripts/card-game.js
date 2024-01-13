import { Card } from "./card.js";
import { Deck } from "./deck.js";
import { Player } from "./player.js";

export class CardGame {
  constructor(
    showGameMessage,
    deckContainer,
    playedCardsContainer,
    showWinnerMessage,
    player
  ) {
    this.showGameMessage = showGameMessage;
    this.deckContainer = deckContainer;
    this.playedCardsContainer = playedCardsContainer;
    this.showWinnerMessage = showWinnerMessage;

    this.draggedCard = null;
    this.players = [player, new Player("Bot")];
    this.currentPlayer = this.players[0];
    this.botTurnDuration = 1000;

    this.denominations = [
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "jack",
      "queen",
      "king",
      "ace",
    ];
    this.suits = ["Diamonds"];
    this.targetDonomination = "queen";
    this.gameOver = false;
  }

  initializeGame() {
    this.currentPlayer = this.players[0];
    this.showGameMessage(`${this.currentPlayer.toString()}'s Turn!`);

    this.createDeck();
    this.deck.shuffle();
    this.addCardsEventListeners();
  }

  createDeck() {
    this.deck = new Deck([], this.deckContainer);
    this.playedCardsDeck = new Deck([], this.playedCardsContainer);

    for (const suit of this.suits) {
      for (const denomination of this.denominations) {
        const card = new Card(suit, denomination);
        card.renderCard();
        card.cardObject.addEventListener("dragstart", (event) => {
          this.draggedCard = card;
        });
        this.deck.addCard(card);
      }
    }
  }

  addCardsEventListeners() {
    this.playedCardsContainer.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    this.playedCardsContainer.addEventListener("drop", (event) => {
      if (
        this.draggedCard &&
        !this.playedCardsDeck.containsCard(this.draggedCard) &&
        this.currentPlayer === this.players[0] &&
        !this.gameOver
      ) {
        this.deck.removeCard(this.draggedCard);
        this.playedCardsDeck.addCard(this.draggedCard);
        this.draggedCard.showCard();
        this.checkWin();
        if (!this.gameOver) {
          this.botTurn();
        }
      }
    });
  }

  botTurn() {
    this.currentPlayer = this.players[1];
    this.showGameMessage(`${this.currentPlayer.toString()}'s Turn!`);

    setTimeout(() => {
      const randomCard = this.deck.pullRandomCard();
      this.playedCardsDeck.addCard(randomCard);
      randomCard.showCard();
      this.draggedCard = randomCard;
      this.checkWin();

      this.currentPlayer = this.players[0];
      this.showGameMessage(`${this.currentPlayer.toString()}'s Turn!`);
    }, this.botTurnDuration);
  }

  checkWin() {
    if (this.draggedCard.denomination === this.targetDonomination) {
      this.gameOver = true;
      this.showGameMessage(`Game Over!`);
      this.showWinnerMessage(`${this.currentPlayer.toString()} wins the game!`);
    }
    this.draggedCard = null;
  }
}
