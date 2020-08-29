import {FILM_COUNT, FILM_COUNT_PER_STEP, FILM_EXTRA_COUNT, SortBy} from '../const.js';
import {render} from '../utils/render.js';
import FilmContainerView from '../view/film-container.js';
import FilmWrapView from '../view/film-wrap.js';
import NoFilmsView from '../view/no-films.js';
import FilmListView from '../view/film-list.js';
import ButtonMoreView from '../view/button-more.js';
import FilmContainerMostCommentedView from '../view/film-most-commented.js';
import FilmContainerTopRatedView from '../view/film-top-rated.js';
import SortView from '../view/sort.js';
import FilmCardPresenter from './film-card.js';


export default class FilmBoardPresenter {
  constructor(mainElement, films) {
    this._films = films;
    this._filmCardPresenter = {};
    this._mainElement = mainElement;
    this._noFilmsView = new NoFilmsView();
    this._filmContainerView = new FilmContainerView();
    this._buttonMoreView = new ButtonMoreView();
    this._filmContainerTopRatedView = new FilmContainerTopRatedView();
    this._filmContainerMostCommentedView = new FilmContainerMostCommentedView();
    this._filmListView = new FilmListView();
    this._filmWrapView = new FilmWrapView();
    this._sortView = new SortView();
  }


  init() {

    render(this._sortView, this._mainElement, `beforeend`);
    render(this._filmContainerView, this._mainElement, `beforeend`);

    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._filmsDefaultSort = this._films.slice();
    this._currentSortType = SortBy.DEFAULT;
    this._sortView.setClickHandler(this._onSortClick.bind(this));

    render(this._filmWrapView, this._filmContainerView, `beforeend`);
    render(this._filmListView, this._filmWrapView, `beforeend`);

    this._renderFilmList(0, Math.min(FILM_COUNT, FILM_COUNT_PER_STEP));

    if (FILM_COUNT > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }

    // this._renderExtraFilms();

  }


  _onSortClick(event) {
    event.preventDefault();

    const sortTypeClick = event.target.dataset.sort;

    if (event.target.tagName === `A` & sortTypeClick !== this._currentSortType) {

      this._filmListView.getElement().innerHTML = ``;

      switch (sortTypeClick) {
        case SortBy.RATING:
          this._films.sort((a, b) => b.rate - a.rate);
          break;
        case SortBy.DATE:
          this._films.sort((a, b) => b.releaseDate - a.releaseDate);
          break;
        case SortBy.DEFAULT:
          this._films = this._filmsDefaultSort.slice();
          break;
      }

      this._renderFilmList(0, Math.min(FILM_COUNT, FILM_COUNT_PER_STEP));

      if (FILM_COUNT > FILM_COUNT_PER_STEP & !this._buttonMoreView.hasDomElemnt()) {
        this._renderShowMoreButton();
      }

      this._sortView.setButtonActive(sortTypeClick);
      this._currentSortType = sortTypeClick;

    }
  }


  _updateData(film) {
    this._films.forEach((item) => {
      if (item.id === film.id) {
        item = film;
        return;
      }
    });
    this._filmCardPresenter[film.id].updateFilmCard();
    // наверно заменить на arr.find
  }


  _renderNoFilms() {
    render(this._noFilmsView, this._filmContainerView, `beforeend`);
  }


  _renderFilmCard(film) {
    const filmCardPresenter = new FilmCardPresenter(this._mainElement, this._filmListView, this._updateData.bind(this));
    filmCardPresenter.init(film);
    this._filmCardPresenter[film.id] = filmCardPresenter;
  }


  _renderFilmList(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film));
  }


  _renderShowMoreButton() {
    this._filmCountRender = FILM_COUNT_PER_STEP;
    render(this._buttonMoreView, this._filmListView, `afterend`);
    this._buttonMoreView.setClickHandler(this._onShowMoreButtonClick.bind(this));
  }


  _onShowMoreButtonClick(event) {
    event.preventDefault();
    this._renderFilmList(this._filmCountRender, this._filmCountRender + FILM_COUNT_PER_STEP);
    this._filmCountRender += FILM_COUNT_PER_STEP;
    if (this._filmCountRender >= FILM_COUNT) {
      this._buttonMoreView.getElement().remove();
      this._buttonMoreView.removeClickHandler();
    }
  }


  // _renderExtraFilms() {
  //   // показ дополнительных карточек пока полноценно не реализован,
  //   // так как задача необязательная, буду доделывать по мере свободного времени

  //   render(this._filmContainerTopRatedView, this._filmContainerView, `beforeend`);
  //   render(this._filmContainerMostCommentedView, this._filmContainerView, `beforeend`);

  //   const filmListTopRated = this._filmContainerTopRatedView.getElement().querySelector(`.films-list__container`);
  //   const filmListMostcommented = this._filmContainerMostCommentedView.getElement().querySelector(`.films-list__container`);

  //   this._films
  //     .slice(0, FILM_EXTRA_COUNT)
  //     .forEach((film) => render(new FilmCardView(film), filmListTopRated, `beforeend`));
  //   this._films
  //     .slice(0, FILM_EXTRA_COUNT)
  //     .forEach((film) => render(new FilmCardView(film), filmListMostcommented, `beforeend`));
  // }


}
