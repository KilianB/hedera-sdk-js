/**
 * @param {Uint8Array} data
 * @returns {string}
 */
export function encode(data: Uint8Array): string;
/**
 * @param {string} text
 * @returns {Uint8Array}
 */
export function decode(text: string): Uint8Array;
/**
 * @param {Uint8Array} data
 * @returns {string}
 */
export function encodeToByteString(data: Uint8Array): string;
/**
 * @param {string} text
 * @returns {Uint8Array}
 */
export function decodeFromByteString(text: string): Uint8Array;
