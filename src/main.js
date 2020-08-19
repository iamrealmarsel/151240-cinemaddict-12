import {FILM_COUNT, FILM_COUNT_PER_STEP, FILM_EXTRA_COUNT, FILM_MOCKS} from './const.js';
import {render} from './utils.js';
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


// создаем моковые данные
for (let i = 0; i < FILM_COUNT; i++) {
  FILM_MOCKS.push(generateFilmCardMock());
}


render(new ProfileView(FILM_MOCKS).getElement(), headerElement, `beforeend`);
render(new SortView().getElement(), mainElement, `beforeend`);
render(new FilmContainerView().getElement(), mainElement, `beforeend`);
render(new FilterView(FILM_MOCKS).getElement(), mainElement, `afterbegin`);
render(new FooterStatsView(FILM_MOCKS).getElement(), footerStat, `beforeend`);

const filmContainer = mainElement.querySelector(`.films`);
const filmList = filmContainer.querySelector(`.films-list__container`);


// описываем функцию по рендеру карточек фильмов
const renderFilmCards = (filmMock) => {
  const FilmCardComponent = new FilmCardView(filmMock);
  const FilmDetailsComponent = new FilmDetailsView(filmMock);
  const filmCardElement = FilmCardComponent.getElement();
  const filmDetailsElement = FilmDetailsComponent.getElement();

  const poster = filmCardElement.querySelector(`.film-card__poster`);
  const title = filmCardElement.querySelector(`.film-card__title`);
  const commentsLink = filmCardElement.querySelector(`.film-card__comments`);
  const closeButton = filmDetailsElement.querySelector(`.film-details__close-btn`);

  poster.addEventListener(`click`, () => {
    render(filmDetailsElement, footerElement, `afterend`);
  });

  title.addEventListener(`click`, () => {
    render(filmDetailsElement, footerElement, `afterend`);
  });

  commentsLink.addEventListener(`click`, (event) => {
    event.preventDefault();
    render(filmDetailsElement, footerElement, `afterend`);
  });

  closeButton.addEventListener(`click`, (event) => {
    event.preventDefault();
    FilmDetailsComponent.removeElement();
    filmDetailsElement.remove();
  });

  render(filmCardElement, filmList, `beforeend`);
};


// рендерим карточки фильмов
FILM_MOCKS
  .slice(0, Math.min(FILM_COUNT, FILM_COUNT_PER_STEP))
  .forEach((filmMock) => renderFilmCards(filmMock));


// описываем поведение кнопки Show More
if (FILM_COUNT > FILM_COUNT_PER_STEP) {

  const buttonMoreElement = new ButtonMoreView().getElement();
  render(buttonMoreElement, filmList, `afterend`);

  let filmCountRender = FILM_COUNT_PER_STEP;

  buttonMoreElement.addEventListener(`click`, (event) => {
    event.preventDefault();

    FILM_MOCKS
      .slice(filmCountRender, filmCountRender + FILM_COUNT_PER_STEP)
      .forEach((filmMock) => renderFilmCards(filmMock));

    filmCountRender += FILM_COUNT_PER_STEP;

    if (filmCountRender >= FILM_COUNT) {
      buttonMoreElement.remove();
    }

  });

}


// показ дополнительных карточек пока полноценно не реализован,
// так как задача необязательная, буду доделывать по мере свободного времени

render(new FilmContainerTopRatedView().getElement(), filmContainer, `beforeend`);
render(new FilmContainerMostCommentedView().getElement(), filmContainer, `beforeend`);

const filmListExtra = filmContainer.querySelectorAll(`.films-list--extra`);
const filmListTopRated = filmListExtra[0].querySelector(`.films-list__container`);
const filmListMostcommented = filmListExtra[1].querySelector(`.films-list__container`);

FILM_MOCKS
  .slice(0, FILM_EXTRA_COUNT)
  .forEach((filmMock) => render(new FilmCardView(filmMock).getElement(), filmListTopRated, `beforeend`));

FILM_MOCKS
  .slice(0, FILM_EXTRA_COUNT)
  .forEach((filmMock) => render(new FilmCardView(filmMock).getElement(), filmListMostcommented, `beforeend`));

