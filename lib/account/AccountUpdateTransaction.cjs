"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Transaction = _interopRequireWildcard(require("../transaction/Transaction.cjs"));

var _AccountId = _interopRequireDefault(require("./AccountId.cjs"));

var _Timestamp = _interopRequireDefault(require("../Timestamp.cjs"));

var _Duration = _interopRequireDefault(require("../Duration.cjs"));

var _long = _interopRequireDefault(require("long"));

var _Key = _interopRequireDefault(require("../Key.cjs"));

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
 * @typedef {import("@hashgraph/proto").ICryptoUpdateTransactionBody} proto.ICryptoUpdateTransactionBody
 * @typedef {import("@hashgraph/proto").IAccountID} proto.IAccountID
 */

/**
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../client/Client.js").default<*, *>} Client
 * @typedef {import("../transaction/TransactionId.js").default} TransactionId
 */

/**
 * Change properties for the given account.
 */
class AccountUpdateTransaction extends _Transaction.default {
  /**
   * @param {object} props
   * @param {AccountId} [props.accountId]
   * @param {Key} [props.key]
   * @param {boolean} [props.receiverSignatureRequired]
   * @param {AccountId} [props.proxyAccountId]
   * @param {Duration | Long | number} [props.autoRenewPeriod]
   * @param {Timestamp | Date} [props.expirationTime]
   * @param {string} [props.accountMemo]
   * @param {Long | number} [props.maxAutomaticTokenAssociations]
   * @param {Key} [props.aliasKey]
   */
  constructor(props = {}) {
    super();
    /**
     * @private
     * @type {?AccountId}
     */

    this._accountId = null;
    /**
     * @private
     * @type {?Key}
     */

    this._key = null;
    /**
     * @private
     * @type {boolean}
     */

    this._receiverSignatureRequired = false;
    /**
     * @private
     * @type {?AccountId}
     */

    this._proxyAccountId = null;
    /**
     * @private
     * @type {?Duration}
     */

    this._autoRenewPeriod = null;
    /**
     * @private
     * @type {?Timestamp}
     */

    this._expirationTime = null;
    /**
     * @private
     * @type {?string}
     */

    this._accountMemo = null;
    /**
     * @private
     * @type {?Long}
     */

    this._maxAutomaticTokenAssociations = null;
    /**
     * @private
     * @type {?Key}
     */

    this._aliasKey = null;

    if (props.accountId != null) {
      this.setAccountId(props.accountId);
    }

    if (props.key != null) {
      this.setKey(props.key);
    }

    if (props.receiverSignatureRequired != null) {
      this.setReceiverSignatureRequired(props.receiverSignatureRequired);
    }

    if (props.proxyAccountId != null) {
      this.setProxyAccountId(props.proxyAccountId);
    }

    if (props.autoRenewPeriod != null) {
      this.setAutoRenewPeriod(props.autoRenewPeriod);
    }

    if (props.expirationTime != null) {
      this.setExpirationTime(props.expirationTime);
    }

    if (props.accountMemo != null) {
      this.setAccountMemo(props.accountMemo);
    }

    if (props.maxAutomaticTokenAssociations != null) {
      this.setMaxAutomaticTokenAssociations(props.maxAutomaticTokenAssociations);
    }
  }
  /**
   * @internal
   * @param {proto.ITransaction[]} transactions
   * @param {proto.ISignedTransaction[]} signedTransactions
   * @param {TransactionId[]} transactionIds
   * @param {AccountId[]} nodeIds
   * @param {proto.ITransactionBody[]} bodies
   * @returns {AccountUpdateTransaction}
   */


  static _fromProtobuf(transactions, signedTransactions, transactionIds, nodeIds, bodies) {
    const body = bodies[0];
    const update =
    /** @type {proto.ICryptoUpdateTransactionBody} */
    body.cryptoUpdateAccount;
    return _Transaction.default._fromProtobufTransactions(new AccountUpdateTransaction({
      accountId: update.accountIDToUpdate != null ? _AccountId.default._fromProtobuf(
      /** @type {proto.IAccountID} */
      update.accountIDToUpdate) : undefined,
      key: update.key != null ? _Key.default._fromProtobufKey(update.key) : undefined,
      receiverSignatureRequired: update.receiverSigRequired != null ? update.receiverSigRequired : undefined,
      proxyAccountId: update.proxyAccountID != null ? _AccountId.default._fromProtobuf(
      /** @type {proto.IAccountID} */
      update.proxyAccountID) : undefined,
      autoRenewPeriod: update.autoRenewPeriod != null ? update.autoRenewPeriod.seconds != null ? update.autoRenewPeriod.seconds : undefined : undefined,
      expirationTime: update.expirationTime != null ? _Timestamp.default._fromProtobuf(update.expirationTime) : undefined,
      accountMemo: update.memo != null ? update.memo.value != null ? update.memo.value : undefined : undefined,
      maxAutomaticTokenAssociations: update.maxAutomaticTokenAssociations != null && update.maxAutomaticTokenAssociations.value != null ? _long.default.fromNumber(update.maxAutomaticTokenAssociations.value) : undefined
    }), transactions, signedTransactions, transactionIds, nodeIds, bodies);
  }
  /**
   * @returns {?AccountId}
   */


  get accountId() {
    return this._accountId;
  }
  /**
   * Sets the account ID which is being updated in this transaction.
   *
   * @param {AccountId | string} accountId
   * @returns {AccountUpdateTransaction}
   */


