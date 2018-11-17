# redux-lightweight


[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/doniyor2109/redux-lightweight/blob/master/LICENSE)

This library allows to write your action types, action creators and reducer in one function and allows scale your redux application.

### Table of Contents

- [Introduction](#introduction)
  - [Motivation](#motivation)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Migrating from redux to redux-lightweight](#migrating-from-redux-to-redux-lightweight)
  - [Using with other libraries](#using-with-other-libraries)
    - [Usage with Saga](#usage-with-saga)
- [API Reference](#api-reference)
  - [createReducer(entityDetails)](#createreducerentitydetails)
  - [createActions(entityActions)](#createactionsentityactions)
- [Licence](#licence)

# Introduction

## Motivation

Redux is great library which solves data managment for React. However it introduces some boilerplate. In order to add one business logic, developer must to create 3 different things (action type, action, reducer). However these codes do one thing together. That is why I have decide to create utility that allows declare them in one place.
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

import * as counter from './counter';

export default createReducer(counter);
```

Counter.js
```jsx harmony
import React from 'react';
import { connect } from 'react-redux';
import { createActions } from 'redux-lightweight';

import * as counter from './counter';

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
    createActions(counter)
)(Counter);
```

[![Edit k91yr687qo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/k91yr687qo)

# Migrating from redux to redux-lightweight

In order to conver from redux style action types, action creators and reducer to redux-lightweight function, you should merge them into one function and you should also declare `initialState` variable.
```diff

- const INCREMENT = 'INCREMENT';

- const increment = (number) => ({
-    type: INCREMENT,
-    payload: number,
- });

export const initialState = { counter: 0 };

- const reducer = (state = initialState, action) => {
-    switch (action.type) {
-        case INCREMENT:
-            return {
-                ...state,
-                counter: state.counter + action.payload,
-            };
-        default:
-            return state;
-    }
-}
+ export function increment(number) {
+  return {
+      ...this,
+      counter: this.counter + number,
+  };
+}
```

# Using with other libraries

### Usage with Saga

```js
import { takeEvery } from 'redux-saga/effects';
import { increment } from './counter';

function* rootSaga() {
  yield takeEvery(increment.name, incrementWorkerSaga);
}
```

<aside class="warnings">
  Currently <b>redux-lightweight</b> is designed to take type from function name. That is why it requires to give unieque name for functions.
</aside>


# API Reference

## `createReducer(entityDetails)`

```js
createReducer({
  initialState: any, // Initial state of reducer
  [key: string]: function, // Entity functions
})
```

Creates reducer from given entity details

###### EXAMPLE

```js
export const initialState = { counter: 10 };

export function increment(amount = 1) {
    return {
      ...this,
      counter: this.counter + amount,
    };
}

const reducer = createReducer({ initialState, increment });
```

## `createActions(entityActions)`

```js
entityActions({
  [key: string]: function, // Entity functions
})
```

Creates actions from given entity functions

###### EXAMPLE

```js
export const initialState = { counter: 10 };

export function increment(amount = 1) {
    return {
      ...this,
      counter: this.counter + amount,
    };
}

const actions = createActions({ increment });
```

# Licence

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
