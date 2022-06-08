<script>
  import WorldMap from "$lib/assets/WorldMap.svelte";
  import Button from "$lib/components/Button.svelte";
  import { goto } from "$app/navigation";

  function getStarted() {
    goto("/account/register");
  }
</script>

<article>
  <section>
    <h1>Make your life <span class="highlight">easier</span></h1>
    <h1>by keeping your tasks <span class="highlight">organized</span></h1>
    <Button animate text="Get Started" on:click={getStarted} />
  </section>
  <WorldMap w="100" u="%" />
</article>

<style>
  article,
  section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  section {
    gap: 1.5rem;
  }

  h1 {
    width: 100%;
    text-align: center;
    color: var(--primary-font-clr);

    /* font-size: clamp(1.5rem, 2.5vw, 2rem); */
  }
  .highlight {
    color: var(--orange-web);
  }
</style>
