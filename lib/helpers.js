export function bindActionCreators(actions, dispatch) {
  return Object.entries(actions).reduce((actions, [name, action]) => {
    return {
      ...actions,
      [name]: (...args) => {
        dispatch(action(...args))
      }
    }
  }, {})
}

export function getAllProperties(obj) {
  let properties = []
  let currentProto = obj
  while(currentProto && currentProto !== Object.prototype) {
    properties = properties.concat(Object.getOwnPropertyNames(currentProto))
    currentProto = Object.getPrototypeOf(currentProto)
  }
  return properties
}
