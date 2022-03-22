"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TokenId = _interopRequireDefault(require("../token/TokenId.cjs"));

var _AccountId = _interopRequireDefault(require("./AccountId.cjs"));

var _long = _interopRequireDefault(require("long"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").ITokenAllowance} proto.ITokenAllowance
 * @typedef {import("@hashgraph/proto").IGrantedTokenAllowance} proto.IGrantedTokenAllowance
 * @typedef {import("@hashgraph/proto").ITokenID} proto.ITokenID
 * @typedef {import("@hashgraph/proto").IAccountID} proto.IAccountID
 */
class TokenAllowance {
  /**
   * @internal
   * @param {object} props
   * @param {TokenId} props.tokenId
   * @param {AccountId} props.spenderAccountId
   * @param {AccountId | null} props.ownerAccountId
   * @param {Long | null} props.amount
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

    this.amount = props.amount;
    Object.freeze(this);
  }
  /**
   * @internal
   * @param {proto.ITokenAllowance} allowance
   * @returns {TokenAllowance}
   */


  static _fromProtobuf(allowance) {
    return new TokenAllowance({
      tokenId: _TokenId.default._fromProtobuf(
      /** @type {proto.ITokenID} */
      allowance.tokenId),
      spenderAccountId: _AccountId.default._fromProtobuf(
      /** @type {proto.IAccountID} */
      allowance.spender),
      ownerAccountId: allowance.owner != null ? _AccountId.default._fromProtobuf(
      /**@type {proto.IAccountID}*/
      allowance.owner) : null,
      amount: allowance.amount != null ? _long.default.fromValue(
      /** @type {Long} */
      allowance.amount) : null
    });
  }
  /**
   * @internal
   * @param {proto.IGrantedTokenAllowance} allowance
   * @returns {TokenAllowance}
   */


  static _fromGrantedProtobuf(allowance) {
    return new TokenAllowance({
      tokenId: _TokenId.default._fromProtobuf(
      /** @type {proto.ITokenID} */
      allowance.tokenId),
      spenderAccountId: _AccountId.default._fromProtobuf(
      /** @type {proto.IAccountID} */
      allowance.spender),
      ownerAccountId: null,
      amount: allowance.amount != null ? _long.default.fromValue(
      /** @type {Long} */
      allowance.amount) : null
    });
  }
  /**
   * @internal
   * @returns {proto.ITokenAllowance}
   */


  _toProtobuf() {
    return {
      tokenId: this.tokenId._toProtobuf(),
      spender: this.spenderAccountId._toProtobuf(),
      owner: this.ownerAccountId != null ? this.ownerAccountId._toProtobuf() : null,
      amount: this.amount
    };
  }

}

exports.default = TokenAllowance;