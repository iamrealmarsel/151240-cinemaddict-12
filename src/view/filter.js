import {createElement} from '../utils.js';

const createFilterMarkup = (filmMocks) => {

  let favorite = 0;
  let watched = 0;
  let watchlist = 0;

  for (const value of filmMocks) {
    favorite = value.isFavorite ? favorite + 1 : favorite + 0;
    watched = value.isWatched ? watched + 1 : watched + 0;
    watchlist = value.isWatchlist ? watchlist + 1 : watchlist + 0;
  }


  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watched}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorite}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};


class Filter {
  constructor(filmMocks) {
    this._filmMocks = filmMocks;
    this._element = null;
  }

  getMarkup() {
    return createFilterMarkup(this._filmMocks);
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


export default Filter;