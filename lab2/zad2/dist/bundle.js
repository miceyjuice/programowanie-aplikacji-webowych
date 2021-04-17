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

/***/ "./src/Board.ts":
/*!**********************!*\
  !*** ./src/Board.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Board\": () => (/* binding */ Board)\n/* harmony export */ });\n/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cell */ \"./src/Cell.ts\");\n\r\nclass Board {\r\n    constructor(size) {\r\n        this.currentSymbol = 1;\r\n        this.size = size;\r\n        this.cells = new Array(size);\r\n        this.table = document.getElementById(\"tictactoe\");\r\n        this.gameResetBtn = document.querySelector('.winner__reset');\r\n        let i = 0;\r\n        this.gameResetBtn.addEventListener('click', () => window.location.reload());\r\n        this.winnerBox = document.querySelector('.winner');\r\n        this.winnerBox.style.display = 'none';\r\n        this.winnerText = document.querySelector('.message__symbol');\r\n        for (let r = 0; r < size; r++) {\r\n            let row = this.table.insertRow(r);\r\n            for (let c = 0; c < size; c++) {\r\n                let cell = row.insertCell(c);\r\n                cell.className = \"cell\";\r\n                const newCell = new _Cell__WEBPACK_IMPORTED_MODULE_0__.Cell(cell);\r\n                this.cells[i] = newCell;\r\n                cell.addEventListener(\"click\", () => this.makeMove(newCell), false);\r\n                i++;\r\n            }\r\n        }\r\n    }\r\n    makeMove(cell) {\r\n        if (cell.htmlElement.textContent !== \"\")\r\n            return;\r\n        cell.setCellValue(this.currentSymbol);\r\n        this.checkWinner(cell.htmlElement);\r\n        this.currentSymbol = this.currentSymbol === 1 ? -1 : 1;\r\n        cell.changeColor(this.currentSymbol);\r\n    }\r\n    checkWinner(cell) {\r\n        let col = cell.cellIndex;\r\n        let row = cell.parentNode.rowIndex;\r\n        if (this.cells) {\r\n            if (this.cells[row * this.size].htmlElement.textContent ===\r\n                this.cells[row * this.size + 1].htmlElement.textContent &&\r\n                this.cells[row * this.size].htmlElement.textContent ===\r\n                    this.cells[row * this.size + 2].htmlElement.textContent) {\r\n                this.displayWinner(cell.textContent);\r\n                console.log(`${cell.textContent} wygrał!`);\r\n            }\r\n            if (this.cells[col].htmlElement.textContent ===\r\n                this.cells[col + this.size].htmlElement.textContent &&\r\n                this.cells[col].htmlElement.textContent ===\r\n                    this.cells[col + this.size * 2].htmlElement.textContent) {\r\n                this.displayWinner(cell.textContent);\r\n                console.log(`${cell.textContent} wygrał!`);\r\n            }\r\n            if (row === col) {\r\n                if (this.cells[0].htmlElement.textContent ===\r\n                    this.cells[4].htmlElement.textContent &&\r\n                    this.cells[0].htmlElement.textContent ===\r\n                        this.cells[8].htmlElement.textContent) {\r\n                    this.displayWinner(cell.textContent);\r\n                    console.log(`${cell.textContent} wygrał!`);\r\n                }\r\n            }\r\n            if ((row === 0 && col === 2) ||\r\n                (row === 1 && col === 1) ||\r\n                (row === 2 && col === 0))\r\n                if (this.cells[2].htmlElement.textContent ===\r\n                    this.cells[4].htmlElement.textContent &&\r\n                    this.cells[2].htmlElement.textContent ===\r\n                        this.cells[6].htmlElement.textContent) {\r\n                    this.displayWinner(cell.textContent);\r\n                    console.log(`${cell.textContent} wygrał!`);\r\n                }\r\n        }\r\n    }\r\n    displayWinner(winner) {\r\n        this.table.classList.add('finished');\r\n        this.winnerBox.style.display = 'flex';\r\n        this.winnerText.textContent = winner;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://zad2/./src/Board.ts?");

/***/ }),

/***/ "./src/Cell.ts":
/*!*********************!*\
  !*** ./src/Cell.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Cell\": () => (/* binding */ Cell)\n/* harmony export */ });\nclass Cell {\r\n    constructor(cell) {\r\n        this.htmlElement = cell;\r\n    }\r\n    setCellValue(value) {\r\n        switch (value) {\r\n            case -1:\r\n                this.htmlElement.textContent = 'O';\r\n                break;\r\n            case 1:\r\n                this.htmlElement.textContent = 'X';\r\n                break;\r\n            default:\r\n                this.htmlElement.textContent = '';\r\n                break;\r\n        }\r\n    }\r\n    changeColor(value) {\r\n        this.htmlElement.style.backgroundColor = value === 1 ? '#31a849' : '#486ccf';\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://zad2/./src/Cell.ts?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ \"./src/Board.ts\");\n\r\nlet tictactoe = new _Board__WEBPACK_IMPORTED_MODULE_0__.Board(3);\r\n\n\n//# sourceURL=webpack://zad2/./src/app.ts?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
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