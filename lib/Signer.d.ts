/**
 * @typedef {import("./LedgerId.js").default} LedgerId
 * @typedef {import("./SignerSignature.js").default} SignerSignature
 * @typedef {import("./transaction/TransactionId.js").default} TransactionId
 * @typedef {import("./transaction/Transaction.js").default} Transaction
 * @typedef {import("./transaction/TransactionResponse.js").default} TransactionResponse
 * @typedef {import("./transaction/TransactionReceipt.js").default} TransactionReceipt
 * @typedef {import("./transaction/TransactionRecord.js").default} TransactionRecord
 * @typedef {import("./account/AccountId.js").default} AccountId
 * @typedef {import("./account/AccountBalance.js").default} AccountBalance
 * @typedef {import("./account/AccountInfo.js").default} AccountInfo
 */
/**
 * @template {any} O
 * @typedef {import("./query/Query.js").default<O>} Query<O>
 */
/**
 * @template RequestT
 * @template ResponseT
 * @template OutputT
 * @typedef {import("./Executable.js").default<RequestT, ResponseT, OutputT>} Executable<RequestT, ResponseT, OutputT>
 */
/**
 * @abstract
 */
export default class Signer {
    /**
     * @abstract
     * @returns {LedgerId?}
     */
    getLedgerId(): LedgerId | null;
    /**
     * @abstract
     * @returns {AccountId}
     */
    getAccountId(): AccountId;
    /**
     * @abstract
     * @returns {{[key: string]: (string | AccountId)}}
     */
    getNetwork(): {
        [key: string]: string | import("./account/AccountId.js").default;
    };
    /**
     * @abstract
     * @returns {string[]}
     */
    getMirrorNetwork(): string[];
    /**
     * @abstract
     * @param {Uint8Array[]} messages
     * @returns {Promise<SignerSignature[]>}
     */
    sign(messages: Uint8Array[]): Promise<SignerSignature[]>;
    /**
     * @abstract
     * @returns {Promise<AccountBalance>}
     */
    getAccountBalance(): Promise<AccountBalance>;
    /**
     * @abstract
     * @returns {Promise<AccountInfo>}
     */
    getAccountInfo(): Promise<AccountInfo>;
    /**
     * @abstract
     * @returns {Promise<TransactionRecord[]>}
     */
    getAccountRecords(): Promise<TransactionRecord[]>;
    /**
     * @abstract
     * @param {Transaction} transaction
     * @returns {Promise<Transaction>}
     */
    signTransaction(transaction: Transaction): Promise<Transaction>;
    /**
     * @abstract
     * @param {Transaction} transaction
     * @returns {Promise<Transaction>}
     */
    checkTransaction(transaction: Transaction): Promise<Transaction>;
    /**
     * @abstract
     * @param {Transaction} transaction
     * @returns {Promise<Transaction>}
     */
    populateTransaction(transaction: Transaction): Promise<Transaction>;
    /**
     * @abstract
     * @template RequestT
     * @template ResponseT
     * @template OutputT
     * @param {Executable<RequestT, ResponseT, OutputT>} request
     * @returns {Promise<OutputT>}
     */
    sendRequest<RequestT, ResponseT, OutputT>(request: import("./Executable.js").default<RequestT, ResponseT, OutputT>): Promise<OutputT>;
}
export type LedgerId = import("./LedgerId.js").default;
export type SignerSignature = import("./SignerSignature.js").default;
export type TransactionId = import("./transaction/TransactionId.js").default;
export type Transaction = import("./transaction/Transaction.js").default;
export type TransactionResponse = import("./transaction/TransactionResponse.js").default;
export type TransactionReceipt = import("./transaction/TransactionReceipt.js").default;
export type TransactionRecord = import("./transaction/TransactionRecord.js").default;
export type AccountId = import("./account/AccountId.js").default;
export type AccountBalance = import("./account/AccountBalance.js").default;
export type AccountInfo = import("./account/AccountInfo.js").default;
/**
 * <O>
 */
export type Query<O extends unknown> = import("./query/Query.js").default<O>;
/**
 * <RequestT, ResponseT, OutputT>
 */
export type Executable<RequestT, ResponseT, OutputT> = import("./Executable.js").default<RequestT, ResponseT, OutputT>;