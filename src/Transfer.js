import AccountId from "./account/AccountId.js";
import Hbar from "./Hbar.js";

/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").IAccountAmount} proto.IAccountAmount
 * @typedef {import("@hashgraph/proto").IAccountID} proto.IAccountID
 */

/**
 * @typedef {import("bignumber.js").default} BigNumber
 * @typedef {import("long")} Long
 */

/**
 * An account, and the amount that it sends or receives during a cryptocurrency transfer.
 */
export default class Transfer {
    /**
     * @internal
     * @param {object} props
     * @param {AccountId | string} props.accountId
     * @param {number | string | Long | BigNumber | Hbar} props.amount
     * @param {boolean} props.isApproved
     */
    constructor(props) {
        /**
         * The Account ID that sends or receives cryptocurrency.
         *
         * @readonly
         */
        this.accountId =
            props.accountId instanceof AccountId
                ? props.accountId
                : AccountId.fromString(props.accountId);

        /**
         * The amount of tinybars that the account sends(negative) or receives(positive).
         */
        this.amount =
            props.amount instanceof Hbar
                ? props.amount
                : new Hbar(props.amount);

        this.isApproved = props.isApproved;
    }

    /**
     * @internal
     * @param {proto.IAccountAmount[]} accountAmounts
     * @returns {Transfer[]}
     */
    static _fromProtobuf(accountAmounts) {
        const transfers = [];

        for (const transfer of accountAmounts) {
            transfers.push(
                new Transfer({
                    accountId: AccountId._fromProtobuf(
                        /** @type {proto.IAccountID} */ (transfer.accountID)
                    ),
                    amount: Hbar.fromTinybars(
                        transfer.amount != null ? transfer.amount : 0
                    ),
                    isApproved: /** @type {boolean} */ (transfer.isApproval),
                })
            );
        }

        return transfers;
    }

    /**
     * @internal
     * @returns {proto.IAccountAmount}
     */
    _toProtobuf() {
        return {
            accountID: this.accountId._toProtobuf(),
            amount: this.amount.toTinybars(),
            isApproval: this.isApproved,
        };
    }
}
