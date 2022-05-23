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
  let errorMsg = false;
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

  function changeEmail() {
    editEmail = "pending";
    updateEmail(auth.currentUser, email)
      .then(() => {
        editEmail = "success";
      })
      .catch((e) => {
        if (e.code === "auth/requires-recent-login") {
          errorMsg = "Edit failed: Requires recent login. Please login again!";
        }
        editEmail = "error";
      });
  }
</script>

<article class="profile">
  <h1>Profile: {name}</h1>

  <table>
    <!-- Name -->
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
          {name}
        {/if}
      </td>
      <td class="edit">
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

    <!-- Email -->
    <tr class:editing={editEmail === "edit"}>
      <td class="label">Email</td>
      <td class="field">
        {#if editEmail === "edit"}
          <input type="text" bind:value={email} />
        {:else}
          {email}
        {/if}
      </td>
      <td class="edit">
        <ChangeStatus
          status={editEmail}
          saveFunction={changeEmail}
          {errorMsg}
          startEdit={() => {
            editEmail = "edit";
          }}
          cancelEdit={() => {
            editEmail = "pre";
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
    /* display: flex;
    align-items: center;
    gap: 0.5rem; */
    color: var(--primary-font-clr);
  }

  .edit {
    display: flex;
    justify-content: right;
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
