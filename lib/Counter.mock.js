export class CounterMock {
  static initialState = 0;

  state = CounterMock.initialState

  increment() {
    return this.state + 1
  }

  callIncrement() {
    return this.increment()
  }

  anotherIncrement = () => {
    return this.increment()
  }
}
