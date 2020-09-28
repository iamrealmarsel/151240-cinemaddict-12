import moment from 'moment';
import {FILM_COUNT_PER_STEP, SortBy, UpdateType, ActionType, FilterType, StatisticPeriod} from '../const.js';
import {render, RenderPosition} from '../utils/render.js';
import {filter} from '../utils/filter.js';
import {getProfileRank} from '../utils/common.js';
import FilmContainerView from '../view/film-container-view.js';
import FilmWrapView from '../view/film-wrap-view.js';
import NoFilmsView from '../view/no-films-view.js';
import FilmListView from '../view/film-list-view.js';
import ButtonMoreView from '../view/button-more-view.js';
import SortView from '../view/sort-view.js';
import LoadingView from '../view/loading-view.js';
import FooterStatsView from '../view/footer-stat-view.js';
import ProfileView from '../view/profile-view.js';
import StatisticView from '../view/statistic-view.js';
import FilmCardPresenter from './film-card-presenter.js';

const TimeInterval = {
  DAY: `day`,
  WEEKS: `weeks`,
  MONTHS: `months`,
  YEARS: `years`,
};

export default class FilmBoardPresenter {
  constructor(headerElement, mainElement, footerStatElement, filmsModel, filterModel, api) {
    this._filmCardPresenters = {};
    this._mainElement = mainElement;
    this._footerStatElement = footerStatElement;
    this._headerElement = headerElement;
    this._isLoading = true;
    this._api = api;
    this._noFilmsView = new NoFilmsView();
    this._filmContainerView = new FilmContainerView();
    this._buttonMoreView = new ButtonMoreView();
    this._filmListView = new FilmListView();
    this._filmWrapView = new FilmWrapView();
    this._loadingView = new LoadingView();
    this._filmsModel = filmsModel;
    this._filmsModel.addObserver(this._updateFilmCard.bind(this));
    this._filterModel = filterModel;
    this._filterModel.addObserver(this._updateFilmCard.bind(this));
    this._currentSortType = SortBy.DEFAULT;
  }

  init() {
    this._sortView = new SortView(this._currentSortType);

    this._sortView.setClickHandler(this._onSortClick.bind(this));
    render(this._sortView, this._mainElement, RenderPosition.BEFOREEND);
    render(this._filmContainerView, this._mainElement, RenderPosition.BEFOREEND);

    if (this._isLoading) {
      this._renderLoading();

      return;
    }

    if (this._films.length === 0) {
      this._renderNoFilms();

      return;
    }
  }

  _replaceSort(sortType) {
    this._previousSortView = this._sortView;
    this._sortView = new SortView(sortType);
    this._sortView.setClickHandler(this._onSortClick.bind(this));
    this._previousSortView.getElement().replaceWith(this._sortView.getElement());
    this._currentSortType = sortType;
  }

  _updateStatistic(period) {
    let watchedFilms = this._filmsModel.getFilms().filter((film) => film.isWatched);
    const profileRank = getProfileRank(watchedFilms.length);

    switch (period) {
      case StatisticPeriod.TODAY:
        watchedFilms = this._filterPeriod(watchedFilms, TimeInterval.DAY);
        break;
      case StatisticPeriod.WEEK:
        watchedFilms = this._filterPeriod(watchedFilms, TimeInterval.WEEKS);
        break;
      case StatisticPeriod.MONTH:
        watchedFilms = this._filterPeriod(watchedFilms, TimeInterval.MONTHS);
        break;
      case StatisticPeriod.YEAR:
        watchedFilms = this._filterPeriod(watchedFilms, TimeInterval.YEARS);
        break;
    }

    const {uniqGenres, topGenre, filmsByGenresCounts} = this._getStatisticByGenres(watchedFilms);

    this._statisticView.getElement().remove();
    this._statisticView = new StatisticView(
        period, uniqGenres, filmsByGenresCounts, watchedFilms, topGenre, profileRank
    );
    render(this._statisticView, this._mainElement, RenderPosition.BEFOREEND);
    this._statisticView.renderChart();
    this._statisticView.setClickPeriodHandler(this._updateStatistic.bind(this));
  }

  _filterPeriod(watchedFilms, period) {
    if (period === TimeInterval.DAY) {
      watchedFilms = watchedFilms
        .filter((film) => moment(film.watchingDate)
        .isSame(moment(), TimeInterval.DAY));
    } else {
      watchedFilms = watchedFilms
        .filter((film) => moment(film.watchingDate)
        .isBetween(moment().subtract(1, period), moment(), TimeInterval.DAY, `[]`));
    }

    return watchedFilms;
  }

  _getStatisticByGenres(watchedFilms) {
    const countFilmsGenres = new Map();
    let uniqGenres = new Set();

    watchedFilms.forEach((film) => {
      uniqGenres.add(...film.genres);
    });
    uniqGenres.delete(undefined);
    uniqGenres = [...uniqGenres];

    const filmsByGenresCounts = uniqGenres.map((genre) => {
      const count = watchedFilms.filter((film) => film.genres.includes(genre)).length;
      countFilmsGenres.set(count, genre);

      return count;
    });

    const maxCountGenre = Math.max(...filmsByGenresCounts);
    const topGenre = countFilmsGenres.get(maxCountGenre);

    return {uniqGenres, topGenre, filmsByGenresCounts};
  }

