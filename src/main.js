import {createNavigationMarkup} from './view/navigation.js';
import {createButtonMoreMarkup} from './view/button-more.js';
import {createFilmCardMarkup} from './view/film-card.js';
import {createFilmContainerMarkup} from './view/film-container.js';
import {createFilmDetailsMarkup} from './view/film-details.js';
import {createFilmMostCommentedMarkup} from './view/film-most-commented.js';
import {createProfileMarkup} from './view/profile.js';
import {createFilmTopRatedMarkup} from './view/film-top-rated.js';
import {createFooterStatMarkup} from './view/footer-stat.js';
import {createSortMarkup} from './view/sort.js';


const FILM_COUNT = 5;
const FILM_EXTRA_COUNT = 2;


const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const footerStat = footerElement.querySelector('.footer__statistics');


const renderDOM = (container, markup, place) => {
  container.insertAdjacentHTML(place, markup);
}


renderDOM(headerElement, createProfileMarkup(), 'beforeend');
renderDOM(mainElement, createNavigationMarkup(), 'afterbegin');
renderDOM(mainElement, createSortMarkup(), 'beforeend');
renderDOM(mainElement, createFilmContainerMarkup(), 'beforeend');

const filmContainer = mainElement.querySelector('.films');
const filmList = filmContainer.querySelector('.films-list__container');

for (let i = 0; i < FILM_COUNT; i++) {
  renderDOM(filmList, createFilmCardMarkup(), 'beforeend');
}

renderDOM(filmList, createButtonMoreMarkup(), 'afterend');
renderDOM(filmContainer, createFilmTopRatedMarkup(), 'beforeend');
renderDOM(filmContainer, createFilmMostCommentedMarkup(), 'beforeend');

const filmListExtra = filmContainer.querySelectorAll('.films-list--extra');
const filmListTopRated = filmListExtra[0].querySelector('.films-list__container');
const filmListMostcommented = filmListExtra[1].querySelector('.films-list__container');

for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
  renderDOM(filmListTopRated, createFilmCardMarkup(), 'beforeend');
}

for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
  renderDOM(filmListMostcommented, createFilmCardMarkup(), 'beforeend');
}

renderDOM(footerStat, createFooterStatMarkup(), 'beforeend');
renderDOM(footerElement, createFilmDetailsMarkup(), 'afterend');
