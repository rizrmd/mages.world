if (typeof isSSR === 'undefined') window.isSSR = false;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/.pnpm/@noble+hashes@1.3.1/node_modules/@noble/hashes/_assert.js
var require_assert = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.3.1/node_modules/@noble/hashes/_assert.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.output = exports.exists = exports.hash = exports.bytes = exports.bool = exports.number = void 0;
    function number(n2) {
      if (!Number.isSafeInteger(n2) || n2 < 0)
        throw new Error(`Wrong positive integer: ${n2}`);
    }
    exports.number = number;
    function bool(b2) {
      if (typeof b2 !== "boolean")
        throw new Error(`Expected boolean, not ${b2}`);
    }
    exports.bool = bool;
    function bytes(b2, ...lengths) {
      if (!(b2 instanceof Uint8Array))
        throw new Error("Expected Uint8Array");
      if (lengths.length > 0 && !lengths.includes(b2.length))
        throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b2.length}`);
    }
    exports.bytes = bytes;
    function hash(hash2) {
      if (typeof hash2 !== "function" || typeof hash2.create !== "function")
        throw new Error("Hash should be wrapped by utils.wrapConstructor");
      number(hash2.outputLen);
      number(hash2.blockLen);
    }
    exports.hash = hash;
    function exists(instance, checkFinished = true) {
      if (instance.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (checkFinished && instance.finished)
        throw new Error("Hash#digest() has already been called");
    }
    exports.exists = exists;
    function output(out, instance) {
      bytes(out);
      const min = instance.outputLen;
      if (out.length < min) {
        throw new Error(`digestInto() expects output buffer of length at least ${min}`);
      }
    }
    exports.output = output;
    var assert = {
      number,
      bool,
      bytes,
      hash,
      exists,
      output
    };
    exports.default = assert;
  }
});

// ../../node_modules/.pnpm/@noble+hashes@1.3.1/node_modules/@noble/hashes/_u64.js
var require_u64 = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.3.1/node_modules/@noble/hashes/_u64.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.add = exports.toBig = exports.split = exports.fromBig = void 0;
    var U32_MASK64 = BigInt(2 ** 32 - 1);
    var _32n = BigInt(32);
    function fromBig(n2, le = false) {
      if (le)
        return { h: Number(n2 & U32_MASK64), l: Number(n2 >> _32n & U32_MASK64) };
      return { h: Number(n2 >> _32n & U32_MASK64) | 0, l: Number(n2 & U32_MASK64) | 0 };
    }
    exports.fromBig = fromBig;
    function split(lst, le = false) {
      let Ah = new Uint32Array(lst.length);
      let Al = new Uint32Array(lst.length);
      for (let i2 = 0; i2 < lst.length; i2++) {
        const { h: h2, l: l2 } = fromBig(lst[i2], le);
        [Ah[i2], Al[i2]] = [h2, l2];
      }
      return [Ah, Al];
    }
    exports.split = split;
    var toBig = (h2, l2) => BigInt(h2 >>> 0) << _32n | BigInt(l2 >>> 0);
    exports.toBig = toBig;
    var shrSH = (h2, l2, s2) => h2 >>> s2;
    var shrSL = (h2, l2, s2) => h2 << 32 - s2 | l2 >>> s2;
    var rotrSH = (h2, l2, s2) => h2 >>> s2 | l2 << 32 - s2;
    var rotrSL = (h2, l2, s2) => h2 << 32 - s2 | l2 >>> s2;
    var rotrBH = (h2, l2, s2) => h2 << 64 - s2 | l2 >>> s2 - 32;
    var rotrBL = (h2, l2, s2) => h2 >>> s2 - 32 | l2 << 64 - s2;
    var rotr32H = (h2, l2) => l2;
    var rotr32L = (h2, l2) => h2;
    var rotlSH = (h2, l2, s2) => h2 << s2 | l2 >>> 32 - s2;
    var rotlSL = (h2, l2, s2) => l2 << s2 | h2 >>> 32 - s2;
    var rotlBH = (h2, l2, s2) => l2 << s2 - 32 | h2 >>> 64 - s2;
    var rotlBL = (h2, l2, s2) => h2 << s2 - 32 | l2 >>> 64 - s2;
    function add(Ah, Al, Bh, Bl) {
      const l2 = (Al >>> 0) + (Bl >>> 0);
      return { h: Ah + Bh + (l2 / 2 ** 32 | 0) | 0, l: l2 | 0 };
    }
    exports.add = add;
    var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
    var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
    var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
    var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
    var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
    var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
    var u64 = {
      fromBig,
      split,
      toBig: exports.toBig,
      shrSH,
      shrSL,
      rotrSH,
      rotrSL,
      rotrBH,
      rotrBL,
      rotr32H,
      rotr32L,
      rotlSH,
      rotlSL,
      rotlBH,
      rotlBL,
      add,
      add3L,
      add3H,
      add4L,
      add4H,
      add5H,
      add5L
    };
    exports.default = u64;
  }
});

// ../../node_modules/.pnpm/@noble+hashes@1.3.1/node_modules/@noble/hashes/crypto.js
var require_crypto = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.3.1/node_modules/@noble/hashes/crypto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.crypto = void 0;
    exports.crypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
  }
});

// ../../node_modules/.pnpm/@noble+hashes@1.3.1/node_modules/@noble/hashes/utils.js
var require_utils = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.3.1/node_modules/@noble/hashes/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.randomBytes = exports.wrapXOFConstructorWithOpts = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.checkOpts = exports.Hash = exports.concatBytes = exports.toBytes = exports.utf8ToBytes = exports.asyncLoop = exports.nextTick = exports.hexToBytes = exports.bytesToHex = exports.isLE = exports.rotr = exports.createView = exports.u32 = exports.u8 = void 0;
    var crypto_1 = require_crypto();
    var u8a = (a2) => a2 instanceof Uint8Array;
    var u8 = (arr) => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
    exports.u8 = u8;
    var u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
    exports.u32 = u32;
    var createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    exports.createView = createView;
    var rotr = (word, shift) => word << 32 - shift | word >>> shift;
    exports.rotr = rotr;
    exports.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    if (!exports.isLE)
      throw new Error("Non little-endian hardware is not supported");
    var hexes = Array.from({ length: 256 }, (v, i2) => i2.toString(16).padStart(2, "0"));
    function bytesToHex(bytes) {
      if (!u8a(bytes))
        throw new Error("Uint8Array expected");
      let hex = "";
      for (let i2 = 0; i2 < bytes.length; i2++) {
        hex += hexes[bytes[i2]];
      }
      return hex;
    }
    exports.bytesToHex = bytesToHex;
    function hexToBytes(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      const len = hex.length;
      if (len % 2)
        throw new Error("padded hex string expected, got unpadded hex of length " + len);
      const array = new Uint8Array(len / 2);
      for (let i2 = 0; i2 < array.length; i2++) {
        const j = i2 * 2;
        const hexByte = hex.slice(j, j + 2);
        const byte = Number.parseInt(hexByte, 16);
        if (Number.isNaN(byte) || byte < 0)
          throw new Error("Invalid byte sequence");
        array[i2] = byte;
      }
      return array;
    }
    exports.hexToBytes = hexToBytes;
    var nextTick = async () => {
    };
    exports.nextTick = nextTick;
    async function asyncLoop(iters, tick, cb) {
      let ts = Date.now();
      for (let i2 = 0; i2 < iters; i2++) {
        cb(i2);
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick)
          continue;
        await (0, exports.nextTick)();
        ts += diff;
      }
    }
    exports.asyncLoop = asyncLoop;
    function utf8ToBytes(str) {
      if (typeof str !== "string")
        throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
      return new Uint8Array(new TextEncoder().encode(str));
    }
    exports.utf8ToBytes = utf8ToBytes;
    function toBytes(data) {
      if (typeof data === "string")
        data = utf8ToBytes(data);
      if (!u8a(data))
        throw new Error(`expected Uint8Array, got ${typeof data}`);
      return data;
    }
    exports.toBytes = toBytes;
    function concatBytes(...arrays) {
      const r2 = new Uint8Array(arrays.reduce((sum, a2) => sum + a2.length, 0));
      let pad = 0;
      arrays.forEach((a2) => {
        if (!u8a(a2))
          throw new Error("Uint8Array expected");
        r2.set(a2, pad);
        pad += a2.length;
      });
      return r2;
    }
    exports.concatBytes = concatBytes;
    var Hash = class {
      // Safe version that clones internal state
      clone() {
        return this._cloneInto();
      }
    };
    exports.Hash = Hash;
    var isPlainObject = (obj) => Object.prototype.toString.call(obj) === "[object Object]" && obj.constructor === Object;
    function checkOpts(defaults, opts) {
      if (opts !== void 0 && (typeof opts !== "object" || !isPlainObject(opts)))
        throw new Error("Options should be object or undefined");
      const merged = Object.assign(defaults, opts);
      return merged;
    }
    exports.checkOpts = checkOpts;
    function wrapConstructor(hashCons) {
      const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
      const tmp = hashCons();
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = () => hashCons();
      return hashC;
    }
    exports.wrapConstructor = wrapConstructor;
    function wrapConstructorWithOpts(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    exports.wrapConstructorWithOpts = wrapConstructorWithOpts;
    function wrapXOFConstructorWithOpts(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    exports.wrapXOFConstructorWithOpts = wrapXOFConstructorWithOpts;
    function randomBytes(bytesLength = 32) {
      if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
        return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
      }
      throw new Error("crypto.getRandomValues must be defined");
    }
    exports.randomBytes = randomBytes;
  }
});

// ../../node_modules/.pnpm/@noble+hashes@1.3.1/node_modules/@noble/hashes/sha3.js
var require_sha3 = __commonJS({
  "../../node_modules/.pnpm/@noble+hashes@1.3.1/node_modules/@noble/hashes/sha3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.shake256 = exports.shake128 = exports.keccak_512 = exports.keccak_384 = exports.keccak_256 = exports.keccak_224 = exports.sha3_512 = exports.sha3_384 = exports.sha3_256 = exports.sha3_224 = exports.Keccak = exports.keccakP = void 0;
    var _assert_js_1 = require_assert();
    var _u64_js_1 = require_u64();
    var utils_js_1 = require_utils();
    var [SHA3_PI, SHA3_ROTL, _SHA3_IOTA] = [[], [], []];
    var _0n = BigInt(0);
    var _1n = BigInt(1);
    var _2n = BigInt(2);
    var _7n = BigInt(7);
    var _256n = BigInt(256);
    var _0x71n = BigInt(113);
    for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
      [x, y] = [y, (2 * x + 3 * y) % 5];
      SHA3_PI.push(2 * (5 * y + x));
      SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
      let t2 = _0n;
      for (let j = 0; j < 7; j++) {
        R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
        if (R & _2n)
          t2 ^= _1n << (_1n << BigInt(j)) - _1n;
      }
      _SHA3_IOTA.push(t2);
    }
    var [SHA3_IOTA_H, SHA3_IOTA_L] = _u64_js_1.default.split(_SHA3_IOTA, true);
    var rotlH = (h2, l2, s2) => s2 > 32 ? _u64_js_1.default.rotlBH(h2, l2, s2) : _u64_js_1.default.rotlSH(h2, l2, s2);
    var rotlL = (h2, l2, s2) => s2 > 32 ? _u64_js_1.default.rotlBL(h2, l2, s2) : _u64_js_1.default.rotlSL(h2, l2, s2);
    function keccakP(s2, rounds = 24) {
      const B = new Uint32Array(5 * 2);
      for (let round = 24 - rounds; round < 24; round++) {
        for (let x = 0; x < 10; x++)
          B[x] = s2[x] ^ s2[x + 10] ^ s2[x + 20] ^ s2[x + 30] ^ s2[x + 40];
        for (let x = 0; x < 10; x += 2) {
          const idx1 = (x + 8) % 10;
          const idx0 = (x + 2) % 10;
          const B0 = B[idx0];
          const B1 = B[idx0 + 1];
          const Th = rotlH(B0, B1, 1) ^ B[idx1];
          const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
          for (let y = 0; y < 50; y += 10) {
            s2[x + y] ^= Th;
            s2[x + y + 1] ^= Tl;
          }
        }
        let curH = s2[2];
        let curL = s2[3];
        for (let t2 = 0; t2 < 24; t2++) {
          const shift = SHA3_ROTL[t2];
          const Th = rotlH(curH, curL, shift);
          const Tl = rotlL(curH, curL, shift);
          const PI = SHA3_PI[t2];
          curH = s2[PI];
          curL = s2[PI + 1];
          s2[PI] = Th;
          s2[PI + 1] = Tl;
        }
        for (let y = 0; y < 50; y += 10) {
          for (let x = 0; x < 10; x++)
            B[x] = s2[y + x];
          for (let x = 0; x < 10; x++)
            s2[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
        }
        s2[0] ^= SHA3_IOTA_H[round];
        s2[1] ^= SHA3_IOTA_L[round];
      }
      B.fill(0);
    }
    exports.keccakP = keccakP;
    var Keccak = class _Keccak extends utils_js_1.Hash {
      // NOTE: we accept arguments in bytes instead of bits here.
      constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
        super();
        this.blockLen = blockLen;
        this.suffix = suffix;
        this.outputLen = outputLen;
        this.enableXOF = enableXOF;
        this.rounds = rounds;
        this.pos = 0;
        this.posOut = 0;
        this.finished = false;
        this.destroyed = false;
        _assert_js_1.default.number(outputLen);
        if (0 >= this.blockLen || this.blockLen >= 200)
          throw new Error("Sha3 supports only keccak-f1600 function");
        this.state = new Uint8Array(200);
        this.state32 = (0, utils_js_1.u32)(this.state);
      }
      keccak() {
        keccakP(this.state32, this.rounds);
        this.posOut = 0;
        this.pos = 0;
      }
      update(data) {
        _assert_js_1.default.exists(this);
        const { blockLen, state } = this;
        data = (0, utils_js_1.toBytes)(data);
        const len = data.length;
        for (let pos = 0; pos < len; ) {
          const take = Math.min(blockLen - this.pos, len - pos);
          for (let i2 = 0; i2 < take; i2++)
            state[this.pos++] ^= data[pos++];
          if (this.pos === blockLen)
            this.keccak();
        }
        return this;
      }
      finish() {
        if (this.finished)
          return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        state[pos] ^= suffix;
        if ((suffix & 128) !== 0 && pos === blockLen - 1)
          this.keccak();
        state[blockLen - 1] ^= 128;
        this.keccak();
      }
      writeInto(out) {
        _assert_js_1.default.exists(this, false);
        _assert_js_1.default.bytes(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for (let pos = 0, len = out.length; pos < len; ) {
          if (this.posOut >= blockLen)
            this.keccak();
          const take = Math.min(blockLen - this.posOut, len - pos);
          out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
          this.posOut += take;
          pos += take;
        }
        return out;
      }
      xofInto(out) {
        if (!this.enableXOF)
          throw new Error("XOF is not possible for this instance");
        return this.writeInto(out);
      }
      xof(bytes) {
        _assert_js_1.default.number(bytes);
        return this.xofInto(new Uint8Array(bytes));
      }
      digestInto(out) {
        _assert_js_1.default.output(out, this);
        if (this.finished)
          throw new Error("digest() was already called");
        this.writeInto(out);
        this.destroy();
        return out;
      }
      digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
      }
      destroy() {
        this.destroyed = true;
        this.state.fill(0);
      }
      _cloneInto(to) {
        const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
        to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
        to.state32.set(this.state32);
        to.pos = this.pos;
        to.posOut = this.posOut;
        to.finished = this.finished;
        to.rounds = rounds;
        to.suffix = suffix;
        to.outputLen = outputLen;
        to.enableXOF = enableXOF;
        to.destroyed = this.destroyed;
        return to;
      }
    };
    exports.Keccak = Keccak;
    var gen = (suffix, blockLen, outputLen) => (0, utils_js_1.wrapConstructor)(() => new Keccak(blockLen, suffix, outputLen));
    exports.sha3_224 = gen(6, 144, 224 / 8);
    exports.sha3_256 = gen(6, 136, 256 / 8);
    exports.sha3_384 = gen(6, 104, 384 / 8);
    exports.sha3_512 = gen(6, 72, 512 / 8);
    exports.keccak_224 = gen(1, 144, 224 / 8);
    exports.keccak_256 = gen(1, 136, 256 / 8);
    exports.keccak_384 = gen(1, 104, 384 / 8);
    exports.keccak_512 = gen(1, 72, 512 / 8);
    var genShake = (suffix, blockLen, outputLen) => (0, utils_js_1.wrapXOFConstructorWithOpts)((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
    exports.shake128 = genShake(31, 168, 128 / 8);
    exports.shake256 = genShake(31, 136, 256 / 8);
  }
});

// ../../node_modules/.pnpm/@paralleldrive+cuid2@2.2.0/node_modules/@paralleldrive/cuid2/src/index.js
var require_src = __commonJS({
  "../../node_modules/.pnpm/@paralleldrive+cuid2@2.2.0/node_modules/@paralleldrive/cuid2/src/index.js"(exports, module) {
    var { sha3_512: sha3 } = require_sha3();
    var defaultLength = 24;
    var bigLength = 32;
    var createEntropy = (length = 4, random = Math.random) => {
      let entropy = "";
      while (entropy.length < length) {
        entropy = entropy + Math.floor(random() * 36).toString(36);
      }
      return entropy;
    };
    function bufToBigInt(buf) {
      let bits = 8n;
      let value = 0n;
      for (const i2 of buf.values()) {
        const bi = BigInt(i2);
        value = (value << bits) + bi;
      }
      return value;
    }
    var hash = (input = "") => {
      return bufToBigInt(sha3(input)).toString(36).slice(1);
    };
    var alphabet = Array.from(
      { length: 26 },
      (x, i2) => String.fromCharCode(i2 + 97)
    );
    var randomLetter = (random) => alphabet[Math.floor(random() * alphabet.length)];
    var createFingerprint = ({
      globalObj = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : {}
    } = {}) => {
      const globals = Object.keys(globalObj).toString();
      const sourceString = globals.length ? globals + createEntropy(bigLength) : createEntropy(bigLength);
      return hash(sourceString).substring(0, bigLength);
    };
    var createCounter = (count) => () => {
      return count++;
    };
    var initialCountMax = 476782367;
    var init = ({
      // Fallback if the user does not pass in a CSPRNG. This should be OK
      // because we don't rely solely on the random number generator for entropy.
      // We also use the host fingerprint, current time, and a session counter.
      random = Math.random,
      counter = createCounter(Math.floor(random() * initialCountMax)),
      length = defaultLength,
      fingerprint = createFingerprint()
    } = {}) => {
      return function cuid22() {
        const firstLetter = randomLetter(random);
        const time = Date.now().toString(36);
        const count = counter().toString(36);
        const salt = createEntropy(length, random);
        const hashInput = `${time + salt + count + fingerprint}`;
        return `${firstLetter + hash(hashInput).substring(1, length)}`;
      };
    };
    var createId4 = init();
    var isCuid = (id, { minLength = 2, maxLength = bigLength } = {}) => {
      const length = id.length;
      const regex = /^[0-9a-z]+$/;
      try {
        if (typeof id === "string" && length >= minLength && length <= maxLength && regex.test(id))
          return true;
      } finally {
      }
      return false;
    };
    module.exports.getConstants = () => ({ defaultLength, bigLength });
    module.exports.init = init;
    module.exports.createId = createId4;
    module.exports.bufToBigInt = bufToBigInt;
    module.exports.createCounter = createCounter;
    module.exports.createFingerprint = createFingerprint;
    module.exports.isCuid = isCuid;
  }
});

// ../../node_modules/.pnpm/@paralleldrive+cuid2@2.2.0/node_modules/@paralleldrive/cuid2/index.js
var require_cuid2 = __commonJS({
  "../../node_modules/.pnpm/@paralleldrive+cuid2@2.2.0/node_modules/@paralleldrive/cuid2/index.js"(exports, module) {
    var { createId: createId4, init, getConstants, isCuid } = require_src();
    module.exports.createId = createId4;
    module.exports.init = init;
    module.exports.getConstants = getConstants;
    module.exports.isCuid = isCuid;
  }
});

// ../../node_modules/.pnpm/hash-sum@2.0.0/node_modules/hash-sum/hash-sum.js
var require_hash_sum = __commonJS({
  "../../node_modules/.pnpm/hash-sum@2.0.0/node_modules/hash-sum/hash-sum.js"(exports, module) {
    "use strict";
    function pad(hash, len) {
      while (hash.length < len) {
        hash = "0" + hash;
      }
      return hash;
    }
    function fold(hash, text) {
      var i2;
      var chr;
      var len;
      if (text.length === 0) {
        return hash;
      }
      for (i2 = 0, len = text.length; i2 < len; i2++) {
        chr = text.charCodeAt(i2);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
      }
      return hash < 0 ? hash * -2 : hash;
    }
    function foldObject(hash, o2, seen) {
      return Object.keys(o2).sort().reduce(foldKey, hash);
      function foldKey(hash2, key) {
        return foldValue(hash2, o2[key], key, seen);
      }
    }
    function foldValue(input, value, key, seen) {
      var hash = fold(fold(fold(input, key), toString(value)), typeof value);
      if (value === null) {
        return fold(hash, "null");
      }
      if (value === void 0) {
        return fold(hash, "undefined");
      }
      if (typeof value === "object" || typeof value === "function") {
        if (seen.indexOf(value) !== -1) {
          return fold(hash, "[Circular]" + key);
        }
        seen.push(value);
        var objHash = foldObject(hash, value, seen);
        if (!("valueOf" in value) || typeof value.valueOf !== "function") {
          return objHash;
        }
        try {
          return fold(objHash, String(value.valueOf()));
        } catch (err) {
          return fold(objHash, "[valueOf exception]" + (err.stack || err.message));
        }
      }
      return fold(hash, value.toString());
    }
    function toString(o2) {
      return Object.prototype.toString.call(o2);
    }
    function sum(o2) {
      return pad(foldValue(0, o2, "", []).toString(16), 8);
    }
    module.exports = sum;
  }
});

// ../gen/srv/api/srv-args.ts
var srv_args_exports = {};
__export(srv_args_exports, {
  _dbs: () => _dbs,
  _file: () => _file,
  _img: () => _img,
  _parsejs: () => _parsejs,
  _upload: () => _upload,
  callback_payment: () => callback_payment,
  change_password: () => change_password,
  choose_template: () => choose_template,
  comp_attach: () => comp_attach,
  comp_create: () => comp_create,
  compile_js: () => compile_js,
  local_ip: () => local_ip,
  login: () => login,
  logout: () => logout,
  payment: () => payment,
  register: () => register,
  session: () => session,
  site_load: () => site_load,
  srvapi_check: () => srvapi_check,
  srvapi_dbpull: () => srvapi_dbpull,
  srvapi_destroy: () => srvapi_destroy,
  srvapi_new: () => srvapi_new,
  srvapi_op: () => srvapi_op,
  user_create: () => user_create,
  verification: () => verification
});
var _dbs, _file, _img, _parsejs, _upload, change_password, choose_template, login, logout, register, session, verification, callback_payment, payment, user_create, comp_attach, comp_create, compile_js, local_ip, site_load, srvapi_check, srvapi_dbpull, srvapi_destroy, srvapi_new, srvapi_op;
var init_srv_args = __esm({
  "../gen/srv/api/srv-args.ts"() {
    "use strict";
    _dbs = {
      url: "/_dbs/:dbName/:action",
      args: ["dbName", "action"]
    };
    _file = {
      url: "/_file/**",
      args: []
    };
    _img = {
      url: "/_img/**",
      args: []
    };
    _parsejs = {
      url: "/_parsejs",
      args: ["js"]
    };
    _upload = {
      url: "/_upload/:site",
      args: ["site"]
    };
    change_password = {
      url: "/change-password",
      args: ["data"]
    };
    choose_template = {
      url: "/choose-template",
      args: ["user"]
    };
    login = {
      url: "/_login",
      args: ["username", "password"]
    };
    logout = {
      url: "/_logout",
      args: []
    };
    register = {
      url: "/register",
      args: ["user"]
    };
    session = {
      url: "/_session",
      args: []
    };
    verification = {
      url: "/verification",
      args: ["phone"]
    };
    callback_payment = {
      url: "/callback-payment",
      args: []
    };
    payment = {
      url: "/_payment",
      args: ["info"]
    };
    user_create = {
      url: "/user-create",
      args: ["user"]
    };
    comp_attach = {
      url: "/comp-attach",
      args: ["arg"]
    };
    comp_create = {
      url: "/comp-create",
      args: ["arg"]
    };
    compile_js = {
      url: "/compile-js",
      args: ["alljs"]
    };
    local_ip = {
      url: "/local-ip",
      args: []
    };
    site_load = {
      url: "/site-load",
      args: ["name", "_page"]
    };
    srvapi_check = {
      url: "/srvapi-check/:site_id",
      args: ["site_id"]
    };
    srvapi_dbpull = {
      url: "/srvapi-dbpull",
      args: ["site_id", "dburl"]
    };
    srvapi_destroy = {
      url: "/srvapi-destroy",
      args: ["site_id"]
    };
    srvapi_new = {
      url: "/srvapi-new/:site_id",
      args: ["site_id"]
    };
    srvapi_op = {
      url: "/srvapi-op",
      args: ["site_id", "op"]
    };
  }
});

// ../gen/srv/api/entry-args.ts
var entry_args_exports = {};
__export(entry_args_exports, {
  srv: () => srv_args_exports
});
var init_entry_args = __esm({
  "../gen/srv/api/entry-args.ts"() {
    "use strict";
    init_srv_args();
  }
});

// ../../node_modules/.pnpm/lodash.trim@4.5.1/node_modules/lodash.trim/index.js
var require_lodash = __commonJS({
  "../../node_modules/.pnpm/lodash.trim@4.5.1/node_modules/lodash.trim/index.js"(exports, module) {
    var INFINITY = 1 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var rsAstralRange = "\\ud800-\\udfff";
    var rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23";
    var rsComboSymbolsRange = "\\u20d0-\\u20f0";
    var rsVarRange = "\\ufe0e\\ufe0f";
    var rsAstral = "[" + rsAstralRange + "]";
    var rsCombo = "[" + rsComboMarksRange + rsComboSymbolsRange + "]";
    var rsFitz = "\\ud83c[\\udffb-\\udfff]";
    var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
    var rsNonAstral = "[^" + rsAstralRange + "]";
    var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
    var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
    var rsZWJ = "\\u200d";
    var reOptMod = rsModifier + "?";
    var rsOptVar = "[" + rsVarRange + "]?";
    var rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
    var rsSeq = rsOptVar + reOptMod + rsOptJoin;
    var rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
    var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
    var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + "]");
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    function asciiToArray(string) {
      return string.split("");
    }
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    function baseIndexOf(array, value, fromIndex) {
      if (value !== value) {
        return baseFindIndex(array, baseIsNaN, fromIndex);
      }
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    function baseIsNaN(value) {
      return value !== value;
    }
    function charsStartIndex(strSymbols, chrSymbols) {
      var index = -1, length = strSymbols.length;
      while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }
    function charsEndIndex(strSymbols, chrSymbols) {
      var index = strSymbols.length;
      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }
    function stringToArray(string) {
      return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    }
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var Symbol2 = root.Symbol;
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseSlice(array, start, end) {
      var index = -1, length = array.length;
      if (start < 0) {
        start = -start > length ? 0 : length + start;
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : end - start >>> 0;
      start >>>= 0;
      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === void 0 ? length : end;
      return !start && end >= length ? array : baseSlice(array, start, end);
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    function trim2(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === void 0)) {
        return string.replace(reTrim, "");
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
      return castSlice(strSymbols, start, end).join("");
    }
    module.exports = trim2;
  }
});

// ../../node_modules/.pnpm/lodash.get@4.4.2/node_modules/lodash.get/index.js
var require_lodash2 = __commonJS({
  "../../node_modules/.pnpm/lodash.get@4.4.2/node_modules/lodash.get/index.js"(exports, module) {
    var FUNC_ERROR_TEXT = "Expected a function";
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var INFINITY = 1 / 0;
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var symbolTag = "[object Symbol]";
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    var reLeadingDot = /^\./;
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reEscapeChar = /\\(\\)?/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e2) {
        }
      }
      return result;
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    var Symbol2 = root.Symbol;
    var splice = arrayProto.splice;
    var Map2 = getNative(root, "Map");
    var nativeCreate = getNative(Object, "create");
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function Hash(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      return getMapData(this, key)["delete"](key);
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    function baseGet(object, path) {
      path = isKey(path, object) ? [path] : castPath(path);
      var index = 0, length = path.length;
      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return index && index == length ? object : void 0;
    }
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    function castPath(value) {
      return isArray(value) ? value : stringToPath(value);
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    var stringToPath = memoize(function(string) {
      string = toString(string);
      var result = [];
      if (reLeadingDot.test(string)) {
        result.push("");
      }
      string.replace(rePropName, function(match, number, quote, string2) {
        result.push(quote ? string2.replace(reEscapeChar, "$1") : number || match);
      });
      return result;
    });
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e2) {
        }
        try {
          return func + "";
        } catch (e2) {
        }
      }
      return "";
    }
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    }
    memoize.Cache = MapCache;
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    var isArray = Array.isArray;
    function isFunction(value) {
      var tag = isObject(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    function get2(object, path, defaultValue) {
      var result = object == null ? void 0 : baseGet(object, path);
      return result === void 0 ? defaultValue : result;
    }
    module.exports = get2;
  }
});

// ../../node_modules/.pnpm/@paralleldrive+cuid2@2.2.1/node_modules/@paralleldrive/cuid2/src/index.js
var require_src2 = __commonJS({
  "../../node_modules/.pnpm/@paralleldrive+cuid2@2.2.1/node_modules/@paralleldrive/cuid2/src/index.js"(exports, module) {
    var { sha3_512: sha3 } = require_sha3();
    var defaultLength = 24;
    var bigLength = 32;
    var createEntropy = (length = 4, random = Math.random) => {
      let entropy = "";
      while (entropy.length < length) {
        entropy = entropy + Math.floor(random() * 36).toString(36);
      }
      return entropy;
    };
    function bufToBigInt(buf) {
      let bits = 8n;
      let value = 0n;
      for (const i2 of buf.values()) {
        const bi = BigInt(i2);
        value = (value << bits) + bi;
      }
      return value;
    }
    var hash = (input = "") => {
      return bufToBigInt(sha3(input)).toString(36).slice(1);
    };
    var alphabet = Array.from(
      { length: 26 },
      (x, i2) => String.fromCharCode(i2 + 97)
    );
    var randomLetter = (random) => alphabet[Math.floor(random() * alphabet.length)];
    var createFingerprint = ({
      globalObj = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : {},
      random = Math.random
    } = {}) => {
      const globals = Object.keys(globalObj).toString();
      const sourceString = globals.length ? globals + createEntropy(bigLength, random) : createEntropy(bigLength, random);
      return hash(sourceString).substring(0, bigLength);
    };
    var createCounter = (count) => () => {
      return count++;
    };
    var initialCountMax = 476782367;
    var init = ({
      // Fallback if the user does not pass in a CSPRNG. This should be OK
      // because we don't rely solely on the random number generator for entropy.
      // We also use the host fingerprint, current time, and a session counter.
      random = Math.random,
      counter = createCounter(Math.floor(random() * initialCountMax)),
      length = defaultLength,
      fingerprint = createFingerprint({ random })
    } = {}) => {
      return function cuid22() {
        const firstLetter = randomLetter(random);
        const time = Date.now().toString(36);
        const count = counter().toString(36);
        const salt = createEntropy(length, random);
        const hashInput = `${time + salt + count + fingerprint}`;
        return `${firstLetter + hash(hashInput).substring(1, length)}`;
      };
    };
    var createId4 = init();
    var isCuid = (id, { minLength = 2, maxLength = bigLength } = {}) => {
      const length = id.length;
      const regex = /^[0-9a-z]+$/;
      try {
        if (typeof id === "string" && length >= minLength && length <= maxLength && regex.test(id))
          return true;
      } finally {
      }
      return false;
    };
    module.exports.getConstants = () => ({ defaultLength, bigLength });
    module.exports.init = init;
    module.exports.createId = createId4;
    module.exports.bufToBigInt = bufToBigInt;
    module.exports.createCounter = createCounter;
    module.exports.createFingerprint = createFingerprint;
    module.exports.isCuid = isCuid;
  }
});

// ../../node_modules/.pnpm/@paralleldrive+cuid2@2.2.1/node_modules/@paralleldrive/cuid2/index.js
var require_cuid22 = __commonJS({
  "../../node_modules/.pnpm/@paralleldrive+cuid2@2.2.1/node_modules/@paralleldrive/cuid2/index.js"(exports, module) {
    var { createId: createId4, init, getConstants, isCuid } = require_src2();
    module.exports.createId = createId4;
    module.exports.init = init;
    module.exports.getConstants = getConstants;
    module.exports.isCuid = isCuid;
  }
});

// ../../node_modules/.pnpm/ua-parser-js@1.0.35/node_modules/ua-parser-js/src/ua-parser.js
var require_ua_parser = __commonJS({
  "../../node_modules/.pnpm/ua-parser-js@1.0.35/node_modules/ua-parser-js/src/ua-parser.js"(exports, module) {
    (function(window2, undefined2) {
      "use strict";
      var LIBVERSION = "1.0.35", EMPTY = "", UNKNOWN = "?", FUNC_TYPE = "function", UNDEF_TYPE = "undefined", OBJ_TYPE = "object", STR_TYPE = "string", MAJOR = "major", MODEL = "model", NAME = "name", TYPE = "type", VENDOR = "vendor", VERSION = "version", ARCHITECTURE = "architecture", CONSOLE = "console", MOBILE = "mobile", TABLET = "tablet", SMARTTV = "smarttv", WEARABLE = "wearable", EMBEDDED = "embedded", UA_MAX_LENGTH = 350;
      var AMAZON = "Amazon", APPLE = "Apple", ASUS = "ASUS", BLACKBERRY = "BlackBerry", BROWSER = "Browser", CHROME = "Chrome", EDGE = "Edge", FIREFOX = "Firefox", GOOGLE = "Google", HUAWEI = "Huawei", LG = "LG", MICROSOFT = "Microsoft", MOTOROLA = "Motorola", OPERA = "Opera", SAMSUNG = "Samsung", SHARP = "Sharp", SONY = "Sony", VIERA = "Viera", XIAOMI = "Xiaomi", ZEBRA = "Zebra", FACEBOOK = "Facebook", CHROMIUM_OS = "Chromium OS", MAC_OS = "Mac OS";
      var extend = function(regexes2, extensions) {
        var mergedRegexes = {};
        for (var i2 in regexes2) {
          if (extensions[i2] && extensions[i2].length % 2 === 0) {
            mergedRegexes[i2] = extensions[i2].concat(regexes2[i2]);
          } else {
            mergedRegexes[i2] = regexes2[i2];
          }
        }
        return mergedRegexes;
      }, enumerize = function(arr) {
        var enums = {};
        for (var i2 = 0; i2 < arr.length; i2++) {
          enums[arr[i2].toUpperCase()] = arr[i2];
        }
        return enums;
      }, has = function(str1, str2) {
        return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
      }, lowerize = function(str) {
        return str.toLowerCase();
      }, majorize = function(version) {
        return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split(".")[0] : undefined2;
      }, trim2 = function(str, len) {
        if (typeof str === STR_TYPE) {
          str = str.replace(/^\s\s*/, EMPTY);
          return typeof len === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
        }
      };
      var rgxMapper = function(ua, arrays) {
        var i2 = 0, j, k, p2, q, matches, match;
        while (i2 < arrays.length && !matches) {
          var regex = arrays[i2], props = arrays[i2 + 1];
          j = k = 0;
          while (j < regex.length && !matches) {
            if (!regex[j]) {
              break;
            }
            matches = regex[j++].exec(ua);
            if (!!matches) {
              for (p2 = 0; p2 < props.length; p2++) {
                match = matches[++k];
                q = props[p2];
                if (typeof q === OBJ_TYPE && q.length > 0) {
                  if (q.length === 2) {
                    if (typeof q[1] == FUNC_TYPE) {
                      this[q[0]] = q[1].call(this, match);
                    } else {
                      this[q[0]] = q[1];
                    }
                  } else if (q.length === 3) {
                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                      this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined2;
                    } else {
                      this[q[0]] = match ? match.replace(q[1], q[2]) : undefined2;
                    }
                  } else if (q.length === 4) {
                    this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined2;
                  }
                } else {
                  this[q] = match ? match : undefined2;
                }
              }
            }
          }
          i2 += 2;
        }
      }, strMapper = function(str, map) {
        for (var i2 in map) {
          if (typeof map[i2] === OBJ_TYPE && map[i2].length > 0) {
            for (var j = 0; j < map[i2].length; j++) {
              if (has(map[i2][j], str)) {
                return i2 === UNKNOWN ? undefined2 : i2;
              }
            }
          } else if (has(map[i2], str)) {
            return i2 === UNKNOWN ? undefined2 : i2;
          }
        }
        return str;
      };
      var oldSafariMap = {
        "1.0": "/8",
        "1.2": "/1",
        "1.3": "/3",
        "2.0": "/412",
        "2.0.2": "/416",
        "2.0.3": "/417",
        "2.0.4": "/419",
        "?": "/"
      }, windowsVersionMap = {
        "ME": "4.90",
        "NT 3.11": "NT3.51",
        "NT 4.0": "NT4.0",
        "2000": "NT 5.0",
        "XP": ["NT 5.1", "NT 5.2"],
        "Vista": "NT 6.0",
        "7": "NT 6.1",
        "8": "NT 6.2",
        "8.1": "NT 6.3",
        "10": ["NT 6.4", "NT 10.0"],
        "RT": "ARM"
      };
      var regexes = {
        browser: [
          [
            /\b(?:crmo|crios)\/([\w\.]+)/i
            // Chrome for Android/iOS
          ],
          [VERSION, [NAME, "Chrome"]],
          [
            /edg(?:e|ios|a)?\/([\w\.]+)/i
            // Microsoft Edge
          ],
          [VERSION, [NAME, "Edge"]],
          [
            // Presto based
            /(opera mini)\/([-\w\.]+)/i,
            // Opera Mini
            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
            // Opera Mobi/Tablet
            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
            // Opera
          ],
          [NAME, VERSION],
          [
            /opios[\/ ]+([\w\.]+)/i
            // Opera mini on iphone >= 8.0
          ],
          [VERSION, [NAME, OPERA + " Mini"]],
          [
            /\bopr\/([\w\.]+)/i
            // Opera Webkit
          ],
          [VERSION, [NAME, OPERA]],
          [
            // Mixed
            /(kindle)\/([\w\.]+)/i,
            // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
            // Lunascape/Maxthon/Netfront/Jasmine/Blazer
            // Trident based
            /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
            // Avant/IEMobile/SlimBrowser
            /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
            // Baidu Browser
            /(?:ms|\()(ie) ([\w\.]+)/i,
            // Internet Explorer
            // Webkit/KHTML based                                               // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
            /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
            // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ, aka ShouQ
            /(heytap|ovi)browser\/([\d\.]+)/i,
            // Heytap/Ovi
            /(weibo)__([\d\.]+)/i
            // Weibo
          ],
          [NAME, VERSION],
          [
            /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
            // UCBrowser
          ],
          [VERSION, [NAME, "UC" + BROWSER]],
          [
            /microm.+\bqbcore\/([\w\.]+)/i,
            // WeChat Desktop for Windows Built-in Browser
            /\bqbcore\/([\w\.]+).+microm/i
          ],
          [VERSION, [NAME, "WeChat(Win) Desktop"]],
          [
            /micromessenger\/([\w\.]+)/i
            // WeChat
          ],
          [VERSION, [NAME, "WeChat"]],
          [
            /konqueror\/([\w\.]+)/i
            // Konqueror
          ],
          [VERSION, [NAME, "Konqueror"]],
          [
            /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
            // IE11
          ],
          [VERSION, [NAME, "IE"]],
          [
            /ya(?:search)?browser\/([\w\.]+)/i
            // Yandex
          ],
          [VERSION, [NAME, "Yandex"]],
          [
            /(avast|avg)\/([\w\.]+)/i
            // Avast/AVG Secure Browser
          ],
          [[NAME, /(.+)/, "$1 Secure " + BROWSER], VERSION],
          [
            /\bfocus\/([\w\.]+)/i
            // Firefox Focus
          ],
          [VERSION, [NAME, FIREFOX + " Focus"]],
          [
            /\bopt\/([\w\.]+)/i
            // Opera Touch
          ],
          [VERSION, [NAME, OPERA + " Touch"]],
          [
            /coc_coc\w+\/([\w\.]+)/i
            // Coc Coc Browser
          ],
          [VERSION, [NAME, "Coc Coc"]],
          [
            /dolfin\/([\w\.]+)/i
            // Dolphin
          ],
          [VERSION, [NAME, "Dolphin"]],
          [
            /coast\/([\w\.]+)/i
            // Opera Coast
          ],
          [VERSION, [NAME, OPERA + " Coast"]],
          [
            /miuibrowser\/([\w\.]+)/i
            // MIUI Browser
          ],
          [VERSION, [NAME, "MIUI " + BROWSER]],
          [
            /fxios\/([-\w\.]+)/i
            // Firefox for iOS
          ],
          [VERSION, [NAME, FIREFOX]],
          [
            /\bqihu|(qi?ho?o?|360)browser/i
            // 360
          ],
          [[NAME, "360 " + BROWSER]],
          [
            /(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i
          ],
          [[NAME, /(.+)/, "$1 " + BROWSER], VERSION],
          [
            // Oculus/Samsung/Sailfish/Huawei Browser
            /(comodo_dragon)\/([\w\.]+)/i
            // Comodo Dragon
          ],
          [[NAME, /_/g, " "], VERSION],
          [
            /(electron)\/([\w\.]+) safari/i,
            // Electron-based App
            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
            // Tesla
            /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i
            // QQBrowser/Baidu App/2345 Browser
          ],
          [NAME, VERSION],
          [
            /(metasr)[\/ ]?([\w\.]+)/i,
            // SouGouBrowser
            /(lbbrowser)/i,
            // LieBao Browser
            /\[(linkedin)app\]/i
            // LinkedIn App for iOS & Android
          ],
          [NAME],
          [
            // WebView
            /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
            // Facebook App for iOS & Android
          ],
          [[NAME, FACEBOOK], VERSION],
          [
            /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
            // Kakao App
            /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
            // Naver InApp
            /safari (line)\/([\w\.]+)/i,
            // Line App for iOS
            /\b(line)\/([\w\.]+)\/iab/i,
            // Line App for Android
            /(chromium|instagram)[\/ ]([-\w\.]+)/i
            // Chromium/Instagram
          ],
          [NAME, VERSION],
          [
            /\bgsa\/([\w\.]+) .*safari\//i
            // Google Search Appliance on iOS
          ],
          [VERSION, [NAME, "GSA"]],
          [
            /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i
            // TikTok
          ],
          [VERSION, [NAME, "TikTok"]],
          [
            /headlesschrome(?:\/([\w\.]+)| )/i
            // Chrome Headless
          ],
          [VERSION, [NAME, CHROME + " Headless"]],
          [
            / wv\).+(chrome)\/([\w\.]+)/i
            // Chrome WebView
          ],
          [[NAME, CHROME + " WebView"], VERSION],
          [
            /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
            // Android Browser
          ],
          [VERSION, [NAME, "Android " + BROWSER]],
          [
            /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
            // Chrome/OmniWeb/Arora/Tizen/Nokia
          ],
          [NAME, VERSION],
          [
            /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i
            // Mobile Safari
          ],
          [VERSION, [NAME, "Mobile Safari"]],
          [
            /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i
            // Safari & Safari Mobile
          ],
          [VERSION, NAME],
          [
            /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
            // Safari < 3.0
          ],
          [NAME, [VERSION, strMapper, oldSafariMap]],
          [
            /(webkit|khtml)\/([\w\.]+)/i
          ],
          [NAME, VERSION],
          [
            // Gecko based
            /(navigator|netscape\d?)\/([-\w\.]+)/i
            // Netscape
          ],
          [[NAME, "Netscape"], VERSION],
          [
            /mobile vr; rv:([\w\.]+)\).+firefox/i
            // Firefox Reality
          ],
          [VERSION, [NAME, FIREFOX + " Reality"]],
          [
            /ekiohf.+(flow)\/([\w\.]+)/i,
            // Flow
            /(swiftfox)/i,
            // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
            // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror/Klar
            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
            // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(firefox)\/([\w\.]+)/i,
            // Other Firefox-based
            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
            // Mozilla
            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
            // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir/Obigo/Mosaic/Go/ICE/UP.Browser
            /(links) \(([\w\.]+)/i,
            // Links
            /panasonic;(viera)/i
            // Panasonic Viera
          ],
          [NAME, VERSION],
          [
            /(cobalt)\/([\w\.]+)/i
            // Cobalt
          ],
          [NAME, [VERSION, /master.|lts./, ""]]
        ],
        cpu: [
          [
            /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i
            // AMD64 (x64)
          ],
          [[ARCHITECTURE, "amd64"]],
          [
            /(ia32(?=;))/i
            // IA32 (quicktime)
          ],
          [[ARCHITECTURE, lowerize]],
          [
            /((?:i[346]|x)86)[;\)]/i
            // IA32 (x86)
          ],
          [[ARCHITECTURE, "ia32"]],
          [
            /\b(aarch64|arm(v?8e?l?|_?64))\b/i
            // ARM64
          ],
          [[ARCHITECTURE, "arm64"]],
          [
            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
            // ARMHF
          ],
          [[ARCHITECTURE, "armhf"]],
          [
            // PocketPC mistakenly identified as PowerPC
            /windows (ce|mobile); ppc;/i
          ],
          [[ARCHITECTURE, "arm"]],
          [
            /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i
            // PowerPC
          ],
          [[ARCHITECTURE, /ower/, EMPTY, lowerize]],
          [
            /(sun4\w)[;\)]/i
            // SPARC
          ],
          [[ARCHITECTURE, "sparc"]],
          [
            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
            // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
          ],
          [[ARCHITECTURE, lowerize]]
        ],
        device: [
          [
            //////////////////////////
            // MOBILES & TABLETS
            /////////////////////////
            // Samsung
            /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
          ],
          [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]],
          [
            /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
            /samsung[- ]([-\w]+)/i,
            /sec-(sgh\w+)/i
          ],
          [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]],
          [
            // Apple
            /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i
            // iPod/iPhone
          ],
          [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]],
          [
            /\((ipad);[-\w\),; ]+apple/i,
            // iPad
            /applecoremedia\/[\w\.]+ \((ipad)/i,
            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
          ],
          [MODEL, [VENDOR, APPLE], [TYPE, TABLET]],
          [
            /(macintosh);/i
          ],
          [MODEL, [VENDOR, APPLE]],
          [
            // Sharp
            /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
          ],
          [MODEL, [VENDOR, SHARP], [TYPE, MOBILE]],
          [
            // Huawei
            /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
          ],
          [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]],
          [
            /(?:huawei|honor)([-\w ]+)[;\)]/i,
            /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
          ],
          [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]],
          [
            // Xiaomi
            /\b(poco[\w ]+)(?: bui|\))/i,
            // Xiaomi POCO
            /\b; (\w+) build\/hm\1/i,
            // Xiaomi Hongmi 'numeric' models
            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
            // Xiaomi Hongmi
            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
            // Xiaomi Redmi
            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i
            // Xiaomi Mi
          ],
          [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, MOBILE]],
          [
            /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i
            // Mi Pad tablets
          ],
          [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, TABLET]],
          [
            // OPPO
            /; (\w+) bui.+ oppo/i,
            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
          ],
          [MODEL, [VENDOR, "OPPO"], [TYPE, MOBILE]],
          [
            // Vivo
            /vivo (\w+)(?: bui|\))/i,
            /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
          ],
          [MODEL, [VENDOR, "Vivo"], [TYPE, MOBILE]],
          [
            // Realme
            /\b(rmx[12]\d{3})(?: bui|;|\))/i
          ],
          [MODEL, [VENDOR, "Realme"], [TYPE, MOBILE]],
          [
            // Motorola
            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
            /\bmot(?:orola)?[- ](\w*)/i,
            /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
          ],
          [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]],
          [
            /\b(mz60\d|xoom[2 ]{0,2}) build\//i
          ],
          [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]],
          [
            // LG
            /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
          ],
          [MODEL, [VENDOR, LG], [TYPE, TABLET]],
          [
            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
            /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
            /\blg-?([\d\w]+) bui/i
          ],
          [MODEL, [VENDOR, LG], [TYPE, MOBILE]],
          [
            // Lenovo
            /(ideatab[-\w ]+)/i,
            /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
          ],
          [MODEL, [VENDOR, "Lenovo"], [TYPE, TABLET]],
          [
            // Nokia
            /(?:maemo|nokia).*(n900|lumia \d+)/i,
            /nokia[-_ ]?([-\w\.]*)/i
          ],
          [[MODEL, /_/g, " "], [VENDOR, "Nokia"], [TYPE, MOBILE]],
          [
            // Google
            /(pixel c)\b/i
            // Google Pixel C
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]],
          [
            /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i
            // Google Pixel
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]],
          [
            // Sony
            /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
          ],
          [MODEL, [VENDOR, SONY], [TYPE, MOBILE]],
          [
            /sony tablet [ps]/i,
            /\b(?:sony)?sgp\w+(?: bui|\))/i
          ],
          [[MODEL, "Xperia Tablet"], [VENDOR, SONY], [TYPE, TABLET]],
          [
            // OnePlus
            / (kb2005|in20[12]5|be20[12][59])\b/i,
            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
          ],
          [MODEL, [VENDOR, "OnePlus"], [TYPE, MOBILE]],
          [
            // Amazon
            /(alexa)webm/i,
            /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
            // Kindle Fire without Silk / Echo Show
            /(kf[a-z]+)( bui|\)).+silk\//i
            // Kindle Fire HD
          ],
          [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]],
          [
            /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
            // Fire Phone
          ],
          [[MODEL, /(.+)/g, "Fire Phone $1"], [VENDOR, AMAZON], [TYPE, MOBILE]],
          [
            // BlackBerry
            /(playbook);[-\w\),; ]+(rim)/i
            // BlackBerry PlayBook
          ],
          [MODEL, VENDOR, [TYPE, TABLET]],
          [
            /\b((?:bb[a-f]|st[hv])100-\d)/i,
            /\(bb10; (\w+)/i
            // BlackBerry 10
          ],
          [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]],
          [
            // Asus
            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
          ],
          [MODEL, [VENDOR, ASUS], [TYPE, TABLET]],
          [
            / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
          ],
          [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]],
          [
            // HTC
            /(nexus 9)/i
            // HTC Nexus 9
          ],
          [MODEL, [VENDOR, "HTC"], [TYPE, TABLET]],
          [
            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
            // HTC
            // ZTE
            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
            /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i
            // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
          ],
          [VENDOR, [MODEL, /_/g, " "], [TYPE, MOBILE]],
          [
            // Acer
            /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
          ],
          [MODEL, [VENDOR, "Acer"], [TYPE, TABLET]],
          [
            // Meizu
            /droid.+; (m[1-5] note) bui/i,
            /\bmz-([-\w]{2,})/i
          ],
          [MODEL, [VENDOR, "Meizu"], [TYPE, MOBILE]],
          [
            // MIXED
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
            // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
            /(hp) ([\w ]+\w)/i,
            // HP iPAQ
            /(asus)-?(\w+)/i,
            // Asus
            /(microsoft); (lumia[\w ]+)/i,
            // Microsoft Lumia
            /(lenovo)[-_ ]?([-\w]+)/i,
            // Lenovo
            /(jolla)/i,
            // Jolla
            /(oppo) ?([\w ]+) bui/i
            // OPPO
          ],
          [VENDOR, MODEL, [TYPE, MOBILE]],
          [
            /(kobo)\s(ereader|touch)/i,
            // Kobo
            /(archos) (gamepad2?)/i,
            // Archos
            /(hp).+(touchpad(?!.+tablet)|tablet)/i,
            // HP TouchPad
            /(kindle)\/([\w\.]+)/i,
            // Kindle
            /(nook)[\w ]+build\/(\w+)/i,
            // Nook
            /(dell) (strea[kpr\d ]*[\dko])/i,
            // Dell Streak
            /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
            // Le Pan Tablets
            /(trinity)[- ]*(t\d{3}) bui/i,
            // Trinity Tablets
            /(gigaset)[- ]+(q\w{1,9}) bui/i,
            // Gigaset Tablets
            /(vodafone) ([\w ]+)(?:\)| bui)/i
            // Vodafone
          ],
          [VENDOR, MODEL, [TYPE, TABLET]],
          [
            /(surface duo)/i
            // Surface Duo
          ],
          [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]],
          [
            /droid [\d\.]+; (fp\du?)(?: b|\))/i
            // Fairphone
          ],
          [MODEL, [VENDOR, "Fairphone"], [TYPE, MOBILE]],
          [
            /(u304aa)/i
            // AT&T
          ],
          [MODEL, [VENDOR, "AT&T"], [TYPE, MOBILE]],
          [
            /\bsie-(\w*)/i
            // Siemens
          ],
          [MODEL, [VENDOR, "Siemens"], [TYPE, MOBILE]],
          [
            /\b(rct\w+) b/i
            // RCA Tablets
          ],
          [MODEL, [VENDOR, "RCA"], [TYPE, TABLET]],
          [
            /\b(venue[\d ]{2,7}) b/i
            // Dell Venue Tablets
          ],
          [MODEL, [VENDOR, "Dell"], [TYPE, TABLET]],
          [
            /\b(q(?:mv|ta)\w+) b/i
            // Verizon Tablet
          ],
          [MODEL, [VENDOR, "Verizon"], [TYPE, TABLET]],
          [
            /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i
            // Barnes & Noble Tablet
          ],
          [MODEL, [VENDOR, "Barnes & Noble"], [TYPE, TABLET]],
          [
            /\b(tm\d{3}\w+) b/i
          ],
          [MODEL, [VENDOR, "NuVision"], [TYPE, TABLET]],
          [
            /\b(k88) b/i
            // ZTE K Series Tablet
          ],
          [MODEL, [VENDOR, "ZTE"], [TYPE, TABLET]],
          [
            /\b(nx\d{3}j) b/i
            // ZTE Nubia
          ],
          [MODEL, [VENDOR, "ZTE"], [TYPE, MOBILE]],
          [
            /\b(gen\d{3}) b.+49h/i
            // Swiss GEN Mobile
          ],
          [MODEL, [VENDOR, "Swiss"], [TYPE, MOBILE]],
          [
            /\b(zur\d{3}) b/i
            // Swiss ZUR Tablet
          ],
          [MODEL, [VENDOR, "Swiss"], [TYPE, TABLET]],
          [
            /\b((zeki)?tb.*\b) b/i
            // Zeki Tablets
          ],
          [MODEL, [VENDOR, "Zeki"], [TYPE, TABLET]],
          [
            /\b([yr]\d{2}) b/i,
            /\b(dragon[- ]+touch |dt)(\w{5}) b/i
            // Dragon Touch Tablet
          ],
          [[VENDOR, "Dragon Touch"], MODEL, [TYPE, TABLET]],
          [
            /\b(ns-?\w{0,9}) b/i
            // Insignia Tablets
          ],
          [MODEL, [VENDOR, "Insignia"], [TYPE, TABLET]],
          [
            /\b((nxa|next)-?\w{0,9}) b/i
            // NextBook Tablets
          ],
          [MODEL, [VENDOR, "NextBook"], [TYPE, TABLET]],
          [
            /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i
            // Voice Xtreme Phones
          ],
          [[VENDOR, "Voice"], MODEL, [TYPE, MOBILE]],
          [
            /\b(lvtel\-)?(v1[12]) b/i
            // LvTel Phones
          ],
          [[VENDOR, "LvTel"], MODEL, [TYPE, MOBILE]],
          [
            /\b(ph-1) /i
            // Essential PH-1
          ],
          [MODEL, [VENDOR, "Essential"], [TYPE, MOBILE]],
          [
            /\b(v(100md|700na|7011|917g).*\b) b/i
            // Envizen Tablets
          ],
          [MODEL, [VENDOR, "Envizen"], [TYPE, TABLET]],
          [
            /\b(trio[-\w\. ]+) b/i
            // MachSpeed Tablets
          ],
          [MODEL, [VENDOR, "MachSpeed"], [TYPE, TABLET]],
          [
            /\btu_(1491) b/i
            // Rotor Tablets
          ],
          [MODEL, [VENDOR, "Rotor"], [TYPE, TABLET]],
          [
            /(shield[\w ]+) b/i
            // Nvidia Shield Tablets
          ],
          [MODEL, [VENDOR, "Nvidia"], [TYPE, TABLET]],
          [
            /(sprint) (\w+)/i
            // Sprint Phones
          ],
          [VENDOR, MODEL, [TYPE, MOBILE]],
          [
            /(kin\.[onetw]{3})/i
            // Microsoft Kin
          ],
          [[MODEL, /\./g, " "], [VENDOR, MICROSOFT], [TYPE, MOBILE]],
          [
            /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
            // Zebra
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]],
          [
            /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]],
          [
            ///////////////////
            // SMARTTVS
            ///////////////////
            /smart-tv.+(samsung)/i
            // Samsung
          ],
          [VENDOR, [TYPE, SMARTTV]],
          [
            /hbbtv.+maple;(\d+)/i
          ],
          [[MODEL, /^/, "SmartTV"], [VENDOR, SAMSUNG], [TYPE, SMARTTV]],
          [
            /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
            // LG SmartTV
          ],
          [[VENDOR, LG], [TYPE, SMARTTV]],
          [
            /(apple) ?tv/i
            // Apple TV
          ],
          [VENDOR, [MODEL, APPLE + " TV"], [TYPE, SMARTTV]],
          [
            /crkey/i
            // Google Chromecast
          ],
          [[MODEL, CHROME + "cast"], [VENDOR, GOOGLE], [TYPE, SMARTTV]],
          [
            /droid.+aft(\w)( bui|\))/i
            // Fire TV
          ],
          [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]],
          [
            /\(dtv[\);].+(aquos)/i,
            /(aquos-tv[\w ]+)\)/i
            // Sharp
          ],
          [MODEL, [VENDOR, SHARP], [TYPE, SMARTTV]],
          [
            /(bravia[\w ]+)( bui|\))/i
            // Sony
          ],
          [MODEL, [VENDOR, SONY], [TYPE, SMARTTV]],
          [
            /(mitv-\w{5}) bui/i
            // Xiaomi
          ],
          [MODEL, [VENDOR, XIAOMI], [TYPE, SMARTTV]],
          [
            /Hbbtv.*(technisat) (.*);/i
            // TechniSAT
          ],
          [VENDOR, MODEL, [TYPE, SMARTTV]],
          [
            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
            // Roku
            /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i
            // HbbTV devices
          ],
          [[VENDOR, trim2], [MODEL, trim2], [TYPE, SMARTTV]],
          [
            /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i
            // SmartTV from Unidentified Vendors
          ],
          [[TYPE, SMARTTV]],
          [
            ///////////////////
            // CONSOLES
            ///////////////////
            /(ouya)/i,
            // Ouya
            /(nintendo) ([wids3utch]+)/i
            // Nintendo
          ],
          [VENDOR, MODEL, [TYPE, CONSOLE]],
          [
            /droid.+; (shield) bui/i
            // Nvidia
          ],
          [MODEL, [VENDOR, "Nvidia"], [TYPE, CONSOLE]],
          [
            /(playstation [345portablevi]+)/i
            // Playstation
          ],
          [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]],
          [
            /\b(xbox(?: one)?(?!; xbox))[\); ]/i
            // Microsoft Xbox
          ],
          [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]],
          [
            ///////////////////
            // WEARABLES
            ///////////////////
            /((pebble))app/i
            // Pebble
          ],
          [VENDOR, MODEL, [TYPE, WEARABLE]],
          [
            /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i
            // Apple Watch
          ],
          [MODEL, [VENDOR, APPLE], [TYPE, WEARABLE]],
          [
            /droid.+; (glass) \d/i
            // Google Glass
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]],
          [
            /droid.+; (wt63?0{2,3})\)/i
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]],
          [
            /(quest( 2| pro)?)/i
            // Oculus Quest
          ],
          [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]],
          [
            ///////////////////
            // EMBEDDED
            ///////////////////
            /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
            // Tesla
          ],
          [VENDOR, [TYPE, EMBEDDED]],
          [
            /(aeobc)\b/i
            // Echo Dot
          ],
          [MODEL, [VENDOR, AMAZON], [TYPE, EMBEDDED]],
          [
            ////////////////////
            // MIXED (GENERIC)
            ///////////////////
            /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i
            // Android Phones from Unidentified Vendors
          ],
          [MODEL, [TYPE, MOBILE]],
          [
            /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i
            // Android Tablets from Unidentified Vendors
          ],
          [MODEL, [TYPE, TABLET]],
          [
            /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
            // Unidentifiable Tablet
          ],
          [[TYPE, TABLET]],
          [
            /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i
            // Unidentifiable Mobile
          ],
          [[TYPE, MOBILE]],
          [
            /(android[-\w\. ]{0,9});.+buil/i
            // Generic Android Device
          ],
          [MODEL, [VENDOR, "Generic"]]
        ],
        engine: [
          [
            /windows.+ edge\/([\w\.]+)/i
            // EdgeHTML
          ],
          [VERSION, [NAME, EDGE + "HTML"]],
          [
            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
            // Blink
          ],
          [VERSION, [NAME, "Blink"]],
          [
            /(presto)\/([\w\.]+)/i,
            // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
            // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
            /ekioh(flow)\/([\w\.]+)/i,
            // Flow
            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
            // KHTML/Tasman/Links
            /(icab)[\/ ]([23]\.[\d\.]+)/i,
            // iCab
            /\b(libweb)/i
          ],
          [NAME, VERSION],
          [
            /rv\:([\w\.]{1,9})\b.+(gecko)/i
            // Gecko
          ],
          [VERSION, NAME]
        ],
        os: [
          [
            // Windows
            /microsoft (windows) (vista|xp)/i
            // Windows (iTunes)
          ],
          [NAME, VERSION],
          [
            /(windows) nt 6\.2; (arm)/i,
            // Windows RT
            /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
            // Windows Phone
            /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i
          ],
          [NAME, [VERSION, strMapper, windowsVersionMap]],
          [
            /(win(?=3|9|n)|win 9x )([nt\d\.]+)/i
          ],
          [[NAME, "Windows"], [VERSION, strMapper, windowsVersionMap]],
          [
            // iOS/macOS
            /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
            // iOS
            /ios;fbsv\/([\d\.]+)/i,
            /cfnetwork\/.+darwin/i
          ],
          [[VERSION, /_/g, "."], [NAME, "iOS"]],
          [
            /(mac os x) ?([\w\. ]*)/i,
            /(macintosh|mac_powerpc\b)(?!.+haiku)/i
            // Mac OS
          ],
          [[NAME, MAC_OS], [VERSION, /_/g, "."]],
          [
            // Mobile OSes
            /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i
            // Android-x86/HarmonyOS
          ],
          [VERSION, NAME],
          [
            // Android/WebOS/QNX/Bada/RIM/Maemo/MeeGo/Sailfish OS
            /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
            /(blackberry)\w*\/([\w\.]*)/i,
            // Blackberry
            /(tizen|kaios)[\/ ]([\w\.]+)/i,
            // Tizen/KaiOS
            /\((series40);/i
            // Series 40
          ],
          [NAME, VERSION],
          [
            /\(bb(10);/i
            // BlackBerry 10
          ],
          [VERSION, [NAME, BLACKBERRY]],
          [
            /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i
            // Symbian
          ],
          [VERSION, [NAME, "Symbian"]],
          [
            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
            // Firefox OS
          ],
          [VERSION, [NAME, FIREFOX + " OS"]],
          [
            /web0s;.+rt(tv)/i,
            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
            // WebOS
          ],
          [VERSION, [NAME, "webOS"]],
          [
            /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i
            // watchOS
          ],
          [VERSION, [NAME, "watchOS"]],
          [
            // Google Chromecast
            /crkey\/([\d\.]+)/i
            // Google Chromecast
          ],
          [VERSION, [NAME, CHROME + "cast"]],
          [
            /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i
            // Chromium OS
          ],
          [[NAME, CHROMIUM_OS], VERSION],
          [
            // Smart TVs
            /panasonic;(viera)/i,
            // Panasonic Viera
            /(netrange)mmh/i,
            // Netrange
            /(nettv)\/(\d+\.[\w\.]+)/i,
            // NetTV
            // Console
            /(nintendo|playstation) ([wids345portablevuch]+)/i,
            // Nintendo/Playstation
            /(xbox); +xbox ([^\);]+)/i,
            // Microsoft Xbox (360, One, X, S, Series X, Series S)
            // Other
            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
            // Joli/Palm
            /(mint)[\/\(\) ]?(\w*)/i,
            // Mint
            /(mageia|vectorlinux)[; ]/i,
            // Mageia/VectorLinux
            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
            // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
            /(hurd|linux) ?([\w\.]*)/i,
            // Hurd/Linux
            /(gnu) ?([\w\.]*)/i,
            // GNU
            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
            // FreeBSD/NetBSD/OpenBSD/PC-BSD/GhostBSD/DragonFly
            /(haiku) (\w+)/i
            // Haiku
          ],
          [NAME, VERSION],
          [
            /(sunos) ?([\w\.\d]*)/i
            // Solaris
          ],
          [[NAME, "Solaris"], VERSION],
          [
            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
            // Solaris
            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
            // AIX
            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
            // BeOS/OS2/AmigaOS/MorphOS/OpenVMS/Fuchsia/HP-UX/SerenityOS
            /(unix) ?([\w\.]*)/i
            // UNIX
          ],
          [NAME, VERSION]
        ]
      };
      var UAParser = function(ua, extensions) {
        if (typeof ua === OBJ_TYPE) {
          extensions = ua;
          ua = undefined2;
        }
        if (!(this instanceof UAParser)) {
          return new UAParser(ua, extensions).getResult();
        }
        var _navigator = typeof window2 !== UNDEF_TYPE && window2.navigator ? window2.navigator : undefined2;
        var _ua = ua || (_navigator && _navigator.userAgent ? _navigator.userAgent : EMPTY);
        var _uach = _navigator && _navigator.userAgentData ? _navigator.userAgentData : undefined2;
        var _rgxmap = extensions ? extend(regexes, extensions) : regexes;
        var _isSelfNav = _navigator && _navigator.userAgent == _ua;
        this.getBrowser = function() {
          var _browser = {};
          _browser[NAME] = undefined2;
          _browser[VERSION] = undefined2;
          rgxMapper.call(_browser, _ua, _rgxmap.browser);
          _browser[MAJOR] = majorize(_browser[VERSION]);
          if (_isSelfNav && _navigator && _navigator.brave && typeof _navigator.brave.isBrave == FUNC_TYPE) {
            _browser[NAME] = "Brave";
          }
          return _browser;
        };
        this.getCPU = function() {
          var _cpu = {};
          _cpu[ARCHITECTURE] = undefined2;
          rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
          return _cpu;
        };
        this.getDevice = function() {
          var _device = {};
          _device[VENDOR] = undefined2;
          _device[MODEL] = undefined2;
          _device[TYPE] = undefined2;
          rgxMapper.call(_device, _ua, _rgxmap.device);
          if (_isSelfNav && !_device[TYPE] && _uach && _uach.mobile) {
            _device[TYPE] = MOBILE;
          }
          if (_isSelfNav && _device[MODEL] == "Macintosh" && _navigator && typeof _navigator.standalone !== UNDEF_TYPE && _navigator.maxTouchPoints && _navigator.maxTouchPoints > 2) {
            _device[MODEL] = "iPad";
            _device[TYPE] = TABLET;
          }
          return _device;
        };
        this.getEngine = function() {
          var _engine = {};
          _engine[NAME] = undefined2;
          _engine[VERSION] = undefined2;
          rgxMapper.call(_engine, _ua, _rgxmap.engine);
          return _engine;
        };
        this.getOS = function() {
          var _os = {};
          _os[NAME] = undefined2;
          _os[VERSION] = undefined2;
          rgxMapper.call(_os, _ua, _rgxmap.os);
          if (_isSelfNav && !_os[NAME] && _uach && _uach.platform != "Unknown") {
            _os[NAME] = _uach.platform.replace(/chrome os/i, CHROMIUM_OS).replace(/macos/i, MAC_OS);
          }
          return _os;
        };
        this.getResult = function() {
          return {
            ua: this.getUA(),
            browser: this.getBrowser(),
            engine: this.getEngine(),
            os: this.getOS(),
            device: this.getDevice(),
            cpu: this.getCPU()
          };
        };
        this.getUA = function() {
          return _ua;
        };
        this.setUA = function(ua2) {
          _ua = typeof ua2 === STR_TYPE && ua2.length > UA_MAX_LENGTH ? trim2(ua2, UA_MAX_LENGTH) : ua2;
          return this;
        };
        this.setUA(_ua);
        return this;
      };
      UAParser.VERSION = LIBVERSION;
      UAParser.BROWSER = enumerize([NAME, VERSION, MAJOR]);
      UAParser.CPU = enumerize([ARCHITECTURE]);
      UAParser.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
      UAParser.ENGINE = UAParser.OS = enumerize([NAME, VERSION]);
      if (typeof exports !== UNDEF_TYPE) {
        if (typeof module !== UNDEF_TYPE && module.exports) {
          exports = module.exports = UAParser;
        }
        exports.UAParser = UAParser;
      } else {
        if (typeof define === FUNC_TYPE && define.amd) {
          define(function() {
            return UAParser;
          });
        } else if (typeof window2 !== UNDEF_TYPE) {
          window2.UAParser = UAParser;
        }
      }
      var $ = typeof window2 !== UNDEF_TYPE && (window2.jQuery || window2.Zepto);
      if ($ && !$.ua) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function() {
          return parser.getUA();
        };
        $.ua.set = function(ua) {
          parser.setUA(ua);
          var result = parser.getResult();
          for (var prop in result) {
            $.ua[prop] = result[prop];
          }
        };
      }
    })(typeof window === "object" ? window : exports);
  }
});

// ../../pkgs/service/pkgs/service-web/pkgs/web-init/src/web/define-window.ts
import React from "react";
import JSXDevRuntime from "react/jsx-dev-runtime";
import ReactDOMServer from "react-dom/server";
import ReactDOM from "react-dom";
import JSXRuntime from "react/jsx-runtime";

// ../../pkgs/service/pkgs/service-web/pkgs/web-utils/src/use-local.ts
import { useEffect, useRef, useState } from "react";
var useLocal = (data, effect, deps) => {
  const [, _render] = useState({});
  const _ = useRef({
    data,
    deps: deps || [],
    promisedKeys: /* @__PURE__ */ new Set(),
    ready: false,
    _loading: {}
  });
  const local = _.current;
  useEffect(() => {
    local.ready = true;
    if (effect)
      effect({ init: true });
  }, []);
  if (local.ready === false) {
    local._loading = {};
    for (const [k, v] of Object.entries(data)) {
      if (!local.promisedKeys.has(k)) {
        let val = v;
        if (typeof val === "object" && val instanceof Promise) {
          local._loading[k] = true;
          local.promisedKeys.add(k);
          local.data[k] = null;
          val.then((resolved) => {
            local.data[k] = resolved;
            local._loading[k] = false;
            local.data.render();
          });
        }
      }
    }
    local.data.render = () => {
      if (local.ready)
        _render({});
    };
  } else {
    if (local.deps.length > 0 && deps) {
      for (const [k, dep] of Object.entries(deps)) {
        if (local.deps[k] !== dep) {
          local.deps[k] = dep;
          if (effect) {
            setTimeout(() => {
              effect({ init: false });
            });
          }
          break;
        }
      }
    }
  }
  return local.data;
};

// ../../pkgs/service/pkgs/service-web/pkgs/web-utils/src/wait-until.ts
var waitUntil = (condition, timeout) => {
  return new Promise(async (resolve) => {
    if (typeof condition === "function") {
      let tout = null;
      if (timeout) {
        tout = setTimeout(resolve, timeout);
      }
      if (await condition()) {
        clearTimeout(tout);
        resolve();
        return;
      }
      let count = 0;
      const c2 = setInterval(async () => {
        if (await condition()) {
          if (tout)
            clearTimeout(tout);
          clearInterval(c2);
          resolve();
        }
        if (count > 100) {
          clearInterval(c2);
        }
      }, 10);
    } else if (typeof condition === "number") {
      setTimeout(() => {
        resolve();
      }, condition);
    }
  });
};

// ../../pkgs/service/pkgs/service-web/pkgs/web-utils/src/lazify.ts
import { lazy } from "react";

// ../../pkgs/service/pkgs/service-web/pkgs/web-utils/src/use-global.ts
var import_cuid2 = __toESM(require_cuid2());
import {
  createContext,
  startTransition,
  useContext,
  useEffect as useEffect2,
  useState as useState2
} from "react";
var w = window;
var GlobalContext = createContext({
  global: {},
  render: () => {
  }
});
var useGlobal = (defaultValue, effectOrID, id) => {
  if (!w.globalValueID)
    w.globalValueID = /* @__PURE__ */ new WeakMap();
  let _id = typeof effectOrID === "string" ? effectOrID : id;
  if (!_id) {
    if (!w.globalValueID.has(defaultValue)) {
      w.globalValueID.set(defaultValue, (0, import_cuid2.createId)());
    }
    _id = w.globalValueID.get(defaultValue) || "";
  }
  if (!_id) {
    _id = "GLOBAL_DEFAULT";
  }
  const ctx = useContext(GlobalContext);
  const { global: global2, render } = ctx;
  if (!global2[_id]) {
    global2[_id] = JSON.parse(JSON.stringify(defaultValue));
  }
  useEffect2(() => {
    let res2 = null;
    if (typeof effectOrID === "function") {
      try {
        res2 = effectOrID();
      } catch (e2) {
        console.log(e2);
      }
    }
    return () => {
      if (typeof res2 === "function")
        res2();
      else if (res2 instanceof Promise) {
        res2.then((e2) => {
          if (typeof e2 === "function")
            e2();
        });
      }
    };
  }, []);
  const res = global2[_id];
  res.render = () => {
    startTransition(render);
  };
  return res;
};

// ../../pkgs/service/pkgs/service-web/pkgs/web-utils/src/export.ts
import * as _React from "react";
import * as _ReactDomServer from "react-dom/server";

// ../../pkgs/service/pkgs/service-web/pkgs/web-init/src/web/iframe-cors.ts
var import_cuid22 = __toESM(require_cuid2());
var cuid = import_cuid22.createId;
var createFrameCors = async (url, win) => {
  let w7 = window;
  if (!!win) {
    w7 = win;
  }
  const document2 = w7.document;
  const id = `__` + url.replace(/\W/g, "");
  if (typeof document2 !== "undefined" && !document2.querySelector(`#${id}`)) {
    const iframe = document2.createElement("iframe");
    iframe.style.display = "none";
    iframe.id = id;
    const _url = new URL(url);
    _url.pathname = "/_api_frm";
    iframe.src = _url.toString();
    await new Promise((resolve) => {
      const onInit = (e2) => {
        if (e2.data === "initialized") {
          iframe.setAttribute("loaded", "y");
          w7.removeEventListener("message", onInit);
          resolve();
        }
      };
      w7.addEventListener("message", onInit);
      document2.body.appendChild(iframe);
    });
  }
  const wm = {};
  const sendRaw = async (input, init) => {
    if (w7.document && w7.document.querySelector) {
      const iframe = w7.document.querySelector(`#${id}`);
      if (!iframe || !iframe.contentWindow || iframe && iframe.getAttribute("loaded") !== "y") {
        await waitUntil(
          () => iframe && iframe.contentWindow && iframe.getAttribute("loaded") === "y"
        );
      }
      return await new Promise((resolve, reject) => {
        if (iframe && iframe.contentWindow) {
          const id2 = cuid();
          wm[id2] = (e2) => {
            if (id2 === e2.data.id) {
              w7.removeEventListener("message", wm[id2]);
              delete wm[id2];
              if (e2.data.error) {
                let err = e2.data.error;
                reject(
                  err.replace(
                    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
                    ""
                  )
                );
              } else {
                resolve(e2.data.result);
              }
            }
          };
          w7.addEventListener("message", wm[id2]);
          iframe.contentWindow.postMessage({ input, init, id: id2 }, "*");
        }
      });
    }
  };
  return {
    async send(input, data, _headers) {
      const uri = input.toString();
      const headers = { ..._headers };
      if (!(data instanceof w7.FormData || data instanceof w7.File)) {
        headers["content-type"] = "application/json";
      } else {
        if (data instanceof w7.File) {
          let ab = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener("load", (e2) => {
              resolve(e2.target?.result);
            });
            reader.readAsArrayBuffer(data);
          });
          if (ab) {
            data = new File([ab], data.name);
          }
        }
      }
      return await sendRaw(
        `${url.endsWith("/") ? url : `${url}/`}${uri.startsWith("/") ? uri.substring(1) : uri}`,
        data ? {
          method: "post",
          headers,
          body: data instanceof w7.FormData || data instanceof w7.File ? data : JSON.stringify(data)
        } : {}
      );
    }
  };
};
var fetchSendApi = async (_url, params, parentWindow) => {
  let w7 = typeof window === "object" ? window : globalThis;
  if (isSSR) {
    let data = params;
    const headers = {};
    if (!(data instanceof w7.FormData || data instanceof w7.File)) {
      headers["content-type"] = "application/json";
    } else {
      if (data instanceof w7.File) {
        let ab = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.addEventListener("load", (e2) => {
            resolve(e2.target?.result);
          });
          reader.readAsArrayBuffer(data);
        });
        if (ab) {
          data = new File([ab], data.name);
        }
      }
    }
    const init = { body: data, headers, method: "POST" };
    if (init && init.body && init.body instanceof File) {
      const body2 = new FormData();
      body2.append("file", init.body);
      init.body = body2;
    } else {
      init.body = JSON.stringify(data);
    }
    const res = await fetch(w7.serverurl + _url, init);
    const body = await res.text();
    try {
      return JSON.parse(body);
    } catch (e2) {
      return body;
    }
  }
  const win = parentWindow || w7;
  let url = _url;
  let frm;
  if (!win.frmapi) {
    win.frmapi = {};
    win.frmapi[w7.serverurl] = await createFrameCors(w7.serverurl, win);
  }
  frm = win.frmapi[w7.serverurl];
  if (url.startsWith("http")) {
    const purl = new URL(url);
    if (!win.frmapi[purl.host]) {
      win.frmapi[purl.host] = await createFrameCors(
        `${purl.protocol}//${purl.host}`
      );
    }
    frm = win.frmapi[purl.host];
    url = url.substring(`${purl.protocol}//${purl.host}`.length);
  }
  if (!win.apiHeaders) {
    win.apiHeaders = {};
  }
  if (!frm) {
    await waitUntil(() => {
      frm = win.frmapi[w7.serverurl];
      return frm;
    });
  }
  return await frm.send(url, params, win.apiHeaders);
};

