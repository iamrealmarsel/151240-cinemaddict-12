import {FilterType} from '../const.js';
import Observer from './observer.js';

export default class FilterModel extends Observer {
  constructor() {
    super();
    this._filter = FilterType.All;
  }

  getFilter() {
    return this._filter;
  }

  setFilter(filter) {
    this._filter = filter;
    this._notify();
  }
}
