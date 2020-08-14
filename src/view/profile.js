import {createElement} from '../utils.js';

const createProfileMarkup = (filmMocks) => {

  let watched = 0;
  for (const value of filmMocks) {
    watched = value.isWatched ? watched + 1 : watched + 0;
  }

  let profileRating = ``;

  if (watched === 0) {
    profileRating = ``;
  } else if (watched <= 10) {
    profileRating = `novice`;
  } else if (watched <= 20) {
    profileRating = `fun`;
  } else {
    profileRating = `movie buff`;
  }


  return `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};


class Profile {
  constructor(filmMocks) {
    this._filmMocks = filmMocks;
    this._element = null;
  }

  getMarkup() {
    return createProfileMarkup(this._filmMocks);
  }

  getElement() {
    if (this._element === null) {
      this._element = createElement(this.getMarkup());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


export default Profile;
