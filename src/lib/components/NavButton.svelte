<script>
  export let text;
  export let href;
</script>

<a {href} class="nav-btn">{text}</a>

<style>
  .nav-btn {
    display: block;
    font-weight: 400;
    color: var(--primary-font-clr, black);
    padding: 1.5rem;
    position: relative;
  }

  .nav-btn::after {
    display: none;
    content: "";
    background-color: var(--nav-btn-trail-clr);
    width: 100%;
    height: 3px;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .nav-btn:hover {
    background-color: var(--nav-btn-bg-clr, gray);
  }

  .nav-btn:hover::after {
    display: inline-block;
  }
</style>
