async function fetchPlanets() {
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();
  const results = data.results.map((result) => {
    const { residents, ...rest } = result;
    return rest;
  });

  return results;
}

export default fetchPlanets;
