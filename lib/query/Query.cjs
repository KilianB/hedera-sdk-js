"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QUERY_REGISTRY = exports.COST_QUERY = void 0;
exports._makePaymentTransaction = _makePaymentTransaction;
exports.default = void 0;

var _Status = _interopRequireDefault(require("../Status.cjs"));

var _AccountId = _interopRequireDefault(require("../account/AccountId.cjs"));

var _Hbar = _interopRequireDefault(require("../Hbar.cjs"));

var _Executable = _interopRequireWildcard(require("../Executable.cjs"));

var _TransactionId = _interopRequireDefault(require("../transaction/TransactionId.cjs"));

var _proto = require("@hashgraph/proto");

var _PrecheckStatusError = _interopRequireDefault(require("../PrecheckStatusError.cjs"));

var _MaxQueryPaymentExceeded = _interopRequireDefault(require("../MaxQueryPaymentExceeded.cjs"));

var _long = _interopRequireDefault(require("long"));

var _jsLogger = _interopRequireDefault(require("js-logger"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../PublicKey.js").default} PublicKey
 */

/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").IQuery} proto.IQuery
 * @typedef {import("@hashgraph/proto").IQueryHeader} proto.IQueryHeader
 * @typedef {import("@hashgraph/proto").ITransaction} proto.ITransaction
 * @typedef {import("@hashgraph/proto").ISignedTransaction} proto.ISignedTransaction
 * @typedef {import("@hashgraph/proto").IResponse} proto.IResponse
 * @typedef {import("@hashgraph/proto").IResponseHeader} proto.IResponseHeader
 * @typedef {import("@hashgraph/proto").ITransactionBody} proto.ITransactionBody
 * @typedef {import("@hashgraph/proto").ResponseCodeEnum} proto.ResponseCodeEnum
 */

/**
 * @typedef {import("../client/Client.js").ClientOperator} ClientOperator
 * @typedef {import("../client/Client.js").default<*, *>} Client
 */

/**
 * @type {Map<ProtoQuery["query"], (query: proto.IQuery) => Query<*>>}
 */
const QUERY_REGISTRY = new Map();
/**
 * Base class for all queries that can be submitted to Hedera.
 *
 * @abstract
 * @template OutputT
 * @augments {Executable<proto.IQuery, proto.IResponse, OutputT>}
 */

exports.QUERY_REGISTRY = QUERY_REGISTRY;

class Query extends _Executable.default {
  constructor() {
    super();
    /** @type {?TransactionId} */

    this._paymentTransactionId = null;
    /** @type {proto.ITransaction[]} */

    this._paymentTransactions = [];
    /** @type {?Hbar} */

    this._queryPayment = null;
    /** @type {?Hbar} */

    this._maxQueryPayment = null;
    this._timestamp = Date.now();
  }
  /**
   * @template T
   * @param {Uint8Array} bytes
   * @returns {Query<T>}
   */


  static fromBytes(bytes) {
    const query = _proto.Query.decode(bytes);

    if (query.query == null) {
      throw new Error("(BUG) query.query was not set in the protobuf");
    }

    const fromProtobuf =
    /** @type {(query: proto.IQuery) => Query<T>} */
    QUERY_REGISTRY.get(query.query);

    if (fromProtobuf == null) {
      throw new Error(`(BUG) Query.fromBytes() not implemented for type ${query.query}`);
    }

    return fromProtobuf(query);
  }
  /**
   * @returns {Uint8Array}
   */


  toBytes() {
    return _proto.Query.encode(this._makeRequest()).finish();
  }
  /**
   * Set an explicit payment amount for this query.
   *
   * The client will submit exactly this amount for the payment of this query. Hedera
   * will not return any remainder.
   *
   * @param {Hbar} queryPayment
   * @returns {this}
   */


  setQueryPayment(queryPayment) {
    this._queryPayment = queryPayment;
    return this;
  }
  /**
   * Set the maximum payment allowable for this query.
   *
   * @param {Hbar} maxQueryPayment
   * @returns {this}
   */


  setMaxQueryPayment(maxQueryPayment) {
    this._maxQueryPayment = maxQueryPayment;
    return this;
  }
  /**
   * @param {import("../client/Client.js").default<Channel, *>} client
   * @returns {Promise<Hbar>}
   */


  getCost(client) {
    if (this._nodeAccountIds.isEmpty) {
      this._nodeAccountIds.setList(client._network.getNodeAccountIdsForExecute());
    }

    if (COST_QUERY.length != 1) {
      throw new Error("CostQuery has not been loaded yet");
    }

    this._timestamp = Date.now();
    return COST_QUERY[0](this).execute(client);
  }
  /**
   * @param {TransactionId} paymentTransactionId
   * @returns {this}
   */


  setPaymentTransactionId(paymentTransactionId) {
    this._paymentTransactionId = paymentTransactionId;
    return this;
  }
  /**
   * @returns {?TransactionId}
   */


  get paymentTransactionId() {
    return this._paymentTransactionId;
  }
  /**
   * @returns {TransactionId}
   */


  _getTransactionId() {
    if (this._paymentTransactionId == null) {
      throw new Error("Query.PaymentTransactionId was not set duration execution");
    }

    return this._paymentTransactionId;
  }
  /**
   * @protected
   * @returns {boolean}
   */


  _isPaymentRequired() {
    return true;
  }
  /**
   * @param {Client} client
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function


  _validateChecksums(client) {// Do nothing
  }
  /**
   * @template MirrorChannelT
   * @param {import("../client/Client.js").default<Channel, MirrorChannelT>} client
   * @returns {Promise<void>}
   */


  async _beforeExecute(client) {
    if (this._paymentTransactions.length > 0) {
      return;
    }

    if (client.isAutoValidateChecksumsEnabled()) {
      this._validateChecksums(client);
    }

    if (this._nodeAccountIds.isEmpty) {
      this._nodeAccountIds.setList(client._network.getNodeAccountIdsForExecute());
    }

    const operator = this._operator != null ? this._operator : client._operator;

    if (this._paymentTransactionId == null) {
      if (this._isPaymentRequired()) {
        if (operator != null) {
          this._paymentTransactionId = _TransactionId.default.generate(operator.accountId);
        } else {
          throw new Error("`client` must have an `operator` or an explicit payment transaction must be provided");
        }
      } else {
        this._paymentTransactionId = _TransactionId.default.generate(new _AccountId.default(0));
      }
    }

    let cost = this._queryPayment != null ? this._queryPayment : client.maxQueryPayment;

    if (this._paymentTransactions.length !== 0 || !this._isPaymentRequired()) {
      cost = new _Hbar.default(0);
    } else {
      if (this._queryPayment == null) {
        const actualCost = await this.getCost(client);

        if (cost.toTinybars().toInt() < actualCost.toTinybars().toInt()) {
          throw new _MaxQueryPaymentExceeded.default(cost, actualCost);
        }

        cost = actualCost;
      }
    }

    for (const node of this._nodeAccountIds.list) {
      this._paymentTransactions.push(await _makePaymentTransaction(
      /** @type {import("../transaction/TransactionId.js").default} */
      this._paymentTransactionId, node, this._isPaymentRequired() ? operator : null,
      /** @type {Hbar} */
      cost));
    }

    this._timestamp = Date.now();
  }
  /**
   * @abstract
   * @internal
   * @param {proto.IResponse} response
   * @returns {proto.IResponseHeader}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _mapResponseHeader(response) {
    throw new Error("not implemented");
  }
  /**
   * @protected
   * @returns {proto.IQueryHeader}
   */


  _makeRequestHeader() {
    /** @type {proto.IQueryHeader} */
    let header = {};

    if (this._isPaymentRequired() && this._paymentTransactions.length > 0) {
      header = {
        responseType: _proto.ResponseType.ANSWER_ONLY,
        payment: this._paymentTransactions[this._nextNodeAccountIdIndex]
      };
    }

    return header;
  }
  /**
   * @abstract
   * @internal
   * @param {proto.IQueryHeader} header
   * @returns {proto.IQuery}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _onMakeRequest(header) {
    throw new Error("not implemented");
  }
  /**
   * @internal
   * @returns {proto.IQuery}
   */


  _makeRequest() {
    /** @type {proto.IQueryHeader} */
    let header = {};

    if (this._isPaymentRequired() && this._paymentTransactions != null) {
      header = {
        payment: this._paymentTransactions[this._nextNodeAccountIdIndex],
        responseType: _proto.ResponseType.ANSWER_ONLY
      };
    }

    return this._onMakeRequest(header);
  }
  /**
   * @override
   * @internal
   * @returns {Promise<proto.IQuery>}
   */


  _makeRequestAsync() {
    return Promise.resolve(this._makeRequest());
  }
  /**
   * @override
   * @internal
   * @param {proto.IQuery} request
   * @param {proto.IResponse} response
   * @returns {ExecutionState}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _shouldRetry(request, response) {
    const {
      nodeTransactionPrecheckCode
    } = this._mapResponseHeader(response);

    const status = _Status.default._fromCode(nodeTransactionPrecheckCode != null ? nodeTransactionPrecheckCode : _proto.ResponseCodeEnum.OK);

    _jsLogger.default.debug(`[${this._getLogId()}] received status ${status.toString()}`);

    switch (status) {
      case _Status.default.Busy:
      case _Status.default.Unknown:
      case _Status.default.PlatformTransactionNotCreated:
        return _Executable.ExecutionState.Retry;

      case _Status.default.Ok:
        return _Executable.ExecutionState.Finished;

      default:
        return _Executable.ExecutionState.Error;
    }
  }
  /**
   * @override
   * @internal
   * @param {proto.IQuery} request
   * @param {proto.IResponse} response
   * @returns {Error}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _mapStatusError(request, response) {
    const {
      nodeTransactionPrecheckCode
    } = this._mapResponseHeader(response);

    const status = _Status.default._fromCode(nodeTransactionPrecheckCode != null ? nodeTransactionPrecheckCode : _proto.ResponseCodeEnum.OK);

    return new _PrecheckStatusError.default({
      status,
      transactionId: this._getTransactionId()
    });
  }
  /**
   * @returns {AccountId}
   */


  _getNodeAccountId() {
    if (!this._nodeAccountIds.isEmpty) {
      // if there are payment transactions,
      // we need to use the node of the current payment transaction
      return this._nodeAccountIds.list[this._nextNodeAccountIdIndex];
    } else {
      throw new Error("(BUG) nodeAccountIds were not set for query before executing");
    }
  }
  /**
   * @override
   * @protected
   * @returns {void}
   */


  _advanceRequest() {
    if (this._isPaymentRequired() && this._paymentTransactions.length > 0) {
      // each time we move our cursor to the next transaction
      // wrapping around to ensure we are cycling
      super._nextNodeAccountIdIndex = (this._nextNodeAccountIdIndex + 1) % this._paymentTransactions.length;
    } else {
      super._advanceRequest();
    }
  }

}
/**
 * @param {TransactionId} paymentTransactionId
 * @param {AccountId} nodeId
 * @param {?ClientOperator} operator
 * @param {Hbar} paymentAmount
 * @returns {Promise<proto.ITransaction>}
 */


exports.default = Query;

async function _makePaymentTransaction(paymentTransactionId, nodeId, operator, paymentAmount) {
  const accountAmounts = [];

  if (operator != null) {
    accountAmounts.push({
      accountID: operator.accountId._toProtobuf(),
      amount: paymentAmount.negated().toTinybars()
    });
    accountAmounts.push({
      accountID: nodeId._toProtobuf(),
      amount: paymentAmount.toTinybars()
    });
  } else {
    accountAmounts.push({
      accountID: new _AccountId.default(0)._toProtobuf(),
      amount: paymentAmount.negated().toTinybars()
    });
    accountAmounts.push({
      accountID: nodeId._toProtobuf(),
      amount: paymentAmount.toTinybars()
    });
  }
  /**
   * @type {proto.ITransactionBody}
   */


  const body = {
    transactionID: paymentTransactionId._toProtobuf(),
    nodeAccountID: nodeId._toProtobuf(),
    transactionFee: new _Hbar.default(1).toTinybars(),
    transactionValidDuration: {
      seconds: _long.default.fromNumber(120)
    },
    cryptoTransfer: {
      transfers: {
        accountAmounts
      }
    }
  };
  /** @type {proto.ISignedTransaction} */

  const signedTransaction = {
    bodyBytes: _proto.TransactionBody.encode(body).finish()
  };

  if (operator != null) {
    const signature = await operator.transactionSigner(
    /** @type {Uint8Array} */
    signedTransaction.bodyBytes);
    signedTransaction.sigMap = {
      sigPair: [operator.publicKey._toProtobufSignature(signature)]
    };
  }

  return {
    signedTransactionBytes: _proto.SignedTransaction.encode(signedTransaction).finish()
  };
}
/**
 * @type {((query: Query<*>) => import("./CostQuery.js").default<*>)[]}
 */


const COST_QUERY = [];
exports.COST_QUERY = COST_QUERY;