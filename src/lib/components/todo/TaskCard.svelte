<script>
  export let task;
  export let completed = false;
</script>

<div class:completed on:click>
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
    border-bottom: 1px solid rgba(128, 128, 128, 0.2);

    cursor: pointer;
  }

  .task {
    color: var(--task-txt-clr);
    font-size: 14px;
  }

  .check {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    outline: 1px solid var(--task-check-clr);
    transition: all 150ms linear;
    border-bottom: none;
  }

  .check::after {
    content: "";
    position: absolute;
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    background: var(--task-check-clr);
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
