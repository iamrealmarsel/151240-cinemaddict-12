import {createElement} from '../utils.js';

const createNoFilmsMarkup = () => {
  return `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title">There are no movies in our database</h2>
      </section>
    </section>`;
};


const NoFilms = class {
  constructor() {
    this._element = null;
  }

  getMarkup() {
    return createNoFilmsMarkup();
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


export default NoFilms;
