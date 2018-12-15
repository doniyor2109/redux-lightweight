import * as React from 'react';
import { createStore } from 'redux';
import { connect, Provider  } from 'react-redux';
import { createUpdater } from 'redux-lightweight/lib';

import { Counter } from './Counter';
import { CounterComponent } from './CounterComponent';

const [reducer, actions] = createUpdater(Counter)

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

const CounterComponentEnhanced = connect(
  (counter) => ({ counter }),
  actions
)(CounterComponent)

function App() {
  return (
    <Provider store={store}>
      <CounterComponentEnhanced />
    </Provider>
  )
}

export default App;