// ../../pkgs/service/pkgs/service-web/pkgs/web-init/src/web/api.ts
var apiClient = (api, apiURL) => {
  return new Proxy(
    {},
    {
      get: (_, actionName) => {
        return (...rest) => {
          return new Promise(async (resolve) => {
            if (!api || !api[actionName]) {
              resolve(null);
              console.error(`API ${actionName.toString()} not found;`);
              return;
            }
            let actionUrl = api[actionName].url;
            const actionParams = api[actionName].args;
            if (actionUrl && actionParams) {
              if (rest.length > 0 && actionParams.length > 0) {
                for (const [idx, p2] of Object.entries(rest)) {
                  const paramName = actionParams[parseInt(idx)];
                  if (actionParams && actionParams.includes(paramName)) {
                    if (!!p2 && typeof p2 !== "string" && typeof p2 !== "number") {
                      continue;
                    }
                  }
                  actionUrl = actionUrl.replace(`:${paramName}?`, p2 + "");
                  actionUrl = actionUrl.replace(`:${paramName}`, p2 + "");
                }
              }
              let basePath = basepath === "/" ? "" : basepath;
              const url = `${apiURL || basePath}${actionUrl}`;
              const result = await fetchSendApi(url, rest);
              resolve(result);
            } else {
              console.error(`API Not Found: ${actionName.toString()}`);
            }
          });
        };
      }
    }
  );
};

