/**
 * @typedef {import("../client/Client.js").default<*, *>} Client
 */
/**
 * The ID for a crypto-currency account on Hedera.
 */
export default class AccountId {
    /**
     * @param {string} text
     * @returns {AccountId}
     */
    static fromString(text: string): AccountId;
    /**
     * @internal
     * @param {proto.IAccountID} id
     * @returns {AccountId}
     */
    static _fromProtobuf(id: proto.IAccountID): AccountId;
    /**
     * @param {Uint8Array} bytes
     * @returns {AccountId}
     */
    static fromBytes(bytes: Uint8Array): AccountId;
    /**
     * @param {string} address
     * @returns {AccountId}
     */
    static fromSolidityAddress(address: string): AccountId;
    /**
     * @param {number | Long | import("../EntityIdHelper").IEntityId} props
     * @param {(number | Long)=} realm
     * @param {(number | Long)=} num
     * @param {(PublicKey)=} aliasKey
     */
    constructor(props: number | Long | import("../EntityIdHelper").IEntityId, realm?: (number | Long) | undefined, num?: (number | Long) | undefined, aliasKey?: (PublicKey) | undefined);
    shard: Long.Long;
    realm: Long.Long;
    num: Long.Long;
    aliasKey: PublicKey | null;
    /**
     * @type {string | null}
     */
    _checksum: string | null;
    /**
     * @returns {string | null}
     */
    get checksum(): string | null;
    /**
     * @deprecated - Use `validateChecksum` instead
     * @param {Client} client
     */
    validate(client: import("../client/Client.js").default<any, any>): void;
    /**
     * @param {Client} client
     */
    validateChecksum(client: import("../client/Client.js").default<any, any>): void;
    /**
     * @returns {string}
     */
    toSolidityAddress(): string;
    /**
     * @internal
     * @returns {proto.IAccountID}
     */
    _toProtobuf(): proto.IAccountID;
    /**
     * @returns {Uint8Array}
     */
    toBytes(): Uint8Array;
    /**
     * @returns {string}
     */
    toString(): string;
    /**
     * @param {Client} client
     * @returns {string}
     */
    toStringWithChecksum(client: import("../client/Client.js").default<any, any>): string;
    /**
     * @param {this} other
     * @returns {boolean}
     */
    equals(other: AccountId): boolean;
    /**
     * @returns {AccountId}
     */
    clone(): AccountId;
    /**
     * @param {AccountId} other
     * @returns {number}
     */
    compare(other: AccountId): number;
}
export type Client = import("../client/Client.js").default<any, any>;
import Long from "long";
import PublicKey from "../PublicKey.js";
import * as proto from "@hashgraph/proto";