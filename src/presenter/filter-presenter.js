import {render, RenderPosition} from '../utils/render.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  constructor(mainElement, filterModel, filmsModel) {
    this._mainElement = mainElement;
    this._filterModel = filterModel;
    this._filterModel.addObserver(this._updateFilter.bind(this));
    this._filmsModel = filmsModel;
    this._filmsModel.addObserver(this._updateFilter.bind(this));
  }

  init() {
    this._filterType = this._filterModel.getFilter();
    this._filterView = new FilterView(this._filmsModel.getFilms(), this._filterType);
    this._filterView.setFilterClickHandler(this._onFilterClick.bind(this));

    if (!this._previousFilterView) {
      render(this._filterView, this._mainElement, RenderPosition.AFTERBEGIN);
    } else {
      this._previousFilterView.getElement().replaceWith(this._filterView.getElement());
    }

    this._previousFilterView = this._filterView;
  }

  _updateFilter() {
    this.init();
  }

  _onFilterClick(filterType) {
    this._filterModel.setFilter(filterType);
  }
}
