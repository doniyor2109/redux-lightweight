import { useReducer, useMemo } from 'react'

import { createUpdater } from './createUpdater';
import { bindActionCreators } from './helpers';

export function useUpdater(Updater) {
  const [reducer, actions, initialState] = useMemo(() => {
     return createUpdater(Updater)
  }, [])
  const [state, dispatch] = useReducer(reducer, initialState)
  const boundActions = useMemo(() => {
    return bindActionCreators(actions, dispatch)
  }, [dispatch, actions])
  return [state, boundActions]
}