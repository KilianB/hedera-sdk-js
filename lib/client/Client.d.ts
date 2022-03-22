/**
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../channel/MirrorChannel.js").default} MirrorChannel
 */
/**
 * @typedef {object} Operator
 * @property {string | PrivateKey} privateKey
 * @property {string | AccountId} accountId
 */
/**
 * @typedef {object} ClientOperator
 * @property {PublicKey} publicKey
 * @property {AccountId} accountId
 * @property {(message: Uint8Array) => Promise<Uint8Array>} transactionSigner
 */
/**
 * @typedef {object} ClientConfiguration
 * @property {{[key: string]: (string | AccountId)} | string} network
 * @property {string[] | string} [mirrorNetwork]
 * @property {Operator} [operator]
 */
/**
 * @typedef {"mainnet" | "testnet" | "previewnet"} NetworkName
 */
/**
 * @abstract
 * @template {Channel} ChannelT
 * @template {MirrorChannel} MirrorChannelT
 */
export default class Client<ChannelT extends import("../channel/Channel.js").default, MirrorChannelT extends import("../channel/MirrorChannel.js").default> {
    /**
     * @protected
     * @hideconstructor
     * @param {ClientConfiguration} [props]
     */
    protected constructor();
    /**
     * List of mirror network URLs.
     *
     * @internal
     * @type {MirrorNetwork}
     */
    _mirrorNetwork: MirrorNetwork;
    /**
     * Map of node account ID (as a string)
     * to the node URL.
     *
     * @internal
     * @type {Network}
     */
    _network: Network;
    /**
     * @internal
     * @type {?ClientOperator}
     */
    _operator: ClientOperator | null;
    /**
     * @private
     * @type {?Hbar}
     */
    private _defaultMaxTransactionFee;
    /**
     * @private
     * @type {Hbar}
     */
    private _maxQueryPayment;
    _signOnDemand: boolean;
    _autoValidateChecksums: boolean;
    /** @type {number | null} */
    _maxAttempts: number | null;
    /** @type {number} */
    _minBackoff: number;
    /** @type {number} */
    _maxBackoff: number;
    _defaultRegenerateTransactionId: boolean;
    _requestTimeout: number | null;
    /**
     * @deprecated
     * @param {NetworkName} networkName
     * @returns {this}
     */
    setNetworkName(networkName: NetworkName): this;
    /**
     * @deprecated
     * @returns {string | null}
     */
    get networkName(): string | null;
    /**
     * @param {string|LedgerId} ledgerId
     * @returns {this}
     */
    setLedgerId(ledgerId: string | LedgerId): this;
    /**
     * @returns {LedgerId | null}
     */
    get ledgerId(): LedgerId | null;
    /**
     * @param {{[key: string]: (string | AccountId)} | string} network
     * @returns {void}
     */
    setNetwork(network: string | {
        [key: string]: string | AccountId;
    }): void;
    /**
     * @returns {{[key: string]: (string | AccountId)}}
     */
    get network(): {
        [key: string]: string | AccountId;
    };
    /**
     * @param {string[] | string} mirrorNetwork
     * @returns {void}
     */
    setMirrorNetwork(mirrorNetwork: string[] | string): void;
    /**
     * @returns {string[]}
     */
    get mirrorNetwork(): string[];
    /**
     * @returns {boolean}
     */
    get signOnDemand(): boolean;
    /**
     * @param {boolean} signOnDemand
     */
    setSignOnDemand(signOnDemand: boolean): void;
    /**
     * @returns {boolean}
     */
    isTransportSecurity(): boolean;
    /**
     * @param {boolean} transportSecurity
     * @returns {this}
     */
    setTransportSecurity(transportSecurity: boolean): this;
    /**
     * Set the account that will, by default, pay for transactions and queries built with this client.
     *
     * @param {AccountId | string} accountId
     * @param {PrivateKey | string} privateKey
     * @returns {this}
     */
    setOperator(accountId: AccountId | string, privateKey: PrivateKey | string): this;
    /**
     * Sets the account that will, by default, pay for transactions and queries built with
     * this client.
     *
     * @param {AccountId | string} accountId
     * @param {PublicKey | string} publicKey
     * @param {(message: Uint8Array) => Promise<Uint8Array>} transactionSigner
     * @returns {this}
     */
    setOperatorWith(accountId: AccountId | string, publicKey: PublicKey | string, transactionSigner: (message: Uint8Array) => Promise<Uint8Array>): this;
    /**
     * @param {boolean} value
     * @returns {this}
     */
    setAutoValidateChecksums(value: boolean): this;
    /**
     * @returns {boolean}
     */
    isAutoValidateChecksumsEnabled(): boolean;
    /**
     * @returns {?AccountId}
     */
    get operatorAccountId(): AccountId | null;
    /**
     * @returns {?PublicKey}
     */
    get operatorPublicKey(): PublicKey | null;
    /**
     * @deprecated - Use `defaultMaxTransactionFee` instead
     * @returns {?Hbar}
     */
    get maxTransactionFee(): Hbar | null;
    /**
     * @deprecated - Use `setDefaultMaxTransactionFee()` instead
     * Set the maximum fee to be paid for transactions
     * executed by this client.
     * @param {Hbar} maxTransactionFee
     * @returns {this}
     */
    setMaxTransactionFee(maxTransactionFee: Hbar): this;
    /**
     * @returns {?Hbar}
     */
    get defaultMaxTransactionFee(): Hbar | null;
    /**
     * Set the defaultimum fee to be paid for transactions
     * executed by this client.
     *
     * @param {Hbar} defaultMaxTransactionFee
     * @returns {this}
     */
    setDefaultMaxTransactionFee(defaultMaxTransactionFee: Hbar): this;
    /**
     * @returns {boolean}
     */
    get defaultRegenerateTransactionId(): boolean;
    /**
     * Set if a new transaction ID should be generated when a `TRANSACTION_EXPIRED` status
     * is returned.
     *
     * @param {boolean} defaultRegenerateTransactionId
     * @returns {this}
     */
    setDefaultRegenerateTransactionId(defaultRegenerateTransactionId: boolean): this;
    /**
     * @returns {Hbar}
     */
    get maxQueryPayment(): Hbar;
    /**
     * Set the maximum payment allowable for queries.
     *
     * @param {Hbar} maxQueryPayment
     * @returns {Client<ChannelT, MirrorChannelT>}
     */
    setMaxQueryPayment(maxQueryPayment: Hbar): Client<ChannelT, MirrorChannelT>;
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
     * @returns {number}
     */
    get maxNodeAttempts(): number;
    /**
     * @param {number} maxNodeAttempts
     * @returns {this}
     */
    setMaxNodeAttempts(maxNodeAttempts: number): this;
    /**
     * @returns {number}
     */
    get nodeWaitTime(): number;
    /**
     * @param {number} nodeWaitTime
     * @returns {this}
     */
    setNodeWaitTime(nodeWaitTime: number): this;
    /**
     * @returns {number}
     */
    get maxNodesPerTransaction(): number;
    /**
     * @param {number} maxNodesPerTransaction
     * @returns {this}
     */
    setMaxNodesPerTransaction(maxNodesPerTransaction: number): this;
    /**
     * @param {?number} minBackoff
     * @returns {this}
     */
    setMinBackoff(minBackoff: number | null): this;
    /**
     * @returns {number}
     */
    get minBackoff(): number;
    /**
     * @param {?number} maxBackoff
     * @returns {this}
     */
    setMaxBackoff(maxBackoff: number | null): this;
    /**
     * @returns {number}
     */
    get maxBackoff(): number;
    /**
     * @param {number} nodeMinBackoff
     * @returns {this}
     */
    setNodeMinBackoff(nodeMinBackoff: number): this;
    /**
     * @returns {number}
     */
    get nodeMinBackoff(): number;
    /**
     * @param {number} nodeMaxBackoff
     * @returns {this}
     */
    setNodeMaxBackoff(nodeMaxBackoff: number): this;
    /**
     * @returns {number}
     */
    get nodeMaxBackoff(): number;
    /**
     * @param {number} requestTimeout - Number of milliseconds
     * @returns {this}
     */
    setRequestTimeout(requestTimeout: number): this;
    /**
     * @returns {?number}
     */
    get requestTimeout(): number | null;
    /**
     * @param {AccountId | string} accountId
     */
    ping(accountId: AccountId | string): Promise<void>;
    pingAll(): Promise<void>;
    /**
     * @returns {void}
     */
    close(): void;
    /**
     * @abstract
     * @returns {(address: string) => ChannelT}
     */
    _createNetworkChannel(): (address: string) => ChannelT;
    /**
     * @abstract
     * @returns {(address: string) => MirrorChannelT}
     */
    _createMirrorNetworkChannel(): (address: string) => MirrorChannelT;
}
export type Channel = import("../channel/Channel.js").default;
export type MirrorChannel = import("../channel/MirrorChannel.js").default;
export type Operator = {
    privateKey: string | PrivateKey;
    accountId: string | AccountId;
};
export type ClientOperator = {
    publicKey: PublicKey;
    accountId: AccountId;
    transactionSigner: (message: Uint8Array) => Promise<Uint8Array>;
};
export type ClientConfiguration = {
    network: string | {
        [key: string]: string | AccountId;
    };
    mirrorNetwork?: string | string[] | undefined;
    operator?: Operator | undefined;
};
export type NetworkName = "mainnet" | "testnet" | "previewnet";
import MirrorNetwork from "./MirrorNetwork.js";
import Network from "./Network.js";
import LedgerId from "../LedgerId.js";
import AccountId from "../account/AccountId.js";
import PrivateKey from "../PrivateKey.js";
import PublicKey from "../PublicKey.js";
import Hbar from "../Hbar.js";
