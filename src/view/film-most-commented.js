import {createElement} from '../utils.js';

const createFilmMostCommentedMarkup = () => {
  return (`
    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
      </div>
    </section>
    `);
};


const FilmContainerMostCommentedView = class {
  constructor() {
    this._element = null;
  }

  getMarkup() {
    return createFilmMostCommentedMarkup();
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


export default FilmContainerMostCommentedView;
