// import FilmsModel from './model/films.js';


export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }


  getFilms() {
    return this._load({url: `movies`})
      .then(Api.toJSON)
      .then(async (films) => {
        let adaptedFilms = [];
        for (let film of films) {
          let adaptedFilm = await this._adaptToClient(film)
          adaptedFilms.push(adaptedFilm);
        }
        return adaptedFilms;
      });
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


  _adaptToServer(film) {

    const commentIDs = film.comments.map((comment) => comment.id);

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
    )

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
        "comments": commentIDs,
      }
    )

    // console.log(adaptedFilm);

    return adaptedFilm;
  }


  _adaptToClient(film) {
    return this._getComments(film.id).then((comments) => {
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
          comments,
        }
      );
      delete adaptedFilm.total_rating;
      delete adaptedFilm.runtime;
      delete adaptedFilm.genre;
      delete adaptedFilm.age_rating;
      delete adaptedFilm.release;
      delete adaptedFilm.alternative_title;

    console.log(adaptedFilm);

      return adaptedFilm;
    });
  }


  _getComments(id) {
    return this._load({url: `comments/${id}`}).then(Api.toJSON);
  }


  _load({url, method = `GET`, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    return fetch(`${this._endPoint}/${url}`, {method, body, headers}).then(Api.checkStatus).catch(Api.catchError);
  }

  static checkStatus(response) {
    if (response.status < 200 || response.status > 299) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static catchError(error) {
    return error;
  }

  static toJSON(response) {
    return response.json();
  }


}
