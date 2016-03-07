# babel-plugin-name-amd-module

transform anonymous amd modules to named amd modules

## Installation

```sh
$ npm install babel-plugin-name-amd-module
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["name-amd-module"]
}
```

### Via CLI

```sh
$ babel --plugins name-amd-module script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["name-amd-module"]
});
```
