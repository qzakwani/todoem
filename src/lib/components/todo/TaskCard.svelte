<script>
  export let task;
  export let completed = false;
</script>

<div class="card" class:completed on:click>
  <div class="check" />
  <p class="task">{task}</p>
</div>

<style>
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    width: 100%;

    cursor: pointer;
  }

  .check {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    outline: 1px solid black;
    transition: all 150ms linear;
  }

  .check::after {
    content: "";
    position: absolute;
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    background: #000;
    transform: scale(0);
    transition: all 150ms linear;
  }

  div:hover .check {
    outline-offset: 2px;
  }

  div:hover .check::after {
    transform: scale(1);
  }

  .completed {
    opacity: 0.7;
  }

  .completed .task {
    text-decoration: line-through;
  }

  .completed .check::after {
    transform: scale(1);
  }
</style>
