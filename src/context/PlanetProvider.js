import React, { useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/FetchAPI';
import PlanetContext from './PlanetContext';

function PlanetContextProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [textFilter, setTextFilter] = useState('');
  const [filterNumber, setFilterNumber] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState([]);

  const fetchData = async () => {
    const data = await fetchPlanets();
    setPlanets(data);
  };

  return (
    <PlanetContext.Provider
      value={
        { planets,
          textFilter,
          setTextFilter,
          filterNumber,
          setFilterNumber,
          filteredPlanets,
          setFilteredPlanets,
          fetchData,
          appliedFilters,
          setAppliedFilters }
      }
    >
      {children}
    </PlanetContext.Provider>
  );
}

PlanetContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetContextProvider;
