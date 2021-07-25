<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    const response = await fetch('/data/pirates.json');
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
    const sanitisedName = pirateName.toLowerCase().replace(/[^\w\s]/g, '');
    const nameComponents = sanitisedName.split(' ');
    const onlyNames = nameComponents.filter((component) => {
      return ['of', 'the'].indexOf(component) === -1;
    });

    const lPrefix = prefix.toLowerCase();
    return onlyNames.some((name) => name.startsWith(lPrefix));
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
  }

  input {
    border-radius: 999px;
    background: #fafafa;
    border: 0;
    width: 12rem;
    padding: 0.5rem 1.2rem;
    font-size: var(--font-size--medium);
    margin-left: 0.5rem;
    flex-shrink: 1;
  }

  input:focus {
    outline-width: 5px;
    outline-offset: -5px;
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
