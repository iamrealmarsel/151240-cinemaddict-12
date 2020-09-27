const ProfileRank = {
  NOVICE: `novice`,
  FUN: `fun`,
  MOVIE_BUFF: `movie buff`,
};

const WatchedFilmsCountBy = {
  NOVICE: 1,
  FUN: 11,
  MOVIE_BUFF: 21,
};

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
