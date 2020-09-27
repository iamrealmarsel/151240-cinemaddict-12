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
  let profileRank;

  if (watchedFilms === 0) {
    profileRank = ``;
  } else if (watchedFilms <= 10) {
    profileRank = `novice`;
  } else if (watchedFilms <= 20) {
    profileRank = `fun`;
  } else {
    profileRank = `movie buff`;
  }

  return profileRank;
};
