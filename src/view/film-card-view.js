import AbstractView from './abstract-view.js';
import {convertTotalMinutesToHoursMinutes} from '../utils/common.js';

const createFilmCardMarkup = (film) => {
  let {
    title, poster, description, comments, isFavorite, isWatched, isWatchlist, rate, duration, releaseDate, genres
  } = film;
  const controlActive = `film-card__controls-item--active`;
  const favorite = isFavorite ? controlActive : ``;
  const watched = isWatched ? controlActive : ``;
  const watchlist = isWatchlist ? controlActive : ``;
  const releaseYear = releaseDate.getFullYear();
  duration = convertTotalMinutesToHoursMinutes(duration);
  genres = genres.length === 0 ? `` : genres[0];
  description = description.length <= 140 ? description : description.slice(0, 140) + `...`;

  return `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rate}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${duration.hours}h ${duration.minutes}m</span>
        <span class="film-card__genre">${genres}</span>
      </p>
      <img src="./${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist}">
        Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watched}">
        Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favorite}">
        Mark as favorite</button>
      </form>
    </article>`;
};

export default class FilmCardView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._callback = {};
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._callback.click);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._callback.click);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._callback.click);
  }

  setClickWatchlistHandler(callback) {
    this._callback.clickWatchlist = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._onWatchlistClick.bind(this));
  }

  _onWatchlistClick(event) {
    event.preventDefault();
    this._callback.clickWatchlist();
  }

  setClickHistoryHandler(callback) {
    this._callback.clickHistory = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._onHistoryClick.bind(this));
  }

  _onHistoryClick(event) {
    event.preventDefault();
    this._callback.clickHistory();
  }

  setClickFavoriteHandler(callback) {
    this._callback.clickFavorite = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._onFavoriteClick.bind(this));
  }

  _onFavoriteClick(event) {
    event.preventDefault();
    this._callback.clickFavorite();
  }

  getMarkup() {
    return createFilmCardMarkup(this._film);
  }
}
