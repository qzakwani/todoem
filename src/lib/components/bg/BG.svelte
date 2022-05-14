<script>
  import CircuitBoard from "./CircuitBoard.svelte";
  import WorldMap from "./WorldMap.svelte";
  import Sprinkle from "./Sprinkle.svelte";
  import SimpleShiny from "./SimpleShiny.svelte";
  import MassCircles from "./MassCircles.svelte";
  import Dino from "./Dino.svelte";

  import { bg } from "$lib/stores";
</script>

<div class="bg">
  {#if $bg == "circuitboard"}
    <CircuitBoard />
  {:else if $bg == "worldmap"}
    <WorldMap />
  {:else if $bg == "sprinkle"}
    <Sprinkle />
  {:else if $bg == "simpleshiny"}
    <SimpleShiny />
  {:else if $bg == "masscircles"}
    <MassCircles />
  {:else if $bg == "dino"}
    <Dino />
  {/if}
</div>

<style>
  .bg {
    background-color: var(--primary-bg);
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }
</style>
