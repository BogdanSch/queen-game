export class Card {
  constructor(suit, denomination) {
    this.suit = suit;
    this.denomination = denomination;
  }
  renderCard() {
    this.cardObject = document.createElement("div");
    this.cardObject.className = "game-card";
    this.cardObject.dataset.denomination = this.denomination;
    this.cardObject.dataset.suit = this.suit;
    this.cardObject.draggable = true;
    this.cardObject.style.backgroundImage = `url(./images/cards/shirt.png)`;
  }
  showCard() {
    const denomination = this.cardObject.dataset.denomination;
    const suit = this.cardObject.dataset.suit;
    this.cardObject.style.backgroundImage = `url("./images/cards/${suit} ${denomination}.png")`;
  }
}
