<script>
  export let profile = "";
  export let logout = "";

  import logo from "$lib/assets/logo.svg";
  import ThemeChanger from "$lib/components/ThemeChanger.svelte";
  import NavButton from "$lib/components/NavButton.svelte";
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { onMount } from "svelte";
  import { isLoggedIn } from "$lib/stores";
  import HideCompletedTasks from "$lib/components/todo/HideCompletedTasks.svelte";
  import BGChanger from "$lib/components/bg/BGChanger.svelte";

  let showMenu = false;

  let h, delta;
  onMount(() => {
    delta = h.clientHeight;
  });
</script>

<header bind:this={h}>
  <a href="/" class="logo">
    <img src={logo} alt="logo" width="30px" height="30px" />
    <h1>todo<span>em</span></h1>
  </a>

  {#if showMenu}
    <button
      on:click={() => {
        showMenu = false;
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
        ><path
          d="M12.45 37.65 10.35 35.55 21.9 24 10.35 12.45 12.45 10.35 24 21.9 35.55 10.35 37.65 12.45 26.1 24 37.65 35.55 35.55 37.65 24 26.1Z"
        /></svg
      >
    </button>
  {:else}
    <button
      on:click={() => {
        showMenu = true;
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
        ><path d="M6 36V33H42V36ZM6 25.5V22.5H42V25.5ZM6 15V12H42V15Z" /></svg
      >
    </button>
  {/if}
</header>

{#if showMenu}
  <div class="nav-container">
    <nav
      style="height: calc(100vh - {delta}px);"
      transition:fly={{ duration: 300, y: 500, opacity: 0, easing: quintOut }}
    >
      {#if $isLoggedIn}
        <ul
          on:click={() => {
            showMenu = false;
          }}
        >
          <li><NavButton href="/todo" text="Tasks" /></li>
          <li><NavButton href="/account/profile" text={profile} /></li>
          <li style="display: flex; justify-content: center; width: 100%;">
            <NavButton on:click={logout} text="Logout" />
          </li>
          <li><HideCompletedTasks /></li>
          <li><ThemeChanger /></li>
          <li><BGChanger /></li>
        </ul>
      {:else}
        <ul
          on:click={() => {
            showMenu = false;
          }}
        >
          <li><NavButton href="/account/login" text="Login" /></li>
          <li><NavButton href="/account/register" text="Sign Up" /></li>
          <li><ThemeChanger seperator={false} /></li>
        </ul>
      {/if}
    </nav>
  </div>
{/if}

<style>
  header {
    width: 100vw;
    padding: 0 1rem;
    background: var(--secondary-bg);
    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-container {
    position: relative;
  }

  nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    background-color: var(--menu-bg-clr-mobile, gray);
    z-index: 100;
    color: var(--primary-font-clr, gray);
  }
  button {
    background: none;
    border: none;
    width: 2rem;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    cursor: pointer;
    fill: var(--menu-icon, black);
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  h1 {
    color: var(--primary-font-clr);
  }

  span {
    color: var(--secondary-font-clr);
  }
</style>
