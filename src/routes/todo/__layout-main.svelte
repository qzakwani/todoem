<script>
  import { onMount } from "svelte";
  import auth from "$lib/auth";
  import { onAuthStateChanged, signOut } from "firebase/auth";
  import { goto } from "$app/navigation";
  import { isLoggedIn } from "$lib/stores";

  onMount(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        $isLoggedIn = true;
        localStorage.setItem("uid", user.uid);
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
        console.log(e.code);
      });
  }
</script>

{#if $isLoggedIn}
  <header>
    <nav>
      <ul>
        <li><button on:click={logout}>Logout</button></li>
      </ul>
    </nav>
  </header>

  <main class="main">
    <slot />
  </main>
{:else}
  <h1>Skeleton</h1>
{/if}
