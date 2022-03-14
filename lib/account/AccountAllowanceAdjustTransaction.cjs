"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Transaction = _interopRequireWildcard(require("../transaction/Transaction.cjs"));

var _AccountId = _interopRequireDefault(require("./AccountId.cjs"));

var _TokenId = _interopRequireDefault(require("../token/TokenId.cjs"));

var _NftId = _interopRequireDefault(require("../token/NftId.cjs"));

var _long = _interopRequireDefault(require("long"));

var _Hbar = _interopRequireDefault(require("../Hbar.cjs"));

var _HbarAllowance = _interopRequireDefault(require("./HbarAllowance.cjs"));

var _TokenAllowance = _interopRequireDefault(require("./TokenAllowance.cjs"));

var _TokenNftAllowance = _interopRequireDefault(require("./TokenNftAllowance.cjs"));

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
 * @typedef {import("@hashgraph/proto").ICryptoAdjustAllowanceTransactionBody} proto.ICryptoAdjustAllowanceTransactionBody
 * @typedef {import("@hashgraph/proto").IAccountID} proto.IAccountID
 */

/**
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../client/Client.js").default<*, *>} Client
 * @typedef {import("../transaction/TransactionId.js").default} TransactionId
 * @typedef {import("bignumber.js").default} BigNumber
 * @typedef {import("../long.js").LongObject} LongObject
 */

/**
 * Change properties for the given account.
 */
class AccountAllowanceAdjustTransaction extends _Transaction.default {
  /**
   * @param {object} [props]
   * @param {HbarAllowance[]} [props.hbarAllowances]
   * @param {TokenAllowance[]} [props.tokenAllowances]
   * @param {TokenNftAllowance[]} [props.nftAllowances]
   */
  constructor(props = {}) {
    super();
    /**
     * @private
     * @type {HbarAllowance[]}
     */

    this._hbarAllowances = props.hbarAllowances != null ? props.hbarAllowances : [];
    /**
     * @private
     * @type {TokenAllowance[]}
     */

    this._tokenAllowances = props.tokenAllowances != null ? props.tokenAllowances : [];
    /**
     * @private
     * @type {TokenNftAllowance[]}
     */

    this._nftAllowances = props.nftAllowances != null ? props.nftAllowances : [];
  }
  /**
   * @internal
   * @param {proto.ITransaction[]} transactions
   * @param {proto.ISignedTransaction[]} signedTransactions
   * @param {TransactionId[]} transactionIds
   * @param {AccountId[]} nodeIds
   * @param {proto.ITransactionBody[]} bodies
   * @returns {AccountAllowanceAdjustTransaction}
   */


  static _fromProtobuf(transactions, signedTransactions, transactionIds, nodeIds, bodies) {
    const body = bodies[0];
    const allowanceAdjust =
    /** @type {proto.ICryptoAdjustAllowanceTransactionBody} */
    body.cryptoAdjustAllowance;
    return _Transaction.default._fromProtobufTransactions(new AccountAllowanceAdjustTransaction({
      hbarAllowances: (allowanceAdjust.cryptoAllowances != null ? allowanceAdjust.cryptoAllowances : []).map(adjust => _HbarAllowance.default._fromProtobuf(adjust)),
      tokenAllowances: (allowanceAdjust.tokenAllowances != null ? allowanceAdjust.tokenAllowances : []).map(adjust => _TokenAllowance.default._fromProtobuf(adjust)),
      nftAllowances: (allowanceAdjust.nftAllowances != null ? allowanceAdjust.nftAllowances : []).map(adjust => _TokenNftAllowance.default._fromProtobuf(adjust))
    }), transactions, signedTransactions, transactionIds, nodeIds, bodies);
  }
  /**
   * @returns {HbarAllowance[]}
   */


  get hbarAllowances() {
    return this._hbarAllowances;
  }
  /**
   * @internal
   * @param {AccountId | string} spenderAccountId
   * @param {number | string | Long | LongObject | BigNumber | Hbar} amount
   * @returns {AccountAllowanceAdjustTransaction}
   */


  addHbarAllowance(spenderAccountId, amount) {
    this._requireNotFrozen();

    this._hbarAllowances.push(new _HbarAllowance.default({
      spenderAccountId: typeof spenderAccountId === "string" ? _AccountId.default.fromString(spenderAccountId) : spenderAccountId,
      amount: amount instanceof _Hbar.default ? amount : new _Hbar.default(amount),
      ownerAccountId: null
    }));

    return this;
  }
  /**
   * @returns {TokenAllowance[]}
   */


