import AbstractView from './abstract-view.js';

const createFilmListMarkup = () => {
  return `<div class="films-list__container"></div>`;
};

export default class FilmListView extends AbstractView {
  getMarkup() {
    return createFilmListMarkup();
  }
}
