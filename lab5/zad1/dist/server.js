/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/nodeserver/server.ts":
/*!**********************************!*\
  !*** ./src/nodeserver/server.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var http = __importStar(__webpack_require__(/*! http */ "http"));
var websocket = __importStar(__webpack_require__(/*! ws */ "./node_modules/ws/index.js"));
var server = http.createServer();
var socket = new websocket.Server({ server: server });
socket.on("connection", function connection(ws) {
    ws.on("message", function (data) {
        var message;
        try {
            message = JSON.parse(data);
        }
        catch (e) {
            sendError(ws, "Zly format!");
            return;
        }
        if (message.type === "NEW_MOVE") {
            socket.clients.forEach(function (client) {
                if (client.readyState === websocket.OPEN) {
                    client.send(data);
                }
            });
        }
    });
});
var sendError = function (ws, message) {
    var messageObject = {
        type: "error",
        payload: message,
    };
    ws.send(JSON.stringify(messageObject));
};
server.listen(8080);


/***/ }),

/***/ "./node_modules/ws/index.js":
/*!**********************************!*\
  !*** ./node_modules/ws/index.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const WebSocket = __webpack_require__(/*! ./lib/websocket */ "./node_modules/ws/lib/websocket.js");

WebSocket.createWebSocketStream = __webpack_require__(/*! ./lib/stream */ "./node_modules/ws/lib/stream.js");
WebSocket.Server = __webpack_require__(/*! ./lib/websocket-server */ "./node_modules/ws/lib/websocket-server.js");
WebSocket.Receiver = __webpack_require__(/*! ./lib/receiver */ "./node_modules/ws/lib/receiver.js");
WebSocket.Sender = __webpack_require__(/*! ./lib/sender */ "./node_modules/ws/lib/sender.js");

module.exports = WebSocket;


/***/ }),

/***/ "./node_modules/ws/lib/buffer-util.js":
/*!********************************************!*\
  !*** ./node_modules/ws/lib/buffer-util.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const { EMPTY_BUFFER } = __webpack_require__(/*! ./constants */ "./node_modules/ws/lib/constants.js");

/**
 * Merges an array of buffers into a new buffer.
 *
 * @param {Buffer[]} list The array of buffers to concat
 * @param {Number} totalLength The total length of buffers in the list
 * @return {Buffer} The resulting buffer
 * @public
 */
function concat(list, totalLength) {
  if (list.length === 0) return EMPTY_BUFFER;
  if (list.length === 1) return list[0];

  const target = Buffer.allocUnsafe(totalLength);
  let offset = 0;

  for (let i = 0; i < list.length; i++) {
    const buf = list[i];
    target.set(buf, offset);
    offset += buf.length;
  }

  if (offset < totalLength) return target.slice(0, offset);

  return target;
}

/**
 * Masks a buffer using the given mask.
 *
 * @param {Buffer} source The buffer to mask
 * @param {Buffer} mask The mask to use
 * @param {Buffer} output The buffer where to store the result
 * @param {Number} offset The offset at which to start writing
 * @param {Number} length The number of bytes to mask.
 * @public
 */
function _mask(source, mask, output, offset, length) {
  for (let i = 0; i < length; i++) {
    output[offset + i] = source[i] ^ mask[i & 3];
  }
}

/**
 * Unmasks a buffer using the given mask.
 *
 * @param {Buffer} buffer The buffer to unmask
 * @param {Buffer} mask The mask to use
 * @public
 */
function _unmask(buffer, mask) {
  // Required until https://github.com/nodejs/node/issues/9006 is resolved.
  const length = buffer.length;
  for (let i = 0; i < length; i++) {
    buffer[i] ^= mask[i & 3];
  }
}

/**
 * Converts a buffer to an `ArrayBuffer`.
 *
 * @param {Buffer} buf The buffer to convert
 * @return {ArrayBuffer} Converted buffer
 * @public
 */
function toArrayBuffer(buf) {
  if (buf.byteLength === buf.buffer.byteLength) {
    return buf.buffer;
  }

  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

/**
 * Converts `data` to a `Buffer`.
 *
 * @param {*} data The data to convert
 * @return {Buffer} The buffer
 * @throws {TypeError}
 * @public
 */
function toBuffer(data) {
  toBuffer.readOnly = true;

  if (Buffer.isBuffer(data)) return data;

  let buf;

  if (data instanceof ArrayBuffer) {
    buf = Buffer.from(data);
  } else if (ArrayBuffer.isView(data)) {
    buf = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
  } else {
    buf = Buffer.from(data);
    toBuffer.readOnly = false;
  }

  return buf;
}

try {
  const bufferUtil = __webpack_require__(/*! bufferutil */ "bufferutil");
  const bu = bufferUtil.BufferUtil || bufferUtil;

  module.exports = {
    concat,
    mask(source, mask, output, offset, length) {
      if (length < 48) _mask(source, mask, output, offset, length);
      else bu.mask(source, mask, output, offset, length);
    },
    toArrayBuffer,
    toBuffer,
    unmask(buffer, mask) {
      if (buffer.length < 32) _unmask(buffer, mask);
      else bu.unmask(buffer, mask);
    }
  };
} catch (e) /* istanbul ignore next */ {
  module.exports = {
    concat,
    mask: _mask,
    toArrayBuffer,
    toBuffer,
    unmask: _unmask
  };
}


/***/ }),

/***/ "./node_modules/ws/lib/constants.js":
/*!******************************************!*\
  !*** ./node_modules/ws/lib/constants.js ***!
  \******************************************/
/***/ ((module) => {



module.exports = {
  BINARY_TYPES: ['nodebuffer', 'arraybuffer', 'fragments'],
  GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
  kStatusCode: Symbol('status-code'),
  kWebSocket: Symbol('websocket'),
  EMPTY_BUFFER: Buffer.alloc(0),
  NOOP: () => {}
};


/***/ }),

/***/ "./node_modules/ws/lib/event-target.js":
/*!*********************************************!*\
  !*** ./node_modules/ws/lib/event-target.js ***!
  \*********************************************/
/***/ ((module) => {



/**
 * Class representing an event.
 *
 * @private
 */
class Event {
  /**
   * Create a new `Event`.
   *
   * @param {String} type The name of the event
   * @param {Object} target A reference to the target to which the event was
   *     dispatched
   */
  constructor(type, target) {
    this.target = target;
    this.type = type;
  }
}

/**
 * Class representing a message event.
 *
 * @extends Event
 * @private
 */
class MessageEvent extends Event {
  /**
   * Create a new `MessageEvent`.
   *
   * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The received data
   * @param {WebSocket} target A reference to the target to which the event was
   *     dispatched
   */
  constructor(data, target) {
    super('message', target);

    this.data = data;
  }
}

/**
 * Class representing a close event.
 *
 * @extends Event
 * @private
 */
class CloseEvent extends Event {
  /**
   * Create a new `CloseEvent`.
   *
   * @param {Number} code The status code explaining why the connection is being
   *     closed
   * @param {String} reason A human-readable string explaining why the
   *     connection is closing
   * @param {WebSocket} target A reference to the target to which the event was
   *     dispatched
   */
  constructor(code, reason, target) {
    super('close', target);

    this.wasClean = target._closeFrameReceived && target._closeFrameSent;
    this.reason = reason;
    this.code = code;
  }
}

/**
 * Class representing an open event.
 *
 * @extends Event
 * @private
 */
class OpenEvent extends Event {
  /**
   * Create a new `OpenEvent`.
   *
   * @param {WebSocket} target A reference to the target to which the event was
   *     dispatched
   */
  constructor(target) {
    super('open', target);
  }
}

/**
 * Class representing an error event.
 *
 * @extends Event
 * @private
 */
class ErrorEvent extends Event {
  /**
   * Create a new `ErrorEvent`.
   *
   * @param {Object} error The error that generated this event
   * @param {WebSocket} target A reference to the target to which the event was
   *     dispatched
   */
  constructor(error, target) {
    super('error', target);

    this.message = error.message;
    this.error = error;
  }
}

/**
 * This provides methods for emulating the `EventTarget` interface. It's not
 * meant to be used directly.
 *
 * @mixin
 */
const EventTarget = {
  /**
   * Register an event listener.
   *
   * @param {String} type A string representing the event type to listen for
   * @param {Function} listener The listener to add
   * @param {Object} [options] An options object specifies characteristics about
   *     the event listener
   * @param {Boolean} [options.once=false] A `Boolean`` indicating that the
   *     listener should be invoked at most once after being added. If `true`,
   *     the listener would be automatically removed when invoked.
   * @public
   */
  addEventListener(type, listener, options) {
    if (typeof listener !== 'function') return;

    function onMessage(data) {
      listener.call(this, new MessageEvent(data, this));
    }

    function onClose(code, message) {
      listener.call(this, new CloseEvent(code, message, this));
    }

    function onError(error) {
      listener.call(this, new ErrorEvent(error, this));
    }

    function onOpen() {
      listener.call(this, new OpenEvent(this));
    }

    const method = options && options.once ? 'once' : 'on';

    if (type === 'message') {
      onMessage._listener = listener;
      this[method](type, onMessage);
    } else if (type === 'close') {
      onClose._listener = listener;
      this[method](type, onClose);
    } else if (type === 'error') {
      onError._listener = listener;
      this[method](type, onError);
    } else if (type === 'open') {
      onOpen._listener = listener;
      this[method](type, onOpen);
    } else {
      this[method](type, listener);
    }
  },

  /**
   * Remove an event listener.
   *
   * @param {String} type A string representing the event type to remove
   * @param {Function} listener The listener to remove
   * @public
   */
  removeEventListener(type, listener) {
    const listeners = this.listeners(type);

    for (let i = 0; i < listeners.length; i++) {
      if (listeners[i] === listener || listeners[i]._listener === listener) {
        this.removeListener(type, listeners[i]);
      }
    }
  }
};

module.exports = EventTarget;


/***/ }),

/***/ "./node_modules/ws/lib/extension.js":
/*!******************************************!*\
  !*** ./node_modules/ws/lib/extension.js ***!
  \******************************************/
/***/ ((module) => {



//
// Allowed token characters:
//
// '!', '#', '$', '%', '&', ''', '*', '+', '-',
// '.', 0-9, A-Z, '^', '_', '`', a-z, '|', '~'
//
// tokenChars[32] === 0 // ' '
// tokenChars[33] === 1 // '!'
// tokenChars[34] === 0 // '"'
// ...
//
// prettier-ignore
const tokenChars = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
  0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, // 32 - 47
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, // 80 - 95
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0 // 112 - 127
];

/**
 * Adds an offer to the map of extension offers or a parameter to the map of
 * parameters.
 *
 * @param {Object} dest The map of extension offers or parameters
 * @param {String} name The extension or parameter name
 * @param {(Object|Boolean|String)} elem The extension parameters or the
 *     parameter value
 * @private
 */
function push(dest, name, elem) {
  if (dest[name] === undefined) dest[name] = [elem];
  else dest[name].push(elem);
}

/**
 * Parses the `Sec-WebSocket-Extensions` header into an object.
 *
 * @param {String} header The field value of the header
 * @return {Object} The parsed object
 * @public
 */
function parse(header) {
  const offers = Object.create(null);

  if (header === undefined || header === '') return offers;

  let params = Object.create(null);
  let mustUnescape = false;
  let isEscaping = false;
  let inQuotes = false;
  let extensionName;
  let paramName;
  let start = -1;
  let end = -1;
  let i = 0;

  for (; i < header.length; i++) {
    const code = header.charCodeAt(i);

    if (extensionName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (code === 0x20 /* ' ' */ || code === 0x09 /* '\t' */) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b /* ';' */ || code === 0x2c /* ',' */) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        const name = header.slice(start, end);
        if (code === 0x2c) {
          push(offers, name, params);
          params = Object.create(null);
        } else {
          extensionName = name;
        }

        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else if (paramName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (code === 0x20 || code === 0x09) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        push(params, header.slice(start, end), true);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = Object.create(null);
          extensionName = undefined;
        }

        start = end = -1;
      } else if (code === 0x3d /* '=' */ && start !== -1 && end === -1) {
        paramName = header.slice(start, i);
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else {
      //
      // The value of a quoted-string after unescaping must conform to the
      // token ABNF, so only token characters are valid.
      // Ref: https://tools.ietf.org/html/rfc6455#section-9.1
      //
      if (isEscaping) {
        if (tokenChars[code] !== 1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
        if (start === -1) start = i;
        else if (!mustUnescape) mustUnescape = true;
        isEscaping = false;
      } else if (inQuotes) {
        if (tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (code === 0x22 /* '"' */ && start !== -1) {
          inQuotes = false;
          end = i;
        } else if (code === 0x5c /* '\' */) {
          isEscaping = true;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      } else if (code === 0x22 && header.charCodeAt(i - 1) === 0x3d) {
        inQuotes = true;
      } else if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (start !== -1 && (code === 0x20 || code === 0x09)) {
        if (end === -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        let value = header.slice(start, end);
        if (mustUnescape) {
          value = value.replace(/\\/g, '');
          mustUnescape = false;
        }
        push(params, paramName, value);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = Object.create(null);
          extensionName = undefined;
        }

        paramName = undefined;
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    }
  }

  if (start === -1 || inQuotes) {
    throw new SyntaxError('Unexpected end of input');
  }

  if (end === -1) end = i;
  const token = header.slice(start, end);
  if (extensionName === undefined) {
    push(offers, token, params);
  } else {
    if (paramName === undefined) {
      push(params, token, true);
    } else if (mustUnescape) {
      push(params, paramName, token.replace(/\\/g, ''));
    } else {
      push(params, paramName, token);
    }
    push(offers, extensionName, params);
  }

  return offers;
}

/**
 * Builds the `Sec-WebSocket-Extensions` header field value.
 *
 * @param {Object} extensions The map of extensions and parameters to format
 * @return {String} A string representing the given object
 * @public
 */
function format(extensions) {
  return Object.keys(extensions)
    .map((extension) => {
      let configurations = extensions[extension];
      if (!Array.isArray(configurations)) configurations = [configurations];
      return configurations
        .map((params) => {
          return [extension]
            .concat(
              Object.keys(params).map((k) => {
                let values = params[k];
                if (!Array.isArray(values)) values = [values];
                return values
                  .map((v) => (v === true ? k : `${k}=${v}`))
                  .join('; ');
              })
            )
            .join('; ');
        })
        .join(', ');
    })
    .join(', ');
}

module.exports = { format, parse };


/***/ }),

/***/ "./node_modules/ws/lib/limiter.js":
/*!****************************************!*\
  !*** ./node_modules/ws/lib/limiter.js ***!
  \****************************************/
/***/ ((module) => {



const kDone = Symbol('kDone');
const kRun = Symbol('kRun');

/**
 * A very simple job queue with adjustable concurrency. Adapted from
 * https://github.com/STRML/async-limiter
 */
class Limiter {
  /**
   * Creates a new `Limiter`.
   *
   * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
   *     to run concurrently
   */
  constructor(concurrency) {
    this[kDone] = () => {
      this.pending--;
      this[kRun]();
    };
    this.concurrency = concurrency || Infinity;
    this.jobs = [];
    this.pending = 0;
  }

  /**
   * Adds a job to the queue.
   *
   * @param {Function} job The job to run
   * @public
   */
  add(job) {
    this.jobs.push(job);
    this[kRun]();
  }

  /**
   * Removes a job from the queue and runs it if possible.
   *
   * @private
   */
  [kRun]() {
    if (this.pending === this.concurrency) return;

    if (this.jobs.length) {
      const job = this.jobs.shift();

      this.pending++;
      job(this[kDone]);
    }
  }
}

module.exports = Limiter;


/***/ }),

/***/ "./node_modules/ws/lib/permessage-deflate.js":
/*!***************************************************!*\
  !*** ./node_modules/ws/lib/permessage-deflate.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const zlib = __webpack_require__(/*! zlib */ "zlib");

const bufferUtil = __webpack_require__(/*! ./buffer-util */ "./node_modules/ws/lib/buffer-util.js");
const Limiter = __webpack_require__(/*! ./limiter */ "./node_modules/ws/lib/limiter.js");
const { kStatusCode, NOOP } = __webpack_require__(/*! ./constants */ "./node_modules/ws/lib/constants.js");

const TRAILER = Buffer.from([0x00, 0x00, 0xff, 0xff]);
const kPerMessageDeflate = Symbol('permessage-deflate');
const kTotalLength = Symbol('total-length');
const kCallback = Symbol('callback');
const kBuffers = Symbol('buffers');
const kError = Symbol('error');

//
// We limit zlib concurrency, which prevents severe memory fragmentation
// as documented in https://github.com/nodejs/node/issues/8871#issuecomment-250915913
// and https://github.com/websockets/ws/issues/1202
//
// Intentionally global; it's the global thread pool that's an issue.
//
let zlibLimiter;

/**
 * permessage-deflate implementation.
 */
class PerMessageDeflate {
  /**
   * Creates a PerMessageDeflate instance.
   *
   * @param {Object} [options] Configuration options
   * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
   *     disabling of server context takeover
   * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
   *     acknowledge disabling of client context takeover
   * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
   *     use of a custom server window size
   * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
   *     for, or request, a custom client window size
   * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
   *     deflate
   * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
   *     inflate
   * @param {Number} [options.threshold=1024] Size (in bytes) below which
   *     messages should not be compressed
   * @param {Number} [options.concurrencyLimit=10] The number of concurrent
   *     calls to zlib
   * @param {Boolean} [isServer=false] Create the instance in either server or
   *     client mode
   * @param {Number} [maxPayload=0] The maximum allowed message length
   */
  constructor(options, isServer, maxPayload) {
    this._maxPayload = maxPayload | 0;
    this._options = options || {};
    this._threshold =
      this._options.threshold !== undefined ? this._options.threshold : 1024;
    this._isServer = !!isServer;
    this._deflate = null;
    this._inflate = null;

    this.params = null;

    if (!zlibLimiter) {
      const concurrency =
        this._options.concurrencyLimit !== undefined
          ? this._options.concurrencyLimit
          : 10;
      zlibLimiter = new Limiter(concurrency);
    }
  }

  /**
   * @type {String}
   */
  static get extensionName() {
    return 'permessage-deflate';
  }

  /**
   * Create an extension negotiation offer.
   *
   * @return {Object} Extension parameters
   * @public
   */
  offer() {
    const params = {};

    if (this._options.serverNoContextTakeover) {
      params.server_no_context_takeover = true;
    }
    if (this._options.clientNoContextTakeover) {
      params.client_no_context_takeover = true;
    }
    if (this._options.serverMaxWindowBits) {
      params.server_max_window_bits = this._options.serverMaxWindowBits;
    }
    if (this._options.clientMaxWindowBits) {
      params.client_max_window_bits = this._options.clientMaxWindowBits;
    } else if (this._options.clientMaxWindowBits == null) {
      params.client_max_window_bits = true;
    }

    return params;
  }

  /**
   * Accept an extension negotiation offer/response.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Object} Accepted configuration
   * @public
   */
  accept(configurations) {
    configurations = this.normalizeParams(configurations);

    this.params = this._isServer
      ? this.acceptAsServer(configurations)
      : this.acceptAsClient(configurations);

    return this.params;
  }

  /**
   * Releases all resources used by the extension.
   *
   * @public
   */
  cleanup() {
    if (this._inflate) {
      this._inflate.close();
      this._inflate = null;
    }

    if (this._deflate) {
      const callback = this._deflate[kCallback];

      this._deflate.close();
      this._deflate = null;

      if (callback) {
        callback(
          new Error(
            'The deflate stream was closed while data was being processed'
          )
        );
      }
    }
  }

  /**
   *  Accept an extension negotiation offer.
   *
   * @param {Array} offers The extension negotiation offers
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsServer(offers) {
    const opts = this._options;
    const accepted = offers.find((params) => {
      if (
        (opts.serverNoContextTakeover === false &&
          params.server_no_context_takeover) ||
        (params.server_max_window_bits &&
          (opts.serverMaxWindowBits === false ||
            (typeof opts.serverMaxWindowBits === 'number' &&
              opts.serverMaxWindowBits > params.server_max_window_bits))) ||
        (typeof opts.clientMaxWindowBits === 'number' &&
          !params.client_max_window_bits)
      ) {
        return false;
      }

      return true;
    });

    if (!accepted) {
      throw new Error('None of the extension offers can be accepted');
    }

    if (opts.serverNoContextTakeover) {
      accepted.server_no_context_takeover = true;
    }
    if (opts.clientNoContextTakeover) {
      accepted.client_no_context_takeover = true;
    }
    if (typeof opts.serverMaxWindowBits === 'number') {
      accepted.server_max_window_bits = opts.serverMaxWindowBits;
    }
    if (typeof opts.clientMaxWindowBits === 'number') {
      accepted.client_max_window_bits = opts.clientMaxWindowBits;
    } else if (
      accepted.client_max_window_bits === true ||
      opts.clientMaxWindowBits === false
    ) {
      delete accepted.client_max_window_bits;
    }

    return accepted;
  }

  /**
   * Accept the extension negotiation response.
   *
   * @param {Array} response The extension negotiation response
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsClient(response) {
    const params = response[0];

    if (
      this._options.clientNoContextTakeover === false &&
      params.client_no_context_takeover
    ) {
      throw new Error('Unexpected parameter "client_no_context_takeover"');
    }

    if (!params.client_max_window_bits) {
      if (typeof this._options.clientMaxWindowBits === 'number') {
        params.client_max_window_bits = this._options.clientMaxWindowBits;
      }
    } else if (
      this._options.clientMaxWindowBits === false ||
      (typeof this._options.clientMaxWindowBits === 'number' &&
        params.client_max_window_bits > this._options.clientMaxWindowBits)
    ) {
      throw new Error(
        'Unexpected or invalid parameter "client_max_window_bits"'
      );
    }

    return params;
  }

  /**
   * Normalize parameters.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Array} The offers/response with normalized parameters
   * @private
   */
  normalizeParams(configurations) {
    configurations.forEach((params) => {
      Object.keys(params).forEach((key) => {
        let value = params[key];

        if (value.length > 1) {
          throw new Error(`Parameter "${key}" must have only a single value`);
        }

        value = value[0];

        if (key === 'client_max_window_bits') {
          if (value !== true) {
            const num = +value;
            if (!Number.isInteger(num) || num < 8 || num > 15) {
              throw new TypeError(
                `Invalid value for parameter "${key}": ${value}`
              );
            }
            value = num;
          } else if (!this._isServer) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
        } else if (key === 'server_max_window_bits') {
          const num = +value;
          if (!Number.isInteger(num) || num < 8 || num > 15) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
          value = num;
        } else if (
          key === 'client_no_context_takeover' ||
          key === 'server_no_context_takeover'
        ) {
          if (value !== true) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
        } else {
          throw new Error(`Unknown parameter "${key}"`);
        }

        params[key] = value;
      });
    });

    return configurations;
  }

  /**
   * Decompress data. Concurrency limited.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  decompress(data, fin, callback) {
    zlibLimiter.add((done) => {
      this._decompress(data, fin, (err, result) => {
        done();
        callback(err, result);
      });
    });
  }

  /**
   * Compress data. Concurrency limited.
   *
   * @param {Buffer} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  compress(data, fin, callback) {
    zlibLimiter.add((done) => {
      this._compress(data, fin, (err, result) => {
        done();
        callback(err, result);
      });
    });
  }

  /**
   * Decompress data.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _decompress(data, fin, callback) {
    const endpoint = this._isServer ? 'client' : 'server';

    if (!this._inflate) {
      const key = `${endpoint}_max_window_bits`;
      const windowBits =
        typeof this.params[key] !== 'number'
          ? zlib.Z_DEFAULT_WINDOWBITS
          : this.params[key];

      this._inflate = zlib.createInflateRaw({
        ...this._options.zlibInflateOptions,
        windowBits
      });
      this._inflate[kPerMessageDeflate] = this;
      this._inflate[kTotalLength] = 0;
      this._inflate[kBuffers] = [];
      this._inflate.on('error', inflateOnError);
      this._inflate.on('data', inflateOnData);
    }

    this._inflate[kCallback] = callback;

    this._inflate.write(data);
    if (fin) this._inflate.write(TRAILER);

    this._inflate.flush(() => {
      const err = this._inflate[kError];

      if (err) {
        this._inflate.close();
        this._inflate = null;
        callback(err);
        return;
      }

      const data = bufferUtil.concat(
        this._inflate[kBuffers],
        this._inflate[kTotalLength]
      );

      if (this._inflate._readableState.endEmitted) {
        this._inflate.close();
        this._inflate = null;
      } else {
        this._inflate[kTotalLength] = 0;
        this._inflate[kBuffers] = [];

        if (fin && this.params[`${endpoint}_no_context_takeover`]) {
          this._inflate.reset();
        }
      }

      callback(null, data);
    });
  }

  /**
   * Compress data.
   *
   * @param {Buffer} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _compress(data, fin, callback) {
    const endpoint = this._isServer ? 'server' : 'client';

    if (!this._deflate) {
      const key = `${endpoint}_max_window_bits`;
      const windowBits =
        typeof this.params[key] !== 'number'
          ? zlib.Z_DEFAULT_WINDOWBITS
          : this.params[key];

      this._deflate = zlib.createDeflateRaw({
        ...this._options.zlibDeflateOptions,
        windowBits
      });

      this._deflate[kTotalLength] = 0;
      this._deflate[kBuffers] = [];

      //
      // An `'error'` event is emitted, only on Node.js < 10.0.0, if the
      // `zlib.DeflateRaw` instance is closed while data is being processed.
      // This can happen if `PerMessageDeflate#cleanup()` is called at the wrong
      // time due to an abnormal WebSocket closure.
      //
      this._deflate.on('error', NOOP);
      this._deflate.on('data', deflateOnData);
    }

    this._deflate[kCallback] = callback;

    this._deflate.write(data);
    this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
      if (!this._deflate) {
        //
        // The deflate stream was closed while data was being processed.
        //
        return;
      }

      let data = bufferUtil.concat(
        this._deflate[kBuffers],
        this._deflate[kTotalLength]
      );

      if (fin) data = data.slice(0, data.length - 4);

      //
      // Ensure that the callback will not be called again in
      // `PerMessageDeflate#cleanup()`.
      //
      this._deflate[kCallback] = null;

      this._deflate[kTotalLength] = 0;
      this._deflate[kBuffers] = [];

      if (fin && this.params[`${endpoint}_no_context_takeover`]) {
        this._deflate.reset();
      }

      callback(null, data);
    });
  }
}

module.exports = PerMessageDeflate;

/**
 * The listener of the `zlib.DeflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function deflateOnData(chunk) {
  this[kBuffers].push(chunk);
  this[kTotalLength] += chunk.length;
}

/**
 * The listener of the `zlib.InflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function inflateOnData(chunk) {
  this[kTotalLength] += chunk.length;

  if (
    this[kPerMessageDeflate]._maxPayload < 1 ||
    this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload
  ) {
    this[kBuffers].push(chunk);
    return;
  }

  this[kError] = new RangeError('Max payload size exceeded');
  this[kError][kStatusCode] = 1009;
  this.removeListener('data', inflateOnData);
  this.reset();
}

/**
 * The listener of the `zlib.InflateRaw` stream `'error'` event.
 *
 * @param {Error} err The emitted error
 * @private
 */
function inflateOnError(err) {
  //
  // There is no need to call `Zlib#close()` as the handle is automatically
  // closed when an error is emitted.
  //
  this[kPerMessageDeflate]._inflate = null;
  err[kStatusCode] = 1007;
  this[kCallback](err);
}


/***/ }),

/***/ "./node_modules/ws/lib/receiver.js":
/*!*****************************************!*\
  !*** ./node_modules/ws/lib/receiver.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const { Writable } = __webpack_require__(/*! stream */ "stream");

const PerMessageDeflate = __webpack_require__(/*! ./permessage-deflate */ "./node_modules/ws/lib/permessage-deflate.js");
const {
  BINARY_TYPES,
  EMPTY_BUFFER,
  kStatusCode,
  kWebSocket
} = __webpack_require__(/*! ./constants */ "./node_modules/ws/lib/constants.js");
const { concat, toArrayBuffer, unmask } = __webpack_require__(/*! ./buffer-util */ "./node_modules/ws/lib/buffer-util.js");
const { isValidStatusCode, isValidUTF8 } = __webpack_require__(/*! ./validation */ "./node_modules/ws/lib/validation.js");

const GET_INFO = 0;
const GET_PAYLOAD_LENGTH_16 = 1;
const GET_PAYLOAD_LENGTH_64 = 2;
const GET_MASK = 3;
const GET_DATA = 4;
const INFLATING = 5;

/**
 * HyBi Receiver implementation.
 *
 * @extends stream.Writable
 */
class Receiver extends Writable {
  /**
   * Creates a Receiver instance.
   *
   * @param {String} [binaryType=nodebuffer] The type for binary data
   * @param {Object} [extensions] An object containing the negotiated extensions
   * @param {Boolean} [isServer=false] Specifies whether to operate in client or
   *     server mode
   * @param {Number} [maxPayload=0] The maximum allowed message length
   */
  constructor(binaryType, extensions, isServer, maxPayload) {
    super();

    this._binaryType = binaryType || BINARY_TYPES[0];
    this[kWebSocket] = undefined;
    this._extensions = extensions || {};
    this._isServer = !!isServer;
    this._maxPayload = maxPayload | 0;

    this._bufferedBytes = 0;
    this._buffers = [];

    this._compressed = false;
    this._payloadLength = 0;
    this._mask = undefined;
    this._fragmented = 0;
    this._masked = false;
    this._fin = false;
    this._opcode = 0;

    this._totalPayloadLength = 0;
    this._messageLength = 0;
    this._fragments = [];

    this._state = GET_INFO;
    this._loop = false;
  }

  /**
   * Implements `Writable.prototype._write()`.
   *
   * @param {Buffer} chunk The chunk of data to write
   * @param {String} encoding The character encoding of `chunk`
   * @param {Function} cb Callback
   * @private
   */
  _write(chunk, encoding, cb) {
    if (this._opcode === 0x08 && this._state == GET_INFO) return cb();

    this._bufferedBytes += chunk.length;
    this._buffers.push(chunk);
    this.startLoop(cb);
  }

  /**
   * Consumes `n` bytes from the buffered data.
   *
   * @param {Number} n The number of bytes to consume
   * @return {Buffer} The consumed bytes
   * @private
   */
  consume(n) {
    this._bufferedBytes -= n;

    if (n === this._buffers[0].length) return this._buffers.shift();

    if (n < this._buffers[0].length) {
      const buf = this._buffers[0];
      this._buffers[0] = buf.slice(n);
      return buf.slice(0, n);
    }

    const dst = Buffer.allocUnsafe(n);

    do {
      const buf = this._buffers[0];
      const offset = dst.length - n;

      if (n >= buf.length) {
        dst.set(this._buffers.shift(), offset);
      } else {
        dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
        this._buffers[0] = buf.slice(n);
      }

      n -= buf.length;
    } while (n > 0);

    return dst;
  }

  /**
   * Starts the parsing loop.
   *
   * @param {Function} cb Callback
   * @private
   */
  startLoop(cb) {
    let err;
    this._loop = true;

    do {
      switch (this._state) {
        case GET_INFO:
          err = this.getInfo();
          break;
        case GET_PAYLOAD_LENGTH_16:
          err = this.getPayloadLength16();
          break;
        case GET_PAYLOAD_LENGTH_64:
          err = this.getPayloadLength64();
          break;
        case GET_MASK:
          this.getMask();
          break;
        case GET_DATA:
          err = this.getData(cb);
          break;
        default:
          // `INFLATING`
          this._loop = false;
          return;
      }
    } while (this._loop);

    cb(err);
  }

  /**
   * Reads the first two bytes of a frame.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getInfo() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    const buf = this.consume(2);

    if ((buf[0] & 0x30) !== 0x00) {
      this._loop = false;
      return error(RangeError, 'RSV2 and RSV3 must be clear', true, 1002);
    }

    const compressed = (buf[0] & 0x40) === 0x40;

    if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
      this._loop = false;
      return error(RangeError, 'RSV1 must be clear', true, 1002);
    }

    this._fin = (buf[0] & 0x80) === 0x80;
    this._opcode = buf[0] & 0x0f;
    this._payloadLength = buf[1] & 0x7f;

    if (this._opcode === 0x00) {
      if (compressed) {
        this._loop = false;
        return error(RangeError, 'RSV1 must be clear', true, 1002);
      }

      if (!this._fragmented) {
        this._loop = false;
        return error(RangeError, 'invalid opcode 0', true, 1002);
      }

      this._opcode = this._fragmented;
    } else if (this._opcode === 0x01 || this._opcode === 0x02) {
      if (this._fragmented) {
        this._loop = false;
        return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002);
      }

      this._compressed = compressed;
    } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
      if (!this._fin) {
        this._loop = false;
        return error(RangeError, 'FIN must be set', true, 1002);
      }

      if (compressed) {
        this._loop = false;
        return error(RangeError, 'RSV1 must be clear', true, 1002);
      }

      if (this._payloadLength > 0x7d) {
        this._loop = false;
        return error(
          RangeError,
          `invalid payload length ${this._payloadLength}`,
          true,
          1002
        );
      }
    } else {
      this._loop = false;
      return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002);
    }

    if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
    this._masked = (buf[1] & 0x80) === 0x80;

    if (this._isServer) {
      if (!this._masked) {
        this._loop = false;
        return error(RangeError, 'MASK must be set', true, 1002);
      }
    } else if (this._masked) {
      this._loop = false;
      return error(RangeError, 'MASK must be clear', true, 1002);
    }

    if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
    else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
    else return this.haveLength();
  }

  /**
   * Gets extended payload length (7+16).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getPayloadLength16() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    this._payloadLength = this.consume(2).readUInt16BE(0);
    return this.haveLength();
  }

  /**
   * Gets extended payload length (7+64).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getPayloadLength64() {
    if (this._bufferedBytes < 8) {
      this._loop = false;
      return;
    }

    const buf = this.consume(8);
    const num = buf.readUInt32BE(0);

    //
    // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
    // if payload length is greater than this number.
    //
    if (num > Math.pow(2, 53 - 32) - 1) {
      this._loop = false;
      return error(
        RangeError,
        'Unsupported WebSocket frame: payload length > 2^53 - 1',
        false,
        1009
      );
    }

    this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
    return this.haveLength();
  }

  /**
   * Payload length has been read.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  haveLength() {
    if (this._payloadLength && this._opcode < 0x08) {
      this._totalPayloadLength += this._payloadLength;
      if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
        this._loop = false;
        return error(RangeError, 'Max payload size exceeded', false, 1009);
      }
    }

    if (this._masked) this._state = GET_MASK;
    else this._state = GET_DATA;
  }

  /**
   * Reads mask bytes.
   *
   * @private
   */
  getMask() {
    if (this._bufferedBytes < 4) {
      this._loop = false;
      return;
    }

    this._mask = this.consume(4);
    this._state = GET_DATA;
  }

  /**
   * Reads data bytes.
   *
   * @param {Function} cb Callback
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  getData(cb) {
    let data = EMPTY_BUFFER;

    if (this._payloadLength) {
      if (this._bufferedBytes < this._payloadLength) {
        this._loop = false;
        return;
      }

      data = this.consume(this._payloadLength);
      if (this._masked) unmask(data, this._mask);
    }

    if (this._opcode > 0x07) return this.controlMessage(data);

    if (this._compressed) {
      this._state = INFLATING;
      this.decompress(data, cb);
      return;
    }

    if (data.length) {
      //
      // This message is not compressed so its lenght is the sum of the payload
      // length of all fragments.
      //
      this._messageLength = this._totalPayloadLength;
      this._fragments.push(data);
    }

    return this.dataMessage();
  }

  /**
   * Decompresses data.
   *
   * @param {Buffer} data Compressed data
   * @param {Function} cb Callback
   * @private
   */
  decompress(data, cb) {
    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

    perMessageDeflate.decompress(data, this._fin, (err, buf) => {
      if (err) return cb(err);

      if (buf.length) {
        this._messageLength += buf.length;
        if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
          return cb(
            error(RangeError, 'Max payload size exceeded', false, 1009)
          );
        }

        this._fragments.push(buf);
      }

      const er = this.dataMessage();
      if (er) return cb(er);

      this.startLoop(cb);
    });
  }

  /**
   * Handles a data message.
   *
   * @return {(Error|undefined)} A possible error
   * @private
   */
  dataMessage() {
    if (this._fin) {
      const messageLength = this._messageLength;
      const fragments = this._fragments;

      this._totalPayloadLength = 0;
      this._messageLength = 0;
      this._fragmented = 0;
      this._fragments = [];

      if (this._opcode === 2) {
        let data;

        if (this._binaryType === 'nodebuffer') {
          data = concat(fragments, messageLength);
        } else if (this._binaryType === 'arraybuffer') {
          data = toArrayBuffer(concat(fragments, messageLength));
        } else {
          data = fragments;
        }

        this.emit('message', data);
      } else {
        const buf = concat(fragments, messageLength);

        if (!isValidUTF8(buf)) {
          this._loop = false;
          return error(Error, 'invalid UTF-8 sequence', true, 1007);
        }

        this.emit('message', buf.toString());
      }
    }

    this._state = GET_INFO;
  }

  /**
   * Handles a control message.
   *
   * @param {Buffer} data Data to handle
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  controlMessage(data) {
    if (this._opcode === 0x08) {
      this._loop = false;

      if (data.length === 0) {
        this.emit('conclude', 1005, '');
        this.end();
      } else if (data.length === 1) {
        return error(RangeError, 'invalid payload length 1', true, 1002);
      } else {
        const code = data.readUInt16BE(0);

        if (!isValidStatusCode(code)) {
          return error(RangeError, `invalid status code ${code}`, true, 1002);
        }

        const buf = data.slice(2);

        if (!isValidUTF8(buf)) {
          return error(Error, 'invalid UTF-8 sequence', true, 1007);
        }

        this.emit('conclude', code, buf.toString());
        this.end();
      }
    } else if (this._opcode === 0x09) {
      this.emit('ping', data);
    } else {
      this.emit('pong', data);
    }

    this._state = GET_INFO;
  }
}

module.exports = Receiver;

/**
 * Builds an error object.
 *
 * @param {(Error|RangeError)} ErrorCtor The error constructor
 * @param {String} message The error message
 * @param {Boolean} prefix Specifies whether or not to add a default prefix to
 *     `message`
 * @param {Number} statusCode The status code
 * @return {(Error|RangeError)} The error
 * @private
 */
function error(ErrorCtor, message, prefix, statusCode) {
  const err = new ErrorCtor(
    prefix ? `Invalid WebSocket frame: ${message}` : message
  );

  Error.captureStackTrace(err, error);
  err[kStatusCode] = statusCode;
  return err;
}


/***/ }),

/***/ "./node_modules/ws/lib/sender.js":
/*!***************************************!*\
  !*** ./node_modules/ws/lib/sender.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const { randomFillSync } = __webpack_require__(/*! crypto */ "crypto");

const PerMessageDeflate = __webpack_require__(/*! ./permessage-deflate */ "./node_modules/ws/lib/permessage-deflate.js");
const { EMPTY_BUFFER } = __webpack_require__(/*! ./constants */ "./node_modules/ws/lib/constants.js");
const { isValidStatusCode } = __webpack_require__(/*! ./validation */ "./node_modules/ws/lib/validation.js");
const { mask: applyMask, toBuffer } = __webpack_require__(/*! ./buffer-util */ "./node_modules/ws/lib/buffer-util.js");

