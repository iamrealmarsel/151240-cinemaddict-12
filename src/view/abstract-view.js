import {createElement} from '../utils/render.js';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate, only inherits classes`);
    }

    this._element = null;
  }

  getMarkup() {
    throw new Error(`The abstract method must be implemented: getTemplate`);
  }

  getElement() {
    if (this._element === null) {
      this._element = createElement(this.getMarkup());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
