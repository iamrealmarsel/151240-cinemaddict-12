import {createFilterMarkup} from './view/filter.js';
import {createButtonMoreMarkup} from './view/button-more.js';
import {createFilmCardMarkup} from './view/film-card.js';
import {createFilmContainerMarkup} from './view/film-container.js';
import {createFilmDetailsMarkup} from './view/film-details.js';
import {createFilmMostCommentedMarkup} from './view/film-most-commented.js';
import {createProfileMarkup} from './view/profile.js';
import {createFilmTopRatedMarkup} from './view/film-top-rated.js';
import {createFooterStatMarkup} from './view/footer-stat.js';
import {createSortMarkup} from './view/sort.js';
import {generateFilmCardMock} from './mock/film-card.js';


const FILM_COUNT = 22;
const FILM_COUNT_PER_STEP = 5;
const FILM_EXTRA_COUNT = 2;
const FILM_MOCKS = [];


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStat = footerElement.querySelector(`.footer__statistics`);


const renderDOM = (container, markup, place) => {
  container.insertAdjacentHTML(place, markup);
};


for (let i = 0; i < FILM_COUNT; i++) {
  FILM_MOCKS.push(generateFilmCardMock());
}


renderDOM(headerElement, createProfileMarkup(FILM_MOCKS), `beforeend`);
renderDOM(mainElement, createSortMarkup(), `beforeend`);
renderDOM(mainElement, createFilmContainerMarkup(), `beforeend`);

const filmContainer = mainElement.querySelector(`.films`);
const filmList = filmContainer.querySelector(`.films-list__container`);

renderDOM(mainElement, createFilterMarkup(FILM_MOCKS), `afterbegin`);
renderDOM(filmContainer, createFilmTopRatedMarkup(), `beforeend`);
renderDOM(filmContainer, createFilmMostCommentedMarkup(), `beforeend`);

const filmListExtra = filmContainer.querySelectorAll(`.films-list--extra`);
const filmListTopRated = filmListExtra[0].querySelector(`.films-list__container`);
const filmListMostcommented = filmListExtra[1].querySelector(`.films-list__container`);


for (let i = 0; i < Math.min(FILM_COUNT, FILM_COUNT_PER_STEP); i++) {
  renderDOM(filmList, createFilmCardMarkup(FILM_MOCKS[i]), `beforeend`);
}

for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
  renderDOM(filmListTopRated, createFilmCardMarkup(FILM_MOCKS[i]), `beforeend`);
}

for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
  renderDOM(filmListMostcommented, createFilmCardMarkup(FILM_MOCKS[i]), `beforeend`);
}

renderDOM(footerElement, createFilmDetailsMarkup(FILM_MOCKS[0]), `afterend`);
renderDOM(footerStat, createFooterStatMarkup(FILM_MOCKS), `beforeend`);


if (FILM_COUNT > FILM_COUNT_PER_STEP) {

  renderDOM(filmList, createButtonMoreMarkup(), `afterend`);

  const buttonMore = filmContainer.querySelector(`.films-list__show-more`);

  let filmCountRender = FILM_COUNT_PER_STEP;

  buttonMore.addEventListener(`click`, (event) => {
    event.preventDefault();

    FILM_MOCKS.slice(filmCountRender, filmCountRender + FILM_COUNT_PER_STEP).forEach((filmMock) =>
      renderDOM(filmList, createFilmCardMarkup(filmMock), `beforeend`));

    filmCountRender += FILM_COUNT_PER_STEP;

    if (filmCountRender >= FILM_COUNT) {
      buttonMore.remove();
    }

  });

}


