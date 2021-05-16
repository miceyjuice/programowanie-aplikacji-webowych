import { gameLog } from "../decorators/gameLogCounter";
import { moveCounter } from "../decorators/moveLogCounter";
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
  gameState: string[];
  i: number;
  socket: WebSocket;
  winnerState: boolean;

  constructor() {
    this.winnerState = false;
    this.i = 0;
    this.gameState = [];
    this.name = "Kółko i krzyżyk";
    this.size = 3;
    this.cells = new Array(this.size);
    this.winnerText = document.querySelector(".message__symbol")!;
    this.socket = new WebSocket("ws://localhost:8080");

    this.gameState.fill("", 0, Math.pow(this.size, 2));

    this.handleSocket();
  }

  @gameLog()
  getGameElement(): HTMLElement {
    const game = <HTMLElement>document.querySelector(".game-container");

    return this.layoutChanges(game);
  }

  isOpen(ws: WebSocket) {
    return ws.readyState === ws.OPEN;
  }

  sendData() {
    let messageObj = {
      type: "NEW_MOVE",
      payload: {
        gameState: this.gameState,
        currentSymbol: (this.currentSymbol = this.currentSymbol === 1 ? -1 : 1),
        winnerState: this.winnerState,
      },
    };
    if (!this.isOpen(this.socket)) return;
    this.socket.send(JSON.stringify(messageObj));
  }

  handleSocket() {
    this.socket.onopen = () => {
      alert("connected");
    };
    this.socket.onmessage = (data) => {
      this.gameState = JSON.parse(data.data).payload.gameState;
      this.currentSymbol = JSON.parse(data.data).payload.currentSymbol;
      this.winnerState = JSON.parse(data.data).payload.winnerState;
      this.renderTable(this.gameState);
      if (this.winnerState) {
        this.displayWinner(this.currentSymbol === 1 ? "O" : "X");
        this.winnerState = false;
      } else {
        this.table.classList.remove("finished");
        this.hideWinnerBox();
      }
    };
  }

  hideWinnerBox(): void {
    const winnerBox = <HTMLDivElement>document.querySelector(".winner");
    winnerBox.style.display = "none";
  }

  layoutChanges(game: HTMLElement): HTMLElement {
    const gameInner = <HTMLElement>document.createElement("div");
    gameInner.classList.add("game");
    this.i = 0;

    gameInner.insertAdjacentHTML(
      "afterbegin",
      '<table id="tictactoe"></table><div class="winner"><div class="winner__message"><p><span class="message__symbol"></span> is the winner!</p></div><button class="winner__reset">RESET</button></div>'
    );
    game.appendChild(gameInner);
    this.table = <HTMLTableElement>document.getElementById("tictactoe");

    this.renderTable(this.gameState);

    this.hideWinnerBox();

    return gameInner;
  }

  resetGame() {
    this.gameState.fill("", 0, 9);
    this.renderTable(this.gameState);
    this.table.classList.remove("finished");
    this.currentSymbol = 1;
    this.sendData();
  }

  renderTable(gameState: string[]) {
    this.i = 0;
    if (document.getElementsByTagName("tbody")[0]) {
      document.getElementsByTagName("tbody")[0].remove();
    }
    for (let r = 0; r < this.size; r++) {
      let row = this.table?.insertRow(r);
      for (let c = 0; c < this.size; c++) {
        let cell = <HTMLTableDataCellElement>row?.insertCell(c);
        if (cell) {
          cell.className = "cell";
          const newCell = new Cell(cell);
          if (this.cells) this.cells[this.i] = newCell;
          cell.classList.add(`${r + 1}${c + 1}`);
          cell.textContent = gameState[this.size * r + c];
          cell.addEventListener("click", () => this.makeMove(newCell), false);
          cell.style.backgroundColor =
            cell.textContent === "X"
              ? "#486ccf"
              : cell.textContent === "O"
              ? "#31a849"
              : "";
        }
        this.i++;
      }
    }
  }

  @moveCounter()
  makeMove(cell: Cell): void {
    if (cell.htmlElement.textContent !== "") return;
    cell.setCellValue(this.currentSymbol);

    const row = Number(cell.htmlElement.classList[1].slice(0, 1));
    const column = Number(cell.htmlElement.classList[1].slice(1, 2));

    this.gameState[this.size * (row - 1) + (column - 1)] =
      cell.htmlElement.textContent;

    this.checkWinner(cell.htmlElement);

    this.sendData();
    this.handleSocket();

    this.currentSymbol = this.currentSymbol === 1 ? -1 : 1;
  }

  isDraw() {
    for (let i = 0; i < this.gameState.length; i++) {
      if (this.gameState[i] === "") return false;
    }
    return true;
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
        this.winnerState = true;
      }
      if (
        this.cells[col].htmlElement.textContent ===
          this.cells[col + this.size].htmlElement.textContent &&
        this.cells[col].htmlElement.textContent ===
          this.cells[col + this.size * 2].htmlElement.textContent
      ) {
        this.displayWinner(cell.textContent);
        this.winnerState = true;
      }
      if (row === col) {
        if (
          this.cells[0].htmlElement.textContent ===
            this.cells[4].htmlElement.textContent &&
          this.cells[0].htmlElement.textContent ===
            this.cells[8].htmlElement.textContent
        ) {
          this.displayWinner(cell.textContent);
          this.winnerState = true;
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
          this.winnerState = true;
        }
    }
  }

  displayWinner(winner: string | null) {
    this.table.classList.add("finished");
    const winnerBox = <HTMLDivElement>document.querySelector(".winner");
    const messageSymbol = <HTMLDivElement>(
      document.querySelector(".message__symbol")
    );
    const gameResetBtn = <HTMLButtonElement>(
      document.querySelector(".winner__reset")
    );
    winnerBox.style.display = "flex";
    messageSymbol.textContent = winner;

    gameResetBtn.addEventListener("click", () => {
      this.resetGame();
      winnerBox.style.display = "none";
    });
  }
}
