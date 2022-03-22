"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Hbar = _interopRequireDefault(require("../Hbar.cjs"));

var _Transaction = _interopRequireWildcard(require("../transaction/Transaction.cjs"));

var _long = _interopRequireDefault(require("long"));

var _AccountId = _interopRequireDefault(require("../account/AccountId.cjs"));

var _Timestamp = _interopRequireDefault(require("../Timestamp.cjs"));

var _Duration = _interopRequireDefault(require("../Duration.cjs"));

var _CustomFixedFee = _interopRequireDefault(require("./CustomFixedFee.cjs"));

var _CustomFractionalFee = _interopRequireDefault(require("./CustomFractionalFee.cjs"));

var _CustomRoyaltyFee = _interopRequireDefault(require("./CustomRoyaltyFee.cjs"));

var _TokenType = _interopRequireDefault(require("./TokenType.cjs"));

var _TokenSupplyType = _interopRequireDefault(require("./TokenSupplyType.cjs"));

var _Key = _interopRequireDefault(require("../Key.cjs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @namespace proto
 * @typedef {import("@hashgraph/proto").ITransaction} proto.ITransaction
 * @typedef {import("@hashgraph/proto").ISignedTransaction} proto.ISignedTransaction
 * @typedef {import("@hashgraph/proto").TransactionBody} proto.TransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionBody} proto.ITransactionBody
 * @typedef {import("@hashgraph/proto").ITransactionResponse} proto.ITransactionResponse
 * @typedef {import("@hashgraph/proto").ITokenCreateTransactionBody} proto.ITokenCreateTransactionBody
 * @typedef {import("@hashgraph/proto").ITokenID} proto.ITokenID
 */

/**
 * @typedef {import("bignumber.js").default} BigNumber
 * @typedef {import("../channel/Channel.js").default} Channel
 * @typedef {import("../client/Client.js").default<*, *>} Client
 * @typedef {import("../transaction/TransactionId.js").default} TransactionId
 * @typedef {import("./CustomFee.js").default} CustomFee
 */

/**
 * Create a new Hedera™ crypto-currency token.
 */
class TokenCreateTransaction extends _Transaction.default {
  /**
   * @param {object} [props]
   * @param {string} [props.tokenName]
   * @param {string} [props.tokenSymbol]
   * @param {Long | number} [props.decimals]
   * @param {Long | number} [props.initialSupply]
   * @param {AccountId | string} [props.treasuryAccountId]
   * @param {Key} [props.adminKey]
   * @param {Key} [props.kycKey]
   * @param {Key} [props.freezeKey]
   * @param {Key} [props.pauseKey]
   * @param {Key} [props.wipeKey]
   * @param {Key} [props.supplyKey]
   * @param {Key} [props.feeScheduleKey]
   * @param {boolean} [props.freezeDefault]
   * @param {AccountId | string} [props.autoRenewAccountId]
   * @param {Timestamp | Date} [props.expirationTime]
   * @param {Duration | Long | number} [props.autoRenewPeriod]
   * @param {string} [props.tokenMemo]
   * @param {CustomFee[]} [props.customFees]
   * @param {TokenType} [props.tokenType]
   * @param {TokenSupplyType} [props.supplyType]
   * @param {Long | number} [props.maxSupply]
   */
  constructor(props = {}) {
    super();
    /**
     * @private
     * @type {?string}
     */

    this._tokenName = null;
    /**
     * @private
     * @type {?string}
     */

    this._tokenSymbol = null;
    /**
     * @private
     * @type {?Long}
     */

    this._decimals = null;
    /**
     * @private
     * @type {?Long}
     */

    this._initialSupply = null;
    /**
     * @private
     * @type {?AccountId}
     */

    this._treasuryAccountId = null;
    /**
     * @private
     * @type {?Key}
     */

    this._adminKey = null;
    /**
     * @private
     * @type {?Key}
     */

    this._kycKey = null;
    /**
     * @private
     * @type {?Key}
     */

    this._freezeKey = null;
    /**
     * @private
     * @type {?Key}
     */

    this._pauseKey = null;
    /**
     * @private
     * @type {?Key}
     */

    this._wipeKey = null;
    /**
     * @private
     * @type {?Key}
     */

    this._supplyKey = null;
    /**
     * @private
     * @type {?Key}
     */

    this._feeScheduleKey = null;
    /**
     * @private
     * @type {?boolean}
     */

    this._freezeDefault = null;
    /**
     * @private
     * @type {?AccountId}
     */

    this._autoRenewAccountId = null;
    /**
     * @private
     * @type {?Timestamp}
     */

    this._expirationTime = null;
    /**
     * @private
     * @type {?Duration}
     */

    this._autoRenewPeriod = new _Duration.default(_Transaction.DEFAULT_AUTO_RENEW_PERIOD);
    /**
     * @private
     * @type {?string}
     */

    this._tokenMemo = null;
    /**
     * @private
     * @type {CustomFee[]}
     */

    this._customFees = [];
    /**
     * @private
     * @type {?TokenType}
     */

    this._tokenType = null;
    /**
     * @private
     * @type {?TokenSupplyType}
     */

    this._supplyType = null;
    /**
     * @private
     * @type {?Long}
     */

    this._maxSupply = null;
    this._defaultMaxTransactionFee = new _Hbar.default(30);

    if (props.tokenName != null) {
      this.setTokenName(props.tokenName);
    }

    if (props.tokenSymbol != null) {
      this.setTokenSymbol(props.tokenSymbol);
    }

    if (props.decimals != null) {
      this.setDecimals(props.decimals);
    }

    if (props.initialSupply != null) {
      this.setInitialSupply(props.initialSupply);
    }

    if (props.treasuryAccountId != null) {
      this.setTreasuryAccountId(props.treasuryAccountId);
    }

    if (props.adminKey != null) {
      this.setAdminKey(props.adminKey);
    }

    if (props.kycKey != null) {
      this.setKycKey(props.kycKey);
    }

    if (props.freezeKey != null) {
      this.setFreezeKey(props.freezeKey);
    }

    if (props.pauseKey != null) {
      this.setPauseKey(props.pauseKey);
    }

    if (props.wipeKey != null) {
      this.setWipeKey(props.wipeKey);
    }

    if (props.supplyKey != null) {
      this.setSupplyKey(props.supplyKey);
    }

    if (props.feeScheduleKey != null) {
      this.setFeeScheduleKey(props.feeScheduleKey);
    }

    if (props.freezeDefault != null) {
      this.setFreezeDefault(props.freezeDefault);
    }

    if (props.autoRenewAccountId != null) {
      this.setAutoRenewAccountId(props.autoRenewAccountId);
    }

    if (props.expirationTime != null) {
      this.setExpirationTime(props.expirationTime);
    }

    if (props.autoRenewPeriod != null) {
      this.setAutoRenewPeriod(props.autoRenewPeriod);
    }

    if (props.tokenMemo != null) {
      this.setTokenMemo(props.tokenMemo);
    }

    if (props.customFees != null) {
      this.setCustomFees(props.customFees);
    }

    if (props.tokenType != null) {
      this.setTokenType(props.tokenType);
    }

    if (props.supplyType != null) {
      this.setSupplyType(props.supplyType);
    }

    if (props.maxSupply != null) {
      this.setMaxSupply(props.maxSupply);
    }
  }
  /**
   * @internal
   * @param {proto.ITransaction[]} transactions
   * @param {proto.ISignedTransaction[]} signedTransactions
   * @param {TransactionId[]} transactionIds
   * @param {AccountId[]} nodeIds
   * @param {proto.ITransactionBody[]} bodies
   * @returns {TokenCreateTransaction}
   */


  static _fromProtobuf(transactions, signedTransactions, transactionIds, nodeIds, bodies) {
    const body = bodies[0];
    const create =
    /** @type {proto.ITokenCreateTransactionBody} */
    body.tokenCreation;
    return _Transaction.default._fromProtobufTransactions(new TokenCreateTransaction({
      tokenName: create.name != null ? create.name : undefined,
      tokenSymbol: create.symbol != null ? create.symbol : undefined,
      decimals: create.decimals != null ? create.decimals : undefined,
      initialSupply: create.initialSupply != null ? create.initialSupply : undefined,
      treasuryAccountId: create.treasury != null ? _AccountId.default._fromProtobuf(create.treasury) : undefined,
      adminKey: create.adminKey != null ? _Key.default._fromProtobufKey(create.adminKey) : undefined,
      kycKey: create.kycKey != null ? _Key.default._fromProtobufKey(create.kycKey) : undefined,
      freezeKey: create.freezeKey != null ? _Key.default._fromProtobufKey(create.freezeKey) : undefined,
      pauseKey: create.pauseKey != null ? _Key.default._fromProtobufKey(create.pauseKey) : undefined,
      wipeKey: create.wipeKey != null ? _Key.default._fromProtobufKey(create.wipeKey) : undefined,
      supplyKey: create.supplyKey != null ? _Key.default._fromProtobufKey(create.supplyKey) : undefined,
      feeScheduleKey: create.feeScheduleKey != null ? _Key.default._fromProtobufKey(create.feeScheduleKey) : undefined,
      freezeDefault: create.freezeDefault != null ? create.freezeDefault : undefined,
      autoRenewAccountId: create.autoRenewAccount != null ? _AccountId.default._fromProtobuf(create.autoRenewAccount) : undefined,
      expirationTime: create.expiry != null ? _Timestamp.default._fromProtobuf(create.expiry) : undefined,
      autoRenewPeriod: create.autoRenewPeriod != null ? _Duration.default._fromProtobuf(create.autoRenewPeriod) : undefined,
      tokenMemo: create.memo != null ? create.memo : undefined,
      customFees: create.customFees != null ? create.customFees.map(fee => {
        if (fee.fixedFee != null) {
          return _CustomFixedFee.default._fromProtobuf(fee);
        } else if (fee.fractionalFee != null) {
          return _CustomFractionalFee.default._fromProtobuf(fee);
        } else {
          return _CustomRoyaltyFee.default._fromProtobuf(fee);
        }
      }) : undefined,
      tokenType: create.tokenType != null ? _TokenType.default._fromCode(create.tokenType) : undefined,
      supplyType: create.supplyType != null ? _TokenSupplyType.default._fromCode(create.supplyType) : undefined,
      maxSupply: create.maxSupply != null ? create.maxSupply : undefined
    }), transactions, signedTransactions, transactionIds, nodeIds, bodies);
  }
  /**
   * @returns {?string}
   */


  get tokenName() {
    return this._tokenName;
  }
  /**
   * @param {string} name
   * @returns {this}
   */


  setTokenName(name) {
    this._requireNotFrozen();

    this._tokenName = name;
    return this;
  }
  /**
   * @returns {?string}
   */


  get tokenSymbol() {
    return this._tokenSymbol;
  }
  /**
   * @param {string} symbol
   * @returns {this}
   */


  setTokenSymbol(symbol) {
    this._requireNotFrozen();

    this._tokenSymbol = symbol;
    return this;
  }
  /**
   * @returns {?Long}
   */


  get decimals() {
    return this._decimals;
  }
  /**
   * @param {Long | number} decimals
   * @returns {this}
   */


  setDecimals(decimals) {
    this._requireNotFrozen();

    this._decimals = decimals instanceof _long.default ? decimals : _long.default.fromValue(decimals);
    return this;
  }
  /**
   * @returns {?Long}
   */


  get initialSupply() {
    return this._initialSupply;
  }
  /**
   * @param {Long | number} initialSupply
   * @returns {this}
   */


  setInitialSupply(initialSupply) {
    this._requireNotFrozen();

    this._initialSupply = _long.default.fromValue(initialSupply);
    return this;
  }
  /**
   * @returns {?AccountId}
   */


  get treasuryAccountId() {
    return this._treasuryAccountId;
  }
  /**
   * @param {AccountId | string} id
   * @returns {this}
   */


  setTreasuryAccountId(id) {
    this._requireNotFrozen();

    this._treasuryAccountId = typeof id === "string" ? _AccountId.default.fromString(id) : id.clone();
    return this;
  }
  /**
   * @returns {?Key}
   */


  get adminKey() {
    return this._adminKey;
  }
  /**
   * @param {Key} key
   * @returns {this}
   */


  setAdminKey(key) {
    this._requireNotFrozen();

    this._adminKey = key;
    return this;
  }
  /**
   * @returns {?Key}
   */


  get kycKey() {
    return this._kycKey;
  }
  /**
   * @param {Key} key
   * @returns {this}
   */


  setKycKey(key) {
    this._requireNotFrozen();

    this._kycKey = key;
    return this;
  }
  /**
   * @returns {?Key}
   */


  get freezeKey() {
    return this._freezeKey;
  }
  /**
   * @param {Key} key
   * @returns {this}
   */


  setFreezeKey(key) {
    this._requireNotFrozen();

    this._freezeKey = key;
    return this;
  }
  /**
   * @returns {?Key}
   */


  get pauseKey() {
    return this._pauseKey;
  }
  /**
   * @param {Key} key
   * @returns {this}
   */


  setPauseKey(key) {
    this._requireNotFrozen();

    this._pauseKey = key;
    return this;
  }
  /**
   * @returns {?Key}
   */


  get wipeKey() {
    return this._wipeKey;
  }
  /**
   * @param {Key} key
   * @returns {this}
   */


  setWipeKey(key) {
    this._requireNotFrozen();

    this._wipeKey = key;
    return this;
  }
  /**
   * @returns {?Key}
   */


  get supplyKey() {
    return this._supplyKey;
  }
  /**
   * @param {Key} key
   * @returns {this}
   */


  setSupplyKey(key) {
    this._requireNotFrozen();

    this._supplyKey = key;
    return this;
  }
  /**
   * @returns {?Key}
   */


  get feeScheduleKey() {
    return this._feeScheduleKey;
  }
  /**
   * @param {Key} key
   * @returns {this}
   */


  setFeeScheduleKey(key) {
    this._requireNotFrozen();

    this._feeScheduleKey = key;
    return this;
  }
  /**
   * @returns {?boolean}
   */


  get freezeDefault() {
    return this._freezeDefault;
  }
  /**
   * @param {boolean} freeze
   * @returns {this}
   */


  setFreezeDefault(freeze) {
    this._requireNotFrozen();

    this._freezeDefault = freeze;
    return this;
  }
  /**
   * @returns {?Timestamp}
   */


  get expirationTime() {
    return this._expirationTime;
  }
  /**
   * @param {Timestamp | Date} time
   * @returns {this}
   */


  setExpirationTime(time) {
    this._requireNotFrozen();

    this._autoRenewPeriod = null;
    this._expirationTime = time instanceof _Timestamp.default ? time : _Timestamp.default.fromDate(time);
    return this;
  }
  /**
   * @returns {?AccountId}
   */


  get autoRenewAccountId() {
    return this._autoRenewAccountId;
  }
  /**
   * @param {AccountId | string} id
   * @returns {this}
   */


  setAutoRenewAccountId(id) {
    this._requireNotFrozen();

    this._autoRenewAccountId = id instanceof _AccountId.default ? id : _AccountId.default.fromString(id);
    return this;
  }
  /**
   * @returns {?Duration}
   */


  get autoRenewPeriod() {
    return this._autoRenewPeriod;
  }
  /**
   * Set the auto renew period for this token.
   *
   * @param {Duration | Long | number} autoRenewPeriod
   * @returns {this}
   */


  setAutoRenewPeriod(autoRenewPeriod) {
    this._requireNotFrozen();

    this._autoRenewPeriod = autoRenewPeriod instanceof _Duration.default ? autoRenewPeriod : new _Duration.default(autoRenewPeriod);
    return this;
  }
  /**
   * @returns {?string}
   */


  get tokenMemo() {
    return this._tokenMemo;
  }
  /**
   * @param {string} memo
   * @returns {this}
   */


  setTokenMemo(memo) {
    this._requireNotFrozen();

    this._tokenMemo = memo;
    return this;
  }
  /**
   * @returns {CustomFee[]}
   */


  get customFees() {
    return this._customFees;
  }
  /**
   * @param {CustomFee[]} customFees
   * @returns {this}
   */


  setCustomFees(customFees) {
    this._customFees = customFees;
    return this;
  }
  /**
   * @returns {?TokenType}
   */


  get tokenType() {
    return this._tokenType;
  }
  /**
   * @param {TokenType} tokenType
   * @returns {this}
   */


  setTokenType(tokenType) {
    this._tokenType = tokenType;
    return this;
  }
  /**
   * @returns {?TokenSupplyType}
   */


  get supplyType() {
    return this._supplyType;
  }
  /**
   * @param {TokenSupplyType} supplyType
   * @returns {this}
   */


  setSupplyType(supplyType) {
    this._supplyType = supplyType;
    return this;
  }
  /**
   * @returns {?Long}
   */


  get maxSupply() {
    return this._maxSupply;
  }
  /**
   * @param {Long | number} maxSupply
   * @returns {this}
   */


  setMaxSupply(maxSupply) {
    this._maxSupply = typeof maxSupply === "number" ? _long.default.fromNumber(maxSupply) : maxSupply;
    return this;
  }
  /**
   * @param {?import("../client/Client.js").default<Channel, *>} client
   * @returns {this}
   */


  freezeWith(client) {
    if (this._autoRenewPeriod != null && client != null && client.operatorAccountId) {
      this._autoRenewAccountId = client.operatorAccountId;
    }

    return super.freezeWith(client);
  }
  /**
   * @param {Client} client
   */


  _validateChecksums(client) {
    if (this._treasuryAccountId != null) {
      this._treasuryAccountId.validateChecksum(client);
    }

    if (this._autoRenewAccountId != null) {
      this._autoRenewAccountId.validateChecksum(client);
    }
  }
  /**
   * @override
   * @internal
   * @param {Channel} channel
   * @param {proto.ITransaction} request
   * @returns {Promise<proto.ITransactionResponse>}
   */


  _execute(channel, request) {
    return channel.token.createToken(request);
  }
  /**
   * @override
   * @protected
   * @returns {NonNullable<proto.TransactionBody["data"]>}
   */


  _getTransactionDataCase() {
    return "tokenCreation";
  }
  /**
   * @override
   * @protected
   * @returns {proto.ITokenCreateTransactionBody}
   */


  _makeTransactionData() {
    return {
      name: this._tokenName,
      symbol: this._tokenSymbol,
      decimals: this._decimals != null ? this._decimals.toInt() : null,
      initialSupply: this._initialSupply,
      treasury: this._treasuryAccountId != null ? this._treasuryAccountId._toProtobuf() : null,
      adminKey: this._adminKey != null ? this._adminKey._toProtobufKey() : null,
      kycKey: this._kycKey != null ? this._kycKey._toProtobufKey() : null,
      freezeKey: this._freezeKey != null ? this._freezeKey._toProtobufKey() : null,
      pauseKey: this._pauseKey != null ? this._pauseKey._toProtobufKey() : null,
      wipeKey: this._wipeKey != null ? this._wipeKey._toProtobufKey() : null,
      supplyKey: this._supplyKey != null ? this._supplyKey._toProtobufKey() : null,
      feeScheduleKey: this._feeScheduleKey != null ? this._feeScheduleKey._toProtobufKey() : null,
      freezeDefault: this._freezeDefault,
      autoRenewAccount: this._autoRenewAccountId != null ? this._autoRenewAccountId._toProtobuf() : null,
      expiry: this._expirationTime != null ? this._expirationTime._toProtobuf() : null,
      autoRenewPeriod: this._autoRenewPeriod != null ? this._autoRenewPeriod._toProtobuf() : null,
      memo: this._tokenMemo,
      customFees: this.customFees.map(fee => fee._toProtobuf()),
      tokenType: this._tokenType != null ? this._tokenType._code : null,
      supplyType: this._supplyType != null ? this._supplyType._code : null,
      maxSupply: this.maxSupply
    };
  }
  /**
   * @returns {string}
   */


  _getLogId() {
    const timestamp =
    /** @type {import("../Timestamp.js").default} */
    this._transactionIds.current.validStart;
    return `TokenCreateTransaction:${timestamp.toString()}`;
  }

}

exports.default = TokenCreateTransaction;

_Transaction.TRANSACTION_REGISTRY.set("tokenCreation", // eslint-disable-next-line @typescript-eslint/unbound-method
TokenCreateTransaction._fromProtobuf);