// ../../pkgs/service/pkgs/service-web/pkgs/web-init/src/web/db.ts
var import_hash_sum = __toESM(require_hash_sum());
var dbClient = (name, dburl) => {
  return new Proxy(
    {},
    {
      get(_, table) {
        if (table === "_tables") {
          return () => {
            return fetchSendDb(
              name,
              {
                name,
                action: "definition",
                table: "*"
              },
              dburl
            );
          };
        }
        if (table === "_definition") {
          return (table2) => {
            return fetchSendDb(
              name,
              {
                name,
                action: "definition",
                table: table2
              },
              dburl
            );
          };
        }
        if (table.startsWith("$")) {
          return (...params) => {
            return fetchSendDb(
              name,
              {
                name,
                action: "query",
                table,
                params
              },
              dburl
            );
          };
        }
        return new Proxy(
          {},
          {
            get(_2, action) {
              return (...params) => {
                if (table === "query") {
                  table = action;
                  action = "query";
                }
                return fetchSendDb(
                  name,
                  {
                    name,
                    action,
                    table,
                    params
                  },
                  dburl
                );
              };
            }
          }
        );
      }
    }
  );
};
var cachedQueryResult = {};
var fetchSendDb = async (name, params, dburl) => {
  const w7 = typeof window === "object" ? window : globalThis;
  let url = `/_dbs/${name}`;
  let frm;
  if (params.table) {
    url += `/${params.table}`;
  }
  const _base = dburl || w7.serverurl;
  if (isSSR) {
    const res = await fetch(`${dburl}${url}`, {
      method: "post",
      body: JSON.stringify(params)
    });
    const json = await res.json();
    return json;
  }
  if (!w7.frmapi) {
    w7.frmapi = {};
  }
  if (!w7.frmapi[_base]) {
    w7.frmapi[_base] = await createFrameCors(_base);
  }
  frm = w7.frmapi[_base];
  if (!frm) {
    await waitUntil(() => {
      frm = w7.frmapi[_base];
      return frm;
    });
  }
  const hsum = (0, import_hash_sum.default)(params);
  const cached = cachedQueryResult[hsum];
  if (!cached || cached && Date.now() - cached.timestamp > 1e3) {
    cachedQueryResult[hsum] = {
      timestamp: Date.now(),
      result: null
    };
    const result = await frm.send(url, params, w7.apiHeaders);
    cachedQueryResult[hsum].result = result;
    return result;
  }
  return cached.result;
};

