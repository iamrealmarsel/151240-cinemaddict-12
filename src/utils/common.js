import {ProfileRank, WatchedFilmsCountBy} from '../const.js';

export const convertTotalMinutesToHoursMinutes = (totalMinutes) => {
  const minutes = totalMinutes % 60;
  const hours = (totalMinutes - minutes) / 60;

  return {hours, minutes};
};

export const deleteProperties = (object, ...properties) => {
  properties.forEach((prop) => {
    delete object[prop];
  });
};

export const getProfileRank = (watchedFilms) => {
  let profileRank = ``;

  if (watchedFilms >= WatchedFilmsCountBy.MOVIE_BUFF) {
    profileRank = ProfileRank.MOVIE_BUFF;
  } else if (watchedFilms >= WatchedFilmsCountBy.FUN) {
    profileRank = ProfileRank.FUN;
  } else if (watchedFilms >= WatchedFilmsCountBy.NOVICE) {
    profileRank = ProfileRank.NOVICE;
  }

  return profileRank;
};
