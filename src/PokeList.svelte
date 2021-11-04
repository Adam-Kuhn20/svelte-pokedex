<script>
    let page = 1;
    let pokemonList = [];
    let lastPage;
    let pokemonPerPage = 20;
    let error = false;
    $: {
      const limit = pokemonPerPage;
      const offSet = limit * (page - 1);
      fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offSet}`, {method: "GET"})
        .then(response => (response.json()))
        .then(data => {
          lastPage = Math.ceil(data.count / limit);
          pokemonList = data.results; 
        })
        .catch((err) => {
          console.error("Something went wrong", err);  
        });
    }

    function handleNext() {
      page++;
    }
    function handlePrevious() {
      page--;
    }
    function handleChange(event) {
      const {value} = event.target;
      console.log(isNaN(value));
      if (isNaN(value)) {
        error = true;
        return;
      }
      pokemonPerPage = value;
      error = false;
    }
</script>

<h1>Pokemon</h1>
<ul>
	{#each pokemonList as pokemon}
	<li>{pokemon.name}</li>
	{/each}
</ul>
<label for='poke-per-page'># per page: {pokemonPerPage}</label>
<input id='poke-per-page' value={pokemonPerPage} on:change={handleChange} type='text' />
{#if error}
    <p>Please input a number</p>
{/if}
<button on:click={handlePrevious} disabled={page === 1}>Prev</button>
    <p>Current Page: {page}</p>
<button on:click={handleNext} disabled={page === lastPage}>Next page</button>