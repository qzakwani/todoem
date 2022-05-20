<script>
  import Button from "$lib/components/Button.svelte";

  export let question, successFunc, rejectFunc;

  export let btn1, btn2;
</script>

<div class="container">
  <div class="pop-up">
    <h4>{question}</h4>
    <div class="btns">
      <Button text={btn1} kind="primary" animate on:click={successFunc} />
      <Button text={btn2} kind="danger" animate on:click={rejectFunc} />
    </div>
  </div>
</div>

<style>
  .container {
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

  .pop-up {
    z-index: 20;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    border-radius: var(--border-r);
    background-color: var(--popup-bg);
  }

  .btns {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }

  h4 {
    color: var(--primary-font-clr);
  }
</style>
