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
  <h1>Completed Tasks</h1>
  {#each $completedTasks as task, i}
    <TaskCard
      completed={task.completed}
      task={task.task}
      on:click={() => unCheckTask(task.id, i)}
    />
  {/each}
</section>

<style>
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
