import { getAllProperties } from './helpers';

export function createUpdater(Updater) {
  const updater = new Updater();
  const updaterName = Updater.name;
  const initialState = updater.state;

  function reducer(state = initialState, { type, action, payload }) {
    const parts = type && type.split('/')
    if (parts && parts.length === 2 && parts[0]===updaterName && parts[1] in updater) {
      const actionName = parts[1]
      return updater[actionName].apply({ state }, payload);
    }
    return state;
  }

  const actions = getAllProperties(updater).reduce((actions, actionName) => {
    const actionType = buildActionType(updaterName, actionName)
    const action = createUpdaterAction(actionType)
    return Object.assign(actions, { [actionName]: action })
  }, {})

  return [reducer, actions, initialState]
}

export function buildActionType(reducerName, actionName) {
  return `${reducerName}/${actionName}`
}

export function createUpdaterAction(actionType) {
  function action(...args) {
    return {
      type: actionType,
      payload: args
    };
  }
  action.type = actionType;

  return action;
}
