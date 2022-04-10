/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").ITransaction} proto.ITransaction
 * @typedef {import("@hashgraph/proto").ISignedTransaction} proto.ISignedTransaction
 * @typedef {import("@hashgraph/proto").TransactionBody} proto.TransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionBody} proto.ITransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionResponse} proto.ITransactionResponse
 * @typedef {import("@hashgraph/proto").ICryptoApproveAllowanceTransactionBody} proto.ICryptoApproveAllowanceTransactionBody
 * @typedef {import("@hashgraph/proto").IAccountID} proto.IAccountID
 */
/**
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../client/Client.js").default<*, *>} Client
 * @typedef {import("../transaction/TransactionId.js").default} TransactionId
 * @typedef {import("bignumber.js").default} BigNumber
 * @typedef {import("../long.js").LongObject} LongObject
 */
/**
 * Change properties for the given account.
 */
export default class AccountAllowanceApproveTransaction extends Transaction {
    /**
     * @internal
     * @param {proto.ITransaction[]} transactions
     * @param {proto.ISignedTransaction[]} signedTransactions
     * @param {TransactionId[]} transactionIds
     * @param {AccountId[]} nodeIds
     * @param {proto.ITransactionBody[]} bodies
     * @returns {AccountAllowanceApproveTransaction}
     */
    static _fromProtobuf(transactions: proto.ITransaction[], signedTransactions: proto.ISignedTransaction[], transactionIds: TransactionId[], nodeIds: AccountId[], bodies: proto.ITransactionBody[]): AccountAllowanceApproveTransaction;
    /**
     * @param {object} [props]
     * @param {HbarAllowance[]} [props.hbarApprovals]
     * @param {TokenAllowance[]} [props.tokenApprovals]
     * @param {TokenNftAllowance[]} [props.nftApprovals]
     */
    constructor(props?: {
        hbarApprovals?: HbarAllowance[] | undefined;
        tokenApprovals?: TokenAllowance[] | undefined;
        nftApprovals?: TokenNftAllowance[] | undefined;
    } | undefined);
    /**
     * @private
     * @type {HbarAllowance[]}
     */
    private _hbarApprovals;
    /**
     * @private
     * @type {TokenAllowance[]}
     */
    private _tokenApprovals;
    /**
     * @private
     * @type {TokenNftAllowance[]}
     */
    private _nftApprovals;
    /**
     * @returns {HbarAllowance[]}
     */
    get hbarApprovals(): HbarAllowance[];
    /**
     * @param {AccountId | string} ownerAccountId
     * @param {AccountId | string} spenderAccountId
     * @param {number | string | Long | LongObject | BigNumber | Hbar} amount
     * @returns {AccountAllowanceApproveTransaction}
     */
    approveHbarAllowance(ownerAccountId: AccountId | string, spenderAccountId: AccountId | string, amount: number | string | Long | LongObject | BigNumber | Hbar): AccountAllowanceApproveTransaction;
    /**
     * @deprecated
     * @param {AccountId | string} spenderAccountId
     * @param {number | string | Long | LongObject | BigNumber | Hbar} amount
     * @returns {AccountAllowanceApproveTransaction}
     */
    addHbarAllowance(spenderAccountId: AccountId | string, amount: number | string | Long | LongObject | BigNumber | Hbar): AccountAllowanceApproveTransaction;
    /**
     * @returns {TokenAllowance[]}
     */
    get tokenApprovals(): TokenAllowance[];
    /**
     * @param {TokenId | string} tokenId
     * @param {AccountId | string} ownerAccountId
     * @param {AccountId | string} spenderAccountId
     * @param {Long | number} amount
     * @returns {AccountAllowanceApproveTransaction}
     */
    approveTokenAllowance(tokenId: TokenId | string, ownerAccountId: AccountId | string, spenderAccountId: AccountId | string, amount: Long | number): AccountAllowanceApproveTransaction;
    /**
     * @deprecated
     * @param {TokenId | string} tokenId
     * @param {AccountId | string} spenderAccountId
     * @param {Long | number} amount
     * @returns {AccountAllowanceApproveTransaction}
     */
    addTokenAllowance(tokenId: TokenId | string, spenderAccountId: AccountId | string, amount: Long | number): AccountAllowanceApproveTransaction;
    /**
     * @deprecated
     * @param {NftId | string} nftId
     * @param {AccountId | string} spenderAccountId
     * @returns {AccountAllowanceApproveTransaction}
     */
    addTokenNftAllowance(nftId: NftId | string, spenderAccountId: AccountId | string): AccountAllowanceApproveTransaction;
    /**
     * @param {NftId | string} nftId
     * @param {AccountId | string | null} ownerAccountId
     * @param {AccountId | string} spenderAccountId
     * @returns {AccountAllowanceApproveTransaction}
     */
    _approveTokenNftAllowance(nftId: NftId | string, ownerAccountId: AccountId | string | null, spenderAccountId: AccountId | string): AccountAllowanceApproveTransaction;
    /**
     * @param {NftId | string} nftId
     * @param {AccountId | string} ownerAccountId
     * @param {AccountId | string} spenderAccountId
     * @returns {AccountAllowanceApproveTransaction}
     */
    approveTokenNftAllowance(nftId: NftId | string, ownerAccountId: AccountId | string, spenderAccountId: AccountId | string): AccountAllowanceApproveTransaction;
    /**
     * @param {TokenId | string} tokenId
     * @param {AccountId | string | null} ownerAccountId
     * @param {AccountId | string} spenderAccountId
     * @param {boolean} allSerials
     * @returns {AccountAllowanceApproveTransaction}
     */
    _approveAllTokenNftAllowance(tokenId: TokenId | string, ownerAccountId: AccountId | string | null, spenderAccountId: AccountId | string, allSerials: boolean): AccountAllowanceApproveTransaction;
    /**
     * @deprecated
     * @param {TokenId | string} tokenId
     * @param {AccountId | string} ownerAccountId
     * @param {AccountId | string} spenderAccountId
     * @returns {AccountAllowanceApproveTransaction}
     */
    addAllTokenNftAllowance(tokenId: TokenId | string, ownerAccountId: AccountId | string, spenderAccountId: AccountId | string): AccountAllowanceApproveTransaction;
    /**
     * @param {TokenId | string} tokenId
     * @param {AccountId | string} ownerAccountId
     * @param {AccountId | string} spenderAccountId
     * @returns {AccountAllowanceApproveTransaction}
     */
    approveTokenNftAllowanceAllSerials(tokenId: TokenId | string, ownerAccountId: AccountId | string, spenderAccountId: AccountId | string): AccountAllowanceApproveTransaction;
}
export namespace proto {
    type ITransaction = import("@hashgraph/proto").ITransaction;
    type ISignedTransaction = import("@hashgraph/proto").ISignedTransaction;
    type TransactionBody = import("@hashgraph/proto").TransactionBody;
    type ITransactionBody = import("@hashgraph/proto").ITransactionBody;
    type ITransactionResponse = import("@hashgraph/proto").ITransactionResponse;
    type ICryptoApproveAllowanceTransactionBody = import("@hashgraph/proto").ICryptoApproveAllowanceTransactionBody;
    type IAccountID = import("@hashgraph/proto").IAccountID;
}
export type Channel = import("../channel/Channel.js").default;
export type Client = import("../client/Client.js").default<any, any>;
export type TransactionId = import("../transaction/TransactionId.js").default;
export type BigNumber = import("bignumber.js").default;
export type LongObject = import("../long.js").LongObject;
import Transaction from "../transaction/Transaction.js";
import HbarAllowance from "./HbarAllowance.js";
import AccountId from "./AccountId.js";
import Long from "long";
import Hbar from "../Hbar.js";
import TokenAllowance from "./TokenAllowance.js";
import TokenId from "../token/TokenId.js";
import NftId from "../token/NftId.js";
import TokenNftAllowance from "./TokenNftAllowance.js";