import {FILM_COUNT, FILM_MOCKS} from './const.js';
import {generateFilmCardMock} from './mock/film-card.js';
import {render} from './utils/render.js';

import FilterView from './view/filter.js';
import ProfileView from './view/profile.js';
import FooterStatsView from './view/footer-stat.js';

import FilmBoardPresenter from './presenter/film-board.js';


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatElement = document.querySelector(`.footer__statistics`);


for (let i = 0; i < FILM_COUNT; i++) {
  FILM_MOCKS.push(generateFilmCardMock());
}

// console.log(FILM_MOCKS);


render(new ProfileView(FILM_MOCKS), headerElement, `beforeend`);
render(new FilterView(FILM_MOCKS), mainElement, `afterbegin`);
render(new FooterStatsView(FILM_MOCKS), footerStatElement, `beforeend`);


new FilmBoardPresenter(mainElement, FILM_MOCKS).init();
