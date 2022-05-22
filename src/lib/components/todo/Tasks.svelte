<script>
  import db from "$lib/firestore";
  import { doc, updateDoc, writeBatch } from "firebase/firestore";
  import { tasks, completedTasks, showTodoError } from "$lib/stores";
  import auth from "$lib/auth";

  import TaskCard from "$lib/components/todo/TaskCard.svelte";
  import PopUp from "$lib/components/PopUp.svelte";

  let askConfirmation = false;

  function checkTask(taskId, i) {
    const userId = localStorage.getItem("uid") || auth.currentUser.uid;
    updateDoc(
      doc(db, `users/${userId}/tasks/${taskId}`),
      "completed",
      true
    ).catch((e) => {
      $showTodoError = true;
    });

    const completedTask = $tasks.splice(i, 1)[0];
    completedTask.completed = true;
    $tasks = $tasks;
    $completedTasks = [completedTask, ...$completedTasks];
  }

  function checkAll() {
    const userId = localStorage.getItem("uid") || auth.currentUser.uid;
    const batch = writeBatch(db);
    $tasks.forEach((task) => {
      const docRef = doc(db, `users/${userId}/tasks/${task.id}`);
      batch.update(docRef, { completed: true });
      task.completed = true;
    });
    batch.commit().catch((e) => {
      $showTodoError = true;
    });

    $completedTasks = [...$tasks, ...$completedTasks];
    $tasks = [];
    askConfirmation = false;
  }

  function cancelCheck() {
    askConfirmation = false;
  }
</script>

<section class="tasks">
  <div class="title">
    <h1>Tasks</h1>
    {#if $tasks.length > 0}
      <div
        class="check-all"
        on:click={() => {
          askConfirmation = true;
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
          ><path
            d="M24 44Q19.85 44 16.2 42.425Q12.55 40.85 9.85 38.15Q7.15 35.45 5.575 31.8Q4 28.15 4 24Q4 19.85 5.575 16.2Q7.15 12.55 9.85 9.85Q12.55 7.15 16.2 5.575Q19.85 4 24 4Q27.15 4 29.975 4.9Q32.8 5.8 35.2 7.4L32.15 10.45Q30.35 9.4 28.3 8.8Q26.25 8.2 24 8.2Q17.45 8.2 12.825 12.825Q8.2 17.45 8.2 24Q8.2 30.55 12.825 35.175Q17.45 39.8 24 39.8Q30.55 39.8 35.175 35.175Q39.8 30.55 39.8 24Q39.8 23.15 39.725 22.375Q39.65 21.6 39.5 20.85L42.9 17.45Q43.45 19 43.725 20.625Q44 22.25 44 24Q44 28.15 42.425 31.8Q40.85 35.45 38.15 38.15Q35.45 40.85 31.8 42.425Q28.15 44 24 44ZM21.25 33.15 12.7 24.55 15.65 21.6 21.3 27.25 41.05 7.5 44 10.4Z"
          /></svg
        >
      </div>
    {/if}
  </div>
  {#if $tasks.length > 0}
    {#each $tasks as task, i}
      <TaskCard
        index={i}
        taskId={task.id}
        completed={task.completed}
        task={task.task}
        on:click={() => checkTask(task.id, i)}
      />
    {/each}
  {:else}
    <p class="note">No tasks yet</p>
  {/if}
</section>

{#if askConfirmation}
  <PopUp
    question="Are you sure you want all tasks to be checked?"
    successFunc={checkAll}
    rejectFunc={cancelCheck}
    btn1="Check All"
    btn2="Cancel"
  />
{/if}

<style>
  .title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .check-all {
    width: 1.7rem;
    height: 1.7rem;
    cursor: pointer;
    fill: var(--menu-sub-txt-clr);
  }

  .check-all:hover {
    fill: var(--primary-font-clr);
  }

  .tasks {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  h1 {
    color: var(--menu-sub-txt-clr);
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  .note {
    color: rgba(128, 128, 128, 0.7);
    width: 100%;
    text-align: center;
    padding: 1rem;
  }
</style>
