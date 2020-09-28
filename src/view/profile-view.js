import AbstractView from './abstract-view.js';
import {getProfileRank} from '../utils/common.js';

const createProfileMarkup = (film) => {
  let watched = 0;

  for (const value of film) {
    watched = value.isWatched ? watched + 1 : watched;
  }

  const profileRank = getProfileRank(watched);

  return `<section class="header__profile profile">
      <p class="profile__rating">${profileRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

export default class ProfileView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
  }

  getMarkup() {
    return createProfileMarkup(this._film);
  }
}
