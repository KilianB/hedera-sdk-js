"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Query = _interopRequireWildcard(require("../query/Query.cjs"));

var _ContractId = _interopRequireDefault(require("./ContractId.cjs"));

var _ContractFunctionParameters = _interopRequireDefault(require("./ContractFunctionParameters.cjs"));

var _ContractFunctionResult = _interopRequireDefault(require("./ContractFunctionResult.cjs"));

var _long = _interopRequireDefault(require("long"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").IQuery} proto.IQuery
 * @typedef {import("@hashgraph/proto").IQueryHeader} proto.IQueryHeader
 * @typedef {import("@hashgraph/proto").IResponse} proto.IResponse
 * @typedef {import("@hashgraph/proto").IResponseHeader} proto.IResponseHeader
 * @typedef {import("@hashgraph/proto").IContractCallLocalQuery} proto.IContractCallLocalQuery
 * @typedef {import("@hashgraph/proto").IContractCallLocalResponse} proto.IContractCallLocalResponse
 * @typedef {import("@hashgraph/proto").IContractFunctionResult} proto.IContractFunctionResult
 */

/**
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../client/Client.js").default<*, *>} Client
 * @typedef {import("../account/AccountId.js").default} AccountId
 */

/**
 * @typedef {object} FunctionParameters
 * @property {ContractFunctionParameters} parameters
 * @property {string} name
 */

/**
 * @augments {Query<ContractFunctionResult>}
 */
class ContractCallQuery extends _Query.default {
  /**
   * @param {object} [props]
   * @param {ContractId | string} [props.contractId]
   * @param {number | Long} [props.gas]
   * @param {FunctionParameters | Uint8Array} [props.functionParameters]
   * @param {number | Long} [props.maxResultSize]
   */
  constructor(props = {}) {
    super();
    /**
     * @private
     * @type {?ContractId}
     */

    this._contractId = null;

    if (props.contractId != null) {
      this.setContractId(props.contractId);
    }
    /**
     * @private
     * @type {?Long}
     */


    this._gas = null;

    if (props.gas != null) {
      this.setGas(props.gas);
    }
    /**
     * @private
     * @type {?Uint8Array}
     */


    this._functionParameters = null;

    if (props.functionParameters != null) {
      if (props.functionParameters instanceof Uint8Array) {
        this.setFunctionParameters(props.functionParameters);
      } else {
        this.setFunction(props.functionParameters.name, props.functionParameters.parameters);
      }
    }
    /**
     * @private
     * @type {?Long}
     */


    this._maxResultSize = null;

    if (props.maxResultSize != null) {
      this.setMaxResultSize(props.maxResultSize);
    }
  }
  /**
   * @internal
   * @param {proto.IQuery} query
   * @returns {ContractCallQuery}
   */


  static _fromProtobuf(query) {
    const call =
    /** @type {proto.IContractCallLocalQuery} */
    query.contractCallLocal;
    return new ContractCallQuery({
      contractId: call.contractID != null ? _ContractId.default._fromProtobuf(call.contractID) : undefined,
      gas: call.gas != null ? call.gas : undefined,
      functionParameters: call.functionParameters != null ? call.functionParameters : undefined,
      maxResultSize: call.maxResultSize != null ? call.maxResultSize : undefined
    });
  }
  /**
   * @returns {?ContractId}
   */


  get contractId() {
    return this._contractId;
  }
  /**
   * Set the contract ID for which the call is being requested.
   *
   * @param {ContractId | string} contractId
   * @returns {ContractCallQuery}
   */


  setContractId(contractId) {
    this._contractId = typeof contractId === "string" ? _ContractId.default.fromString(contractId) : contractId.clone();
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
   * @returns {ContractCallQuery}
   */


  setGas(gas) {
    this._gas = gas instanceof _long.default ? gas : _long.default.fromValue(gas);
    return this;
  }
  /**
   * @returns {?Uint8Array}
   */


  get functionParameters() {
    return this._functionParameters;
  }
  /**
   * @param {Uint8Array} params
   * @returns {ContractCallQuery}
   */


  setFunctionParameters(params) {
    this._functionParameters = params;
    return this;
  }
  /**
   * @param {string} name
   * @param {?ContractFunctionParameters} [params]
   * @returns {ContractCallQuery}
   */


  setFunction(name, params) {
    this._functionParameters = (params != null ? params : new _ContractFunctionParameters.default())._build(name);
    return this;
  }
  /**
   * @param {number | Long} size
   * @returns {ContractCallQuery}
   */


  setMaxResultSize(size) {
    this._maxResultSize = size instanceof _long.default ? size : _long.default.fromValue(size);
    return this;
  }
  /**
   * @param {Client} client
   */


  _validateChecksums(client) {
    if (this._contractId != null) {
      this._contractId.validateChecksum(client);
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
    return channel.smartContract.contractCallLocalMethod(request);
  }
  /**
   * @override
   * @internal
   * @param {proto.IResponse} response
   * @returns {proto.IResponseHeader}
   */


  _mapResponseHeader(response) {
    const contractCallLocal =
    /** @type {proto.IContractCallLocalResponse} */
    response.contractCallLocal;
    return (
      /** @type {proto.IResponseHeader} */
      contractCallLocal.header
    );
  }
  /**
   * @protected
   * @override
   * @param {proto.IResponse} response
   * @returns {Promise<ContractFunctionResult>}
   */


  _mapResponse(response) {
    const call =
    /**
     *@type {proto.IContractCallLocalResponse}
     */
    response.contractCallLocal;
    return Promise.resolve(_ContractFunctionResult.default._fromProtobuf(
    /**
     * @type {proto.IContractFunctionResult}
     */
    call.functionResult));
  }
  /**
   * @override
   * @internal
   * @param {proto.IQueryHeader} header
   * @returns {proto.IQuery}
   */


  _onMakeRequest(header) {
    return {
      contractCallLocal: {
        header,
        contractID: this._contractId != null ? this._contractId._toProtobuf() : null,
        gas: this._gas,
        maxResultSize: this._maxResultSize,
        functionParameters: this._functionParameters
      }
    };
  }
  /**
   * @returns {string}
   */


  _getLogId() {
    const timestamp = this._paymentTransactionId != null && this._paymentTransactionId.validStart != null ? this._paymentTransactionId.validStart : this._timestamp;
    return `ContractCallQuery:${timestamp.toString()}`;
  }

} // eslint-disable-next-line @typescript-eslint/unbound-method


exports.default = ContractCallQuery;

_Query.QUERY_REGISTRY.set("contractCallLocal", ContractCallQuery._fromProtobuf);