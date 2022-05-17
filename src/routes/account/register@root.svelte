<script>
  import auth from "$lib/auth";
  import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
  import Form from "$lib/components/Form.svelte";
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";

  let err = "";
  let email, p1, p2, name;

  async function register() {
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
          console.log(e.code);
        });
    } catch (error) {
      err = error;
    }
  }

  function validPassword() {
    return p1 === p2;
  }
</script>

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

  {#if err}
    <h3>{err}</h3>
  {/if}
  <br />

  <Button type="submit" text="Sign up" animate="true" />
</Form>
