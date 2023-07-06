import React, { useEffect, useState } from 'react';
import Table from './Components/Table';
import PlanetContext from './context/PlanetContext';
import fetchPlanets from './services/FetchAPI';
import FilterInput from './Components/Filters';
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);
  const [textFilter, setTextFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPlanets();
      setPlanets(data);
    };

    fetchData();
  }, []);

  return (
    <PlanetContext.Provider value={ { planets, textFilter, setTextFilter } }>
      <h1>Planet Filter</h1>
      <FilterInput />
      <Table />
    </PlanetContext.Provider>
  );
}

export default App;
