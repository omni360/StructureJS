import BaseObject from './BaseObject';

/**
 * The {{#crossLink "ObjectManager"}}{{/crossLink}} class is an abstract class that provides enabling and disabling functionality for most StructureJS classes.
 *
 * @class ObjectManager
 * @module StructureJS
 * @extends BaseObject
 * @submodule core
 * @requires Extend
 * @requires BaseObject
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class ObjectManager extends BaseObject
{
    /**
     * The isEnabled property is used to keep track of the enabled state of the object.
     *
     * @property isEnabled
     * @type {boolean}
     * @default false
     * @public
     */
    public isEnabled:boolean = false;

    constructor()
    {
        super();
    }

    /**
     * The enable method is responsible for enabling event listeners and/or children of the containing objects.
     *
     * @method enable
     * @public
     * @chainable
     * @example
     *      this._exampleObject.enable();
     */
    public enable():any
    {
        if (this.isEnabled === true)
        {
            return this;
        }

        this.isEnabled = true;

        this.onEnabled();

        return this;
    }

    /**
     * This method is automatically called after the enable method is called on the object.
     * The enable method is responsible for enabling event listeners and/or children of the containing objects.
     *
     * @method onEnabled
     * @public
     * @chainable
     * @example
     *     onEnabled() {
     *          this._exampleObject.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
     *          this._exampleObject.enable();
     *     }
     */
    public onEnabled():any {
        return this;
    }

    /**
     * The disable method is responsible for disabling event listeners and/or children of the containing objects.
     *
     * @method disable
     * @public
     * @chainable
     * @example
     *      this._exampleObject.disable();
     */
    public disable():any
    {
        if (this.isEnabled === false)
        {
            return this;
        }

        this.isEnabled = false;

        this.onDisabled();

        return this;
    }

    /**
     * This method is automatically called after the disable method is called on the object.
     * The onDisabled method is responsible for disabling event listeners and/or children of the containing objects.
     *
     * @method onDisabled
     * @public
     * @chainable
     * @example
     *     onDisabled() {
     *          this._exampleObject.removeEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
     *          this._exampleObject.disable();
     *     }
     */
    public onDisabled():any {
        return this;
    }

}

export default ObjectManager;