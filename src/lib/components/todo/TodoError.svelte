<script>
  import Button from "$lib/components/Button.svelte";
</script>

<div class="error-container">
  <div class="error">
    <h3>Somwthing went wrong!</h3>
    <h5>Please reaload the page.</h5>
    <Button
      text="Reload"
      kind="danger"
      on:click={() => {
        location.reload();
      }}
    />
  </div>
</div>

<style>
  .error-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background: rgba(128, 128, 128, 0.7);

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .error {
    z-index: 20;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
</style>
