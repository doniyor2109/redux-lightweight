import React from 'react';
import { useUpdater } from 'redux-lightweight';

import { Counter } from './Counter';
import { CounterComponent } from './CounterComponent';

function App() {
  const [counter, actions] = useUpdater(Counter)
  return <CounterComponent counter={counter} {...actions}/>
}

export default App;
