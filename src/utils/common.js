
export const convertTotalMinutesToHoursMinutes = (totalMinutes) => {
  const minutes = totalMinutes % 60;
  const hours = (totalMinutes - minutes) / 60;
  return `${hours}h ${minutes}m`;
};


export const generateComments = () => {

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


const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const generateRandomDate = () => {

  const DAYS_GAP = 365;
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() - getRandomInteger(0, DAYS_GAP));

  return randomDate;
};
