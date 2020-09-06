import {FILM_COUNT, FILM_MOCKS} from './const.js';
import {generateFilmCardMock} from './mock/film-card.js';
import {render} from './utils/render.js';

import ProfileView from './view/profile.js';
import FooterStatsView from './view/footer-stat.js';

import FilmBoardPresenter from './presenter/film-board.js';
import FilterPresenter from './presenter/filter.js';

import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';


for (let i = 0; i < FILM_COUNT; i++) {
  FILM_MOCKS.push(generateFilmCardMock());
}

const filmsModel = new FilmsModel();
filmsModel.setFilms(FILM_MOCKS);

const filterModel = new FilterModel();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatElement = document.querySelector(`.footer__statistics`);

render(new ProfileView(FILM_MOCKS), headerElement, `beforeend`);
render(new FooterStatsView(FILM_MOCKS), footerStatElement, `beforeend`);


new FilterPresenter(mainElement, filterModel, filmsModel).init();
new FilmBoardPresenter(mainElement, filmsModel, filterModel).init();
