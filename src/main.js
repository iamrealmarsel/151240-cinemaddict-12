import {UpdateType} from './const.js';
import FilmBoardPresenter from './presenter/film-board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmsModel from './model/films-model.js';
import FilterModel from './model/filter-model.js';
import Api from './api.js';

const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;
const AUTHORIZATION = `Basic asdjh3$nsf7_mars`;
const api = new Api(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatElement = document.querySelector(`.footer__statistics`);

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films, UpdateType.INIT);
  })
  .catch(() => {
    filmsModel.setFilms([], UpdateType.INIT);
  });

new FilterPresenter(mainElement, filterModel, filmsModel).init();
new FilmBoardPresenter(headerElement, mainElement, footerStatElement, filmsModel, filterModel, api).init();
