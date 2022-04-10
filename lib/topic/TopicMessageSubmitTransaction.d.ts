/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").IConsensusSubmitMessageTransactionBody} proto.IConsensusSubmitMessageTransactionBody
 * @typedef {import("@hashgraph/proto").ITransaction} proto.ITransaction
 * @typedef {import("@hashgraph/proto").ISignedTransaction} proto.ISignedTransaction
 * @typedef {import("@hashgraph/proto").TransactionBody} proto.TransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionBody} proto.ITransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionResponse} proto.ITransactionResponse
 * @typedef {import("@hashgraph/proto").IConsensusMessageChunkInfo} proto.IConsensusMessageChunkInfo
 */
/**
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../account/AccountId.js").default} AccountId
 * @typedef {import("../transaction/TransactionResponse.js").default} TransactionResponse
 * @typedef {import("../schedule/ScheduleCreateTransaction.js").default} ScheduleCreateTransaction
 */
export default class TopicMessageSubmitTransaction extends Transaction {
    /**
     * @internal
     * @param {proto.ITransaction[]} transactions
     * @param {proto.ISignedTransaction[]} signedTransactions
     * @param {TransactionId[]} transactionIds
     * @param {AccountId[]} nodeIds
     * @param {proto.ITransactionBody[]} bodies
     * @returns {TopicMessageSubmitTransaction}
     */
    static _fromProtobuf(transactions: proto.ITransaction[], signedTransactions: proto.ISignedTransaction[], transactionIds: TransactionId[], nodeIds: AccountId[], bodies: proto.ITransactionBody[]): TopicMessageSubmitTransaction;
    /**
     * @param {object} props
     * @param {TopicId | string} [props.topicId]
     * @param {Uint8Array | string} [props.message]
     * @param {number} [props.maxChunks]
     * @param {number} [props.chunkSize]
     */
    constructor(props?: {
        topicId?: string | TopicId | undefined;
        message?: string | Uint8Array | undefined;
        maxChunks?: number | undefined;
        chunkSize?: number | undefined;
    });
    /**
     * @private
     * @type {?TopicId}
     */
    private _topicId;
    /**
     * @private
     * @type {?Uint8Array}
     */
    private _message;
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
    /** @type {proto.IConsensusMessageChunkInfo | null} */
    _chunkInfo: proto.IConsensusMessageChunkInfo | null;
    /**
     * @returns {?TopicId}
     */
    get topicId(): TopicId | null;
    /**
     * @param {TopicId | string} topicId
     * @returns {this}
     */
    setTopicId(topicId: TopicId | string): this;
    /**
     * @returns {?Uint8Array}
     */
    get message(): Uint8Array | null;
    /**
     * @param {string | Uint8Array} message
     * @returns {this}
     */
    setMessage(message: string | Uint8Array): this;
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
     * @param {import("../client/Client.js").default<Channel, *>} client
     * @param {number=} requestTimeout
     * @returns {Promise<TransactionResponse[]>}
     */
    executeAll(client: import("../client/Client.js").default<Channel, any>, requestTimeout?: number | undefined): Promise<TransactionResponse[]>;
}
export namespace proto {
    type IConsensusSubmitMessageTransactionBody = import("@hashgraph/proto").IConsensusSubmitMessageTransactionBody;
    type ITransaction = import("@hashgraph/proto").ITransaction;
    type ISignedTransaction = import("@hashgraph/proto").ISignedTransaction;
    type TransactionBody = import("@hashgraph/proto").TransactionBody;
    type ITransactionBody = import("@hashgraph/proto").ITransactionBody;
    type ITransactionResponse = import("@hashgraph/proto").ITransactionResponse;
    type IConsensusMessageChunkInfo = import("@hashgraph/proto").IConsensusMessageChunkInfo;
}
export type Channel = import("../channel/Channel.js").default;
export type AccountId = import("../account/AccountId.js").default;
export type TransactionResponse = import("../transaction/TransactionResponse.js").default;
export type ScheduleCreateTransaction = import("../schedule/ScheduleCreateTransaction.js").default;
import Transaction from "../transaction/Transaction.js";
import TopicId from "./TopicId.js";
import TransactionId from "../transaction/TransactionId.js";