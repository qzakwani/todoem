<script>
  import { fade } from "svelte/transition";

  export let w = 30;

  let showMenu = false;
</script>

<div class="menu-container">
  <button
    class="container"
    style="width: {w}px;"
    on:click={() => (showMenu = !showMenu)}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"
      ><path
        d="M16.5 35.833 15.792 30.792Q15 30.542 14.104 30.042Q13.208 29.542 12.542 28.958L7.875 31.042L4.375 24.875L8.542 21.792Q8.458 21.375 8.438 20.896Q8.417 20.417 8.417 20Q8.417 19.625 8.438 19.146Q8.458 18.667 8.542 18.208L4.375 15.125L7.875 9L12.542 11.042Q13.25 10.458 14.125 9.979Q15 9.5 15.792 9.208L16.5 4.167H23.5L24.208 9.208Q25.042 9.542 25.875 10Q26.708 10.458 27.375 11.042L32.125 9L35.625 15.125L31.375 18.208Q31.5 18.667 31.521 19.125Q31.542 19.583 31.542 20Q31.542 20.417 31.5 20.854Q31.458 21.292 31.375 21.792L35.583 24.875L32.083 31.042L27.375 28.917Q26.667 29.542 25.854 30.042Q25.042 30.542 24.208 30.792L23.5 35.833ZM19.958 24.792Q21.958 24.792 23.375 23.396Q24.792 22 24.792 20Q24.792 18 23.375 16.604Q21.958 15.208 19.958 15.208Q17.958 15.208 16.562 16.604Q15.167 18 15.167 20Q15.167 22 16.562 23.396Q17.958 24.792 19.958 24.792ZM19.958 22.708Q18.833 22.708 18.062 21.917Q17.292 21.125 17.292 20Q17.292 18.875 18.062 18.083Q18.833 17.292 19.958 17.292Q21.125 17.292 21.896 18.083Q22.667 18.875 22.667 20Q22.667 21.125 21.896 21.917Q21.125 22.708 19.958 22.708ZM20 20Q20 20 20 20Q20 20 20 20Q20 20 20 20Q20 20 20 20Q20 20 20 20Q20 20 20 20Q20 20 20 20Q20 20 20 20Q20 20 20 20Q20 20 20 20Q20 20 20 20Q20 20 20 20Q20 20 20 20Q20 20 20 20Q20 20 20 20Q20 20 20 20ZM18.25 33.75H21.708L22.333 29.167Q23.625 28.833 24.75 28.188Q25.875 27.542 26.875 26.542L31.167 28.375L32.833 25.458L29.042 22.667Q29.25 21.958 29.333 21.312Q29.417 20.667 29.417 20Q29.417 19.333 29.333 18.708Q29.25 18.083 29.042 17.375L32.875 14.542L31.208 11.625L26.875 13.5Q26 12.542 24.792 11.792Q23.583 11.042 22.292 10.833L21.75 6.25H18.25L17.708 10.833Q16.375 11.125 15.229 11.771Q14.083 12.417 13.083 13.458L8.792 11.625L7.125 14.542L10.917 17.333Q10.708 17.958 10.625 18.625Q10.542 19.292 10.542 20Q10.542 20.708 10.625 21.354Q10.708 22 10.875 22.667L7.125 25.458L8.792 28.375L13.083 26.542Q14.042 27.542 15.188 28.188Q16.333 28.833 17.708 29.167Z"
      /></svg
    >
  </button>

  {#if showMenu}
    <menu
      transition:fade={{ delay: 250, duration: 300 }}
      on:click={() => (showMenu = !showMenu)}
    >
      <h3 class="menu-title">Settings</h3>
      <slot />
    </menu>
  {/if}
</div>

<style>
  .menu-container {
    position: relative;
  }

  button {
    border: none;
    background: none;
    margin: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    cursor: pointer;
    fill: var(--menu-icon, black);
  }

  menu {
    position: absolute;
    right: 50%;
    top: 110%;
    background-color: var(--menu-bg-clr);
    list-style: none;
    display: flex;
    flex-direction: column;
    width: 16rem;
    border-radius: var(--border-r, 3px);
  }

  .menu-title {
    width: 100%;
    text-align: center;
    padding: 0.5rem;
    color: var(--menu-txt-clr);
    border-bottom: 3px solid var(--menu-txt-clr);
  }
</style>
