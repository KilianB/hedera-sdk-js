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
 * @typedef {import("@hashgraph/proto").ICryptoApproveAllowanceTransactionBody} proto.ICryptoApproveAllowanceTransactionBody
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
class AccountAllowanceApproveTransaction extends _Transaction.default {
  /**
   * @param {object} [props]
   * @param {HbarAllowance[]} [props.hbarApprovals]
   * @param {TokenAllowance[]} [props.tokenApprovals]
   * @param {TokenNftAllowance[]} [props.nftApprovals]
   */
  constructor(props = {}) {
    super();
    /**
     * @private
     * @type {HbarAllowance[]}
     */

    this._hbarApprovals = props.hbarApprovals != null ? props.hbarApprovals : [];
    /**
     * @private
     * @type {TokenAllowance[]}
     */

    this._tokenApprovals = props.tokenApprovals != null ? props.tokenApprovals : [];
    /**
     * @private
     * @type {TokenNftAllowance[]}
     */

    this._nftApprovals = props.nftApprovals != null ? props.nftApprovals : [];
  }
  /**
   * @internal
   * @param {proto.ITransaction[]} transactions
   * @param {proto.ISignedTransaction[]} signedTransactions
   * @param {TransactionId[]} transactionIds
   * @param {AccountId[]} nodeIds
   * @param {proto.ITransactionBody[]} bodies
   * @returns {AccountAllowanceApproveTransaction}
   */


  static _fromProtobuf(transactions, signedTransactions, transactionIds, nodeIds, bodies) {
    const body = bodies[0];
    const allowanceApproval =
    /** @type {proto.ICryptoApproveAllowanceTransactionBody} */
    body.cryptoApproveAllowance;
    return _Transaction.default._fromProtobufTransactions(new AccountAllowanceApproveTransaction({
      hbarApprovals: (allowanceApproval.cryptoAllowances != null ? allowanceApproval.cryptoAllowances : []).map(approval => _HbarAllowance.default._fromProtobuf(approval)),
      tokenApprovals: (allowanceApproval.tokenAllowances != null ? allowanceApproval.tokenAllowances : []).map(approval => _TokenAllowance.default._fromProtobuf(approval)),
      nftApprovals: (allowanceApproval.nftAllowances != null ? allowanceApproval.nftAllowances : []).map(approval => _TokenNftAllowance.default._fromProtobuf(approval))
    }), transactions, signedTransactions, transactionIds, nodeIds, bodies);
  }
  /**
   * @returns {HbarAllowance[]}
   */


  get hbarApprovals() {
    return this._hbarApprovals;
  }
  /**
   * @param {AccountId | string} ownerAccountId
   * @param {AccountId | string} spenderAccountId
   * @param {number | string | Long | LongObject | BigNumber | Hbar} amount
   * @returns {AccountAllowanceApproveTransaction}
   */


  approveHbarAllowance(ownerAccountId, spenderAccountId, amount) {
    this._requireNotFrozen();

    this._hbarApprovals.push(new _HbarAllowance.default({
      spenderAccountId: typeof spenderAccountId === "string" ? _AccountId.default.fromString(spenderAccountId) : spenderAccountId,
      ownerAccountId: typeof ownerAccountId === "string" ? _AccountId.default.fromString(ownerAccountId) : ownerAccountId,
      amount: amount instanceof _Hbar.default ? amount : new _Hbar.default(amount)
    }));

    return this;
  }
  /**
   * @deprecated
   * @param {AccountId | string} spenderAccountId
   * @param {number | string | Long | LongObject | BigNumber | Hbar} amount
   * @returns {AccountAllowanceApproveTransaction}
   */


  addHbarAllowance(spenderAccountId, amount) {
    this._requireNotFrozen();

    this._hbarApprovals.push(new _HbarAllowance.default({
      spenderAccountId: typeof spenderAccountId === "string" ? _AccountId.default.fromString(spenderAccountId) : spenderAccountId,
      amount: amount instanceof _Hbar.default ? amount : new _Hbar.default(amount),
      ownerAccountId: null
    }));

    return this;
  }
  /**
   * @returns {TokenAllowance[]}
   */


