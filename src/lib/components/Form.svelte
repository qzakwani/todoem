<script>
  export let title = "";
  import { phoneMode } from "$lib/stores";
</script>

<form on:submit|preventDefault class="card" class:mobile={$phoneMode}>
  {#if title}
    <h3>{title}</h3>
  {/if}
  <slot />
</form>

<style>
  form {
    width: 70%;
    margin: auto;
    padding: 2rem;
    border-radius: var(--border-r);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    background: var(--secondary-bg);
    color: var(--primary-font-clr);
    border: var(--card-border);
  }

  form.mobile {
    width: 100%;
  }

  form :global(label) {
    width: 100%;
  }

  form :global(input) {
    width: 100%;
    padding: 0.7rem 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: var(--border-r, 3px);
    margin-top: 5px;
    transition: all 100ms linear;
  }

  form :global(input):focus {
    outline: 1.5px solid var(--input-outline-clr);
    outline-offset: 2.5px;
  }
</style>
