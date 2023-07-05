import React, { useEffect, useState } from 'react';
import Table from './Components/Table';
import PlanetContext from './context/PlanetContext';
import fetchPlanets from './services/FetchAPI';
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPlanets();
      setPlanets(data);
    };

    fetchData();
  }, []);

  return (
    <PlanetContext.Provider value={ { planets } }>
      <Table />
    </PlanetContext.Provider>
  );
}

export default App;
