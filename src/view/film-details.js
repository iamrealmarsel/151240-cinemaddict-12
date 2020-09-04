import AbstractView from './abstract.js';
import CommentsView from './comments.js';
import {render} from '../utils/render.js';
import {getRandomElement} from '../mock/film-card.js';
import {UpdateType} from '../const.js';

const AUTHORS = [`Tim Macoveev`, `John Doe`, `Gudini`];

const createFilmDetailsMarkup = (filmMocks) => {

  const {title, poster, description, comments, isFavorite, isWatched, isWatchlist, rate, duration, genres, releaseDate, director, writers, actors, country, age} = filmMocks;
  const dateRelease = releaseDate.toLocaleString(`ru-RU`, {month: `long`, year: `numeric`, day: `numeric`});

  const genresMarkUp =
     `<td class="film-details__term">Genre${genres.length > 1 ? `s` : ``}</td>
      <td class="film-details__cell">
      ${genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``)}
      </td>`;

  return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">
              <p class="film-details__age">${age}</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${title}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rate}</p>
                </div>
              </div>
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${dateRelease}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  ${genresMarkUp}
                </tr>
              </table>
              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">

            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`;
};


export default class FilmDetailsView extends AbstractView {

  constructor(filmMock) {
    super();
    this._filmMock = filmMock;
    this._callback = {};
    this._comment = {};
  }


  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._callback.click);
  }


  setClickWatchlistHandler(callback) {
    this._callback.clickWatchlist = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._onWatchlistClick.bind(this));
  }

  _onWatchlistClick() {
    event.preventDefault();
    this._callback.clickWatchlist(UpdateType.MINOR);
  }

  setClickHistoryHandler(callback) {
    this._callback.clickHistory = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._onHistoryClick.bind(this));
  }

  _onHistoryClick() {
    event.preventDefault();
    this._callback.clickHistory(UpdateType.MINOR);
  }

  setClickFavoriteHandler(callback) {
    this._callback.clickFavorite = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._onFavoriteClick.bind(this));
  }

  _onFavoriteClick() {
    event.preventDefault();
    this._callback.clickFavorite(UpdateType.MINOR);
  }


  setClickEmojiHandler() {
    this.getElement()
      .querySelectorAll(`.film-details__emoji-label`)
      .forEach((element) => {
        element.addEventListener(`click`, this._onEmojiClick.bind(this));
      });
  }

  _onEmojiClick() {
    const partsOfImagePath = event.target.tagName === `LABEL` ? event.target.querySelector(`img`).src.split(`/`) : event.target.src.split(`/`);
    this._comment.emoji = partsOfImagePath[partsOfImagePath.length - 1];
    this.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = `<img src="images/emoji/${this._comment.emoji}" width="55" height="55" alt="emoji">`;
  }

  setCommentDeleteHandler(callback) {
    this._callback.deleteComment = callback;
  }

  renderComments(comments) {
    this.getElement().querySelector(`.film-details__comments-list`).innerHTML = ``;
    comments.forEach((comment) => this._renderComment(comment));
  }

  _renderComment(comment) {
    const commentsView = new CommentsView(comment);
    commentsView.setCommentDeleteHandler(this._callback.deleteComment);
    render(commentsView, this.getElement().querySelector(`.film-details__comments-list`), `beforeend`);
  }


  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`.film-details__new-comment`).addEventListener(`keydown`, this._onFormSubmit.bind(this));
  }

  _onFormSubmit() {
    if (event.keyCode === 13 && event.metaKey) {
      this._comment.text = this.getElement().querySelector(`.film-details__comment-input`).value;
      if (this._comment.text === `` || this._comment.emoji === undefined) {
        return;
      }

      this._comment.date = Date.now();
      this._comment.author = getRandomElement(AUTHORS);
      this._callback.formSubmit(this._comment, UpdateType.MINOR);
    }
  }


  getMarkup() {
    return createFilmDetailsMarkup(this._filmMock);
  }

}


