/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").IConsensusTopicResponse} proto.IConsensusTopicResponse
 * @typedef {import("@hashgraph/proto").ITimestamp} proto.ITimestamp
 */
export default class TopicMessage {
    /**
     * @internal
     * @param {proto.IConsensusTopicResponse} response
     * @returns {TopicMessage}
     */
    static _ofSingle(response: proto.IConsensusTopicResponse): TopicMessage;
    /**
     * @internal
     * @param {proto.IConsensusTopicResponse[]} responses
     * @returns {TopicMessage}
     */
    static _ofMany(responses: proto.IConsensusTopicResponse[]): TopicMessage;
    /**
     * @private
     * @param {object} props
     * @param {Timestamp} props.consensusTimestamp
     * @param {Uint8Array} props.contents
     * @param {Uint8Array} props.runningHash
     * @param {AccountId | null} props.payerAccountId
     * @param {TransactionId | null} props.transactionId
     * @param {Long} props.sequenceNumber
     * @param {TopicMessageChunk[]} props.chunks
     */
    private constructor();
    /** @readonly */
    readonly consensusTimestamp: Timestamp;
    /** @readonly */
    readonly contents: Uint8Array;
    /** @readonly */
    readonly payerAccountId: AccountId | null;
    /** @readonly */
    readonly transactionId: TransactionId | null;
    /** @readonly */
    readonly runningHash: Uint8Array;
    /** @readonly */
    readonly sequenceNumber: Long.Long;
    /** @readonly */
    readonly chunks: TopicMessageChunk[];
}
export namespace proto {
    type IConsensusTopicResponse = import("@hashgraph/proto").IConsensusTopicResponse;
    type ITimestamp = import("@hashgraph/proto").ITimestamp;
}
import Timestamp from "../Timestamp.js";
import AccountId from "../account/AccountId.js";
import TransactionId from "../transaction/TransactionId.js";
import Long from "long";
import TopicMessageChunk from "./TopicMessageChunk.js";