"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Hbar = _interopRequireDefault(require("../Hbar.cjs"));

var _Transaction = _interopRequireWildcard(require("../transaction/Transaction.cjs"));

var utf8 = _interopRequireWildcard(require("../encoding/utf8.cjs"));

var _FileId = _interopRequireDefault(require("./FileId.cjs"));

var _TransactionId = _interopRequireDefault(require("../transaction/TransactionId.cjs"));

var _Timestamp = _interopRequireDefault(require("../Timestamp.cjs"));

var _List = _interopRequireDefault(require("../transaction/List.cjs"));

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
 * @typedef {import("@hashgraph/proto").IFileAppendTransactionBody} proto.IFileAppendTransactionBody
 * @typedef {import("@hashgraph/proto").IFileID} proto.IFileID
 */

/**
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../client/Client.js").default<Channel, *>} Client
 * @typedef {import("../account/AccountId.js").default} AccountId
 * @typedef {import("../transaction/TransactionResponse.js").default} TransactionResponse
 * @typedef {import("../schedule/ScheduleCreateTransaction.js").default} ScheduleCreateTransaction
 */

/**
 * A transaction specifically to append data to a file on the network.
 *
 * If a file has multiple keys, all keys must sign to modify its contents.
 */
class FileAppendTransaction extends _Transaction.default {
  /**
   * @param {object} [props]
   * @param {FileId | string} [props.fileId]
   * @param {Uint8Array | string} [props.contents]
   * @param {number} [props.maxChunks]
   * @param {number} [props.chunkSize]
   */
  constructor(props = {}) {
    super();
    /**
     * @private
     * @type {?FileId}
     */

    this._fileId = null;
    /**
     * @private
     * @type {?Uint8Array}
     */

    this._contents = null;
    /**
     * @private
     * @type {number}
     */

    this._maxChunks = 20;
    /**
     * @private
     * @type {number}
     */

    this._chunkSize = 2048;
    this._defaultMaxTransactionFee = new _Hbar.default(5);

    if (props.fileId != null) {
      this.setFileId(props.fileId);
    }

    if (props.contents != null) {
      this.setContents(props.contents);
    }

    if (props.maxChunks != null) {
      this.setMaxChunks(props.maxChunks);
    }

    if (props.chunkSize != null) {
      this.setChunkSize(props.chunkSize);
    }
    /** @type {List<TransactionId>} */


    this._transactionIds = new _List.default();
  }
  /**
   * @internal
   * @param {proto.ITransaction[]} transactions
   * @param {proto.ISignedTransaction[]} signedTransactions
   * @param {TransactionId[]} transactionIds
   * @param {AccountId[]} nodeIds
   * @param {proto.ITransactionBody[]} bodies
   * @returns {FileAppendTransaction}
   */


  static _fromProtobuf(transactions, signedTransactions, transactionIds, nodeIds, bodies) {
    const body = bodies[0];
    const append =
    /** @type {proto.IFileAppendTransactionBody} */
    body.fileAppend;
    let contents;

    for (let i = 0; i < bodies.length; i += nodeIds.length) {
      const fileAppend =
      /** @type {proto.IFileAppendTransactionBody} */
      bodies[i].fileAppend;

      if (fileAppend.contents == null) {
        break;
      }

      if (contents == null) {
        contents = new Uint8Array(
        /** @type {Uint8Array} */
        fileAppend.contents);
        continue;
      }
      /** @type {Uint8Array} */


      const concat = new Uint8Array(contents.length +
      /** @type {Uint8Array} */
      fileAppend.contents.length);
      concat.set(contents, 0);
      concat.set(
      /** @type {Uint8Array} */
      fileAppend.contents, contents.length);
      contents = concat;
    }

    return _Transaction.default._fromProtobufTransactions(new FileAppendTransaction({
      fileId: append.fileID != null ? _FileId.default._fromProtobuf(
      /** @type {proto.IFileID} */
      append.fileID) : undefined,
      contents: contents
    }), transactions, signedTransactions, transactionIds, nodeIds, bodies);
  }
  /**
   * @param {TransactionId} transactionId
   * @returns {this}
   */


  setTransactionId(transactionId) {
    this._requireNotFrozen();

    if (transactionId.accountId == null || transactionId.validStart == null) {
      throw new Error("`FileAppendTransaction` does not support `TransactionId` built from `nonce`");
    }

    this._transactionIds.setList([transactionId]);

    return this;
  }
  /**
   * @returns {?FileId}
   */


  get fileId() {
    return this._fileId;
  }
  /**
   * Set the keys which must sign any transactions modifying this file. Required.
   *
   * All keys must sign to modify the file's contents or keys. No key is required
   * to sign for extending the expiration time (except the one for the operator account
   * paying for the transaction). Only one key must sign to delete the file, however.
   *
   * To require more than one key to sign to delete a file, add them to a
   * KeyList and pass that here.
   *
   * The network currently requires a file to have at least one key (or key list or threshold key)
   * but this requirement may be lifted in the future.
   *
   * @param {FileId | string} fileId
   * @returns {this}
   */


  setFileId(fileId) {
    this._requireNotFrozen();

    this._fileId = typeof fileId === "string" ? _FileId.default.fromString(fileId) : fileId.clone();
    return this;
  }
  /**
   * @returns {?Uint8Array}
   */


