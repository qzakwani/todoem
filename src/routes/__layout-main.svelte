<script>
  import auth from "$lib/auth";
  import { onAuthStateChanged, signOut } from "firebase/auth";
  import { goto } from "$app/navigation";
  import { isLoggedIn, phoneMode } from "$lib/stores";
  import MobileHeader from "$lib/components/mobile/MobileHeader.svelte";

  import ThemeChanger from "$lib/components/ThemeChanger.svelte";
  import NavButton from "$lib/components/NavButton.svelte";
  import SettingsMenu from "$lib/components/SettingsMenu.svelte";
  import BG from "$lib/components/bg/BG.svelte";
  import BGChanger from "$lib/components/bg/BGChanger.svelte";
  import HideCompletedTasks from "$lib/components/todo/HideCompletedTasks.svelte";
  import logo from "$lib/assets/logo.svg";
  import { onMount } from "svelte";
  import { browser } from "$app/env";

  if (browser) {
    localStorage.getItem("mode") ? ($phoneMode = true) : ($phoneMode = false);
  }

  let profile = "Profile";

  onMount(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        $isLoggedIn = true;
        localStorage.setItem("uid", user.uid);
        profile = user.displayName || "Profile";
      } else {
        $isLoggedIn = false;
        localStorage.removeItem("uid");
        goto("/account/login");
      }
    });
  });

  function logout() {
    signOut(auth)
      .then((v) => {
        $isLoggedIn = false;
        localStorage.removeItem("uid");
        goto("/account/login");
      })
      .catch((e) => {
        goto("/todo");
      });
  }
</script>

<svelte:head>
  <title>todoem</title>
</svelte:head>

<BG />

{#if $phoneMode}
  <MobileHeader {profile} {logout} />
{:else}
  <header>
    <a href="/" class="logo">
      <img src={logo} alt="logo" width="30px" height="30px" />
      <h1>todo<span>em</span></h1>
    </a>
    <div class="header-right">
      <nav>
        <ul>
          <li><NavButton href="/todo" text="Tasks" /></li>
          <li><NavButton href="/account/profile" text={profile} /></li>
          <li><NavButton on:click={logout} text="Logout" /></li>
        </ul>
      </nav>
      <SettingsMenu>
        <li><HideCompletedTasks /></li>
        <li><ThemeChanger /></li>
        <li><BGChanger /></li>
      </SettingsMenu>
    </div>
  </header>
{/if}

{#if $isLoggedIn}
  <main class:mobile={$phoneMode}>
    <slot />
  </main>
{/if}

<style>
  header {
    padding: 0 5rem;
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
    max-width: 40rem;
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
