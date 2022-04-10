"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeUnaryResponse = decodeUnaryResponse;
exports.default = void 0;
exports.encodeRequest = encodeRequest;

var _proto = require("@hashgraph/proto");

var utf8 = _interopRequireWildcard(require("../encoding/utf8.cjs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @internal
 * @abstract
 */
class Channel {
  /**
   * @protected
   */
  constructor() {
    /**
     * @protected
     * @type {?CryptoService}
     */
    this._crypto = null;
    /**
     * @protected
     * @type {?SmartContractService}
     */

    this._smartContract = null;
    /**
     * @protected
     * @type {?FileService}
     */

    this._file = null;
    /**
     * @protected
     * @type {?ConsensusService}
     */

    this._consensus = null;
    /**
     * @protected
     * @type {?FreezeService}
     */

    this._freeze = null;
    /**
     * @protected
     * @type {?NetworkService}
     */

    this._network = null;
    /**
     * @protected
     * @type {?TokenService}
     */

    this._token = null;
    /**
     * @protected
     * @type {?ScheduleService}
     */

    this._schedule = null;
  }
  /**
   * @abstract
   * @returns {void}
   */


  close() {
    throw new Error("not implemented");
  }
  /**
   * @returns {CryptoService}
   */


  get crypto() {
    if (this._crypto != null) {
      return this._crypto;
    }

    this._crypto = _proto.CryptoService.create(this._createUnaryClient("CryptoService"));
    return this._crypto;
  }
  /**
   * @returns {SmartContractService}
   */


  get smartContract() {
    if (this._smartContract != null) {
      return this._smartContract;
    }

    this._smartContract = _proto.SmartContractService.create(this._createUnaryClient("SmartContractService"));
    return this._smartContract;
  }
  /**
   * @returns {FileService}
   */


  get file() {
    if (this._file != null) {
      return this._file;
    }

    this._file = _proto.FileService.create(this._createUnaryClient("FileService"));
    return this._file;
  }
  /**
   * @returns {ConsensusService}
   */


  get consensus() {
    if (this._consensus != null) {
      return this._consensus;
    }

    this._consensus = _proto.ConsensusService.create(this._createUnaryClient("ConsensusService"));
    return this._consensus;
  }
  /**
   * @returns {FreezeService}
   */


  get freeze() {
    if (this._freeze != null) {
      return this._freeze;
    }

    this._freeze = _proto.FreezeService.create(this._createUnaryClient("FreezeService"));
    return this._freeze;
  }
  /**
   * @returns {NetworkService}
   */


  get network() {
    if (this._network != null) {
      return this._network;
    }

    this._network = _proto.NetworkService.create(this._createUnaryClient("NetworkService"));
    return this._network;
  }
  /**
   * @returns {TokenService}
   */


  get token() {
    if (this._token != null) {
      return this._token;
    }

    this._token = _proto.TokenService.create(this._createUnaryClient("TokenService"));
    return this._token;
  }
  /**
   * @returns {ScheduleService}
   */


  get schedule() {
    if (this._schedule != null) {
      return this._schedule;
    }

    this._schedule = _proto.ScheduleService.create(this._createUnaryClient("ScheduleService"));
    return this._schedule;
  }
  /**
   * @abstract
   * @protected
   * @param {string} serviceName
   * @returns {import("protobufjs").RPCImpl}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _createUnaryClient(serviceName) {
    throw new Error("not implemented");
  }

} // grpc-web+proto is a series of data or trailer frames
// a frame is identified by a single byte (0 = data or 1 = trailer) followed by 4 bytes for the
// length of the frame, followed by the frame data

/**
 * @param {Uint8Array} data
 * @returns {ArrayBuffer}
 */


exports.default = Channel;

function encodeRequest(data) {
  // for our requests, we want to transfer a single data frame
  const frame = new ArrayBuffer(data.byteLength + 5); // the frame type (data) is zero and can be left default-initialized
  // the length of the frame data

  new DataView(frame, 1, 4).setUint32(0, data.length); // copy in the frame data

  new Uint8Array(frame, 5).set(data);
  return frame;
}
/**
 * @param {ArrayBuffer} data
 * @param {number} byteOffset
 * @param {number} byteLength
 * @returns {Uint8Array}
 */


function decodeUnaryResponse(data, byteOffset = 0, byteLength = data.byteLength) {
  const dataView = new DataView(data, byteOffset, byteLength);
  let dataOffset = 0;
  /** @type {?Uint8Array} */

  let unaryResponse = null; // 0 = successful

  let status = 0;

  while (dataOffset < dataView.byteLength) {
    const frameByte = dataView.getUint8(dataOffset + 0);
    const frameType = frameByte >> 7;
    const frameByteLength = dataView.getUint32(dataOffset + 1);
    const frameOffset = dataOffset + 5; // offset from the start of the dataView

    if (frameOffset + frameByteLength > dataView.byteLength) {
      throw new Error("(BUG) unexpected frame length past the boundary");
    }

    const frameData = new Uint8Array(data, dataView.byteOffset + frameOffset, frameByteLength);

    if (frameType === 0) {
      if (unaryResponse != null) {
        throw new Error("(BUG) unexpectedly received more than one data frame");
      }

      unaryResponse = frameData;
    } else if (frameType === 1) {
      const trailer = utf8.decode(frameData);
      const [trailerName, trailerValue] = trailer.split(":");

      if (trailerName === "grpc-status") {
        status = parseInt(trailerValue);
      } else {
        throw new Error(`(BUG) unhandled trailer, ${trailer}`);
      }
    } else {
      throw new Error(`(BUG) unexpected frame type: ${frameType}`);
    }

    dataOffset += frameByteLength + 5;
  }

  if (status !== 0) {
    throw new Error(`(BUG) unhandled grpc-status: ${status}`);
  }

  if (unaryResponse == null) {
    throw new Error("(BUG) unexpectedly received no response");
  }

  return unaryResponse;
}