// import {generateFilmCardMock} from './mock/film-card.js';

// import {FILM_COUNT, FILM_MOCKS} from './const.js';
import {UpdateType} from './const.js';

// import {render} from './utils/render.js';

// import ProfileView from './view/profile.js';
// import FooterStatsView from './view/footer-stat.js';

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
    console.log(films);
    filmsModel.setFilms(films, UpdateType.INIT);
  })
.catch(() => {
  // console.log(error);
  filmsModel.setFilms([], UpdateType.INIT);
});


// for (let i = 0; i < FILM_COUNT; i++) {
//   FILM_MOCKS.push(generateFilmCardMock());
// }


const filterModel = new FilterModel();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatElement = document.querySelector(`.footer__statistics`);

// render(new ProfileView(FILM_MOCKS), headerElement, `beforeend`);


new FilterPresenter(mainElement, filterModel, filmsModel).init();
new FilmBoardPresenter(headerElement, mainElement, footerStatElement, filmsModel, filterModel, api).init();
