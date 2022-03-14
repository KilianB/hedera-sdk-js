"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _long = _interopRequireDefault(require("long"));

var entity_id = _interopRequireWildcard(require("../EntityIdHelper.cjs"));

var proto = _interopRequireWildcard(require("@hashgraph/proto"));

var _Key = _interopRequireDefault(require("../Key.cjs"));

var _PublicKey = _interopRequireDefault(require("../PublicKey.cjs"));

var _Cache = _interopRequireDefault(require("../Cache.cjs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {import("../client/Client.js").default<*, *>} Client
 */

/**
 * The ID for a crypto-currency account on Hedera.
 */
class AccountId {
  /**
   * @param {number | Long | import("../EntityIdHelper").IEntityId} props
   * @param {(number | Long)=} realm
   * @param {(number | Long)=} num
   * @param {(PublicKey)=} aliasKey
   */
  constructor(props, realm, num, aliasKey) {
    const result = entity_id.constructor(props, realm, num);
    this.shard = result.shard;
    this.realm = result.realm;
    this.num = result.num;
    this.aliasKey = aliasKey != null ? aliasKey : null;
    /**
     * @type {string | null}
     */

    this._checksum = null;
  }
  /**
   * @param {string} text
   * @returns {AccountId}
   */


  static fromString(text) {
    const result = entity_id.fromStringSplitter(text);

    if (Number.isNaN(result.shard) || Number.isNaN(result.realm)) {
      throw new Error("invalid format for entity ID");
    }

    const shard = result.shard != null ? _long.default.fromString(result.shard) : _long.default.ZERO;
    const realm = result.realm != null ? _long.default.fromString(result.realm) : _long.default.ZERO;
    const [num, publicKey] = result.numOrHex.length < 20 ? [_long.default.fromString(result.numOrHex), undefined] : [_long.default.ZERO, _PublicKey.default.fromString(result.numOrHex)];
    return new AccountId(shard, realm, num, publicKey);
  }
  /**
   * @internal
   * @param {proto.IAccountID} id
   * @returns {AccountId}
   */


  static _fromProtobuf(id) {
    let key = id.alias != null && id.alias.length > 0 ? _Key.default._fromProtobufKey(proto.Key.decode(id.alias)) : undefined;

    if (!(key instanceof _PublicKey.default)) {
      key = undefined;
    }

    return new AccountId(id.shardNum != null ? id.shardNum : 0, id.realmNum != null ? id.realmNum : 0, id.accountNum != null ? id.accountNum : 0, key);
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
    if (this.aliasKey != null) {
      throw new Error("cannot calculate checksum with an account ID that has a aliasKey");
    }

    entity_id.validateChecksum(this.shard, this.realm, this.num, this._checksum, client);
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {AccountId}
   */


  static fromBytes(bytes) {
    return AccountId._fromProtobuf(proto.AccountID.decode(bytes));
  }
  /**
   * @param {string} address
   * @returns {AccountId}
   */


  static fromSolidityAddress(address) {
    return new AccountId(...entity_id.fromSolidityAddress(address));
  }
  /**
   * @returns {string}
   */


  toSolidityAddress() {
    return entity_id.toSolidityAddress([this.shard, this.realm, this.num]);
  }
  /**
   * @internal
   * @returns {proto.IAccountID}
   */


  _toProtobuf() {
    return {
      alias: this.aliasKey != null ? proto.Key.encode(this.aliasKey._toProtobufKey()).finish() : null,
      accountNum: this.num,
      shardNum: this.shard,
      realmNum: this.realm
    };
  }
  /**
   * @returns {Uint8Array}
   */


  toBytes() {
    return proto.AccountID.encode(this._toProtobuf()).finish();
  }
  /**
   * @returns {string}
   */


  toString() {
    const account = this.aliasKey != null ? this.aliasKey.toString() : this.num.toString();
    return `${this.shard.toString()}.${this.realm.toString()}.${account}`;
  }
  /**
   * @param {Client} client
   * @returns {string}
   */


  toStringWithChecksum(client) {
    if (this.aliasKey != null) {
      throw new Error("cannot calculate checksum with an account ID that has a aliasKey");
    }

    return entity_id.toStringWithChecksum(this.toString(), client);
  }
  /**
   * @param {this} other
   * @returns {boolean}
   */


  equals(other) {
    let account = false;

    if (this.aliasKey != null && other.aliasKey != null) {
      account = this.aliasKey.equals(other.aliasKey);
    } else if (this.aliasKey == null && other.aliasKey == null) {
      account = this.num.eq(other.num);
    }

    return this.shard.eq(other.shard) && this.realm.eq(other.realm) && account;
  }
  /**
   * @returns {AccountId}
   */


  clone() {
    const id = new AccountId(this);
    id._checksum = this._checksum;
    return id;
  }
  /**
   * @param {AccountId} other
   * @returns {number}
   */


  compare(other) {
    let comparison = this.shard.compare(other.shard);

    if (comparison != 0) {
      return comparison;
    }

    comparison = this.realm.compare(other.realm);

    if (comparison != 0) {
      return comparison;
    }

    if (this.aliasKey != null && other.aliasKey != null) {
      const t = this.aliasKey.toString();
      const o = other.aliasKey.toString();

      if (t > o) {
        return 1;
      } else if (t < o) {
        return -1;
      } else {
        return 0;
      }
    } else if (this.aliasKey == null && other.aliasKey == null) {
      return this.num.compare(other.num);
    } else {
      return 0;
    }
  }

}

exports.default = AccountId;

_Cache.default.accountIdConstructor = (shard, realm, key) => new AccountId(shard, realm, _long.default.ZERO, key);