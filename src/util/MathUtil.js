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
        root.structurejs.MathUtil = factory();
    }
}(this, function() {
    'use strict';

    /**
    * The MathUtil...
    *
    * @class MathUtil
    * @module StructureJS
    * @submodule util
    * @author Robert S. (www.codeBelt.com)
    * @static
    */
    var MathUtil = (function () {
        function MathUtil() {
        }
        /**
        * Returns a number constrained between min and max.
        *
        * @method constrain
        * @param num {number}
        * @param min {number}
        * @param  max {number}
        * @return  {number}
        */
        MathUtil.constrain = function (num, min, max) {
            if (typeof min === "undefined") { min = 0; }
            if (typeof max === "undefined") { max = 1; }
            if (num < min) {
                return min;
            }
            if (num > max) {
                return max;
            }
            return num;
        };

        /**
        * Returns a random number between min and max.
        *
        * @method randomRange
        * @param min {number}
        * @param max {number}
        * @param [wholeNumber=true] {number}
        * @return {number}
        */
        MathUtil.randomRange = function (min, max, wholeNumber) {
            if (typeof wholeNumber === "undefined") { wholeNumber = true; }
            var num = (min + Math.random() * (max - min));

            if (wholeNumber) {
                return Math.round(num);
            }
            return num;
        };

        /**
        * Returns the percentage of a number in a given range.
        * Example: num = 15 range 10 to 20 // outputs 0.5
        *
        * @method rangeToPercent
        * @param num {number}
        * @param min {number}
        * @param max {number}
        * @param constrainMin {boolean}        Returns 0 if num < min.
        * @param constrainMax {boolean}        Returns 1 if num > max.
        * @return {number}
        */
        MathUtil.rangeToPercent = function (num, min, max, constrainMin, constrainMax) {
            if (typeof constrainMin === "undefined") { constrainMin = false; }
            if (typeof constrainMax === "undefined") { constrainMax = false; }
            if (constrainMin && num < min) {
                return 0;
            }
            if (constrainMax && num > max) {
                return 1;
            }
            return (num - min) / (max - min);
        };

        /**
        * Returns the number that corresponds to the percentage in a given range.
        * Example: percent = 0.5 range 10 to 20 // outputs 15
        *
        * @method percentToRange
        * @param percent {number}
        * @param min {number}
        * @param max {number}
        * @return {number}
        */
        MathUtil.percentToRange = function (percent, min, max) {
            return (percent * (max - min)) + min;
        };

        /**
        * Re-maps a number from one range to another. The output is the same as inputing the result of rangeToPercent() numbero percentToRange().
        * Example: num = 10, min1 = 0, max1 = 100, min2 = 0, max2 = 50 // outputs 5
        *
        * @method map
        * @param num {number}
        * @param min1 {number}
        * @param max1 {number}
        * @param min2 {number}
        * @param max2 {number}
        * @return {number}
        */
        MathUtil.map = function (num, min1, max1, min2, max2, round, constrainMin, constrainMax) {
            if (typeof round === "undefined") { round = true; }
            if (typeof constrainMin === "undefined") { constrainMin = true; }
            if (typeof constrainMax === "undefined") { constrainMax = true; }
            if (constrainMin && num < min1) {
                return min2;
            }
            if (constrainMax && num > max1) {
                return max2;
            }

            var num1 = (num - min1) / (max1 - min1);
            var num2 = (num1 * (max2 - min2)) + min2;
            if (round) {
                return Math.round(num2);
            }
            return num2;
        };

        /**
        * Converts radians to degrees.
        *
        * @method radiansToDegrees
        * @param radians {number}
        * @return {number}
        */
        MathUtil.radiansToDegrees = function (radians) {
            return (radians * 180 / Math.PI);
        };

        /**
        * Converts degrees to radians.
        *
        * @method degreesToRadians
        * @param degrees {number}
        * @return {number}
        */
        MathUtil.degreesToRadians = function (degrees) {
            return (degrees * Math.PI / 180);
        };

        /**
        * Returns 1 if the value is >= 0. Returns -1 if the value is < 0.
        *
        * @method sign
        * @param num {number}
        * @return {number}
        */
        MathUtil.sign = function (num) {
            if (num < 0) {
                return -1;
            }
            return 1;
        };

        /**
        * Check if number is positive (zero is positive).
        *
        * @method isPositive
        * @param num {number} The number.
        * @return {boolean}
        */
        MathUtil.isPositive = function (num) {
            return (num >= 0);
        };

        /**
        * Check if number is negative.
        *
        * @method isNegative
        * @param num {number} The
        * @return {boolean}
        */
        MathUtil.isNegative = function (num) {
            return (num < 0);
        };

        /**
        * Check if number is odd (convert to Integer if necessary).
        *
        * @method isOdd
        * @param num {number} The number.
        * @return {boolean}
        */
        MathUtil.isOdd = function (num) {
            var i = num;
            var e = 2;
            return Boolean(i % e);
        };

        /**
        * Check if number is even (convert to Integer if necessary).
        *
        * @method isEven
        * @param num {number} The number.
        * @return {boolean}
        */
        MathUtil.isEven = function (num) {
            var int = num;
            var e = 2;
            return (int % e == 0);
        };

        /**
        * Check if number is Prime (divisible only by itself and one).
        *
        * @method isPrime
        * @param num {number} The number.
        * @return {boolean}
        */
        MathUtil.isPrime = function (num) {
            if (num > 2 && num % 2 == 0) {
                return false;
            }
            var l = Math.sqrt(num);
            var i = 3;
            for (i; i <= l; i += 2) {
                if (num % i == 0) {
                    return false;
                }
            }
            return true;
        };

        /**
        * Calculate the factorial of the integer.
        *
        * @method factorial
        * @param num {number} The number.
        * @return {number}
        */
        MathUtil.factorial = function (num) {
            if (num == 0) {
                return 1;
            }
            var d = num.valueOf();
            var i = d - 1;
            while (i) {
                d = d * i;
                i--;
            }
            return d;
        };

        /**
        * Return an array of divisors of the integer.
        *
        * @method getDivisors
        * @param num {number} The number.
        * @return {Array.<number>}
        */
        MathUtil.getDivisors = function (num) {
            var r = [];
            for (var i = 1, e = num / 2; i <= e; i++) {
                if (num % i == 0) {
                    r.push(i);
                }
            }
            if (num != 0) {
                r.push(num.valueOf());
            }
            return r;
        };

        /**
        * Convert Fahrenheit to Celsius.
        *
        * @method toCelsius
        * @param fahrenheit {number} The fahrenheit value.
        * @param decimals {number} The number of decimals.
        * @return {number}
        */
        MathUtil.toCelsius = function (fahrenheit, decimals) {
            if (typeof decimals === "undefined") { decimals = 2; }
            var d = '';
            var r = (5 / 9) * (fahrenheit - 32);
            var s = r.toString().split(".");
            if (s[1] != undefined) {
                d = s[1].substr(0, decimals);
            } else {
                var i = decimals;
                while (i > 0) {
                    d += "0";
                    i--;
                }
            }
            var c = s[0] + "." + d;
            return Number(c);
        };

        /**
        * Convert Celsius to Fahrenheit.
        *
        * @method toFahrenheit
        * @param celsius {number} The celsius value.
        * @param decimals {number} The number of decimals.
        * @return {number}
        */
        MathUtil.toFahrenheit = function (celsius, decimals) {
            if (typeof decimals === "undefined") { decimals = 2; }
            var d = '';
            var r = (celsius / (5 / 9)) + 32;
            var s = r.toString().split(".");
            if (s[1] != undefined) {
                d = s[1].substr(0, decimals);
            } else {
                var i = decimals;
                while (i > 0) {
                    d += "0";
                    i--;
                }
            }
            var f = s[0] + "." + d;
            return Number(f);
        };
        return MathUtil;
    })();

    return MathUtil;
}));