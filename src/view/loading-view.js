import AbstractView from './abstract-view.js';

const createLoadingMarkup = () => {
  return `
    <section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>`;
};

export default class LoadingView extends AbstractView {
  getMarkup() {
    return createLoadingMarkup();
  }
}
