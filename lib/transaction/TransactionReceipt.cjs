"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AccountId = _interopRequireDefault(require("../account/AccountId.cjs"));

var _ContractId = _interopRequireDefault(require("../contract/ContractId.cjs"));

var _FileId = _interopRequireDefault(require("../file/FileId.cjs"));

var _TopicId = _interopRequireDefault(require("../topic/TopicId.cjs"));

var _TokenId = _interopRequireDefault(require("../token/TokenId.cjs"));

var _ScheduleId = _interopRequireDefault(require("../schedule/ScheduleId.cjs"));

var _ExchangeRate = _interopRequireDefault(require("../ExchangeRate.cjs"));

var _Status = _interopRequireDefault(require("../Status.cjs"));

var _long = _interopRequireDefault(require("long"));

var proto = _interopRequireWildcard(require("@hashgraph/proto"));

var _TransactionId = _interopRequireDefault(require("../transaction/TransactionId.cjs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The consensus result for a transaction, which might not be currently known,
 * or may succeed or fail.
 */
class TransactionReceipt {
  /**
   * @private
   * @param {object} props
   * @param {Status} props.status
   * @param {?AccountId} props.accountId
   * @param {?FileId} props.fileId
   * @param {?ContractId} props.contractId
   * @param {?TopicId} props.topicId
   * @param {?TokenId} props.tokenId
   * @param {?ScheduleId} props.scheduleId
   * @param {?ExchangeRate} props.exchangeRate
   * @param {?Long} props.topicSequenceNumber
   * @param {?Uint8Array} props.topicRunningHash
   * @param {?Long} props.totalSupply
   * @param {?TransactionId} props.scheduledTransactionId
   * @param {Long[]} props.serials
   * @param {TransactionReceipt[]} props.duplicates
   * @param {TransactionReceipt[]} props.children
   */
  constructor(props) {
    /**
     * Whether the transaction succeeded or failed (or is unknown).
     *
     * @readonly
     */
    this.status = props.status;
    /**
     * The account ID, if a new account was created.
     *
     * @readonly
     */

    this.accountId = props.accountId;
    /**
     * The file ID, if a new file was created.
     *
     * @readonly
     */

    this.fileId = props.fileId;
    /**
     * The contract ID, if a new contract was created.
     *
     * @readonly
     */

    this.contractId = props.contractId;
    /**
     * The topic ID, if a new topic was created.
     *
     * @readonly
     */

    this.topicId = props.topicId;
    /**
     * The token ID, if a new token was created.
     *
     * @readonly
     */

    this.tokenId = props.tokenId;
    /**
     * The schedule ID, if a new schedule was created.
     *
     * @readonly
     */

    this.scheduleId = props.scheduleId;
    /**
     * The exchange rate of Hbars to cents (USD).
     *
     * @readonly
     */

    this.exchangeRate = props.exchangeRate;
    /**
     * Updated sequence number for a consensus service topic.
     *
     * @readonly
     */

    this.topicSequenceNumber = props.topicSequenceNumber;
    /**
     * Updated running hash for a consensus service topic.
     *
     * @readonly
     */

    this.topicRunningHash = props.topicRunningHash;
    /**
     * Updated total supply for a token
     *
     * @readonly
     */

    this.totalSupply = props.totalSupply;
    this.scheduledTransactionId = props.scheduledTransactionId;
    this.serials = props.serials;
    /**
     * @readonly
     */

    this.duplicates = props.duplicates;
    /**
     * @readonly
     */

    this.children = props.children;
    Object.freeze(this);
  }
  /**
   * @internal
   * @returns {proto.ITransactionGetReceiptResponse}
   */


  _toProtobuf() {
    const duplicates = this.duplicates.map(receipt =>
    /** @type {proto.ITransactionReceipt} */
    receipt._toProtobuf().receipt);
    const children = this.children.map(receipt =>
    /** @type {proto.ITransactionReceipt} */
    receipt._toProtobuf().receipt);
    return {
      duplicateTransactionReceipts: duplicates,
      childTransactionReceipts: children,
      receipt: {
        status: this.status.valueOf(),
        accountID: this.accountId != null ? this.accountId._toProtobuf() : null,
        fileID: this.fileId != null ? this.fileId._toProtobuf() : null,
        contractID: this.contractId != null ? this.contractId._toProtobuf() : null,
        topicID: this.topicId != null ? this.topicId._toProtobuf() : null,
        tokenID: this.tokenId != null ? this.tokenId._toProtobuf() : null,
        scheduleID: this.scheduleId != null ? this.scheduleId._toProtobuf() : null,
        topicRunningHash: this.topicRunningHash == null ? null : this.topicRunningHash,
        topicSequenceNumber: this.topicSequenceNumber,
        exchangeRate: {
          nextRate: null,
          currentRate: this.exchangeRate != null ? this.exchangeRate._toProtobuf() : null
        },
        scheduledTransactionID: this.scheduledTransactionId != null ? this.scheduledTransactionId._toProtobuf() : null,
        serialNumbers: this.serials,
        newTotalSupply: this.totalSupply
      }
    };
  }
  /**
   * @internal
   * @param {proto.ITransactionGetReceiptResponse} response
   * @returns {TransactionReceipt}
   */


  static _fromProtobuf(response) {
    const receipt =
    /** @type {proto.ITransactionReceipt} */
    response.receipt;
    const exchangeRateSet =
    /** @type {proto.IExchangeRateSet} */
    receipt.exchangeRate;
    const children = response.childTransactionReceipts != null ? response.childTransactionReceipts.map(child => TransactionReceipt._fromProtobuf({
      receipt: child
    })) : [];
    const duplicates = response.duplicateTransactionReceipts != null ? response.duplicateTransactionReceipts.map(duplicate => TransactionReceipt._fromProtobuf({
      receipt: duplicate
    })) : [];
    return new TransactionReceipt({
      status: _Status.default._fromCode(receipt.status != null ? receipt.status : 0),
      accountId: receipt.accountID != null ? _AccountId.default._fromProtobuf(receipt.accountID) : null,
      fileId: receipt.fileID != null ? _FileId.default._fromProtobuf(receipt.fileID) : null,
      contractId: receipt.contractID != null ? _ContractId.default._fromProtobuf(receipt.contractID) : null,
      topicId: receipt.topicID != null ? _TopicId.default._fromProtobuf(receipt.topicID) : null,
      tokenId: receipt.tokenID != null ? _TokenId.default._fromProtobuf(receipt.tokenID) : null,
      scheduleId: receipt.scheduleID != null ? _ScheduleId.default._fromProtobuf(receipt.scheduleID) : null,
      exchangeRate: receipt.exchangeRate != null ? _ExchangeRate.default._fromProtobuf(
      /** @type {proto.IExchangeRate} */
      exchangeRateSet.currentRate) : null,
      topicSequenceNumber: receipt.topicSequenceNumber == null ? null : _long.default.fromString(receipt.topicSequenceNumber.toString()),
      topicRunningHash: receipt.topicRunningHash != null ? new Uint8Array(receipt.topicRunningHash) : null,
      totalSupply: receipt.newTotalSupply != null ? _long.default.fromString(receipt.newTotalSupply.toString()) : null,
      scheduledTransactionId: receipt.scheduledTransactionID != null ? _TransactionId.default._fromProtobuf(receipt.scheduledTransactionID) : null,
      serials: receipt.serialNumbers != null ? receipt.serialNumbers.map(serial => _long.default.fromValue(serial)) : [],
      children,
      duplicates
    });
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {TransactionReceipt}
   */


  static fromBytes(bytes) {
    return TransactionReceipt._fromProtobuf(proto.TransactionGetReceiptResponse.decode(bytes));
  }
  /**
   * @returns {Uint8Array}
   */


  toBytes() {
    return proto.TransactionGetReceiptResponse.encode(this._toProtobuf()).finish();
  }

}

exports.default = TransactionReceipt;