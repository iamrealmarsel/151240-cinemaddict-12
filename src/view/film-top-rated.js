import {createElement} from '../utils.js';

const createFilmTopRatedMarkup = () => {
  return (`
    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
      </div>
    </section>
    `);
};


const FilmContainerTopRated = class FilmContainerTopRated {
  constructor() {
    this._element = null;
  }

  getMarkup() {
    return createFilmTopRatedMarkup();
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


export default FilmContainerTopRated;
