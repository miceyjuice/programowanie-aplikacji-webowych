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

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/styles.scss":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/styles.scss ***!
  \*************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \":export {\\n  defaultFontColor: #f3f3f3;\\n  mainBgColor: #1A1A1A;\\n  blueCellColor: #486ccf;\\n  greenCellColor: #31a849;\\n}\\n\\n*,\\n*::before,\\n*::after {\\n  box-sizing: border-box;\\n}\\n\\nbody {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  background-color: #1A1A1A;\\n  color: #f3f3f3;\\n  min-height: 100vh;\\n  flex-direction: column;\\n}\\n\\n.gamesMenu {\\n  width: 100%;\\n}\\n.gamesMenu .gamesMenu__list {\\n  list-style-type: none;\\n  padding: 0;\\n  color: #f3f3f3;\\n  font-size: 3rem;\\n  font-family: \\\"Poppins\\\", sans-serif;\\n  font-weight: 900;\\n  text-transform: uppercase;\\n}\\n.gamesMenu .gamesMenu__list .list__element {\\n  text-align: center;\\n  letter-spacing: 5px;\\n}\\n.gamesMenu .gamesMenu__list .list__element:hover {\\n  cursor: pointer;\\n  filter: brightness(75%) blur(1px);\\n}\\n\\n.game {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n}\\n.game .finished {\\n  filter: blur(5px) brightness(0.95);\\n  transition: blur 300ms ease-in-out;\\n}\\n.game #tictactoe {\\n  position: relative;\\n  padding: 2rem;\\n  background-color: #222;\\n  border-radius: 1rem;\\n  box-shadow: 0px 0px 10px 0px #333;\\n}\\n.game #tictactoe tr {\\n  display: flex;\\n  gap: 1rem;\\n  margin: 1rem;\\n}\\n.game #tictactoe tr .cell {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  background-color: transparent;\\n  border-radius: 0.5rem;\\n  height: 100px;\\n  width: 100px;\\n  box-shadow: 0px 2px 6px 0px #111;\\n  font-size: 2rem;\\n  font-family: \\\"Poppins\\\", sans-serif;\\n  color: #f3f3f3;\\n  transition: background-color 200ms cubic-bezier(0.47, 0, 0.745, 0.715), filter 300ms ease-in-out;\\n}\\n.game #tictactoe tr .cell:hover {\\n  cursor: pointer;\\n  filter: brightness(85%);\\n}\\n.game .winner {\\n  position: absolute;\\n  width: 100%;\\n  height: 100%;\\n  top: 0;\\n  left: 0;\\n  justify-content: center;\\n  flex-direction: column;\\n  text-align: center;\\n}\\n.game .winner .winner__message p {\\n  font-size: 2rem;\\n  font-family: \\\"Poppins\\\", sans-serif;\\n}\\n.game .winner .winner__message .message__symbol {\\n  font-weight: 600;\\n  color: #0c2;\\n  text-shadow: 0px 0px 5px #555;\\n}\\n.game .winner .winner__reset {\\n  width: 10rem;\\n  margin: 0 auto;\\n  padding: 1rem;\\n  font-size: 1.5rem;\\n  border: none;\\n  border-radius: 10px;\\n  box-shadow: 0px 0px 1rem #444;\\n  background: #0c2;\\n  color: #f3f3f3;\\n  transition: box-shadow 250ms ease-in-out, background-color 250ms ease-in-out;\\n}\\n.game .winner .winner__reset:hover {\\n  cursor: pointer;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://zad2/./src/styles/styles.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === \"string\") {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, \"\"]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://zad2/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./src/styles/styles.scss":
