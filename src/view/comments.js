import AbstractView from './abstract.js';
import moment from "moment";
import {UpdateType} from '../const.js';
import he from "he";

const createCommentsMarkup = (comment) => {

  let {emoji, text, author, date} = comment;
  date = moment(date).fromNow();
  text = he.encode(text);

  return `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
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

  _onDeleteCommentClick() {
    event.preventDefault();
    this._callback(this._comment, UpdateType.MINOR);
  }


  getMarkup() {
    return createCommentsMarkup(this._comment);
  }
}

