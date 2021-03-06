import React from 'react';

import { useUpdater } from './useUpdater';
import { Counter } from './Counter.mock';

jest.mock('react', () => ({
  useReducer: jest.fn((reducer, initialState) => ([
    initialState,
    jest.fn()
  ])),
  useMemo: jest.fn((callback) => (callback()))
}))

describe('useUpdater', () => {
  it('should return correct initial state', () => {
    const [state, actions] = useUpdater(Counter)
    expect(state).toBe(Counter.initialState)
  })
})

