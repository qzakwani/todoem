<script>
  import Button from "$lib/components/Button.svelte";

  export let status;
  export let saveFunction;
  export let startEdit;
  export let cancelEdit;
  export let errorMsg = false;

  function reloadPage() {
    location.reload();
  }
</script>

{#if status === "pre"}
  <div class="pre icon" on:click={startEdit}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
      ><path
        d="M9 39H11.2L35.45 14.75L34.35 13.65L33.25 12.55L9 36.8ZM6 42V35.6L35.4 6.2Q36.25 5.35 37.525 5.375Q38.8 5.4 39.65 6.25L41.8 8.4Q42.65 9.25 42.65 10.5Q42.65 11.75 41.8 12.6L12.4 42ZM39.5 10.45 37.45 8.4ZM35.45 14.75 34.35 13.65 33.25 12.55 35.45 14.75Z"
      /></svg
    >
  </div>
{:else if status === "edit"}
  <div class="edit">
    <Button text="Save" size="s" animate on:click={saveFunction} />
    <Button text="X" kind="danger" size="s" animate on:click={cancelEdit} />
  </div>
{:else if status === "pending"}
  <div class="lds-hourglass" />
{:else if status === "success"}
  <div class="success icon" on:click={reloadPage}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
      ><path
        d="M24 44Q19.75 44 16.1 42.475Q12.45 40.95 9.75 38.25Q7.05 35.55 5.525 31.9Q4 28.25 4 24Q4 19.8 5.525 16.15Q7.05 12.5 9.75 9.8Q12.45 7.1 16.1 5.55Q19.75 4 24 4Q28.2 4 31.85 5.55Q35.5 7.1 38.2 9.8Q40.9 12.5 42.45 16.15Q44 19.8 44 24Q44 28.25 42.45 31.9Q40.9 35.55 38.2 38.25Q35.5 40.95 31.85 42.475Q28.2 44 24 44ZM21.05 33.1 35.2 18.95 32.9 16.7 21.05 28.55 15.05 22.55 12.8 24.8Z"
      /></svg
    >
    <div class="success-msg">
      Edit completed successfully.
      <br />
      Press icon to reload.
    </div>
  </div>
{:else if status === "error"}
  <div class="error icon" on:click={reloadPage}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
      ><path
        d="M16.5 42 6 31.5V16.5L16.5 6H31.5L42 16.5V31.5L31.5 42ZM17.85 32.25 24 26.1 30.15 32.25 32.25 30.15 26.1 24 32.25 17.85 30.15 15.75 24 21.9 17.85 15.75 15.75 17.85 21.9 24 15.75 30.15Z"
      /></svg
    >
    <div class="error-msg">
      {#if errorMsg}
        {errorMsg}
      {:else}
        Edit failed!
        <br />
        Press icon to reload and try again.
      {/if}
    </div>
  </div>
{/if}

<style>
  .icon {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }

  .pre.icon {
    fill: gray;
  }
  .pre.icon:hover {
    fill: var(--new-task-trail-focus);
  }

  .edit {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .lds-hourglass {
    display: inline-block;
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
  }
  .lds-hourglass:after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 0;
    box-sizing: border-box;
    border: 1rem solid var(--new-task-trail-focus);
    border-color: var(--new-task-trail-focus) transparent
      var(--new-task-trail-focus) transparent;
    animation: lds-hourglass 1.2s infinite;
  }
  @keyframes lds-hourglass {
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
      transform: rotate(1800deg);
    }
  }

  .success.icon {
    fill: var(--success-green);
    position: relative;
  }

  .success-msg,
  .error-msg {
    width: max-content;
    font-size: 0.7rem;
    position: absolute;
    right: calc(50% - 5px);
    top: calc(100% + 10px);
    background: var(--success-green);
    border-top-left-radius: var(--border-r);
    border-bottom-left-radius: var(--border-r);
    border-bottom-right-radius: var(--border-r);
    padding: 0.2rem;
    transform: scale(0);
    transition: all 100ms linear;
  }

  .success-msg::before,
  .error-msg::before {
    content: "";
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid var(--success-green);

    position: absolute;
    left: calc(100% - 10px);
    bottom: 100%;
  }

  .success.icon:hover > .success-msg,
  .error.icon:hover > .error-msg {
    transform: scale(1);
  }

  .error.icon {
    fill: var(--danger-red);
    position: relative;
  }

  .error-msg {
    background: var(--danger-red);
    color: white;
  }
  .error-msg::before {
    border-bottom: 10px solid var(--danger-red);
  }
</style>
