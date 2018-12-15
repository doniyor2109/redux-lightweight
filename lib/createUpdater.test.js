import { createUpdaterAction, createUpdater } from './createUpdater';
import { CounterMock } from './Counter.mock';

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
      [reducer, actions, initialState] = createUpdater(CounterMock)
    })

    describe('returned initialState', () => {
      it("should be same with Class's initialState", () => {
        expect(initialState).toBe(CounterMock.initialState)
      })
    })

    describe('returned reducer', () => {

      it('should have correct initial state', () => {
        const state = reducer(undefined, emptyAction)
        expect(state).toBe(CounterMock.initialState)
      })

      it('should handle action correctly', () => {
        const state = reducer(undefined, actions.increment())
        expect(state).toBe(1)
      })
    })
  })
})
