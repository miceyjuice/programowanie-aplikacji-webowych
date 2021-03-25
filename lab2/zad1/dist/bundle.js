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

/***/ "./src/Animal.ts":
/*!***********************!*\
  !*** ./src/Animal.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Animal = void 0;\r\nclass Animal {\r\n    constructor(theName) {\r\n        this.name = theName;\r\n    }\r\n    move(distanceInMeters = 0) {\r\n        console.log(`${this.name} moved ${distanceInMeters}m.`);\r\n    }\r\n}\r\nexports.Animal = Animal;\r\n\n\n//# sourceURL=webpack://zad1/./src/Animal.ts?");

/***/ }),

/***/ "./src/Horse.ts":
/*!**********************!*\
  !*** ./src/Horse.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Horse = void 0;\r\nconst Animal_1 = __webpack_require__(/*! ./Animal */ \"./src/Animal.ts\");\r\nclass Horse extends Animal_1.Animal {\r\n    constructor(name) {\r\n        super(name);\r\n    }\r\n    move(distanceInMeters = 45) {\r\n        console.log(\"Galloping...\");\r\n        super.move(distanceInMeters);\r\n    }\r\n}\r\nexports.Horse = Horse;\r\n\n\n//# sourceURL=webpack://zad1/./src/Horse.ts?");

/***/ }),

/***/ "./src/Snake.ts":
/*!**********************!*\
  !*** ./src/Snake.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Snake = void 0;\r\nconst Animal_1 = __webpack_require__(/*! ./Animal */ \"./src/Animal.ts\");\r\nclass Snake extends Animal_1.Animal {\r\n    constructor(name) {\r\n        super(name);\r\n    }\r\n    move(distanceInMeters = 5) {\r\n        console.log(\"Slithering...\");\r\n        super.move(distanceInMeters);\r\n    }\r\n}\r\nexports.Snake = Snake;\r\n\n\n//# sourceURL=webpack://zad1/./src/Snake.ts?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Horse_1 = __webpack_require__(/*! ./Horse */ \"./src/Horse.ts\");\r\nconst Snake_1 = __webpack_require__(/*! ./Snake */ \"./src/Snake.ts\");\r\nlet sam = new Snake_1.Snake(\"Sammy the Python\");\r\nlet tom = new Horse_1.Horse(\"Tommy the Palomino\");\r\nsam.move();\r\ntom.move(34);\r\n\n\n//# sourceURL=webpack://zad1/./src/app.ts?");

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