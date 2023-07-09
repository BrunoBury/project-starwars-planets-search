import React, { useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const { planets, textFilter, filteredPlanets, fetchData } = useContext(PlanetContext);

  useEffect(() => {
    fetchData();
  }, []);

  const filterPlanetsText = planets
    .filter((planet) => planet.name.toLowerCase().includes(textFilter.toLowerCase()));

  const displayPlanets = filteredPlanets.length > 0 ? filteredPlanets : filterPlanetsText;

  return (
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
  );
}

export default Table;
