import AbstractView from './abstract.js';
import {SortBy} from '../const.js';


const createSortMarkup = () => {

  return `
    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort=${SortBy.DEFAULT}>Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort=${SortBy.DATE}>Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort=${SortBy.RATING}>Sort by rating</a></li>
    </ul>`;
};


export default class SortView extends AbstractView {
  constructor() {
    super();
  }

  getMarkup() {
    return createSortMarkup();
  }

  setClickHandler(callback) {
    this.getElement().addEventListener(`click`, callback);
  }

  setButtonActive(sortTypeClick) {
    this.getElement().querySelectorAll(`.sort__button`).forEach((element) => element.classList.remove(`sort__button--active`));
    this.getElement().querySelector(`.sort__button[data-sort=${sortTypeClick}]`).classList.add(`sort__button--active`);
  }
}
