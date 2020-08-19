import AbstractView from './abstract.js';


const createFooterStatsMarkup = (filmMocks) => {
  return `<p>${filmMocks.length} movies inside</p>`;
};


export default class FooterStatsView extends AbstractView {
  constructor(filmMocks) {
    super();
    this._filmMocks = filmMocks;
  }

  getMarkup() {
    return createFooterStatsMarkup(this._filmMocks);
  }

}


