# redux-lightweight

This library allows you to write your action types, action creators and reducer in one place.

[![Build Status](https://travis-ci.com/doniyor2109/redux-lightweight.svg?branch=master)](https://travis-ci.com/doniyor2109/redux-lightweight)
[![codecov](https://codecov.io/gh/doniyor2109/redux-lightweight/branch/master/graph/badge.svg)](https://codecov.io/gh/doniyor2109/redux-lightweight)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/doniyor2109/redux-lightweight/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

### Table of Contents

- [Introduction](#introduction)
  - [Motivation](#motivation)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Usage with Hooks](#usage-with-hooks)
  - [Using with other libraries](#using-with-other-libraries)
    - [Usage with react-redux](#usage-with-react-redux)
    - [Usage with Saga](#usage-with-saga)
- [How it works](#how-it-works)
- [API Reference](#api-reference)
  - [createUpdater(Updater)](#createupdaterupdater)
  - [useUpdater(Updater)](#useupdaterupdater)
- [Licence](#licence)

# Introduction

## Motivation

Redux is great library which solves data management. However it introduces some boilerplate. In order to add one business logic, developer must create 3 different things (action type, action, reducer) and they do one thing together. That is why I have decide to create utility that allows declare them in one place.
One business logic should be declared in one place.

This library is inspired by [redux-actions](https://github.com/redux-utilities/redux-actions) and [mobx](https://mobx.js.org/)

## Usage

```js
import { createUpdater } from 'redux-lightweight';

export class Counter {
  state = 10;
  
  increment(amount = 1) {
    return this.state + amount;
  }
  
  decrement(amount = 1) {
    return this.state - amount;
  }
}

export const [counterReducer, counterActions] = createUpdater(Counter);

counterReducer //  Counter reducer:
counterActions //  Counter actions: { increment, decrement }
```

# Getting Started

## Installation

```bash
$ npm install --save redux-lightweight
```

or

```bash
$ yarn add redux-lightweight
```

# Using with other libraries

## Usage with React Redux

```jsx harmony
import React from 'react';
import { connect } from 'react-redux';

import { counterActions } from './Counter';

function Counter({ counter, increment, decrement }) {
    return (
        <div>
            <p>{counter}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        <div/>
    );
}

const mapStateToProps = ({ counter }) => ({ counter });

const mapDispatchToProps = {
  increment: counterActions.increment,
  decrement: counterActions.decrement
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

[![Edit 0y50x9040v](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/0y50x9040v?module=%2Fsrc%2Fredux%2Findex.js&moduleview=1)

## Usage with Hooks

```jsx harmony
import React from 'react';
import { useUpdater } from 'redux-lightweight';

import { Counter } from './Counter';

function Counter() {
    const [counter, { increment, decrement }] = useUpdater(Counter);
    return (
        <div>
            <p>{counter}</p>
            <button onClick={() => increment()}>+</button>
            <button onClick={() => decrement()}>-</button>
        <div/>
    );
}
```

[![Edit 0y50x9040v](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/0y50x9040v?module=%2Fsrc%2Fhook%2Findex.js&moduleview=1)

### Usage with Saga

```js
import { takeEvery } from 'redux-saga/effects';

import { counterActions } from './Counter';

function* rootSaga() {
  yield takeEvery(counterActions.increment.type, incrementWorkerSaga);
}
```

# How it works

Basically redux-lightweight generates actions, actionTypes and reducers for you.

When you pass your class to `redux-lightweight`, it generates following things for you:

- **Action creators** - Each method of class e.g increment, decrement
- **Action type** - Prefixed by class name e.g "Counter/increment"
- **Reducer** - Which handles all actions inside class

```js
class Counter {
  state = 10; // Initial state for reducer = 10
  
  increment(amount = 1) {
    return this.state + amount;
  }
  
  decrement(amount = 1) {
    return this.state - amount;
  }
}

export const [counterReducer, counterActions] = createUpdater(Counter)
```

- `counterActions` contains all methods of `Counter` class as actions. In this case there will be two actions:


```js
counterActions.increment -> (amount) => ({ type: "Counter/increment", args: [amount] })

counterActions.decrement -> (amount) => ({ type: "Counter/decrement", args: [amount] })
```

- `counterReducer` is reducer that handles all actions of class. It is same as with following `switch/case` statements:

```js
switch(type) {
   case "Counter/increment":
    return state + amount;
  case "Counter/decrement":
    return state - amount;
   default:
    return state;
}
```


If you want to get action type for action then you can access it with `type` property of action:

`counterActions.increment.type // "Counter/increment"`
 
# API Reference

## `createUpdater(Updater)`

Creates reducer and actions for given Updater class

###### EXAMPLE

```js
export const [reducer, actions] = createUpdater(Counter);
```

## `useUpdater(Updater)`

Custom hook for using Updater

###### EXAMPLE

```js
function App() {
  const [state, actions] = useUpdater(Counter);
}
```

# Licence

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
