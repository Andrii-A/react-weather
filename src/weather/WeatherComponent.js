import React, {useState} from 'react';
import './WeatherComponent.scss';

import {transformPressure, transformSpeed, transformTemp, parseDate, parseTime, parseDay} from '../common/helpers';

const WeatherComponent = ({fullForecast, fiveDaysList, selectedDay, selectDay}) => {

  const [currentScale, setCurrentScale] = useState('metric');

  const toggleScale = () => {
    setCurrentScale(currentScale === 'imperial' ? 'metric' : 'imperial');
  };

  return (
    <div className="wrapper">
      <button className="toggle-btn" onClick={() => toggleScale()}>{currentScale}</button>

      <div className="location">{fullForecast.city.name}, {fullForecast.city.country}</div>

      <div className="main">
        <div className="main__item main__item--date-time">
          <div className="main__item main__item__time">
            {parseTime(selectedDay.dt_txt)}
          </div>

          <div className="main__item main__item__date">
            {parseDate(selectedDay.dt_txt)}
          </div>
        </div>

        <div className="main__item main__item--info">
          <i className={'wi wi-owm-' + selectedDay.weather[0].id}/>
          <div>{selectedDay.weather[0].description}</div>
        </div>

        <div className="main__item main__item--temps">
          <div className="main__item__temp">{transformTemp(selectedDay.main.temp, currentScale)}</div>
          <div className="main__item__min-max">
            {transformTemp(selectedDay.main.temp_min, currentScale)} | {transformTemp(selectedDay.main.temp_max, currentScale)}
          </div>
        </div>
      </div>

      <div className="info">
        <div className="info__item">
          <i className="wi wi-humidity"/> {selectedDay.main.humidity}%
        </div>

        <div className="info__item">
          <i className="wi wi-barometer"/> {transformPressure(selectedDay.main.pressure, currentScale)}
        </div>

        <div className="info__item">
          <i className="wi wi-wind-direction"
             style={{transform: 'rotate(' + selectedDay.wind.deg + 'deg)'}}/> {transformSpeed(selectedDay.wind.speed, currentScale)}
        </div>
      </div>

      <ul className="buttons">
        {fiveDaysList.map((day, i) =>
          <li key={i} className={"button " + (day.selected ? 'button--selected' : '')}
              onClick={() => selectDay(i, {key: 'Enter'})} onKeyDown={(e) => selectDay(i, e)}
              tabIndex="0" role="button" aria-pressed={day.selected}>
            <div className="button__day">{parseDay(day.dt_txt)}</div>
            <div className="button__icon"><i className={'wi wi-owm-' + day.weather[0].id}/></div>
            <div className="button__temp">{transformTemp(day.main.temp, currentScale)}</div>
            <div className="button__min-max">
              {transformTemp(day.main.temp_min, currentScale)} | {transformTemp(day.main.temp_max, currentScale)}
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default WeatherComponent;

