import {createElement} from '../utils.js';

const createButtonMoreMarkup = () => {
  return (`<button class="films-list__show-more">Show more</button>`);
};


const ButtonMoreView = class {
  constructor() {
    this._element = null;
  }

  getMarkup() {
    return createButtonMoreMarkup();
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
};


export default ButtonMoreView;
