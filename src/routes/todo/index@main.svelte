<script>
  import db from "$lib/firestore";
  import { collection, getDocs, orderBy, query } from "firebase/firestore";
  import auth from "$lib/auth";
  import { onMount } from "svelte";
  import { dbControl, tasks, completedTasks, showTodoError } from "$lib/stores";

  import AddNewTask from "$lib/components/todo/AddNewTask.svelte";
  import Tasks from "$lib/components/todo/Tasks.svelte";
  import CompletedTasks from "$lib/components/todo/CompletedTasks.svelte";
  import TodoError from "$lib/components/todo/TodoError.svelte";
  import LoadingTasks from "$lib/components/todo/LoadingTasks.svelte";

  let fetching = true;

  onMount(async () => {
    if ($dbControl) {
      const userId = localStorage.getItem("uid") || auth.currentUser.uid;
      const q = query(collection(db, `users/${userId}/tasks`), orderBy("date"));
      getDocs(q)
        .then((querySnapshot) => {
          const fetchedData = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          $tasks = fetchedData.filter((t) => t.completed == false);
          $completedTasks = fetchedData.filter((t) => t.completed == true);
          $dbControl = false;
          fetching = false;
        })
        .catch((e) => {
          $showTodoError = true;
        });
    }
  });
</script>

<article>
  <AddNewTask />
  {#if fetching}
    <LoadingTasks />
  {:else}
    <Tasks />
    <CompletedTasks />
  {/if}
</article>

{#if $showTodoError}
  <TodoError />
{/if}

<style>
  article {
    width: 100%;
    height: 100%;
    background: var(--secondary-bg);
  }
</style>
