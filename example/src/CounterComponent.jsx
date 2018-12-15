import React from 'react'

export function CounterComponent({ counter, increment, decrement, double, half}) {
  return (
    <div>
      counter: <code>{counter}</code>
      <button onClick={() => increment()}>increment</button>
      <button onClick={() => decrement()}>decrement</button>
      <button onClick={() => double()}>double</button>
      <button onClick={() => half()}>half</button>
    </div>
  );
}