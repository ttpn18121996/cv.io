# cv.io

## Optional Configuration

```js
MyCv.setup({
    data,
    render: {
        summary: provider => provider.handleEffect('auto_type', { timeout: 10, cursor: '_' }),
        technicalSkills: provider => {
            //
        },
        ...
    },
}).start();
```

## Fluent Configuration

```js
MyCv.setData(data)
.render('fullName', 'auto_type')
.render('summary', provider => provider.handleEffect('auto_type', { timeout: 10 }))
render('technicalSkills', provider => {
    //
}).start();
```

## Provider

```js
function Provider(name) {
    this.name = name;

    this.getData = function (key = null, defaultValue = null) {};

    this.getElement = function () {};

    this.getDobFormat = function (year, month, day) {};

    this.call = function (section) {};

    this.effect = function (effect, args) {}

    this.handleEffect = function (effect, options) {}
}
```


## Effects

### Auto type

This effect gives the effect of displaying each letter as if you were typing.
The name of this effect is `auto_type`.
It has two options which are `timeout` and `cursor`.

```js
...
const elm = document.createElement('div');
provider.effect('auto_type', ['Hello world', elm, { timeout: 50, cursor: '_' }]);
...
```
