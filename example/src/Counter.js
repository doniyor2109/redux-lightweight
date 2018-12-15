export class Counter {
  state = 0;

  increment() {
    return this.state + 1
  }

  decrement() {
    return this.state - 1
  }

  double() {
    return this.state * 2
  }

  half() {
    return this.state / 2
  }
}