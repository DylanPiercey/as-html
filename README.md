# as-html
Simple html templates with es6 quasi literals. You can also minify the templates using [babel-plugin-as-html](https://github.com/DylanPiercey/babel-plugin-as-html).

Inspired by http://www.2ality.com/2015/01/template-strings-html.html.


## Installation

#### Npm
```console
$ npm install as-html
```

## Example

```javascript
// commonjs
var html = require('as-html')

// es6
import html from 'as-html'

// examples
let planet = 'world'

html`
  <div>Hello ${planet}</div>
` //-> '<div>Hello world</div>'

// safe by default
planet = 'crazy<planet>'

html`
  <div>Hello ${planet}</div>
` //-> '<div>Hello crazy&lt;planet&gt;</div>'

// or insert html by prefixing with a bang!
html`
  <div>Hello !${planet}</div>
` //-> '<div>Hello crazy<planet></div>'

// arrays are supported as well (automatically unescaped)!
let planets = ['a', 'b', 'c']

html`
  <div>
    ${planets.map(planet => html`
      <b>${planet}</b>
    `)}
  </div>
` //-> '<div><b>a</b><b>b</b><b>c</b></div>'
```

### Contributions

* Use `npm test` to run tests.

Please feel free to create a PR!
