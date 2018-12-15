import React from 'react'

import { createUpdater } from './createUpdater';
import { bindActionCreators } from './helpers';

export function useUpdater(Updater) {
  const [reducer, actions, initialState] = createUpdater(Updater)
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return [state, bindActionCreators(actions, dispatch)]
}