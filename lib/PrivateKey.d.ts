/**
 * @typedef {import("./transaction/Transaction.js").default} Transaction
 * @typedef {import("./account/AccountId.js").default} AccountId
 */
/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").IKey} proto.IKey
 * @typedef {import("@hashgraph/proto").ITransaction} proto.ITransaction
 * @typedef {import("@hashgraph/proto").ISignaturePair} proto.ISignaturePair
 * @typedef {import("@hashgraph/proto").ISignedTransaction} proto.ISignedTransaction
 */
export default class PrivateKey extends Key {
    /**
     * Generate a random Ed25519 private key.
     *
     * @returns {PrivateKey}
     */
    static generateED25519(): PrivateKey;
    /**
     * Generate a random EDSA private key.
     *
     * @returns {PrivateKey}
     */
    static generateECDSA(): PrivateKey;
    /**
     * Depredated - Use `generateEd25519()` instead
     * Generate a random Ed25519 private key.
     *
     * @returns {PrivateKey}
     */
    static generate(): PrivateKey;
    /**
     * Depredated - Use `generateEd25519Async()` instead
     * Generate a random Ed25519 private key.
     *
     * @returns {Promise<PrivateKey>}
     */
    static generateAsync(): Promise<PrivateKey>;
    /**
     * Generate a random Ed25519 private key.
     *
     * @returns {Promise<PrivateKey>}
     */
    static generateED25519Async(): Promise<PrivateKey>;
    /**
     * Generate a random ECDSA private key.
     *
     * @returns {Promise<PrivateKey>}
     */
    static generateECDSAAsync(): Promise<PrivateKey>;
    /**
     * Construct a private key from bytes. Requires DER header.
     *
     * @param {Uint8Array} data
     * @returns {PrivateKey}
     */
    static fromBytes(data: Uint8Array): PrivateKey;
    /**
     * Construct a ECDSA private key from bytes.
     *
     * @param {Uint8Array} data
     * @returns {PrivateKey}
     */
    static fromBytesECDSA(data: Uint8Array): PrivateKey;
    /**
     * Construct a ED25519 private key from bytes.
     *
     * @param {Uint8Array} data
     * @returns {PrivateKey}
     */
    static fromBytesED25519(data: Uint8Array): PrivateKey;
    /**
     * Construct a private key from a hex-encoded string. Requires DER header.
     *
     * @param {string} text
     * @returns {PrivateKey}
     */
    static fromString(text: string): PrivateKey;
    /**
     * Construct a ECDSA private key from a hex-encoded string.
     *
     * @param {string} text
     * @returns {PrivateKey}
     */
    static fromStringECDSA(text: string): PrivateKey;
    /**
     * Construct a Ed25519 private key from a hex-encoded string.
     *
     * @param {string} text
     * @returns {PrivateKey}
     */
    static fromStringED25519(text: string): PrivateKey;
    /**
     * Recover a private key from a mnemonic phrase (and optionally a password).
     *
     * @param {Mnemonic | cryptography.Mnemonic | string} mnemonic
     * @param {string} [passphrase]
     * @returns {Promise<PrivateKey>}
     */
    static fromMnemonic(mnemonic: Mnemonic | cryptography.Mnemonic | string, passphrase?: string | undefined): Promise<PrivateKey>;
    /**
     * Recover a private key from a keystore, previously created by `.toKeystore()`.
     *
     * This key will _not_ support child key derivation.
     *
     * @param {Uint8Array} data
     * @param {string} [passphrase]
     * @returns {Promise<PrivateKey>}
     * @throws {BadKeyError} If the passphrase is incorrect or the hash fails to validate.
     */
    static fromKeystore(data: Uint8Array, passphrase?: string | undefined): Promise<PrivateKey>;
    /**
     * Recover a private key from a pem string; the private key may be encrypted.
     *
     * This method assumes the .pem file has been converted to a string already.
     *
     * If `passphrase` is not null or empty, this looks for the first `ENCRYPTED PRIVATE KEY`
     * section and uses `passphrase` to decrypt it; otherwise, it looks for the first `PRIVATE KEY`
     * section and decodes that as a DER-encoded  private key.
     *
     * @param {string} data
     * @param {string} [passphrase]
     * @returns {Promise<PrivateKey>}
     */
    static fromPem(data: string, passphrase?: string | undefined): Promise<PrivateKey>;
    /**
     * @internal
     * @hideconstructor
     * @param {cryptography.PrivateKey} key
     */
    constructor(key: cryptography.PrivateKey);
    _key: cryptography.PrivateKey;
    /**
     * Derive a new private key at the given wallet index.
     *
     * Only currently supported for keys created with `fromMnemonic()`; other keys will throw
     * an error.
     *
     * You can check if a key supports derivation with `.supportsDerivation()`
     *
     * @param {number} index
     * @returns {Promise<PrivateKey>}
     * @throws If this key does not support derivation.
     */
    derive(index: number): Promise<PrivateKey>;
    /**
     * @param {number} index
     * @returns {Promise<PrivateKey>}
     * @throws If this key does not support derivation.
     */
    legacyDerive(index: number): Promise<PrivateKey>;
    /**
     * Get the public key associated with this private key.
     *
     * The public key can be freely given and used by other parties to verify
     * the signatures generated by this private key.
     *
     * @returns {PublicKey}
     */
    get publicKey(): PublicKey;
    /**
     * Sign a message with this private key.
     *
     * @param {Uint8Array} bytes
     * @returns {Uint8Array} - The signature bytes without the message
     */
    sign(bytes: Uint8Array): Uint8Array;
    /**
     * @param {Transaction} transaction
     * @returns {Uint8Array}
     */
    signTransaction(transaction: Transaction): Uint8Array;
    /**
     * Check if `derive` can be called on this private key.
     *
     * This is only the case if the key was created from a mnemonic.
     *
     * @returns {boolean}
     */
    isDerivable(): boolean;
    /**
     * @returns {Uint8Array}
     */
    toBytes(): Uint8Array;
    /**
     * @returns {Uint8Array}
     */
    toBytesDer(): Uint8Array;
    /**
     * @returns {Uint8Array}
     */
    toBytesRaw(): Uint8Array;
    /**
     * @returns {string}
     */
    toStringDer(): string;
    /**
     * @returns {string}
     */
    toStringRaw(): string;
    /**
     * Create a keystore with a given passphrase.
     *
     * The key can be recovered later with `fromKeystore()`.
     *
     * Note that this will not retain the ancillary data used for
     * deriving child keys, thus `.derive()` on the restored key will
     * throw even if this instance supports derivation.
     *
     * @param {string} [passphrase]
     * @returns {Promise<Uint8Array>}
     */
    toKeystore(passphrase?: string | undefined): Promise<Uint8Array>;
    /**
     * @param {Long | number} shard
     * @param {Long | number} realm
     * @returns {AccountId}
     */
    toAccountId(shard: Long | number, realm: Long | number): AccountId;
}
export type Transaction = import("./transaction/Transaction.js").default;
export type AccountId = import("./account/AccountId.js").default;
export namespace proto {
    type IKey = import("@hashgraph/proto").IKey;
    type ITransaction = import("@hashgraph/proto").ITransaction;
    type ISignaturePair = import("@hashgraph/proto").ISignaturePair;
    type ISignedTransaction = import("@hashgraph/proto").ISignedTransaction;
}
import Key from "./Key.js";
import * as cryptography from "@hashgraph/cryptography";
import PublicKey from "./PublicKey.js";
import Mnemonic from "./Mnemonic.js";
