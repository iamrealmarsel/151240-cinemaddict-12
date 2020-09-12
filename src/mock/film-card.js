
const POSTERS = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];
const TITLES = [`The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`, `Santa Claus Conquers the Martians`, `Popeye the Sailor Meets Sindbad the Sailor`, `The Great Flamarion`, `Made for Each Other`];
const DIRECTOR = [`Anthony Mann`, `Anne Wigton`, `Heinz Herald`, `Richard Weil`, `Erich von Stroheim`];
const WRITES = [`Anne Wigton`, `Heinz Herald`, `Richard Weil`];
const ACTORS = [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`];
const COUNTRY = [`USA`, `Thailand`, `England`, `France`];
const AGE = [`6+`, `12+`, `16+`, `18+`];

// console.log(moment().format());
// console.log(new Date());

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const convertTotalMinutesToHoursMinutes = (totalMinutes) => {
  const minutes = totalMinutes % 60;
  const hours = (totalMinutes - minutes) / 60;
  return `${hours}h ${minutes}m`;
};

export const getRandomElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const getRandomDescription = () => {
  const DESCRIPTIONS = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];
  const randomDescriptions = [];
  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    randomDescriptions.push(DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)]);
  }
  return randomDescriptions.join(` `);
};


const generateRandomDate = () => {

  const DAYS_GAP = 365;
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() - getRandomInteger(0, DAYS_GAP));

  return randomDate;
};


const generateComments = () => {

  const EMOJI = [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`];
  const AUTHORS = [`Tim Macoveev`, `John Doe`];
  const TEXT = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];
  const randomComments = [];

  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    const emoji = getRandomElement(EMOJI);
    const date = generateRandomDate();
    const author = getRandomElement(AUTHORS);
    const text = getRandomElement(TEXT);
    const randomComment = {emoji, date, author, text};
    randomComments.push(randomComment);
  }

  return randomComments;
};


const getRandomGenres = () => {

  const GENRES = [`Drama`, `Film-Noir`, `Mystery`, `Horror`, `Comedy`, `Fantastic`, `Thriller`];
  const randomGenres = [];
  for (let i = 0; i < getRandomInteger(1, GENRES.length); i++) {
    randomGenres.push(GENRES[i]);
  }

  return randomGenres;
};


const getRandomReleaseDate = () => {

  const firstFilm = new Date(1950, 0).getTime();
  const lastFilm = new Date(2020, 0).getTime();
  const randomReleaseDate = new Date(getRandomInteger(firstFilm, lastFilm));

  return randomReleaseDate;
};

// console.log(getRandomReleaseDate());

let numberId = 0;
const generateId = () => (numberId += 1);


const generateFilmCardMock = () => {
  return {
    id: generateId(),
    title: getRandomElement(TITLES),
    poster: getRandomElement(POSTERS),
    description: getRandomDescription(),
    comments: generateComments(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    rate: getRandomInteger(0, 10),
    duration: convertTotalMinutesToHoursMinutes(getRandomInteger(5, 150)),
    director: getRandomElement(DIRECTOR),
    writers: WRITES.join(`, `),
    actors: ACTORS.join(`, `),
    country: getRandomElement(COUNTRY),
    genres: getRandomGenres(),
    releaseDate: getRandomReleaseDate(),
    age: getRandomElement(AGE),
  };
};


export {generateFilmCardMock};

