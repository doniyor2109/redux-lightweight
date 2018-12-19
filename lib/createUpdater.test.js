import { createUpdaterAction, createUpdater } from './createUpdater';
import { Counter, Calculator } from './Counter.mock';

const actionType = 'REDUCER/ACTION'
const emptyAction = {}

describe('createUpdater', () => {

  describe('createUpdaterAction', () => {
    it('should return correct action', () => {
      const actionCreator = createUpdaterAction(actionType)
      const args = ['string', 1, true]
      const result = actionCreator.apply(null, args)
      const exacted = {
        type: actionType,
        payload: args,
      }
      expect(result).toEqual(exacted)
    })
    it('should assign actionType to actionCreator', () => {
      const actionCreator = createUpdaterAction(actionType)
      expect(actionCreator.type).toBe(actionType)
    })
  })

  describe('createUpdater', () => {
    let reducer, actions, initialState;

    beforeEach(() => {
      [reducer, actions, initialState] = createUpdater(Counter)
    })

    describe('returned initialState', () => {
      it("should be same with Class's initialState", () => {
        expect(initialState).toBe(Counter.initialState)
      })
    })

    describe('returned reducer', () => {

      it('should have correct initial state', () => {
        const state = reducer(undefined, emptyAction)
        expect(state).toBe(Counter.initialState)
      })

      it('should handle action correctly', () => {
        const state = reducer(undefined, actions.increment())
        expect(state).toBe(1)
      })

      it('should handle action correctly for composed action call', () => {
        const state = reducer(undefined, actions.callIncrement())
        expect(state).toBe(1)
      })

      it('should handle action correctly for class-properties methods', () => {
        const state = reducer(undefined, actions.anotherIncrement())
        expect(state).toBe(1)
      })

      it('should handle action correctly for class-properties methods', () => {
        const state = reducer(1, actions.anotherIncrement())
        expect(state).toBe(2)
      })
    })
  })

  describe('createUpdater for child', () => {
    let reducer, actions, initialState;

    beforeEach(() => {
      [reducer, actions, initialState] = createUpdater(Calculator)
    })

    describe('returned initialState', () => {
      it("should be same with Class's initialState", () => {
        expect(initialState).toBe(Counter.initialState)
      })
    })

    describe('returned reducer', () => {

      it('should have correct initial state', () => {
        const state = reducer(undefined, emptyAction)
        expect(state).toBe(Counter.initialState)
      })

      it('should handle action correctly', () => {
        const state = reducer(undefined, actions.increment())
        expect(state).toBe(1)
      })

      it('should handle action correctly for composed action call', () => {
        const state = reducer(undefined, actions.callIncrement())
        expect(state).toBe(1)
      })

      it('should handle action correctly for class-properties methods', () => {
        const state = reducer(undefined, actions.anotherIncrement())
        expect(state).toBe(1)
      })

      it('should handle action correctly for class-properties methods', () => {
        const state = reducer(1, actions.anotherIncrement())
        expect(state).toBe(2)
      })
    })
  })
})
