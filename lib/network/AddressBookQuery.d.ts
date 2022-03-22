/**
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../channel/MirrorChannel.js").default} MirrorChannel
 * @typedef {import("../channel/MirrorChannel.js").MirrorError} MirrorError
 */
/**
 * @template {Channel} ChannelT
 * @typedef {import("../client/Client.js").default<ChannelT, MirrorChannel>} Client<ChannelT, MirrorChannel>
 */
export default class AddresesBookQuery {
    /**
     * @param {object} props
     * @param {FileId | string} [props.fileId]
     * @param {number} [props.limit]
     */
    constructor(props?: {
        fileId?: string | FileId | undefined;
        limit?: number | undefined;
    });
    /**
     * @private
     * @type {?FileId}
     */
    private _fileId;
    /**
     * @private
     * @type {?number}
     */
    private _limit;
    /**
     * @private
     * @type {(error: MirrorError | Error | null) => boolean}
     */
    private _retryHandler;
    /** @type {NodeAddress[]} */
    _addresses: NodeAddress[];
    /**
     * @private
     * @type {number}
     */
    private _maxAttempts;
    /**
     * @private
     * @type {number}
     */
    private _maxBackoff;
    /**
     * @private
     * @type {number}
     */
    private _attempt;
    /**
     * @returns {?FileId}
     */
    get fileId(): FileId | null;
    /**
     * @param {FileId | string} fileId
     * @returns {AddresesBookQuery}
     */
    setFileId(fileId: FileId | string): AddresesBookQuery;
    /**
     * @returns {?number}
     */
    get limit(): number | null;
    /**
     * @param {number} limit
     * @returns {AddresesBookQuery}
     */
    setLimit(limit: number): AddresesBookQuery;
    /**
     * @param {number} attempts
     */
    setMaxAttempts(attempts: number): void;
    /**
     * @param {number} backoff
     */
    setMaxBackoff(backoff: number): void;
    /**
     * @param {Client<Channel>} client
     * @param {number=} requestTimeout
     * @returns {Promise<NodeAddressBook>}
     */
    execute(client: import("../client/Client.js").default<import("../channel/Channel.js").default, import("../channel/MirrorChannel.js").default>, requestTimeout?: number | undefined): Promise<NodeAddressBook>;
    /**
     * @private
     * @param {Client<Channel>} client
     * @param {(value: NodeAddressBook) => void} resolve
     * @param {(error: Error) => void} reject
     * @param {number=} requestTimeout
     */
    private _makeServerStreamRequest;
}
export type Channel = import("../channel/Channel.js").default;
export type MirrorChannel = import("../channel/MirrorChannel.js").default;
export type MirrorError = import("../channel/MirrorChannel.js").MirrorError;
/**
 * <ChannelT, MirrorChannel>
 */
export type Client<ChannelT extends import("../channel/Channel.js").default> = import("../client/Client.js").default<ChannelT, MirrorChannel>;
import NodeAddress from "../address_book/NodeAddress.js";
import FileId from "../file/FileId.js";
import NodeAddressBook from "../address_book/NodeAddressBook.js";
