// import FilmsModel from './model/films.js';


export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }


  getFilms() {
    return this._load({
      url: `movies`,
      method: `GET`,
    })
    .then(Api.toJSON)
    .then(this._adaptToClient.bind(this));
  }


  updateFilms(film) {
    return this._load({
      url: `movies/${film.id}`,
      method: `PUT`,
      body: JSON.stringify(this._adaptToServer(film)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(this._adaptToClient.bind(this));
  }


  addComment(film) {
    return this._load({
      url: `comments/${film.id}`,
      method: `POST`,
      body: JSON.stringify(this._adaptCommentsToServer(film.comments)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(this._adaptCommentsToClient.bind(this));
  }


  deleteComment(comment) {
    return this._load({
      url: `comments/${comment.id}`,
      method: `DELETE`
    });
  }


  _adaptCommentsToServer(comments) {
    const comment = comments.pop();
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          "date": new Date(comment.date).toISOString()
        }
    );

    return adaptedComment;
  }

  _adaptCommentsToClient(response) {

    const film = response.movie;

    const adaptedFilm = Object.assign(
        {},
        film.film_info,
        {
          id: film.id,
          rate: film.film_info.total_rating,
          duration: film.film_info.runtime,
          releaseDate: new Date(film.film_info.release.date),
          country: film.film_info.release.release_country,
          genres: film.film_info.genre,
          age: film.film_info.age_rating,
          alternativeTitle: film.film_info.alternative_title,
          isFavorite: film.user_details.favorite,
          isWatched: film.user_details.already_watched,
          isWatchlist: film.user_details.watchlist,
          watchingDate: new Date(film.user_details.watching_date),
          comments: film.comments
        }
    );

    delete adaptedFilm.total_rating;
    delete adaptedFilm.runtime;
    delete adaptedFilm.genre;
    delete adaptedFilm.age_rating;
    delete adaptedFilm.release;
    delete adaptedFilm.alternative_title;

    return adaptedFilm;
  }


  _adaptToClient(films) {

    // console.log(films);

    if (films instanceof Array) {
      let adaptedFilms = [];

      films.forEach((film) => {

        const adaptedFilm = Object.assign(
            {},
            film.film_info,
            {
              id: film.id,
              rate: film.film_info.total_rating,
              duration: film.film_info.runtime,
              releaseDate: new Date(film.film_info.release.date),
              country: film.film_info.release.release_country,
              genres: film.film_info.genre,
              age: film.film_info.age_rating,
              alternativeTitle: film.film_info.alternative_title,
              isFavorite: film.user_details.favorite,
              isWatched: film.user_details.already_watched,
              isWatchlist: film.user_details.watchlist,
              watchingDate: new Date(film.user_details.watching_date),
              comments: film.comments
            }
        );

        delete adaptedFilm.total_rating;
        delete adaptedFilm.runtime;
        delete adaptedFilm.genre;
        delete adaptedFilm.age_rating;
        delete adaptedFilm.release;
        delete adaptedFilm.alternative_title;

        adaptedFilms.push(adaptedFilm);

      });

      return adaptedFilms;

    } else {

      const adaptedFilm = Object.assign(
          {},
          films.film_info,
          {
            id: films.id,
            rate: films.film_info.total_rating,
            duration: films.film_info.runtime,
            releaseDate: new Date(films.film_info.release.date),
            country: films.film_info.release.release_country,
            genres: films.film_info.genre,
            age: films.film_info.age_rating,
            alternativeTitle: films.film_info.alternative_title,
            isFavorite: films.user_details.favorite,
            isWatched: films.user_details.already_watched,
            isWatchlist: films.user_details.watchlist,
            watchingDate: new Date(films.user_details.watching_date),
            comments: films.comments
          }
      );

      delete adaptedFilm.total_rating;
      delete adaptedFilm.runtime;
      delete adaptedFilm.genre;
      delete adaptedFilm.age_rating;
      delete adaptedFilm.release;
      delete adaptedFilm.alternative_title;

      return adaptedFilm;

    }

  }


  _adaptToServer(film) {

    // const commentIDs = film.comments.map((comment) => comment.id);

    const filmInfo = Object.assign(
        {},
        film,
        {
          "alternative_title": film.alternativeTitle,
          "total_rating": film.rate,
          "runtime": film.duration,
          "genre": film.genres,
          "age_rating": film.age,
          "release": {
            "date": film.releaseDate.toISOString(),
            "release_country": film.country,
          },
        }
    );

    delete filmInfo.alternativeTitle;
    delete filmInfo.rate;
    delete filmInfo.duration;
    delete filmInfo.genres;
    delete filmInfo.age;
    delete filmInfo.releaseDate;
    delete filmInfo.country;
    delete filmInfo.isFavorite;
    delete filmInfo.isWatchlist;
    delete filmInfo.isWatched;
    delete filmInfo.watchingDate;
    delete filmInfo.id;
    delete filmInfo.comments;

    const adaptedFilm = Object.assign(
        {},
        {
          "id": film.id,
          "film_info": filmInfo,
          "user_details": {
            "watchlist": film.isWatchlist,
            "already_watched": film.isWatched,
            "watching_date": film.watchingDate.toISOString(),
            "favorite": film.isFavorite
          },
          "comments": film.comments,
        }
    );

    // console.log(adaptedFilm);

    return adaptedFilm;
  }


  getComments(id) {
    // console.log(this);
    return this._load({url: `comments/${id}`, method: `GET`}).then(Api.toJSON);
  }


  _load({url, method, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (response.status < 200 || response.status > 299) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static catchError(error) {
    // console.log(`ошибка catchError`, error);
    throw error;
  }

  static toJSON(response) {
    return response.json();
  }


}
