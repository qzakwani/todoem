<script>
  export let text;
  export let href = false;
</script>

{#if href}
  <a {href} class="nav-btn">{text}</a>
{:else}
  <button on:click class="nav-btn">{text}</button>
{/if}

<style>
  button {
    border: none;
    outline: none;
    appearance: none;
    background: none;

    cursor: pointer;
  }

  .nav-btn {
    display: block;
    font-weight: 400;
    color: var(--primary-font-clr, black);
    padding: 1.5rem;
    position: relative;
    letter-spacing: 1.5px;
    font-family: var(--main-font, arial);
    font-size: 1rem;
    text-align: center;
  }

  .nav-btn::after {
    display: none;
    content: "";
    background-color: var(--nav-btn-trail-clr);
    width: 100%;
    height: 3px;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .nav-btn:hover {
    background-color: var(--nav-btn-bg-clr, gray);
  }

  .nav-btn:hover::after {
    display: inline-block;
  }
</style>
