import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function FilterInput() {
  const { textFilter, setTextFilter } = useContext(PlanetContext);

  const handleInputChange = (event) => {
    setTextFilter(event.target.value);
  };

  return (
    <input
      type="text"
      value={ textFilter }
      onChange={ handleInputChange }
      data-testid="name-filter"
    />
  );
}

export default FilterInput;
