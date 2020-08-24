import {FILM_COUNT, FILM_COUNT_PER_STEP, FILM_EXTRA_COUNT} from '../const.js';
import {render} from '../utils/render.js';
import FilmContainerView from '../view/film-container.js';
import FilmWrapView from '../view/film-wrap.js';
import NoFilmsView from '../view/no-films.js';
import FilmListView from '../view/film-list.js';
import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
import ButtonMoreView from '../view/button-more.js';
import FilmContainerMostCommentedView from '../view/film-most-commented.js';
import FilmContainerTopRatedView from '../view/film-top-rated.js';


export default class MovieListPresenter {
  constructor(mainElement, films) {
    this._mainElement = mainElement;
    this._films = films;
    this._noFilmsView = new NoFilmsView();
    this._filmContainerView = new FilmContainerView();
    this._buttonMoreView = new ButtonMoreView();
    this._filmContainerTopRatedView = new FilmContainerTopRatedView();
    this._filmContainerMostCommentedView = new FilmContainerMostCommentedView();
    this._filmListView = new FilmListView();
    this._filmWrapView = new FilmWrapView();
    this._filmCountRender = FILM_COUNT_PER_STEP;
  }


  _renderNoFilms() {
    render(this._noFilmsView, this._filmContainerView, `beforeend`);
  }


  _renderFilmCard(film) {
    const filmCardComponent = new FilmCardView(film);
    const filmDetailsComponent = new FilmDetailsView(film);

    const onEscapeDown = (event) => {
      if (event.key === `Escape` || event.key === `Esc`) {
        event.preventDefault();
        filmDetailsComponent.getElement().remove();
        document.removeEventListener(`keydown`, onEscapeDown);
      }
    };

    const onCloseClick = (event) => {
      event.preventDefault();
      filmDetailsComponent.getElement().remove();
      document.removeEventListener(`keydown`, onEscapeDown);
    };

    const onFilmCardClick = (event) => {
      event.preventDefault();
      render(filmDetailsComponent, this._mainElement, `afterend`);
      document.addEventListener(`keydown`, onEscapeDown);
    };

    filmCardComponent.setClickHandler(onFilmCardClick);
    filmDetailsComponent.setClickHandler(onCloseClick);

    render(filmCardComponent, this._filmListView, `beforeend`);
  }


  _renderFilmList(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film));
  }


  _renderShowMoreButton() {
    render(this._buttonMoreView, this._filmListView, `afterend`);
    this._buttonMoreView.setClickHandler(this._onShowMoreButtonClick.bind(this));
  }


  _onShowMoreButtonClick(event) {
    event.preventDefault();
    this._renderFilmList(this._filmCountRender, this._filmCountRender + FILM_COUNT_PER_STEP);
    this._filmCountRender += FILM_COUNT_PER_STEP;
    if (this._filmCountRender >= FILM_COUNT) {
      this._buttonMoreView.getElement().remove();
    }
  }

  _renderExtraFilms() {
    // показ дополнительных карточек пока полноценно не реализован,
    // так как задача необязательная, буду доделывать по мере свободного времени

    render(this._filmContainerTopRatedView, this._filmContainerView, `beforeend`);
    render(this._filmContainerMostCommentedView, this._filmContainerView, `beforeend`);

    const filmListTopRated = this._filmContainerTopRatedView.getElement().querySelector(`.films-list__container`);
    const filmListMostcommented = this._filmContainerMostCommentedView.getElement().querySelector(`.films-list__container`);

    this._films
      .slice(0, FILM_EXTRA_COUNT)
      .forEach((film) => render(new FilmCardView(film), filmListTopRated, `beforeend`));
    this._films
      .slice(0, FILM_EXTRA_COUNT)
      .forEach((film) => render(new FilmCardView(film), filmListMostcommented, `beforeend`));
  }


  init() {

    render(this._filmContainerView, this._mainElement, `beforeend`);

    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    render(this._filmWrapView, this._filmContainerView, `beforeend`);
    render(this._filmListView, this._filmWrapView, `beforeend`);

    this._renderFilmList(0, Math.min(FILM_COUNT, FILM_COUNT_PER_STEP));

    if (FILM_COUNT > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }

    this._renderExtraFilms();
  }


}