// ../../node_modules/.pnpm/goober@2.1.12_csstype@3.1.1/node_modules/goober/dist/goober.modern.js
var e = { data: "" };
var t = (t2) => "object" == typeof window ? ((t2 ? t2.querySelector("#_goober") : window._goober) || Object.assign((t2 || document.head).appendChild(document.createElement("style")), { innerHTML: " ", id: "_goober" })).firstChild : t2 || e;
var r = (e2) => {
  let r2 = t(e2), l2 = r2.data;
  return r2.data = "", l2;
};
var l = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g;
var a = /\/\*[^]*?\*\/|  +/g;
var n = /\n+/g;
var o = (e2, t2) => {
  let r2 = "", l2 = "", a2 = "";
  for (let n2 in e2) {
    let c2 = e2[n2];
    "@" == n2[0] ? "i" == n2[1] ? r2 = n2 + " " + c2 + ";" : l2 += "f" == n2[1] ? o(c2, n2) : n2 + "{" + o(c2, "k" == n2[1] ? "" : t2) + "}" : "object" == typeof c2 ? l2 += o(c2, t2 ? t2.replace(/([^,])+/g, (e3) => n2.replace(/(^:.*)|([^,])+/g, (t3) => /&/.test(t3) ? t3.replace(/&/g, e3) : e3 ? e3 + " " + t3 : t3)) : n2) : null != c2 && (n2 = /^--/.test(n2) ? n2 : n2.replace(/[A-Z]/g, "-$&").toLowerCase(), a2 += o.p ? o.p(n2, c2) : n2 + ":" + c2 + ";");
  }
  return r2 + (t2 && a2 ? t2 + "{" + a2 + "}" : a2) + l2;
};
var c = {};
var s = (e2) => {
  if ("object" == typeof e2) {
    let t2 = "";
    for (let r2 in e2)
      t2 += r2 + s(e2[r2]);
    return t2;
  }
  return e2;
};
var i = (e2, t2, r2, i2, p2) => {
  let u2 = s(e2), d = c[u2] || (c[u2] = ((e3) => {
    let t3 = 0, r3 = 11;
    for (; t3 < e3.length; )
      r3 = 101 * r3 + e3.charCodeAt(t3++) >>> 0;
    return "go" + r3;
  })(u2));
  if (!c[d]) {
    let t3 = u2 !== e2 ? e2 : ((e3) => {
      let t4, r3, o2 = [{}];
      for (; t4 = l.exec(e3.replace(a, "")); )
        t4[4] ? o2.shift() : t4[3] ? (r3 = t4[3].replace(n, " ").trim(), o2.unshift(o2[0][r3] = o2[0][r3] || {})) : o2[0][t4[1]] = t4[2].replace(n, " ").trim();
      return o2[0];
    })(e2);
    c[d] = o(p2 ? { ["@keyframes " + d]: t3 } : t3, r2 ? "" : "." + d);
  }
  let f = r2 && c.g ? c.g : null;
  return r2 && (c.g = c[d]), ((e3, t3, r3, l2) => {
    l2 ? t3.data = t3.data.replace(l2, e3) : -1 === t3.data.indexOf(e3) && (t3.data = r3 ? e3 + t3.data : t3.data + e3);
  })(c[d], t2, i2, f), d;
};
var p = (e2, t2, r2) => e2.reduce((e3, l2, a2) => {
  let n2 = t2[a2];
  if (n2 && n2.call) {
    let e4 = n2(r2), t3 = e4 && e4.props && e4.props.className || /^go/.test(e4) && e4;
    n2 = t3 ? "." + t3 : e4 && "object" == typeof e4 ? e4.props ? "" : o(e4, "") : false === e4 ? "" : e4;
  }
  return e3 + l2 + (null == n2 ? "" : n2);
}, "");
function u(e2) {
  let r2 = this || {}, l2 = e2.call ? e2(r2.p) : e2;
  return i(l2.unshift ? l2.raw ? p(l2, [].slice.call(arguments, 1), r2.p) : l2.reduce((e3, t2) => Object.assign(e3, t2 && t2.call ? t2(r2.p) : t2), {}) : l2, t(r2.target), r2.g, r2.o, r2.k);
}
var b = u.bind({ g: 1 });
var h = u.bind({ k: 1 });

