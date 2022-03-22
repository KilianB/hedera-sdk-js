"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Query = _interopRequireWildcard(require("../query/Query.cjs"));

var _Status = _interopRequireDefault(require("../Status.cjs"));

var _TransactionReceipt = _interopRequireDefault(require("./TransactionReceipt.cjs"));

var _TransactionId = _interopRequireDefault(require("./TransactionId.cjs"));

var _PrecheckStatusError = _interopRequireDefault(require("../PrecheckStatusError.cjs"));

var _ReceiptStatusError = _interopRequireDefault(require("../ReceiptStatusError.cjs"));

var _Executable = require("../Executable.cjs");

var _proto = require("@hashgraph/proto");

var _jsLogger = _interopRequireDefault(require("js-logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").IQuery} proto.IQuery
 * @typedef {import("@hashgraph/proto").IQueryHeader} proto.IQueryHeader
 * @typedef {import("@hashgraph/proto").IResponse} proto.IResponse
 * @typedef {import("@hashgraph/proto").IResponseHeader} proto.IResponseHeader
 * @typedef {import("@hashgraph/proto").ITransactionReceipt} proto.ITransactionReceipt
 * @typedef {import("@hashgraph/proto").ITransactionGetReceiptQuery} proto.ITransactionGetReceiptQuery
 * @typedef {import("@hashgraph/proto").ITransactionGetReceiptResponse} proto.ITransactionGetReceiptResponse
 * @typedef {import("@hashgraph/proto").ResponseCodeEnum} proto.ResponseCodeEnum
 */

/**
 * @typedef {import("../account/AccountId.js").default} AccountId
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../client/Client.js").default<*, *>} Client
 */

/**
 * @augments {Query<TransactionReceipt>}
 */
class TransactionReceiptQuery extends _Query.default {
  /**
   * @param {object} [props]
   * @param {TransactionId | string} [props.transactionId]
   * @param {boolean} [props.includeDuplicates]
   * @param {boolean} [props.includeChildren]
   */
  constructor(props = {}) {
    super();
    /**
     * @private
     * @type {?TransactionId}
     */

    this._transactionId = null;
    /**
     * @private
     * @type {?boolean}
     */

    this._includeChildren = null;
    /**
     * @private
     * @type {?boolean}
     */

    this._includeDuplicates = null;

    if (props.transactionId != null) {
      this.setTransactionId(props.transactionId);
    }

    if (props.includeChildren != null) {
      this.setIncludeChildren(props.includeChildren);
    }

    if (props.includeDuplicates != null) {
      this.setIncludeDuplicates(props.includeDuplicates);
    }
  }
  /**
   * @internal
   * @param {proto.IQuery} query
   * @returns {TransactionReceiptQuery}
   */


  static _fromProtobuf(query) {
    const receipt =
    /** @type {proto.ITransactionGetReceiptQuery} */
    query.transactionGetReceipt;
    return new TransactionReceiptQuery({
      transactionId: receipt.transactionID ? _TransactionId.default._fromProtobuf(receipt.transactionID) : undefined,
      includeDuplicates: receipt.includeDuplicates != null ? receipt.includeDuplicates : undefined,
      includeChildren: receipt.includeChildReceipts != null ? receipt.includeChildReceipts : undefined
    });
  }
  /**
   * @returns {?TransactionId}
   */


  get transactionId() {
    return this._transactionId;
  }
  /**
   * Set the transaction ID for which the receipt is being requested.
   *
   * @param {TransactionId | string} transactionId
   * @returns {this}
   */


  setTransactionId(transactionId) {
    this._transactionId = typeof transactionId === "string" ? _TransactionId.default.fromString(transactionId) : transactionId.clone();
    return this;
  }
  /**
   * @param {boolean} includeDuplicates
   * @returns {TransactionReceiptQuery}
   */


  setIncludeDuplicates(includeDuplicates) {
    this._includeDuplicates = includeDuplicates;
    return this;
  }
  /**
   * @returns {boolean}
   */


  get includeDuplicates() {
    return this._includeDuplicates != null ? this._includeDuplicates : false;
  }
  /**
   * @param {boolean} includeChildren
   * @returns {TransactionReceiptQuery}
   */


  setIncludeChildren(includeChildren) {
    this._includeChildren = includeChildren;
    return this;
  }
  /**
   * @returns {boolean}
   */


  get includeChildren() {
    return this._includeChildren != null ? this._includeChildren : false;
  }
  /**
   * @override
   * @protected
   * @returns {boolean}
   */


