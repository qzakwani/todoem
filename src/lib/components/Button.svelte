<script>
  export let text;
  export let type = "submit";
  export let kind = "primary";
  export let size = "m";
  export let animate = false;
  export let icon = false;
</script>

<button
  class="card"
  on:click
  {type}
  class:primary={kind == "primary"}
  class:secondary={kind == "secondary"}
  class:danger={kind == "danger"}
  class:s={size == "s"}
  class:m={size == "m"}
  class:l={size == "l"}
  class:animate
  class:icon
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

  .danger {
    color: var(--danger-btn-clr);
    background: var(--danger-btn-bg);
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

  .icon {
    padding: 0;
    font-size: 1.5rem;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
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
