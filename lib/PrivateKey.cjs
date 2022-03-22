"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var cryptography = _interopRequireWildcard(require("@hashgraph/cryptography"));

var _Mnemonic = _interopRequireDefault(require("./Mnemonic.cjs"));

var _PublicKey = _interopRequireDefault(require("./PublicKey.cjs"));

var _Key = _interopRequireDefault(require("./Key.cjs"));

var _Cache = _interopRequireDefault(require("./Cache.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @typedef {import("./transaction/Transaction.js").default} Transaction
 * @typedef {import("./account/AccountId.js").default} AccountId
 */

/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").IKey} proto.IKey
 * @typedef {import("@hashgraph/proto").ITransaction} proto.ITransaction
 * @typedef {import("@hashgraph/proto").ISignaturePair} proto.ISignaturePair
 * @typedef {import("@hashgraph/proto").ISignedTransaction} proto.ISignedTransaction
 */
class PrivateKey extends _Key.default {
  /**
   * @internal
   * @hideconstructor
   * @param {cryptography.PrivateKey} key
   */
  constructor(key) {
    super();
    this._key = key;
  }
  /**
   * Generate a random Ed25519 private key.
   *
   * @returns {PrivateKey}
   */


  static generateED25519() {
    return new PrivateKey(cryptography.PrivateKey.generateED25519());
  }
  /**
   * Generate a random EDSA private key.
   *
   * @returns {PrivateKey}
   */


  static generateECDSA() {
    return new PrivateKey(cryptography.PrivateKey.generateECDSA());
  }
  /**
   * Depredated - Use `generateEd25519()` instead
   * Generate a random Ed25519 private key.
   *
   * @returns {PrivateKey}
   */


  static generate() {
    return PrivateKey.generateED25519();
  }
  /**
   * Depredated - Use `generateEd25519Async()` instead
   * Generate a random Ed25519 private key.
   *
   * @returns {Promise<PrivateKey>}
   */


  static async generateAsync() {
    return new PrivateKey(await cryptography.PrivateKey.generateAsync());
  }
  /**
   * Generate a random Ed25519 private key.
   *
   * @returns {Promise<PrivateKey>}
   */


  static async generateED25519Async() {
    return new PrivateKey(await cryptography.PrivateKey.generateED25519Async());
  }
  /**
   * Generate a random ECDSA private key.
   *
   * @returns {Promise<PrivateKey>}
   */


  static async generateECDSAAsync() {
    return new PrivateKey(await cryptography.PrivateKey.generateECDSAAsync());
  }
  /**
   * Construct a private key from bytes. Requires DER header.
   *
   * @param {Uint8Array} data
   * @returns {PrivateKey}
   */


  static fromBytes(data) {
    return new PrivateKey(cryptography.PrivateKey.fromBytes(data));
  }
  /**
   * Construct a ECDSA private key from bytes.
   *
   * @param {Uint8Array} data
   * @returns {PrivateKey}
   */


  static fromBytesECDSA(data) {
    return new PrivateKey(cryptography.PrivateKey.fromBytesECDSA(data));
  }
  /**
   * Construct a ED25519 private key from bytes.
   *
   * @param {Uint8Array} data
   * @returns {PrivateKey}
   */


  static fromBytesED25519(data) {
    return new PrivateKey(cryptography.PrivateKey.fromBytesED25519(data));
  }
  /**
   * Construct a private key from a hex-encoded string. Requires DER header.
   *
   * @param {string} text
   * @returns {PrivateKey}
   */


  static fromString(text) {
    return new PrivateKey(cryptography.PrivateKey.fromString(text));
  }
  /**
   * Construct a ECDSA private key from a hex-encoded string.
   *
   * @param {string} text
   * @returns {PrivateKey}
   */


  static fromStringECDSA(text) {
    return new PrivateKey(cryptography.PrivateKey.fromStringECDSA(text));
  }
  /**
   * Construct a Ed25519 private key from a hex-encoded string.
   *
   * @param {string} text
   * @returns {PrivateKey}
   */


  static fromStringED25519(text) {
    return new PrivateKey(cryptography.PrivateKey.fromStringED25519(text));
  }
  /**
   * Recover a private key from a mnemonic phrase (and optionally a password).
   *
   * @param {Mnemonic | cryptography.Mnemonic | string} mnemonic
   * @param {string} [passphrase]
   * @returns {Promise<PrivateKey>}
   */


  static async fromMnemonic(mnemonic, passphrase = "") {
    if (mnemonic instanceof _Mnemonic.default) {
      return new PrivateKey(await cryptography.PrivateKey.fromMnemonic(mnemonic._mnemonic, passphrase));
    }

    return new PrivateKey(await cryptography.PrivateKey.fromMnemonic(mnemonic, passphrase));
  }
  /**
   * Recover a private key from a keystore, previously created by `.toKeystore()`.
   *
   * This key will _not_ support child key derivation.
   *
   * @param {Uint8Array} data
   * @param {string} [passphrase]
   * @returns {Promise<PrivateKey>}
   * @throws {BadKeyError} If the passphrase is incorrect or the hash fails to validate.
   */


  static async fromKeystore(data, passphrase = "") {
    return new PrivateKey(await cryptography.PrivateKey.fromKeystore(data, passphrase));
  }
  /**
   * Recover a private key from a pem string; the private key may be encrypted.
   *
   * This method assumes the .pem file has been converted to a string already.
   *
   * If `passphrase` is not null or empty, this looks for the first `ENCRYPTED PRIVATE KEY`
   * section and uses `passphrase` to decrypt it; otherwise, it looks for the first `PRIVATE KEY`
   * section and decodes that as a DER-encoded  private key.
   *
   * @param {string} data
   * @param {string} [passphrase]
   * @returns {Promise<PrivateKey>}
   */


  static async fromPem(data, passphrase = "") {
    return new PrivateKey(await cryptography.PrivateKey.fromPem(data, passphrase));
  }
  /**
   * Derive a new private key at the given wallet index.
   *
   * Only currently supported for keys created with `fromMnemonic()`; other keys will throw
   * an error.
   *
   * You can check if a key supports derivation with `.supportsDerivation()`
   *
   * @param {number} index
   * @returns {Promise<PrivateKey>}
   * @throws If this key does not support derivation.
   */


  async derive(index) {
    return new PrivateKey(await this._key.derive(index));
  }
  /**
   * @param {number} index
   * @returns {Promise<PrivateKey>}
   * @throws If this key does not support derivation.
   */


  async legacyDerive(index) {
    return new PrivateKey(await this._key.legacyDerive(index));
  }
  /**
   * Get the public key associated with this private key.
   *
   * The public key can be freely given and used by other parties to verify
   * the signatures generated by this private key.
   *
   * @returns {PublicKey}
   */


  get publicKey() {
    return new _PublicKey.default(this._key.publicKey);
  }
  /**
   * Sign a message with this private key.
   *
   * @param {Uint8Array} bytes
   * @returns {Uint8Array} - The signature bytes without the message
   */


  sign(bytes) {
    return this._key.sign(bytes);
  }
  /**
   * @param {Transaction} transaction
   * @returns {Uint8Array}
   */


  signTransaction(transaction) {
    const tx = transaction._signedTransactions.get(0);

    const signature = tx.bodyBytes != null ? this.sign(tx.bodyBytes) : new Uint8Array();
    transaction.addSignature(this.publicKey, signature);
    return signature;
  }
  /**
   * Check if `derive` can be called on this private key.
   *
   * This is only the case if the key was created from a mnemonic.
   *
   * @returns {boolean}
   */


  isDerivable() {
    return this._key.isDerivable();
  }
  /**
   * @returns {Uint8Array}
   */


  toBytes() {
    return this._key.toBytes();
  }
  /**
   * @returns {Uint8Array}
   */


  toBytesDer() {
    return this._key.toBytesDer();
  }
  /**
   * @returns {Uint8Array}
   */


  toBytesRaw() {
    return this._key.toBytesRaw();
  }
  /**
   * @returns {string}
   */


  toString() {
    return this._key.toStringDer();
  }
  /**
   * @returns {string}
   */


  toStringDer() {
    return this._key.toStringDer();
  }
  /**
   * @returns {string}
   */


  toStringRaw() {
    return this._key.toStringRaw();
  }
  /**
   * Create a keystore with a given passphrase.
   *
   * The key can be recovered later with `fromKeystore()`.
   *
   * Note that this will not retain the ancillary data used for
   * deriving child keys, thus `.derive()` on the restored key will
   * throw even if this instance supports derivation.
   *
   * @param {string} [passphrase]
   * @returns {Promise<Uint8Array>}
   */


  toKeystore(passphrase = "") {
    return this._key.toKeystore(passphrase);
  }
  /**
   * @returns {proto.IKey}
   */


  _toProtobufKey() {
    return this.publicKey._toProtobufKey();
  }
  /**
   * @param {Long | number} shard
   * @param {Long | number} realm
   * @returns {AccountId}
   */


  toAccountId(shard, realm) {
    return this.publicKey.toAccountId(shard, realm);
  }

}

exports.default = PrivateKey;

_Cache.default.privateKeyConstructor = key => new PrivateKey(key);