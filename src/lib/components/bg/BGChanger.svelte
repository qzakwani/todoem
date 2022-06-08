<script>
  import { bg } from "$lib/stores";
</script>

<p>Background</p>
<div class="container">
  <label class:s={$bg == ""}>
    None
    <input type="radio" bind:group={$bg} value="" hidden />
  </label>
  <label class:s={$bg == "dino"}>
    Dino
    <input type="radio" bind:group={$bg} value="dino" hidden />
  </label>
  <label class:s={$bg == "circuitboard"}>
    Circuit Board
    <input type="radio" bind:group={$bg} value="circuitboard" hidden />
  </label>
  <label class:s={$bg == "sprinkle"}>
    Spinkle
    <input type="radio" bind:group={$bg} value="sprinkle" hidden />
  </label>
  <label class:s={$bg == "simpleshiny"}>
    Simple Shiny
    <input type="radio" bind:group={$bg} value="simpleshiny" hidden />
  </label>
  <label class:s={$bg == "masscircles"}>
    Mass Circles
    <input type="radio" bind:group={$bg} value="masscircles" hidden />
  </label>
</div>

<style>
  p {
    padding-left: 0.5rem;
    padding-top: 0.5rem;
    color: var(--menu-sub-txt-clr);
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: var(--menu-tab-padding);
  }

  label {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    cursor: pointer;
  }

  label::before {
    content: "";
    display: inline-block;

    width: 1.3rem;
    height: 1.3rem;
    border-radius: 100%;
    background: white;
    outline-offset: 0;

    transition: all 100ms linear;
    /* transition: all 1000ms linear; */
  }

  label:hover::before {
    outline: 2px solid black;
    outline-offset: 2px;
  }

  .s::before {
    background: #000;
  }
</style>
