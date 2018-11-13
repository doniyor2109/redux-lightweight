# redux-lightweight

### Table of Contents

- [Introduction](#introduction)
  - [Motivation](#motivation)

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)

- [API Reference](#api-reference)
  - [createReducer](#createReducer)
  - [createActions](#createActions)

# Introduction

## Motivation

Redux is great library which solves data managment for React. However it introduces some boilerplate. In order to add one business logic, developer must to create 3 different things (action type, action, reducer). However these codes do one thing together. That is why I have decide to utility that allows declare them in one place.
One business logic should be declared in one place like this:

```js
export const initialState = { counter: 10 };

export function increment(amount = 1) {
    return { ...this, counter: this.counter + amount };
}
```

Is't it more readable and clear? All you need to bind this logic with `redux-lightweight`.

# Getting Started

## Installation

```bash
$ npm install --save redux-lightweight
```

or

```bash
$ yarn add redux-lightweight
```

## Usage

counter.js
```js
export const initialState = { counter: 10 };

export function increment(amount = 1) {
    return { ...this, counter: this.counter + amount };
}

export function decrement(amount = 1) {
    return { ...this, counter: this.counter - amount };
}
```

counterReducers.js
```js
import { createReducer } from 'redux-lightweight';

import * as counterReducer from './counter';

export default createReducer(counterReducer);
```

Counter.js
```jsx harmony
import React from 'react';
import { connect } from 'react-redux';
import { createActions } from 'redux-lightweight';

import * as counterActions from './counter';

function Counter({ counter, increment, decrement }) {
    return (
        <>
            <p>{counter}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </>
    );
}

export default connect(
    ({ counter }) => ({ counter }),
    createActions(counterActions)
)(Counter);
```

[![Edit k91yr687qo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/k91yr687qo)

# API Reference

## createReducer

Creates reducer from given executors.

###### EXAMPLE

```js
export const initialState = { counter: 10 };

export function increment(amount = 1) {
    return { ...this, counter: this.counter + amount };
}

const reducer = createReducer({ initialState, increment });
```

## createActions

Creates actions from given executors.

###### EXAMPLE

```js
export const initialState = { counter: 10 };

export function increment(amount = 1) {
    return { ...this, counter: this.counter + amount };
}

const actions = createActions({ increment });
```
