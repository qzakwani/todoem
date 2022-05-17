<script>
  import db from "$lib/firestore";
  import {
    collection,
    getDocs,
    addDoc,
    serverTimestamp,
  } from "firebase/firestore";
  import auth from "$lib/auth";
  import { onMount } from "svelte";
  import { dbControl, tasks, completedTasks } from "$lib/stores";
  let fetching = true;
  let task = "";
  let showError = false;

  onMount(async () => {
    if ($dbControl) {
      const userId = localStorage.getItem("uid") || auth.currentUser.uid;
      getDocs(collection(db, `users/${userId}/tasks`)).then((querySnapshot) => {
        $tasks = querySnapshot.docs.filter(
          (doc) => doc.data().cpmpleted === false
        );
        $completedTasks = querySnapshot.docs.filter(
          (doc) => doc.data().cpmpleted === true
        );
        $dbControl = false;
      });
    }

    fetching = false;
  });

  function addTask() {
    const newTask = { task, completed: false, date: serverTimestamp() };
    task = "";
    const userId = localStorage.getItem("uid") || auth.currentUser.uid;

    addDoc(collection(db, `users/${userId}/tasks`), newTask).catch((e) => {
      showError = true;
    });

    $tasks = [newTask, ...$tasks];
  }
</script>

<div class="h">
  {#if fetching}
    <h3>Loading</h3>
  {:else}
    {#each $tasks as task}
      <p>{task.task}</p>
    {/each}
  {/if}
</div>

<input type="text" bind:value={task} required />
<button on:click={addTask}>ADD</button>
