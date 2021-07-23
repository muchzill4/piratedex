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
        <article>
          <h2>{pirate.name}</h2>
          <dl>
            <dt>Life</dt>
            <dd>{pirate.life || '-'}</dd>
            <dt>Years Active</dt>
            <dd>{pirate.yearsActive || '-'}</dd>
            <dt>Country of origin</dt>
            <dd>{pirate.countryOfOrigin || '-'}</dd>
          </dl>
          <p>{pirate.comments}</p>
        </article>
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
  padding: 0 .5rem;
}

input {
  border-radius: 20rem;
  background: #fafafa;
  border: 0;
  width: 12rem;
  height: 3rem;
  padding: 0 1rem;
  font-size: var(--font-size--medium);
  margin-left: .5rem;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

article {
  background: #fafafa;
  color: #262626;
  padding: 1rem;
  border-radius: 0.2rem;
  box-shadow: 0 5px 5px rgba(0,0,0,0.05);
}

h2 {
  margin-bottom: 0.5rem;
}

dl {
  margin-bottom: 1rem;
}

dt {
  font-size: var(--font-size--small);
  text-transform: lowercase;
  display: inline-block;
  margin-right: 0.2rem;
  color: #666;
}

dt:after {
  content: ':';
}

dd {
  display: inline-block;
  margin-right: 1rem;
}

p {
  font-size: var(--font-size--default);
  padding-left: 1rem;
  position: relative;
}

p:before {
  position: absolute;
  top: -0.5rem;
  font-size: 1.8rem;
  left: 0;
  content: "“";
  font-weight: bold;
  color: #999;
  font-family: 'Georgia', serif;
}
</style>
