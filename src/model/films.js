import Observer from './observer.js';


export default class FilmsModel extends Observer {

  constructor() {
    super();
    this._films = [];
  }

  getFilms() {
    return this._films;
  }

  setFilms(films) {
    this._films = films;
  }

  updateFilms(newFilm, updateType) {
    this._films.some((item, index) => {
      if (item.id === newFilm.id) {
        this._films[index] = newFilm;
        return true;
      }
      return false;
    });

    // console.log(updateType);

    this._notify(newFilm, updateType);
  }


}
