/**
 * tasty-cookies
 *
 * @version
 * @author Alex5646 <catia.petrowi4@yandex.ru>
 * @link https://github.com/Alex5646/cookie.js
 * @example
 * Cookie.set({
 *     string: 'Hello Wold!',
 *     array: [1, 2, 3]
 *   })
 *   .set('object', {one: 1, two: 2});
 *
 * console.log(Cookie.get('string'));
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
class Cookie {

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
    public static set(
        key:string|Object,
        value?:any,
        options: {
            expires?: any;
            path?: string;
            domain?: string;
            secure?: boolean;
        } = {}
    ) {
        if (typeof key === 'object') {
            for (var name in key) {
                this.set(name, key[name]);
            }

            return this;
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
    }

    /**
     * Getting cookies
     *
     * @example
     * Cookie.set('my_cookie', 5);
     * console.log(Cookie.get('my_cookie'));
     * // -> 5
     *
     * Cookie.set('my_cookie', [1, 2, 3]);
     * console.log(Cookie.get('my_cookie'));
     * // -> [1, 2, 3]
     *
     * Cookie.set({one: 1, two: 2});
     * console.log(Cookie.get('one', 'two'));
     * // -> {one: 1, two: 2}
     */
    public static get(...keys:string[]):any {
        var result = {};

        for (var key of keys) {
            var matches = document.cookie.match(new RegExp(
                '(?:^|; )' + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
            ));

            result[key] = matches ? JSON.parse(decodeURIComponent(matches[1])) : undefined;
        }

        return keys.length == 1 ? result[keys[0]] : result;
    }

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
    public static remove(...keys:string[]) {
        for (var key of keys) {
            this.set(key, '', {expires: -1});
        }

        return this;
    }

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
    public static keys():string[] {
        var keys = [];
        for (var cookie of document.cookie.split('; ')) {
            keys.push(cookie.split('=')[0]);
        }
        return keys;
    }

    /**
     * Getting all cookies
     *
     * @example
     * Cookie.set({one: 1, two: 2});
     * console.log(Cookie.all());
     * // -> {one: 1, two: 2}
     */
    public static all():Object {
        return this.get.apply(this, this.keys());
    }

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
    public static clear() {
        return this.remove.apply(this, this.keys());
    }

    /**
     * Getting length of all cookies
     *
     * @exaple
     * Cookie.set({one: 1, two: 2});
     *
     * console.log(Cookie.getLength());
     * // -> 2
     */
    public static getLength(): number {
        return Cookie.keys().length;
    }

    /**
     * Exemption name Cookie
     *
     * @example
     * var Cookie2 = Cookie.noConflict();
     *
     * console.log(typeof Cookie2);
     * // -> 'function'
     *
     * Cookie2.set('my_cookie', 5);
     *
     * console.log(Cookie2.get('my_cookie'));
     * // -> 5
     */
    public static noConflict(): Cookie {
        return Cookie;
    }
}

// AMD support
if (typeof window['define'] === 'function') {
    window['define'](function () {
        return Cookie;
    });
}

// CommonJS/Node support
if (typeof window['exports'] === 'object') {
    window['exports']['Cookie'] = Cookie;
}
