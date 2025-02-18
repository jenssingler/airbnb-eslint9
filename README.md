# Airbnb base v15.0.0 for EsLint 9

This package provides `eslint-config-airbnb-base` v15.0.0 rules as flat config for EsLint 9.
This is a temporary solution until the official package has been updated, see e.g. [this issue](https://github.com/airbnb/javascript/issues/2961).
It also replaces the formatting rules in airbnb-base with the corresponding [@stylistic/eslint-plugin](https://eslint.style/packages/default) rules.


## Installation

Unfortunately the peer dependencies of the original `eslint-config-airbnb-base` package, did force an eslint version of 7 or 8. Therefore, the flag `--legacy-peer-deps` (or `--force`) is needed to run `npm install`.
The project contains an `.npmrc` file with this flag, so you can just run `npm install`.


## Usage

Add `airbnb-eslint9` as a `devDepenency` to your project: `npm install airbnb-eslint9 --save-dev`

In your `eslint.config.js` add the following:
```js

import airbnbBase from 'airbnb-eslint9';

export default [
  {
    plugins: {
      '@stylistic': stylistic,
      'import': importPlugin,
       ...morePlugins
    },
  },
  ...airbnbBase,
  ...yourConfig,
];
```
