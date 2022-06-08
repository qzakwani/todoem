<script>
  import ThemeChanger from "$lib/components/ThemeChanger.svelte";
  import NavButton from "$lib/components/NavButton.svelte";
  import SettingsMenu from "$lib/components/SettingsMenu.svelte";
  import BG from "$lib/components/bg/BG.svelte";
  import logo from "$lib/assets/logo.svg";
  import MobileHeader from "$lib/components/mobile/MobileHeader.svelte";
  import { isLoggedIn, phoneMode } from "$lib/stores";

  import { goto } from "$app/navigation";
  import auth from "$lib/auth";
  import { onAuthStateChanged } from "firebase/auth";
  import { onMount } from "svelte";

  import { browser } from "$app/env";

  if (browser) {
    localStorage.getItem("mode") ? ($phoneMode = true) : ($phoneMode = false);
  }

  onMount(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        $isLoggedIn = true;
        localStorage.setItem("uid", user.uid);
        goto("/todo");
      }
    });
  });
</script>

<BG />

<svelte:head>
  <title>todoem</title>
</svelte:head>
{#if $phoneMode}
  <MobileHeader />
{:else}
  <header>
    <a href="/" class="logo">
      <img src={logo} alt="logo" width="30px" height="30px" />
      <h1>todo<span>em</span></h1>
    </a>
    <div class="header-right">
      <nav>
        <ul>
          <li><NavButton href="/account/login" text="Login" /></li>
          <li><NavButton href="/account/register" text="Sign Up" /></li>
        </ul>
      </nav>
      <SettingsMenu>
        <li><ThemeChanger seperator={false} /></li>
      </SettingsMenu>
    </div>
  </header>
{/if}
<main class:mobile={$phoneMode}>
  <slot />
</main>

<style>
  header {
    padding: 0 7rem;
    background: var(--secondary-bg);
    z-index: 2;
  }
  header,
  nav,
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  ul {
    text-decoration: none;
    list-style: none;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  main {
    max-width: 70%;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 1rem 2rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  main.mobile {
    max-width: 95%;
    padding: 0;
  }

  h1 {
    color: var(--primary-font-clr);
  }

  span {
    color: var(--secondary-font-clr);
  }
</style>