/*!********************************!*\
  !*** ./src/styles/styles.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./styles.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/styles.scss\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});\n\n//# sourceURL=webpack://zad2/./src/styles/styles.scss?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : 0;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://zad2/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar game_enum_1 = __webpack_require__(/*! ./game.enum */ \"./src/game.enum.ts\");\r\nvar tictactoe_1 = __webpack_require__(/*! ./tictactoe/tictactoe */ \"./src/tictactoe/tictactoe.ts\");\r\nvar battleships_1 = __webpack_require__(/*! ./battleships/battleships */ \"./src/battleships/battleships.ts\");\r\n__webpack_require__(/*! ./styles/styles.scss */ \"./src/styles/styles.scss\");\r\nvar App = /** @class */ (function () {\r\n    function App(gameFactory) {\r\n        this.gameFactory = gameFactory;\r\n        this.init();\r\n    }\r\n    App.prototype.init = function () {\r\n        var menuContainer = document.createElement(\"div\"); // kontener menu dostępnych gier\r\n        var gameContainer = document.createElement(\"div\"); // kontener główny ekranu z grą\r\n        var list = document.createElement(\"ul\"); // lista pozycji w menu dostępnych gier\r\n        var _loop_1 = function (gameKind) {\r\n            if (isNaN(Number(gameKind))) {\r\n                return \"continue\";\r\n            }\r\n            var game = this_1.gameFactory.getGame(Number(gameKind));\r\n            var item = document.createElement(\"li\");\r\n            item.appendChild(document.createTextNode(game.name));\r\n            item.addEventListener(\"click\", function () {\r\n                gameContainer.innerHTML = \"\";\r\n                gameContainer.classList.add('game-container');\r\n                gameContainer.appendChild(game.getGameElement());\r\n            });\r\n            menuContainer.classList.add('gamesMenu');\r\n            list.classList.add('gamesMenu__list');\r\n            item.classList.add('list__element');\r\n            list.appendChild(item);\r\n        };\r\n        var this_1 = this;\r\n        for (var _i = 0, _a = Object.keys(game_enum_1.Games); _i < _a.length; _i++) {\r\n            var gameKind = _a[_i];\r\n            _loop_1(gameKind);\r\n        }\r\n        menuContainer.appendChild(list);\r\n        document.body.appendChild(menuContainer);\r\n        document.body.appendChild(gameContainer);\r\n    };\r\n    return App;\r\n}());\r\nvar GameFactory = /** @class */ (function () {\r\n    function GameFactory() {\r\n    }\r\n    GameFactory.prototype.getGame = function (game) {\r\n        switch (game) {\r\n            case game_enum_1.Games.TicTacToe:\r\n                return new tictactoe_1.TicTacToe();\r\n            case game_enum_1.Games.BattleShips:\r\n                return new battleships_1.BattleShips();\r\n            default:\r\n                throw new Error(\"Invalid game!\");\r\n        }\r\n    };\r\n    return GameFactory;\r\n}());\r\nnew App(new GameFactory());\r\n\n\n//# sourceURL=webpack://zad2/./src/app.ts?");

/***/ }),

/***/ "./src/battleships/battleships.ts":
/*!****************************************!*\
  !*** ./src/battleships/battleships.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.BattleShips = void 0;\r\nvar BattleShips = /** @class */ (function () {\r\n    function BattleShips() {\r\n        this.name = \"Statki\";\r\n    }\r\n    BattleShips.prototype.getGameElement = function () {\r\n        var div = document.createElement('div');\r\n        div.appendChild(document.createTextNode(\"Hello BattleShips\"));\r\n        return div;\r\n    };\r\n    return BattleShips;\r\n}());\r\nexports.BattleShips = BattleShips;\r\n\n\n//# sourceURL=webpack://zad2/./src/battleships/battleships.ts?");

/***/ }),

/***/ "./src/game.enum.ts":
/*!**************************!*\
  !*** ./src/game.enum.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Games = void 0;\r\nvar Games;\r\n(function (Games) {\r\n    Games[Games[\"TicTacToe\"] = 1] = \"TicTacToe\";\r\n    Games[Games[\"BattleShips\"] = 2] = \"BattleShips\";\r\n})(Games = exports.Games || (exports.Games = {}));\r\n\n\n//# sourceURL=webpack://zad2/./src/game.enum.ts?");

/***/ }),

/***/ "./src/tictactoe/Cell.ts":
/*!*******************************!*\
  !*** ./src/tictactoe/Cell.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Cell = void 0;\r\nvar Cell = /** @class */ (function () {\r\n    function Cell(cell) {\r\n        this.htmlElement = cell;\r\n    }\r\n    Cell.prototype.setCellValue = function (value) {\r\n        switch (value) {\r\n            case -1:\r\n                this.htmlElement.textContent = 'O';\r\n                break;\r\n            case 1:\r\n                this.htmlElement.textContent = 'X';\r\n                break;\r\n            default:\r\n                this.htmlElement.textContent = '';\r\n                break;\r\n        }\r\n    };\r\n    Cell.prototype.changeColor = function (symbol) {\r\n        this.htmlElement.style.backgroundColor = symbol === 'O' ? '#31a849' : '#486ccf';\r\n    };\r\n    return Cell;\r\n}());\r\nexports.Cell = Cell;\r\n\n\n//# sourceURL=webpack://zad2/./src/tictactoe/Cell.ts?");

/***/ }),

