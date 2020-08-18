import {createElement} from '../utils.js';

const createFooterStatsMarkup = (filmMocks) => {

  return `<p>${filmMocks.length} movies inside</p>`;
};


const FooterStatsView = class {
  constructor(filmMocks) {
    this._filmMocks = filmMocks;
    this._element = null;
  }

  getMarkup() {
    return createFooterStatsMarkup(this._filmMocks);
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


export default FooterStatsView;
