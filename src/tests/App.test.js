import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FilterByText from '../Components/FilterBytext';
import PlanetContext from '../context/PlanetContext';
import FilterByNumber from '../Components/FilterByNumber';

describe('test App', () => {
  it('Verifica se o título "Planet Filter" está sendo renderizado', () => {
    render(<App />);
    const titleElement = screen.getByText(/Planet Filter/i);
  expect(titleElement).toBeInTheDocument();
  });
  it('Verifica se os componentes FilterByText, FilterByNumber e Table estão sendo renderizados', () => {
    render(<App />)
    const filterByTextElement = screen.getByTestId('name-filter');
  expect(filterByTextElement).toBeInTheDocument();

  const filterByNumberElement = screen.getByTestId('column-filter');
  expect(filterByNumberElement).toBeInTheDocument();

  const tableElement = screen.getByTestId('planet-table');
  expect(tableElement).toBeInTheDocument();
  });
});

describe('test FilterBytext', () => {
  it('teste componente FilterByText',  () => {
  const setTextFilter = jest.fn()

  render(
    <PlanetContext.Provider value={{  setTextFilter }}>
      <FilterByText />
    </PlanetContext.Provider>
  );

  const inputElement = screen.getByTestId('name-filter');
  expect(inputElement).toBeInTheDocument();
  
  const inputValue = 'teste';
  userEvent.type(inputElement, inputValue);

  expect(inputElement.value).toEqual('teste');
  });
});

describe('test FilterByNumber', () => {
  it('renderiza corretamente os campos de filtro', () => {
    render(
      <PlanetContext.Provider
        value={{
          filterNumber: { column: 'population', comparison: 'maior que', value: '0' },
          setFilterNumber: jest.fn(),
          planets: [],
          setFilteredPlanets: jest.fn(),
          appliedFilters: [],
          setAppliedFilters: jest.fn(),
        }}
      >
        <FilterByNumber />
      </PlanetContext.Provider>
    );

    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
  });

  it('atualiza corretamente os valores dos campos de filtro', () => {
    render(
      <PlanetContext.Provider
        value={{
          filterNumber: {},
          setFilterNumber: jest.fn(),
          planets: [],
          setFilteredPlanets: jest.fn(),
          appliedFilters: [],
          setAppliedFilters: jest.fn(),
        }}
      >
        <FilterByNumber />
      </PlanetContext.Provider>
    );
  
    userEvent.selectOptions(screen.getByTestId('column-filter'), ['population']);
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), ['maior que']);
    userEvent.type(screen.getByTestId('value-filter'), '1000000');
  
    expect(screen.getByTestId('column-filter')).toHaveValue('population');
    expect(screen.getByTestId('comparison-filter')).toHaveValue('maior que');
    expect(screen.getByTestId('value-filter')).toHaveValue(1000000);
  });

  it('chama a função de filtro ao clicar no botão', () => {
    const setAppliedFilters = jest.fn();
    const setFilteredPlanets = jest.fn();
  
    render(
      <PlanetContext.Provider
        value={{
          filterNumber: { },
          setFilterNumber: jest.fn(),
          planets: [],
          setFilteredPlanets: setFilteredPlanets,
          appliedFilters: [],
          setAppliedFilters: setAppliedFilters,
        }}
      >
        <FilterByNumber />
      </PlanetContext.Provider>
    );
  
    userEvent.selectOptions(screen.getByTestId('column-filter'), ['population']);
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), ['maior que']);
    userEvent.type(screen.getByTestId('value-filter'), 1000000);
  
    userEvent.click(screen.getByTestId('button-filter'));
  
    expect(setAppliedFilters).toHaveBeenCalled();
    expect(setFilteredPlanets).toHaveBeenCalled();
  });
  it('aplica o filtro corretamente', () => {
    const planets = [
      { population: 1000000 },
      { population: 2000000 },
      { population: 3000000 },
    ];

    const setAppliedFilters = jest.fn();
    const setFilteredPlanets = jest.fn();

    render(
      <PlanetContext.Provider
        value={{
          filterNumber: { column: 'population', comparison: 'maior que', value: '1500000' },
          setFilterNumber: jest.fn(),
          planets: planets,
          setFilteredPlanets: setFilteredPlanets,
          appliedFilters: [],
          setAppliedFilters: setAppliedFilters,
        }}
      >
        <FilterByNumber />
      </PlanetContext.Provider>
    );

    userEvent.click(screen.getByTestId('button-filter'));

    expect(setFilteredPlanets).toHaveBeenCalledWith([
      { population: 2000000 },
      { population: 3000000 },
    ]);
    expect(setAppliedFilters).toHaveBeenCalledWith([
      { column: 'population', comparison: 'maior que', value: '1500000' },
    ]);
  });  
});