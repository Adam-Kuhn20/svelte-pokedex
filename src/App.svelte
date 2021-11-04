<script>
  import Modal from "svelte-simple-modal";
import PokemonList from "./PokeList.svelte";
import PokemonQuiz from "./PokemonQuiz.svelte";
let totalPokemon = 0;

</script>

<h1>Svelte Pokedex!</h1>
<Modal>
	<PokemonQuiz totalPokemon={totalPokemon}/>
</Modal>
<Modal>
	<PokemonList on:total-pokemon={(event) => totalPokemon = event.detail.count}/>
</Modal>


