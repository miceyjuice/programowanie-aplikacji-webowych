export class Cell {
  cellValue: number | undefined;
  htmlElement: HTMLElement;
  
  constructor(cell: HTMLElement) {
    this.htmlElement = cell;
  }
 
  setCellValue(value: number) {
    switch(value){
      case -1:
        this.htmlElement.textContent = 'O'
        break;
      case 1:
        this.htmlElement.textContent = 'X'
        break;
      default:
        this.htmlElement.textContent = ''
        break;
    }
  }
  changeColor(symbol: string){
    this.htmlElement.style.backgroundColor = symbol === 'O' ? '#31a849' : '#486ccf';
  }
 }
