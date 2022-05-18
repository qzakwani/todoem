<script>
  import db from "$lib/firestore";

  import { collection, addDoc, serverTimestamp } from "firebase/firestore";
  import { tasks } from "$lib/stores";

  let task = "";
  let showError = false;

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

<input type="text" bind:value={task} required />
<button on:click={addTask}>ADD</button>

{#if showError}
  <div class="error">error</div>
{/if}
