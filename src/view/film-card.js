

const createFilmCardMarkup = (filmMocks) => {

  const {title, poster, description, comments, isFavorite, isWatched, isWatchlist, rate, duration, releaseDate} = filmMocks;
  const controlActive = `film-card__controls-item--active`;

  const favorite = isFavorite ? controlActive : ``;
  const watched = isWatched ? controlActive : ``;
  const watchlist = isWatchlist ? controlActive : ``;
  const releaseYear = releaseDate.getFullYear();

  return `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rate}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">Cartoon</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watched}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favorite}">Mark as favorite</button>
      </form>
    </article>`;

};


export {createFilmCardMarkup};
