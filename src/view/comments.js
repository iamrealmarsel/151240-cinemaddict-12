import AbstractView from './abstract.js';


const createCommentsMarkup = (comment) => {

  const {emoji, text, author, date} = comment;

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
    this._callback(this._comment);
  }


  getMarkup() {
    return createCommentsMarkup(this._comment);
  }
}

