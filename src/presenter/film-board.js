import {FILM_COUNT, FILM_COUNT_PER_STEP, SortBy, UpdateType} from '../const.js';
import {render} from '../utils/render.js';
import {filter} from '../utils/filter.js';
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
  constructor(mainElement, filmsModel, filterModel) {
    this._filmCardPresenters = {};
    this._mainElement = mainElement;

    this._noFilmsView = new NoFilmsView();
    this._filmContainerView = new FilmContainerView();
    this._buttonMoreView = new ButtonMoreView();
    this._filmContainerTopRatedView = new FilmContainerTopRatedView();
    this._filmContainerMostCommentedView = new FilmContainerMostCommentedView();
    this._filmListView = new FilmListView();
    this._filmWrapView = new FilmWrapView();

    this._filmsModel = filmsModel;
    this._filmsModel.addObserver(this._updateFilmCard.bind(this));
    this._films = this._filmsModel.getFilms().slice();

    this._filterModel = filterModel;
    this._filterModel.addObserver(this._updateFilmCard.bind(this));

    this._currentSortType = SortBy.DEFAULT;
  }


  init() {

    this._sortView = new SortView(this._currentSortType);
    this._sortView.setClickHandler(this._onSortClick.bind(this));
    render(this._sortView, this._mainElement, `beforeend`);

    render(this._filmContainerView, this._mainElement, `beforeend`);

    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._filmsDefaultSort = this._films.slice();

    render(this._filmWrapView, this._filmContainerView, `beforeend`);
    render(this._filmListView, this._filmWrapView, `beforeend`);

    this._renderFilmList(0, Math.min(FILM_COUNT, FILM_COUNT_PER_STEP));

    if (FILM_COUNT > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }


  }


  _closePopup() {
    Object.values(this._filmCardPresenters).forEach((filmCardPresenter) => filmCardPresenter.closePopup());
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

      this._replaceSort(sortTypeClick);
    }
  }

  _replaceSort(sortType) {
    this._previousSortView = this._sortView;
    this._sortView = new SortView(sortType);
    this._sortView.setClickHandler(this._onSortClick.bind(this));
    this._previousSortView.getElement().replaceWith(this._sortView.getElement());
    this._currentSortType = sortType;
  }


  _updateData(newFilm, updateType) {
    // console.log(updateType);
    this._filmsModel.updateFilms(newFilm, updateType);
  }


  _updateFilmCard(newFilm, updateType) {

    // console.log(updateType);

    switch (updateType) {


      case UpdateType.MINOR:
        this._filmCardPresenters[newFilm.id].updateFilmCard(newFilm);
        break;

      default:
        const filterType = this._filterModel.getFilter();
        this._films = filter[filterType](this._filmsModel.getFilms());

        this._filmsDefaultSort = this._films.slice();
        this._replaceSort(SortBy.DEFAULT);


        this._filmListView.getElement().innerHTML = ``;

        this._renderFilmList(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

        if (this._films.length > FILM_COUNT_PER_STEP) {
          this._buttonMoreView.removeClickHandler();
          this._renderShowMoreButton();
        }

    }


  }


  _renderNoFilms() {
    render(this._noFilmsView, this._filmContainerView, `beforeend`);
  }


  _renderFilmCard(film) {
    const filmCardPresenter = new FilmCardPresenter(this._mainElement, this._filmListView, this._updateData.bind(this));
    filmCardPresenter.init(film);
    filmCardPresenter.setClosePopup(this._closePopup.bind(this));
    this._filmCardPresenters[film.id] = filmCardPresenter;
  }


  _renderFilmList(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film));
    // console.log(this._filmCardPresenters);
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
    if (this._filmCountRender >= this._films.length) {
      this._buttonMoreView.getElement().remove();
      this._buttonMoreView.removeClickHandler();
    }
  }


}
