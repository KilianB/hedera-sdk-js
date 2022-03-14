/**
 * @typedef {import("bignumber.js").default} BigNumber
 */
/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").ITransaction} proto.ITransaction
 * @typedef {import("@hashgraph/proto").ISignatureMap} proto.ISignatureMap
 * @typedef {import("@hashgraph/proto").ISignaturePair} proto.ISignaturePair
 * @typedef {import("@hashgraph/proto").ISignedTransaction} proto.ISignedTransaction
 * @typedef {import("@hashgraph/proto").ITransactionList} proto.ITransactionList
 * @typedef {import("@hashgraph/proto").ITransactionID} proto.ITransactionID
 * @typedef {import("@hashgraph/proto").IAccountID} proto.IAccountID
 * @typedef {import("@hashgraph/proto").ITransactionBody} proto.ITransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionResponse} proto.ITransactionResponse
 * @typedef {import("@hashgraph/proto").ResponseCodeEnum} proto.ResponseCodeEnum
 * @typedef {import("@hashgraph/proto").TransactionBody} proto.TransactionBody
 * @typedef {import("@hashgraph/proto").ISchedulableTransactionBody} proto.ISchedulableTransactionBody
 */
/**
 * @typedef {import("../schedule/ScheduleCreateTransaction.js").default} ScheduleCreateTransaction
 * @typedef {import("../PrivateKey.js").default} PrivateKey
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../client/Client.js").default<*, *>} Client
 */
export const DEFAULT_AUTO_RENEW_PERIOD: Long.Long;
export const DEFAULT_RECORD_THRESHOLD: Hbar;
export const CHUNK_SIZE: 1024;
/**
 * @type {Map<NonNullable<proto.TransactionBody["data"]>, (transactions: proto.ITransaction[], signedTransactions: proto.ISignedTransaction[], transactionIds: TransactionId[], nodeIds: AccountId[], bodies: proto.TransactionBody[]) => Transaction>}
 */
export const TRANSACTION_REGISTRY: Map<"contractCall" | "contractCreateInstance" | "contractUpdateInstance" | "contractDeleteInstance" | "cryptoAddLiveHash" | "cryptoAdjustAllowance" | "cryptoApproveAllowance" | "cryptoCreateAccount" | "cryptoDelete" | "cryptoDeleteLiveHash" | "cryptoTransfer" | "cryptoUpdateAccount" | "fileAppend" | "fileCreate" | "fileDelete" | "fileUpdate" | "systemDelete" | "systemUndelete" | "freeze" | "consensusCreateTopic" | "consensusUpdateTopic" | "consensusDeleteTopic" | "consensusSubmitMessage" | "uncheckedSubmit" | "tokenCreation" | "tokenFreeze" | "tokenUnfreeze" | "tokenGrantKyc" | "tokenRevokeKyc" | "tokenDeletion" | "tokenUpdate" | "tokenMint" | "tokenBurn" | "tokenWipe" | "tokenAssociate" | "tokenDissociate" | "tokenFeeScheduleUpdate" | "tokenPause" | "tokenUnpause" | "scheduleCreate" | "scheduleDelete" | "scheduleSign", (transactions: proto.ITransaction[], signedTransactions: proto.ISignedTransaction[], transactionIds: TransactionId[], nodeIds: AccountId[], bodies: proto.TransactionBody[]) => Transaction>;
/**
 * Base class for all transactions that may be submitted to Hedera.
 *
 * @abstract
 * @augments {Executable<proto.ITransaction, proto.ITransactionResponse, TransactionResponse>}
 */
