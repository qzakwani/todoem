<script>
  import auth from "$lib/auth";
  import {
    updateEmail,
    updateProfile,
    updatePassword,
    deleteUser,
  } from "firebase/auth";
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
  let editPassword = "pre";
  let errorMsg = false;
  let deactivateConfirmation = false;
  let deactivateError = false;
  let loading = false;

  import Button from "$lib/components/Button.svelte";
  import ChangeStatus from "$lib/components/profile/ChangeStatus.svelte";
  import PopUp from "$lib/components/PopUp.svelte";
  import Loading from "$lib/components/Loading.svelte";
  import { phoneMode } from "$lib/stores";

  let name = user.displayName || "User";
  let email = user.email;
  let password = "";

  function changeName() {
    editName = "pending";
    if (auth.currentUser === null) {
      goto("/account/login");
    }
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
    if (auth.currentUser === null) {
      goto("/account/login");
    }
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

  function changePassword() {
    editPassword = "pending";
    if (auth.currentUser === null) {
      goto("/account/login");
    }
    updatePassword(auth.currentUser, password)
      .then(() => {
        editPassword = "success";
      })
      .catch((e) => {
        if (e.code === "auth/requires-recent-login") {
          errorMsg = "Edit failed: Requires recent login. Please login again!";
        }
        editPassword = "error";
      });
  }

  function deactivateAccount() {
    loading = true;
    if (auth.currentUser === null) {
      goto("/account/login");
    }

    deleteUser(auth.currentUser)
      .then(() => {
        goto("/");
      })
      .catch((e) => {
        deactivateConfirmation = false;
        if (e.code === "auth/requires-recent-login") {
          errorMsg = "Edit failed: Requires recent login. Please login again!";
        }
        deactivateError = true;
        loading = false;
      });
  }
</script>

<article class="profile" class:mobile={$phoneMode}>
  <h1 class="profile-name">Profile: {name}</h1>

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

    <!-- Password -->
    <tr class:editing={editPassword === "edit"}>
      <td class="label">Password</td>
      <td class="field">
        {#if editPassword === "edit"}
          <input
            type="password"
            bind:value={password}
            placeholder="New Password"
            minlength="8"
            required
          />
        {:else}
          ********
        {/if}
      </td>
      <td class="edit">
        <ChangeStatus
          status={editPassword}
          saveFunction={changePassword}
          {errorMsg}
          startEdit={() => {
            editPassword = "edit";
          }}
          cancelEdit={() => {
            editPassword = "pre";
          }}
        />
      </td>
    </tr>
  </table>

  <!-- Deactivate -->
  <div class="deactivate">
    <Button
      text="Deactivate"
      kind="danger"
      animate
      on:click={() => {
        deactivateConfirmation = true;
      }}
    />
    {#if deactivateError}
      <ChangeStatus status="error" {errorMsg} />
    {/if}
  </div>
</article>

{#if deactivateConfirmation}
  <PopUp
    question="Are you sure? NOTE: must have signed in recently!"
    rejectFunc={deactivateAccount}
    successFunc={() => {
      deactivateConfirmation = false;
    }}
    btn1="Cancel"
    btn2="Deactivate"
  />
{/if}

{#if loading}
  <Loading />
{/if}

<style>
  .profile {
    height: 100%;
    width: 100%;
    background: var(--secondary-bg);

    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .profile.mobile {
    justify-content: center;
  }

  .profile-name {
    color: var(--primary-font-clr);
    padding: 0.5rem;
    width: 100%;
    text-align: center;
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

  .mobile td {
    padding: 0.5rem;
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

  .mobile input {
    padding: 0.3rem;
  }

  input:focus {
    border-bottom: 2px solid var(--new-task-trail-focus);
  }

  .deactivate {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 0.5rem;
  }
</style>
