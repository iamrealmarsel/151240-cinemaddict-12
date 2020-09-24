import AbstractView from './abstract-view.js';

const createFooterStatsMarkup = (film) => {
  return `<p>${film.length} movies inside</p>`;
};

export default class FooterStatsView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
  }

  getMarkup() {
    return createFooterStatsMarkup(this._film);
  }
}
