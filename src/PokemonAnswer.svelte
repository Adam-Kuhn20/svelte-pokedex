<script>
  import { Chasing } from "svelte-loading-spinners";
  import {tries, correctAnswers} from "./store";

  export let pokeId;
  export let tryAgain;

  let loading = true;
  let backImage;
  let frontImage;
  let name;
  let answer = "";
  let answered = false;
  $: {
    loading = true;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`, {method: "GET"})
      .then(response => response.json())
      .then(data => {
        console.log("DATA", data);
        backImage = data.sprites.back_default;
        frontImage = data.sprites.front_default;
        name = data.name;
      })
      .catch(error => {
        console.error("Something went wrong", error);
      })
      .finally(
        loading = false
      );
  }
  const checkAnswer = () => {
    answered = true;
    tries.update(n => n + 1);
    if (name === answer.toLocaleLowerCase()) {
      $correctAnswers++;
    }
  };
</script>

{#if loading}
  <Chasing />
{:else}
  <h4>Who is that Pokemon?</h4>
  <img src={frontImage} alt='front of pokemon' />
  <img src={backImage} alt='back of pokemon' />
  <input bind:value={answer} type='text' />
  <button on:click={checkAnswer}>check</button>
  {#if answered}
    {#if name === answer.toLowerCase()}
    <p>Correct!</p>
    {:else}
    <p>Nope, the correct answer is <b>{name}</b></p>
    {/if}
    <button on:click={tryAgain}>Try Again</button>
  {/if}
{/if}