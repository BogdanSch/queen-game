export class Player {
  constructor(name = "Player 1") {
    this.name = name;
  }
  inputPlayerName() {
    const promptedName = prompt("Enter your name: ").trim();
    if (promptedName !== "") this.name = promptedName;
    else this.name = "Player 1";
  }
  toString() {
    return `${this.name}`;
  }
}