/***/ "./src/tictactoe/tictactoe.ts":
/*!************************************!*\
  !*** ./src/tictactoe/tictactoe.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.TicTacToe = void 0;\r\nvar Cell_1 = __webpack_require__(/*! ./Cell */ \"./src/tictactoe/Cell.ts\");\r\nvar TicTacToe = /** @class */ (function () {\r\n    function TicTacToe() {\r\n        this.currentSymbol = 1;\r\n        this.winnerState = false;\r\n        this.i = 0;\r\n        this.gameState = [];\r\n        this.name = \"Kółko i krzyżyk\";\r\n        this.size = 3;\r\n        this.cells = new Array(this.size);\r\n        this.winnerText = document.querySelector(\".message__symbol\");\r\n        this.socket = new WebSocket(\"ws://localhost:8080\");\r\n        this.gameState.fill(\"\", 0, Math.pow(this.size, 2));\r\n        this.handleSocket();\r\n    }\r\n    TicTacToe.prototype.getGameElement = function () {\r\n        var game = document.querySelector(\".game-container\");\r\n        return this.layoutChanges(game);\r\n    };\r\n    TicTacToe.prototype.isOpen = function (ws) {\r\n        return ws.readyState === ws.OPEN;\r\n    };\r\n    TicTacToe.prototype.sendData = function () {\r\n        var messageObj = {\r\n            type: \"NEW_MOVE\",\r\n            payload: {\r\n                gameState: this.gameState,\r\n                currentSymbol: (this.currentSymbol = this.currentSymbol === 1 ? -1 : 1),\r\n                winnerState: this.winnerState,\r\n            },\r\n        };\r\n        console.log(this.socket);\r\n        if (!this.isOpen(this.socket))\r\n            return;\r\n        this.socket.send(JSON.stringify(messageObj));\r\n    };\r\n    TicTacToe.prototype.handleSocket = function () {\r\n        var _this = this;\r\n        this.socket.onopen = function () {\r\n            alert(\"connected\");\r\n        };\r\n        this.socket.onmessage = function (data) {\r\n            _this.gameState = JSON.parse(data.data).payload.gameState;\r\n            _this.currentSymbol = JSON.parse(data.data).payload.currentSymbol;\r\n            _this.winnerState = JSON.parse(data.data).payload.winnerState;\r\n            _this.renderTable(_this.gameState);\r\n            if (_this.winnerState) {\r\n                _this.displayWinner(_this.currentSymbol === 1 ? \"O\" : \"X\");\r\n                _this.winnerState = false;\r\n            }\r\n            else {\r\n                _this.table.classList.remove(\"finished\");\r\n                _this.hideWinnerBox();\r\n            }\r\n        };\r\n    };\r\n    TicTacToe.prototype.hideWinnerBox = function () {\r\n        var winnerBox = document.querySelector(\".winner\");\r\n        winnerBox.style.display = \"none\";\r\n    };\r\n    TicTacToe.prototype.layoutChanges = function (game) {\r\n        var gameInner = document.createElement(\"div\");\r\n        gameInner.classList.add(\"game\");\r\n        this.i = 0;\r\n        gameInner.insertAdjacentHTML(\"afterbegin\", '<table id=\"tictactoe\"></table><div class=\"winner\"><div class=\"winner__message\"><p><span class=\"message__symbol\"></span> is the winner!</p></div><button class=\"winner__reset\">RESET</button></div>');\r\n        game.appendChild(gameInner);\r\n        this.table = document.getElementById(\"tictactoe\");\r\n        console.log(document.getElementById(\"tictactoe\"));\r\n        this.renderTable(this.gameState);\r\n        console.log(this.gameState);\r\n        this.hideWinnerBox();\r\n        return gameInner;\r\n    };\r\n    TicTacToe.prototype.resetGame = function () {\r\n        this.gameState.fill(\"\", 0, 9);\r\n        this.renderTable(this.gameState);\r\n        this.table.classList.remove(\"finished\");\r\n        this.currentSymbol = 1;\r\n        this.sendData();\r\n    };\r\n    TicTacToe.prototype.renderTable = function (gameState) {\r\n        var _this = this;\r\n        var _a;\r\n        this.i = 0;\r\n        if (document.getElementsByTagName(\"tbody\")[0]) {\r\n            document.getElementsByTagName(\"tbody\")[0].remove();\r\n        }\r\n        for (var r = 0; r < this.size; r++) {\r\n            var row = (_a = this.table) === null || _a === void 0 ? void 0 : _a.insertRow(r);\r\n            var _loop_1 = function (c) {\r\n                var cell = row === null || row === void 0 ? void 0 : row.insertCell(c);\r\n                if (cell) {\r\n                    cell.className = \"cell\";\r\n                    var newCell_1 = new Cell_1.Cell(cell);\r\n                    if (this_1.cells)\r\n                        this_1.cells[this_1.i] = newCell_1;\r\n                    cell.classList.add(\"\" + (r + 1) + (c + 1));\r\n                    cell.textContent = gameState[this_1.size * r + c];\r\n                    cell.addEventListener(\"click\", function () { return _this.makeMove(newCell_1); }, false);\r\n                    cell.style.backgroundColor =\r\n                        cell.textContent === \"X\"\r\n                            ? \"#486ccf\"\r\n                            : cell.textContent === \"O\"\r\n                                ? \"#31a849\"\r\n                                : \"\";\r\n                }\r\n                this_1.i++;\r\n            };\r\n            var this_1 = this;\r\n            for (var c = 0; c < this.size; c++) {\r\n                _loop_1(c);\r\n            }\r\n        }\r\n    };\r\n    TicTacToe.prototype.makeMove = function (cell) {\r\n        if (cell.htmlElement.textContent !== \"\")\r\n            return;\r\n        cell.setCellValue(this.currentSymbol);\r\n        var row = Number(cell.htmlElement.classList[1].slice(0, 1));\r\n        var column = Number(cell.htmlElement.classList[1].slice(1, 2));\r\n        this.gameState[this.size * (row - 1) + (column - 1)] =\r\n            cell.htmlElement.textContent;\r\n        this.checkWinner(cell.htmlElement);\r\n        this.sendData();\r\n        this.handleSocket();\r\n        this.currentSymbol = this.currentSymbol === 1 ? -1 : 1;\r\n    };\r\n    TicTacToe.prototype.isDraw = function () {\r\n        for (var i = 0; i < this.gameState.length; i++) {\r\n            if (this.gameState[i] === \"\")\r\n                return false;\r\n        }\r\n        return true;\r\n    };\r\n    TicTacToe.prototype.checkWinner = function (cell) {\r\n        var col = cell.cellIndex;\r\n        var row = cell.parentNode.rowIndex;\r\n        if (this.cells) {\r\n            if (this.cells[row * this.size].htmlElement.textContent ===\r\n                this.cells[row * this.size + 1].htmlElement.textContent &&\r\n                this.cells[row * this.size].htmlElement.textContent ===\r\n                    this.cells[row * this.size + 2].htmlElement.textContent) {\r\n                this.displayWinner(cell.textContent);\r\n                this.winnerState = true;\r\n            }\r\n            if (this.cells[col].htmlElement.textContent ===\r\n                this.cells[col + this.size].htmlElement.textContent &&\r\n                this.cells[col].htmlElement.textContent ===\r\n                    this.cells[col + this.size * 2].htmlElement.textContent) {\r\n                this.displayWinner(cell.textContent);\r\n                this.winnerState = true;\r\n            }\r\n            if (row === col) {\r\n                if (this.cells[0].htmlElement.textContent ===\r\n                    this.cells[4].htmlElement.textContent &&\r\n                    this.cells[0].htmlElement.textContent ===\r\n                        this.cells[8].htmlElement.textContent) {\r\n                    this.displayWinner(cell.textContent);\r\n                    this.winnerState = true;\r\n                }\r\n            }\r\n            if ((row === 0 && col === 2) ||\r\n                (row === 1 && col === 1) ||\r\n                (row === 2 && col === 0))\r\n                if (this.cells[2].htmlElement.textContent ===\r\n                    this.cells[4].htmlElement.textContent &&\r\n                    this.cells[2].htmlElement.textContent ===\r\n                        this.cells[6].htmlElement.textContent) {\r\n                    this.displayWinner(cell.textContent);\r\n                    this.winnerState = true;\r\n                }\r\n        }\r\n    };\r\n    TicTacToe.prototype.displayWinner = function (winner) {\r\n        var _this = this;\r\n        this.table.classList.add(\"finished\");\r\n        var winnerBox = document.querySelector(\".winner\");\r\n        var messageSymbol = (document.querySelector(\".message__symbol\"));\r\n        var gameResetBtn = (document.querySelector(\".winner__reset\"));\r\n        winnerBox.style.display = \"flex\";\r\n        messageSymbol.textContent = winner;\r\n        gameResetBtn.addEventListener(\"click\", function () {\r\n            _this.resetGame();\r\n            winnerBox.style.display = \"none\";\r\n        });\r\n    };\r\n    return TicTacToe;\r\n}());\r\nexports.TicTacToe = TicTacToe;\r\n\n\n//# sourceURL=webpack://zad2/./src/tictactoe/tictactoe.ts?");

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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