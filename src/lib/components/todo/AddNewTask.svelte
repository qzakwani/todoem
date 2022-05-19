<script>
  import db from "$lib/firestore";

  import { collection, addDoc, serverTimestamp } from "firebase/firestore";
  import { tasks, showTodoError } from "$lib/stores";
  import Button from "$lib/components/Button.svelte";

  let task = "";

  function addTask() {
    if (!task) {
      return;
    }
    const newTask = { task, completed: false, date: serverTimestamp() };
    task = "";
    const userId = localStorage.getItem("uid") || auth.currentUser.uid;

    addDoc(collection(db, `users/${userId}/tasks`), newTask).catch((e) => {
      $showTodoError = true;
    });

    $tasks = [...$tasks, newTask];
  }
</script>

<div class="container">
  <input type="text" bind:value={task} required placeholder="New Task" />
  <Button text="&plus;" icon on:click={addTask} />
</div>

<style>
  .container {
    padding: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  input {
    padding: 0.5rem;
    border: none;
    width: 100%;
    background: none;
    font-size: 14px;

    color: var(--primary-font-clr);
    caret-color: var(--new-task-trail-focus);
    border-bottom: 2px solid var(--new-task-trail);
  }

  input:focus {
    border-bottom: 2px solid var(--new-task-trail-focus);
  }
</style>
