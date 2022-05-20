<script>
  import db from "$lib/firestore";
  import { doc, updateDoc } from "firebase/firestore";
  import { tasks, completedTasks, showTodoError } from "$lib/stores";
  import auth from "$lib/auth";

  import TaskCard from "$lib/components/todo/TaskCard.svelte";

  function unCheckTask(taskId, i) {
    const userId = localStorage.getItem("uid") || auth.currentUser.uid;
    updateDoc(
      doc(db, `users/${userId}/tasks/${taskId}`),
      "completed",
      false
    ).catch((e) => {
      $showTodoError = true;
    });

    const unCompletedTask = $completedTasks.splice(i, 1)[0];
    unCompletedTask.completed = false;
    $completedTasks = $completedTasks;
    $tasks = [...$tasks, unCompletedTask];
  }
</script>

<section class="completed-tasks">
  <div class="title">
    <h1>Completed Tasks</h1>
    <div class="delete-all">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
        ><path
          d="M30 36.5V33.5H37.25V36.5ZM30 18.1V15.1H44V18.1ZM30 27.3V24.3H41.75V27.3ZM9.5 40Q8.3 40 7.4 39.1Q6.5 38.2 6.5 37V14H25.5V37Q25.5 38.2 24.6 39.1Q23.7 40 22.5 40ZM4 13V10H10.2L12.2 8H19.8L21.8 10H28V13Z"
        /></svg
      >
    </div>
  </div>
  {#each $completedTasks as task, i}
    <TaskCard
      completed={task.completed}
      task={task.task}
      on:click={() => unCheckTask(task.id, i)}
    />
  {/each}
</section>

<style>
  .title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .delete-all {
    width: 1.7rem;
    height: 1.7rem;
    cursor: pointer;
    fill: var(--menu-sub-txt-clr);
  }

  .delete-all:hover {
    fill: var(--primary-font-clr);
  }

  .completed-tasks {
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
  }

  h1 {
    color: var(--menu-sub-txt-clr);
    letter-spacing: 3px;
    text-transform: uppercase;
  }
</style>
