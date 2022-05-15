<script>
  import db from "$lib/firestore";
  import {
    collection,
    getDocs,
    doc,
    addDoc,
    serverTimestamp,
  } from "firebase/firestore";
  import { onMount } from "svelte";
  import { dbControl, tasks } from "$lib/stores";
  let fetching = true;
  let task = "";

  onMount(async () => {
    if ($dbControl === 0) {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      console.log(querySnapshot.docs);
      $tasks = querySnapshot.docs;
      $dbControl = 1;
    }

    fetching = false;
  });

  async function addTask() {
    addDoc(collection(db, "tasks"), {
      task,
      date: serverTimestamp(),
    });
  }
</script>

<div class="h">
  {#if fetching}
    <h3>Loading</h3>
  {:else}
    {#each $tasks as task}
      <p>{task.data().task}</p>
    {/each}
  {/if}
</div>

<input type="text" bind:value={task} />
<button on:click={addTask}>ADD</button>
