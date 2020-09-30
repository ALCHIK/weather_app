import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import PropTypes from 'prop-types';

import {
  getWeatherListService,
  getHistoryListService,
  getImageService,
} from '../service/service';

const WeatherDisplay = ({ zip }) => {
  const initData = {
    weatherData: {},
    error: '',
    isLoading: true,
    hasHistory: false,
  };

  const [weatherData, setWeatherData] = useState(initData.weatherData);
  const [error, setError] = useState(initData.error);
  const [isLoading, setIsLoading] = useState(initData.isLoading);
  const [startDate, setStartDate] = useState(new Date());
  const [hasHistory, setHistory] = useState(initData.hasHistory);

  const getWeatherList = zip => {
    getWeatherListService(zip)
      .then(response => {
        setWeatherData(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
      });
  };

  const getHistoryList = (zip, date) => {
    getHistoryListService(zip, date)
      .then(response => {
        setWeatherData({ consolidated_weather: response.data });
        setIsLoading(false);
        setHistory(true);
      })
      .catch(err => {
        setError(err);
      });
  };

  const onClickDateHandler = date => {
    setStartDate(date);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const new_date = year + '/' + month + '/' + day + '/';

    setIsLoading(true);
    getHistoryList(zip, new_date);
  };

  useEffect(() => {
    getWeatherList(zip);
  }, []);

  useEffect(() => {
    console.log('update');
  });

  useEffect(() => {
    return () => {
      console.log('will unmount');
    };
  }, []);

  const ViewWeather = () => {
    return !hasHistory ?
      <Grid container justify="center" direction="row" spacing={2}>
        {weatherData.consolidated_weather.map(item => (
          <Grid key={item.id} item>
            <p>{item.applicable_date}</p>
            <img
              src={getImageService(item.weather_state_abbr)}
              alt={item.weather_state_name} />
            <p>Max: {item.max_temp.toFixed()}°</p>
            <p>Min: {item.min_temp.toFixed()}°</p>
            <p>Wind Speed: {item.wind_speed.toFixed()} mi/hr</p>
          </Grid>
        ))}
      </Grid> :
      <Grid container direction="row">
        {weatherData.consolidated_weather.map(item => (
          <Grid key={item.id} item>
            <img
              src={getImageService(item.weather_state_abbr)}
              alt={item.weather_state_name} />
            <p>{item.max_temp.toFixed()}°</p>
            <p>{item.min_temp.toFixed()}°</p>
          </Grid>
        ))}
      </Grid>
  };

  return (
    <div>
      <h1>
        Show weather!
        {hasHistory ? (
          <IconButton
            aria-label="home page"
            onClick={() => window.location.reload()}>
            <HomeIcon />
          </IconButton>
        ) : ''}
      </h1>
      <div>
        {isLoading ? <CircularProgress />:
        !isLoading && error ? <h1>{error}</h1> :
          <Grid item lg={12}>
            <h1>{weatherData.title ? weatherData.title : 'History'}
              <br />
              <DatePicker
                selected={startDate} 
                onChange={date => onClickDateHandler(date)} />
            </h1>
            <ViewWeather />
          </Grid>
        }
      </div>
    </div>
  );
};

WeatherDisplay.propTypes = {
  zip: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export { WeatherDisplay };
