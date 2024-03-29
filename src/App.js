import React from 'react';
import './App.scss';

import WeatherComponent from "./weather/WeatherComponent";
import {BASE_URL} from "./common/constants";
import axios from "axios";

class App extends React.Component {
  state = {
    searchLocation: 'Burlington, CA',
    error: false,
    loading: false,
  };

  componentDidMount() {
    this.getForecast();
  }


  changeLocation = (event) => {
    if (event.key === 'Enter') {
      this.setState({searchLocation: event.target.value}, this.getForecast);
    }
  };


  getForecast = () => {
    this.setState({loading: true});
    const url = `${BASE_URL}&q=${this.state.searchLocation}`;

    axios.get(url)
      .then(res => {
          const fiveDaysList = this.makeFiveDaysList(res.data.list);
          fiveDaysList[0].selected = true;
          const selectedDay = fiveDaysList[0];

          this.setState({
            ...this.state,
            fullForecast: res.data,
            fiveDaysList: fiveDaysList,
            selectedDay: selectedDay,
            error: false,
            loading: false
          });
        }
      )
      .catch((error) => {
        this.setState({error: true, loading: false});
        console.log('Cannot get Weather Data from the provider >>>', error);
      });
  };


  selectDay = (idx, event) => {
    if (event.key === 'Enter') {
      const fiveDaysList = this.state.fiveDaysList;
      fiveDaysList.forEach(d => d.selected = false);
      fiveDaysList[idx].selected = true;
      const selectedDay = fiveDaysList[idx];

      this.setState({
        fiveDaysList: fiveDaysList,
        selectedDay: selectedDay,
      });
    }
  };

  makeFiveDaysList = (longList) => {
    // since the BE returning the forecast for 5 days with 3 hours interval, we are getting 40 items (8 items per day)
    // I decided to pick first one to render a "Day Forecast" and get 5 items totally

    const shortList = [];
    longList.forEach((item, idx) => {
        if (idx % 8 === 0) {
          shortList.push(item);
        }
      }
    );

    return shortList;
  };


  render() {
    return (
      <div className="app-wrapper">
        <div>
          <input type="text" defaultValue={this.state.searchLocation}
                 placeholder="Input City, CountryCode and press enter"
                 onKeyDown={(e) => this.changeLocation(e)}/>
          {this.state.error && <div className="panel__error">Error... Try to type another location!</div>}
        </div>

        {this.state.loading ?
          <>Loading...</> :
          this.state.fullForecast && <WeatherComponent {...this.state} selectDay={(i, e) => { this.selectDay(i, e)}}/>
        }
      </div>
    )
  };
}

export default App;
