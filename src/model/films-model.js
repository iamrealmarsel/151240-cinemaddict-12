import Observer from './observer.js';

export default class FilmsModel extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  getFilms() {
    return this._films;
  }

  setFilms(films, updateType) {
    this._films = films.slice();
    this._notify(null, updateType);
  }

  updateFilms(newFilm, updateType) {
    this._films.some((item, index) => {
      if (item.id === newFilm.id) {
        this._films[index] = newFilm;

        return true;
      }

      return false;
    });

    this._notify(newFilm, updateType);
  }

  deleteComment(comment, updateType) {
    this._films.forEach((film) => {
      if (film.comments.includes(comment.id)) {
        const index = film.comments.indexOf(comment.id);
        film.comments.splice(index, 1);
        this._notify(film, updateType);
      }
    });
  }
}
