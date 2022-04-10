"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TRANSACTION_REGISTRY = exports.SCHEDULE_CREATE_TRANSACTION = exports.DEFAULT_RECORD_THRESHOLD = exports.DEFAULT_AUTO_RENEW_PERIOD = exports.CHUNK_SIZE = void 0;

var _Hbar = _interopRequireDefault(require("../Hbar.cjs"));

var _TransactionResponse = _interopRequireDefault(require("./TransactionResponse.cjs"));

var _TransactionId = _interopRequireDefault(require("./TransactionId.cjs"));

var _TransactionHashMap = _interopRequireDefault(require("./TransactionHashMap.cjs"));

var _SignatureMap = _interopRequireDefault(require("./SignatureMap.cjs"));

var _Executable = _interopRequireWildcard(require("../Executable.cjs"));

var _Status = _interopRequireDefault(require("../Status.cjs"));

var _long = _interopRequireDefault(require("long"));

var sha384 = _interopRequireWildcard(require("../cryptography/sha384.cjs"));

var hex = _interopRequireWildcard(require("../encoding/hex.cjs"));

var _proto = require("@hashgraph/proto");

var _PrecheckStatusError = _interopRequireDefault(require("../PrecheckStatusError.cjs"));

var _AccountId = _interopRequireDefault(require("../account/AccountId.cjs"));

var _PublicKey = _interopRequireDefault(require("../PublicKey.cjs"));

var _List = _interopRequireDefault(require("./List.cjs"));

var _Timestamp = _interopRequireDefault(require("../Timestamp.cjs"));

