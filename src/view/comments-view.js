import AbstractView from './abstract-view.js';
import moment from "moment";
import {UpdateType, ActionType, SHAKE_ANIMATION_TIMEOUT} from '../const.js';
import he from "he";

const createCommentsMarkup = (commentary) => {

  let {emotion, comment, author, date} = commentary;
  date = moment(date).fromNow();
  comment = he.encode(comment);

  return `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;

};


export default class CommentsView extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;
  }


  setCommentDeleteHandler(callback) {
    this._callback = callback;
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, this._onDeleteCommentClick.bind(this));
  }

  _onDeleteCommentClick(event) {
    event.preventDefault();
    this._blockElement();
    this._callback(this._comment, UpdateType.MINOR, ActionType.DELETE_COMMENT);
  }


  _blockElement() {
    this.getElement().querySelector(`.film-details__comment-delete`).disabled = true;
    this.getElement().querySelector(`.film-details__comment-delete`).textContent = `Deleting...`;
  }

  unblockElement() {
    this._errorShake();
    this.getElement().querySelector(`.film-details__comment-delete`).disabled = false;
    this.getElement().querySelector(`.film-details__comment-delete`).textContent = `Delete`;
  }

  _errorShake() {
    this.getElement().classList.add(`shake`);
    setTimeout(() => {
      this.getElement().classList.remove(`shake`);
    }, SHAKE_ANIMATION_TIMEOUT);
  }


  getMarkup() {
    return createCommentsMarkup(this._comment);
  }
}

