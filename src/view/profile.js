import AbstractView from './abstract.js';


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


export default class ProfileView extends AbstractView {
  constructor(filmMocks) {
    super();
    this._filmMocks = filmMocks;
  }

  getMarkup() {
    return createProfileMarkup(this._filmMocks);
  }
}


