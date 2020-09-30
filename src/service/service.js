import axios from 'axios';

const imageURL = 'https://www.metaweather.com/static/img/weather/png/64/';

const getWeatherListService = zip => {
  return axios('/api/location/' + zip + '/', {
    method: 'GET',
  });
};

const getHistoryListService = (zip, date) => {
  return axios('/api/location/' + zip + '/' + date, {
    method: 'GET',
  });
};

const getImageService = state => {
  return imageURL + state + '.png';
};

export { getWeatherListService, getHistoryListService, getImageService };
