///<reference path='../model/Route'/>
///<reference path='../event/RouteEvent'/>
///<reference path='../util/StringUtil'/>

/**
 * The **Router** class is a static class allows you to add different route patterns that can be matched to help control your application. Look at the Router.{{#crossLink "Router/add:method"}}{{/crossLink}} method for more details and examples.
 *
 * @class Router
 * @static
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export class Router
    {
        /**
         * A reference to the browser Window Object.
         *
         * @property WINDOW
         * @type {Window}
         * @private
         * @static
         * @final
         * @readOnly
         */
        private static WINDOW:Window = window;

        /**
         * A list of the added Route objects.
         *
         * @property _routes
         * @type {Array<Route>}
         * @private
         * @static
         */
        private static _routes:Array<Route> = [];

        /**
         * A reference to default route object.
         *
         * @property _defaultRoute
         * @type {Route}
         * @private
         * @static
         */
        private static _defaultRoute:Route = null;

        /**
         * A reference to the hash change event that was sent from the Window Object.
         *
         * @property _hashChangeEvent
         * @type {any}
         * @private
         * @static
         */
        private static _hashChangeEvent:any = null;

        /**
         * Determines if the Router class is enabled or disabled.
         *
         * @property isEnabled
         * @type {boolean}
         * @readOnly
         * @public
         * @static
         * @example
         *     // Read only.
         *     console.log(Router.isEnabled);
         */
        public static isEnabled:boolean = false;

        /**
         * The **Router.useDeepLinking** property tells the Router class weather it should change the hash url or not.
         * By **default** this property is set to **true**. If you set the property to **false** and using the **Router.navigateTo**
         * method the hash url will not change. This can be useful if you are making an application or game and you don't want the user
         * to know how to jump to other sections directly. See the **Router.{{#crossLink "Router/allowManualDeepLinking:property"}}{{/crossLink}}** to fully change the Router class
         * from relying on the hash url to an internal state controller.
         *
         * @property useDeepLinking
         * @type {boolean}
         * @default true
         * @public
         * @static
         * @example
         *     Router.useDeepLinking = true;
         */
        public static useDeepLinking:boolean = true;

        /**
         * The **Router.allowManualDeepLinking** property tells the Router class weather it should check for route matches if the
         * hash url changes in the browser. This property only works if the **Router. {{#crossLink "Router/useDeepLinking:property"}}{{/crossLink}}** is set to **false**.
         * This is useful if want to use your added routes but don't want any external forces trigger your routes.
         *
         * Typically what I do for games is during development/testing I allow the hash url to change the states so testers can jump
         * to sections or levels easily but then when it is ready for production I set the property to **false** so users cannot jump
         * around if they figure out the url schema.
         *
         * @property allowManualDeepLinking
         * @type {boolean}
         * @default true
         * @public
         * @static
         * @example
         *     Router.useDeepLinking = false;
         *     Router.allowManualDeepLinking = false;
         */
        public static allowManualDeepLinking:boolean = true;

        /**
         * The **Router.forceSlash** property tells the Router class if the **Router.{{#crossLink "Router/navigateTo:method"}}{{/crossLink}}** method is called to
         * make sure the hash url has a forward slash after the **#** character like this **#/**.
         *
         * @property forceSlash
         * @type {boolean}
         * @default true
         * @public
         * @static
         * @example
         *     // To turn off forcing the forward slash
         *     Router.forceSlash = false;
         *
         *     // By default it will change the url from #contact/bob/ to #/contact/bob/
         *     // when using the navigateTo method.
         */
        public static forceSlash:boolean = true;

        /**
         * The **Router.allowMultipleMatches** property tells the Router class if it should trigger one or all routes that match a route pattern.
         *
         * @property allowMultipleMatches
         * @type {boolean}
         * @default true
         * @public
         * @static
         * @example
         *     // Only allow the first route matched to be triggered.
         *     Router.allowMultipleMatches = false;
         */
        public static allowMultipleMatches:boolean = true;

        constructor()
        {
            throw new Error('[Router] Do not instantiation the Router class because it is a static class.');
        }

        /**
         * The **Router.add** method allows you to listen for route patterns to be matched. When a match is found the callback will be executed passing a {{#crossLink "RouteEvent"}}{{/crossLink}}.
         *
         * @method add
         * @param routePattern {string} The string pattern you want to have match, which can be any of the following combinations {}, ::, *, ?, ''. See the examples below for more details.
         * @param callback {Function} The function that should be executed when a request matches the routePattern. It will receive a {{#crossLink "RouteEvent"}}{{/crossLink}} object.
         * @param callbackScope {any} The scope of the callback function that should be executed.
         * @public
         * @static
         * @example
         *     // Example of adding a route listener and the function callback below.
         *     Router.add('/games/{gameName}/:level:/', this.onRouteHandler, this);
         *
         *     // The above route listener would match the below url:
         *     // www.site.com/#/games/asteroids/2/
         *
         *     // The Call back receives a RouteEvent object.
         *     ClassName.prototype.onRouteHandler = function (routeEvent) {
     *         console.log(routeEvent.params);
     *     }
         *
         * Route Pattern Options:
         * ----------------------
         * **:optional:** The two colons **::** means a part of the hash url is optional for the match. The text between can be anything you want it to be.
         *
         *     Router.add('/contact/:name:/', this.method, this);
         *
         *     // Will match one of the following:
         *     // www.site.com/#/contact/
         *     // www.site.com/#/contact/heather/
         *     // www.site.com/#/contact/john/
         *
         *
         * **{required}** The two curly brackets **{}** means a part of the hash url is required for the match. The text between can be anything you want it to be.
         *
         *     Router.add('/product/{productName}/', this.method, this);
         *
         *     // Will match one of the following:
         *     // www.site.com/#/product/shoes/
         *     // www.site.com/#/product/jackets/
         *
         *
         * **\*** The asterisk character means it will match all or part of part the hash url.
         *
         *     Router.add('*', this.method, this);
         *
         *     // Will match one of the following:
         *     // www.site.com/#/anything/
         *     // www.site.com/#/matches/any/hash/url/
         *     // www.site.com/#/really/it/matches/any/and/all/hash/urls/
         *
         *
         * **?** The question mark character means it will match a query string for the hash url.
         *
         *     Router.add('?', this.method, this);
         *
         *     // Will match one of the following:
         *     // www.site.com/#/?one=1&two=2&three=3
         *     // www.site.com/#?one=1&two=2&three=3
         *
         *
         * **''** The empty string means it will match when there are no hash url.
         *
         *     Router.add('', this.method, this);
         *     Router.add('/', this.method, this);
         *
         *     // Will match one of the following:
         *     // www.site.com/
         *     // www.site.com/#/
         *
         *
         * Other possible combinations but not limited too:
         *
         *     Router.add('/games/{gameName}/:level:/', this.method1, this);
         *     Router.add('/{category}/blog/', this.method2, this);
         *     Router.add('/home/?', this.method3, this);
         *     Router.add('/about/*', this.method4, this);
         *
         */
        public static add(routePattern:string, callback:Function, callbackScope:any):void
        {
            Router.enable();

            var route:Route = new Route(routePattern, callback, callbackScope);

            Router._routes.push(route);
        }

        /**
         * The **Router.remove** method will remove one of the added routes.
         *
         * @method remove
         * @param routePattern {string} Must be the same string pattern you pasted into the {{#crossLink "Router/add:method"}}{{/crossLink}} method.
         * @param callback {Function} Must be the same function you pasted into the {{#crossLink "Router/add:method"}}{{/crossLink}} method.
         * @param callbackScope {any} Must be the same scope off the callback pattern you pasted into the {{#crossLink "Router/add:method"}}{{/crossLink}} method.
         * @public
         * @static
         * @example
         *     // Example of adding a route listener.
         *     Router.add('/games/{gameName}/:level:/', this.onRouteHandler, this);
         *
         *     // Example of removing the same added route listener above.
         *     Router.remove('/games/{gameName}/:level:/', this.onRouteHandler, this);
         */
        public static remove(routePattern:string, callback:Function, callbackScope:any):void
        {
            var route:Route;

            for (var i = Router._routes.length - 1; i >= 0; i--)
            {
                route = Router._routes[i];
                if (route.routePattern === routePattern && route.callback === callback && route.callbackScope === callbackScope)
                {
                    Router._routes.splice(i, 1);
                }
            }
        }

        /**
         * The **Router.addDefault** method is meant to trigger a callback function if there are no route matches are found.
         *
         * @method addDefault
         * @param callback {Function}
         * @param callbackScope {any}
         * @public
         * @static
         * @example
         *     Router.addDefault(this.noRoutesFoundHandler, this);
         */
        public static addDefault(callback:Function, callbackScope:any):void
        {
            Router._defaultRoute = new Route('', callback, callbackScope);
        }

        /**
         * The **Router.removeDefault** method will remove the default callback that was added by the **Router.addDefault** method.
         *
         * @method removeDefault
         * @public
         * @static
         * @example
         *     Router.removeDefault();
         */
        public static removeDefault():void
        {
            Router._defaultRoute = null;
        }

        /**
         * Gets the current hash url minus the # or #! symbol(s).
         *
         * @method getHash
         * @public
         * @static
         * @return {string} Returns current hash url minus the # or #! symbol(s).
         * @example
         *     var str = Router.getHash();
         */
        public static getHash():string
        {
            var hash:string = Router.WINDOW.location.hash;
            var strIndex:number = (hash.substr(0, 2) === '#!') ? 2 : 1;

            return hash.substring(strIndex); // Return everything after # or #!
        }

        /**
         * The **Router.enable** method will allow the Router class to listen for the hashchange event. By default the Router class is enabled.
         *
         * @method enable
         * @public
         * @static
         * @example
         *     Router.enable();
         */
        public static enable():void
        {
            if (Router.isEnabled === true) return;

            if (Router.WINDOW.addEventListener)
            {
                Router.WINDOW.addEventListener('hashchange', Router.onHashChange, false);
            }
            else
            {
                Router.WINDOW.attachEvent('onhashchange', Router.onHashChange);
            }

            Router.isEnabled = true;
        }

        /**
         * The **Router.disable** method will stop the Router class from listening for the hashchange event.
         *
         * @method disable
         * @public
         * @static
         * @example
         *     Router.disable();
         */
        public static disable():void
        {
            if (Router.isEnabled === false) return;

            if (Router.WINDOW.removeEventListener)
            {
                Router.WINDOW.removeEventListener('hashchange', Router.onHashChange);
            }
            else
            {
                Router.WINDOW.detachEvent('onhashchange', Router.onHashChange);
            }

            Router.isEnabled = false;
        }

        /**
         * The **Router.start** method is meant to trigger or check the hash url on page load.
         * Either you can call this method after you add all your routers or after all data is loaded.
         * It is recommend you only call this once per page or application instantiation.
         *
         * @method start
         * @public
         * @static
         * @example
         *     // Example of adding routes and calling the start method.
         *     Router.add('/games/{gameName}/:level:/', this.method1, this);
         *     Router.add('/{category}/blog/', this.method2, this);
         *
         *     Router.start();
         */
        public static start():void
        {
            setTimeout(Router.onHashChange, 1);
        }

        /**
         * The **Router.navigateTo** method allows you to change the hash url and to trigger a route
         * that matches the string value. The second parameter is **silent** and is **false** by
         * default. This allows you to update the hash url without causing a route callback to be
         * executed.
         *
         * @method navigateTo
         * @param route {String}
         * @param [silent=false] {Boolean}
         * @public
         * @static
         * @example
         *     // This will update the hash url and trigger the matching route.
         *     Router.navigateTo('/games/asteroids/2/');
         *
         *     // This will update the hash url but will not trigger the matching route.
         *     Router.navigateTo('/games/asteroids/2/', true);
         */
        public static navigateTo(route, silent:boolean = false):void
        {
            if (Router.isEnabled === false) return;

            if (route.charAt(0) === '#')
            {
                var strIndex = (route.substr(0, 2) === '#!') ? 2 : 1;
                route = route.substring(strIndex);
            }

            // Enforce starting slash
            if (route.charAt(0) !== '/' && Router.forceSlash === true)
            {
                route = '/' + route;
            }

            if (Router.useDeepLinking === true)
            {
                if (silent === true)
                {
                    Router.disable();
                    setTimeout(function ()
                    {
                        window.location.hash = route;
                        setTimeout(Router.enable, 1);
                    }, 1);
                }
                else
                {
                    setTimeout(function ()
                    {
                        window.location.hash = route;
                    }, 1);
                }
            }
            else
            {
                Router.changeRoute(route);
            }
        }

        /**
         * The **Router.clear** will remove all route's and the default route from the Router class.
         *
         * @method clear
         * @public
         * @static
         * @example
         *     Router.clear();
         */
        public clear():void
        {
            Router._routes = [];
            Router._defaultRoute = null;
            Router._hashChangeEvent = null;
        }

        /**
         * The **Router.destroy** method will null out all references to other objects in the Router class.
         *
         * @method destroy
         * @public
         * @static
         * @example
         *     Router.destroy();
         */
        public destroy():void
        {
            Router.WINDOW = null;
            Router._routes = null;
            Router._defaultRoute = null;
            Router._hashChangeEvent = null;
        }

        /**
         * This method will be called if the Window object dispatches a HashChangeEvent.
         * This method will not be called if the Router is disabled.
         *
         * @method onHashChange
         * @param event {HashChangeEvent}
         * @private
         * @static
         */
        private static onHashChange(event):void
        {
            if (Router.allowManualDeepLinking === false && Router.useDeepLinking === false) return;

            Router._hashChangeEvent = event;

            var hash = Router.getHash();

            Router.changeRoute(hash);
        }

        /**
         * The method is responsible for check if one of the routes matches the string value passed in.
         *
         * @method changeRoute
         * @param hash {string}
         * @private
         * @static
         */
        private static changeRoute(hash:string):void
        {
            var route:Route;
            var match:any;
            var routeEvent:RouteEvent = null;

            // Loop through all the route's. Note: we need to check the length every loop in case one was removed.
            for (var i = 0; i < Router._routes.length; i++)
            {
                route = Router._routes[i];
                match = route.match(hash);

                // If there is a match.
                if (match !== null)
                {
                    routeEvent = new RouteEvent();
                    routeEvent.route = match.shift();
                    routeEvent.params = match.slice(0, match.length);
                    routeEvent.routePattern = route.routePattern;
                    routeEvent.query = (hash.indexOf('?') > -1) ? StringUtil.queryStringToObject(hash) : null;
                    routeEvent.target = Router;
                    routeEvent.currentTarget = Router;

                    // Remove any empty strings in the array due to the :optional: route pattern.
                    for (var j = routeEvent.params.length - 1; j >= 0; j--)
                    {
                        if (routeEvent.params[j] === '')
                        {
                            routeEvent.params.splice(j, 1);
                        }
                    }

                    // If there was a hash change event then set the info we want to send.
                    if (Router._hashChangeEvent != null)
                    {
                        routeEvent.newURL = Router._hashChangeEvent.newURL;
                        routeEvent.oldURL = Router._hashChangeEvent.oldURL;
                    }
                    else
                    {
                        routeEvent.newURL = window.location.href;
                    }

                    // Execute the callback function and pass the route event.
                    route.callback.call(route.callbackScope, routeEvent);

                    // Only trigger the first route and stop checking.
                    if (Router.allowMultipleMatches === false)
                    {
                        break;
                    }
                }
            }

            // If there are no route's matched and there is a default route. Then call that default route.
            if (routeEvent === null && Router._defaultRoute !== null)
            {
                routeEvent = new RouteEvent();
                routeEvent.route = hash;
                routeEvent.query = (hash.indexOf('?') > -1) ? StringUtil.queryStringToObject(hash) : null;
                routeEvent.target = Router;
                routeEvent.currentTarget = Router;

                if (Router._hashChangeEvent != null)
                {
                    routeEvent.newURL = Router._hashChangeEvent.newURL;
                    routeEvent.oldURL = Router._hashChangeEvent.oldURL;
                }
                else
                {
                    routeEvent.newURL = window.location.href;
                }

                Router._defaultRoute.callback.call(Router._defaultRoute.callbackScope, routeEvent);
            }

            Router._hashChangeEvent = null;
        }
    }
}