const mask = Buffer.alloc(4);

/**
 * HyBi Sender implementation.
 */
class Sender {
  /**
   * Creates a Sender instance.
   *
   * @param {net.Socket} socket The connection socket
   * @param {Object} [extensions] An object containing the negotiated extensions
   */
  constructor(socket, extensions) {
    this._extensions = extensions || {};
    this._socket = socket;

    this._firstFragment = true;
    this._compress = false;

    this._bufferedBytes = 0;
    this._deflating = false;
    this._queue = [];
  }

  /**
   * Frames a piece of data according to the HyBi WebSocket protocol.
   *
   * @param {Buffer} data The data to frame
   * @param {Object} options Options object
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @return {Buffer[]} The framed data as a list of `Buffer` instances
   * @public
   */
  static frame(data, options) {
    const merge = options.mask && options.readOnly;
    let offset = options.mask ? 6 : 2;
    let payloadLength = data.length;

    if (data.length >= 65536) {
      offset += 8;
      payloadLength = 127;
    } else if (data.length > 125) {
      offset += 2;
      payloadLength = 126;
    }

    const target = Buffer.allocUnsafe(merge ? data.length + offset : offset);

    target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
    if (options.rsv1) target[0] |= 0x40;

    target[1] = payloadLength;

    if (payloadLength === 126) {
      target.writeUInt16BE(data.length, 2);
    } else if (payloadLength === 127) {
      target.writeUInt32BE(0, 2);
      target.writeUInt32BE(data.length, 6);
    }

    if (!options.mask) return [target, data];

    randomFillSync(mask, 0, 4);

    target[1] |= 0x80;
    target[offset - 4] = mask[0];
    target[offset - 3] = mask[1];
    target[offset - 2] = mask[2];
    target[offset - 1] = mask[3];

    if (merge) {
      applyMask(data, mask, target, offset, data.length);
      return [target];
    }

    applyMask(data, mask, data, 0, data.length);
    return [target, data];
  }

  /**
   * Sends a close message to the other peer.
   *
   * @param {Number} [code] The status code component of the body
   * @param {String} [data] The message component of the body
   * @param {Boolean} [mask=false] Specifies whether or not to mask the message
   * @param {Function} [cb] Callback
   * @public
   */
  close(code, data, mask, cb) {
    let buf;

    if (code === undefined) {
      buf = EMPTY_BUFFER;
    } else if (typeof code !== 'number' || !isValidStatusCode(code)) {
      throw new TypeError('First argument must be a valid error code number');
    } else if (data === undefined || data === '') {
      buf = Buffer.allocUnsafe(2);
      buf.writeUInt16BE(code, 0);
    } else {
      const length = Buffer.byteLength(data);

      if (length > 123) {
        throw new RangeError('The message must not be greater than 123 bytes');
      }

      buf = Buffer.allocUnsafe(2 + length);
      buf.writeUInt16BE(code, 0);
      buf.write(data, 2);
    }

    if (this._deflating) {
      this.enqueue([this.doClose, buf, mask, cb]);
    } else {
      this.doClose(buf, mask, cb);
    }
  }

  /**
   * Frames and sends a close message.
   *
   * @param {Buffer} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @private
   */
  doClose(data, mask, cb) {
    this.sendFrame(
      Sender.frame(data, {
        fin: true,
        rsv1: false,
        opcode: 0x08,
        mask,
        readOnly: false
      }),
      cb
    );
  }

  /**
   * Sends a ping message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  ping(data, mask, cb) {
    const buf = toBuffer(data);

    if (buf.length > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    if (this._deflating) {
      this.enqueue([this.doPing, buf, mask, toBuffer.readOnly, cb]);
    } else {
      this.doPing(buf, mask, toBuffer.readOnly, cb);
    }
  }

  /**
   * Frames and sends a ping message.
   *
   * @param {Buffer} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Boolean} [readOnly=false] Specifies whether `data` can be modified
   * @param {Function} [cb] Callback
   * @private
   */
  doPing(data, mask, readOnly, cb) {
    this.sendFrame(
      Sender.frame(data, {
        fin: true,
        rsv1: false,
        opcode: 0x09,
        mask,
        readOnly
      }),
      cb
    );
  }

  /**
   * Sends a pong message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  pong(data, mask, cb) {
    const buf = toBuffer(data);

    if (buf.length > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    if (this._deflating) {
      this.enqueue([this.doPong, buf, mask, toBuffer.readOnly, cb]);
    } else {
      this.doPong(buf, mask, toBuffer.readOnly, cb);
    }
  }

  /**
   * Frames and sends a pong message.
   *
   * @param {Buffer} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Boolean} [readOnly=false] Specifies whether `data` can be modified
   * @param {Function} [cb] Callback
   * @private
   */
  doPong(data, mask, readOnly, cb) {
    this.sendFrame(
      Sender.frame(data, {
        fin: true,
        rsv1: false,
        opcode: 0x0a,
        mask,
        readOnly
      }),
      cb
    );
  }

  /**
   * Sends a data message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} [options.compress=false] Specifies whether or not to
   *     compress `data`
   * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
   *     or text
   * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Function} [cb] Callback
   * @public
   */
  send(data, options, cb) {
    const buf = toBuffer(data);
    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
    let opcode = options.binary ? 2 : 1;
    let rsv1 = options.compress;

    if (this._firstFragment) {
      this._firstFragment = false;
      if (rsv1 && perMessageDeflate) {
        rsv1 = buf.length >= perMessageDeflate._threshold;
      }
      this._compress = rsv1;
    } else {
      rsv1 = false;
      opcode = 0;
    }

    if (options.fin) this._firstFragment = true;

    if (perMessageDeflate) {
      const opts = {
        fin: options.fin,
        rsv1,
        opcode,
        mask: options.mask,
        readOnly: toBuffer.readOnly
      };

      if (this._deflating) {
        this.enqueue([this.dispatch, buf, this._compress, opts, cb]);
      } else {
        this.dispatch(buf, this._compress, opts, cb);
      }
    } else {
      this.sendFrame(
        Sender.frame(buf, {
          fin: options.fin,
          rsv1: false,
          opcode,
          mask: options.mask,
          readOnly: toBuffer.readOnly
        }),
        cb
      );
    }
  }

  /**
   * Dispatches a data message.
   *
   * @param {Buffer} data The message to send
   * @param {Boolean} [compress=false] Specifies whether or not to compress
   *     `data`
   * @param {Object} options Options object
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @param {Function} [cb] Callback
   * @private
   */
  dispatch(data, compress, options, cb) {
    if (!compress) {
      this.sendFrame(Sender.frame(data, options), cb);
      return;
    }

    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

    this._bufferedBytes += data.length;
    this._deflating = true;
    perMessageDeflate.compress(data, options.fin, (_, buf) => {
      if (this._socket.destroyed) {
        const err = new Error(
          'The socket was closed while data was being compressed'
        );

        if (typeof cb === 'function') cb(err);

        for (let i = 0; i < this._queue.length; i++) {
          const callback = this._queue[i][4];

          if (typeof callback === 'function') callback(err);
        }

        return;
      }

      this._bufferedBytes -= data.length;
      this._deflating = false;
      options.readOnly = false;
      this.sendFrame(Sender.frame(buf, options), cb);
      this.dequeue();
    });
  }

  /**
   * Executes queued send operations.
   *
   * @private
   */
  dequeue() {
    while (!this._deflating && this._queue.length) {
      const params = this._queue.shift();

      this._bufferedBytes -= params[1].length;
      Reflect.apply(params[0], this, params.slice(1));
    }
  }

  /**
   * Enqueues a send operation.
   *
   * @param {Array} params Send operation parameters.
   * @private
   */
  enqueue(params) {
    this._bufferedBytes += params[1].length;
    this._queue.push(params);
  }

  /**
   * Sends a frame.
   *
   * @param {Buffer[]} list The frame to send
   * @param {Function} [cb] Callback
   * @private
   */
  sendFrame(list, cb) {
    if (list.length === 2) {
      this._socket.cork();
      this._socket.write(list[0]);
      this._socket.write(list[1], cb);
      this._socket.uncork();
    } else {
      this._socket.write(list[0], cb);
    }
  }
}

module.exports = Sender;


/***/ }),

/***/ "./node_modules/ws/lib/stream.js":
/*!***************************************!*\
  !*** ./node_modules/ws/lib/stream.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const { Duplex } = __webpack_require__(/*! stream */ "stream");

/**
 * Emits the `'close'` event on a stream.
 *
 * @param {stream.Duplex} The stream.
 * @private
 */
function emitClose(stream) {
  stream.emit('close');
}

/**
 * The listener of the `'end'` event.
 *
 * @private
 */
function duplexOnEnd() {
  if (!this.destroyed && this._writableState.finished) {
    this.destroy();
  }
}

/**
 * The listener of the `'error'` event.
 *
 * @param {Error} err The error
 * @private
 */
function duplexOnError(err) {
  this.removeListener('error', duplexOnError);
  this.destroy();
  if (this.listenerCount('error') === 0) {
    // Do not suppress the throwing behavior.
    this.emit('error', err);
  }
}

/**
 * Wraps a `WebSocket` in a duplex stream.
 *
 * @param {WebSocket} ws The `WebSocket` to wrap
 * @param {Object} [options] The options for the `Duplex` constructor
 * @return {stream.Duplex} The duplex stream
 * @public
 */
function createWebSocketStream(ws, options) {
  let resumeOnReceiverDrain = true;

  function receiverOnDrain() {
    if (resumeOnReceiverDrain) ws._socket.resume();
  }

  if (ws.readyState === ws.CONNECTING) {
    ws.once('open', function open() {
      ws._receiver.removeAllListeners('drain');
      ws._receiver.on('drain', receiverOnDrain);
    });
  } else {
    ws._receiver.removeAllListeners('drain');
    ws._receiver.on('drain', receiverOnDrain);
  }

  const duplex = new Duplex({
    ...options,
    autoDestroy: false,
    emitClose: false,
    objectMode: false,
    writableObjectMode: false
  });

  ws.on('message', function message(msg) {
    if (!duplex.push(msg)) {
      resumeOnReceiverDrain = false;
      ws._socket.pause();
    }
  });

  ws.once('error', function error(err) {
    if (duplex.destroyed) return;

    duplex.destroy(err);
  });

  ws.once('close', function close() {
    if (duplex.destroyed) return;

    duplex.push(null);
  });

  duplex._destroy = function (err, callback) {
    if (ws.readyState === ws.CLOSED) {
      callback(err);
      process.nextTick(emitClose, duplex);
      return;
    }

    let called = false;

    ws.once('error', function error(err) {
      called = true;
      callback(err);
    });

    ws.once('close', function close() {
      if (!called) callback(err);
      process.nextTick(emitClose, duplex);
    });
    ws.terminate();
  };

  duplex._final = function (callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once('open', function open() {
        duplex._final(callback);
      });
      return;
    }

    // If the value of the `_socket` property is `null` it means that `ws` is a
    // client websocket and the handshake failed. In fact, when this happens, a
    // socket is never assigned to the websocket. Wait for the `'error'` event
    // that will be emitted by the websocket.
    if (ws._socket === null) return;

    if (ws._socket._writableState.finished) {
      callback();
      if (duplex._readableState.endEmitted) duplex.destroy();
    } else {
      ws._socket.once('finish', function finish() {
        // `duplex` is not destroyed here because the `'end'` event will be
        // emitted on `duplex` after this `'finish'` event. The EOF signaling
        // `null` chunk is, in fact, pushed when the websocket emits `'close'`.
        callback();
      });
      ws.close();
    }
  };

  duplex._read = function () {
    if (ws.readyState === ws.OPEN && !resumeOnReceiverDrain) {
      resumeOnReceiverDrain = true;
      if (!ws._receiver._writableState.needDrain) ws._socket.resume();
    }
  };

  duplex._write = function (chunk, encoding, callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once('open', function open() {
        duplex._write(chunk, encoding, callback);
      });
      return;
    }

    ws.send(chunk, callback);
  };

  duplex.on('end', duplexOnEnd);
  duplex.on('error', duplexOnError);
  return duplex;
}

module.exports = createWebSocketStream;


/***/ }),

/***/ "./node_modules/ws/lib/validation.js":
/*!*******************************************!*\
  !*** ./node_modules/ws/lib/validation.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/**
 * Checks if a status code is allowed in a close frame.
 *
 * @param {Number} code The status code
 * @return {Boolean} `true` if the status code is valid, else `false`
 * @public
 */
function isValidStatusCode(code) {
  return (
    (code >= 1000 &&
      code <= 1014 &&
      code !== 1004 &&
      code !== 1005 &&
      code !== 1006) ||
    (code >= 3000 && code <= 4999)
  );
}

/**
 * Checks if a given buffer contains only correct UTF-8.
 * Ported from https://www.cl.cam.ac.uk/%7Emgk25/ucs/utf8_check.c by
 * Markus Kuhn.
 *
 * @param {Buffer} buf The buffer to check
 * @return {Boolean} `true` if `buf` contains only correct UTF-8, else `false`
 * @public
 */
function _isValidUTF8(buf) {
  const len = buf.length;
  let i = 0;

  while (i < len) {
    if ((buf[i] & 0x80) === 0) {
      // 0xxxxxxx
      i++;
    } else if ((buf[i] & 0xe0) === 0xc0) {
      // 110xxxxx 10xxxxxx
      if (
        i + 1 === len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i] & 0xfe) === 0xc0 // Overlong
      ) {
        return false;
      }

      i += 2;
    } else if ((buf[i] & 0xf0) === 0xe0) {
      // 1110xxxx 10xxxxxx 10xxxxxx
      if (
        i + 2 >= len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i + 2] & 0xc0) !== 0x80 ||
        (buf[i] === 0xe0 && (buf[i + 1] & 0xe0) === 0x80) || // Overlong
        (buf[i] === 0xed && (buf[i + 1] & 0xe0) === 0xa0) // Surrogate (U+D800 - U+DFFF)
      ) {
        return false;
      }

      i += 3;
    } else if ((buf[i] & 0xf8) === 0xf0) {
      // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
      if (
        i + 3 >= len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i + 2] & 0xc0) !== 0x80 ||
        (buf[i + 3] & 0xc0) !== 0x80 ||
        (buf[i] === 0xf0 && (buf[i + 1] & 0xf0) === 0x80) || // Overlong
        (buf[i] === 0xf4 && buf[i + 1] > 0x8f) ||
        buf[i] > 0xf4 // > U+10FFFF
      ) {
        return false;
      }

      i += 4;
    } else {
      return false;
    }
  }

  return true;
}

try {
  let isValidUTF8 = __webpack_require__(/*! utf-8-validate */ "utf-8-validate");

  /* istanbul ignore if */
  if (typeof isValidUTF8 === 'object') {
    isValidUTF8 = isValidUTF8.Validation.isValidUTF8; // utf-8-validate@<3.0.0
  }

  module.exports = {
    isValidStatusCode,
    isValidUTF8(buf) {
      return buf.length < 150 ? _isValidUTF8(buf) : isValidUTF8(buf);
    }
  };
} catch (e) /* istanbul ignore next */ {
  module.exports = {
    isValidStatusCode,
    isValidUTF8: _isValidUTF8
  };
}


/***/ }),

/***/ "./node_modules/ws/lib/websocket-server.js":
/*!*************************************************!*\
  !*** ./node_modules/ws/lib/websocket-server.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const EventEmitter = __webpack_require__(/*! events */ "events");
const { createHash } = __webpack_require__(/*! crypto */ "crypto");
const { createServer, STATUS_CODES } = __webpack_require__(/*! http */ "http");

const PerMessageDeflate = __webpack_require__(/*! ./permessage-deflate */ "./node_modules/ws/lib/permessage-deflate.js");
const WebSocket = __webpack_require__(/*! ./websocket */ "./node_modules/ws/lib/websocket.js");
const { format, parse } = __webpack_require__(/*! ./extension */ "./node_modules/ws/lib/extension.js");
const { GUID, kWebSocket } = __webpack_require__(/*! ./constants */ "./node_modules/ws/lib/constants.js");

const keyRegex = /^[+/0-9A-Za-z]{22}==$/;

/**
 * Class representing a WebSocket server.
 *
 * @extends EventEmitter
 */
class WebSocketServer extends EventEmitter {
  /**
   * Create a `WebSocketServer` instance.
   *
   * @param {Object} options Configuration options
   * @param {Number} [options.backlog=511] The maximum length of the queue of
   *     pending connections
   * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
   *     track clients
   * @param {Function} [options.handleProtocols] A hook to handle protocols
   * @param {String} [options.host] The hostname where to bind the server
   * @param {Number} [options.maxPayload=104857600] The maximum allowed message
   *     size
   * @param {Boolean} [options.noServer=false] Enable no server mode
   * @param {String} [options.path] Accept only connections matching this path
   * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
   *     permessage-deflate
   * @param {Number} [options.port] The port where to bind the server
   * @param {http.Server} [options.server] A pre-created HTTP/S server to use
   * @param {Function} [options.verifyClient] A hook to reject connections
   * @param {Function} [callback] A listener for the `listening` event
   */
  constructor(options, callback) {
    super();

    options = {
      maxPayload: 100 * 1024 * 1024,
      perMessageDeflate: false,
      handleProtocols: null,
      clientTracking: true,
      verifyClient: null,
      noServer: false,
      backlog: null, // use default (511 as implemented in net.js)
      server: null,
      host: null,
      path: null,
      port: null,
      ...options
    };

    if (options.port == null && !options.server && !options.noServer) {
      throw new TypeError(
        'One of the "port", "server", or "noServer" options must be specified'
      );
    }

    if (options.port != null) {
      this._server = createServer((req, res) => {
        const body = STATUS_CODES[426];

        res.writeHead(426, {
          'Content-Length': body.length,
          'Content-Type': 'text/plain'
        });
        res.end(body);
      });
      this._server.listen(
        options.port,
        options.host,
        options.backlog,
        callback
      );
    } else if (options.server) {
      this._server = options.server;
    }

    if (this._server) {
      const emitConnection = this.emit.bind(this, 'connection');

      this._removeListeners = addListeners(this._server, {
        listening: this.emit.bind(this, 'listening'),
        error: this.emit.bind(this, 'error'),
        upgrade: (req, socket, head) => {
          this.handleUpgrade(req, socket, head, emitConnection);
        }
      });
    }

    if (options.perMessageDeflate === true) options.perMessageDeflate = {};
    if (options.clientTracking) this.clients = new Set();
    this.options = options;
  }

  /**
   * Returns the bound address, the address family name, and port of the server
   * as reported by the operating system if listening on an IP socket.
   * If the server is listening on a pipe or UNIX domain socket, the name is
   * returned as a string.
   *
   * @return {(Object|String|null)} The address of the server
   * @public
   */
  address() {
    if (this.options.noServer) {
      throw new Error('The server is operating in "noServer" mode');
    }

    if (!this._server) return null;
    return this._server.address();
  }

  /**
   * Close the server.
   *
   * @param {Function} [cb] Callback
   * @public
   */
  close(cb) {
    if (cb) this.once('close', cb);

    //
    // Terminate all associated clients.
    //
    if (this.clients) {
      for (const client of this.clients) client.terminate();
    }

    const server = this._server;

    if (server) {
      this._removeListeners();
      this._removeListeners = this._server = null;

      //
      // Close the http server if it was internally created.
      //
      if (this.options.port != null) {
        server.close(() => this.emit('close'));
        return;
      }
    }

    process.nextTick(emitClose, this);
  }

  /**
   * See if a given request should be handled by this server instance.
   *
   * @param {http.IncomingMessage} req Request object to inspect
   * @return {Boolean} `true` if the request is valid, else `false`
   * @public
   */
  shouldHandle(req) {
    if (this.options.path) {
      const index = req.url.indexOf('?');
      const pathname = index !== -1 ? req.url.slice(0, index) : req.url;

      if (pathname !== this.options.path) return false;
    }

    return true;
  }

  /**
   * Handle a HTTP Upgrade request.
   *
   * @param {http.IncomingMessage} req The request object
   * @param {net.Socket} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @public
   */
  handleUpgrade(req, socket, head, cb) {
    socket.on('error', socketOnError);

    const key =
      req.headers['sec-websocket-key'] !== undefined
        ? req.headers['sec-websocket-key'].trim()
        : false;
    const version = +req.headers['sec-websocket-version'];
    const extensions = {};

    if (
      req.method !== 'GET' ||
      req.headers.upgrade.toLowerCase() !== 'websocket' ||
      !key ||
      !keyRegex.test(key) ||
      (version !== 8 && version !== 13) ||
      !this.shouldHandle(req)
    ) {
      return abortHandshake(socket, 400);
    }

    if (this.options.perMessageDeflate) {
      const perMessageDeflate = new PerMessageDeflate(
        this.options.perMessageDeflate,
        true,
        this.options.maxPayload
      );

      try {
        const offers = parse(req.headers['sec-websocket-extensions']);

        if (offers[PerMessageDeflate.extensionName]) {
          perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
          extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
      } catch (err) {
        return abortHandshake(socket, 400);
      }
    }

    //
    // Optionally call external client verification handler.
    //
    if (this.options.verifyClient) {
      const info = {
        origin:
          req.headers[`${version === 8 ? 'sec-websocket-origin' : 'origin'}`],
        secure: !!(req.socket.authorized || req.socket.encrypted),
        req
      };

      if (this.options.verifyClient.length === 2) {
        this.options.verifyClient(info, (verified, code, message, headers) => {
          if (!verified) {
            return abortHandshake(socket, code || 401, message, headers);
          }

          this.completeUpgrade(key, extensions, req, socket, head, cb);
        });
        return;
      }

      if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
    }

    this.completeUpgrade(key, extensions, req, socket, head, cb);
  }

  /**
   * Upgrade the connection to WebSocket.
   *
   * @param {String} key The value of the `Sec-WebSocket-Key` header
   * @param {Object} extensions The accepted extensions
   * @param {http.IncomingMessage} req The request object
   * @param {net.Socket} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @throws {Error} If called more than once with the same socket
   * @private
   */
  completeUpgrade(key, extensions, req, socket, head, cb) {
    //
    // Destroy the socket if the client has already sent a FIN packet.
    //
    if (!socket.readable || !socket.writable) return socket.destroy();

    if (socket[kWebSocket]) {
      throw new Error(
        'server.handleUpgrade() was called more than once with the same ' +
          'socket, possibly due to a misconfiguration'
      );
    }

    const digest = createHash('sha1')
      .update(key + GUID)
      .digest('base64');

    const headers = [
      'HTTP/1.1 101 Switching Protocols',
      'Upgrade: websocket',
      'Connection: Upgrade',
      `Sec-WebSocket-Accept: ${digest}`
    ];

    const ws = new WebSocket(null);
    let protocol = req.headers['sec-websocket-protocol'];

    if (protocol) {
      protocol = protocol.split(',').map(trim);

      //
      // Optionally call external protocol selection handler.
      //
      if (this.options.handleProtocols) {
        protocol = this.options.handleProtocols(protocol, req);
      } else {
        protocol = protocol[0];
      }

      if (protocol) {
        headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
        ws._protocol = protocol;
      }
    }

    if (extensions[PerMessageDeflate.extensionName]) {
      const params = extensions[PerMessageDeflate.extensionName].params;
      const value = format({
        [PerMessageDeflate.extensionName]: [params]
      });
      headers.push(`Sec-WebSocket-Extensions: ${value}`);
      ws._extensions = extensions;
    }

    //
    // Allow external modification/inspection of handshake headers.
    //
    this.emit('headers', headers, req);

    socket.write(headers.concat('\r\n').join('\r\n'));
    socket.removeListener('error', socketOnError);

    ws.setSocket(socket, head, this.options.maxPayload);

    if (this.clients) {
      this.clients.add(ws);
      ws.on('close', () => this.clients.delete(ws));
    }

    cb(ws, req);
  }
}

module.exports = WebSocketServer;

/**
 * Add event listeners on an `EventEmitter` using a map of <event, listener>
 * pairs.
 *
 * @param {EventEmitter} server The event emitter
 * @param {Object.<String, Function>} map The listeners to add
 * @return {Function} A function that will remove the added listeners when
 *     called
 * @private
 */
function addListeners(server, map) {
  for (const event of Object.keys(map)) server.on(event, map[event]);

  return function removeListeners() {
    for (const event of Object.keys(map)) {
      server.removeListener(event, map[event]);
    }
  };
}

/**
 * Emit a `'close'` event on an `EventEmitter`.
 *
 * @param {EventEmitter} server The event emitter
 * @private
 */
function emitClose(server) {
  server.emit('close');
}

/**
 * Handle premature socket errors.
 *
 * @private
 */
function socketOnError() {
  this.destroy();
}

/**
 * Close the connection when preconditions are not fulfilled.
 *
 * @param {net.Socket} socket The socket of the upgrade request
 * @param {Number} code The HTTP response status code
 * @param {String} [message] The HTTP response body
 * @param {Object} [headers] Additional HTTP response headers
 * @private
 */
function abortHandshake(socket, code, message, headers) {
  if (socket.writable) {
    message = message || STATUS_CODES[code];
    headers = {
      Connection: 'close',
      'Content-Type': 'text/html',
      'Content-Length': Buffer.byteLength(message),
      ...headers
    };

    socket.write(
      `HTTP/1.1 ${code} ${STATUS_CODES[code]}\r\n` +
        Object.keys(headers)
          .map((h) => `${h}: ${headers[h]}`)
          .join('\r\n') +
        '\r\n\r\n' +
        message
    );
  }

  socket.removeListener('error', socketOnError);
  socket.destroy();
}

/**
 * Remove whitespace characters from both ends of a string.
 *
 * @param {String} str The string
 * @return {String} A new string representing `str` stripped of whitespace
 *     characters from both its beginning and end
 * @private
 */
function trim(str) {
  return str.trim();
}


/***/ }),

/***/ "./node_modules/ws/lib/websocket.js":
/*!******************************************!*\
  !*** ./node_modules/ws/lib/websocket.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const EventEmitter = __webpack_require__(/*! events */ "events");
const https = __webpack_require__(/*! https */ "https");
const http = __webpack_require__(/*! http */ "http");
const net = __webpack_require__(/*! net */ "net");
const tls = __webpack_require__(/*! tls */ "tls");
const { randomBytes, createHash } = __webpack_require__(/*! crypto */ "crypto");
const { URL } = __webpack_require__(/*! url */ "url");

const PerMessageDeflate = __webpack_require__(/*! ./permessage-deflate */ "./node_modules/ws/lib/permessage-deflate.js");
const Receiver = __webpack_require__(/*! ./receiver */ "./node_modules/ws/lib/receiver.js");
const Sender = __webpack_require__(/*! ./sender */ "./node_modules/ws/lib/sender.js");
const {
  BINARY_TYPES,
  EMPTY_BUFFER,
  GUID,
  kStatusCode,
  kWebSocket,
  NOOP
} = __webpack_require__(/*! ./constants */ "./node_modules/ws/lib/constants.js");
const { addEventListener, removeEventListener } = __webpack_require__(/*! ./event-target */ "./node_modules/ws/lib/event-target.js");
const { format, parse } = __webpack_require__(/*! ./extension */ "./node_modules/ws/lib/extension.js");
const { toBuffer } = __webpack_require__(/*! ./buffer-util */ "./node_modules/ws/lib/buffer-util.js");

const readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
const protocolVersions = [8, 13];
const closeTimeout = 30 * 1000;

/**
 * Class representing a WebSocket.
 *
 * @extends EventEmitter
 */
class WebSocket extends EventEmitter {
  /**
   * Create a new `WebSocket`.
   *
   * @param {(String|url.URL)} address The URL to which to connect
   * @param {(String|String[])} [protocols] The subprotocols
   * @param {Object} [options] Connection options
   */
  constructor(address, protocols, options) {
    super();

    this._binaryType = BINARY_TYPES[0];
    this._closeCode = 1006;
    this._closeFrameReceived = false;
    this._closeFrameSent = false;
    this._closeMessage = '';
    this._closeTimer = null;
    this._extensions = {};
    this._protocol = '';
    this._readyState = WebSocket.CONNECTING;
    this._receiver = null;
    this._sender = null;
    this._socket = null;

    if (address !== null) {
      this._bufferedAmount = 0;
      this._isServer = false;
      this._redirects = 0;

      if (Array.isArray(protocols)) {
        protocols = protocols.join(', ');
      } else if (typeof protocols === 'object' && protocols !== null) {
        options = protocols;
        protocols = undefined;
      }

      initAsClient(this, address, protocols, options);
    } else {
      this._isServer = true;
    }
  }

  /**
   * This deviates from the WHATWG interface since ws doesn't support the
   * required default "blob" type (instead we define a custom "nodebuffer"
   * type).
   *
   * @type {String}
   */
  get binaryType() {
    return this._binaryType;
  }

  set binaryType(type) {
    if (!BINARY_TYPES.includes(type)) return;

    this._binaryType = type;

    //
    // Allow to change `binaryType` on the fly.
    //
    if (this._receiver) this._receiver._binaryType = type;
  }

  /**
   * @type {Number}
   */
  get bufferedAmount() {
    if (!this._socket) return this._bufferedAmount;

    return this._socket._writableState.length + this._sender._bufferedBytes;
  }

  /**
   * @type {String}
   */
  get extensions() {
    return Object.keys(this._extensions).join();
  }

  /**
   * @type {String}
   */
  get protocol() {
    return this._protocol;
  }

  /**
   * @type {Number}
   */
  get readyState() {
    return this._readyState;
  }

  /**
   * @type {String}
   */
  get url() {
    return this._url;
  }

  /**
   * Set up the socket and the internal resources.
   *
   * @param {net.Socket} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Number} [maxPayload=0] The maximum allowed message size
   * @private
   */
  setSocket(socket, head, maxPayload) {
    const receiver = new Receiver(
      this.binaryType,
      this._extensions,
      this._isServer,
      maxPayload
    );

    this._sender = new Sender(socket, this._extensions);
    this._receiver = receiver;
    this._socket = socket;

    receiver[kWebSocket] = this;
    socket[kWebSocket] = this;

    receiver.on('conclude', receiverOnConclude);
    receiver.on('drain', receiverOnDrain);
    receiver.on('error', receiverOnError);
    receiver.on('message', receiverOnMessage);
    receiver.on('ping', receiverOnPing);
    receiver.on('pong', receiverOnPong);

    socket.setTimeout(0);
    socket.setNoDelay();

    if (head.length > 0) socket.unshift(head);

    socket.on('close', socketOnClose);
    socket.on('data', socketOnData);
    socket.on('end', socketOnEnd);
    socket.on('error', socketOnError);

    this._readyState = WebSocket.OPEN;
    this.emit('open');
  }

  /**
   * Emit the `'close'` event.
   *
   * @private
   */
  emitClose() {
    if (!this._socket) {
      this._readyState = WebSocket.CLOSED;
      this.emit('close', this._closeCode, this._closeMessage);
      return;
    }

    if (this._extensions[PerMessageDeflate.extensionName]) {
      this._extensions[PerMessageDeflate.extensionName].cleanup();
    }

    this._receiver.removeAllListeners();
    this._readyState = WebSocket.CLOSED;
    this.emit('close', this._closeCode, this._closeMessage);
  }

  /**
   * Start a closing handshake.
   *
   *          +----------+   +-----------+   +----------+
   *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
   *    |     +----------+   +-----------+   +----------+     |
   *          +----------+   +-----------+         |
   * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
   *          +----------+   +-----------+   |
   *    |           |                        |   +---+        |
   *                +------------------------+-->|fin| - - - -
   *    |         +---+                      |   +---+
   *     - - - - -|fin|<---------------------+
   *              +---+
   *
   * @param {Number} [code] Status code explaining why the connection is closing
   * @param {String} [data] A string explaining why the connection is closing
   * @public
   */
  close(code, data) {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      return abortHandshake(this, this._req, msg);
    }

    if (this.readyState === WebSocket.CLOSING) {
      if (this._closeFrameSent && this._closeFrameReceived) this._socket.end();
      return;
    }

    this._readyState = WebSocket.CLOSING;
    this._sender.close(code, data, !this._isServer, (err) => {
      //
      // This error is handled by the `'error'` listener on the socket. We only
      // want to know if the close frame has been sent here.
      //
      if (err) return;

      this._closeFrameSent = true;
      if (this._closeFrameReceived) this._socket.end();
    });

    //
    // Specify a timeout for the closing handshake to complete.
    //
    this._closeTimer = setTimeout(
      this._socket.destroy.bind(this._socket),
      closeTimeout
    );
  }

  /**
   * Send a ping.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the ping is sent
   * @public
   */
  ping(data, mask, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    if (mask === undefined) mask = !this._isServer;
    this._sender.ping(data || EMPTY_BUFFER, mask, cb);
  }

  /**
   * Send a pong.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the pong is sent
   * @public
   */
  pong(data, mask, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    if (mask === undefined) mask = !this._isServer;
    this._sender.pong(data || EMPTY_BUFFER, mask, cb);
  }

  /**
   * Send a data message.
   *
   * @param {*} data The message to send
   * @param {Object} [options] Options object
   * @param {Boolean} [options.compress] Specifies whether or not to compress
   *     `data`
   * @param {Boolean} [options.binary] Specifies whether `data` is binary or
   *     text
   * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when data is written out
   * @public
   */
  send(data, options, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof options === 'function') {
      cb = options;
      options = {};
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    const opts = {
      binary: typeof data !== 'string',
      mask: !this._isServer,
      compress: true,
      fin: true,
      ...options
    };

    if (!this._extensions[PerMessageDeflate.extensionName]) {
      opts.compress = false;
    }

    this._sender.send(data || EMPTY_BUFFER, opts, cb);
  }

  /**
   * Forcibly close the connection.
   *
   * @public
   */
  terminate() {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      return abortHandshake(this, this._req, msg);
    }

    if (this._socket) {
      this._readyState = WebSocket.CLOSING;
      this._socket.destroy();
    }
  }
}

readyStates.forEach((readyState, i) => {
  const descriptor = { enumerable: true, value: i };

  Object.defineProperty(WebSocket.prototype, readyState, descriptor);
  Object.defineProperty(WebSocket, readyState, descriptor);
});

[
  'binaryType',
  'bufferedAmount',
  'extensions',
  'protocol',
  'readyState',
  'url'
].forEach((property) => {
  Object.defineProperty(WebSocket.prototype, property, { enumerable: true });
});

//
// Add the `onopen`, `onerror`, `onclose`, and `onmessage` attributes.
// See https://html.spec.whatwg.org/multipage/comms.html#the-websocket-interface
//
['open', 'error', 'close', 'message'].forEach((method) => {
  Object.defineProperty(WebSocket.prototype, `on${method}`, {
    configurable: true,
    enumerable: true,
    /**
     * Return the listener of the event.
     *
     * @return {(Function|undefined)} The event listener or `undefined`
     * @public
     */
    get() {
      const listeners = this.listeners(method);
      for (let i = 0; i < listeners.length; i++) {
        if (listeners[i]._listener) return listeners[i]._listener;
      }

      return undefined;
    },
    /**
     * Add a listener for the event.
     *
     * @param {Function} listener The listener to add
     * @public
     */
    set(listener) {
      const listeners = this.listeners(method);
      for (let i = 0; i < listeners.length; i++) {
        //
        // Remove only the listeners added via `addEventListener`.
        //
        if (listeners[i]._listener) this.removeListener(method, listeners[i]);
      }
      this.addEventListener(method, listener);
    }
  });
});

WebSocket.prototype.addEventListener = addEventListener;
WebSocket.prototype.removeEventListener = removeEventListener;

module.exports = WebSocket;

/**
 * Initialize a WebSocket client.
 *
 * @param {WebSocket} websocket The client to initialize
 * @param {(String|url.URL)} address The URL to which to connect
 * @param {String} [protocols] The subprotocols
 * @param {Object} [options] Connection options
 * @param {(Boolean|Object)} [options.perMessageDeflate=true] Enable/disable
 *     permessage-deflate
 * @param {Number} [options.handshakeTimeout] Timeout in milliseconds for the
 *     handshake request
 * @param {Number} [options.protocolVersion=13] Value of the
 *     `Sec-WebSocket-Version` header
 * @param {String} [options.origin] Value of the `Origin` or
 *     `Sec-WebSocket-Origin` header
 * @param {Number} [options.maxPayload=104857600] The maximum allowed message
 *     size
 * @param {Boolean} [options.followRedirects=false] Whether or not to follow
 *     redirects
 * @param {Number} [options.maxRedirects=10] The maximum number of redirects
 *     allowed
 * @private
 */
