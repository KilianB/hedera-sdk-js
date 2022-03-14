/**
 * @param {TransactionId} paymentTransactionId
 * @param {AccountId} nodeId
 * @param {?ClientOperator} operator
 * @param {Hbar} paymentAmount
 * @returns {Promise<proto.ITransaction>}
 */
export function _makePaymentTransaction(paymentTransactionId: TransactionId, nodeId: AccountId, operator: ClientOperator | null, paymentAmount: Hbar): Promise<proto.ITransaction>;
/**
 * @typedef {import("../channel/Channel.js").default} Channel
 */
/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").IQuery} proto.IQuery
 * @typedef {import("@hashgraph/proto").IQueryHeader} proto.IQueryHeader
 * @typedef {import("@hashgraph/proto").ITransaction} proto.ITransaction
 * @typedef {import("@hashgraph/proto").ISignedTransaction} proto.ISignedTransaction
 * @typedef {import("@hashgraph/proto").IResponse} proto.IResponse
 * @typedef {import("@hashgraph/proto").IResponseHeader} proto.IResponseHeader
 * @typedef {import("@hashgraph/proto").ITransactionBody} proto.ITransactionBody
 * @typedef {import("@hashgraph/proto").ResponseCodeEnum} proto.ResponseCodeEnum
 */
/**
 * @typedef {import("../client/Client.js").ClientOperator} ClientOperator
 * @typedef {import("../client/Client.js").default<*, *>} Client
 */
/**
 * @type {Map<ProtoQuery["query"], (query: proto.IQuery) => Query<*>>}
 */
export const QUERY_REGISTRY: Map<"getByKey" | "getBySolidityID" | "contractCallLocal" | "contractGetInfo" | "contractGetBytecode" | "ContractGetRecords" | "cryptogetAccountBalance" | "cryptoGetAccountRecords" | "cryptoGetInfo" | "cryptoGetLiveHash" | "cryptoGetProxyStakers" | "fileGetContents" | "fileGetInfo" | "transactionGetReceipt" | "transactionGetRecord" | "transactionGetFastRecord" | "consensusGetTopicInfo" | "networkGetVersionInfo" | "tokenGetInfo" | "scheduleGetInfo" | "tokenGetAccountNftInfos" | "tokenGetNftInfo" | "tokenGetNftInfos" | "networkGetExecutionTime" | undefined, (query: proto.IQuery) => Query<any>>;
/**
 * Base class for all queries that can be submitted to Hedera.
 *
 * @abstract
 * @template OutputT
 * @augments {Executable<proto.IQuery, proto.IResponse, OutputT>}
 */
export default class Query<OutputT> extends Executable<import("@hashgraph/proto/lib/proto").proto.IQuery, import("@hashgraph/proto/lib/proto").proto.IResponse, OutputT> {
    /**
     * @template T
     * @param {Uint8Array} bytes
     * @returns {Query<T>}
     */
    static fromBytes<T>(bytes: Uint8Array): Query<T>;
    constructor();
    /** @type {?TransactionId} */
    _paymentTransactionId: TransactionId | null;
    /** @type {proto.ITransaction[]} */
    _paymentTransactions: proto.ITransaction[];
    /** @type {?Hbar} */
    _queryPayment: Hbar | null;
    /** @type {?Hbar} */
    _maxQueryPayment: Hbar | null;
    /**
     * @returns {Uint8Array}
     */
    toBytes(): Uint8Array;
    /**
     * Set an explicit payment amount for this query.
     *
     * The client will submit exactly this amount for the payment of this query. Hedera
     * will not return any remainder.
     *
     * @param {Hbar} queryPayment
     * @returns {this}
     */
    setQueryPayment(queryPayment: Hbar): this;
    /**
     * Set the maximum payment allowable for this query.
     *
     * @param {Hbar} maxQueryPayment
     * @returns {this}
     */
    setMaxQueryPayment(maxQueryPayment: Hbar): this;
    /**
     * @param {import("../client/Client.js").default<Channel, *>} client
     * @returns {Promise<Hbar>}
     */
    getCost(client: import("../client/Client.js").default<Channel, any>): Promise<Hbar>;
    /**
     * @param {TransactionId} paymentTransactionId
     * @returns {this}
     */
    setPaymentTransactionId(paymentTransactionId: TransactionId): this;
    /**
     * @returns {?TransactionId}
     */
    get paymentTransactionId(): TransactionId | null;
    /**
     * @protected
     * @returns {boolean}
     */
    protected _isPaymentRequired(): boolean;
    /**
     * @param {Client} client
     */
    _validateChecksums(client: import("../client/Client.js").default<any, any>): void;
    /**
     * @template MirrorChannelT
     * @param {import("../client/Client.js").default<Channel, MirrorChannelT>} client
     * @returns {Promise<void>}
     */
    _beforeExecute<MirrorChannelT>(client: import("../client/Client.js").default<import("../channel/Channel.js").default, MirrorChannelT>): Promise<void>;
    /**
     * @abstract
     * @internal
     * @param {proto.IResponse} response
     * @returns {proto.IResponseHeader}
     */
    _mapResponseHeader(response: proto.IResponse): proto.IResponseHeader;
    /**
     * @protected
     * @returns {proto.IQueryHeader}
     */
    protected _makeRequestHeader(): proto.IQueryHeader;
    /**
     * @abstract
     * @internal
     * @param {proto.IQueryHeader} header
     * @returns {proto.IQuery}
     */
    _onMakeRequest(header: proto.IQueryHeader): proto.IQuery;
    /**
     * @internal
     * @returns {proto.IQuery}
     */
    _makeRequest(): proto.IQuery;
}
/**
 * @type {((query: Query<*>) => import("./CostQuery.js").default<*>)[]}
 */
export const COST_QUERY: ((query: Query<any>) => import("./CostQuery.js").default<any>)[];
export type Channel = import("../channel/Channel.js").default;
export namespace proto {
    type IQuery = import("@hashgraph/proto").IQuery;
    type IQueryHeader = import("@hashgraph/proto").IQueryHeader;
    type ITransaction = import("@hashgraph/proto").ITransaction;
    type ISignedTransaction = import("@hashgraph/proto").ISignedTransaction;
    type IResponse = import("@hashgraph/proto").IResponse;
    type IResponseHeader = import("@hashgraph/proto").IResponseHeader;
    type ITransactionBody = import("@hashgraph/proto").ITransactionBody;
    type ResponseCodeEnum = import("@hashgraph/proto").ResponseCodeEnum;
}
export type ClientOperator = import("../client/Client.js").ClientOperator;
export type Client = import("../client/Client.js").default<any, any>;
import TransactionId from "../transaction/TransactionId.js";
import AccountId from "../account/AccountId.js";
import Hbar from "../Hbar.js";
import { Query as ProtoQuery } from "@hashgraph/proto";
import Executable from "../Executable.js";
