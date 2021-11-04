<script>
  import Modal from 'svelte-simple-modal';
	import PokemonList from "./PokeList.svelte";



	let name = "world";
	if (name === "world") {
	  name = "Adam";
	}
	const fetchPokemon = async () => {
	  const response = await fetch("https://pokeapi.co/api/v2/pokemon/squirtle/", {method: "GET"});
	  // const response = await fetch('https://pokeapi.co/api/v2/pokemon/', {method: 'GET'})
	  const data = await response.json();
	  console.log("result", response);
	  console.log("data", data);
	  pokemonList = data.results;

	};
	const buttonClicked = async () => {
	  console.log("gotta catch them all");
	  name += " click";
	  await fetchPokemon();
	};
</script>

<h1>Hello {name}!</h1>
<button on:click={buttonClicked}>Get All Pokemon</button>

<Modal>
	<PokemonList/>
</Modal>


