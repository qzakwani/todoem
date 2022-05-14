<script>
  import auth from "$lib/auth";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import Form from "$lib/components/Form.svelte";
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";

  let email, password;

  async function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        const user = cred.user;
        localStorage.setItem("uid", user.uid);
        goto("/todo");
      })
      .catch((e) => {
        console.log(e.code);
      });
  }
</script>

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
