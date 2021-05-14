import { Cell } from "./Cell";

export class Board {
  cells: Cell[] | undefined;
  currentSymbol: number = 1;
  size: number;
  table: HTMLTableElement;
  winnerBox: HTMLDivElement;
  winnerText: HTMLParagraphElement | null;
  gameResetBtn: HTMLButtonElement;

  constructor(size: number) {
    this.size = size;
    this.cells = new Array(size);
    this.table = <HTMLTableElement>document.getElementById("tictactoe");
    this.gameResetBtn = <HTMLButtonElement>document.querySelector('.winner__reset');
    let i = 0;
    this.gameResetBtn.addEventListener('click', () => window.location.reload());
    this.winnerBox = <HTMLDivElement>document.querySelector('.winner');
    this.winnerBox.style.display = 'none';
    this.winnerText = document.querySelector('.message__symbol');

    for (let r = 0; r < size; r++) {
      let row = this.table.insertRow(r);
      for (let c = 0; c < size; c++) {
        let cell = <HTMLTableDataCellElement>row.insertCell(c);
        cell.className = "cell";
        const newCell = new Cell(cell);
        this.cells[i] = newCell;
        cell.addEventListener("click", () => this.makeMove(newCell), false);
        i++;
      }
    }
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

  displayWinner(winner: string | null){
    this.table.classList.add('finished');
    this.winnerBox.style.display = 'flex';
    this.winnerText!.textContent = winner;
  }
}
