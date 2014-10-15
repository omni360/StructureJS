/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory();
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.MerchantUtil = factory();
    }
}(this, function() {
    'use strict';

    /**
    * A MerchantUtility class that has several static methods to assist in development.
    *
    * @class MerchantUtil
    * @module StructureJS
    * @submodule util
    * @constructor
    * @author Robert S. (www.codeBelt.com)
    */
    var MerchantUtil = (function () {
        function MerchantUtil() {
        }
        /**
        * Determines if credit card is valid using the Luhn formula.
        * @example
        MerchantUtil.isCreditCard("4556106734384949");
        * @method isCreditCard
        * @param cardNumber {string} The credit card number.
        * @returns {boolean} <code>true</code> if String is a valid credit card number; otherwise <code>false</code>.
        * @public
        * @static
        */
        MerchantUtil.isCreditCard = function (cardNumber) {
            if (cardNumber.length < 7 || cardNumber.length > 19 || Number(cardNumber) < 1000000) {
                return false;
            }

            var pre;
            var sum = 0;
            var alt = true;
            var i = cardNumber.length;
            while (--i > -1) {
                if (alt) {
                    sum += Number(cardNumber.substr(i, 1));
                } else {
                    pre = Number(cardNumber.substr(i, 1)) * 2;
                    sum += (pre > 8) ? pre -= 9 : pre;
                }

                alt = !alt;
            }

            return sum % 10 == 0;
        };

        /**
        * Encode a credit card number as a string and encode all digits except the last <code>digitsShown</code>.
        *
        * @example
        * MerchantUtil.encodeCreditCardNumber("4556106734384949"); // ************4949
        * MerchantUtil.encodeCreditCardNumber("4556106734384949", 5, "x");  // xxxxxxxxxxx84949
        *
        * @method encodeCreditCardNumber
        * @param strNumber {string} The credit card number as string.
        * @param [digitsShown=4] {number} Display this many digits at the end of the card number for security purposes.
        * @param [encodeChar=*] {string} Optional encoding character to use instead of default '*'.
        * @returns {string}
        * @public
        * @static
        */
        MerchantUtil.encodeCreditCardNumber = function (strNumber, digitsShown, encodeChar) {
            if (typeof digitsShown === "undefined") { digitsShown = 4; }
            if (typeof encodeChar === "undefined") { encodeChar = "*"; }
            var encoded = "";
            for (var i = 0; i < strNumber.length - digitsShown; i++) {
                encoded += encodeChar;
            }
            encoded += strNumber.slice(-digitsShown);
            return encoded;
        };

        /**
        * Returns a credit card provider name from the credit card number passed in.
        *
        * @method getCreditCardProvider
        * @param cardNumber {string}
        * @returns {string}
        */
        MerchantUtil.getCreditCardProvider = function (cardNumber) {
            if (MerchantUtil.isCreditCard(cardNumber) == false) {
                return 'invalid';
            }

            if (cardNumber.length == 13 || cardNumber.length == 16 && cardNumber.indexOf('4') == 0) {
                return 'visa';
            } else if (cardNumber.indexOf('51') == 0 || cardNumber.indexOf('52') == 0 || cardNumber.indexOf('53') == 0 || cardNumber.indexOf('54') == 0 || cardNumber.indexOf('55') == 0 && cardNumber.length == 16) {
                return 'mastercard';
            } else if (cardNumber.length == 16 && cardNumber.indexOf('6011') == 0) {
                return 'discover';
            } else if (cardNumber.indexOf('34') == 0 || cardNumber.indexOf('37') == 0 && cardNumber.length == 15) {
                return 'amex';
            } else if (cardNumber.indexOf('300') == 0 || cardNumber.indexOf('301') == 0 || cardNumber.indexOf('302') == 0 || cardNumber.indexOf('303') == 0 || cardNumber.indexOf('304') == 0 || cardNumber.indexOf('305') == 0 || cardNumber.indexOf('36') == 0 || cardNumber.indexOf('38') == 0 && cardNumber.length == 14) {
                return 'diners';
            } else {
                return 'other';
            }
        };

        /**
        * Validate a credit card's expiration date.
        * @example
        * var isValidDate:boolean = MerchantUtil.isValidExDate( 11, 2010 );
        *
        * @method isValidExpirationDate
        * @param month {number}
        * @param year {number}
        * @returns {boolean}
        */
        MerchantUtil.isValidExpirationDate = function (month, year) {
            var d = new Date();
            var currentMonth = d.getMonth() + 1;
            var currentYear = d.getFullYear();
            if ((year > currentYear) || (year == currentYear && month >= currentMonth)) {
                return true;
            }
            return false;
        };
        return MerchantUtil;
    })();

    return MerchantUtil;
}));