  _isPaymentRequired() {
    return false;
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

    let status = _Status.default._fromCode(nodeTransactionPrecheckCode != null ? nodeTransactionPrecheckCode : _proto.ResponseCodeEnum.OK);

    _jsLogger.default.debug(`[${this._getLogId()}] received node precheck status ${status.toString()}`);

    switch (status) {
      case _Status.default.Busy:
      case _Status.default.Unknown:
      case _Status.default.ReceiptNotFound:
        return _Executable.ExecutionState.Retry;

      case _Status.default.Ok:
        break;

      default:
        return _Executable.ExecutionState.Error;
    }

    const transactionGetReceipt =
    /** @type {proto.ITransactionGetReceiptResponse} */
    response.transactionGetReceipt;
    const receipt =
    /** @type {proto.ITransactionReceipt} */
    transactionGetReceipt.receipt;
    const receiptStatusCode =
    /** @type {proto.ResponseCodeEnum} */
    receipt.status;
    status = _Status.default._fromCode(receiptStatusCode);

    _jsLogger.default.debug(`[${this._getLogId()}] received receipt status ${status.toString()}`);

    switch (status) {
      case _Status.default.Busy:
      case _Status.default.Unknown:
      case _Status.default.ReceiptNotFound:
        return _Executable.ExecutionState.Retry;

      case _Status.default.Success:
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

    let status = _Status.default._fromCode(nodeTransactionPrecheckCode != null ? nodeTransactionPrecheckCode : _proto.ResponseCodeEnum.OK);

    switch (status) {
      case _Status.default.Ok:
        // Do nothing
        break;

      default:
        return new _PrecheckStatusError.default({
          status,
          transactionId: this._getTransactionId()
        });
    }

    const transactionGetReceipt =
    /** @type {proto.ITransactionGetReceiptResponse} */
    response.transactionGetReceipt;
    const receipt =
    /** @type {proto.ITransactionReceipt} */
    transactionGetReceipt.receipt;
    const receiptStatusCode =
    /** @type {proto.ResponseCodeEnum} */
    receipt.status;
    status = _Status.default._fromCode(receiptStatusCode);
    return new _ReceiptStatusError.default({
      status,
      transactionId: this._getTransactionId(),
      transactionReceipt: _TransactionReceipt.default._fromProtobuf(transactionGetReceipt)
    });
  }
  /**
   * @param {Client} client
   */


  _validateChecksums(client) {
    if (this._transactionId != null && this._transactionId.accountId != null) {
      this._transactionId.accountId.validateChecksum(client);
    }
  }
  /**
   * @override
   * @internal
   * @param {Channel} channel
   * @param {proto.IQuery} request
   * @returns {Promise<proto.IResponse>}
   */


  _execute(channel, request) {
    return channel.crypto.getTransactionReceipts(request);
  }
  /**
   * @override
   * @internal
   * @param {proto.IResponse} response
   * @returns {proto.IResponseHeader}
   */


  _mapResponseHeader(response) {
    const transactionGetReceipt =
    /** @type {proto.ITransactionGetReceiptResponse} */
    response.transactionGetReceipt;
    return (
      /** @type {proto.IResponseHeader} */
      transactionGetReceipt.header
    );
  }
  /**
   * @protected
   * @override
   * @param {proto.IResponse} response
   * @param {AccountId} nodeAccountId
   * @param {proto.IQuery} request
   * @returns {Promise<TransactionReceipt>}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _mapResponse(response, nodeAccountId, request) {
    const transactionGetReceipt =
    /** @type {proto.ITransactionGetReceiptResponse} */
    response.transactionGetReceipt;
    return Promise.resolve(_TransactionReceipt.default._fromProtobuf(transactionGetReceipt));
  }
  /**
   * @override
   * @internal
   * @param {proto.IQueryHeader} header
   * @returns {proto.IQuery}
   */


  _onMakeRequest(header) {
    return {
      transactionGetReceipt: {
        header,
        transactionID: this._transactionId != null ? this._transactionId._toProtobuf() : null,
        includeDuplicates: this._includeDuplicates,
        includeChildReceipts: this._includeChildren
      }
    };
  }
  /**
   * @returns {string}
   */


  _getLogId() {
    return `TransactionReceiptQuery:${this._timestamp.toString()}`;
  }

}

exports.default = TransactionReceiptQuery;

_Query.QUERY_REGISTRY.set("transactionGetReceipt", // eslint-disable-next-line @typescript-eslint/unbound-method
TransactionReceiptQuery._fromProtobuf);