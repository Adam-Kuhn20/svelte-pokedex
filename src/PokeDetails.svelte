<script>
  import { DoubleBounce } from 'svelte-loading-spinners'
  export let name;
  export let url;

  let pokemonImage
  let loading = true
  let stats = []

  $: {
    loading = true;    
    const reversedUrl = url.split('').reverse()
    const [number] = reversedUrl.slice(1, reversedUrl.indexOf('/', 1));
    fetch(url, {method: "GET"})
    .then(response => response.json())
    .then(data =>  {
     pokemonImage = data.sprites.front_default;
     stats = data.stats

    })
    .catch(error => console.error("Oops something went wrong", error))
    .finally(() => loading = false)
  }


  
</script>
{#if loading}
  <DoubleBounce />
{:else}
  <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
  <img src={pokemonImage} alt={`image of ${name}`}/>
  {#each stats as stat}
  <div>
    <h4>{stat.stat.name}: {stat.base_stat}</h4>
  </div>
  {/each}
{/if}