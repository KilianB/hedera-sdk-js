/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").ITokenAllowance} proto.ITokenAllowance
 * @typedef {import("@hashgraph/proto").ITokenID} proto.ITokenID
 * @typedef {import("@hashgraph/proto").IAccountID} proto.IAccountID
 */
export default class TokenAllowance {
    /**
     * @internal
     * @param {proto.ITokenAllowance} allowance
     * @returns {TokenAllowance}
     */
    static _fromProtobuf(allowance: proto.ITokenAllowance): TokenAllowance;
    /**
     * @internal
     * @param {object} props
     * @param {TokenId} props.tokenId
     * @param {AccountId} props.spenderAccountId
     * @param {AccountId | null} props.ownerAccountId
     * @param {Long | null} props.amount
     */
    constructor(props: {
        tokenId: TokenId;
        spenderAccountId: AccountId;
        ownerAccountId: AccountId | null;
        amount: Long | null;
    });
    /**
     * The token that the allowance pertains to.
     *
     * @readonly
     */
    readonly tokenId: TokenId;
    /**
     * The account ID of the spender of the hbar allowance.
     *
     * @readonly
     */
    readonly spenderAccountId: AccountId;
    /**
     * The account ID of the owner of the hbar allowance.
     *
     * @readonly
     */
    readonly ownerAccountId: AccountId | null;
    /**
     * The current balance of the spender's token allowance.
     * **NOTE**: If `null`, the spender has access to all of the account owner's NFT instances
     * (currently owned and any in the future).
     *
     * @readonly
     */
    readonly amount: Long.Long | null;
    /**
     * @internal
     * @returns {proto.ITokenAllowance}
     */
    _toProtobuf(): proto.ITokenAllowance;
}
export namespace proto {
    type ITokenAllowance = import("@hashgraph/proto").ITokenAllowance;
    type ITokenID = import("@hashgraph/proto").ITokenID;
    type IAccountID = import("@hashgraph/proto").IAccountID;
}
import TokenId from "../token/TokenId.js";
import AccountId from "./AccountId.js";
import Long from "long";
