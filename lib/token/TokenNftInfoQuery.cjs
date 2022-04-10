"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Query = _interopRequireWildcard(require("../query/Query.cjs"));

var _NftId = _interopRequireDefault(require("./NftId.cjs"));

var _AccountId = _interopRequireDefault(require("../account/AccountId.cjs"));

var _TokenId = _interopRequireDefault(require("../token/TokenId.cjs"));

var _TokenNftInfo = _interopRequireDefault(require("./TokenNftInfo.cjs"));

var _Hbar = _interopRequireDefault(require("../Hbar.cjs"));

var _long = _interopRequireDefault(require("long"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").IQuery} proto.IQuery
 * @typedef {import("@hashgraph/proto").IQueryHeader} proto.IQueryHeader
 * @typedef {import("@hashgraph/proto").IResponse} proto.IResponse
 * @typedef {import("@hashgraph/proto").ITokenNftInfo} proto.ITokenNftInfo
 * @typedef {import("@hashgraph/proto").IResponseHeader} proto.IResponseHeader
 * @typedef {import("@hashgraph/proto").ITokenGetNftInfoQuery} proto.ITokenGetNftInfoQuery
 * @typedef {import("@hashgraph/proto").ITokenGetNftInfosQuery} proto.ITokenGetNftInfosQuery
 * @typedef {import("@hashgraph/proto").ITokenGetAccountNftInfosQuery} proto.ITokenGetAccountNftInfosQuery
 * @typedef {import("@hashgraph/proto").ITokenGetNftInfoResponse} proto.ITokenGetNftInfoResponse
 * @typedef {import("@hashgraph/proto").ITokenGetNftInfosResponse} proto.ITokenGetNftInfosResponse
 * @typedef {import("@hashgraph/proto").ITokenGetAccountNftInfosResponse} proto.ITokenGetAccountNftInfosResponse
 */

/**
 * @typedef {import("../channel/Channel.js").default} Channel
 */

/**
 * @augments {Query<TokenNftInfo[]>}
 */
class TokenNftInfoQuery extends _Query.default {
  /**
   * @param {object} properties
   * @param {NftId | string} [properties.nftId]
   * @param {AccountId | string} [properties.accountId]
   * @param {TokenId | string} [properties.tokenId]
   * @param {Long | number} [properties.start]
   * @param {Long | number} [properties.end]
   */
  constructor(properties = {}) {
    super();
    /**
     * @private
     * @type {?NftId}
     */

    this._nftId = null;

    if (properties.nftId != null) {
      this.setNftId(properties.nftId);
    }
    /**
     * @private
     * @type {?AccountId}
     */


    this._accountId = null;

    if (properties.accountId != null) {
      // eslint-disable-next-line deprecation/deprecation
      this.setAccountId(properties.accountId);
    }
    /**
     * @private
     * @type {?TokenId}
     */


    this._tokenId = null;

    if (properties.tokenId != null) {
      // eslint-disable-next-line deprecation/deprecation
      this.setTokenId(properties.tokenId);
    }
    /**
     * @private
     * @type {?Long}
     */


    this._start = null;

    if (properties.start != null) {
      // eslint-disable-next-line deprecation/deprecation
      this.setStart(properties.start);
    }
    /**
     * @private
     * @type {?Long}
     */


    this._end = null;

    if (properties.end != null) {
      // eslint-disable-next-line deprecation/deprecation
      this.setEnd(properties.end);
    }
  }
  /**
   * @internal
   * @param {proto.IQuery} query
   * @returns {TokenNftInfoQuery}
   */


  static _fromProtobuf(query) {
    if (query.tokenGetNftInfo != null) {
      const info =
      /** @type {proto.ITokenGetNftInfoQuery} */
      query.tokenGetNftInfo;
      return new TokenNftInfoQuery({
        nftId: info.nftID != null ? _NftId.default._fromProtobuf(info.nftID) : undefined
      });
    } else if (query.tokenGetAccountNftInfos != null) {
      const info =
      /** @type {proto.ITokenGetAccountNftInfosQuery} */
      query.tokenGetAccountNftInfos;
      return new TokenNftInfoQuery({
        accountId: info.accountID != null ? _AccountId.default._fromProtobuf(info.accountID) : undefined,
        start: info.start != null ? info.start : undefined,
        end: info.end != null ? info.end : undefined
      });
    } else {
      const info =
      /** @type {proto.ITokenGetNftInfosQuery} */
      query.tokenGetNftInfos;
      return new TokenNftInfoQuery({
        tokenId: info.tokenID != null ? _TokenId.default._fromProtobuf(info.tokenID) : undefined,
        start: info.start != null ? info.start : undefined,
        end: info.end != null ? info.end : undefined
      });
    }
  }
  /**
   * @returns {?NftId}
   */


  get nftId() {
    return this._nftId;
  }
  /**
   * Set the token ID for which the info is being requested.
   *
   * @param {NftId | string} nftId
   * @returns {TokenNftInfoQuery}
   */


  setNftId(nftId) {
    this._nftId = typeof nftId === "string" ? _NftId.default.fromString(nftId) : _NftId.default._fromProtobuf(nftId._toProtobuf());
    return this;
  }
  /**
   * @deprecated with no replacement
   * @returns {?AccountId}
   */


  get accountId() {
    console.warn("`TokenNftInfoQuery.accountId` is deprecated with no replacement");
    return this._accountId;
  }
  /**
   * @deprecated with no replacement
   * Set the token ID for which the info is being requested.
   * @param {AccountId | string} accountId
   * @returns {TokenNftInfoQuery}
   */


  setAccountId(accountId) {
    console.warn("`TokenNftInfoQuery.setAccountId()` is deprecated with no replacement");
    this._accountId = typeof accountId === "string" ? _AccountId.default.fromString(accountId) : _AccountId.default._fromProtobuf(accountId._toProtobuf());
    return this;
  }
  /**
   * @deprecated with no replacement
   * @returns {?TokenId}
   */


  get tokenId() {
    console.warn("`TokenNftInfoQuery.tokenId` is deprecated with no replacement");
    return this._tokenId;
  }
  /**
   * @deprecated with no replacement
   * Set the token ID for which the info is being requested.
   * @param {TokenId | string} tokenId
   * @returns {TokenNftInfoQuery}
   */


  setTokenId(tokenId) {
    console.warn("`TokenNftInfoQuery.setTokenId()` is deprecated with no replacement");
    this._tokenId = typeof tokenId === "string" ? _TokenId.default.fromString(tokenId) : _TokenId.default._fromProtobuf(tokenId._toProtobuf());
    return this;
  }
  /**
   * @deprecated with no replacement
   * @returns {?Long}
   */


  get start() {
    console.warn("`TokenNftInfoQuery.start` is deprecated with no replacement");
    return this._start;
  }
  /**
   * @deprecated with no replacement
   * Set the token ID for which the info is being requested.
   * @param {Long | number} start
   * @returns {TokenNftInfoQuery}
   */


  setStart(start) {
    console.warn("`TokenNftInfoQuery.setStart()` is deprecated with no replacement");
    this._start = typeof start === "number" ? _long.default.fromNumber(start) : start;
    return this;
  }
  /**
   * @deprecated with no replacement
   * @returns {?Long}
   */


  get end() {
    console.warn("`TokenNftInfoQuery.end` is deprecated with no replacement");
    return this._end;
  }
  /**
   * @deprecated with no replacement
   * Set the token ID for which the info is being requested.
   * @param {Long | number} end
   * @returns {TokenNftInfoQuery}
   */


  setEnd(end) {
    console.warn("`TokenNftInfoQuery.setEnd()` is deprecated with no replacement");
    this._end = typeof end === "number" ? _long.default.fromNumber(end) : end;
    return this;
  }
  /**
   * @override
   * @param {import("../client/Client.js").default<Channel, *>} client
   * @returns {Promise<Hbar>}
   */


  async getCost(client) {
    let cost = await super.getCost(client);

    if (cost.toTinybars().greaterThan(25)) {
      return cost;
    } else {
      return _Hbar.default.fromTinybars(25);
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
    return channel.token.getTokenNftInfo(request);
  }
  /**
   * @override
   * @internal
   * @param {proto.IResponse} response
   * @returns {proto.IResponseHeader}
   */


  _mapResponseHeader(response) {
    const infos =
    /** @type {proto.ITokenGetNftInfoResponse} */
    response.tokenGetNftInfo;
    return (
      /** @type {proto.IResponseHeader} */
      infos.header
    );
  }
  /**
   * @override
   * @internal
   * @param {proto.IResponse} response
   * @param {AccountId} nodeAccountId
   * @param {proto.IQuery} request
   * @returns {Promise<TokenNftInfo[]>}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _mapResponse(response, nodeAccountId, request) {
    const nfts = [
    /** @type {proto.ITokenNftInfo} */

    /** @type {proto.ITokenGetNftInfoResponse} */
    response.tokenGetNftInfo.nft];
    return Promise.resolve(nfts.map(nft => _TokenNftInfo.default._fromProtobuf(
    /** @type {proto.ITokenNftInfo} */
    nft)));
  }
  /**
   * @override
   * @internal
   * @param {proto.IQueryHeader} header
   * @returns {proto.IQuery}
   */


  _onMakeRequest(header) {
    return {
      tokenGetNftInfo: {
        header,
        nftID: this._nftId != null ? this._nftId._toProtobuf() : null
      }
    };
  }
  /**
   * @returns {string}
   */


  _getLogId() {
    const timestamp = this._paymentTransactionId != null && this._paymentTransactionId.validStart != null ? this._paymentTransactionId.validStart : this._timestamp;
    return `TokenNftInfoQuery:${timestamp.toString()}`;
  }

} // eslint-disable-next-line @typescript-eslint/unbound-method


exports.default = TokenNftInfoQuery;

_Query.QUERY_REGISTRY.set("tokenGetNftInfo", TokenNftInfoQuery._fromProtobuf);