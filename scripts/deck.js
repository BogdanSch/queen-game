export class Deck {
  constructor(cardsDeck = [], deckContainer) {
    this.cardsDeck = cardsDeck;
    this.deckContainer = deckContainer;
  }

  addCard(card) {
    this.cardsDeck.push(card);
    this.deckContainer.appendChild(card.cardObject);
  }

  removeCard(cardToRemove) {
    const cardIndex = this.cardsDeck.indexOf(cardToRemove);

    if (cardIndex !== -1) {
      this.cardsDeck.splice(cardIndex, 1);
      this.removeCardFromContainer(cardToRemove);
    }
  }

  removeCardByIndex(cardIndex) {
    const randomCard = this.cardsDeck.splice(cardIndex, 1)[0];
    this.removeCardFromContainer(randomCard);
    return randomCard;
  }

  removeCardFromContainer(cardToRemove) {
    this.deckContainer.removeChild(cardToRemove.cardObject);
  }

  pullRandomCard() {
    const randomIndex = Math.floor(Math.random() * this.cardsDeck.length);
    return this.removeCardByIndex(randomIndex);
  }

  shuffle() {
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < this.cardsDeck.length; i++) {
        const randomNumber = Math.floor(Math.random() * this.cardsDeck.length);
        let temp = this.cardsDeck[i];
        this.cardsDeck[i] = this.cardsDeck[randomNumber];
        this.cardsDeck[randomNumber] = temp;
      }
    }
  }

  containsCard(card) {
    return this.cardsDeck.includes(card);
  }
}
