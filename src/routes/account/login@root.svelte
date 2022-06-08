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
  import { phoneMode } from "$lib/stores";

  let email, password, msg;
  let loading = false;
  let showError = false;

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
            msg = "email or password is invalid!";
            showError = true;
            loading = false;
          });
      })
      .catch((e) => {
        msg = "Something went wrong. Please Try again!";
        showError = true;
        loading = false;
      });
  }
</script>

<div class="container">
  {#if showError}
    <ErrorMsg {msg} degree="danger" />
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

    <div class="btns">
      <Button type="submit" text="Login" animate />
      {#if !$phoneMode}
        <div class="right">
          <Button
            text="Sign Up"
            animate
            size="s"
            kind="secondary"
            type="button"
            on:click={() => {
              goto("/account/register");
            }}
          />
        </div>
      {/if}
    </div>
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

  .btns {
    width: 100%;
    position: relative;
    text-align: center;
  }

  .right {
    position: absolute;
    right: 0;
    bottom: 50%;
    transform: translateY(50%);
  }
</style>
