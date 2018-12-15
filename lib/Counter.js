export class Counter {
  static initialState = 0;

  state = Counter.initialState

  increment() {
    return this.state + 1
  }
}