function initAsClient(websocket, address, protocols, options) {
  const opts = {
    protocolVersion: protocolVersions[1],
    maxPayload: 100 * 1024 * 1024,
    perMessageDeflate: true,
    followRedirects: false,
    maxRedirects: 10,
    ...options,
    createConnection: undefined,
    socketPath: undefined,
    hostname: undefined,
    protocol: undefined,
    timeout: undefined,
    method: undefined,
    host: undefined,
    path: undefined,
    port: undefined
  };

  if (!protocolVersions.includes(opts.protocolVersion)) {
    throw new RangeError(
      `Unsupported protocol version: ${opts.protocolVersion} ` +
        `(supported versions: ${protocolVersions.join(', ')})`
    );
  }

  let parsedUrl;

  if (address instanceof URL) {
    parsedUrl = address;
    websocket._url = address.href;
  } else {
    parsedUrl = new URL(address);
    websocket._url = address;
  }

  const isUnixSocket = parsedUrl.protocol === 'ws+unix:';

  if (!parsedUrl.host && (!isUnixSocket || !parsedUrl.pathname)) {
    throw new Error(`Invalid URL: ${websocket.url}`);
  }

  const isSecure =
    parsedUrl.protocol === 'wss:' || parsedUrl.protocol === 'https:';
  const defaultPort = isSecure ? 443 : 80;
  const key = randomBytes(16).toString('base64');
  const get = isSecure ? https.get : http.get;
  let perMessageDeflate;

  opts.createConnection = isSecure ? tlsConnect : netConnect;
  opts.defaultPort = opts.defaultPort || defaultPort;
  opts.port = parsedUrl.port || defaultPort;
  opts.host = parsedUrl.hostname.startsWith('[')
    ? parsedUrl.hostname.slice(1, -1)
    : parsedUrl.hostname;
  opts.headers = {
    'Sec-WebSocket-Version': opts.protocolVersion,
    'Sec-WebSocket-Key': key,
    Connection: 'Upgrade',
    Upgrade: 'websocket',
    ...opts.headers
  };
  opts.path = parsedUrl.pathname + parsedUrl.search;
  opts.timeout = opts.handshakeTimeout;

  if (opts.perMessageDeflate) {
    perMessageDeflate = new PerMessageDeflate(
      opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
      false,
      opts.maxPayload
    );
    opts.headers['Sec-WebSocket-Extensions'] = format({
      [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
    });
  }
  if (protocols) {
    opts.headers['Sec-WebSocket-Protocol'] = protocols;
  }
  if (opts.origin) {
    if (opts.protocolVersion < 13) {
      opts.headers['Sec-WebSocket-Origin'] = opts.origin;
    } else {
      opts.headers.Origin = opts.origin;
    }
  }
  if (parsedUrl.username || parsedUrl.password) {
    opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
  }

  if (isUnixSocket) {
    const parts = opts.path.split(':');

    opts.socketPath = parts[0];
    opts.path = parts[1];
  }

  let req = (websocket._req = get(opts));

  if (opts.timeout) {
    req.on('timeout', () => {
      abortHandshake(websocket, req, 'Opening handshake has timed out');
    });
  }

  req.on('error', (err) => {
    if (req === null || req.aborted) return;

    req = websocket._req = null;
    websocket._readyState = WebSocket.CLOSING;
    websocket.emit('error', err);
    websocket.emitClose();
  });

  req.on('response', (res) => {
    const location = res.headers.location;
    const statusCode = res.statusCode;

    if (
      location &&
      opts.followRedirects &&
      statusCode >= 300 &&
      statusCode < 400
    ) {
      if (++websocket._redirects > opts.maxRedirects) {
        abortHandshake(websocket, req, 'Maximum redirects exceeded');
        return;
      }

      req.abort();

      const addr = new URL(location, address);

      initAsClient(websocket, addr, protocols, options);
    } else if (!websocket.emit('unexpected-response', req, res)) {
      abortHandshake(
        websocket,
        req,
        `Unexpected server response: ${res.statusCode}`
      );
    }
  });

  req.on('upgrade', (res, socket, head) => {
    websocket.emit('upgrade', res);

    //
    // The user may have closed the connection from a listener of the `upgrade`
    // event.
    //
    if (websocket.readyState !== WebSocket.CONNECTING) return;

    req = websocket._req = null;

    const digest = createHash('sha1')
      .update(key + GUID)
      .digest('base64');

    if (res.headers['sec-websocket-accept'] !== digest) {
      abortHandshake(websocket, socket, 'Invalid Sec-WebSocket-Accept header');
      return;
    }

    const serverProt = res.headers['sec-websocket-protocol'];
    const protList = (protocols || '').split(/, */);
    let protError;

    if (!protocols && serverProt) {
      protError = 'Server sent a subprotocol but none was requested';
    } else if (protocols && !serverProt) {
      protError = 'Server sent no subprotocol';
    } else if (serverProt && !protList.includes(serverProt)) {
      protError = 'Server sent an invalid subprotocol';
    }

    if (protError) {
      abortHandshake(websocket, socket, protError);
      return;
    }

    if (serverProt) websocket._protocol = serverProt;

    if (perMessageDeflate) {
      try {
        const extensions = parse(res.headers['sec-websocket-extensions']);

        if (extensions[PerMessageDeflate.extensionName]) {
          perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
          websocket._extensions[PerMessageDeflate.extensionName] =
            perMessageDeflate;
        }
      } catch (err) {
        abortHandshake(
          websocket,
          socket,
          'Invalid Sec-WebSocket-Extensions header'
        );
        return;
      }
    }

    websocket.setSocket(socket, head, opts.maxPayload);
  });
}

/**
 * Create a `net.Socket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {net.Socket} The newly created socket used to start the connection
 * @private
 */
function netConnect(options) {
  options.path = options.socketPath;
  return net.connect(options);
}

/**
 * Create a `tls.TLSSocket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {tls.TLSSocket} The newly created socket used to start the connection
 * @private
 */
function tlsConnect(options) {
  options.path = undefined;

  if (!options.servername && options.servername !== '') {
    options.servername = net.isIP(options.host) ? '' : options.host;
  }

  return tls.connect(options);
}

/**
 * Abort the handshake and emit an error.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {(http.ClientRequest|net.Socket)} stream The request to abort or the
 *     socket to destroy
 * @param {String} message The error message
 * @private
 */
function abortHandshake(websocket, stream, message) {
  websocket._readyState = WebSocket.CLOSING;

  const err = new Error(message);
  Error.captureStackTrace(err, abortHandshake);

  if (stream.setHeader) {
    stream.abort();

    if (stream.socket && !stream.socket.destroyed) {
      //
      // On Node.js >= 14.3.0 `request.abort()` does not destroy the socket if
      // called after the request completed. See
      // https://github.com/websockets/ws/issues/1869.
      //
      stream.socket.destroy();
    }

    stream.once('abort', websocket.emitClose.bind(websocket));
    websocket.emit('error', err);
  } else {
    stream.destroy(err);
    stream.once('error', websocket.emit.bind(websocket, 'error'));
    stream.once('close', websocket.emitClose.bind(websocket));
  }
}

/**
 * Handle cases where the `ping()`, `pong()`, or `send()` methods are called
 * when the `readyState` attribute is `CLOSING` or `CLOSED`.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {*} [data] The data to send
 * @param {Function} [cb] Callback
 * @private
 */
function sendAfterClose(websocket, data, cb) {
  if (data) {
    const length = toBuffer(data).length;

    //
    // The `_bufferedAmount` property is used only when the peer is a client and
    // the opening handshake fails. Under these circumstances, in fact, the
    // `setSocket()` method is not called, so the `_socket` and `_sender`
    // properties are set to `null`.
    //
    if (websocket._socket) websocket._sender._bufferedBytes += length;
    else websocket._bufferedAmount += length;
  }

  if (cb) {
    const err = new Error(
      `WebSocket is not open: readyState ${websocket.readyState} ` +
        `(${readyStates[websocket.readyState]})`
    );
    cb(err);
  }
}

/**
 * The listener of the `Receiver` `'conclude'` event.
 *
 * @param {Number} code The status code
 * @param {String} reason The reason for closing
 * @private
 */
function receiverOnConclude(code, reason) {
  const websocket = this[kWebSocket];

  websocket._socket.removeListener('data', socketOnData);
  websocket._socket.resume();

  websocket._closeFrameReceived = true;
  websocket._closeMessage = reason;
  websocket._closeCode = code;

  if (code === 1005) websocket.close();
  else websocket.close(code, reason);
}

/**
 * The listener of the `Receiver` `'drain'` event.
 *
 * @private
 */
function receiverOnDrain() {
  this[kWebSocket]._socket.resume();
}

/**
 * The listener of the `Receiver` `'error'` event.
 *
 * @param {(RangeError|Error)} err The emitted error
 * @private
 */
function receiverOnError(err) {
  const websocket = this[kWebSocket];

  websocket._socket.removeListener('data', socketOnData);

  websocket._readyState = WebSocket.CLOSING;
  websocket._closeCode = err[kStatusCode];
  websocket.emit('error', err);
  websocket._socket.destroy();
}

/**
 * The listener of the `Receiver` `'finish'` event.
 *
 * @private
 */
function receiverOnFinish() {
  this[kWebSocket].emitClose();
}

/**
 * The listener of the `Receiver` `'message'` event.
 *
 * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The message
 * @private
 */
function receiverOnMessage(data) {
  this[kWebSocket].emit('message', data);
}

/**
 * The listener of the `Receiver` `'ping'` event.
 *
 * @param {Buffer} data The data included in the ping frame
 * @private
 */
function receiverOnPing(data) {
  const websocket = this[kWebSocket];

  websocket.pong(data, !websocket._isServer, NOOP);
  websocket.emit('ping', data);
}

/**
 * The listener of the `Receiver` `'pong'` event.
 *
 * @param {Buffer} data The data included in the pong frame
 * @private
 */
function receiverOnPong(data) {
  this[kWebSocket].emit('pong', data);
}

/**
 * The listener of the `net.Socket` `'close'` event.
 *
 * @private
 */
function socketOnClose() {
  const websocket = this[kWebSocket];

  this.removeListener('close', socketOnClose);
  this.removeListener('end', socketOnEnd);

  websocket._readyState = WebSocket.CLOSING;

  //
  // The close frame might not have been received or the `'end'` event emitted,
  // for example, if the socket was destroyed due to an error. Ensure that the
  // `receiver` stream is closed after writing any remaining buffered data to
  // it. If the readable side of the socket is in flowing mode then there is no
  // buffered data as everything has been already written and `readable.read()`
  // will return `null`. If instead, the socket is paused, any possible buffered
  // data will be read as a single chunk and emitted synchronously in a single
  // `'data'` event.
  //
  websocket._socket.read();
  websocket._receiver.end();

  this.removeListener('data', socketOnData);
  this[kWebSocket] = undefined;

  clearTimeout(websocket._closeTimer);

  if (
    websocket._receiver._writableState.finished ||
    websocket._receiver._writableState.errorEmitted
  ) {
    websocket.emitClose();
  } else {
    websocket._receiver.on('error', receiverOnFinish);
    websocket._receiver.on('finish', receiverOnFinish);
  }
}

/**
 * The listener of the `net.Socket` `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function socketOnData(chunk) {
  if (!this[kWebSocket]._receiver.write(chunk)) {
    this.pause();
  }
}

/**
 * The listener of the `net.Socket` `'end'` event.
 *
 * @private
 */
function socketOnEnd() {
  const websocket = this[kWebSocket];

  websocket._readyState = WebSocket.CLOSING;
  websocket._receiver.end();
  this.end();
}

/**
 * The listener of the `net.Socket` `'error'` event.
 *
 * @private
 */
function socketOnError() {
  const websocket = this[kWebSocket];

  this.removeListener('error', socketOnError);
  this.on('error', NOOP);

  if (websocket) {
    websocket._readyState = WebSocket.CLOSING;
    this.destroy();
  }
}


/***/ }),

/***/ "bufferutil":
/*!*****************************!*\
  !*** external "bufferutil" ***!
  \*****************************/
/***/ ((module) => {

if(typeof bufferutil === 'undefined') { var e = new Error("Cannot find module 'bufferutil'"); e.code = 'MODULE_NOT_FOUND'; throw e; }

module.exports = bufferutil;

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");;

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");;

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");;

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");;

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("net");;

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");;

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tls");;

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");;

/***/ }),

/***/ "utf-8-validate":
/*!*********************************!*\
  !*** external "utf-8-validate" ***!
  \*********************************/
