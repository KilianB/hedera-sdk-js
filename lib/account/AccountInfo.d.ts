/**
 * Current information about an account, including the balance.
 */
export default class AccountInfo {
    /**
     * @internal
     * @param {proto.IAccountInfo} info
     * @returns {AccountInfo}
     */
    static _fromProtobuf(info: proto.IAccountInfo): AccountInfo;
    /**
     * @param {Uint8Array} bytes
     * @returns {AccountInfo}
     */
    static fromBytes(bytes: Uint8Array): AccountInfo;
    /**
     * @private
     * @param {object} props
     * @param {AccountId} props.accountId
     * @param {?string} props.contractAccountId
     * @param {boolean} props.isDeleted
     * @param {?AccountId} props.proxyAccountId
     * @param {Hbar} props.proxyReceived
     * @param {Key} props.key
     * @param {Hbar} props.balance
     * @param {Hbar} props.sendRecordThreshold
     * @param {Hbar} props.receiveRecordThreshold
     * @param {boolean} props.isReceiverSignatureRequired
     * @param {Timestamp} props.expirationTime
     * @param {Duration} props.autoRenewPeriod
     * @param {LiveHash[]} props.liveHashes
     * @param {TokenRelationshipMap} props.tokenRelationships
     * @param {string} props.accountMemo
     * @param {Long} props.ownedNfts
     * @param {Long} props.maxAutomaticTokenAssociations
     * @param {PublicKey | null} props.aliasKey
     * @param {LedgerId | null} props.ledgerId
     * @param {HbarAllowance[]} props.hbarAllowances
     * @param {TokenAllowance[]} props.tokenAllowances
     * @param {TokenNftAllowance[]} props.nftAllowances
     */
    private constructor();
    /**
     * The account ID for which this information applies.
     *
     * @readonly
     */
    readonly accountId: AccountId;
    /**
     * The Contract Account ID comprising of both the contract instance and the cryptocurrency
     * account owned by the contract instance, in the format used by Solidity.
     *
     * @readonly
     */
    readonly contractAccountId: string | null;
    /**
     * If true, then this account has been deleted, it will disappear when it expires, and
     * all transactions for it will fail except the transaction to extend its expiration date.
     *
     * @readonly
     */
    readonly isDeleted: boolean;
    /**
     * The Account ID of the account to which this is proxy staked. If proxyAccountID is null,
     * or is an invalid account, or is an account that isn't a node, then this account is
     * automatically proxy staked to a node chosen by the network, but without earning payments.
     * If the proxyAccountID account refuses to accept proxy staking , or if it is not currently
     * running a node, then it will behave as if proxyAccountID was null.
     *
     * @readonly
     */
    readonly proxyAccountId: AccountId | null;
    /**
     * The total number of tinybars proxy staked to this account.
     *
     * @readonly
     */
    readonly proxyReceived: Hbar;
    /**
     * The key for the account, which must sign in order to transfer out, or to modify the account
     * in any way other than extending its expiration date.
     *
     * @readonly
     */
    readonly key: Key;
    /**
     * The current balance of account.
     *
     * @readonly
     */
    readonly balance: Hbar;
    /**
     * The threshold amount (in tinybars) for which an account record is created (and this account
     * charged for them) for any send/withdraw transaction.
     *
     * @readonly
     */
    readonly sendRecordThreshold: Hbar;
    /**
     * The threshold amount (in tinybars) for which an account record is created
     * (and this account charged for them) for any transaction above this amount.
     *
     * @readonly
     */
    readonly receiveRecordThreshold: Hbar;
    /**
     * If true, no transaction can transfer to this account unless signed by this account's key.
     *
     * @readonly
     */
    readonly isReceiverSignatureRequired: boolean;
    /**
     * The TimeStamp time at which this account is set to expire.
     *
     * @readonly
     */
    readonly expirationTime: Timestamp;
    /**
     * The duration for expiration time will extend every this many seconds. If there are
     * insufficient funds, then it extends as long as possible. If it is empty when it
     * expires, then it is deleted.
     *
     * @readonly
     */
    readonly autoRenewPeriod: Duration;
    /** @readonly */
    readonly liveHashes: LiveHash[];
    /** @readonly */
    readonly tokenRelationships: TokenRelationshipMap;
    /** @readonly */
    readonly accountMemo: string;
    /** @readonly */
    readonly ownedNfts: Long.Long;
    /** @readonly */
    readonly maxAutomaticTokenAssociations: Long.Long;
    aliasKey: PublicKey | null;
    ledgerId: LedgerId | null;
    hbarAllowances: HbarAllowance[];
    tokenAllowances: TokenAllowance[];
    nftAllowances: TokenNftAllowance[];
    /**
     * @returns {proto.IAccountInfo}
     */
    _toProtobuf(): proto.IAccountInfo;
    /**
     * @returns {Uint8Array}
     */
    toBytes(): Uint8Array;
}
import AccountId from "./AccountId.js";
import Hbar from "../Hbar.js";
import Key from "../Key.js";
import Timestamp from "../Timestamp.js";
import Duration from "../Duration.js";
import LiveHash from "./LiveHash.js";
import TokenRelationshipMap from "./TokenRelationshipMap.js";
import Long from "long";
import PublicKey from "../PublicKey.js";
import LedgerId from "../LedgerId.js";
import HbarAllowance from "./HbarAllowance.js";
import TokenAllowance from "./TokenAllowance.js";
import TokenNftAllowance from "./TokenNftAllowance.js";
import * as proto from "@hashgraph/proto";