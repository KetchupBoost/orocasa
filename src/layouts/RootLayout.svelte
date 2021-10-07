<script>
  import { Route } from 'svelte-router-spa';

  export let currentRoute;
</script>

<main class="flex w-screen h-screen">
  <Route {currentRoute} />
</main>
