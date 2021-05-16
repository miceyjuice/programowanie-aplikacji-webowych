import { Games } from "./game.enum";
import { Game } from "./game.model";
import { TicTacToe } from "./tictactoe/tictactoe";
import { BattleShips } from "./battleships/battleships";
import "./styles/styles.scss";
import { disabled } from "./decorators/disabledState";

class App {
  gameFactory: GameFactory;

  @disabled(false)
  public isGameDisabled!: boolean;

  constructor(gameFactory: GameFactory) {
    this.gameFactory = gameFactory;
    this.init();
  }

  init(): void {
    const menuContainer = <HTMLDivElement>document.createElement("div"); // kontener menu dostępnych gier
    const gameContainer = <HTMLDivElement>document.createElement("div"); // kontener główny ekranu z grą
    const list = document.createElement("ul"); // lista pozycji w menu dostępnych gier

    for (const gameKind of Object.keys(Games)) {
      if (isNaN(Number(gameKind))) {
        continue;
      }
      const game = this.gameFactory.getGame(Number(gameKind));
      const item = document.createElement("li");
      if (!this.isGameDisabled) {
        item.appendChild(document.createTextNode(game.name));
        item.addEventListener("click", () => {
          gameContainer.innerHTML = "";
          gameContainer.classList.add("game-container");
          gameContainer.appendChild(game.getGameElement());
        });
      }
      menuContainer.classList.add("gamesMenu");
      list.classList.add("gamesMenu__list");
      item.classList.add("list__element");

      list.appendChild(item);
    }

    menuContainer.appendChild(list);
    document.body.appendChild(menuContainer);
    document.body.appendChild(gameContainer);
  }
}

class GameFactory {
  getGame(game: Games): Game {
    switch (game) {
      case Games.TicTacToe:
        return new TicTacToe();
      case Games.BattleShips:
        return new BattleShips();
      default:
        throw new Error("Invalid game!");
    }
  }
}

new App(new GameFactory());
