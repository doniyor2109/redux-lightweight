# redux-lightweight

This library allows you to write your action types, action creators and reducer in one place.

[![Build Status](https://travis-ci.com/doniyor2109/redux-lightweight.svg?branch=master)](https://travis-ci.com/doniyor2109/redux-lightweight)
[![codecov](https://codecov.io/gh/doniyor2109/redux-lightweight/branch/master/graph/badge.svg)](https://codecov.io/gh/doniyor2109/redux-lightweight)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/doniyor2109/redux-lightweight/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

This library is inpired by [redux-actions](https://github.com/redux-utilities/redux-actions) and [mobx](https://mobx.js.org/)

### Table of Contents

- [Introduction](#introduction)
  - [Motivation](#motivation)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Using with other libraries](#using-with-other-libraries)
    - [Usage with Saga](#usage-with-saga)
- [API Reference](#api-reference)
  - [createUpdater(Updater)](#createupdaterupdater)
  - [useUpdater(Updater)](#useupdaterupdater)
- [Licence](#licence)

# Introduction

## Motivation

Redux is great library which solves data managment. However it introduces some boilerplate. In order to add one business logic, developer must create 3 different things (action type, action, reducer) and they do one thing together. That is why I have decide to create utility that allows declare them in one place.
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

## Usage with Redux

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

CounterComponent.jsx
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

[![Edit 0y50x9040v](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/0y50x9040v?module=%2Fsrc%2Fredux%2Findex.js&moduleview=1)

## Usage with Hooks

Counter.js
```js
export class Counter {
  state = 10
  
  increment(amount = 1) {
    return this.state + amount;
  }
  
  decrement(amount = 1) {
    return this.state - amount;
  }
}
```

CounterComponent.jsx
```jsx harmony
import React from 'react';
import { useUpdater } from 'redux-lightweight';

import { Counter } from './Counter';

function Counter() {
    const [counter, { increment, decrement }] = useUpdater(Counter);
    return (
        <>
            <p>{counter}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </>
    );
}
```

[![Edit 0y50x9040v](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/0y50x9040v?module=%2Fsrc%2Fhook%2Findex.js&moduleview=1)

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
