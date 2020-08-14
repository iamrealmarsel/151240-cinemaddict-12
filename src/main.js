import {FILM_COUNT, FILM_COUNT_PER_STEP, FILM_EXTRA_COUNT, FILM_MOCKS} from './const.js';
import {renderDOM, render} from './utils.js';
import {generateFilmCardMock} from './mock/film-card.js';
import FilterView from './view/filter.js';
import ButtonMoreView from './view/button-more.js';
import FilmCardView from './view/film-card.js';
import FilmContainerView from './view/film-container.js';
import FilmDetailsView from './view/film-details.js';
import FilmContainerMostCommentedView from './view/film-most-commented.js';
import ProfileView from './view/profile.js';
import FilmContainerTopRatedView from './view/film-top-rated.js';
import FooterStatsView from './view/footer-stat.js';
import SortView from './view/sort.js';


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStat = footerElement.querySelector(`.footer__statistics`);


for (let i = 0; i < FILM_COUNT; i++) {
  FILM_MOCKS.push(generateFilmCardMock());
}


renderDOM(new ProfileView(FILM_MOCKS).getElement(), headerElement, `beforeend`);
render(new SortView().getElement(), mainElement, `beforeend`);
render(new FilmContainerView().getElement(), mainElement, `beforeend`);

const filmContainer = mainElement.querySelector(`.films`);
const filmList = filmContainer.querySelector(`.films-list__container`);

render(new FilterView(FILM_MOCKS).getElement(), mainElement, `afterbegin`);
render(new FilmContainerTopRatedView().getElement(), filmContainer, `beforeend`);
render(new FilmContainerMostCommentedView().getElement(), filmContainer, `beforeend`);

const filmListExtra = filmContainer.querySelectorAll(`.films-list--extra`);
const filmListTopRated = filmListExtra[0].querySelector(`.films-list__container`);
const filmListMostcommented = filmListExtra[1].querySelector(`.films-list__container`);


for (let i = 0; i < Math.min(FILM_COUNT, FILM_COUNT_PER_STEP); i++) {
  render(new FilmCardView(FILM_MOCKS[i]).getElement(), filmList, `beforeend`);
}


for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
  render(new FilmCardView(FILM_MOCKS[i]).getElement(), filmListTopRated, `beforeend`);
}

for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
  render(new FilmCardView(FILM_MOCKS[i]).getElement(), filmListMostcommented, `beforeend`);
}


// render(new FilmDetailsView(FILM_MOCKS[0]).getElement(), footerElement, `afterend`);
render(new FooterStatsView(FILM_MOCKS).getElement(), footerStat, `beforeend`);


if (FILM_COUNT > FILM_COUNT_PER_STEP) {

  const buttonMoreComponent = new ButtonMoreView();
  render(buttonMoreComponent.getElement(), filmList, `afterend`);
  let filmCountRender = FILM_COUNT_PER_STEP;

  buttonMoreComponent.getElement().addEventListener(`click`, (event) => {
    event.preventDefault();

    FILM_MOCKS.slice(filmCountRender, filmCountRender + FILM_COUNT_PER_STEP).forEach((filmMock) =>
      render(new FilmCardView(filmMock).getElement(), filmList, `beforeend`));

    filmCountRender += FILM_COUNT_PER_STEP;

    if (filmCountRender >= FILM_COUNT) {
      buttonMoreComponent.getElement().remove();
    }

  });

}


