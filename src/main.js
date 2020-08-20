import {FILM_COUNT, FILM_COUNT_PER_STEP, FILM_EXTRA_COUNT, FILM_MOCKS} from './const.js';
import {render} from './utils/render.js';
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
import NoFilmsView from './view/no-films.js';


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStat = footerElement.querySelector(`.footer__statistics`);


// создаем моковые данные
for (let i = 0; i < FILM_COUNT; i++) {
  FILM_MOCKS.push(generateFilmCardMock());
}


// render(new ProfileView(FILM_MOCKS), headerElement, `beforeend`);
render(new FilterView(FILM_MOCKS), mainElement, `afterbegin`);
render(new SortView(), mainElement, `beforeend`);
render(new FooterStatsView(FILM_MOCKS), footerStat, `beforeend`);


// взависимости от того есть ли фильмы или нет, меняется верстка
if (FILM_MOCKS.length === 0) {

  render(new NoFilmsView().getElement(), mainElement, `beforeend`);

} else {

  render(new FilmContainerView().getElement(), mainElement, `beforeend`);
  const filmContainer = mainElement.querySelector(`.films`);
  const filmList = filmContainer.querySelector(`.films-list__container`);


  // описываем функцию по рендеру карточек фильмов
  const renderFilmCards = (filmMock) => {
    const filmCardComponent = new FilmCardView(filmMock);
    const filmDetailsComponent = new FilmDetailsView(filmMock);

    const onEscapeDown = (event) => {
      if (event.key === `Escape` || event.key === `Esc`) {
        event.preventDefault();
        filmDetailsComponent.getElement().remove();
        filmDetailsComponent.removeElement();
        document.removeEventListener(`keydown`, onEscapeDown);
      }
    };


    filmDetailsComponent.setCloseHandler((event) => {
      event.preventDefault();
      filmDetailsComponent.getElement().remove();
      filmDetailsComponent.removeElement();
      document.removeEventListener(`keydown`, onEscapeDown);
    })


    filmCardComponent.setClickHandler((event) => {
      event.preventDefault();
      render(filmDetailsComponent.getElement(), footerElement, `afterend`);
      document.addEventListener(`keydown`, onEscapeDown);
    });


    render(filmCardComponent.getElement(), filmList, `beforeend`);
  };


  // рендерим карточки фильмов
  FILM_MOCKS
    .slice(0, Math.min(FILM_COUNT, FILM_COUNT_PER_STEP))
    .forEach((filmMock) => renderFilmCards(filmMock));


  // описываем поведение кнопки Show More
  if (FILM_COUNT > FILM_COUNT_PER_STEP) {

    const buttonMoreComponent = new ButtonMoreView();
    render(buttonMoreComponent.getElement(), filmList, `afterend`);

    let filmCountRender = FILM_COUNT_PER_STEP;

    buttonMoreComponent.setClickHandler((event) => {
      event.preventDefault();

      FILM_MOCKS
        .slice(filmCountRender, filmCountRender + FILM_COUNT_PER_STEP)
        .forEach((filmMock) => renderFilmCards(filmMock));

      filmCountRender += FILM_COUNT_PER_STEP;

      if (filmCountRender >= FILM_COUNT) {
        buttonMoreComponent.getElement().remove();
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


}


