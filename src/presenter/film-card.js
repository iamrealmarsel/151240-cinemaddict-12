import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
import CommentsView from '../view/comments.js';
import {render} from '../utils/render.js';


export default class FilmCardPresenter {
  constructor(mainElement, filmListView, updateData) {
    this._filmListView = filmListView;
    this._mainElement = mainElement;
    this._updateData = updateData;
    // this._comment = {};
  }

  init(film) {
    this._film = film;

    this._createFilmCardInstance();

    render(this._filmCardView, this._filmListView, `beforeend`);

    this._filmCardViewOld = this._filmCardView;
    this._filmDetailsViewOld = this._filmDetailsView;

    // console.log(this._film);

  }


  updateFilmCard() {
    this._createFilmCardInstance();

    this._filmCardViewOld.getElement().replaceWith(this._filmCardView.getElement());
    this._filmDetailsViewOld.getElement().replaceWith(this._filmDetailsView.getElement());
    this._filmDetailsView.renderComments(this._film.comments);

    this._filmCardViewOld = this._filmCardView;
    this._filmDetailsViewOld = this._filmDetailsView;

  }


  _createFilmCardInstance() {
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

  _onCommentDeleteClick(comment) {
    const indexComment = this._film.comments.indexOf(comment);
    this._film.comments.splice(indexComment, 1);
    this._updateData(this._film);
  }

  _onFormSubmit(comment) {
    this._film.comments.push(comment);
    this._updateData(this._film);
  }

  _onEscapeDown(event) {
    if (event.key === `Escape` || event.key === `Esc`) {
      event.preventDefault();
      this._filmDetailsView.getElement().remove();
      document.removeEventListener(`keydown`, this._onEscapeDown);
    }
  };

  _onCloseClick(event) {
    event.preventDefault();
    this._filmDetailsView.getElement().remove();
    document.removeEventListener(`keydown`, this._onEscapeDown);
  };

  _onFilmCardClick(event) {
    event.preventDefault();

    render(this._filmDetailsView, this._mainElement, `afterend`);
    this._filmDetailsView.renderComments(this._film.comments);

    document.addEventListener(`keydown`, this._onEscapeDown.bind(this));
  };


  _handleWatchlistClick() {
    this._film.isWatchlist = !this._film.isWatchlist
    this._updateData(this._film);
  }

  _handleHistoryClick() {
    this._film.isWatched = !this._film.isWatched
    this._updateData(this._film);
  }

  _handleFavoriteClick() {
    this._film.isFavorite = !this._film.isFavorite
    this._updateData(this._film);
  }



}
