"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.digest = digest;

/**
 * @param {Uint8Array} data
 * @returns {Promise<Uint8Array>}
 */
async function digest(data) {
  // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
  return new Uint8Array(await window.crypto.subtle.digest("SHA-384", data));
}