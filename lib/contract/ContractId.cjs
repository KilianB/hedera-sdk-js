"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var entity_id = _interopRequireWildcard(require("../EntityIdHelper.cjs"));

var _Key = _interopRequireDefault(require("../Key.cjs"));

var proto = _interopRequireWildcard(require("@hashgraph/proto"));

var _Cache = _interopRequireDefault(require("../Cache.cjs"));

var hex = _interopRequireWildcard(require("../encoding/hex.cjs"));

var _long = _interopRequireDefault(require("long"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @typedef {import("../client/Client.js").default<*, *>} Client
 */

/**
 * The ID for a crypto-currency contract on Hedera.
 */
class ContractId extends _Key.default {
  /**
   * @param {number | Long | import("../EntityIdHelper").IEntityId} props
   * @param {(number | Long)=} realm
   * @param {(number | Long)=} num
   * @param {Uint8Array=} evmAddress
   */
  constructor(props, realm, num, evmAddress) {
    super();
    const result = entity_id.constructor(props, realm, num);
    this.shard = result.shard;
    this.realm = result.realm;
    this.num = result.num;
    this.evmAddress = evmAddress != null ? evmAddress : null;
    /**
     * @type {string | null}
     */

    this._checksum = null;
  }
  /**
   * @param {Long | number} shard
   * @param {Long | number} realm
   * @param {string} evmAddress
   * @returns {ContractId}
   */


  static fromEvmAddress(shard, realm, evmAddress) {
    return new ContractId(shard, realm, 0, hex.decode(evmAddress));
  }
  /**
   * @param {string} text
   * @returns {ContractId}
   */


  static fromString(text) {
    const result = entity_id.fromStringSplitter(text);

    if (Number.isNaN(result.shard) || Number.isNaN(result.realm)) {
      throw new Error("invalid format for entity ID");
    }

    const shard = result.shard != null ? _long.default.fromString(result.shard) : _long.default.ZERO;
    const realm = result.realm != null ? _long.default.fromString(result.realm) : _long.default.ZERO;
    const [num, evmAddress] = result.numOrHex.length < 40 ? [_long.default.fromString(result.numOrHex), undefined] : [_long.default.ZERO, hex.decode(result.numOrHex)];
    return new ContractId(shard, realm, num, evmAddress);
  }
  /**
   * @internal
   * @param {proto.IContractID} id
   * @returns {ContractId}
   */


  static _fromProtobuf(id) {
    const contractId = new ContractId(id.shardNum != null ? id.shardNum : 0, id.realmNum != null ? id.realmNum : 0, id.contractNum != null ? id.contractNum : 0);
    return contractId;
  }
  /**
   * @returns {string | null}
   */


  get checksum() {
    return this._checksum;
  }
  /**
   * @deprecated - Use `validateChecksum` instead
   * @param {Client} client
   */


  validate(client) {
    console.warn("Deprecated: Use `validateChecksum` instead");
    this.validateChecksum(client);
  }
  /**
   * @param {Client} client
   */


  validateChecksum(client) {
    entity_id.validateChecksum(this.shard, this.realm, this.num, this._checksum, client);
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {ContractId}
   */


  static fromBytes(bytes) {
    return ContractId._fromProtobuf(proto.ContractID.decode(bytes));
  }
  /**
   * @deprecated - Use `ContractId.fromEvmAddress()` instead
   * @param {string} address
   * @returns {ContractId}
   */


  static fromSolidityAddress(address) {
    console.warn("Deprecated: use `ContractId.fromEvmAdress()` instead");
    const [shard, realm, contract] = entity_id.fromSolidityAddress(address);
    return new ContractId(shard, realm, contract);
  }
  /**
   * @returns {string}
   */


  toSolidityAddress() {
    if (this.evmAddress != null) {
      return hex.encode(this.evmAddress);
    } else {
      return entity_id.toSolidityAddress([this.shard, this.realm, this.num]);
    }
  }
  /**
   * @internal
   * @returns {proto.IContractID}
   */


  _toProtobuf() {
    return {
      contractNum: this.num,
      shardNum: this.shard,
      realmNum: this.realm,
      evmAddress: this.evmAddress
    };
  }
  /**
   * @returns {string}
   */


  toString() {
    if (this.evmAddress != null) {
      return `${this.shard.toString()}.${this.realm.toString()}.${hex.encode(this.evmAddress)}`;
    } else {
      return `${this.shard.toString()}.${this.realm.toString()}.${this.num.toString()}`;
    }
  }
  /**
   * @param {Client} client
   * @returns {string}
   */


  toStringWithChecksum(client) {
    return entity_id.toStringWithChecksum(this.toString(), client);
  }
  /**
   * @returns {Uint8Array}
   */


  toBytes() {
    return proto.ContractID.encode(this._toProtobuf()).finish();
  }
  /**
   * @returns {ContractId}
   */


  clone() {
    const id = new ContractId(this);
    id._checksum = this._checksum;
    id.evmAddress = this.evmAddress;
    return id;
  }
  /**
   * @param {ContractId} other
   * @returns {number}
   */


  compare(other) {
    return entity_id.compare([this.shard, this.realm, this.num], [other.shard, other.realm, other.num]);
  }
  /**
   * @returns {proto.IKey}
   */


  _toProtobufKey() {
    return {
      contractID: this._toProtobuf()
    };
  }
  /**
   * @param {proto.IContractID} key
   * @returns {ContractId}
   */


  static __fromProtobufKey(key) {
    return ContractId._fromProtobuf(key);
  }

}

exports.default = ContractId;

_Cache.default.contractId = key => ContractId.__fromProtobufKey(key);