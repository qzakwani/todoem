<script>
  import auth from "$lib/auth";
  import { sendPasswordResetEmail } from "@firebase/auth";

  function sendV() {
    sendPasswordResetEmail(auth, "q.zak003@gmail.com").catch((e) => {
      console.log(e.code);
    });
  }
</script>

<button on:click={sendV}>Click Here</button>
