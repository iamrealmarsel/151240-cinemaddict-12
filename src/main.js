import {UpdateType} from './const.js';


import FilmBoardPresenter from './presenter/film-board.js';
import FilterPresenter from './presenter/filter.js';

import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';

import Api from './api.js';


const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;
const AUTHORIZATION = `Basic asdjh3$nsf7_mars`;

const api = new Api(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel();

api.getFilms()
  .then((films) => {
    // console.log(films);
    filmsModel.setFilms(films, UpdateType.INIT);
  })
  .catch((error) => {
    // console.log(`ошибка при получении`, error);
    filmsModel.setFilms([], UpdateType.INIT);
  });


const filterModel = new FilterModel();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatElement = document.querySelector(`.footer__statistics`);


new FilterPresenter(mainElement, filterModel, filmsModel).init();
new FilmBoardPresenter(headerElement, mainElement, footerStatElement, filmsModel, filterModel, api).init();
