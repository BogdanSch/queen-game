import { Player } from "./player.js";

export class CardGame {
  constructor(gameMessageContainer, deckContainer, playedCardsContainer) {
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
    this.deck = [];
    this.gameMessageContainer = gameMessageContainer;
    this.deckContainer = deckContainer;
    this.playedCardsContainer = playedCardsContainer;
    this.draggedCard = null;
    this.players = [new Player("You"), new Player("Bot")];
    this.currentPlayer = this.players[0];
  }

  initializeGame() {
    this.createDeck();
    this.shuffleDeck();
    this.renderDeck();
    this.addCardsEventListeners();
  }

  createDeck() {
    for (const suit of this.suits) {
      for (const denomination of this.denominations) {
        const card = document.createElement("div");
        card.className = "game-card";
        card.dataset.denomination = denomination;
        card.dataset.suit = suit;
        card.draggable = true;
        card.style.backgroundImage = `url(./images/cards/shirt.png)`;
        card.addEventListener("dragstart", (event) => {
          this.draggedCard = event.target;
        });
        this.deck.push(card);
      }
    }
  }

  shuffleDeck() {
    this.deck.sort(() => Math.random() - 0.5);
  }

  renderDeck() {
    this.deck.forEach((card) => {
      this.deckContainer.appendChild(card);
    });
  }

  addCardsEventListeners() {
    this.playedCardsContainer.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    this.playedCardsContainer.addEventListener("drop", (event) => {
      if (
        this.draggedCard &&
        this.draggedCard.classList.contains("game-card") &&
        !this.playedCardsContainer.contains(this.draggedCard) &&
        this.currentPlayer === this.players[0]
      ) {
        this.currentPlayer = this.players[0];
        this.deckContainer.removeChild(this.draggedCard);
        this.playedCardsContainer.appendChild(this.draggedCard);
        this.showCard(this.draggedCard);
        this.botTurn();
      }
    });

    this.playedCardsContainer.addEventListener("dragend", () =>
      this.checkWin()
    );
  }

  botTurn() {
    setTimeout(() => {
      this.currentPlayer = this.players[1];
      const botCard = this.getRandomCard();
      this.playedCardsContainer.appendChild(botCard);
      this.showCard(botCard);
    }, 1000);
  }

  getRandomCard() {
    const randomIndex = Math.floor(Math.random() * this.deck.length);
    return this.deck.splice(randomIndex, 1)[0];
  }

  showCard(cardToShow) {
    const denomination = cardToShow.dataset.denomination;
    const suit = cardToShow.dataset.suit;
    cardToShow.style.backgroundImage = `url("./images/cards/${suit} ${denomination}.png")`;
  }

  checkWin() {
    const sortedCards = Array.from(this.playedCardsContainer.children).sort(
      (a, b) => {
        const denominationA = a.dataset.denomination;
        const denominationB = b.dataset.denomination;
        return (
          this.denominations.indexOf(denominationA) -
          this.denominations.indexOf(denominationB)
        );
      }
    );

    if (
      JSON.stringify(Array.from(this.gameContainer.children)) ===
      JSON.stringify(sortedCards)
    ) {
      this.winMessage.style.display = "block";
    }
  }
}