export default class Transaction extends Executable<import("@hashgraph/proto/lib/proto").proto.ITransaction, import("@hashgraph/proto/lib/proto").proto.ITransactionResponse, TransactionResponse> {
    /**
     * @param {Uint8Array} bytes
     * @returns {Transaction}
     */
    static fromBytes(bytes: Uint8Array): Transaction;
    /**
     * @template {Transaction} TransactionT
     * @param {TransactionT} transaction
     * @param {proto.ITransaction[]} transactions
     * @param {proto.ISignedTransaction[]} signedTransactions
     * @param {TransactionId[]} transactionIds
     * @param {AccountId[]} nodeIds
     * @param {proto.ITransactionBody[]} bodies
     * @returns {TransactionT}
     */
    static _fromProtobufTransactions<TransactionT extends Transaction>(transaction: TransactionT, transactions: proto.ITransaction[], signedTransactions: proto.ISignedTransaction[], transactionIds: TransactionId[], nodeIds: AccountId[], bodies: proto.ITransactionBody[]): TransactionT;
    constructor();
    /**
     * List of proto transactions that have been built from this SDK
     * transaction. Each one should share the same transaction ID.
     *
     * @internal
     * @type {List<proto.ITransaction | null>}
     */
    _transactions: List<proto.ITransaction | null>;
    /**
     * List of proto transactions that have been built from this SDK
     * transaction. Each one should share the same transaction ID.
     *
     * @internal
     * @type {List<proto.ISignedTransaction>}
     */
    _signedTransactions: List<proto.ISignedTransaction>;
    /**
     * Set of public keys (as string) who have signed this transaction so
     * we do not allow them to sign it again.
     *
     * @internal
     * @type {Set<string>}
     */
    _signerPublicKeys: Set<string>;
    /**
     * @protected
     * @type {number}
     */
    protected _nextTransactionIndex: number;
    /**
     * @private
     * @type {number}
     */
    private _transactionValidDuration;
    /**
     * @protected
     * @type {Hbar}
     */
    protected _defaultMaxTransactionFee: Hbar;
    /**
     * @private
     * @type {Hbar | null}
     */
    private _maxTransactionFee;
    /**
     * @private
     * @type {string}
     */
    private _transactionMemo;
    /**
     * @protected
     * @type {List<TransactionId>}
     */
    protected _transactionIds: List<TransactionId>;
    /**
     * @private
     * @type {AccountId | null}
     */
    private _operatorAccountId;
    /**
     * @private
     * @type {PublicKey[]}
     */
    private _publicKeys;
    /**
     * @private
     * @type {(((message: Uint8Array) => Promise<Uint8Array>) | null)[]}
     */
    private _transactionSigners;
    /**
     * @private
     * @type {?boolean}
     */
    private _regenerateTransactionId;
    /**
     * @returns {ScheduleCreateTransaction}
     */
    schedule(): ScheduleCreateTransaction;
    /**
     * @override
     * @param {AccountId[]} nodeIds
     * @returns {this}
     */
    override setNodeAccountIds(nodeIds: AccountId[]): this;
    /**
     * @returns {number}
     */
    get transactionValidDuration(): number;
    /**
     * Sets the duration (in seconds) that this transaction is valid for.
     *
     * This is defaulted to 120 seconds (from the time its executed).
     *
     * @param {number} validDuration
     * @returns {this}
     */
    setTransactionValidDuration(validDuration: number): this;
    /**
     * @returns {?Hbar}
     */
    get maxTransactionFee(): Hbar | null;
    /**
     * Set the maximum transaction fee the operator (paying account)
     * is willing to pay.
     *
     * @param {number | string | Long | BigNumber | Hbar} maxTransactionFee
     * @returns {this}
     */
    setMaxTransactionFee(maxTransactionFee: number | string | Long | BigNumber | Hbar): this;
    /**
     * @returns {?boolean}
     */
    get regenerateTransactionId(): boolean | null;
    /**
     * Set the maximum transaction fee the operator (paying account)
     * is willing to pay.
     *
     * @param {boolean} regenerateTransactionId
     * @returns {this}
     */
    setRegenerateTransactionId(regenerateTransactionId: boolean): this;
    /**
     * @returns {string}
     */
    get transactionMemo(): string;
    /**
     * Set a note or description to be recorded in the transaction
     * record (maximum length of 100 bytes).
     *
     * @param {string} transactionMemo
     * @returns {this}
     */
    setTransactionMemo(transactionMemo: string): this;
    /**
     * @returns {TransactionId}
     */
    get transactionId(): TransactionId;
    /**
     * Set the ID for this transaction.
     *
     * The transaction ID includes the operator's account ( the account paying the transaction
     * fee). If two transactions have the same transaction ID, they won't both have an effect. One
     * will complete normally and the other will fail with a duplicate transaction status.
     *
     * Normally, you should not use this method. Just before a transaction is executed, a
     * transaction ID will be generated from the operator on the client.
     *
     * @param {TransactionId} transactionId
     * @returns {this}
     */
    setTransactionId(transactionId: TransactionId): this;
    /**
     * @param {PrivateKey} privateKey
     * @returns {Promise<this>}
     */
    sign(privateKey: PrivateKey): Promise<Transaction>;
    /**
     * @param {PublicKey} publicKey
     * @param {(message: Uint8Array) => Promise<Uint8Array>} transactionSigner
     * @returns {Promise<this>}
     */
    signWith(publicKey: PublicKey, transactionSigner: (message: Uint8Array) => Promise<Uint8Array>): Promise<Transaction>;
    /**
     * @param {import("../client/Client.js").default<Channel, *>} client
     * @returns {Promise<this>}
     */
    signWithOperator(client: import("../client/Client.js").default<Channel, any>): Promise<Transaction>;
    /**
     * @param {PublicKey} publicKey
     * @param {Uint8Array} signature
     * @returns {this}
     */
    addSignature(publicKey: PublicKey, signature: Uint8Array): this;
    /**
     * @returns {SignatureMap}
     */
    getSignatures(): SignatureMap;
    /**
     * @returns {Promise<SignatureMap>}
     */
    getSignaturesAsync(): Promise<SignatureMap>;
    _setTransactionId(): void;
    /**
     * @param {?import("../client/Client.js").default<Channel, *>} client
     */
    _setNodeAccountIds(client: import("../client/Client.js").default<Channel, any> | null): void;
    _buildSignedTransactions(): void;
    /**
     * Freeze this transaction from future modification to prepare for
     * signing or serialization.
     *
     * @returns {this}
     */
    freeze(): this;
    /**
     * Freeze this transaction from further modification to prepare for
     * signing or serialization.
     *
     * Will use the `Client`, if available, to generate a default Transaction ID and select 1/3
     * nodes to prepare this transaction for.
     *
     * @param {?import("../client/Client.js").default<Channel, *>} client
     * @returns {this}
     */
    freezeWith(client: import("../client/Client.js").default<Channel, any> | null): this;
    /**
     * Will error if sign-on-demand is enabled
     *
     * @returns {Uint8Array}
     */
    toBytes(): Uint8Array;
    /**
     * @returns {Promise<Uint8Array>}
     */
    toBytesAsync(): Promise<Uint8Array>;
    /**
     * @returns {Promise<Uint8Array>}
     */
    getTransactionHash(): Promise<Uint8Array>;
    /**
     * @returns {Promise<TransactionHashMap>}
     */
    getTransactionHashPerNode(): Promise<TransactionHashMap>;
    isFrozen(): boolean;
    /**
     * @param {Client} client
     */
    _validateChecksums(client: import("../client/Client.js").default<any, any>): void;
    /**
     * @internal
     * @returns {Promise<proto.ISignedTransaction>}
     */
    _signTransaction(): Promise<proto.ISignedTransaction>;
    _buildNewTransactionIdList(): void;
    _buildAllTransactions(): void;
    _buildAllTransactionsAsync(): Promise<void>;
    /**
     * @internal
     * @param {number} index
     */
    _buildTransaction(index: number): void;
    /**
     * @internal
     * @returns {Promise<proto.ITransaction>}
     */
    _buildTransactionAsync(): Promise<proto.ITransaction>;
    /**
     * @internal
     * @param {?AccountId} nodeId
     * @returns {proto.ISignedTransaction}
     */
    _makeSignedTransaction(nodeId: AccountId | null): proto.ISignedTransaction;
    /**
     * @private
     * @param {?AccountId} nodeId
     * @returns {proto.ITransactionBody}
     */
    private _makeTransactionBody;
    /**
     * @abstract
     * @protected
     * @returns {NonNullable<proto.TransactionBody["data"]>}
     */
    protected _getTransactionDataCase(): NonNullable<proto.TransactionBody["data"]>;
    /**
     * @internal
     * @returns {proto.ISchedulableTransactionBody}
     */
    _getScheduledTransactionBody(): proto.ISchedulableTransactionBody;
    /**
     * @abstract
     * @protected
     * @returns {object}
     */
    protected _makeTransactionData(): object;
    /**
     * @protected
     * @returns {boolean}
     */
    protected _isFrozen(): boolean;
    /**
     * @internal
     */
    _requireNotFrozen(): void;
    /**
     * @internal
     */
    _requireNotSignOnDemand(): void;
    /**
     * @internal
     */
    _requireFrozen(): void;
    /**
     * @internal
     * @protected
     */
    protected _requireOneNodeAccountId(): void;
}
/**
 * @type {(() => ScheduleCreateTransaction)[]}
 */