/***/ ((module) => {

if(typeof utf-8-validate === 'undefined') { var e = new Error("Cannot find module 'utf-8-validate'"); e.code = 'MODULE_NOT_FOUND'; throw e; }

module.exports = utf-8-validate;

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");;

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/nodeserver/server.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly96YWQyLy4vc3JjL25vZGVzZXJ2ZXIvc2VydmVyLnRzIiwid2VicGFjazovL3phZDIvLi9ub2RlX21vZHVsZXMvd3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vemFkMi8uL25vZGVfbW9kdWxlcy93cy9saWIvYnVmZmVyLXV0aWwuanMiLCJ3ZWJwYWNrOi8vemFkMi8uL25vZGVfbW9kdWxlcy93cy9saWIvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3phZDIvLi9ub2RlX21vZHVsZXMvd3MvbGliL2V2ZW50LXRhcmdldC5qcyIsIndlYnBhY2s6Ly96YWQyLy4vbm9kZV9tb2R1bGVzL3dzL2xpYi9leHRlbnNpb24uanMiLCJ3ZWJwYWNrOi8vemFkMi8uL25vZGVfbW9kdWxlcy93cy9saWIvbGltaXRlci5qcyIsIndlYnBhY2s6Ly96YWQyLy4vbm9kZV9tb2R1bGVzL3dzL2xpYi9wZXJtZXNzYWdlLWRlZmxhdGUuanMiLCJ3ZWJwYWNrOi8vemFkMi8uL25vZGVfbW9kdWxlcy93cy9saWIvcmVjZWl2ZXIuanMiLCJ3ZWJwYWNrOi8vemFkMi8uL25vZGVfbW9kdWxlcy93cy9saWIvc2VuZGVyLmpzIiwid2VicGFjazovL3phZDIvLi9ub2RlX21vZHVsZXMvd3MvbGliL3N0cmVhbS5qcyIsIndlYnBhY2s6Ly96YWQyLy4vbm9kZV9tb2R1bGVzL3dzL2xpYi92YWxpZGF0aW9uLmpzIiwid2VicGFjazovL3phZDIvLi9ub2RlX21vZHVsZXMvd3MvbGliL3dlYnNvY2tldC1zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vemFkMi8uL25vZGVfbW9kdWxlcy93cy9saWIvd2Vic29ja2V0LmpzIiwid2VicGFjazovL3phZDIvZXh0ZXJuYWwgXCJidWZmZXJ1dGlsXCIiLCJ3ZWJwYWNrOi8vemFkMi9leHRlcm5hbCBcImNyeXB0b1wiIiwid2VicGFjazovL3phZDIvZXh0ZXJuYWwgXCJldmVudHNcIiIsIndlYnBhY2s6Ly96YWQyL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovL3phZDIvZXh0ZXJuYWwgXCJodHRwc1wiIiwid2VicGFjazovL3phZDIvZXh0ZXJuYWwgXCJuZXRcIiIsIndlYnBhY2s6Ly96YWQyL2V4dGVybmFsIFwic3RyZWFtXCIiLCJ3ZWJwYWNrOi8vemFkMi9leHRlcm5hbCBcInRsc1wiIiwid2VicGFjazovL3phZDIvZXh0ZXJuYWwgXCJ1cmxcIiIsIndlYnBhY2s6Ly96YWQyL2V4dGVybmFsIFwidXRmLTgtdmFsaWRhdGVcIiIsIndlYnBhY2s6Ly96YWQyL2V4dGVybmFsIFwiemxpYlwiIiwid2VicGFjazovL3phZDIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vemFkMi93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2I7QUFDQTtBQUNBLGtDQUFrQyxvQ0FBb0MsYUFBYSxFQUFFLEVBQUU7QUFDdkYsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSx5Q0FBeUMsNkJBQTZCO0FBQ3RFLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCx3QkFBd0IsbUJBQU8sQ0FBQyxrQkFBTTtBQUN0Qyw2QkFBNkIsbUJBQU8sQ0FBQyxzQ0FBSTtBQUN6QztBQUNBLG1DQUFtQyxpQkFBaUI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ25EYTs7QUFFYixrQkFBa0IsbUJBQU8sQ0FBQywyREFBaUI7O0FBRTNDLGtDQUFrQyxtQkFBTyxDQUFDLHFEQUFjO0FBQ3hELG1CQUFtQixtQkFBTyxDQUFDLHlFQUF3QjtBQUNuRCxx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LFNBQVM7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMscUJBQXFCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEscUJBQXFCO0FBQ2xDLGNBQWMsUUFBUTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEscUJBQXFCO0FBQ2xDLGFBQWEsV0FBVztBQUN4QixhQUFhLE9BQU87QUFDcEIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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QU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLEVBQUU7QUFDZixhQUFhLFFBQVE7QUFDckIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLEVBQUU7QUFDZixhQUFhLFFBQVE7QUFDckIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLEVBQUU7QUFDZixhQUFhLE9BQU87QUFDcEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzc2QkEsdUNBQXVDLHNEQUFzRCw2QkFBNkIsU0FBUzs7QUFFbkksNEI7Ozs7Ozs7Ozs7QUNGQSxvQzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7O0FDQUEsMkNBQTJDLDBEQUEwRCw2QkFBNkIsU0FBUzs7QUFFM0ksZ0M7Ozs7Ozs7Ozs7QUNGQSxrQzs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pKTtcclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59KTtcclxudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGh0dHAgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcImh0dHBcIikpO1xyXG52YXIgd2Vic29ja2V0ID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJ3c1wiKSk7XHJcbnZhciBzZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcigpO1xyXG52YXIgc29ja2V0ID0gbmV3IHdlYnNvY2tldC5TZXJ2ZXIoeyBzZXJ2ZXI6IHNlcnZlciB9KTtcclxuc29ja2V0Lm9uKFwiY29ubmVjdGlvblwiLCBmdW5jdGlvbiBjb25uZWN0aW9uKHdzKSB7XHJcbiAgICB3cy5vbihcIm1lc3NhZ2VcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgbWVzc2FnZTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBtZXNzYWdlID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgc2VuZEVycm9yKHdzLCBcIlpseSBmb3JtYXQhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtZXNzYWdlLnR5cGUgPT09IFwiTkVXX01PVkVcIikge1xyXG4gICAgICAgICAgICBzb2NrZXQuY2xpZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChjbGllbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjbGllbnQucmVhZHlTdGF0ZSA9PT0gd2Vic29ja2V0Lk9QRU4pIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGllbnQuc2VuZChkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG52YXIgc2VuZEVycm9yID0gZnVuY3Rpb24gKHdzLCBtZXNzYWdlKSB7XHJcbiAgICB2YXIgbWVzc2FnZU9iamVjdCA9IHtcclxuICAgICAgICB0eXBlOiBcImVycm9yXCIsXHJcbiAgICAgICAgcGF5bG9hZDogbWVzc2FnZSxcclxuICAgIH07XHJcbiAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2VPYmplY3QpKTtcclxufTtcclxuc2VydmVyLmxpc3Rlbig4MDgwKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBXZWJTb2NrZXQgPSByZXF1aXJlKCcuL2xpYi93ZWJzb2NrZXQnKTtcblxuV2ViU29ja2V0LmNyZWF0ZVdlYlNvY2tldFN0cmVhbSA9IHJlcXVpcmUoJy4vbGliL3N0cmVhbScpO1xuV2ViU29ja2V0LlNlcnZlciA9IHJlcXVpcmUoJy4vbGliL3dlYnNvY2tldC1zZXJ2ZXInKTtcbldlYlNvY2tldC5SZWNlaXZlciA9IHJlcXVpcmUoJy4vbGliL3JlY2VpdmVyJyk7XG5XZWJTb2NrZXQuU2VuZGVyID0gcmVxdWlyZSgnLi9saWIvc2VuZGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gV2ViU29ja2V0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB7IEVNUFRZX0JVRkZFUiB9ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcblxuLyoqXG4gKiBNZXJnZXMgYW4gYXJyYXkgb2YgYnVmZmVycyBpbnRvIGEgbmV3IGJ1ZmZlci5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcltdfSBsaXN0IFRoZSBhcnJheSBvZiBidWZmZXJzIHRvIGNvbmNhdFxuICogQHBhcmFtIHtOdW1iZXJ9IHRvdGFsTGVuZ3RoIFRoZSB0b3RhbCBsZW5ndGggb2YgYnVmZmVycyBpbiB0aGUgbGlzdFxuICogQHJldHVybiB7QnVmZmVyfSBUaGUgcmVzdWx0aW5nIGJ1ZmZlclxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBjb25jYXQobGlzdCwgdG90YWxMZW5ndGgpIHtcbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSByZXR1cm4gRU1QVFlfQlVGRkVSO1xuICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHJldHVybiBsaXN0WzBdO1xuXG4gIGNvbnN0IHRhcmdldCA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSh0b3RhbExlbmd0aCk7XG4gIGxldCBvZmZzZXQgPSAwO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGJ1ZiA9IGxpc3RbaV07XG4gICAgdGFyZ2V0LnNldChidWYsIG9mZnNldCk7XG4gICAgb2Zmc2V0ICs9IGJ1Zi5sZW5ndGg7XG4gIH1cblxuICBpZiAob2Zmc2V0IDwgdG90YWxMZW5ndGgpIHJldHVybiB0YXJnZXQuc2xpY2UoMCwgb2Zmc2V0KTtcblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG4vKipcbiAqIE1hc2tzIGEgYnVmZmVyIHVzaW5nIHRoZSBnaXZlbiBtYXNrLlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBzb3VyY2UgVGhlIGJ1ZmZlciB0byBtYXNrXG4gKiBAcGFyYW0ge0J1ZmZlcn0gbWFzayBUaGUgbWFzayB0byB1c2VcbiAqIEBwYXJhbSB7QnVmZmVyfSBvdXRwdXQgVGhlIGJ1ZmZlciB3aGVyZSB0byBzdG9yZSB0aGUgcmVzdWx0XG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IFRoZSBvZmZzZXQgYXQgd2hpY2ggdG8gc3RhcnQgd3JpdGluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgbnVtYmVyIG9mIGJ5dGVzIHRvIG1hc2suXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIF9tYXNrKHNvdXJjZSwgbWFzaywgb3V0cHV0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgb3V0cHV0W29mZnNldCArIGldID0gc291cmNlW2ldIF4gbWFza1tpICYgM107XG4gIH1cbn1cblxuLyoqXG4gKiBVbm1hc2tzIGEgYnVmZmVyIHVzaW5nIHRoZSBnaXZlbiBtYXNrLlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXIgVGhlIGJ1ZmZlciB0byB1bm1hc2tcbiAqIEBwYXJhbSB7QnVmZmVyfSBtYXNrIFRoZSBtYXNrIHRvIHVzZVxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBfdW5tYXNrKGJ1ZmZlciwgbWFzaykge1xuICAvLyBSZXF1aXJlZCB1bnRpbCBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvaXNzdWVzLzkwMDYgaXMgcmVzb2x2ZWQuXG4gIGNvbnN0IGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBidWZmZXJbaV0gXj0gbWFza1tpICYgM107XG4gIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhIGJ1ZmZlciB0byBhbiBgQXJyYXlCdWZmZXJgLlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWYgVGhlIGJ1ZmZlciB0byBjb252ZXJ0XG4gKiBAcmV0dXJuIHtBcnJheUJ1ZmZlcn0gQ29udmVydGVkIGJ1ZmZlclxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiB0b0FycmF5QnVmZmVyKGJ1Zikge1xuICBpZiAoYnVmLmJ5dGVMZW5ndGggPT09IGJ1Zi5idWZmZXIuYnl0ZUxlbmd0aCkge1xuICAgIHJldHVybiBidWYuYnVmZmVyO1xuICB9XG5cbiAgcmV0dXJuIGJ1Zi5idWZmZXIuc2xpY2UoYnVmLmJ5dGVPZmZzZXQsIGJ1Zi5ieXRlT2Zmc2V0ICsgYnVmLmJ5dGVMZW5ndGgpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBkYXRhYCB0byBhIGBCdWZmZXJgLlxuICpcbiAqIEBwYXJhbSB7Kn0gZGF0YSBUaGUgZGF0YSB0byBjb252ZXJ0XG4gKiBAcmV0dXJuIHtCdWZmZXJ9IFRoZSBidWZmZXJcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gdG9CdWZmZXIoZGF0YSkge1xuICB0b0J1ZmZlci5yZWFkT25seSA9IHRydWU7XG5cbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkgcmV0dXJuIGRhdGE7XG5cbiAgbGV0IGJ1ZjtcblxuICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgYnVmID0gQnVmZmVyLmZyb20oZGF0YSk7XG4gIH0gZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGRhdGEpKSB7XG4gICAgYnVmID0gQnVmZmVyLmZyb20oZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YS5ieXRlTGVuZ3RoKTtcbiAgfSBlbHNlIHtcbiAgICBidWYgPSBCdWZmZXIuZnJvbShkYXRhKTtcbiAgICB0b0J1ZmZlci5yZWFkT25seSA9IGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGJ1Zjtcbn1cblxudHJ5IHtcbiAgY29uc3QgYnVmZmVyVXRpbCA9IHJlcXVpcmUoJ2J1ZmZlcnV0aWwnKTtcbiAgY29uc3QgYnUgPSBidWZmZXJVdGlsLkJ1ZmZlclV0aWwgfHwgYnVmZmVyVXRpbDtcblxuICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb25jYXQsXG4gICAgbWFzayhzb3VyY2UsIG1hc2ssIG91dHB1dCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgICAgIGlmIChsZW5ndGggPCA0OCkgX21hc2soc291cmNlLCBtYXNrLCBvdXRwdXQsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICAgIGVsc2UgYnUubWFzayhzb3VyY2UsIG1hc2ssIG91dHB1dCwgb2Zmc2V0LCBsZW5ndGgpO1xuICAgIH0sXG4gICAgdG9BcnJheUJ1ZmZlcixcbiAgICB0b0J1ZmZlcixcbiAgICB1bm1hc2soYnVmZmVyLCBtYXNrKSB7XG4gICAgICBpZiAoYnVmZmVyLmxlbmd0aCA8IDMyKSBfdW5tYXNrKGJ1ZmZlciwgbWFzayk7XG4gICAgICBlbHNlIGJ1LnVubWFzayhidWZmZXIsIG1hc2spO1xuICAgIH1cbiAgfTtcbn0gY2F0Y2ggKGUpIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29uY2F0LFxuICAgIG1hc2s6IF9tYXNrLFxuICAgIHRvQXJyYXlCdWZmZXIsXG4gICAgdG9CdWZmZXIsXG4gICAgdW5tYXNrOiBfdW5tYXNrXG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBCSU5BUllfVFlQRVM6IFsnbm9kZWJ1ZmZlcicsICdhcnJheWJ1ZmZlcicsICdmcmFnbWVudHMnXSxcbiAgR1VJRDogJzI1OEVBRkE1LUU5MTQtNDdEQS05NUNBLUM1QUIwREM4NUIxMScsXG4gIGtTdGF0dXNDb2RlOiBTeW1ib2woJ3N0YXR1cy1jb2RlJyksXG4gIGtXZWJTb2NrZXQ6IFN5bWJvbCgnd2Vic29ja2V0JyksXG4gIEVNUFRZX0JVRkZFUjogQnVmZmVyLmFsbG9jKDApLFxuICBOT09QOiAoKSA9PiB7fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYW4gZXZlbnQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgRXZlbnQge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGBFdmVudGAuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIFRoZSBuYW1lIG9mIHRoZSBldmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0IEEgcmVmZXJlbmNlIHRvIHRoZSB0YXJnZXQgdG8gd2hpY2ggdGhlIGV2ZW50IHdhc1xuICAgKiAgICAgZGlzcGF0Y2hlZFxuICAgKi9cbiAgY29uc3RydWN0b3IodHlwZSwgdGFyZ2V0KSB7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxufVxuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIG1lc3NhZ2UgZXZlbnQuXG4gKlxuICogQGV4dGVuZHMgRXZlbnRcbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIE1lc3NhZ2VFdmVudCBleHRlbmRzIEV2ZW50IHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBgTWVzc2FnZUV2ZW50YC5cbiAgICpcbiAgICogQHBhcmFtIHsoU3RyaW5nfEJ1ZmZlcnxBcnJheUJ1ZmZlcnxCdWZmZXJbXSl9IGRhdGEgVGhlIHJlY2VpdmVkIGRhdGFcbiAgICogQHBhcmFtIHtXZWJTb2NrZXR9IHRhcmdldCBBIHJlZmVyZW5jZSB0byB0aGUgdGFyZ2V0IHRvIHdoaWNoIHRoZSBldmVudCB3YXNcbiAgICogICAgIGRpc3BhdGNoZWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGRhdGEsIHRhcmdldCkge1xuICAgIHN1cGVyKCdtZXNzYWdlJywgdGFyZ2V0KTtcblxuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cbn1cblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBjbG9zZSBldmVudC5cbiAqXG4gKiBAZXh0ZW5kcyBFdmVudFxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgQ2xvc2VFdmVudCBleHRlbmRzIEV2ZW50IHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBgQ2xvc2VFdmVudGAuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlIFRoZSBzdGF0dXMgY29kZSBleHBsYWluaW5nIHdoeSB0aGUgY29ubmVjdGlvbiBpcyBiZWluZ1xuICAgKiAgICAgY2xvc2VkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByZWFzb24gQSBodW1hbi1yZWFkYWJsZSBzdHJpbmcgZXhwbGFpbmluZyB3aHkgdGhlXG4gICAqICAgICBjb25uZWN0aW9uIGlzIGNsb3NpbmdcbiAgICogQHBhcmFtIHtXZWJTb2NrZXR9IHRhcmdldCBBIHJlZmVyZW5jZSB0byB0aGUgdGFyZ2V0IHRvIHdoaWNoIHRoZSBldmVudCB3YXNcbiAgICogICAgIGRpc3BhdGNoZWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvZGUsIHJlYXNvbiwgdGFyZ2V0KSB7XG4gICAgc3VwZXIoJ2Nsb3NlJywgdGFyZ2V0KTtcblxuICAgIHRoaXMud2FzQ2xlYW4gPSB0YXJnZXQuX2Nsb3NlRnJhbWVSZWNlaXZlZCAmJiB0YXJnZXQuX2Nsb3NlRnJhbWVTZW50O1xuICAgIHRoaXMucmVhc29uID0gcmVhc29uO1xuICAgIHRoaXMuY29kZSA9IGNvZGU7XG4gIH1cbn1cblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYW4gb3BlbiBldmVudC5cbiAqXG4gKiBAZXh0ZW5kcyBFdmVudFxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgT3BlbkV2ZW50IGV4dGVuZHMgRXZlbnQge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGBPcGVuRXZlbnRgLlxuICAgKlxuICAgKiBAcGFyYW0ge1dlYlNvY2tldH0gdGFyZ2V0IEEgcmVmZXJlbmNlIHRvIHRoZSB0YXJnZXQgdG8gd2hpY2ggdGhlIGV2ZW50IHdhc1xuICAgKiAgICAgZGlzcGF0Y2hlZFxuICAgKi9cbiAgY29uc3RydWN0b3IodGFyZ2V0KSB7XG4gICAgc3VwZXIoJ29wZW4nLCB0YXJnZXQpO1xuICB9XG59XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGFuIGVycm9yIGV2ZW50LlxuICpcbiAqIEBleHRlbmRzIEV2ZW50XG4gKiBAcHJpdmF0ZVxuICovXG5jbGFzcyBFcnJvckV2ZW50IGV4dGVuZHMgRXZlbnQge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGBFcnJvckV2ZW50YC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGVycm9yIFRoZSBlcnJvciB0aGF0IGdlbmVyYXRlZCB0aGlzIGV2ZW50XG4gICAqIEBwYXJhbSB7V2ViU29ja2V0fSB0YXJnZXQgQSByZWZlcmVuY2UgdG8gdGhlIHRhcmdldCB0byB3aGljaCB0aGUgZXZlbnQgd2FzXG4gICAqICAgICBkaXNwYXRjaGVkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlcnJvciwgdGFyZ2V0KSB7XG4gICAgc3VwZXIoJ2Vycm9yJywgdGFyZ2V0KTtcblxuICAgIHRoaXMubWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyBwcm92aWRlcyBtZXRob2RzIGZvciBlbXVsYXRpbmcgdGhlIGBFdmVudFRhcmdldGAgaW50ZXJmYWNlLiBJdCdzIG5vdFxuICogbWVhbnQgdG8gYmUgdXNlZCBkaXJlY3RseS5cbiAqXG4gKiBAbWl4aW5cbiAqL1xuY29uc3QgRXZlbnRUYXJnZXQgPSB7XG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbiBldmVudCBsaXN0ZW5lci5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3JcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgVGhlIGxpc3RlbmVyIHRvIGFkZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIEFuIG9wdGlvbnMgb2JqZWN0IHNwZWNpZmllcyBjaGFyYWN0ZXJpc3RpY3MgYWJvdXRcbiAgICogICAgIHRoZSBldmVudCBsaXN0ZW5lclxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm9uY2U9ZmFsc2VdIEEgYEJvb2xlYW5gYCBpbmRpY2F0aW5nIHRoYXQgdGhlXG4gICAqICAgICBsaXN0ZW5lciBzaG91bGQgYmUgaW52b2tlZCBhdCBtb3N0IG9uY2UgYWZ0ZXIgYmVpbmcgYWRkZWQuIElmIGB0cnVlYCxcbiAgICogICAgIHRoZSBsaXN0ZW5lciB3b3VsZCBiZSBhdXRvbWF0aWNhbGx5IHJlbW92ZWQgd2hlbiBpbnZva2VkLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBhZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuO1xuXG4gICAgZnVuY3Rpb24gb25NZXNzYWdlKGRhdGEpIHtcbiAgICAgIGxpc3RlbmVyLmNhbGwodGhpcywgbmV3IE1lc3NhZ2VFdmVudChkYXRhLCB0aGlzKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DbG9zZShjb2RlLCBtZXNzYWdlKSB7XG4gICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIG5ldyBDbG9zZUV2ZW50KGNvZGUsIG1lc3NhZ2UsIHRoaXMpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkVycm9yKGVycm9yKSB7XG4gICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIG5ldyBFcnJvckV2ZW50KGVycm9yLCB0aGlzKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25PcGVuKCkge1xuICAgICAgbGlzdGVuZXIuY2FsbCh0aGlzLCBuZXcgT3BlbkV2ZW50KHRoaXMpKTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXRob2QgPSBvcHRpb25zICYmIG9wdGlvbnMub25jZSA/ICdvbmNlJyA6ICdvbic7XG5cbiAgICBpZiAodHlwZSA9PT0gJ21lc3NhZ2UnKSB7XG4gICAgICBvbk1lc3NhZ2UuX2xpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICB0aGlzW21ldGhvZF0odHlwZSwgb25NZXNzYWdlKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdjbG9zZScpIHtcbiAgICAgIG9uQ2xvc2UuX2xpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICB0aGlzW21ldGhvZF0odHlwZSwgb25DbG9zZSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgICBvbkVycm9yLl9saXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgdGhpc1ttZXRob2RdKHR5cGUsIG9uRXJyb3IpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29wZW4nKSB7XG4gICAgICBvbk9wZW4uX2xpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICB0aGlzW21ldGhvZF0odHlwZSwgb25PcGVuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpc1ttZXRob2RdKHR5cGUsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIHJlbW92ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBUaGUgbGlzdGVuZXIgdG8gcmVtb3ZlXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVycyh0eXBlKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobGlzdGVuZXJzW2ldID09PSBsaXN0ZW5lciB8fCBsaXN0ZW5lcnNbaV0uX2xpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50VGFyZ2V0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vL1xuLy8gQWxsb3dlZCB0b2tlbiBjaGFyYWN0ZXJzOlxuLy9cbi8vICchJywgJyMnLCAnJCcsICclJywgJyYnLCAnJycsICcqJywgJysnLCAnLScsXG4vLyAnLicsIDAtOSwgQS1aLCAnXicsICdfJywgJ2AnLCBhLXosICd8JywgJ34nXG4vL1xuLy8gdG9rZW5DaGFyc1szMl0gPT09IDAgLy8gJyAnXG4vLyB0b2tlbkNoYXJzWzMzXSA9PT0gMSAvLyAnISdcbi8vIHRva2VuQ2hhcnNbMzRdID09PSAwIC8vICdcIidcbi8vIC4uLlxuLy9cbi8vIHByZXR0aWVyLWlnbm9yZVxuY29uc3QgdG9rZW5DaGFycyA9IFtcbiAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgLy8gMCAtIDE1XG4gIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIC8vIDE2IC0gMzFcbiAgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMSwgMSwgMCwgLy8gMzIgLSA0N1xuICAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAvLyA0OCAtIDYzXG4gIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIC8vIDY0IC0gNzlcbiAgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgLy8gODAgLSA5NVxuICAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAvLyA5NiAtIDExMVxuICAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwIC8vIDExMiAtIDEyN1xuXTtcblxuLyoqXG4gKiBBZGRzIGFuIG9mZmVyIHRvIHRoZSBtYXAgb2YgZXh0ZW5zaW9uIG9mZmVycyBvciBhIHBhcmFtZXRlciB0byB0aGUgbWFwIG9mXG4gKiBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXN0IFRoZSBtYXAgb2YgZXh0ZW5zaW9uIG9mZmVycyBvciBwYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgZXh0ZW5zaW9uIG9yIHBhcmFtZXRlciBuYW1lXG4gKiBAcGFyYW0geyhPYmplY3R8Qm9vbGVhbnxTdHJpbmcpfSBlbGVtIFRoZSBleHRlbnNpb24gcGFyYW1ldGVycyBvciB0aGVcbiAqICAgICBwYXJhbWV0ZXIgdmFsdWVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHB1c2goZGVzdCwgbmFtZSwgZWxlbSkge1xuICBpZiAoZGVzdFtuYW1lXSA9PT0gdW5kZWZpbmVkKSBkZXN0W25hbWVdID0gW2VsZW1dO1xuICBlbHNlIGRlc3RbbmFtZV0ucHVzaChlbGVtKTtcbn1cblxuLyoqXG4gKiBQYXJzZXMgdGhlIGBTZWMtV2ViU29ja2V0LUV4dGVuc2lvbnNgIGhlYWRlciBpbnRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVyIFRoZSBmaWVsZCB2YWx1ZSBvZiB0aGUgaGVhZGVyXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBwYXJzZWQgb2JqZWN0XG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIHBhcnNlKGhlYWRlcikge1xuICBjb25zdCBvZmZlcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIGlmIChoZWFkZXIgPT09IHVuZGVmaW5lZCB8fCBoZWFkZXIgPT09ICcnKSByZXR1cm4gb2ZmZXJzO1xuXG4gIGxldCBwYXJhbXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBsZXQgbXVzdFVuZXNjYXBlID0gZmFsc2U7XG4gIGxldCBpc0VzY2FwaW5nID0gZmFsc2U7XG4gIGxldCBpblF1b3RlcyA9IGZhbHNlO1xuICBsZXQgZXh0ZW5zaW9uTmFtZTtcbiAgbGV0IHBhcmFtTmFtZTtcbiAgbGV0IHN0YXJ0ID0gLTE7XG4gIGxldCBlbmQgPSAtMTtcbiAgbGV0IGkgPSAwO1xuXG4gIGZvciAoOyBpIDwgaGVhZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY29kZSA9IGhlYWRlci5jaGFyQ29kZUF0KGkpO1xuXG4gICAgaWYgKGV4dGVuc2lvbk5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGVuZCA9PT0gLTEgJiYgdG9rZW5DaGFyc1tjb2RlXSA9PT0gMSkge1xuICAgICAgICBpZiAoc3RhcnQgPT09IC0xKSBzdGFydCA9IGk7XG4gICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4MjAgLyogJyAnICovIHx8IGNvZGUgPT09IDB4MDkgLyogJ1xcdCcgKi8pIHtcbiAgICAgICAgaWYgKGVuZCA9PT0gLTEgJiYgc3RhcnQgIT09IC0xKSBlbmQgPSBpO1xuICAgICAgfSBlbHNlIGlmIChjb2RlID09PSAweDNiIC8qICc7JyAqLyB8fCBjb2RlID09PSAweDJjIC8qICcsJyAqLykge1xuICAgICAgICBpZiAoc3RhcnQgPT09IC0xKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBhdCBpbmRleCAke2l9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW5kID09PSAtMSkgZW5kID0gaTtcbiAgICAgICAgY29uc3QgbmFtZSA9IGhlYWRlci5zbGljZShzdGFydCwgZW5kKTtcbiAgICAgICAgaWYgKGNvZGUgPT09IDB4MmMpIHtcbiAgICAgICAgICBwdXNoKG9mZmVycywgbmFtZSwgcGFyYW1zKTtcbiAgICAgICAgICBwYXJhbXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4dGVuc2lvbk5hbWUgPSBuYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnQgPSBlbmQgPSAtMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgVW5leHBlY3RlZCBjaGFyYWN0ZXIgYXQgaW5kZXggJHtpfWApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocGFyYW1OYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChlbmQgPT09IC0xICYmIHRva2VuQ2hhcnNbY29kZV0gPT09IDEpIHtcbiAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkgc3RhcnQgPSBpO1xuICAgICAgfSBlbHNlIGlmIChjb2RlID09PSAweDIwIHx8IGNvZGUgPT09IDB4MDkpIHtcbiAgICAgICAgaWYgKGVuZCA9PT0gLTEgJiYgc3RhcnQgIT09IC0xKSBlbmQgPSBpO1xuICAgICAgfSBlbHNlIGlmIChjb2RlID09PSAweDNiIHx8IGNvZGUgPT09IDB4MmMpIHtcbiAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkge1xuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgVW5leHBlY3RlZCBjaGFyYWN0ZXIgYXQgaW5kZXggJHtpfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVuZCA9PT0gLTEpIGVuZCA9IGk7XG4gICAgICAgIHB1c2gocGFyYW1zLCBoZWFkZXIuc2xpY2Uoc3RhcnQsIGVuZCksIHRydWUpO1xuICAgICAgICBpZiAoY29kZSA9PT0gMHgyYykge1xuICAgICAgICAgIHB1c2gob2ZmZXJzLCBleHRlbnNpb25OYW1lLCBwYXJhbXMpO1xuICAgICAgICAgIHBhcmFtcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZXh0ZW5zaW9uTmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0ID0gZW5kID0gLTE7XG4gICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4M2QgLyogJz0nICovICYmIHN0YXJ0ICE9PSAtMSAmJiBlbmQgPT09IC0xKSB7XG4gICAgICAgIHBhcmFtTmFtZSA9IGhlYWRlci5zbGljZShzdGFydCwgaSk7XG4gICAgICAgIHN0YXJ0ID0gZW5kID0gLTE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFVuZXhwZWN0ZWQgY2hhcmFjdGVyIGF0IGluZGV4ICR7aX1gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy9cbiAgICAgIC8vIFRoZSB2YWx1ZSBvZiBhIHF1b3RlZC1zdHJpbmcgYWZ0ZXIgdW5lc2NhcGluZyBtdXN0IGNvbmZvcm0gdG8gdGhlXG4gICAgICAvLyB0b2tlbiBBQk5GLCBzbyBvbmx5IHRva2VuIGNoYXJhY3RlcnMgYXJlIHZhbGlkLlxuICAgICAgLy8gUmVmOiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjQ1NSNzZWN0aW9uLTkuMVxuICAgICAgLy9cbiAgICAgIGlmIChpc0VzY2FwaW5nKSB7XG4gICAgICAgIGlmICh0b2tlbkNoYXJzW2NvZGVdICE9PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBhdCBpbmRleCAke2l9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkgc3RhcnQgPSBpO1xuICAgICAgICBlbHNlIGlmICghbXVzdFVuZXNjYXBlKSBtdXN0VW5lc2NhcGUgPSB0cnVlO1xuICAgICAgICBpc0VzY2FwaW5nID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKGluUXVvdGVzKSB7XG4gICAgICAgIGlmICh0b2tlbkNoYXJzW2NvZGVdID09PSAxKSB7XG4gICAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkgc3RhcnQgPSBpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4MjIgLyogJ1wiJyAqLyAmJiBzdGFydCAhPT0gLTEpIHtcbiAgICAgICAgICBpblF1b3RlcyA9IGZhbHNlO1xuICAgICAgICAgIGVuZCA9IGk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMHg1YyAvKiAnXFwnICovKSB7XG4gICAgICAgICAgaXNFc2NhcGluZyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBhdCBpbmRleCAke2l9YCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMHgyMiAmJiBoZWFkZXIuY2hhckNvZGVBdChpIC0gMSkgPT09IDB4M2QpIHtcbiAgICAgICAgaW5RdW90ZXMgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChlbmQgPT09IC0xICYmIHRva2VuQ2hhcnNbY29kZV0gPT09IDEpIHtcbiAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkgc3RhcnQgPSBpO1xuICAgICAgfSBlbHNlIGlmIChzdGFydCAhPT0gLTEgJiYgKGNvZGUgPT09IDB4MjAgfHwgY29kZSA9PT0gMHgwOSkpIHtcbiAgICAgICAgaWYgKGVuZCA9PT0gLTEpIGVuZCA9IGk7XG4gICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4M2IgfHwgY29kZSA9PT0gMHgyYykge1xuICAgICAgICBpZiAoc3RhcnQgPT09IC0xKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBhdCBpbmRleCAke2l9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW5kID09PSAtMSkgZW5kID0gaTtcbiAgICAgICAgbGV0IHZhbHVlID0gaGVhZGVyLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICAgICAgICBpZiAobXVzdFVuZXNjYXBlKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXFxcL2csICcnKTtcbiAgICAgICAgICBtdXN0VW5lc2NhcGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBwdXNoKHBhcmFtcywgcGFyYW1OYW1lLCB2YWx1ZSk7XG4gICAgICAgIGlmIChjb2RlID09PSAweDJjKSB7XG4gICAgICAgICAgcHVzaChvZmZlcnMsIGV4dGVuc2lvbk5hbWUsIHBhcmFtcyk7XG4gICAgICAgICAgcGFyYW1zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBleHRlbnNpb25OYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyYW1OYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICBzdGFydCA9IGVuZCA9IC0xO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBhdCBpbmRleCAke2l9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSAtMSB8fCBpblF1b3Rlcykge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignVW5leHBlY3RlZCBlbmQgb2YgaW5wdXQnKTtcbiAgfVxuXG4gIGlmIChlbmQgPT09IC0xKSBlbmQgPSBpO1xuICBjb25zdCB0b2tlbiA9IGhlYWRlci5zbGljZShzdGFydCwgZW5kKTtcbiAgaWYgKGV4dGVuc2lvbk5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHB1c2gob2ZmZXJzLCB0b2tlbiwgcGFyYW1zKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAocGFyYW1OYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHB1c2gocGFyYW1zLCB0b2tlbiwgdHJ1ZSk7XG4gICAgfSBlbHNlIGlmIChtdXN0VW5lc2NhcGUpIHtcbiAgICAgIHB1c2gocGFyYW1zLCBwYXJhbU5hbWUsIHRva2VuLnJlcGxhY2UoL1xcXFwvZywgJycpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHVzaChwYXJhbXMsIHBhcmFtTmFtZSwgdG9rZW4pO1xuICAgIH1cbiAgICBwdXNoKG9mZmVycywgZXh0ZW5zaW9uTmFtZSwgcGFyYW1zKTtcbiAgfVxuXG4gIHJldHVybiBvZmZlcnM7XG59XG5cbi8qKlxuICogQnVpbGRzIHRoZSBgU2VjLVdlYlNvY2tldC1FeHRlbnNpb25zYCBoZWFkZXIgZmllbGQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGV4dGVuc2lvbnMgVGhlIG1hcCBvZiBleHRlbnNpb25zIGFuZCBwYXJhbWV0ZXJzIHRvIGZvcm1hdFxuICogQHJldHVybiB7U3RyaW5nfSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGdpdmVuIG9iamVjdFxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBmb3JtYXQoZXh0ZW5zaW9ucykge1xuICByZXR1cm4gT2JqZWN0LmtleXMoZXh0ZW5zaW9ucylcbiAgICAubWFwKChleHRlbnNpb24pID0+IHtcbiAgICAgIGxldCBjb25maWd1cmF0aW9ucyA9IGV4dGVuc2lvbnNbZXh0ZW5zaW9uXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShjb25maWd1cmF0aW9ucykpIGNvbmZpZ3VyYXRpb25zID0gW2NvbmZpZ3VyYXRpb25zXTtcbiAgICAgIHJldHVybiBjb25maWd1cmF0aW9uc1xuICAgICAgICAubWFwKChwYXJhbXMpID0+IHtcbiAgICAgICAgICByZXR1cm4gW2V4dGVuc2lvbl1cbiAgICAgICAgICAgIC5jb25jYXQoXG4gICAgICAgICAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykubWFwKChrKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlcyA9IHBhcmFtc1trXTtcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWVzKSkgdmFsdWVzID0gW3ZhbHVlc107XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgLm1hcCgodikgPT4gKHYgPT09IHRydWUgPyBrIDogYCR7a309JHt2fWApKVxuICAgICAgICAgICAgICAgICAgLmpvaW4oJzsgJyk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuam9pbignOyAnKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmpvaW4oJywgJyk7XG4gICAgfSlcbiAgICAuam9pbignLCAnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IGZvcm1hdCwgcGFyc2UgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qga0RvbmUgPSBTeW1ib2woJ2tEb25lJyk7XG5jb25zdCBrUnVuID0gU3ltYm9sKCdrUnVuJyk7XG5cbi8qKlxuICogQSB2ZXJ5IHNpbXBsZSBqb2IgcXVldWUgd2l0aCBhZGp1c3RhYmxlIGNvbmN1cnJlbmN5LiBBZGFwdGVkIGZyb21cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9TVFJNTC9hc3luYy1saW1pdGVyXG4gKi9cbmNsYXNzIExpbWl0ZXIge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgTGltaXRlcmAuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbY29uY3VycmVuY3k9SW5maW5pdHldIFRoZSBtYXhpbXVtIG51bWJlciBvZiBqb2JzIGFsbG93ZWRcbiAgICogICAgIHRvIHJ1biBjb25jdXJyZW50bHlcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmN1cnJlbmN5KSB7XG4gICAgdGhpc1trRG9uZV0gPSAoKSA9PiB7XG4gICAgICB0aGlzLnBlbmRpbmctLTtcbiAgICAgIHRoaXNba1J1bl0oKTtcbiAgICB9O1xuICAgIHRoaXMuY29uY3VycmVuY3kgPSBjb25jdXJyZW5jeSB8fCBJbmZpbml0eTtcbiAgICB0aGlzLmpvYnMgPSBbXTtcbiAgICB0aGlzLnBlbmRpbmcgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBqb2IgdG8gdGhlIHF1ZXVlLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBqb2IgVGhlIGpvYiB0byBydW5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYWRkKGpvYikge1xuICAgIHRoaXMuam9icy5wdXNoKGpvYik7XG4gICAgdGhpc1trUnVuXSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBqb2IgZnJvbSB0aGUgcXVldWUgYW5kIHJ1bnMgaXQgaWYgcG9zc2libGUuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBba1J1bl0oKSB7XG4gICAgaWYgKHRoaXMucGVuZGluZyA9PT0gdGhpcy5jb25jdXJyZW5jeSkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuam9icy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGpvYiA9IHRoaXMuam9icy5zaGlmdCgpO1xuXG4gICAgICB0aGlzLnBlbmRpbmcrKztcbiAgICAgIGpvYih0aGlzW2tEb25lXSk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTGltaXRlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgemxpYiA9IHJlcXVpcmUoJ3psaWInKTtcblxuY29uc3QgYnVmZmVyVXRpbCA9IHJlcXVpcmUoJy4vYnVmZmVyLXV0aWwnKTtcbmNvbnN0IExpbWl0ZXIgPSByZXF1aXJlKCcuL2xpbWl0ZXInKTtcbmNvbnN0IHsga1N0YXR1c0NvZGUsIE5PT1AgfSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbmNvbnN0IFRSQUlMRVIgPSBCdWZmZXIuZnJvbShbMHgwMCwgMHgwMCwgMHhmZiwgMHhmZl0pO1xuY29uc3Qga1Blck1lc3NhZ2VEZWZsYXRlID0gU3ltYm9sKCdwZXJtZXNzYWdlLWRlZmxhdGUnKTtcbmNvbnN0IGtUb3RhbExlbmd0aCA9IFN5bWJvbCgndG90YWwtbGVuZ3RoJyk7XG5jb25zdCBrQ2FsbGJhY2sgPSBTeW1ib2woJ2NhbGxiYWNrJyk7XG5jb25zdCBrQnVmZmVycyA9IFN5bWJvbCgnYnVmZmVycycpO1xuY29uc3Qga0Vycm9yID0gU3ltYm9sKCdlcnJvcicpO1xuXG4vL1xuLy8gV2UgbGltaXQgemxpYiBjb25jdXJyZW5jeSwgd2hpY2ggcHJldmVudHMgc2V2ZXJlIG1lbW9yeSBmcmFnbWVudGF0aW9uXG4vLyBhcyBkb2N1bWVudGVkIGluIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9pc3N1ZXMvODg3MSNpc3N1ZWNvbW1lbnQtMjUwOTE1OTEzXG4vLyBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3dlYnNvY2tldHMvd3MvaXNzdWVzLzEyMDJcbi8vXG4vLyBJbnRlbnRpb25hbGx5IGdsb2JhbDsgaXQncyB0aGUgZ2xvYmFsIHRocmVhZCBwb29sIHRoYXQncyBhbiBpc3N1ZS5cbi8vXG5sZXQgemxpYkxpbWl0ZXI7XG5cbi8qKlxuICogcGVybWVzc2FnZS1kZWZsYXRlIGltcGxlbWVudGF0aW9uLlxuICovXG5jbGFzcyBQZXJNZXNzYWdlRGVmbGF0ZSB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgUGVyTWVzc2FnZURlZmxhdGUgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gQ29uZmlndXJhdGlvbiBvcHRpb25zXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuc2VydmVyTm9Db250ZXh0VGFrZW92ZXI9ZmFsc2VdIFJlcXVlc3QvYWNjZXB0XG4gICAqICAgICBkaXNhYmxpbmcgb2Ygc2VydmVyIGNvbnRleHQgdGFrZW92ZXJcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jbGllbnROb0NvbnRleHRUYWtlb3Zlcj1mYWxzZV0gQWR2ZXJ0aXNlL1xuICAgKiAgICAgYWNrbm93bGVkZ2UgZGlzYWJsaW5nIG9mIGNsaWVudCBjb250ZXh0IHRha2VvdmVyXG4gICAqIEBwYXJhbSB7KEJvb2xlYW58TnVtYmVyKX0gW29wdGlvbnMuc2VydmVyTWF4V2luZG93Qml0c10gUmVxdWVzdC9jb25maXJtIHRoZVxuICAgKiAgICAgdXNlIG9mIGEgY3VzdG9tIHNlcnZlciB3aW5kb3cgc2l6ZVxuICAgKiBAcGFyYW0geyhCb29sZWFufE51bWJlcil9IFtvcHRpb25zLmNsaWVudE1heFdpbmRvd0JpdHNdIEFkdmVydGlzZSBzdXBwb3J0XG4gICAqICAgICBmb3IsIG9yIHJlcXVlc3QsIGEgY3VzdG9tIGNsaWVudCB3aW5kb3cgc2l6ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuemxpYkRlZmxhdGVPcHRpb25zXSBPcHRpb25zIHRvIHBhc3MgdG8gemxpYiBvblxuICAgKiAgICAgZGVmbGF0ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuemxpYkluZmxhdGVPcHRpb25zXSBPcHRpb25zIHRvIHBhc3MgdG8gemxpYiBvblxuICAgKiAgICAgaW5mbGF0ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMudGhyZXNob2xkPTEwMjRdIFNpemUgKGluIGJ5dGVzKSBiZWxvdyB3aGljaFxuICAgKiAgICAgbWVzc2FnZXMgc2hvdWxkIG5vdCBiZSBjb21wcmVzc2VkXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5jb25jdXJyZW5jeUxpbWl0PTEwXSBUaGUgbnVtYmVyIG9mIGNvbmN1cnJlbnRcbiAgICogICAgIGNhbGxzIHRvIHpsaWJcbiAgICogQHBhcmFtIHtCb29sZWFufSBbaXNTZXJ2ZXI9ZmFsc2VdIENyZWF0ZSB0aGUgaW5zdGFuY2UgaW4gZWl0aGVyIHNlcnZlciBvclxuICAgKiAgICAgY2xpZW50IG1vZGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFttYXhQYXlsb2FkPTBdIFRoZSBtYXhpbXVtIGFsbG93ZWQgbWVzc2FnZSBsZW5ndGhcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMsIGlzU2VydmVyLCBtYXhQYXlsb2FkKSB7XG4gICAgdGhpcy5fbWF4UGF5bG9hZCA9IG1heFBheWxvYWQgfCAwO1xuICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuX3RocmVzaG9sZCA9XG4gICAgICB0aGlzLl9vcHRpb25zLnRocmVzaG9sZCAhPT0gdW5kZWZpbmVkID8gdGhpcy5fb3B0aW9ucy50aHJlc2hvbGQgOiAxMDI0O1xuICAgIHRoaXMuX2lzU2VydmVyID0gISFpc1NlcnZlcjtcbiAgICB0aGlzLl9kZWZsYXRlID0gbnVsbDtcbiAgICB0aGlzLl9pbmZsYXRlID0gbnVsbDtcblxuICAgIHRoaXMucGFyYW1zID0gbnVsbDtcblxuICAgIGlmICghemxpYkxpbWl0ZXIpIHtcbiAgICAgIGNvbnN0IGNvbmN1cnJlbmN5ID1cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5jb25jdXJyZW5jeUxpbWl0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IHRoaXMuX29wdGlvbnMuY29uY3VycmVuY3lMaW1pdFxuICAgICAgICAgIDogMTA7XG4gICAgICB6bGliTGltaXRlciA9IG5ldyBMaW1pdGVyKGNvbmN1cnJlbmN5KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIHN0YXRpYyBnZXQgZXh0ZW5zaW9uTmFtZSgpIHtcbiAgICByZXR1cm4gJ3Blcm1lc3NhZ2UtZGVmbGF0ZSc7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIGV4dGVuc2lvbiBuZWdvdGlhdGlvbiBvZmZlci5cbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fSBFeHRlbnNpb24gcGFyYW1ldGVyc1xuICAgKiBAcHVibGljXG4gICAqL1xuICBvZmZlcigpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7fTtcblxuICAgIGlmICh0aGlzLl9vcHRpb25zLnNlcnZlck5vQ29udGV4dFRha2VvdmVyKSB7XG4gICAgICBwYXJhbXMuc2VydmVyX25vX2NvbnRleHRfdGFrZW92ZXIgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5fb3B0aW9ucy5jbGllbnROb0NvbnRleHRUYWtlb3Zlcikge1xuICAgICAgcGFyYW1zLmNsaWVudF9ub19jb250ZXh0X3Rha2VvdmVyID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX29wdGlvbnMuc2VydmVyTWF4V2luZG93Qml0cykge1xuICAgICAgcGFyYW1zLnNlcnZlcl9tYXhfd2luZG93X2JpdHMgPSB0aGlzLl9vcHRpb25zLnNlcnZlck1heFdpbmRvd0JpdHM7XG4gICAgfVxuICAgIGlmICh0aGlzLl9vcHRpb25zLmNsaWVudE1heFdpbmRvd0JpdHMpIHtcbiAgICAgIHBhcmFtcy5jbGllbnRfbWF4X3dpbmRvd19iaXRzID0gdGhpcy5fb3B0aW9ucy5jbGllbnRNYXhXaW5kb3dCaXRzO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fb3B0aW9ucy5jbGllbnRNYXhXaW5kb3dCaXRzID09IG51bGwpIHtcbiAgICAgIHBhcmFtcy5jbGllbnRfbWF4X3dpbmRvd19iaXRzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjY2VwdCBhbiBleHRlbnNpb24gbmVnb3RpYXRpb24gb2ZmZXIvcmVzcG9uc2UuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGNvbmZpZ3VyYXRpb25zIFRoZSBleHRlbnNpb24gbmVnb3RpYXRpb24gb2ZmZXJzL3JlcG9uc2VcbiAgICogQHJldHVybiB7T2JqZWN0fSBBY2NlcHRlZCBjb25maWd1cmF0aW9uXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFjY2VwdChjb25maWd1cmF0aW9ucykge1xuICAgIGNvbmZpZ3VyYXRpb25zID0gdGhpcy5ub3JtYWxpemVQYXJhbXMoY29uZmlndXJhdGlvbnMpO1xuXG4gICAgdGhpcy5wYXJhbXMgPSB0aGlzLl9pc1NlcnZlclxuICAgICAgPyB0aGlzLmFjY2VwdEFzU2VydmVyKGNvbmZpZ3VyYXRpb25zKVxuICAgICAgOiB0aGlzLmFjY2VwdEFzQ2xpZW50KGNvbmZpZ3VyYXRpb25zKTtcblxuICAgIHJldHVybiB0aGlzLnBhcmFtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWxlYXNlcyBhbGwgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIGV4dGVuc2lvbi5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY2xlYW51cCgpIHtcbiAgICBpZiAodGhpcy5faW5mbGF0ZSkge1xuICAgICAgdGhpcy5faW5mbGF0ZS5jbG9zZSgpO1xuICAgICAgdGhpcy5faW5mbGF0ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2RlZmxhdGUpIHtcbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gdGhpcy5fZGVmbGF0ZVtrQ2FsbGJhY2tdO1xuXG4gICAgICB0aGlzLl9kZWZsYXRlLmNsb3NlKCk7XG4gICAgICB0aGlzLl9kZWZsYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgIG5ldyBFcnJvcihcbiAgICAgICAgICAgICdUaGUgZGVmbGF0ZSBzdHJlYW0gd2FzIGNsb3NlZCB3aGlsZSBkYXRhIHdhcyBiZWluZyBwcm9jZXNzZWQnXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAgQWNjZXB0IGFuIGV4dGVuc2lvbiBuZWdvdGlhdGlvbiBvZmZlci5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gb2ZmZXJzIFRoZSBleHRlbnNpb24gbmVnb3RpYXRpb24gb2ZmZXJzXG4gICAqIEByZXR1cm4ge09iamVjdH0gQWNjZXB0ZWQgY29uZmlndXJhdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYWNjZXB0QXNTZXJ2ZXIob2ZmZXJzKSB7XG4gICAgY29uc3Qgb3B0cyA9IHRoaXMuX29wdGlvbnM7XG4gICAgY29uc3QgYWNjZXB0ZWQgPSBvZmZlcnMuZmluZCgocGFyYW1zKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIChvcHRzLnNlcnZlck5vQ29udGV4dFRha2VvdmVyID09PSBmYWxzZSAmJlxuICAgICAgICAgIHBhcmFtcy5zZXJ2ZXJfbm9fY29udGV4dF90YWtlb3ZlcikgfHxcbiAgICAgICAgKHBhcmFtcy5zZXJ2ZXJfbWF4X3dpbmRvd19iaXRzICYmXG4gICAgICAgICAgKG9wdHMuc2VydmVyTWF4V2luZG93Qml0cyA9PT0gZmFsc2UgfHxcbiAgICAgICAgICAgICh0eXBlb2Ygb3B0cy5zZXJ2ZXJNYXhXaW5kb3dCaXRzID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgICBvcHRzLnNlcnZlck1heFdpbmRvd0JpdHMgPiBwYXJhbXMuc2VydmVyX21heF93aW5kb3dfYml0cykpKSB8fFxuICAgICAgICAodHlwZW9mIG9wdHMuY2xpZW50TWF4V2luZG93Qml0cyA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAhcGFyYW1zLmNsaWVudF9tYXhfd2luZG93X2JpdHMpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcblxuICAgIGlmICghYWNjZXB0ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm9uZSBvZiB0aGUgZXh0ZW5zaW9uIG9mZmVycyBjYW4gYmUgYWNjZXB0ZWQnKTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy5zZXJ2ZXJOb0NvbnRleHRUYWtlb3Zlcikge1xuICAgICAgYWNjZXB0ZWQuc2VydmVyX25vX2NvbnRleHRfdGFrZW92ZXIgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAob3B0cy5jbGllbnROb0NvbnRleHRUYWtlb3Zlcikge1xuICAgICAgYWNjZXB0ZWQuY2xpZW50X25vX2NvbnRleHRfdGFrZW92ZXIgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9wdHMuc2VydmVyTWF4V2luZG93Qml0cyA9PT0gJ251bWJlcicpIHtcbiAgICAgIGFjY2VwdGVkLnNlcnZlcl9tYXhfd2luZG93X2JpdHMgPSBvcHRzLnNlcnZlck1heFdpbmRvd0JpdHM7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb3B0cy5jbGllbnRNYXhXaW5kb3dCaXRzID09PSAnbnVtYmVyJykge1xuICAgICAgYWNjZXB0ZWQuY2xpZW50X21heF93aW5kb3dfYml0cyA9IG9wdHMuY2xpZW50TWF4V2luZG93Qml0cztcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgYWNjZXB0ZWQuY2xpZW50X21heF93aW5kb3dfYml0cyA9PT0gdHJ1ZSB8fFxuICAgICAgb3B0cy5jbGllbnRNYXhXaW5kb3dCaXRzID09PSBmYWxzZVxuICAgICkge1xuICAgICAgZGVsZXRlIGFjY2VwdGVkLmNsaWVudF9tYXhfd2luZG93X2JpdHM7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjY2VwdGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjY2VwdCB0aGUgZXh0ZW5zaW9uIG5lZ290aWF0aW9uIHJlc3BvbnNlLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSByZXNwb25zZSBUaGUgZXh0ZW5zaW9uIG5lZ290aWF0aW9uIHJlc3BvbnNlXG4gICAqIEByZXR1cm4ge09iamVjdH0gQWNjZXB0ZWQgY29uZmlndXJhdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYWNjZXB0QXNDbGllbnQocmVzcG9uc2UpIHtcbiAgICBjb25zdCBwYXJhbXMgPSByZXNwb25zZVswXTtcblxuICAgIGlmIChcbiAgICAgIHRoaXMuX29wdGlvbnMuY2xpZW50Tm9Db250ZXh0VGFrZW92ZXIgPT09IGZhbHNlICYmXG4gICAgICBwYXJhbXMuY2xpZW50X25vX2NvbnRleHRfdGFrZW92ZXJcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBwYXJhbWV0ZXIgXCJjbGllbnRfbm9fY29udGV4dF90YWtlb3ZlclwiJyk7XG4gICAgfVxuXG4gICAgaWYgKCFwYXJhbXMuY2xpZW50X21heF93aW5kb3dfYml0cykge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLl9vcHRpb25zLmNsaWVudE1heFdpbmRvd0JpdHMgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHBhcmFtcy5jbGllbnRfbWF4X3dpbmRvd19iaXRzID0gdGhpcy5fb3B0aW9ucy5jbGllbnRNYXhXaW5kb3dCaXRzO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0aGlzLl9vcHRpb25zLmNsaWVudE1heFdpbmRvd0JpdHMgPT09IGZhbHNlIHx8XG4gICAgICAodHlwZW9mIHRoaXMuX29wdGlvbnMuY2xpZW50TWF4V2luZG93Qml0cyA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgcGFyYW1zLmNsaWVudF9tYXhfd2luZG93X2JpdHMgPiB0aGlzLl9vcHRpb25zLmNsaWVudE1heFdpbmRvd0JpdHMpXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdVbmV4cGVjdGVkIG9yIGludmFsaWQgcGFyYW1ldGVyIFwiY2xpZW50X21heF93aW5kb3dfYml0c1wiJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBjb25maWd1cmF0aW9ucyBUaGUgZXh0ZW5zaW9uIG5lZ290aWF0aW9uIG9mZmVycy9yZXBvbnNlXG4gICAqIEByZXR1cm4ge0FycmF5fSBUaGUgb2ZmZXJzL3Jlc3BvbnNlIHdpdGggbm9ybWFsaXplZCBwYXJhbWV0ZXJzXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBub3JtYWxpemVQYXJhbXMoY29uZmlndXJhdGlvbnMpIHtcbiAgICBjb25maWd1cmF0aW9ucy5mb3JFYWNoKChwYXJhbXMpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHBhcmFtc1trZXldO1xuXG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgXCIke2tleX1cIiBtdXN0IGhhdmUgb25seSBhIHNpbmdsZSB2YWx1ZWApO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFsdWUgPSB2YWx1ZVswXTtcblxuICAgICAgICBpZiAoa2V5ID09PSAnY2xpZW50X21heF93aW5kb3dfYml0cycpIHtcbiAgICAgICAgICBpZiAodmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnN0IG51bSA9ICt2YWx1ZTtcbiAgICAgICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihudW0pIHx8IG51bSA8IDggfHwgbnVtID4gMTUpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgICAgICBgSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyIFwiJHtrZXl9XCI6ICR7dmFsdWV9YFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWUgPSBudW07XG4gICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5faXNTZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgIGBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgXCIke2tleX1cIjogJHt2YWx1ZX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdzZXJ2ZXJfbWF4X3dpbmRvd19iaXRzJykge1xuICAgICAgICAgIGNvbnN0IG51bSA9ICt2YWx1ZTtcbiAgICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobnVtKSB8fCBudW0gPCA4IHx8IG51bSA+IDE1KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgICBgSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyIFwiJHtrZXl9XCI6ICR7dmFsdWV9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWUgPSBudW07XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAga2V5ID09PSAnY2xpZW50X25vX2NvbnRleHRfdGFrZW92ZXInIHx8XG4gICAgICAgICAga2V5ID09PSAnc2VydmVyX25vX2NvbnRleHRfdGFrZW92ZXInXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgICAgYEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciBcIiR7a2V5fVwiOiAke3ZhbHVlfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBwYXJhbWV0ZXIgXCIke2tleX1cImApO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyYW1zW2tleV0gPSB2YWx1ZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvbmZpZ3VyYXRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIERlY29tcHJlc3MgZGF0YS4gQ29uY3VycmVuY3kgbGltaXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGRhdGEgQ29tcHJlc3NlZCBkYXRhXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gZmluIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGlzIHRoZSBsYXN0IGZyYWdtZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGRlY29tcHJlc3MoZGF0YSwgZmluLCBjYWxsYmFjaykge1xuICAgIHpsaWJMaW1pdGVyLmFkZCgoZG9uZSkgPT4ge1xuICAgICAgdGhpcy5fZGVjb21wcmVzcyhkYXRhLCBmaW4sIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICBkb25lKCk7XG4gICAgICAgIGNhbGxiYWNrKGVyciwgcmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXByZXNzIGRhdGEuIENvbmN1cnJlbmN5IGxpbWl0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7QnVmZmVyfSBkYXRhIERhdGEgdG8gY29tcHJlc3NcbiAgICogQHBhcmFtIHtCb29sZWFufSBmaW4gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRoaXMgaXMgdGhlIGxhc3QgZnJhZ21lbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2tcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY29tcHJlc3MoZGF0YSwgZmluLCBjYWxsYmFjaykge1xuICAgIHpsaWJMaW1pdGVyLmFkZCgoZG9uZSkgPT4ge1xuICAgICAgdGhpcy5fY29tcHJlc3MoZGF0YSwgZmluLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgICBjYWxsYmFjayhlcnIsIHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWNvbXByZXNzIGRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7QnVmZmVyfSBkYXRhIENvbXByZXNzZWQgZGF0YVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZpbiBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdGhpcyBpcyB0aGUgbGFzdCBmcmFnbWVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFja1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2RlY29tcHJlc3MoZGF0YSwgZmluLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5faXNTZXJ2ZXIgPyAnY2xpZW50JyA6ICdzZXJ2ZXInO1xuXG4gICAgaWYgKCF0aGlzLl9pbmZsYXRlKSB7XG4gICAgICBjb25zdCBrZXkgPSBgJHtlbmRwb2ludH1fbWF4X3dpbmRvd19iaXRzYDtcbiAgICAgIGNvbnN0IHdpbmRvd0JpdHMgPVxuICAgICAgICB0eXBlb2YgdGhpcy5wYXJhbXNba2V5XSAhPT0gJ251bWJlcidcbiAgICAgICAgICA/IHpsaWIuWl9ERUZBVUxUX1dJTkRPV0JJVFNcbiAgICAgICAgICA6IHRoaXMucGFyYW1zW2tleV07XG5cbiAgICAgIHRoaXMuX2luZmxhdGUgPSB6bGliLmNyZWF0ZUluZmxhdGVSYXcoe1xuICAgICAgICAuLi50aGlzLl9vcHRpb25zLnpsaWJJbmZsYXRlT3B0aW9ucyxcbiAgICAgICAgd2luZG93Qml0c1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9pbmZsYXRlW2tQZXJNZXNzYWdlRGVmbGF0ZV0gPSB0aGlzO1xuICAgICAgdGhpcy5faW5mbGF0ZVtrVG90YWxMZW5ndGhdID0gMDtcbiAgICAgIHRoaXMuX2luZmxhdGVba0J1ZmZlcnNdID0gW107XG4gICAgICB0aGlzLl9pbmZsYXRlLm9uKCdlcnJvcicsIGluZmxhdGVPbkVycm9yKTtcbiAgICAgIHRoaXMuX2luZmxhdGUub24oJ2RhdGEnLCBpbmZsYXRlT25EYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLl9pbmZsYXRlW2tDYWxsYmFja10gPSBjYWxsYmFjaztcblxuICAgIHRoaXMuX2luZmxhdGUud3JpdGUoZGF0YSk7XG4gICAgaWYgKGZpbikgdGhpcy5faW5mbGF0ZS53cml0ZShUUkFJTEVSKTtcblxuICAgIHRoaXMuX2luZmxhdGUuZmx1c2goKCkgPT4ge1xuICAgICAgY29uc3QgZXJyID0gdGhpcy5faW5mbGF0ZVtrRXJyb3JdO1xuXG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHRoaXMuX2luZmxhdGUuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5faW5mbGF0ZSA9IG51bGw7XG4gICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YSA9IGJ1ZmZlclV0aWwuY29uY2F0KFxuICAgICAgICB0aGlzLl9pbmZsYXRlW2tCdWZmZXJzXSxcbiAgICAgICAgdGhpcy5faW5mbGF0ZVtrVG90YWxMZW5ndGhdXG4gICAgICApO1xuXG4gICAgICBpZiAodGhpcy5faW5mbGF0ZS5fcmVhZGFibGVTdGF0ZS5lbmRFbWl0dGVkKSB7XG4gICAgICAgIHRoaXMuX2luZmxhdGUuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5faW5mbGF0ZSA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9pbmZsYXRlW2tUb3RhbExlbmd0aF0gPSAwO1xuICAgICAgICB0aGlzLl9pbmZsYXRlW2tCdWZmZXJzXSA9IFtdO1xuXG4gICAgICAgIGlmIChmaW4gJiYgdGhpcy5wYXJhbXNbYCR7ZW5kcG9pbnR9X25vX2NvbnRleHRfdGFrZW92ZXJgXSkge1xuICAgICAgICAgIHRoaXMuX2luZmxhdGUucmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjYWxsYmFjayhudWxsLCBkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wcmVzcyBkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0ge0J1ZmZlcn0gZGF0YSBEYXRhIHRvIGNvbXByZXNzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gZmluIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGlzIHRoZSBsYXN0IGZyYWdtZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY29tcHJlc3MoZGF0YSwgZmluLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5faXNTZXJ2ZXIgPyAnc2VydmVyJyA6ICdjbGllbnQnO1xuXG4gICAgaWYgKCF0aGlzLl9kZWZsYXRlKSB7XG4gICAgICBjb25zdCBrZXkgPSBgJHtlbmRwb2ludH1fbWF4X3dpbmRvd19iaXRzYDtcbiAgICAgIGNvbnN0IHdpbmRvd0JpdHMgPVxuICAgICAgICB0eXBlb2YgdGhpcy5wYXJhbXNba2V5XSAhPT0gJ251bWJlcidcbiAgICAgICAgICA/IHpsaWIuWl9ERUZBVUxUX1dJTkRPV0JJVFNcbiAgICAgICAgICA6IHRoaXMucGFyYW1zW2tleV07XG5cbiAgICAgIHRoaXMuX2RlZmxhdGUgPSB6bGliLmNyZWF0ZURlZmxhdGVSYXcoe1xuICAgICAgICAuLi50aGlzLl9vcHRpb25zLnpsaWJEZWZsYXRlT3B0aW9ucyxcbiAgICAgICAgd2luZG93Qml0c1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2RlZmxhdGVba1RvdGFsTGVuZ3RoXSA9IDA7XG4gICAgICB0aGlzLl9kZWZsYXRlW2tCdWZmZXJzXSA9IFtdO1xuXG4gICAgICAvL1xuICAgICAgLy8gQW4gYCdlcnJvcidgIGV2ZW50IGlzIGVtaXR0ZWQsIG9ubHkgb24gTm9kZS5qcyA8IDEwLjAuMCwgaWYgdGhlXG4gICAgICAvLyBgemxpYi5EZWZsYXRlUmF3YCBpbnN0YW5jZSBpcyBjbG9zZWQgd2hpbGUgZGF0YSBpcyBiZWluZyBwcm9jZXNzZWQuXG4gICAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaWYgYFBlck1lc3NhZ2VEZWZsYXRlI2NsZWFudXAoKWAgaXMgY2FsbGVkIGF0IHRoZSB3cm9uZ1xuICAgICAgLy8gdGltZSBkdWUgdG8gYW4gYWJub3JtYWwgV2ViU29ja2V0IGNsb3N1cmUuXG4gICAgICAvL1xuICAgICAgdGhpcy5fZGVmbGF0ZS5vbignZXJyb3InLCBOT09QKTtcbiAgICAgIHRoaXMuX2RlZmxhdGUub24oJ2RhdGEnLCBkZWZsYXRlT25EYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLl9kZWZsYXRlW2tDYWxsYmFja10gPSBjYWxsYmFjaztcblxuICAgIHRoaXMuX2RlZmxhdGUud3JpdGUoZGF0YSk7XG4gICAgdGhpcy5fZGVmbGF0ZS5mbHVzaCh6bGliLlpfU1lOQ19GTFVTSCwgKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9kZWZsYXRlKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoZSBkZWZsYXRlIHN0cmVhbSB3YXMgY2xvc2VkIHdoaWxlIGRhdGEgd2FzIGJlaW5nIHByb2Nlc3NlZC5cbiAgICAgICAgLy9cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgZGF0YSA9IGJ1ZmZlclV0aWwuY29uY2F0KFxuICAgICAgICB0aGlzLl9kZWZsYXRlW2tCdWZmZXJzXSxcbiAgICAgICAgdGhpcy5fZGVmbGF0ZVtrVG90YWxMZW5ndGhdXG4gICAgICApO1xuXG4gICAgICBpZiAoZmluKSBkYXRhID0gZGF0YS5zbGljZSgwLCBkYXRhLmxlbmd0aCAtIDQpO1xuXG4gICAgICAvL1xuICAgICAgLy8gRW5zdXJlIHRoYXQgdGhlIGNhbGxiYWNrIHdpbGwgbm90IGJlIGNhbGxlZCBhZ2FpbiBpblxuICAgICAgLy8gYFBlck1lc3NhZ2VEZWZsYXRlI2NsZWFudXAoKWAuXG4gICAgICAvL1xuICAgICAgdGhpcy5fZGVmbGF0ZVtrQ2FsbGJhY2tdID0gbnVsbDtcblxuICAgICAgdGhpcy5fZGVmbGF0ZVtrVG90YWxMZW5ndGhdID0gMDtcbiAgICAgIHRoaXMuX2RlZmxhdGVba0J1ZmZlcnNdID0gW107XG5cbiAgICAgIGlmIChmaW4gJiYgdGhpcy5wYXJhbXNbYCR7ZW5kcG9pbnR9X25vX2NvbnRleHRfdGFrZW92ZXJgXSkge1xuICAgICAgICB0aGlzLl9kZWZsYXRlLnJlc2V0KCk7XG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrKG51bGwsIGRhdGEpO1xuICAgIH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGVyTWVzc2FnZURlZmxhdGU7XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgemxpYi5EZWZsYXRlUmF3YCBzdHJlYW0gYCdkYXRhJ2AgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IGNodW5rIEEgY2h1bmsgb2YgZGF0YVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZGVmbGF0ZU9uRGF0YShjaHVuaykge1xuICB0aGlzW2tCdWZmZXJzXS5wdXNoKGNodW5rKTtcbiAgdGhpc1trVG90YWxMZW5ndGhdICs9IGNodW5rLmxlbmd0aDtcbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGB6bGliLkluZmxhdGVSYXdgIHN0cmVhbSBgJ2RhdGEnYCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gY2h1bmsgQSBjaHVuayBvZiBkYXRhXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpbmZsYXRlT25EYXRhKGNodW5rKSB7XG4gIHRoaXNba1RvdGFsTGVuZ3RoXSArPSBjaHVuay5sZW5ndGg7XG5cbiAgaWYgKFxuICAgIHRoaXNba1Blck1lc3NhZ2VEZWZsYXRlXS5fbWF4UGF5bG9hZCA8IDEgfHxcbiAgICB0aGlzW2tUb3RhbExlbmd0aF0gPD0gdGhpc1trUGVyTWVzc2FnZURlZmxhdGVdLl9tYXhQYXlsb2FkXG4gICkge1xuICAgIHRoaXNba0J1ZmZlcnNdLnB1c2goY2h1bmspO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXNba0Vycm9yXSA9IG5ldyBSYW5nZUVycm9yKCdNYXggcGF5bG9hZCBzaXplIGV4Y2VlZGVkJyk7XG4gIHRoaXNba0Vycm9yXVtrU3RhdHVzQ29kZV0gPSAxMDA5O1xuICB0aGlzLnJlbW92ZUxpc3RlbmVyKCdkYXRhJywgaW5mbGF0ZU9uRGF0YSk7XG4gIHRoaXMucmVzZXQoKTtcbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGB6bGliLkluZmxhdGVSYXdgIHN0cmVhbSBgJ2Vycm9yJ2AgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyIFRoZSBlbWl0dGVkIGVycm9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpbmZsYXRlT25FcnJvcihlcnIpIHtcbiAgLy9cbiAgLy8gVGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGBabGliI2Nsb3NlKClgIGFzIHRoZSBoYW5kbGUgaXMgYXV0b21hdGljYWxseVxuICAvLyBjbG9zZWQgd2hlbiBhbiBlcnJvciBpcyBlbWl0dGVkLlxuICAvL1xuICB0aGlzW2tQZXJNZXNzYWdlRGVmbGF0ZV0uX2luZmxhdGUgPSBudWxsO1xuICBlcnJba1N0YXR1c0NvZGVdID0gMTAwNztcbiAgdGhpc1trQ2FsbGJhY2tdKGVycik7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsgV3JpdGFibGUgfSA9IHJlcXVpcmUoJ3N0cmVhbScpO1xuXG5jb25zdCBQZXJNZXNzYWdlRGVmbGF0ZSA9IHJlcXVpcmUoJy4vcGVybWVzc2FnZS1kZWZsYXRlJyk7XG5jb25zdCB7XG4gIEJJTkFSWV9UWVBFUyxcbiAgRU1QVFlfQlVGRkVSLFxuICBrU3RhdHVzQ29kZSxcbiAga1dlYlNvY2tldFxufSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5jb25zdCB7IGNvbmNhdCwgdG9BcnJheUJ1ZmZlciwgdW5tYXNrIH0gPSByZXF1aXJlKCcuL2J1ZmZlci11dGlsJyk7XG5jb25zdCB7IGlzVmFsaWRTdGF0dXNDb2RlLCBpc1ZhbGlkVVRGOCB9ID0gcmVxdWlyZSgnLi92YWxpZGF0aW9uJyk7XG5cbmNvbnN0IEdFVF9JTkZPID0gMDtcbmNvbnN0IEdFVF9QQVlMT0FEX0xFTkdUSF8xNiA9IDE7XG5jb25zdCBHRVRfUEFZTE9BRF9MRU5HVEhfNjQgPSAyO1xuY29uc3QgR0VUX01BU0sgPSAzO1xuY29uc3QgR0VUX0RBVEEgPSA0O1xuY29uc3QgSU5GTEFUSU5HID0gNTtcblxuLyoqXG4gKiBIeUJpIFJlY2VpdmVyIGltcGxlbWVudGF0aW9uLlxuICpcbiAqIEBleHRlbmRzIHN0cmVhbS5Xcml0YWJsZVxuICovXG5jbGFzcyBSZWNlaXZlciBleHRlbmRzIFdyaXRhYmxlIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBSZWNlaXZlciBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtiaW5hcnlUeXBlPW5vZGVidWZmZXJdIFRoZSB0eXBlIGZvciBiaW5hcnkgZGF0YVxuICAgKiBAcGFyYW0ge09iamVjdH0gW2V4dGVuc2lvbnNdIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBuZWdvdGlhdGVkIGV4dGVuc2lvbnNcbiAgICogQHBhcmFtIHtCb29sZWFufSBbaXNTZXJ2ZXI9ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIHRvIG9wZXJhdGUgaW4gY2xpZW50IG9yXG4gICAqICAgICBzZXJ2ZXIgbW9kZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW21heFBheWxvYWQ9MF0gVGhlIG1heGltdW0gYWxsb3dlZCBtZXNzYWdlIGxlbmd0aFxuICAgKi9cbiAgY29uc3RydWN0b3IoYmluYXJ5VHlwZSwgZXh0ZW5zaW9ucywgaXNTZXJ2ZXIsIG1heFBheWxvYWQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fYmluYXJ5VHlwZSA9IGJpbmFyeVR5cGUgfHwgQklOQVJZX1RZUEVTWzBdO1xuICAgIHRoaXNba1dlYlNvY2tldF0gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZXh0ZW5zaW9ucyA9IGV4dGVuc2lvbnMgfHwge307XG4gICAgdGhpcy5faXNTZXJ2ZXIgPSAhIWlzU2VydmVyO1xuICAgIHRoaXMuX21heFBheWxvYWQgPSBtYXhQYXlsb2FkIHwgMDtcblxuICAgIHRoaXMuX2J1ZmZlcmVkQnl0ZXMgPSAwO1xuICAgIHRoaXMuX2J1ZmZlcnMgPSBbXTtcblxuICAgIHRoaXMuX2NvbXByZXNzZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9wYXlsb2FkTGVuZ3RoID0gMDtcbiAgICB0aGlzLl9tYXNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2ZyYWdtZW50ZWQgPSAwO1xuICAgIHRoaXMuX21hc2tlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2ZpbiA9IGZhbHNlO1xuICAgIHRoaXMuX29wY29kZSA9IDA7XG5cbiAgICB0aGlzLl90b3RhbFBheWxvYWRMZW5ndGggPSAwO1xuICAgIHRoaXMuX21lc3NhZ2VMZW5ndGggPSAwO1xuICAgIHRoaXMuX2ZyYWdtZW50cyA9IFtdO1xuXG4gICAgdGhpcy5fc3RhdGUgPSBHRVRfSU5GTztcbiAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50cyBgV3JpdGFibGUucHJvdG90eXBlLl93cml0ZSgpYC5cbiAgICpcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGNodW5rIFRoZSBjaHVuayBvZiBkYXRhIHRvIHdyaXRlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBlbmNvZGluZyBUaGUgY2hhcmFjdGVyIGVuY29kaW5nIG9mIGBjaHVua2BcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgQ2FsbGJhY2tcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF93cml0ZShjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gICAgaWYgKHRoaXMuX29wY29kZSA9PT0gMHgwOCAmJiB0aGlzLl9zdGF0ZSA9PSBHRVRfSU5GTykgcmV0dXJuIGNiKCk7XG5cbiAgICB0aGlzLl9idWZmZXJlZEJ5dGVzICs9IGNodW5rLmxlbmd0aDtcbiAgICB0aGlzLl9idWZmZXJzLnB1c2goY2h1bmspO1xuICAgIHRoaXMuc3RhcnRMb29wKGNiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25zdW1lcyBgbmAgYnl0ZXMgZnJvbSB0aGUgYnVmZmVyZWQgZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG4gVGhlIG51bWJlciBvZiBieXRlcyB0byBjb25zdW1lXG4gICAqIEByZXR1cm4ge0J1ZmZlcn0gVGhlIGNvbnN1bWVkIGJ5dGVzXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjb25zdW1lKG4pIHtcbiAgICB0aGlzLl9idWZmZXJlZEJ5dGVzIC09IG47XG5cbiAgICBpZiAobiA9PT0gdGhpcy5fYnVmZmVyc1swXS5sZW5ndGgpIHJldHVybiB0aGlzLl9idWZmZXJzLnNoaWZ0KCk7XG5cbiAgICBpZiAobiA8IHRoaXMuX2J1ZmZlcnNbMF0ubGVuZ3RoKSB7XG4gICAgICBjb25zdCBidWYgPSB0aGlzLl9idWZmZXJzWzBdO1xuICAgICAgdGhpcy5fYnVmZmVyc1swXSA9IGJ1Zi5zbGljZShuKTtcbiAgICAgIHJldHVybiBidWYuc2xpY2UoMCwgbik7XG4gICAgfVxuXG4gICAgY29uc3QgZHN0ID0gQnVmZmVyLmFsbG9jVW5zYWZlKG4pO1xuXG4gICAgZG8ge1xuICAgICAgY29uc3QgYnVmID0gdGhpcy5fYnVmZmVyc1swXTtcbiAgICAgIGNvbnN0IG9mZnNldCA9IGRzdC5sZW5ndGggLSBuO1xuXG4gICAgICBpZiAobiA+PSBidWYubGVuZ3RoKSB7XG4gICAgICAgIGRzdC5zZXQodGhpcy5fYnVmZmVycy5zaGlmdCgpLCBvZmZzZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZHN0LnNldChuZXcgVWludDhBcnJheShidWYuYnVmZmVyLCBidWYuYnl0ZU9mZnNldCwgbiksIG9mZnNldCk7XG4gICAgICAgIHRoaXMuX2J1ZmZlcnNbMF0gPSBidWYuc2xpY2Uobik7XG4gICAgICB9XG5cbiAgICAgIG4gLT0gYnVmLmxlbmd0aDtcbiAgICB9IHdoaWxlIChuID4gMCk7XG5cbiAgICByZXR1cm4gZHN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyB0aGUgcGFyc2luZyBsb29wLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3RhcnRMb29wKGNiKSB7XG4gICAgbGV0IGVycjtcbiAgICB0aGlzLl9sb29wID0gdHJ1ZTtcblxuICAgIGRvIHtcbiAgICAgIHN3aXRjaCAodGhpcy5fc3RhdGUpIHtcbiAgICAgICAgY2FzZSBHRVRfSU5GTzpcbiAgICAgICAgICBlcnIgPSB0aGlzLmdldEluZm8oKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBHRVRfUEFZTE9BRF9MRU5HVEhfMTY6XG4gICAgICAgICAgZXJyID0gdGhpcy5nZXRQYXlsb2FkTGVuZ3RoMTYoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBHRVRfUEFZTE9BRF9MRU5HVEhfNjQ6XG4gICAgICAgICAgZXJyID0gdGhpcy5nZXRQYXlsb2FkTGVuZ3RoNjQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBHRVRfTUFTSzpcbiAgICAgICAgICB0aGlzLmdldE1hc2soKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBHRVRfREFUQTpcbiAgICAgICAgICBlcnIgPSB0aGlzLmdldERhdGEoY2IpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIC8vIGBJTkZMQVRJTkdgXG4gICAgICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IHdoaWxlICh0aGlzLl9sb29wKTtcblxuICAgIGNiKGVycik7XG4gIH1cblxuICAvKipcbiAgICogUmVhZHMgdGhlIGZpcnN0IHR3byBieXRlcyBvZiBhIGZyYW1lLlxuICAgKlxuICAgKiBAcmV0dXJuIHsoUmFuZ2VFcnJvcnx1bmRlZmluZWQpfSBBIHBvc3NpYmxlIGVycm9yXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRJbmZvKCkge1xuICAgIGlmICh0aGlzLl9idWZmZXJlZEJ5dGVzIDwgMikge1xuICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1ZiA9IHRoaXMuY29uc3VtZSgyKTtcblxuICAgIGlmICgoYnVmWzBdICYgMHgzMCkgIT09IDB4MDApIHtcbiAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgIHJldHVybiBlcnJvcihSYW5nZUVycm9yLCAnUlNWMiBhbmQgUlNWMyBtdXN0IGJlIGNsZWFyJywgdHJ1ZSwgMTAwMik7XG4gICAgfVxuXG4gICAgY29uc3QgY29tcHJlc3NlZCA9IChidWZbMF0gJiAweDQwKSA9PT0gMHg0MDtcblxuICAgIGlmIChjb21wcmVzc2VkICYmICF0aGlzLl9leHRlbnNpb25zW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdKSB7XG4gICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICByZXR1cm4gZXJyb3IoUmFuZ2VFcnJvciwgJ1JTVjEgbXVzdCBiZSBjbGVhcicsIHRydWUsIDEwMDIpO1xuICAgIH1cblxuICAgIHRoaXMuX2ZpbiA9IChidWZbMF0gJiAweDgwKSA9PT0gMHg4MDtcbiAgICB0aGlzLl9vcGNvZGUgPSBidWZbMF0gJiAweDBmO1xuICAgIHRoaXMuX3BheWxvYWRMZW5ndGggPSBidWZbMV0gJiAweDdmO1xuXG4gICAgaWYgKHRoaXMuX29wY29kZSA9PT0gMHgwMCkge1xuICAgICAgaWYgKGNvbXByZXNzZWQpIHtcbiAgICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZXJyb3IoUmFuZ2VFcnJvciwgJ1JTVjEgbXVzdCBiZSBjbGVhcicsIHRydWUsIDEwMDIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuX2ZyYWdtZW50ZWQpIHtcbiAgICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZXJyb3IoUmFuZ2VFcnJvciwgJ2ludmFsaWQgb3Bjb2RlIDAnLCB0cnVlLCAxMDAyKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fb3Bjb2RlID0gdGhpcy5fZnJhZ21lbnRlZDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX29wY29kZSA9PT0gMHgwMSB8fCB0aGlzLl9vcGNvZGUgPT09IDB4MDIpIHtcbiAgICAgIGlmICh0aGlzLl9mcmFnbWVudGVkKSB7XG4gICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGVycm9yKFJhbmdlRXJyb3IsIGBpbnZhbGlkIG9wY29kZSAke3RoaXMuX29wY29kZX1gLCB0cnVlLCAxMDAyKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fY29tcHJlc3NlZCA9IGNvbXByZXNzZWQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9vcGNvZGUgPiAweDA3ICYmIHRoaXMuX29wY29kZSA8IDB4MGIpIHtcbiAgICAgIGlmICghdGhpcy5fZmluKSB7XG4gICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGVycm9yKFJhbmdlRXJyb3IsICdGSU4gbXVzdCBiZSBzZXQnLCB0cnVlLCAxMDAyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXByZXNzZWQpIHtcbiAgICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZXJyb3IoUmFuZ2VFcnJvciwgJ1JTVjEgbXVzdCBiZSBjbGVhcicsIHRydWUsIDEwMDIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fcGF5bG9hZExlbmd0aCA+IDB4N2QpIHtcbiAgICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZXJyb3IoXG4gICAgICAgICAgUmFuZ2VFcnJvcixcbiAgICAgICAgICBgaW52YWxpZCBwYXlsb2FkIGxlbmd0aCAke3RoaXMuX3BheWxvYWRMZW5ndGh9YCxcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIDEwMDJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGVycm9yKFJhbmdlRXJyb3IsIGBpbnZhbGlkIG9wY29kZSAke3RoaXMuX29wY29kZX1gLCB0cnVlLCAxMDAyKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2ZpbiAmJiAhdGhpcy5fZnJhZ21lbnRlZCkgdGhpcy5fZnJhZ21lbnRlZCA9IHRoaXMuX29wY29kZTtcbiAgICB0aGlzLl9tYXNrZWQgPSAoYnVmWzFdICYgMHg4MCkgPT09IDB4ODA7XG5cbiAgICBpZiAodGhpcy5faXNTZXJ2ZXIpIHtcbiAgICAgIGlmICghdGhpcy5fbWFza2VkKSB7XG4gICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGVycm9yKFJhbmdlRXJyb3IsICdNQVNLIG11c3QgYmUgc2V0JywgdHJ1ZSwgMTAwMik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLl9tYXNrZWQpIHtcbiAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgIHJldHVybiBlcnJvcihSYW5nZUVycm9yLCAnTUFTSyBtdXN0IGJlIGNsZWFyJywgdHJ1ZSwgMTAwMik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3BheWxvYWRMZW5ndGggPT09IDEyNikgdGhpcy5fc3RhdGUgPSBHRVRfUEFZTE9BRF9MRU5HVEhfMTY7XG4gICAgZWxzZSBpZiAodGhpcy5fcGF5bG9hZExlbmd0aCA9PT0gMTI3KSB0aGlzLl9zdGF0ZSA9IEdFVF9QQVlMT0FEX0xFTkdUSF82NDtcbiAgICBlbHNlIHJldHVybiB0aGlzLmhhdmVMZW5ndGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGV4dGVuZGVkIHBheWxvYWQgbGVuZ3RoICg3KzE2KS5cbiAgICpcbiAgICogQHJldHVybiB7KFJhbmdlRXJyb3J8dW5kZWZpbmVkKX0gQSBwb3NzaWJsZSBlcnJvclxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0UGF5bG9hZExlbmd0aDE2KCkge1xuICAgIGlmICh0aGlzLl9idWZmZXJlZEJ5dGVzIDwgMikge1xuICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3BheWxvYWRMZW5ndGggPSB0aGlzLmNvbnN1bWUoMikucmVhZFVJbnQxNkJFKDApO1xuICAgIHJldHVybiB0aGlzLmhhdmVMZW5ndGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGV4dGVuZGVkIHBheWxvYWQgbGVuZ3RoICg3KzY0KS5cbiAgICpcbiAgICogQHJldHVybiB7KFJhbmdlRXJyb3J8dW5kZWZpbmVkKX0gQSBwb3NzaWJsZSBlcnJvclxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0UGF5bG9hZExlbmd0aDY0KCkge1xuICAgIGlmICh0aGlzLl9idWZmZXJlZEJ5dGVzIDwgOCkge1xuICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1ZiA9IHRoaXMuY29uc3VtZSg4KTtcbiAgICBjb25zdCBudW0gPSBidWYucmVhZFVJbnQzMkJFKDApO1xuXG4gICAgLy9cbiAgICAvLyBUaGUgbWF4aW11bSBzYWZlIGludGVnZXIgaW4gSmF2YVNjcmlwdCBpcyAyXjUzIC0gMS4gQW4gZXJyb3IgaXMgcmV0dXJuZWRcbiAgICAvLyBpZiBwYXlsb2FkIGxlbmd0aCBpcyBncmVhdGVyIHRoYW4gdGhpcyBudW1iZXIuXG4gICAgLy9cbiAgICBpZiAobnVtID4gTWF0aC5wb3coMiwgNTMgLSAzMikgLSAxKSB7XG4gICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICByZXR1cm4gZXJyb3IoXG4gICAgICAgIFJhbmdlRXJyb3IsXG4gICAgICAgICdVbnN1cHBvcnRlZCBXZWJTb2NrZXQgZnJhbWU6IHBheWxvYWQgbGVuZ3RoID4gMl41MyAtIDEnLFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgMTAwOVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLl9wYXlsb2FkTGVuZ3RoID0gbnVtICogTWF0aC5wb3coMiwgMzIpICsgYnVmLnJlYWRVSW50MzJCRSg0KTtcbiAgICByZXR1cm4gdGhpcy5oYXZlTGVuZ3RoKCk7XG4gIH1cblxuICAvKipcbiAgICogUGF5bG9hZCBsZW5ndGggaGFzIGJlZW4gcmVhZC5cbiAgICpcbiAgICogQHJldHVybiB7KFJhbmdlRXJyb3J8dW5kZWZpbmVkKX0gQSBwb3NzaWJsZSBlcnJvclxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGF2ZUxlbmd0aCgpIHtcbiAgICBpZiAodGhpcy5fcGF5bG9hZExlbmd0aCAmJiB0aGlzLl9vcGNvZGUgPCAweDA4KSB7XG4gICAgICB0aGlzLl90b3RhbFBheWxvYWRMZW5ndGggKz0gdGhpcy5fcGF5bG9hZExlbmd0aDtcbiAgICAgIGlmICh0aGlzLl90b3RhbFBheWxvYWRMZW5ndGggPiB0aGlzLl9tYXhQYXlsb2FkICYmIHRoaXMuX21heFBheWxvYWQgPiAwKSB7XG4gICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGVycm9yKFJhbmdlRXJyb3IsICdNYXggcGF5bG9hZCBzaXplIGV4Y2VlZGVkJywgZmFsc2UsIDEwMDkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9tYXNrZWQpIHRoaXMuX3N0YXRlID0gR0VUX01BU0s7XG4gICAgZWxzZSB0aGlzLl9zdGF0ZSA9IEdFVF9EQVRBO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlYWRzIG1hc2sgYnl0ZXMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRNYXNrKCkge1xuICAgIGlmICh0aGlzLl9idWZmZXJlZEJ5dGVzIDwgNCkge1xuICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX21hc2sgPSB0aGlzLmNvbnN1bWUoNCk7XG4gICAgdGhpcy5fc3RhdGUgPSBHRVRfREFUQTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyBkYXRhIGJ5dGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICAgKiBAcmV0dXJuIHsoRXJyb3J8UmFuZ2VFcnJvcnx1bmRlZmluZWQpfSBBIHBvc3NpYmxlIGVycm9yXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXREYXRhKGNiKSB7XG4gICAgbGV0IGRhdGEgPSBFTVBUWV9CVUZGRVI7XG5cbiAgICBpZiAodGhpcy5fcGF5bG9hZExlbmd0aCkge1xuICAgICAgaWYgKHRoaXMuX2J1ZmZlcmVkQnl0ZXMgPCB0aGlzLl9wYXlsb2FkTGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBkYXRhID0gdGhpcy5jb25zdW1lKHRoaXMuX3BheWxvYWRMZW5ndGgpO1xuICAgICAgaWYgKHRoaXMuX21hc2tlZCkgdW5tYXNrKGRhdGEsIHRoaXMuX21hc2spO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9vcGNvZGUgPiAweDA3KSByZXR1cm4gdGhpcy5jb250cm9sTWVzc2FnZShkYXRhKTtcblxuICAgIGlmICh0aGlzLl9jb21wcmVzc2VkKSB7XG4gICAgICB0aGlzLl9zdGF0ZSA9IElORkxBVElORztcbiAgICAgIHRoaXMuZGVjb21wcmVzcyhkYXRhLCBjYik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGRhdGEubGVuZ3RoKSB7XG4gICAgICAvL1xuICAgICAgLy8gVGhpcyBtZXNzYWdlIGlzIG5vdCBjb21wcmVzc2VkIHNvIGl0cyBsZW5naHQgaXMgdGhlIHN1bSBvZiB0aGUgcGF5bG9hZFxuICAgICAgLy8gbGVuZ3RoIG9mIGFsbCBmcmFnbWVudHMuXG4gICAgICAvL1xuICAgICAgdGhpcy5fbWVzc2FnZUxlbmd0aCA9IHRoaXMuX3RvdGFsUGF5bG9hZExlbmd0aDtcbiAgICAgIHRoaXMuX2ZyYWdtZW50cy5wdXNoKGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmRhdGFNZXNzYWdlKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVjb21wcmVzc2VzIGRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7QnVmZmVyfSBkYXRhIENvbXByZXNzZWQgZGF0YVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZGVjb21wcmVzcyhkYXRhLCBjYikge1xuICAgIGNvbnN0IHBlck1lc3NhZ2VEZWZsYXRlID0gdGhpcy5fZXh0ZW5zaW9uc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXTtcblxuICAgIHBlck1lc3NhZ2VEZWZsYXRlLmRlY29tcHJlc3MoZGF0YSwgdGhpcy5fZmluLCAoZXJyLCBidWYpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpO1xuXG4gICAgICBpZiAoYnVmLmxlbmd0aCkge1xuICAgICAgICB0aGlzLl9tZXNzYWdlTGVuZ3RoICs9IGJ1Zi5sZW5ndGg7XG4gICAgICAgIGlmICh0aGlzLl9tZXNzYWdlTGVuZ3RoID4gdGhpcy5fbWF4UGF5bG9hZCAmJiB0aGlzLl9tYXhQYXlsb2FkID4gMCkge1xuICAgICAgICAgIHJldHVybiBjYihcbiAgICAgICAgICAgIGVycm9yKFJhbmdlRXJyb3IsICdNYXggcGF5bG9hZCBzaXplIGV4Y2VlZGVkJywgZmFsc2UsIDEwMDkpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2ZyYWdtZW50cy5wdXNoKGJ1Zik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGVyID0gdGhpcy5kYXRhTWVzc2FnZSgpO1xuICAgICAgaWYgKGVyKSByZXR1cm4gY2IoZXIpO1xuXG4gICAgICB0aGlzLnN0YXJ0TG9vcChjYik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhIGRhdGEgbWVzc2FnZS5cbiAgICpcbiAgICogQHJldHVybiB7KEVycm9yfHVuZGVmaW5lZCl9IEEgcG9zc2libGUgZXJyb3JcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRhdGFNZXNzYWdlKCkge1xuICAgIGlmICh0aGlzLl9maW4pIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2VMZW5ndGggPSB0aGlzLl9tZXNzYWdlTGVuZ3RoO1xuICAgICAgY29uc3QgZnJhZ21lbnRzID0gdGhpcy5fZnJhZ21lbnRzO1xuXG4gICAgICB0aGlzLl90b3RhbFBheWxvYWRMZW5ndGggPSAwO1xuICAgICAgdGhpcy5fbWVzc2FnZUxlbmd0aCA9IDA7XG4gICAgICB0aGlzLl9mcmFnbWVudGVkID0gMDtcbiAgICAgIHRoaXMuX2ZyYWdtZW50cyA9IFtdO1xuXG4gICAgICBpZiAodGhpcy5fb3Bjb2RlID09PSAyKSB7XG4gICAgICAgIGxldCBkYXRhO1xuXG4gICAgICAgIGlmICh0aGlzLl9iaW5hcnlUeXBlID09PSAnbm9kZWJ1ZmZlcicpIHtcbiAgICAgICAgICBkYXRhID0gY29uY2F0KGZyYWdtZW50cywgbWVzc2FnZUxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYmluYXJ5VHlwZSA9PT0gJ2FycmF5YnVmZmVyJykge1xuICAgICAgICAgIGRhdGEgPSB0b0FycmF5QnVmZmVyKGNvbmNhdChmcmFnbWVudHMsIG1lc3NhZ2VMZW5ndGgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkYXRhID0gZnJhZ21lbnRzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0KCdtZXNzYWdlJywgZGF0YSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBidWYgPSBjb25jYXQoZnJhZ21lbnRzLCBtZXNzYWdlTGVuZ3RoKTtcblxuICAgICAgICBpZiAoIWlzVmFsaWRVVEY4KGJ1ZikpIHtcbiAgICAgICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIGVycm9yKEVycm9yLCAnaW52YWxpZCBVVEYtOCBzZXF1ZW5jZScsIHRydWUsIDEwMDcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0KCdtZXNzYWdlJywgYnVmLnRvU3RyaW5nKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX3N0YXRlID0gR0VUX0lORk87XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhIGNvbnRyb2wgbWVzc2FnZS5cbiAgICpcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGRhdGEgRGF0YSB0byBoYW5kbGVcbiAgICogQHJldHVybiB7KEVycm9yfFJhbmdlRXJyb3J8dW5kZWZpbmVkKX0gQSBwb3NzaWJsZSBlcnJvclxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY29udHJvbE1lc3NhZ2UoZGF0YSkge1xuICAgIGlmICh0aGlzLl9vcGNvZGUgPT09IDB4MDgpIHtcbiAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcblxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnY29uY2x1ZGUnLCAxMDA1LCAnJyk7XG4gICAgICAgIHRoaXMuZW5kKCk7XG4gICAgICB9IGVsc2UgaWYgKGRhdGEubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBlcnJvcihSYW5nZUVycm9yLCAnaW52YWxpZCBwYXlsb2FkIGxlbmd0aCAxJywgdHJ1ZSwgMTAwMik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjb2RlID0gZGF0YS5yZWFkVUludDE2QkUoMCk7XG5cbiAgICAgICAgaWYgKCFpc1ZhbGlkU3RhdHVzQ29kZShjb2RlKSkge1xuICAgICAgICAgIHJldHVybiBlcnJvcihSYW5nZUVycm9yLCBgaW52YWxpZCBzdGF0dXMgY29kZSAke2NvZGV9YCwgdHJ1ZSwgMTAwMik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBidWYgPSBkYXRhLnNsaWNlKDIpO1xuXG4gICAgICAgIGlmICghaXNWYWxpZFVURjgoYnVmKSkge1xuICAgICAgICAgIHJldHVybiBlcnJvcihFcnJvciwgJ2ludmFsaWQgVVRGLTggc2VxdWVuY2UnLCB0cnVlLCAxMDA3KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW1pdCgnY29uY2x1ZGUnLCBjb2RlLCBidWYudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMuZW5kKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLl9vcGNvZGUgPT09IDB4MDkpIHtcbiAgICAgIHRoaXMuZW1pdCgncGluZycsIGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoJ3BvbmcnLCBkYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zdGF0ZSA9IEdFVF9JTkZPO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVjZWl2ZXI7XG5cbi8qKlxuICogQnVpbGRzIGFuIGVycm9yIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0geyhFcnJvcnxSYW5nZUVycm9yKX0gRXJyb3JDdG9yIFRoZSBlcnJvciBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2VcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gcHJlZml4IFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBhZGQgYSBkZWZhdWx0IHByZWZpeCB0b1xuICogICAgIGBtZXNzYWdlYFxuICogQHBhcmFtIHtOdW1iZXJ9IHN0YXR1c0NvZGUgVGhlIHN0YXR1cyBjb2RlXG4gKiBAcmV0dXJuIHsoRXJyb3J8UmFuZ2VFcnJvcil9IFRoZSBlcnJvclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZXJyb3IoRXJyb3JDdG9yLCBtZXNzYWdlLCBwcmVmaXgsIHN0YXR1c0NvZGUpIHtcbiAgY29uc3QgZXJyID0gbmV3IEVycm9yQ3RvcihcbiAgICBwcmVmaXggPyBgSW52YWxpZCBXZWJTb2NrZXQgZnJhbWU6ICR7bWVzc2FnZX1gIDogbWVzc2FnZVxuICApO1xuXG4gIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGVyciwgZXJyb3IpO1xuICBlcnJba1N0YXR1c0NvZGVdID0gc3RhdHVzQ29kZTtcbiAgcmV0dXJuIGVycjtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgeyByYW5kb21GaWxsU3luYyB9ID0gcmVxdWlyZSgnY3J5cHRvJyk7XG5cbmNvbnN0IFBlck1lc3NhZ2VEZWZsYXRlID0gcmVxdWlyZSgnLi9wZXJtZXNzYWdlLWRlZmxhdGUnKTtcbmNvbnN0IHsgRU1QVFlfQlVGRkVSIH0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuY29uc3QgeyBpc1ZhbGlkU3RhdHVzQ29kZSB9ID0gcmVxdWlyZSgnLi92YWxpZGF0aW9uJyk7XG5jb25zdCB7IG1hc2s6IGFwcGx5TWFzaywgdG9CdWZmZXIgfSA9IHJlcXVpcmUoJy4vYnVmZmVyLXV0aWwnKTtcblxuY29uc3QgbWFzayA9IEJ1ZmZlci5hbGxvYyg0KTtcblxuLyoqXG4gKiBIeUJpIFNlbmRlciBpbXBsZW1lbnRhdGlvbi5cbiAqL1xuY2xhc3MgU2VuZGVyIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBTZW5kZXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7bmV0LlNvY2tldH0gc29ja2V0IFRoZSBjb25uZWN0aW9uIHNvY2tldFxuICAgKiBAcGFyYW0ge09iamVjdH0gW2V4dGVuc2lvbnNdIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBuZWdvdGlhdGVkIGV4dGVuc2lvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHNvY2tldCwgZXh0ZW5zaW9ucykge1xuICAgIHRoaXMuX2V4dGVuc2lvbnMgPSBleHRlbnNpb25zIHx8IHt9O1xuICAgIHRoaXMuX3NvY2tldCA9IHNvY2tldDtcblxuICAgIHRoaXMuX2ZpcnN0RnJhZ21lbnQgPSB0cnVlO1xuICAgIHRoaXMuX2NvbXByZXNzID0gZmFsc2U7XG5cbiAgICB0aGlzLl9idWZmZXJlZEJ5dGVzID0gMDtcbiAgICB0aGlzLl9kZWZsYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9xdWV1ZSA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIEZyYW1lcyBhIHBpZWNlIG9mIGRhdGEgYWNjb3JkaW5nIHRvIHRoZSBIeUJpIFdlYlNvY2tldCBwcm90b2NvbC5cbiAgICpcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGRhdGEgVGhlIGRhdGEgdG8gZnJhbWVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgT3B0aW9ucyBvYmplY3RcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMub3Bjb2RlIFRoZSBvcGNvZGVcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5yZWFkT25seT1mYWxzZV0gU3BlY2lmaWVzIHdoZXRoZXIgYGRhdGFgIGNhbiBiZVxuICAgKiAgICAgbW9kaWZpZWRcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5maW49ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBzZXQgdGhlXG4gICAqICAgICBGSU4gYml0XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWFzaz1mYWxzZV0gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIG1hc2tcbiAgICogICAgIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnJzdjE9ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBzZXQgdGhlXG4gICAqICAgICBSU1YxIGJpdFxuICAgKiBAcmV0dXJuIHtCdWZmZXJbXX0gVGhlIGZyYW1lZCBkYXRhIGFzIGEgbGlzdCBvZiBgQnVmZmVyYCBpbnN0YW5jZXNcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc3RhdGljIGZyYW1lKGRhdGEsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBtZXJnZSA9IG9wdGlvbnMubWFzayAmJiBvcHRpb25zLnJlYWRPbmx5O1xuICAgIGxldCBvZmZzZXQgPSBvcHRpb25zLm1hc2sgPyA2IDogMjtcbiAgICBsZXQgcGF5bG9hZExlbmd0aCA9IGRhdGEubGVuZ3RoO1xuXG4gICAgaWYgKGRhdGEubGVuZ3RoID49IDY1NTM2KSB7XG4gICAgICBvZmZzZXQgKz0gODtcbiAgICAgIHBheWxvYWRMZW5ndGggPSAxMjc7XG4gICAgfSBlbHNlIGlmIChkYXRhLmxlbmd0aCA+IDEyNSkge1xuICAgICAgb2Zmc2V0ICs9IDI7XG4gICAgICBwYXlsb2FkTGVuZ3RoID0gMTI2O1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldCA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShtZXJnZSA/IGRhdGEubGVuZ3RoICsgb2Zmc2V0IDogb2Zmc2V0KTtcblxuICAgIHRhcmdldFswXSA9IG9wdGlvbnMuZmluID8gb3B0aW9ucy5vcGNvZGUgfCAweDgwIDogb3B0aW9ucy5vcGNvZGU7XG4gICAgaWYgKG9wdGlvbnMucnN2MSkgdGFyZ2V0WzBdIHw9IDB4NDA7XG5cbiAgICB0YXJnZXRbMV0gPSBwYXlsb2FkTGVuZ3RoO1xuXG4gICAgaWYgKHBheWxvYWRMZW5ndGggPT09IDEyNikge1xuICAgICAgdGFyZ2V0LndyaXRlVUludDE2QkUoZGF0YS5sZW5ndGgsIDIpO1xuICAgIH0gZWxzZSBpZiAocGF5bG9hZExlbmd0aCA9PT0gMTI3KSB7XG4gICAgICB0YXJnZXQud3JpdGVVSW50MzJCRSgwLCAyKTtcbiAgICAgIHRhcmdldC53cml0ZVVJbnQzMkJFKGRhdGEubGVuZ3RoLCA2KTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMubWFzaykgcmV0dXJuIFt0YXJnZXQsIGRhdGFdO1xuXG4gICAgcmFuZG9tRmlsbFN5bmMobWFzaywgMCwgNCk7XG5cbiAgICB0YXJnZXRbMV0gfD0gMHg4MDtcbiAgICB0YXJnZXRbb2Zmc2V0IC0gNF0gPSBtYXNrWzBdO1xuICAgIHRhcmdldFtvZmZzZXQgLSAzXSA9IG1hc2tbMV07XG4gICAgdGFyZ2V0W29mZnNldCAtIDJdID0gbWFza1syXTtcbiAgICB0YXJnZXRbb2Zmc2V0IC0gMV0gPSBtYXNrWzNdO1xuXG4gICAgaWYgKG1lcmdlKSB7XG4gICAgICBhcHBseU1hc2soZGF0YSwgbWFzaywgdGFyZ2V0LCBvZmZzZXQsIGRhdGEubGVuZ3RoKTtcbiAgICAgIHJldHVybiBbdGFyZ2V0XTtcbiAgICB9XG5cbiAgICBhcHBseU1hc2soZGF0YSwgbWFzaywgZGF0YSwgMCwgZGF0YS5sZW5ndGgpO1xuICAgIHJldHVybiBbdGFyZ2V0LCBkYXRhXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIGNsb3NlIG1lc3NhZ2UgdG8gdGhlIG90aGVyIHBlZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbY29kZV0gVGhlIHN0YXR1cyBjb2RlIGNvbXBvbmVudCBvZiB0aGUgYm9keVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2RhdGFdIFRoZSBtZXNzYWdlIGNvbXBvbmVudCBvZiB0aGUgYm9keVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFttYXNrPWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gbWFzayB0aGUgbWVzc2FnZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdIENhbGxiYWNrXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNsb3NlKGNvZGUsIGRhdGEsIG1hc2ssIGNiKSB7XG4gICAgbGV0IGJ1ZjtcblxuICAgIGlmIChjb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGJ1ZiA9IEVNUFRZX0JVRkZFUjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb2RlICE9PSAnbnVtYmVyJyB8fCAhaXNWYWxpZFN0YXR1c0NvZGUoY29kZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSB2YWxpZCBlcnJvciBjb2RlIG51bWJlcicpO1xuICAgIH0gZWxzZSBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkIHx8IGRhdGEgPT09ICcnKSB7XG4gICAgICBidWYgPSBCdWZmZXIuYWxsb2NVbnNhZmUoMik7XG4gICAgICBidWYud3JpdGVVSW50MTZCRShjb2RlLCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbGVuZ3RoID0gQnVmZmVyLmJ5dGVMZW5ndGgoZGF0YSk7XG5cbiAgICAgIGlmIChsZW5ndGggPiAxMjMpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSBtZXNzYWdlIG11c3Qgbm90IGJlIGdyZWF0ZXIgdGhhbiAxMjMgYnl0ZXMnKTtcbiAgICAgIH1cblxuICAgICAgYnVmID0gQnVmZmVyLmFsbG9jVW5zYWZlKDIgKyBsZW5ndGgpO1xuICAgICAgYnVmLndyaXRlVUludDE2QkUoY29kZSwgMCk7XG4gICAgICBidWYud3JpdGUoZGF0YSwgMik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2RlZmxhdGluZykge1xuICAgICAgdGhpcy5lbnF1ZXVlKFt0aGlzLmRvQ2xvc2UsIGJ1ZiwgbWFzaywgY2JdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb0Nsb3NlKGJ1ZiwgbWFzaywgY2IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGcmFtZXMgYW5kIHNlbmRzIGEgY2xvc2UgbWVzc2FnZS5cbiAgICpcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGRhdGEgVGhlIG1lc3NhZ2UgdG8gc2VuZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFttYXNrPWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gbWFzayBgZGF0YWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXSBDYWxsYmFja1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZG9DbG9zZShkYXRhLCBtYXNrLCBjYikge1xuICAgIHRoaXMuc2VuZEZyYW1lKFxuICAgICAgU2VuZGVyLmZyYW1lKGRhdGEsIHtcbiAgICAgICAgZmluOiB0cnVlLFxuICAgICAgICByc3YxOiBmYWxzZSxcbiAgICAgICAgb3Bjb2RlOiAweDA4LFxuICAgICAgICBtYXNrLFxuICAgICAgICByZWFkT25seTogZmFsc2VcbiAgICAgIH0pLFxuICAgICAgY2JcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgcGluZyBtZXNzYWdlIHRvIHRoZSBvdGhlciBwZWVyLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IGRhdGEgVGhlIG1lc3NhZ2UgdG8gc2VuZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFttYXNrPWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gbWFzayBgZGF0YWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXSBDYWxsYmFja1xuICAgKiBAcHVibGljXG4gICAqL1xuICBwaW5nKGRhdGEsIG1hc2ssIGNiKSB7XG4gICAgY29uc3QgYnVmID0gdG9CdWZmZXIoZGF0YSk7XG5cbiAgICBpZiAoYnVmLmxlbmd0aCA+IDEyNSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSBkYXRhIHNpemUgbXVzdCBub3QgYmUgZ3JlYXRlciB0aGFuIDEyNSBieXRlcycpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9kZWZsYXRpbmcpIHtcbiAgICAgIHRoaXMuZW5xdWV1ZShbdGhpcy5kb1BpbmcsIGJ1ZiwgbWFzaywgdG9CdWZmZXIucmVhZE9ubHksIGNiXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9QaW5nKGJ1ZiwgbWFzaywgdG9CdWZmZXIucmVhZE9ubHksIGNiKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRnJhbWVzIGFuZCBzZW5kcyBhIHBpbmcgbWVzc2FnZS5cbiAgICpcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGRhdGEgVGhlIG1lc3NhZ2UgdG8gc2VuZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFttYXNrPWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gbWFzayBgZGF0YWBcbiAgICogQHBhcmFtIHtCb29sZWFufSBbcmVhZE9ubHk9ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIGBkYXRhYCBjYW4gYmUgbW9kaWZpZWRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXSBDYWxsYmFja1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZG9QaW5nKGRhdGEsIG1hc2ssIHJlYWRPbmx5LCBjYikge1xuICAgIHRoaXMuc2VuZEZyYW1lKFxuICAgICAgU2VuZGVyLmZyYW1lKGRhdGEsIHtcbiAgICAgICAgZmluOiB0cnVlLFxuICAgICAgICByc3YxOiBmYWxzZSxcbiAgICAgICAgb3Bjb2RlOiAweDA5LFxuICAgICAgICBtYXNrLFxuICAgICAgICByZWFkT25seVxuICAgICAgfSksXG4gICAgICBjYlxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgYSBwb25nIG1lc3NhZ2UgdG8gdGhlIG90aGVyIHBlZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gZGF0YSBUaGUgbWVzc2FnZSB0byBzZW5kXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW21hc2s9ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBtYXNrIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdIENhbGxiYWNrXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHBvbmcoZGF0YSwgbWFzaywgY2IpIHtcbiAgICBjb25zdCBidWYgPSB0b0J1ZmZlcihkYXRhKTtcblxuICAgIGlmIChidWYubGVuZ3RoID4gMTI1KSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIGRhdGEgc2l6ZSBtdXN0IG5vdCBiZSBncmVhdGVyIHRoYW4gMTI1IGJ5dGVzJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2RlZmxhdGluZykge1xuICAgICAgdGhpcy5lbnF1ZXVlKFt0aGlzLmRvUG9uZywgYnVmLCBtYXNrLCB0b0J1ZmZlci5yZWFkT25seSwgY2JdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb1BvbmcoYnVmLCBtYXNrLCB0b0J1ZmZlci5yZWFkT25seSwgY2IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGcmFtZXMgYW5kIHNlbmRzIGEgcG9uZyBtZXNzYWdlLlxuICAgKlxuICAgKiBAcGFyYW0ge0J1ZmZlcn0gZGF0YSBUaGUgbWVzc2FnZSB0byBzZW5kXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW21hc2s9ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBtYXNrIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtyZWFkT25seT1mYWxzZV0gU3BlY2lmaWVzIHdoZXRoZXIgYGRhdGFgIGNhbiBiZSBtb2RpZmllZFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdIENhbGxiYWNrXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkb1BvbmcoZGF0YSwgbWFzaywgcmVhZE9ubHksIGNiKSB7XG4gICAgdGhpcy5zZW5kRnJhbWUoXG4gICAgICBTZW5kZXIuZnJhbWUoZGF0YSwge1xuICAgICAgICBmaW46IHRydWUsXG4gICAgICAgIHJzdjE6IGZhbHNlLFxuICAgICAgICBvcGNvZGU6IDB4MGEsXG4gICAgICAgIG1hc2ssXG4gICAgICAgIHJlYWRPbmx5XG4gICAgICB9KSxcbiAgICAgIGNiXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIGRhdGEgbWVzc2FnZSB0byB0aGUgb3RoZXIgcGVlci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSBkYXRhIFRoZSBtZXNzYWdlIHRvIHNlbmRcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgT3B0aW9ucyBvYmplY3RcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jb21wcmVzcz1mYWxzZV0gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvXG4gICAqICAgICBjb21wcmVzcyBgZGF0YWBcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5iaW5hcnk9ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIGBkYXRhYCBpcyBiaW5hcnlcbiAgICogICAgIG9yIHRleHRcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5maW49ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIHRoZSBmcmFnbWVudCBpcyB0aGVcbiAgICogICAgIGxhc3Qgb25lXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWFzaz1mYWxzZV0gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIG1hc2tcbiAgICogICAgIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdIENhbGxiYWNrXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHNlbmQoZGF0YSwgb3B0aW9ucywgY2IpIHtcbiAgICBjb25zdCBidWYgPSB0b0J1ZmZlcihkYXRhKTtcbiAgICBjb25zdCBwZXJNZXNzYWdlRGVmbGF0ZSA9IHRoaXMuX2V4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV07XG4gICAgbGV0IG9wY29kZSA9IG9wdGlvbnMuYmluYXJ5ID8gMiA6IDE7XG4gICAgbGV0IHJzdjEgPSBvcHRpb25zLmNvbXByZXNzO1xuXG4gICAgaWYgKHRoaXMuX2ZpcnN0RnJhZ21lbnQpIHtcbiAgICAgIHRoaXMuX2ZpcnN0RnJhZ21lbnQgPSBmYWxzZTtcbiAgICAgIGlmIChyc3YxICYmIHBlck1lc3NhZ2VEZWZsYXRlKSB7XG4gICAgICAgIHJzdjEgPSBidWYubGVuZ3RoID49IHBlck1lc3NhZ2VEZWZsYXRlLl90aHJlc2hvbGQ7XG4gICAgICB9XG4gICAgICB0aGlzLl9jb21wcmVzcyA9IHJzdjE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJzdjEgPSBmYWxzZTtcbiAgICAgIG9wY29kZSA9IDA7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuZmluKSB0aGlzLl9maXJzdEZyYWdtZW50ID0gdHJ1ZTtcblxuICAgIGlmIChwZXJNZXNzYWdlRGVmbGF0ZSkge1xuICAgICAgY29uc3Qgb3B0cyA9IHtcbiAgICAgICAgZmluOiBvcHRpb25zLmZpbixcbiAgICAgICAgcnN2MSxcbiAgICAgICAgb3Bjb2RlLFxuICAgICAgICBtYXNrOiBvcHRpb25zLm1hc2ssXG4gICAgICAgIHJlYWRPbmx5OiB0b0J1ZmZlci5yZWFkT25seVxuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMuX2RlZmxhdGluZykge1xuICAgICAgICB0aGlzLmVucXVldWUoW3RoaXMuZGlzcGF0Y2gsIGJ1ZiwgdGhpcy5fY29tcHJlc3MsIG9wdHMsIGNiXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKGJ1ZiwgdGhpcy5fY29tcHJlc3MsIG9wdHMsIGNiKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZW5kRnJhbWUoXG4gICAgICAgIFNlbmRlci5mcmFtZShidWYsIHtcbiAgICAgICAgICBmaW46IG9wdGlvbnMuZmluLFxuICAgICAgICAgIHJzdjE6IGZhbHNlLFxuICAgICAgICAgIG9wY29kZSxcbiAgICAgICAgICBtYXNrOiBvcHRpb25zLm1hc2ssXG4gICAgICAgICAgcmVhZE9ubHk6IHRvQnVmZmVyLnJlYWRPbmx5XG4gICAgICAgIH0pLFxuICAgICAgICBjYlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2hlcyBhIGRhdGEgbWVzc2FnZS5cbiAgICpcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGRhdGEgVGhlIG1lc3NhZ2UgdG8gc2VuZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtjb21wcmVzcz1mYWxzZV0gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIGNvbXByZXNzXG4gICAqICAgICBgZGF0YWBcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgT3B0aW9ucyBvYmplY3RcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMub3Bjb2RlIFRoZSBvcGNvZGVcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5yZWFkT25seT1mYWxzZV0gU3BlY2lmaWVzIHdoZXRoZXIgYGRhdGFgIGNhbiBiZVxuICAgKiAgICAgbW9kaWZpZWRcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5maW49ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBzZXQgdGhlXG4gICAqICAgICBGSU4gYml0XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWFzaz1mYWxzZV0gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIG1hc2tcbiAgICogICAgIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnJzdjE9ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBzZXQgdGhlXG4gICAqICAgICBSU1YxIGJpdFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdIENhbGxiYWNrXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkaXNwYXRjaChkYXRhLCBjb21wcmVzcywgb3B0aW9ucywgY2IpIHtcbiAgICBpZiAoIWNvbXByZXNzKSB7XG4gICAgICB0aGlzLnNlbmRGcmFtZShTZW5kZXIuZnJhbWUoZGF0YSwgb3B0aW9ucyksIGNiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwZXJNZXNzYWdlRGVmbGF0ZSA9IHRoaXMuX2V4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV07XG5cbiAgICB0aGlzLl9idWZmZXJlZEJ5dGVzICs9IGRhdGEubGVuZ3RoO1xuICAgIHRoaXMuX2RlZmxhdGluZyA9IHRydWU7XG4gICAgcGVyTWVzc2FnZURlZmxhdGUuY29tcHJlc3MoZGF0YSwgb3B0aW9ucy5maW4sIChfLCBidWYpID0+IHtcbiAgICAgIGlmICh0aGlzLl9zb2NrZXQuZGVzdHJveWVkKSB7XG4gICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAnVGhlIHNvY2tldCB3YXMgY2xvc2VkIHdoaWxlIGRhdGEgd2FzIGJlaW5nIGNvbXByZXNzZWQnXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykgY2IoZXJyKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3F1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLl9xdWV1ZVtpXVs0XTtcblxuICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIGNhbGxiYWNrKGVycik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2J1ZmZlcmVkQnl0ZXMgLT0gZGF0YS5sZW5ndGg7XG4gICAgICB0aGlzLl9kZWZsYXRpbmcgPSBmYWxzZTtcbiAgICAgIG9wdGlvbnMucmVhZE9ubHkgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2VuZEZyYW1lKFNlbmRlci5mcmFtZShidWYsIG9wdGlvbnMpLCBjYik7XG4gICAgICB0aGlzLmRlcXVldWUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyBxdWV1ZWQgc2VuZCBvcGVyYXRpb25zLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZGVxdWV1ZSgpIHtcbiAgICB3aGlsZSAoIXRoaXMuX2RlZmxhdGluZyAmJiB0aGlzLl9xdWV1ZS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuX3F1ZXVlLnNoaWZ0KCk7XG5cbiAgICAgIHRoaXMuX2J1ZmZlcmVkQnl0ZXMgLT0gcGFyYW1zWzFdLmxlbmd0aDtcbiAgICAgIFJlZmxlY3QuYXBwbHkocGFyYW1zWzBdLCB0aGlzLCBwYXJhbXMuc2xpY2UoMSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbnF1ZXVlcyBhIHNlbmQgb3BlcmF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgU2VuZCBvcGVyYXRpb24gcGFyYW1ldGVycy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGVucXVldWUocGFyYW1zKSB7XG4gICAgdGhpcy5fYnVmZmVyZWRCeXRlcyArPSBwYXJhbXNbMV0ubGVuZ3RoO1xuICAgIHRoaXMuX3F1ZXVlLnB1c2gocGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIGZyYW1lLlxuICAgKlxuICAgKiBAcGFyYW0ge0J1ZmZlcltdfSBsaXN0IFRoZSBmcmFtZSB0byBzZW5kXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl0gQ2FsbGJhY2tcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHNlbmRGcmFtZShsaXN0LCBjYikge1xuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMikge1xuICAgICAgdGhpcy5fc29ja2V0LmNvcmsoKTtcbiAgICAgIHRoaXMuX3NvY2tldC53cml0ZShsaXN0WzBdKTtcbiAgICAgIHRoaXMuX3NvY2tldC53cml0ZShsaXN0WzFdLCBjYik7XG4gICAgICB0aGlzLl9zb2NrZXQudW5jb3JrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NvY2tldC53cml0ZShsaXN0WzBdLCBjYik7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2VuZGVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB7IER1cGxleCB9ID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5cbi8qKlxuICogRW1pdHMgdGhlIGAnY2xvc2UnYCBldmVudCBvbiBhIHN0cmVhbS5cbiAqXG4gKiBAcGFyYW0ge3N0cmVhbS5EdXBsZXh9IFRoZSBzdHJlYW0uXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBlbWl0Q2xvc2Uoc3RyZWFtKSB7XG4gIHN0cmVhbS5lbWl0KCdjbG9zZScpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYCdlbmQnYCBldmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBkdXBsZXhPbkVuZCgpIHtcbiAgaWYgKCF0aGlzLmRlc3Ryb3llZCAmJiB0aGlzLl93cml0YWJsZVN0YXRlLmZpbmlzaGVkKSB7XG4gICAgdGhpcy5kZXN0cm95KCk7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGAnZXJyb3InYCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnIgVGhlIGVycm9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBkdXBsZXhPbkVycm9yKGVycikge1xuICB0aGlzLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGR1cGxleE9uRXJyb3IpO1xuICB0aGlzLmRlc3Ryb3koKTtcbiAgaWYgKHRoaXMubGlzdGVuZXJDb3VudCgnZXJyb3InKSA9PT0gMCkge1xuICAgIC8vIERvIG5vdCBzdXBwcmVzcyB0aGUgdGhyb3dpbmcgYmVoYXZpb3IuXG4gICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIH1cbn1cblxuLyoqXG4gKiBXcmFwcyBhIGBXZWJTb2NrZXRgIGluIGEgZHVwbGV4IHN0cmVhbS5cbiAqXG4gKiBAcGFyYW0ge1dlYlNvY2tldH0gd3MgVGhlIGBXZWJTb2NrZXRgIHRvIHdyYXBcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgZm9yIHRoZSBgRHVwbGV4YCBjb25zdHJ1Y3RvclxuICogQHJldHVybiB7c3RyZWFtLkR1cGxleH0gVGhlIGR1cGxleCBzdHJlYW1cbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gY3JlYXRlV2ViU29ja2V0U3RyZWFtKHdzLCBvcHRpb25zKSB7XG4gIGxldCByZXN1bWVPblJlY2VpdmVyRHJhaW4gPSB0cnVlO1xuXG4gIGZ1bmN0aW9uIHJlY2VpdmVyT25EcmFpbigpIHtcbiAgICBpZiAocmVzdW1lT25SZWNlaXZlckRyYWluKSB3cy5fc29ja2V0LnJlc3VtZSgpO1xuICB9XG5cbiAgaWYgKHdzLnJlYWR5U3RhdGUgPT09IHdzLkNPTk5FQ1RJTkcpIHtcbiAgICB3cy5vbmNlKCdvcGVuJywgZnVuY3Rpb24gb3BlbigpIHtcbiAgICAgIHdzLl9yZWNlaXZlci5yZW1vdmVBbGxMaXN0ZW5lcnMoJ2RyYWluJyk7XG4gICAgICB3cy5fcmVjZWl2ZXIub24oJ2RyYWluJywgcmVjZWl2ZXJPbkRyYWluKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB3cy5fcmVjZWl2ZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCdkcmFpbicpO1xuICAgIHdzLl9yZWNlaXZlci5vbignZHJhaW4nLCByZWNlaXZlck9uRHJhaW4pO1xuICB9XG5cbiAgY29uc3QgZHVwbGV4ID0gbmV3IER1cGxleCh7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBhdXRvRGVzdHJveTogZmFsc2UsXG4gICAgZW1pdENsb3NlOiBmYWxzZSxcbiAgICBvYmplY3RNb2RlOiBmYWxzZSxcbiAgICB3cml0YWJsZU9iamVjdE1vZGU6IGZhbHNlXG4gIH0pO1xuXG4gIHdzLm9uKCdtZXNzYWdlJywgZnVuY3Rpb24gbWVzc2FnZShtc2cpIHtcbiAgICBpZiAoIWR1cGxleC5wdXNoKG1zZykpIHtcbiAgICAgIHJlc3VtZU9uUmVjZWl2ZXJEcmFpbiA9IGZhbHNlO1xuICAgICAgd3MuX3NvY2tldC5wYXVzZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgd3Mub25jZSgnZXJyb3InLCBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICBpZiAoZHVwbGV4LmRlc3Ryb3llZCkgcmV0dXJuO1xuXG4gICAgZHVwbGV4LmRlc3Ryb3koZXJyKTtcbiAgfSk7XG5cbiAgd3Mub25jZSgnY2xvc2UnLCBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICBpZiAoZHVwbGV4LmRlc3Ryb3llZCkgcmV0dXJuO1xuXG4gICAgZHVwbGV4LnB1c2gobnVsbCk7XG4gIH0pO1xuXG4gIGR1cGxleC5fZGVzdHJveSA9IGZ1bmN0aW9uIChlcnIsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHdzLnJlYWR5U3RhdGUgPT09IHdzLkNMT1NFRCkge1xuICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZW1pdENsb3NlLCBkdXBsZXgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBjYWxsZWQgPSBmYWxzZTtcblxuICAgIHdzLm9uY2UoJ2Vycm9yJywgZnVuY3Rpb24gZXJyb3IoZXJyKSB7XG4gICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICB9KTtcblxuICAgIHdzLm9uY2UoJ2Nsb3NlJywgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICBpZiAoIWNhbGxlZCkgY2FsbGJhY2soZXJyKTtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZW1pdENsb3NlLCBkdXBsZXgpO1xuICAgIH0pO1xuICAgIHdzLnRlcm1pbmF0ZSgpO1xuICB9O1xuXG4gIGR1cGxleC5fZmluYWwgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICBpZiAod3MucmVhZHlTdGF0ZSA9PT0gd3MuQ09OTkVDVElORykge1xuICAgICAgd3Mub25jZSgnb3BlbicsIGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICAgIGR1cGxleC5fZmluYWwoY2FsbGJhY2spO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIHZhbHVlIG9mIHRoZSBgX3NvY2tldGAgcHJvcGVydHkgaXMgYG51bGxgIGl0IG1lYW5zIHRoYXQgYHdzYCBpcyBhXG4gICAgLy8gY2xpZW50IHdlYnNvY2tldCBhbmQgdGhlIGhhbmRzaGFrZSBmYWlsZWQuIEluIGZhY3QsIHdoZW4gdGhpcyBoYXBwZW5zLCBhXG4gICAgLy8gc29ja2V0IGlzIG5ldmVyIGFzc2lnbmVkIHRvIHRoZSB3ZWJzb2NrZXQuIFdhaXQgZm9yIHRoZSBgJ2Vycm9yJ2AgZXZlbnRcbiAgICAvLyB0aGF0IHdpbGwgYmUgZW1pdHRlZCBieSB0aGUgd2Vic29ja2V0LlxuICAgIGlmICh3cy5fc29ja2V0ID09PSBudWxsKSByZXR1cm47XG5cbiAgICBpZiAod3MuX3NvY2tldC5fd3JpdGFibGVTdGF0ZS5maW5pc2hlZCkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICAgIGlmIChkdXBsZXguX3JlYWRhYmxlU3RhdGUuZW5kRW1pdHRlZCkgZHVwbGV4LmRlc3Ryb3koKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd3MuX3NvY2tldC5vbmNlKCdmaW5pc2gnLCBmdW5jdGlvbiBmaW5pc2goKSB7XG4gICAgICAgIC8vIGBkdXBsZXhgIGlzIG5vdCBkZXN0cm95ZWQgaGVyZSBiZWNhdXNlIHRoZSBgJ2VuZCdgIGV2ZW50IHdpbGwgYmVcbiAgICAgICAgLy8gZW1pdHRlZCBvbiBgZHVwbGV4YCBhZnRlciB0aGlzIGAnZmluaXNoJ2AgZXZlbnQuIFRoZSBFT0Ygc2lnbmFsaW5nXG4gICAgICAgIC8vIGBudWxsYCBjaHVuayBpcywgaW4gZmFjdCwgcHVzaGVkIHdoZW4gdGhlIHdlYnNvY2tldCBlbWl0cyBgJ2Nsb3NlJ2AuXG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgICAgIHdzLmNsb3NlKCk7XG4gICAgfVxuICB9O1xuXG4gIGR1cGxleC5fcmVhZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAod3MucmVhZHlTdGF0ZSA9PT0gd3MuT1BFTiAmJiAhcmVzdW1lT25SZWNlaXZlckRyYWluKSB7XG4gICAgICByZXN1bWVPblJlY2VpdmVyRHJhaW4gPSB0cnVlO1xuICAgICAgaWYgKCF3cy5fcmVjZWl2ZXIuX3dyaXRhYmxlU3RhdGUubmVlZERyYWluKSB3cy5fc29ja2V0LnJlc3VtZSgpO1xuICAgIH1cbiAgfTtcblxuICBkdXBsZXguX3dyaXRlID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZywgY2FsbGJhY2spIHtcbiAgICBpZiAod3MucmVhZHlTdGF0ZSA9PT0gd3MuQ09OTkVDVElORykge1xuICAgICAgd3Mub25jZSgnb3BlbicsIGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICAgIGR1cGxleC5fd3JpdGUoY2h1bmssIGVuY29kaW5nLCBjYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB3cy5zZW5kKGNodW5rLCBjYWxsYmFjayk7XG4gIH07XG5cbiAgZHVwbGV4Lm9uKCdlbmQnLCBkdXBsZXhPbkVuZCk7XG4gIGR1cGxleC5vbignZXJyb3InLCBkdXBsZXhPbkVycm9yKTtcbiAgcmV0dXJuIGR1cGxleDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVXZWJTb2NrZXRTdHJlYW07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgc3RhdHVzIGNvZGUgaXMgYWxsb3dlZCBpbiBhIGNsb3NlIGZyYW1lLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlIFRoZSBzdGF0dXMgY29kZVxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBzdGF0dXMgY29kZSBpcyB2YWxpZCwgZWxzZSBgZmFsc2VgXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIGlzVmFsaWRTdGF0dXNDb2RlKGNvZGUpIHtcbiAgcmV0dXJuIChcbiAgICAoY29kZSA+PSAxMDAwICYmXG4gICAgICBjb2RlIDw9IDEwMTQgJiZcbiAgICAgIGNvZGUgIT09IDEwMDQgJiZcbiAgICAgIGNvZGUgIT09IDEwMDUgJiZcbiAgICAgIGNvZGUgIT09IDEwMDYpIHx8XG4gICAgKGNvZGUgPj0gMzAwMCAmJiBjb2RlIDw9IDQ5OTkpXG4gICk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgZ2l2ZW4gYnVmZmVyIGNvbnRhaW5zIG9ubHkgY29ycmVjdCBVVEYtOC5cbiAqIFBvcnRlZCBmcm9tIGh0dHBzOi8vd3d3LmNsLmNhbS5hYy51ay8lN0VtZ2syNS91Y3MvdXRmOF9jaGVjay5jIGJ5XG4gKiBNYXJrdXMgS3Vobi5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmIFRoZSBidWZmZXIgdG8gY2hlY2tcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBgYnVmYCBjb250YWlucyBvbmx5IGNvcnJlY3QgVVRGLTgsIGVsc2UgYGZhbHNlYFxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBfaXNWYWxpZFVURjgoYnVmKSB7XG4gIGNvbnN0IGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGxldCBpID0gMDtcblxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIGlmICgoYnVmW2ldICYgMHg4MCkgPT09IDApIHtcbiAgICAgIC8vIDB4eHh4eHh4XG4gICAgICBpKys7XG4gICAgfSBlbHNlIGlmICgoYnVmW2ldICYgMHhlMCkgPT09IDB4YzApIHtcbiAgICAgIC8vIDExMHh4eHh4IDEweHh4eHh4XG4gICAgICBpZiAoXG4gICAgICAgIGkgKyAxID09PSBsZW4gfHxcbiAgICAgICAgKGJ1ZltpICsgMV0gJiAweGMwKSAhPT0gMHg4MCB8fFxuICAgICAgICAoYnVmW2ldICYgMHhmZSkgPT09IDB4YzAgLy8gT3ZlcmxvbmdcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGkgKz0gMjtcbiAgICB9IGVsc2UgaWYgKChidWZbaV0gJiAweGYwKSA9PT0gMHhlMCkge1xuICAgICAgLy8gMTExMHh4eHggMTB4eHh4eHggMTB4eHh4eHhcbiAgICAgIGlmIChcbiAgICAgICAgaSArIDIgPj0gbGVuIHx8XG4gICAgICAgIChidWZbaSArIDFdICYgMHhjMCkgIT09IDB4ODAgfHxcbiAgICAgICAgKGJ1ZltpICsgMl0gJiAweGMwKSAhPT0gMHg4MCB8fFxuICAgICAgICAoYnVmW2ldID09PSAweGUwICYmIChidWZbaSArIDFdICYgMHhlMCkgPT09IDB4ODApIHx8IC8vIE92ZXJsb25nXG4gICAgICAgIChidWZbaV0gPT09IDB4ZWQgJiYgKGJ1ZltpICsgMV0gJiAweGUwKSA9PT0gMHhhMCkgLy8gU3Vycm9nYXRlIChVK0Q4MDAgLSBVK0RGRkYpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpICs9IDM7XG4gICAgfSBlbHNlIGlmICgoYnVmW2ldICYgMHhmOCkgPT09IDB4ZjApIHtcbiAgICAgIC8vIDExMTEweHh4IDEweHh4eHh4IDEweHh4eHh4IDEweHh4eHh4XG4gICAgICBpZiAoXG4gICAgICAgIGkgKyAzID49IGxlbiB8fFxuICAgICAgICAoYnVmW2kgKyAxXSAmIDB4YzApICE9PSAweDgwIHx8XG4gICAgICAgIChidWZbaSArIDJdICYgMHhjMCkgIT09IDB4ODAgfHxcbiAgICAgICAgKGJ1ZltpICsgM10gJiAweGMwKSAhPT0gMHg4MCB8fFxuICAgICAgICAoYnVmW2ldID09PSAweGYwICYmIChidWZbaSArIDFdICYgMHhmMCkgPT09IDB4ODApIHx8IC8vIE92ZXJsb25nXG4gICAgICAgIChidWZbaV0gPT09IDB4ZjQgJiYgYnVmW2kgKyAxXSA+IDB4OGYpIHx8XG4gICAgICAgIGJ1ZltpXSA+IDB4ZjQgLy8gPiBVKzEwRkZGRlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaSArPSA0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbnRyeSB7XG4gIGxldCBpc1ZhbGlkVVRGOCA9IHJlcXVpcmUoJ3V0Zi04LXZhbGlkYXRlJyk7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICh0eXBlb2YgaXNWYWxpZFVURjggPT09ICdvYmplY3QnKSB7XG4gICAgaXNWYWxpZFVURjggPSBpc1ZhbGlkVVRGOC5WYWxpZGF0aW9uLmlzVmFsaWRVVEY4OyAvLyB1dGYtOC12YWxpZGF0ZUA8My4wLjBcbiAgfVxuXG4gIG1vZHVsZS5leHBvcnRzID0ge1xuICAgIGlzVmFsaWRTdGF0dXNDb2RlLFxuICAgIGlzVmFsaWRVVEY4KGJ1Zikge1xuICAgICAgcmV0dXJuIGJ1Zi5sZW5ndGggPCAxNTAgPyBfaXNWYWxpZFVURjgoYnVmKSA6IGlzVmFsaWRVVEY4KGJ1Zik7XG4gICAgfVxuICB9O1xufSBjYXRjaCAoZSkgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8ge1xuICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpc1ZhbGlkU3RhdHVzQ29kZSxcbiAgICBpc1ZhbGlkVVRGODogX2lzVmFsaWRVVEY4XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuY29uc3QgeyBjcmVhdGVIYXNoIH0gPSByZXF1aXJlKCdjcnlwdG8nKTtcbmNvbnN0IHsgY3JlYXRlU2VydmVyLCBTVEFUVVNfQ09ERVMgfSA9IHJlcXVpcmUoJ2h0dHAnKTtcblxuY29uc3QgUGVyTWVzc2FnZURlZmxhdGUgPSByZXF1aXJlKCcuL3Blcm1lc3NhZ2UtZGVmbGF0ZScpO1xuY29uc3QgV2ViU29ja2V0ID0gcmVxdWlyZSgnLi93ZWJzb2NrZXQnKTtcbmNvbnN0IHsgZm9ybWF0LCBwYXJzZSB9ID0gcmVxdWlyZSgnLi9leHRlbnNpb24nKTtcbmNvbnN0IHsgR1VJRCwga1dlYlNvY2tldCB9ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcblxuY29uc3Qga2V5UmVnZXggPSAvXlsrLzAtOUEtWmEtel17MjJ9PT0kLztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBXZWJTb2NrZXQgc2VydmVyLlxuICpcbiAqIEBleHRlbmRzIEV2ZW50RW1pdHRlclxuICovXG5jbGFzcyBXZWJTb2NrZXRTZXJ2ZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAvKipcbiAgICogQ3JlYXRlIGEgYFdlYlNvY2tldFNlcnZlcmAgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIENvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuYmFja2xvZz01MTFdIFRoZSBtYXhpbXVtIGxlbmd0aCBvZiB0aGUgcXVldWUgb2ZcbiAgICogICAgIHBlbmRpbmcgY29ubmVjdGlvbnNcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jbGllbnRUcmFja2luZz10cnVlXSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG9cbiAgICogICAgIHRyYWNrIGNsaWVudHNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuaGFuZGxlUHJvdG9jb2xzXSBBIGhvb2sgdG8gaGFuZGxlIHByb3RvY29sc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuaG9zdF0gVGhlIGhvc3RuYW1lIHdoZXJlIHRvIGJpbmQgdGhlIHNlcnZlclxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4UGF5bG9hZD0xMDQ4NTc2MDBdIFRoZSBtYXhpbXVtIGFsbG93ZWQgbWVzc2FnZVxuICAgKiAgICAgc2l6ZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm5vU2VydmVyPWZhbHNlXSBFbmFibGUgbm8gc2VydmVyIG1vZGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnBhdGhdIEFjY2VwdCBvbmx5IGNvbm5lY3Rpb25zIG1hdGNoaW5nIHRoaXMgcGF0aFxuICAgKiBAcGFyYW0geyhCb29sZWFufE9iamVjdCl9IFtvcHRpb25zLnBlck1lc3NhZ2VEZWZsYXRlPWZhbHNlXSBFbmFibGUvZGlzYWJsZVxuICAgKiAgICAgcGVybWVzc2FnZS1kZWZsYXRlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5wb3J0XSBUaGUgcG9ydCB3aGVyZSB0byBiaW5kIHRoZSBzZXJ2ZXJcbiAgICogQHBhcmFtIHtodHRwLlNlcnZlcn0gW29wdGlvbnMuc2VydmVyXSBBIHByZS1jcmVhdGVkIEhUVFAvUyBzZXJ2ZXIgdG8gdXNlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnZlcmlmeUNsaWVudF0gQSBob29rIHRvIHJlamVjdCBjb25uZWN0aW9uc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIEEgbGlzdGVuZXIgZm9yIHRoZSBgbGlzdGVuaW5nYCBldmVudFxuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICBzdXBlcigpO1xuXG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIG1heFBheWxvYWQ6IDEwMCAqIDEwMjQgKiAxMDI0LFxuICAgICAgcGVyTWVzc2FnZURlZmxhdGU6IGZhbHNlLFxuICAgICAgaGFuZGxlUHJvdG9jb2xzOiBudWxsLFxuICAgICAgY2xpZW50VHJhY2tpbmc6IHRydWUsXG4gICAgICB2ZXJpZnlDbGllbnQ6IG51bGwsXG4gICAgICBub1NlcnZlcjogZmFsc2UsXG4gICAgICBiYWNrbG9nOiBudWxsLCAvLyB1c2UgZGVmYXVsdCAoNTExIGFzIGltcGxlbWVudGVkIGluIG5ldC5qcylcbiAgICAgIHNlcnZlcjogbnVsbCxcbiAgICAgIGhvc3Q6IG51bGwsXG4gICAgICBwYXRoOiBudWxsLFxuICAgICAgcG9ydDogbnVsbCxcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9O1xuXG4gICAgaWYgKG9wdGlvbnMucG9ydCA9PSBudWxsICYmICFvcHRpb25zLnNlcnZlciAmJiAhb3B0aW9ucy5ub1NlcnZlcikge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgJ09uZSBvZiB0aGUgXCJwb3J0XCIsIFwic2VydmVyXCIsIG9yIFwibm9TZXJ2ZXJcIiBvcHRpb25zIG11c3QgYmUgc3BlY2lmaWVkJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5wb3J0ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3NlcnZlciA9IGNyZWF0ZVNlcnZlcigocmVxLCByZXMpID0+IHtcbiAgICAgICAgY29uc3QgYm9keSA9IFNUQVRVU19DT0RFU1s0MjZdO1xuXG4gICAgICAgIHJlcy53cml0ZUhlYWQoNDI2LCB7XG4gICAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogYm9keS5sZW5ndGgsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L3BsYWluJ1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzLmVuZChib2R5KTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fc2VydmVyLmxpc3RlbihcbiAgICAgICAgb3B0aW9ucy5wb3J0LFxuICAgICAgICBvcHRpb25zLmhvc3QsXG4gICAgICAgIG9wdGlvbnMuYmFja2xvZyxcbiAgICAgICAgY2FsbGJhY2tcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLnNlcnZlcikge1xuICAgICAgdGhpcy5fc2VydmVyID0gb3B0aW9ucy5zZXJ2ZXI7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3NlcnZlcikge1xuICAgICAgY29uc3QgZW1pdENvbm5lY3Rpb24gPSB0aGlzLmVtaXQuYmluZCh0aGlzLCAnY29ubmVjdGlvbicpO1xuXG4gICAgICB0aGlzLl9yZW1vdmVMaXN0ZW5lcnMgPSBhZGRMaXN0ZW5lcnModGhpcy5fc2VydmVyLCB7XG4gICAgICAgIGxpc3RlbmluZzogdGhpcy5lbWl0LmJpbmQodGhpcywgJ2xpc3RlbmluZycpLFxuICAgICAgICBlcnJvcjogdGhpcy5lbWl0LmJpbmQodGhpcywgJ2Vycm9yJyksXG4gICAgICAgIHVwZ3JhZGU6IChyZXEsIHNvY2tldCwgaGVhZCkgPT4ge1xuICAgICAgICAgIHRoaXMuaGFuZGxlVXBncmFkZShyZXEsIHNvY2tldCwgaGVhZCwgZW1pdENvbm5lY3Rpb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5wZXJNZXNzYWdlRGVmbGF0ZSA9PT0gdHJ1ZSkgb3B0aW9ucy5wZXJNZXNzYWdlRGVmbGF0ZSA9IHt9O1xuICAgIGlmIChvcHRpb25zLmNsaWVudFRyYWNraW5nKSB0aGlzLmNsaWVudHMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBib3VuZCBhZGRyZXNzLCB0aGUgYWRkcmVzcyBmYW1pbHkgbmFtZSwgYW5kIHBvcnQgb2YgdGhlIHNlcnZlclxuICAgKiBhcyByZXBvcnRlZCBieSB0aGUgb3BlcmF0aW5nIHN5c3RlbSBpZiBsaXN0ZW5pbmcgb24gYW4gSVAgc29ja2V0LlxuICAgKiBJZiB0aGUgc2VydmVyIGlzIGxpc3RlbmluZyBvbiBhIHBpcGUgb3IgVU5JWCBkb21haW4gc29ja2V0LCB0aGUgbmFtZSBpc1xuICAgKiByZXR1cm5lZCBhcyBhIHN0cmluZy5cbiAgICpcbiAgICogQHJldHVybiB7KE9iamVjdHxTdHJpbmd8bnVsbCl9IFRoZSBhZGRyZXNzIG9mIHRoZSBzZXJ2ZXJcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYWRkcmVzcygpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLm5vU2VydmVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBzZXJ2ZXIgaXMgb3BlcmF0aW5nIGluIFwibm9TZXJ2ZXJcIiBtb2RlJyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9zZXJ2ZXIpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLl9zZXJ2ZXIuYWRkcmVzcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl0gQ2FsbGJhY2tcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY2xvc2UoY2IpIHtcbiAgICBpZiAoY2IpIHRoaXMub25jZSgnY2xvc2UnLCBjYik7XG5cbiAgICAvL1xuICAgIC8vIFRlcm1pbmF0ZSBhbGwgYXNzb2NpYXRlZCBjbGllbnRzLlxuICAgIC8vXG4gICAgaWYgKHRoaXMuY2xpZW50cykge1xuICAgICAgZm9yIChjb25zdCBjbGllbnQgb2YgdGhpcy5jbGllbnRzKSBjbGllbnQudGVybWluYXRlKCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VydmVyID0gdGhpcy5fc2VydmVyO1xuXG4gICAgaWYgKHNlcnZlcikge1xuICAgICAgdGhpcy5fcmVtb3ZlTGlzdGVuZXJzKCk7XG4gICAgICB0aGlzLl9yZW1vdmVMaXN0ZW5lcnMgPSB0aGlzLl9zZXJ2ZXIgPSBudWxsO1xuXG4gICAgICAvL1xuICAgICAgLy8gQ2xvc2UgdGhlIGh0dHAgc2VydmVyIGlmIGl0IHdhcyBpbnRlcm5hbGx5IGNyZWF0ZWQuXG4gICAgICAvL1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5wb3J0ICE9IG51bGwpIHtcbiAgICAgICAgc2VydmVyLmNsb3NlKCgpID0+IHRoaXMuZW1pdCgnY2xvc2UnKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZXNzLm5leHRUaWNrKGVtaXRDbG9zZSwgdGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogU2VlIGlmIGEgZ2l2ZW4gcmVxdWVzdCBzaG91bGQgYmUgaGFuZGxlZCBieSB0aGlzIHNlcnZlciBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtodHRwLkluY29taW5nTWVzc2FnZX0gcmVxIFJlcXVlc3Qgb2JqZWN0IHRvIGluc3BlY3RcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSByZXF1ZXN0IGlzIHZhbGlkLCBlbHNlIGBmYWxzZWBcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2hvdWxkSGFuZGxlKHJlcSkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMucGF0aCkge1xuICAgICAgY29uc3QgaW5kZXggPSByZXEudXJsLmluZGV4T2YoJz8nKTtcbiAgICAgIGNvbnN0IHBhdGhuYW1lID0gaW5kZXggIT09IC0xID8gcmVxLnVybC5zbGljZSgwLCBpbmRleCkgOiByZXEudXJsO1xuXG4gICAgICBpZiAocGF0aG5hbWUgIT09IHRoaXMub3B0aW9ucy5wYXRoKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGEgSFRUUCBVcGdyYWRlIHJlcXVlc3QuXG4gICAqXG4gICAqIEBwYXJhbSB7aHR0cC5JbmNvbWluZ01lc3NhZ2V9IHJlcSBUaGUgcmVxdWVzdCBvYmplY3RcbiAgICogQHBhcmFtIHtuZXQuU29ja2V0fSBzb2NrZXQgVGhlIG5ldHdvcmsgc29ja2V0IGJldHdlZW4gdGhlIHNlcnZlciBhbmQgY2xpZW50XG4gICAqIEBwYXJhbSB7QnVmZmVyfSBoZWFkIFRoZSBmaXJzdCBwYWNrZXQgb2YgdGhlIHVwZ3JhZGVkIHN0cmVhbVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICAgKiBAcHVibGljXG4gICAqL1xuICBoYW5kbGVVcGdyYWRlKHJlcSwgc29ja2V0LCBoZWFkLCBjYikge1xuICAgIHNvY2tldC5vbignZXJyb3InLCBzb2NrZXRPbkVycm9yKTtcblxuICAgIGNvbnN0IGtleSA9XG4gICAgICByZXEuaGVhZGVyc1snc2VjLXdlYnNvY2tldC1rZXknXSAhPT0gdW5kZWZpbmVkXG4gICAgICAgID8gcmVxLmhlYWRlcnNbJ3NlYy13ZWJzb2NrZXQta2V5J10udHJpbSgpXG4gICAgICAgIDogZmFsc2U7XG4gICAgY29uc3QgdmVyc2lvbiA9ICtyZXEuaGVhZGVyc1snc2VjLXdlYnNvY2tldC12ZXJzaW9uJ107XG4gICAgY29uc3QgZXh0ZW5zaW9ucyA9IHt9O1xuXG4gICAgaWYgKFxuICAgICAgcmVxLm1ldGhvZCAhPT0gJ0dFVCcgfHxcbiAgICAgIHJlcS5oZWFkZXJzLnVwZ3JhZGUudG9Mb3dlckNhc2UoKSAhPT0gJ3dlYnNvY2tldCcgfHxcbiAgICAgICFrZXkgfHxcbiAgICAgICFrZXlSZWdleC50ZXN0KGtleSkgfHxcbiAgICAgICh2ZXJzaW9uICE9PSA4ICYmIHZlcnNpb24gIT09IDEzKSB8fFxuICAgICAgIXRoaXMuc2hvdWxkSGFuZGxlKHJlcSlcbiAgICApIHtcbiAgICAgIHJldHVybiBhYm9ydEhhbmRzaGFrZShzb2NrZXQsIDQwMCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5wZXJNZXNzYWdlRGVmbGF0ZSkge1xuICAgICAgY29uc3QgcGVyTWVzc2FnZURlZmxhdGUgPSBuZXcgUGVyTWVzc2FnZURlZmxhdGUoXG4gICAgICAgIHRoaXMub3B0aW9ucy5wZXJNZXNzYWdlRGVmbGF0ZSxcbiAgICAgICAgdHJ1ZSxcbiAgICAgICAgdGhpcy5vcHRpb25zLm1heFBheWxvYWRcbiAgICAgICk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IG9mZmVycyA9IHBhcnNlKHJlcS5oZWFkZXJzWydzZWMtd2Vic29ja2V0LWV4dGVuc2lvbnMnXSk7XG5cbiAgICAgICAgaWYgKG9mZmVyc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXSkge1xuICAgICAgICAgIHBlck1lc3NhZ2VEZWZsYXRlLmFjY2VwdChvZmZlcnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0pO1xuICAgICAgICAgIGV4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0gPSBwZXJNZXNzYWdlRGVmbGF0ZTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldHVybiBhYm9ydEhhbmRzaGFrZShzb2NrZXQsIDQwMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBPcHRpb25hbGx5IGNhbGwgZXh0ZXJuYWwgY2xpZW50IHZlcmlmaWNhdGlvbiBoYW5kbGVyLlxuICAgIC8vXG4gICAgaWYgKHRoaXMub3B0aW9ucy52ZXJpZnlDbGllbnQpIHtcbiAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgIG9yaWdpbjpcbiAgICAgICAgICByZXEuaGVhZGVyc1tgJHt2ZXJzaW9uID09PSA4ID8gJ3NlYy13ZWJzb2NrZXQtb3JpZ2luJyA6ICdvcmlnaW4nfWBdLFxuICAgICAgICBzZWN1cmU6ICEhKHJlcS5zb2NrZXQuYXV0aG9yaXplZCB8fCByZXEuc29ja2V0LmVuY3J5cHRlZCksXG4gICAgICAgIHJlcVxuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy52ZXJpZnlDbGllbnQubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy52ZXJpZnlDbGllbnQoaW5mbywgKHZlcmlmaWVkLCBjb2RlLCBtZXNzYWdlLCBoZWFkZXJzKSA9PiB7XG4gICAgICAgICAgaWYgKCF2ZXJpZmllZCkge1xuICAgICAgICAgICAgcmV0dXJuIGFib3J0SGFuZHNoYWtlKHNvY2tldCwgY29kZSB8fCA0MDEsIG1lc3NhZ2UsIGhlYWRlcnMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuY29tcGxldGVVcGdyYWRlKGtleSwgZXh0ZW5zaW9ucywgcmVxLCBzb2NrZXQsIGhlYWQsIGNiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMudmVyaWZ5Q2xpZW50KGluZm8pKSByZXR1cm4gYWJvcnRIYW5kc2hha2Uoc29ja2V0LCA0MDEpO1xuICAgIH1cblxuICAgIHRoaXMuY29tcGxldGVVcGdyYWRlKGtleSwgZXh0ZW5zaW9ucywgcmVxLCBzb2NrZXQsIGhlYWQsIGNiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGdyYWRlIHRoZSBjb25uZWN0aW9uIHRvIFdlYlNvY2tldC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSBUaGUgdmFsdWUgb2YgdGhlIGBTZWMtV2ViU29ja2V0LUtleWAgaGVhZGVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBleHRlbnNpb25zIFRoZSBhY2NlcHRlZCBleHRlbnNpb25zXG4gICAqIEBwYXJhbSB7aHR0cC5JbmNvbWluZ01lc3NhZ2V9IHJlcSBUaGUgcmVxdWVzdCBvYmplY3RcbiAgICogQHBhcmFtIHtuZXQuU29ja2V0fSBzb2NrZXQgVGhlIG5ldHdvcmsgc29ja2V0IGJldHdlZW4gdGhlIHNlcnZlciBhbmQgY2xpZW50XG4gICAqIEBwYXJhbSB7QnVmZmVyfSBoZWFkIFRoZSBmaXJzdCBwYWNrZXQgb2YgdGhlIHVwZ3JhZGVkIHN0cmVhbVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgY2FsbGVkIG1vcmUgdGhhbiBvbmNlIHdpdGggdGhlIHNhbWUgc29ja2V0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjb21wbGV0ZVVwZ3JhZGUoa2V5LCBleHRlbnNpb25zLCByZXEsIHNvY2tldCwgaGVhZCwgY2IpIHtcbiAgICAvL1xuICAgIC8vIERlc3Ryb3kgdGhlIHNvY2tldCBpZiB0aGUgY2xpZW50IGhhcyBhbHJlYWR5IHNlbnQgYSBGSU4gcGFja2V0LlxuICAgIC8vXG4gICAgaWYgKCFzb2NrZXQucmVhZGFibGUgfHwgIXNvY2tldC53cml0YWJsZSkgcmV0dXJuIHNvY2tldC5kZXN0cm95KCk7XG5cbiAgICBpZiAoc29ja2V0W2tXZWJTb2NrZXRdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdzZXJ2ZXIuaGFuZGxlVXBncmFkZSgpIHdhcyBjYWxsZWQgbW9yZSB0aGFuIG9uY2Ugd2l0aCB0aGUgc2FtZSAnICtcbiAgICAgICAgICAnc29ja2V0LCBwb3NzaWJseSBkdWUgdG8gYSBtaXNjb25maWd1cmF0aW9uJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBkaWdlc3QgPSBjcmVhdGVIYXNoKCdzaGExJylcbiAgICAgIC51cGRhdGUoa2V5ICsgR1VJRClcbiAgICAgIC5kaWdlc3QoJ2Jhc2U2NCcpO1xuXG4gICAgY29uc3QgaGVhZGVycyA9IFtcbiAgICAgICdIVFRQLzEuMSAxMDEgU3dpdGNoaW5nIFByb3RvY29scycsXG4gICAgICAnVXBncmFkZTogd2Vic29ja2V0JyxcbiAgICAgICdDb25uZWN0aW9uOiBVcGdyYWRlJyxcbiAgICAgIGBTZWMtV2ViU29ja2V0LUFjY2VwdDogJHtkaWdlc3R9YFxuICAgIF07XG5cbiAgICBjb25zdCB3cyA9IG5ldyBXZWJTb2NrZXQobnVsbCk7XG4gICAgbGV0IHByb3RvY29sID0gcmVxLmhlYWRlcnNbJ3NlYy13ZWJzb2NrZXQtcHJvdG9jb2wnXTtcblxuICAgIGlmIChwcm90b2NvbCkge1xuICAgICAgcHJvdG9jb2wgPSBwcm90b2NvbC5zcGxpdCgnLCcpLm1hcCh0cmltKTtcblxuICAgICAgLy9cbiAgICAgIC8vIE9wdGlvbmFsbHkgY2FsbCBleHRlcm5hbCBwcm90b2NvbCBzZWxlY3Rpb24gaGFuZGxlci5cbiAgICAgIC8vXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmhhbmRsZVByb3RvY29scykge1xuICAgICAgICBwcm90b2NvbCA9IHRoaXMub3B0aW9ucy5oYW5kbGVQcm90b2NvbHMocHJvdG9jb2wsIHJlcSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm90b2NvbCA9IHByb3RvY29sWzBdO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJvdG9jb2wpIHtcbiAgICAgICAgaGVhZGVycy5wdXNoKGBTZWMtV2ViU29ja2V0LVByb3RvY29sOiAke3Byb3RvY29sfWApO1xuICAgICAgICB3cy5fcHJvdG9jb2wgPSBwcm90b2NvbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZXh0ZW5zaW9uc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXSkge1xuICAgICAgY29uc3QgcGFyYW1zID0gZXh0ZW5zaW9uc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXS5wYXJhbXM7XG4gICAgICBjb25zdCB2YWx1ZSA9IGZvcm1hdCh7XG4gICAgICAgIFtQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXTogW3BhcmFtc11cbiAgICAgIH0pO1xuICAgICAgaGVhZGVycy5wdXNoKGBTZWMtV2ViU29ja2V0LUV4dGVuc2lvbnM6ICR7dmFsdWV9YCk7XG4gICAgICB3cy5fZXh0ZW5zaW9ucyA9IGV4dGVuc2lvbnM7XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBBbGxvdyBleHRlcm5hbCBtb2RpZmljYXRpb24vaW5zcGVjdGlvbiBvZiBoYW5kc2hha2UgaGVhZGVycy5cbiAgICAvL1xuICAgIHRoaXMuZW1pdCgnaGVhZGVycycsIGhlYWRlcnMsIHJlcSk7XG5cbiAgICBzb2NrZXQud3JpdGUoaGVhZGVycy5jb25jYXQoJ1xcclxcbicpLmpvaW4oJ1xcclxcbicpKTtcbiAgICBzb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgc29ja2V0T25FcnJvcik7XG5cbiAgICB3cy5zZXRTb2NrZXQoc29ja2V0LCBoZWFkLCB0aGlzLm9wdGlvbnMubWF4UGF5bG9hZCk7XG5cbiAgICBpZiAodGhpcy5jbGllbnRzKSB7XG4gICAgICB0aGlzLmNsaWVudHMuYWRkKHdzKTtcbiAgICAgIHdzLm9uKCdjbG9zZScsICgpID0+IHRoaXMuY2xpZW50cy5kZWxldGUod3MpKTtcbiAgICB9XG5cbiAgICBjYih3cywgcmVxKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYlNvY2tldFNlcnZlcjtcblxuLyoqXG4gKiBBZGQgZXZlbnQgbGlzdGVuZXJzIG9uIGFuIGBFdmVudEVtaXR0ZXJgIHVzaW5nIGEgbWFwIG9mIDxldmVudCwgbGlzdGVuZXI+XG4gKiBwYWlycy5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gc2VydmVyIFRoZSBldmVudCBlbWl0dGVyXG4gKiBAcGFyYW0ge09iamVjdC48U3RyaW5nLCBGdW5jdGlvbj59IG1hcCBUaGUgbGlzdGVuZXJzIHRvIGFkZFxuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCB3aWxsIHJlbW92ZSB0aGUgYWRkZWQgbGlzdGVuZXJzIHdoZW5cbiAqICAgICBjYWxsZWRcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGFkZExpc3RlbmVycyhzZXJ2ZXIsIG1hcCkge1xuICBmb3IgKGNvbnN0IGV2ZW50IG9mIE9iamVjdC5rZXlzKG1hcCkpIHNlcnZlci5vbihldmVudCwgbWFwW2V2ZW50XSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVycygpIHtcbiAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIE9iamVjdC5rZXlzKG1hcCkpIHtcbiAgICAgIHNlcnZlci5yZW1vdmVMaXN0ZW5lcihldmVudCwgbWFwW2V2ZW50XSk7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIEVtaXQgYSBgJ2Nsb3NlJ2AgZXZlbnQgb24gYW4gYEV2ZW50RW1pdHRlcmAuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IHNlcnZlciBUaGUgZXZlbnQgZW1pdHRlclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZW1pdENsb3NlKHNlcnZlcikge1xuICBzZXJ2ZXIuZW1pdCgnY2xvc2UnKTtcbn1cblxuLyoqXG4gKiBIYW5kbGUgcHJlbWF0dXJlIHNvY2tldCBlcnJvcnMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc29ja2V0T25FcnJvcigpIHtcbiAgdGhpcy5kZXN0cm95KCk7XG59XG5cbi8qKlxuICogQ2xvc2UgdGhlIGNvbm5lY3Rpb24gd2hlbiBwcmVjb25kaXRpb25zIGFyZSBub3QgZnVsZmlsbGVkLlxuICpcbiAqIEBwYXJhbSB7bmV0LlNvY2tldH0gc29ja2V0IFRoZSBzb2NrZXQgb2YgdGhlIHVwZ3JhZGUgcmVxdWVzdFxuICogQHBhcmFtIHtOdW1iZXJ9IGNvZGUgVGhlIEhUVFAgcmVzcG9uc2Ugc3RhdHVzIGNvZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbWVzc2FnZV0gVGhlIEhUVFAgcmVzcG9uc2UgYm9keVxuICogQHBhcmFtIHtPYmplY3R9IFtoZWFkZXJzXSBBZGRpdGlvbmFsIEhUVFAgcmVzcG9uc2UgaGVhZGVyc1xuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYWJvcnRIYW5kc2hha2Uoc29ja2V0LCBjb2RlLCBtZXNzYWdlLCBoZWFkZXJzKSB7XG4gIGlmIChzb2NrZXQud3JpdGFibGUpIHtcbiAgICBtZXNzYWdlID0gbWVzc2FnZSB8fCBTVEFUVVNfQ09ERVNbY29kZV07XG4gICAgaGVhZGVycyA9IHtcbiAgICAgIENvbm5lY3Rpb246ICdjbG9zZScsXG4gICAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvaHRtbCcsXG4gICAgICAnQ29udGVudC1MZW5ndGgnOiBCdWZmZXIuYnl0ZUxlbmd0aChtZXNzYWdlKSxcbiAgICAgIC4uLmhlYWRlcnNcbiAgICB9O1xuXG4gICAgc29ja2V0LndyaXRlKFxuICAgICAgYEhUVFAvMS4xICR7Y29kZX0gJHtTVEFUVVNfQ09ERVNbY29kZV19XFxyXFxuYCArXG4gICAgICAgIE9iamVjdC5rZXlzKGhlYWRlcnMpXG4gICAgICAgICAgLm1hcCgoaCkgPT4gYCR7aH06ICR7aGVhZGVyc1toXX1gKVxuICAgICAgICAgIC5qb2luKCdcXHJcXG4nKSArXG4gICAgICAgICdcXHJcXG5cXHJcXG4nICtcbiAgICAgICAgbWVzc2FnZVxuICAgICk7XG4gIH1cblxuICBzb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgc29ja2V0T25FcnJvcik7XG4gIHNvY2tldC5kZXN0cm95KCk7XG59XG5cbi8qKlxuICogUmVtb3ZlIHdoaXRlc3BhY2UgY2hhcmFjdGVycyBmcm9tIGJvdGggZW5kcyBvZiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmdcbiAqIEByZXR1cm4ge1N0cmluZ30gQSBuZXcgc3RyaW5nIHJlcHJlc2VudGluZyBgc3RyYCBzdHJpcHBlZCBvZiB3aGl0ZXNwYWNlXG4gKiAgICAgY2hhcmFjdGVycyBmcm9tIGJvdGggaXRzIGJlZ2lubmluZyBhbmQgZW5kXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnRyaW0oKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJyk7XG5jb25zdCBodHRwcyA9IHJlcXVpcmUoJ2h0dHBzJyk7XG5jb25zdCBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xuY29uc3QgbmV0ID0gcmVxdWlyZSgnbmV0Jyk7XG5jb25zdCB0bHMgPSByZXF1aXJlKCd0bHMnKTtcbmNvbnN0IHsgcmFuZG9tQnl0ZXMsIGNyZWF0ZUhhc2ggfSA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuY29uc3QgeyBVUkwgfSA9IHJlcXVpcmUoJ3VybCcpO1xuXG5jb25zdCBQZXJNZXNzYWdlRGVmbGF0ZSA9IHJlcXVpcmUoJy4vcGVybWVzc2FnZS1kZWZsYXRlJyk7XG5jb25zdCBSZWNlaXZlciA9IHJlcXVpcmUoJy4vcmVjZWl2ZXInKTtcbmNvbnN0IFNlbmRlciA9IHJlcXVpcmUoJy4vc2VuZGVyJyk7XG5jb25zdCB7XG4gIEJJTkFSWV9UWVBFUyxcbiAgRU1QVFlfQlVGRkVSLFxuICBHVUlELFxuICBrU3RhdHVzQ29kZSxcbiAga1dlYlNvY2tldCxcbiAgTk9PUFxufSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5jb25zdCB7IGFkZEV2ZW50TGlzdGVuZXIsIHJlbW92ZUV2ZW50TGlzdGVuZXIgfSA9IHJlcXVpcmUoJy4vZXZlbnQtdGFyZ2V0Jyk7XG5jb25zdCB7IGZvcm1hdCwgcGFyc2UgfSA9IHJlcXVpcmUoJy4vZXh0ZW5zaW9uJyk7XG5jb25zdCB7IHRvQnVmZmVyIH0gPSByZXF1aXJlKCcuL2J1ZmZlci11dGlsJyk7XG5cbmNvbnN0IHJlYWR5U3RhdGVzID0gWydDT05ORUNUSU5HJywgJ09QRU4nLCAnQ0xPU0lORycsICdDTE9TRUQnXTtcbmNvbnN0IHByb3RvY29sVmVyc2lvbnMgPSBbOCwgMTNdO1xuY29uc3QgY2xvc2VUaW1lb3V0ID0gMzAgKiAxMDAwO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIFdlYlNvY2tldC5cbiAqXG4gKiBAZXh0ZW5kcyBFdmVudEVtaXR0ZXJcbiAqL1xuY2xhc3MgV2ViU29ja2V0IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBgV2ViU29ja2V0YC5cbiAgICpcbiAgICogQHBhcmFtIHsoU3RyaW5nfHVybC5VUkwpfSBhZGRyZXNzIFRoZSBVUkwgdG8gd2hpY2ggdG8gY29ubmVjdFxuICAgKiBAcGFyYW0geyhTdHJpbmd8U3RyaW5nW10pfSBbcHJvdG9jb2xzXSBUaGUgc3VicHJvdG9jb2xzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gQ29ubmVjdGlvbiBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGRyZXNzLCBwcm90b2NvbHMsIG9wdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fYmluYXJ5VHlwZSA9IEJJTkFSWV9UWVBFU1swXTtcbiAgICB0aGlzLl9jbG9zZUNvZGUgPSAxMDA2O1xuICAgIHRoaXMuX2Nsb3NlRnJhbWVSZWNlaXZlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2Nsb3NlRnJhbWVTZW50ID0gZmFsc2U7XG4gICAgdGhpcy5fY2xvc2VNZXNzYWdlID0gJyc7XG4gICAgdGhpcy5fY2xvc2VUaW1lciA9IG51bGw7XG4gICAgdGhpcy5fZXh0ZW5zaW9ucyA9IHt9O1xuICAgIHRoaXMuX3Byb3RvY29sID0gJyc7XG4gICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DT05ORUNUSU5HO1xuICAgIHRoaXMuX3JlY2VpdmVyID0gbnVsbDtcbiAgICB0aGlzLl9zZW5kZXIgPSBudWxsO1xuICAgIHRoaXMuX3NvY2tldCA9IG51bGw7XG5cbiAgICBpZiAoYWRkcmVzcyAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fYnVmZmVyZWRBbW91bnQgPSAwO1xuICAgICAgdGhpcy5faXNTZXJ2ZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3JlZGlyZWN0cyA9IDA7XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3RvY29scykpIHtcbiAgICAgICAgcHJvdG9jb2xzID0gcHJvdG9jb2xzLmpvaW4oJywgJyk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcm90b2NvbHMgPT09ICdvYmplY3QnICYmIHByb3RvY29scyAhPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0gcHJvdG9jb2xzO1xuICAgICAgICBwcm90b2NvbHMgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGluaXRBc0NsaWVudCh0aGlzLCBhZGRyZXNzLCBwcm90b2NvbHMsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pc1NlcnZlciA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZGV2aWF0ZXMgZnJvbSB0aGUgV0hBVFdHIGludGVyZmFjZSBzaW5jZSB3cyBkb2Vzbid0IHN1cHBvcnQgdGhlXG4gICAqIHJlcXVpcmVkIGRlZmF1bHQgXCJibG9iXCIgdHlwZSAoaW5zdGVhZCB3ZSBkZWZpbmUgYSBjdXN0b20gXCJub2RlYnVmZmVyXCJcbiAgICogdHlwZSkuXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgYmluYXJ5VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5VHlwZTtcbiAgfVxuXG4gIHNldCBiaW5hcnlUeXBlKHR5cGUpIHtcbiAgICBpZiAoIUJJTkFSWV9UWVBFUy5pbmNsdWRlcyh0eXBlKSkgcmV0dXJuO1xuXG4gICAgdGhpcy5fYmluYXJ5VHlwZSA9IHR5cGU7XG5cbiAgICAvL1xuICAgIC8vIEFsbG93IHRvIGNoYW5nZSBgYmluYXJ5VHlwZWAgb24gdGhlIGZseS5cbiAgICAvL1xuICAgIGlmICh0aGlzLl9yZWNlaXZlcikgdGhpcy5fcmVjZWl2ZXIuX2JpbmFyeVR5cGUgPSB0eXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBnZXQgYnVmZmVyZWRBbW91bnQoKSB7XG4gICAgaWYgKCF0aGlzLl9zb2NrZXQpIHJldHVybiB0aGlzLl9idWZmZXJlZEFtb3VudDtcblxuICAgIHJldHVybiB0aGlzLl9zb2NrZXQuX3dyaXRhYmxlU3RhdGUubGVuZ3RoICsgdGhpcy5fc2VuZGVyLl9idWZmZXJlZEJ5dGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgZXh0ZW5zaW9ucygpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fZXh0ZW5zaW9ucykuam9pbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgcHJvdG9jb2woKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb3RvY29sO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBnZXQgcmVhZHlTdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVhZHlTdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0IHVybCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB1cCB0aGUgc29ja2V0IGFuZCB0aGUgaW50ZXJuYWwgcmVzb3VyY2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge25ldC5Tb2NrZXR9IHNvY2tldCBUaGUgbmV0d29yayBzb2NrZXQgYmV0d2VlbiB0aGUgc2VydmVyIGFuZCBjbGllbnRcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGhlYWQgVGhlIGZpcnN0IHBhY2tldCBvZiB0aGUgdXBncmFkZWQgc3RyZWFtXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbWF4UGF5bG9hZD0wXSBUaGUgbWF4aW11bSBhbGxvd2VkIG1lc3NhZ2Ugc2l6ZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2V0U29ja2V0KHNvY2tldCwgaGVhZCwgbWF4UGF5bG9hZCkge1xuICAgIGNvbnN0IHJlY2VpdmVyID0gbmV3IFJlY2VpdmVyKFxuICAgICAgdGhpcy5iaW5hcnlUeXBlLFxuICAgICAgdGhpcy5fZXh0ZW5zaW9ucyxcbiAgICAgIHRoaXMuX2lzU2VydmVyLFxuICAgICAgbWF4UGF5bG9hZFxuICAgICk7XG5cbiAgICB0aGlzLl9zZW5kZXIgPSBuZXcgU2VuZGVyKHNvY2tldCwgdGhpcy5fZXh0ZW5zaW9ucyk7XG4gICAgdGhpcy5fcmVjZWl2ZXIgPSByZWNlaXZlcjtcbiAgICB0aGlzLl9zb2NrZXQgPSBzb2NrZXQ7XG5cbiAgICByZWNlaXZlcltrV2ViU29ja2V0XSA9IHRoaXM7XG4gICAgc29ja2V0W2tXZWJTb2NrZXRdID0gdGhpcztcblxuICAgIHJlY2VpdmVyLm9uKCdjb25jbHVkZScsIHJlY2VpdmVyT25Db25jbHVkZSk7XG4gICAgcmVjZWl2ZXIub24oJ2RyYWluJywgcmVjZWl2ZXJPbkRyYWluKTtcbiAgICByZWNlaXZlci5vbignZXJyb3InLCByZWNlaXZlck9uRXJyb3IpO1xuICAgIHJlY2VpdmVyLm9uKCdtZXNzYWdlJywgcmVjZWl2ZXJPbk1lc3NhZ2UpO1xuICAgIHJlY2VpdmVyLm9uKCdwaW5nJywgcmVjZWl2ZXJPblBpbmcpO1xuICAgIHJlY2VpdmVyLm9uKCdwb25nJywgcmVjZWl2ZXJPblBvbmcpO1xuXG4gICAgc29ja2V0LnNldFRpbWVvdXQoMCk7XG4gICAgc29ja2V0LnNldE5vRGVsYXkoKTtcblxuICAgIGlmIChoZWFkLmxlbmd0aCA+IDApIHNvY2tldC51bnNoaWZ0KGhlYWQpO1xuXG4gICAgc29ja2V0Lm9uKCdjbG9zZScsIHNvY2tldE9uQ2xvc2UpO1xuICAgIHNvY2tldC5vbignZGF0YScsIHNvY2tldE9uRGF0YSk7XG4gICAgc29ja2V0Lm9uKCdlbmQnLCBzb2NrZXRPbkVuZCk7XG4gICAgc29ja2V0Lm9uKCdlcnJvcicsIHNvY2tldE9uRXJyb3IpO1xuXG4gICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5PUEVOO1xuICAgIHRoaXMuZW1pdCgnb3BlbicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXQgdGhlIGAnY2xvc2UnYCBldmVudC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGVtaXRDbG9zZSgpIHtcbiAgICBpZiAoIXRoaXMuX3NvY2tldCkge1xuICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TRUQ7XG4gICAgICB0aGlzLmVtaXQoJ2Nsb3NlJywgdGhpcy5fY2xvc2VDb2RlLCB0aGlzLl9jbG9zZU1lc3NhZ2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9leHRlbnNpb25zW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdKSB7XG4gICAgICB0aGlzLl9leHRlbnNpb25zW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdLmNsZWFudXAoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9yZWNlaXZlci5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLl9yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNMT1NFRDtcbiAgICB0aGlzLmVtaXQoJ2Nsb3NlJywgdGhpcy5fY2xvc2VDb2RlLCB0aGlzLl9jbG9zZU1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IGEgY2xvc2luZyBoYW5kc2hha2UuXG4gICAqXG4gICAqICAgICAgICAgICstLS0tLS0tLS0tKyAgICstLS0tLS0tLS0tLSsgICArLS0tLS0tLS0tLStcbiAgICogICAgIC0gLSAtfHdzLmNsb3NlKCl8LS0+fGNsb3NlIGZyYW1lfC0tPnx3cy5jbG9zZSgpfC0gLSAtXG4gICAqICAgIHwgICAgICstLS0tLS0tLS0tKyAgICstLS0tLS0tLS0tLSsgICArLS0tLS0tLS0tLSsgICAgIHxcbiAgICogICAgICAgICAgKy0tLS0tLS0tLS0rICAgKy0tLS0tLS0tLS0tKyAgICAgICAgIHxcbiAgICogQ0xPU0lORyAgfHdzLmNsb3NlKCl8PC0tfGNsb3NlIGZyYW1lfDwtLSstLS0tLSsgICAgICAgQ0xPU0lOR1xuICAgKiAgICAgICAgICArLS0tLS0tLS0tLSsgICArLS0tLS0tLS0tLS0rICAgfFxuICAgKiAgICB8ICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgfCAgICstLS0rICAgICAgICB8XG4gICAqICAgICAgICAgICAgICAgICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0+fGZpbnwgLSAtIC0gLVxuICAgKiAgICB8ICAgICAgICAgKy0tLSsgICAgICAgICAgICAgICAgICAgICAgfCAgICstLS0rXG4gICAqICAgICAtIC0gLSAtIC18ZmlufDwtLS0tLS0tLS0tLS0tLS0tLS0tLS0rXG4gICAqICAgICAgICAgICAgICArLS0tK1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2NvZGVdIFN0YXR1cyBjb2RlIGV4cGxhaW5pbmcgd2h5IHRoZSBjb25uZWN0aW9uIGlzIGNsb3NpbmdcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtkYXRhXSBBIHN0cmluZyBleHBsYWluaW5nIHdoeSB0aGUgY29ubmVjdGlvbiBpcyBjbG9zaW5nXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNsb3NlKGNvZGUsIGRhdGEpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ0xPU0VEKSByZXR1cm47XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNPTk5FQ1RJTkcpIHtcbiAgICAgIGNvbnN0IG1zZyA9ICdXZWJTb2NrZXQgd2FzIGNsb3NlZCBiZWZvcmUgdGhlIGNvbm5lY3Rpb24gd2FzIGVzdGFibGlzaGVkJztcbiAgICAgIHJldHVybiBhYm9ydEhhbmRzaGFrZSh0aGlzLCB0aGlzLl9yZXEsIG1zZyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNMT1NJTkcpIHtcbiAgICAgIGlmICh0aGlzLl9jbG9zZUZyYW1lU2VudCAmJiB0aGlzLl9jbG9zZUZyYW1lUmVjZWl2ZWQpIHRoaXMuX3NvY2tldC5lbmQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNMT1NJTkc7XG4gICAgdGhpcy5fc2VuZGVyLmNsb3NlKGNvZGUsIGRhdGEsICF0aGlzLl9pc1NlcnZlciwgKGVycikgPT4ge1xuICAgICAgLy9cbiAgICAgIC8vIFRoaXMgZXJyb3IgaXMgaGFuZGxlZCBieSB0aGUgYCdlcnJvcidgIGxpc3RlbmVyIG9uIHRoZSBzb2NrZXQuIFdlIG9ubHlcbiAgICAgIC8vIHdhbnQgdG8ga25vdyBpZiB0aGUgY2xvc2UgZnJhbWUgaGFzIGJlZW4gc2VudCBoZXJlLlxuICAgICAgLy9cbiAgICAgIGlmIChlcnIpIHJldHVybjtcblxuICAgICAgdGhpcy5fY2xvc2VGcmFtZVNlbnQgPSB0cnVlO1xuICAgICAgaWYgKHRoaXMuX2Nsb3NlRnJhbWVSZWNlaXZlZCkgdGhpcy5fc29ja2V0LmVuZCgpO1xuICAgIH0pO1xuXG4gICAgLy9cbiAgICAvLyBTcGVjaWZ5IGEgdGltZW91dCBmb3IgdGhlIGNsb3NpbmcgaGFuZHNoYWtlIHRvIGNvbXBsZXRlLlxuICAgIC8vXG4gICAgdGhpcy5fY2xvc2VUaW1lciA9IHNldFRpbWVvdXQoXG4gICAgICB0aGlzLl9zb2NrZXQuZGVzdHJveS5iaW5kKHRoaXMuX3NvY2tldCksXG4gICAgICBjbG9zZVRpbWVvdXRcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgYSBwaW5nLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IFtkYXRhXSBUaGUgZGF0YSB0byBzZW5kXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW21hc2tdIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCB0byBtYXNrIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdIENhbGxiYWNrIHdoaWNoIGlzIGV4ZWN1dGVkIHdoZW4gdGhlIHBpbmcgaXMgc2VudFxuICAgKiBAcHVibGljXG4gICAqL1xuICBwaW5nKGRhdGEsIG1hc2ssIGNiKSB7XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNPTk5FQ1RJTkcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2ViU29ja2V0IGlzIG5vdCBvcGVuOiByZWFkeVN0YXRlIDAgKENPTk5FQ1RJTkcpJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYiA9IGRhdGE7XG4gICAgICBkYXRhID0gbWFzayA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtYXNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYiA9IG1hc2s7XG4gICAgICBtYXNrID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ251bWJlcicpIGRhdGEgPSBkYXRhLnRvU3RyaW5nKCk7XG5cbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlICE9PSBXZWJTb2NrZXQuT1BFTikge1xuICAgICAgc2VuZEFmdGVyQ2xvc2UodGhpcywgZGF0YSwgY2IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChtYXNrID09PSB1bmRlZmluZWQpIG1hc2sgPSAhdGhpcy5faXNTZXJ2ZXI7XG4gICAgdGhpcy5fc2VuZGVyLnBpbmcoZGF0YSB8fCBFTVBUWV9CVUZGRVIsIG1hc2ssIGNiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgcG9uZy5cbiAgICpcbiAgICogQHBhcmFtIHsqfSBbZGF0YV0gVGhlIGRhdGEgdG8gc2VuZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFttYXNrXSBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdG8gbWFzayBgZGF0YWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXSBDYWxsYmFjayB3aGljaCBpcyBleGVjdXRlZCB3aGVuIHRoZSBwb25nIGlzIHNlbnRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgcG9uZyhkYXRhLCBtYXNrLCBjYikge1xuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DT05ORUNUSU5HKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYlNvY2tldCBpcyBub3Qgb3BlbjogcmVhZHlTdGF0ZSAwIChDT05ORUNUSU5HKScpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2IgPSBkYXRhO1xuICAgICAgZGF0YSA9IG1hc2sgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbWFzayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2IgPSBtYXNrO1xuICAgICAgbWFzayA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdudW1iZXInKSBkYXRhID0gZGF0YS50b1N0cmluZygpO1xuXG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSAhPT0gV2ViU29ja2V0Lk9QRU4pIHtcbiAgICAgIHNlbmRBZnRlckNsb3NlKHRoaXMsIGRhdGEsIGNiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobWFzayA9PT0gdW5kZWZpbmVkKSBtYXNrID0gIXRoaXMuX2lzU2VydmVyO1xuICAgIHRoaXMuX3NlbmRlci5wb25nKGRhdGEgfHwgRU1QVFlfQlVGRkVSLCBtYXNrLCBjYik7XG4gIH1cblxuICAvKipcbiAgICogU2VuZCBhIGRhdGEgbWVzc2FnZS5cbiAgICpcbiAgICogQHBhcmFtIHsqfSBkYXRhIFRoZSBtZXNzYWdlIHRvIHNlbmRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBPcHRpb25zIG9iamVjdFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNvbXByZXNzXSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gY29tcHJlc3NcbiAgICogICAgIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmJpbmFyeV0gU3BlY2lmaWVzIHdoZXRoZXIgYGRhdGFgIGlzIGJpbmFyeSBvclxuICAgKiAgICAgdGV4dFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmZpbj10cnVlXSBTcGVjaWZpZXMgd2hldGhlciB0aGUgZnJhZ21lbnQgaXMgdGhlXG4gICAqICAgICBsYXN0IG9uZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1hc2tdIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBtYXNrIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdIENhbGxiYWNrIHdoaWNoIGlzIGV4ZWN1dGVkIHdoZW4gZGF0YSBpcyB3cml0dGVuIG91dFxuICAgKiBAcHVibGljXG4gICAqL1xuICBzZW5kKGRhdGEsIG9wdGlvbnMsIGNiKSB7XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNPTk5FQ1RJTkcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2ViU29ja2V0IGlzIG5vdCBvcGVuOiByZWFkeVN0YXRlIDAgKENPTk5FQ1RJTkcpJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYiA9IG9wdGlvbnM7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnbnVtYmVyJykgZGF0YSA9IGRhdGEudG9TdHJpbmcoKTtcblxuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgIT09IFdlYlNvY2tldC5PUEVOKSB7XG4gICAgICBzZW5kQWZ0ZXJDbG9zZSh0aGlzLCBkYXRhLCBjYik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0cyA9IHtcbiAgICAgIGJpbmFyeTogdHlwZW9mIGRhdGEgIT09ICdzdHJpbmcnLFxuICAgICAgbWFzazogIXRoaXMuX2lzU2VydmVyLFxuICAgICAgY29tcHJlc3M6IHRydWUsXG4gICAgICBmaW46IHRydWUsXG4gICAgICAuLi5vcHRpb25zXG4gICAgfTtcblxuICAgIGlmICghdGhpcy5fZXh0ZW5zaW9uc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXSkge1xuICAgICAgb3B0cy5jb21wcmVzcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuX3NlbmRlci5zZW5kKGRhdGEgfHwgRU1QVFlfQlVGRkVSLCBvcHRzLCBjYik7XG4gIH1cblxuICAvKipcbiAgICogRm9yY2libHkgY2xvc2UgdGhlIGNvbm5lY3Rpb24uXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHRlcm1pbmF0ZSgpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ0xPU0VEKSByZXR1cm47XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNPTk5FQ1RJTkcpIHtcbiAgICAgIGNvbnN0IG1zZyA9ICdXZWJTb2NrZXQgd2FzIGNsb3NlZCBiZWZvcmUgdGhlIGNvbm5lY3Rpb24gd2FzIGVzdGFibGlzaGVkJztcbiAgICAgIHJldHVybiBhYm9ydEhhbmRzaGFrZSh0aGlzLCB0aGlzLl9yZXEsIG1zZyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3NvY2tldCkge1xuICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TSU5HO1xuICAgICAgdGhpcy5fc29ja2V0LmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cbn1cblxucmVhZHlTdGF0ZXMuZm9yRWFjaCgocmVhZHlTdGF0ZSwgaSkgPT4ge1xuICBjb25zdCBkZXNjcmlwdG9yID0geyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogaSB9O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXZWJTb2NrZXQucHJvdG90eXBlLCByZWFkeVN0YXRlLCBkZXNjcmlwdG9yKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdlYlNvY2tldCwgcmVhZHlTdGF0ZSwgZGVzY3JpcHRvcik7XG59KTtcblxuW1xuICAnYmluYXJ5VHlwZScsXG4gICdidWZmZXJlZEFtb3VudCcsXG4gICdleHRlbnNpb25zJyxcbiAgJ3Byb3RvY29sJyxcbiAgJ3JlYWR5U3RhdGUnLFxuICAndXJsJ1xuXS5mb3JFYWNoKChwcm9wZXJ0eSkgPT4ge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV2ViU29ja2V0LnByb3RvdHlwZSwgcHJvcGVydHksIHsgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbn0pO1xuXG4vL1xuLy8gQWRkIHRoZSBgb25vcGVuYCwgYG9uZXJyb3JgLCBgb25jbG9zZWAsIGFuZCBgb25tZXNzYWdlYCBhdHRyaWJ1dGVzLlxuLy8gU2VlIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2NvbW1zLmh0bWwjdGhlLXdlYnNvY2tldC1pbnRlcmZhY2Vcbi8vXG5bJ29wZW4nLCAnZXJyb3InLCAnY2xvc2UnLCAnbWVzc2FnZSddLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV2ViU29ja2V0LnByb3RvdHlwZSwgYG9uJHttZXRob2R9YCwge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgbGlzdGVuZXIgb2YgdGhlIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7KEZ1bmN0aW9ufHVuZGVmaW5lZCl9IFRoZSBldmVudCBsaXN0ZW5lciBvciBgdW5kZWZpbmVkYFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBnZXQoKSB7XG4gICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVycyhtZXRob2QpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGxpc3RlbmVyc1tpXS5fbGlzdGVuZXIpIHJldHVybiBsaXN0ZW5lcnNbaV0uX2xpc3RlbmVyO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQWRkIGEgbGlzdGVuZXIgZm9yIHRoZSBldmVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIFRoZSBsaXN0ZW5lciB0byBhZGRcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgc2V0KGxpc3RlbmVyKSB7XG4gICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVycyhtZXRob2QpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gUmVtb3ZlIG9ubHkgdGhlIGxpc3RlbmVycyBhZGRlZCB2aWEgYGFkZEV2ZW50TGlzdGVuZXJgLlxuICAgICAgICAvL1xuICAgICAgICBpZiAobGlzdGVuZXJzW2ldLl9saXN0ZW5lcikgdGhpcy5yZW1vdmVMaXN0ZW5lcihtZXRob2QsIGxpc3RlbmVyc1tpXSk7XG4gICAgICB9XG4gICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIobWV0aG9kLCBsaXN0ZW5lcik7XG4gICAgfVxuICB9KTtcbn0pO1xuXG5XZWJTb2NrZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBhZGRFdmVudExpc3RlbmVyO1xuV2ViU29ja2V0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gcmVtb3ZlRXZlbnRMaXN0ZW5lcjtcblxubW9kdWxlLmV4cG9ydHMgPSBXZWJTb2NrZXQ7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIFdlYlNvY2tldCBjbGllbnQuXG4gKlxuICogQHBhcmFtIHtXZWJTb2NrZXR9IHdlYnNvY2tldCBUaGUgY2xpZW50IHRvIGluaXRpYWxpemVcbiAqIEBwYXJhbSB7KFN0cmluZ3x1cmwuVVJMKX0gYWRkcmVzcyBUaGUgVVJMIHRvIHdoaWNoIHRvIGNvbm5lY3RcbiAqIEBwYXJhbSB7U3RyaW5nfSBbcHJvdG9jb2xzXSBUaGUgc3VicHJvdG9jb2xzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIENvbm5lY3Rpb24gb3B0aW9uc1xuICogQHBhcmFtIHsoQm9vbGVhbnxPYmplY3QpfSBbb3B0aW9ucy5wZXJNZXNzYWdlRGVmbGF0ZT10cnVlXSBFbmFibGUvZGlzYWJsZVxuICogICAgIHBlcm1lc3NhZ2UtZGVmbGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmhhbmRzaGFrZVRpbWVvdXRdIFRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGVcbiAqICAgICBoYW5kc2hha2UgcmVxdWVzdFxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnByb3RvY29sVmVyc2lvbj0xM10gVmFsdWUgb2YgdGhlXG4gKiAgICAgYFNlYy1XZWJTb2NrZXQtVmVyc2lvbmAgaGVhZGVyXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMub3JpZ2luXSBWYWx1ZSBvZiB0aGUgYE9yaWdpbmAgb3JcbiAqICAgICBgU2VjLVdlYlNvY2tldC1PcmlnaW5gIGhlYWRlclxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heFBheWxvYWQ9MTA0ODU3NjAwXSBUaGUgbWF4aW11bSBhbGxvd2VkIG1lc3NhZ2VcbiAqICAgICBzaXplXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmZvbGxvd1JlZGlyZWN0cz1mYWxzZV0gV2hldGhlciBvciBub3QgdG8gZm9sbG93XG4gKiAgICAgcmVkaXJlY3RzXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4UmVkaXJlY3RzPTEwXSBUaGUgbWF4aW11bSBudW1iZXIgb2YgcmVkaXJlY3RzXG4gKiAgICAgYWxsb3dlZFxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaW5pdEFzQ2xpZW50KHdlYnNvY2tldCwgYWRkcmVzcywgcHJvdG9jb2xzLCBvcHRpb25zKSB7XG4gIGNvbnN0IG9wdHMgPSB7XG4gICAgcHJvdG9jb2xWZXJzaW9uOiBwcm90b2NvbFZlcnNpb25zWzFdLFxuICAgIG1heFBheWxvYWQ6IDEwMCAqIDEwMjQgKiAxMDI0LFxuICAgIHBlck1lc3NhZ2VEZWZsYXRlOiB0cnVlLFxuICAgIGZvbGxvd1JlZGlyZWN0czogZmFsc2UsXG4gICAgbWF4UmVkaXJlY3RzOiAxMCxcbiAgICAuLi5vcHRpb25zLFxuICAgIGNyZWF0ZUNvbm5lY3Rpb246IHVuZGVmaW5lZCxcbiAgICBzb2NrZXRQYXRoOiB1bmRlZmluZWQsXG4gICAgaG9zdG5hbWU6IHVuZGVmaW5lZCxcbiAgICBwcm90b2NvbDogdW5kZWZpbmVkLFxuICAgIHRpbWVvdXQ6IHVuZGVmaW5lZCxcbiAgICBtZXRob2Q6IHVuZGVmaW5lZCxcbiAgICBob3N0OiB1bmRlZmluZWQsXG4gICAgcGF0aDogdW5kZWZpbmVkLFxuICAgIHBvcnQ6IHVuZGVmaW5lZFxuICB9O1xuXG4gIGlmICghcHJvdG9jb2xWZXJzaW9ucy5pbmNsdWRlcyhvcHRzLnByb3RvY29sVmVyc2lvbikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcbiAgICAgIGBVbnN1cHBvcnRlZCBwcm90b2NvbCB2ZXJzaW9uOiAke29wdHMucHJvdG9jb2xWZXJzaW9ufSBgICtcbiAgICAgICAgYChzdXBwb3J0ZWQgdmVyc2lvbnM6ICR7cHJvdG9jb2xWZXJzaW9ucy5qb2luKCcsICcpfSlgXG4gICAgKTtcbiAgfVxuXG4gIGxldCBwYXJzZWRVcmw7XG5cbiAgaWYgKGFkZHJlc3MgaW5zdGFuY2VvZiBVUkwpIHtcbiAgICBwYXJzZWRVcmwgPSBhZGRyZXNzO1xuICAgIHdlYnNvY2tldC5fdXJsID0gYWRkcmVzcy5ocmVmO1xuICB9IGVsc2Uge1xuICAgIHBhcnNlZFVybCA9IG5ldyBVUkwoYWRkcmVzcyk7XG4gICAgd2Vic29ja2V0Ll91cmwgPSBhZGRyZXNzO1xuICB9XG5cbiAgY29uc3QgaXNVbml4U29ja2V0ID0gcGFyc2VkVXJsLnByb3RvY29sID09PSAnd3MrdW5peDonO1xuXG4gIGlmICghcGFyc2VkVXJsLmhvc3QgJiYgKCFpc1VuaXhTb2NrZXQgfHwgIXBhcnNlZFVybC5wYXRobmFtZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgVVJMOiAke3dlYnNvY2tldC51cmx9YCk7XG4gIH1cblxuICBjb25zdCBpc1NlY3VyZSA9XG4gICAgcGFyc2VkVXJsLnByb3RvY29sID09PSAnd3NzOicgfHwgcGFyc2VkVXJsLnByb3RvY29sID09PSAnaHR0cHM6JztcbiAgY29uc3QgZGVmYXVsdFBvcnQgPSBpc1NlY3VyZSA/IDQ0MyA6IDgwO1xuICBjb25zdCBrZXkgPSByYW5kb21CeXRlcygxNikudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICBjb25zdCBnZXQgPSBpc1NlY3VyZSA/IGh0dHBzLmdldCA6IGh0dHAuZ2V0O1xuICBsZXQgcGVyTWVzc2FnZURlZmxhdGU7XG5cbiAgb3B0cy5jcmVhdGVDb25uZWN0aW9uID0gaXNTZWN1cmUgPyB0bHNDb25uZWN0IDogbmV0Q29ubmVjdDtcbiAgb3B0cy5kZWZhdWx0UG9ydCA9IG9wdHMuZGVmYXVsdFBvcnQgfHwgZGVmYXVsdFBvcnQ7XG4gIG9wdHMucG9ydCA9IHBhcnNlZFVybC5wb3J0IHx8IGRlZmF1bHRQb3J0O1xuICBvcHRzLmhvc3QgPSBwYXJzZWRVcmwuaG9zdG5hbWUuc3RhcnRzV2l0aCgnWycpXG4gICAgPyBwYXJzZWRVcmwuaG9zdG5hbWUuc2xpY2UoMSwgLTEpXG4gICAgOiBwYXJzZWRVcmwuaG9zdG5hbWU7XG4gIG9wdHMuaGVhZGVycyA9IHtcbiAgICAnU2VjLVdlYlNvY2tldC1WZXJzaW9uJzogb3B0cy5wcm90b2NvbFZlcnNpb24sXG4gICAgJ1NlYy1XZWJTb2NrZXQtS2V5Jzoga2V5LFxuICAgIENvbm5lY3Rpb246ICdVcGdyYWRlJyxcbiAgICBVcGdyYWRlOiAnd2Vic29ja2V0JyxcbiAgICAuLi5vcHRzLmhlYWRlcnNcbiAgfTtcbiAgb3B0cy5wYXRoID0gcGFyc2VkVXJsLnBhdGhuYW1lICsgcGFyc2VkVXJsLnNlYXJjaDtcbiAgb3B0cy50aW1lb3V0ID0gb3B0cy5oYW5kc2hha2VUaW1lb3V0O1xuXG4gIGlmIChvcHRzLnBlck1lc3NhZ2VEZWZsYXRlKSB7XG4gICAgcGVyTWVzc2FnZURlZmxhdGUgPSBuZXcgUGVyTWVzc2FnZURlZmxhdGUoXG4gICAgICBvcHRzLnBlck1lc3NhZ2VEZWZsYXRlICE9PSB0cnVlID8gb3B0cy5wZXJNZXNzYWdlRGVmbGF0ZSA6IHt9LFxuICAgICAgZmFsc2UsXG4gICAgICBvcHRzLm1heFBheWxvYWRcbiAgICApO1xuICAgIG9wdHMuaGVhZGVyc1snU2VjLVdlYlNvY2tldC1FeHRlbnNpb25zJ10gPSBmb3JtYXQoe1xuICAgICAgW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdOiBwZXJNZXNzYWdlRGVmbGF0ZS5vZmZlcigpXG4gICAgfSk7XG4gIH1cbiAgaWYgKHByb3RvY29scykge1xuICAgIG9wdHMuaGVhZGVyc1snU2VjLVdlYlNvY2tldC1Qcm90b2NvbCddID0gcHJvdG9jb2xzO1xuICB9XG4gIGlmIChvcHRzLm9yaWdpbikge1xuICAgIGlmIChvcHRzLnByb3RvY29sVmVyc2lvbiA8IDEzKSB7XG4gICAgICBvcHRzLmhlYWRlcnNbJ1NlYy1XZWJTb2NrZXQtT3JpZ2luJ10gPSBvcHRzLm9yaWdpbjtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0cy5oZWFkZXJzLk9yaWdpbiA9IG9wdHMub3JpZ2luO1xuICAgIH1cbiAgfVxuICBpZiAocGFyc2VkVXJsLnVzZXJuYW1lIHx8IHBhcnNlZFVybC5wYXNzd29yZCkge1xuICAgIG9wdHMuYXV0aCA9IGAke3BhcnNlZFVybC51c2VybmFtZX06JHtwYXJzZWRVcmwucGFzc3dvcmR9YDtcbiAgfVxuXG4gIGlmIChpc1VuaXhTb2NrZXQpIHtcbiAgICBjb25zdCBwYXJ0cyA9IG9wdHMucGF0aC5zcGxpdCgnOicpO1xuXG4gICAgb3B0cy5zb2NrZXRQYXRoID0gcGFydHNbMF07XG4gICAgb3B0cy5wYXRoID0gcGFydHNbMV07XG4gIH1cblxuICBsZXQgcmVxID0gKHdlYnNvY2tldC5fcmVxID0gZ2V0KG9wdHMpKTtcblxuICBpZiAob3B0cy50aW1lb3V0KSB7XG4gICAgcmVxLm9uKCd0aW1lb3V0JywgKCkgPT4ge1xuICAgICAgYWJvcnRIYW5kc2hha2Uod2Vic29ja2V0LCByZXEsICdPcGVuaW5nIGhhbmRzaGFrZSBoYXMgdGltZWQgb3V0Jyk7XG4gICAgfSk7XG4gIH1cblxuICByZXEub24oJ2Vycm9yJywgKGVycikgPT4ge1xuICAgIGlmIChyZXEgPT09IG51bGwgfHwgcmVxLmFib3J0ZWQpIHJldHVybjtcblxuICAgIHJlcSA9IHdlYnNvY2tldC5fcmVxID0gbnVsbDtcbiAgICB3ZWJzb2NrZXQuX3JlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ0xPU0lORztcbiAgICB3ZWJzb2NrZXQuZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgIHdlYnNvY2tldC5lbWl0Q2xvc2UoKTtcbiAgfSk7XG5cbiAgcmVxLm9uKCdyZXNwb25zZScsIChyZXMpID0+IHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IHJlcy5oZWFkZXJzLmxvY2F0aW9uO1xuICAgIGNvbnN0IHN0YXR1c0NvZGUgPSByZXMuc3RhdHVzQ29kZTtcblxuICAgIGlmIChcbiAgICAgIGxvY2F0aW9uICYmXG4gICAgICBvcHRzLmZvbGxvd1JlZGlyZWN0cyAmJlxuICAgICAgc3RhdHVzQ29kZSA+PSAzMDAgJiZcbiAgICAgIHN0YXR1c0NvZGUgPCA0MDBcbiAgICApIHtcbiAgICAgIGlmICgrK3dlYnNvY2tldC5fcmVkaXJlY3RzID4gb3B0cy5tYXhSZWRpcmVjdHMpIHtcbiAgICAgICAgYWJvcnRIYW5kc2hha2Uod2Vic29ja2V0LCByZXEsICdNYXhpbXVtIHJlZGlyZWN0cyBleGNlZWRlZCcpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlcS5hYm9ydCgpO1xuXG4gICAgICBjb25zdCBhZGRyID0gbmV3IFVSTChsb2NhdGlvbiwgYWRkcmVzcyk7XG5cbiAgICAgIGluaXRBc0NsaWVudCh3ZWJzb2NrZXQsIGFkZHIsIHByb3RvY29scywgb3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmICghd2Vic29ja2V0LmVtaXQoJ3VuZXhwZWN0ZWQtcmVzcG9uc2UnLCByZXEsIHJlcykpIHtcbiAgICAgIGFib3J0SGFuZHNoYWtlKFxuICAgICAgICB3ZWJzb2NrZXQsXG4gICAgICAgIHJlcSxcbiAgICAgICAgYFVuZXhwZWN0ZWQgc2VydmVyIHJlc3BvbnNlOiAke3Jlcy5zdGF0dXNDb2RlfWBcbiAgICAgICk7XG4gICAgfVxuICB9KTtcblxuICByZXEub24oJ3VwZ3JhZGUnLCAocmVzLCBzb2NrZXQsIGhlYWQpID0+IHtcbiAgICB3ZWJzb2NrZXQuZW1pdCgndXBncmFkZScsIHJlcyk7XG5cbiAgICAvL1xuICAgIC8vIFRoZSB1c2VyIG1heSBoYXZlIGNsb3NlZCB0aGUgY29ubmVjdGlvbiBmcm9tIGEgbGlzdGVuZXIgb2YgdGhlIGB1cGdyYWRlYFxuICAgIC8vIGV2ZW50LlxuICAgIC8vXG4gICAgaWYgKHdlYnNvY2tldC5yZWFkeVN0YXRlICE9PSBXZWJTb2NrZXQuQ09OTkVDVElORykgcmV0dXJuO1xuXG4gICAgcmVxID0gd2Vic29ja2V0Ll9yZXEgPSBudWxsO1xuXG4gICAgY29uc3QgZGlnZXN0ID0gY3JlYXRlSGFzaCgnc2hhMScpXG4gICAgICAudXBkYXRlKGtleSArIEdVSUQpXG4gICAgICAuZGlnZXN0KCdiYXNlNjQnKTtcblxuICAgIGlmIChyZXMuaGVhZGVyc1snc2VjLXdlYnNvY2tldC1hY2NlcHQnXSAhPT0gZGlnZXN0KSB7XG4gICAgICBhYm9ydEhhbmRzaGFrZSh3ZWJzb2NrZXQsIHNvY2tldCwgJ0ludmFsaWQgU2VjLVdlYlNvY2tldC1BY2NlcHQgaGVhZGVyJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2VydmVyUHJvdCA9IHJlcy5oZWFkZXJzWydzZWMtd2Vic29ja2V0LXByb3RvY29sJ107XG4gICAgY29uc3QgcHJvdExpc3QgPSAocHJvdG9jb2xzIHx8ICcnKS5zcGxpdCgvLCAqLyk7XG4gICAgbGV0IHByb3RFcnJvcjtcblxuICAgIGlmICghcHJvdG9jb2xzICYmIHNlcnZlclByb3QpIHtcbiAgICAgIHByb3RFcnJvciA9ICdTZXJ2ZXIgc2VudCBhIHN1YnByb3RvY29sIGJ1dCBub25lIHdhcyByZXF1ZXN0ZWQnO1xuICAgIH0gZWxzZSBpZiAocHJvdG9jb2xzICYmICFzZXJ2ZXJQcm90KSB7XG4gICAgICBwcm90RXJyb3IgPSAnU2VydmVyIHNlbnQgbm8gc3VicHJvdG9jb2wnO1xuICAgIH0gZWxzZSBpZiAoc2VydmVyUHJvdCAmJiAhcHJvdExpc3QuaW5jbHVkZXMoc2VydmVyUHJvdCkpIHtcbiAgICAgIHByb3RFcnJvciA9ICdTZXJ2ZXIgc2VudCBhbiBpbnZhbGlkIHN1YnByb3RvY29sJztcbiAgICB9XG5cbiAgICBpZiAocHJvdEVycm9yKSB7XG4gICAgICBhYm9ydEhhbmRzaGFrZSh3ZWJzb2NrZXQsIHNvY2tldCwgcHJvdEVycm9yKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoc2VydmVyUHJvdCkgd2Vic29ja2V0Ll9wcm90b2NvbCA9IHNlcnZlclByb3Q7XG5cbiAgICBpZiAocGVyTWVzc2FnZURlZmxhdGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbnMgPSBwYXJzZShyZXMuaGVhZGVyc1snc2VjLXdlYnNvY2tldC1leHRlbnNpb25zJ10pO1xuXG4gICAgICAgIGlmIChleHRlbnNpb25zW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdKSB7XG4gICAgICAgICAgcGVyTWVzc2FnZURlZmxhdGUuYWNjZXB0KGV4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0pO1xuICAgICAgICAgIHdlYnNvY2tldC5fZXh0ZW5zaW9uc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXSA9XG4gICAgICAgICAgICBwZXJNZXNzYWdlRGVmbGF0ZTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGFib3J0SGFuZHNoYWtlKFxuICAgICAgICAgIHdlYnNvY2tldCxcbiAgICAgICAgICBzb2NrZXQsXG4gICAgICAgICAgJ0ludmFsaWQgU2VjLVdlYlNvY2tldC1FeHRlbnNpb25zIGhlYWRlcidcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHdlYnNvY2tldC5zZXRTb2NrZXQoc29ja2V0LCBoZWFkLCBvcHRzLm1heFBheWxvYWQpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBgbmV0LlNvY2tldGAgYW5kIGluaXRpYXRlIGEgY29ubmVjdGlvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBDb25uZWN0aW9uIG9wdGlvbnNcbiAqIEByZXR1cm4ge25ldC5Tb2NrZXR9IFRoZSBuZXdseSBjcmVhdGVkIHNvY2tldCB1c2VkIHRvIHN0YXJ0IHRoZSBjb25uZWN0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBuZXRDb25uZWN0KG9wdGlvbnMpIHtcbiAgb3B0aW9ucy5wYXRoID0gb3B0aW9ucy5zb2NrZXRQYXRoO1xuICByZXR1cm4gbmV0LmNvbm5lY3Qob3B0aW9ucyk7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgYHRscy5UTFNTb2NrZXRgIGFuZCBpbml0aWF0ZSBhIGNvbm5lY3Rpb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgQ29ubmVjdGlvbiBvcHRpb25zXG4gKiBAcmV0dXJuIHt0bHMuVExTU29ja2V0fSBUaGUgbmV3bHkgY3JlYXRlZCBzb2NrZXQgdXNlZCB0byBzdGFydCB0aGUgY29ubmVjdGlvblxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gdGxzQ29ubmVjdChvcHRpb25zKSB7XG4gIG9wdGlvbnMucGF0aCA9IHVuZGVmaW5lZDtcblxuICBpZiAoIW9wdGlvbnMuc2VydmVybmFtZSAmJiBvcHRpb25zLnNlcnZlcm5hbWUgIT09ICcnKSB7XG4gICAgb3B0aW9ucy5zZXJ2ZXJuYW1lID0gbmV0LmlzSVAob3B0aW9ucy5ob3N0KSA/ICcnIDogb3B0aW9ucy5ob3N0O1xuICB9XG5cbiAgcmV0dXJuIHRscy5jb25uZWN0KG9wdGlvbnMpO1xufVxuXG4vKipcbiAqIEFib3J0IHRoZSBoYW5kc2hha2UgYW5kIGVtaXQgYW4gZXJyb3IuXG4gKlxuICogQHBhcmFtIHtXZWJTb2NrZXR9IHdlYnNvY2tldCBUaGUgV2ViU29ja2V0IGluc3RhbmNlXG4gKiBAcGFyYW0geyhodHRwLkNsaWVudFJlcXVlc3R8bmV0LlNvY2tldCl9IHN0cmVhbSBUaGUgcmVxdWVzdCB0byBhYm9ydCBvciB0aGVcbiAqICAgICBzb2NrZXQgdG8gZGVzdHJveVxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2VcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGFib3J0SGFuZHNoYWtlKHdlYnNvY2tldCwgc3RyZWFtLCBtZXNzYWdlKSB7XG4gIHdlYnNvY2tldC5fcmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TSU5HO1xuXG4gIGNvbnN0IGVyciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoZXJyLCBhYm9ydEhhbmRzaGFrZSk7XG5cbiAgaWYgKHN0cmVhbS5zZXRIZWFkZXIpIHtcbiAgICBzdHJlYW0uYWJvcnQoKTtcblxuICAgIGlmIChzdHJlYW0uc29ja2V0ICYmICFzdHJlYW0uc29ja2V0LmRlc3Ryb3llZCkge1xuICAgICAgLy9cbiAgICAgIC8vIE9uIE5vZGUuanMgPj0gMTQuMy4wIGByZXF1ZXN0LmFib3J0KClgIGRvZXMgbm90IGRlc3Ryb3kgdGhlIHNvY2tldCBpZlxuICAgICAgLy8gY2FsbGVkIGFmdGVyIHRoZSByZXF1ZXN0IGNvbXBsZXRlZC4gU2VlXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vd2Vic29ja2V0cy93cy9pc3N1ZXMvMTg2OS5cbiAgICAgIC8vXG4gICAgICBzdHJlYW0uc29ja2V0LmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBzdHJlYW0ub25jZSgnYWJvcnQnLCB3ZWJzb2NrZXQuZW1pdENsb3NlLmJpbmQod2Vic29ja2V0KSk7XG4gICAgd2Vic29ja2V0LmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgfSBlbHNlIHtcbiAgICBzdHJlYW0uZGVzdHJveShlcnIpO1xuICAgIHN0cmVhbS5vbmNlKCdlcnJvcicsIHdlYnNvY2tldC5lbWl0LmJpbmQod2Vic29ja2V0LCAnZXJyb3InKSk7XG4gICAgc3RyZWFtLm9uY2UoJ2Nsb3NlJywgd2Vic29ja2V0LmVtaXRDbG9zZS5iaW5kKHdlYnNvY2tldCkpO1xuICB9XG59XG5cbi8qKlxuICogSGFuZGxlIGNhc2VzIHdoZXJlIHRoZSBgcGluZygpYCwgYHBvbmcoKWAsIG9yIGBzZW5kKClgIG1ldGhvZHMgYXJlIGNhbGxlZFxuICogd2hlbiB0aGUgYHJlYWR5U3RhdGVgIGF0dHJpYnV0ZSBpcyBgQ0xPU0lOR2Agb3IgYENMT1NFRGAuXG4gKlxuICogQHBhcmFtIHtXZWJTb2NrZXR9IHdlYnNvY2tldCBUaGUgV2ViU29ja2V0IGluc3RhbmNlXG4gKiBAcGFyYW0geyp9IFtkYXRhXSBUaGUgZGF0YSB0byBzZW5kXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdIENhbGxiYWNrXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzZW5kQWZ0ZXJDbG9zZSh3ZWJzb2NrZXQsIGRhdGEsIGNiKSB7XG4gIGlmIChkYXRhKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gdG9CdWZmZXIoZGF0YSkubGVuZ3RoO1xuXG4gICAgLy9cbiAgICAvLyBUaGUgYF9idWZmZXJlZEFtb3VudGAgcHJvcGVydHkgaXMgdXNlZCBvbmx5IHdoZW4gdGhlIHBlZXIgaXMgYSBjbGllbnQgYW5kXG4gICAgLy8gdGhlIG9wZW5pbmcgaGFuZHNoYWtlIGZhaWxzLiBVbmRlciB0aGVzZSBjaXJjdW1zdGFuY2VzLCBpbiBmYWN0LCB0aGVcbiAgICAvLyBgc2V0U29ja2V0KClgIG1ldGhvZCBpcyBub3QgY2FsbGVkLCBzbyB0aGUgYF9zb2NrZXRgIGFuZCBgX3NlbmRlcmBcbiAgICAvLyBwcm9wZXJ0aWVzIGFyZSBzZXQgdG8gYG51bGxgLlxuICAgIC8vXG4gICAgaWYgKHdlYnNvY2tldC5fc29ja2V0KSB3ZWJzb2NrZXQuX3NlbmRlci5fYnVmZmVyZWRCeXRlcyArPSBsZW5ndGg7XG4gICAgZWxzZSB3ZWJzb2NrZXQuX2J1ZmZlcmVkQW1vdW50ICs9IGxlbmd0aDtcbiAgfVxuXG4gIGlmIChjYikge1xuICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcbiAgICAgIGBXZWJTb2NrZXQgaXMgbm90IG9wZW46IHJlYWR5U3RhdGUgJHt3ZWJzb2NrZXQucmVhZHlTdGF0ZX0gYCArXG4gICAgICAgIGAoJHtyZWFkeVN0YXRlc1t3ZWJzb2NrZXQucmVhZHlTdGF0ZV19KWBcbiAgICApO1xuICAgIGNiKGVycik7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGBSZWNlaXZlcmAgYCdjb25jbHVkZSdgIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlIFRoZSBzdGF0dXMgY29kZVxuICogQHBhcmFtIHtTdHJpbmd9IHJlYXNvbiBUaGUgcmVhc29uIGZvciBjbG9zaW5nXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByZWNlaXZlck9uQ29uY2x1ZGUoY29kZSwgcmVhc29uKSB7XG4gIGNvbnN0IHdlYnNvY2tldCA9IHRoaXNba1dlYlNvY2tldF07XG5cbiAgd2Vic29ja2V0Ll9zb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2RhdGEnLCBzb2NrZXRPbkRhdGEpO1xuICB3ZWJzb2NrZXQuX3NvY2tldC5yZXN1bWUoKTtcblxuICB3ZWJzb2NrZXQuX2Nsb3NlRnJhbWVSZWNlaXZlZCA9IHRydWU7XG4gIHdlYnNvY2tldC5fY2xvc2VNZXNzYWdlID0gcmVhc29uO1xuICB3ZWJzb2NrZXQuX2Nsb3NlQ29kZSA9IGNvZGU7XG5cbiAgaWYgKGNvZGUgPT09IDEwMDUpIHdlYnNvY2tldC5jbG9zZSgpO1xuICBlbHNlIHdlYnNvY2tldC5jbG9zZShjb2RlLCByZWFzb24pO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYFJlY2VpdmVyYCBgJ2RyYWluJ2AgZXZlbnQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVjZWl2ZXJPbkRyYWluKCkge1xuICB0aGlzW2tXZWJTb2NrZXRdLl9zb2NrZXQucmVzdW1lKCk7XG59XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgUmVjZWl2ZXJgIGAnZXJyb3InYCBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhSYW5nZUVycm9yfEVycm9yKX0gZXJyIFRoZSBlbWl0dGVkIGVycm9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByZWNlaXZlck9uRXJyb3IoZXJyKSB7XG4gIGNvbnN0IHdlYnNvY2tldCA9IHRoaXNba1dlYlNvY2tldF07XG5cbiAgd2Vic29ja2V0Ll9zb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2RhdGEnLCBzb2NrZXRPbkRhdGEpO1xuXG4gIHdlYnNvY2tldC5fcmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TSU5HO1xuICB3ZWJzb2NrZXQuX2Nsb3NlQ29kZSA9IGVycltrU3RhdHVzQ29kZV07XG4gIHdlYnNvY2tldC5lbWl0KCdlcnJvcicsIGVycik7XG4gIHdlYnNvY2tldC5fc29ja2V0LmRlc3Ryb3koKTtcbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGBSZWNlaXZlcmAgYCdmaW5pc2gnYCBldmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByZWNlaXZlck9uRmluaXNoKCkge1xuICB0aGlzW2tXZWJTb2NrZXRdLmVtaXRDbG9zZSgpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYFJlY2VpdmVyYCBgJ21lc3NhZ2UnYCBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8QnVmZmVyfEFycmF5QnVmZmVyfEJ1ZmZlcltdKX0gZGF0YSBUaGUgbWVzc2FnZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVjZWl2ZXJPbk1lc3NhZ2UoZGF0YSkge1xuICB0aGlzW2tXZWJTb2NrZXRdLmVtaXQoJ21lc3NhZ2UnLCBkYXRhKTtcbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGBSZWNlaXZlcmAgYCdwaW5nJ2AgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IGRhdGEgVGhlIGRhdGEgaW5jbHVkZWQgaW4gdGhlIHBpbmcgZnJhbWVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJlY2VpdmVyT25QaW5nKGRhdGEpIHtcbiAgY29uc3Qgd2Vic29ja2V0ID0gdGhpc1trV2ViU29ja2V0XTtcblxuICB3ZWJzb2NrZXQucG9uZyhkYXRhLCAhd2Vic29ja2V0Ll9pc1NlcnZlciwgTk9PUCk7XG4gIHdlYnNvY2tldC5lbWl0KCdwaW5nJywgZGF0YSk7XG59XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgUmVjZWl2ZXJgIGAncG9uZydgIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBkYXRhIFRoZSBkYXRhIGluY2x1ZGVkIGluIHRoZSBwb25nIGZyYW1lXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByZWNlaXZlck9uUG9uZyhkYXRhKSB7XG4gIHRoaXNba1dlYlNvY2tldF0uZW1pdCgncG9uZycsIGRhdGEpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYG5ldC5Tb2NrZXRgIGAnY2xvc2UnYCBldmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzb2NrZXRPbkNsb3NlKCkge1xuICBjb25zdCB3ZWJzb2NrZXQgPSB0aGlzW2tXZWJTb2NrZXRdO1xuXG4gIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgc29ja2V0T25DbG9zZSk7XG4gIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2VuZCcsIHNvY2tldE9uRW5kKTtcblxuICB3ZWJzb2NrZXQuX3JlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ0xPU0lORztcblxuICAvL1xuICAvLyBUaGUgY2xvc2UgZnJhbWUgbWlnaHQgbm90IGhhdmUgYmVlbiByZWNlaXZlZCBvciB0aGUgYCdlbmQnYCBldmVudCBlbWl0dGVkLFxuICAvLyBmb3IgZXhhbXBsZSwgaWYgdGhlIHNvY2tldCB3YXMgZGVzdHJveWVkIGR1ZSB0byBhbiBlcnJvci4gRW5zdXJlIHRoYXQgdGhlXG4gIC8vIGByZWNlaXZlcmAgc3RyZWFtIGlzIGNsb3NlZCBhZnRlciB3cml0aW5nIGFueSByZW1haW5pbmcgYnVmZmVyZWQgZGF0YSB0b1xuICAvLyBpdC4gSWYgdGhlIHJlYWRhYmxlIHNpZGUgb2YgdGhlIHNvY2tldCBpcyBpbiBmbG93aW5nIG1vZGUgdGhlbiB0aGVyZSBpcyBub1xuICAvLyBidWZmZXJlZCBkYXRhIGFzIGV2ZXJ5dGhpbmcgaGFzIGJlZW4gYWxyZWFkeSB3cml0dGVuIGFuZCBgcmVhZGFibGUucmVhZCgpYFxuICAvLyB3aWxsIHJldHVybiBgbnVsbGAuIElmIGluc3RlYWQsIHRoZSBzb2NrZXQgaXMgcGF1c2VkLCBhbnkgcG9zc2libGUgYnVmZmVyZWRcbiAgLy8gZGF0YSB3aWxsIGJlIHJlYWQgYXMgYSBzaW5nbGUgY2h1bmsgYW5kIGVtaXR0ZWQgc3luY2hyb25vdXNseSBpbiBhIHNpbmdsZVxuICAvLyBgJ2RhdGEnYCBldmVudC5cbiAgLy9cbiAgd2Vic29ja2V0Ll9zb2NrZXQucmVhZCgpO1xuICB3ZWJzb2NrZXQuX3JlY2VpdmVyLmVuZCgpO1xuXG4gIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2RhdGEnLCBzb2NrZXRPbkRhdGEpO1xuICB0aGlzW2tXZWJTb2NrZXRdID0gdW5kZWZpbmVkO1xuXG4gIGNsZWFyVGltZW91dCh3ZWJzb2NrZXQuX2Nsb3NlVGltZXIpO1xuXG4gIGlmIChcbiAgICB3ZWJzb2NrZXQuX3JlY2VpdmVyLl93cml0YWJsZVN0YXRlLmZpbmlzaGVkIHx8XG4gICAgd2Vic29ja2V0Ll9yZWNlaXZlci5fd3JpdGFibGVTdGF0ZS5lcnJvckVtaXR0ZWRcbiAgKSB7XG4gICAgd2Vic29ja2V0LmVtaXRDbG9zZSgpO1xuICB9IGVsc2Uge1xuICAgIHdlYnNvY2tldC5fcmVjZWl2ZXIub24oJ2Vycm9yJywgcmVjZWl2ZXJPbkZpbmlzaCk7XG4gICAgd2Vic29ja2V0Ll9yZWNlaXZlci5vbignZmluaXNoJywgcmVjZWl2ZXJPbkZpbmlzaCk7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGBuZXQuU29ja2V0YCBgJ2RhdGEnYCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gY2h1bmsgQSBjaHVuayBvZiBkYXRhXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzb2NrZXRPbkRhdGEoY2h1bmspIHtcbiAgaWYgKCF0aGlzW2tXZWJTb2NrZXRdLl9yZWNlaXZlci53cml0ZShjaHVuaykpIHtcbiAgICB0aGlzLnBhdXNlKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGBuZXQuU29ja2V0YCBgJ2VuZCdgIGV2ZW50LlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNvY2tldE9uRW5kKCkge1xuICBjb25zdCB3ZWJzb2NrZXQgPSB0aGlzW2tXZWJTb2NrZXRdO1xuXG4gIHdlYnNvY2tldC5fcmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TSU5HO1xuICB3ZWJzb2NrZXQuX3JlY2VpdmVyLmVuZCgpO1xuICB0aGlzLmVuZCgpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYG5ldC5Tb2NrZXRgIGAnZXJyb3InYCBldmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzb2NrZXRPbkVycm9yKCkge1xuICBjb25zdCB3ZWJzb2NrZXQgPSB0aGlzW2tXZWJTb2NrZXRdO1xuXG4gIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgc29ja2V0T25FcnJvcik7XG4gIHRoaXMub24oJ2Vycm9yJywgTk9PUCk7XG5cbiAgaWYgKHdlYnNvY2tldCkge1xuICAgIHdlYnNvY2tldC5fcmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TSU5HO1xuICAgIHRoaXMuZGVzdHJveSgpO1xuICB9XG59XG4iLCJpZih0eXBlb2YgYnVmZmVydXRpbCA9PT0gJ3VuZGVmaW5lZCcpIHsgdmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ2J1ZmZlcnV0aWwnXCIpOyBlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7IHRocm93IGU7IH1cblxubW9kdWxlLmV4cG9ydHMgPSBidWZmZXJ1dGlsOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNyeXB0b1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXZlbnRzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV0XCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHJlYW1cIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRsc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXJsXCIpOzsiLCJpZih0eXBlb2YgdXRmLTgtdmFsaWRhdGUgPT09ICd1bmRlZmluZWQnKSB7IHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICd1dGYtOC12YWxpZGF0ZSdcIik7IGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJzsgdGhyb3cgZTsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IHV0Zi04LXZhbGlkYXRlOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInpsaWJcIik7OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9ub2Rlc2VydmVyL3NlcnZlci50c1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=