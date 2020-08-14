import {createElement} from '../utils.js';

const createFilmContainerMarkup = () => {
  return (`
    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
        </div>
      </section>
    </section>
    `);
};


class FilmContainer {
  constructor() {
    this._element = null;
  }

  getMarkup() {
    return createFilmContainerMarkup();
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


export default FilmContainer;
