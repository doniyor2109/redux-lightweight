import React from 'react';

import { useUpdater } from './useUpdater';
import { CounterMock } from './Counter.mock';

jest.mock('react', () => ({
  useReducer: jest.fn((reducer, initialState) => ([
    initialState,
    jest.fn()
  ]))
}))

describe('useUpdater', () => {
  it('should return correct initial state', () => {
    const [state, actions] = useUpdater(CounterMock)
    expect(state).toBe(CounterMock.initialState)
  })
})