export const SCHEDULE_CREATE_TRANSACTION: (() => ScheduleCreateTransaction)[];
export type BigNumber = import("bignumber.js").default;
export namespace proto {
    type ITransaction = import("@hashgraph/proto").ITransaction;
    type ISignatureMap = import("@hashgraph/proto").ISignatureMap;
    type ISignaturePair = import("@hashgraph/proto").ISignaturePair;
    type ISignedTransaction = import("@hashgraph/proto").ISignedTransaction;
    type ITransactionList = import("@hashgraph/proto").ITransactionList;
    type ITransactionID = import("@hashgraph/proto").ITransactionID;
    type IAccountID = import("@hashgraph/proto").IAccountID;
    type ITransactionBody = import("@hashgraph/proto").ITransactionBody;
    type ITransactionResponse = import("@hashgraph/proto").ITransactionResponse;
    type ResponseCodeEnum = import("@hashgraph/proto").ResponseCodeEnum;
    type TransactionBody = import("@hashgraph/proto").TransactionBody;
    type ISchedulableTransactionBody = import("@hashgraph/proto").ISchedulableTransactionBody;
}
export type ScheduleCreateTransaction = import("../schedule/ScheduleCreateTransaction.js").default;
export type PrivateKey = import("../PrivateKey.js").default;
export type Channel = import("../channel/Channel.js").default;
export type Client = import("../client/Client.js").default<any, any>;
import Long from "long";
import Hbar from "../Hbar.js";
import TransactionId from "./TransactionId.js";
import AccountId from "../account/AccountId.js";
import TransactionResponse from "./TransactionResponse.js";
import Executable from "../Executable.js";
import List from "./List.js";
import PublicKey from "../PublicKey.js";
import SignatureMap from "./SignatureMap.js";
import TransactionHashMap from "./TransactionHashMap.js";
