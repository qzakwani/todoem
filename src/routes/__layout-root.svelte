<script>
  import ThemeChanger from "$lib/components/ThemeChanger.svelte";
  import NavButton from "$lib/components/NavButton.svelte";
  import SettingsMenu from "$lib/components/SettingsMenu.svelte";
  import BG from "$lib/components/bg/BG.svelte";
  import BGChanger from "$lib/components/bg/BGChanger.svelte";
  import logo from "$lib/assets/logo.svg";
</script>

<BG />

<svelte:head>
  <title>todoem</title>
</svelte:head>

<header>
  <a href="/" class="logo">
    <img src={logo} alt="logo" width="30px" height="30px" />
    <h1>todo<span>em</span></h1>
  </a>
  <nav>
    <ul>
      <li><NavButton href="/account/login" text="Login" /></li>
      <li><NavButton href="/account/register" text="Sign Up" /></li>
    </ul>
  </nav>
  <SettingsMenu>
    <li><ThemeChanger /></li>
    <li><BGChanger /></li>
  </SettingsMenu>
</header>

<main>
  <slot />
</main>

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

  h1 {
    color: var(--primary-font-clr);
  }

  span {
    color: var(--secondary-font-clr);
  }
</style>