  get tokenAllowances() {
    return this._tokenAllowances;
  }
  /**
   * @internal
   * @param {TokenId | string} tokenId
   * @param {AccountId | string} spenderAccountId
   * @param {Long | number} amount
   * @returns {AccountAllowanceAdjustTransaction}
   */


  addTokenAllowance(tokenId, spenderAccountId, amount) {
    this._requireNotFrozen();

    this._tokenAllowances.push(new _TokenAllowance.default({
      tokenId: typeof tokenId === "string" ? _TokenId.default.fromString(tokenId) : tokenId,
      spenderAccountId: typeof spenderAccountId === "string" ? _AccountId.default.fromString(spenderAccountId) : spenderAccountId,
      amount: typeof amount === "number" ? _long.default.fromNumber(amount) : amount,
      ownerAccountId: null
    }));

    return this;
  }
  /**
   * @internal
   * @param {NftId | string} nftId
   * @param {AccountId | string} spenderAccountId
   * @returns {AccountAllowanceAdjustTransaction}
   */


  addTokenNftAllowance(nftId, spenderAccountId) {
    this._requireNotFrozen();

    const id = typeof nftId === "string" ? _NftId.default.fromString(nftId) : nftId;
    const spender = typeof spenderAccountId === "string" ? _AccountId.default.fromString(spenderAccountId) : spenderAccountId;
    let found = false;

    for (const allowance of this._nftAllowances) {
      if (allowance.tokenId.compare(id.tokenId) === 0 && allowance.spenderAccountId.compare(spender) === 0) {
        if (allowance.serialNumbers != null) {
          allowance.serialNumbers.push(id.serial);
        }

        found = true;
        break;
      }
    }

    if (!found) {
      this._nftAllowances.push(new _TokenNftAllowance.default({
        tokenId: id.tokenId,
        spenderAccountId: spender,
        serialNumbers: [id.serial],
        ownerAccountId: null
      }));
    }

    return this;
  }
  /**
   * @internal
   * @param {TokenId | string} tokenId
   * @param {AccountId | string} spenderAccountId
   * @returns {AccountAllowanceAdjustTransaction}
   */


  addAllTokenNftAllowance(tokenId, spenderAccountId) {
    this._requireNotFrozen();

    this._nftAllowances.push(new _TokenNftAllowance.default({
      tokenId: typeof tokenId === "string" ? _TokenId.default.fromString(tokenId) : tokenId,
      spenderAccountId: typeof spenderAccountId === "string" ? _AccountId.default.fromString(spenderAccountId) : spenderAccountId,
      serialNumbers: null,
      ownerAccountId: null
    }));

    return this;
  }
  /**
   * @param {Client} client
   */


  _validateChecksums(client) {
    this._hbarAllowances.map(adjust => adjust.spenderAccountId.validateChecksum(client));

    this._tokenAllowances.map(adjust => {
      adjust.tokenId.validateChecksum(client);
      adjust.spenderAccountId.validateChecksum(client);
    });
  }
  /**
   * @override
   * @internal
   * @param {Channel} channel
   * @param {proto.ITransaction} request
   * @returns {Promise<proto.ITransactionResponse>}
   */


  _execute(channel, request) {
    return channel.crypto.adjustAllowance(request);
  }
  /**
   * @override
   * @protected
   * @returns {NonNullable<proto.TransactionBody["data"]>}
   */


  _getTransactionDataCase() {
    return "cryptoAdjustAllowance";
  }
  /**
   * @override
   * @protected
   * @returns {proto.ICryptoAdjustAllowanceTransactionBody}
   */


  _makeTransactionData() {
    return {
      cryptoAllowances: this._hbarAllowances.map(adjust => adjust._toProtobuf()),
      tokenAllowances: this._tokenAllowances.map(adjust => adjust._toProtobuf()),
      nftAllowances: this._nftAllowances.map(adjust => adjust._toProtobuf())
    };
  }

}

exports.default = AccountAllowanceAdjustTransaction;

_Transaction.TRANSACTION_REGISTRY.set("cryptoAdjustAllowance", // eslint-disable-next-line @typescript-eslint/unbound-method
AccountAllowanceAdjustTransaction._fromProtobuf);