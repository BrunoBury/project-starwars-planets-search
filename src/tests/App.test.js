import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FilterByText from '../Components/FilterBytext';
import PlanetContext from '../context/PlanetContext';
import FilterByNumber from '../Components/FilterByNumber';
import testData from './mocks/testData';
import mockFetch from './mocks/fetch';

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

describe('test FilterByText', () => {
  it('teste componente FilterByText',  () => {
    const setTextFilter = jest.fn()

    render(
      <PlanetContext.Provider value={{ setTextFilter }}>
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
          planets: testData.results,
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

 
  it('chama a função de filtro ao clicar no botão', () => {
    const setAppliedFilters = jest.fn();
    const setFilteredPlanets = jest.fn();
  
    render(
      <PlanetContext.Provider
        value={{
          filterNumber: { },
          setFilterNumber: jest.fn(),
          planets: testData.results,
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
    userEvent.type(screen.getByTestId('value-filter'), '1000000');
  
    userEvent.click(screen.getByTestId('button-filter'));
  
    expect(setAppliedFilters).toHaveBeenCalled();
    expect(setFilteredPlanets).toHaveBeenCalled();
  });


 it('chama o fetch com sucesso e exibe os dados da tabela', async () => {    
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    await act(async () => {
      render(<App />);
    }); 
    const tableRows = await screen.findAllByRole('row');
    expect(tableRows.length).toBe(11);     
    global.fetch.mockRestore();
  });


  it('chama o fetch com sucesso e exibe os dados da tabela (igual a)', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    await act(async () => {
      render(<App />);
    });

    const columnFilter = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnFilter, ['population']);

    const comparisonFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonFilter, ['igual a']);

    const valueFilter = screen.getByTestId('value-filter');
    userEvent.type(valueFilter, '4500000000');

    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.click(buttonFilter);

    const tableRows = await screen.findAllByRole('row');
    expect(tableRows.length).toBe(2); 
  });
  it('chama o fetch com sucesso e exibe os dados da tabela (menor que)', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    await act(async () => {
      render(<App />);
    });

    const columnFilter = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnFilter, ['population']);

    const comparisonFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonFilter, ['menor que']);

    const valueFilter = screen.getByTestId('value-filter');
    userEvent.type(valueFilter, '200000');

    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.click(buttonFilter);

    const tableRows = await screen.findAllByRole('row');
    expect(tableRows.length).toBe(2); 
  });
});
  


