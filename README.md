# redux-lightweight

This library generates actions creators, action types and reducers for you. It uses class as a syntactic sugar for generating actions and reducers.


[![](https://img.shields.io/npm/v/redux-lightweight.svg)](https://www.npmjs.com/package/redux-lightweight)
[![Build Status](https://travis-ci.com/doniyor2109/redux-lightweight.svg?branch=master)](https://travis-ci.com/doniyor2109/redux-lightweight)
[![codecov](https://codecov.io/gh/doniyor2109/redux-lightweight/branch/master/graph/badge.svg)](https://codecov.io/gh/doniyor2109/redux-lightweight)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/doniyor2109/redux-lightweight/blob/master/LICENSE)

[![](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/doniyor2109/status/1075425404100468736)


### Table of Contents

- [Introduction](#introduction)
  - [Motivation](#motivation)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Usage with React Hooks](#usage-with-react-hooks)
    - [Usage with react-redux](#usage-with-react-redux)
    - [Usage with redux-saga](#usage-with-redux-saga)
    - [Usage only for actions](#usage-only-for-actions)
  - [Advanced Usage](#advanced-usage)
- [How it works](#how-it-works)
- [API Reference](#api-reference)
  - [createUpdater(Updater)](#createupdaterupdater)
  - [useUpdater(Updater)](#useupdaterupdater)
- [Licence](#licence)

# Introduction

## Motivation

Redux is great library which solves data management. However it introduces some boilerplate. In order to add one business logic, developer must create 3 different things (action type, action creator, reducer) and they do one thing together. That is why I have decide to create utility that allows declare them in one place.
One business logic should be declared in one place.

This library is inspired by [redux-actions](https://github.com/redux-utilities/redux-actions) and [mobx](https://mobx.js.org/)

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

Create class that has `state` property as initial state and methods as actions.

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

counterReducer; //  reducer for Counter class
counterActions; //  action creator for Counter  class - { increment, decrement }
```

### Usage with React Hooks

`redux-lightweight` exposes `useUpdater` custom hook to make it easier working with reducers.

```jsx harmony
import React from 'react';
import { useUpdater } from 'redux-lightweight';

import { Counter } from './Counter';

function CounterView() {
    const [counter, { increment, decrement }] = useUpdater(Counter);
    return (
        <div>
            <p>{counter}</p>
            <button onClick={() => increment()}>+</button>
            <button onClick={() => decrement()}>-</button>
        </div>
    );
}
```

[![Edit 0y50x9040v](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/0y50x9040v?module=%2Fsrc%2Fhook%2Findex.js&moduleview=1)


### Usage with react-redux

`redux-lightweight` generates simple action creators and reducer. So you can work with them as usual.

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
        </div>
    );
}

const mapStateToProps = (state) => ({ counter: state });

const mapDispatchToProps = {
  increment: counterActions.increment,
  decrement: counterActions.decrement
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

[![Edit 0y50x9040v](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/0y50x9040v?module=%2Fsrc%2Fredux%2Findex.js&moduleview=1)

### Usage with redux-saga

In order to handle `redux-lightweight` generated action creators in saga, you can access action type with action function itself:

```js
import { takeEvery } from 'redux-saga/effects';

import { counterActions } from './Counter';

function* rootSaga() {
  yield takeEvery(counterActions.increment.type, incrementWorkerSaga);
}
```

### Usage only for actions

If you have already big reducers that are difficult to migrate then you can use library as action generator.

> Arguments passed to actions will be array in payload
```js
{
  type: actionType,
  payload: args // array of arguments
}
```

```js
export class Counter {
  increment(amount) {}
  
  decrement(amount) {}
}

const [, counterActions] = createUpdater(Counter);

switch(type, payload) {
   case counterActions.increment.type:
    return state + payload[0];
  case counterActions.decrement.type:
    return state - payload[0];
   default:
    return state;
}

dispatch(counterActions.increment(1));
```

## Advanced Usage

As `redux-lightweight` works with classes, you can use extended classes as well. That is useful to reuse reducers and actions.

```js

class Calculator extends Counter {
  double() {
    return this.state * 2;
  }
}

export const [calculatorReducer, calculatorActions] = createUpdater(Calculator);
```

Now it generates 3 action creators:

- `increment`
- `decrement`
- `double`

# How it works

Basically redux-lightweight generates action creators, action types and reducers for you.

When you pass your class to `redux-lightweight`, it generates following things for you:

- **Action creator** - Each method of class e.g increment, decrement
- **Action type** - Prefixed by class name e.g "Counter/increment"
- **Reducer** - Which handles all actions inside class
  - In order to set initial state for reducer, declare `state` property on class.

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

const [counterReducer, counterActions] = createUpdater(Counter)
```

- `counterActions` contains all methods of `Counter` class as actions. In this case there will be two actions:


```js
counterActions.increment(100) // { type: "Counter/increment", args: [100] }

counterActions.decrement(100) // { type: "Counter/decrement", args: [100] }
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

```js
counterActions.increment.type // "Counter/increment"`
```
 
# API Reference

#### `createUpdater(Updater)`

Creates reducer and action creators for given Updater class. Receives class that has `state` property and methods.

###### EXAMPLE

```js
const [reducer, actions] = createUpdater(Counter);
```

#### `useUpdater(Updater)`

Custom hook for using Updater. Receives class that has `state` property and methods.

###### EXAMPLE

```js
function App() {
  const [state, actions] = useUpdater(Counter);
}
```


# Licence

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
