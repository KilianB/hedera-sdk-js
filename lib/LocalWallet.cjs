"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Wallet = _interopRequireDefault(require("./Wallet.cjs"));

var _LocalProvider = _interopRequireDefault(require("./LocalProvider.cjs"));

var _PrivateKey = _interopRequireDefault(require("./PrivateKey.cjs"));

var _AccountId = _interopRequireDefault(require("./account/AccountId.cjs"));

var _TransactionId = _interopRequireDefault(require("./transaction/TransactionId.cjs"));

var _SignerSignature = _interopRequireDefault(require("./SignerSignature.cjs"));

var _AccountBalanceQuery = _interopRequireDefault(require("./account/AccountBalanceQuery.cjs"));

var _AccountInfoQuery = _interopRequireDefault(require("./account/AccountInfoQuery.cjs"));

var _AccountRecordsQuery = _interopRequireDefault(require("./account/AccountRecordsQuery.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {import("./LedgerId.js").default} LedgerId
 * @typedef {import("./Provider.js").default} Provider
 * @typedef {import("./Key.js").default} Key
 * @typedef {import("./transaction/Transaction.js").default} Transaction
 * @typedef {import("./transaction/TransactionResponse.js").default} TransactionResponse
 * @typedef {import("./transaction/TransactionReceipt.js").default} TransactionReceipt
 * @typedef {import("./transaction/TransactionRecord.js").default} TransactionRecord
 * @typedef {import("./account/AccountBalance.js").default} AccountBalance
 * @typedef {import("./account/AccountInfo.js").default} AccountInfo
 */

/**
 * @template {any} O
 * @typedef {import("./query/Query.js").default<O>} Query<O>
 */

/**
 * @template RequestT
 * @template ResponseT
 * @template OutputT
 * @typedef {import("./Executable.js").default<RequestT, ResponseT, OutputT>} Executable<RequestT, ResponseT, OutputT>
 */
class LocalWallet extends _Wallet.default {
  constructor() {
    super();
    this.provider = new _LocalProvider.default();

    if (process.env.OPERATOR_KEY == null || process.env.OPERATOR_ID == null) {
      throw new Error("LocalWallet requires `OPERATOR_KEY` and `OPERATOR_ID` environment variables to be set");
    }

    const key = _PrivateKey.default.fromString(process.env.OPERATOR_KEY);

    this.publicKey = key.publicKey;
    /**
     * @type {(messasge: Uint8Array) => Promise<Uint8Array>}
     */

    this.signer = message => Promise.resolve(key.sign(message));

    this.accountId = _AccountId.default.fromString(process.env.OPERATOR_ID);
  }
  /**
   * @returns {Provider}
   */


  getProvider() {
    return this.provider;
  }
  /**
   * @returns {Key}
   */


  getAccountKey() {
    return this.publicKey;
  }
  /**
   * @returns {LedgerId?}
   */


  getLedgerId() {
    return this.provider.getLedgerId();
  }
  /**
   * @returns {AccountId}
   */


  getAccountId() {
    return this.accountId;
  }
  /**
   * @abstract
   * @returns {{[key: string]: (string | AccountId)}}
   */


  getNetwork() {
    return this.provider.getNetwork();
  }
  /**
   * @abstract
   * @returns {string[]}
   */


  getMirrorNetwork() {
    return this.provider.getMirrorNetwork();
  }
  /**
   * @param {Uint8Array[]} messages
   * @returns {Promise<SignerSignature[]>}
   */


  async sign(messages) {
    const sigantures = [];

    for (const message of messages) {
      sigantures.push(new _SignerSignature.default({
        publicKey: this.publicKey,
        signature: await this.signer(message),
        accountId: this.accountId
      }));
    }

    return sigantures;
  }
  /**
   * @returns {Promise<AccountBalance>}
   */


  getAccountBalance() {
    return this.sendRequest(new _AccountBalanceQuery.default().setAccountId(this.accountId));
  }
  /**
   * @abstract
   * @returns {Promise<AccountInfo>}
   */


  getAccountInfo() {
    return this.sendRequest(new _AccountInfoQuery.default().setAccountId(this.accountId));
  }
  /**
   * @abstract
   * @returns {Promise<TransactionRecord[]>}
   */


  getAccountRecords() {
    return this.sendRequest(new _AccountRecordsQuery.default().setAccountId(this.accountId));
  }
  /**
   * @param {Transaction} transaction
   * @returns {Promise<Transaction>}
   */


  signTransaction(transaction) {
    return transaction.signWith(this.publicKey, this.signer);
  }
  /**
   * @param {Transaction} transaction
   * @returns {Promise<Transaction>}
   */


  checkTransaction(transaction) {
    const transactionId = transaction.transactionId;

    if (transactionId.accountId != null && transactionId.accountId.compare(this.accountId) != 0) {
      throw new Error("transaction's ID constructed with a different account ID");
    }

    const nodeAccountIds = (transaction.nodeAccountIds != null ? transaction.nodeAccountIds : []).map(nodeAccountId => nodeAccountId.toString());
    const network = Object.values(this.provider.getNetwork()).map(nodeAccountId => nodeAccountId.toString());

    if (!nodeAccountIds.reduce((previous, current) => previous && network.includes(current), true)) {
      throw new Error("Transaction already set node account IDs to values not within the current network");
    }

    return Promise.resolve(transaction);
  }
  /**
   * @param {Transaction} transaction
   * @returns {Promise<Transaction>}
   */


  populateTransaction(transaction) {
    transaction.setTransactionId(_TransactionId.default.generate(this.accountId));
    transaction.setNodeAccountIds(this.provider._client._network.getNodeAccountIdsForExecute());
    return Promise.resolve(transaction);
  }
  /**
   * @template RequestT
   * @template ResponseT
   * @template OutputT
   * @param {Executable<RequestT, ResponseT, OutputT>} request
   * @returns {Promise<OutputT>}
   */


  sendRequest(request) {
    return this.provider.sendRequest(request._setOperatorWith(this.accountId, this.publicKey, this.signer));
  }

}

exports.default = LocalWallet;