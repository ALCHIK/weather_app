import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';

import { WeatherDisplay } from './WeatherDisplay/WeatherDisplay';

const Cities = [
  {
    name: "Moscow",
    zip: "2122265",
    id: 1,
  },
];

const App = () => {
  const initData = {
    activePlace: 0,
    weatherData: null,
  };

  const [activePlace, setActivePlace] = useState(initData.activePlace);

  useEffect(() => { 
    console.log('update');
  });

  useEffect(() => { 
    console.log('did mount');
  }, []);

  useEffect(() => {
    return () => {
      console.log('will unmount');
    };
  }, []);

  return (
    <Container>
      <WeatherDisplay key={activePlace} zip={Cities[activePlace].zip} />
    </Container>
  );
};

export default App;
