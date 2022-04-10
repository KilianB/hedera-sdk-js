"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TransactionReceipt = _interopRequireDefault(require("./TransactionReceipt.cjs"));

var _TransactionId = _interopRequireDefault(require("./TransactionId.cjs"));

var _Timestamp = _interopRequireDefault(require("../Timestamp.cjs"));

var _Hbar = _interopRequireDefault(require("../Hbar.cjs"));

var _Transfer = _interopRequireDefault(require("../Transfer.cjs"));

var _ContractFunctionResult = _interopRequireDefault(require("../contract/ContractFunctionResult.cjs"));

var _TokenTransferMap = _interopRequireDefault(require("../account/TokenTransferMap.cjs"));

var _TokenNftTransferMap = _interopRequireDefault(require("../account/TokenNftTransferMap.cjs"));

var proto = _interopRequireWildcard(require("@hashgraph/proto"));

var _ScheduleId = _interopRequireDefault(require("../schedule/ScheduleId.cjs"));

var _AssessedCustomFee = _interopRequireDefault(require("../token/AssessedCustomFee.cjs"));

var _TokenAssociation = _interopRequireDefault(require("../token/TokenAssociation.cjs"));

var _Key = _interopRequireDefault(require("../Key.cjs"));

var _PublicKey = _interopRequireDefault(require("../PublicKey.cjs"));

var _TokenTransfer = _interopRequireDefault(require("../token/TokenTransfer.cjs"));

var _HbarAllowance = _interopRequireDefault(require("../account/HbarAllowance.cjs"));

var _TokenAllowance = _interopRequireDefault(require("../account/TokenAllowance.cjs"));

