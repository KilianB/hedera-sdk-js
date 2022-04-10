/**
 * @typedef {import("../long.js").LongObject} LongObject
 * @typedef {import("bignumber.js").default} BigNumber
 */
/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").ITransaction} proto.ITransaction
 * @typedef {import("@hashgraph/proto").ISignedTransaction} proto.ISignedTransaction
 * @typedef {import("@hashgraph/proto").TransactionBody} proto.TransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionBody} proto.ITransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionResponse} proto.ITransactionResponse
 * @typedef {import("@hashgraph/proto").ICryptoTransferTransactionBody} proto.ICryptoTransferTransactionBody
 * @typedef {import("@hashgraph/proto").ITokenID} proto.ITokenID
 * @typedef {import("@hashgraph/proto").IAccountID} proto.IAccountID
 * @typedef {import("@hashgraph/proto").IAccountAmount} proto.IAccountAmount
 * @typedef {import("@hashgraph/proto").ITokenTransferList} proto.ITokenTransferList
 */
/**
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../client/Client.js").default<*, *>} Client
 * @typedef {import("../transaction/TransactionId.js").default} TransactionId
 */
/**
 * @typedef {object} TransferTokensInput
 * @property {TokenId | string} tokenId
 * @property {AccountId | string} accountId
 * @property {Long | number} amount
 */
/**
 * @typedef {object} TransferTokenObject
 * @property {TokenId} tokenId
 * @property {AccountId} accountId
 * @property {Long} amount
 */
/**
 * @typedef {object} TransferHbarInput
 * @property {AccountId | string} accountId
 * @property {number | string | Long | BigNumber | Hbar} amount
 */
/**
 * @typedef {object} TransferNftInput
 * @property {TokenId | string} tokenId
 * @property {AccountId | string} sender
 * @property {AccountId | string} recipient
 * @property {Long | number} serial
 */
/**
 * Transfers a new Hedera™ crypto-currency token.
 */
