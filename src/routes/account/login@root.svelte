<script>
  import auth from "$lib/auth";
  import {
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
  } from "firebase/auth";
  import Form from "$lib/components/Form.svelte";
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
  import Loading from "$lib/components/Loading.svelte";
  import ErrorMsg from "$lib/components/ErrorMsg.svelte";

  let email, password, errorMsg;
  let loading = false;
  let showError = true;

  async function login() {
    loading = true;
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password)
          .then((cred) => {
            const user = cred.user;
            localStorage.setItem("uid", user.uid);
            goto("/todo");
          })
          .catch((e) => {
            console.log(e.code);
          });
      })
      .catch((e) => {
        errorMsg = "Something went wrong. Please Try again!";
        showError = true;
      });
  }
</script>

{#if showError}
  <ErrorMsg msg="test" degree="testoo" />
{/if}

<Form on:submit={login} title="Login">
  <label for="email"
    >Email
    <br />
    <input type="email" id="email" bind:value={email} required />
  </label>
  <label for="password"
    >Password
    <br />
    <input type="password" id="password" bind:value={password} required />
  </label>

  <Button type="submit" text="Login" animate="true" />
</Form>

{#if loading}
  <Loading />
{/if}
