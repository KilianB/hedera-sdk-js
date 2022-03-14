export type ExecutionState = string;
export namespace ExecutionState {
    const Finished: string;
    const Retry: string;
    const Error: string;
}
export const RST_STREAM: RegExp;
/**
 * @abstract
 * @internal
 * @template RequestT
 * @template ResponseT
 * @template OutputT
 */
export default class Executable<RequestT, ResponseT, OutputT> {
    /**
     * The number of times we can retry the grpc call
     *
     * @private
     * @type {number}
     */
    private _maxAttempts;
    /**
     * The index of the next transaction to be executed.
     *
     * @protected
     * @type {number}
     */
    protected _nextNodeAccountIdIndex: number;
    /**
     * List of node account IDs for each transaction that has been
     * built.
     *
     * @internal
     * @type {List<AccountId>}
     */
    _nodeAccountIds: List<AccountId>;
    _signOnDemand: boolean;
    /** @type {number | null} */
    _minBackoff: number | null;
    /** @type {number | null} */
    _maxBackoff: number | null;
    /**
     * @type {ClientOperator | null}
     */
    _operator: ClientOperator | null;
    /** @type {number | null} */
    _requestTimeout: number | null;
    _grpcDeadline: number | null;
    /**
     * @returns {?AccountId[]}
     */
    get nodeAccountIds(): import("./account/AccountId.js").default[] | null;
    /**
     * @param {AccountId[]} nodeIds
     * @returns {this}
     */
    setNodeAccountIds(nodeIds: AccountId[]): this;
    /**
     * @deprecated
     * @returns {number}
     */
    get maxRetries(): number;
    /**
     * @param {number} maxRetries
     * @returns {this}
     */
    setMaxRetries(maxRetries: number): this;
    /**
     * @returns {number}
     */
    get maxAttempts(): number;
    /**
     * @param {number} maxAttempts
     * @returns {this}
     */
    setMaxAttempts(maxAttempts: number): this;
    /**
     * @returns {?number}
     */
    get grpcDeadline(): number | null;
    /**
     * @param {number} grpcDeadline
     * @returns {this}
     */
    setGrpcDeadline(grpcDeadline: number): this;
    /**
     * @param {number} minBackoff
     * @returns {this}
     */
    setMinBackoff(minBackoff: number): this;
    /**
     * @returns {number | null}
     */
    get minBackoff(): number | null;
    /**
     * @param {?number} maxBackoff
     * @returns {this}
     */
    setMaxBackoff(maxBackoff: number | null): this;
    /**
     * @returns {number | null}
     */
    get maxBackoff(): number | null;
    /**
     * @abstract
     * @protected
     * @param {import("./client/Client.js").default<Channel, *>} client
     * @returns {Promise<void>}
     */
    protected _beforeExecute(client: import("./client/Client.js").default<Channel, any>): Promise<void>;
    /**
     * @abstract
     * @protected
     * @returns {Promise<RequestT>}
     */
    protected _makeRequestAsync(): Promise<RequestT>;
    /**
     * @abstract
     * @internal
     * @param {RequestT} request
     * @param {ResponseT} response
     * @returns {Error}
     */
    _mapStatusError(request: RequestT, response: ResponseT): Error;
    /**
     * @abstract
     * @protected
     * @param {ResponseT} response
     * @param {AccountId} nodeAccountId
     * @param {RequestT} request
     * @returns {Promise<OutputT>}
     */
    protected _mapResponse(response: ResponseT, nodeAccountId: AccountId, request: RequestT): Promise<OutputT>;
    /**
     * @abstract
     * @internal
     * @param {Channel} channel
     * @param {RequestT} request
     * @returns {Promise<ResponseT>}
     */
    _execute(channel: Channel, request: RequestT): Promise<ResponseT>;
    /**
     * @abstract
     * @protected
     * @returns {AccountId}
     */
    protected _getNodeAccountId(): AccountId;
    /**
     * @abstract
     * @protected
     * @returns {TransactionId}
     */
    protected _getTransactionId(): TransactionId;
    /**
     * @protected
     * @returns {void}
     */
    protected _advanceRequest(): void;
    /**
     * @abstract
     * @protected
     * @param {RequestT} request
     * @param {ResponseT} response
     * @returns {ExecutionState}
     */
    protected _shouldRetry(request: RequestT, response: ResponseT): ExecutionState;
    /**
     * @protected
     * @param {GrpcServiceError} error
     * @returns {boolean}
     */
    protected _shouldRetryExceptionally(error: GrpcServiceError): boolean;
    /**
     * @template {Channel} ChannelT
     * @template MirrorChannelT
     * @param {import("./client/Client.js").default<ChannelT, MirrorChannelT>} client
     * @param {number=} requestTimeout
     * @returns {Promise<OutputT>}
     */
    execute<ChannelT extends import("./channel/Channel.js").default, MirrorChannelT>(client: import("./client/Client.js").default<ChannelT, MirrorChannelT>, requestTimeout?: number | undefined): Promise<OutputT>;
}
export type AccountId = import("./account/AccountId.js").default;
export type Channel = import("./channel/Channel.js").default;
export type TransactionId = import("./transaction/TransactionId.js").default;
export type ClientOperator = import("./client/Client.js").ClientOperator;
import List from "./transaction/List.js";
import GrpcServiceError from "./grpc/GrpcServiceError.js";