export default class TransferTransaction extends Transaction {
    /**
     * @internal
     * @param {proto.ITransaction[]} transactions
     * @param {proto.ISignedTransaction[]} signedTransactions
     * @param {TransactionId[]} transactionIds
     * @param {AccountId[]} nodeIds
     * @param {proto.ITransactionBody[]} bodies
     * @returns {TransferTransaction}
     */
    static _fromProtobuf(transactions: proto.ITransaction[], signedTransactions: proto.ISignedTransaction[], transactionIds: TransactionId[], nodeIds: AccountId[], bodies: proto.ITransactionBody[]): TransferTransaction;
    /**
     * @param {object} [props]
     * @param {(TransferTokensInput)[]} [props.tokenTransfers]
     * @param {(TransferHbarInput)[]} [props.hbarTransfers]
     * @param {(TransferNftInput)[]} [props.nftTransfers]
     */
    constructor(props?: {
        tokenTransfers?: TransferTokensInput[] | undefined;
        hbarTransfers?: TransferHbarInput[] | undefined;
        nftTransfers?: TransferNftInput[] | undefined;
    } | undefined);
    /**
     * @private
     * @type {TokenTransfer[]}
     */
    private _tokenTransfers;
    /**
     * @private
     * @type {Transfer[]}
     */
    private _hbarTransfers;
    /**
     * @private
     * @type {TokenNftTransfer[]}
     */
    private _nftTransfers;
    /**
     * @returns {TokenTransferMap}
     */
    get tokenTransfers(): TokenTransferMap;
    /**
     * @param {TokenId | string} tokenId
     * @param {AccountId | string} accountId
     * @param {number | Long} amount
     * @param {boolean} isApproved
     * @returns {this}
     */
    _addTokenTransfer(tokenId: TokenId | string, accountId: AccountId | string, amount: number | Long, isApproved: boolean): this;
    /**
     * @param {TokenId | string} tokenId
     * @param {AccountId | string} accountId
     * @param {number | Long} amount
     * @returns {this}
     */
    addTokenTransfer(tokenId: TokenId | string, accountId: AccountId | string, amount: number | Long): this;
    /**
     * @param {TokenId | string} tokenId
     * @param {AccountId | string} accountId
     * @param {number | Long} amount
     * @returns {this}
     */
    addApprovedTokenTransfer(tokenId: TokenId | string, accountId: AccountId | string, amount: number | Long): this;
    /**
     * @param {TokenId | string} tokenId
     * @param {AccountId | string} accountId
     * @param {number | Long} amount
     * @param {number} decimals
     * @returns {this}
     */
    addTokenTransferWithDecimals(tokenId: TokenId | string, accountId: AccountId | string, amount: number | Long, decimals: number): this;
    /**
     * @returns {NullableTokenDecimalMap}
     */
    get tokenIdDecimals(): NullableTokenDecimalMap;
    /**
     * @returns {HbarTransferMap}
     */
    get hbarTransfers(): HbarTransferMap;
    /**
     * @internal
     * @param {AccountId | string} accountId
     * @param {number | string | Long | LongObject | BigNumber | Hbar} amount
     * @param {boolean} isApproved
     * @returns {TransferTransaction}
     */
    _addHbarTransfer(accountId: AccountId | string, amount: number | string | Long | LongObject | BigNumber | Hbar, isApproved: boolean): TransferTransaction;
    /**
     * @internal
     * @param {AccountId | string} accountId
     * @param {number | string | Long | LongObject | BigNumber | Hbar} amount
     * @returns {TransferTransaction}
     */
    addHbarTransfer(accountId: AccountId | string, amount: number | string | Long | LongObject | BigNumber | Hbar): TransferTransaction;
    /**
     * @internal
     * @param {AccountId | string} accountId
     * @param {number | string | Long | LongObject | BigNumber | Hbar} amount
     * @returns {TransferTransaction}
     */
    addApprovedHbarTransfer(accountId: AccountId | string, amount: number | string | Long | LongObject | BigNumber | Hbar): TransferTransaction;
    /**
     * @returns {TokenNftTransferMap}
     */
    get nftTransfers(): TokenNftTransferMap;
    /**
     * @param {boolean} isApproved
     * @param {NftId | TokenId | string} tokenIdOrNftId
     * @param {AccountId | string | Long | number} senderAccountIdOrSerialNumber
     * @param {AccountId | string} receiverAccountIdOrSenderAccountId
     * @param {(AccountId | string)=} receiver
     * @returns {TransferTransaction}
     */
    _addNftTransfer(isApproved: boolean, tokenIdOrNftId: NftId | TokenId | string, senderAccountIdOrSerialNumber: AccountId | string | Long | number, receiverAccountIdOrSenderAccountId: AccountId | string, receiver?: (AccountId | string) | undefined): TransferTransaction;
    /**
     * @param {NftId | TokenId | string} tokenIdOrNftId
     * @param {AccountId | string | Long | number} senderAccountIdOrSerialNumber
     * @param {AccountId | string} receiverAccountIdOrSenderAccountId
     * @param {(AccountId | string)=} receiver
     * @returns {TransferTransaction}
     */
    addNftTransfer(tokenIdOrNftId: NftId | TokenId | string, senderAccountIdOrSerialNumber: AccountId | string | Long | number, receiverAccountIdOrSenderAccountId: AccountId | string, receiver?: (AccountId | string) | undefined): TransferTransaction;
    /**
     * @param {NftId | TokenId | string} tokenIdOrNftId
     * @param {AccountId | string | Long | number} senderAccountIdOrSerialNumber
     * @param {AccountId | string} receiverAccountIdOrSenderAccountId
     * @param {(AccountId | string)=} receiver
     * @returns {TransferTransaction}
     */
    addApprovedNftTransfer(tokenIdOrNftId: NftId | TokenId | string, senderAccountIdOrSerialNumber: AccountId | string | Long | number, receiverAccountIdOrSenderAccountId: AccountId | string, receiver?: (AccountId | string) | undefined): TransferTransaction;
    /**
     * @deprecated - Use `addApprovedHbarTransfer()` instead
     * @param {AccountId | string} accountId
     * @param {boolean} isApproved
     * @returns {TransferTransaction}
     */
    setHbarTransferApproval(accountId: AccountId | string, isApproved: boolean): TransferTransaction;
    /**
     * @deprecated - Use `addApprovedTokenTransfer()` instead
     * @param {TokenId | string} tokenId
     * @param {AccountId | string} accountId
     * @param {boolean} isApproved
     * @returns {TransferTransaction}
     */
    setTokenTransferApproval(tokenId: TokenId | string, accountId: AccountId | string, isApproved: boolean): TransferTransaction;
    /**
     * @deprecated - Use `addApprovedNftTransfer()` instead
     * @param {NftId | string} nftId
     * @param {boolean} isApproved
     * @returns {TransferTransaction}
     */
    setNftTransferApproval(nftId: NftId | string, isApproved: boolean): TransferTransaction;
}
export type LongObject = import("../long.js").LongObject;
export type BigNumber = import("bignumber.js").default;
export namespace proto {
    type ITransaction = import("@hashgraph/proto").ITransaction;
    type ISignedTransaction = import("@hashgraph/proto").ISignedTransaction;
    type TransactionBody = import("@hashgraph/proto").TransactionBody;
    type ITransactionBody = import("@hashgraph/proto").ITransactionBody;
    type ITransactionResponse = import("@hashgraph/proto").ITransactionResponse;
    type ICryptoTransferTransactionBody = import("@hashgraph/proto").ICryptoTransferTransactionBody;
    type ITokenID = import("@hashgraph/proto").ITokenID;
    type IAccountID = import("@hashgraph/proto").IAccountID;
    type IAccountAmount = import("@hashgraph/proto").IAccountAmount;
    type ITokenTransferList = import("@hashgraph/proto").ITokenTransferList;
}
export type Channel = import("../channel/Channel.js").default;
export type Client = import("../client/Client.js").default<any, any>;
export type TransactionId = import("../transaction/TransactionId.js").default;
export type TransferTokensInput = {
    tokenId: TokenId | string;
    accountId: AccountId | string;
    amount: Long | number;
};
export type TransferTokenObject = {
    tokenId: TokenId;
    accountId: AccountId;
    amount: Long;
};
export type TransferHbarInput = {
    accountId: AccountId | string;
    amount: number | string | Long | BigNumber | Hbar;
};
export type TransferNftInput = {
    tokenId: TokenId | string;
    sender: AccountId | string;
    recipient: AccountId | string;
    serial: Long | number;
};
import Transaction from "../transaction/Transaction.js";
import TokenTransferMap from "./TokenTransferMap.js";
import TokenId from "../token/TokenId.js";
import AccountId from "./AccountId.js";
import Long from "long";
import NullableTokenDecimalMap from "./NullableTokenDecimalMap.js";
import HbarTransferMap from "./HbarTransferMap.js";
import Hbar from "../Hbar.js";
import TokenNftTransferMap from "./TokenNftTransferMap.js";
import NftId from "../token/NftId.js";