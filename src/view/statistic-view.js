import {convertTotalMinutesToHoursMinutes} from '../utils/common.js';
import AbstractView from './abstract-view.js';
import {StatisticPeriod} from '../const.js';
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const BAR_HEIGHT = 50;

function renderChart(statisticCtx, uniqGenres, filmsByGenresCounts) {
  statisticCtx.height = BAR_HEIGHT * uniqGenres.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqGenres,
      datasets: [{
        data: filmsByGenresCounts,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });

}

const createStatisticMarkup = (period, watchedFilms, topGenre, profileRating) => {
  let totalDuration = watchedFilms.reduce((sum, film) => film.duration + sum, 0);
  totalDuration = convertTotalMinutesToHoursMinutes(totalDuration);
  topGenre = topGenre === undefined ? `` : topGenre;

  return `
  <section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${profileRating}</span>
    </p>
    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter"
        id="statistic-all-time" value="${StatisticPeriod.ALLTIME}"
        ${StatisticPeriod.ALLTIME === period ? `checked` : ``}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter"
        id="statistic-today" value="${StatisticPeriod.TODAY}" ${StatisticPeriod.TODAY === period ? `checked` : ``}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter"
        id="statistic-week" value="${StatisticPeriod.WEEK}" ${StatisticPeriod.WEEK === period ? `checked` : ``}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter"
        id="statistic-month" value="${StatisticPeriod.MONTH}" ${StatisticPeriod.MONTH === period ? `checked` : ``}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter"
        id="statistic-year" value="${StatisticPeriod.YEAR}" ${StatisticPeriod.YEAR === period ? `checked` : ``}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>
    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedFilms.length} <span class="statistic__item-description">
          movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${totalDuration.hours} <span class="statistic__item-description">h</span>
          ${totalDuration.minutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>
    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>
  `;
};

export default class StatisticView extends AbstractView {
  constructor(period, uniqGenres, filmsByGenresCounts, watchedFilms, topGenre, profileRating) {
    super();
    this._watchedFilms = watchedFilms;
    this._callback = null;
    this._period = period;
    this._genres = uniqGenres;
    this._filmsCounts = filmsByGenresCounts;
    this._topGenre = topGenre;
    this._profileRating = profileRating;
  }

  getMarkup() {
    return createStatisticMarkup(this._period, this._watchedFilms, this._topGenre, this._profileRating);
  }

  renderChart() {
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    renderChart(statisticCtx, this._genres, this._filmsCounts);
  }

  setClickPeriodHandler(callback) {
    this._callback = callback;
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, this._onPeriodClick.bind(this));
  }

  _onPeriodClick(event) {
    this._callback(event.target.value);
  }
}
