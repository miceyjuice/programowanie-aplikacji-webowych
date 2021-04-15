/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar game_enum_1 = __webpack_require__(/*! ./game.enum */ \"./src/game.enum.ts\");\r\nvar tictactoe_1 = __webpack_require__(/*! ./tictactoe/tictactoe */ \"./src/tictactoe/tictactoe.ts\");\r\nvar battleships_1 = __webpack_require__(/*! ./battleships/battleships */ \"./src/battleships/battleships.ts\");\r\nvar App = /** @class */ (function () {\r\n    function App(gameFactory) {\r\n        this.gameFactory = gameFactory;\r\n        this.init();\r\n    }\r\n    App.prototype.init = function () {\r\n        var menuContainer = document.createElement(\"div\"); // kontener menu dostępnych gier\r\n        var gameContainer = document.createElement(\"div\"); // kontener główny ekranu z grą\r\n        var list = document.createElement(\"ul\"); // lista pozycji w menu dostępnych gier\r\n        var _loop_1 = function (gameKind) {\r\n            if (isNaN(Number(gameKind))) {\r\n                return \"continue\";\r\n            }\r\n            var game = this_1.gameFactory.getGame(Number(gameKind));\r\n            var item = document.createElement(\"li\");\r\n            item.appendChild(document.createTextNode(game.name));\r\n            item.addEventListener(\"click\", function () {\r\n                gameContainer.innerHTML = \"\";\r\n                gameContainer.appendChild(game.getGameElement());\r\n            });\r\n            list.appendChild(item);\r\n        };\r\n        var this_1 = this;\r\n        for (var _i = 0, _a = Object.keys(game_enum_1.Games); _i < _a.length; _i++) {\r\n            var gameKind = _a[_i];\r\n            _loop_1(gameKind);\r\n        }\r\n        menuContainer.appendChild(list);\r\n        document.body.appendChild(menuContainer);\r\n        document.body.appendChild(gameContainer);\r\n    };\r\n    return App;\r\n}());\r\nvar GameFactory = /** @class */ (function () {\r\n    function GameFactory() {\r\n    }\r\n    GameFactory.prototype.getGame = function (game) {\r\n        switch (game) {\r\n            case game_enum_1.Games.TicTacToe:\r\n                return new tictactoe_1.TicTacToe();\r\n            case game_enum_1.Games.BattleShips:\r\n                return new battleships_1.BattleShips();\r\n            default:\r\n                throw new Error(\"Invalid game!\");\r\n        }\r\n    };\r\n    return GameFactory;\r\n}());\r\nnew App(new GameFactory());\r\n\n\n//# sourceURL=webpack:///./src/app.ts?");

/***/ }),

/***/ "./src/battleships/battleships.ts":
/*!****************************************!*\
  !*** ./src/battleships/battleships.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.BattleShips = void 0;\r\nvar BattleShips = /** @class */ (function () {\r\n    function BattleShips() {\r\n        this.name = \"Statki\";\r\n    }\r\n    BattleShips.prototype.getGameElement = function () {\r\n        var div = document.createElement('div');\r\n        div.appendChild(document.createTextNode(\"Hello BattleShips\"));\r\n        return div;\r\n    };\r\n    return BattleShips;\r\n}());\r\nexports.BattleShips = BattleShips;\r\n\n\n//# sourceURL=webpack:///./src/battleships/battleships.ts?");

/***/ }),

/***/ "./src/game.enum.ts":
/*!**************************!*\
  !*** ./src/game.enum.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Games = void 0;\r\nvar Games;\r\n(function (Games) {\r\n    Games[Games[\"TicTacToe\"] = 1] = \"TicTacToe\";\r\n    Games[Games[\"BattleShips\"] = 2] = \"BattleShips\";\r\n})(Games = exports.Games || (exports.Games = {}));\r\n\n\n//# sourceURL=webpack:///./src/game.enum.ts?");

/***/ }),

/***/ "./src/tictactoe/tictactoe.ts":
/*!************************************!*\
  !*** ./src/tictactoe/tictactoe.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.TicTacToe = void 0;\r\nvar TicTacToe = /** @class */ (function () {\r\n    function TicTacToe() {\r\n        this.name = \"Kółko i krzyżyk\";\r\n    }\r\n    TicTacToe.prototype.getGameElement = function () {\r\n        var div = document.createElement('div');\r\n        div.appendChild(document.createTextNode(\"Hello TicTacToe\"));\r\n        return div;\r\n    };\r\n    return TicTacToe;\r\n}());\r\nexports.TicTacToe = TicTacToe;\r\n\n\n//# sourceURL=webpack:///./src/tictactoe/tictactoe.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;