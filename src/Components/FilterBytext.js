import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function FilterByText() {
  const { textFilter, setTextFilter } = useContext(PlanetContext);

  const handleInputChange = ({ target }) => {
    setTextFilter(target.value);
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

export default FilterByText;