  get tokenApprovals() {
    return this._tokenApprovals;
  }
  /**
   * @param {TokenId | string} tokenId
   * @param {AccountId | string} ownerAccountId
   * @param {AccountId | string} spenderAccountId
   * @param {Long | number} amount
   * @returns {AccountAllowanceApproveTransaction}
   */


  approveTokenAllowance(tokenId, ownerAccountId, spenderAccountId, amount) {
    this._requireNotFrozen();

    this._tokenApprovals.push(new _TokenAllowance.default({
      tokenId: typeof tokenId === "string" ? _TokenId.default.fromString(tokenId) : tokenId,
      spenderAccountId: typeof spenderAccountId === "string" ? _AccountId.default.fromString(spenderAccountId) : spenderAccountId,
      ownerAccountId: typeof ownerAccountId === "string" ? _AccountId.default.fromString(ownerAccountId) : ownerAccountId,
      amount: typeof amount === "number" ? _long.default.fromNumber(amount) : amount
    }));

    return this;
  }
  /**
   * @deprecated
   * @param {TokenId | string} tokenId
   * @param {AccountId | string} spenderAccountId
   * @param {Long | number} amount
   * @returns {AccountAllowanceApproveTransaction}
   */


  addTokenAllowance(tokenId, spenderAccountId, amount) {
    this._requireNotFrozen();

    this._tokenApprovals.push(new _TokenAllowance.default({
      tokenId: typeof tokenId === "string" ? _TokenId.default.fromString(tokenId) : tokenId,
      spenderAccountId: typeof spenderAccountId === "string" ? _AccountId.default.fromString(spenderAccountId) : spenderAccountId,
      amount: typeof amount === "number" ? _long.default.fromNumber(amount) : amount,
      ownerAccountId: null
    }));

    return this;
  }
  /**
   * @deprecated
   * @param {NftId | string} nftId
   * @param {AccountId | string} spenderAccountId
   * @returns {AccountAllowanceApproveTransaction}
   */


  addTokenNftAllowance(nftId, spenderAccountId) {
    return this._approveTokenNftAllowance(nftId, null, spenderAccountId);
  }
  /**
   * @param {NftId | string} nftId
   * @param {AccountId | string | null} ownerAccountId
   * @param {AccountId | string} spenderAccountId
   * @returns {AccountAllowanceApproveTransaction}
   */


  _approveTokenNftAllowance(nftId, ownerAccountId, spenderAccountId) {
    this._requireNotFrozen();

    const id = typeof nftId === "string" ? _NftId.default.fromString(nftId) : nftId;
    const spender = typeof spenderAccountId === "string" ? _AccountId.default.fromString(spenderAccountId) : spenderAccountId;
    let found = false;

    for (const allowance of this._nftApprovals) {
      if (allowance.tokenId.compare(id.tokenId) === 0 && allowance.spenderAccountId.compare(spender) === 0) {
        if (allowance.serialNumbers != null) {
          allowance.serialNumbers.push(id.serial);
        }

        found = true;
        break;
      }
    }

    if (!found) {
      this._nftApprovals.push(new _TokenNftAllowance.default({
        tokenId: id.tokenId,
        spenderAccountId: typeof spenderAccountId === "string" ? _AccountId.default.fromString(spenderAccountId) : spenderAccountId,
        ownerAccountId: typeof ownerAccountId === "string" ? _AccountId.default.fromString(ownerAccountId) : ownerAccountId,
        serialNumbers: [id.serial],
        allSerials: false
      }));
    }

    return this;
  }
  /**
   * @param {NftId | string} nftId
   * @param {AccountId | string} ownerAccountId
   * @param {AccountId | string} spenderAccountId
   * @returns {AccountAllowanceApproveTransaction}
   */