// ../../pkgs/service/pkgs/service-web/pkgs/web-init/src/web/define-window.ts
var defineWindow = async (baseurl) => {
  const w7 = typeof window === "object" ? window : globalThis;
  const location2 = typeof window === "object" ? window["location"] : baseurl;
  const host = 0 === location2.protocol.indexOf("http") ? location2.hostname : "localhost", scheme = "https:" != location2.protocol || /localhost|127.0.0.1|0.0.0.0/.test(host) ? "http" : "https";
  w7.serverurl = __SRV_URL__;
  const port = location2.port;
  w7.baseurl = scheme + "://" + host + (port ? ":" + port : "") + "/";
  w7.basepath = "/";
  w7.React = React;
  w7.css = u;
  w7.JSXRuntime = JSXRuntime;
  w7.JSXDevRuntime = JSXDevRuntime;
  w7.ReactDOMServer = ReactDOMServer;
  w7.ReactDOM = ReactDOM;
  w7.pathname = location2.pathname;
  w7.Fragment = React.Fragment;
  w7.cx = (...classNames) => {
    const result = [];
    classNames.filter((e2) => !!e2).forEach((e2) => {
      if (Array.isArray(e2)) {
        for (const f of e2) {
          result.push(f);
        }
      } else
        result.push(e2);
    });
    return result.join(" ");
  };
  w7.db = dbClient("db");
  w7.dbClient = dbClient;
  w7.navigate = (href) => {
    let _href = href;
    if (_href.startsWith("/")) {
      if (w7.basepath.length > 1) {
        _href = `${w7.basepath}${_href}`;
      }
      if (location2.hostname === "prasi.app" || location2.hostname === "localhost") {
        if (location2.pathname.startsWith("/site") && !_href.startsWith("/site")) {
          const patharr = location2.pathname.split("/");
          _href = `/site/${patharr[2]}${_href}`;
        }
      }
    }
    history.pushState({}, "", _href);
    if (w7.rootRes)
      w7.rootRes.pathname = href;
    w7.pathname = href;
    if (w7.rootRender) {
      w7.rootRender();
    }
  };
  const apiEntry = Promise.resolve().then(() => (init_entry_args(), entry_args_exports));
  await new Promise((resolve) => {
    apiEntry.then((e2) => {
      w7.apiEntry = e2["srv"];
      w7.api = apiClient(w7.apiEntry);
      w7.apiClient = apiClient;
      resolve();
    });
  });
  if (typeof window === "object") {
    window.addEventListener("popstate", () => {
      if (w7.preventPopRender) {
        w7.preventPopRender = false;
        return;
      }
      if (w7.rootRender) {
        w7.pathname = location2.pathname;
        w7.rootRender();
      }
    });
  }
};

