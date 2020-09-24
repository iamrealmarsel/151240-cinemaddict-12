import AbstractView from './abstract-view.js';

const createButtonMoreMarkup = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ButtonMoreView extends AbstractView {
  constructor() {
    super();
    this._callback = {};
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._callback.click);
  }

  removeClickHandler() {
    this.getElement().removeEventListener(`click`, this._callback.click);
  }

  hasDomElement() {
    return Boolean(document.querySelector(`.films-list__show-more`));
  }

  getMarkup() {
    return createButtonMoreMarkup();
  }
}