  approveTokenNftAllowance(nftId, ownerAccountId, spenderAccountId) {
    return this._approveTokenNftAllowance(nftId, ownerAccountId, spenderAccountId);
  }
  /**
   * @param {TokenId | string} tokenId
   * @param {AccountId | string | null} ownerAccountId
   * @param {AccountId | string} spenderAccountId
   * @param {boolean} allSerials
   * @returns {AccountAllowanceApproveTransaction}
   */


  _approveAllTokenNftAllowance(tokenId, ownerAccountId, spenderAccountId, allSerials) {
    this._requireNotFrozen();

    this._nftApprovals.push(new _TokenNftAllowance.default({
      tokenId: typeof tokenId === "string" ? _TokenId.default.fromString(tokenId) : tokenId,
      spenderAccountId: typeof spenderAccountId === "string" ? _AccountId.default.fromString(spenderAccountId) : spenderAccountId,
      ownerAccountId: typeof ownerAccountId === "string" ? _AccountId.default.fromString(ownerAccountId) : ownerAccountId,
      serialNumbers: null,
      allSerials
    }));

    return this;
  }
  /**
   * @deprecated
   * @param {TokenId | string} tokenId
   * @param {AccountId | string} ownerAccountId
   * @param {AccountId | string} spenderAccountId
   * @returns {AccountAllowanceApproveTransaction}
   */


  addAllTokenNftAllowance(tokenId, ownerAccountId, spenderAccountId) {
    return this._approveAllTokenNftAllowance(tokenId, ownerAccountId, spenderAccountId, true);
  }
  /**
   * @param {TokenId | string} tokenId
   * @param {AccountId | string} ownerAccountId
   * @param {AccountId | string} spenderAccountId
   * @returns {AccountAllowanceApproveTransaction}
   */


  approveTokenNftAllowanceAllSerials(tokenId, ownerAccountId, spenderAccountId) {
    return this._approveAllTokenNftAllowance(tokenId, ownerAccountId, spenderAccountId, true);
  }
  /**
   * @param {Client} client
   */


  _validateChecksums(client) {
    this._hbarApprovals.map(approval => approval.spenderAccountId.validateChecksum(client));

    this._tokenApprovals.map(approval => {
      approval.tokenId.validateChecksum(client);
      approval.spenderAccountId.validateChecksum(client);
    });

    this._nftApprovals.map(approval => {
      approval.tokenId.validateChecksum(client);
      approval.spenderAccountId.validateChecksum(client);

      if (approval.ownerAccountId != null) {
        approval.ownerAccountId.validateChecksum(client);
      }
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
    return channel.crypto.approveAllowances(request);
  }
  /**
   * @override
   * @protected
   * @returns {NonNullable<proto.TransactionBody["data"]>}
   */


  _getTransactionDataCase() {
    return "cryptoApproveAllowance";
  }
  /**
   * @override
   * @protected
   * @returns {proto.ICryptoApproveAllowanceTransactionBody}
   */


  _makeTransactionData() {
    return {
      cryptoAllowances: this._hbarApprovals.map(approval => approval._toProtobuf()),
      tokenAllowances: this._tokenApprovals.map(approval => approval._toProtobuf()),
      nftAllowances: this._nftApprovals.map(approval => approval._toProtobuf())
    };
  }
  /**
   * @returns {string}
   */


  _getLogId() {
    const timestamp =
    /** @type {import("../Timestamp.js").default} */
    this._transactionIds.current.validStart;
    return `AccountAllowanceApproveTransaction:${timestamp.toString()}`;
  }

}

exports.default = AccountAllowanceApproveTransaction;

_Transaction.TRANSACTION_REGISTRY.set("cryptoApproveAllowance", // eslint-disable-next-line @typescript-eslint/unbound-method
AccountAllowanceApproveTransaction._fromProtobuf);