// src/compo/renderer/prasi/prasi-renderer.tsx
var import_lodash2 = __toESM(require_lodash());
import { useEffect as useEffect7 } from "react";

// ../../pkgs/service/pkgs/service-web/pkgs/web-init/src/web/root.tsx
import { lazy as lazy2, Suspense } from "react";

// ../../pkgs/service/pkgs/service-web/pkgs/web-init/src/web/error-boundary.tsx
import { Component } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var ErrorBoundary = class extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  componentDidCatch = (error, errorInfo) => {
    catchFunc(error, errorInfo, this);
  };
  render() {
    if (this.state.errorInfo) {
      if (this.props.onError) {
        this.props.onError(this.state.errorInfo);
      }
      return handleError(this);
    }
    if (this.props.onSuccess) {
      this.props.onSuccess();
    }
    return this.props.children || /* @__PURE__ */ jsx("div", {});
  }
};
var handleError = (ctx) => {
  const err = ctx.state.error && ctx.state.error.toString() || "";
  if (err.includes("Failed to fetch dynamically imported module")) {
    return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "absolute flex max-w-md m-5 bg-white rounded-lg shadow-lg pointer-events-auto inset-5 ring-1 ring-black ring-opacity-5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1 w-0 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 pt-0.5", children: /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "2",
                d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 w-0 ml-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900", children: "Page need to be reloaded." }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Some module unable to load, you have to reload this page." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex border-l border-gray-200", children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "flex items-center justify-center w-full p-4 text-sm font-medium text-blue-600 border border-transparent rounded-none rounded-r-lg hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500",
          onClick: () => {
            if (!isSSR && typeof location === "object")
              location.reload();
          },
          children: "Reload"
        }
      ) })
    ] }) });
  }
  return (
    // Error path
    /* @__PURE__ */ jsxs("div", { style: ctx.props.style || styles.error, children: [
      /* @__PURE__ */ jsx("h2", { children: "Something went wrong." }),
      /* @__PURE__ */ jsxs(
        "details",
        {
          className: cx(
            "p-2 overflow-auto text-sm whitespace-pre-wrap",
            css`
            font-family: monospace, monospace;
            font-size: 11px;
            background-color: #ececeb58;
          `
          ),
          children: [
            ctx.state.error && ctx.state.error.toString(),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("div", { children: ctx.state.errorInfo.componentStack })
          ]
        }
      )
    ] })
  );
};
var catchFunc = (error, errorInfo, ctx) => {
  ctx.setState({
    error,
    errorInfo
  });
};
var styles = {
  error: {
    backgroundColor: "#f98e7e",
    borderTop: "1px solid #777",
    borderBottom: "1px solid #777",
    padding: "15px"
  }
};

// ../../pkgs/service/pkgs/service-web/pkgs/web-init/src/web/root.tsx
import { Fragment as Fragment2, jsx as jsx2 } from "react/jsx-runtime";

// ../../pkgs/service/pkgs/service-web/pkgs/web-init/src/web/server-script.tsx
import { lazy as lazy3 } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var ServerStyle = lazy3(() => {
  return new Promise((resolve) => {
    let retry = 0;
    let lastExtract = "";
    const tryExtract = () => {
      try {
        const cssSource = r();
        if (!lastExtract && lastExtract !== cssSource) {
          lastExtract = cssSource;
          setTimeout(() => {
            tryExtract();
          }, 20);
          return;
        } else {
          if (cssSource || retry >= 4) {
            resolve({
              default: () => {
                if (!cssSource)
                  return null;
                return /* @__PURE__ */ jsx3(
                  "style",
                  {
                    id: "_goober",
                    dangerouslySetInnerHTML: { __html: cssSource }
                  }
                );
              }
            });
            return;
          }
        }
      } catch (e2) {
      }
      setTimeout(() => {
        retry = retry + 1;
        tryExtract();
      }, 50);
    };
    tryExtract();
  });
});

