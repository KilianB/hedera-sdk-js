"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TransactionId = _interopRequireDefault(require("../transaction/TransactionId.cjs"));

var _Hbar = _interopRequireDefault(require("../Hbar.cjs"));

var _Executable = _interopRequireDefault(require("../Executable.cjs"));

var _AccountId = _interopRequireDefault(require("../account/AccountId.cjs"));

var _Query = require("./Query.cjs");

var _proto = require("@hashgraph/proto");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").IQuery} proto.IQuery
 * @typedef {import("@hashgraph/proto").IResponse} proto.IResponse
 * @typedef {import("@hashgraph/proto").IQueryHeader} proto.IQueryHeader
 */

/**
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../Status.js").default} Status
 * @typedef {import("../Executable.js").ExecutionState} ExecutionState
 */

/**
 * @template OutputT
 * @augments {Executable<proto.IQuery, proto.IResponse, Hbar>}
 */
class CostQuery extends _Executable.default {
  /**
   * @param {import("./Query.js").default<OutputT>} query
   */
  constructor(query) {
    super();
    this._query = query;
    this._grpcDeadline = query._grpcDeadline;
    this._requestTimeout = query._requestTimeout;

    this._nodeAccountIds.setList(query._nodeAccountIds.list);

    this._operator = query._operator;
    /**
     * @type {proto.IQueryHeader | null}
     */

    this._header = null;
  }
  /**
   * @returns {TransactionId}
   */


  _getTransactionId() {
    return this._query._getTransactionId();
  }
  /**
   * @returns {string}
   */


  _getLogId() {
    return `CostQuery:${this._query._getLogId()}`;
  }
  /**
   * @abstract
   * @protected
   * @param {import("../client/Client.js").default<*, *>} client
   * @returns {Promise<void>}
   */


  async _beforeExecute(client) {
    if (client == null) {
      throw new Error("Cannot do CostQuery without Client");
    }

    const operator = this._operator != null ? this._operator : client._operator;

    if (operator == null) {
      throw new Error("`client` must have an `operator` or an explicit payment transaction must be provided");
    }

    if (this._query._nodeAccountIds.isEmpty) {
      this._query._nodeAccountIds.setList(client._network.getNodeAccountIdsForExecute());
    }

    this._header = {
      payment: await (0, _Query._makePaymentTransaction)(
      /** @type {import("../transaction/TransactionId.js").default} */
      _TransactionId.default.generate(new _AccountId.default(0)), new _AccountId.default(0), operator, new _Hbar.default(0)),
      responseType: _proto.ResponseType.COST_ANSWER
    };
  }
  /**
   * @abstract
   * @internal
   * @returns {Promise<proto.IQuery>}
   */


  _makeRequestAsync() {
    return Promise.resolve(this._query._onMakeRequest(
    /** @type {proto.IQueryHeader} */
    this._header));
  }
  /**
   * @abstract
   * @internal
   * @param {proto.IQuery} request
   * @param {proto.IResponse} response
   * @returns {ExecutionState}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _shouldRetry(request, response) {
    return this._query._shouldRetry(request, response);
  }
  /**
   * @abstract
   * @internal
   * @param {proto.IQuery} request
   * @param {proto.IResponse} response
   * @returns {Error}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _mapStatusError(request, response) {
    return this._query._mapStatusError(request, response);
  }
  /**
   * @override
   * @internal
   * @param {proto.IResponse} response
   * @param {AccountId} nodeAccountId
   * @param {proto.IQuery} request
   * @returns {Promise<Hbar>}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _mapResponse(response, nodeAccountId, request) {
    const cost = this._query._mapResponseHeader(response).cost;

    return Promise.resolve(_Hbar.default.fromTinybars(
    /** @type {Long | number} */
    cost));
  }
  /**
   * @override
   * @internal
   * @param {Channel} channel
   * @param {proto.IQuery} request
   * @returns {Promise<proto.IResponse>}
   */


  _execute(channel, request) {
    return this._query._execute(channel, request);
  }
  /**
   * @override
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

}

exports.default = CostQuery;

_Query.COST_QUERY.push(query => new CostQuery(query));