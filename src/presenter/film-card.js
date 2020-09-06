import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
import {render} from '../utils/render.js';


export default class FilmCardPresenter {
  constructor(mainElement, filmListView, updateData) {
    this._filmListView = filmListView;
    this._mainElement = mainElement;
    this._updateData = updateData;
    this._callback = {};
  }

  init(film) {

    this._createFilmCardInstance(film);

    render(this._filmCardView, this._filmListView, `beforeend`);

    this._filmCardViewOld = this._filmCardView;
    this._filmDetailsViewOld = this._filmDetailsView;

  }


  updateFilmCard(film) {

    this._createFilmCardInstance(film);

    this._filmCardViewOld.getElement().replaceWith(this._filmCardView.getElement());
    this._filmDetailsViewOld.getElement().replaceWith(this._filmDetailsView.getElement());
    this._filmDetailsView.renderComments(film.comments);

    this._filmCardViewOld = this._filmCardView;
    this._filmDetailsViewOld = this._filmDetailsView;

  }


  _createFilmCardInstance(film) {

    this._film = film;

    this._filmCardView = new FilmCardView(this._film);
    this._filmDetailsView = new FilmDetailsView(this._film);

    this._filmCardView.setClickHandler(this._onFilmCardClick.bind(this));

    this._filmCardView.setClickWatchlistHandler(this._handleWatchlistClick.bind(this));
    this._filmCardView.setClickHistoryHandler(this._handleHistoryClick.bind(this));
    this._filmCardView.setClickFavoriteHandler(this._handleFavoriteClick.bind(this));

    this._filmDetailsView.setClickHandler(this._onCloseClick.bind(this));

    this._filmDetailsView.setClickWatchlistHandler(this._handleWatchlistClick.bind(this));
    this._filmDetailsView.setClickHistoryHandler(this._handleHistoryClick.bind(this));
    this._filmDetailsView.setClickFavoriteHandler(this._handleFavoriteClick.bind(this));

    this._filmDetailsView.setClickEmojiHandler();
    this._filmDetailsView.setFormSubmitHandler(this._onFormSubmit.bind(this));
    this._filmDetailsView.setCommentDeleteHandler(this._onCommentDeleteClick.bind(this));
  }

  _onCommentDeleteClick(comment, updateType) {
    const indexComment = this._film.comments.indexOf(comment);
    this._film.comments.splice(indexComment, 1);
    this._updateData(this._film, updateType);
  }

  _onFormSubmit(comment, updateType) {
    this._film.comments.push(comment);
    this._updateData(this._film, updateType);
  }

  _onEscapeDown(event) {
    if (event.key === `Escape` || event.key === `Esc`) {
      event.preventDefault();
      this._filmDetailsView.getElement().remove();
      document.removeEventListener(`keydown`, this._onEscapeDown);
    }
  }

  _onCloseClick(event) {
    event.preventDefault();
    this._filmDetailsView.getElement().remove();
    document.removeEventListener(`keydown`, this._onEscapeDown);
  }

  _onFilmCardClick(event) {
    event.preventDefault();

    this._callback.closePopup();

    render(this._filmDetailsView, this._mainElement, `afterend`);
    this._filmDetailsView.renderComments(this._film.comments);

    document.addEventListener(`keydown`, this._onEscapeDown.bind(this));
  }


  setClosePopup(callback) {
    this._callback.closePopup = callback;
  }


  closePopup() {
    this._filmDetailsView.getElement().remove();
    document.removeEventListener(`keydown`, this._onEscapeDown);
  }


  _handleWatchlistClick(updateType) {
    // console.log(updateType);
    const newFilm = Object.assign({}, this._film);
    newFilm.isWatchlist = !newFilm.isWatchlist;
    this._updateData(newFilm, updateType);
  }

  _handleHistoryClick(updateType) {
    const newFilm = Object.assign({}, this._film);
    newFilm.isWatched = !newFilm.isWatched;
    this._updateData(newFilm, updateType);
  }

  _handleFavoriteClick(updateType) {
    const newFilm = Object.assign({}, this._film);
    newFilm.isFavorite = !newFilm.isFavorite;
    this._updateData(newFilm, updateType);
  }


}
