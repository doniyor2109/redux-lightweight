export class Counter {
  static initialState = 0;

  state = Counter.initialState

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

export class Calculator extends Counter {
  double() {
    return this.state * 2
  }
}
