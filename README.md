SortColors
==========

```javascript
var colors = ['EB9B1C', '#E0EB1C', '9BEB1C', '#1CEB64', '1CE7EB', '1CBAEB', '1C8AEB', '000000'];
var sc = new SortColors(colors);
sc.shuffle();
var list = sc.get();
```


## Supported formats:
* HEX
* RGB (soon)
* HSV (soon)
* HSL (soon)


## Available methods:
* **add(color)** - adds color to collection
* **set(colors)** - sets an array as collection
* **shuffle()** - shuffles collection
* **get()** - returns an array
