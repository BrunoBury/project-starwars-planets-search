import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const { planets } = useContext(PlanetContext);
  const { textFilter } = useContext(PlanetContext);
  const filterPlanets = planets
    .filter((planet) => planet.name
      .toLowerCase().includes(textFilter.toLowerCase()));

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
          filterPlanets.map((planet) => (
            <tr key={ planet.name }>
              <th>{planet.name}</th>
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
