'use strict';
/**
 * Class for cookie
 *
 * @example
 * new Cookie({
 *     string: 'Hello Wold!',
 *     array: [1, 2, 3]
 *   })
 *   .set('object', {one: 1, two: 2});
 *
 * console.log(new Cookie('string'));
 * // -> 'Hello Wold!'
 *
 * Cookie.remove('string');
 *
 * console.log(Cookie.get('string'));
 * // -> undefined
 * console.log(Cookie.get('array'));
 * // -> [1, 2, 3]
 * console.log(Cookie.get('object'));
 * // -> {one: 1, two: 2}
 */
var Cookie = (function () {
    function Cookie() {
    }
    /**
     * Set cookies
     *
     * @param {String|Object} key
     * @param {*} [value]
     * @param {Object} [options]
     * @param {Number} [options.expires] Cookie expiration time
     * @param {String} [options.path] Path for cookie
     * @param {String} [options.domain] Domain for cookie
     * @param {Boolean} [options.secure] Transfer cookies only over a secure connection.
     *
     * @example
     * Cookie.set('my_cookie', 5);
     * console.log(document.cookie)
     * // -> 'my_cookie=5'
     *
     * // -- OR --
     *
     * Cookie.set({
     *   one: 1,
     *   two: 2
     * });
     *
     * console.log(document.cookie);
     * // -> 'one=1; two=2'
     */
    Cookie.set = function (key, value, options) {
        if (options === void 0) { options = {}; }
        if (typeof key === 'object') {
            for (var name in key) {
                this.set(name, key[name]);
            }
            return Cookie;
        }
        var expires = options.expires;
        if (typeof expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
        }
        value = encodeURIComponent(JSON.stringify(value));
        document.cookie =
            key + '=' + value +
                (options.expires ? '; expires=' + options.expires.toUTCString() : '') +
                (options.path ? '; path=' + options.path : '') +
                (options.domain ? '; domain=' + options.domain : '') +
                (options.secure ? '; secure' : '');
        return this;
    };
    /**
     * Getting cookies

     * @example
     * Cookie.set('my_cookie', 5);
     * console.log(Cookie.get('my_cookie'));
     * // -> 5
     *
     * Cookie.set('my_cookie', [1, 2, 3]);
     * console.log(Cookie.get('my_cookie'));
     * // -> [1, 2, 3]
     *
     *
     * Cookie.set({one: 1, two: 2});
     * console.log(Cookie.get('one', 'two'));
     * // -> {one: 1, two: 2}
     */
    Cookie.get = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i - 0] = arguments[_i];
        }
        var result = {};
        for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
            var key = keys_1[_a];
            var matches = document.cookie.match(new RegExp('(?:^|; )' + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
            result[key] = matches ? JSON.parse(decodeURIComponent(matches[1])) : undefined;
        }
        var resultKeys = Object.keys(result);
        return resultKeys.length == 1 ? result[resultKeys[0]] : result;
    };
    /**
     * Remove cookies
     *
     * @example
     * Cookie.set('my_cookie', 5);
     * console.log(document.cookie)
     * // -> 'my_cookie=5'
     *
     * Cookie.remove('my_cookie')
     * console.log(document.cookie)
     * // -> ''
     *
     * Cookie.set({one: 1, two: 2});
     * Cookie.remove('one', 'two');
     * console.log(document.cookie)
     * // -> ''
     */
    Cookie.remove = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i - 0] = arguments[_i];
        }
        for (var _a = 0, keys_2 = keys; _a < keys_2.length; _a++) {
            var key = keys_2[_a];
            this.set(key, '', { expires: -1 });
        }
        return Cookie;
    };
    /**
     * Getting all keys cookies
     *
     * @example
     * Cookie.set({
     *   one: 1,
     *   two: 2
     * });
     *
     * console.log(Cookie.keys());
     * // -> ['one', 'two']
     */
    Cookie.keys = function () {
        var keys = [];
        for (var _i = 0, _a = document.cookie.split('; '); _i < _a.length; _i++) {
            var cookie = _a[_i];
            keys.push(cookie.split('=')[0]);
        }
        return keys;
    };
    /**
     * Getting all cookies
     *
     * @example
     * Cookie.set({one: 1, two: 2});
     * console.log(Cookie.all());
     * // -> {one: 1, two: 2}
     */
    Cookie.all = function () {
        return this.get.apply(this, this.keys());
    };
    /**
     * Clear all cookies
     *
     * @example
     * Cookie
     *   .set({one: 1, two: 2})
     *   .clear();
     *
     * console.log(document.cookie);
     * // -> ''
     */
    Cookie.clear = function () {
        return this.remove.apply(this, this.keys());
    };
    return Cookie;
}());
window['Cookie'] = Cookie;
// jQuery support
if (typeof window['$'] !== 'undefined') {
    window['$']['cookie'] = Cookie;
}
// AMD support
if (typeof window['define'] === 'function') {
    window['define'](function () {
        return Cookie;
    });
}
// CommonJS/Node.js support
if (typeof window['exports'] === 'object') {
    // Support Node.js specific `module.exports` (which can be a function)
    if (typeof window['module'] === 'object' && typeof window['module'].exports === 'object') {
        window['exports'] = window['module'].exports = Cookie;
    }
    // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
    window['exports'].Cookie = Cookie;
}

//# sourceMappingURL=cookie.js.map
