import AbstractView from './abstract-view.js';

const createNoFilmsMarkup = () => {
  return `
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`;
};

export default class NoFilmsView extends AbstractView {
  getMarkup() {
    return createNoFilmsMarkup();
  }
}