  setAccountId(accountId) {
    this._requireNotFrozen();

    this._accountId = typeof accountId === "string" ? _AccountId.default.fromString(accountId) : accountId.clone();
    return this;
  }
  /**
   * @returns {?Key}
   */


  get key() {
    return this._key;
  }
  /**
   * @param {Key} key
   * @returns {this}
   */


  setKey(key) {
    this._requireNotFrozen();

    this._key = key;
    return this;
  }
  /**
   * @returns {boolean}
   */


  get receiverSignatureRequired() {
    return this._receiverSignatureRequired;
  }
  /**
   * @param {boolean} receiverSignatureRequired
   * @returns {this}
   */


  setReceiverSignatureRequired(receiverSignatureRequired) {
    this._requireNotFrozen();

    this._receiverSignatureRequired = receiverSignatureRequired;
    return this;
  }
  /**
   * @returns {?AccountId}
   */


  get proxyAccountId() {
    return this._proxyAccountId;
  }
  /**
   * @param {AccountId} proxyAccountId
   * @returns {this}
   */


  setProxyAccountId(proxyAccountId) {
    this._requireNotFrozen();

    this._proxyAccountId = proxyAccountId;
    return this;
  }
  /**
   * @returns {?Duration}
   */


  get autoRenewPeriod() {
    return this._autoRenewPeriod;
  }
  /**
   * @param {Duration | Long | number} autoRenewPeriod
   * @returns {this}
   */


  setAutoRenewPeriod(autoRenewPeriod) {
    this._requireNotFrozen();

    this._autoRenewPeriod = autoRenewPeriod instanceof _Duration.default ? autoRenewPeriod : new _Duration.default(autoRenewPeriod);
    return this;
  }
  /**
   * @returns {?Timestamp}
   */


  get expirationTime() {
    return this._expirationTime;
  }
  /**
   * @param {Timestamp | Date} expirationTime
   * @returns {this}
   */


  setExpirationTime(expirationTime) {
    this._requireNotFrozen();

    this._expirationTime = expirationTime instanceof Date ? _Timestamp.default.fromDate(expirationTime) : expirationTime;
    return this;
  }
  /**
   * @returns {?string}
   */


  get accountMemo() {
    return this._accountMemo;
  }
  /**
   * @param {string} memo
   * @returns {this}
   */


  setAccountMemo(memo) {
    this._requireNotFrozen();

    this._accountMemo = memo;
    return this;
  }
  /**
   * @returns {this}
   */


  clearAccountMemo() {
    this._requireNotFrozen();

    this._accountMemo = null;
    return this;
  }
  /**
   * @returns {?Long}
   */


  get maxAutomaticTokenAssociations() {
    return this._maxAutomaticTokenAssociations;
  }
  /**
   * @param {Long | number} maxAutomaticTokenAssociations
   * @returns {this}
   */


  setMaxAutomaticTokenAssociations(maxAutomaticTokenAssociations) {
    this._requireNotFrozen();

    this._maxAutomaticTokenAssociations = typeof maxAutomaticTokenAssociations === "number" ? _long.default.fromNumber(maxAutomaticTokenAssociations) : maxAutomaticTokenAssociations;
    return this;
  }
  /**
   * @deprecated - no longer supported
   * @returns {?Key}
   */


  get aliasKey() {
    return null;
  }
  /**
   * @deprecated - no longer supported
   * @param {Key} _
   * @returns {this}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  setAliasKey(_) {
    return this;
  }
  /**
   * @param {Client} client
   */


  _validateChecksums(client) {
    if (this._accountId != null) {
      this._accountId.validateChecksum(client);
    }

    if (this._proxyAccountId != null) {
      this._proxyAccountId.validateChecksum(client);
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
    return channel.crypto.updateAccount(request);
  }
  /**
   * @override
   * @protected
   * @returns {NonNullable<proto.TransactionBody["data"]>}
   */


  _getTransactionDataCase() {
    return "cryptoUpdateAccount";
  }
  /**
   * @override
   * @protected
   * @returns {proto.ICryptoUpdateTransactionBody}
   */


  _makeTransactionData() {
    return {
      accountIDToUpdate: this._accountId != null ? this._accountId._toProtobuf() : null,
      key: this._key != null ? this._key._toProtobufKey() : null,
      expirationTime: this._expirationTime != null ? this._expirationTime._toProtobuf() : null,
      proxyAccountID: this._proxyAccountId != null ? this._proxyAccountId._toProtobuf() : null,
      autoRenewPeriod: this._autoRenewPeriod != null ? this._autoRenewPeriod._toProtobuf() : null,
      receiverSigRequiredWrapper: this._receiverSignatureRequired == null ? null : {
        value: this._receiverSignatureRequired
      },
      memo: this._accountMemo != null ? {
        value: this._accountMemo
      } : null,
      maxAutomaticTokenAssociations: this._maxAutomaticTokenAssociations != null ? {
        value: this._maxAutomaticTokenAssociations.toInt()
      } : null
    };
  }
  /**
   * @returns {string}
   */


  _getLogId() {
    const timestamp =
    /** @type {import("../Timestamp.js").default} */
    this._transactionIds.current.validStart;
    return `AccountUpdateTransaction:${timestamp.toString()}`;
  }

}

exports.default = AccountUpdateTransaction;

_Transaction.TRANSACTION_REGISTRY.set("cryptoUpdateAccount", // eslint-disable-next-line @typescript-eslint/unbound-method
AccountUpdateTransaction._fromProtobuf);