  _updateData(newData, updateType, actionType) {
    switch (actionType) {
      case ActionType.ADD_COMMENT:
        this._api.addComment(newData)
          .then((response) => {
            this._filmsModel.updateFilms(response, updateType);
          })
          .catch(() => {
            this._filmCardPresenters[newData.id].abort(actionType);
          });
        break;
      case ActionType.DELETE_COMMENT:
        this._api.deleteComment(newData)
          .then(() => {
            this._filmsModel.deleteComment(newData, updateType);
          })
        .catch(() => {
          this._films.forEach((film) => {
            if (film.comments.includes(newData.id)) {
              this._filmCardPresenters[film.id].abort(actionType, newData);

              return;
            }
          });
        });
        break;
      default:
        this._api.updateFilms(newData).then((response) => {
          this._filmsModel.updateFilms(response, updateType);
        });
    }
  }

  _updateFilmCard(newFilm, updateType) {
    switch (updateType) {
      case UpdateType.INIT:
        this._updateInitFilmCard();
        break;
      case UpdateType.MINOR:
        this._updateMinorFilmCard(newFilm);
        break;
      default:
        this._updateMajorFilmCard();
    }
  }

  _updateInitFilmCard() {
    this._films = this._filmsModel.getFilms();
    this._isLoading = false;
    this._loadingView.getElement().remove();
    this._filmsDefaultSort = this._films.slice();
    render(this._filmWrapView, this._filmContainerView, RenderPosition.BEFOREEND);
    render(this._filmListView, this._filmWrapView, RenderPosition.BEFOREEND);
    this._renderFilmList(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }

    this._footerStatsView = new FooterStatsView(this._films);
    render(this._footerStatsView, this._footerStatElement, RenderPosition.BEFOREEND);
    this._profileView = new ProfileView(this._films);
    render(this._profileView, this._headerElement, RenderPosition.BEFOREEND);
  }

  _updateMinorFilmCard(newFilm) {
    this._filmCardPresenters[newFilm.id].updateFilmCard(newFilm);
    this._profileView.getElement().remove();
    this._profileView = new ProfileView(this._filmsModel.getFilms());
    render(this._profileView, this._headerElement, RenderPosition.BEFOREEND);
  }

  _updateMajorFilmCard() {
    const filterType = this._filterModel.getFilter();

    if (filterType === FilterType.STATISTIC) {
      this._filmContainerView.getElement().remove();
      this._sortView.getElement().remove();
      const watchedFilms = this._filmsModel.getFilms().filter((film) => film.isWatched);
      const profileRank = getProfileRank(watchedFilms.length);
      const {uniqGenres, topGenre, filmsByGenresCounts} = this._getStatisticByGenres(watchedFilms);

      if (this._statisticView) {
        this._statisticView.getElement().remove();
      }

      this._statisticView = new StatisticView(
          StatisticPeriod.ALLTIME, uniqGenres, filmsByGenresCounts, watchedFilms, topGenre, profileRank
      );
      render(this._statisticView, this._mainElement, RenderPosition.BEFOREEND);
      this._statisticView.renderChart();
      this._statisticView.setClickPeriodHandler(this._updateStatistic.bind(this));

      return;
    }

    if (this._statisticView) {
      this._statisticView.getElement().remove();
    }

    render(this._sortView, this._mainElement, RenderPosition.BEFOREEND);
    render(this._filmContainerView, this._mainElement, RenderPosition.BEFOREEND);

    this._films = filter[filterType](this._filmsModel.getFilms());
    this._filmsDefaultSort = this._films.slice();
    this._replaceSort(SortBy.DEFAULT);
    this._filmListView.getElement().innerHTML = ``;
    this._renderFilmList(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));
    this._profileView.getElement().remove();
    this._profileView = new ProfileView(this._filmsModel.getFilms());
    render(this._profileView, this._headerElement, RenderPosition.BEFOREEND);

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._buttonMoreView.removeClickHandler();
      this._renderShowMoreButton();
    } else {
      this._buttonMoreView.removeClickHandler();
      this._buttonMoreView.getElement().remove();
    }
  }

  _renderLoading() {
    render(this._loadingView, this._filmContainerView, RenderPosition.BEFOREEND);
  }

  _renderNoFilms() {
    render(this._noFilmsView, this._filmContainerView, RenderPosition.BEFOREEND);
  }

  _renderFilmCard(film) {
    const filmCardPresenter = new FilmCardPresenter(
        this._mainElement, this._filmListView, this._updateData.bind(this), this._api
    );
    filmCardPresenter.init(film);
    filmCardPresenter.setClosePopup(this._handleClosePopup.bind(this));
    this._filmCardPresenters[film.id] = filmCardPresenter;
  }

  _renderFilmList(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film));
  }

  _renderShowMoreButton() {
    this._filmCountRender = FILM_COUNT_PER_STEP;
    render(this._buttonMoreView, this._filmListView, RenderPosition.AFTEREND);
    this._buttonMoreView.setClickHandler(this._onShowMoreButtonClick.bind(this));
  }

  _handleClosePopup() {
    Object.values(this._filmCardPresenters).forEach((filmCardPresenter) => filmCardPresenter.closePopup());
  }

  _onSortClick(event) {
    event.preventDefault();
    const sortTypeClick = event.target.dataset.sort;

    if (event.target.tagName === `A` && sortTypeClick !== this._currentSortType) {
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

      this._renderFilmList(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

      if (this._films.length > FILM_COUNT_PER_STEP && !this._buttonMoreView.hasDomElement()) {
        this._renderShowMoreButton();
      }

      this._replaceSort(sortTypeClick);
    }
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
