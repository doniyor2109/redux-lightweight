import { connect as reduxConnect } from 'react-redux';

function getArguments(args) {
  if (args.length === 2) {
    let [initialState, actions] = args;
    return [initialState, actions];
  } else if (args.length === 1 && typeof args[0] === 'object') {
    let { initialState, ...actions } = args[0];
    return [initialState, actions];
  } else {
    throw new Error('Invalid passed arguments');
  }
}

export function createReducer() {
	const [initialState, actions] = getArguments(arguments);

	return function (state = initialState, { type, action, payload }) {
		if (Object.values(actions).includes(action)) {
			return action.apply(state, payload);
		}
		return state;
	}
}

export function createActions(mapDispatchToProps) {
  return Object
    .entries(mapDispatchToProps)
    .reduce(
      (actions, [name, action]) => ({
        ...actions,
        [ name ]: (...args) => ({
          action,
          type: name,
          payload: args,
        })
      }),
      {}
    );
}

export function connect(mapStateToProps, mapDispatchToProps) {
  const actions = createActions(mapDispatchToProps);
  return reduxConnect(mapStateToProps, actions);
}