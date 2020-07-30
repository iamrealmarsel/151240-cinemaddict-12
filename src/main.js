'use strict'


const renderDOM = (container, markup, place) => {
  container.insertAdjacentHTML(place, markup);
}


const createProfileMarkup = () => {
  return(`
    <section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
    `);
}

const createNavigationMarkup = () => {
  return(`
    <nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
    `);
}

const createSortMarkup = () => {
  return(`
    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>
    `);
}

const createFilmContainerMarkup = () => {
  return(`
    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
        </div>
      </section>
    </section>
    `);
}

const createFilmCardMarkup = () => {
  return(`
    <article class="film-card">
      <h3 class="film-card__title">Popeye the Sailor Meets Sindbad the Sailor</h3>
      <p class="film-card__rating">6.3</p>
      <p class="film-card__info">
        <span class="film-card__year">1936</span>
        <span class="film-card__duration">16m</span>
        <span class="film-card__genre">Cartoon</span>
      </p>
      <img src="./images/posters/popeye-meets-sinbad.png" alt="" class="film-card__poster">
      <p class="film-card__description">In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…</p>
      <a class="film-card__comments">0 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
      </form>
    </article>
    `);
}

const createMoreButtonMarkup = () => {
  return(`<button class="films-list__show-more">Show more</button>`);
}

const createFilmTopRatedMarkup = () => {
  return(`
    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
      </div>
    </section>
    `);
}

const createFilmMostcommentedMarkup = () => {
  return(`
    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
      </div>
    </section>
    `);
}

const createFooterStatMarkup = () => {
  return(`<p>130 291 movies inside</p>`);
}


const FILM_COUNT = 5;
const FILM_EXTRA_COUNT = 2;


const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const footerStat = footerElement.querySelector('.footer__statistics')


renderDOM(headerElement, createProfileMarkup(), 'beforeend');
renderDOM(mainElement, createNavigationMarkup(), 'afterbegin');
renderDOM(mainElement, createSortMarkup(), 'beforeend');
renderDOM(mainElement, createFilmContainerMarkup(), 'beforeend');


const filmContainer = mainElement.querySelector('.films');
const filmList = filmContainer.querySelector('.films-list__container');


for (let i = 0; i < FILM_COUNT; i++) {
  renderDOM(filmList, createFilmCardMarkup(), 'beforeend');
}

renderDOM(filmList, createMoreButtonMarkup(), 'afterend');
renderDOM(filmContainer, createFilmTopRatedMarkup(), 'beforeend');
renderDOM(filmContainer, createFilmMostcommentedMarkup(), 'beforeend');


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


