<script>
  import { hideCompletedTasks } from "$lib/stores";
</script>

<p>Preferences</p>
<div class="container">
  <label class:s={$hideCompletedTasks}>
    Hide Completed Tasks
    <input type="checkbox" bind:checked={$hideCompletedTasks} hidden />
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
    border-bottom: var(--menu-tab-border);
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
  }

  label:hover::before {
    outline: 2px solid black;
    outline-offset: 2px;
  }

  .s::before {
    background: #000;
  }
</style>
