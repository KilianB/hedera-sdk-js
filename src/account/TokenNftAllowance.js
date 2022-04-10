import TokenId from "../token/TokenId.js";
import AccountId from "./AccountId.js";
import Long from "long";

/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").proto.IGrantedNftAllowance} HashgraphProto.proto.IGrantedNftAllowance
 * @typedef {import("@hashgraph/proto").proto.INftRemoveAllowance} HashgraphProto.proto.INftRemoveAllowance
 * @typedef {import("@hashgraph/proto").proto.INftAllowance} HashgraphProto.proto.INftAllowance
 * @typedef {import("@hashgraph/proto").proto.ITokenID} HashgraphProto.proto.ITokenID
 * @typedef {import("@hashgraph/proto").proto.IAccountID} HashgraphProto.proto.IAccountID
 */

/**
 * @typedef {import("../client/Client.js").default<*, *>} Client
 */

export default class TokenNftAllowance {
    /**
     * @internal
     * @param {object} props
     * @param {TokenId} props.tokenId
     * @param {AccountId | null} props.spenderAccountId
     * @param {AccountId | null} props.ownerAccountId
     * @param {Long[] | null} props.serialNumbers
     * @param {boolean | null} props.allSerials
     */
    constructor(props) {
        /**
         * The token that the allowance pertains to.
         *
         * @readonly
         */
        this.tokenId = props.tokenId;

        /**
         * The account ID of the spender of the hbar allowance.
         *
         * @readonly
         */
        this.spenderAccountId = props.spenderAccountId;

        /**
         * The account ID of the owner of the hbar allowance.
         *
         * @readonly
         */
        this.ownerAccountId = props.ownerAccountId;

        /**
         * The current balance of the spender's token allowance.
         * **NOTE**: If `null`, the spender has access to all of the account owner's NFT instances
         * (currently owned and any in the future).
         *
         * @readonly
         */
        this.serialNumbers = props.serialNumbers;

        /**
         * @readonly
         */
        this.allSerials = props.allSerials;

        Object.freeze(this);
    }

    /**
     * @internal
     * @param {HashgraphProto.proto.INftAllowance} allowance
     * @returns {TokenNftAllowance}
     */
    static _fromProtobuf(allowance) {
        const allSerials =
            allowance.approvedForAll != null &&
            allowance.approvedForAll.value == true;
        return new TokenNftAllowance({
            tokenId: TokenId._fromProtobuf(
                /** @type {HashgraphProto.proto.ITokenID} */ (allowance.tokenId)
            ),
            spenderAccountId: AccountId._fromProtobuf(
                /** @type {HashgraphProto.proto.IAccountID} */ (
                    allowance.spender
                )
            ),
            ownerAccountId:
                allowance.owner != null
                    ? AccountId._fromProtobuf(
                          /**@type {HashgraphProto.proto.IAccountID}*/ (
                              allowance.owner
                          )
                      )
                    : null,
            serialNumbers: allSerials
                ? null
                : allowance.serialNumbers != null
                ? allowance.serialNumbers.map((serialNumber) =>
                      Long.fromValue(serialNumber)
                  )
                : [],
            allSerials,
        });
    }

    /**
     * @internal
     * @param {HashgraphProto.proto.IGrantedNftAllowance} allowance
     * @param {AccountId} ownerAccountId
     * @returns {TokenNftAllowance}
     */
    static _fromGrantedProtobuf(allowance, ownerAccountId) {
        return new TokenNftAllowance({
            tokenId: TokenId._fromProtobuf(
                /** @type {HashgraphProto.proto.ITokenID} */ (allowance.tokenId)
            ),
            spenderAccountId: AccountId._fromProtobuf(
                /** @type {HashgraphProto.proto.IAccountID} */ (
                    allowance.spender
                )
            ),
            ownerAccountId,
            serialNumbers: [],
            allSerials: null,
        });
    }

    /**
     * @internal
     * @param {HashgraphProto.proto.INftRemoveAllowance} allowance
     * @returns {TokenNftAllowance}
     */
    static _fromRemoveProtobuf(allowance) {
        return new TokenNftAllowance({
            tokenId: TokenId._fromProtobuf(
                /** @type {HashgraphProto.proto.ITokenID} */ (allowance.tokenId)
            ),
            spenderAccountId: null,
            ownerAccountId:
                allowance.owner != null
                    ? AccountId._fromProtobuf(
                          /**@type {HashgraphProto.proto.IAccountID}*/ (
                              allowance.owner
                          )
                      )
                    : null,
            serialNumbers:
                allowance.serialNumbers != null
                    ? allowance.serialNumbers.map((serialNumber) =>
                          Long.fromValue(serialNumber)
                      )
                    : [],
            allSerials: null,
        });
    }

    /**
     * @internal
     * @returns {HashgraphProto.proto.INftAllowance}
     */
    _toProtobuf() {
        return {
            tokenId: this.tokenId._toProtobuf(),
            spender:
                this.spenderAccountId != null
                    ? this.spenderAccountId._toProtobuf()
                    : null,
            owner:
                this.ownerAccountId != null
                    ? this.ownerAccountId._toProtobuf()
                    : null,
            approvedForAll:
                this.serialNumbers == null ? { value: this.allSerials } : null,
            serialNumbers: this.serialNumbers,
        };
    }

    /**
     * @param {Client} client
     */
    _validateChecksums(client) {
        this.tokenId.validateChecksum(client);

        if (this.ownerAccountId != null) {
            this.ownerAccountId.validateChecksum(client);
        }

        if (this.spenderAccountId != null) {
            this.spenderAccountId.validateChecksum(client);
        }
    }
}