  get contents() {
    return this._contents;
  }
  /**
   * Set the given byte array as the file's contents.
   *
   * This may be omitted to append an empty file.
   *
   * Note that total size for a given transaction is limited to 6KiB (as of March 2020) by the
   * network; if you exceed this you may receive a HederaPreCheckStatusException
   * with Status#TransactionOversize.
   *
   * In this case, you will need to break the data into chunks of less than ~6KiB and execute this
   * transaction with the first chunk and then use FileAppendTransaction with
   * FileAppendTransaction#setContents(Uint8Array) for the remaining chunks.
   *
   * @param {Uint8Array | string} contents
   * @returns {this}
   */


  setContents(contents) {
    this._requireNotFrozen();

    this._contents = contents instanceof Uint8Array ? contents : utf8.encode(contents);
    return this;
  }
  /**
   * @returns {?number}
   */


  get maxChunks() {
    return this._maxChunks;
  }
  /**
   * @param {number} maxChunks
   * @returns {this}
   */


  setMaxChunks(maxChunks) {
    this._requireNotFrozen();

    this._maxChunks = maxChunks;
    return this;
  }
  /**
   * @returns {?number}
   */


  get chunkSize() {
    return this._chunkSize;
  }
  /**
   * @param {number} chunkSize
   * @returns {this}
   */


  setChunkSize(chunkSize) {
    this._chunkSize = chunkSize;
    return this;
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
    super.freezeWith(client);

    if (this._contents == null) {
      return this;
    }

    const chunks = Math.floor((this._contents.length + (this._chunkSize - 1)) / this._chunkSize);

    if (chunks > this._maxChunks) {
      throw new Error(`Contents with size ${this._contents.length} too long for ${this._maxChunks} chunks`);
    }

    let nextTransactionId = this.transactionId; // Hack around the locked list. Should refactor a bit to remove such code

    this._transactionIds.locked = false;

    this._transactions.clear();

    this._transactionIds.clear();

    this._signedTransactions.clear();

    for (let chunk = 0; chunk < chunks; chunk++) {
      this._transactionIds.push(nextTransactionId);

      this._transactionIds.advance();

      for (const nodeAccountId of this._nodeAccountIds.list) {
        this._signedTransactions.push(this._makeSignedTransaction(nodeAccountId));
      }

      nextTransactionId = new _TransactionId.default(
      /** @type {AccountId} */
      nextTransactionId.accountId, new _Timestamp.default(
      /** @type {Timestamp} */
      nextTransactionId.validStart.seconds,
      /** @type {Timestamp} */
      nextTransactionId.validStart.nanos.add(1)));
    }

    this._transactionIds.advance();

    this._transactionIds.setLocked();

    return this;
  }
  /**
   * @returns {ScheduleCreateTransaction}
   */


  schedule() {
    this._requireNotFrozen();

    if (this._contents != null && this._contents.length > this._chunkSize) {
      throw new Error(`cannot schedule \`FileAppendTransaction\` with message over ${this._chunkSize} bytes`);
    }

    return super.schedule();
  }
  /**
   * @param {import("../client/Client.js").default<Channel, *>} client
   * @param {number=} requestTimeout
   * @returns {Promise<TransactionResponse>}
   */


  async execute(client, requestTimeout) {
    return (await this.executeAll(client, requestTimeout))[0];
  }
  /**
   * @param {import("../client/Client.js").default<Channel, *>} client
   * @param {number=} requestTimeout
   * @returns {Promise<TransactionResponse[]>}
   */


  async executeAll(client, requestTimeout) {
    if (!super._isFrozen()) {
      this.freezeWith(client);
    } // on execute, sign each transaction with the operator, if present
    // and we are signing a transaction that used the default transaction ID


    const transactionId = this.transactionId;
    const operatorAccountId = client.operatorAccountId;

    if (operatorAccountId != null && operatorAccountId.equals(
    /** @type {AccountId} */
    transactionId.accountId)) {
      await super.signWithOperator(client);
    }

    const responses = [];
    let remainingTimeout = requestTimeout;

    for (let i = 0; i < this._transactionIds.length; i++) {
      const startTimestamp = Date.now();
      const response = await super.execute(client, remainingTimeout);

      if (remainingTimeout != null) {
        remainingTimeout = Date.now() - startTimestamp;
      }

      await response.getReceipt(client);
      responses.push(response);
    }

    return responses;
  }
  /**
   * @param {Client} client
   */


  _validateChecksums(client) {
    if (this._fileId != null) {
      this._fileId.validateChecksum(client);
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
    return channel.file.appendContent(request);
  }
  /**
   * @override
   * @protected
   * @returns {NonNullable<proto.TransactionBody["data"]>}
   */


  _getTransactionDataCase() {
    return "fileAppend";
  }
  /**
   * @override
   * @protected
   * @returns {proto.IFileAppendTransactionBody}
   */


  _makeTransactionData() {
    const length = this._contents != null ? this._contents.length : 0;
    const startIndex = this._transactionIds.index * this._chunkSize;
    const endIndex = Math.min(startIndex + this._chunkSize, length);
    return {
      fileID: this._fileId != null ? this._fileId._toProtobuf() : null,
      contents: this._contents != null ? this._contents.slice(startIndex, endIndex) : null
    };
  }
  /**
   * @returns {string}
   */


  _getLogId() {
    const timestamp =
    /** @type {import("../Timestamp.js").default} */
    this._transactionIds.current.validStart;
    return `FileAppendTransaction:${timestamp.toString()}`;
  }

} // eslint-disable-next-line @typescript-eslint/unbound-method


exports.default = FileAppendTransaction;

_Transaction.TRANSACTION_REGISTRY.set("fileAppend", FileAppendTransaction._fromProtobuf);