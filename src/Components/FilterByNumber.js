import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function FilterByNumber() {
  const {
    filterNumber,
    setFilterNumber,
    planets,
    setFilteredPlanets,
    appliedFilters,
    setAppliedFilters,
  } = useContext(PlanetContext);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFilterNumber({ ...filterNumber, [name]: value });
  };

  const handleFilter = () => {
    const { column, comparison, value } = filterNumber;
    const newFilter = {
      column,
      comparison,
      value,
    };

    const updatedFilters = [...appliedFilters, newFilter];

    const filteredPlanet = planets
      .filter((planet) => updatedFilters
        .every(({
          column: filterColumn,
          comparison: filterComparison,
          value: filterValue }) => {
          switch (filterComparison) {
          case 'maior que':
            return Number(planet[filterColumn]) > Number(filterValue);
          case 'menor que':
            return Number(planet[filterColumn]) < Number(filterValue);
          case 'igual a':
            return Number(planet[filterColumn]) === Number(filterValue);
          default:
            return true;
          }
        }));

    setAppliedFilters(updatedFilters);
    setFilteredPlanets(filteredPlanet);
  };

  const availableColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']
    .filter((column) => !appliedFilters.some((filter) => filter.column === column));

  return (
    <div>
      <select
        name="column"
        data-testid="column-filter"
        value={ filterNumber.column }
        onChange={ handleInputChange }
      >
        {availableColumns.map((column) => (
          <option key={ column } value={ column }>{column}</option>
        ))}
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        value={ filterNumber.comparison }
        onChange={ handleInputChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        name="value"
        data-testid="value-filter"
        value={ filterNumber.value }
        onChange={ handleInputChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilter }
      >
        Filtrar
      </button>
    </div>
  );
}

export default FilterByNumber;
