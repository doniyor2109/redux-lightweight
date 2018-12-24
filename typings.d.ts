type ExcludeProperty<T, U> = {
  [K in Exclude<keyof T, U>]: T[K]
}
type Action<T> = {
  type: string,
  payload: T
}
type Reducer<S, A> = (state?: S, action?: {type: keyof A | string, payload: any[]}) => S
type Actions<T> = {
  [K in keyof T]: {
    type: K
    (...args: GetArgumentType<T[K]>): Action<GetArgumentType<T[K]>>
  }
}
type BoundActions<T> = {
  [K in keyof T]: {
    (...args: GetArgumentType<T[K]>): void
  }
}
type GetArgumentType<T> = T extends (...args: infer A) => any ? A : never
type Updater<T> = {
  state: T
}

export function createUpdater<T extends Updater<T['state']>>(updater: {new(): T}): [Reducer<T['state'], ExcludeProperty<T, 'state'>>, Actions<ExcludeProperty<T, 'state'>>]

export function useUpdater<T extends Updater<T['state']>>(updater: {new(): T}): [T['state'], BoundActions<ExcludeProperty<T, 'state'>>];