<script>
  import db from "$lib/firestore";
  import { doc, updateDoc, writeBatch } from "firebase/firestore";
  import { tasks, completedTasks, showTodoError } from "$lib/stores";
  import auth from "$lib/auth";

  import TaskCard from "$lib/components/todo/TaskCard.svelte";
  import PopUp from "$lib/components/PopUp.svelte";

  let askConfirmation = false;

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

  function deleteAll() {
    const userId = localStorage.getItem("uid") || auth.currentUser.uid;
    const batch = writeBatch(db);
    $completedTasks.forEach((task) => {
      const docRef = doc(db, `users/${userId}/tasks/${task.id}`);
      batch.delete(docRef);
    });
    batch.commit().catch((e) => {
      showTodoError = true;
    });

    $completedTasks = [];
    askConfirmation = false;
  }

  function cancelDelete() {
    askConfirmation = false;
  }
</script>

<section class="completed-tasks">
  <div class="title">
    <h1>Completed Tasks</h1>
    {#if $completedTasks.length > 0}
      <div
        class="delete-all"
        on:click={() => {
          askConfirmation = true;
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
          ><path
            d="M30 36.5V33.5H37.25V36.5ZM30 18.1V15.1H44V18.1ZM30 27.3V24.3H41.75V27.3ZM9.5 40Q8.3 40 7.4 39.1Q6.5 38.2 6.5 37V14H25.5V37Q25.5 38.2 24.6 39.1Q23.7 40 22.5 40ZM4 13V10H10.2L12.2 8H19.8L21.8 10H28V13Z"
          /></svg
        >
      </div>
    {/if}
  </div>
  {#if $completedTasks.length > 0}
    {#each $completedTasks as task, i}
      <TaskCard
        index={i}
        taskId={task.id}
        completed={task.completed}
        task={task.task}
        on:click={() => unCheckTask(task.id, i)}
      />
    {/each}
  {:else}
    <p class="note">No completed tasks</p>
  {/if}
</section>
<br />
<br />
<br />

{#if askConfirmation}
  <PopUp
    question="Are you sure you want to delete all completed tasks?"
    successFunc={deleteAll}
    rejectFunc={cancelDelete}
    btn1="Delete All"
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

  .note {
    color: rgba(128, 128, 128, 0.7);
    width: 100%;
    text-align: center;
    padding: 1rem;
  }
</style>
