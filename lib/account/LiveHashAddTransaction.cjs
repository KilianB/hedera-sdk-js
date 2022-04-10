"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Transaction = _interopRequireWildcard(require("../transaction/Transaction.cjs"));

var _AccountId = _interopRequireDefault(require("./AccountId.cjs"));

var _Duration = _interopRequireDefault(require("../Duration.cjs"));

var _Key = _interopRequireDefault(require("../Key.cjs"));

var _KeyList = _interopRequireDefault(require("../KeyList.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").ITransaction} proto.ITransaction
 * @typedef {import("@hashgraph/proto").ISignedTransaction} proto.ISignedTransaction
 * @typedef {import("@hashgraph/proto").TransactionBody} proto.TransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionBody} proto.ITransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionResponse} proto.ITransactionResponse
 * @typedef {import("@hashgraph/proto").ICryptoAddLiveHashTransactionBody} proto.ICryptoAddLiveHashTransactionBody
 * @typedef {import("@hashgraph/proto").ILiveHash} proto.ILiveHash
 */

/**
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../client/Client.js").default<*, *>} Client
 * @typedef {import("../transaction/TransactionId.js").default} TransactionId
 */
class LiveHashAddTransaction extends _Transaction.default {
  /**
   * @param {object} [props]
   * @param {Uint8Array} [props.hash]
   * @param {Key[]} [props.keys]
   * @param {Duration | Long | number} [props.duration]
   * @param {AccountId | string} [props.accountId]
   */
  constructor(props = {}) {
    super();
    /**
     * @private
     * @type {?Uint8Array}
     */

    this._hash = null;
    /**
     * @private
     * @type {?Key[]}
     */

    this._keys = null;
    /**
     * @private
     * @type {?Duration}
     */

    this._duration = null;
    /**
     * @private
     * @type {?AccountId}
     */

    this._accountId = null;

    if (props.hash != null) {
      this.setHash(props.hash);
    }

    if (props.keys != null) {
      this.setKeys(props.keys);
    }

    if (props.duration != null) {
      this.setDuration(props.duration);
    }

    if (props.accountId != null) {
      this.setAccountId(props.accountId);
    }
  }
  /**
   * @internal
   * @param {proto.ITransaction[]} transactions
   * @param {proto.ISignedTransaction[]} signedTransactions
   * @param {TransactionId[]} transactionIds
   * @param {AccountId[]} nodeIds
   * @param {proto.ITransactionBody[]} bodies
   * @returns {LiveHashAddTransaction}
   */


  static _fromProtobuf(transactions, signedTransactions, transactionIds, nodeIds, bodies) {
    const body = bodies[0];
    const hashes =
    /** @type {proto.ICryptoAddLiveHashTransactionBody} */
    body.cryptoAddLiveHash;
    const liveHash_ =
    /** @type {proto.ILiveHash} */
    hashes.liveHash;
    return _Transaction.default._fromProtobufTransactions(new LiveHashAddTransaction({
      hash: liveHash_.hash != null ? liveHash_.hash : undefined,
      keys: liveHash_.keys != null ? liveHash_.keys.keys != null ? liveHash_.keys.keys.map(key => _Key.default._fromProtobufKey(key)) : undefined : undefined,
      duration: liveHash_.duration != null ? liveHash_.duration.seconds != null ? liveHash_.duration.seconds : undefined : undefined,
      accountId: liveHash_.accountId != null ? _AccountId.default._fromProtobuf(liveHash_.accountId) : undefined
    }), transactions, signedTransactions, transactionIds, nodeIds, bodies);
  }
  /**
   * @returns {?Uint8Array}
   */


  get hash() {
    return this._hash;
  }
  /**
   * @param {Uint8Array} hash
   * @returns {LiveHashAddTransaction}
   */


  setHash(hash) {
    this._requireNotFrozen();

    this._hash = hash;
    return this;
  }
  /**
   * @returns {?Key[]}
   */


  get keys() {
    return this._keys;
  }
  /**
   * @param {Key[] | KeyList} keys
   * @returns {LiveHashAddTransaction}
   */


  setKeys(keys) {
    this._requireNotFrozen();

    this._keys = keys instanceof _KeyList.default ? keys.toArray() : keys;
    return this;
  }
  /**
   * @returns {?Duration}
   */


  get duration() {
    return this._duration;
  }
  /**
   * @param {Duration | Long | number} duration
   * @returns {LiveHashAddTransaction}
   */


  setDuration(duration) {
    this._requireNotFrozen();

    this._duration = duration instanceof _Duration.default ? duration : new _Duration.default(duration);
    return this;
  }
  /**
   * @returns {?AccountId}
   */


  get accountId() {
    return this._accountId;
  }
  /**
   * @param {AccountId | string} accountId
   * @returns {LiveHashAddTransaction}
   */


  setAccountId(accountId) {
    this._requireNotFrozen();

    this._accountId = typeof accountId === "string" ? _AccountId.default.fromString(accountId) : accountId.clone();
    return this;
  }
  /**
   * @param {Client} client
   */


  _validateChecksums(client) {
    if (this._accountId != null) {
      this._accountId.validateChecksum(client);
    }
  }
  /**
   * @override
   * @internal
   * @param {Channel} channel
   * @param {proto.ITransaction} request
   * @returns {Promise<proto.ITransactionResponse>}
   */


  _execute(channel, request) {
    return channel.crypto.addLiveHash(request);
  }
  /**
   * @override
   * @protected
   * @returns {NonNullable<proto.TransactionBody["data"]>}
   */


  _getTransactionDataCase() {
    return "cryptoAddLiveHash";
  }
  /**
   * @override
   * @protected
   * @returns {proto.ICryptoAddLiveHashTransactionBody}
   */


  _makeTransactionData() {
    return {
      liveHash: {
        hash: this._hash,
        keys: this._keys != null ? {
          keys: this._keys.map(key => key._toProtobufKey())
        } : undefined,
        duration: this._duration != null ? this._duration._toProtobuf() : null,
        accountId: this._accountId != null ? this._accountId._toProtobuf() : null
      }
    };
  }
  /**
   * @returns {string}
   */


  _getLogId() {
    const timestamp =
    /** @type {import("../Timestamp.js").default} */
    this._transactionIds.current.validStart;
    return `LiveHashAddTransaction:${timestamp.toString()}`;
  }

}

exports.default = LiveHashAddTransaction;

_Transaction.TRANSACTION_REGISTRY.set("cryptoAddLiveHash", // eslint-disable-next-line @typescript-eslint/unbound-method
LiveHashAddTransaction._fromProtobuf);