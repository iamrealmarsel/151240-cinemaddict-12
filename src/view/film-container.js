import AbstractView from './abstract.js';


const createFilmContainerMarkup = () => {
  return `
    <section class="films"></section>`;
};


export default class FilmContainerView extends AbstractView {
  getMarkup() {
    return createFilmContainerMarkup();
  }
}

