<script>
  import db from "$lib/firestore";
  import { collection, getDocs } from "firebase/firestore";
  import { onMount } from "svelte";
  import { dbControl, tasks } from "$lib/stores";
  let fetching = true;

  onMount(async () => {
    if ($dbControl === 0) {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      console.log(querySnapshot.docs);
      $tasks = querySnapshot.docs;
      $dbControl = 1;
    }

    fetching = false;
  });
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
