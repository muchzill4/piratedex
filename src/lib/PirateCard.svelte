<script>
  export let pirate;
  const pirateFeatures = [
    { name: 'Life', value: pirate.life || '-' },
    { name: 'Years Active', value: pirate.yearsActive || '-' },
    { name: 'Country of Origin', value: pirate.countryOfOrigin || '-' }
  ];
</script>

<article class="pirate-card">
  <h2 class="pirate-name">{pirate.name}</h2>
  <dl class="pirate-features">
    {#each pirateFeatures as { name, value }}
      <dt class="pirate-feature-name">{name}</dt>
      <dd class="pirate-feature-value">{value}</dd>
    {/each}
  </dl>
  <p class="pirate-bio">{pirate.comments}</p>
</article>

<style>
  .pirate-card {
    background: #fafafa;
    color: #262626;
    padding: 1rem;
    border-radius: 0.2rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.05);
  }

  .pirate-name {
    margin-bottom: 0.5rem;
  }

  .pirate-features {
    margin-bottom: 1rem;
  }

  .pirate-feature-name {
    font-size: var(--font-size--small);
    text-transform: lowercase;
    display: inline-block;
    margin-right: 0.2rem;
    color: #666;
  }

  .pirate-feature-name:after {
    content: ':';
  }

  .pirate-feature-value {
    display: inline-block;
    margin-right: 1rem;
  }

  .pirate-bio {
    font-size: var(--font-size--default);
    padding-left: 1rem;
    position: relative;
  }

  .pirate-bio:before {
    position: absolute;
    top: -0.5rem;
    font-size: 1.8rem;
    left: 0;
    content: '“';
    font-weight: bold;
    color: #999;
    font-family: 'Georgia', serif;
  }
</style>
