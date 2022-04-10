/**
 * @typedef {import("../client/Client.js").default<*, *>} Client
 */
/**
 * The ID for a crypto-currency contract on Hedera.
 */
export default class ContractId extends Key {
    /**
     * @param {Long | number} shard
     * @param {Long | number} realm
     * @param {string} evmAddress
     * @returns {ContractId}
     */
    static fromEvmAddress(shard: Long | number, realm: Long | number, evmAddress: string): ContractId;
    /**
     * @param {string} text
     * @returns {ContractId}
     */
    static fromString(text: string): ContractId;
    /**
     * @internal
     * @param {proto.IContractID} id
     * @returns {ContractId}
     */
    static _fromProtobuf(id: proto.IContractID): ContractId;
    /**
     * @param {Uint8Array} bytes
     * @returns {ContractId}
     */
    static fromBytes(bytes: Uint8Array): ContractId;
    /**
     * @deprecated - Use `ContractId.fromEvmAddress()` instead
     * @param {string} address
     * @returns {ContractId}
     */
    static fromSolidityAddress(address: string): ContractId;
    /**
     * @param {proto.IContractID} key
     * @returns {ContractId}
     */
    static __fromProtobufKey(key: proto.IContractID): ContractId;
    /**
     * @param {number | Long | import("../EntityIdHelper").IEntityId} props
     * @param {(number | Long)=} realm
     * @param {(number | Long)=} num
     * @param {Uint8Array=} evmAddress
     */
    constructor(props: number | Long | import("../EntityIdHelper").IEntityId, realm?: (number | Long) | undefined, num?: (number | Long) | undefined, evmAddress?: Uint8Array | undefined);
    shard: Long.Long;
    realm: Long.Long;
    num: Long.Long;
    evmAddress: Uint8Array | null;
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
     * @returns {proto.IContractID}
     */
    _toProtobuf(): proto.IContractID;
    /**
     * @param {Client} client
     * @returns {string}
     */
    toStringWithChecksum(client: import("../client/Client.js").default<any, any>): string;
    /**
     * @returns {Uint8Array}
     */
    toBytes(): Uint8Array;
    /**
     * @returns {ContractId}
     */
    clone(): ContractId;
    /**
     * @param {ContractId} other
     * @returns {number}
     */
    compare(other: ContractId): number;
}
export type Client = import("../client/Client.js").default<any, any>;
import Key from "../Key.js";
import Long from "long";
import * as proto from "@hashgraph/proto";