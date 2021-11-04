<script>
    let page = 1;
    let pokemonList = [];
    let pages = []
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
    $: {
      pages = calculatePages(lastPage)
    }
    
    function handleChange(event) {
      const {value} = event.target;
      if (isNaN(value)) {
        error = true;
        return;
      }
      pokemonPerPage = value;
      error = false;
    }

    function calculatePages(lastPage) {
      if (lastPage === undefined) return []
      return [...Array(lastPage).keys()].map(i => i + 1)
    }
</script>

<style>
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .row-content {
    display: flex;
    justify-content: space-evenly;
    min-width: 500px;
  }

</style>

<h1>Pokemon</h1>
<ul>
	{#each pokemonList as pokemon}
	<li>{pokemon.name}</li>
	{/each}
</ul>
<div class='footer'>
  <div class='row-content'>
    <label for='poke-per-page'># per page: {pokemonPerPage}</label>
    <input id='poke-per-page' value={pokemonPerPage} on:change={handleChange} type='text' />
    {#if error}
    <p>Please input a number</p>
    {/if}
    <label for="page-selection">Go to page:</label>
    <select bind:value={page}>
      {#each pages as page}
        <option value={page}>{page}</option>
      {/each}
    </select>
  </div>
  <div class='row-content'>  
    <button on:click={() => page--} disabled={page === 1}>Prev</button>
    <p>Current Page: {page}</p>
    <button on:click={() => page++} disabled={page === lastPage}>Next page</button>
  </div>
</div>