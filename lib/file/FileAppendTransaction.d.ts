/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").ITransaction} proto.ITransaction
 * @typedef {import("@hashgraph/proto").ISignedTransaction} proto.ISignedTransaction
 * @typedef {import("@hashgraph/proto").TransactionBody} proto.TransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionBody} proto.ITransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionResponse} proto.ITransactionResponse
 * @typedef {import("@hashgraph/proto").IFileAppendTransactionBody} proto.IFileAppendTransactionBody
 * @typedef {import("@hashgraph/proto").IFileID} proto.IFileID
 */
/**
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../client/Client.js").default<Channel, *>} Client
 * @typedef {import("../account/AccountId.js").default} AccountId
 * @typedef {import("../transaction/TransactionResponse.js").default} TransactionResponse
 * @typedef {import("../schedule/ScheduleCreateTransaction.js").default} ScheduleCreateTransaction
 */
/**
 * A transaction specifically to append data to a file on the network.
 *
 * If a file has multiple keys, all keys must sign to modify its contents.
 */
export default class FileAppendTransaction extends Transaction {
    /**
     * @internal
     * @param {proto.ITransaction[]} transactions
     * @param {proto.ISignedTransaction[]} signedTransactions
     * @param {TransactionId[]} transactionIds
     * @param {AccountId[]} nodeIds
     * @param {proto.ITransactionBody[]} bodies
     * @returns {FileAppendTransaction}
     */
    static _fromProtobuf(transactions: proto.ITransaction[], signedTransactions: proto.ISignedTransaction[], transactionIds: TransactionId[], nodeIds: AccountId[], bodies: proto.ITransactionBody[]): FileAppendTransaction;
    /**
     * @param {object} [props]
     * @param {FileId | string} [props.fileId]
     * @param {Uint8Array | string} [props.contents]
     * @param {number} [props.maxChunks]
     * @param {number} [props.chunkSize]
     */
    constructor(props?: {
        fileId?: string | FileId | undefined;
        contents?: string | Uint8Array | undefined;
        maxChunks?: number | undefined;
        chunkSize?: number | undefined;
    } | undefined);
    /**
     * @private
     * @type {?FileId}
     */
    private _fileId;
    /**
     * @private
     * @type {?Uint8Array}
     */
    private _contents;
    /**
     * @private
     * @type {number}
     */
    private _maxChunks;
    /**
     * @private
     * @type {number}
     */
    private _chunkSize;
    /** @type {number} */
    _startIndex: number;
    /**
     * @param {TransactionId} transactionId
     * @returns {this}
     */
    setTransactionId(transactionId: TransactionId): this;
    /**
     * @returns {?FileId}
     */
    get fileId(): FileId | null;
    /**
     * Set the keys which must sign any transactions modifying this file. Required.
     *
     * All keys must sign to modify the file's contents or keys. No key is required
     * to sign for extending the expiration time (except the one for the operator account
     * paying for the transaction). Only one key must sign to delete the file, however.
     *
     * To require more than one key to sign to delete a file, add them to a
     * KeyList and pass that here.
     *
     * The network currently requires a file to have at least one key (or key list or threshold key)
     * but this requirement may be lifted in the future.
     *
     * @param {FileId | string} fileId
     * @returns {this}
     */
    setFileId(fileId: FileId | string): this;
    /**
     * @returns {?Uint8Array}
     */
    get contents(): Uint8Array | null;
    /**
     * Set the given byte array as the file's contents.
     *
     * This may be omitted to append an empty file.
     *
     * Note that total size for a given transaction is limited to 6KiB (as of March 2020) by the
     * network; if you exceed this you may receive a HederaPreCheckStatusException
     * with Status#TransactionOversize.
     *
     * In this case, you will need to break the data into chunks of less than ~6KiB and execute this
     * transaction with the first chunk and then use FileAppendTransaction with
     * FileAppendTransaction#setContents(Uint8Array) for the remaining chunks.
     *
     * @param {Uint8Array | string} contents
     * @returns {this}
     */
    setContents(contents: Uint8Array | string): this;
    /**
     * @returns {?number}
     */
    get maxChunks(): number | null;
    /**
     * @param {number} maxChunks
     * @returns {this}
     */
    setMaxChunks(maxChunks: number): this;
    /**
     * @returns {?number}
     */
    get chunkSize(): number | null;
    /**
     * @param {number} chunkSize
     * @returns {this}
     */
    setChunkSize(chunkSize: number): this;
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
     * @param {import("../client/Client.js").default<Channel, *>} client
     * @param {number=} requestTimeout
     * @returns {Promise<TransactionResponse>}
     */
    execute(client: import("../client/Client.js").default<Channel, any>, requestTimeout?: number | undefined): Promise<TransactionResponse>;
    /**
     * @param {import("../client/Client.js").default<Channel, *>} client
     * @param {number=} requestTimeout
     * @returns {Promise<TransactionResponse[]>}
     */
    executeAll(client: import("../client/Client.js").default<Channel, any>, requestTimeout?: number | undefined): Promise<TransactionResponse[]>;
    /**
     * @param {Client} client
     */
    _validateChecksums(client: import("../client/Client.js").default<import("../channel/Channel.js").default, any>): void;
    /**
     * @override
     * @protected
     * @returns {proto.IFileAppendTransactionBody}
     */
    protected override _makeTransactionData(): proto.IFileAppendTransactionBody;
}
export namespace proto {
    type ITransaction = import("@hashgraph/proto").ITransaction;
    type ISignedTransaction = import("@hashgraph/proto").ISignedTransaction;
    type TransactionBody = import("@hashgraph/proto").TransactionBody;
    type ITransactionBody = import("@hashgraph/proto").ITransactionBody;
    type ITransactionResponse = import("@hashgraph/proto").ITransactionResponse;
    type IFileAppendTransactionBody = import("@hashgraph/proto").IFileAppendTransactionBody;
    type IFileID = import("@hashgraph/proto").IFileID;
}
export type Channel = import("../channel/Channel.js").default;
export type Client = import("../client/Client.js").default<Channel, any>;
export type AccountId = import("../account/AccountId.js").default;
export type TransactionResponse = import("../transaction/TransactionResponse.js").default;
export type ScheduleCreateTransaction = import("../schedule/ScheduleCreateTransaction.js").default;
import Transaction from "../transaction/Transaction.js";
import TransactionId from "../transaction/TransactionId.js";
import FileId from "./FileId.js";