// ../../node_modules/.pnpm/radix3@1.0.0/node_modules/radix3/dist/index.mjs
var NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};
function createRouter(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p2) => options.strictTrailingSlash ? p2 : p2.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i2 = 0; i2 < sections.length; i2++) {
    const section = sections[i2];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i2).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode !== void 0) {
      node = nextNode;
    } else {
      node = node.placeholderChildNode;
      if (node !== null) {
        params[node.paramName] = section;
        paramsFound = true;
      } else {
        break;
      }
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  for (let i2 = 0; i2 < sections.length; i2++) {
    const section = sections[i2];
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildNode = childNode;
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.substring(3) || "_";
        isStaticRoute = false;
      }
      node = childNode;
    }
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (let i2 = 0; i2 < sections.length; i2++) {
    const section = sections[i2];
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections[sections.length - 1];
    node.data = null;
    if (Object.keys(node.children).length === 0) {
      const parentNode = node.parent;
      delete parentNode[lastSection];
      parentNode.wildcardChildNode = null;
      parentNode.placeholderChildNode = null;
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildNode: null
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

// src/compo/types/general.ts
var w2 = window;

// src/compo/page/scripting/api-db.ts
var createAPI = (url) => {
  if (w2.prasiApi[url]?.apiEntry) {
    return window.apiClient(w2.prasiApi[url]?.apiEntry, url);
  }
};
var createDB = (url) => {
  return window.dbClient("db", url);
};

// src/compo/page/tools/dynamic-import.ts
function toAbsoluteURL(url) {
  const a2 = document.createElement("a");
  a2.setAttribute("href", url);
  return a2.cloneNode(false).href;
}
function importModule(url) {
  return new Promise((resolve, reject) => {
    const vector = "$importModule$" + Math.random().toString(32).slice(2);
    const script = document.createElement("script");
    const destructor = () => {
      delete window[vector];
      script.onerror = null;
      script.onload = null;
      script.remove();
      URL.revokeObjectURL(script.src);
      script.src = "";
    };
    script.defer = true;
    script.type = "module";
    script.onerror = () => {
      reject(new Error(`Failed to import: ${url}`));
      destructor();
    };
    script.onload = () => {
      resolve(window[vector]);
      destructor();
    };
    const absURL = toAbsoluteURL(url);
    const loader = `import * as m from "${absURL}"; window.${vector} = m;`;
    const blob = new Blob([loader], { type: "text/javascript" });
    script.src = URL.createObjectURL(blob);
    document.head.appendChild(script);
  });
}
var dynamic_import_default = importModule;

// src/compo/renderer/base/components.tsx
var scanComponent = (item, componentIDS) => {
  const ids = componentIDS || /* @__PURE__ */ new Set();
  if (item.type === "item" && item.component?.id) {
    ids.add(item.component.id);
  }
  if (item.type !== "text") {
    for (const c2 of item.childs) {
      scanComponent(c2, ids);
    }
  }
  return ids;
};

// src/compo/page/tools/responsive-val.ts
var responsiveVal = (item, key, mode, defaultVal) => {
  let value = item[key];
  if (mode === "desktop" || !mode) {
    if (!value && item.mobile && item.mobile[key]) {
      value = item.mobile[key];
    }
  } else {
    if (item.mobile && item.mobile[key]) {
      value = item.mobile[key];
    }
  }
  if (!value) {
    value = defaultVal;
  }
  return value;
};

// src/compo/page/css/advanced.ts
var cssAdv = (cur, mode) => {
  const adv = responsiveVal(cur, "adv", mode, {});
  return cx(
    adv.css && css`
        ${adv.css}
      `
  );
};

// src/compo/page/css/background.ts
var cssBackground = (cur, mode) => {
  const bg = responsiveVal(cur, "bg", mode, {
    size: "contain",
    pos: "center"
  });
  let bgurl = `${siteApiUrl}${bg.url}`;
  if (bg && bg.url && bg.url.startsWith("http")) {
    bgurl = bg.url;
  }
  return cx(
    css`
      background-repeat: no-repeat;
    `,
    bg.color && css`
        background-color: ${bg.color};
      `,
    bg.url && typeof siteApiUrl === "string" && css`
        background-image: url("${bgurl}");
      `,
    bg.size && css`
        background-size: ${bg.size};
      `,
    bg.pos && css`
        background-position: ${bg.pos};
      `
  );
};

// src/compo/page/css/border.ts
var import_lodash = __toESM(require_lodash2());
var cssBorder = (cur, mode) => {
  const border = responsiveVal(cur, "border", mode, {
    style: "solid",
    stroke: 0,
    rounded: {
      tr: 0,
      tl: 0,
      bl: 0,
      br: 0
    },
    color: "transparent"
  });
  return cx(
    css`
      border-left-width: ${(0, import_lodash.default)(border, "stroke.l") ? (0, import_lodash.default)(border, "stroke.l") : 0}px;
    `,
    css`
      border-right-width: ${(0, import_lodash.default)(border, "stroke.r") ? (0, import_lodash.default)(border, "stroke.r") : 0}px;
    `,
    css`
      border-bottom-width: ${(0, import_lodash.default)(border, "stroke.b") ? (0, import_lodash.default)(border, "stroke.b") : 0}px;
    `,
    css`
      border-top-width: ${(0, import_lodash.default)(border, "stroke.t") ? (0, import_lodash.default)(border, "stroke.t") : 0}px;
    `,
    css`
      border-color: ${border.color ? border.color : "transparent"};
    `,
    css`
      border-style: ${border.style ? border.style : "dashed"};
    `,
    css`
      border-top-left-radius: ${(0, import_lodash.default)(border, "rounded.tl") ? (0, import_lodash.default)(border, "rounded.tl") : 0}px;
    `,
    css`
      border-top-right-radius: ${(0, import_lodash.default)(border, "rounded.tr") ? (0, import_lodash.default)(border, "rounded.tr") : 0}px;
    `,
    css`
      border-bottom-left-radius: ${(0, import_lodash.default)(border, "rounded.bl") ? (0, import_lodash.default)(border, "rounded.bl") : 0}px;
    `,
    css`
      border-bottom-right-radius: ${(0, import_lodash.default)(border, "rounded.br") ? (0, import_lodash.default)(border, "rounded.br") : 0}px;
    `
  );
};

// src/compo/page/css/dimension.ts
var cssDimension = (cur, mode, editor) => {
  const dim = responsiveVal(cur, "dim", mode, {
    h: "fit",
    w: "fit"
  });
  return cx(
    dim.w === "fit" && css`
        & > .txt-box > * {
          white-space: nowrap !important;
        }
      `,
    dim.w === "full" && css`
        width: 100%;
      `,
    dim.w && typeof dim.w === "number" && dim.w >= 0 && css`
        width: ${dim.w}px;
        overflow-x: clip;
      `,
    dim.h === "full" && css`
        height: ${editor ? "100%" : "100" + (cur.type === "section" ? mode === "mobile" ? "svh" : "vh" : "%")};
        margin-bottom: auto;
      `,
    dim.h && typeof dim.h === "number" && dim.h >= 0 && css`
        height: ${dim.h}px;
        overflow-y: clip;
      `
  );
};

// src/compo/page/css/editor.ts
var cssEditor = ({
  item,
  hover,
  active
}) => {
  return cx(
    item.id === hover?.id && css`
        & {
          box-shadow: inset 0 0 0px 3px #bae3fd;
          > img {
            opacity: 0.6;
          }
        }
      `,
    item.id === active?.id && css`
        box-shadow: inset 0 0 0px 2px #009cff;
        > img {
          opacity: 0.6;
        }
      `
  );
};

// src/compo/page/css/font.ts
var glbFont = !isSSR ? window : {};
var cssFont = (cur, mode) => {
  const font = responsiveVal(cur, "font", mode, {});
  if (!isSSR && font.family) {
    if (!glbFont.loadedFonts)
      glbFont.loadedFonts = [];
    if (!isSSR && glbFont.loadedFonts.indexOf(font.family) < 0) {
      glbFont.loadedFonts.push(font.family);
      const doc = document;
      let weight = `:wght@${[300, 400, 500, 600].join(";")}`;
      let fontName = font.family.replace(/ /g, "+");
      const _href = `https://fonts.googleapis.com/css2?family=${fontName}${weight}&display=block`;
      if (!doc.querySelector(`link[href="${_href}]`)) {
        const link = doc.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = _href;
        doc.head.appendChild(link);
      }
    }
  }
  if (!font.family && glbFont.defaultFont) {
    font.family = glbFont.defaultFont;
  }
  return cx(
    font.color && css`
        color: ${font.color};
      `,
    font.size && css`
        font-size: ${font.size}px;
      `,
    font.height && css`
        line-height: ${font.height === "auto" ? "normal" : `${font.height}%`};
      `,
    font.family && css`
        font-family: ${font.family};
      `
  );
};

// src/compo/page/css/layout.ts
var cssLayout = (cur, mode) => {
  const result = [];
  let layout = responsiveVal(cur, "layout", mode, {
    dir: "col",
    align: "top-left",
    gap: 0
  });
  if (layout) {
    if (layout.dir.startsWith("col")) {
      if (layout.dir === "col") {
        result.push("flex-col");
      } else if (layout.dir === "col-reverse") {
        result.push("flex-col-reverse");
      }
      if (layout.gap === "auto") {
        if (layout.align === "left")
          result.push("items-start justify-between");
        if (layout.align === "center")
          result.push("items-center justify-between");
        if (layout.align === "right")
          result.push("items-end justify-between");
      } else {
        result.push(
          css`
            gap: ${layout.gap}px;
          `
        );
        if (layout.align === "top-left")
          result.push("items-start justify-start");
        if (layout.align === "top-center")
          result.push("items-center justify-start");
        if (layout.align === "top-right")
          result.push("items-end justify-start");
        if (layout.align === "left")
          result.push("items-start justify-center");
        if (layout.align === "center")
          result.push("items-center justify-center");
        if (layout.align === "right")
          result.push("items-end justify-center");
        if (layout.align === "bottom-left")
          result.push("items-start justify-end");
        if (layout.align === "bottom-center")
          result.push("items-center justify-end");
        if (layout.align === "bottom-right")
          result.push("items-end justify-end");
      }
    } else {
      if (layout.dir === "row") {
        result.push("flex-row");
      } else if (layout.dir === "row-reverse") {
        result.push("flex-row-reverse");
      }
      if (layout.gap === "auto") {
        if (layout.align === "top")
          result.push("items-start justify-between");
        if (layout.align === "center")
          result.push("items-center justify-between");
        if (layout.align === "bottom")
          result.push("items-end justify-between");
      } else {
        result.push(
          css`
            gap: ${layout.gap}px;
          `
        );
        if (layout.align === "top-left")
          result.push("items-start justify-start");
        if (layout.align === "top-center")
          result.push("items-start justify-center");
        if (layout.align === "top-right")
          result.push("items-start justify-end");
        if (layout.align === "left")
          result.push("items-center justify-start");
        if (layout.align === "center")
          result.push("items-center justify-center");
        if (layout.align === "right")
          result.push("items-center justify-end");
        if (layout.align === "bottom-left")
          result.push("items-end justify-start");
        if (layout.align === "bottom-center")
          result.push("items-end justify-center");
        if (layout.align === "bottom-right")
          result.push("items-end justify-end");
      }
    }
  } else {
    return "flex-col items-start justify-start";
  }
  return result.join(" ").trim();
};

// src/compo/page/css/padding.ts
var cssPadding = (cur, mode) => {
  const padding = responsiveVal(cur, "padding", mode, {
    l: 0,
    b: 0,
    t: 0,
    r: 0
  });
  return cx(
    padding.l !== void 0 && css`
        padding-left: ${padding.l}px;
      `,
    padding.r !== void 0 && css`
        padding-right: ${padding.r}px;
      `,
    padding.b !== void 0 && css`
        padding-bottom: ${padding.b}px;
      `,
    padding.t !== void 0 && css`
        padding-top: ${padding.t}px; 
      `
  );
};

// src/compo/page/css/gen.ts
var produceCSS = (item, arg) => {
  let className = item.linktag?.class;
  if (arg.mode === "mobile" && item.mobile?.linktag?.class) {
    className = item.mobile?.linktag?.class;
  }
  return cx([
    "flex relative",
    className?.trim(),
    cssLayout(item, arg.mode),
    cssPadding(item, arg.mode),
    cssDimension(item, arg.mode, arg?.editor),
    cssBorder(item, arg.mode),
    cssBackground(item, arg.mode),
    cssFont(item, arg.mode),
    (arg?.hover || arg?.active) && cssEditor({ item, hover: arg?.hover, active: arg?.active }),
    cssAdv(item, arg.mode)
  ]);
};

// src/compo/renderer/base/renderer-global.ts
var RendererGlobal = {
  loading: true,
  ui: {
    loading: null,
    notfound: null
  },
  site: { id: "", api_url: "", js_compiled: "" },
  init: false,
  mode: "",
  scope: {
    tree: {},
    effect: {},
    value: {},
    evargs: {},
    types: {}
  },
  component: {
    def: {},
    load: async (ids) => {
      return [];
    }
  },
  page: {
    active: null,
    list: {},
    router: null,
    load: async (page_id) => {
      return null;
    }
  }
};

// src/compo/renderer/base/elements/script-exec.tsx
import { Suspense as Suspense3 } from "react";

// src/compo/page/component.ts
var defaultComponent = {
  docs: {},
  edit: {
    loading: false,
    id: "",
    tabs: null,
    show: false,
    switching: false,
    activatePropEditing: false
  }
};
if (!window._componentGlobal) {
  window._componentGlobal = defaultComponent;
}
var component = window._componentGlobal;

// src/compo/page/content-edit/ce-component.tsx
var import_cuid24 = __toESM(require_cuid22());
import { useEffect as useEffect5 } from "react";

// src/compo/editor/ws/wsdoc.ts
var _wsdoc = {
  site: null,
  page_id: "",
  mode: "desktop",
  compGroup: {},
  retry: {
    disabled: false,
    fast: false,
    localIP: false
  },
  ws: null,
  apiDef: { apiEntry: null, prismaTypes: {}, apiTypes: "" },
  reloadComponentId: /* @__PURE__ */ new Set(),
  async wsend(payload) {
    const ws = this.ws;
    if (ws) {
      if (ws.readyState !== ws.OPEN) {
        await new Promise((resolve) => {
          const ival = setInterval(() => {
            if (ws.readyState === ws.OPEN) {
              clearInterval(ival);
              resolve();
            }
          }, 50);
        });
      }
      ws.send(payload);
    }
  },
  lastTypedTimeestamp: -1,
  session: null,
  pendingDiffLocal: [],
  page: null,
  compsResolveCallback: {},
  keyDown: null,
  undoManager: {
    undo() {
      let sendmsg;
      if (component.edit.show && component.edit.id) {
        sendmsg = {
          type: "undo",
          mode: "comp",
          id: component.edit.id
        };
        wsdoc.wsend(JSON.stringify(sendmsg));
      } else {
        sendmsg = {
          type: "undo",
          mode: "page",
          id: wsdoc.page?.doc.getMap("map").get("id") || ""
        };
        wsdoc.wsend(JSON.stringify(sendmsg));
      }
    },
    redo() {
      let sendmsg;
      if (component.edit.show && component.edit.id) {
        sendmsg = {
          type: "redo",
          mode: "comp",
          id: component.edit.id
        };
        wsdoc.wsend(JSON.stringify(sendmsg));
      } else {
        sendmsg = {
          type: "redo",
          mode: "page",
          id: wsdoc.page?.doc.getMap("map").get("id") || ""
        };
        wsdoc.wsend(JSON.stringify(sendmsg));
      }
    }
  }
};
if (!window.wsdoc) {
  window.wsdoc = _wsdoc;
}
var wsdoc = window.wsdoc;

// src/compo/editor/tools/render-html.tsx
import { jsx as jsx4 } from "react/jsx-runtime";

// src/compo/page/scripting/exec-element.tsx
import { Suspense as Suspense2 } from "react";

// src/compo/ui/loading.tsx
import { useEffect as useEffect3 } from "react";
import { Fragment as Fragment3, jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
var w3 = !isSSR ? window : {};

// src/compo/page/scripting/local-comp.tsx
import { useEffect as useEffect4 } from "react";
var createLocal = (opt) => {
  return ({ name, children, value, effect, effects }) => {
    if (!opt.scope.value[opt.item.id]) {
      opt.scope.value[opt.item.id] = {};
    }
    const scope = opt.scope.value[opt.item.id];
    if (!scope[name]) {
      const cache = [];
      scope[name] = JSON.parse(
        JSON.stringify(value, (key, value2) => {
          if (typeof value2 === "object" && value2 !== null) {
            if (cache.includes(value2))
              return;
            cache.push(value2);
          }
          return value2;
        })
      );
      for (const [k, v] of Object.entries(scope[name])) {
        if (typeof value[k] === "undefined")
          delete scope[name][k];
      }
      for (const [k, v] of Object.entries(value)) {
        if (k !== "render") {
          if (typeof v === "function") {
            scope[name][k] = v;
          } else {
            scope[name][k] = v;
          }
        }
      }
    }
    const local = scope[name];
    local.render = opt.render;
    if (!w2.isEditor) {
      if (effect) {
        useEffect4(() => {
          const result = effect(local);
          if (typeof result === "function") {
            return () => {
            };
          } else if (typeof result === "object" && result instanceof Promise) {
            return () => {
              result.then((e2) => {
                if (typeof e2 === "function")
                  e2();
              });
            };
          }
        }, []);
      }
      if (effects) {
        for (const f of effects) {
          useEffect4(() => {
            const result = f.effect(local);
            if (typeof result === "function") {
              return () => {
              };
            } else if (typeof result === "object" && result instanceof Promise) {
              return () => {
                result.then((e2) => {
                  if (typeof e2 === "function")
                    e2();
                });
              };
            }
          }, f.deps);
        }
      }
    } else {
    }
    if (typeof children === "function") {
      return children(local);
    }
    return children;
  };
};

// src/compo/page/scripting/pass-props.tsx
import { Fragment as Fragment4, jsx as jsx6 } from "react/jsx-runtime";
var createPassProps = (opt) => {
  return (arg) => {
    const { children } = arg;
    if (!opt.scope.value[opt.item.id]) {
      opt.scope.value[opt.item.id] = {};
    }
    const scope = opt.scope.value[opt.item.id];
    if (arg) {
      for (const [k, v] of Object.entries(arg)) {
        if (k === "children")
          continue;
        scope[k] = v;
      }
    }
    return /* @__PURE__ */ jsx6(Fragment4, { children });
  };
};

// src/compo/page/scripting/exec-element.tsx
import { jsx as jsx7 } from "react/jsx-runtime";

// src/compo/page/content-edit/ce-render.tsx
import { jsx as jsx8 } from "react/jsx-runtime";

// src/compo/page/content-edit/ce-text.tsx
import { Fragment as Fragment5, jsx as jsx9 } from "react/jsx-runtime";

// src/compo/page/tools/fill-id.ts
var import_cuid23 = __toESM(require_cuid22());

// src/compo/page/content-edit/ce-component.tsx
import { jsx as jsx10, jsxs as jsxs3 } from "react/jsx-runtime";

// src/compo/page/content-edit/ce-item.tsx
import { jsx as jsx11 } from "react/jsx-runtime";

// src/compo/page/content-edit/render-tools/init-scope.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
var findScope = (scope, itemID) => {
  const scopes = [];
  const root_id = itemID;
  let item_id = itemID;
  let itemset = /* @__PURE__ */ new Set();
  while (true) {
    if (scope.value[item_id]) {
      if (root_id !== item_id) {
        scopes.push(scope.value[item_id]);
      }
    }
    if (scope.tree[item_id] && scope.tree[scope.tree[item_id].parent_id]) {
      item_id = scope.tree[item_id].parent_id;
      if (itemset.has(item_id)) {
        break;
      } else {
        itemset.add(item_id);
      }
    } else {
      break;
    }
  }
  const result = {};
  if (scope.value.root) {
    scopes.push(scope.value.root);
  }
  for (const scope2 of scopes.reverse()) {
    for (const [k, v] of Object.entries(scope2)) {
      result[k] = v;
    }
  }
  return result;
};

// src/compo/renderer/base/elements/script-exec.tsx
import { jsx as jsx13 } from "react/jsx-runtime";
var scriptExec = (arg, api_url) => {
  const adv = arg.item.adv;
  if (adv && adv.jsBuilt) {
    const output = { jsx: null };
    let error = false;
    try {
      const evalArgs = produceEvalArgs({ ...arg, output }, api_url);
      const scriptEval = new Function(...Object.keys(evalArgs), adv.jsBuilt);
      scriptEval(...Object.values(evalArgs));
    } catch (e2) {
      error = true;
      console.log(e2);
    }
    return output.jsx;
  }
  return null;
};
var produceEvalArgs = (arg, api_url) => {
  const { item, rg, children, output, scope, className, render } = arg;
  7;
  if (!scope.evargs[item.id]) {
    scope.evargs[item.id] = {
      local: createLocal({ item, scope, render }),
      passprop: createPassProps({ item, scope })
    };
  }
  const PassProp = scope.evargs[item.id].passprop;
  const Local = scope.evargs[item.id].local;
  const result = {
    PassProp,
    Local,
    children,
    props: {
      className: cx(className)
    },
    render: (jsx25) => {
      output.jsx = /* @__PURE__ */ jsx13(ErrorBoundary, { children: /* @__PURE__ */ jsx13(
        Suspense3,
        {
          fallback: /* @__PURE__ */ jsx13("div", { className: "flex flex-1 items-center justify-center w-full h-full relative", children: rg.ui.loading }),
          children: jsx25
        }
      ) });
    },
    ...findScope(scope, item.id)
  };
  if (api_url) {
    result["api"] = createAPI(api_url);
    result["db"] = createDB(api_url);
  }
  return result;
};

// src/compo/renderer/base/elements/r-text.tsx
import { jsx as jsx14 } from "react/jsx-runtime";
var RText = ({ item }) => {
  return /* @__PURE__ */ jsx14(RRender, { item, children: /* @__PURE__ */ jsx14(
    "div",
    {
      dangerouslySetInnerHTML: {
        __html: item.html || ""
      }
    }
  ) });
};

// src/compo/renderer/base/elements/r-component.tsx
import { jsx as jsx15 } from "react/jsx-runtime";
var RComponent = ({ item }) => {
  const rg = useGlobal(RendererGlobal, "PRASI_SITE");
  const local = useLocal({ instanced: false });
  if (!local.instanced) {
    const scope = rg.scope;
    for (const child of item.childs) {
      scope.tree[child.id] = {
        childs: /* @__PURE__ */ new Set(),
        // name: item.name,
        // type: item.type,
        // lv: 0,
        parent_id: item.id
      };
    }
    local.instanced = true;
  }
  return /* @__PURE__ */ jsx15(RRender, { item, children: item.childs.map((e2) => {
    if (e2.type === "item")
      return /* @__PURE__ */ jsx15(RItem, { item: e2 }, e2.id);
    else
      return /* @__PURE__ */ jsx15(RText, { item: e2 }, e2.id);
  }) });
};

// src/compo/renderer/base/elements/r-item.tsx
import { jsx as jsx16 } from "react/jsx-runtime";
var RItem = ({ item }) => {
  const rg = useGlobal(RendererGlobal, "PRASI_SITE");
  const compid = item.component?.id;
  if (compid) {
    const comp = rg.component.def[compid];
    if (comp) {
      return /* @__PURE__ */ jsx16(RComponent, { item, comp });
    }
  }
  return /* @__PURE__ */ jsx16(RRender, { item, children: item.childs.map((e2) => {
    if (e2.type === "item")
      return /* @__PURE__ */ jsx16(RItem, { item: e2 }, e2.id);
    else
      return /* @__PURE__ */ jsx16(RText, { item: e2 }, e2.id);
  }) });
};

// src/compo/renderer/base/elements/script-scope.tsx
import { jsx as jsx17 } from "react/jsx-runtime";
var scriptScope = (item, rg) => {
  const i2 = item;
  let comp = null;
  if (i2.component && rg.component.def[i2.component.id]) {
    comp = rg.component.def[i2.component.id].content_tree;
  }
  const scope = rg.scope;
  if (scope) {
    if (!scope.tree[item.id]) {
      scope.tree[item.id] = {
        childs: /* @__PURE__ */ new Set(),
        // name: item.name,
        // type: item.type,
        // lv: 0,
        parent_id: "root"
      };
    }
    if (item.type !== "text") {
      for (const c2 of (comp || item).childs) {
        if (!scope.tree[c2.id]) {
          scope.tree[c2.id] = {
            childs: /* @__PURE__ */ new Set(),
            // name: c.name,
            // type: c.type,
            // lv: scope.tree[item.id].lv + 1,
            parent_id: item.id
          };
        }
        scope.tree[item.id].childs.add(c2.id);
      }
    }
  }
  if (i2.component && i2.component.id && comp) {
    if (!scope.value[item.id])
      scope.value[item.id] = {};
    const exec = (fn) => {
      const existingScope = findScope(rg.scope, item.id || "");
      const f = new Function(...Object.keys(existingScope), `return ${fn}`);
      return f(...Object.values(existingScope));
    };
    for (const [k, v] of Object.entries(comp.component?.props || {})) {
      let val = null;
      try {
        val = exec(v.valueBuilt || v.value);
      } catch (e2) {
      }
      scope.value[item.id][k] = val;
    }
    const props = i2.component.props;
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        if (v) {
          let val = null;
          if (v.meta?.type === "content-element") {
            const content = v.content;
            if (content) {
              val = /* @__PURE__ */ jsx17(RItem, { item: content });
            } else {
              try {
                val = exec(v.valueBuilt || v.value);
              } catch (e2) {
              }
            }
          } else {
            try {
              val = exec(v.valueBuilt || v.value);
            } catch (e2) {
            }
          }
          scope.value[item.id][k] = val;
        }
      }
    }
  }
  return scope;
};

// src/compo/renderer/base/elements/r-render.tsx
import { jsx as jsx18 } from "react/jsx-runtime";
var RRender = ({ item: mitem, children }) => {
  const rg = useGlobal(RendererGlobal, "PRASI_SITE");
  let _children = children;
  let item = mitem;
  if (item.hidden === "all") {
    return null;
  }
  const className = produceCSS(item, { mode: rg.mode });
  const adv = item.adv;
  if (adv) {
    const html = renderHTML2(adv);
    const scope = scriptScope(item, rg);
    if (html)
      _children = html;
    else if (adv.jsBuilt && adv.js) {
      return scriptExec(
        {
          item,
          scope,
          children: _children,
          rg,
          className,
          render: rg.render
        },
        rg.site.api_url
      );
    }
  }
  const linktag = responsiveVal(item, "linktag", rg.mode, {});
  if (linktag && linktag.link) {
    let href = linktag.link || "";
    if (href.startsWith("/")) {
      if (location.pathname.startsWith("/site/") && ["localhost", "127.0.0.1", "prasi.app"].includes(location.hostname)) {
        const parts = location.pathname.split("/");
        if (parts.length >= 3) {
          href = `/${parts[1]}/${parts[2]}${href}`;
        }
      }
    }
    return /* @__PURE__ */ jsx18(
      "a",
      {
        className,
        href,
        onClick: (e2) => {
          e2.preventDefault();
          if (href.startsWith("/")) {
            navigate(href);
          } else {
            location.href = href;
          }
        },
        children: _children
      }
    );
  }
  return /* @__PURE__ */ jsx18("div", { className, children: _children });
};
var renderHTML2 = (adv) => {
  if (adv.html) {
    return /* @__PURE__ */ jsx18(
      "div",
      {
        className: "flex-1 self-stretch justify-self-stretch p-[2px]",
        dangerouslySetInnerHTML: { __html: adv.html }
      }
    );
  }
  return null;
};

// src/compo/renderer/base/elements/r-section.tsx
import { jsx as jsx19 } from "react/jsx-runtime";
var RSection = ({ item }) => {
  return /* @__PURE__ */ jsx19(RRender, { item, children: item.childs.map((e2) => {
    return /* @__PURE__ */ jsx19(RItem, { item: e2 }, e2.id);
  }) });
};

// src/compo/renderer/base/render-page.tsx
import { Fragment as Fragment6, jsx as jsx20 } from "react/jsx-runtime";
var PrasiPage = (props) => {
  const { rg, pathname } = props;
  const { page, ui } = rg;
  const { router } = page;
  if (router) {
    if (location.search.startsWith("?page_id=")) {
      page.active = page.list[location.search.substring("?page_id=".length)];
    } else {
      page.active = router.lookup(pathname);
    }
  }
  if (page.active) {
    if (typeof page.active.content_tree === "undefined") {
      if (!rg.loading) {
        rg.loading = true;
        rg.page.load(page.active.id).then((loadedPage) => {
          if (page.active) {
            page.active.content_tree = loadedPage?.content_tree || null;
            page.active.js_compiled = loadedPage?.js_compiled;
          }
          rg.loading = false;
          rg.render();
        });
      }
    }
    if (page.active.content_tree) {
      const compids = scanComponent(page.active.content_tree);
      const loadCompIds = [];
      compids.forEach((id) => {
        if (!rg.component.def[id]) {
          loadCompIds.push(id);
        }
      });
      if (loadCompIds.length > 0) {
        rg.loading = true;
        rg.component.load(loadCompIds).then((comps) => {
          comps.map((e2) => {
            rg.component.def[e2.id] = e2;
          });
          rg.loading = false;
          rg.render();
        });
      }
    }
  }
  if (!rg.init && rg.site.id) {
    rg.init = true;
    const scope = rg.scope;
    if (scope && rg.site) {
      if (rg.site.js_compiled) {
        const api_url = rg.site.api_url;
        const args = {};
        if (api_url) {
          args["api"] = createAPI(api_url);
          args["db"] = createDB(api_url);
        }
        const exports = scope.value.root || {};
        const types = {};
        const fn = new Function(
          ...Object.keys(args),
          "exports",
          "types",
          "load",
          "render",
          rg.site.js_compiled
        );
        try {
          fn(...Object.values(args), exports, types, dynamic_import_default, rg.render);
          if (!scope.value.root) {
            scope.value.root = exports;
          }
          for (const [k, v] of Object.entries(exports)) {
            scope.value.root[k] = v;
          }
        } catch (e2) {
        }
      }
    }
  }
  if (rg.loading)
    return ui.loading || /* @__PURE__ */ jsx20(Fragment6, {});
  if (!page.active)
    return ui.notfound;
  return /* @__PURE__ */ jsx20("div", { className: "w-full h-full flex flex-col items-stretch flex-1 bg-white", children: page.active.content_tree?.childs.map((e2) => /* @__PURE__ */ jsx20(RSection, { item: e2 }, e2.id)) });
};

// src/compo/renderer/base/renderer.tsx
import { Fragment as Fragment7, jsx as jsx21 } from "react/jsx-runtime";
var Renderer = class {
  renderPage(pathname) {
    return /* @__PURE__ */ jsx21(PrasiPage, { rg: this.rg, pathname });
  }
  renderComponent(id, props) {
    return /* @__PURE__ */ jsx21(Fragment7, {});
  }
};

// src/compo/renderer/prasi/ui/loading.tsx
import { useEffect as useEffect6 } from "react";
import { Fragment as Fragment8, jsx as jsx22, jsxs as jsxs4 } from "react/jsx-runtime";
var w4 = !isSSR ? window : {};
var Loading2 = ({ children, className, show, backdrop }) => {
  const local = useLocal(
    {
      icon: /* @__PURE__ */ jsx22("div", { className: "px-4 py-1", children: "Loading..." }),
      value: 0.111,
      ival: null
    },
    () => {
    }
  );
  useEffect6(() => {
    local.ival = setInterval(() => {
      local.value += 0.1333;
      if (local.value >= 1.3) {
        local.value = 0;
      }
      local.render();
    }, 200);
    if (!isSSR && w4.loadingIcon) {
      local.icon = /* @__PURE__ */ jsx22(
        "img",
        {
          alt: "loading",
          src: w4.loadingIcon,
          className: css`
            width: 42px;
            height: 42px;
          `
        }
      );
      local.render();
    }
    return () => {
      clearInterval(local.ival);
    };
  }, []);
  return /* @__PURE__ */ jsxs4(Fragment8, { children: [
    backdrop !== false && /* @__PURE__ */ jsx22(
      "div",
      {
        className: cx(
          "flex items-center z-40 bg-gray-50 pointer-events-none",
          "w-screen h-screen fixed transition-all duration-1000",
          typeof show !== "undefined" ? show ? "opacity-50" : "opacity-0" : "opacity-50"
        ),
        onContextMenuCapture: (e2) => {
          e2.preventDefault();
        }
      }
    ),
    children ? /* @__PURE__ */ jsx22(
      "div",
      {
        onContextMenuCapture: (e2) => {
          e2.preventDefault();
        },
        className: cx(
          "flex flex-1 items-center justify-center z-40 transition-all",
          className ? className : backdrop !== false ? "w-screen h-screen fixed" : "",
          typeof show !== "undefined" ? show ? "" : "hidden" : ""
        ),
        children: /* @__PURE__ */ jsx22("div", { className: "flex items-center justify-center flex-col space-y-3 bg-white p-4 rounded-lg select-none", children: /* @__PURE__ */ jsx22("div", { className: "text-sm", children }) })
      }
    ) : /* @__PURE__ */ jsx22(
      "div",
      {
        className: cx(
          "flex flex-1 items-center justify-center z-40 pointer-events-none transition-all",
          className ? className : backdrop !== false ? "w-screen h-screen fixed" : "",
          typeof show !== "undefined" ? show ? "" : "hidden" : ""
        ),
        children: /* @__PURE__ */ jsx22(
          "div",
          {
            className: cx(
              "w-1/6",
              css`
                .pr-outer {
                  background: rgba(0, 0, 0, 0.1) !important;
                }
              `
            ),
            children: /* @__PURE__ */ jsx22("div", { className: "pr-outer w-full h-[3px] flex items-stretch rounded-sm overflow-hidden", children: /* @__PURE__ */ jsx22(
              "div",
              {
                className: cx(
                  "bg-blue-800 transition-all duration-200 rounded-sm w-full",
                  css`
                    transform: translate(${-100 + local.value * 200}%);
                  `
                )
              }
            ) })
          }
        )
      }
    )
  ] });
};

// src/compo/renderer/prasi/prasi-renderer.tsx
var import_ua_parser_js = __toESM(require_ua_parser());
import { jsx as jsx23 } from "react/jsx-runtime";
var w5 = window;
var PrasiRenderer = class extends Renderer {
  rg = useGlobal(RendererGlobal, "PRASI_SITE");
  constructor(arg) {
    super();
    const rg = this.rg;
    if (arg.props) {
      rg.scope.value.root = arg.props;
    }
    rg.ui.loading = arg.component?.loading ? arg.component?.loading(rg) : /* @__PURE__ */ jsx23(Loading2, {});
    rg.ui.notfound = arg.component?.notfound ? arg.component?.notfound(rg) : /* @__PURE__ */ jsx23("div", { className: "flex flex-1 justify-center items-center", children: "Page Not Found" });
    rg.page.load = async (page_id) => {
      return await arg.load.page(rg, page_id);
    };
    rg.component.load = async (ids) => {
      return await arg.load.components(rg, ids);
    };
    if (!rg.mode) {
      const parsed = (0, import_ua_parser_js.default)();
      rg.mode = parsed.device.type === "mobile" ? "mobile" : "desktop";
    }
    useEffect7(() => {
      (async () => {
        if (!rg.site.id) {
          rg.loading = true;
          rg.render();
          rg.site = await arg.load.site(rg);
          if (!w5.prasiApi)
            w5.prasiApi = {};
          if (rg.site.api_url) {
            try {
              const apiEntry = await fetch(
                (0, import_lodash2.default)(rg.site.api_url, "/") + "/_prasi/api-entry"
              );
              w5.prasiApi[rg.site.api_url] = {
                apiEntry: (await apiEntry.json()).srv
              };
            } catch (e2) {
              console.log("Failed to get api-entry");
            }
          }
          if (rg.site.id) {
            rg.page.list = await arg.load.pages(rg);
            rg.page.router = createRouter();
            for (const page of Object.values(rg.page.list)) {
              rg.page.router.insert(page.url, page);
            }
          }
          rg.loading = false;
          rg.render();
        }
      })();
    }, []);
  }
};

// src/compo/renderer/prasi/prasi-live.tsx
var createPrasiLive = (arg) => {
  const { live, Loading: Loading3, NotFound, props } = arg;
  if (!(live.site_id || live.domain)) {
    return null;
  }
  return new PrasiRenderer({
    props,
    component: {
      loading: Loading3,
      notfound: NotFound
    },
    load: {
      async site() {
        const site = await db.site.findFirst({
          where: live.site_id ? { id: live.site_id } : { domain: live.domain },
          select: {
            id: true,
            config: true,
            js_compiled: true
          }
        });
        if (site) {
          const config = site.config;
          let api_url = config.api_url;
          if (config.prasi && config.prasi.port) {
            api_url = `https://${config?.prasi?.port}.prasi.world`;
          }
          return {
            id: site.id,
            api_url,
            js_compiled: site.js_compiled || ""
          };
        }
        return { id: "", api_url: "", js_compiled: "" };
      },
      async page(rg, page_id) {
        const page = await db.page.findFirst({
          where: { id: page_id },
          select: {
            id: true,
            url: true,
            name: true,
            js_compiled: true,
            content_tree: true
          }
        });
        if (page) {
          return page;
        }
        return null;
      },
      async pages(rg) {
        const all = await db.page.findMany({
          where: {
            id_site: rg.site.id,
            is_deleted: false
          },
          select: {
            id: true,
            url: true,
            name: true
          }
        });
        const pages = {};
        for (const p2 of all) {
          pages[p2.id] = p2;
        }
        return pages;
      },
      async components(rg, ids) {
        const all = await db.component.findMany({
          where: { id: { in: ids } },
          select: {
            id: true,
            content_tree: true,
            name: true
          }
        });
        return all || [];
      }
    }
  });
};

// src/compo/renderer/prasi/prasi.tsx
import { Fragment as Fragment9, jsx as jsx24 } from "react/jsx-runtime";
var w6 = window;
var Prasi = ({ live, loading, notfound, props }) => {
  const NotFound = () => {
    if (notfound)
      return notfound;
    return /* @__PURE__ */ jsx24(Fragment9, { children: "Not Found" });
  };
  const Loading3 = () => {
    if (loading)
      return loading;
    return /* @__PURE__ */ jsx24(Fragment9, { children: "Loading" });
  };
  if (live) {
    return /* @__PURE__ */ jsx24(Root, { children: /* @__PURE__ */ jsx24(
      PrasiLive,
      {
        NotFound,
        Loading: Loading3,
        live,
        props
      }
    ) });
  }
  return /* @__PURE__ */ jsx24(Loading3, {});
};
var PrasiLive = ({ NotFound, Loading: Loading3, live, props }) => {
  if (typeof __SRV_URL__ === "undefined") {
    w6.__SRV_URL__ = "https://apilmtd.goperasi.id/";
    w6.siteApiUrl = __SRV_URL__;
    w6.isEditor = false;
    defineWindow();
  }
  const site = createPrasiLive({ Loading: Loading3, NotFound, live, props });
  if (!site)
    return /* @__PURE__ */ jsx24(NotFound, {});
  return site.renderPage(live.pathname);
};
var Root = ({ children }) => {
  const local = useLocal({
    global: {}
  });
  return /* @__PURE__ */ jsx24(
    GlobalContext.Provider,
    {
      value: {
        global: local.global,
        render: local.render
      },
      children
    }
  );
};
export {
  Prasi,
  useGlobal,
  useLocal
};
/*! Bundled license information:

@noble/hashes/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
