<script>
  import { getContext } from "svelte";
  import PokemonAnswer from "./PokemonAnswer.svelte";
  
  export let totalPokemon;

  const { open } = getContext("simple-modal");

  const handleQuizStart = () => {
    const pokeId = Math.floor(Math.random() * totalPokemon + 1);
    open(PokemonAnswer, {pokeId});
  };
</script>

<button on:click={handleQuizStart} disabled={!totalPokemon}>Who's that Pokemon?</button>