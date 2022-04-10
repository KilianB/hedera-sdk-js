"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FileCreateTransaction = _interopRequireDefault(require("../file/FileCreateTransaction.cjs"));

var _FileAppendTransaction = _interopRequireDefault(require("../file/FileAppendTransaction.cjs"));

var _FileDeleteTransaction = _interopRequireDefault(require("../file/FileDeleteTransaction.cjs"));

var _ContractCreateTransaction = _interopRequireDefault(require("./ContractCreateTransaction.cjs"));

var utf8 = _interopRequireWildcard(require("../encoding/utf8.cjs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {import("../account/AccountId.js").default} AccountId
 * @typedef {import("../file/FileId.js").default} FileId
 * @typedef {import("../Key.js").default} Key
 * @typedef {import("./ContractFunctionParameters.js").default} ContractFunctionParameters
 * @typedef {import("../Hbar.js").default} Hbar
 * @typedef {import("../Duration.js").default} Duration
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../transaction/TransactionId.js").default} TransactionId
 * @typedef {import("../transaction/TransactionResponse.js").default} TransactionResponse
 * @typedef {import("../client/Client.js").ClientOperator} ClientOperator
 */

/**
 * @typedef {import("bignumber.js").BigNumber} BigNumber
 * @typedef {import("long").Long} Long
 */
class ContractCreateFlow {
  constructor() {
    /** @type {Uint8Array | null} */
    this._bytecode = null;
    this._contractCreate = new _ContractCreateTransaction.default();
  }
  /**
   * @returns {?Uint8Array}
   */


  get bytecode() {
    return this._bytecode;
  }
  /**
   * @param {string | Uint8Array} bytecode
   * @returns {this}
   */


  setBytecode(bytecode) {
    this._bytecode = bytecode instanceof Uint8Array ? bytecode : utf8.encode(bytecode);
    return this;
  }
  /**
   * @returns {?Key}
   */


  get adminKey() {
    return this._contractCreate.adminKey;
  }
  /**
   * @param {Key} adminKey
   * @returns {this}
   */


  setAdminKey(adminKey) {
    this._contractCreate.setAdminKey(adminKey);

    return this;
  }
  /**
   * @returns {?Long}
   */


  get gas() {
    return this._contractCreate.gas;
  }
  /**
   * @param {number | Long} gas
   * @returns {this}
   */


  setGas(gas) {
    this._contractCreate.setGas(gas);

    return this;
  }
  /**
   * @returns {?Hbar}
   */


  get initialBalance() {
    return this._contractCreate.initialBalance;
  }
  /**
   * Set the initial amount to transfer into this contract.
   *
   * @param {number | string | Long | BigNumber | Hbar} initialBalance
   * @returns {this}
   */


  setInitialBalance(initialBalance) {
    this._contractCreate.setInitialBalance(initialBalance);

    return this;
  }
  /**
   * @returns {?AccountId}
   */


  get proxyAccountId() {
    return this._contractCreate.proxyAccountId;
  }
  /**
   * @param {AccountId | string} proxyAccountId
   * @returns {this}
   */


  setProxyAccountId(proxyAccountId) {
    this._contractCreate.setProxyAccountId(proxyAccountId);

    return this;
  }
  /**
   * @returns {Duration}
   */


  get autoRenewPeriod() {
    return this._contractCreate.autoRenewPeriod;
  }
  /**
   * @param {Duration | Long | number} autoRenewPeriod
   * @returns {this}
   */


  setAutoRenewPeriod(autoRenewPeriod) {
    this._contractCreate.setAutoRenewPeriod(autoRenewPeriod);

    return this;
  }
  /**
   * @returns {?Uint8Array}
   */


  get constructorParameters() {
    return this._contractCreate.constructorParameters;
  }
  /**
   * @param {Uint8Array | ContractFunctionParameters} constructorParameters
   * @returns {this}
   */


  setConstructorParameters(constructorParameters) {
    this._contractCreate.setConstructorParameters(constructorParameters);

    return this;
  }
  /**
   * @returns {?string}
   */


  get contractMemo() {
    return this._contractCreate.contractMemo;
  }
  /**
   * @param {string} contractMemo
   * @returns {this}
   */


  setContractMemo(contractMemo) {
    this._contractCreate.setContractMemo(contractMemo);

    return this;
  }
  /**
   * @template {Channel} ChannelT
   * @template MirrorChannelT
   * @param {import("../client/Client.js").default<ChannelT, MirrorChannelT>} client
   * @param {number=} requestTimeout
   * @returns {Promise<TransactionResponse>}
   */


  async execute(client, requestTimeout) {
    if (this._bytecode == null) {
      throw new Error("cannot create contract with no bytecode");
    }

    const key = client.operatorPublicKey;
    const fileId =
    /** @type {FileId} */
    (await (await new _FileCreateTransaction.default().setKeys(key != null ? [key] : []).setContents(this._bytecode.subarray(0, Math.min(this._bytecode.length, 2048))).execute(client, requestTimeout)).getReceipt(client)).fileId;

    if (this._bytecode.length > 2048) {
      await (await new _FileAppendTransaction.default().setFileId(fileId).setContents(this._bytecode.subarray(2048)).execute(client, requestTimeout)).getReceipt(client);
    }

    const response = await this._contractCreate.setBytecodeFileId(fileId).execute(client);
    await response.getReceipt(client);

    if (key != null) {
      await (await new _FileDeleteTransaction.default().setFileId(fileId).execute(client, requestTimeout)).getReceipt(client);
    }

    return response;
  }

}

exports.default = ContractCreateFlow;