var _TokenNftAllowance = _interopRequireDefault(require("../account/TokenNftAllowance.cjs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {import("../token/TokenId.js").default} TokenId
 */

/**
 * Response when the client sends the node TransactionGetRecordResponse.
 */
class TransactionRecord {
  /**
   * @private
   * @param {object} props
   * @param {ContractFunctionResult} [props.contractFunctionResult]
   * @param {TransactionReceipt} props.receipt
   * @param {Uint8Array} props.transactionHash
   * @param {Timestamp} props.consensusTimestamp
   * @param {TransactionId} props.transactionId
   * @param {string} props.transactionMemo
   * @param {Hbar} props.transactionFee
   * @param {Transfer[]} props.transfers
   * @param {TokenTransferMap} props.tokenTransfers
   * @param {TokenTransfer[]} props.tokenTransfersList
   * @param {?ScheduleId} props.scheduleRef
   * @param {AssessedCustomFee[]} props.assessedCustomFees
   * @param {TokenNftTransferMap} props.nftTransfers
   * @param {TokenAssocation[]} props.automaticTokenAssociations
   * @param {Timestamp | null} props.parentConsensusTimestamp
   * @param {PublicKey | null} props.aliasKey
   * @param {TransactionRecord[]} props.duplicates
   * @param {TransactionRecord[]} props.children
   * @param {HbarAllowance[]} props.hbarAllowanceAdjustments
   * @param {TokenAllowance[]} props.tokenAllowanceAdjustments
   * @param {TokenNftAllowance[]} props.nftAllowanceAdjustments
   */
  constructor(props) {
    /**
     * The status (reach consensus, or failed, or is unknown) and the ID of
     * any new account/file/instance created.
     *
     * @readonly
     */
    this.receipt = props.receipt;
    /**
     * The hash of the Transaction that executed (not the hash of any Transaction that failed
     * for having a duplicate TransactionID).
     *
     * @readonly
     */

    this.transactionHash = props.transactionHash;
    /**
     * The consensus timestamp (or null if didn't reach consensus yet).
     *
     * @readonly
     */

    this.consensusTimestamp = props.consensusTimestamp;
    /**
     * The ID of the transaction this record represents.
     *
     * @readonly
     */

    this.transactionId = props.transactionId;
    /**
     * The memo that was submitted as part of the transaction (max 100 bytes).
     *
     * @readonly
     */

    this.transactionMemo = props.transactionMemo;
    /**
     * The actual transaction fee charged,
     * not the original transactionFee value from TransactionBody.
     *
     * @readonly
     */

    this.transactionFee = props.transactionFee;
    /**
     * All hbar transfers as a result of this transaction, such as fees, or transfers performed
     * by the transaction, or by a smart contract it calls, or by the creation of threshold
     * records that it triggers.
     *
     * @readonly
     */

    this.transfers = props.transfers;
    /**
     * Record of the value returned by the smart contract function or constructor.
     *
     * @readonly
     */

    this.contractFunctionResult = props.contractFunctionResult != null ? props.contractFunctionResult : null;
    /**
     * All the token transfers from this account
     *
     * @readonly
     */

    this.tokenTransfers = props.tokenTransfers;
    /**
     * All the token transfers from this account
     *
     * @readonly
     */

    this.tokenTransfersList = props.tokenTransfersList;
    /**
     * Reference to the scheduled transaction ID that this transaction record represent
     *
     * @readonly
     */

    this.scheduleRef = props.scheduleRef;
    /**
     * All custom fees that were assessed during a CryptoTransfer, and must be paid if the
     * transaction status resolved to SUCCESS
     *
     * @readonly
     */

    this.assessedCustomFees = props.assessedCustomFees;
    /** @readonly */

    this.nftTransfers = props.nftTransfers;
    /**
     * All token associations implicitly created while handling this transaction
     *
     * @readonly
     */

    this.automaticTokenAssociations = props.automaticTokenAssociations;
    /**
     * The parent consensus timestamp
     *
     * @readonly
     */

    this.parentConsensusTimestamp = props.parentConsensusTimestamp;
    this.aliasKey = props.aliasKey;
    /**
     * @readonly
     */

    this.duplicates = props.duplicates;
    /**
     * @readonly
     */

    this.children = props.children;
    /**
     * @readonly
     */

    this.hbarAllowanceAdjustments = props.hbarAllowanceAdjustments;
    /**
     * @readonly
     */

    this.tokenAllowanceAdjustments = props.tokenAllowanceAdjustments;
    /**
     * @readonly
     */

    this.nftAllowanceAdjustments = props.nftAllowanceAdjustments;
    Object.freeze(this);
  }
  /**
   * @internal
   * @returns {proto.ITransactionGetRecordResponse}
   */


  _toProtobuf() {
    const tokenTransfers = this.tokenTransfers._toProtobuf();

    const nftTransfers = this.nftTransfers._toProtobuf();

    const tokenTransferLists = [];

    for (const tokenTransfer of tokenTransfers) {
      for (const nftTransfer of nftTransfers) {
        if (tokenTransfer.token != null && nftTransfer.token != null && tokenTransfer.token.shardNum === nftTransfer.token.shardNum && tokenTransfer.token.realmNum === nftTransfer.token.realmNum && tokenTransfer.token.tokenNum === nftTransfer.token.tokenNum) {
          tokenTransferLists.push({
            token: tokenTransfer.token,
            transfers: tokenTransfer.transfers,
            nftTransfers: tokenTransfer.nftTransfers
          });
        } else {
          tokenTransferLists.push(tokenTransfer);
          tokenTransferLists.push(nftTransfer);
        }
      }
    }

    const duplicates = this.duplicates.map(record =>
    /** @type {proto.ITransactionRecord} */
    record._toProtobuf().transactionRecord);
    const children = this.children.map(record =>
    /** @type {proto.ITransactionRecord} */
    record._toProtobuf().transactionRecord);
    return {
      duplicateTransactionRecords: duplicates,
      childTransactionRecords: children,
      transactionRecord: {
        receipt: this.receipt._toProtobuf().receipt,
        transactionHash: this.transactionHash != null ? this.transactionHash : null,
        consensusTimestamp: this.consensusTimestamp != null ? this.consensusTimestamp._toProtobuf() : null,
        transactionID: this.transactionId != null ? this.transactionId._toProtobuf() : null,
        memo: this.transactionMemo != null ? this.transactionMemo : null,
        transactionFee: this.transactionFee != null ? this.transactionFee.toTinybars() : null,
        // TODO: Implement `ContractFunctionResult._toProtobuf()`
        //                 contractCallResult:
        //                     this.contractFunctionResult != null
        //                         ? this.contractFunctionResult
        //                         : null,
        //
        //                 contractCreateResult:
        //                     this.contractFunctionResult != null
        //                         ? this.contractFunctionResult
        //                         : null,
        transferList: this.transfers != null ? {
          accountAmounts: this.transfers.map(transfer => transfer._toProtobuf())
        } : null,
        tokenTransferLists,
        scheduleRef: this.scheduleRef != null ? this.scheduleRef._toProtobuf() : null,
        assessedCustomFees: this.assessedCustomFees.map(fee => fee._toProtobuf()),
        automaticTokenAssociations: this.automaticTokenAssociations.map(association => association._toProtobuf()),
        parentConsensusTimestamp: this.parentConsensusTimestamp != null ? this.parentConsensusTimestamp._toProtobuf() : null,
        alias: this.aliasKey != null ? proto.Key.encode(this.aliasKey._toProtobufKey()).finish() : null,
        cryptoAdjustments: this.hbarAllowanceAdjustments.map(allowance => {
          return allowance._toProtobuf();
        }),
        tokenAdjustments: this.tokenAllowanceAdjustments.map(allowance => {
          return allowance._toProtobuf();
        }),
        nftAdjustments: this.nftAllowanceAdjustments.map(allowance => {
          return allowance._toProtobuf();
        })
      }
    };
  }
  /**
   * @internal
   * @param {proto.ITransactionGetRecordResponse} response
   * @returns {TransactionRecord}
   */


  static _fromProtobuf(response) {
    const record =
    /** @type {proto.ITransactionRecord} */
    response.transactionRecord;
    let aliasKey = record.alias != null && record.alias.length > 0 ? _Key.default._fromProtobufKey(proto.Key.decode(record.alias)) : null;

    if (!(aliasKey instanceof _PublicKey.default)) {
      aliasKey = null;
    }

    const children = response.childTransactionRecords != null ? response.childTransactionRecords.map(child => TransactionRecord._fromProtobuf({
      transactionRecord: child
    })) : [];
    const duplicates = response.duplicateTransactionRecords != null ? response.duplicateTransactionRecords.map(duplicate => TransactionRecord._fromProtobuf({
      transactionRecord: duplicate
    })) : [];
    const contractFunctionResult = record.contractCallResult != null ? _ContractFunctionResult.default._fromProtobuf(record.contractCallResult) : record.contractCreateResult != null ? _ContractFunctionResult.default._fromProtobuf(record.contractCreateResult) : undefined;
    return new TransactionRecord({
      receipt: _TransactionReceipt.default._fromProtobuf({
        receipt:
        /** @type {proto.ITransactionReceipt} */
        record.receipt
      }),
      transactionHash: record.transactionHash != null ? record.transactionHash : new Uint8Array(),
      consensusTimestamp: _Timestamp.default._fromProtobuf(
      /** @type {proto.ITimestamp} */
      record.consensusTimestamp),
      transactionId: _TransactionId.default._fromProtobuf(
      /** @type {proto.ITransactionID} */
      record.transactionID),
      transactionMemo: record.memo != null ? record.memo : "",
      transactionFee: _Hbar.default.fromTinybars(record.transactionFee != null ? record.transactionFee : 0),
      transfers: _Transfer.default._fromProtobuf(record.transferList != null ? record.transferList.accountAmounts != null ? record.transferList.accountAmounts : [] : []),
      contractFunctionResult,
      tokenTransfers: _TokenTransferMap.default._fromProtobuf(record.tokenTransferLists != null ? record.tokenTransferLists : []),
      tokenTransfersList: _TokenTransfer.default._fromProtobuf(record.tokenTransferLists != null ? record.tokenTransferLists : []),
      scheduleRef: record.scheduleRef != null ? _ScheduleId.default._fromProtobuf(record.scheduleRef) : null,
      assessedCustomFees: record.assessedCustomFees != null ? record.assessedCustomFees.map(fee => _AssessedCustomFee.default._fromProtobuf(fee)) : [],
      nftTransfers: _TokenNftTransferMap.default._fromProtobuf(record.tokenTransferLists != null ? record.tokenTransferLists : []),
      automaticTokenAssociations: record.automaticTokenAssociations != null ? record.automaticTokenAssociations.map(association => _TokenAssociation.default._fromProtobuf(association)) : [],
      parentConsensusTimestamp: record.parentConsensusTimestamp != null ? _Timestamp.default._fromProtobuf(record.parentConsensusTimestamp) : null,
      aliasKey,
      duplicates,
      children,
      hbarAllowanceAdjustments: (record.cryptoAdjustments != null ? record.cryptoAdjustments : []).map(allowance => {
        return _HbarAllowance.default._fromProtobuf(allowance);
      }),
      tokenAllowanceAdjustments: (record.tokenAdjustments != null ? record.tokenAdjustments : []).map(allowance => {
        return _TokenAllowance.default._fromProtobuf(allowance);
      }),
      nftAllowanceAdjustments: (record.nftAdjustments != null ? record.nftAdjustments : []).map(allowance => {
        return _TokenNftAllowance.default._fromProtobuf(allowance);
      })
    });
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {TransactionRecord}
   */


  static fromBytes(bytes) {
    return TransactionRecord._fromProtobuf(proto.TransactionGetRecordResponse.decode(bytes));
  }
  /**
   * @returns {Uint8Array}
   */


  toBytes() {
    return proto.TransactionGetRecordResponse.encode(this._toProtobuf()).finish();
  }

}

exports.default = TransactionRecord;