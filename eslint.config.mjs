import { FlatCompat } from "@eslint/eslintrc";
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import path from "node:path";
import { fileURLToPath } from "node:url";
import { writeFileSync } from 'node:fs';

const STYLISTIC_MAP = {
    'template-curly-spacing': '@stylistic/template-curly-spacing',
    'rest-spread-spacing': '@stylistic/rest-spread-spacing',
    'yield-star-spacing': '@stylistic/yield-star-spacing',
    'no-confusing-arrow': '@stylistic/no-confusing-arrow',
    'generator-star-spacing': '@stylistic/generator-star-spacing',
    'arrow-spacing': '@stylistic/arrow-spacing',
    'arrow-parens': '@stylistic/arrow-parens',
    'template-tag-spacing': '@stylistic/template-tag-spacing',
    'spaced-comment': '@stylistic/spaced-comment',
    'space-unary-ops': '@stylistic/space-unary-ops',
    'wrap-regex': '@stylistic/wrap-regex',
    'semi-style': '@stylistic/semi-style',
    'semi': '@stylistic/semi',
    'switch-colon-spacing': '@stylistic/switch-colon-spacing',
    'quotes': '@stylistic/quotes',
    'quote-props': '@stylistic/quote-props',
    'space-before-blocks': '@stylistic/space-before-blocks',
    'space-in-parens': '@stylistic/space-in-parens',
    'padding-line-between-statements': '@stylistic/padding-line-between-statements',
    'space-infix-ops': '@stylistic/space-infix-ops',
    'one-var-declaration-per-line': '@stylistic/one-var-declaration-per-line',
    'padded-blocks': '@stylistic/padded-blocks',
    'semi-spacing': '@stylistic/semi-spacing',
    'object-curly-spacing': '@stylistic/object-curly-spacing',
    'space-before-function-paren': '@stylistic/space-before-function-paren',
    'no-whitespace-before-property': '@stylistic/no-whitespace-before-property',
    'object-curly-newline': '@stylistic/object-curly-newline',
    'operator-linebreak': '@stylistic/operator-linebreak',
    'no-trailing-spaces': '@stylistic/no-trailing-spaces',
    'object-property-newline': '@stylistic/object-property-newline',
    'nonblock-statement-body-position': '@stylistic/nonblock-statement-body-position',
    'no-tabs': '@stylistic/no-tabs',
    'no-multiple-empty-lines': '@stylistic/no-multiple-empty-lines',
    'new-parens': '@stylistic/new-parens',
    'no-mixed-spaces-and-tabs': '@stylistic/no-mixed-spaces-and-tabs',
    'no-mixed-operators': '@stylistic/no-mixed-operators',
    'multiline-ternary': '@stylistic/multiline-ternary',
    'newline-per-chained-call': '@stylistic/newline-per-chained-call',
    'max-len': '@stylistic/max-len',
    'max-statements-per-line': '@stylistic/max-statements-per-line',
    'linebreak-style': '@stylistic/linebreak-style',
    'multiline-comment-style': '@stylistic/multiline-comment-style',
    'keyword-spacing': '@stylistic/keyword-spacing',
    'lines-between-class-members': '@stylistic/lines-between-class-members',
    'key-spacing': '@stylistic/key-spacing',
    'indent': '@stylistic/indent',
    'implicit-arrow-linebreak': '@stylistic/implicit-arrow-linebreak',
    'jsx-quotes': '@stylistic/jsx-quotes',
    'line-comment-position': '@stylistic/line-comment-position',
    'func-call-spacing': '@stylistic/function-call-spacing',
    'function-call-argument-newline': '@stylistic/function-call-argument-newline',
    'eol-last': '@stylistic/eol-last',
    'lines-around-comment': '@stylistic/lines-around-comment',
    'comma-spacing': '@stylistic/comma-spacing',
    'comma-dangle': '@stylistic/comma-dangle',
    'brace-style': '@stylistic/brace-style',
    'array-bracket-spacing': '@stylistic/array-bracket-spacing',
    'comma-style': '@stylistic/comma-style',
    'array-element-newline': '@stylistic/array-element-newline',
    'array-bracket-newline': '@stylistic/array-bracket-newline',
    'function-paren-newline': '@stylistic/function-paren-newline',
    'computed-property-spacing': '@stylistic/computed-property-spacing',
    'block-spacing': '@stylistic/block-spacing',
    'no-extra-parens': '@stylistic/no-extra-parens',
    'no-extra-semi': '@stylistic/no-extra-semi',
    'wrap-iife': '@stylistic/wrap-iife',
    'no-multi-spaces': '@stylistic/no-multi-spaces',
    'no-floating-decimal': '@stylistic/no-floating-decimal',
    'dot-location': '@stylistic/dot-location',
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
    baseDirectory: __dirname
});


const findKey = (key) => STYLISTIC_MAP[key] ?? key;

const updateRules = (rules) => rules.map((o) => {
  if (o?.rules) {
    const current = o.rules;
    const newRules = {};
    Object.keys(current).forEach((k) => newRules[findKey(k)] = current[k]);
    return {
      ...o,
      rules: newRules
    }
  }
  return o;
});

function stringify(obj) {
  const cache = [];
  return JSON.stringify(obj, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        return;
      }
      cache.push(value);
    }
    return value;
  });
}

const rules = updateRules(compat.extends('airbnb-base'));
rules.forEach(rule => {
  if (rule.plugins) {
    delete rule.plugins;
  }
})


writeFileSync('index.js', `export default ${stringify(rules)}`);

export default [
  {
    plugins: {
      '@stylistic': stylistic,
      'import': importPlugin
    },
  },
  ...rules,
];
