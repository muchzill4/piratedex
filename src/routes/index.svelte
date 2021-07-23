<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    const response = await fetch('/api/pirates');
    const pirates = await response.json();
    return {
      props: {
        pirates
      }
    };
  }
</script>

<script>
  import PirateCard from '$lib/PirateCard.svelte';

  export let pirates = [];
  let namePrefix = '';

  function pirateNameStartsWith(pirateName, prefix) {
    // TODO: should deal with surnames too
    return pirateName.toLowerCase().startsWith(prefix.toLowerCase());
  }

  $: filteredPirates = pirates.filter((pirate) => pirateNameStartsWith(pirate.name, namePrefix));
</script>

<svelte:head>
  <title>Piratedex | Home</title>
</svelte:head>

<main>
  <header>
    <h1>🏴‍☠️ Yarrr!</h1>
    <label>🔍<input bind:value={namePrefix} /></label>
  </header>
  <ul>
    {#each filteredPirates as pirate}
      <li class="item">
        <PirateCard {pirate} />
      </li>
    {/each}
  </ul>
</main>

<style>
  main {
    max-width: 50rem;
    margin: 0 auto;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  label {
    font-size: var(--font-size--medium);
    padding: 0 0.5rem;
  }

  input {
    border-radius: 20rem;
    background: #fafafa;
    border: 0;
    width: 12rem;
    height: 3rem;
    padding: 0 1rem;
    font-size: var(--font-size--medium);
    margin-left: 0.5rem;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-bottom: 20px;
  }
</style>
