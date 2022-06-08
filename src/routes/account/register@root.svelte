<script>
  import auth from "$lib/auth";
  import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
  import Form from "$lib/components/Form.svelte";
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
  import Loading from "$lib/components/Loading.svelte";
  import ErrorMsg from "$lib/components/ErrorMsg.svelte";

  let msg;
  let loading = false;
  let showError = false;
  let email, p1, p2, name;

  async function register() {
    loading = true;
    try {
      if (!validPassword()) {
        throw "Passwords do NOT match!";
      }
      createUserWithEmailAndPassword(auth, email, p1)
        .then((cred) => {
          const user = cred.user;
          localStorage.setItem("uid", user.uid);
          updateProfile(user, { displayName: name }).catch((e) => {
            return;
          });
          goto("/todo");
        })
        .catch((e) => {
          if (e.code == "auth/email-already-in-use") {
            msg = "Email already in use.";
          } else if (e.code == "auth/weak-password") {
            msg = "The password is too weak.";
          } else if (e.code == "auth/invalid-email") {
            msg = "Invalid Email.";
          } else {
            msg = "Something went wrong! Reload and try again.";
          }
          showError = true;
          loading = false;
        });
    } catch (error) {
      msg = error;
      showError = true;
      loading = false;
    }
  }

  function validPassword() {
    return p1 === p2;
  }
</script>

<div class="container">
  {#if showError}
    <ErrorMsg {msg} degree="danger" />
  {/if}

  <Form on:submit={register} title="Sign Up">
    <label for="email"
      >Email
      <input type="email" id="email" required bind:value={email} />
    </label>
    <label>
      Name
      <input type="text" required bind:value={name} />
    </label>
    <label for="password1"
      >Password
      <input
        type="password"
        id="password1"
        required
        bind:value={p1}
        minlength="8"
      />
    </label>
    <label for="password2"
      >Confirm Password
      <input
        type="password"
        id="password2"
        required
        bind:value={p2}
        minlength="8"
      />
    </label>

    <Button type="submit" text="Sign up" animate="true" />
  </Form>
</div>

{#if loading}
  <Loading />
{/if}

<style>
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
  }
</style>
