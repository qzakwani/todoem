<script>
  import db from "$lib/firestore";
  import { doc, deleteDoc } from "firebase/firestore";
  import { tasks, completedTasks, showTodoError } from "$lib/stores";
  import auth from "$lib/auth";

  export let task;
  export let index;
  export let completed = false;
  export let taskId;

  function deleteTask() {
    const userId = localStorage.getItem("uid") || auth.currentUser.uid;
    deleteDoc(doc(db, `users/${userId}/tasks/${taskId}`)).catch(() => {
      $showTodoError = true;
    });

    if (completed) {
      $completedTasks.splice(index, 1);
      $completedTasks = $completedTasks;
    } else {
      $tasks.splice(index, 1);
      $tasks = $tasks;
    }
  }
</script>

<div class:completed on:click class="task-card">
  <div class="container">
    <div class="check" />
    <p class="task">{task}</p>
  </div>
  <div class="delete-task" on:click={deleteTask}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
      ><path
        d="M14.8 39.3H33.25Q33.25 39.3 33.25 39.3Q33.25 39.3 33.25 39.3V16.4H14.8V39.3Q14.8 39.3 14.8 39.3Q14.8 39.3 14.8 39.3ZM8.55 10.7V5.95H16.85L18.85 3.95H29.15L31.15 5.95H39.45V10.7ZM14.8 44Q12.85 44 11.45 42.625Q10.05 41.25 10.05 39.3V11.7H37.95V39.3Q37.95 41.25 36.55 42.625Q35.15 44 33.25 44ZM14.8 39.3H33.25Q33.25 39.3 33.25 39.3Q33.25 39.3 33.25 39.3H14.8Q14.8 39.3 14.8 39.3Q14.8 39.3 14.8 39.3Z"
      /></svg
    >
  </div>
</div>

<style>
  .task-card {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .container {
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

  .container:hover .check {
    outline-offset: 2px;
  }

  .container:hover .check::after {
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

  .delete-task {
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
    fill: rgba(128, 128, 128, 0.2);
  }

  .delete-task:hover {
    fill: var(--danger-red);
  }
</style>
