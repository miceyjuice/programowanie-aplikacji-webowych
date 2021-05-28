import { Game } from "../game.model";
import { Board } from "./Board";
import { Cell } from "./Cell";

export class TicTacToe implements Game {
  name: string;
  cells: Cell[] | undefined;
  currentSymbol: number = 1;
  size: number;
  table!: HTMLTableElement;
  winnerText: HTMLParagraphElement;

  constructor() {
    this.name = "Kółko i krzyżyk";
    this.size = 3;
    this.cells = new Array(this.size);
    this.winnerText = document.querySelector(".message__symbol")!;
  }
  getGameElement(): HTMLElement {
    const game = <HTMLElement>document.querySelector(".game-container");

    return this.layoutChanges(game);
  }

  layoutChanges(game: HTMLElement): HTMLElement {
    const gameInner = <HTMLElement>document.createElement("div");
    gameInner.classList.add("game");
    let i = 0;

    gameInner.insertAdjacentHTML(
      "afterbegin",
      '<table id="tictactoe"></table><div class="winner"><div class="winner__message"><p><span class="message__symbol"></span> is the winner!</p></div><button class="winner__reset">RESET</button></div>'
    );
    game.appendChild(gameInner);
    this.table = <HTMLTableElement>document.getElementById("tictactoe");
    console.log(document.getElementById("tictactoe"));

    for (let r = 0; r < this.size; r++) {
      let row = this.table?.insertRow(r);
      for (let c = 0; c < this.size; c++) {
        let cell = <HTMLTableDataCellElement>row?.insertCell(c);
        if (cell) {
          cell.className = "cell";
          const newCell = new Cell(cell);
          if (this.cells) this.cells[i] = newCell;
          cell.addEventListener("click", () => this.makeMove(newCell), false);
        }
        i++;
      }
    }

    const gameResetBtn = <HTMLButtonElement>(
      document.querySelector(".winner__reset")
    );
    gameResetBtn.addEventListener("click", () => window.location.reload());

    const winnerBox = <HTMLDivElement>document.querySelector(".winner");
    winnerBox.style.display = "none";

    return gameInner;
  }

  makeMove(cell: Cell): void {
    if (cell.htmlElement.textContent !== "") return;

    cell.setCellValue(this.currentSymbol);
    this.checkWinner(cell.htmlElement);
    this.currentSymbol = this.currentSymbol === 1 ? -1 : 1;
    cell.changeColor(this.currentSymbol);
  }

  checkWinner(cell: HTMLElement): void {
    let col = (<HTMLTableCellElement>cell).cellIndex;
    let row = (<HTMLTableRowElement>cell.parentNode).rowIndex;
    if (this.cells) {
      if (
        this.cells[row * this.size].htmlElement.textContent ===
          this.cells[row * this.size + 1].htmlElement.textContent &&
        this.cells[row * this.size].htmlElement.textContent ===
          this.cells[row * this.size + 2].htmlElement.textContent
      ) {
        this.displayWinner(cell.textContent);
        console.log(`${cell.textContent} wygrał!`);
      }
      if (
        this.cells[col].htmlElement.textContent ===
          this.cells[col + this.size].htmlElement.textContent &&
        this.cells[col].htmlElement.textContent ===
          this.cells[col + this.size * 2].htmlElement.textContent
      ) {
        this.displayWinner(cell.textContent);
        console.log(`${cell.textContent} wygrał!`);
      }
      if (row === col) {
        if (
          this.cells[0].htmlElement.textContent ===
            this.cells[4].htmlElement.textContent &&
          this.cells[0].htmlElement.textContent ===
            this.cells[8].htmlElement.textContent
        ) {
          this.displayWinner(cell.textContent);
          console.log(`${cell.textContent} wygrał!`);
        }
      }
      if (
        (row === 0 && col === 2) ||
        (row === 1 && col === 1) ||
        (row === 2 && col === 0)
      )
        if (
          this.cells[2].htmlElement.textContent ===
            this.cells[4].htmlElement.textContent &&
          this.cells[2].htmlElement.textContent ===
            this.cells[6].htmlElement.textContent
        ) {
          this.displayWinner(cell.textContent);
          console.log(`${cell.textContent} wygrał!`);
        }
    }
  }

  displayWinner(winner: string | null) {
    this.table.classList.add("finished");
    let winnerBox = <HTMLDivElement>document.querySelector(".winner");
    let messageSymbol = <HTMLDivElement>(
      document.querySelector(".message__symbol")
    );
    winnerBox.style.display = "flex";
    messageSymbol.textContent = winner;
  }
}
