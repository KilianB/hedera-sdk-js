/**
 * @typedef {import("../token/TokenId.js").default} TokenId
 */
/**
 * Response when the client sends the node TransactionGetRecordResponse.
 */
export default class TransactionRecord {
    /**
     * @internal
     * @param {proto.ITransactionGetRecordResponse} response
     * @returns {TransactionRecord}
     */
    static _fromProtobuf(response: proto.ITransactionGetRecordResponse): TransactionRecord;
    /**
     * @param {Uint8Array} bytes
     * @returns {TransactionRecord}
     */
    static fromBytes(bytes: Uint8Array): TransactionRecord;
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
    private constructor();
    /**
     * The status (reach consensus, or failed, or is unknown) and the ID of
     * any new account/file/instance created.
     *
     * @readonly
     */
    readonly receipt: TransactionReceipt;
    /**
     * The hash of the Transaction that executed (not the hash of any Transaction that failed
     * for having a duplicate TransactionID).
     *
     * @readonly
     */
    readonly transactionHash: Uint8Array;
    /**
     * The consensus timestamp (or null if didn't reach consensus yet).
     *
     * @readonly
     */
    readonly consensusTimestamp: Timestamp;
    /**
     * The ID of the transaction this record represents.
     *
     * @readonly
     */
    readonly transactionId: TransactionId;
    /**
     * The memo that was submitted as part of the transaction (max 100 bytes).
     *
     * @readonly
     */
    readonly transactionMemo: string;
    /**
     * The actual transaction fee charged,
     * not the original transactionFee value from TransactionBody.
     *
     * @readonly
     */
    readonly transactionFee: Hbar;
    /**
     * All hbar transfers as a result of this transaction, such as fees, or transfers performed
     * by the transaction, or by a smart contract it calls, or by the creation of threshold
     * records that it triggers.
     *
     * @readonly
     */
    readonly transfers: Transfer[];
    /**
     * Record of the value returned by the smart contract function or constructor.
     *
     * @readonly
     */
    readonly contractFunctionResult: ContractFunctionResult | null;
    /**
     * All the token transfers from this account
     *
     * @readonly
     */
    readonly tokenTransfers: TokenTransferMap;
    /**
     * All the token transfers from this account
     *
     * @readonly
     */
    readonly tokenTransfersList: TokenTransfer[];
    /**
     * Reference to the scheduled transaction ID that this transaction record represent
     *
     * @readonly
     */
    readonly scheduleRef: ScheduleId | null;
    /**
     * All custom fees that were assessed during a CryptoTransfer, and must be paid if the
     * transaction status resolved to SUCCESS
     *
     * @readonly
     */
    readonly assessedCustomFees: AssessedCustomFee[];
    /** @readonly */
    readonly nftTransfers: TokenNftTransferMap;
    /**
     * All token associations implicitly created while handling this transaction
     *
     * @readonly
     */
    readonly automaticTokenAssociations: TokenAssocation[];
    /**
     * The parent consensus timestamp
     *
     * @readonly
     */
    readonly parentConsensusTimestamp: Timestamp | null;
    aliasKey: PublicKey | null;
    /**
     * @readonly
     */
    readonly duplicates: TransactionRecord[];
    /**
     * @readonly
     */
    readonly children: TransactionRecord[];
    /**
     * @readonly
     */
    readonly hbarAllowanceAdjustments: HbarAllowance[];
    /**
     * @readonly
     */
    readonly tokenAllowanceAdjustments: TokenAllowance[];
    /**
     * @readonly
     */
    readonly nftAllowanceAdjustments: TokenNftAllowance[];
    /**
     * @internal
     * @returns {proto.ITransactionGetRecordResponse}
     */
    _toProtobuf(): proto.ITransactionGetRecordResponse;
    /**
     * @returns {Uint8Array}
     */
    toBytes(): Uint8Array;
}
export type TokenId = import("../token/TokenId.js").default;
import TransactionReceipt from "./TransactionReceipt.js";
import Timestamp from "../Timestamp.js";
import TransactionId from "./TransactionId.js";
import Hbar from "../Hbar.js";
import Transfer from "../Transfer.js";
import ContractFunctionResult from "../contract/ContractFunctionResult.js";
import TokenTransferMap from "../account/TokenTransferMap.js";
import TokenTransfer from "../token/TokenTransfer.js";
import ScheduleId from "../schedule/ScheduleId.js";
import AssessedCustomFee from "../token/AssessedCustomFee.js";
import TokenNftTransferMap from "../account/TokenNftTransferMap.js";
import TokenAssocation from "../token/TokenAssociation.js";
import PublicKey from "../PublicKey.js";
import HbarAllowance from "../account/HbarAllowance.js";
import TokenAllowance from "../account/TokenAllowance.js";
import TokenNftAllowance from "../account/TokenNftAllowance.js";
import * as proto from "@hashgraph/proto";
