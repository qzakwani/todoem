<script>
  import auth from "$lib/auth";
  const user = auth.currentUser;
</script>

{#if user !== null}
  <h1>{user.displayName}</h1>
{/if}
