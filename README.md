# redux-lightweight

[![Build Status](https://travis-ci.com/doniyor2109/redux-lightweight.svg?branch=master)](https://travis-ci.com/doniyor2109/redux-lightweight)
[![codecov](https://codecov.io/gh/doniyor2109/redux-lightweight/branch/master/graph/badge.svg)](https://codecov.io/gh/doniyor2109/redux-lightweight)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/doniyor2109/redux-lightweight/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

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
class Counter {
  state = 10
  
  increment(amount = 1) {
    return this.state + amount;
  }
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

Counter.js
```js
import { createUpdater } from 'redux-lightweight';

export class Counter {
  state = 10
  
  increment(amount = 1) {
    return this.state + amount;
  }
  
  decrement(amount = 1) {
    return this.state - amount;
  }
}

const [reducer, actions] = createUpdater(Counter)

export const counterReducer = reducer

export default actions
```

CounterComponent.js
```jsx harmony
import React from 'react';
import { connect } from 'react-redux';

import * as counter from './Counter';

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
    {
      increment: counter.increment,
      decrement: counter.decrement
    }
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
+ 
+export class Counter {
+  state = { counter: 0 }
+  
+  increment(amount = 1) {
+    return this.state.counter + amount;
+  }
+}
```

# Using with other libraries

### Usage with Saga

```js
import { takeEvery } from 'redux-saga/effects';
import counterActions from './Counter';

function* rootSaga() {
  yield takeEvery(counterActions.increment.type, incrementWorkerSaga);
}
```

# API Reference

## `createUpdater(Updater)`


Creates reducer and actions for given Updater class

###### EXAMPLE

```js
class Counter {
  state = 10;
  
  increment(amount = 1) {
    return this.state + amount;
  }
}

const [reducer, actions] = createUpdater(Counter);
```

## `useUpdater(Updater)`

Custom hook for using Updater

###### EXAMPLE

```js
class Counter {
  state = 10;
  
  increment(amount = 1) {
    return this.state + amount;
  }
}

function App() {
  const [state, actions] = useUpdater(Counter);
}
```

# Licence

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
