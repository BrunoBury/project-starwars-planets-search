import React from 'react';
import Table from './Components/Table';
import FilterByText from './Components/FilterBytext';
import FilterByNumber from './Components/FilterByNumber';
import './App.css';
import PlanetContextProvider from './context/PlanetProvider';

function App() {
  return (
    <PlanetContextProvider>
      <h1>Planet Filter</h1>
      <FilterByText />
      <FilterByNumber />
      <Table />
    </PlanetContextProvider>
  );
}

export default App;
