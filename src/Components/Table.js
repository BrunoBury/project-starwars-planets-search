import React, { useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const { planets, textFilter, appliedFilters, fetchData } = useContext(PlanetContext);

  useEffect(() => {
    fetchData();
  }, []);

  const filterPlanetsText = planets
    .filter((planet) => planet.name.toLowerCase().includes(textFilter.toLowerCase()));

  const applyNumericFilters = (data) => appliedFilters.reduce((filteredData, filter) => {
    const { column, comparison, value } = filter;
    return filteredData.filter((planet) => {
      switch (comparison) {
      case 'maior que':
        return Number(planet[column]) > Number(value);
      case 'menor que':
        return Number(planet[column]) < Number(value);
      case 'igual a':
        return Number(planet[column]) === Number(value);
      default:
        return true;
      }
    });
  }, data);

  const displayPlanets = applyNumericFilters(filterPlanetsText);

  return (
    <div>
      <div>
        {appliedFilters.map((filter, index) => (
          <span key={ index }>
            {`${filter.column} ${filter.comparison} ${filter.value}`}
            <br />
          </span>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation_Period</th>
            <th>Orbital_Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface_Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            displayPlanets.map((planet) => (
              <tr key={ planet.name }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
