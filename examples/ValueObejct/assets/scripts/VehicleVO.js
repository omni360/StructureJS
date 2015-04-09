define(function (require, exports, module)
{ // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var ValueObject = require('structurejs/model/ValueObject');

    /**
     * TODO: YUIDoc_comment
     *
     * @class VehicleVO
     * @extends ValueObject
     * @constructor
     **/
    var VehicleVO = (function ()
    {

        var _super = Extend(VehicleVO, ValueObject);

        function VehicleVO(data)
        {
            _super.call(this);

            this.make = null;

            if (data)
            {
                this.update(data);
            }
        }

        /**
         * @overridden ValueObject.update
         */
        VehicleVO.prototype.update = function (data)
        {
            _super.prototype.update.call(this, data);

            // Override any values after the default super update method has set the values.
        };

        return VehicleVO;
    })();

    module.exports = VehicleVO;

});