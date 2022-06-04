<script>
  export let msg = "";
  export let degree = "danger";
</script>

<div
  class="container"
  class:danger={degree == "danger"}
  class:warning={degree == "warning"}
>
  <p class="msg">{msg}</p>
</div>

<style>
  .container {
    width: 50%;
  }
</style>
