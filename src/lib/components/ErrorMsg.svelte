<script>
  export let msg = "";
  export let degree = "danger";
</script>

<div
  class="container card"
  class:danger={degree == "danger"}
  class:warning={degree == "warning"}
>
  <p class="msg">{msg}</p>
</div>

<style>
  .container {
    width: 100%;
    padding: 1rem;
    text-align: center;
    border-radius: var(--border-r);
  }

  .danger {
    background-color: var(--danger-red);
    color: white;
  }

  .warning {
    background-color: var(--orange-web);
    color: black;
  }
</style>