var _jsLogger = _interopRequireDefault(require("js-logger"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {import("bignumber.js").default} BigNumber
 */

/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").ITransaction} proto.ITransaction
 * @typedef {import("@hashgraph/proto").ISignatureMap} proto.ISignatureMap
 * @typedef {import("@hashgraph/proto").ISignaturePair} proto.ISignaturePair
 * @typedef {import("@hashgraph/proto").ISignedTransaction} proto.ISignedTransaction
 * @typedef {import("@hashgraph/proto").ITransactionList} proto.ITransactionList
 * @typedef {import("@hashgraph/proto").ITransactionID} proto.ITransactionID
 * @typedef {import("@hashgraph/proto").IAccountID} proto.IAccountID
 * @typedef {import("@hashgraph/proto").ITransactionBody} proto.ITransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionResponse} proto.ITransactionResponse
 * @typedef {import("@hashgraph/proto").ResponseCodeEnum} proto.ResponseCodeEnum
 * @typedef {import("@hashgraph/proto").TransactionBody} proto.TransactionBody
 * @typedef {import("@hashgraph/proto").ISchedulableTransactionBody} proto.ISchedulableTransactionBody
 */

/**
 * @typedef {import("../schedule/ScheduleCreateTransaction.js").default} ScheduleCreateTransaction
 * @typedef {import("../PrivateKey.js").default} PrivateKey
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../client/Client.js").default<*, *>} Client
 * @typedef {import("../Signer.js").default} Signer
 */
// 90 days (in seconds)
const DEFAULT_AUTO_RENEW_PERIOD = _long.default.fromValue(7776000); // maximum value of i64 (so there is never a record generated)


exports.DEFAULT_AUTO_RENEW_PERIOD = DEFAULT_AUTO_RENEW_PERIOD;

const DEFAULT_RECORD_THRESHOLD = _Hbar.default.fromTinybars(_long.default.fromString("9223372036854775807")); // 120 seconds


exports.DEFAULT_RECORD_THRESHOLD = DEFAULT_RECORD_THRESHOLD;
const DEFAULT_TRANSACTION_VALID_DURATION = 120;
const CHUNK_SIZE = 1024;
/**
 * @type {Map<NonNullable<proto.TransactionBody["data"]>, (transactions: proto.ITransaction[], signedTransactions: proto.ISignedTransaction[], transactionIds: TransactionId[], nodeIds: AccountId[], bodies: proto.TransactionBody[]) => Transaction>}
 */

exports.CHUNK_SIZE = CHUNK_SIZE;
const TRANSACTION_REGISTRY = new Map();
/**
 * Base class for all transactions that may be submitted to Hedera.
 *
 * @abstract
 * @augments {Executable<proto.ITransaction, proto.ITransactionResponse, TransactionResponse>}
 */

exports.TRANSACTION_REGISTRY = TRANSACTION_REGISTRY;

class Transaction extends _Executable.default {
  // A SDK transaction is composed of multiple, raw protobuf transactions.
  // These should be functionally identicasl, with the exception of pointing to
  // different nodes.
  // When retrying a transaction after a network error or retry-able
  // status response, we try a different transaction and thus a different node.
  constructor() {
    super();
    /**
     * List of proto transactions that have been built from this SDK
     * transaction. Each one should share the same transaction ID.
     *
     * @internal
     * @type {List<proto.ITransaction | null>}
     */

    this._transactions = new _List.default();
    /**
     * List of proto transactions that have been built from this SDK
     * transaction. Each one should share the same transaction ID.
     *
     * @internal
     * @type {List<proto.ISignedTransaction>}
     */

    this._signedTransactions = new _List.default();
    /**
     * Set of public keys (as string) who have signed this transaction so
     * we do not allow them to sign it again.
     *
     * @internal
     * @type {Set<string>}
     */

    this._signerPublicKeys = new Set();
    /**
     * @private
     * @type {number}
     */

    this._transactionValidDuration = DEFAULT_TRANSACTION_VALID_DURATION;
    /**
     * @protected
     * @type {Hbar}
     */

    this._defaultMaxTransactionFee = new _Hbar.default(2);
    /**
     * @private
     * @type {Hbar | null}
     */

    this._maxTransactionFee = null;
    /**
     * @private
     * @type {string}
     */

    this._transactionMemo = "";
    /**
     * @protected
     * @type {List<TransactionId>}
     */

    this._transactionIds = new _List.default();
    /**
     * @private
     * @type {AccountId | null}
     */

    this._operatorAccountId = null;
    /**
     * @private
     * @type {PublicKey[]}
     */

    this._publicKeys = [];
    /**
     * @private
     * @type {(((message: Uint8Array) => Promise<Uint8Array>) | null)[]}
     */

    this._transactionSigners = [];
    /**
     * @private
     * @type {?boolean}
     */

    this._regenerateTransactionId = null;
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {Transaction}
   */


  static fromBytes(bytes) {
    const signedTransactions = [];
    const transactionIds = [];
    const nodeIds = [];
    /** @type {string[]} */

    const transactionIdStrings = [];
    /** @type {string[]} */

    const nodeIdStrings = [];
    const bodies = [];

    const list = _proto.TransactionList.decode(bytes).transactionList;

    if (list.length === 0) {
      const transaction = _proto.Transaction.decode(bytes);

      if (transaction.signedTransactionBytes.length !== 0) {
        list.push(transaction);
      } else {
        list.push({
          signedTransactionBytes: _proto.SignedTransaction.encode({
            bodyBytes: transaction.bodyBytes,
            sigMap: transaction.sigMap
          }).finish()
        });
      }
    }

    for (const transaction of list) {
      if (transaction.signedTransactionBytes == null) {
        throw new Error("Transaction.signedTransactionBytes are null");
      }

      const signedTransaction = _proto.SignedTransaction.decode(transaction.signedTransactionBytes);

      signedTransactions.push(signedTransaction);

      const body = _proto.TransactionBody.decode(signedTransaction.bodyBytes);

      if (body.data == null) {
        throw new Error("(BUG) body.data was not set in the protobuf");
      }

      bodies.push(body);

      if (body.transactionID != null) {
        const transactionId = _TransactionId.default._fromProtobuf(
        /** @type {proto.ITransactionID} */
        body.transactionID);

        if (!transactionIdStrings.includes(transactionId.toString())) {
          transactionIds.push(transactionId);
          transactionIdStrings.push(transactionId.toString());
        }
      }

      if (body.nodeAccountID != null) {
        const nodeAccountId = _AccountId.default._fromProtobuf(
        /** @type {proto.IAccountID} */
        body.nodeAccountID);

        if (!nodeIdStrings.includes(nodeAccountId.toString())) {
          nodeIds.push(nodeAccountId);
          nodeIdStrings.push(nodeAccountId.toString());
        }
      }
    }

    const body = bodies[0];

    if (body == null || body.data == null) {
      throw new Error("No transaction found in bytes or failed to decode TransactionBody");
    }

    const fromProtobuf = TRANSACTION_REGISTRY.get(body.data);

    if (fromProtobuf == null) {
      throw new Error(`(BUG) Transaction.fromBytes() not implemented for type ${body.data}`);
    }

    return fromProtobuf(list, signedTransactions, transactionIds, nodeIds, bodies);
  }
  /**
   * @returns {ScheduleCreateTransaction}
   */


  schedule() {
    this._requireNotFrozen();

    if (SCHEDULE_CREATE_TRANSACTION.length != 1) {
      throw new Error("ScheduleCreateTransaction has not been loaded yet");
    }

    return SCHEDULE_CREATE_TRANSACTION[0]()._setScheduledTransaction(this);
  }
  /**
   * @template {Transaction} TransactionT
   * @param {TransactionT} transaction
   * @param {proto.ITransaction[]} transactions
   * @param {proto.ISignedTransaction[]} signedTransactions
   * @param {TransactionId[]} transactionIds
   * @param {AccountId[]} nodeIds
   * @param {proto.ITransactionBody[]} bodies
   * @returns {TransactionT}
   */


  static _fromProtobufTransactions(transaction, transactions, signedTransactions, transactionIds, nodeIds, bodies) {
    const body = bodies[0];
    const zero = new _AccountId.default(0);

    for (let i = 0; i < nodeIds.length; i++) {
      if (nodeIds[i].equals(zero)) {
        nodeIds.splice(i--, 1);
      }
    }

    transaction._transactions.setList(transactions);

    transaction._signedTransactions.setList(signedTransactions).setLocked();

    transaction._transactionIds.setList(transactionIds).setLocked();

    transaction._nodeAccountIds.setList(nodeIds).setLocked();

    transaction._nextNodeAccountIdIndex = 0;
    transaction._transactionValidDuration = body.transactionValidDuration != null && body.transactionValidDuration.seconds != null ? _long.default.fromValue(body.transactionValidDuration.seconds).toInt() : DEFAULT_TRANSACTION_VALID_DURATION;
    transaction._maxTransactionFee = body.transactionFee != null ? _Hbar.default.fromTinybars(body.transactionFee) : new _Hbar.default(0);
    transaction._transactionMemo = body.memo != null ? body.memo : "";

    for (let i = 0; i < nodeIds.length; i++) {
      const signedTransaction = signedTransactions[i];

      if (signedTransaction.sigMap != null && signedTransaction.sigMap.sigPair != null) {
        for (const sigPair of signedTransaction.sigMap.sigPair) {
          transaction._signerPublicKeys.add(hex.encode(
          /** @type {Uint8Array} */
          sigPair.pubKeyPrefix));

          transaction._publicKeys.push(_PublicKey.default.fromBytes(
          /** @type {Uint8Array} */
          sigPair.pubKeyPrefix));

          transaction._transactionSigners.push(null);
        }
      }
    }

    return transaction;
  }
  /**
   * @override
   * @param {AccountId[]} nodeIds
   * @returns {this}
   */


  setNodeAccountIds(nodeIds) {
    this._requireNotFrozen();

    super.setNodeAccountIds(nodeIds);
    return this;
  }
  /**
   * @returns {number}
   */


  get transactionValidDuration() {
    return this._transactionValidDuration;
  }
  /**
   * Sets the duration (in seconds) that this transaction is valid for.
   *
   * This is defaulted to 120 seconds (from the time its executed).
   *
   * @param {number} validDuration
   * @returns {this}
   */


  setTransactionValidDuration(validDuration) {
    this._requireNotFrozen();

    this._transactionValidDuration = validDuration;
    return this;
  }
  /**
   * @returns {?Hbar}
   */


  get maxTransactionFee() {
    return this._maxTransactionFee;
  }
  /**
   * Set the maximum transaction fee the operator (paying account)
   * is willing to pay.
   *
   * @param {number | string | Long | BigNumber | Hbar} maxTransactionFee
   * @returns {this}
   */


  setMaxTransactionFee(maxTransactionFee) {
    this._requireNotFrozen();

    this._maxTransactionFee = maxTransactionFee instanceof _Hbar.default ? maxTransactionFee : new _Hbar.default(maxTransactionFee);
    return this;
  }
  /**
   * @returns {?boolean}
   */


  get regenerateTransactionId() {
    return this._regenerateTransactionId;
  }
  /**
   * Set the maximum transaction fee the operator (paying account)
   * is willing to pay.
   *
   * @param {boolean} regenerateTransactionId
   * @returns {this}
   */


  setRegenerateTransactionId(regenerateTransactionId) {
    this._requireNotFrozen();

    this._regenerateTransactionId = regenerateTransactionId;
    return this;
  }
  /**
   * @returns {string}
   */


  get transactionMemo() {
    return this._transactionMemo;
  }
  /**
   * Set a note or description to be recorded in the transaction
   * record (maximum length of 100 bytes).
   *
   * @param {string} transactionMemo
   * @returns {this}
   */


  setTransactionMemo(transactionMemo) {
    this._requireNotFrozen();

    this._transactionMemo = transactionMemo;
    return this;
  }
  /**
   * @returns {TransactionId}
   */


  get transactionId() {
    this._transactionIds.setLocked();

    if (this._transactionIds.isEmpty) {
      throw new Error("transaction must have been frozen before getting the transaction ID, try calling `freeze`");
    }

    return this._transactionIds.current;
  }
  /**
   * Set the ID for this transaction.
   *
   * The transaction ID includes the operator's account ( the account paying the transaction
   * fee). If two transactions have the same transaction ID, they won't both have an effect. One
   * will complete normally and the other will fail with a duplicate transaction status.
   *
   * Normally, you should not use this method. Just before a transaction is executed, a
   * transaction ID will be generated from the operator on the client.
   *
   * @param {TransactionId} transactionId
   * @returns {this}
   */


  setTransactionId(transactionId) {
    this._requireNotFrozen();

    this._transactionIds.setList([transactionId]).setLocked();

    return this;
  }
  /**
   * @param {PrivateKey} privateKey
   * @returns {Promise<this>}
   */


  sign(privateKey) {
    return this.signWith(privateKey.publicKey, message => Promise.resolve(privateKey.sign(message)));
  }
  /**
   * @param {PublicKey} publicKey
   * @param {(message: Uint8Array) => Promise<Uint8Array>} transactionSigner
   * @returns {Promise<this>}
   */


  async signWith(publicKey, transactionSigner) {
    if (!this._signOnDemand) {
      this._requireFrozen();
    }

    const publicKeyData = publicKey.toBytesRaw(); // note: this omits the DER prefix on purpose because Hedera doesn't
    // support that in the protobuf. this means that we would fail
    // to re-inflate [this._signerPublicKeys] during [fromBytes] if we used DER
    // prefixes here

    const publicKeyHex = hex.encode(publicKeyData);

    if (this._signerPublicKeys.has(publicKeyHex)) {
      // this public key has already signed this transaction
      return this;
    }

    this._transactions.clear();

    this._signerPublicKeys.add(publicKeyHex);

    if (this._signOnDemand) {
      this._publicKeys.push(publicKey);

      this._transactionSigners.push(transactionSigner);

      return this;
    }

    for (const signedTransaction of this._signedTransactions.list) {
      const bodyBytes =
      /** @type {Uint8Array} */
      signedTransaction.bodyBytes;
      const signature = await transactionSigner(bodyBytes);

      if (signedTransaction.sigMap == null) {
        signedTransaction.sigMap = {};
      }

      if (signedTransaction.sigMap.sigPair == null) {
        signedTransaction.sigMap.sigPair = [];
      }

      signedTransaction.sigMap.sigPair.push(publicKey._toProtobufSignature(signature));
    }

    return this;
  }
  /**
   * @param {import("../client/Client.js").default<Channel, *>} client
   * @returns {Promise<this>}
   */


  signWithOperator(client) {
    const operator = client._operator;

    if (operator == null) {
      throw new Error("`client` must have an operator to sign with the operator");
    }

    if (!this._isFrozen()) {
      this.freezeWith(client);
    }

    return this.signWith(operator.publicKey, operator.transactionSigner);
  }
  /**
   * @param {PublicKey} publicKey
   * @param {Uint8Array} signature
   * @returns {this}
   */


  addSignature(publicKey, signature) {
    this._requireOneNodeAccountId();

    if (!this.isFrozen()) {
      this.freeze();
    }

    const publicKeyData = publicKey.toBytesRaw();
    const publicKeyHex = hex.encode(publicKeyData);

    if (this._signerPublicKeys.has(publicKeyHex)) {
      // this public key has already signed this transaction
      return this;
    }

    this._transactions.clear(); // Locking the transaction IDs and node account IDs is necessary for consistency
    // between before and after execution


    this._transactionIds.setLocked();

    this._nodeAccountIds.setLocked();

    this._signedTransactions.setLocked();

    for (const transaction of this._signedTransactions.list) {
      if (transaction.sigMap == null) {
        transaction.sigMap = {};
      }

      if (transaction.sigMap.sigPair == null) {
        transaction.sigMap.sigPair = [];
      }

      transaction.sigMap.sigPair.push(publicKey._toProtobufSignature(signature));
    }

    this._signerPublicKeys.add(publicKeyHex);

    this._publicKeys.push(publicKey);

    this._transactionSigners.push(null);

    return this;
  }
  /**
   * @returns {SignatureMap}
   */


  getSignatures() {
    this._requireFrozen();

    this._requireNotSignOnDemand();

    this._buildAllTransactions();

    this._transactionIds.setLocked();

    this._nodeAccountIds.setLocked();

    return _SignatureMap.default._fromTransaction(this);
  }
  /**
   * @returns {Promise<SignatureMap>}
   */


  async getSignaturesAsync() {
    // Locking the transaction IDs and node account IDs is necessary for consistency
    // between before and after execution
    if (!this._transactionIds.isEmpty) {
      this._transactionIds.setLocked();
    }

    if (!this._nodeAccountIds.isEmpty) {
      this._nodeAccountIds.setLocked();
    }

    await this._buildAllTransactionsAsync();

    this._transactions.setLocked();

    this._signedTransactions.setLocked();

    return _SignatureMap.default._fromTransaction(this);
  }

  _setTransactionId() {
    if (this._operator == null && this._transactionIds.isEmpty) {
      throw new Error("`transactionId` must be set or `client` must be provided with `freezeWith`");
    }
  }
  /**
   * @param {?import("../client/Client.js").default<Channel, *>} client
   */


  _setNodeAccountIds(client) {
    if (!this._nodeAccountIds.isEmpty) {
      return;
    }

    if (client == null) {
      throw new Error("`nodeAccountId` must be set or `client` must be provided with `freezeWith`");
    }

    this._nodeAccountIds.setList(client._network.getNodeAccountIdsForExecute());
  }

  _buildSignedTransactions() {
    if (this._signedTransactions.locked) {
      return;
    }

    this._signedTransactions.setList(this._nodeAccountIds.list.map(nodeId => this._makeSignedTransaction(nodeId)));
  }
  /**
   * Freeze this transaction from future modification to prepare for
   * signing or serialization.
   *
   * @returns {this}
   */


  freeze() {
    return this.freezeWith(null);
  }
  /**
   * Freeze this transaction from further modification to prepare for
   * signing or serialization.
   *
   * Will use the `Client`, if available, to generate a default Transaction ID and select 1/3
   * nodes to prepare this transaction for.
   *
   * @param {?import("../client/Client.js").default<Channel, *>} client
   * @returns {this}
   */


  freezeWith(client) {
    this._signOnDemand = client != null ? client._signOnDemand : false;
    this._operator = client != null ? client._operator : null;
    this._maxTransactionFee = this._maxTransactionFee == null ? client != null && client.defaultMaxTransactionFee != null ? client.defaultMaxTransactionFee : this._defaultMaxTransactionFee : this._maxTransactionFee;
    this._regenerateTransactionId = client != null && this._regenerateTransactionId == null ? client.defaultRegenerateTransactionId : this._regenerateTransactionId;

    this._setNodeAccountIds(client);

    this._setTransactionId();

    if (client != null) {
      for (const transactionId of this._transactionIds.list) {
        if (transactionId.accountId != null) {
          transactionId.accountId.validateChecksum(client);
        }
      }
    }

    this._buildNewTransactionIdList();

    if (!this._signOnDemand) {
      this._buildSignedTransactions();
    }

    return this;
  }
  /**
   * @param {Signer} signer
   * @returns {Promise<this>}
   */


  async signWithSigner(signer) {
    await signer.signTransaction(this);
    return this;
  }
  /**
   * @param {Signer} signer
   * @returns {Promise<this>}
   */


  async freezeWithSigner(signer) {
    await signer.populateTransaction(this);
    await this.signWithSigner(signer);
    return this;
  }
  /**
   * Will error if sign-on-demand is enabled
   *
   * @returns {Uint8Array}
   */


  toBytes() {
    this._requireFrozen();

    this._requireNotSignOnDemand(); // Locking the transaction IDs and node account IDs is necessary for consistency
    // between before and after execution


    this._transactionIds.setLocked();

    this._nodeAccountIds.setLocked();

    this._buildAllTransactions();

    return _proto.TransactionList.encode({
      transactionList:
      /** @type {proto.ITransaction[]} */
      this._transactions.list
    }).finish();
  }
  /**
   * @returns {Promise<Uint8Array>}
   */


  async toBytesAsync() {
    this._requireFrozen(); // Locking the transaction IDs and node account IDs is necessary for consistency
    // between before and after execution


    this._transactionIds.setLocked();

    this._nodeAccountIds.setLocked();

    await this._buildAllTransactionsAsync();

    this._transactions.setLocked();

    this._signedTransactions.setLocked();

    return _proto.TransactionList.encode({
      transactionList:
      /** @type {proto.ITransaction[]} */
      this._transactions.list
    }).finish();
  }
  /**
   * @returns {Promise<Uint8Array>}
   */


  async getTransactionHash() {
    this._requireFrozen(); // Locking the transaction IDs and node account IDs is necessary for consistency
    // between before and after execution


    if (!this._transactionIds.isEmpty) {
      this._transactionIds.setLocked();
    }

    if (!this._nodeAccountIds.isEmpty) {
      this._nodeAccountIds.setLocked();
    }

    await this._buildAllTransactionsAsync();

    this._transactions.setLocked();

    this._signedTransactions.setLocked();

    return sha384.digest(
    /** @type {Uint8Array} */

    /** @type {proto.ITransaction} */
    this._transactions.get(0).signedTransactionBytes);
  }
  /**
   * @returns {Promise<TransactionHashMap>}
   */


  async getTransactionHashPerNode() {
    this._requireFrozen(); // Locking the transaction IDs and node account IDs is necessary for consistency
    // between before and after execution


    if (!this._transactionIds.isEmpty) {
      this._transactionIds.setLocked();
    }

    if (!this._nodeAccountIds.isEmpty) {
      this._nodeAccountIds.setLocked();
    }

    await this._buildAllTransactionsAsync();
    return await _TransactionHashMap.default._fromTransaction(this);
  }

  isFrozen() {
    return this._signedTransactions.length > 0;
  }
  /**
   * @returns {TransactionId}
   */


  _getTransactionId() {
    return this.transactionId;
  }
  /**
   * @param {Client} client
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function


  _validateChecksums(client) {// Do nothing
  }
  /**
   * @override
   * @protected
   * @param {import("../client/Client.js").default<Channel, *>} client
   * @returns {Promise<void>}
   */


  async _beforeExecute(client) {
    if (!this._isFrozen()) {
      this.freezeWith(client);
    }

    if (client.isAutoValidateChecksumsEnabled()) {
      this._validateChecksums(client);
    }

    this._operator = client != null ? client._operator : null;

    if (this._operator != null) {
      await this.signWith(this._operator.publicKey, this._operator.transactionSigner);
    }
  }
  /**
   * @override
   * @internal
   * @returns {Promise<proto.ITransaction>}
   */


  async _makeRequestAsync() {
    const index = this._transactionIds.index * this._nodeAccountIds.length + this._nodeAccountIds.index;

    if (!this._signOnDemand) {
      this._buildTransaction(index);

      return (
        /** @type {proto.ITransaction} */
        this._transactions.get(index)
      );
    } // Nothing is locked we can build a new transaction


    return await this._buildTransactionAsync();
  }
  /**
   * @internal
   * @returns {Promise<proto.ISignedTransaction>}
   */


  async _signTransaction() {
    const signedTransaction = this._makeSignedTransaction(this._nodeAccountIds.next);

    const bodyBytes =
    /** @type {Uint8Array} */
    signedTransaction.bodyBytes;

    for (let j = 0; j < this._publicKeys.length; j++) {
      const publicKey = this._publicKeys[j];
      const transactionSigner = this._transactionSigners[j];

      if (transactionSigner == null) {
        continue;
      }

      const signature = await transactionSigner(bodyBytes);

      if (signedTransaction.sigMap == null) {
        signedTransaction.sigMap = {};
      }

      if (signedTransaction.sigMap.sigPair == null) {
        signedTransaction.sigMap.sigPair = [];
      }

      signedTransaction.sigMap.sigPair.push(publicKey._toProtobufSignature(signature));
    }

    return signedTransaction;
  }

  _buildNewTransactionIdList() {
    if (this._transactionIds.locked || this._operator == null) {
      return;
    }

    const transactionId = _TransactionId.default.withValidStart(this._operator.accountId, _Timestamp.default.generate());

    this._transactionIds.set(this._transactionIds.index, transactionId);
  }

  _buildAllTransactions() {
    for (let i = 0; i < this._signedTransactions.length; i++) {
      this._buildTransaction(i);
    }
  }

  async _buildAllTransactionsAsync() {
    if (!this._signOnDemand) {
      this._buildAllTransactions();

      return;
    }

    this._buildSignedTransactions();

    if (this._transactions.locked) {
      return;
    }

    for (let i = 0; i < this._signedTransactions.length; i++) {
      this._transactions.push(await this._buildTransactionAsync());
    }
  }
  /**
   * @internal
   * @param {number} index
   */


  _buildTransaction(index) {
    if (this._transactions.length < index) {
      for (let i = this._transactions.length; i < index; i++) {
        this._transactions.push(null);
      }
    }

    this._transactions.setIfAbsent(index, () => {
      return {
        signedTransactionBytes: _proto.SignedTransaction.encode(this._signedTransactions.get(index)).finish()
      };
    });
  }
  /**
   * @internal
   * @returns {Promise<proto.ITransaction>}
   */


  async _buildTransactionAsync() {
    return {
      signedTransactionBytes: _proto.SignedTransaction.encode(await this._signTransaction()).finish()
    };
  }
  /**
   * @override
   * @internal
   * @param {proto.ITransaction} request
   * @param {proto.ITransactionResponse} response
   * @returns {ExecutionState}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _shouldRetry(request, response) {
    const {
      nodeTransactionPrecheckCode
    } = response;

    const status = _Status.default._fromCode(nodeTransactionPrecheckCode != null ? nodeTransactionPrecheckCode : _proto.ResponseCodeEnum.OK);

    _jsLogger.default.debug(`[${this._getLogId()}] received status ${status.toString()}`);

    switch (status) {
      case _Status.default.Busy:
      case _Status.default.Unknown:
      case _Status.default.PlatformTransactionNotCreated:
        return _Executable.ExecutionState.Retry;

      case _Status.default.Ok:
        return _Executable.ExecutionState.Finished;

      case _Status.default.TransactionExpired:
        if (this._regenerateTransactionId == null || this._regenerateTransactionId) {
          this._buildNewTransactionIdList();

          return _Executable.ExecutionState.Retry;
        } else {
          return _Executable.ExecutionState.Error;
        }

      default:
        return _Executable.ExecutionState.Error;
    }
  }
  /**
   * @override
   * @internal
   * @param {proto.ITransaction} request
   * @param {proto.ITransactionResponse} response
   * @returns {Error}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _mapStatusError(request, response) {
    const {
      nodeTransactionPrecheckCode
    } = response;

    const status = _Status.default._fromCode(nodeTransactionPrecheckCode != null ? nodeTransactionPrecheckCode : _proto.ResponseCodeEnum.OK);

    return new _PrecheckStatusError.default({
      status,
      transactionId: this._getTransactionId()
    });
  }
  /**
   * @override
   * @protected
   * @param {proto.ITransactionResponse} response
   * @param {AccountId} nodeId
   * @param {proto.ITransaction} request
   * @returns {Promise<TransactionResponse>}
   */


  async _mapResponse(response, nodeId, request) {
    const transactionHash = await sha384.digest(
    /** @type {Uint8Array} */
    request.signedTransactionBytes);
    const transactionId = this.transactionId;

    this._transactionIds.advance();

    return new _TransactionResponse.default({
      nodeId,
      transactionHash,
      transactionId
    });
  }
  /**
   * @override
   * @returns {AccountId}
   */


  _getNodeAccountId() {
    if (this._nodeAccountIds.isEmpty) {
      throw new Error("(BUG) Transaction::_getNodeAccountId called before transaction has been frozen");
    }

    return this._nodeAccountIds.current;
  }
  /**
   * @internal
   * @param {?AccountId} nodeId
   * @returns {proto.ISignedTransaction}
   */


  _makeSignedTransaction(nodeId) {
    const body = this._makeTransactionBody(nodeId);

    const bodyBytes = _proto.TransactionBody.encode(body).finish();

    return {
      bodyBytes,
      sigMap: {
        sigPair: []
      }
    };
  }
  /**
   * @private
   * @param {?AccountId} nodeId
   * @returns {proto.ITransactionBody}
   */


  _makeTransactionBody(nodeId) {
    return {
      [this._getTransactionDataCase()]: this._makeTransactionData(),
      transactionFee: this._maxTransactionFee != null ? this._maxTransactionFee.toTinybars() : null,
      memo: this._transactionMemo,
      transactionID: this._transactionIds.current._toProtobuf(),
      nodeAccountID: nodeId != null ? nodeId._toProtobuf() : null,
      transactionValidDuration: {
        seconds: _long.default.fromNumber(this._transactionValidDuration)
      }
    };
  }
  /**
   * @abstract
   * @protected
   * @returns {NonNullable<proto.TransactionBody["data"]>}
   */


  _getTransactionDataCase() {
    throw new Error("not implemented");
  }
  /**
   * @internal
   * @returns {proto.ISchedulableTransactionBody}
   */


  _getScheduledTransactionBody() {
    return {
      memo: this.transactionMemo,
      transactionFee: this._maxTransactionFee == null ? this._defaultMaxTransactionFee.toTinybars() : this._maxTransactionFee.toTinybars(),
      [this._getTransactionDataCase()]: this._makeTransactionData()
    };
  }
  /**
   * @abstract
   * @protected
   * @returns {object}
   */


  _makeTransactionData() {
    throw new Error("not implemented");
  }
  /**
   * @protected
   * @returns {boolean}
   */


  _isFrozen() {
    return this._signOnDemand || this._signedTransactions.length > 0 || this._transactions.length > 0;
  }
  /**
   * @internal
   */


  _requireNotFrozen() {
    if (this._isFrozen()) {
      throw new Error("transaction is immutable; it has at least one signature or has been explicitly frozen");
    }
  }
  /**
   * @internal
   */


  _requireNotSignOnDemand() {
    if (this._signOnDemand) {
      throw new Error("Please use `toBytesAsync()` if `signOnDemand` is enabled");
    }
  }
  /**
   * @internal
   */


  _requireFrozen() {
    if (!this._isFrozen()) {
      throw new Error("transaction must have been frozen before calculating the hash will be stable, try calling `freeze`");
    }
  }
  /**
   * @internal
   * @protected
   */


  _requireOneNodeAccountId() {
    if (this._nodeAccountIds.length != 1) {
      throw "transaction did not have exactly one node ID set";
    }
  }

}
/**
 * @type {(() => ScheduleCreateTransaction)[]}
 */


exports.default = Transaction;
const SCHEDULE_CREATE_TRANSACTION = [];
exports.SCHEDULE_CREATE_TRANSACTION = SCHEDULE_CREATE_TRANSACTION;