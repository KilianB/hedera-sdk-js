"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Query = _interopRequireWildcard(require("../query/Query.cjs"));

var _FileId = _interopRequireDefault(require("./FileId.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").IQuery} proto.IQuery
 * @typedef {import("@hashgraph/proto").IQueryHeader} proto.IQueryHeader
 * @typedef {import("@hashgraph/proto").IResponse} proto.IResponse
 * @typedef {import("@hashgraph/proto").IResponseHeader} proto.IResponseHeader
 * @typedef {import("@hashgraph/proto").IFileGetContentsQuery} proto.IFileGetContentsQuery
 * @typedef {import("@hashgraph/proto").IFileGetContentsResponse} proto.IFileGetContentsResponse
 * @typedef {import("@hashgraph/proto").IFileContents} proto.IFileContents
 */

/**
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../client/Client.js").default<*, *>} Client
 * @typedef {import("../account/AccountId.js").default} AccountId
 */

/**
 * @augments {Query<Uint8Array>}
 */
class FileContentsQuery extends _Query.default {
  /**
   * @param {object} [props]
   * @param {FileId | string} [props.fileId]
   */
  constructor(props = {}) {
    super();
    /**
     * @type {?FileId}
     * @private
     */

    this._fileId = null;

    if (props.fileId != null) {
      this.setFileId(props.fileId);
    }
  }
  /**
   * @internal
   * @param {proto.IQuery} query
   * @returns {FileContentsQuery}
   */


  static _fromProtobuf(query) {
    const contents =
    /** @type {proto.IFileGetContentsQuery} */
    query.fileGetContents;
    return new FileContentsQuery({
      fileId: contents.fileID != null ? _FileId.default._fromProtobuf(contents.fileID) : undefined
    });
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
   * @param {proto.IQuery} request
   * @returns {Promise<proto.IResponse>}
   */


  _execute(channel, request) {
    return channel.file.getFileContent(request);
  }
  /**
   * @returns {?FileId}
   */


  get fileId() {
    return this._fileId;
  }
  /**
   * Set the file ID for which the info is being requested.
   *
   * @param {FileId | string} fileId
   * @returns {FileContentsQuery}
   */


  setFileId(fileId) {
    this._fileId = typeof fileId === "string" ? _FileId.default.fromString(fileId) : fileId.clone();
    return this;
  }
  /**
   * @override
   * @internal
   * @param {proto.IResponse} response
   * @returns {proto.IResponseHeader}
   */


  _mapResponseHeader(response) {
    const fileGetContents =
    /** @type {proto.IFileGetContentsResponse} */
    response.fileGetContents;
    return (
      /** @type {proto.IResponseHeader} */
      fileGetContents.header
    );
  }
  /**
   * @protected
   * @override
   * @param {proto.IResponse} response
   * @returns {Promise<Uint8Array>}
   */


  _mapResponse(response) {
    const fileContentsResponse =
    /** @type {proto.IFileGetContentsResponse} */
    response.fileGetContents;
    const fileConents =
    /** @type {proto.IFileContents} */
    fileContentsResponse.fileContents;
    const contents =
    /** @type {Uint8Array} */
    fileConents.contents;
    return Promise.resolve(contents);
  }
  /**
   * @override
   * @internal
   * @param {proto.IQueryHeader} header
   * @returns {proto.IQuery}
   */


  _onMakeRequest(header) {
    return {
      fileGetContents: {
        header,
        fileID: this._fileId != null ? this._fileId._toProtobuf() : null
      }
    };
  }
  /**
   * @returns {string}
   */


  _getLogId() {
    const timestamp = this._paymentTransactionId != null && this._paymentTransactionId.validStart != null ? this._paymentTransactionId.validStart : this._timestamp;
    return `FileContentsQuery:${timestamp.toString()}`;
  }

} // eslint-disable-next-line @typescript-eslint/unbound-method


exports.default = FileContentsQuery;

_Query.QUERY_REGISTRY.set("fileGetContents", FileContentsQuery._fromProtobuf);