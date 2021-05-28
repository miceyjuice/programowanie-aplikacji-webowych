import { Game } from "../game.model";

export class BattleShips implements Game {
    name: string;

    constructor() {
        this.name = "Statki"
    }
    getGameElement(): HTMLElement {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode("Hello BattleShips"));
        return div;
    }

}