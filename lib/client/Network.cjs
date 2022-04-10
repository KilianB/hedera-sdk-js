"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AccountId = _interopRequireDefault(require("../account/AccountId.cjs"));

var _Node = _interopRequireDefault(require("../Node.cjs"));

var _AddressBooks = require("../address_book/AddressBooks.cjs");

var _ManagedNetwork = _interopRequireDefault(require("./ManagedNetwork.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../address_book/NodeAddressBook.js").default} NodeAddressBook
 */

/**
 * @augments {ManagedNetwork<Channel, Node, AccountId>}
 */
class Network extends _ManagedNetwork.default {
  /**
   * @param {(address: string) => Channel} createNetworkChannel
   */
  constructor(createNetworkChannel) {
    super(createNetworkChannel);
    this._maxNodesPerTransaction = -1;
    /** @type {NodeAddressBook | null} */

    this._addressBook = null;
  }
  /**
   * @param {{[key: string]: (string | AccountId)}} network
   */


  setNetwork(network) {
    this._setNetwork( // eslint-disable-next-line ie11/no-collection-args
    new Map( // eslint-disable-next-line ie11/no-collection-args
    Object.entries(network).map(([key, value]) => {
      return [key, typeof value === "string" ? _AccountId.default.fromString(value) : value];
    })));
  }
  /**
   * @returns {{[key: string]: (string | AccountId)}}
   */


  get network() {
    /**
     * @type {{[key: string]: (string | AccountId)}}
     */
    var n = {}; // eslint-disable-next-line @typescript-eslint/no-unused-vars

    for (const node of this._nodes) {
      n[node.address.toString()] = node.accountId;
    }

    return n;
  }
  /**
   * @param {string} networkName
   * @returns {this}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  setNetworkName(networkName) {
    super.setLedgerId(networkName);

    switch (networkName) {
      case "mainnet":
        this._addressBook = _AddressBooks.MAINNET_ADDRESS_BOOK;
        break;

      case "testnet":
        this._addressBook = _AddressBooks.TESTNET_ADDRESS_BOOK;
        break;

      case "previewnet":
        this._addressBook = _AddressBooks.PREVIEWNET_ADDRESS_BOOK;
        break;
    }

    if (this._addressBook != null) {
      for (const node of this._nodes) {
        for (const address of this._addressBook.nodeAddresses) {
          if (address.accountId != null && address.accountId.toString() === node.accountId.toString()) {
            node.setNodeAddress(address);
          }
        }
      }
    }

    return this;
  }
  /**
   * @returns {string | null}
   */


  get networkName() {
    return this._ledgerId != null ? this._ledgerId.toString() : null;
  }
  /**
   * @abstract
   * @param {[string, (string | AccountId)]} entry
   * @returns {Node}
   */


  _createNodeFromNetworkEntry(entry) {
    const accountId = typeof entry[1] === "string" ? _AccountId.default.fromString(entry[1]) : entry[1];
    return new _Node.default({
      newNode: {
        address: entry[0],
        accountId,
        channelInitFunction: this._createNetworkChannel
      }
    }).setMinBackoff(this._minBackoff);
  }
  /**
   * @abstract
   * @param {Map<string, AccountId>} network
   * @returns {number[]}
   */


  _getNodesToRemove(network) {
    const indexes = [];

    for (let i = this._nodes.length - 1; i >= 0; i--) {
      const node = this._nodes[i];
      const accountId = network.get(node.address.toString());

      if (accountId == null || accountId.toString() !== node.accountId.toString()) {
        indexes.push(i);
      }
    }

    return indexes;
  }
  /**
   * @abstract
   * @param {[string, (string | AccountId)]} entry
   * @returns {boolean}
   */


  _checkNetworkContainsEntry(entry) {
    for (const node of this._nodes) {
      if (node.address.toString() === entry[0]) {
        return true;
      }
    }

    return false;
  }
  /**
   * @returns {number}
   */


  get maxNodesPerTransaction() {
    return this._maxNodesPerTransaction;
  }
  /**
   * @param {number} maxNodesPerTransaction
   * @returns {this}
   */


  setMaxNodesPerTransaction(maxNodesPerTransaction) {
    this._maxNodesPerTransaction = maxNodesPerTransaction;
    return this;
  }
  /**
   * @returns {number}
   */


  get maxNodeAttempts() {
    return this._maxNodeAttempts;
  }
  /**
   * @param {number} maxNodeAttempts
   * @returns {this}
   */


  setMaxNodeAttempts(maxNodeAttempts) {
    this._maxNodeAttempts = maxNodeAttempts;
    return this;
  }
  /**
   * @internal
   * @returns {number}
   */


  getNumberOfNodesForTransaction() {
    if (this._maxNodesPerTransaction > 0) {
      return this._maxNodesPerTransaction;
    }

    return (this._nodes.length + 3 - 1) / 3;
  }
  /**
   * @internal
   * @returns {AccountId[]}
   */


  getNodeAccountIdsForExecute() {
    return this._getNumberOfMostHealthyNodes(this.getNumberOfNodesForTransaction()).map(node => node.accountId);
  }

}

exports.default = Network;