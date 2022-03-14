"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Hbar = _interopRequireDefault(require("../Hbar.cjs"));

var _AccountId = _interopRequireDefault(require("../account/AccountId.cjs"));

var _FileId = _interopRequireDefault(require("../file/FileId.cjs"));

var _ContractFunctionParameters = _interopRequireDefault(require("./ContractFunctionParameters.cjs"));

var _Transaction = _interopRequireWildcard(require("../transaction/Transaction.cjs"));

var _long = _interopRequireDefault(require("long"));

var _Duration = _interopRequireDefault(require("../Duration.cjs"));

var _Key = _interopRequireDefault(require("../Key.cjs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").ITransaction} proto.ITransaction
 * @typedef {import("@hashgraph/proto").ISignedTransaction} proto.ISignedTransaction
 * @typedef {import("@hashgraph/proto").TransactionBody} proto.TransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionBody} proto.ITransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionResponse} proto.ITransactionResponse
 * @typedef {import("@hashgraph/proto").IContractCreateTransactionBody} proto.IContractCreateTransactionBody
 * @typedef {import("@hashgraph/proto").IAccountID} proto.IAccountID
 * @typedef {import("@hashgraph/proto").IFileID} proto.IFileID
 */

/**
 * @typedef {import("bignumber.js").default} BigNumber
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../client/Client.js").default<*, *>} Client
 * @typedef {import("../transaction/TransactionId.js").default} TransactionId
 */
class ContractCreateTransaction extends _Transaction.default {
  /**
   * @param {object} [props]
   * @param {FileId | string} [props.bytecodeFileId]
   * @param {Key} [props.adminKey]
   * @param {number | Long} [props.gas]
   * @param {number | string | Long | BigNumber | Hbar} [props.initialBalance]
   * @param {AccountId | string} [props.proxyAccountId]
   * @param {Duration | Long | number} [props.autoRenewPeriod]
   * @param {Uint8Array} [props.constructorParameters]
   * @param {string} [props.contractMemo]
   */
  constructor(props = {}) {
    super();
    /**
     * @private
     * @type {?FileId}
     */

    this._bytecodeFileId = null;
    /**
     * @private
     * @type {?Key}
     */

    this._adminKey = null;
    /**
     * @private
     * @type {?Long}
     */

    this._gas = null;
    /**
     * @private
     * @type {?Hbar}
     */

    this._initialBalance = null;
    /**
     * @private
     * @type {?AccountId}
     */

    this._proxyAccountId = null;
    /**
     * @private
     * @type {Duration}
     */

    this._autoRenewPeriod = new _Duration.default(_Transaction.DEFAULT_AUTO_RENEW_PERIOD);
    /**
     * @private
     * @type {?Uint8Array}
     */

    this._constructorParameters = null;
    /**
     * @private
     * @type {?string}
     */

    this._contractMemo = null;
    this._defaultMaxTransactionFee = new _Hbar.default(20);

    if (props.bytecodeFileId != null) {
      this.setBytecodeFileId(props.bytecodeFileId);
    }

    if (props.adminKey != null) {
      this.setAdminKey(props.adminKey);
    }

    if (props.gas != null) {
      this.setGas(props.gas);
    }

    if (props.initialBalance != null) {
      this.setInitialBalance(props.initialBalance);
    }

    if (props.proxyAccountId != null) {
      this.setProxyAccountId(props.proxyAccountId);
    }

    if (props.autoRenewPeriod != null) {
      this.setAutoRenewPeriod(props.autoRenewPeriod);
    }

    if (props.constructorParameters != null) {
      this.setConstructorParameters(props.constructorParameters);
    }

    if (props.contractMemo != null) {
      this.setContractMemo(props.contractMemo);
    }
  }
  /**
   * @internal
   * @param {proto.ITransaction[]} transactions
   * @param {proto.ISignedTransaction[]} signedTransactions
   * @param {TransactionId[]} transactionIds
   * @param {AccountId[]} nodeIds
   * @param {proto.ITransactionBody[]} bodies
   * @returns {ContractCreateTransaction}
   */


  static _fromProtobuf(transactions, signedTransactions, transactionIds, nodeIds, bodies) {
    const body = bodies[0];
    const create =
    /** @type {proto.IContractCreateTransactionBody} */
    body.contractCreateInstance;
    return _Transaction.default._fromProtobufTransactions(new ContractCreateTransaction({
      bytecodeFileId: create.fileID != null ? _FileId.default._fromProtobuf(
      /** @type {proto.IFileID} */
      create.fileID) : undefined,
      adminKey: create.adminKey != null ? _Key.default._fromProtobufKey(create.adminKey) : undefined,
      gas: create.gas != null ? create.gas : undefined,
      initialBalance: create.initialBalance != null ? create.initialBalance : undefined,
      proxyAccountId: create.proxyAccountID != null ? _AccountId.default._fromProtobuf(
      /** @type {proto.IAccountID} */
      create.proxyAccountID) : undefined,
      autoRenewPeriod: create.autoRenewPeriod != null ? create.autoRenewPeriod.seconds != null ? create.autoRenewPeriod.seconds : undefined : undefined,
      constructorParameters: create.constructorParameters != null ? create.constructorParameters : undefined,
      contractMemo: create.memo != null ? create.memo : undefined
    }), transactions, signedTransactions, transactionIds, nodeIds, bodies);
  }
  /**
   * @returns {?FileId}
   */


