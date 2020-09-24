export default class Observer {
  constructor() {
    this._observers = [];
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  removeObserver(myObserver) {
    this._observers = this._observers.filter((observer) => observer !== myObserver);
  }

  _notify(newData, type) {
    this._observers.forEach((observer) => observer(newData, type));
  }
}
