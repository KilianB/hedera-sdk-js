"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AccountId = _interopRequireDefault(require("./AccountId.cjs"));

var _LiveHash = _interopRequireDefault(require("./LiveHash.cjs"));

var _Hbar = _interopRequireDefault(require("../Hbar.cjs"));

var _Timestamp = _interopRequireDefault(require("../Timestamp.cjs"));

var _long = _interopRequireDefault(require("long"));

var _TokenRelationshipMap = _interopRequireDefault(require("./TokenRelationshipMap.cjs"));

var proto = _interopRequireWildcard(require("@hashgraph/proto"));

var _Duration = _interopRequireDefault(require("../Duration.cjs"));

var _Key = _interopRequireDefault(require("../Key.cjs"));

var _PublicKey = _interopRequireDefault(require("../PublicKey.cjs"));

var _LedgerId = _interopRequireDefault(require("../LedgerId.cjs"));

var _HbarAllowance = _interopRequireDefault(require("./HbarAllowance.cjs"));

var _TokenAllowance = _interopRequireDefault(require("./TokenAllowance.cjs"));

var _TokenNftAllowance = _interopRequireDefault(require("./TokenNftAllowance.cjs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Current information about an account, including the balance.
 */
class AccountInfo {
  /**
   * @private
   * @param {object} props
   * @param {AccountId} props.accountId
   * @param {?string} props.contractAccountId
   * @param {boolean} props.isDeleted
   * @param {?AccountId} props.proxyAccountId
   * @param {Hbar} props.proxyReceived
   * @param {Key} props.key
   * @param {Hbar} props.balance
   * @param {Hbar} props.sendRecordThreshold
   * @param {Hbar} props.receiveRecordThreshold
   * @param {boolean} props.isReceiverSignatureRequired
   * @param {Timestamp} props.expirationTime
   * @param {Duration} props.autoRenewPeriod
   * @param {LiveHash[]} props.liveHashes
   * @param {TokenRelationshipMap} props.tokenRelationships
   * @param {string} props.accountMemo
   * @param {Long} props.ownedNfts
   * @param {Long} props.maxAutomaticTokenAssociations
   * @param {PublicKey | null} props.aliasKey
   * @param {LedgerId | null} props.ledgerId
   * @param {HbarAllowance[]} props.hbarAllowances
   * @param {TokenAllowance[]} props.tokenAllowances
   * @param {TokenNftAllowance[]} props.nftAllowances
   */
  constructor(props) {
    /**
     * The account ID for which this information applies.
     *
     * @readonly
     */
    this.accountId = props.accountId;
    /**
     * The Contract Account ID comprising of both the contract instance and the cryptocurrency
     * account owned by the contract instance, in the format used by Solidity.
     *
     * @readonly
     */

    this.contractAccountId = props.contractAccountId;
    /**
     * If true, then this account has been deleted, it will disappear when it expires, and
     * all transactions for it will fail except the transaction to extend its expiration date.
     *
     * @readonly
     */

    this.isDeleted = props.isDeleted;
    /**
     * The Account ID of the account to which this is proxy staked. If proxyAccountID is null,
     * or is an invalid account, or is an account that isn't a node, then this account is
     * automatically proxy staked to a node chosen by the network, but without earning payments.
     * If the proxyAccountID account refuses to accept proxy staking , or if it is not currently
     * running a node, then it will behave as if proxyAccountID was null.
     *
     * @readonly
     */

    this.proxyAccountId = props.proxyAccountId;
    /**
     * The total number of tinybars proxy staked to this account.
     *
     * @readonly
     */

    this.proxyReceived = props.proxyReceived;
    /**
     * The key for the account, which must sign in order to transfer out, or to modify the account
     * in any way other than extending its expiration date.
     *
     * @readonly
     */

    this.key = props.key;
    /**
     * The current balance of account.
     *
     * @readonly
     */

    this.balance = props.balance;
    /**
     * The threshold amount (in tinybars) for which an account record is created (and this account
     * charged for them) for any send/withdraw transaction.
     *
     * @readonly
     */

    this.sendRecordThreshold = props.sendRecordThreshold;
    /**
     * The threshold amount (in tinybars) for which an account record is created
     * (and this account charged for them) for any transaction above this amount.
     *
     * @readonly
     */

    this.receiveRecordThreshold = props.receiveRecordThreshold;
    /**
     * If true, no transaction can transfer to this account unless signed by this account's key.
     *
     * @readonly
     */

    this.isReceiverSignatureRequired = props.isReceiverSignatureRequired;
    /**
     * The TimeStamp time at which this account is set to expire.
     *
     * @readonly
     */

    this.expirationTime = props.expirationTime;
    /**
     * The duration for expiration time will extend every this many seconds. If there are
     * insufficient funds, then it extends as long as possible. If it is empty when it
     * expires, then it is deleted.
     *
     * @readonly
     */

    this.autoRenewPeriod = props.autoRenewPeriod;
    /** @readonly */

    this.liveHashes = props.liveHashes;
    /** @readonly */

    this.tokenRelationships = props.tokenRelationships;
    /** @readonly */

    this.accountMemo = props.accountMemo;
    /** @readonly */

    this.ownedNfts = props.ownedNfts;
    /** @readonly */

    this.maxAutomaticTokenAssociations = props.maxAutomaticTokenAssociations;
    this.aliasKey = props.aliasKey;
    this.ledgerId = props.ledgerId;
    this.hbarAllowances = props.hbarAllowances;
    this.tokenAllowances = props.tokenAllowances;
    this.nftAllowances = props.nftAllowances;
    Object.freeze(this);
  }
  /**
   * @internal
   * @param {proto.IAccountInfo} info
   * @returns {AccountInfo}
   */


  static _fromProtobuf(info) {
    let aliasKey = info.alias != null && info.alias.length > 0 ? _Key.default._fromProtobufKey(proto.Key.decode(info.alias)) : null;

    if (!(aliasKey instanceof _PublicKey.default)) {
      aliasKey = null;
    }

    return new AccountInfo({
      accountId: _AccountId.default._fromProtobuf(
      /** @type {proto.IAccountID} */
      info.accountID),
      contractAccountId: info.contractAccountID != null ? info.contractAccountID : null,
      isDeleted: info.deleted != null ? info.deleted : false,
      key: _Key.default._fromProtobufKey(
      /** @type {proto.IKey} */
      info.key),
      balance: _Hbar.default.fromTinybars(info.balance != null ? info.balance : 0),
      sendRecordThreshold: _Hbar.default.fromTinybars(info.generateSendRecordThreshold != null ? info.generateSendRecordThreshold : 0),
      receiveRecordThreshold: _Hbar.default.fromTinybars(info.generateReceiveRecordThreshold != null ? info.generateReceiveRecordThreshold : 0),
      isReceiverSignatureRequired: info.receiverSigRequired != null ? info.receiverSigRequired : false,
      expirationTime: _Timestamp.default._fromProtobuf(
      /** @type {proto.ITimestamp} */
      info.expirationTime),
      autoRenewPeriod: info.autoRenewPeriod != null ? new _Duration.default(
      /** @type {Long} */
      info.autoRenewPeriod.seconds) : new _Duration.default(0),
      proxyAccountId: info.proxyAccountID != null && _long.default.fromValue(
      /** @type {Long | number} */
      info.proxyAccountID.shardNum).toInt() !== 0 && _long.default.fromValue(
      /** @type {Long | number} */
      info.proxyAccountID.realmNum).toInt() !== 0 && _long.default.fromValue(
      /** @type {Long | number} */
      info.proxyAccountID.accountNum).toInt() !== 0 ? _AccountId.default._fromProtobuf(info.proxyAccountID) : null,
      proxyReceived: _Hbar.default.fromTinybars(info.proxyReceived != null ? info.proxyReceived : 0),
      liveHashes: (info.liveHashes != null ? info.liveHashes : []).map(hash => _LiveHash.default._fromProtobuf(hash)),
      tokenRelationships: _TokenRelationshipMap.default._fromProtobuf(info.tokenRelationships != null ? info.tokenRelationships : []),
      accountMemo: info.memo != null ? info.memo : "",
      ownedNfts: info.ownedNfts ? info.ownedNfts : _long.default.ZERO,
      maxAutomaticTokenAssociations: info.maxAutomaticTokenAssociations ? _long.default.fromNumber(info.maxAutomaticTokenAssociations) : _long.default.ZERO,
      aliasKey,
      ledgerId: info.ledgerId != null ? _LedgerId.default.fromBytes(info.ledgerId) : null,
      hbarAllowances: (info.cryptoAllowances != null ? info.cryptoAllowances : []).map(allowance => _HbarAllowance.default._fromProtobuf(allowance)),
      tokenAllowances: (info.tokenAllowances != null ? info.tokenAllowances : []).map(allowance => _TokenAllowance.default._fromProtobuf(allowance)),
      nftAllowances: (info.nftAllowances != null ? info.nftAllowances : []).map(allowance => _TokenNftAllowance.default._fromProtobuf(allowance))
    });
  }
  /**
   * @returns {proto.IAccountInfo}
   */


  _toProtobuf() {
    return {
      accountID: this.accountId._toProtobuf(),
      contractAccountID: this.contractAccountId,
      deleted: this.isDeleted,
      proxyAccountID: this.proxyAccountId != null ? this.proxyAccountId._toProtobuf() : null,
      proxyReceived: this.proxyReceived.toTinybars(),
      key: this.key._toProtobufKey(),
      balance: this.balance.toTinybars(),
      generateSendRecordThreshold: this.sendRecordThreshold.toTinybars(),
      generateReceiveRecordThreshold: this.receiveRecordThreshold.toTinybars(),
      receiverSigRequired: this.isReceiverSignatureRequired,
      expirationTime: this.expirationTime._toProtobuf(),
      autoRenewPeriod: this.autoRenewPeriod._toProtobuf(),
      liveHashes: this.liveHashes.map(hash => hash._toProtobuf()),
      tokenRelationships: this.tokenRelationships != null ? this.tokenRelationships._toProtobuf() : null,
      memo: this.accountMemo,
      ownedNfts: this.ownedNfts,
      maxAutomaticTokenAssociations: this.maxAutomaticTokenAssociations.toInt(),
      alias: this.aliasKey != null ? proto.Key.encode(this.aliasKey._toProtobufKey()).finish() : null,
      ledgerId: this.ledgerId != null ? this.ledgerId.toBytes() : null
    };
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {AccountInfo}
   */


  static fromBytes(bytes) {
    return AccountInfo._fromProtobuf(proto.CryptoGetInfoResponse.AccountInfo.decode(bytes));
  }
  /**
   * @returns {Uint8Array}
   */


  toBytes() {
    return proto.CryptoGetInfoResponse.AccountInfo.encode(this._toProtobuf()).finish();
  }

}

exports.default = AccountInfo;