<script>
  import { Route } from 'svelte-router-spa';

  export let currentRoute;
</script>

<div class="flex justify-center bg-white">
  <Route {currentRoute} />
</div>
