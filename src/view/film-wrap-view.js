import AbstractView from './abstract-view.js';

const createFilmWrapMarkup = () => {
  return `
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`;
};

export default class FilmWrapView extends AbstractView {
  getMarkup() {
    return createFilmWrapMarkup();
  }
}