  get bytecodeFileId() {
    return this._bytecodeFileId;
  }
  /**
   * @param {FileId | string} bytecodeFileId
   * @returns {this}
   */


  setBytecodeFileId(bytecodeFileId) {
    this._requireNotFrozen();

    this._bytecodeFileId = typeof bytecodeFileId === "string" ? _FileId.default.fromString(bytecodeFileId) : bytecodeFileId.clone();
    return this;
  }
  /**
   * @returns {?Key}
   */


  get adminKey() {
    return this._adminKey;
  }
  /**
   * @param {Key} adminKey
   * @returns {this}
   */


  setAdminKey(adminKey) {
    this._requireNotFrozen();

    this._adminKey = adminKey;
    return this;
  }
  /**
   * @returns {?Long}
   */


  get gas() {
    return this._gas;
  }
  /**
   * @param {number | Long} gas
   * @returns {this}
   */


  setGas(gas) {
    this._requireNotFrozen();

    this._gas = gas instanceof _long.default ? gas : _long.default.fromValue(gas);
    return this;
  }
  /**
   * @returns {?Hbar}
   */


  get initialBalance() {
    return this._initialBalance;
  }
  /**
   * Set the initial amount to transfer into this contract.
   *
   * @param {number | string | Long | BigNumber | Hbar} initialBalance
   * @returns {this}
   */


  setInitialBalance(initialBalance) {
    this._requireNotFrozen();

    this._initialBalance = initialBalance instanceof _Hbar.default ? initialBalance : new _Hbar.default(initialBalance);
    return this;
  }
  /**
   * @returns {?AccountId}
   */


  get proxyAccountId() {
    return this._proxyAccountId;
  }
  /**
   * @param {AccountId | string} proxyAccountId
   * @returns {this}
   */


  setProxyAccountId(proxyAccountId) {
    this._requireNotFrozen();

    this._proxyAccountId = proxyAccountId instanceof _AccountId.default ? proxyAccountId : _AccountId.default.fromString(proxyAccountId);
    return this;
  }
  /**
   * @returns {Duration}
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
   * @returns {?Uint8Array}
   */


  get constructorParameters() {
    return this._constructorParameters;
  }
  /**
   * @param {Uint8Array | ContractFunctionParameters} constructorParameters
   * @returns {this}
   */


  setConstructorParameters(constructorParameters) {
    this._requireNotFrozen();

    this._constructorParameters = constructorParameters instanceof _ContractFunctionParameters.default ? constructorParameters._build() : constructorParameters;
    return this;
  }
  /**
   * @returns {?string}
   */


  get contractMemo() {
    return this._contractMemo;
  }
  /**
   * @param {string} contractMemo
   * @returns {this}
   */


  setContractMemo(contractMemo) {
    this._requireNotFrozen();

    this._contractMemo = contractMemo;
    return this;
  }
  /**
   * @param {Client} client
   */


  _validateChecksums(client) {
    if (this._bytecodeFileId != null) {
      this._bytecodeFileId.validateChecksum(client);
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
    return channel.smartContract.createContract(request);
  }
  /**
   * @override
   * @protected
   * @returns {NonNullable<proto.TransactionBody["data"]>}
   */


  _getTransactionDataCase() {
    return "contractCreateInstance";
  }
  /**
   * @override
   * @protected
   * @returns {proto.IContractCreateTransactionBody}
   */


  _makeTransactionData() {
    return {
      fileID: this._bytecodeFileId != null ? this._bytecodeFileId._toProtobuf() : null,
      adminKey: this._adminKey != null ? this._adminKey._toProtobufKey() : null,
      gas: this._gas,
      initialBalance: this._initialBalance != null ? this._initialBalance.toTinybars() : null,
      proxyAccountID: this._proxyAccountId != null ? this._proxyAccountId._toProtobuf() : null,
      autoRenewPeriod: this._autoRenewPeriod._toProtobuf(),
      constructorParameters: this._constructorParameters,
      memo: this._contractMemo
    };
  }

}

exports.default = ContractCreateTransaction;

_Transaction.TRANSACTION_REGISTRY.set("contractCreateInstance", // eslint-disable-next-line @typescript-eslint/unbound-method
ContractCreateTransaction._fromProtobuf);