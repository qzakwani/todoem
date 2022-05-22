<script>
  import auth from "$lib/auth";
  import { updateEmail, updateProfile } from "firebase/auth";
  import { goto } from "$app/navigation";
  const user = auth.currentUser;
  if (user === null) {
    goto("account/login");
  }
  const ARreg = /[\u0600-\u06FF]/;
  let arTask = false;
  $: dir = arTask ? "rtl" : "ltr";

  let editEmail = "pre";
  let editName = "pre";
  let deactivateConfirmation = false;

  import Button from "$lib/components/Button.svelte";
  import ChangeStatus from "$lib/components/profile/ChangeStatus.svelte";
  let name = user.displayName;
  let email = user.email;

  function changeName() {
    editName = "pending";
    updateProfile(auth.currentUser, { displayName: name })
      .then(() => {
        editName = "success";
      })
      .catch(() => {
        editName = "error";
      });
  }

  function changeEmail() {}
</script>

<article class="profile">
  <h1>Profile: {user.displayName}</h1>

  <table>
    <tr class:editing={editName === "edit"}>
      <td class="label">Name</td>
      <td class="field">
        {#if editName === "edit"}
          <input
            type="text"
            bind:value={name}
            {dir}
            on:keyup={() => {
              arTask = ARreg.test(name);
            }}
          />
        {:else}
          {user.displayName}
        {/if}

        <ChangeStatus
          status={editName}
          saveFunction={changeName}
          startEdit={() => {
            editName = "edit";
          }}
          cancelEdit={() => {
            editName = "pre";
          }}
        />
      </td>
    </tr>
  </table>

  <!-- <Button text="Deactivate" kind="danger" animate /> -->
</article>

<style>
  .profile {
    height: 100%;
    width: 100%;
    background: var(--secondary-bg);
  }

  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 1rem;
  }

  tr {
    border-bottom: 1px solid rgba(128, 128, 128, 0.3);
  }
  td {
    padding: 1.5rem;
  }

  .label {
    color: gray;
  }
  .field {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary-font-clr);
  }

  .editing {
    border-bottom: 2px solid var(--new-task-trail-focus);
  }

  input {
    padding: 0.7rem;
    border: none;
    width: 100%;
    background: var(--new-task-trail);
    font-size: 1rem;

    color: var(--primary-font-clr);
    caret-color: var(--new-task-trail-focus);
    border-bottom: 2px solid var(--new-task-trail);
  }

  input:focus {
    border-bottom: 2px solid var(--new-task-trail-focus);
  }
</style>
