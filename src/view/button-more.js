import AbstractView from './abstract.js';


const createButtonMoreMarkup = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};


export default class ButtonMoreView extends AbstractView {
  getMarkup() {
    return createButtonMoreMarkup();
  }
}
