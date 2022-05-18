<script>
  import db from "$lib/firestore";
  import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
  import auth from "$lib/auth";
  import { onMount } from "svelte";
  import { dbControl, tasks, completedTasks } from "$lib/stores";
  import TaskCard from "$lib/components/todo/TaskCard.svelte";
  let fetching = true;
  let showError = false;

  onMount(async () => {
    if ($dbControl) {
      const userId = localStorage.getItem("uid") || auth.currentUser.uid;
      getDocs(collection(db, `users/${userId}/tasks`)).then((querySnapshot) => {
        const fetchedData = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        $tasks = fetchedData.filter((t) => t.completed == false);
        $completedTasks = fetchedData.filter((t) => t.completed == true);
        $dbControl = false;
      });
    }

    fetching = false;
  });

  function checkTask(taskId) {
    const userId = localStorage.getItem("uid") || auth.currentUser.uid;
    updateDoc(
      doc(db, `users/${userId}/tasks/${taskId}`),
      "completed",
      true
    ).catch((e) => {
      showError = true;
    });

    console.log(taskId);
  }
</script>

<section class="tasks">
  {#if fetching}
    <h3>Loading</h3>
  {:else}
    {#each $tasks as task}
      <TaskCard
        completed={task.completed}
        task={task.task}
        on:click={() => checkTask(task.id)}
      />
    {/each}
  {/if}
</section>

<style>
  .tasks {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
