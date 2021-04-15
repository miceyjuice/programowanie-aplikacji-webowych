import { Game } from "../game.model";

export class TicTacToe implements Game {
    name: string;

    constructor() {
        this.name = "Kółko i krzyżyk";
    }
    getGameElement(): HTMLElement {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode("Hello TicTacToe"));
        return div;
    }
}