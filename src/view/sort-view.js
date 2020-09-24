import AbstractView from './abstract-view.js';
import {SortBy} from '../const.js';

const sortActive = `sort__button--active`;

const createSortMarkup = (currentSortType) => {
  return `
    <ul class="sort">
      <li><a href="#" class="sort__button ${currentSortType === SortBy.DEFAULT ? sortActive : ``}"
        data-sort=${SortBy.DEFAULT}>Sort by default</a></li>
      <li><a href="#" class="sort__button ${currentSortType === SortBy.DATE ? sortActive : ``}"
        data-sort=${SortBy.DATE}>Sort by date</a></li>
      <li><a href="#" class="sort__button ${currentSortType === SortBy.RATING ? sortActive : ``}"
        data-sort=${SortBy.RATING}>Sort by rating</a></li>
    </ul>`;
};

export default class SortView extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
  }

  getMarkup() {
    return createSortMarkup(this._currentSortType);
  }

  setClickHandler(callback) {
    this.getElement().addEventListener(`click`, callback);
  }
}
