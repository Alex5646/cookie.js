tasty-cookies
====================================================

**Язык:** Русский, [Английский](https://github.com/Alex5646/cookie.js/blob/master/README.md)

### Содержание

* [Быстрый старт](#quick-start)
* [Использование в jQuery](#use-in-jquery)
* [Использование в CommonJS/Node](#use-in-commonjsnode)
* [Справочное руководство по API](#api-reference)
    * [Cookie.set(key, value, [options])][cookie-set]
    * [Cookie.get(keys...)][cookie-get]
    * [Cookie.remove(keys...)][cookie-remove]
    * [Cookie.keys()][cookie-keys]
    * [Cookie.all()][cookie-all]
    * [Cookie.clear()][cookie-clear]

### Быстрый старт

* [Загрузить последнюю версию](https://github.com/Alex5646/cookie.js/archive/master.zip)
* Установить через [Bower](http://bower.io/): `bower install tasty-cookies`
* Установить через [npm](https://www.npmjs.com/): `npm install tasty-cookies`

### Использование в jQuery

Поддержка jQuery! Если вы подключили jQuery вы можете использовать псевдоним **$.cookie**

```js
$.cookie.set('my_cookie', 'Привет, мир!');
$.cookie.get('my_cookie');
// -> 'Привет, мир!'
```

### Использование в CommonJS/Node

В среде, где нет родного объекта window, tasty-cookies будет экспортировать
фабричный метод, который принимает экземпляр окна. Например, с использованием
[jsdom](https://github.com/tmpvar/jsdom), вы могли бы сделать что-то вроде:

```js
var window = require('jsdom').jsdom().parentWindow;
var Cookie = require('tasty-cookies')(window);
```

Справочное руководство по API
----------------------------------------------------

#### Методы

* [Cookie.set(key, value, [options])][cookie-set]
* [Cookie.get(keys...)][cookie-get]
* [Cookie.remove(keys...)][cookie-remove]
* [Cookie.keys()][cookie-keys]
* [Cookie.all()][cookie-all]
* [Cookie.clear()][cookie-clear]

[cookie-set]: #cookiesetkey-value-options
[cookie-get]: #cookiegetkeys
[cookie-remove]: #cookieremovekeys
[cookie-keys]: #cookiekeys
[cookie-all]: #cookieall
[cookie-clear]: #cookieclear

**Пример:**

```js
Cookie.set({
        string: 'Привет, мир!',
        array: [1, 2, 3]
    })
    .set('object', {one: 1, two: 2});

console.log(Cookie.get('string'));
// -> 'Привет, мир!'

Cookie.remove('string');

console.log(Cookie.get('string'));
// -> undefined
console.log(Cookie.get('array'));
// -> [1, 2, 3]
console.log(Cookie.get('object'));
// -> {one: 1, two: 2}
```

### Cookie.set(key, value, [options])

Добавление cookies

[Код][cookie-set-src]

**Аргументы:**

<table>
<thead>
    <tr>
        <th>Имя</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>key</td>
        <td>String, Object</td>
        <td>Ключ cookie</td>
    </tr>
    <tr>
        <td>[value]</td>
        <td>*</td>
        <td>Значение cookie</td>
    </tr>
    <tr>
        <td>[options]</td>
        <td>Object</td>
        <td>
            Настройки для cookie<br><strong>Свойства:</strong>
            <table>
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Тип</th>
                    <th>Описание</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>[expires]</td>
                    <td>Number</td>
                    <td>Время истечения cookie</td>
                </tr>
                <tr>
                    <td>[path]</td>
                    <td>String</td>
                    <td>Путь для cookie</td>
                </tr>
                <tr>
                    <td>[domain]</td>
                    <td>String</td>
                    <td>Адресс домена cookie</td>
                </tr>
                <tr>
                    <td>[secure]</td>
                    <td>Boolean</td>
                    <td>Передача cookie только через защищенное соединение.</td>
                </tr>
            </tbody>
            </table>
        </td>
    </tr>
</tbody>
</table>


**Возвращает:** Cookie

**Пример:**

```js
Cookie.set('my_cookie', 5);
console.log(document.cookie)
// -> 'my_cookie=5'

// -- OR --

Cookie.set({
  one: 1,
  two: 2
});

console.log(document.cookie);
// -> 'one=1; two=2'
```

### Cookie.get(keys...)

Получение cookie

[Код][cookie-get-src]

**Аргументы:**

| Имя     | Тип    | Описание     |
|---------|--------|--------------|
| keys... | String | Ключи cookie |

**Возвращает:** *

**Пример:**

```js
Cookie.set('my_cookie', 5);
console.log(Cookie.get('my_cookie'));
// -> 5

Cookie.set('my_cookie', [1, 2, 3]);
console.log(Cookie.get('my_cookie'));
// -> [1, 2, 3]

Cookie.set({one: 1, two: 2});
console.log(Cookie.get('one', 'two'));
// -> {one: 1, two: 2}
```

### Cookie.remove(keys...)

Удаление cookies

[Код][cookie-remove-src]

**Аргументы:**

| Имя     | Тип    | Описание     |
|---------|--------|--------------|
| keys... | String | Ключи cookie |

**Возвращает:** Cookie


**Пример:**

```js
Cookie.set('my_cookie', 5);
console.log(document.cookie)
// -> 'my_cookie=5'

Cookie.remove('my_cookie')
console.log(document.cookie)
// -> ''

Cookie.set({one: 1, two: 2});
Cookie.remove('one', 'two');
console.log(document.cookie)
// -> ''
```

### Cookie.keys()

Получение всех ключей cookies

[Код][cookie-keys-src]

**Возвращает:** Array

**Пример:**

```js
Cookie.set({
  one: 1,
  two: 2
});

console.log(Cookie.keys());
// -> ['one', 'two']
```

### Cookie.all()

Получение всех cookies

[Код][cookie-all-src]

**Возвращает:** Object

**Пример:**

```js
Cookie.set({one: 1, two: 2});
console.log(Cookie.all());
// -> {one: 1, two: 2}
```

### Cookie.clear()

Удаление всех cookies

[Код][cookie-clear-src]

**Возвращает:** Cookie

**Пример:**

```js
Cookie
  .set({one: 1, two: 2})
  .clear();
  
console.log(document.cookie);
// -> ''
```

[cookie-set-src]: https://github.com/Alex5646/cookie.js/blob/master/cookie.ts#L55
[cookie-get-src]: https://github.com/Alex5646/cookie.js/blob/master/cookie.ts#L108
[cookie-remove-src]: https://github.com/Alex5646/cookie.js/blob/master/cookie.ts#L141
[cookie-keys-src]: https://github.com/Alex5646/cookie.js/blob/master/cookie.ts#L161
[cookie-all-src]: https://github.com/Alex5646/cookie.js/blob/master/cookie.ts#L177
[cookie-clear-src]: https://github.com/Alex5646/cookie.js/blob/master/cookie.ts#L192
