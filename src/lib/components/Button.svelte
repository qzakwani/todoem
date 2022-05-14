<script>
  export let text;
  export let type;
  export let kind = "primary";
  export let size = "m";
  export let animate = false;
</script>

<button
  class="card"
  on:click
  {type}
  class:primary={kind == "primary"}
  class:secondary={kind == "secondary"}
  class:s={size == "s"}
  class:m={size == "m"}
  class:l={size == "l"}
  class:animate
>
  {text}
</button>

<style>
  button {
    border: none;
    outline: none;
    appearance: none;

    font-family: var(--main-font, arial);
    text-transform: uppercase;
    cursor: pointer;
    font-weight: 900;
    border-radius: var(--border-r, 3px);

    letter-spacing: 1.5px;
  }

  button:hover {
    filter: brightness(var(--btn-brightness));
  }

  .primary {
    color: var(--primary-btn-txt);
    background-color: var(--primary-btn-bg);
  }

  .secondary {
    outline: 2px solid var(--primary-btn-bg);
    color: var(--primary-btn-bg);
    box-shadow: none;
    background-color: transparent;
  }

  .s {
    font-size: 0.7rem;
    padding: 0.6rem 0.6rem;
  }

  .m {
    font-size: 1rem;
    padding: 0.6rem 1.4rem;
  }

  .l {
    font-size: 1.5rem;
    padding: 0.6rem 1.8rem;
  }

  .animate:focus {
    animation: button-pop 300ms ease-out;
  }

  @keyframes button-pop {
    0% {
      transform: scale(0.95);
    }
    40% {
      transform: scale(1.02);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
